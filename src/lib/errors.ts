/**
 * Custom Error Types for Structured Error Handling
 * All consultation-related errors inherit from ConsultationError
 */

/**
 * Base error class for all consultation errors
 */
export class ConsultationError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ConsultationError';
    Object.setPrototypeOf(this, ConsultationError.prototype);
  }

  toJSON() {
    return {
      error: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      context: this.context,
    };
  }
}

/**
 * Validation error - invalid input data
 */
export class ValidationError extends ConsultationError {
  constructor(
    message: string,
    public details: Record<string, unknown> = {},
    context?: Record<string, unknown>
  ) {
    super('VALIDATION_FAILED', 400, message, context);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Metadata extraction error - LLM or pattern matching failed
 */
export class MetadataExtractionError extends ConsultationError {
  constructor(
    message: string,
    public source: 'llm' | 'pattern' | 'hybrid' = 'hybrid',
    context?: Record<string, unknown>
  ) {
    super('METADATA_EXTRACTION_FAILED', 500, message, context);
    this.name = 'MetadataExtractionError';
    Object.setPrototypeOf(this, MetadataExtractionError.prototype);
  }
}

/**
 * OpenAI API error
 */
export class OpenAIError extends ConsultationError {
  constructor(
    message: string,
    public openaiErrorCode?: string,
    public retryable: boolean = false,
    context?: Record<string, unknown>
  ) {
    const statusCode = getStatusCodeForOpenAIError(openaiErrorCode);
    super('OPENAI_API_ERROR', statusCode, message, context);
    this.name = 'OpenAIError';
    Object.setPrototypeOf(this, OpenAIError.prototype);
  }
}

/**
 * Rate limiting error
 */
export class RateLimitError extends ConsultationError {
  constructor(
    message: string = 'Rate limit exceeded',
    public retryAfter?: number,
    context?: Record<string, unknown>
  ) {
    super('RATE_LIMIT_EXCEEDED', 429, message, context);
    this.name = 'RateLimitError';
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}

/**
 * Consultation not found error
 */
export class ConsultationNotFoundError extends ConsultationError {
  constructor(
    consultationId: string,
    context?: Record<string, unknown>
  ) {
    super(
      'CONSULTATION_NOT_FOUND',
      404,
      `Consultation with ID ${consultationId} not found`,
      context
    );
    this.name = 'ConsultationNotFoundError';
    Object.setPrototypeOf(this, ConsultationNotFoundError.prototype);
  }
}

/**
 * Brief generation error
 */
export class BriefGenerationError extends ConsultationError {
  constructor(
    message: string,
    context?: Record<string, unknown>
  ) {
    super('BRIEF_GENERATION_FAILED', 500, message, context);
    this.name = 'BriefGenerationError';
    Object.setPrototypeOf(this, BriefGenerationError.prototype);
  }
}

/**
 * Determine HTTP status code from OpenAI error code
 */
function getStatusCodeForOpenAIError(errorCode?: string): number {
  if (!errorCode) return 500;

  const statusMap: Record<string, number> = {
    'rate_limit_exceeded': 429,
    'invalid_request_error': 400,
    'authentication_error': 401,
    'permission_error': 403,
    'server_error': 500,
    'service_unavailable_error': 503,
  };

  return statusMap[errorCode] || 500;
}

/**
 * Check if error is retryable
 */
export function isRetryableError(error: unknown): boolean {
  if (error instanceof OpenAIError) {
    return error.retryable;
  }
  if (error instanceof RateLimitError) {
    return true;
  }
  // Network errors, timeouts etc.
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes('econnrefused') ||
      message.includes('enotfound') ||
      message.includes('timeout') ||
      message.includes('network')
    );
  }
  return false;
}

/**
 * Format error response for HTTP
 */
export function formatErrorResponse(error: unknown) {
  if (error instanceof ConsultationError) {
    return {
      success: false,
      error: error.name,
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
      ...(error.context && { context: error.context }),
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      error: 'UnknownError',
      code: 'UNKNOWN_ERROR',
      message: error.message,
      statusCode: 500,
    };
  }

  return {
    success: false,
    error: 'UnknownError',
    code: 'UNKNOWN_ERROR',
    message: 'An unknown error occurred',
    statusCode: 500,
  };
}
