/**
 * Image Analyzer (Agent 1.3)
 * Analyzes room images using Claude 3.5 Sonnet vision API
 * Extracts comprehensive metadata from visual data
 *
 * Purpose: Convert room images into structured design data
 * Tasks: 1.3.3-1.3.5 (implemented separately)
 * This file covers: Schema definitions and response parsing
 */

import {
  ImageAnalysisResult,
  RoomAnalysis,
  VisualAnalysis,
  StyleAnalysis,
  IssueAnalysis,
  ExtractedMetadata,
  EnhancedImageMetadata,
} from "@/types/consultation";

// ===== ANALYSIS PROMPT =====

/**
 * Comprehensive prompt for Claude 3.5 Sonnet vision analysis
 * Structured to extract all required metadata in JSON format
 */
export function createImageAnalysisPrompt(): string {
  return `You are an expert interior design analyst. Analyze this room image and provide a detailed structured analysis in JSON format.

ANALYZE AND EXTRACT:

1. ROOM IDENTIFICATION:
   - Primary room type (living_room, bedroom, kitchen, etc.)
   - Confidence in identification (0-1)
   - Alternative room types if ambiguous
   - Estimated space size (small/medium/large) with description
   - Natural light quality (poor/moderate/excellent)
   - Ceiling height assessment (low/standard/high/cathedral)
   - Architectural features (fireplaces, built-in shelving, etc.)

2. VISUAL CHARACTERISTICS:
   - Dominant colors with hex codes (at least 3)
   - Secondary colors with hex codes
   - Accent colors
   - Lighting assessment: natural light, artificial light types
   - Overall brightness (dim/moderate/bright)
   - Visible materials: flooring, walls, ceiling types
   - Texture profile: identify glossy, matte, smooth, textured, wood grain, patterns

3. STYLE & DESIGN:
   - Primary design style (modern, traditional, rustic, etc.)
   - Secondary styles if visible
   - Formality level (casual/formal/mixed)
   - Design era or inspiration
   - Mood or atmosphere (cozy, energetic, sophisticated, etc.)
   - Design elements count: decorative objects, artwork, plants, mirrors, textiles
   - Overall design coherence (cohesive/somewhat/fragmented)

4. ISSUES & OPPORTUNITIES:
   - Current design issues with severity (minor/moderate/major)
   - Categories: lighting, clutter, color clash, dated style, etc.
   - Quick wins (easy improvements)
   - Challenges or constraints visible
   - Clutter level assessment (low/moderate/high)
   - Lighting adequacy (insufficient/adequate/excellent)

RESPONSE FORMAT:
Return ONLY a valid JSON object matching this structure (no markdown, no code blocks):
{
  "roomAnalysis": {
    "roomType": "living_room",
    "confidence": 0.95,
    "alternativeTypes": ["bedroom"],
    "estimatedSize": {
      "category": "medium",
      "estimatedSqFt": 250,
      "description": "Standard-sized living room"
    },
    "characteristics": {
      "openLayout": true,
      "multiLevel": false,
      "hasWindows": 2,
      "hasNaturalLight": "moderate",
      "ceilingHeight": "standard",
      "wallCondition": "good"
    },
    "features": {
      "fireplaces": 1,
      "builtin_shelving": true,
      "archways": 0,
      "columns": 0,
      "sloped_ceilings": false,
      "exposed_beams": false,
      "unusual_angles": false,
      "other": []
    }
  },
  "visualAnalysis": {
    "colorPalette": {
      "dominant": [
        {
          "name": "warm gray",
          "hex": "#9E9E9E",
          "rgb": {"r": 158, "g": 158, "b": 158},
          "percentageOfVisible": 35,
          "location": "walls"
        }
      ],
      "secondary": [],
      "accents": []
    },
    "lighting": {
      "naturalLight": "moderate",
      "artificialLight": ["recessed_lights", "table_lamp"],
      "overallBrightness": "moderate",
      "shadowPatterns": "even distribution",
      "timeOfDay": "midday"
    },
    "materials": {
      "flooring": ["hardwood"],
      "walls": ["painted"],
      "ceiling": ["drywall"],
      "furniture_materials": ["upholstered", "wood"]
    },
    "textureProfile": {
      "glossy": false,
      "matte": true,
      "smooth": true,
      "textured": false,
      "wood_grain": true,
      "patterns": []
    }
  },
  "styleAnalysis": {
    "primaryStyle": "contemporary",
    "confidence": 0.88,
    "secondaryStyles": ["minimalist"],
    "characteristics": {
      "formality": "casual",
      "eclecticism": "moderate",
      "era": "contemporary",
      "mood": ["cozy", "relaxing"]
    },
    "designElements": {
      "decorativeObjects": 12,
      "artwork": 3,
      "plants": 5,
      "mirrors": 1,
      "textiles": 8,
      "patterns": false,
      "symmetry": "asymmetric"
    },
    "trendIndicators": ["minimalism", "natural_materials"]
  },
  "issueAnalysis": {
    "visibleIssues": [
      {
        "issue": "Insufficient task lighting",
        "severity": "moderate",
        "category": "lighting",
        "description": "Reading area needs additional light"
      }
    ],
    "opportunities": [
      {
        "opportunity": "Add accent wall with bold color",
        "priority": "medium",
        "category": "color_refresh",
        "estimatedImpact": "medium"
      }
    ],
    "quickWins": [
      "Add larger area rug to define space",
      "Rearrange furniture for better traffic flow",
      "Add more plants for greenery"
    ],
    "challenges": [],
    "assessment": {
      "clutterLevel": "low",
      "organizationLevel": "organized",
      "lightingAdequacy": "adequate",
      "functionalityGaps": [],
      "designCoherence": "cohesive"
    }
  }
}

IMPORTANT:
- Be specific with colors (use actual hex codes, not generic names)
- Provide realistic assessments based on visible elements
- Include only observable issues (not assumptions)
- Confidence scores must be 0-1
- All required fields must be present`;
}

// ===== RESPONSE PARSING =====

/**
 * Parse vision API response and validate structure
 */
export function parseImageAnalysisResponse(
  rawResponse: string
): ImageAnalysisResult | null {
  try {
    // Extract JSON from response (handle potential markdown wrapping)
    let jsonStr = rawResponse.trim();

    // Remove markdown code blocks if present
    if (jsonStr.startsWith("```json")) {
      jsonStr = jsonStr.replace(/^```json\n?/, "").replace(/\n?```$/, "");
    } else if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/^```\n?/, "").replace(/\n?```$/, "");
    }

    const parsed = JSON.parse(jsonStr);

    // Validate structure
    if (
      !parsed.roomAnalysis ||
      !parsed.visualAnalysis ||
      !parsed.styleAnalysis ||
      !parsed.issueAnalysis
    ) {
      console.error("Invalid response structure - missing required sections");
      return null;
    }

    return parsed as ImageAnalysisResult;
  } catch (error) {
    console.error("Failed to parse image analysis response:", error);
    return null;
  }
}

// ===== METADATA EXTRACTION =====

/**
 * Extract ExtractedMetadata from ImageAnalysisResult
 * Maps visual analysis into the consultation metadata structure
 */
export function extractMetadataFromImageAnalysis(
  analysis: ImageAnalysisResult
): Partial<ExtractedMetadata> {
  const metadata: Partial<ExtractedMetadata> = {
    confidence: analysis.confidence,
    rawKeywords: extractKeywords(analysis),
  };

  // Extract room information
  metadata.room = {
    primary: analysis.roomAnalysis.roomType,
    approximate_size: analysis.roomAnalysis.estimatedSize.category,
    natural_light: analysis.roomAnalysis.characteristics.hasNaturalLight,
    current_issues: analysis.issueAnalysis.visibleIssues.map((i) => i.issue),
  };

  // Extract visual/style information
  metadata.style = {
    style_hints: [analysis.styleAnalysis.primaryStyle, ...analysis.styleAnalysis.secondaryStyles],
    color_preferences: analysis.visualAnalysis.colorPalette.dominant.map(
      (c) => c.name
    ),
    formality_level: analysis.styleAnalysis.characteristics.formality,
    display_preference: analysis.styleAnalysis.characteristics.eclecticism,
  };

  // Extract functional information
  metadata.functional = {
    primary_activities: [], // Not directly observable from image
    storage_needs: analysis.issueAnalysis.opportunities
      .filter((o) => o.category === "storage_solution")
      .map((o) => o.opportunity),
    lighting_preferences: analysis.visualAnalysis.lighting.artificialLight,
  };

  // Extract constraints from issues
  const challenges = analysis.issueAnalysis.challenges.map((c) => c.challenge);
  if (challenges.length > 0) {
    metadata.constraints = {
      architectural_constraints: challenges,
    };
  }

  return metadata;
}

/**
 * Extract searchable keywords from image analysis
 */
function extractKeywords(analysis: ImageAnalysisResult): string[] {
  const keywords: string[] = [];

  // Room type
  keywords.push(analysis.roomAnalysis.roomType);
  if (analysis.roomAnalysis.alternativeTypes) {
    keywords.push(...analysis.roomAnalysis.alternativeTypes);
  }

  // Size
  keywords.push(`size:${analysis.roomAnalysis.estimatedSize.category}`);

  // Lighting
  keywords.push(`light:${analysis.roomAnalysis.characteristics.hasNaturalLight}`);

  // Colors
  analysis.visualAnalysis.colorPalette.dominant.forEach((c) => {
    keywords.push(`color:${c.name}`);
  });

  // Style
  keywords.push(analysis.styleAnalysis.primaryStyle);
  keywords.push(...analysis.styleAnalysis.secondaryStyles);

  // Characteristics
  keywords.push(
    `formality:${analysis.styleAnalysis.characteristics.formality}`
  );

  // Issues
  analysis.issueAnalysis.visibleIssues.forEach((i) => {
    keywords.push(`issue:${i.category}`);
  });

  // Opportunities
  analysis.issueAnalysis.opportunities.forEach((o) => {
    keywords.push(`opportunity:${o.category}`);
  });

  return keywords;
}

// ===== VALIDATION =====

/**
 * Validate image analysis result completeness
 */
export function validateImageAnalysis(
  analysis: ImageAnalysisResult
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check required room analysis fields
  if (!analysis.roomAnalysis.roomType) {
    errors.push("Room type is required");
  }
  if (!analysis.roomAnalysis.estimatedSize) {
    errors.push("Estimated size is required");
  }

  // Check required visual analysis
  if (!analysis.visualAnalysis.colorPalette.dominant || analysis.visualAnalysis.colorPalette.dominant.length === 0) {
    errors.push("At least one dominant color is required");
  }
  if (!analysis.visualAnalysis.lighting) {
    errors.push("Lighting assessment is required");
  }

  // Check required style analysis
  if (!analysis.styleAnalysis.primaryStyle) {
    errors.push("Primary style is required");
  }

  // Check required issue analysis
  if (!Array.isArray(analysis.issueAnalysis.visibleIssues)) {
    errors.push("Issues array must be present");
  }

  // Validate confidence scores
  if (
    analysis.confidence < 0 ||
    analysis.confidence > 1 ||
    analysis.roomAnalysis.confidence < 0 ||
    analysis.roomAnalysis.confidence > 1 ||
    analysis.styleAnalysis.confidence < 0 ||
    analysis.styleAnalysis.confidence > 1
  ) {
    errors.push("Confidence scores must be between 0 and 1");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ===== CONFIDENCE CALCULATION =====

/**
 * Calculate overall confidence based on analysis quality
 */
export function calculateImageAnalysisConfidence(
  analysis: ImageAnalysisResult
): number {
  let confidence = 0;
  let factors = 0;

  // Room identification confidence
  confidence += analysis.roomAnalysis.confidence;
  factors++;

  // Style confidence
  confidence += analysis.styleAnalysis.confidence;
  factors++;

  // Coverage: check for substantial data
  const hasColors = analysis.visualAnalysis.colorPalette.dominant.length > 0;
  const hasIssues = analysis.issueAnalysis.visibleIssues.length > 0;
  const hasOpportunities =
    analysis.issueAnalysis.opportunities.length > 0;
  const hasMaterials =
    analysis.visualAnalysis.materials.flooring.length > 0 &&
    analysis.visualAnalysis.materials.walls.length > 0;

  if (hasColors && hasIssues && hasOpportunities && hasMaterials) {
    confidence += 0.9;
  } else if (hasColors && hasIssues && hasOpportunities) {
    confidence += 0.7;
  } else if (hasColors && hasIssues) {
    confidence += 0.5;
  } else {
    confidence += 0.3;
  }
  factors++;

  return Math.min(confidence / factors, 1);
}

// ===== TYPE GUARDS =====

/**
 * Check if an object is a valid ImageAnalysisResult
 */
export function isImageAnalysisResult(obj: any): obj is ImageAnalysisResult {
  return (
    obj &&
    typeof obj === "object" &&
    "roomAnalysis" in obj &&
    "visualAnalysis" in obj &&
    "styleAnalysis" in obj &&
    "issueAnalysis" in obj &&
    "confidence" in obj &&
    typeof obj.confidence === "number"
  );
}

// ===== UTILITIES =====

/**
 * Generate summary of image analysis for display
 */
export function generateAnalysisSummary(analysis: ImageAnalysisResult): string {
  const room = analysis.roomAnalysis.roomType;
  const size = analysis.roomAnalysis.estimatedSize.category;
  const light = analysis.roomAnalysis.characteristics.hasNaturalLight;
  const style = analysis.styleAnalysis.primaryStyle;
  const topIssue = analysis.issueAnalysis.visibleIssues[0]?.issue || "none identified";
  const topOpportunity =
    analysis.issueAnalysis.opportunities[0]?.opportunity ||
    "enhancement needed";

  return `${room} (${size}) with ${light} natural light in ${style} style. Key issue: ${topIssue}. Opportunity: ${topOpportunity}.`;
}

/**
 * Create enhanced image metadata for quick access
 */
export function createEnhancedImageMetadata(
  analysis: ImageAnalysisResult
): EnhancedImageMetadata {
  const dominant = analysis.visualAnalysis.colorPalette.dominant[0];

  return {
    room_type: analysis.roomAnalysis.roomType,
    color_palette: analysis.visualAnalysis.colorPalette.dominant.map(
      (c) => c.hex
    ),
    lighting_level: analysis.roomAnalysis.characteristics.hasNaturalLight,
    clutter_level: analysis.issueAnalysis.assessment.clutterLevel,
    estimated_size: analysis.roomAnalysis.estimatedSize.category,
    visible_issues: analysis.issueAnalysis.visibleIssues.map((i) => i.issue),
    furniture_count: 0, // Not directly calculated in analysis
    style_indicators: [
      analysis.styleAnalysis.primaryStyle,
      ...analysis.styleAnalysis.secondaryStyles,
    ],
    imageAnalysisId: analysis.id,
    dominantColorHex: dominant?.hex,
    colorTemperature: inferColorTemperature(dominant?.name || ""),
    primaryStyle: analysis.styleAnalysis.primaryStyle,
    qualityScore: calculateImageQualityScore(analysis),
    designReadiness: assessDesignReadiness(analysis),
  };
}

/**
 * Infer color temperature from color name
 */
function inferColorTemperature(
  colorName: string
): "warm" | "cool" | "neutral" {
  const warmKeywords = [
    "warm",
    "orange",
    "red",
    "brown",
    "tan",
    "beige",
    "gold",
    "yellow",
  ];
  const coolKeywords = [
    "cool",
    "blue",
    "green",
    "purple",
    "gray",
    "silver",
    "white",
  ];

  const lowerName = colorName.toLowerCase();
  if (warmKeywords.some((k) => lowerName.includes(k))) return "warm";
  if (coolKeywords.some((k) => lowerName.includes(k))) return "cool";
  return "neutral";
}

/**
 * Calculate image quality score (0-100)
 */
function calculateImageQualityScore(analysis: ImageAnalysisResult): number {
  let score = 50; // Start at baseline

  // Factors that improve score
  const hasGoodLighting =
    analysis.roomAnalysis.characteristics.hasNaturalLight !== "poor" ? 10 : 0;
  const hasClarity =
    analysis.roomAnalysis.confidence > 0.8 ? 15 : 10;
  const hasDetailedAnalysis =
    analysis.issueAnalysis.visibleIssues.length > 2 ? 10 : 0;
  const hasMultipleMaterials =
    analysis.visualAnalysis.materials.flooring.length > 0 &&
    analysis.visualAnalysis.materials.walls.length > 0
      ? 10
      : 0;

  score += hasGoodLighting + hasClarity + hasDetailedAnalysis + hasMultipleMaterials;

  return Math.min(score, 100);
}

/**
 * Assess overall design readiness
 */
function assessDesignReadiness(
  analysis: ImageAnalysisResult
): "needs_work" | "functional" | "well_designed" | "designer_level" {
  const coherence = analysis.issueAnalysis.assessment.designCoherence;
  const clutter = analysis.issueAnalysis.assessment.clutterLevel;
  const issues = analysis.issueAnalysis.visibleIssues.length;
  const opportunities = analysis.issueAnalysis.opportunities.length;

  if (
    coherence === "cohesive" &&
    clutter === "low" &&
    issues <= 2 &&
    opportunities <= 2
  ) {
    return "designer_level";
  }
  if (
    coherence === "cohesive" &&
    clutter !== "high" &&
    issues <= 4
  ) {
    return "well_designed";
  }
  if (clutter !== "high" && issues <= 6) {
    return "functional";
  }
  return "needs_work";
}
