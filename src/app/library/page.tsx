"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Play, CheckCircle2, Bookmark, ArrowLeft, Search, Layers, Clock } from "lucide-react";
import { useLibrary } from "@/hooks/useLibrary";
import { toPersianDigits } from "@/lib/utils";

export default function LibraryPage() {
  const { library, currentlyReading, completed, unread } = useLibrary();
  const [filter, setFilter] = useState<"all" | "reading" | "completed" | "unread">("all");
  const [search, setSearch] = useState("");

  const filteredItems = library.filter((item) => {
    if (filter === "reading" && item.status !== "reading") return false;
    if (filter === "completed" && item.status !== "completed") return false;
    if (filter === "unread" && item.status !== "unread") return false;
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      return (
        item.book.title.toLowerCase().includes(q) ||
        item.book.author.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-parchment-300 dark:border-pine-800">
        <div>
          <span className="text-xs font-bold text-honey-600 dark:text-honey-400 uppercase tracking-widest block mb-1">
            کتابخانه دیجیتال شما
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-pine-950 dark:text-parchment-50">
            قفسه کتاب‌های شخصی
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            کتاب‌های خریداری‌شده و در حال مطالعه شما با ذخیره خودکار محل خوانش
          </p>
        </div>

        <Link
          href="/explore"
          className="bg-pine-800 hover:bg-pine-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow transition-all self-start sm:self-auto flex items-center gap-2"
        >
          <span>کاوش و افزودن کتاب جدید</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      {/* Filter Tabs & Search */}
      <div className="glass-card rounded-2xl p-4 mb-8 border border-parchment-300/80 dark:border-pine-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-parchment-200/80 dark:bg-pine-900/60 rounded-xl w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              filter === "all"
                ? "bg-white dark:bg-pine-800 text-pine-950 dark:text-white shadow-sm"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            همه ({toPersianDigits(library.length)})
          </button>
          <button
            onClick={() => setFilter("reading")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              filter === "reading"
                ? "bg-white dark:bg-pine-800 text-pine-950 dark:text-white shadow-sm"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            در حال خواندن ({toPersianDigits(currentlyReading.length)})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              filter === "completed"
                ? "bg-white dark:bg-pine-800 text-pine-950 dark:text-white shadow-sm"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            خوانده‌شده ({toPersianDigits(completed.length)})
          </button>
        </div>

        {/* Quick Search inside library */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-400 absolute top-1/2 -translate-y-1/2 right-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو در کتابخانه..."
            className="w-full bg-parchment-100/90 dark:bg-pine-900/60 border border-parchment-300 dark:border-pine-700/80 rounded-xl pr-9 pl-3 py-1.5 text-xs text-pine-950 dark:text-parchment-50 placeholder:text-zinc-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Library Grid */}
      {filteredItems.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border border-parchment-300 dark:border-pine-800 max-w-md mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-honey-500/15 text-honey-600 mx-auto flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold font-serif text-pine-950 dark:text-parchment-100">
            هنوز کتابی در این بخش ندارید!
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
            می‌توانید از ویترین کتاب‌ها دیدن کرده و کتاب‌های دلخواهتان را تهیه یا به صورت نمونه مطالعه کنید.
          </p>
          <Link
            href="/explore"
            className="mt-6 inline-block bg-pine-800 hover:bg-pine-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow"
          >
            کاوش در کتاب‌ها
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.bookId}
              className="glass-card rounded-3xl p-5 border border-parchment-300/80 dark:border-pine-800 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Book Header */}
                <div className="flex gap-4 items-start">
                  <div className="w-24 h-32 rounded-xl overflow-hidden shadow-book-3d flex-shrink-0 relative">
                    <img
                      src={item.book.cover}
                      alt={item.book.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/40 via-white/10 to-transparent pointer-events-none" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-honey-500/15 text-honey-800 dark:text-honey-300 font-bold inline-block">
                      {item.shelf || "کتابخانه شخصی"}
                    </span>
                    <h3 className="text-base font-bold font-serif text-pine-950 dark:text-parchment-100 line-clamp-1">
                      {item.book.title}
                    </h3>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 block">
                      {item.book.author}
                    </span>

                    <div className="pt-2 text-[11px] text-zinc-500">
                      <span>آخرین مطالعه: </span>
                      <strong className="text-zinc-700 dark:text-zinc-200">{item.lastReadAt}</strong>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">پیشرفت مطالعه:</span>
                    <strong className="text-pine-900 dark:text-honey-400 font-serif">
                      {toPersianDigits(item.progressPercent)}٪
                    </strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-parchment-200 dark:bg-pine-900 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-honey-500 to-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${item.progressPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-0.5">
                    <span>صفحه {toPersianDigits(item.currentPage)} از {toPersianDigits(item.totalPages)}</span>
                    <span>{toPersianDigits(item.totalPages - item.currentPage)} ص باقی‌مانده</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-parchment-200 dark:border-pine-800 flex items-center gap-2">
                <Link
                  href={`/reader/${item.bookId}`}
                  className="flex-1 bg-pine-800 hover:bg-pine-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>ادامه مطالعه</span>
                </Link>

                <Link
                  href={`/books/${item.bookId}`}
                  className="p-2.5 rounded-xl border border-parchment-300 dark:border-pine-800 text-zinc-500 hover:text-zinc-800 hover:bg-parchment-200 transition-colors"
                  title="مشاهده جزئیات کتاب"
                >
                  <BookOpen className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
