/**
 * HTTP Client Template
 * Copy this file to src/app/http-client.ts when ready to connect real backend
 * 
 * This is a template showing how to replace the mock API service
 * with a real HTTP client (using fetch or axios)
 */

import type { ApiResponse, User, Talent } from "./types";

// Example using fetch (built-in)
class HTTPClient {
  private baseURL: string;
  private timeout: number;

  constructor(baseURL: string, timeout: number = 30000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    // Get from Zustand store
    // return useAuthStore.getState().token?.accessToken || null;
    return localStorage.getItem("auth-token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "API Error");
      }

      return data;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // HTTP Methods
  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  post<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  put<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }

  patch<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }
}

// Create instance
export const httpClient = new HTTPClient(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
);

// Example API functions using the HTTP client
export const authAPI = {
  async signup(email: string, password: string, displayName: string) {
    return httpClient.post<ApiResponse<{ user: User }>>("/auth/signup", {
      email,
      password,
      displayName,
    });
  },

  async login(email: string, password: string) {
    return httpClient.post<ApiResponse<{ user: User }>>("/auth/login", {
      email,
      password,
    });
  },
};

export const talentAPI = {
  async getTalents(filters?: Record<string, any>) {
    const query = new URLSearchParams(filters || {}).toString();
    const endpoint = `/talents${query ? `?${query}` : ""}`;
    return httpClient.get<ApiResponse<Talent[]>>(endpoint);
  },

  async createTalent(userId: string, data: Partial<Talent>) {
    return httpClient.post<ApiResponse<Talent>>("/talents", {
      ...data,
      userId,
    });
  },

  async updateTalent(talentId: string, data: Partial<Talent>) {
    return httpClient.put<ApiResponse<Talent>>(`/talents/${talentId}`, data);
  },

  async deleteTalent(talentId: string) {
    return httpClient.delete<ApiResponse<void>>(`/talents/${talentId}`);
  },
};

// Re-export for backwards compatibility
export const api = {
  auth: authAPI,
  talent: talentAPI,
  // Add other API groups as needed
};

/**
 * Migration Guide:
 * 
 * 1. Update .env.local:
 *    NEXT_PUBLIC_API_URL=https://api.yourdomain.com
 *    NEXT_PUBLIC_ENABLE_MOCK_API=false
 * 
 * 2. In src/app/api-service.ts, replace the export with:
 *    export { api } from './http-client';
 * 
 * 3. Handle token refresh:
 *    // Add interceptor for 401 responses
 *    // Refresh token and retry request
 * 
 * 4. Test all endpoints with real backend
 * 
 * 5. Remove mock data generators from old api-service.ts
 */
