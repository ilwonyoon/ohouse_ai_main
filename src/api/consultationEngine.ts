/**
 * Consultation Engine - SKILL.md Based Implementation
 * Orchestrates adaptive consultation flow with Phase-based architecture
 *
 * Based on Claude Interior Design Consultation Skill:
 * - Phase 0: Intent Detection
 * - Phase 1-A: Exploratory Mode (tire-kickers)
 * - Phase 1-B: Scope Clarification
 * - Phase 1-C: Light Consultation (5-8 questions)
 * - Phase 1-D: Standard Consultation (comprehensive)
 * - Phases 2-7: Detailed exploration (part of 1-D)
 * - Phase 8: Synthesis & Brief Preparation
 */

import {
  ConsultationPhase,
  ProjectScopeType,
  ExtractedMetadata,
  ConsultantResponse,
  ConsultationMessage,
  UserIntentType,
  ImageMetadata,
  VisionClarityLevel,
} from "@/types/consultation";
import { extractMetadataFromMessage } from "./metadataExtractor";
import { logger } from "@/lib/logger";

// ===== INTENT SIGNAL PATTERNS (Based on SKILL.md) =====

/**
 * Type A: Exploratory signals
 * Users who are "just looking" without immediate intent to change
 */
const INTENT_SIGNALS_TYPE_A = [
  /just\s+(curious|checking|looking|browsing)/i,
  /just\s+(trying|testing)\s+the\s+app/i,
  /saw.*ad|friend\s+told\s+me|found\s+you/i,
  /what\s+(does|can)\s+this\s+(do|app)/i,
  /let'?s\s+see|surprise\s+me|show\s+me/i,
  /don'?t\s+know|maybe\s+later|not\s+sure\s+yet/i,
  /just\s+exploring|gathering\s+ideas|get\s+inspiration/i,
];

/**
 * Type B: Vague interest signals
 * Users who mention a need but it's unclear/unfocused
 */
const INTENT_SIGNALS_TYPE_B = [
  /needs?\s+help|could\s+use\s+some\s+ideas/i,
  /feels?\s+outdated|looks?\s+tired|needs?\s+refresh/i,
  /room\s+mentioned\s+but\s+no\s+specifics/i,
  /thinking\s+about\s+it|considering|maybe\s+change/i,
  /not\s+sure\s+where\s+to\s+start|overwhelmed/i,
];

/**
 * Type C: Small Project signals
 * Users with specific, small-scope projects
 */
const INTENT_SIGNALS_TYPE_C = [
  /small\s+(refresh|update|change)/i,
  /new\s+(decor|paint|art|pillows|rug)/i,
  /(just|only|only\s+need)\s+(a\s+few|some)\s+(new\s+)?pieces?/i,
  /quick\s+(makeover|transformation|update)/i,
  /one\s+room|single\s+room/i,
  /budget\s+under|small\s+budget|not\s+much\s+to\s+spend/i,
];

/**
 * Type D: Large Project signals
 * Users with significant projects (multi-room, full home, renovations)
 */
const INTENT_SIGNALS_TYPE_D = [
  /multiple\s+rooms|several\s+rooms|whole\s+(apartment|space|home)/i,
  /(just\s+)?(moved|moving|new\s+place|new\s+house|bought|buying)/i,
  /renovation|remodel|full\s+makeover|starting\s+from\s+scratch/i,
  /(living\s+room|bedroom|kitchen).*\s+and\s+.*(living\s+room|bedroom|kitchen)/i,
  /entire\s+(house|home|place)|all\s+rooms/i,
  /significant\s+budget|serious\s+project|doing\s+this\s+right/i,
];

// ===== CONVERSION SIGNAL PATTERNS =====

/**
 * Signals that indicate user is moving from exploratory to committed
 * These suggest the user wants to actually DO the project
 */
const CONVERSION_SIGNALS = [
  /actually|yeah|yes.*need\s+help/i,
  /how\s+much.*cost|budget|pricing|investment/i,
  /my\s+\w+\s+has\s+\w+|my\s+room\s+is|my\s+space\s+is/i,
  /could\s+you\s+(do|make|create).*for\s+me|can\s+you\s+help/i,
  /what\s+(would|does).*cost|how\s+much\s+would/i,
  /serious\s+about\s+this|ready\s+to|let'?s\s+do\s+this/i,
  /process|timeline|when\s+can|how\s+long/i,
  /next\s+steps?|what'?s\s+the\s+process|how\s+does\s+this\s+work/i,
  /specific\s+questions?\s+about.*space/i,
];

// ===== PHASE REQUIREMENTS =====

/**
 * Define what information is essential vs optional for each phase
 */
const PHASE_REQUIREMENTS = {
  phase_1c_light_consultation: {
    essential: ["room", "pain_point", "feeling", "budget"],
    optional: ["keeping", "timeline", "must_haves"],
    maxQuestions: 8,
  },
  phase_1d_standard_consultation: {
    essential: [
      "room",
      "goals",
      "pain_points",
      "budget",
      "timeline",
      "lifestyle",
    ],
    optional: ["keeping", "constraints", "style"],
    maxQuestions: 25,
  },
};

// ===== QUESTION POOLS BASED ON SKILL.MD =====

type QuestionPool = Record<string, string[]>;

/**
 * Phase 0: Intent Detection
 * Universal opening to classify user intent
 */
const INTENT_DETECTION_QUESTIONS: QuestionPool = {
  opening: [
    "Hi! Welcome! I'm here to help you create a space you'll love.\n\nWhat brings you here today?",
    "Hey there! Excited to help with your space. What are you thinking about?",
  ],
  follow_up: [
    "Tell me a bit more - are you thinking of a small refresh or a bigger transformation?",
    "Help me understand what you're envisioning - are we talking about one room or multiple spaces?",
  ],
};

/**
 * Phase 1-A: Exploratory Mode
 * For tire-kickers: fun, visual, low-pressure
 */
const EXPLORATORY_MODE_QUESTIONS: QuestionPool = {
  room_magic_wand: [
    "If you could wave a magic wand and transform any room in your home, which room would it be?",
    "What room do you think about most when you imagine improvements?",
  ],
  visual_hook: [
    "Want to see what your space could look like with different styles?",
    "Ready to see some inspiration? All I need is a quick photo and one word describing the vibe you want.",
  ],
  conversion_check: [
    "Are you thinking about actually doing this for your space, or still just exploring ideas?",
    "Does this inspire you to actually tackle your space?",
  ],
};

/**
 * Phase 1-B: Scope Clarification
 * For vague interest: understand project scope
 */
const SCOPE_CLARIFICATION_QUESTIONS: QuestionPool = {
  scope_level: [
    "Let me understand what you're envisioning:\n\nAre you thinking:\n1. Small refresh - new decor, maybe paint, keep most furniture\n2. Makeover - new furniture, change the look significantly\n3. Full renovation - everything new, maybe structural changes\n4. Not sure yet - just exploring ideas\n\nWhere does this fall?",
  ],
  budget_sniff_test: [
    "Just to understand the scale - are we thinking hundreds of dollars or thousands?",
    "Ballpark-wise, are we working with a small budget or more to invest?",
  ],
};

/**
 * Phase 1-C: Light Consultation (5-8 questions)
 * For small refresh projects: quick, conversational
 */
const LIGHT_CONSULTATION_QUESTIONS: QuestionPool = {
  room: [
    "Which room are we refreshing?",
    "What space are we working with?",
  ],
  pain_point: [
    "What's the main thing that's bothering you about it right now?",
    "What would you most like to change about this space?",
  ],
  feeling: [
    "How do you want it to feel when we're done?",
    "What's the vibe you're going for? (Like cozy, modern, bright, organized?)",
  ],
  keeping: [
    "Any furniture or big items you're definitely keeping?",
    "What pieces do you want to keep or work around?",
  ],
  budget: [
    "What's comfortable for you to spend? Just a range is fine.",
    "Do you have a budget in mind? Even a rough idea helps. (No pressure if you're not sure yet!)",
  ],
  timeline: [
    "Any rush, or is this whenever it comes together?",
    "What's your timeline looking like?",
  ],
  must_haves: [
    "Anything specific you know you want to add or change?",
    "Are there any must-haves for this space?",
  ],
};

/**
 * Phase 1-D: Standard Consultation (15-25 questions)
 * For medium/large projects: comprehensive discovery
 */
const STANDARD_CONSULTATION_QUESTIONS: QuestionPool = {
  // Rapport building
  opening: [
    "Awesome! Let's make this happen. I'm going to ask you some questions to understand what you need - but don't worry if you don't have all the answers yet. We'll figure it out together.",
  ],

  // Phase 3: Project Context & Goals
  spark: [
    "What sparked your interest in redesigning this space? What made you decide 'now is the time'?",
    "Tell me about what's driving this project for you.",
  ],
  vision: [
    "When you imagine this space completed, how do you want to FEEL when you walk into it?",
    "What does your ideal version of this space feel like? (Like peaceful, energized, organized?)",
  ],
  success: [
    "What would make this project a total success for you?",
    "What's the most important outcome for this project?",
  ],

  // Phase 4: Functional Requirements
  users: [
    "Who will be using this space day-to-day?",
    "Who are the primary users of this space?",
  ],
  activities: [
    "What are the main activities happening in this space?",
    "How do you envision using this space day-to-day?",
  ],
  pain_points: [
    "What's not working about the space right now?",
    "What are the biggest pain points with the current setup?",
  ],
  must_haves: [
    "Is there anything the space absolutely MUST include?",
    "What are your non-negotiables for this space?",
  ],
  keeping: [
    "Are there any furniture pieces or items you want to keep or work around?",
    "What existing pieces do you want to incorporate?",
  ],

  // Phase 5: Budget Discovery
  budget: [
    "Let's talk about budget - this helps me make sure I'm suggesting realistic options that you'll actually love.",
    "What's your budget range for this project?",
  ],

  // Phase 6: Scope & Timeline
  timeline: [
    "Do you have a target completion date or any flexibility?",
    "What's driving your timeline - is this flexible or firm?",
  ],

  // Phase 7: Additional Discovery
  lifestyle: [
    "Any pets or children we should consider? They affect durability and maintenance needs.",
    "Tell me about your household - who lives there and any special considerations?",
  ],
  constraints: [
    "Are there any physical constraints - like odd windows, architectural features, or space limitations?",
    "Anything about the space that's fixed and we need to work around?",
  ],
};

/**
 * Synthesis and wrap-up messages
 */
const SYNTHESIS_MESSAGES: QuestionPool = {
  light_consultation_complete: [
    "Perfect! I have what I need. Let me connect you with our style profiler to nail down the aesthetic vibe, and then we'll show you some options.\n\nThis should be fun and easy - you'll see ideas in like 10 minutes. Sound good?",
  ],
  standard_consultation_complete: [
    "Perfect! I've gathered everything you've shared about your project. Now I'm going to connect you with our Style Profiler to explore your aesthetic preferences and design direction.\n\nOnce we combine this consultation with your style profile, our design team will have everything they need to create concepts that are both beautiful AND functional for your lifestyle.\n\nReady to explore styles? Let's make this space amazing! 🎨",
  ],
  exploratory_not_converted: [
    "Pretty cool, right? I'm here whenever you're ready to try it for your actual space. Just come back when you want to transform your space for real!\n\nWant me to save any of these examples for inspiration?",
  ],
};

// ===== HELPER FUNCTIONS =====

/**
 * Detect intent signals from user message text
 * Returns the detected intent type and confidence score
 */
/**
 * Enhanced intent signal detection with optional image metadata
 * S1.1: Supports both text-based and image-based intent classification
 */
function detectIntentSignals(
  message: string,
  imageMetadata?: ImageMetadata
): {
  type: UserIntentType;
  confidence: number;
  signals: string[];
  visionClarity: VisionClarityLevel;
} {
  const signals: string[] = [];

  // Text-based intent detection
  let typeD_matches = 0;
  INTENT_SIGNALS_TYPE_D.forEach((pattern) => {
    if (pattern.test(message)) {
      typeD_matches++;
      signals.push(`Type D signal: ${pattern.source}`);
    }
  });

  let typeC_matches = 0;
  INTENT_SIGNALS_TYPE_C.forEach((pattern) => {
    if (pattern.test(message)) {
      typeC_matches++;
      signals.push(`Type C signal: ${pattern.source}`);
    }
  });

  let typeB_matches = 0;
  INTENT_SIGNALS_TYPE_B.forEach((pattern) => {
    if (pattern.test(message)) {
      typeB_matches++;
      signals.push(`Type B signal: ${pattern.source}`);
    }
  });

  let typeA_matches = 0;
  INTENT_SIGNALS_TYPE_A.forEach((pattern) => {
    if (pattern.test(message)) {
      typeA_matches++;
      signals.push(`Type A signal: ${pattern.source}`);
    }
  });

  // Image-based intent enhancement (S1.1.2: Image metadata integration)
  let imageBasedType: UserIntentType | null = null;
  let imageConfidenceBoost = 0;

  if (imageMetadata) {
    // Infer intent from image indicators
    const hasSignificantIssues =
      imageMetadata.visible_issues &&
      imageMetadata.visible_issues.length > 0;
    const isCluttered = imageMetadata.clutter_level === "high";
    const hasPoorLighting =
      imageMetadata.lighting_level === "poor";

    if (
      hasSignificantIssues &&
      (isCluttered || hasPoorLighting)
    ) {
      // Multiple visual issues suggest project intent
      imageBasedType = "small_project";
      imageConfidenceBoost = 0.15;
      signals.push(
        `Image analysis: ${imageMetadata.visible_issues?.join(", ") || "issues detected"}`
      );
    } else if (hasSignificantIssues) {
      // Some issues indicate interest
      imageBasedType = "vague_interest";
      imageConfidenceBoost = 0.1;
    }

    // Log image metadata for debugging
    if (imageMetadata.room_type) {
      signals.push(`Image room type: ${imageMetadata.room_type}`);
    }
  }

  // Determine intent type and base confidence
  let finalType: UserIntentType = "exploratory";
  let baseConfidence = 0.3;

  if (typeD_matches >= 1) {
    finalType = "large_project";
    baseConfidence = 0.6 + typeD_matches * 0.15;
  } else if (typeC_matches >= 1) {
    finalType = "small_project";
    baseConfidence = 0.6 + typeC_matches * 0.15;
  } else if (typeB_matches >= 1) {
    finalType = "vague_interest";
    baseConfidence = 0.6 + typeB_matches * 0.15;
  } else if (typeA_matches >= 1) {
    finalType = "exploratory";
    baseConfidence = 0.6 + typeA_matches * 0.15;
  }

  // Apply image-based confidence boost if available
  let finalConfidence = Math.min(
    0.95,
    baseConfidence + imageConfidenceBoost
  );

  // Override type if image analysis strongly suggests different intent
  if (imageBasedType && typeA_matches > 0 && !typeD_matches && !typeC_matches) {
    finalType = imageBasedType;
  }

  // Calculate vision clarity (S1.1.2: Vision clarity scoring)
  const visionClarity = calculateVisionClarity(
    finalConfidence,
    signals.length,
    imageMetadata
  );

  return {
    type: finalType,
    confidence: finalConfidence,
    signals,
    visionClarity,
  };
}

/**
 * Calculate vision clarity score based on confidence, signal count, and image metadata
 * S1.1.2: Vision clarity scoring (clear | emerging | vague)
 */
function calculateVisionClarity(
  confidence: number,
  signalCount: number,
  imageMetadata?: ImageMetadata
): VisionClarityLevel {
  // Clear: High confidence + multiple signals + complete image metadata
  if (confidence >= 0.75) {
    if (imageMetadata && signalCount >= 2) {
      return "clear";
    }
    if (signalCount >= 3) {
      return "clear";
    }
  }

  // Emerging: Medium confidence + some signals
  if (confidence >= 0.5) {
    if (signalCount >= 2 || imageMetadata) {
      return "emerging";
    }
  }

  // Vague: Low confidence or few signals
  return "vague";
}

/**
 * Detect conversion signals in user message
 * These indicate a user wants to move from exploration to real project
 */
function detectConversionSignals(message: string): {
  hasSignal: boolean;
  signals: string[];
  suggestedPhase?: UserIntentType;
} {
  const detectedSignals: string[] = [];

  CONVERSION_SIGNALS.forEach((pattern) => {
    if (pattern.test(message)) {
      detectedSignals.push(pattern.source);
    }
  });

  if (detectedSignals.length > 0) {
    // If conversion detected, also check intent to suggest phase
    const intent = detectIntentSignals(message);
    return {
      hasSignal: true,
      signals: detectedSignals,
      suggestedPhase: intent.type,
    };
  }

  return {
    hasSignal: false,
    signals: [],
  };
}

/**
 * Get phase requirements (essential vs optional topics)
 */
function getPhaseRequirements(
  phase: ConsultationPhase
): { essential: string[]; optional: string[]; maxQuestions: number } {
  const requirements = PHASE_REQUIREMENTS[phase as keyof typeof PHASE_REQUIREMENTS];
  if (requirements) {
    return requirements;
  }
  return { essential: [], optional: [], maxQuestions: 20 };
}

// ===== CONSULTATION ENGINE =====

export class ConsultationEngine {
  currentPhase: ConsultationPhase = "phase_0_intent_detection";
  userIntent: UserIntentType = "exploratory";
  userType: ProjectScopeType = "exploratory";
  questionsAsked = 0;
  lastExtractedMetadata: ExtractedMetadata | null = null;
  answeredTopics: Set<string> = new Set();
  conversationCount = 0;

  /**
   * Reset engine for new consultation
   */
  reset() {
    this.currentPhase = "phase_0_intent_detection";
    this.userIntent = "exploratory";
    this.userType = "exploratory";
    this.questionsAsked = 0;
    this.answeredTopics.clear();
    this.conversationCount = 0;
    logger.info("Consultation engine reset");
  }

  /**
   * Main entry point: Generate next question based on conversation state
   */
  async generateNextQuestion(
    previousMessages: ConsultationMessage[],
    currentMetadata: ExtractedMetadata,
    phase: ConsultationPhase
  ): Promise<ConsultantResponse> {
    this.currentPhase = phase;
    this.conversationCount++;

    let question = "";
    let nextPhase = phase;

    logger.info("Generating next question", {
      currentPhase: phase,
      questionsAsked: this.questionsAsked,
      userIntent: this.userIntent,
    });

    // Extract last user message for intent detection in Phase 0
    const lastUserMessage = previousMessages
      .filter((m) => m.role === "user")
      .pop()?.content;

    switch (phase) {
      case "phase_0_intent_detection":
        ({ question, nextPhase } = this.generatePhase0Question(
          currentMetadata,
          lastUserMessage
        ));
        break;

      case "phase_1a_exploratory_mode":
        ({ question, nextPhase } = this.generatePhase1aQuestion(currentMetadata));
        break;

      case "phase_1b_scope_clarification":
        ({ question, nextPhase } = this.generatePhase1bQuestion(currentMetadata));
        break;

      case "phase_1c_light_consultation":
        ({ question, nextPhase } = this.generatePhase1cQuestion(currentMetadata));
        break;

      case "phase_1d_standard_consultation":
        ({ question, nextPhase } = this.generatePhase1dQuestion(currentMetadata));
        break;

      case "phase_8_synthesis":
        return this.generatePhase8Message(currentMetadata);

      default:
        question = "Tell me more about what you're looking for.";
    }

    this.questionsAsked++;

    return {
      id: `response_${Date.now()}`,
      conversationalMessage: question,
      nextPhase,
      processingData: {
        intentDetected: this.userIntent,
        scopeClarity: this.assessScopeClarity(currentMetadata),
        informationGaps: this.identifyInformationGaps(currentMetadata, phase),
      },
      questionType: "open_ended",
    };
  }

  /**
   * Phase 0: Intent Detection
   * Classify user in first 1-2 exchanges
   */
  private generatePhase0Question(
    metadata: ExtractedMetadata,
    userMessage?: string
  ): { question: string; nextPhase: ConsultationPhase } {
    if (this.questionsAsked === 0) {
      return {
        question: INTENT_DETECTION_QUESTIONS.opening[0],
        nextPhase: "phase_0_intent_detection",
      };
    }

    // Detect intent from first response (analyze message text + metadata)
    const intent = this.classifyUserIntent(metadata, userMessage);
    this.userIntent = intent;

    let nextPhase: ConsultationPhase;
    let question: string;

    switch (intent) {
      case "exploratory":
        nextPhase = "phase_1a_exploratory_mode";
        question = EXPLORATORY_MODE_QUESTIONS.room_magic_wand[0];
        break;

      case "vague_interest":
        nextPhase = "phase_1b_scope_clarification";
        question = SCOPE_CLARIFICATION_QUESTIONS.scope_level[0];
        break;

      case "small_project":
        nextPhase = "phase_1c_light_consultation";
        question = LIGHT_CONSULTATION_QUESTIONS.room[0];
        break;

      case "medium_project":
      case "large_project":
        nextPhase = "phase_1d_standard_consultation";
        question = STANDARD_CONSULTATION_QUESTIONS.spark[0];
        break;

      default:
        nextPhase = "phase_1b_scope_clarification";
        question = INTENT_DETECTION_QUESTIONS.follow_up[0];
    }

    logger.info("Intent detected", {
      intent,
      nextPhase,
    });

    return { question, nextPhase };
  }

  /**
   * Phase 1-A: Exploratory Mode
   * For tire-kickers: fun, visual, low-pressure
   */
  private generatePhase1aQuestion(
    metadata: ExtractedMetadata
  ): { question: string; nextPhase: ConsultationPhase } {
    // Check if conversion signal detected (move to proper phase)
    if (this.detectConversionSignal(metadata)) {
      const nextPhase = this.determineNextPhase(metadata.projectScope?.type || "small_refresh");
      return {
        question: "Oh awesome! So you're thinking about actually doing this for your space?\n\nI can totally help with that. Let me ask you a few quick questions so I can give you ideas that actually work for YOUR space and budget. Cool?",
        nextPhase,
      };
    }

    // Stay in exploratory mode
    if (!this.answeredTopics.has("room_selection")) {
      this.answeredTopics.add("room_selection");
      return {
        question: EXPLORATORY_MODE_QUESTIONS.room_magic_wand[
          Math.floor(Math.random() * EXPLORATORY_MODE_QUESTIONS.room_magic_wand.length)
        ],
        nextPhase: "phase_1a_exploratory_mode",
      };
    }

    if (!this.answeredTopics.has("visual_hook")) {
      this.answeredTopics.add("visual_hook");
      return {
        question: EXPLORATORY_MODE_QUESTIONS.visual_hook[0],
        nextPhase: "phase_1a_exploratory_mode",
      };
    }

    // After showing visuals, ask about conversion
    return {
      question: EXPLORATORY_MODE_QUESTIONS.conversion_check[0],
      nextPhase: "phase_1a_exploratory_mode",
    };
  }

  /**
   * Phase 1-B: Scope Clarification
   * For vague interest: understand project scope
   */
  private generatePhase1bQuestion(
    metadata: ExtractedMetadata
  ): { question: string; nextPhase: ConsultationPhase } {
    if (!this.answeredTopics.has("scope")) {
      this.answeredTopics.add("scope");
      return {
        question: SCOPE_CLARIFICATION_QUESTIONS.scope_level[0],
        nextPhase: "phase_1b_scope_clarification",
      };
    }

    // Determine next phase based on scope
    const scopeType = metadata.projectScope?.type || "small_refresh";
    const nextPhase = this.determineNextPhase(scopeType);

    return {
      question: "Got it! Let me ask you a few questions so I can give you the best ideas.",
      nextPhase,
    };
  }

  /**
   * Phase 1-C: Light Consultation (5-8 questions only)
   * For small refresh projects
   */
  private generatePhase1cQuestion(
    _metadata: ExtractedMetadata
  ): { question: string; nextPhase: ConsultationPhase } {
    // Get next unanswered topic
    const topicOrder = ["room", "pain_point", "feeling", "keeping", "budget", "timeline", "must_haves"];

    for (const topic of topicOrder) {
      if (!this.answeredTopics.has(topic)) {
        this.answeredTopics.add(topic);
        const questions = LIGHT_CONSULTATION_QUESTIONS[topic as keyof typeof LIGHT_CONSULTATION_QUESTIONS];
        return {
          question: questions[0],
          nextPhase: "phase_1c_light_consultation",
        };
      }
    }

    // All questions answered or 7+ questions asked
    return {
      question: SYNTHESIS_MESSAGES.light_consultation_complete[0],
      nextPhase: "phase_8_synthesis",
    };
  }

  /**
   * Phase 1-D: Standard Consultation (15-25 questions)
   * For medium/large projects: comprehensive discovery
   */
  private generatePhase1dQuestion(
    _metadata: ExtractedMetadata
  ): { question: string; nextPhase: ConsultationPhase } {
    // Essential questions that must be asked
    const essentialTopics = [
      "spark",
      "vision",
      "success",
      "users",
      "activities",
      "pain_points",
      "must_haves",
      "budget",
      "timeline",
    ];

    // Ask essential questions first
    for (const topic of essentialTopics) {
      if (!this.answeredTopics.has(topic)) {
        this.answeredTopics.add(topic);
        const questions = STANDARD_CONSULTATION_QUESTIONS[topic as keyof typeof STANDARD_CONSULTATION_QUESTIONS];
        return {
          question: questions[0],
          nextPhase: "phase_1d_standard_consultation",
        };
      }
    }

    // Optional questions (ask if engagement level high)
    if (this.questionsAsked < 15) {
      const optionalTopics = ["keeping", "lifestyle", "constraints"];
      for (const topic of optionalTopics) {
        if (!this.answeredTopics.has(topic)) {
          this.answeredTopics.add(topic);
          const questions = STANDARD_CONSULTATION_QUESTIONS[topic as keyof typeof STANDARD_CONSULTATION_QUESTIONS];
          return {
            question: questions[0],
            nextPhase: "phase_1d_standard_consultation",
          };
        }
      }
    }

    // All essentials covered, move to synthesis
    return {
      question: SYNTHESIS_MESSAGES.standard_consultation_complete[0],
      nextPhase: "phase_8_synthesis",
    };
  }

  /**
   * Phase 8: Synthesis & Brief Preparation
   */
  private generatePhase8Message(_metadata: ExtractedMetadata): ConsultantResponse {
    return {
      id: `response_${Date.now()}`,
      conversationalMessage: SYNTHESIS_MESSAGES.standard_consultation_complete[0],
      nextPhase: "phase_8_synthesis",
      processingData: {
        scopeClarity: "clear",
      },
    };
  }

  /**
   * Process user response and extract metadata
   */
  async processUserResponse(
    userMessage: string,
    previousMetadata: ExtractedMetadata,
    currentPhase: ConsultationPhase
  ): Promise<{
    metadata: ExtractedMetadata;
    conversionSignal?: string;
    shouldTransition?: boolean;
  }> {
    const newMetadata = await extractMetadataFromMessage(
      userMessage,
      previousMetadata
    );

    // Check for conversion signals in exploratory mode
    let conversionSignal: string | undefined;
    if (this.userIntent === "exploratory" && currentPhase === "phase_1a_exploratory_mode") {
      conversionSignal = this.detectConversionSignal(newMetadata);
      if (conversionSignal) {
        logger.info("Conversion signal detected", { signal: conversionSignal });
      }
    }

    // Determine if we should transition phases
    const shouldTransition =
      this.shouldMoveToNextPhase(newMetadata, currentPhase) ||
      conversionSignal !== undefined;

    return {
      metadata: newMetadata,
      conversionSignal,
      shouldTransition,
    };
  }

  /**
   * Classify user intent from first response
   * Now analyzes both message text and extracted metadata
   */
  classifyUserIntent(
    metadata: ExtractedMetadata,
    userMessage?: string
  ): UserIntentType {
    // First, try text-based intent detection if message provided
    if (userMessage) {
      const textIntent = detectIntentSignals(userMessage);
      logger.info("Text-based intent detection", {
        type: textIntent.type,
        confidence: textIntent.confidence,
        signals: textIntent.signals,
      });

      // If confidence is moderate to high, use text-based detection
      if (textIntent.confidence >= 0.5) {
        return textIntent.type;
      }
    }

    // Fall back to metadata-based detection
    if (metadata.projectScope?.type === "exploratory") {
      return "exploratory";
    }

    if (
      metadata.projectScope?.type === "small_refresh" ||
      metadata.projectScope?.type === "single_room"
    ) {
      return "small_project";
    }

    if (metadata.projectScope?.type === "multi_room") {
      return "medium_project";
    }

    if (metadata.projectScope?.type === "full_home") {
      return "large_project";
    }

    // Vague if room mentioned but scope unclear
    if (metadata.room && !metadata.projectScope) {
      return "vague_interest";
    }

    return "exploratory";
  }

  /**
   * Detect conversion signals from exploratory users
   * Signals that user wants to move from exploration to real project
   */
  private detectConversionSignal(metadata: ExtractedMetadata): string | undefined {
    // Check if metadata suddenly shows project scope
    if (metadata.projectScope && metadata.projectScope.type !== "exploratory") {
      return "User showing project scope";
    }

    // Check for pain points or specific needs
    if (metadata.goals?.pain_points && metadata.goals.pain_points.length > 0) {
      return "User mentioned specific problems";
    }

    return undefined;
  }

  /**
   * Evaluate if we have enough information to move to next phase
   */
  shouldMoveToNextPhase(
    metadata: ExtractedMetadata,
    currentPhase: ConsultationPhase
  ): boolean {
    switch (currentPhase) {
      case "phase_0_intent_detection":
        return !!metadata.projectScope;

      case "phase_1b_scope_clarification":
        return (
          !!metadata.projectScope && metadata.projectScope.type !== "exploratory"
        );

      case "phase_1c_light_consultation":
        return (
          !!metadata.room &&
          !!metadata.goals &&
          (!!metadata.budget || this.questionsAsked >= 7)
        );

      case "phase_1d_standard_consultation":
        const hasEssentials =
          !!metadata.room &&
          !!metadata.goals &&
          !!metadata.budget &&
          !!metadata.timeline;
        return hasEssentials || this.questionsAsked >= 15;

      default:
        return false;
    }
  }

  /**
   * Determine next phase based on multiple factors
   * Consider: current phase, user type, metadata, answered topics
   */
  determineNextPhase(
    scopeType: ProjectScopeType,
    currentPhase?: ConsultationPhase,
    _metadata?: ExtractedMetadata
  ): ConsultationPhase {
    this.userType = scopeType;

    // If called with current phase, allow phase-aware transitions
    if (currentPhase) {
      // If already in a light or standard consultation, continue in that phase
      if (
        currentPhase === "phase_1c_light_consultation" ||
        currentPhase === "phase_1d_standard_consultation"
      ) {
        return currentPhase;
      }
    }

    // Base routing by scope type
    switch (scopeType) {
      case "exploratory":
        return "phase_1a_exploratory_mode";
      case "small_refresh":
      case "single_room":
        return "phase_1c_light_consultation";
      case "multi_room":
      case "full_home":
        return "phase_1d_standard_consultation";
      default:
        return "phase_1b_scope_clarification";
    }
  }

  /**
   * Determine if we should auto-transition to next phase
   * Based on answered topics, question count, and phase requirements
   */
  shouldAutoTransitionPhase(
    currentPhase: ConsultationPhase,
    metadata: ExtractedMetadata
  ): { shouldTransition: boolean; nextPhase?: ConsultationPhase } {
    const requirements = getPhaseRequirements(currentPhase);

    // Check if all essential topics are answered
    let essentialAnswered = 0;
    for (const topic of requirements.essential) {
      if (
        this.answeredTopics.has(topic) ||
        (metadata && this.hasMetadataForTopic(metadata, topic))
      ) {
        essentialAnswered++;
      }
    }

    const allEssentialsAnswered =
      essentialAnswered >= requirements.essential.length;

    // Check question limit
    const reachedMaxQuestions =
      this.questionsAsked >= requirements.maxQuestions;

    // Determine auto-transition
    const shouldTransition =
      (allEssentialsAnswered && this.questionsAsked >= 5) ||
      reachedMaxQuestions;

    if (!shouldTransition) {
      return { shouldTransition: false };
    }

    // Determine next phase
    let nextPhase: ConsultationPhase = "phase_8_synthesis";

    if (currentPhase === "phase_1c_light_consultation") {
      nextPhase = "phase_8_synthesis";
    } else if (currentPhase === "phase_1d_standard_consultation") {
      nextPhase = "phase_8_synthesis";
    }

    logger.info("Auto-transition triggered", {
      currentPhase,
      nextPhase,
      questionsAsked: this.questionsAsked,
      essentialAnswered,
    });

    return { shouldTransition: true, nextPhase };
  }

  /**
   * Helper: Check if metadata contains information for a topic
   */
  private hasMetadataForTopic(metadata: ExtractedMetadata, topic: string): boolean {
    switch (topic) {
      case "room":
        return !!metadata.room;
      case "pain_point":
      case "pain_points":
        return !!(metadata.goals?.pain_points && metadata.goals.pain_points.length > 0);
      case "feeling":
        return !!metadata.goals?.emotional_outcome;
      case "keeping":
        return !!metadata.goals?.must_haves && metadata.goals.must_haves.length > 0;
      case "budget":
        return !!metadata.budget;
      case "timeline":
        return !!metadata.timeline;
      case "must_haves":
        return !!metadata.goals?.must_haves && metadata.goals.must_haves.length > 0;
      case "goals":
        return !!metadata.goals;
      case "lifestyle":
        return !!metadata.lifestyle;
      case "constraints":
        return !!metadata.constraints;
      case "style":
        return !!metadata.style;
      default:
        return false;
    }
  }

  /**
   * Assess how clear the scope is
   */
  private assessScopeClarity(
    metadata: ExtractedMetadata
  ): "clear" | "emerging" | "vague" {
    if (metadata.projectScope && metadata.room && metadata.goals) {
      return "clear";
    }
    if (metadata.projectScope || metadata.room) {
      return "emerging";
    }
    return "vague";
  }

  /**
   * Identify information gaps for design team
   */
  private identifyInformationGaps(
    metadata: ExtractedMetadata,
    phase: ConsultationPhase
  ): string[] {
    const gaps: string[] = [];

    if (
      phase === "phase_1c_light_consultation" ||
      phase.includes("1c")
    ) {
      if (!metadata.room) gaps.push("Room type not specified");
      if (!metadata.goals?.pain_points) gaps.push("Goals/pain points unclear");
      if (!metadata.budget) gaps.push("Budget not discussed");
      if (!metadata.timeline) gaps.push("Timeline not established");
    } else if (
      phase === "phase_1d_standard_consultation" ||
      phase.includes("1d")
    ) {
      if (!metadata.projectScope) gaps.push("Project scope unclear");
      if (!metadata.lifestyle) gaps.push("Lifestyle factors not explored");
      if (!metadata.constraints) gaps.push("Constraints not identified");
    }

    return gaps;
  }
}

// Export singleton instance
export const consultationEngine = new ConsultationEngine();

// Export helper functions for testing and external use
export {
  detectIntentSignals,
  detectConversionSignals,
  getPhaseRequirements,
  calculateVisionClarity,
};
