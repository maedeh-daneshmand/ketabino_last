"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Heart, ShoppingBag, Eye, BookOpen } from "lucide-react";
import { Book } from "@/types";
import { formatPrice, toPersianDigits } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import BookPreviewModal from "./BookPreviewModal";

interface BookCardProps {
  book: Book;
  layout?: "grid" | "list";
}

export default function BookCard({ book, layout = "grid" }: BookCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(book.id);

  if (layout === "list") {
    return (
      <>
        <div className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row gap-5 hover:shadow-lg transition-all border border-parchment-200/80 dark:border-pine-900 group">
          {/* Cover */}
          <div
            onClick={() => setModalOpen(true)}
            className="w-28 sm:w-36 h-40 sm:h-48 flex-shrink-0 rounded-lg overflow-hidden relative cursor-pointer shadow-book-3d group-hover:scale-102 transition-transform"
          >
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/40 via-white/10 to-transparent" />
            {book.discountPercent && (
              <span className="absolute top-2 right-2 bg-terracotta-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                {toPersianDigits(book.discountPercent)}٪
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-honey-700 dark:text-honey-400 font-semibold">
                  {book.category}
                </span>
                <button
                  onClick={() => toggleFavorite(book.id)}
                  className={`p-1.5 rounded-full transition-colors ${
                    favorite ? "text-terracotta-500 fill-current" : "text-zinc-400 hover:text-terracotta-500"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorite ? "fill-current" : ""}`} />
                </button>
              </div>

              <Link href={`/books/${book.id}`} className="hover:text-honey-600 transition-colors">
                <h3 className="text-base sm:text-lg font-bold font-serif text-pine-950 dark:text-parchment-100 mt-1">
                  {book.title}
                </h3>
              </Link>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                نویسنده: <strong className="text-zinc-700 dark:text-zinc-200">{book.author}</strong>
                {book.translator && <span> | ترجمه: {book.translator}</span>}
              </p>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-2 line-clamp-2 leading-relaxed">
                {book.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-parchment-200 dark:border-pine-800/80 flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-pine-900 dark:text-honey-400 font-serif">
                  {formatPrice(book.price)}
                </span>
                {book.originalPrice && (
                  <span className="text-xs text-zinc-400 line-through">
                    {formatPrice(book.originalPrice)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModalOpen(true)}
                  className="p-2 rounded-xl bg-parchment-200 dark:bg-pine-900 text-zinc-700 dark:text-parchment-200 hover:bg-parchment-300 text-xs flex items-center gap-1 transition-colors"
                  title="مشاهده و بررسی کتاب"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">مشاهده</span>
                </button>
                <button
                  onClick={() => addItem(book)}
                  className="bg-pine-800 hover:bg-pine-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-honey-400" />
                  <span>افزودن</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <BookPreviewModal book={book} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  return (
    <>
      <div className="group relative bg-parchment-50 dark:bg-pine-950/70 rounded-2xl p-3 sm:p-4 border border-parchment-200/90 dark:border-pine-900 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
        {/* Top Badges & Actions */}
        <div className="relative">
          {/* Favorite Toggle */}
          <button
            onClick={() => toggleFavorite(book.id)}
            className={`absolute top-2 left-2 z-10 p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
              favorite
                ? "bg-white/90 text-terracotta-500 fill-current dark:bg-pine-900/90"
                : "bg-white/80 text-zinc-400 hover:text-terracotta-500 dark:bg-pine-900/80"
            }`}
            title={favorite ? "حذف از نشان‌شده‌ها" : "نشان کردن کتاب"}
          >
            <Heart className={`w-3.5 h-3.5 ${favorite ? "fill-current" : ""}`} />
          </button>

          {/* Discount / Bestseller Badge */}
          {book.discountPercent && (
            <span className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-md bg-terracotta-500 text-white text-[11px] font-bold shadow-sm">
              {toPersianDigits(book.discountPercent)}٪ تخفیف
            </span>
          )}

          {/* Book Cover with 3D Spine and Hover Lift */}
          <div
            onClick={() => setModalOpen(true)}
            className="w-full h-56 sm:h-64 rounded-xl overflow-hidden relative cursor-pointer shadow-book-3d group-hover:-translate-y-1 group-hover:shadow-2xl transition-all duration-300 bg-parchment-200"
          >
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Realistic Spine Curve Shadow overlay */}
            <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/35 via-white/10 to-transparent pointer-events-none" />

            {/* Quick Preview Hover Overlay */}
            <div className="absolute inset-0 bg-pine-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-white/90 dark:bg-pine-900/90 text-pine-900 dark:text-parchment-100 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-honey-500" />
                <span>مشاهده و گشودن کتاب</span>
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-3.5 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
              <span className="font-medium text-honey-700 dark:text-honey-400">{book.category}</span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3 h-3 fill-amber-500" />
                <span>{toPersianDigits(book.rating)}</span>
              </div>
            </div>

            <Link href={`/books/${book.id}`} className="hover:text-honey-600 transition-colors">
              <h3 className="text-sm sm:text-base font-bold font-serif text-pine-950 dark:text-parchment-100 line-clamp-1">
                {book.title}
              </h3>
            </Link>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
              {book.author}
            </p>
          </div>

          {/* Pricing & Add to cart */}
          <div className="mt-4 pt-3 border-t border-parchment-200 dark:border-pine-900/80 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold text-pine-950 dark:text-honey-400 font-serif">
                {formatPrice(book.price)}
              </span>
              {book.originalPrice && (
                <span className="text-[11px] text-zinc-400 line-through">
                  {formatPrice(book.originalPrice)}
                </span>
              )}
            </div>

            <button
              onClick={() => addItem(book)}
              className="p-2.5 rounded-xl bg-pine-800 hover:bg-pine-900 text-honey-300 hover:text-white shadow-sm transition-all group-active:scale-95"
              title="افزودن به سبد خرید"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <BookPreviewModal book={book} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
