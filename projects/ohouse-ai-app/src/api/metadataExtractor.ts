/**
 * Metadata Extraction Engine
 * Analyzes user messages and extracts structured metadata
 * Can use Claude API or pattern matching depending on implementation
 */

import {
  ExtractedMetadata,
  ProjectScopeType,
  ProjectScope,
  RoomMetadata,
  GoalMetadata,
  BudgetMetadata,
  BudgetRange,
  TimelineMetadata,
  LifestyleMetadata,
  ConstraintMetadata,
  StyleMetadata,
  FunctionalMetadata,
} from "@/types/consultation";

// ===== INTENT DETECTION PATTERNS =====

const INTENT_PATTERNS = {
  exploratory: [
    /just (curious|checking|looking)/i,
    /just (trying|testing) the app/i,
    /saw.*ad|friend told me/i,
    /what (does|can) this (do|app)?/i,
    /let's see|surprise me/i,
    /don't know.*maybe/i,
  ],
  small_refresh: [
    /refresh|update|freshen/i,
    /new (decor|paint|art)/i,
    /(just|need).*(new|some).*pieces?/i,
    /quick (transformation|change)/i,
    /few (hundred|pieces)/i,
  ],
  single_room: [
    /makeover|redo|transform.*room/i,
    /(bedroom|living room|kitchen|bathroom).*makeover/i,
    /complete.*room/i,
  ],
  multi_room: [
    /multiple rooms|several rooms/i,
    /(renovating|redo).*apartment/i,
    /whole (apartment|space)/i,
    /(living room|bedroom).*and.*(living room|bedroom|kitchen)/i,
  ],
  full_home: [
    /whole.*home|full.*renovation/i,
    /starting from scratch|new house|just bought/i,
    /entire (house|home|place)/i,
  ],
};

// ===== ROOM PATTERNS =====

const ROOM_PATTERNS: Record<string, RegExp[]> = {
  living_room: [/living (room)?|lounge|family room/i, /salon/i],
  bedroom: [/bedroom|master (bedroom|suite)|guest room/i, /chambre/i],
  kitchen: [/kitchen|kitchenette/i, /cuisine/i],
  dining: [/dining (room)?/i, /salle à manger/i],
  bathroom: [/bathroom|bath|restroom|washroom/i],
  home_office: [/(home )?office|study|den|workspace/i],
  entryway: [/entryway|foyer|entrance|hallway/i],
  nursery: [/nursery|baby.*room/i],
};

// ===== BUDGET PATTERNS =====

const BUDGET_PATTERNS = {
  under_5k: [/under.*(1|2|3|4|5).?(k|thousand)/i, /less than.*(1|2|3|4|5).?k/i, /budget is.*500|1000|2000|3000|4000/i],
  "5k_15k": [/(5|6|7|8|9|10|12|15).?(k|thousand)/i, /between.*(5|10|15).?k/i],
  "15k_30k": [/(15|20|25|30).?(k|thousand)/i, /20.*30.?k/i],
  over_30k: [/over.*(30|40|50).?k/i, /unlimited|not.*concern/i],
};

// ===== TIMELINE PATTERNS =====

const TIMELINE_PATTERNS = {
  urgent: [/(asap|urgent|rush|immediately)/i, /(next|this).*(week|month)/i],
  moderate: [/(couple of.*month|6.*week)/i, /timeline is flexible/i],
  flexible: [/no.*rush|whenever|no.*deadline/i, /take.*time/i],
};

// ===== GOAL PATTERNS =====

const GOAL_KEYWORDS = {
  organization: [/organiz|storage|clutter/i, /need.*storage/i],
  style_refresh: [/modern|contemporary|update.*style/i, /feel.*outdated/i],
  comfort: [/cozy|comfort|warm/i, /feel.*cold/i],
  functionality: [/function|work.*better|improve.*layout/i],
  aesthetic: [/beautiful|lovely|pretty|attractive/i, /look.*better/i],
};

// ===== LIFESTYLE PATTERNS =====

const LIFESTYLE_PATTERNS = {
  children: [/(kids?|children|boy|girl).*age|have.*kids?/i],
  pets: [/dogs?|cats?|pets?/i, /pet.*friendly|dog.*damage/i],
  work_from_home: [/work from home|remote|home.*office/i],
  entertaining: [/entertain|guests|parties|dinner party/i],
};

// ===== MAIN EXTRACTION FUNCTION =====

/**
 * Extract metadata from user message
 * Uses pattern matching - can be upgraded to Claude API for more sophisticated extraction
 */
export async function extractMetadataFromMessage(
  message: string,
  previousMetadata?: ExtractedMetadata
): Promise<ExtractedMetadata> {
  const metadata: ExtractedMetadata = previousMetadata || {
    confidence: 0,
    rawKeywords: [],
  };

  try {
    // Detect intent/scope
    const detectedScope = detectProjectScope(message);
    if (detectedScope) {
      metadata.projectScope = detectedScope;
    }

    // Extract room information
    const roomInfo = extractRoomInfo(message);
    if (roomInfo) {
      metadata.room = roomInfo;
    }

    // Extract goals
    const goals = extractGoals(message);
    if (goals) {
      metadata.goals = goals;
    }

    // Extract budget
    const budget = extractBudget(message);
    if (budget) {
      metadata.budget = budget;
    }

    // Extract timeline
    const timeline = extractTimeline(message);
    if (timeline) {
      metadata.timeline = timeline;
    }

    // Extract lifestyle
    const lifestyle = extractLifestyle(message);
    if (lifestyle) {
      metadata.lifestyle = lifestyle;
    }

    // Extract constraints
    const constraints = extractConstraints(message);
    if (constraints) {
      metadata.constraints = constraints;
    }

    // Extract style hints
    const styleHints = extractStyleHints(message);
    if (styleHints) {
      metadata.style = styleHints;
    }

    // Extract functional info
    const functional = extractFunctional(message);
    if (functional) {
      metadata.functional = functional;
    }

    // Extract keywords
    metadata.rawKeywords = extractKeywords(message);

    // Calculate confidence score
    metadata.confidence = calculateConfidenceScore(metadata);

    return metadata;
  } catch (error) {
    console.error("Error extracting metadata:", error);
    return metadata;
  }
}

// ===== DETECTION FUNCTIONS =====

function detectProjectScope(message: string): ProjectScope | null {
  for (const [scopeType, patterns] of Object.entries(INTENT_PATTERNS)) {
    if (patterns.some((p) => p.test(message))) {
      return {
        type: scopeType as ProjectScopeType,
        rooms: extractRoomNames(message),
        description: message,
      };
    }
  }
  return null;
}

function extractRoomInfo(message: string): RoomMetadata | null {
  const roomNames = extractRoomNames(message);
  if (roomNames.length === 0) return null;

  // Detect light/size issues
  const hasLightIssue = /(poor|lack|dark|bright|light)/i.test(message);
  let naturalLight: "poor" | "moderate" | "excellent" | undefined;
  if (/dark|poor|lack of light/i.test(message)) naturalLight = "poor";
  else if (/bright|lots of light|sunny/i.test(message)) naturalLight = "excellent";
  else if (/decent|good/i.test(message)) naturalLight = "moderate";

  // Extract issues
  const currentIssues = extractIssuesFromMessage(message);

  return {
    primary: roomNames[0] || "living_room",
    secondary: roomNames.slice(1),
    natural_light: naturalLight,
    current_issues: currentIssues,
  };
}

function extractGoals(message: string): GoalMetadata | null {
  const goals: string[] = [];
  const emotionalOutcomes: string[] = [];

  // Check for emotional goals
  const emotionalWords = [
    "cozy",
    "peaceful",
    "energized",
    "organized",
    "sophisticated",
    "modern",
    "warm",
  ];
  emotionalWords.forEach((word) => {
    if (new RegExp(word, "i").test(message)) {
      emotionalOutcomes.push(word);
    }
  });

  // Extract pain points and goals
  const painPoints = extractIssuesFromMessage(message);
  const mustHaves = extractMustHaves(message);

  if (
    emotionalOutcomes.length > 0 ||
    painPoints.length > 0 ||
    mustHaves.length > 0
  ) {
    return {
      primary: emotionalOutcomes.join(", ") || "transform the space",
      secondary: painPoints,
      emotional_outcome: emotionalOutcomes[0],
      must_haves: mustHaves,
      pain_points: painPoints,
    };
  }

  return null;
}

function extractBudget(message: string): BudgetMetadata | null {
  // Try to extract numbers
  const numberMatches = message.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/g);
  const budgetAmount = numberMatches ? parseInt(numberMatches[0].replace(/[^\d]/g, "")) : undefined;

  // Detect budget range
  let range: BudgetRange | undefined;
  for (const [rangeType, patterns] of Object.entries(BUDGET_PATTERNS)) {
    if (patterns.some((p) => p.test(message))) {
      range = rangeType as BudgetRange;
      break;
    }
  }

  // Detect comfort level
  let comfortLevel: "comfortable" | "flexible" | "tight" | "not_shared" = "not_shared";
  if (/comfortable|fine with|no problem/i.test(message)) comfortLevel = "comfortable";
  else if (/flexible|can adjust|wiggle room/i.test(message)) comfortLevel = "flexible";
  else if (/tight|limited|not much/i.test(message)) comfortLevel = "tight";

  if (budgetAmount || range || comfortLevel !== "not_shared") {
    return {
      total: budgetAmount,
      range,
      comfort_level: comfortLevel,
    };
  }

  return null;
}

function extractTimeline(message: string): TimelineMetadata | null {
  let flexibility: "firm_deadline" | "flexible" | "no_rush" = "flexible";
  const drivers: string[] = [];

  if (/urgent|asap|immediately|this week/i.test(message)) {
    flexibility = "firm_deadline";
  } else if (/no.*rush|whenever|flexible|whenever/i.test(message)) {
    flexibility = "no_rush";
  }

  // Extract drivers
  const driverKeywords = [
    "baby",
    "moving",
    "event",
    "party",
    "holiday",
    "wedding",
    "guest coming",
  ];
  driverKeywords.forEach((keyword) => {
    if (new RegExp(keyword, "i").test(message)) {
      drivers.push(keyword);
    }
  });

  if (flexibility !== "flexible" || drivers.length > 0) {
    return {
      flexibility,
      drivers: drivers.length > 0 ? drivers : undefined,
    };
  }

  return null;
}

function extractLifestyle(message: string): LifestyleMetadata | null {
  const lifestyle: LifestyleMetadata = {};
  let hasData = false;

  // Check for children
  const childrenMatch = message.match(/(\d+)\s*(kids?|children)/i);
  if (childrenMatch) {
    lifestyle.children = {
      count: parseInt(childrenMatch[1]),
      ages: [],
    };
    hasData = true;
  }

  // Check for pets
  if (/dogs?|cats?|pets?/i.test(message)) {
    lifestyle.pets = [{ type: "pet", size: "medium" }];
    hasData = true;
  }

  // Check for WFH
  if (/work from home|remote/i.test(message)) {
    lifestyle.work_from_home = "full_time";
    hasData = true;
  }

  // Check for entertaining
  if (/entertain|guests|parties/i.test(message)) {
    lifestyle.entertaining_frequency = "occasionally";
    hasData = true;
  }

  return hasData ? lifestyle : null;
}

function extractConstraints(message: string): ConstraintMetadata | null {
  const constraints: ConstraintMetadata = {};
  let hasData = false;

  if (/rent|rented|rental/i.test(message)) {
    constraints.ownership = "rented";
    hasData = true;
  } else if (/own|owned|own.*home/i.test(message)) {
    constraints.ownership = "owned";
    hasData = true;
  }

  // Architectural constraints
  const architecturalKeywords = [
    "column",
    "radiator",
    "odd window",
    "structural",
  ];
  const architecturalConstraints: string[] = [];
  architecturalKeywords.forEach((keyword) => {
    if (new RegExp(keyword, "i").test(message)) {
      architecturalConstraints.push(keyword);
    }
  });

  if (architecturalConstraints.length > 0) {
    constraints.architectural_constraints = architecturalConstraints;
    hasData = true;
  }

  return hasData ? constraints : null;
}

function extractStyleHints(message: string): StyleMetadata | null {
  const styleHints: StyleMetadata = {};
  const styleWords = [
    "modern",
    "cozy",
    "minimalist",
    "rustic",
    "industrial",
    "scandinavian",
    "bohemian",
    "traditional",
    "eclectic",
    "contemporary",
  ];

  const foundStyles: string[] = [];
  styleWords.forEach((style) => {
    if (new RegExp(style, "i").test(message)) {
      foundStyles.push(style);
    }
  });

  if (foundStyles.length > 0) {
    styleHints.style_hints = foundStyles;
  }

  // Color preferences
  const colorMatch = message.match(/\b(red|blue|green|yellow|white|black|gray|warm|cool|neutral)\b/gi);
  if (colorMatch) {
    styleHints.color_preferences = [...new Set(colorMatch)];
  }

  // Formality
  if (/casual|relaxed|informal/i.test(message)) {
    styleHints.formality_level = "casual";
  } else if (/formal|sophisticated|elegant/i.test(message)) {
    styleHints.formality_level = "formal";
  }

  return Object.keys(styleHints).length > 0 ? styleHints : null;
}

function extractFunctional(message: string): FunctionalMetadata | null {
  const functional: FunctionalMetadata = {};

  const activityKeywords = [
    "watching tv",
    "reading",
    "working",
    "entertaining",
    "cooking",
    "homework",
    "sleeping",
  ];
  const foundActivities: string[] = [];

  activityKeywords.forEach((activity) => {
    if (new RegExp(activity, "i").test(message)) {
      foundActivities.push(activity);
    }
  });

  if (foundActivities.length > 0) {
    functional.primary_activities = foundActivities;
  }

  // Storage needs
  if (/storage|organiz|clutter|need.*space/i.test(message)) {
    functional.storage_needs = ["general storage"];
  }

  return Object.keys(functional).length > 0 ? functional : null;
}

// ===== HELPER FUNCTIONS =====

function extractRoomNames(message: string): string[] {
  const rooms: string[] = [];

  for (const [roomType, patterns] of Object.entries(ROOM_PATTERNS)) {
    if (patterns.some((p) => p.test(message))) {
      rooms.push(roomType);
    }
  }

  return [...new Set(rooms)];
}

function extractIssuesFromMessage(message: string): string[] {
  const issues: string[] = [];
  const issueKeywords = [
    "cluttered",
    "dark",
    "outdated",
    "uncomfortable",
    "small",
    "cramped",
    "cold",
    "boring",
    "worn",
  ];

  issueKeywords.forEach((keyword) => {
    if (new RegExp(`\\b${keyword}`, "i").test(message)) {
      issues.push(keyword);
    }
  });

  return issues;
}

function extractMustHaves(message: string): string[] {
  const mustHaves: string[] = [];
  const matches = message.match(/(?:need|want|must have).*?([a-z\s]+?)(?:\.|,|;|$)/gi);

  if (matches) {
    matches.forEach((match) => {
      mustHaves.push(match.replace(/(?:need|want|must have)/i, "").trim());
    });
  }

  return mustHaves;
}

function extractKeywords(message: string): string[] {
  // Simple keyword extraction - in production, use better NLP
  const words = message
    .toLowerCase()
    .split(/\s+/)
    .filter(
      (word) =>
        word.length > 4 &&
        !["with", "from", "that", "this", "have", "want"].includes(word)
    );

  return [...new Set(words)].slice(0, 10);
}

function calculateConfidenceScore(metadata: ExtractedMetadata): number {
  let score = 0;
  let totalFields = 0;

  // Check which metadata fields have data
  if (metadata.projectScope) score += 0.2;
  totalFields += 0.2;

  if (metadata.room) score += 0.15;
  totalFields += 0.15;

  if (metadata.goals) score += 0.15;
  totalFields += 0.15;

  if (metadata.budget) score += 0.15;
  totalFields += 0.15;

  if (metadata.timeline) score += 0.1;
  totalFields += 0.1;

  if (metadata.lifestyle) score += 0.1;
  totalFields += 0.1;

  if (metadata.constraints) score += 0.1;
  totalFields += 0.1;

  if (metadata.style) score += 0.05;
  totalFields += 0.05;

  return totalFields > 0 ? score / totalFields : 0;
}
