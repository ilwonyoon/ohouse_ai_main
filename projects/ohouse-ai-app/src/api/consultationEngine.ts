/**
 * Consultation Engine
 * Orchestrates the adaptive consultation flow based on Claude skill
 * Manages phase transitions, generates questions, and evaluates responses
 */

import {
  ConsultationPhase,
  ProjectScopeType,
  ExtractedMetadata,
  ConsultantResponse,
  ConsultationMessage,
} from "@/types/consultation";
import { extractMetadataFromMessage } from "./metadataExtractor";

// ===== QUESTION POOLS =====

type QuestionPool = Record<string, string[]>;

const INTENT_DETECTION_QUESTIONS: QuestionPool = {
  exploratory: [
    "What brings you here today?",
    "Are you just curious about what we can do, or are you thinking about a specific project?",
  ],
  needs_clarification: [
    "Tell me a bit more - are you thinking of a small refresh or a bigger transformation?",
    "Help me understand the scope - are we talking about one room or multiple spaces?",
  ],
};

const LIGHT_CONSULTATION_QUESTIONS: QuestionPool = {
  room: ["Which room are we refreshing?", "What space are we working with?"],
  pain_point: [
    "What's the main thing bothering you about it right now?",
    "What would you most like to change about this space?",
  ],
  feeling: [
    "How do you want it to feel when we're done?",
    "What's the vibe you're going for?",
  ],
  budget: [
    "What's comfortable for you to spend? Just a range is fine.",
    "Do you have a budget in mind? Even a rough idea helps.",
  ],
  keeping: [
    "Any furniture or big items you're definitely keeping?",
    "What pieces do you want to keep or work around?",
  ],
  timeline: [
    "Any rush, or is this whenever it comes together?",
    "Do you have a timeline in mind?",
  ],
  must_haves: [
    "Anything specific you know you want to add or change?",
    "Are there any must-haves for this space?",
  ],
};

const STANDARD_CONSULTATION_QUESTIONS: QuestionPool = {
  spark: [
    "What sparked your interest in redesigning this space? What made you decide 'now is the time'?",
    "Tell me about what's driving this project for you.",
  ],
  vision: [
    "When you imagine this space completed, how do you want to FEEL when you walk into it?",
    "What does your ideal version of this space feel like?",
  ],
  success: [
    "What would make this project a total success for you?",
    "What's the most important outcome for this project?",
  ],
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
  budget: [
    "Let's talk about budget - this helps me make sure I'm suggesting realistic options that you'll actually love.",
    "What's your budget range for this project?",
  ],
  lifestyle: [
    "Any pets or children we should consider?",
    "Tell me about your household - who lives there and any special considerations?",
  ],
  timeline: [
    "Do you have a target completion date or any flexibility?",
    "What's driving your timeline - is this flexible?",
  ],
  constraints: [
    "Are there any physical constraints - like odd windows, architectural features, or space limitations?",
    "Anything about the space that's fixed and we need to work around?",
  ],
};

const EXPLORATORY_HOOK_QUESTIONS: QuestionPool = {
  engagement: [
    "If you could wave a magic wand and transform any room in your home, which room would it be?",
    "What room do you think about most when you imagine improvements?",
  ],
  style: [
    "Want to see what your space could look like with different styles?",
    "Ready to see some inspiration? All I need is a quick photo and one word describing the vibe.",
  ],
};

// ===== CONSULTATION ENGINE =====

export class ConsultationEngine {
  currentPhase: ConsultationPhase = "intent_detection";
  userType: ProjectScopeType = "exploratory";
  questionsAsked = 0;
  lastExtractedMetadata: ExtractedMetadata | null = null;

  /**
   * Generate next question based on conversation state
   */
  async generateNextQuestion(
    previousMessages: ConsultationMessage[],
    currentMetadata: ExtractedMetadata,
    phase: ConsultationPhase
  ): Promise<ConsultantResponse> {
    // Update phase if needed
    this.currentPhase = phase;

    // Determine next question based on phase
    let question = "";
    let followUpContext = "";
    let nextPhase = phase;

    switch (phase) {
      case "intent_detection":
        question = await this.generateIntentDetectionQuestion(currentMetadata);
        // Check if we should move to next phase
        if (currentMetadata.projectScope) {
          nextPhase = this.determineNextPhase(currentMetadata.projectScope.type);
        }
        break;

      case "scope_clarification":
        question = await this.generateScopeQuestion(currentMetadata);
        break;

      case "light_consultation":
        question = await this.generateLightConsultationQuestion(currentMetadata);
        break;

      case "standard_consultation":
        question = await this.generateStandardConsultationQuestion(
          currentMetadata
        );
        break;

      case "synthesis":
        return this.generateSynthesisMessage(currentMetadata);

      default:
        question = "Tell me more about what you're looking for.";
    }

    this.questionsAsked++;

    return {
      id: `response_${Date.now()}`,
      conversationalMessage: question,
      nextPhase,
      processingData: {
        intentDetected: currentMetadata.projectScope?.type,
        scopeClarity: this.assessScopeClarity(currentMetadata),
        informationGaps: this.identifyInformationGaps(currentMetadata, phase),
      },
      questionType: "open_ended",
    };
  }

  /**
   * Process user response and extract metadata
   */
  async processUserResponse(
    userMessage: string,
    previousMetadata: ExtractedMetadata
  ): Promise<{
    metadata: ExtractedMetadata;
    conversionSignal?: string;
    shouldTransition?: boolean;
  }> {
    // Extract metadata from user message
    const newMetadata = await extractMetadataFromMessage(
      userMessage,
      previousMetadata
    );

    // Check for conversion signals if in exploratory mode
    let conversionSignal: string | undefined;
    if (this.userType === "exploratory") {
      conversionSignal = this.detectConversionSignal(userMessage);
    }

    // Determine if we should transition phases
    const shouldTransition =
      this.shouldMoveToNextPhase(newMetadata, this.currentPhase) ||
      conversionSignal !== undefined;

    return {
      metadata: newMetadata,
      conversionSignal,
      shouldTransition,
    };
  }

  /**
   * Evaluate if we have enough information to move to next phase
   */
  shouldMoveToNextPhase(
    metadata: ExtractedMetadata,
    currentPhase: ConsultationPhase
  ): boolean {
    switch (currentPhase) {
      case "intent_detection":
        return !!metadata.projectScope;

      case "scope_clarification":
        return !!metadata.projectScope && metadata.projectScope.type !== "exploratory";

      case "light_consultation":
        return (
          !!metadata.room &&
          !!metadata.goals &&
          (!!metadata.budget || this.questionsAsked >= 7)
        );

      case "standard_consultation":
        const hasEssentials =
          !!metadata.room &&
          !!metadata.goals &&
          !!metadata.budget &&
          !!metadata.timeline;
        return hasEssentials || this.questionsAsked >= 20;

      default:
        return false;
    }
  }

  /**
   * Determine next phase based on user type
   */
  determineNextPhase(userType: ProjectScopeType): ConsultationPhase {
    this.userType = userType;

    switch (userType) {
      case "exploratory":
        return "intent_detection"; // Stay in intent detection to engage
      case "small_refresh":
        return "light_consultation";
      case "single_room":
        return "light_consultation";
      case "multi_room":
      case "full_home":
        return "standard_consultation";
      default:
        return "scope_clarification";
    }
  }

  /**
   * Generate intent detection question
   */
  private async generateIntentDetectionQuestion(
    metadata: ExtractedMetadata
  ): Promise<string> {
    if (this.questionsAsked === 0) {
      return "Hi! Welcome! I'm here to help you create a space you'll love.\n\nWhat brings you here today?";
    }

    if (metadata.projectScope?.type === "exploratory") {
      // For explorers, use the magic wand question to engage
      return EXPLORATORY_HOOK_QUESTIONS.engagement[0];
    }

    // For needs clarification
    return INTENT_DETECTION_QUESTIONS.needs_clarification[0];
  }

  /**
   * Generate scope clarification question
   */
  private async generateScopeQuestion(
    metadata: ExtractedMetadata
  ): Promise<string> {
    return "Let me understand what you're envisioning:\n\nAre you thinking:\n1. Small refresh - new decor, maybe paint, keep most furniture\n2. Makeover - new furniture, change the look significantly\n3. Full renovation - everything new, maybe structural changes\n4. Not sure yet - just exploring ideas\n\nWhere does this fall?";
  }

  /**
   * Generate light consultation question
   */
  private async generateLightConsultationQuestion(
    metadata: ExtractedMetadata
  ): Promise<string> {
    // Determine which topic we haven't covered yet
    if (!metadata.room) {
      return LIGHT_CONSULTATION_QUESTIONS.room[0];
    }
    if (!metadata.goals?.pain_points || metadata.goals.pain_points.length === 0) {
      return LIGHT_CONSULTATION_QUESTIONS.pain_point[0];
    }
    if (!metadata.goals?.emotional_outcome) {
      return LIGHT_CONSULTATION_QUESTIONS.feeling[0];
    }
    if (!metadata.room?.existing_pieces) {
      return LIGHT_CONSULTATION_QUESTIONS.keeping[0];
    }
    if (!metadata.budget) {
      return LIGHT_CONSULTATION_QUESTIONS.budget[0];
    }
    if (!metadata.timeline) {
      return LIGHT_CONSULTATION_QUESTIONS.timeline[0];
    }
    if (!metadata.goals?.must_haves || metadata.goals.must_haves.length === 0) {
      return LIGHT_CONSULTATION_QUESTIONS.must_haves[0];
    }

    return "Great! I think I have what I need. Let's move forward!";
  }

  /**
   * Generate standard consultation question
   */
  private async generateStandardConsultationQuestion(
    metadata: ExtractedMetadata
  ): Promise<string> {
    // Determine which critical information we're missing
    if (!metadata.projectScope) {
      return STANDARD_CONSULTATION_QUESTIONS.spark[0];
    }
    if (!metadata.goals?.emotional_outcome) {
      return STANDARD_CONSULTATION_QUESTIONS.vision[0];
    }
    if (!metadata.goals?.success_definition) {
      return STANDARD_CONSULTATION_QUESTIONS.success[0];
    }
    if (!metadata.lifestyle?.household_size) {
      return STANDARD_CONSULTATION_QUESTIONS.users[0];
    }
    if (!metadata.functional?.primary_activities) {
      return STANDARD_CONSULTATION_QUESTIONS.activities[0];
    }
    if (!metadata.goals?.pain_points || metadata.goals.pain_points.length === 0) {
      return STANDARD_CONSULTATION_QUESTIONS.pain_points[0];
    }
    if (!metadata.goals?.must_haves || metadata.goals.must_haves.length === 0) {
      return STANDARD_CONSULTATION_QUESTIONS.must_haves[0];
    }
    if (!metadata.budget) {
      return STANDARD_CONSULTATION_QUESTIONS.budget[0];
    }
    if (!metadata.timeline) {
      return STANDARD_CONSULTATION_QUESTIONS.timeline[0];
    }
    if (!metadata.constraints) {
      return STANDARD_CONSULTATION_QUESTIONS.constraints[0];
    }

    return "Perfect! I think we have a solid foundation. Ready to move to the next step?";
  }

  /**
   * Generate final synthesis message
   */
  private generateSynthesisMessage(metadata: ExtractedMetadata): ConsultantResponse {
    return {
      id: `response_${Date.now()}`,
      conversationalMessage: `Perfect! I've gathered everything you've shared about your project. Now I'm going to connect you with our Style Profiler to explore your aesthetic preferences and design direction.

Once we combine this consultation with your style profile, our design team will have everything they need to create concepts that are both beautiful AND functional for your lifestyle.

Ready to explore styles? Let's make this space amazing! 🎨`,
      nextPhase: "completed",
      processingData: {
        scopeClarity: "clear",
      },
    };
  }

  /**
   * Detect conversion signals from exploratory users
   */
  private detectConversionSignal(message: string): string | undefined {
    const conversionPatterns = [
      /Actually|I do need help|my.*room|specific problem/i,
      /That looks great|Could you do that|How much would|asking.*question/i,
      /I'm thinking about|serious|actually.*project|want to.*do/i,
    ];

    if (conversionPatterns.some((p) => p.test(message))) {
      return "User showing interest in real project";
    }

    return undefined;
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
   * Identify information gaps for the design team
   */
  private identifyInformationGaps(
    metadata: ExtractedMetadata,
    phase: ConsultationPhase
  ): string[] {
    const gaps: string[] = [];

    if (phase === "light_consultation") {
      if (!metadata.room) gaps.push("Room type not specified");
      if (!metadata.goals) gaps.push("Goals/pain points unclear");
      if (!metadata.budget) gaps.push("Budget not discussed");
      if (!metadata.timeline) gaps.push("Timeline not established");
    } else if (phase === "standard_consultation") {
      if (!metadata.budget) gaps.push("Budget not discussed");
      if (!metadata.timeline) gaps.push("Timeline not established");
      if (!metadata.lifestyle) gaps.push("Lifestyle factors not explored");
      if (!metadata.constraints) gaps.push("Constraints not identified");
    }

    return gaps;
  }
}

// Export singleton instance
export const consultationEngine = new ConsultationEngine();
