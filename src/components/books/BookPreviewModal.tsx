"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Star, Heart, ShoppingBag, BookOpen, Check, Share2, Sparkles, ChevronRight, Bookmark } from "lucide-react";
import { Book } from "@/types";
import { formatPrice, toPersianDigits } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useLibrary } from "@/hooks/useLibrary";

interface BookPreviewModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookPreviewModal({ book, isOpen, onClose }: BookPreviewModalProps) {
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isOwned } = useLibrary();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !book) return null;

  const favorite = isFavorite(book.id);
  const owned = isOwned(book.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-pine-950/80 backdrop-blur-md transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* 3D Opened Book Container */}
      <div className="relative z-10 w-full max-w-4xl bg-parchment-50 dark:bg-pine-950 rounded-3xl shadow-2xl border border-parchment-300 dark:border-pine-800 overflow-hidden transform transition-all animate-bookOpen">
        {/* Top Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-parchment-200 dark:border-pine-800 bg-parchment-100/80 dark:bg-pine-900/40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-honey-500 animate-pulse" />
            <span className="text-xs font-semibold text-pine-900 dark:text-parchment-100 font-serif">
              شناسنامه و پیش‌نمایش کتاب • کتابینو
            </span>
            <span className="text-xs text-zinc-400">| {book.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-parchment-200 dark:hover:bg-pine-800 text-zinc-500 hover:text-zinc-800 dark:text-zinc-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Book Open Spread (Left & Right Pages) */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
          {/* Right Page / Cover & Highlights (Cols 1-5) */}
          <div className="md:col-span-5 p-6 sm:p-8 bg-parchment-100/50 dark:bg-pine-900/20 border-b md:border-b-0 md:border-l border-parchment-200 dark:border-pine-800/80 flex flex-col justify-between items-center text-center">
            {/* 3D Book Cover with realistic spine & shadow */}
            <div className="relative group my-auto">
              <div
                className="w-48 sm:w-56 h-64 sm:h-76 rounded-r-lg rounded-l-sm shadow-book-3d overflow-hidden border-r-4 border-black/20 transform transition-transform group-hover:rotate-1"
                style={{
                  boxShadow: "-12px 14px 28px -4px rgba(30, 50, 30, 0.35), -2px 4px 10px rgba(0,0,0,0.2)",
                }}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 via-white/10 to-transparent" />
              </div>

              {/* Spine edge representation */}
              <div className="absolute -left-2.5 inset-y-1 w-2.5 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-l shadow-inner" />
            </div>

            {/* Quick Metrics */}
            <div className="w-full grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-parchment-300/60 dark:border-pine-800/60 text-xs">
              <div>
                <span className="block text-zinc-400">تعداد صفحات</span>
                <span className="font-bold text-pine-900 dark:text-parchment-100">{toPersianDigits(book.pages)} صفحه</span>
              </div>
              <div>
                <span className="block text-zinc-400">سال نشر</span>
                <span className="font-bold text-pine-900 dark:text-parchment-100">{toPersianDigits(book.year)}</span>
              </div>
              <div>
                <span className="block text-zinc-400">امتیاز کاربران</span>
                <span className="font-bold text-pine-900 dark:text-parchment-100 flex items-center justify-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {toPersianDigits(book.rating)}
                </span>
              </div>
            </div>
          </div>

          {/* Left Page / Full Details & Sample (Cols 6-12) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Category & Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-honey-500/15 text-honey-800 dark:text-honey-300">
                  {book.category}
                </span>
                {book.bestseller && (
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-terracotta-500/15 text-terracotta-700 dark:text-terracotta-300">
                    پرفروش‌ترین
                  </span>
                )}
                {book.editorPick && (
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-pine-500/15 text-pine-800 dark:text-pine-300">
                    انتخاب ویراستار
                  </span>
                )}
              </div>

              {/* Title & Author */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-pine-950 dark:text-parchment-50">
                  {book.title}
                </h2>
                <div className="flex items-center gap-2 mt-1.5 text-sm text-zinc-600 dark:text-zinc-300">
                  <span>نویسنده: <strong className="text-pine-900 dark:text-parchment-100">{book.author}</strong></span>
                  {book.translator && (
                    <span>• ترجمه: <strong className="text-pine-900 dark:text-parchment-100">{book.translator}</strong></span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed text-justify line-clamp-4">
                {book.description}
              </p>

              {/* Sample Excerpt Box */}
              {book.sampleContent && book.sampleContent.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-parchment-200/70 dark:bg-pine-900/40 border border-parchment-300 dark:border-pine-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-pine-900 dark:text-parchment-100 mb-1.5">
                    <BookOpen className="w-4 h-4 text-honey-600 dark:text-honey-400" />
                    <span>بریده‌ای از فصل اول: {book.sampleContent[0].chapterTitle}</span>
                  </div>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 italic leading-relaxed line-clamp-2">
                    «{book.sampleContent[0].paragraphs[0]}»
                  </p>
                </div>
              )}

              {/* Price & Discount */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-2xl font-black text-pine-900 dark:text-honey-400 font-serif">
                  {formatPrice(book.price)}
                </span>
                {book.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through">
                    {formatPrice(book.originalPrice)}
                  </span>
                )}
                {book.discountPercent && (
                  <span className="px-2 py-0.5 rounded-md bg-terracotta-500 text-white text-xs font-bold">
                    {toPersianDigits(book.discountPercent)}٪ تخفیف
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-4 border-t border-parchment-200 dark:border-pine-800 flex flex-wrap items-center gap-3">
              {owned ? (
                <Link
                  href={`/reader/${book.id}`}
                  onClick={onClose}
                  className="flex-1 bg-pine-800 hover:bg-pine-900 text-white py-3 px-5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-honey-400" />
                  <span>ادامه مطالعه در ریدر</span>
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => addItem(book)}
                    className="flex-1 bg-pine-800 hover:bg-pine-900 text-white py-3 px-5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
                  >
                    <ShoppingBag className="w-4 h-4 text-honey-400 group-hover:scale-110 transition-transform" />
                    <span>افزودن به سبد خرید</span>
                  </button>

                  <Link
                    href={`/reader/${book.id}`}
                    onClick={onClose}
                    className="bg-honey-500 hover:bg-honey-600 text-pine-950 py-3 px-4 rounded-2xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>مطالعه نمونه</span>
                  </Link>
                </>
              )}

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(book.id)}
                className={`p-3 rounded-2xl border transition-all ${
                  favorite
                    ? "bg-terracotta-50 text-terracotta-600 border-terracotta-300 dark:bg-terracotta-950/40 dark:border-terracotta-800"
                    : "border-parchment-300 dark:border-pine-800 text-zinc-500 hover:text-terracotta-500 hover:border-terracotta-300"
                }`}
                title={favorite ? "حذف از نشان‌شده‌ها" : "افزودن به نشان‌شده‌ها"}
              >
                <Heart className={`w-5 h-5 ${favorite ? "fill-current" : ""}`} />
              </button>

              {/* Full details link */}
              <Link
                href={`/books/${book.id}`}
                onClick={onClose}
                className="p-3 rounded-2xl border border-parchment-300 dark:border-pine-800 text-zinc-600 dark:text-parchment-300 hover:bg-parchment-200 dark:hover:bg-pine-900 transition-colors"
                title="مشاهده صفحه کامل کتاب"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
