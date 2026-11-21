"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Flame,
  Quote,
  Library,
  Trophy,
  CheckCircle2,
  Clock,
  Heart,
  Crown,
  Settings,
  Sparkles,
  TrendingUp,
  BarChart3,
  PieChart,
  ArrowRight,
  Plus,
  Play,
  Bookmark,
  Share2,
  Calendar,
  Layers,
  Search,
  User,
  Phone,
  Mail,
  MapPin,
  Lock,
  LogOut,
  Target,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useLibrary } from "@/hooks/useLibrary";
import { useFavorites } from "@/hooks/useFavorites";
import { BOOKS } from "@/data/books";
import { INITIAL_ACHIEVEMENTS } from "@/data/achievements";
import { QUOTES } from "@/data/quotes";
import { CATEGORIES } from "@/data/categories";
import { toPersianDigits, formatPrice } from "@/lib/utils";
import AuthModal from "@/components/auth/AuthModal";

export default function DashboardPage() {
  const { user, updateProfile, logout, isLoggedIn } = useUser();
  const { library, currentlyReading, completed } = useLibrary();
  const { favorites } = useFavorites();

  const [activeTab, setActiveTab] = useState<"overview" | "books" | "profile" | "stats" | "achievements" | "quotes">("overview");
  const [profileSavedToast, setProfileSavedToast] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Profile Form States initialized with user info
  const [editName, setEditName] = useState(user.name);
  const [editPhone, setEditPhone] = useState(user.phone);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editBio, setEditBio] = useState(user.bio || "");
  const [editAddress, setEditAddress] = useState(user.address || "");
  const [editGoal, setEditGoal] = useState((user.yearlyGoal || 12).toString());
  const [newPassword, setNewPassword] = useState("");

  // Current main reading book
  const currentBookItem = currentlyReading[0] || library[0] || {
    bookId: "boofe-koor",
    book: BOOKS[0],
    currentPage: 48,
    totalPages: 144,
    progressPercent: 33,
  };

  // Weekly Reading Hours (Saturday to Friday)
  const weeklyHours = [
    { day: "شنبه", hours: 3.2, color: "bg-honey-400" },
    { day: "یکشنبه", hours: 4.8, color: "bg-terracotta-400" },
    { day: "دوشنبه", hours: 2.5, color: "bg-sage-400" },
    { day: "سه‌شنبه", hours: 6.0, color: "bg-pine-600" },
    { day: "چهارشنبه", hours: 4.0, color: "bg-sky-400" },
    { day: "پنجشنبه", hours: 5.5, color: "bg-emerald-400" },
    { day: "جمعه", hours: 8.6, color: "bg-amber-400" },
  ];

  // Top Genres Breakdown
  const topGenres = [
    { name: "رمان و ادبیات داستانی", percent: 45, color: "bg-terracotta-500" },
    { name: "روانشناسی و رشد فردی", percent: 25, color: "bg-sage-500" },
    { name: "فلسفه و اندیشه", percent: 18, color: "bg-pine-700" },
    { name: "تاریخ و تمدن", percent: 12, color: "bg-honey-500" },
  ];

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      email: editEmail,
      bio: editBio,
      address: editAddress,
      yearlyGoal: parseInt(editGoal, 10) || 12,
    });
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 3000);
  };

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Welcome Hero Banner (Matching پنل مدیریت.jpg & امکانات پنل و مدل خوش بودن.jpg) */}
      <div className="relative rounded-3xl overflow-hidden glass-card p-6 sm:p-10 border border-parchment-300 dark:border-pine-800 shadow-xl mb-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-honey-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-terracotta-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* User Avatar & Greeting */}
          <div className="flex items-center gap-5 text-right w-full md:w-auto">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-honey-400 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-pine-950 flex items-center justify-center text-white" title="کاربر آنلاین">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-pine-950 dark:text-parchment-50">
                  سلام، {user.name}! ☕
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-honey-500/20 text-honey-800 dark:text-honey-300 font-bold">
                  {user.membershipPlan === "monthly" ? "اشتراک طلایی" : user.membershipPlan === "yearly" ? "اشتراک الماس" : "کاربر پایه"}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md">
                «پناه بردن به جهان کلمات؛ پیشخوان شخصی و ردیابی پیوسته عادات مطالعه شما»
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setActiveTab("profile")}
                  className="text-xs text-honey-700 dark:text-honey-400 font-bold hover:underline flex items-center gap-1"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>مشاهده و ویرایش پروفایل</span>
                </button>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{user.phone}</span>
              </div>
            </div>
          </div>

          {/* 4 Top Metric Badges (Matching پنل مدیریت.jpg) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            {/* 1. Books Count */}
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-pine-900/60 border border-parchment-300 dark:border-pine-800 text-center shadow-sm">
              <div className="flex items-center justify-center text-pine-800 dark:text-parchment-100 mb-1">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-xl font-black font-serif text-pine-950 dark:text-parchment-50 block">
                {toPersianDigits(library.length + 8)}
              </span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">کتاب‌های من</span>
            </div>

            {/* 2. Reading Streak */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center shadow-sm">
              <div className="flex items-center justify-center text-amber-500 mb-1">
                <Flame className="w-4 h-4 fill-current animate-bounce" />
              </div>
              <span className="text-xl font-black font-serif text-amber-700 dark:text-amber-400 block">
                {toPersianDigits(user.readingStreakDays)} روز
              </span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">زنجیره مطالعه</span>
            </div>

            {/* 3. Quotes Count */}
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-pine-900/60 border border-parchment-300 dark:border-pine-800 text-center shadow-sm">
              <div className="flex items-center justify-center text-rose-500 mb-1">
                <Quote className="w-4 h-4" />
              </div>
              <span className="text-xl font-black font-serif text-pine-950 dark:text-parchment-50 block">
                {toPersianDigits(22)}
              </span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">نقل‌قول‌های ذخیره</span>
            </div>

            {/* 4. Shelves / Collections */}
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-pine-900/60 border border-parchment-300 dark:border-pine-800 text-center shadow-sm">
              <div className="flex items-center justify-center text-pine-800 dark:text-parchment-100 mb-1">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-xl font-black font-serif text-pine-950 dark:text-parchment-50 block">
                {toPersianDigits(4)}
              </span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">قفسه شخصی</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-parchment-200 dark:border-pine-800 text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === "overview"
              ? "bg-pine-800 text-white shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-parchment-200 dark:hover:bg-pine-900"
          }`}
        >
          پیشخوان و خلاصه
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === "profile"
              ? "bg-pine-800 text-white shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-parchment-200 dark:hover:bg-pine-900"
          }`}
        >
          مشخصات و پروفایل کاربری
        </button>

        <button
          onClick={() => setActiveTab("books")}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === "books"
              ? "bg-pine-800 text-white shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-parchment-200 dark:hover:bg-pine-900"
          }`}
        >
          کتاب‌های من ({toPersianDigits(library.length)})
        </button>

        <button
          onClick={() => setActiveTab("stats")}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === "stats"
              ? "bg-pine-800 text-white shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-parchment-200 dark:hover:bg-pine-900"
          }`}
        >
          آمار و ساعات مطالعه
        </button>

        <button
          onClick={() => setActiveTab("achievements")}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === "achievements"
              ? "bg-pine-800 text-white shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-parchment-200 dark:hover:bg-pine-900"
          }`}
        >
          نشان‌ها و دستاوردها
        </button>

        <button
          onClick={() => setActiveTab("quotes")}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === "quotes"
              ? "bg-pine-800 text-white shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-parchment-200 dark:hover:bg-pine-900"
          }`}
        >
          جملات و بریده‌های ذخیره
        </button>
      </div>

      {/* Tab 1: Overview (Bento Grid matching پنل مدیریت.jpg & امکانات پنل و مدل خوش بودن.jpg) */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Currently Reading Dark Glass Card (Cols 1-4) */}
          <div className="md:col-span-4 rounded-3xl bg-gradient-to-br from-[#2a241e] to-[#1c1814] text-parchment-100 p-6 shadow-xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 text-xs text-honey-400">
                <span className="font-bold flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>در حال مطالعه اکنون</span>
                </span>
                <span className="bg-honey-500/20 px-2 py-0.5 rounded text-[10px]">
                  {toPersianDigits(currentBookItem.progressPercent)}٪
                </span>
              </div>

              {/* Cover & Title */}
              <div className="flex gap-4 items-center mb-6">
                <img
                  src={currentBookItem.book.cover}
                  alt={currentBookItem.book.title}
                  className="w-20 h-28 rounded-lg object-cover shadow-book-3d flex-shrink-0"
                />
                <div>
                  <h3 className="text-base font-bold font-serif text-white line-clamp-1">
                    {currentBookItem.book.title}
                  </h3>
                  <span className="text-xs text-zinc-400 block mt-1">
                    {currentBookItem.book.author}
                  </span>
                  <span className="text-[11px] text-honey-400 mt-2 block">
                    صفحه {toPersianDigits(currentBookItem.currentPage)} از {toPersianDigits(currentBookItem.totalPages)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-honey-500 to-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${currentBookItem.progressPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-zinc-400">
                  <span>پیشرفت مطالعه</span>
                  <span>{toPersianDigits(currentBookItem.totalPages - currentBookItem.currentPage)} صفحه باقی‌مانده</span>
                </div>
              </div>
            </div>

            <Link
              href={`/reader/${currentBookItem.bookId}`}
              className="mt-6 w-full bg-honey-500 hover:bg-honey-600 text-pine-950 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>ادامه مطالعه از صفحه {toPersianDigits(currentBookItem.currentPage)}</span>
            </Link>
          </div>

          {/* Reading Goal Radial Progress (Cols 5-8) */}
          <div className="md:col-span-4 rounded-3xl glass-card p-6 border border-parchment-300 dark:border-pine-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-honey-500" />
                  <span>هدف‌گذاری مطالعه سال ۱۴۰۳</span>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-honey-500/15 text-honey-700 dark:text-honey-300 font-bold">
                  {toPersianDigits(1403)}
                </span>
              </div>

              {/* Radial Progress Display */}
              <div className="flex flex-col items-center justify-center my-4">
                <div className="relative w-36 h-36 rounded-full border-8 border-parchment-200 dark:border-pine-900 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-3xl font-black font-serif text-pine-950 dark:text-parchment-50">
                      {toPersianDigits(Math.round((user.completedThisYear / (user.yearlyGoal || 12)) * 100))}٪
                    </span>
                    <span className="block text-[10px] text-zinc-400 mt-0.5">تکمیل هدف سال</span>
                  </div>
                </div>
              </div>

              {/* Stats Breakdown */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs pt-2 border-t border-parchment-200 dark:border-pine-800">
                <div>
                  <span className="text-zinc-400 block">کتاب‌های خوانده‌شده</span>
                  <span className="font-bold text-pine-900 dark:text-parchment-100">
                    {toPersianDigits(user.completedThisYear)} از {toPersianDigits(user.yearlyGoal || 12)} کتاب
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 block">باقی‌مانده تا هدف</span>
                  <span className="font-bold text-pine-900 dark:text-parchment-100">
                    {toPersianDigits(Math.max(0, (user.yearlyGoal || 12) - user.completedThisYear))} کتاب
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab("profile")}
              className="mt-4 text-xs text-center text-honey-700 dark:text-honey-400 font-bold hover:underline"
            >
              تنظیم مجدد تعداد هدف سالانه
            </button>
          </div>

          {/* Daily Quote Card (Cols 9-12) */}
          <div className="md:col-span-4 rounded-3xl glass-card p-6 border border-parchment-300 dark:border-pine-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
                  <Quote className="w-4 h-4 text-terracotta-500" />
                  <span>بریده برگزیده امروز</span>
                </h3>
                <span className="text-[10px] text-zinc-400">امروز</span>
              </div>

              <blockquote className="text-sm font-serif font-bold text-pine-950 dark:text-parchment-100 leading-relaxed text-justify italic my-3">
                «تنها با چشم دل می‌توان خوب دید؛ آنچه اصل است از دیده پنهان است...»
              </blockquote>

              <div className="pt-3 border-t border-parchment-200 dark:border-pine-800 text-xs">
                <strong className="text-pine-900 dark:text-parchment-100 block">آنتوان دو سنت‌اگزوپری</strong>
                <span className="text-zinc-400">کتاب شازده کوچولو</span>
              </div>
            </div>

            <Link
              href="/reader/little-prince"
              className="mt-6 w-full py-2 rounded-xl text-xs font-bold border border-parchment-300 dark:border-pine-800 text-center hover:bg-parchment-200 dark:hover:bg-pine-900 transition-colors"
            >
              خواندن کتاب
            </Link>
          </div>

          {/* Weekly Hours Bar Chart (Cols 1-8) */}
          <div className="md:col-span-8 rounded-3xl glass-card p-6 border border-parchment-300 dark:border-pine-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold font-serif text-pine-950 dark:text-parchment-50 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-honey-500" />
                  <span>ساعات مطالعه این هفته (مجموع: {toPersianDigits(user.readingHoursThisWeek)} ساعت)</span>
                </h3>
                <span className="text-xs text-zinc-400">افزایش ۱۸٪ نسبت به هفته گذشته</span>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
                +۶.۲ ساعت
              </span>
            </div>

            {/* Bars */}
            <div className="flex items-end justify-between gap-2 h-44 pt-6 px-4">
              {weeklyHours.map((item) => {
                const heightPercent = Math.min(100, Math.round((item.hours / 9) * 100));
                return (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] font-bold text-zinc-400 group-hover:text-pine-900 transition-colors">
                      {toPersianDigits(item.hours)}h
                    </span>
                    <div
                      className={`w-full max-w-[36px] rounded-t-xl transition-all duration-500 group-hover:scale-105 shadow-sm ${item.color}`}
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-[11px] font-semibold text-zinc-500 mt-1">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Genres Donut Distribution (Cols 9-12) */}
          <div className="md:col-span-4 rounded-3xl glass-card p-6 border border-parchment-300 dark:border-pine-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold font-serif text-pine-950 dark:text-parchment-50 flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-terracotta-500" />
                  <span>ژانرهای مورد علاقه</span>
                </h3>
              </div>

              <div className="space-y-3 mt-4">
                {topGenres.map((genre) => (
                  <div key={genre.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300">{genre.name}</span>
                      <span className="font-bold text-pine-900 dark:text-honey-400">{toPersianDigits(genre.percent)}٪</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-parchment-200 dark:bg-pine-900 overflow-hidden">
                      <div className={`h-full rounded-full ${genre.color}`} style={{ width: `${genre.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/explore"
              className="mt-6 text-xs text-center text-honey-700 dark:text-honey-400 font-bold hover:underline"
            >
              کشف کتاب‌های بیشتر متناسب با سلیقه شما
            </Link>
          </div>
        </div>
      )}

      {/* Tab 2: Profile Management Form */}
      {activeTab === "profile" && (
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-parchment-300 dark:border-pine-800 shadow-xl max-w-3xl mx-auto">
          <div className="flex items-center justify-between pb-4 border-b border-parchment-200 dark:border-pine-800 mb-6">
            <div>
              <h2 className="text-lg font-bold font-serif text-pine-950 dark:text-parchment-50">
                مشخصات حساب کاربری و اطلاعات فردی
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                اطلاعات ثبت‌نامی و نشانی شما برای تحویل کتاب‌های فیزیکی و فاکتور
              </p>
            </div>
            <button
              onClick={() => setAuthModalOpen(true)}
              className="bg-honey-500/15 text-honey-800 dark:text-honey-300 hover:bg-honey-500/25 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors"
            >
              ورود با حساب کاربری دیگر
            </button>
          </div>

          {profileSavedToast && (
            <div className="mb-6 p-3.5 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center gap-2 border border-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>اطلاعات پروفایل شما با موفقیت ذخیره گردید.</span>
            </div>
          )}

          <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  نام و نام خانوادگی:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute top-1/2 -translate-y-1/2 right-3" />
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-white dark:bg-pine-900 border border-parchment-300 dark:border-pine-800 rounded-xl pr-9 pl-3 py-2.5 text-xs text-pine-950 dark:text-parchment-50 focus:outline-none focus:border-honey-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  شماره تلفن همراه:
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-400 absolute top-1/2 -translate-y-1/2 right-3" />
                  <input
                    type="tel"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-white dark:bg-pine-900 border border-parchment-300 dark:border-pine-800 rounded-xl pr-9 pl-3 py-2.5 text-xs text-pine-950 dark:text-parchment-50 focus:outline-none focus:border-honey-500"
                  />
                </div>
              </div>
            </div>

            {/* Email & Yearly Goal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  آدرس ایمیل:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute top-1/2 -translate-y-1/2 right-3" />
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-white dark:bg-pine-900 border border-parchment-300 dark:border-pine-800 rounded-xl pr-9 pl-3 py-2.5 text-xs text-pine-950 dark:text-parchment-50 focus:outline-none focus:border-honey-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  هدف‌گذاری مطالعه سالانه (تعداد کتاب):
                </label>
                <div className="relative">
                  <Target className="w-4 h-4 text-zinc-400 absolute top-1/2 -translate-y-1/2 right-3" />
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={editGoal}
                    onChange={(e) => setEditGoal(e.target.value)}
                    className="w-full bg-white dark:bg-pine-900 border border-parchment-300 dark:border-pine-800 rounded-xl pr-9 pl-3 py-2.5 text-xs text-pine-950 dark:text-parchment-50 focus:outline-none focus:border-honey-500"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                نشانی دقیق پستی (جهت دریافت بسته‌ها و کتاب‌های فیزیکی):
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-zinc-400 absolute top-3 right-3" />
                <textarea
                  rows={2}
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  placeholder="استان، شهر، خیابان، پلاک، کد پستی..."
                  className="w-full bg-white dark:bg-pine-900 border border-parchment-300 dark:border-pine-800 rounded-xl pr-9 pl-3 py-2 text-xs text-pine-950 dark:text-parchment-50 focus:outline-none focus:border-honey-500"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                معرفی کوتاه / بیوگرافی:
              </label>
              <textarea
                rows={2}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="چند خط درباره کتاب‌های محبوب یا ذائقه مطالعاتی شما..."
                className="w-full bg-white dark:bg-pine-900 border border-parchment-300 dark:border-pine-800 rounded-xl p-3 text-xs text-pine-950 dark:text-parchment-50 focus:outline-none focus:border-honey-500"
              />
            </div>

            {/* Save Button */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="submit"
                className="bg-pine-800 hover:bg-pine-900 text-white font-bold py-3 px-8 rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-honey-400" />
                <span>ذخیره تغییرات مشخصات</span>
              </button>

              <button
                type="button"
                onClick={() => logout()}
                className="text-xs text-red-600 hover:underline flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>خروج از این حساب</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: My Books in Library */}
      {activeTab === "books" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">
              تعداد کتاب‌های فعال شما: <strong>{toPersianDigits(library.length)}</strong> جلد
            </span>
            <Link href="/explore" className="bg-pine-800 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-pine-900">
              + کاوش کتاب‌های بیشتر
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {library.map((item) => (
              <div
                key={item.bookId}
                className="glass-card rounded-2xl p-4 border border-parchment-300 dark:border-pine-800 flex gap-4 hover:shadow-lg transition-all"
              >
                <img
                  src={item.book.cover}
                  alt={item.book.title}
                  className="w-20 h-28 rounded-lg object-cover shadow-book-3d flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold font-serif text-pine-950 dark:text-parchment-100 line-clamp-1">
                      {item.book.title}
                    </h4>
                    <span className="text-[11px] text-zinc-400 block mt-0.5">{item.book.author}</span>
                    <span className="text-[10px] text-honey-600 dark:text-honey-400 font-semibold mt-1 block">
                      پیشرفت: {toPersianDigits(item.progressPercent)}٪
                    </span>
                  </div>

                  <Link
                    href={`/reader/${item.bookId}`}
                    className="mt-3 bg-pine-800 hover:bg-pine-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg text-center transition-all flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>ادامه مطالعه</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Detailed Stats */}
      {activeTab === "stats" && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-parchment-300 dark:border-pine-800 space-y-6">
          <h3 className="text-lg font-bold font-serif text-pine-950 dark:text-parchment-50">
            گزارش و تحلیل ماهانه مطالعه
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            کتابینو به صورت هوشمند زمان مطالعه، صفحات ورق‌خورده و میانگین سرعت خوانش شما را بررسی کرده و پیشنهادهای متناسب با علایق شما ارائه می‌دهد.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-parchment-200/80 dark:bg-pine-900/60 text-center">
              <span className="text-2xl font-bold font-serif text-pine-900 dark:text-honey-400">
                {toPersianDigits(1420)}
              </span>
              <span className="text-xs text-zinc-500 block mt-1">تعداد صفحات خوانده شده این ماه</span>
            </div>
            <div className="p-4 rounded-2xl bg-parchment-200/80 dark:bg-pine-900/60 text-center">
              <span className="text-2xl font-bold font-serif text-pine-900 dark:text-honey-400">
                {toPersianDigits(42)} دقیقه
              </span>
              <span className="text-xs text-zinc-500 block mt-1">میانگین مطالعه روزانه</span>
            </div>
            <div className="p-4 rounded-2xl bg-parchment-200/80 dark:bg-pine-900/60 text-center">
              <span className="text-2xl font-bold font-serif text-pine-900 dark:text-honey-400">
                {toPersianDigits(7)} روز
              </span>
              <span className="text-xs text-zinc-500 block mt-1">طولانی‌ترین زنجیره مطالعه متوالی</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: 3D Achievements */}
      {activeTab === "achievements" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-serif text-pine-950 dark:text-parchment-50">
              مدال‌ها و دستاوردهای سه‌بعدی مطالعه
            </h3>
            <span className="text-xs text-honey-600 font-bold">۲ از ۶ مدال باز شده</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INITIAL_ACHIEVEMENTS.map((ach) => (
              <div
                key={ach.id}
                className={`glass-card rounded-3xl p-6 border transition-all flex items-center gap-4 ${
                  ach.unlocked
                    ? "border-honey-500/50 shadow-md"
                    : "border-parchment-300/60 dark:border-pine-800 opacity-70"
                }`}
              >
                {/* 3D Orb Badge */}
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-tr ${ach.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                  style={{
                    boxShadow: ach.unlocked ? "0 8px 20px rgba(212, 163, 89, 0.4)" : "none",
                  }}
                >
                  <Trophy className="w-7 h-7" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold font-serif text-pine-950 dark:text-parchment-100">
                      {ach.title}
                    </h4>
                    {ach.unlocked && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold px-1.5 py-0.5 rounded">
                        تکمیل شد
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    {ach.description}
                  </p>
                  <div className="w-full h-1.5 rounded-full bg-parchment-200 dark:bg-pine-900 mt-3 overflow-hidden">
                    <div
                      className="h-full bg-honey-500 rounded-full"
                      style={{ width: `${Math.min(100, (ach.progress / ach.maxProgress) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Saved Quotes */}
      {activeTab === "quotes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QUOTES.map((q) => (
            <div
              key={q.id}
              className="glass-card rounded-2xl p-5 border border-parchment-300 dark:border-pine-800 flex flex-col justify-between"
            >
              <blockquote className="text-sm font-serif font-bold text-pine-950 dark:text-parchment-100 leading-relaxed italic mb-4">
                «{q.text}»
              </blockquote>
              <div className="flex items-center justify-between text-xs pt-3 border-t border-parchment-200 dark:border-pine-800">
                <span className="font-bold text-pine-900 dark:text-honey-400">{q.author}</span>
                <span className="text-zinc-400">{q.bookTitle}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Auth Modal for Switching Account */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode="login"
      />
    </div>
  );
}
