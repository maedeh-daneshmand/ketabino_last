"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, X, BookOpen, Star, Sparkles, ArrowLeft, Heart, ShoppingBag } from "lucide-react";
import { BOOKS } from "@/data/books";
import BookCard from "@/components/books/BookCard";
import { toPersianDigits } from "@/lib/utils";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const quickSuggestions = [
    "صادق هدایت",
    "شازده کوچولو",
    "عادت‌های اتمی",
    "سمفونی مردگان",
    "جنایت و مکافات",
    "۱۹۸۴",
    "فلسفه",
    "روانشناسی",
  ];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return BOOKS.filter((book) => {
      const matchTitle = book.title.toLowerCase().includes(q);
      const matchOriginal = book.originalTitle?.toLowerCase().includes(q);
      const matchAuthor = book.author.toLowerCase().includes(q);
      const matchTranslator = book.translator?.toLowerCase().includes(q);
      const matchPublisher = book.publisher.toLowerCase().includes(q);
      const matchCategory = book.category.toLowerCase().includes(q);
      const matchTags = book.tags.some((t) => t.toLowerCase().includes(q));
      const matchDesc = book.description.toLowerCase().includes(q);
      const matchIsbn = book.isbn.includes(q);
      return matchTitle || matchOriginal || matchAuthor || matchTranslator || matchPublisher || matchCategory || matchTags || matchDesc || matchIsbn;
    });
  }, [query]);

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold text-honey-600 dark:text-honey-400 uppercase tracking-widest block mb-1">
          سامانه جستجوی هوشمند کتابینو
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-pine-950 dark:text-parchment-50">
          جستجو در میان آثار و کلمات
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          نام کتاب، نویسنده، مترجم، شابک یا موضوع مورد نظر خود را بنویسید
        </p>

        {/* Big Search Input */}
        <div className="relative mt-6 shadow-xl rounded-2xl bg-white dark:bg-pine-900 border border-parchment-300 dark:border-pine-700/80 p-2 flex items-center">
          <Search className="w-5 h-5 text-zinc-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="مثلاً: بوف کور، داستایفسکی، عادت‌های اتمی..."
            className="w-full bg-transparent px-2 py-2 text-sm sm:text-base text-pine-950 dark:text-parchment-50 placeholder:text-zinc-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1.5 rounded-full hover:bg-parchment-200 dark:hover:bg-pine-800 text-zinc-400 hover:text-zinc-700 transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
          <span className="text-zinc-400">پیشنهادات:</span>
          {quickSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setQuery(suggestion)}
              className="px-2.5 py-1 rounded-full bg-parchment-200 hover:bg-parchment-300 dark:bg-pine-900/60 dark:hover:bg-pine-800 text-zinc-700 dark:text-parchment-200 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Results Area */}
      <div className="mt-10">
        {query.trim() === "" ? (
          /* Empty Initial State - Show popular recommendations */
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-parchment-200 dark:border-pine-800">
              <h2 className="text-base font-bold font-serif text-pine-950 dark:text-parchment-50 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-honey-500" />
                <span>کتاب‌های پیشنهادی برای شما</span>
              </h2>
              <Link href="/explore" className="text-xs text-honey-700 dark:text-honey-400 font-semibold hover:underline">
                مشاهده همه
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {BOOKS.slice(0, 4).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          /* No Results Found */
          <div className="glass-card rounded-3xl p-12 text-center border border-parchment-300 dark:border-pine-800 max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-honey-500/15 text-honey-600 mx-auto flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold font-serif text-pine-950 dark:text-parchment-100">
              نتیجه‌ای برای «{query}» یافت نشد
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              لطفاً املای کلمه را بررسی کرده یا عبارت عام‌تری مانند موضوع، نام نویسنده یا دسته کتاب را جستجو کنید.
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-6 bg-pine-800 hover:bg-pine-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow"
            >
              پاک کردن جستجو
            </button>
          </div>
        ) : (
          /* Results Found */
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-parchment-200 dark:border-pine-800">
              <span className="text-sm text-zinc-600 dark:text-zinc-300">
                یافتن <strong className="text-pine-900 dark:text-honey-400">{toPersianDigits(results.length)}</strong> کتاب مطابق با «{query}»
              </span>
              <button
                onClick={() => setQuery("")}
                className="text-xs text-terracotta-600 hover:underline"
              >
                پاک کردن
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {results.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">در حال بارگذاری صفحه جستجو...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
