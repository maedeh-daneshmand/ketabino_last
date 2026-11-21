"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowLeft, BookOpen, Star } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { BOOKS } from "@/data/books";
import { formatPrice, toPersianDigits } from "@/lib/utils";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addItem } = useCart();

  const favoriteBooks = BOOKS.filter((book) => favorites.includes(book.id));

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-parchment-300 dark:border-pine-800">
        <div>
          <span className="text-xs font-bold text-terracotta-600 uppercase tracking-widest block mb-1">
            کتاب‌های محبوب شما
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-pine-950 dark:text-parchment-50">
            فهرست علاقه‌مندی‌ها و نشان‌شده‌ها
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            کتاب‌هایی که برای مطالعه در آینده یا خرید نشان کرده‌اید
          </p>
        </div>

        <span className="text-xs text-zinc-500">
          تعداد نشان‌شده‌ها: <strong className="text-pine-900 dark:text-honey-400">{toPersianDigits(favoriteBooks.length)}</strong> کتاب
        </span>
      </div>

      {favoriteBooks.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border border-parchment-300 dark:border-pine-800 max-w-md mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-terracotta-500/15 text-terracotta-600 mx-auto flex items-center justify-center mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold font-serif text-pine-950 dark:text-parchment-100">
            هنوز کتابی را نشان نکرده‌اید!
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
            با کلیک روی آیکون قلب در کارتهای کتاب، کتاب‌های مورد علاقه خود را در این بخش ذخیره کنید.
          </p>
          <Link
            href="/explore"
            className="mt-6 inline-block bg-pine-800 hover:bg-pine-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow"
          >
            کاوش کتاب‌ها
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteBooks.map((book) => (
            <div
              key={book.id}
              className="glass-card rounded-2xl p-4 border border-parchment-300/80 dark:border-pine-800 flex flex-col justify-between hover:shadow-xl transition-all"
            >
              <div>
                {/* Cover with Remove Button */}
                <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-book-3d mb-3 bg-parchment-200">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(book.id)}
                    className="absolute top-2 left-2 p-2 rounded-full bg-white/90 dark:bg-pine-900/90 text-terracotta-600 hover:text-red-700 shadow transition-colors"
                    title="حذف از نشان‌شده‌ها"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                  <span className="font-semibold text-honey-700 dark:text-honey-400">{book.category}</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{toPersianDigits(book.rating)}</span>
                  </div>
                </div>

                <Link href={`/books/${book.id}`} className="hover:text-honey-600 transition-colors">
                  <h3 className="text-sm font-bold font-serif text-pine-950 dark:text-parchment-100 line-clamp-1">
                    {book.title}
                  </h3>
                </Link>
                <span className="text-xs text-zinc-500 block mt-0.5">{book.author}</span>
              </div>

              <div className="mt-4 pt-3 border-t border-parchment-200 dark:border-pine-800 flex items-center justify-between">
                <span className="text-xs font-bold text-pine-900 dark:text-honey-400 font-serif">
                  {formatPrice(book.price)}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => addItem(book)}
                    className="p-2 rounded-xl bg-pine-800 text-white hover:bg-pine-900 transition-colors"
                    title="افزودن به سبد خرید"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>

                  <Link
                    href={`/reader/${book.id}`}
                    className="p-2 rounded-xl border border-parchment-300 dark:border-pine-800 text-zinc-600 hover:bg-parchment-200 transition-colors"
                    title="مطالعه کتاب"
                  >
                    <BookOpen className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
