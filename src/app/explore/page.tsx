"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BOOKS } from "@/data/books";
import { CATEGORIES } from "@/data/categories";
import BookCard from "@/components/books/BookCard";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  Filter,
  Sparkles,
  BookOpen,
  ArrowUpDown,
  Tag,
} from "lucide-react";
import { toPersianDigits } from "@/lib/utils";

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "rating" | "price-asc" | "price-desc" | "discount">("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered and Sorted Books
  const filteredBooks = useMemo(() => {
    return BOOKS.filter((book) => {
      // Category filter
      if (selectedCategory !== "all" && book.category !== selectedCategory) {
        return false;
      }
      // Language filter
      if (selectedLanguage !== "all" && book.language !== selectedLanguage) {
        return false;
      }
      // Discounted only filter
      if (onlyDiscounted && !book.discountPercent) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = book.title.toLowerCase().includes(q);
        const matchAuthor = book.author.toLowerCase().includes(q);
        const matchTranslator = book.translator?.toLowerCase().includes(q);
        const matchPublisher = book.publisher.toLowerCase().includes(q);
        const matchTags = book.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchAuthor && !matchTranslator && !matchPublisher && !matchTags) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "discount") return (b.discountPercent || 0) - (a.discountPercent || 0);
      return b.year - a.year; // newest
    });
  }, [selectedCategory, selectedLanguage, onlyDiscounted, searchQuery, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedLanguage("all");
    setOnlyDiscounted(false);
    setSearchQuery("");
    setSortBy("newest");
  };

  const hasActiveFilters =
    selectedCategory !== "all" || selectedLanguage !== "all" || onlyDiscounted || searchQuery.trim() !== "";

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <span className="text-xs font-bold text-honey-600 dark:text-honey-400 uppercase tracking-widest block mb-1">
          کاوش و ویترین کتاب‌ها
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-pine-950 dark:text-parchment-50">
          جستجو و کشف در کتابخانه کتابینو
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          دسترسی به کامل‌ترین مجموعه رمان‌های کلاسیک، اندیشه، فلسفه و مهارت‌های فردی
        </p>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="glass-card rounded-2xl p-4 mb-8 border border-parchment-300/80 dark:border-pine-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-zinc-400 absolute top-1/2 -translate-y-1/2 right-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی نام کتاب، نویسنده، مترجم..."
            className="w-full bg-parchment-100/90 dark:bg-pine-900/60 border border-parchment-300 dark:border-pine-700/80 rounded-xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-pine-950 dark:text-parchment-50 placeholder:text-zinc-400 focus:outline-none focus:border-honey-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute top-1/2 -translate-y-1/2 left-3 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sorting & Layout Toggle */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3">
          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-zinc-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-parchment-100/90 dark:bg-pine-900/60 border border-parchment-300 dark:border-pine-700/80 rounded-xl px-3 py-2 text-xs font-semibold text-pine-900 dark:text-parchment-100 focus:outline-none"
            >
              <option value="newest">جدیدترین‌ها</option>
              <option value="rating">بیشترین امتیاز</option>
              <option value="discount">بیشترین تخفیف</option>
              <option value="price-asc">ارزان‌ترین</option>
              <option value="price-desc">گران‌ترین</option>
            </select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex items-center bg-parchment-200/80 dark:bg-pine-900/70 p-1 rounded-xl border border-parchment-300 dark:border-pine-800">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-white dark:bg-pine-800 text-pine-950 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400"
              }`}
              title="نمایش شبکه‌ای"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-white dark:bg-pine-800 text-pine-950 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400"
              }`}
              title="نمایش لیستی"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Filter Open Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden p-2 rounded-xl bg-pine-800 text-parchment-100 flex items-center gap-1.5 text-xs font-bold"
          >
            <Filter className="w-4 h-4" />
            <span>فیلترها</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters & Results */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Sidebar Filters (Desktop) */}
        <div
          className={`md:col-span-3 space-y-6 ${
            mobileFilterOpen ? "block mb-6" : "hidden md:block"
          }`}
        >
          <div className="glass-card rounded-2xl p-5 border border-parchment-300/80 dark:border-pine-800 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-parchment-200 dark:border-pine-800">
              <h3 className="font-bold text-sm text-pine-950 dark:text-parchment-100 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-honey-600" />
                <span>فیلترهای پیشرفته</span>
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-bold text-terracotta-600 hover:text-terracotta-700 transition-colors"
                >
                  پاکسازی فیلترها
                </button>
              )}
            </div>

            {/* Categories */}
            <div>
              <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300 block mb-2.5">
                دسته‌بندی موضوعی
              </span>
              <div className="flex flex-col gap-1 max-h-60 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`text-right px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                    selectedCategory === "all"
                      ? "bg-pine-800 text-parchment-50 font-bold"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-parchment-200 dark:hover:bg-pine-900/60"
                  }`}
                >
                  <span>همه موضوعات</span>
                  <span className="text-[10px] opacity-75">{toPersianDigits(BOOKS.length)}</span>
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-right px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? "bg-pine-800 text-parchment-50 font-bold"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-parchment-200 dark:hover:bg-pine-900/60"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-75">
                      {toPersianDigits(BOOKS.filter((b) => b.category === cat.id).length)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Discounted Only Checkbox */}
            <div className="pt-4 border-t border-parchment-200 dark:border-pine-800">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  checked={onlyDiscounted}
                  onChange={(e) => setOnlyDiscounted(e.target.checked)}
                  className="rounded border-parchment-400 text-pine-800 focus:ring-honey-500 w-4 h-4"
                />
                <span>فقط کتاب‌های تخفیف‌دار</span>
              </label>
            </div>

            {/* Language Selection */}
            <div className="pt-4 border-t border-parchment-200 dark:border-pine-800">
              <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300 block mb-2">زبان اثر</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedLanguage("all")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedLanguage === "all"
                      ? "bg-pine-800 text-white"
                      : "bg-parchment-200 dark:bg-pine-900 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  همه
                </button>
                <button
                  onClick={() => setSelectedLanguage("fa")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedLanguage === "fa"
                      ? "bg-pine-800 text-white"
                      : "bg-parchment-200 dark:bg-pine-900 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  فارسی
                </button>
                <button
                  onClick={() => setSelectedLanguage("en")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedLanguage === "en"
                      ? "bg-pine-800 text-white"
                      : "bg-parchment-200 dark:bg-pine-900 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  انگلیسی
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section (Cols 4-12) */}
        <div className="md:col-span-9 space-y-6">
          {/* Active Filter Chips & Count */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-parchment-200 dark:border-pine-900">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              نمایش <strong className="text-pine-900 dark:text-honey-400">{toPersianDigits(filteredBooks.length)}</strong> کتاب
            </span>

            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-honey-500/15 text-honey-800 dark:text-honey-300 text-xs font-semibold">
                    <span>موضوع: {CATEGORIES.find((c) => c.id === selectedCategory)?.name}</span>
                    <button onClick={() => setSelectedCategory("all")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {onlyDiscounted && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-terracotta-500/15 text-terracotta-700 dark:text-terracotta-300 text-xs font-semibold">
                    <span>تخفیف‌دار</span>
                    <button onClick={() => setOnlyDiscounted(false)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pine-500/15 text-pine-800 dark:text-pine-300 text-xs font-semibold">
                    <span>جستجو: {searchQuery}</span>
                    <button onClick={() => setSearchQuery("")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Empty State */}
          {filteredBooks.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center border border-parchment-300 dark:border-pine-800 my-8">
              <div className="w-16 h-16 rounded-2xl bg-honey-500/15 text-honey-600 mx-auto flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold font-serif text-pine-950 dark:text-parchment-100">
                هیچ کتابی با این مشخصات یافت نشد
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
                می‌توانید فیلترها را تغییر دهید یا عبارت جستجوی دیگری را امتحان فرمایید.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-6 bg-pine-800 hover:bg-pine-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow"
              >
                پاکسازی همه فیلترها
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} layout="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} layout="list" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">در حال بارگذاری ویترین کتاب‌ها...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
