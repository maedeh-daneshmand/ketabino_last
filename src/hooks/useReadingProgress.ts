"use client";

import { useState, useEffect, useCallback } from "react";
import { ProgressStorage } from "@/lib/storage";
import { ReadingProgress } from "@/types";

export function useReadingProgress(bookId: string) {
  const [progress, setProgress] = useState<ReadingProgress>(() => ProgressStorage.get(bookId));
  const [mounted, setMounted] = useState(false);

  const refresh = useCallback(() => {
    setProgress(ProgressStorage.get(bookId));
  }, [bookId]);

  useEffect(() => {
    setMounted(true);
    refresh();

    const handleStorage = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (!customEvent.detail || customEvent.detail.key === "ketabino_reading_progress") {
        refresh();
      }
    };

    window.addEventListener("ketabino-storage-change", handleStorage);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("ketabino-storage-change", handleStorage);
      window.removeEventListener("storage", handleStorage);
    };
  }, [bookId, refresh]);

  const saveProgress = (page: number, totalPages?: number) => {
    const total = totalPages || progress.totalPages || 100;
    const percent = Math.min(100, Math.round((page / total) * 100));
    const newProgress: ReadingProgress = {
      ...progress,
      bookId,
      currentPage: page,
      totalPages: total,
      progressPercent: percent,
      lastReadAt: new Date().toLocaleDateString("fa-IR"),
    };
    ProgressStorage.save(newProgress);
    setProgress(newProgress);
  };

  const toggleBookmark = (page: number) => {
    const isNowBookmarked = ProgressStorage.toggleBookmark(bookId, page);
    refresh();
    return isNowBookmarked;
  };

  return {
    progress: mounted ? progress : ProgressStorage.get(bookId),
    saveProgress,
    toggleBookmark,
    mounted,
  };
}
