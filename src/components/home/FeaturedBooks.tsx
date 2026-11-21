"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Flame, BookmarkCheck } from "lucide-react";
import { BOOKS } from "@/data/books";
import BookCard from "@/components/books/BookCard";

export default function FeaturedBooks() {
  const [activeTab, setActiveTab] = useState<"featured" | "bestseller" | "editorPick">("featured");

  const filteredBooks = BOOKS.filter((book) => {
    if (activeTab === "featured") return book.featured;
    if (activeTab === "bestseller") return book.bestseller;
    if (activeTab === "editorPick") return book.editorPick;
    return true;
  }).slice(0, 8);

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4 border-b border-parchment-300 dark:border-pine-800">
          <div>
            <span className="text-xs text-honey-600 dark:text-honey-400 font-bold uppercase tracking-wider block mb-1">
              ویترین کتاب‌های برگزیده
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-pine-950 dark:text-parchment-50">
              منتخب کتابخوانان کتابینو
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-parchment-200/80 dark:bg-pine-900/60 rounded-2xl border border-parchment-300 dark:border-pine-800 self-start md:self-auto">
            <button
              onClick={() => setActiveTab("featured")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "featured"
                  ? "bg-white dark:bg-pine-800 text-pine-950 dark:text-parchment-50 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              کتاب‌های برگزیده
            </button>

            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "bestseller"
                  ? "bg-white dark:bg-pine-800 text-pine-950 dark:text-parchment-50 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              پرفروش‌ترین‌ها
            </button>

            <button
              onClick={() => setActiveTab("editorPick")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "editorPick"
                  ? "bg-white dark:bg-pine-800 text-pine-950 dark:text-parchment-50 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              پیشنهاد ویراستار
            </button>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {/* Bottom CTA to Explore */}
        <div className="mt-12 text-center">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 bg-pine-900 hover:bg-pine-950 text-parchment-100 font-bold px-8 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all text-sm group"
          >
            <span>کاوش بیش از ۱۲,۰۰۰ کتاب در آرشیو کتابینو</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
