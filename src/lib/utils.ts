import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert numbers to Persian digits
export function toPersianDigits(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return "";
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num
    .toString()
    .replace(/[0-9]/g, (w) => persianDigits[parseInt(w, 10)]);
}

// Format currency in Tomans with Persian comma separators
export function formatPrice(price: number): string {
  if (price === 0) return "رایگان";
  const formatted = price.toLocaleString("fa-IR");
  return `${formatted} تومان`;
}

// Format numbers with commas in Persian
export function formatNumber(num: number): string {
  return num.toLocaleString("fa-IR");
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
