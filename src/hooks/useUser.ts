"use client";

import { useState, useEffect, useCallback } from "react";
import { AuthStorage, RegisteredUser } from "@/lib/storage";
import { UserProfile } from "@/types";

export function useUser() {
  const [user, setUser] = useState<UserProfile | null>(() => AuthStorage.getCurrentUser());
  const [mounted, setMounted] = useState(false);

  const refresh = useCallback(() => {
    setUser(AuthStorage.getCurrentUser());
  }, []);

  useEffect(() => {
    setMounted(true);
    refresh();

    const handleStorage = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (!customEvent.detail || customEvent.detail.key === "ketabino_current_user") {
        refresh();
      }
    };

    window.addEventListener("ketabino-storage-change", handleStorage);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("ketabino-storage-change", handleStorage);
      window.removeEventListener("storage", handleStorage);
    };
  }, [refresh]);

  const updateProfile = (data: Partial<RegisteredUser>) => {
    const updated = AuthStorage.updateProfile(data);
    setUser(updated);
    return updated;
  };

  const upgradeMembership = (plan: "monthly" | "yearly") => {
    const updated = AuthStorage.upgradeMembership(plan);
    setUser(updated);
    return updated;
  };

  const login = (identifier: string, password?: string) => {
    const res = AuthStorage.login(identifier, password);
    if (res.success && res.user) {
      setUser(res.user);
    }
    return res;
  };

  const register = (data: {
    name: string;
    phone: string;
    email: string;
    password?: string;
    address?: string;
    yearlyGoal?: number;
    favoriteCategories?: string[];
  }) => {
    const newUser = AuthStorage.register(data);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    AuthStorage.logout();
    setUser(null);
  };

  return {
    user: user || {
      id: "guest",
      name: "کاربر مهمان",
      email: "",
      phone: "",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300",
      bio: "",
      joinedDate: "",
      membershipPlan: "free",
      readingStreakDays: 0,
      readingHoursThisWeek: 0,
      yearlyGoal: 10,
      completedThisYear: 0,
    },
    isLoggedIn: !!user && user.id !== "guest",
    login,
    register,
    logout,
    updateProfile,
    upgradeMembership,
    mounted,
  };
}
