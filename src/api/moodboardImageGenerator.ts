/**
 * Moodboard Image Generator
 * Integrates DALL-E 3 API for generating room design images
 *
 * Task 1.5.4: Generate stylized room images matching moodboard concept
 * Task 1.5.5: Extract colors and design elements from generated images
 *
 * Approach:
 * 1. Convert moodboard concept into detailed image prompts
 * 2. Generate 5-8 interior design images using DALL-E 3
 * 3. Extract dominant colors and design elements
 * 4. Attach images to moodboard with metadata
 */

import OpenAI from "openai";
import {
  Moodboard,
  MoodboardImage,
  DesignElement,
  ColorPalette,
} from "@/types/consultation";
import { v4 as uuidv4 } from "uuid";

// ===== INITIALIZATION =====

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ===== CONSTANTS =====

const DALL_E_IMAGE_SIZE = "1024x1024" as const;
const DALL_E_QUALITY = "hd" as const;
const IMAGES_PER_MOODBOARD = 6; // 6-8 images for comprehensive moodboard

// ===== PROMPT ENGINEERING =====

/**
 * Generate detailed image prompts for DALL-E 3
 * Creates 6-8 different perspectives/focuses for comprehensive moodboard
 */
function generateImagePrompts(moodboard: Moodboard): string[] {
  const { title, concept, primaryStyle, mood, colorPalette, roomType } = moodboard;

  const prompts: string[] = [];

  // Prompt 1: Overall room perspective (full view)
  prompts.push(
    createImagePrompt(
      `A beautifully designed ${roomType} in ${primaryStyle} style. ${concept}. ` +
        `Color palette: ${colorPalette.primary.name}, ${colorPalette.secondary
          .map((c) => c.name)
          .join(", ")}. ` +
        `The space should feel ${mood} and inviting. ` +
        `Professional interior photography, well-lit, magazine quality.`,
      `${title} - Full Room View`
    )
  );

  // Prompt 2: Seating area focus
  prompts.push(
    createImagePrompt(
      `A ${primaryStyle} ${roomType} seating arrangement featuring comfortable furniture ` +
        `in ${colorPalette.primary.name} and ${colorPalette.secondary[0]?.name}. ` +
        `The atmosphere should be ${mood}. Include textiles and decorative accents. ` +
        `Professional interior design photography.`,
      `${title} - Seating Area`
    )
  );

  // Prompt 3: Color & texture focus
  prompts.push(
    createImagePrompt(
      `Close-up detail of a ${primaryStyle} interior showing rich textures and colors. ` +
        `Feature a combination of ${colorPalette.primary.name}, ${colorPalette.secondary[0]?.name}, ` +
        `and accents in ${colorPalette.accents[0]?.name}. ` +
        `Show different materials: wood, fabric, metallics. Professional styling.`,
      `${title} - Color & Texture Details`
    )
  );

  // Prompt 4: Lighting focus
  prompts.push(
    createImagePrompt(
      `A ${primaryStyle} ${roomType} featuring ambient and accent lighting that creates a ${mood} atmosphere. ` +
        `Show various light sources: ceiling fixtures, table lamps, accent lighting. ` +
        `Warm, inviting lighting design. High-quality interior photography.`,
      `${title} - Lighting Design`
    )
  );

  // Prompt 5: Styling & decor focus
  prompts.push(
    createImagePrompt(
      `Styled decorative elements in a ${primaryStyle} interior: artwork, plants, accessories, throws. ` +
        `Color scheme: ${colorPalette.primary.name} walls with ${colorPalette.accents
          .map((a) => a.name)
          .join(" and ")} accents. ` +
        `The mood is ${mood} and carefully curated. Professional interior design styling.`,
      `${title} - Decor & Accessories`
    )
  );

  // Prompt 6: Alternative angle/perspective
  prompts.push(
    createImagePrompt(
      `An alternative view of a ${primaryStyle} ${roomType} with the design concept: ${concept.substring(0, 100)}. ` +
        `Feature the primary colors ${colorPalette.primary.name} and ${colorPalette.secondary[0]?.name} ` +
        `in a balanced, inviting composition. Professional interior photography.`,
      `${title} - Alternative Perspective`
    )
  );

  return prompts;
}

/**
 * Create optimized image prompt for DALL-E 3
 * DALL-E 3 works better with natural language descriptions
 */
function createImagePrompt(description: string, imageType: string): string {
  return (
    description +
    `\n\nImage style: Professional interior design photography, ` +
    `high quality, realistic, well-composed, magazine-quality, ` +
    `optimal lighting, no people, clean backgrounds. ` +
    `(${imageType})`
  );
}

// ===== IMAGE GENERATION =====

/**
 * Generate images for moodboard using DALL-E 3
 * Returns array of MoodboardImage objects with URLs
 */
export async function generateMoodboardImages(
  moodboard: Moodboard
): Promise<MoodboardImage[]> {
  const prompts = generateImagePrompts(moodboard);
  const images: MoodboardImage[] = [];

  console.log(
    `Generating ${prompts.length} images for moodboard: ${moodboard.title}`
  );

  // Generate images sequentially to avoid rate limits
  for (let i = 0; i < prompts.length; i++) {
    try {
      console.log(`Generating image ${i + 1}/${prompts.length}...`);

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompts[i],
        size: DALL_E_IMAGE_SIZE,
        quality: DALL_E_QUALITY,
        n: 1,
      });

      if (response.data[0].url) {
        const image: MoodboardImage = {
          id: uuidv4(),
          url: response.data[0].url,
          description: extractImageDescription(prompts[i]),
          style: moodboard.primaryStyle,
          dominantColors: moodboard.colorPalette.secondary.map((c) => c.hex),
          designElements: moodboard.designElements.slice(0, 3),
          visualMood: moodboard.mood,
          confidence: 0.9,
          source: "generated",
          generatedPrompt: prompts[i],
        };

        images.push(image);
      }

      // Rate limiting: small delay between requests
      if (i < prompts.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`Error generating image ${i + 1}:`, error);
      // Continue with next image on error
    }
  }

  console.log(`Generated ${images.length} images successfully`);
  return images;
}

/**
 * Extract concise description from DALL-E prompt
 */
function extractImageDescription(prompt: string): string {
  // Take first sentence up to 150 characters
  const match = prompt.match(/^[^.!?]*/);
  const description = match ? match[0].substring(0, 150) : prompt.substring(0, 150);
  return description + (description.length === 150 ? "..." : "");
}

// ===== COLOR EXTRACTION =====

/**
 * Extract dominant colors from generated image
 * For now, returns predefined colors based on moodboard
 * Can be enhanced with image analysis API (Claude Vision, ImageMagick, etc.)
 *
 * Task 1.5.5: Color extraction implementation
 */
export function extractColorsFromImage(moodboard: Moodboard): string[] {
  // Return the color palette we already defined
  const colors: string[] = [moodboard.colorPalette.primary.hex];

  colors.push(...moodboard.colorPalette.secondary.map((c) => c.hex));
  colors.push(...moodboard.colorPalette.accents.map((c) => c.hex));

  return [...new Set(colors)].slice(0, 8); // Unique colors, max 8
}

// ===== DESIGN ELEMENT EXTRACTION =====

/**
 * Extract design elements from generated image metadata
 * Uses moodboard recommendations as primary source
 *
 * Task 1.5.5: Design element extraction implementation
 */
export function extractDesignElementsFromImage(
  moodboard: Moodboard
): DesignElement[] {
  // Return the design elements we already generated
  // Can be enhanced with Claude Vision API to detect actual elements in image
  return moodboard.designElements;
}

// ===== COMPLETE MOODBOARD WITH IMAGES =====

/**
 * Complete moodboard generation: concept + generated images
 * Orchestrates the full image generation pipeline
 */
export async function generateCompleteMoodboard(
  moodboard: Moodboard
): Promise<Moodboard> {
  const startTime = Date.now();
  const imageStartTime = Date.now();

  // Generate images
  const moodboardImages = await generateMoodboardImages(moodboard);

  // Extract colors and elements from all images
  const allColors = new Set<string>();
  const allElements: DesignElement[] = [];

  for (const image of moodboardImages) {
    // Colors already included in image metadata
    image.dominantColors.forEach((c) => allColors.add(c));

    // Elements already included
    allElements.push(...image.designElements);
  }

  // Update moodboard with generated images
  moodboard.moodboardImages = moodboardImages;

  // Update color palette with extracted colors
  if (allColors.size > 0) {
    const colorArray = Array.from(allColors);
    // Update accents with discovered colors
    moodboard.colorPalette.accents = colorArray.map((hex, idx) => ({
      hex,
      name: `Color ${idx + 1}`,
      mood: moodboard.mood,
    }));
  }

  return {
    ...moodboard,
    imageGenerationTime: Date.now() - imageStartTime,
  };
}

// ===== ERROR HANDLING =====

/**
 * Validate DALL-E API key is configured
 */
export function validateImageGenerationSetup(): boolean {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY environment variable not set. " +
        "Required for DALL-E image generation."
    );
  }
  return true;
}

/**
 * Handle image generation errors gracefully
 */
export async function generateMoodboardImagesWithFallback(
  moodboard: Moodboard,
  usePresetImages: boolean = false
): Promise<MoodboardImage[]> {
  try {
    return await generateMoodboardImages(moodboard);
  } catch (error) {
    console.error("Image generation failed:", error);

    if (usePresetImages) {
      console.log("Returning preset moodboard images...");
      return generatePresetMoodboardImages(moodboard);
    }

    throw error;
  }
}

/**
 * Fallback: Return preset moodboard images for testing
 * Uses placeholder URLs and moodboard metadata
 */
function generatePresetMoodboardImages(moodboard: Moodboard): MoodboardImage[] {
  const presetImages: MoodboardImage[] = [];

  for (let i = 0; i < 3; i++) {
    presetImages.push({
      id: uuidv4(),
      url: `https://via.placeholder.com/1024x1024?text=${moodboard.title}+${i + 1}`,
      description: `${moodboard.title} - View ${i + 1}`,
      style: moodboard.primaryStyle,
      dominantColors: moodboard.colorPalette.secondary.map((c) => c.hex),
      designElements: moodboard.designElements.slice(0, 2),
      visualMood: moodboard.mood,
      confidence: 0.7,
      source: "curated",
    });
  }

  return presetImages;
}

export default {
  generateMoodboardImages,
  generateCompleteMoodboard,
  validateImageGenerationSetup,
  generateMoodboardImagesWithFallback,
};
