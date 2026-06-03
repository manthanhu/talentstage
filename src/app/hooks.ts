"use client";

import { useAuthStore, useAppStore } from "./store";
import { api } from "./api-service";
import { useCallback } from "react";
import type { User, AuthToken } from "./types";

// useAuth hook - manages authentication
export const useAuth = () => {
  const { user, token, isLoading, error, setUser, setToken, setLoading, setError, logout } =
    useAuthStore();

  const signup = useCallback(
    async (email: string, password: string, displayName: string) => {
      setLoading(true);
      setError(null);
      try {
        const { user, token } = await api.auth.signup(email, password, displayName);
        setUser(user);
        setToken(token);
        return { success: true, user };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Signup failed";
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setUser, setToken]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        const { user, token } = await api.auth.login(email, password);
        setUser(user);
        setToken(token);
        return { success: true, user };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Login failed";
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setUser, setToken]
  );

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: user !== null && token !== null,
    signup,
    login,
    logout: handleLogout,
  };
};

// useAppNotification hook - manage notifications
export const useAppNotification = () => {
  const { addNotification, removeNotification } = useAppStore();

  const success = useCallback(
    (message: string, duration?: number) => {
      addNotification(message, "success", duration);
    },
    [addNotification]
  );

  const error = useCallback(
    (message: string, duration?: number) => {
      addNotification(message, "error", duration);
    },
    [addNotification]
  );

  return { success, error, remove: removeNotification };
};

// useUser hook - get and update user data
export const useUser = () => {
  const { user: authUser } = useAuthStore();
  const { success, error } = useAppNotification();

  const updateProfile = useCallback(
    async (updates: Partial<User>) => {
      if (!authUser) {
        error("Not authenticated");
        return { success: false };
      }

      try {
        const updated = await api.user.updateProfile(authUser.id, updates);
        success("Profile updated successfully");
        return { success: true, user: updated };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to update profile";
        error(message);
        return { success: false };
      }
    },
    [authUser, success, error]
  );

  return { user: authUser, updateProfile };
};

// useTalents hook - fetch and manage talents
export const useTalents = () => {
  const [talents, setTalents] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { error: showError } = useAppNotification();

  const fetchTalents = useCallback(
    async (filters?: any) => {
      setIsLoading(true);
      try {
        const data = await api.talent.getTalents(filters);
        setTalents(data);
        return { success: true, data };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to fetch talents";
        showError(message);
        return { success: false, error: message };
      } finally {
        setIsLoading(false);
      }
    },
    [showError]
  );

  const createTalent = useCallback(
    async (data: any) => {
      const { user } = useAuthStore.getState();
      if (!user) {
        showError("Not authenticated");
        return { success: false };
      }

      try {
        const newTalent = await api.talent.createTalent(user.id, data);
        setTalents((prev) => [newTalent, ...prev]);
        return { success: true, talent: newTalent };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to create talent";
        showError(message);
        return { success: false, error: message };
      }
    },
    [showError]
  );

  const likeTalent = useCallback(
    async (talentId: string) => {
      try {
        await api.talent.likeTalent(talentId);
        setTalents((prev) =>
          prev.map((t) =>
            t.id === talentId ? { ...t, likes: t.likes + 1 } : t
          )
        );
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to like talent";
        showError(message);
        return { success: false };
      }
    },
    [showError]
  );

  return { talents, isLoading, fetchTalents, createTalent, likeTalent };
};

// Import React for hooks that need it
import React from "react";
