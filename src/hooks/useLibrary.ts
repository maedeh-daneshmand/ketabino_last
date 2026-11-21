"use client";

import { useState, useEffect, useCallback } from "react";
import { LibraryStorage } from "@/lib/storage";
import { LibraryItem, Book } from "@/types";

export function useLibrary() {
  const [library, setLibrary] = useState<LibraryItem[]>([]);
  const [mounted, setMounted] = useState(false);

  const refresh = useCallback(() => {
    setLibrary(LibraryStorage.get());
  }, []);

  useEffect(() => {
    setMounted(true);
    refresh();

    const handleStorage = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (!customEvent.detail || customEvent.detail.key === "ketabino_library") {
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

  const addBook = (book: Book) => {
    const updated = LibraryStorage.addBook(book);
    setLibrary(updated);
    return updated;
  };

  const isOwned = (bookId: string) => {
    return library.some((item) => item.bookId === bookId);
  };

  const updateProgress = (bookId: string, page: number, totalPages?: number) => {
    LibraryStorage.updateProgress(bookId, page, totalPages);
    refresh();
  };

  const currentlyReading = library.filter((item) => item.status === "reading");
  const completed = library.filter((item) => item.status === "completed");
  const unread = library.filter((item) => item.status === "unread");

  return {
    library: mounted ? library : [],
    currentlyReading: mounted ? currentlyReading : [],
    completed: mounted ? completed : [],
    unread: mounted ? unread : [],
    addBook,
    isOwned,
    updateProgress,
    count: mounted ? library.length : 0,
    mounted,
  };
}
