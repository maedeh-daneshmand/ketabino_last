"use client";

import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { BookOpen, Brain, Compass, Briefcase, Hourglass, Feather, Cpu, Globe, ArrowLeft } from "lucide-react";
import { toPersianDigits } from "@/lib/utils";

// Icon mapping helper
const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Compass: <Compass className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Hourglass: <Hourglass className="w-6 h-6" />,
  Feather: <Feather className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
};

export default function CategoryPills() {
  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 border-y border-parchment-300/60 dark:border-pine-900/40 bg-parchment-100/40 dark:bg-pine-950/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs text-honey-600 dark:text-honey-400 font-bold uppercase tracking-wider block mb-1">
              دسته‌بندی موضوعی کتاب‌ها
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-pine-950 dark:text-parchment-50">
              موضوع دلخواه خود را بیابید
            </h2>
          </div>

          <Link
            href="/explore"
            className="text-xs sm:text-sm font-semibold text-pine-800 dark:text-honey-400 hover:text-terracotta-600 flex items-center gap-1.5 transition-colors"
          >
            <span>مشاهده تمامی موضوعات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/explore?category=${cat.id}`}
              className="group flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Circular Badge */}
              <div
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105 border border-white/80 dark:border-pine-800"
                style={{
                  backgroundColor: cat.color + "18", // 10% opacity tint
                  color: cat.color,
                }}
              >
                {iconMap[cat.iconName] || <BookOpen className="w-6 h-6" />}
              </div>

              {/* Title & Count */}
              <h3 className="mt-3 text-xs sm:text-sm font-bold text-pine-950 dark:text-parchment-100 group-hover:text-honey-600 transition-colors">
                {cat.name}
              </h3>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                {toPersianDigits(cat.bookCount)} اثر
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
