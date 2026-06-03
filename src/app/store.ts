"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthToken } from "./types";

interface AuthStore {
  user: User | null;
  token: AuthToken | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: AuthToken | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      logout: () => {
        set({ user: null, token: null, error: null });
      },
      isAuthenticated: () => get().user !== null && get().token !== null,
    }),
    {
      name: "auth-store",
      version: 1,
    }
  )
);

interface AppState {
  currentLanguage: string;
  theme: "dark" | "light";
  notifications: Array<{ id: string; message: string; type: "success" | "error" }>;
  setLanguage: (lang: string) => void;
  setTheme: (theme: "dark" | "light") => void;
  addNotification: (message: string, type: "success" | "error", duration?: number) => void;
  removeNotification: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentLanguage: "English",
      theme: "dark",
      notifications: [],
      setLanguage: (currentLanguage) => set({ currentLanguage }),
      setTheme: (theme) => set({ theme }),
      addNotification: (message, type, duration = 3000) => {
        const id = Date.now().toString();
        set((state) => ({
          notifications: [...state.notifications, { id, message, type }],
        }));
        if (duration > 0) {
          setTimeout(() => {
            set((state) => ({
              notifications: state.notifications.filter((n) => n.id !== id),
            }));
          }, duration);
        }
      },
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
    }),
    {
      name: "app-store",
      version: 1,
    }
  )
);
