/**
 * AI Interior Design Consultant - Consultation Data Types
 * Defines all metadata structures for information collected during consultation
 */

// ===== CORE MESSAGE TYPES =====
export interface ConsultationMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  extractedMetadata?: ExtractedMetadata;
}

// ===== METADATA EXTRACTION =====
/**
 * Metadata extracted from user messages
 * This is what gets classified and used downstream
 */
export interface ExtractedMetadata {
  projectScope?: ProjectScope;
  room?: RoomMetadata;
  goals?: GoalMetadata;
  budget?: BudgetMetadata;
  timeline?: TimelineMetadata;
  lifestyle?: LifestyleMetadata;
  constraints?: ConstraintMetadata;
  style?: StyleMetadata;
  functional?: FunctionalMetadata;
  confidence: number; // 0-1 confidence score for extraction
  rawKeywords: string[];
}

// ===== PROJECT SCOPE =====
export type ProjectScopeType = "exploratory" | "small_refresh" | "single_room" | "multi_room" | "full_home";

export interface ProjectScope {
  type: ProjectScopeType;
  rooms: string[];
  interventionLevel?: "styling_refresh" | "makeover" | "renovation";
  description?: string;
}

// ===== ROOM METADATA =====
export interface RoomMetadata {
  primary: string; // "living_room", "bedroom", "kitchen", etc.
  secondary?: string[];
  approximate_size?: string; // "small", "medium", "large"
  natural_light?: "poor" | "moderate" | "excellent";
  current_issues?: string[];
  existing_pieces?: FurnitureItem[];
}

export interface FurnitureItem {
  name: string;
  condition?: "excellent" | "good" | "fair" | "poor";
  must_keep: boolean;
  sentimental?: boolean;
}

// ===== GOAL METADATA =====
export interface GoalMetadata {
  primary: string; // "make it cozy", "modernize", "organize", etc.
  secondary?: string[];
  emotional_outcome?: string; // "peaceful", "energized", "organized", etc.
  success_definition?: string;
  pain_points?: string[];
  must_haves?: string[];
}

// ===== BUDGET METADATA =====
export interface BudgetMetadata {
  total?: number;
  currency?: string;
  range?: BudgetRange;
  comfort_level?: "comfortable" | "flexible" | "tight" | "not_shared";
  allocation?: {
    furniture?: number;
    lighting?: number;
    window_treatments?: number;
    decor?: number;
    labor?: number;
    contingency?: number;
  };
  priority?: "quality_pieces" | "complete_transformation" | "mixed_approach";
}

export type BudgetRange = "under_5k" | "5k_15k" | "15k_30k" | "over_30k";

// ===== TIMELINE METADATA =====
export interface TimelineMetadata {
  target_completion?: Date;
  flexibility?: "firm_deadline" | "flexible" | "no_rush";
  drivers?: string[]; // "hosting_event", "new_baby", "moving", etc.
  estimated_duration?: string; // "6-12 weeks", etc.
  phase_approach?: boolean; // true if they want to do it in phases
}

// ===== LIFESTYLE METADATA =====
export interface LifestyleMetadata {
  household_size?: number;
  children?: { count: number; ages: number[] };
  pets?: Pet[];
  work_from_home?: "full_time" | "part_time" | "never";
  entertaining_frequency?: "often" | "occasionally" | "rarely";
  cooking_habits?: "love_to_cook" | "minimal" | "moderate";
  mobility_considerations?: string[];
  allergies?: string[];
  cultural_background?: string;
}

export interface Pet {
  type: string; // "dog", "cat", "bird", etc.
  size?: "small" | "medium" | "large";
  behavior?: string; // "active", "calm", etc.
}

// ===== CONSTRAINT METADATA =====
export interface ConstraintMetadata {
  ownership?: "owned" | "rented";
  rental_restrictions?: string[];
  architectural_constraints?: string[];
  physical_limitations?: string[];
  delivery_constraints?: string[];
}

// ===== STYLE METADATA =====
/**
 * Note: Detailed visual style discovery is handled by Style Profiler agent
 * This is just initial style hints from conversation
 */
export interface StyleMetadata {
  style_hints?: string[]; // "modern", "cozy", "minimalist", etc.
  color_preferences?: string[];
  formality_level?: "casual" | "formal" | "mixed";
  display_preference?: "minimalist" | "eclectic" | "moderate";
  maintenance_preference?: "low_maintenance" | "willing_to_maintain" | "high_maintenance";
}

// ===== FUNCTIONAL METADATA =====
export interface FunctionalMetadata {
  primary_activities?: string[];
  secondary_activities?: string[];
  storage_needs?: string[];
  accessibility_needs?: string[];
  lighting_preferences?: string[];
}

// ===== CONSULTATION CONTEXT =====
/**
 * Complete consultation session
 * Aggregates all messages and extracted metadata
 */
export interface ConsultationContext {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  messages: ConsultationMessage[];
  phase: ConsultationPhase;
  userType: ProjectScopeType;

  // Aggregated metadata from all messages
  metadata: ExtractedMetadata;

  // Session tracking
  isActive: boolean;
  completionStatus: "not_started" | "in_progress" | "ready_for_style_profiler" | "completed";
  conversationQualityScore?: number;
}

export type ConsultationPhase = "intent_detection" | "scope_clarification" | "light_consultation" | "standard_consultation" | "synthesis";

// ===== CONSULTATION BRIEF (Output for other agents) =====
/**
 * Final output from consultation
 * This is what gets handed off to Style Profiler, Designer, etc.
 */
export interface ConsultationBrief {
  id: string;
  consultationId: string;
  clientName?: string;
  createdAt: Date;
  briefType: "minimal" | "standard" | "exploratory" | "partial";

  // Executive summary
  executiveSummary: string;

  // Structured data
  projectContext: {
    spark: string;
    goals: string[];
    emotionalOutcome: string;
    successDefinition: string;
  };

  functionalRequirements: {
    rooms: string[];
    primaryUsers: string;
    activities: string[];
    mustHaves: string[];
    existingPieces: FurnitureItem[];
    constraints: string[];
  };

  budget: {
    total?: number;
    range?: BudgetRange;
    allocation?: Record<string, number>;
    priorities: string[];
  };

  timeline: {
    targetDate?: Date;
    flexibility: string;
    drivers: string[];
  };

  lifestyle: {
    household: string;
    lifestyle_factors: string[];
    maintenance: string;
  };

  designHints: {
    styleDirections: string[];
    colorPreferences: string[];
    formality: string;
    displayPreference: string;
  };

  // Flags for design team
  missingInformation?: string[];
  redFlags?: string[];
  specialConsiderations?: string[];

  // Reference back to full data
  fullMetadata: ExtractedMetadata;
}

// ===== CONSULTATION STATISTICS =====
export interface ConsultationStats {
  totalMessages: number;
  userMessages: number;
  assistantMessages: number;
  averageUserMessageLength: number;
  extractionSuccessRate: number; // % of user messages with successful metadata extraction
  phaseDistribution: Record<ConsultationPhase, number>;
  conversationDuration: number; // in minutes
  questionsAsked: number;
}

// ===== ASSISTANT RESPONSE STRUCTURE =====
/**
 * Structured response from consultant assistant
 * Includes both conversational text and internal processing data
 */
export interface ConsultantResponse {
  id: string;
  conversationalMessage: string;
  nextPhase?: ConsultationPhase;
  suggestedFollowUp?: string;

  // Internal processing
  processingData?: {
    intentDetected?: ProjectScopeType;
    scopeClarity: "clear" | "emerging" | "vague";
    informationGaps?: string[];
    conversionSignals?: string[];
  };

  // For UI
  questionType?: "open_ended" | "multiple_choice" | "range_selection" | "free_text";
  suggestedAnswers?: string[];
}
