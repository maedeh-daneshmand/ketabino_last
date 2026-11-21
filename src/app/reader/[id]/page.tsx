"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Settings,
  Sun,
  Moon,
  Palette,
  Type,
  AlignLeft,
  Check,
  BookOpen,
  List,
  Sparkles,
} from "lucide-react";
import { BOOKS } from "@/data/books";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { toPersianDigits } from "@/lib/utils";

export default function ReaderPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params?.id as string;

  const book = BOOKS.find((b) => b.id === bookId);

  const { progress, saveProgress, toggleBookmark, mounted } = useReadingProgress(bookId);

  // Reader Settings States
  const [theme, setTheme] = useState<"light" | "sepia" | "dark" | "emerald">("sepia");
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">("base");
  const [lineHeight, setLineHeight] = useState<"normal" | "relaxed" | "loose">("relaxed");
  const [showSettings, setShowSettings] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Sync initial page from saved progress
  useEffect(() => {
    if (mounted && progress && progress.currentPage) {
      setCurrentPage(progress.currentPage);
    }
  }, [mounted, progress]);

  if (!book) {
    return (
      <div className="max-w-md mx-auto py-24 text-center">
        <h2 className="text-xl font-bold font-serif mb-2">کتاب یافت نشد!</h2>
        <Link href="/explore" className="text-xs text-honey-600 underline">
          بازگشت به کتاب‌ها
        </Link>
      </div>
    );
  }

  const totalPages = book.pages || 100;

  // Change page & save
  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(validPage);
    saveProgress(validPage, totalPages);
  };

  const isBookmarked = progress?.bookmarks?.includes(currentPage);

  // Get current sample chapter based on page
  const chapters = book.sampleContent || [];
  const currentChapterIndex = Math.min(chapters.length - 1, Math.floor((currentPage - 1) / 10));
  const activeChapter = chapters[currentChapterIndex] || chapters[0] || { chapterTitle: "متن نمونه", paragraphs: ["متنی برای نمایش یافت نشد."] };

  // Theme Classes
  const themeClasses = {
    light: "bg-white text-zinc-900 border-zinc-200",
    sepia: "bg-[#f5efe6] text-[#3c2f2f] border-[#e2d5c3]",
    dark: "bg-[#181a1b] text-[#e0e0e0] border-[#2c2f31]",
    emerald: "bg-[#0d1d12] text-[#d0e5d5] border-[#1b3824]",
  };

  const fontSizes = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl sm:text-2xl",
  };

  const lineHeights = {
    normal: "leading-normal",
    relaxed: "leading-relaxed",
    loose: "leading-loose",
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-300 ${themeClasses[theme]}`}>
      {/* Top Reader Navigation Bar */}
      <header className={`sticky top-0 z-40 px-4 py-3 border-b flex items-center justify-between backdrop-blur-md bg-opacity-95 ${themeClasses[theme]}`}>
        {/* Right: Back & Title */}
        <div className="flex items-center gap-3">
          <Link
            href={`/books/${book.id}`}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="بازگشت به صفحه کتاب"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-sm sm:text-base font-bold font-serif line-clamp-1">{book.title}</h1>
            <span className="text-[11px] opacity-75">{book.author}</span>
          </div>
        </div>

        {/* Left: Controls (Bookmark, TOC, Settings) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(currentPage)}
            className={`p-2 rounded-xl transition-all ${
              isBookmarked
                ? "bg-amber-500/20 text-amber-500"
                : "hover:bg-black/5 dark:hover:bg-white/10 opacity-75"
            }`}
            title={isBookmarked ? "حذف نشانه‌گذاری صفحه" : "نشانه‌گذاری این صفحه"}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
          </button>

          {/* Table of Contents Drawer Toggle */}
          <button
            onClick={() => setShowToc(!showToc)}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-85"
            title="فهرست سرفصل‌ها"
          >
            <List className="w-5 h-5" />
          </button>

          {/* Settings Toggle */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-85"
            title="تنظیمات قلم و ظاهر"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Settings Popup / Drawer */}
      {showSettings && (
        <div className="max-w-lg mx-auto w-full px-4 pt-3">
          <div className="p-4 rounded-2xl shadow-xl border bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-zinc-900 dark:text-zinc-100 space-y-4">
            {/* Theme Picker */}
            <div>
              <span className="text-xs font-bold block mb-2 opacity-80">تم رنگی مطالعه:</span>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setTheme("light")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1 bg-white text-zinc-900 ${
                    theme === "light" ? "ring-2 ring-honey-500 font-bold" : ""
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>روشن</span>
                </button>
                <button
                  onClick={() => setTheme("sepia")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1 bg-[#f5efe6] text-[#3c2f2f] ${
                    theme === "sepia" ? "ring-2 ring-honey-500 font-bold" : ""
                  }`}
                >
                  <span>سپیا (کاهی)</span>
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1 bg-[#181a1b] text-white ${
                    theme === "dark" ? "ring-2 ring-honey-500 font-bold" : ""
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>شب</span>
                </button>
                <button
                  onClick={() => setTheme("emerald")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1 bg-[#0d1d12] text-[#d0e5d5] ${
                    theme === "emerald" ? "ring-2 ring-honey-500 font-bold" : ""
                  }`}
                >
                  <span>زمردی</span>
                </button>
              </div>
            </div>

            {/* Font Size Picker */}
            <div>
              <span className="text-xs font-bold block mb-2 opacity-80">اندازه قلم متن:</span>
              <div className="grid grid-cols-4 gap-2 text-xs font-semibold">
                <button
                  onClick={() => setFontSize("sm")}
                  className={`py-1.5 rounded-lg border text-center ${fontSize === "sm" ? "bg-honey-500 text-white" : ""}`}
                >
                  کوچک
                </button>
                <button
                  onClick={() => setFontSize("base")}
                  className={`py-1.5 rounded-lg border text-center ${fontSize === "base" ? "bg-honey-500 text-white" : ""}`}
                >
                  متوسط
                </button>
                <button
                  onClick={() => setFontSize("lg")}
                  className={`py-1.5 rounded-lg border text-center ${fontSize === "lg" ? "bg-honey-500 text-white" : ""}`}
                >
                  بزرگ
                </button>
                <button
                  onClick={() => setFontSize("xl")}
                  className={`py-1.5 rounded-lg border text-center ${fontSize === "xl" ? "bg-honey-500 text-white" : ""}`}
                >
                  خیلی بزرگ
                </button>
              </div>
            </div>

            {/* Line Spacing */}
            <div>
              <span className="text-xs font-bold block mb-2 opacity-80">فاصله بین خطوط:</span>
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                <button
                  onClick={() => setLineHeight("normal")}
                  className={`py-1.5 rounded-lg border text-center ${lineHeight === "normal" ? "bg-honey-500 text-white" : ""}`}
                >
                  فشرده
                </button>
                <button
                  onClick={() => setLineHeight("relaxed")}
                  className={`py-1.5 rounded-lg border text-center ${lineHeight === "relaxed" ? "bg-honey-500 text-white" : ""}`}
                >
                  استاندارد
                </button>
                <button
                  onClick={() => setLineHeight("loose")}
                  className={`py-1.5 rounded-lg border text-center ${lineHeight === "loose" ? "bg-honey-500 text-white" : ""}`}
                >
                  باز
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table of Contents Drawer */}
      {showToc && (
        <div className="fixed inset-y-0 right-0 max-w-sm w-full z-50 p-6 shadow-2xl bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-4">
              <h3 className="font-bold font-serif text-base">فهرست سرفصل‌ها</h3>
              <button onClick={() => setShowToc(false)} className="text-xs p-1">بستن</button>
            </div>
            <div className="space-y-2 max-h-[70vh] overflow-y-auto">
              {book.tableOfContents && book.tableOfContents.length > 0 ? (
                book.tableOfContents.map((title, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      goToPage(idx * 15 + 1);
                      setShowToc(false);
                    }}
                    className="w-full text-right p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-xs font-medium flex items-center justify-between"
                  >
                    <span>{title}</span>
                    <span className="opacity-60 text-[10px]">ص {toPersianDigits(idx * 15 + 1)}</span>
                  </button>
                ))
              ) : (
                <p className="text-xs opacity-75">سرفصل‌ها در نسخه کامل کتاب موجود است.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Reading Canvas */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 sm:px-12 py-10 flex flex-col justify-center">
        {/* Chapter Header */}
        <div className="text-center mb-8 pb-4 border-b border-current opacity-20">
          <span className="text-xs opacity-60 tracking-widest uppercase font-serif block mb-1">
            کتابخانه کتابینو • فصل نمونه
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif">{activeChapter.chapterTitle}</h2>
        </div>

        {/* Paragraphs */}
        <article className={`space-y-6 text-justify ${fontSizes[fontSize]} ${lineHeights[lineHeight]}`}>
          {activeChapter.paragraphs.map((para, idx) => (
            <p key={idx} className="indent-6 sm:indent-8 font-serif leading-relaxed">
              {para}
            </p>
          ))}
        </article>
      </main>

      {/* Bottom Page Scrubber & Pagination Bar */}
      <footer className={`sticky bottom-0 z-40 px-4 py-3 border-t backdrop-blur-md bg-opacity-95 ${themeClasses[theme]}`}>
        <div className="max-w-3xl mx-auto flex flex-col gap-2">
          {/* Progress Slider */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono opacity-60 min-w-[32px] text-right">
              {toPersianDigits(currentPage)}
            </span>
            <input
              type="range"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => goToPage(parseInt(e.target.value, 10))}
              className="flex-1 accent-honey-500 cursor-pointer h-1.5 bg-black/10 dark:bg-white/10 rounded-lg"
            />
            <span className="text-xs font-mono opacity-60 min-w-[32px] text-left">
              {toPersianDigits(totalPages)}
            </span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-4 py-2 rounded-xl text-xs font-bold border hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-40 flex items-center gap-1 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
              <span>صفحه قبل</span>
            </button>

            <span className="text-xs opacity-75 font-semibold">
              پیشرفت: {toPersianDigits(Math.round((currentPage / totalPages) * 100))}٪
            </span>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 rounded-xl text-xs font-bold border hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-40 flex items-center gap-1 transition-all"
            >
              <span>صفحه بعد</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
