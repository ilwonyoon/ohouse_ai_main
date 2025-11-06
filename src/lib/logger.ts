/**
 * Basic Logger Implementation
 * Structured logging for debugging and monitoring
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';
type LogContext = Record<string, unknown>;

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: LogContext;
  timestamp: string;
  stack?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Log debug message (development only)
   */
  debug(message: string, context?: LogContext) {
    this.log('debug', message, context);
  }

  /**
   * Log info message
   */
  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  /**
   * Log warning message
   */
  warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  /**
   * Log error message
   */
  error(message: string, error?: Error | null, context?: LogContext) {
    const finalContext = {
      ...context,
      ...(error && {
        errorMessage: error.message,
        errorStack: error.stack,
        errorName: error.name,
      }),
    };
    this.log('error', message, finalContext);
  }

  /**
   * Internal log implementation
   */
  private log(level: LogLevel, message: string, context?: LogContext) {
    // Skip debug logs in production
    if (level === 'debug' && !this.isDevelopment) {
      return;
    }

    const logEntry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(context && { context }),
    };

    // Output format depends on environment
    if (this.isDevelopment) {
      this.logDevelopment(logEntry);
    } else {
      this.logProduction(logEntry);
    }
  }

  /**
   * Development-friendly console output
   */
  private logDevelopment(entry: LogEntry) {
    const colors = {
      debug: '\x1b[36m', // cyan
      info: '\x1b[32m', // green
      warn: '\x1b[33m', // yellow
      error: '\x1b[31m', // red
      reset: '\x1b[0m',
    };

    const color = colors[entry.level];
    const prefix = `${color}[${entry.timestamp}] ${entry.level.toUpperCase()}${colors.reset}`;

    if (entry.context) {
      console.log(prefix, entry.message, entry.context);
    } else {
      console.log(prefix, entry.message);
    }
  }

  /**
   * Production JSON output (for log aggregation)
   */
  private logProduction(entry: LogEntry) {
    console.log(JSON.stringify(entry));
  }
}

// Export singleton instance
export const logger = new Logger();

/**
 * Request logging middleware for Next.js
 */
export function createLoggingMiddleware() {
  return (request: any, response: any, next: any) => {
    const startTime = Date.now();
    const { method, url } = request;

    // Log after response
    const originalSend = response.send;
    response.send = function (data: any) {
      const duration = Date.now() - startTime;
      const { statusCode } = response;

      logger.info(`HTTP ${method} ${url}`, {
        statusCode,
        duration: `${duration}ms`,
        method,
        path: url,
      });

      originalSend.call(this, data);
    };

    next();
  };
}

/**
 * Wrap API handler with logging
 */
export function withLogging<T extends (...args: any[]) => Promise<any>>(
  handler: T,
  operationName: string
): T {
  return (async (...args: any[]) => {
    const startTime = Date.now();

    try {
      const result = await handler(...args);
      const duration = Date.now() - startTime;

      logger.info(`Operation completed: ${operationName}`, {
        operation: operationName,
        duration: `${duration}ms`,
        success: true,
      });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;

      logger.error(`Operation failed: ${operationName}`, error instanceof Error ? error : null, {
        operation: operationName,
        duration: `${duration}ms`,
        success: false,
      });

      throw error;
    }
  }) as T;
}
