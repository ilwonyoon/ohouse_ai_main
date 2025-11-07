/**
 * Image Analysis API Route (Agent 1.3 - Task 1.3.3)
 * Handles room image uploads and vision API analysis
 *
 * Endpoint: POST /api/consultation/image-analysis
 * Request: multipart/form-data with image file
 * Response: ImageAnalysisResult with extracted metadata
 */

import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import {
  validateImageAnalysis,
  parseImageAnalysisResponse,
  extractMetadataFromImageAnalysis,
  calculateImageAnalysisConfidence,
} from "@/api/imageAnalyzer";
import {
  ImageAnalysisResult,
  ExtractedMetadata,
} from "@/types/consultation";

// ===== CONFIGURATION =====

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const REQUEST_TIMEOUT = 30000; // 30 seconds

// ===== ROUTE HANDLER =====

export async function POST(request: NextRequest) {
  try {
    // Validate content type
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("multipart/form-data")) {
      return NextResponse.json(
        {
          error: "Invalid content type. Expected multipart/form-data",
          code: "INVALID_CONTENT_TYPE",
        },
        { status: 400 }
      );
    }

    // Parse form data
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        {
          error: "Failed to parse form data",
          code: "FORM_PARSE_ERROR",
        },
        { status: 400 }
      );
    }

    // Extract image file
    const imageFile = formData.get("image") as File | null;
    const userId = formData.get("userId") as string | null;

    if (!imageFile) {
      return NextResponse.json(
        {
          error: "Image file is required",
          code: "MISSING_IMAGE",
        },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        {
          error: "User ID is required",
          code: "MISSING_USER_ID",
        },
        { status: 400 }
      );
    }

    // Validate image file
    const validation = validateImageFile(imageFile);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: validation.error,
          code: validation.code,
        },
        { status: 400 }
      );
    }

    // Convert image to base64 for API
    const imageBuffer = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    const imageHash = generateImageHash(imageBuffer);

    // Get image dimensions
    const dimensions = await extractImageDimensions(imageBuffer);
    if (!dimensions) {
      return NextResponse.json(
        {
          error: "Could not determine image dimensions",
          code: "INVALID_IMAGE",
        },
        { status: 400 }
      );
    }

    // Call vision API (implemented in Task 1.3.4)
    const analysisStartTime = Date.now();
    const analysisResult = await analyzeImageWithVision(
      base64Image,
      imageFile.type
    );
    const processingTime = Date.now() - analysisStartTime;

    if (!analysisResult) {
      return NextResponse.json(
        {
          error: "Vision API analysis failed",
          code: "ANALYSIS_FAILED",
        },
        { status: 500 }
      );
    }

    // Build complete result
    const completeAnalysis: ImageAnalysisResult = {
      ...analysisResult,
      id: uuidv4(),
      userId,
      uploadedAt: new Date(),
      processedAt: new Date(),
      imageSize: dimensions,
      imageHash,
      processingTime,
      confidence: calculateImageAnalysisConfidence(analysisResult),
      extractedMetadata: extractMetadataFromImageAnalysis(analysisResult),
    };

    // Validate result
    const validationResult = validateImageAnalysis(completeAnalysis);
    if (!validationResult.isValid) {
      return NextResponse.json(
        {
          error: "Image analysis validation failed",
          code: "VALIDATION_FAILED",
          details: validationResult.errors,
        },
        { status: 422 }
      );
    }

    // Return success
    return NextResponse.json(
      {
        success: true,
        data: completeAnalysis,
        processingTime,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Image analysis endpoint error:", error);

    return NextResponse.json(
      {
        error: "Internal server error during image analysis",
        code: "INTERNAL_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

// ===== HELPER FUNCTIONS =====

/**
 * Validate image file
 */
function validateImageFile(file: File): {
  isValid: boolean;
  error?: string;
  code?: string;
} {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File size exceeds maximum of 5MB (got ${(file.size / 1024 / 1024).toFixed(2)}MB)`,
      code: "FILE_TOO_LARGE",
    };
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: `Unsupported file type: ${file.type}. Allowed: JPEG, PNG, GIF, WebP`,
      code: "INVALID_FILE_TYPE",
    };
  }

  // Check file name
  if (!file.name) {
    return {
      isValid: false,
      error: "File name is required",
      code: "MISSING_FILE_NAME",
    };
  }

  return { isValid: true };
}

/**
 * Generate hash of image for deduplication
 */
function generateImageHash(buffer: ArrayBuffer): string {
  const hash = crypto.createHash("sha256");
  hash.update(Buffer.from(buffer));
  return hash.digest("hex");
}

/**
 * Extract image dimensions from buffer
 * Returns width and height if detectable, null otherwise
 */
async function extractImageDimensions(
  buffer: ArrayBuffer
): Promise<{ width: number; height: number } | null> {
  try {
    // For JPEG
    const jpegSignature = new Uint8Array(buffer).slice(0, 3);
    if (jpegSignature[0] === 0xff && jpegSignature[1] === 0xd8) {
      return extractJPEGDimensions(new Uint8Array(buffer));
    }

    // For PNG
    const pngSignature = new Uint8Array(buffer).slice(0, 8);
    if (
      pngSignature[0] === 0x89 &&
      pngSignature[1] === 0x50 &&
      pngSignature[2] === 0x4e
    ) {
      return extractPNGDimensions(new Uint8Array(buffer));
    }

    // Fallback: estimate from buffer size (rough approximation)
    // Most room photos are roughly square to 4:3 ratio
    const estimatedPixels = Math.sqrt(buffer.byteLength / 3); // Rough RGB estimate
    return {
      width: Math.round(estimatedPixels * 1.33), // 4:3 ratio assumption
      height: Math.round(estimatedPixels),
    };
  } catch {
    return null;
  }
}

/**
 * Extract JPEG dimensions from image buffer
 */
function extractJPEGDimensions(data: Uint8Array): { width: number; height: number } | null {
  try {
    let i = 2; // Skip JPEG signature
    while (i < data.length) {
      if (data[i] === 0xff) {
        const marker = data[i + 1];
        if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
          // SOF marker
          const height = (data[i + 5] << 8) | data[i + 6];
          const width = (data[i + 7] << 8) | data[i + 8];
          return { width, height };
        }
        const length = (data[i + 2] << 8) | data[i + 3];
        i += length + 2;
      } else {
        i++;
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Extract PNG dimensions from image buffer
 */
function extractPNGDimensions(data: Uint8Array): { width: number; height: number } | null {
  try {
    // PNG: width at bytes 16-19, height at bytes 20-23
    const width =
      (data[16] << 24) | (data[17] << 16) | (data[18] << 8) | data[19];
    const height =
      (data[20] << 24) | (data[21] << 16) | (data[22] << 8) | data[23];
    return { width, height };
  } catch {
    return null;
  }
}

// ===== VISION API INTEGRATION =====

/**
 * Analyze image using Claude 3.5 Sonnet vision API
 * Delegates to visionClient.ts for actual API integration
 */
async function analyzeImageWithVision(
  base64Image: string,
  mimeType: string
): Promise<any> {
  try {
    // Import vision client (lazy import to handle missing dependencies gracefully)
    const { analyzeRoomImage } = await import("@/api/visionClient");

    // Call vision API
    const analysisResult = await analyzeRoomImage(base64Image, mimeType);

    return analysisResult;
  } catch (error) {
    console.error("Vision API integration error:", error);

    // If API key not configured or API fails, provide helpful error
    if (error instanceof Error) {
      if (error.message.includes("ANTHROPIC_API_KEY")) {
        console.warn(
          "Vision API not configured. Add ANTHROPIC_API_KEY to .env.local"
        );
      }
    }

    return null;
  }
}

// ===== ERROR HANDLING =====

/**
 * Handle errors specific to image analysis
 */
interface AnalysisError {
  error: string;
  code: string;
  details?: string[];
  statusCode: number;
}

function createAnalysisError(
  error: Error,
  context: string
): AnalysisError {
  console.error(`Analysis error in ${context}:`, error);

  return {
    error: `Image analysis failed: ${error.message}`,
    code: "ANALYSIS_ERROR",
    statusCode: 500,
  };
}
