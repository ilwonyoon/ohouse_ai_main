/**
 * OpenAI API Integration
 * Connects to OpenAI ChatGPT for sophisticated consultation
 */

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

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
}

/**
 * Call OpenAI ChatGPT API
 */
export async function callOpenAI(messages: ChatMessage[]): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is not configured. Please add it to .env.local"
    );
  }

  try {
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

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `OpenAI API error: ${error.error?.message || response.statusText}`
      );
    }

    const data: OpenAIResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw error;
  }
}

/**
 * Generate response using OpenAI for consultation
 */
export async function generateConsultantResponse(
  userMessage: string,
  conversationHistory: ChatMessage[]
): Promise<string> {
  const systemPrompt = `You are an expert interior design consultant AI. Your role is to conduct adaptive initial consultations for interior design projects.

Your consultation style:
- Be warm, conversational, and professional
- Ask one question at a time
- Adapt to the user's project scope (exploratory vs committed buyer)
- Never pressure the user, respect "I don't know" responses
- For exploratory users, make it fun and visual
- For committed buyers, be thorough and professional

Current conversation context:
You should adapt your questions based on what you've already learned about:
- The room or space being redesigned
- The user's goals and pain points
- Budget considerations
- Timeline expectations
- Lifestyle factors (kids, pets, work from home, etc.)
- Any constraints they mention

When you detect a conversation is complete, let them know you have enough information and what happens next.`;

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...conversationHistory,
    { role: "user", content: userMessage },
  ];

  return callOpenAI(messages);
}

/**
 * Extract metadata from conversation using OpenAI
 * More sophisticated than pattern matching
 */
export async function extractMetadataWithLLM(
  userMessage: string,
  conversationHistory: ChatMessage[]
): Promise<Record<string, any>> {
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
    { role: "user", content: userMessage },
  ];

  try {
    const response = await callOpenAI(messages);

    // Try to parse JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return {};
  } catch (error) {
    console.error("Error extracting metadata:", error);
    return {};
  }
}
