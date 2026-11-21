"use client";

import { useState } from "react";
import Link from "next/link";
import { Crown, Check, Sparkles, ShieldCheck, Zap, ArrowLeft, Star, Heart } from "lucide-react";
import { MEMBERSHIP_PLANS } from "@/data/membership";
import { useUser } from "@/hooks/useUser";
import { formatPrice, toPersianDigits } from "@/lib/utils";

export default function MembershipPage() {
  const { user, upgradeMembership } = useUser();
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    if (planId === "free") {
      setSuccessToast("شما هم‌اکنون عضو طرح پایه کتابینو هستید.");
      return;
    }
    const upgraded = upgradeMembership(planId as "monthly" | "yearly");
    setSuccessToast(`اشتراک ${planId === "monthly" ? "طلایی ماهانه" : "الماس سالانه"} با موفقیت برای شما فعال شد! 🌟`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-honey-500/15 border border-honey-500/30 text-honey-800 dark:text-honey-300 text-xs font-semibold mb-3">
          <Crown className="w-4 h-4 text-honey-600" />
          <span>طرح‌های اشتراک کتابینو (Ketabino Club)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-pine-950 dark:text-parchment-50 leading-tight">
          سفر بی‌پایان به جهان کتاب‌ها
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">
          با عضویت در باشگاه کتابینو، هزاران کتاب شاهکار، نقد و رمان صوتی را بدون محدودیت در هر زمان و روی تمام دستگاه‌هایتان ورق بزنید.
        </p>

        {/* Current status pill */}
        <div className="mt-4 inline-block px-4 py-1.5 rounded-full bg-parchment-200 dark:bg-pine-900 border border-parchment-300 dark:border-pine-800 text-xs text-pine-900 dark:text-parchment-100 font-semibold">
          وضعیت کنونی حساب شما:{" "}
          <strong className="text-honey-600 dark:text-honey-400">
            {user.membershipPlan === "monthly"
              ? "اشتراک طلایی ماهانه"
              : user.membershipPlan === "yearly"
              ? "اشتراک الماس سالانه"
              : "عضویت پایه رایگان"}
          </strong>
        </div>
      </div>

      {/* Success Toast Notification */}
      {successToast && (
        <div className="max-w-md mx-auto mb-8 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-center text-xs sm:text-sm font-semibold shadow-lg animate-fadeIn flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
        {MEMBERSHIP_PLANS.map((plan) => {
          const isCurrent = user.membershipPlan === plan.id;
          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? "glass-card border-2 border-honey-500 shadow-2xl md:-translate-y-2"
                  : "glass-card border border-parchment-300/80 dark:border-pine-800 shadow-md hover:shadow-xl"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-honey-500 text-pine-950 text-[11px] font-black shadow">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold font-serif text-pine-950 dark:text-parchment-50 mb-1">
                  {plan.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="py-4 border-y border-parchment-200 dark:border-pine-800/80 mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black font-serif text-pine-950 dark:text-honey-400">
                      {plan.price === 0 ? "رایگان" : formatPrice(plan.price)}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-xs text-zinc-400">/ {plan.duration}</span>
                    )}
                  </div>
                  {plan.originalPrice && (
                    <span className="text-xs text-zinc-400 line-through mt-0.5 block">
                      {formatPrice(plan.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-3 text-xs text-zinc-700 dark:text-zinc-300">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-honey-500/20 text-honey-600 dark:text-honey-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full bg-emerald-600 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 opacity-90 cursor-default"
                  >
                    <Check className="w-4 h-4" />
                    <span>طرح فعال شما</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full font-bold py-3 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
                      plan.popular
                        ? "bg-honey-500 hover:bg-honey-600 text-pine-950"
                        : "bg-pine-800 hover:bg-pine-900 text-white"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>انتخاب و فعال‌سازی این طرح</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Guarantee & FAQ section */}
      <div className="p-8 rounded-3xl bg-parchment-200/80 dark:bg-pine-900/40 border border-parchment-300 dark:border-pine-800 max-w-3xl mx-auto text-center space-y-3">
        <ShieldCheck className="w-8 h-8 text-honey-600 mx-auto" />
        <h4 className="text-base font-bold font-serif text-pine-950 dark:text-parchment-100">
          تضمین کیفیت و پشتیبانی دائم کتابینو
        </h4>
        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl mx-auto">
          تمامی نسخه‌های کتاب با نظارت دقیق ویراستاران و بهینه‌سازی شده برای انواع تبلت‌ها و صفحات نمایش آماده شده‌اند. در صورت هرگونه سوال یا راهنمایی، تیم پشتیبانی کتابینو در کنار شماست.
        </p>
      </div>
    </div>
  );
}
