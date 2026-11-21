"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Send, Heart, ShieldCheck, Truck, Headphones, Sparkles, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitted(true);
    setTimeout(() => {
      setNewsletterEmail("");
    }, 3000);
  };

  return (
    <footer className="w-full bg-pine-950 text-parchment-200 border-t border-pine-900 transition-colors">
      {/* Value Badges Banner */}
      <div className="border-b border-pine-900/60 py-8 px-4 sm:px-6 lg:px-8 bg-pine-900/40">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-2 p-3">
            <div className="w-11 h-11 rounded-2xl bg-honey-500/15 flex items-center justify-center text-honey-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-parchment-100">آثار برگزیده و اصیل</h4>
            <p className="text-xs text-sage-400">گلچینی از بهترین ترجمه‌ها و متون</p>
          </div>

          <div className="flex flex-col items-center gap-2 p-3">
            <div className="w-11 h-11 rounded-2xl bg-terracotta-500/15 flex items-center justify-center text-terracotta-400">
              <Headphones className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-parchment-100">ریدر پیشرفته دیجیتال</h4>
            <p className="text-xs text-sage-400">مطالعه روان، تم شب و ذخیره پیشرفت</p>
          </div>

          <div className="flex flex-col items-center gap-2 p-3">
            <div className="w-11 h-11 rounded-2xl bg-sage-500/15 flex items-center justify-center text-sage-300">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-parchment-100">ارسال سریع نسخه‌های چاپی</h4>
            <p className="text-xs text-sage-400">بسته‌بندی نفیس و ارسال به سراسر کشور</p>
          </div>

          <div className="flex flex-col items-center gap-2 p-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-parchment-100">ضمانت اصالت و سلامت</h4>
            <p className="text-xs text-sage-400">پشتیبانی ۲۴ ساعته و بازگشت آسان</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Story */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-honey-500 to-amber-600 flex items-center justify-center text-pine-950 font-bold shadow-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold font-serif text-parchment-50">کتابینو</span>
                <span className="text-xs text-honey-400 block -mt-1 tracking-widest uppercase">Ketabino Books</span>
              </div>
            </div>
            <p className="text-sm text-sage-300 leading-relaxed max-w-md text-justify">
              کتابینو خانه‌ای برای جویندگان کلمات ماندگار، رمان‌های جاودان و اندیشه‌های سترگ است. ما با عشق به کاغذ، بوی کتاب و جادوی داستان‌ها، بستری مدرن و زیبا برای کشف، خرید و خواندن کتاب‌های فاخر فراهم آورده‌ایم.
            </p>

            {/* Newsletter Subscription */}
            <div className="mt-3 bg-pine-900/60 p-4 rounded-2xl border border-pine-800/80 max-w-md">
              <div className="flex items-center gap-2 text-honey-400 text-xs font-semibold mb-2">
                <Sparkles className="w-4 h-4" />
                <span>حلقه کتاب‌خوانان کتابینو (دریافت ۱۰٪ کد تخفیف)</span>
              </div>
              {newsletterSubmitted ? (
                <div className="flex items-center gap-2 text-emerald-400 text-sm py-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>ایمیل شما با موفقیت ثبت شد! به جمع کتابینو خوش آمدید.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="ایمیل خود را وارد کنید..."
                    className="flex-1 bg-pine-950/80 border border-pine-700/60 rounded-xl px-3 py-2 text-xs text-parchment-100 placeholder:text-zinc-500 focus:outline-none focus:border-honey-500"
                  />
                  <button
                    type="submit"
                    className="bg-honey-500 hover:bg-honey-600 text-pine-950 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <span>عضویت</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-parchment-50 font-serif border-b border-pine-800 pb-2">
              بخش‌های اصلی
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-sage-300">
              <li>
                <Link href="/" className="hover:text-honey-400 transition-colors">
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-honey-400 transition-colors">
                  کاوش و ویترین کتاب‌ها
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-honey-400 transition-colors">
                  کتابخانه دیجیتال شخصی
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-honey-400 transition-colors">
                  نشان‌شده‌ها و برگزیده‌ها
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-honey-400 transition-colors">
                  پلن‌های اشتراک ویژه
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-parchment-50 font-serif border-b border-pine-800 pb-2">
              دسته‌بندی‌های محبوب
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-sage-300">
              <li>
                <Link href="/explore?category=fiction" className="hover:text-honey-400 transition-colors">
                  رمان و داستان‌های کلاسیک
                </Link>
              </li>
              <li>
                <Link href="/explore?category=psychology" className="hover:text-honey-400 transition-colors">
                  روانشناسی و رشد فردی
                </Link>
              </li>
              <li>
                <Link href="/explore?category=philosophy" className="hover:text-honey-400 transition-colors">
                  فلسفه، اگزیستانسیالیسم و جامعه
                </Link>
              </li>
              <li>
                <Link href="/explore?category=poetry" className="hover:text-honey-400 transition-colors">
                  شاهکارهای ادبیات فارسی
                </Link>
              </li>
              <li>
                <Link href="/explore?category=history" className="hover:text-honey-400 transition-colors">
                  تاریخ و روایت تمدن‌ها
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-parchment-50 font-serif border-b border-pine-800 pb-2">
              ارتباط و راهنما
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-sage-300">
              <li>
                <Link href="/about" className="hover:text-honey-400 transition-colors">
                  درباره فلسفه کتابینو
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-honey-400 transition-colors">
                  پیشخوان و پنل کاربری
                </Link>
              </li>
              <li>
                <span className="text-sage-400">پشتیبانی: support@ketabino.ir</span>
              </li>
              <li>
                <span className="text-sage-400">تلفن: ۰۲۱-۸۸۸۸۴۳۲۱</span>
              </li>
              <li>
                <span className="text-sage-400">تهران، میدان انقلاب، راسته کتابفروشان</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-pine-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sage-400">
          <p className="flex items-center gap-1.5">
            <span>© تمامی حقوق مادی و معنوی متعلق به وبسایت کتابینو (Ketabino) می‌باشد.</span>
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-parchment-200 transition-colors">
              حریم خصوصی
            </Link>
            <Link href="/about" className="hover:text-parchment-200 transition-colors">
              قوانین و مقررات
            </Link>
            <Link href="/about" className="hover:text-parchment-200 transition-colors">
              نقشه سایت
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
