/**
 * Error Handling & Validation (Agent 1.3 - Task 1.3.6)
 * Comprehensive error handling for image analysis pipeline
 *
 * Covers:
 * - API errors and retries
 * - Validation errors
 * - Image format errors
 * - Analysis quality issues
 * - Graceful degradation
 */

import { ImageAnalysisResult } from "@/types/consultation";

// ===== ERROR TYPES =====

export enum ImageAnalysisErrorCode {
  // File errors
  MISSING_FILE = "MISSING_FILE",
  FILE_TOO_LARGE = "FILE_TOO_LARGE",
  INVALID_FILE_TYPE = "INVALID_FILE_TYPE",
  CORRUPT_IMAGE = "CORRUPT_IMAGE",
  MISSING_FILE_NAME = "MISSING_FILE_NAME",

  // API errors
  API_KEY_MISSING = "API_KEY_MISSING",
  API_CONNECTION_ERROR = "API_CONNECTION_ERROR",
  API_TIMEOUT = "API_TIMEOUT",
  API_RATE_LIMITED = "API_RATE_LIMITED",
  API_INVALID_RESPONSE = "API_INVALID_RESPONSE",
  API_QUOTA_EXCEEDED = "API_QUOTA_EXCEEDED",

  // Analysis errors
  ANALYSIS_FAILED = "ANALYSIS_FAILED",
  INVALID_ANALYSIS_RESULT = "INVALID_ANALYSIS_RESULT",
  ANALYSIS_INCOMPLETE = "ANALYSIS_INCOMPLETE",
  ANALYSIS_CONFIDENCE_LOW = "ANALYSIS_CONFIDENCE_LOW",
  ANALYSIS_PARSE_ERROR = "ANALYSIS_PARSE_ERROR",

  // Validation errors
  VALIDATION_FAILED = "VALIDATION_FAILED",
  MISSING_REQUIRED_FIELD = "MISSING_REQUIRED_FIELD",
  INVALID_FIELD_VALUE = "INVALID_FIELD_VALUE",

  // System errors
  INTERNAL_ERROR = "INTERNAL_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export interface ImageAnalysisError {
  code: ImageAnalysisErrorCode;
  message: string;
  details?: Record<string, any>;
  statusCode?: number;
  isRetryable: boolean;
  timestamp: Date;
}

// ===== ERROR FACTORY =====

export class ImageAnalysisErrorHandler {
  /**
   * Create detailed error object
   */
  static createError(
    code: ImageAnalysisErrorCode,
    message: string,
    details?: Record<string, any>
  ): ImageAnalysisError {
    return {
      code,
      message,
      details,
      isRetryable: this.isRetryable(code),
      timestamp: new Date(),
    };
  }

  /**
   * Determine if error is retryable
   */
  static isRetryable(code: ImageAnalysisErrorCode): boolean {
    const retryableCodes = [
      ImageAnalysisErrorCode.API_CONNECTION_ERROR,
      ImageAnalysisErrorCode.API_TIMEOUT,
      ImageAnalysisErrorCode.API_RATE_LIMITED,
      ImageAnalysisErrorCode.API_QUOTA_EXCEEDED,
      ImageAnalysisErrorCode.ANALYSIS_FAILED,
    ];
    return retryableCodes.includes(code);
  }

  /**
   * Get HTTP status code for error
   */
  static getStatusCode(code: ImageAnalysisErrorCode): number {
    const statusMap: Record<ImageAnalysisErrorCode, number> = {
      [ImageAnalysisErrorCode.MISSING_FILE]: 400,
      [ImageAnalysisErrorCode.FILE_TOO_LARGE]: 413,
      [ImageAnalysisErrorCode.INVALID_FILE_TYPE]: 415,
      [ImageAnalysisErrorCode.CORRUPT_IMAGE]: 400,
      [ImageAnalysisErrorCode.MISSING_FILE_NAME]: 400,
      [ImageAnalysisErrorCode.API_KEY_MISSING]: 500,
      [ImageAnalysisErrorCode.API_CONNECTION_ERROR]: 502,
      [ImageAnalysisErrorCode.API_TIMEOUT]: 504,
      [ImageAnalysisErrorCode.API_RATE_LIMITED]: 429,
      [ImageAnalysisErrorCode.API_INVALID_RESPONSE]: 502,
      [ImageAnalysisErrorCode.API_QUOTA_EXCEEDED]: 429,
      [ImageAnalysisErrorCode.ANALYSIS_FAILED]: 500,
      [ImageAnalysisErrorCode.INVALID_ANALYSIS_RESULT]: 422,
      [ImageAnalysisErrorCode.ANALYSIS_INCOMPLETE]: 422,
      [ImageAnalysisErrorCode.ANALYSIS_CONFIDENCE_LOW]: 422,
      [ImageAnalysisErrorCode.ANALYSIS_PARSE_ERROR]: 500,
      [ImageAnalysisErrorCode.VALIDATION_FAILED]: 422,
      [ImageAnalysisErrorCode.MISSING_REQUIRED_FIELD]: 422,
      [ImageAnalysisErrorCode.INVALID_FIELD_VALUE]: 422,
      [ImageAnalysisErrorCode.INTERNAL_ERROR]: 500,
      [ImageAnalysisErrorCode.UNKNOWN_ERROR]: 500,
    };
    return statusMap[code] || 500;
  }

  /**
   * User-friendly error message
   */
  static getUserMessage(code: ImageAnalysisErrorCode): string {
    const messages: Record<ImageAnalysisErrorCode, string> = {
      [ImageAnalysisErrorCode.MISSING_FILE]:
        "Please select an image file to analyze",
      [ImageAnalysisErrorCode.FILE_TOO_LARGE]:
        "File is too large (max 5MB). Please choose a smaller image",
      [ImageAnalysisErrorCode.INVALID_FILE_TYPE]:
        "File type not supported. Please use JPEG, PNG, GIF, or WebP",
      [ImageAnalysisErrorCode.CORRUPT_IMAGE]:
        "Image file appears to be corrupted. Please try another image",
      [ImageAnalysisErrorCode.MISSING_FILE_NAME]:
        "Image file name is missing",
      [ImageAnalysisErrorCode.API_KEY_MISSING]:
        "Service is not configured. Please try again later",
      [ImageAnalysisErrorCode.API_CONNECTION_ERROR]:
        "Network error. Please check your connection and try again",
      [ImageAnalysisErrorCode.API_TIMEOUT]:
        "Analysis is taking longer than expected. Please try again",
      [ImageAnalysisErrorCode.API_RATE_LIMITED]:
        "Service is busy. Please wait a moment and try again",
      [ImageAnalysisErrorCode.API_INVALID_RESPONSE]:
        "Unexpected response from analysis service. Please try again",
      [ImageAnalysisErrorCode.API_QUOTA_EXCEEDED]:
        "Service quota exceeded. Please try again later",
      [ImageAnalysisErrorCode.ANALYSIS_FAILED]:
        "Could not analyze this image. Please try another photo",
      [ImageAnalysisErrorCode.INVALID_ANALYSIS_RESULT]:
        "Analysis results were incomplete. Please try again",
      [ImageAnalysisErrorCode.ANALYSIS_INCOMPLETE]:
        "Analysis did not complete successfully. Please try another image",
      [ImageAnalysisErrorCode.ANALYSIS_CONFIDENCE_LOW]:
        "Could not confidently identify this room. Please try a clearer photo",
      [ImageAnalysisErrorCode.ANALYSIS_PARSE_ERROR]:
        "Error processing analysis results. Please try again",
      [ImageAnalysisErrorCode.VALIDATION_FAILED]:
        "Analysis validation failed. Please try another image",
      [ImageAnalysisErrorCode.MISSING_REQUIRED_FIELD]:
        "Analysis is missing required information. Please try again",
      [ImageAnalysisErrorCode.INVALID_FIELD_VALUE]:
        "Analysis contains invalid data. Please try again",
      [ImageAnalysisErrorCode.INTERNAL_ERROR]:
        "An unexpected error occurred. Please try again later",
      [ImageAnalysisErrorCode.UNKNOWN_ERROR]:
        "Unknown error occurred. Please try again",
    };
    return messages[code] || "An error occurred during image analysis";
  }
}

// ===== VALIDATION HELPERS =====

export class ImageValidationHelper {
  /**
   * Validate file before upload
   */
  static validateFile(file: File, maxSizeMB: number = 5): ImageAnalysisError | null {
    // Check file presence
    if (!file) {
      return ImageAnalysisErrorHandler.createError(
        ImageAnalysisErrorCode.MISSING_FILE,
        "No file provided"
      );
    }

    // Check file name
    if (!file.name) {
      return ImageAnalysisErrorHandler.createError(
        ImageAnalysisErrorCode.MISSING_FILE_NAME,
        "File name is missing"
      );
    }

    // Check file size
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      return ImageAnalysisErrorHandler.createError(
        ImageAnalysisErrorCode.FILE_TOO_LARGE,
        `File size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds limit of ${maxSizeMB}MB`,
        {
          fileSize: file.size,
          maxSize: maxBytes,
          fileName: file.name,
        }
      );
    }

    // Check file type
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      return ImageAnalysisErrorHandler.createError(
        ImageAnalysisErrorCode.INVALID_FILE_TYPE,
        `File type ${file.type} is not supported`,
        {
          fileType: file.type,
          validTypes,
          fileName: file.name,
        }
      );
    }

    return null;
  }

  /**
   * Validate image buffer
   */
  static validateImageBuffer(buffer: ArrayBuffer): ImageAnalysisError | null {
    if (!buffer || buffer.byteLength === 0) {
      return ImageAnalysisErrorHandler.createError(
        ImageAnalysisErrorCode.CORRUPT_IMAGE,
        "Image buffer is empty"
      );
    }

    // Check for image file signatures
    const view = new Uint8Array(buffer);

    // JPEG signature: FF D8 FF
    if (
      view[0] === 0xff &&
      view[1] === 0xd8 &&
      view[2] === 0xff
    ) {
      return null; // Valid JPEG
    }

    // PNG signature: 89 50 4E 47
    if (
      view[0] === 0x89 &&
      view[1] === 0x50 &&
      view[2] === 0x4e &&
      view[3] === 0x47
    ) {
      return null; // Valid PNG
    }

    // GIF signature: 47 49 46
    if (
      view[0] === 0x47 &&
      view[1] === 0x49 &&
      view[2] === 0x46
    ) {
      return null; // Valid GIF
    }

    // WebP signature: RIFF ... WEBP
    if (
      view[0] === 0x52 &&
      view[1] === 0x49 &&
      view[2] === 0x46 &&
      view[3] === 0x46
    ) {
      // Check for WEBP magic bytes
      if (
        view[8] === 0x57 &&
        view[9] === 0x45 &&
        view[10] === 0x42 &&
        view[11] === 0x50
      ) {
        return null; // Valid WebP
      }
    }

    return ImageAnalysisErrorHandler.createError(
      ImageAnalysisErrorCode.CORRUPT_IMAGE,
      "Image file signature does not match expected format",
      {
        firstBytes: Array.from(view.slice(0, 8)).map((b) =>
          b.toString(16)
        ),
      }
    );
  }
}

// ===== RETRY LOGIC =====

export class RetryHelper {
  /**
   * Execute function with retry logic
   */
  static async withRetry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 2,
    delayMs: number = 1000
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // Check if retryable
        const isLastAttempt = attempt === maxRetries;
        if (isLastAttempt) {
          throw lastError;
        }

        // Exponential backoff
        const delay = delayMs * Math.pow(2, attempt);
        console.log(
          `Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  }

  /**
   * Get retry delay based on error code
   */
  static getRetryDelay(
    code: ImageAnalysisErrorCode,
    retryCount: number
  ): number {
    const baseDelays: Record<ImageAnalysisErrorCode, number> = {
      [ImageAnalysisErrorCode.API_RATE_LIMITED]: 5000, // 5s base
      [ImageAnalysisErrorCode.API_QUOTA_EXCEEDED]: 30000, // 30s base
      [ImageAnalysisErrorCode.API_TIMEOUT]: 2000, // 2s base
      [ImageAnalysisErrorCode.API_CONNECTION_ERROR]: 1000, // 1s base
      [ImageAnalysisErrorCode.ANALYSIS_FAILED]: 2000, // 2s base
      [ImageAnalysisErrorCode.UNKNOWN_ERROR]: 1000, // 1s base
      // Non-retryable errors get 0 (no retry)
      [ImageAnalysisErrorCode.MISSING_FILE]: 0,
      [ImageAnalysisErrorCode.FILE_TOO_LARGE]: 0,
      [ImageAnalysisErrorCode.INVALID_FILE_TYPE]: 0,
      [ImageAnalysisErrorCode.CORRUPT_IMAGE]: 0,
      [ImageAnalysisErrorCode.MISSING_FILE_NAME]: 0,
      [ImageAnalysisErrorCode.API_KEY_MISSING]: 0,
      [ImageAnalysisErrorCode.API_INVALID_RESPONSE]: 0,
      [ImageAnalysisErrorCode.INVALID_ANALYSIS_RESULT]: 0,
      [ImageAnalysisErrorCode.ANALYSIS_INCOMPLETE]: 0,
      [ImageAnalysisErrorCode.ANALYSIS_CONFIDENCE_LOW]: 0,
      [ImageAnalysisErrorCode.ANALYSIS_PARSE_ERROR]: 0,
      [ImageAnalysisErrorCode.VALIDATION_FAILED]: 0,
      [ImageAnalysisErrorCode.MISSING_REQUIRED_FIELD]: 0,
      [ImageAnalysisErrorCode.INVALID_FIELD_VALUE]: 0,
      [ImageAnalysisErrorCode.INTERNAL_ERROR]: 0,
    };

    const baseDelay = baseDelays[code] || 0;
    if (baseDelay === 0) return 0; // Non-retryable

    // Exponential backoff: baseDelay * 2^retryCount
    return baseDelay * Math.pow(2, retryCount);
  }
}

// ===== FALLBACK STRATEGIES =====

export class FallbackStrategy {
  /**
   * Return minimal valid analysis when full analysis fails
   */
  static createMinimalAnalysis(error: ImageAnalysisError): Partial<ImageAnalysisResult> {
    return {
      confidence: 0.3, // Low confidence fallback
      roomAnalysis: {
        roomType: "other",
        confidence: 0.2,
        estimatedSize: {
          category: "medium",
          description: "Unable to determine from image",
        },
        characteristics: {
          openLayout: false,
          multiLevel: false,
          hasWindows: 0,
          hasNaturalLight: "moderate",
          ceilingHeight: "standard",
          wallCondition: "unknown" as any,
        },
        features: {},
      },
      rawAnalysis: `Fallback analysis due to: ${error.message}`,
    };
  }

  /**
   * Determine if fallback should be used
   */
  static shouldUseFallback(
    analysis: ImageAnalysisResult | null,
    error: ImageAnalysisError | null
  ): boolean {
    if (!analysis && error) {
      return error.isRetryable === false; // Use fallback for permanent errors
    }
    if (
      analysis &&
      analysis.confidence < 0.4
    ) {
      return true; // Use fallback for low-confidence results
    }
    return false;
  }
}
