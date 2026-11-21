"use client";

import Link from "next/link";
import { Crown, Sparkles, BookOpen, Check, ArrowLeft, Download, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function MembershipBanner() {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-pine-900 via-pine-950 to-zinc-950 text-parchment-100 p-8 sm:p-12 lg:p-16 border border-pine-800 shadow-2xl">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-honey-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left / Info (Cols 1-7) */}
            <div className="lg:col-span-7 space-y-5 text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-honey-500/20 text-honey-300 text-xs font-bold border border-honey-500/30">
                <Crown className="w-4 h-4 text-honey-400" />
                <span>اشتراک طلایی کتابینو • دسترسی بدون مرز</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-white leading-tight">
                یک فنجان چای، یک کتاب ناب؛ <br />
                <span className="text-honey-400">هزاران داستان در جیب شما.</span>
              </h2>

              <p className="text-sm text-sage-300 max-w-xl leading-relaxed text-justify">
                با تهیه اشتراک ویژه کتابینو، بدون نیاز به خرید جداگانه کتاب‌ها، به آرشیو عظیم رمان‌های کلاسیک، آثار روانشناسی، کتاب‌های صوتی و متون نایاب دسترسی نامحدود داشته باشید.
              </p>

              {/* Perks List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-parchment-200">
                  <div className="w-5 h-5 rounded-full bg-honey-500/20 text-honey-400 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>دسترسی به بیش از ۱۲,۰۰۰ کتاب کامل</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-parchment-200">
                  <div className="w-5 h-5 rounded-full bg-honey-500/20 text-honey-400 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>دانلود نامحدود برای مطالعه آفلاین</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-parchment-200">
                  <div className="w-5 h-5 rounded-full bg-honey-500/20 text-honey-400 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>۳۰٪ تخفیف دائمی خرید کتاب‌های فیزیکی</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-parchment-200">
                  <div className="w-5 h-5 rounded-full bg-honey-500/20 text-honey-400 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>بدون هیچ‌گونه آگهی یا تبلیغات مزاحم</span>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/membership"
                  className="bg-honey-500 hover:bg-honey-600 text-pine-950 font-bold px-7 py-3 rounded-2xl text-sm shadow-lg transition-all flex items-center gap-2 group"
                >
                  <span>شروع اشتراک از ۹۹,۰۰۰ تومان</span>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/about"
                  className="text-xs text-sage-300 hover:text-white transition-colors underline underline-offset-4"
                >
                  شرایط و قوانین اشتراک
                </Link>
              </div>
            </div>

            {/* Right / Decorative Card (Cols 8-12) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl bg-white/10 backdrop-blur-md p-6 border border-white/15 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-honey-400 to-amber-600 flex items-center justify-center text-pine-950 shadow-lg mb-4">
                  <Crown className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold font-serif text-white">پلن طلایی سالانه</h3>
                <span className="text-xs text-honey-300 mt-1">پیشنهاد برگزیده ویراستاران</span>

                <div className="my-4 py-3 border-y border-white/15 w-full">
                  <div className="text-2xl font-black text-white font-serif">{formatPrice(890000)}</div>
                  <span className="text-[11px] text-sage-300">برای یک سال کامل (همراه هدیه پستی کتاب امضاشده)</span>
                </div>

                <Link
                  href="/membership"
                  className="w-full bg-white hover:bg-parchment-100 text-pine-950 font-bold py-2.5 rounded-xl text-xs transition-all shadow"
                >
                  مشاهده تمام پلن‌ها
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
