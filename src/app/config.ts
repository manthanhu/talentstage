/**
 * Configuration validation and helper utilities
 * Ensures environment variables are properly set
 */

interface Config {
  api: {
    url: string;
    timeout: number;
    enableMock: boolean;
  };
  auth: {
    expiresIn: number;
    refreshTokenExpiresIn: number;
  };
  app: {
    name: string;
    version: string;
    debugMode: boolean;
  };
}

export function getConfig(): Config {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  const enableMock = process.env.NEXT_PUBLIC_ENABLE_MOCK_API !== "false";
  const debugMode = process.env.NEXT_PUBLIC_DEBUG_MODE === "true";

  if (debugMode) {
    console.log("[CONFIG]", {
      apiUrl,
      enableMock,
      debugMode,
    });
  }

  return {
    api: {
      url: apiUrl,
      timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000", 10),
      enableMock,
    },
    auth: {
      expiresIn: parseInt(
        process.env.NEXT_PUBLIC_JWT_EXPIRES_IN || "86400",
        10
      ),
      refreshTokenExpiresIn: parseInt(
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRES_IN || "604800",
        10
      ),
    },
    app: {
      name: process.env.NEXT_PUBLIC_APP_NAME || "TalentStage",
      version: process.env.NEXT_PUBLIC_APP_VERSION || "0.1.0",
      debugMode,
    },
  };
}

// Validate required configs
export function validateConfig(): string[] {
  const errors: string[] = [];
  const config = getConfig();

  if (!config.api.url) {
    errors.push("NEXT_PUBLIC_API_URL is not set");
  }

  if (config.api.timeout < 1000) {
    errors.push("API_TIMEOUT should be at least 1000ms");
  }

  if (config.auth.expiresIn < 300) {
    errors.push("JWT_EXPIRES_IN should be at least 300 seconds");
  }

  return errors;
}

// Log configuration status
export function logConfig() {
  const config = getConfig();
  const errors = validateConfig();

  if (errors.length > 0) {
    console.warn("[CONFIG ERRORS]", errors);
  }

  console.info("[APP CONFIG]", {
    app: config.app.name,
    version: config.app.version,
    apiUrl: config.api.url,
    mockApi: config.api.enableMock,
    debug: config.app.debugMode,
  });
}
