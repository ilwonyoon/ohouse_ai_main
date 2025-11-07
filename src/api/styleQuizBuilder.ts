/**
 * Style Quiz Builder (Agent 1.4 - Tasks 1.4.4 & 1.4.5)
 * Quiz generation, scoring, and style classification
 *
 * Purpose: Build quiz questions, calculate style preferences, generate insights
 */

import {
  StyleQuizQuestion,
  StyleQuizResponse,
  StyleQuizResults,
  StylePreference,
  StyleQuizInsights,
  StyleCategory,
  ExtractedMetadata,
} from "@/types/consultation";

// ===== STYLE TAXONOMY & DESCRIPTIONS =====

export interface StyleProfile {
  style: StyleCategory;
  displayName: string;
  description: string;
  characteristics: string[];
  colorProfile: {
    temperature: "warm" | "cool" | "neutral";
    boldness: "neutral" | "bold" | "vibrant";
  };
  materialPreference: {
    natural: number; // percentage
    synthetic: number;
  };
  formality: "casual" | "balanced" | "formal";
  ornamentation: "minimal" | "moderate" | "ornate";
  relatedStyles: StyleCategory[];
}

export const STYLE_TAXONOMY: Record<StyleCategory, StyleProfile> = {
  modern: {
    style: "modern",
    displayName: "Modern",
    description:
      "Clean lines, minimalist approach, and contemporary materials. Emphasizes function and simplicity.",
    characteristics: [
      "Clean lines",
      "Minimal ornamentation",
      "Neutral color palette",
      "Modern materials",
      "Open spaces",
    ],
    colorProfile: { temperature: "neutral", boldness: "neutral" },
    materialPreference: { natural: 40, synthetic: 60 },
    formality: "balanced",
    ornamentation: "minimal",
    relatedStyles: ["contemporary", "minimalist"],
  },
  contemporary: {
    style: "contemporary",
    displayName: "Contemporary",
    description:
      "Current trends, mixed materials, and eclectic elements. Blends various influences into cohesive design.",
    characteristics: [
      "Mixed textures",
      "Bold accent walls",
      "Current trends",
      "Varied materials",
      "Artistic elements",
    ],
    colorProfile: { temperature: "neutral", boldness: "bold" },
    materialPreference: { natural: 45, synthetic: 55 },
    formality: "balanced",
    ornamentation: "moderate",
    relatedStyles: ["modern", "eclectic"],
  },
  traditional: {
    style: "traditional",
    displayName: "Traditional",
    description:
      "Classic, formal, ornate designs honoring historical aesthetics. Rich fabrics and detailed finishes.",
    characteristics: [
      "Ornate details",
      "Rich fabrics",
      "Dark woods",
      "Historical references",
      "Formal symmetry",
    ],
    colorProfile: { temperature: "warm", boldness: "neutral" },
    materialPreference: { natural: 60, synthetic: 40 },
    formality: "formal",
    ornamentation: "ornate",
    relatedStyles: ["transitional", "victorian"],
  },
  transitional: {
    style: "transitional",
    displayName: "Transitional",
    description:
      "Blends modern and traditional elements. Offers the best of both worlds with balanced elegance.",
    characteristics: [
      "Mixed era furniture",
      "Balanced proportions",
      "Neutral palettes",
      "Quality craftsmanship",
      "Timeless appeal",
    ],
    colorProfile: { temperature: "warm", boldness: "neutral" },
    materialPreference: { natural: 55, synthetic: 45 },
    formality: "balanced",
    ornamentation: "moderate",
    relatedStyles: ["traditional", "modern"],
  },
  minimalist: {
    style: "minimalist",
    displayName: "Minimalist",
    description:
      "Extreme simplicity focusing on essential elements only. 'Less is more' philosophy.",
    characteristics: [
      "Essential elements only",
      "Monochromatic palette",
      "Hidden storage",
      "Blank spaces",
      "High functionality",
    ],
    colorProfile: { temperature: "neutral", boldness: "neutral" },
    materialPreference: { natural: 30, synthetic: 70 },
    formality: "balanced",
    ornamentation: "minimal",
    relatedStyles: ["modern", "scandinavian"],
  },
  maximalist: {
    style: "maximalist",
    displayName: "Maximalist",
    description:
      "Bold, layered, pattern-heavy designs with collected pieces. Celebrates abundance and personality.",
    characteristics: [
      "Bold patterns",
      "Layered textures",
      "Collected pieces",
      "Rich colors",
      "Personal expression",
    ],
    colorProfile: { temperature: "warm", boldness: "vibrant" },
    materialPreference: { natural: 50, synthetic: 50 },
    formality: "casual",
    ornamentation: "ornate",
    relatedStyles: ["bohemian", "eclectic"],
  },
  rustic: {
    style: "rustic",
    displayName: "Rustic",
    description:
      "Natural, weathered materials with farmhouse elements. Warm and welcoming with authentic character.",
    characteristics: [
      "Natural materials",
      "Weathered finishes",
      "Warm tones",
      "Exposed wood",
      "Earthy palette",
    ],
    colorProfile: { temperature: "warm", boldness: "neutral" },
    materialPreference: { natural: 85, synthetic: 15 },
    formality: "casual",
    ornamentation: "minimal",
    relatedStyles: ["farmhouse", "scandinavian"],
  },
  farmhouse: {
    style: "farmhouse",
    displayName: "Farmhouse",
    description:
      "Rural aesthetic with vintage elements and country charm. Practical yet inviting design.",
    characteristics: [
      "Shiplap walls",
      "Barn doors",
      "Vintage finds",
      "Cream and white",
      "Practical design",
    ],
    colorProfile: { temperature: "warm", boldness: "neutral" },
    materialPreference: { natural: 75, synthetic: 25 },
    formality: "casual",
    ornamentation: "minimal",
    relatedStyles: ["rustic", "cottage"],
  },
  scandinavian: {
    style: "scandinavian",
    displayName: "Scandinavian",
    description:
      "Light woods, functional design, and cozy hygge. Minimalist yet warm approach.",
    characteristics: [
      "Light woods",
      "Functional",
      "Cozy textures",
      "Natural light",
      "Neutral palette",
    ],
    colorProfile: { temperature: "cool", boldness: "neutral" },
    materialPreference: { natural: 70, synthetic: 30 },
    formality: "casual",
    ornamentation: "minimal",
    relatedStyles: ["minimalist", "modern"],
  },
  industrial: {
    style: "industrial",
    displayName: "Industrial",
    description:
      "Exposed brick, metal, and warehouse vibes. Raw materials and functional beauty.",
    characteristics: [
      "Exposed brick",
      "Metal fixtures",
      "Concrete",
      "Raw materials",
      "Loft-like spaces",
    ],
    colorProfile: { temperature: "cool", boldness: "neutral" },
    materialPreference: { natural: 40, synthetic: 60 },
    formality: "casual",
    ornamentation: "minimal",
    relatedStyles: ["contemporary", "modern"],
  },
  bohemian: {
    style: "bohemian",
    displayName: "Bohemian",
    description:
      "Eclectic, global, artistic, and laid-back. Celebrates free spirit and collected treasures.",
    characteristics: [
      "Global influences",
      "Colorful palette",
      "Layered textiles",
      "Artistic elements",
      "Relaxed vibe",
    ],
    colorProfile: { temperature: "warm", boldness: "vibrant" },
    materialPreference: { natural: 60, synthetic: 40 },
    formality: "casual",
    ornamentation: "moderate",
    relatedStyles: ["eclectic", "maximalist"],
  },
  eclectic: {
    style: "eclectic",
    displayName: "Eclectic",
    description:
      "Mixed styles, collected pieces, and personal expression. Uniquely curated and individualistic.",
    characteristics: [
      "Mixed styles",
      "Personal pieces",
      "Unique combinations",
      "Cultural references",
      "Individual story",
    ],
    colorProfile: { temperature: "warm", boldness: "bold" },
    materialPreference: { natural: 55, synthetic: 45 },
    formality: "casual",
    ornamentation: "moderate",
    relatedStyles: ["bohemian", "contemporary"],
  },
  mid_century_modern: {
    style: "mid_century_modern",
    displayName: "Mid-Century Modern",
    description:
      "1950s-60s influence with iconic furniture and geometric forms. Vintage modernity.",
    characteristics: [
      "Iconic furniture",
      "Geometric forms",
      "Teak wood",
      "Retro colors",
      "Functional design",
    ],
    colorProfile: { temperature: "warm", boldness: "bold" },
    materialPreference: { natural: 50, synthetic: 50 },
    formality: "balanced",
    ornamentation: "minimal",
    relatedStyles: ["contemporary", "modern"],
  },
  victorian: {
    style: "victorian",
    displayName: "Victorian",
    description:
      "Ornate, heavy fabrics, and historical period influence. Detailed and dramatically elegant.",
    characteristics: [
      "Ornate details",
      "Heavy drapery",
      "Dark woods",
      "Period furniture",
      "Jewel tones",
    ],
    colorProfile: { temperature: "warm", boldness: "neutral" },
    materialPreference: { natural: 70, synthetic: 30 },
    formality: "formal",
    ornamentation: "ornate",
    relatedStyles: ["traditional", "gothic"],
  },
  coastal: {
    style: "coastal",
    displayName: "Coastal",
    description:
      "Beachy, nautical, and light. Breezy and serene with sea-inspired colors.",
    characteristics: [
      "Light and airy",
      "Nautical elements",
      "Blue and white",
      "Natural textures",
      "Relaxed vibe",
    ],
    colorProfile: { temperature: "cool", boldness: "neutral" },
    materialPreference: { natural: 65, synthetic: 35 },
    formality: "casual",
    ornamentation: "minimal",
    relatedStyles: ["scandinavian", "transitional"],
  },
  southwest: {
    style: "southwest",
    displayName: "Southwest",
    description:
      "Earth tones, cultural patterns, and terra cotta. Warm and richly textured.",
    characteristics: [
      "Earth tones",
      "Cultural patterns",
      "Terra cotta",
      "Woven textiles",
      "Handcrafted pieces",
    ],
    colorProfile: { temperature: "warm", boldness: "bold" },
    materialPreference: { natural: 75, synthetic: 25 },
    formality: "casual",
    ornamentation: "moderate",
    relatedStyles: ["bohemian", "rustic"],
  },
  asian_inspired: {
    style: "asian_inspired",
    displayName: "Asian-Inspired",
    description:
      "Zen, natural materials, and balance. Minimal and nature-connected design.",
    characteristics: [
      "Zen principles",
      "Natural materials",
      "Balance",
      "Minimal clutter",
      "Nature connection",
    ],
    colorProfile: { temperature: "neutral", boldness: "neutral" },
    materialPreference: { natural: 80, synthetic: 20 },
    formality: "balanced",
    ornamentation: "minimal",
    relatedStyles: ["minimalist", "scandinavian"],
  },
  art_deco: {
    style: "art_deco",
    displayName: "Art Deco",
    description:
      "Geometric, bold colors, luxe finishes. 1920s-30s influence with glamorous appeal.",
    characteristics: [
      "Geometric patterns",
      "Metallic accents",
      "Bold colors",
      "Luxe finishes",
      "Symmetrical design",
    ],
    colorProfile: { temperature: "warm", boldness: "bold" },
    materialPreference: { natural: 40, synthetic: 60 },
    formality: "formal",
    ornamentation: "ornate",
    relatedStyles: ["glam", "traditional"],
  },
  glam: {
    style: "glam",
    displayName: "Glam",
    description:
      "Luxurious, bold, and metallic. Statement pieces and high-fashion influence.",
    characteristics: [
      "Metallic finishes",
      "Velvet fabrics",
      "Statement pieces",
      "Jewel tones",
      "Luxe materials",
    ],
    colorProfile: { temperature: "warm", boldness: "vibrant" },
    materialPreference: { natural: 35, synthetic: 65 },
    formality: "formal",
    ornamentation: "ornate",
    relatedStyles: ["art_deco", "maximalist"],
  },
  gothic: {
    style: "gothic",
    displayName: "Gothic",
    description:
      "Dark, moody, dramatic design. Statement pieces and vintage elements with edge.",
    characteristics: [
      "Dark colors",
      "Dramatic atmosphere",
      "Ornate details",
      "Vintage pieces",
      "Sophisticated mood",
    ],
    colorProfile: { temperature: "cool", boldness: "bold" },
    materialPreference: { natural: 60, synthetic: 40 },
    formality: "formal",
    ornamentation: "ornate",
    relatedStyles: ["victorian", "eclectic"],
  },
};

// ===== SCORING ALGORITHM =====

export function calculateStyleScores(
  responses: StyleQuizResponse[],
  questions: StyleQuizQuestion[]
): Map<StyleCategory, number> {
  const scores = new Map<StyleCategory, number>();

  // Initialize all styles to 0
  Object.keys(STYLE_TAXONOMY).forEach((style) => {
    scores.set(style as StyleCategory, 0);
  });

  // Score each response
  responses.forEach((response) => {
    const question = questions.find((q) => q.id === response.questionId);
    if (!question) return;

    const chosenImage =
      response.chosenImageId === "imageA" ? question.imageA : question.imageB;

    // Base score
    const baseScore = 2;
    const weight = question.weight || 1;
    const difficulty = question.difficulty === "hard" ? 2 : question.difficulty === "medium" ? 1.5 : 1;
    const multiplier = weight * difficulty;

    // Score primary style
    scores.set(
      chosenImage.style,
      (scores.get(chosenImage.style) || 0) + baseScore * multiplier
    );

    // Score secondary styles
    if (chosenImage.secondaryStyles) {
      chosenImage.secondaryStyles.forEach((style) => {
        scores.set(style, (scores.get(style) || 0) + 1 * multiplier);
      });
    }
  });

  return scores;
}

/**
 * Convert raw scores to 0-100 scale
 */
export function normalizeScores(scores: Map<StyleCategory, number>): Map<StyleCategory, number> {
  const maxScore = Math.max(...scores.values());
  const normalized = new Map<StyleCategory, number>();

  scores.forEach((score, style) => {
    normalized.set(style, Math.round((score / maxScore) * 100));
  });

  return normalized;
}

/**
 * Rank styles by score
 */
export function rankStyles(
  normalizedScores: Map<StyleCategory, number>
): StylePreference[] {
  const preferences: StylePreference[] = [];

  normalizedScores.forEach((score, style) => {
    preferences.push({
      style,
      score,
      confidence: score / 100, // Score directly correlates to confidence
    });
  });

  // Sort by score descending
  preferences.sort((a, b) => b.score - a.score);

  // Add percentages
  const total = preferences.reduce((sum, p) => sum + p.score, 0);
  preferences.forEach((p) => {
    p.percentage = Math.round((p.score / total) * 100);
  });

  return preferences;
}

/**
 * Generate insights from style preferences
 */
export function generateInsights(styleRanking: StylePreference[]): StyleQuizInsights {
  const topStyles = styleRanking.slice(0, 5);

  // Aggregate insights from top styles
  let warmCount = 0,
    coolCount = 0;
  let boldCount = 0,
    neutralCount = 0;
  let formalCount = 0,
    casualCount = 0;
  let minPatterns = 0,
    modPatterns = 0,
    boldPatterns = 0;
  let minOrnament = 0,
    modOrnament = 0,
    ornOrnament = 0;
  let naturalMat = 0,
    syntheticMat = 0;

  topStyles.forEach((pref) => {
    const profile = STYLE_TAXONOMY[pref.style];
    const weight = pref.confidence;

    // Color temperature
    if (profile.colorProfile.temperature === "warm") warmCount += weight;
    else if (profile.colorProfile.temperature === "cool") coolCount += weight;

    // Color boldness
    if (profile.colorProfile.boldness === "bold") boldCount += weight;
    else if (profile.colorProfile.boldness === "vibrant") boldCount += weight * 1.5;
    else neutralCount += weight;

    // Formality
    if (profile.formality === "formal") formalCount += weight;
    else if (profile.formality === "casual") casualCount += weight;

    // Patterns
    if (profile.ornamentation === "minimal") minPatterns += weight;
    else if (profile.ornamentation === "moderate") modPatterns += weight;
    else boldPatterns += weight;

    // Ornamentation
    if (profile.ornamentation === "minimal") minOrnament += weight;
    else if (profile.ornamentation === "moderate") modOrnament += weight;
    else ornOrnament += weight;

    // Materials
    naturalMat += (profile.materialPreference.natural / 100) * weight;
    syntheticMat += (profile.materialPreference.synthetic / 100) * weight;
  });

  // Determine dominant characteristics
  let colorPreference: "warm" | "cool" | "neutral" | "mixed" = "neutral";
  if (warmCount > coolCount * 1.5) colorPreference = "warm";
  else if (coolCount > warmCount * 1.5) colorPreference = "cool";
  else if (warmCount > 0 || coolCount > 0) colorPreference = "mixed";

  let colorBoldness: "neutral" | "bold" | "vibrant" = "neutral";
  if (boldCount > neutralCount * 1.5) colorBoldness = "bold";
  if (boldCount > neutralCount * 2.5) colorBoldness = "vibrant";

  let formality: "casual" | "balanced" | "formal" = "balanced";
  if (formalCount > casualCount * 1.5) formality = "formal";
  else if (casualCount > formalCount * 1.5) formality = "casual";

  let patterns: "minimal" | "moderate" | "bold" = "minimal";
  if (modPatterns > minPatterns) patterns = "moderate";
  if (boldPatterns > minPatterns && boldPatterns > modPatterns) patterns = "bold";

  let ornamentation: "minimal" | "moderate" | "ornate" = "minimal";
  if (modOrnament > minOrnament) ornamentation = "moderate";
  if (ornOrnament > minOrnament && ornOrnament > modOrnament) ornamentation = "ornate";

  return {
    colorPreference,
    colorBoldness,
    formality,
    patterns,
    ornamentation,
    materials: {
      natural: Math.round(naturalMat / topStyles.length),
      synthetic: Math.round(syntheticMat / topStyles.length),
      mixed: 100 - Math.round((naturalMat + syntheticMat) / topStyles.length),
    },
  };
}

/**
 * Generate personalized style profile text
 */
export function generateProfileText(
  primaryStyle: StylePreference,
  insights: StyleQuizInsights,
  styleRanking: StylePreference[]
): string {
  const primary = STYLE_TAXONOMY[primaryStyle.style];
  const secondary = styleRanking[1] ? STYLE_TAXONOMY[styleRanking[1].style] : null;

  let text = `You prefer ${primary.displayName} design with a ${insights.colorPreference} color palette and ${insights.formality} aesthetic.`;

  if (secondary) {
    text += ` Your design also incorporates ${secondary.displayName} elements,`;
  } else {
    text += ` Your style emphasizes`;
  }

  const traits = [];
  if (insights.ornamentation === "minimal") traits.push("clean simplicity");
  else if (insights.ornamentation === "moderate") traits.push("balanced details");
  else traits.push("ornate expression");

  if (insights.formality === "casual") traits.push("relaxed comfort");
  else if (insights.formality === "formal") traits.push("elegant sophistication");

  if (insights.materials.natural >= 60) traits.push("natural materials");
  else if (insights.materials.synthetic >= 60) traits.push("modern materials");

  text += ` focusing on ${traits.join(", ")}.`;

  return text;
}

/**
 * Extract metadata from quiz results
 */
export function extractMetadataFromResults(
  results: StyleQuizResults
): Partial<ExtractedMetadata> {
  return {
    style: {
      style_hints: results.styleRanking
        .slice(0, 3)
        .map((p) => p.style),
      color_preferences: [results.insights.colorPreference],
      formality_level: results.insights.formality,
      display_preference:
        results.insights.ornamentation === "minimal"
          ? "minimalist"
          : results.insights.ornamentation === "ornate"
            ? "eclectic"
            : "moderate",
      maintenance_preference: "willing_to_maintain",
    },
    confidence: results.primaryStyle.confidence,
    rawKeywords: [
      results.primaryStyle.style,
      ...results.styleRanking.slice(1, 3).map((p) => p.style),
      `color:${results.insights.colorPreference}`,
      `formality:${results.insights.formality}`,
      `patterns:${results.insights.patterns}`,
    ],
  };
}

/**
 * Build complete quiz results from responses
 */
export function buildQuizResults(
  sessionId: string,
  userId: string,
  responses: StyleQuizResponse[],
  questions: StyleQuizQuestion[]
): StyleQuizResults {
  // Calculate scores
  const rawScores = calculateStyleScores(responses, questions);
  const normalizedScores = normalizeScores(rawScores);
  const styleRanking = rankStyles(normalizedScores);

  // Primary style
  const primaryStyle = styleRanking[0];

  // Generate insights
  const insights = generateInsights(styleRanking);

  // Generate profile text
  const profile = generateProfileText(primaryStyle, insights, styleRanking);

  // Extract metadata
  const extractedMetadata = extractMetadataFromResults(
    {} as StyleQuizResults
  );

  return {
    sessionId,
    userId,
    completedAt: new Date(),
    primaryStyle,
    styleRanking,
    insights,
    profile,
    extractedMetadata,
  };
}
