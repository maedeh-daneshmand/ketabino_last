"use client";

import { useState } from "react";
import BookSpine3D from "./BookSpine3D";
import { BOOKS } from "@/data/books";
import { Sparkles, Library, ChevronLeft, ChevronRight } from "lucide-react";

export default function BookshelfSection() {
  // Curated shelf items matching reference image: موشن کتاب ها.jpg
  const shelfItems = [
    {
      label: "کتاب‌های تک نسخه‌ای",
      book: BOOKS[0], // بوف کور
      color: "#18331a", // Pine dark
      tilt: -4,
    },
    {
      label: "کتاب‌های امضا شده",
      book: BOOKS[1], // شازده کوچولو
      color: "#243d28",
      tilt: -2,
    },
    {
      label: "فهرست برترین آثار ادبیات مدرن",
      book: BOOKS[2], // چشم‌هایش
      color: "#1e3f20",
      tilt: 0,
    },
    {
      label: "برترین کتاب‌های انجمن نروژ",
      book: BOOKS[4], // جنایت و مکافات
      color: "#2a4d30",
      tilt: 0,
    },
    {
      label: "داستان و تراژدی کمدی سیاه",
      book: BOOKS[5], // سمفونی مردگان
      color: "#313833",
      tilt: 0,
    },
    {
      label: "برندگان جایزه نوبل ادبیات",
      book: BOOKS[14], // صد سال تنهایی
      color: "#1f2e23",
      tilt: 0,
    },
    {
      label: "برندگان جایزه من بوکر",
      book: BOOKS[7], // ملت عشق
      color: "#263e2c",
      tilt: 0,
    },
    {
      label: "برندگان پولیتزر داستان",
      book: BOOKS[6], // ۱۹۸۴
      color: "#1b291e",
      tilt: 0,
    },
    {
      label: "برندگان جایزه هوشنگ گلشیری",
      book: BOOKS[0], // بوف کور
      color: "#233d27",
      tilt: 0,
    },
    {
      label: "پرفروش‌های نیویورک تایمز",
      book: BOOKS[3], // عادت‌های اتمی
      color: "#162819",
      tilt: 0,
    },
    {
      label: "۱۰۰ کتاب برتر قرن لوموند",
      book: BOOKS[12], // بیگانه
      color: "#1e3a24",
      tilt: 0,
    },
    {
      label: "۱۰۰ رمان مدرن لایبرری",
      book: BOOKS[9], // انسان در جستجوی معنی
      color: "#142317",
      tilt: 1,
    },
    {
      label: "برترین‌های گاردین و تایم",
      book: BOOKS[15], // چنین گفت زرتشت
      color: "#273b2b",
      tilt: 5, // Leaning against right bookend
    },
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-parchment-300 dark:border-pine-800">
          <div>
            <div className="flex items-center gap-2 text-honey-600 dark:text-honey-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Library className="w-4 h-4" />
              <span>قفسه شاهکارهای ادبی کتابینو</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-pine-950 dark:text-parchment-50">
              قفسه برگزیدگان و عناوین کلاسیک
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              روی هر کتاب کلیک کنید تا جلد و صفحات آن پیش روی شما گشوده شود
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-sage-600 dark:text-sage-400">
            <span className="inline-block w-2 h-2 rounded-full bg-honey-500 animate-ping" />
            <span>چیدمان تعاملی کتابخانه</span>
          </div>
        </div>

        {/* Bookshelf Wooden Structure */}
        <div className="relative pt-8 pb-4 bg-gradient-to-b from-parchment-100/50 to-parchment-200/90 dark:from-pine-950/40 dark:to-pine-950/90 rounded-3xl p-6 border border-parchment-300/80 dark:border-pine-900 shadow-xl overflow-x-auto">
          {/* Books row with smooth flex layout */}
          <div className="flex items-end justify-center min-w-[900px] gap-2 sm:gap-3 px-6 pb-2">
            {shelfItems.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className="transition-all duration-700 ease-out"
                style={{
                  transitionDelay: `${index * 60}ms`,
                }}
              >
                <BookSpine3D
                  book={item.book}
                  customLabel={item.label}
                  spineColor={item.color}
                  tiltAngle={item.tilt}
                  heightClass={index % 2 === 0 ? "h-76 sm:h-84" : "h-72 sm:h-80"}
                />
              </div>
            ))}
          </div>

          {/* Wooden Shelf Base Plinth */}
          <div className="relative w-full mt-1">
            {/* Top shelf wood grain line */}
            <div className="h-4 bg-gradient-to-r from-[#593b20] via-[#754d2a] to-[#593b20] rounded-sm shadow-md border-t border-[#8f6137]" />
            {/* Front wooden edge plank */}
            <div className="h-6 bg-gradient-to-r from-[#3e2714] via-[#52341b] to-[#3e2714] rounded-b-md shadow-2xl flex items-center justify-between px-6 text-[10px] text-[#c5a882] font-serif">
              <span>گنجینه ادبیات کتابینو • قفسه شماره یک</span>
              <span className="tracking-widest uppercase text-honey-400">KETABINO ARCHIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
