"use client";

import { useState, useEffect, useCallback } from "react";
import { CartStorage } from "@/lib/storage";
import { CartItem, Book } from "@/types";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  const refresh = useCallback(() => {
    setItems(CartStorage.get());
  }, []);

  useEffect(() => {
    setMounted(true);
    refresh();

    const handleStorage = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (!customEvent.detail || customEvent.detail.key === "ketabino_cart") {
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

  const addItem = (book: Book, quantity: number = 1) => {
    const updated = CartStorage.addItem(book, quantity);
    setItems(updated);
  };

  const removeItem = (bookId: string) => {
    const updated = CartStorage.removeItem(bookId);
    setItems(updated);
  };

  const clear = () => {
    CartStorage.clear();
    setItems([]);
  };

  const total = mounted ? CartStorage.getTotal() : { subtotal: 0, discount: 0, finalTotal: 0, count: 0 };

  return {
    items: mounted ? items : [],
    addItem,
    removeItem,
    clear,
    total,
    count: total.count,
    mounted,
  };
}
