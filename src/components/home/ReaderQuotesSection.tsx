"use client";

import { useState } from "react";
import { Quote as QuoteIcon, Star, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { QUOTES } from "@/data/quotes";

export default function ReaderQuotesSection() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const testimonials = [
    {
      name: "نگار پرتو",
      city: "تهران",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      comment: "حس ورق زدن کتاب‌های قدیمی و تم سپیای ریدر کتابینو بی‌نظیره. انگار تو یه کافه دنج تو خیابون انقلاب نشستی و داری کتاب می‌خونی.",
    },
    {
      name: "آرش سپهری",
      city: "اصفهان",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      comment: "قفسه سه‌بعدی و موشن باز شدن کتاب‌ها یکی از جذاب‌ترین فیچرهایی بود که تو سایت‌های ایرانی دیدم. کیفیت کتاب‌ها و اطلاعاتشون کاملاً تکمیله.",
    },
    {
      name: "فرنوش شایگان",
      city: "شیراز",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      comment: "سیستم ردیابی مطالعه و آمار زنجیره (Streak) در پنل کاربری باعث شد دوباره بعد از ماه‌ها برگردم به کتاب خوندن روزانه.",
    },
  ];

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % QUOTES.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);
  };

  const activeQuote = QUOTES[currentQuoteIndex];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Right: Literary Quote of the Day (Cols 1-6) */}
        <div className="lg:col-span-6 bg-parchment-200/80 dark:bg-pine-900/40 rounded-3xl p-8 sm:p-10 border border-parchment-300 dark:border-pine-800 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle watermark quote icon */}
          <QuoteIcon className="absolute -bottom-6 -left-6 w-36 h-36 text-honey-500/10 pointer-events-none rotate-180" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-honey-700 dark:text-honey-400 uppercase tracking-widest flex items-center gap-1.5">
                <QuoteIcon className="w-4 h-4" />
                <span>جرعه‌ای از کلمات • سخن ماندگار</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={prevQuote}
                  className="p-1.5 rounded-lg bg-parchment-100 dark:bg-pine-800 text-zinc-600 dark:text-zinc-300 hover:bg-parchment-300 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={nextQuote}
                  className="p-1.5 rounded-lg bg-parchment-100 dark:bg-pine-800 text-zinc-600 dark:text-zinc-300 hover:bg-parchment-300 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            <blockquote className="text-base sm:text-xl font-serif font-bold text-pine-950 dark:text-parchment-50 leading-relaxed text-justify mb-6">
              «{activeQuote.text}»
            </blockquote>
          </div>

          <div className="pt-4 border-t border-parchment-300/80 dark:border-pine-800/80 flex items-center justify-between">
            <div>
              <span className="font-bold text-sm text-pine-900 dark:text-parchment-100 block">
                {activeQuote.author}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                از کتاب: {activeQuote.bookTitle}
              </span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-honey-500/15 text-honey-800 dark:text-honey-300 font-semibold">
              {activeQuote.category}
            </span>
          </div>
        </div>

        {/* Left: What Readers Say / Testimonials (Cols 7-12) */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          <div className="mb-2">
            <span className="text-xs text-honey-600 dark:text-honey-400 font-bold uppercase tracking-wider block mb-1">
              صدای همراهان کتابینو
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-pine-950 dark:text-parchment-50">
              اهالی کتاب درباره ما چه می‌گویند؟
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-4 sm:p-5 border border-parchment-300/60 dark:border-pine-800/80 flex items-start gap-4 hover:shadow-md transition-all"
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-honey-400/80 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-pine-950 dark:text-parchment-100 font-serif">
                        {t.name}
                      </h4>
                      <span className="text-[10px] text-zinc-400">از {t.city}</span>
                    </div>
                    <div className="flex items-center text-amber-500">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed text-justify">
                    {t.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
