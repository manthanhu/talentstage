/**
 * Structured logging utility
 * Provides consistent logging across the app
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  component?: string;
  message: string;
  data?: unknown;
}

class Logger {
  private isDevelopment = typeof window === "undefined" || process.env.NODE_ENV === "development";

  log(
    level: LogLevel,
    message: string,
    component?: string,
    data?: unknown
  ): void {
    if (!this.isDevelopment && level === "debug") {
      return; // Skip debug logs in production
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      component,
      message,
      ...(data && { data }),
    };

    const prefix = component ? `[${component}]` : "";
    const logMessage = `${prefix} ${message}`;

    switch (level) {
      case "debug":
        console.debug(logMessage, data);
        break;
      case "info":
        console.info(logMessage, data);
        break;
      case "warn":
        console.warn(logMessage, data);
        break;
      case "error":
        console.error(logMessage, data);
        break;
    }

    // In production, could send to error tracking service
    // e.g., Sentry, LogRocket, etc.
  }

  debug(message: string, component?: string, data?: unknown) {
    this.log("debug", message, component, data);
  }

  info(message: string, component?: string, data?: unknown) {
    this.log("info", message, component, data);
  }

  warn(message: string, component?: string, data?: unknown) {
    this.log("warn", message, component, data);
  }

  error(message: string, component?: string, data?: unknown) {
    this.log("error", message, component, data);
  }
}

// Export singleton instance
export const logger = new Logger();

// Component-specific logger
export function getComponentLogger(componentName: string) {
  return {
    debug: (message: string, data?: unknown) =>
      logger.debug(message, componentName, data),
    info: (message: string, data?: unknown) =>
      logger.info(message, componentName, data),
    warn: (message: string, data?: unknown) =>
      logger.warn(message, componentName, data),
    error: (message: string, data?: unknown) =>
      logger.error(message, componentName, data),
  };
}
