"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Heart, Sparkles, Shield, ChevronDown, Mail, Phone, MapPin } from "lucide-react";

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "کتابینو چیست و چه تفاوتی با سایر فروشگاه‌های کتاب دارد؟",
      a: "کتابینو بستری آرام، زیبا و فاخر برای دوستداران کتاب‌های اصیل، کلاسیک و تک‌نسخه‌ای است. ما با طراحی الهام‌گرفته از عطف کتاب‌های قدیمی و کتابخانه‌های چوبی نوستالژیک در کنار ریدر هوشمند بدون تبلیغ، تجربه مطالعه را دلپذیر کرده‌ایم.",
    },
    {
      q: "آیا برای خواندن کتاب‌ها نیاز به اینترنت دائمی است؟",
      a: "خیر، پس از اضافه شدن کتاب به کتابخانه شخصی، متن اثر در حافظه مرورگر شما (LocalStorage) ذخیره شده و می‌توانید بدون نیاز به اینترنت و به صورت کاملاً آفلاین مطالعه کنید.",
    },
    {
      q: "ریدر کتابینو چه امکاناتی برای شخصی‌سازی دارد؟",
      a: "ریدر هوشمند کتابینو دارای ۴ تم رنگی (روشن، کاهی سپیا، تیره شب و زمردی)، ۴ سایز قلم، ۳ حالت فاصله بین خطوط، نشانه‌گذاری صفحات و ذخیره دقیق آخرین محل مطالعه است.",
    },
    {
      q: "اشتراک طلایی کتابینو چه امکاناتی فراهم می‌کند؟",
      a: "با فعال‌سازی اشتراک، دسترسی نامحدود به تمامی کتاب‌های دیجیتال، تخفیف ۳۰٪ در خرید نسخه‌های فیزیکی، همگام‌سازی ابری و بسته‌های هدیه سالانه برای شما فعال می‌گردد.",
    },
    {
      q: "فرآیند خرید و دریافت کتاب‌ها در کتابینو چگونه است؟",
      a: "پس از انتخاب کتاب و پرداخت امن از طریق کلیه کارت‌های عضو شتاب، نسخه دیجیتال بلافاصله در بخش «کتابخانه شخصی» شما فعال شده و در ریدر هوشمند قابل مطالعه خواهد بود. نسخه‌های فیزیکی نیز ظرف ۲ الی ۳ روز کاری با بسته‌بندی ویژه پستی ارسال می‌گردند.",
    },
  ];

  return (
    <div className="w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      {/* Hero / Our Story */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-honey-500/15 border border-honey-500/30 text-honey-800 dark:text-honey-300 text-xs font-semibold">
          <BookOpen className="w-4 h-4 text-honey-600" />
          <span>نامه‌ای عاشقانه به کتاب و کلمات</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-pine-950 dark:text-parchment-50 leading-tight">
          درباره کتابینو (Ketabino)
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed text-justify">
          کتابینو از یک رویای ساده آغاز شد: بازگرداندن حس دنج کتابفروشی‌های خیابان انقلاب، بوی کاغذ کاهی و لذت غرق شدن در شاهکارهای ادبیات داستانی، به جهان شتاب‌زده دیجیتال امروز. ما باور داریم که داستان‌ها چراغ راه تفکر و خودشناسی انسان هستند.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-3xl p-6 border border-parchment-300 dark:border-pine-800 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-honey-500/20 text-honey-600 mx-auto flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-bold font-serif text-base text-pine-950 dark:text-parchment-100">
            انتخاب با عشق و وسواس
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            هیچ کتابی در کتابینو تصادفی قرار نگرفته است؛ هر اثر حاصل گزینش بهترین ترجمه‌ها و ارزشمندترین متون است.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-parchment-300 dark:border-pine-800 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-pine-500/20 text-pine-600 dark:text-pine-400 mx-auto flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="font-bold font-serif text-base text-pine-950 dark:text-parchment-100">
            احترام به تمرکز خواننده
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            محیط مطالعه کتابینو عاری از هرگونه آگهی، اعلان‌های آزاردهنده یا حواس‌پرتی طراحی شده است.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-parchment-300 dark:border-pine-800 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-terracotta-500/20 text-terracotta-600 mx-auto flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-bold font-serif text-base text-pine-950 dark:text-parchment-100">
            تلفیق اصالت و فناوری
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            زیبایی‌شناسی عطف‌های سه‌بعدی و چرم کلاسیک همراه با ردیابی هوشمند عادات و زنجیره مطالعه شما.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-parchment-300 dark:border-pine-800 space-y-6">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className="text-2xl font-bold font-serif text-pine-950 dark:text-parchment-50">
            پرسش‌های متداول همراهان کتابینو
          </h2>
          <p className="text-xs text-zinc-500 mt-1">پاسخ به سوالات پرتکرار شما درباره سازوکار پلتفرم</p>
        </div>

        <div className="space-y-3 divide-y divide-parchment-200 dark:divide-pine-800">
          {faqs.map((faq, idx) => (
            <div key={idx} className="pt-3">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-right py-3 flex items-center justify-between gap-4 font-bold text-sm text-pine-950 dark:text-parchment-100"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform ${openFaq === idx ? "rotate-180 text-honey-600" : ""}`}
                />
              </button>
              {openFaq === idx && (
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pb-4 text-justify">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="p-8 rounded-3xl bg-parchment-200/60 dark:bg-pine-900/40 border border-parchment-300 dark:border-pine-800 text-center space-y-4">
        <h3 className="text-lg font-bold font-serif text-pine-950 dark:text-parchment-50">
          پل‌های ارتباطی با کتابینو
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-zinc-600 dark:text-zinc-300">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-honey-600" />
            <span>ایمیل: support@ketabino.ir</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-honey-600" />
            <span>تلفن تماس: ۰۲۱-۸۸۸۸۴۳۲۱</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-honey-600" />
            <span>نشانی: تهران، میدان انقلاب، خیابان اردیبهشت، پلاک ۴</span>
          </div>
        </div>
      </div>
    </div>
  );
}
