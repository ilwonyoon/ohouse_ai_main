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
  imageMetadata?: ImageMetadata;
  confidence: number; // 0-1 confidence score for extraction
  rawKeywords: string[];
}

/**
 * Image-extracted metadata for visual analysis
 * Used to enhance intent classification with visual context
 */
export interface ImageMetadata {
  room_type?: string; // "living_room", "bedroom", "kitchen", etc.
  color_palette?: string[]; // Dominant colors (hex codes)
  lighting_level?: "poor" | "moderate" | "excellent";
  clutter_level?: "high" | "medium" | "low";
  estimated_size?: "small" | "medium" | "large";
  visible_issues?: string[]; // "dated", "cluttered", "dark", etc.
  furniture_count?: number;
  style_indicators?: string[]; // "modern", "vintage", "minimalist", etc.
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

// Phase system based on Claude skill
export type ConsultationPhase =
  | "phase_0_intent_detection"          // Detect user intent and classify
  | "phase_1a_exploratory_mode"         // For tire-kickers: fun, visual, low-pressure
  | "phase_1b_scope_clarification"      // Understand project scope
  | "phase_1c_light_consultation"       // Small refresh projects (5-8 questions)
  | "phase_1d_standard_consultation"    // Medium/large projects (comprehensive)
  | "phase_2_rapport_building"          // (Part of standard)
  | "phase_3_project_context"           // (Part of standard)
  | "phase_4_functional_requirements"   // (Part of standard)
  | "phase_5_budget_discovery"          // (Part of standard)
  | "phase_6_scope_timeline"            // (Part of standard)
  | "phase_7_additional_discovery"      // (Part of standard)
  | "phase_8_synthesis";                // Prepare brief, confirm understanding

// User classification for intent detection
export type UserIntentType =
  | "exploratory"           // Just curious, no real project
  | "vague_interest"        // Mentions room but unclear scope
  | "small_project"         // Clear small scope (refresh)
  | "medium_project"        // Medium scope (makeover)
  | "large_project";        // Large scope (renovation, full home)

// Vision clarity level for intent scoring
export type VisionClarityLevel = "clear" | "emerging" | "vague";

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
 * Option for multiple choice, range selection, etc.
 */
export interface AnswerOption {
  id: string;
  label: string;
  description?: string;
  nextPhaseIfSelected?: ConsultationPhase;
}

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
    intentDetected?: UserIntentType;
    scopeClarity: "clear" | "emerging" | "vague";
    informationGaps?: string[];
    conversionSignals?: string[];
  };

  // For UI - Question format hints
  questionType?: "open_ended" | "multiple_choice" | "range_selection" | "free_text";
  suggestedAnswers?: string[];
  answerOptions?: AnswerOption[];
}

// ===== CONTEXT FORM SCHEMA (Agent 1.2) =====
/**
 * Form-based context collection for structured data gathering
 * Alternative to open-ended conversation for faster context buildup
 */
export interface ContextFormField {
  id: string;
  label: string;
  type: "text" | "number" | "checkbox" | "radio" | "select" | "range" | "date" | "textarea";
  placeholder?: string;
  description?: string;
  required?: boolean;
  optional?: boolean;
  options?: Array<{
    id: string;
    label: string;
    description?: string;
  }>;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    customValidator?: (value: any) => boolean;
  };
  helpText?: string;
}

export interface ContextFormSection {
  id: string;
  title: string;
  description: string;
  icon?: string;
  fields: ContextFormField[];
  estimatedTime?: string; // "2 minutes", "5 minutes", etc.
  optional?: boolean;
}

export interface ContextFormSchema {
  id: string;
  version: string;
  title: string;
  description: string;
  sections: ContextFormSection[];
  completionStrategy: "all_sections" | "adaptive" | "required_only";
  estimatedTotalTime?: string;
}

export interface ContextFormResponse {
  formId: string;
  userId: string;
  submittedAt: Date;
  values: Record<string, any>;
  completedSections: string[];
  extractedMetadata: Partial<ExtractedMetadata>;
}

// ===== IMAGE ANALYSIS SCHEMA (Agent 1.3) =====
/**
 * Complete image analysis result from vision API
 * Comprehensive visual metadata extracted from room image
 */
export interface ImageAnalysisResult {
  id: string;
  userId: string;
  uploadedAt: Date;
  processedAt: Date;

  // Image metadata
  imageUrl?: string;
  imageHash?: string; // For deduplication
  imageSize: {
    width: number;
    height: number;
  };

  // Primary analysis results
  roomAnalysis: RoomAnalysis;
  visualAnalysis: VisualAnalysis;
  styleAnalysis: StyleAnalysis;
  issueAnalysis: IssueAnalysis;

  // Confidence & metadata
  confidence: number; // 0-1 overall confidence
  processingTime: number; // milliseconds
  analysisModel: string; // "claude-3-5-sonnet", "gpt-4-vision", etc.

  // Raw response for debugging
  rawAnalysis?: string;

  // Extracted metadata for integration
  extractedMetadata: Partial<ExtractedMetadata>;
}

/**
 * Room identification and basic characteristics
 */
export interface RoomAnalysis {
  // Primary room type
  roomType: RoomType;
  confidence: number; // Confidence in room type detection

  // Alternative room types (in case of ambiguity)
  alternativeTypes?: RoomType[];

  // Estimated dimensions
  estimatedSize: {
    category: "small" | "medium" | "large"; // Visual assessment
    estimatedSqFt?: number; // If detectable
    description: string; // "Compact studio apartment" etc.
  };

  // Space characteristics
  characteristics: {
    openLayout: boolean;
    multiLevel: boolean;
    hasWindows: number; // Count of visible windows
    hasNaturalLight: "poor" | "moderate" | "excellent";
    ceilingHeight: "low" | "standard" | "high" | "cathedral";
    wallCondition: "pristine" | "good" | "fair" | "poor";
  };

  // Architectural features
  features: {
    fireplaces?: number;
    builtin_shelving?: boolean;
    archways?: number;
    columns?: number;
    sloped_ceilings?: boolean;
    exposed_beams?: boolean;
    unusual_angles?: boolean;
    other?: string[];
  };
}

export type RoomType =
  | "living_room"
  | "bedroom"
  | "kitchen"
  | "bathroom"
  | "dining_room"
  | "home_office"
  | "entryway"
  | "hallway"
  | "laundry_room"
  | "garage"
  | "nursery"
  | "home_gym"
  | "studio"
  | "other";

/**
 * Visual characteristics: colors, lighting, textures
 */
export interface VisualAnalysis {
  // Dominant colors
  colorPalette: {
    dominant: ColorInfo[];
    secondary: ColorInfo[];
    accents: ColorInfo[];
  };

  // Lighting assessment
  lighting: {
    naturalLight: "poor" | "moderate" | "excellent";
    artificialLight: LightingType[];
    overallBrightness: "dim" | "moderate" | "bright";
    shadowPatterns: string; // "strong shadows", "even distribution", etc.
    timeOfDay: "morning" | "midday" | "evening" | "night" | "unknown";
  };

  // Surface materials visible
  materials: {
    flooring: FlooringType[];
    walls: WallType[];
    ceiling: CeilingType[];
    furniture_materials?: MaterialType[];
  };

  // Texture and finish
  textureProfile: {
    glossy: boolean;
    matte: boolean;
    smooth: boolean;
    textured: boolean;
    wood_grain: boolean;
    patterns: string[]; // "stripes", "geometric", "floral", etc.
  };
}

export interface ColorInfo {
  name: string; // "sage green", "warm white", etc.
  hex: string; // "#2D5016"
  rgb?: { r: number; g: number; b: number };
  percentageOfVisible: number; // 0-100
  location?: string; // "walls", "furniture", "accents", etc.
}

export type LightingType =
  | "recessed_lights"
  | "pendant_lights"
  | "track_lighting"
  | "floor_lamp"
  | "table_lamp"
  | "chandelier"
  | "wall_sconce"
  | "natural_light"
  | "string_lights"
  | "other";

export type FlooringType =
  | "hardwood"
  | "laminate"
  | "vinyl"
  | "carpet"
  | "tile"
  | "concrete"
  | "stone"
  | "area_rug"
  | "mixed";

export type WallType =
  | "painted"
  | "wallpaper"
  | "shiplap"
  | "exposed_brick"
  | "concrete"
  | "wood_paneling"
  | "tile"
  | "stone";

export type CeilingType =
  | "drywall"
  | "popcorn"
  | "tin"
  | "wooden_beams"
  | "cathedral"
  | "tray";

export type MaterialType =
  | "wood"
  | "metal"
  | "upholstered"
  | "leather"
  | "glass"
  | "plastic"
  | "stone"
  | "concrete"
  | "fabric";

/**
 * Style indicators and design direction
 */
export interface StyleAnalysis {
  // Primary style detected
  primaryStyle: StyleCategory;
  confidence: number;

  // Supporting styles
  secondaryStyles: StyleCategory[];

  // Style characteristics
  characteristics: {
    formality: "casual" | "formal" | "mixed";
    eclecticism: "minimalist" | "moderate" | "eclectic";
    era: string; // "1980s-inspired", "contemporary", "timeless", etc.
    mood: string[]; // "cozy", "energetic", "sophisticated", etc.
  };

  // Design elements observed
  designElements: {
    decorativeObjects: number;
    artwork: number;
    plants: number;
    mirrors: number;
    textiles: number;
    patterns: boolean;
    symmetry: "symmetric" | "asymmetric" | "mixed";
  };

  // Trends observed
  trendIndicators: string[]; // "minimalism", "sustainable", "vintage", etc.
}

export type StyleCategory =
  | "modern"
  | "contemporary"
  | "traditional"
  | "transitional"
  | "rustic"
  | "farmhouse"
  | "scandinavian"
  | "industrial"
  | "bohemian"
  | "eclectic"
  | "minimalist"
  | "maximalist"
  | "mid_century_modern"
  | "victorian"
  | "coastal"
  | "southwest"
  | "asian_inspired"
  | "art_deco"
  | "glam"
  | "gothic"
  | "other";

/**
 * Design issues and improvement opportunities
 */
export interface IssueAnalysis {
  // Current issues identified
  visibleIssues: {
    issue: string;
    severity: "minor" | "moderate" | "major";
    category: IssueCategoryType;
    description: string;
  }[];

  // Opportunities
  opportunities: {
    opportunity: string;
    priority: "high" | "medium" | "low";
    category: OpportunityCategoryType;
    estimatedImpact: string; // "high", "medium", "low"
  }[];

  // Quick wins (easy improvements)
  quickWins: string[];

  // Challenges & constraints
  challenges: {
    challenge: string;
    description: string;
    severity: "minor" | "moderate" | "major";
  }[];

  // Overall assessment
  assessment: {
    clutterLevel: "low" | "moderate" | "high";
    organizationLevel: "organized" | "somewhat_organized" | "disorganized";
    lightingAdequacy: "insufficient" | "adequate" | "excellent";
    functionalityGaps: string[];
    designCoherence: "cohesive" | "somewhat_cohesive" | "fragmented";
  };
}

export type IssueCategoryType =
  | "lighting"
  | "clutter"
  | "color_clash"
  | "poor_condition"
  | "dated_style"
  | "space_utilization"
  | "storage"
  | "traffic_flow"
  | "proportion"
  | "functionality";

export type OpportunityCategoryType =
  | "color_refresh"
  | "lighting_upgrade"
  | "furniture_replacement"
  | "storage_solution"
  | "art_decor"
  | "accent_pieces"
  | "flooring"
  | "wall_treatment"
  | "window_treatment"
  | "style_cohesion"
  | "functionality";

/**
 * Aggregated visual metadata
 * Extends the existing ImageMetadata interface
 */
export interface EnhancedImageMetadata extends ImageMetadata {
  // From ImageMetadata (already exists):
  // room_type, color_palette, lighting_level, clutter_level, estimated_size
  // visible_issues, furniture_count, style_indicators

  // Additional analysis
  imageAnalysisId?: string;
  dominantColorHex?: string;
  colorTemperature?: "warm" | "cool" | "neutral";
  primaryStyle?: StyleCategory;
  qualityScore?: number; // 0-100: How clear/useful is the image
  designReadiness?: "needs_work" | "functional" | "well_designed" | "designer_level";
}

// ===== STYLE QUIZ SCHEMA (Agent 1.4) =====
/**
 * Style quiz for learning user visual preferences
 * "This or that" image pairing questions
 */
export interface StyleQuizImage {
  id: string;
  style: StyleCategory;
  secondaryStyles?: StyleCategory[];
  room_type?: string;
  colors: string[];
  description: string;
  filename: string;
  alt_text: string;
}

export interface StyleQuizQuestion {
  id: string;
  question: string;
  description?: string;
  imageA: StyleQuizImage;
  imageB: StyleQuizImage;
  category?: "overall" | "color" | "material" | "furniture" | "lighting" | "room_specific";
  difficulty?: "easy" | "medium" | "hard";
  weight?: number; // Default 1
  room_type?: string; // If room-specific question
}

export interface StyleQuizResponse {
  questionId: string;
  chosenImageId: "imageA" | "imageB";
  responseTime: number; // milliseconds
  timestamp: Date;
}

export interface StyleQuizSession {
  id: string;
  userId: string;
  startedAt: Date;
  completedAt?: Date;
  currentQuestionIndex: number;
  totalQuestions: number;
  responses: StyleQuizResponse[];
  extractedMetadata?: Partial<ExtractedMetadata>;
}

export interface StylePreference {
  style: StyleCategory;
  score: number; // 0-100
  confidence: number; // 0-1
  percentage?: number;
}

export interface StyleQuizInsights {
  colorPreference: "warm" | "cool" | "neutral" | "mixed";
  colorBoldness: "neutral" | "bold" | "vibrant";
  formality: "casual" | "balanced" | "formal";
  patterns: "minimal" | "moderate" | "bold";
  ornamentation: "minimal" | "moderate" | "ornate";
  materials: {
    natural: number;
    synthetic: number;
    mixed: number;
  };
}

export interface StyleQuizResults {
  sessionId: string;
  userId: string;
  completedAt: Date;

  // Primary style
  primaryStyle: StylePreference;

  // All styles ranked
  styleRanking: StylePreference[];

  // Detailed insights
  insights: StyleQuizInsights;

  // Room-specific results
  roomSpecificInsights?: Record<string, {
    bestStyles: StyleCategory[];
    avoidStyles: StyleCategory[];
    recommendations: string[];
  }>;

  // Generated description
  profile: string;

  // Follow-up questions
  followUpQuestions?: string[];

  // Extracted metadata for consultation context
  extractedMetadata: Partial<ExtractedMetadata>;
}
