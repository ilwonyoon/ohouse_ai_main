/**
 * OpenAI API Integration
 * Connects to OpenAI ChatGPT for sophisticated consultation
 */

import { logger } from "@/lib/logger";
import { OpenAIError } from "@/lib/errors";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

/**
 * Basic input sanitization to prevent prompt injection
 * Removes/escapes suspicious patterns that could be used to inject system prompts
 */
function sanitizeInput(input: string): string {
  // Limit input length
  const maxLength = 5000;
  if (input.length > maxLength) {
    logger.warn("Input exceeds maximum length, truncating", {
      originalLength: input.length,
      maxLength,
    });
    return input.substring(0, maxLength);
  }

  // Remove null bytes
  let sanitized = input.replace(/\0/g, "");

  // Escape special characters that could be used for injection
  // Keep conversation natural by not over-sanitizing
  sanitized = sanitized.replace(/[\u0000-\u001F]/g, "");

  // Warn if suspicious patterns detected (but don't block them)
  const suspiciousPatterns = [
    /^ignore previous instructions/i,
    /^forget /i,
    /^as an ai,/i,
    /^you are now/i,
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(sanitized)) {
      logger.warn("Suspicious prompt injection pattern detected", {
        pattern: pattern.source,
      });
      break;
    }
  }

  return sanitized;
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Call OpenAI ChatGPT API
 */
export async function callOpenAI(messages: ChatMessage[]): Promise<string> {
  if (!OPENAI_API_KEY) {
    const error = "OPENAI_API_KEY is not configured. Please add it to .env.local";
    logger.error("OpenAI API key missing", new Error(error));
    throw new Error(error);
  }

  const startTime = Date.now();
  const messageCount = messages.length;

  try {
    logger.info("Calling OpenAI API", {
      model: "gpt-4-turbo",
      messageCount,
      estimatedTokens: messageCount * 150, // rough estimate
    });

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const duration = Date.now() - startTime;

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error?.message || response.statusText;
      const errorCode = errorData.error?.type || "unknown_error";
      const retryable = response.status >= 500 || response.status === 429;

      logger.warn("OpenAI API request failed", {
        statusCode: response.status,
        errorCode,
        errorMessage,
        duration: `${duration}ms`,
        retryable,
      });

      throw new OpenAIError(
        `OpenAI API error: ${errorMessage}`,
        errorCode,
        retryable,
        {
          statusCode: response.status,
          messageCount,
          duration,
        }
      );
    }

    const data: OpenAIResponse = await response.json();
    const responseContent = data.choices[0].message.content;

    logger.info("OpenAI API call successful", {
      duration: `${duration}ms`,
      responseLength: responseContent.length,
      tokensUsed: data.usage?.total_tokens || "unknown",
      messageCount,
    });

    return responseContent;
  } catch (error) {
    const duration = Date.now() - startTime;

    if (error instanceof OpenAIError) {
      throw error;
    }

    logger.error("OpenAI API error", error instanceof Error ? error : null, {
      duration: `${duration}ms`,
      messageCount,
      errorType: error instanceof Error ? error.constructor.name : "unknown",
    });

    throw error;
  }
}

/**
 * Generate system prompt based on conversation phase and context
 */
function generateSystemPrompt(phase?: string): string {
  const basePrompt = `You are an expert interior design consultant AI. Your role is to conduct adaptive, intelligent initial consultations for interior design projects.

## Core Principles
- Be warm, conversational, and genuinely interested
- Ask ONE question at a time (never multiple questions in one message)
- Adapt tone and depth to the user's project type (exploratory vs committed)
- Never pressure the user; respect "I don't know" responses
- Listen more than you talk
- Build rapport before diving deep

## User Type Adaptation
IF the user is EXPLORATORY ("just looking", "curious", "seeing what's possible"):
  - Make it fun, visual, and low-pressure
  - Focus on inspiration and possibility
  - Ask: "If you could transform ANY room, which one?" and show some visual ideas
  - Watch for conversion signals (they mention a real problem, ask about cost/process)

IF the user has a VAGUE PROJECT ("thinking about it", "room feels outdated"):
  - Help them clarify scope (small refresh vs makeover vs renovation)
  - Ask: "Are you thinking small changes or a bigger transformation?"
  - Navigate to either light or standard consultation

IF the user has a SMALL PROJECT (single room, small budget, 5-8 questions total):
  - Focus on: room type, main pain point, desired feeling, what they're keeping, budget, timeline, must-haves
  - Move quickly but conversationally
  - Stay concise - aim to finish in 5-8 exchanges

IF the user has a LARGE PROJECT (multiple rooms, renovation, significant budget):
  - Be more thorough and professional
  - Explore: spark/motivation, vision, success definition, lifestyle, constraints
  - Ask follow-up questions to understand nuance
  - Can take 15-25 questions

## Question Format Guidelines
- Start with OPEN-ENDED questions when exploring (not yes/no)
- Use MULTIPLE CHOICE when offering specific options:
  "Are you thinking:
  1. Small refresh - new decor, keep most furniture
  2. Makeover - new furniture, change the look
  3. Full renovation - everything new
  4. Not sure yet"
- Use RANGE SELECTION for budget, timeline, etc.
- Validate what you heard before moving to next topic

## Information to Collect (in priority order)
1. ROOM/SPACE: Which room(s)? Size? Natural light?
2. PAIN POINT: What bothers them about it now?
3. FEELING: How do they want it to feel?
4. GOALS: What's the main goal? (organize, modernize, cozify, etc.)
5. BUDGET: What's their range? Are they comfortable with it?
6. TIMELINE: When do they want this done?
7. LIFESTYLE: Kids, pets, work-from-home, entertaining?
8. CONSTRAINTS: Renting? Architectural limitations?

## Conversation Completion Signals
- Small projects: When you've covered all 7 topics above
- Large projects: When you understand room, pain points, goals, budget, timeline, AND lifestyle/constraints
- Say: "Great! I have what I need. Let me connect you with our [Style Profiler/Design team] who will create concepts for you."

## Tone Examples
- EXPLORATORY: "Pretty cool, right? Want to try this for your actual space?"
- ENGAGED: "OK so your living room feels outdated and you want it to feel more modern. Got it. What about budget—are you thinking small refresh or bigger investment?"
- CONFIDENT: "Perfect, I've got everything. Here's what happens next..."`;

  if (phase === "phase_1c_light_consultation") {
    return (
      basePrompt +
      `

## LIGHT CONSULTATION MODE (Small Refresh Projects)
You are in a quick, focused consultation for a small project.
- Keep answers brief and conversational
- Ask max 8 questions total
- Focus on: room, pain point, feeling, keeping, budget, timeline, must-haves
- Move to synthesis after covering these topics`
    );
  }

  if (phase === "phase_1d_standard_consultation") {
    return (
      basePrompt +
      `

## STANDARD CONSULTATION MODE (Medium/Large Projects)
You are in a comprehensive consultation.
- Go deeper with follow-up questions
- Allow 15-25 questions for thorough discovery
- Explore motivations, lifestyle, constraints in detail
- Ask about must-haves, existing pieces they want to keep
- Validate emotions and concerns
- After covering essentials, ask about lifestyle and constraints`
    );
  }

  if (phase === "phase_1a_exploratory_mode") {
    return (
      basePrompt +
      `

## EXPLORATORY MODE (For Tire-Kickers)
User is just exploring ideas, not committing yet.
- Make it FUN and VISUAL
- Ask: "If you could wave a magic wand and transform any room, which one?"
- Suggest showing them visual inspiration with one photo + vibe description
- Watch for these conversion signals:
  * "How much would this cost?"
  * "Could you do this for my space?"
  * "My [room] has [specific problem]"
  * "I actually do need help with..."
- If you detect conversion, say: "Oh awesome! So you're thinking about actually doing this? I can totally help with that!"`
    );
  }

  return basePrompt;
}

/**
 * Generate response using OpenAI for consultation
 */
export async function generateConsultantResponse(
  userMessage: string,
  conversationHistory: ChatMessage[],
  phase?: string
): Promise<string> {
  const sanitizedMessage = sanitizeInput(userMessage);

  logger.info("Generating consultant response", {
    userMessageLength: userMessage.length,
    sanitizedLength: sanitizedMessage.length,
    historyLength: conversationHistory.length,
    phase,
  });

  const systemPrompt = generateSystemPrompt(phase);

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...conversationHistory,
    { role: "user", content: sanitizedMessage },
  ];

  try {
    const response = await callOpenAI(messages);
    logger.info("Consultant response generated successfully", {
      responseLength: response.length,
      phase,
    });
    return response;
  } catch (error) {
    logger.error("Failed to generate consultant response", error instanceof Error ? error : null, {
      userMessageLength: userMessage.length,
      phase,
    });
    throw error;
  }
}

/**
 * Extract metadata from conversation using OpenAI
 * More sophisticated than pattern matching
 */
export async function extractMetadataWithLLM(
  userMessage: string,
  conversationHistory: ChatMessage[]
): Promise<Record<string, any>> {
  const sanitizedMessage = sanitizeInput(userMessage);

  logger.info("Extracting metadata with LLM", {
    userMessageLength: userMessage.length,
    sanitizedLength: sanitizedMessage.length,
    historyLength: conversationHistory.length,
  });

  const extractionPrompt = `You are an expert at analyzing interior design consultations and extracting structured information.

Analyze the user's message and extract relevant metadata. Return a JSON object with the following structure (only include fields that have clear information):

{
  "projectScope": {
    "type": "exploratory|small_refresh|single_room|multi_room|full_home",
    "rooms": ["room1", "room2"],
    "interventionLevel": "styling_refresh|makeover|renovation"
  },
  "room": {
    "primary": "room_type",
    "naturalLight": "poor|moderate|excellent",
    "currentIssues": ["issue1", "issue2"]
  },
  "goals": {
    "primary": "main goal",
    "emotionalOutcome": "desired feeling",
    "painPoints": ["pain1", "pain2"],
    "mustHaves": ["item1", "item2"]
  },
  "budget": {
    "range": "under_5k|5k_15k|15k_30k|over_30k",
    "comfortLevel": "comfortable|flexible|tight|not_shared"
  },
  "timeline": {
    "flexibility": "firm_deadline|flexible|no_rush",
    "drivers": ["driver1", "driver2"]
  },
  "lifestyle": {
    "hasChildren": boolean,
    "hasPets": boolean,
    "workFromHome": "full_time|part_time|never",
    "entertainingFrequency": "often|occasionally|rarely"
  },
  "constraints": {
    "ownership": "owned|rented",
    "architecturalConstraints": ["constraint1"]
  }
}

Only include fields where information is clear and obvious from the message.`;

  const messages: ChatMessage[] = [
    { role: "system", content: extractionPrompt },
    ...conversationHistory,
    { role: "user", content: sanitizedMessage },
  ];

  try {
    const response = await callOpenAI(messages);

    // Try to parse JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const metadata = JSON.parse(jsonMatch[0]);
      logger.info("Metadata extracted successfully", {
        extractedFields: Object.keys(metadata).length,
      });
      return metadata;
    }

    logger.warn("No JSON found in LLM metadata extraction response", {
      responseLength: response.length,
    });
    return {};
  } catch (error) {
    logger.error("Error extracting metadata with LLM", error instanceof Error ? error : null, {
      userMessageLength: userMessage.length,
      historyLength: conversationHistory.length,
    });
    return {};
  }
}
