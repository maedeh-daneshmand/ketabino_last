"use client";

import { useState, useEffect, useCallback } from "react";
import { FavoritesStorage } from "@/lib/storage";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  const refresh = useCallback(() => {
    setFavorites(FavoritesStorage.get());
  }, []);

  useEffect(() => {
    setMounted(true);
    refresh();

    const handleStorage = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (!customEvent.detail || customEvent.detail.key === "ketabino_favorites") {
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

  const toggleFavorite = (bookId: string) => {
    const isNowFavorite = FavoritesStorage.toggle(bookId);
    refresh();
    return isNowFavorite;
  };

  const isFavorite = (bookId: string) => {
    return favorites.includes(bookId);
  };

  return {
    favorites: mounted ? favorites : [],
    toggleFavorite,
    isFavorite,
    count: mounted ? favorites.length : 0,
    mounted,
  };
}
