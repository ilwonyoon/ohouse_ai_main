/**
 * Vision Client (Agent 1.3 - Task 1.3.4)
 * Integration with Anthropic Claude 3.5 Sonnet Vision API
 *
 * Purpose: Execute vision API calls and handle responses
 * Handles: Image analysis, prompt construction, response parsing, error handling
 */

import {
  parseImageAnalysisResponse,
  createImageAnalysisPrompt,
  validateImageAnalysis,
} from "@/api/imageAnalyzer";
import { ImageAnalysisResult } from "@/types/consultation";

// ===== CONFIGURATION =====

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-3-5-sonnet-20241022";
const MAX_TOKENS = 4096;
const REQUEST_TIMEOUT = 30000; // 30 seconds

// ===== INITIALIZATION =====

/**
 * Validate API key on module load
 */
if (!ANTHROPIC_API_KEY) {
  console.warn(
    "⚠️ ANTHROPIC_API_KEY not set. Vision API will not function. Add to .env.local"
  );
}

// ===== MAIN VISION ANALYSIS FUNCTION =====

/**
 * Analyze room image using Claude 3.5 Sonnet
 */
export async function analyzeRoomImage(
  base64Image: string,
  mimeType: string
): Promise<ImageAnalysisResult | null> {
  if (!ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY not configured. Cannot call vision API."
    );
  }

  try {
    // Validate inputs
    const supportedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!supportedMimeTypes.includes(mimeType)) {
      throw new Error(`Unsupported MIME type: ${mimeType}`);
    }

    if (!base64Image || base64Image.length === 0) {
      throw new Error("Image data is empty");
    }

    // Prepare API request
    const analysisPrompt = createImageAnalysisPrompt();
    const mediaType = mimeType as
      | "image/jpeg"
      | "image/png"
      | "image/gif"
      | "image/webp";

    const requestBody = {
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [
        {
          role: "user" as const,
          content: [
            {
              type: "image" as const,
              source: {
                type: "base64" as const,
                media_type: mediaType,
                data: base64Image,
              },
            },
            {
              type: "text" as const,
              text: analysisPrompt,
            },
          ],
        },
      ],
    };

    // Execute API call with timeout
    const response = await executeVisionAPICall(requestBody);

    if (!response) {
      console.error("Vision API returned empty response");
      return null;
    }

    // Parse response
    const analysisData = parseImageAnalysisResponse(response);

    if (!analysisData) {
      console.error("Failed to parse vision API response");
      return null;
    }

    // Validate parsed data
    const validation = validateImageAnalysis(analysisData);
    if (!validation.isValid) {
      console.error("Vision analysis validation failed:", validation.errors);
      return null;
    }

    // Set analysis metadata
    analysisData.analysisModel = MODEL;
    analysisData.rawAnalysis = response;

    return analysisData;
  } catch (error) {
    console.error("Vision API analysis error:", error);
    throw error;
  }
}

/**
 * Execute vision API call with retry logic
 */
async function executeVisionAPICall(
  requestBody: any,
  retryCount: number = 0
): Promise<string | null> {
  const maxRetries = 2;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle rate limiting with exponential backoff
    if (response.status === 429) {
      if (retryCount < maxRetries) {
        const retryAfter = parseInt(
          response.headers.get("retry-after") || "5"
        );
        console.log(`Rate limited. Retrying after ${retryAfter}s...`);
        await new Promise((r) => setTimeout(r, retryAfter * 1000));
        return executeVisionAPICall(requestBody, retryCount + 1);
      }
      throw new Error("Max retries exceeded due to rate limiting");
    }

    // Handle other HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Vision API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    // Parse successful response
    const data = await response.json();

    if (!data.content || !Array.isArray(data.content)) {
      throw new Error("Invalid response structure from vision API");
    }

    // Extract text content
    const textContent = data.content.find(
      (c: any) => c.type === "text"
    );
    if (!textContent) {
      throw new Error("No text content in vision API response");
    }

    return textContent.text;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(`Vision API request timeout (${REQUEST_TIMEOUT}ms)`);
      }
    }
    throw error;
  }
}

// ===== BATCH ANALYSIS (For future use) =====

/**
 * Analyze multiple room images (for multi-room projects)
 */
export async function analyzeMultipleRoomImages(
  images: Array<{ base64: string; mimeType: string; roomName?: string }>
): Promise<Array<{ roomName?: string; analysis: ImageAnalysisResult | null; error?: string }>> {
  const results = [];

  for (const image of images) {
    try {
      const analysis = await analyzeRoomImage(image.base64, image.mimeType);
      results.push({
        roomName: image.roomName,
        analysis,
      });
    } catch (error) {
      results.push({
        roomName: image.roomName,
        analysis: null,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return results;
}

// ===== COMPARISON WITH OTHER APIS =====

/**
 * Fallback to OpenAI GPT-4o Vision if Anthropic fails
 * Not implemented in this version, but structure for future use
 */
export async function analyzeRoomImageWithFallback(
  base64Image: string,
  mimeType: string
): Promise<ImageAnalysisResult | null> {
  try {
    // Try primary vision API (Claude 3.5 Sonnet)
    return await analyzeRoomImage(base64Image, mimeType);
  } catch (primaryError) {
    console.error("Primary vision API (Claude) failed:", primaryError);

    // In production, could fallback to GPT-4o Vision here
    // For now, propagate error
    throw primaryError;
  }
}

// ===== TESTING & DEBUGGING =====

/**
 * Test vision API connectivity
 */
export async function testVisionAPIConnectivity(): Promise<{
  connected: boolean;
  model: string;
  message?: string;
}> {
  if (!ANTHROPIC_API_KEY) {
    return {
      connected: false,
      model: MODEL,
      message: "ANTHROPIC_API_KEY not configured",
    };
  }

  try {
    // Simple test message without image
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 100,
        messages: [
          {
            role: "user",
            content: "Respond with OK",
          },
        ],
      }),
    });

    if (response.ok) {
      return {
        connected: true,
        model: MODEL,
        message: "Connection successful",
      };
    }

    return {
      connected: false,
      model: MODEL,
      message: `API returned status ${response.status}`,
    };
  } catch (error) {
    return {
      connected: false,
      model: MODEL,
      message:
        error instanceof Error ? error.message : "Unknown connection error",
    };
  }
}

/**
 * Generate sample analysis for testing (when API key not available)
 */
export function generateSampleImageAnalysis(): ImageAnalysisResult {
  return {
    id: "sample-analysis-001",
    userId: "test-user",
    uploadedAt: new Date(),
    processedAt: new Date(),
    imageSize: { width: 1920, height: 1080 },
    confidence: 0.85,
    processingTime: 3500,
    analysisModel: "claude-3-5-sonnet-20241022",
    roomAnalysis: {
      roomType: "living_room",
      confidence: 0.95,
      alternativeTypes: ["family_room"],
      estimatedSize: {
        category: "medium",
        estimatedSqFt: 250,
        description: "Standard-sized living room with open layout",
      },
      characteristics: {
        openLayout: true,
        multiLevel: false,
        hasWindows: 3,
        hasNaturalLight: "excellent",
        ceilingHeight: "standard",
        wallCondition: "good",
      },
      features: {
        fireplaces: 1,
        builtin_shelving: true,
      },
    },
    visualAnalysis: {
      colorPalette: {
        dominant: [
          {
            name: "warm white",
            hex: "#F5F1E8",
            rgb: { r: 245, g: 241, b: 232 },
            percentageOfVisible: 40,
            location: "walls",
          },
          {
            name: "sage green",
            hex: "#9CAF88",
            rgb: { r: 156, g: 175, b: 136 },
            percentageOfVisible: 25,
            location: "furniture",
          },
        ],
        secondary: [
          {
            name: "taupe",
            hex: "#B8A895",
            rgb: { r: 184, g: 168, b: 149 },
            percentageOfVisible: 20,
            location: "accents",
          },
        ],
        accents: [],
      },
      lighting: {
        naturalLight: "excellent",
        artificialLight: ["recessed_lights", "floor_lamp", "table_lamp"],
        overallBrightness: "bright",
        shadowPatterns: "even distribution",
        timeOfDay: "midday",
      },
      materials: {
        flooring: ["hardwood"],
        walls: ["painted"],
        ceiling: ["drywall"],
      },
      textureProfile: {
        glossy: false,
        matte: true,
        smooth: true,
        textured: false,
        wood_grain: true,
        patterns: [],
      },
    },
    styleAnalysis: {
      primaryStyle: "contemporary",
      confidence: 0.88,
      secondaryStyles: ["minimalist"],
      characteristics: {
        formality: "casual",
        eclecticism: "moderate",
        era: "contemporary",
        mood: ["cozy", "relaxing"],
      },
      designElements: {
        decorativeObjects: 15,
        artwork: 4,
        plants: 6,
        mirrors: 2,
        textiles: 8,
        patterns: false,
        symmetry: "asymmetric",
      },
      trendIndicators: ["minimalism", "natural_materials", "wellness"],
    },
    issueAnalysis: {
      visibleIssues: [
        {
          issue: "Insufficient task lighting in reading corner",
          severity: "moderate",
          category: "lighting",
          description: "The reading nook lacks adequate lighting for extended use",
        },
      ],
      opportunities: [
        {
          opportunity: "Add accent wall with deeper color for visual interest",
          priority: "medium",
          category: "color_refresh",
          estimatedImpact: "medium",
        },
        {
          opportunity: "Introduce patterned textiles for layered design",
          priority: "low",
          category: "art_decor",
          estimatedImpact: "low",
        },
      ],
      quickWins: [
        "Add larger area rug to define conversation zone",
        "Include additional throw pillows for texture variety",
        "Rearrange furniture for improved traffic flow",
      ],
      challenges: [],
      assessment: {
        clutterLevel: "low",
        organizationLevel: "organized",
        lightingAdequacy: "adequate",
        functionalityGaps: ["task_lighting"],
        designCoherence: "cohesive",
      },
    },
    extractedMetadata: {
      confidence: 0.85,
      rawKeywords: [
        "living_room",
        "size:medium",
        "light:excellent",
        "color:warm white",
        "color:sage green",
        "contemporary",
        "minimalist",
        "formality:casual",
        "issue:lighting",
        "opportunity:color_refresh",
      ],
    },
  };
}
