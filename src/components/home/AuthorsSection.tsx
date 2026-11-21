"use client";

import Link from "next/link";
import { AUTHORS } from "@/data/authors";
import { Feather, ArrowLeft } from "lucide-react";
import { toPersianDigits } from "@/lib/utils";

export default function AuthorsSection() {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-parchment-100/60 dark:bg-pine-950/40 border-y border-parchment-300/60 dark:border-pine-900/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-parchment-300 dark:border-pine-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-honey-600 dark:text-honey-400 font-bold uppercase tracking-wider mb-1">
              <Feather className="w-4 h-4" />
              <span>اهالی قلم و اندیشه</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-pine-950 dark:text-parchment-50">
              نویسندگان منتخب کتابینو
            </h2>
          </div>

          <Link
            href="/explore"
            className="text-xs sm:text-sm font-semibold text-pine-800 dark:text-honey-400 hover:text-terracotta-600 flex items-center gap-1.5 transition-colors"
          >
            <span>مشاهده همه نویسندگان</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Authors Row with Arched Vintage Portraits */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {AUTHORS.map((author) => (
            <Link
              key={author.id}
              href={`/search?q=${encodeURIComponent(author.name)}`}
              className="group flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Arched Portrait Frame */}
              <div className="w-32 sm:w-36 h-40 sm:h-44 rounded-t-full rounded-b-2xl overflow-hidden shadow-md border-2 border-parchment-300 dark:border-pine-800 group-hover:border-honey-500 transition-all duration-300 relative bg-parchment-200">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter sepia-[0.25] group-hover:sepia-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>

              {/* Author Info */}
              <h3 className="mt-3 text-sm font-bold font-serif text-pine-950 dark:text-parchment-100 group-hover:text-honey-600 transition-colors">
                {author.name}
              </h3>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                {author.born}
              </span>
              <span className="text-[11px] text-honey-700 dark:text-honey-400 font-semibold mt-1">
                {toPersianDigits(author.booksCount)} اثر در کتابینو
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
