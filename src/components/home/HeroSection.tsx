"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, BookOpen, Sparkles, ArrowLeft, Bookmark, Star, ShieldCheck, Flame } from "lucide-react";
import { BOOKS } from "@/data/books";
import BookPreviewModal from "@/components/books/BookPreviewModal";
import { formatPrice, toPersianDigits } from "@/lib/utils";

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [heroModalOpen, setHeroModalOpen] = useState(false);

  const heroBook = BOOKS[0]; // بوف کور or chosen masterpiece

  const quickTags = [
    { label: "رمان‌های کلاسیک", query: "fiction" },
    { label: "صادق هدایت", query: "صادق هدایت" },
    { label: "عادت‌های اتمی", query: "عادت‌های اتمی" },
    { label: "فلسفه و اندیشه", query: "philosophy" },
    { label: "شاهکارهای ایران", query: "بوف کور" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <section className="relative w-full pt-8 pb-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-1/4 right-5 w-72 h-72 bg-honey-200/40 dark:bg-pine-900/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-5 w-80 h-80 bg-terracotta-200/30 dark:bg-pine-800/15 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Right Column: Hero Headline & Search (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            {/* Vintage Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-honey-500/15 border border-honey-500/30 text-honey-800 dark:text-honey-300 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-honey-600 animate-spin" />
              <span>مرجع فاخر کتاب‌های الکترونیکی، کلاسیک و تک‌نسخه‌ای</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-pine-950 dark:text-parchment-50 leading-tight">
              داستان‌ها، اندیشه‌ها، <br />
              <span className="text-pine-800 dark:text-honey-400 relative inline-block">
                واژه‌های جاودان.
                <span className="absolute bottom-1.5 inset-x-0 h-3 bg-honey-300/35 dark:bg-honey-500/20 -z-10 rounded" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-xl leading-relaxed text-justify">
              کتابینو فضایی آرام و اصیل برای کشف و مطالعه گزیده‌ترین کتاب‌های ادبیات، روانشناسی، فلسفه و تاریخ است. همراه با کتابخانه شخصی، ریدر هوشمند بدون مزاحمت و امکان تورق دلنشین و گشودن کتاب.
            </p>

            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl">
              <div className="relative flex items-center shadow-lg rounded-2xl bg-white dark:bg-pine-900/80 border border-parchment-300 dark:border-pine-700/80 p-1.5 focus-within:ring-2 focus-within:ring-honey-500/50 transition-all">
                <Search className="w-5 h-5 text-zinc-400 mr-3" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="دنبال چه کتاب، نویسنده یا موضوعی هستید؟"
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-pine-950 dark:text-parchment-50 placeholder:text-zinc-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-pine-800 hover:bg-pine-900 text-parchment-100 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>جستجو</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Quick Keyword Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">جستجوهای داغ:</span>
              {quickTags.map((tag) => (
                <Link
                  key={tag.label}
                  href={`/search?q=${encodeURIComponent(tag.query)}`}
                  className="px-2.5 py-1 rounded-lg bg-parchment-200/70 hover:bg-parchment-300 dark:bg-pine-900/60 dark:hover:bg-pine-800 text-zinc-700 dark:text-parchment-200 transition-colors"
                >
                  {tag.label}
                </Link>
              ))}
            </div>

            {/* Stats / Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-parchment-300/60 dark:border-pine-800/60 max-w-lg">
              <div>
                <span className="text-2xl font-black font-serif text-pine-900 dark:text-honey-400">
                  {toPersianDigits(12000)}+
                </span>
                <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">کتاب و مقاله دیجیتال</span>
              </div>
              <div>
                <span className="text-2xl font-black font-serif text-pine-900 dark:text-honey-400">
                  {toPersianDigits(45000)}+
                </span>
                <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">کاربر فعال کتابخوان</span>
              </div>
              <div>
                <span className="text-2xl font-black font-serif text-pine-900 dark:text-honey-400">
                  {toPersianDigits(99.4)}٪
                </span>
                <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">رضایت از کیفیت ریدر</span>
              </div>
            </div>
          </div>

          {/* Left Column: 3D Interactive Hero Book Showcase (Cols 8-12) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-honey-400/20 via-terracotta-400/20 to-pine-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-80" />

              {/* Main Card */}
              <div className="relative glass-card rounded-3xl p-6 sm:p-8 max-w-sm border border-white/60 dark:border-pine-800/80 shadow-2xl flex flex-col items-center">
                {/* Badge */}
                <div className="w-full flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-terracotta-500/15 text-terracotta-700 dark:text-terracotta-300 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-terracotta-500" />
                    <span>کتاب برگزیده هفته</span>
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{toPersianDigits(heroBook.rating)}</span>
                  </div>
                </div>

                {/* 3D Book Display */}
                <div
                  onClick={() => setHeroModalOpen(true)}
                  className="w-48 sm:w-56 h-68 sm:h-76 rounded-r-xl rounded-l-sm overflow-hidden relative cursor-pointer shadow-book-3d transform group-hover:-translate-y-2 group-hover:rotate-1 transition-all duration-300"
                >
                  <img
                    src={heroBook.cover}
                    alt={heroBook.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Left Spine Shadow */}
                  <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 via-white/10 to-transparent pointer-events-none" />

                  {/* 3D Spine Mock on Left */}
                  <div className="absolute -left-2 inset-y-0.5 w-2 bg-pine-950 rounded-l shadow-inner" />
                </div>

                {/* Book Details */}
                <div className="w-full text-center mt-5">
                  <h3 className="text-xl font-bold font-serif text-pine-950 dark:text-parchment-50">
                    {heroBook.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    اثر جاودانه <strong className="text-pine-800 dark:text-parchment-200">{heroBook.author}</strong>
                  </p>

                  <div className="flex items-center justify-center gap-3 my-3">
                    <span className="text-lg font-bold text-pine-900 dark:text-honey-400 font-serif">
                      {formatPrice(heroBook.price)}
                    </span>
                    {heroBook.originalPrice && (
                      <span className="text-xs text-zinc-400 line-through">
                        {formatPrice(heroBook.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex items-center gap-2 w-full mt-2">
                    <button
                      onClick={() => setHeroModalOpen(true)}
                      className="flex-1 bg-pine-800 hover:bg-pine-900 text-parchment-50 py-2.5 px-4 rounded-xl text-xs font-bold shadow transition-all flex items-center justify-center gap-1.5"
                    >
                      <BookOpen className="w-4 h-4 text-honey-400" />
                      <span>مرور و گشودن کتاب</span>
                    </button>
                    <Link
                      href={`/reader/${heroBook.id}`}
                      className="bg-honey-500 hover:bg-honey-600 text-pine-950 py-2.5 px-4 rounded-xl text-xs font-bold shadow-sm transition-all"
                    >
                      مطالعه نمونه
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookPreviewModal book={heroBook} isOpen={heroModalOpen} onClose={() => setHeroModalOpen(false)} />
    </section>
  );
}
