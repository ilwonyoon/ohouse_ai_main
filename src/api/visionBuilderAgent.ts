/**
 * Vision Builder Agent (Agent 1.5)
 * Generates moodboards from user style preferences and room analysis
 *
 * Purpose: Create visual design direction through moodboards
 * Tasks: 1.5.3-1.5.5 (moodboard generation, color extraction, design elements)
 *
 * This file covers:
 * - Moodboard concept generation
 * - Style narrative creation
 * - Design element selection
 * - Color palette creation
 * - Prompt engineering for image generation
 */

import { Anthropic } from "@anthropic-ai/sdk";
import {
  Moodboard,
  MoodboardGenerationRequest,
  MoodboardGenerationResponse,
  StyleQuizResults,
  ImageAnalysisResult,
  ColorPalette,
  DesignElement,
  MoodboardImage,
} from "@/types/consultation";
import { v4 as uuidv4 } from "uuid";

// ===== INITIALIZATION =====

const client = new Anthropic();

// ===== STYLE-TO-MOOD MAPPING =====

/**
 * Map design style to mood descriptors
 * Used for prompt engineering and moodboard creation
 */
const STYLE_MOOD_MAP: Record<string, string[]> = {
  modern: ["clean", "minimalist", "sleek", "contemporary", "sophisticated"],
  minimalist: ["calm", "spacious", "serene", "uncluttered", "zen"],
  industrial: ["edgy", "bold", "urban", "modern", "warehouse"],
  rustic: ["warm", "cozy", "natural", "earthy", "farmhouse"],
  traditional: ["elegant", "timeless", "formal", "luxurious", "classic"],
  bohemian: ["eclectic", "colorful", "free-spirited", "artistic", "global"],
  scandinavian: ["minimalist", "functional", "light", "natural", "nordic"],
  transitional: ["balanced", "comfortable", "versatile", "layered", "warm"],
  mid_century: ["retro", "clean-lined", "atomic", "iconic", "vintage"],
  glam: ["luxurious", "bold", "dramatic", "elegant", "sophisticated"],
  farmhouse: ["cozy", "rustic", "warm", "vintage", "inviting"],
  contemporary: ["modern", "sleek", "open", "minimalist", "tech-forward"],
  maximalist: ["bold", "colorful", "layered", "eclectic", "rich"],
  coastal: ["breezy", "light", "nautical", "relaxing", "beachy"],
};

const STYLE_COLOR_PREFERENCES: Record<string, string[]> = {
  modern: ["white", "gray", "black", "navy", "steel"],
  minimalist: ["white", "light gray", "beige", "natural wood"],
  industrial: ["gray", "black", "concrete", "steel", "rust"],
  rustic: ["brown", "cream", "red", "rust", "sage"],
  traditional: ["gold", "burgundy", "navy", "cream", "forest green"],
  bohemian: ["rust", "gold", "teal", "terracotta", "plum"],
  scandinavian: ["white", "light gray", "natural wood", "soft blue"],
  transitional: ["taupe", "white", "gray", "soft gold", "warm wood"],
  mid_century: ["teak", "mustard", "orange", "gray", "white"],
  glam: ["gold", "black", "white", "jewel tones", "marble"],
  farmhouse: ["cream", "white", "navy", "rust", "natural wood"],
  contemporary: ["white", "gray", "black", "metal", "primary colors"],
  maximalist: ["jewel tones", "pastels", "gold", "mixed patterns"],
  coastal: ["white", "light blue", "sand", "seafoam", "driftwood"],
};

// ===== MOODBOARD GENERATION =====

/**
 * Generate moodboard concept from style preferences and room analysis
 * Task 1.5.3: Core moodboard generation logic
 */
export async function generateMoodboardConcept(
  request: MoodboardGenerationRequest
): Promise<Omit<Moodboard, "moodboardImages">> {
  const { userId, roomType, stylePreferences, roomAnalysis } = request;

  // Extract primary style info
  const primaryStyle = stylePreferences.primaryStyle;
  const moods = STYLE_MOOD_MAP[primaryStyle] || ["elegant", "inviting"];
  const colorPrefs = STYLE_COLOR_PREFERENCES[primaryStyle] || [];

  // Build context from room analysis
  const currentColors = roomAnalysis?.visualAnalysis?.colors || [];
  const currentStyle = roomAnalysis?.styleAnalysis?.primaryStyle;
  const issues = roomAnalysis?.issueAnalysis?.issues.map((i) => i.category) || [];

  // Create prompt for Claude to generate moodboard narrative
  const prompt = createMoodboardNarrativePrompt(
    roomType,
    primaryStyle,
    stylePreferences,
    moods,
    colorPrefs,
    currentStyle,
    currentColors,
    issues
  );

  // Call Claude to generate moodboard narrative and recommendations
  const response = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const narrative = response.content[0].type === "text" ? response.content[0].text : "";

  // Parse narrative to extract structure
  const moodboard = parseMoodboardNarrative(
    narrative,
    userId,
    roomType,
    primaryStyle,
    stylePreferences,
    roomAnalysis
  );

  return moodboard;
}

/**
 * Create prompt for Claude to generate moodboard narrative
 */
function createMoodboardNarrativePrompt(
  roomType: string,
  primaryStyle: string,
  stylePreferences: StyleQuizResults,
  moods: string[],
  colorPrefs: string[],
  currentStyle: string | undefined,
  currentColors: string[],
  issues: string[]
): string {
  return `You are an expert interior designer creating a moodboard concept for a ${roomType}.

User's Style Preferences:
- Primary Style: ${primaryStyle}
- Style Score: ${stylePreferences.styleRanking[0]?.score}%
- Color Preference: ${stylePreferences.insights.colorPreference}
- Formality Level: ${stylePreferences.insights.formality}
- Pattern Preference: ${stylePreferences.insights.patterns}
- Material Preference: ${JSON.stringify(stylePreferences.insights.materials)}

Design Direction:
- Moods to evoke: ${moods.join(", ")}
- Recommended colors: ${colorPrefs.join(", ")}

Current Room State:
- Room Type: ${roomType}
- Current Style: ${currentStyle || "not analyzed"}
- Current Colors: ${currentColors.length > 0 ? currentColors.join(", ") : "not analyzed"}
- Issues to address: ${issues.length > 0 ? issues.join(", ") : "none identified"}

Generate a detailed moodboard concept in JSON format with these sections:

{
  "title": "Compelling moodboard title (5-8 words)",
  "description": "One sentence describing the overall concept",
  "concept": "2-3 sentences explaining the design narrative and why it works for this user and room",
  "styleNarrative": "3-4 sentences explaining how the chosen style fits their lifestyle and preferences",
  "mood": "Primary mood (e.g., 'cozy', 'modern', 'sophisticated')",
  "atmosphere": "Detailed 2-3 sentence description of the atmosphere and feeling when entering this room",
  "recommendations": {
    "furniture": ["item 1 with style details", "item 2", ...],
    "lighting": ["type 1 with description", "type 2", ...],
    "textiles": ["fabric type with color", "pattern description", ...],
    "color_accents": ["accent 1 with usage", "accent 2", ...],
    "materials": ["material 1 with texture", "material 2", ...]
  }
}

Be specific and design-forward. Each recommendation should reflect the user's style preferences.`;
}

/**
 * Parse Claude's narrative response into moodboard structure
 */
function parseMoodboardNarrative(
  narrative: string,
  userId: string,
  roomType: string,
  primaryStyle: string,
  stylePreferences: StyleQuizResults,
  roomAnalysis?: ImageAnalysisResult
): Omit<Moodboard, "moodboardImages"> {
  try {
    // Extract JSON from response (Claude might include markdown)
    const jsonMatch = narrative.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    // Generate color palette based on style preferences
    const colorPalette = generateColorPalette(
      primaryStyle,
      stylePreferences.insights.colorPreference
    );

    // Generate design elements from recommendations
    const designElements = generateDesignElements(
      parsed.recommendations || {},
      primaryStyle,
      stylePreferences
    );

    return {
      id: uuidv4(),
      userId,
      roomType,
      createdAt: new Date(),

      // Core moodboard data
      title: parsed.title || `${primaryStyle} ${roomType} Moodboard`,
      description:
        parsed.description || `A beautiful ${primaryStyle} design for your ${roomType}`,
      concept: parsed.concept || "Transform your space with thoughtful design choices.",

      // Style information
      primaryStyle,
      secondaryStyles: stylePreferences.styleRanking.slice(1, 3).map((s) => s.style),
      styleNarrative:
        parsed.styleNarrative || `This design reflects ${primaryStyle} aesthetics.`,

      // Visual components
      colorPalette,
      designElements,
      moodboardImages: [], // Filled in Task 1.5.4

      // Metadata
      mood: parsed.mood || "elegant",
      atmosphere: parsed.atmosphere || "A well-designed, inviting space.",
      basedOnUserPreferences: stylePreferences,
      basedOnRoomAnalysis: roomAnalysis
        ? {
            roomType,
            currentColors: roomAnalysis.visualAnalysis?.colors || [],
            currentStyle: roomAnalysis.styleAnalysis?.primaryStyle,
            issues: roomAnalysis.issueAnalysis?.issues.map((i) => i.category) || [],
          }
        : undefined,

      // Generation metadata
      generationMethod: "ai_generated",
      aiModel: "claude-3-5-sonnet",

      // Design recommendations
      recommendations: parsed.recommendations || {},
    };
  } catch (error) {
    console.error("Error parsing moodboard narrative:", error);
    throw new Error(`Failed to parse moodboard narrative: ${String(error)}`);
  }
}

// ===== COLOR PALETTE GENERATION =====

/**
 * Generate color palette for moodboard
 * Task 1.5.5: Color extraction and palette creation
 */
function generateColorPalette(
  primaryStyle: string,
  colorPreference: string
): ColorPalette {
  // Define style-specific color palettes
  const paletteMap: Record<string, Record<string, ColorPalette>> = {
    warm: {
      modern: {
        primary: { hex: "#F5E6D3", name: "Warm Beige", usage: "walls" },
        secondary: [
          { hex: "#D4A574", name: "Tan", usage: "accent wall" },
          { hex: "#8B6F47", name: "Warm Brown", usage: "furniture" },
        ],
        accents: [
          { hex: "#E8A76A", name: "Warm Gold", mood: "energetic" },
          { hex: "#C97C7C", name: "Terracotta", mood: "warm" },
        ],
        mood: "warm",
        boldness: "balanced",
      },
      minimalist: {
        primary: { hex: "#FAFAF8", name: "Off-White", usage: "walls" },
        secondary: [
          { hex: "#D4C4B9", name: "Warm Gray", usage: "accents" },
        ],
        accents: [
          { hex: "#C9A576", name: "Warm Tan", mood: "calming" },
        ],
        mood: "warm",
        boldness: "subtle",
      },
    },
    cool: {
      modern: {
        primary: { hex: "#E8F0F5", name: "Cool White", usage: "walls" },
        secondary: [
          { hex: "#B0D4E8", name: "Light Blue", usage: "accent wall" },
          { hex: "#4A90A4", name: "Steel Blue", usage: "furniture" },
        ],
        accents: [
          { hex: "#2C5F7F", name: "Navy", mood: "sophisticated" },
          { hex: "#7DD3C0", name: "Seafoam", mood: "calm" },
        ],
        mood: "cool",
        boldness: "balanced",
      },
    },
    neutral: {
      modern: {
        primary: { hex: "#F5F5F5", name: "Light Gray", usage: "walls" },
        secondary: [
          { hex: "#D3D3D3", name: "Medium Gray", usage: "accents" },
          { hex: "#A9A9A9", name: "Dark Gray", usage: "furniture" },
        ],
        accents: [
          { hex: "#696969", name: "Charcoal", mood: "elegant" },
        ],
        mood: "neutral",
        boldness: "subtle",
      },
    },
  };

  // Return default palette if not found
  return (
    paletteMap[colorPreference]?.[primaryStyle] || {
      primary: { hex: "#F5F5F5", name: "Neutral", usage: "walls" },
      secondary: [{ hex: "#D3D3D3", name: "Gray", usage: "accents" }],
      accents: [{ hex: "#696969", name: "Charcoal", mood: "elegant" }],
      mood: "neutral",
      boldness: "balanced",
    }
  );
}

// ===== DESIGN ELEMENT GENERATION =====

/**
 * Generate design elements from recommendations
 */
function generateDesignElements(
  recommendations: Record<string, string[]>,
  primaryStyle: string,
  stylePreferences: StyleQuizResults
): DesignElement[] {
  const elements: DesignElement[] = [];

  // Process furniture recommendations
  (recommendations.furniture || []).slice(0, 3).forEach((item, idx) => {
    elements.push({
      type: "furniture",
      name: extractItemName(item),
      description: item,
      style: primaryStyle as any,
      mood: "functional",
      estimatedBudget: 300 + idx * 500,
    });
  });

  // Process lighting recommendations
  (recommendations.lighting || []).slice(0, 2).forEach((item) => {
    elements.push({
      type: "lighting",
      name: extractItemName(item),
      description: item,
      mood: "ambient",
      estimatedBudget: 100,
    });
  });

  // Process textile recommendations
  (recommendations.textiles || []).slice(0, 2).forEach((item) => {
    elements.push({
      type: "textiles",
      name: extractItemName(item),
      description: item,
      mood: "cozy",
      estimatedBudget: 50,
    });
  });

  // Process color accent recommendations
  (recommendations.color_accents || []).slice(0, 2).forEach((item) => {
    elements.push({
      type: "color_accent",
      name: extractItemName(item),
      description: item,
      mood: "vibrant",
    });
  });

  return elements;
}

/**
 * Extract item name from full recommendation string
 * E.g., "Leather sofa in charcoal gray" -> "Leather Sofa"
 */
function extractItemName(item: string): string {
  const match = item.match(/^[^,]*/);
  return match ? match[0].trim() : item;
}

// ===== MOODBOARD RESPONSE WRAPPER =====

/**
 * Generate complete moodboard response (without images - added in Task 1.5.4)
 */
export async function generateMoodboard(
  request: MoodboardGenerationRequest
): Promise<MoodboardGenerationResponse> {
  const startTime = Date.now();

  try {
    const moodboardData = await generateMoodboardConcept(request);

    // Add empty images array (will be filled in Task 1.5.4)
    const moodboard: Moodboard = {
      ...moodboardData,
      moodboardImages: [],
    };

    return {
      status: "success",
      moodboard,
      generationTime: Date.now() - startTime,
    };
  } catch (error) {
    console.error("Moodboard generation error:", error);
    return {
      status: "error",
      errorMessage: `Failed to generate moodboard: ${String(error)}`,
      generationTime: Date.now() - startTime,
    };
  }
}

export default {
  generateMoodboard,
  generateMoodboardConcept,
};
