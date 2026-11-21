"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import NextLink from "next/link";
import {
  BookOpen,
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  Bookmark,
  Crown,
  LogOut,
  ChevronDown,
  Layers,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useUser } from "@/hooks/useUser";
import { toPersianDigits } from "@/lib/utils";
import AuthModal from "@/components/auth/AuthModal";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { count: cartCount } = useCart();
  const { count: favCount } = useFavorites();
  const { user, isLoggedIn, logout } = useUser();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">("login");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync theme
  useEffect(() => {
    const stored = localStorage.getItem("ketabino_theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("ketabino_theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("ketabino_theme", "dark");
      setIsDarkMode(true);
    }
  };

  const navLinks = [
    { label: "خانه", href: "/" },
    { label: "کاوش کتاب‌ها", href: "/explore" },
    { label: "کتابخانه من", href: "/library" },
    { label: "اشتراک و عضویت", href: "/membership", badge: "ویژه" },
    { label: "درباره کتابینو", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      {showBanner && (
        <div className="bg-pine-900 text-parchment-100 text-xs py-2 px-4 border-b border-pine-800/60 transition-colors">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 mx-auto text-center font-medium">
              <Sparkles className="w-3.5 h-3.5 text-honey-400 animate-pulse" />
              <span>جشنواره پاییزی کتابینو؛ ارسال رایگان سفارش‌ها و ۲۰٪ تخفیف اشتراک با کد</span>
              <span className="bg-honey-500/20 text-honey-300 px-2 py-0.5 rounded font-mono font-bold">
                KETABINO
              </span>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="text-parchment-300 hover:text-white p-0.5 transition-colors"
              aria-label="بستن اعلان"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "glass-card shadow-md py-3 border-b border-parchment-300/40 dark:border-pine-900/40"
            : "bg-parchment-100/95 dark:bg-pine-950/90 backdrop-blur-sm py-4 border-b border-parchment-200 dark:border-pine-900/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Right Section: Mobile toggle & Brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-pine-900 dark:text-parchment-200 hover:bg-parchment-200 dark:hover:bg-pine-900 transition-colors"
              aria-label="منوی موبایل"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <NextLink href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pine-800 to-pine-950 flex items-center justify-center text-honey-400 shadow-sm border border-pine-700/50 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-pine-950 dark:text-parchment-50 font-serif">
                  کتابینو
                </span>
                <span className="text-[10px] text-sage-600 dark:text-sage-400 font-medium tracking-widest -mt-1 uppercase">
                  Ketabino
                </span>
              </div>
            </NextLink>
          </div>

          {/* Center Section: Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <NextLink
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    active
                      ? "text-pine-900 dark:text-parchment-50 bg-pine-100/80 dark:bg-pine-900/60 font-semibold"
                      : "text-zinc-600 dark:text-parchment-300 hover:text-pine-900 dark:hover:text-white hover:bg-parchment-200/60 dark:hover:bg-pine-900/40"
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="mr-1.5 inline-flex items-center px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-honey-500/20 text-honey-700 dark:text-honey-300">
                      {link.badge}
                    </span>
                  )}
                  {active && (
                    <span className="absolute bottom-1 right-1/2 translate-x-1/2 w-1.5 h-1.5 rounded-full bg-terracotta-500" />
                  )}
                </NextLink>
              );
            })}
          </div>

          {/* Left Section: Action Icons & User Auth */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Link */}
            <NextLink
              href="/search"
              className="p-2 rounded-xl text-zinc-600 dark:text-parchment-300 hover:text-pine-900 dark:hover:text-white hover:bg-parchment-200 dark:hover:bg-pine-900/60 transition-colors"
              title="جستجوی کتاب‌ها"
            >
              <Search className="w-5 h-5" />
            </NextLink>

            {/* Favorites Icon */}
            <NextLink
              href="/favorites"
              className="relative p-2 rounded-xl text-zinc-600 dark:text-parchment-300 hover:text-terracotta-600 dark:hover:text-terracotta-400 hover:bg-parchment-200 dark:hover:bg-pine-900/60 transition-colors"
              title="کتاب‌های مورد علاقه"
            >
              <Heart className="w-5 h-5" />
              {favCount > 0 && (
                <span className="absolute top-1 -right-0.5 min-w-[18px] h-[18px] px-1 text-[11px] font-bold rounded-full bg-terracotta-500 text-white flex items-center justify-center animate-scaleIn">
                  {toPersianDigits(favCount)}
                </span>
              )}
            </NextLink>

            {/* Cart Icon */}
            <NextLink
              href="/cart"
              className="relative p-2 rounded-xl text-zinc-600 dark:text-parchment-300 hover:text-pine-900 dark:hover:text-white hover:bg-parchment-200 dark:hover:bg-pine-900/60 transition-colors"
              title="سبد خرید"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 -right-0.5 min-w-[18px] h-[18px] px-1 text-[11px] font-bold rounded-full bg-pine-800 text-honey-300 flex items-center justify-center animate-scaleIn">
                  {toPersianDigits(cartCount)}
                </span>
              )}
            </NextLink>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-zinc-600 dark:text-parchment-300 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-parchment-200 dark:hover:bg-pine-900/60 transition-colors"
              title={isDarkMode ? "حالت روز" : "حالت شب"}
              aria-label="تغییر تم"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Account / Auth Section */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pr-1.5 pl-2.5 py-1.5 rounded-full border border-parchment-300 dark:border-pine-800 hover:border-pine-700 bg-white/70 dark:bg-pine-900/50 shadow-sm transition-all group"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-honey-400 group-hover:scale-105 transition-transform"
                  />
                  <span className="hidden sm:inline text-xs font-semibold text-pine-900 dark:text-parchment-100 max-w-[90px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-700 transition-transform" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute left-0 mt-2 w-48 rounded-2xl glass-card border border-parchment-300 dark:border-pine-800 shadow-2xl py-2 z-50 text-xs text-zinc-700 dark:text-zinc-200"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3.5 py-2 border-b border-parchment-200 dark:border-pine-800">
                      <strong className="block text-pine-950 dark:text-parchment-50 font-bold truncate">
                        {user.name}
                      </strong>
                      <span className="text-[10px] text-zinc-400 block truncate">{user.email || user.phone}</span>
                    </div>

                    <NextLink
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2.5 hover:bg-parchment-200 dark:hover:bg-pine-900 transition-colors"
                    >
                      <User className="w-4 h-4 text-honey-600" />
                      <span>پیشخوان و پروفایل من</span>
                    </NextLink>

                    <NextLink
                      href="/library"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2.5 hover:bg-parchment-200 dark:hover:bg-pine-900 transition-colors"
                    >
                      <Bookmark className="w-4 h-4 text-pine-700 dark:text-pine-400" />
                      <span>کتاب‌های من</span>
                    </NextLink>

                    <NextLink
                      href="/favorites"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2.5 hover:bg-parchment-200 dark:hover:bg-pine-900 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-terracotta-500" />
                      <span>علاقه‌مندی‌ها</span>
                    </NextLink>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3.5 py-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors border-t border-parchment-200 dark:border-pine-800"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>خروج از حساب</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthModalMode("login");
                  setAuthModalOpen(true);
                }}
                className="bg-pine-800 hover:bg-pine-900 text-parchment-50 font-bold px-3.5 sm:px-4 py-2 rounded-2xl text-xs transition-all flex items-center gap-1.5 shadow-sm"
              >
                <User className="w-3.5 h-3.5 text-honey-400" />
                <span>ورود / ثبت‌نام</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-parchment-50 dark:bg-pine-950 p-6 shadow-2xl flex flex-col justify-between border-l border-parchment-300 dark:border-pine-800 z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-parchment-200 dark:border-pine-800">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-pine-900 flex items-center justify-center text-honey-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-lg text-pine-900 dark:text-parchment-50 font-serif">کتابینو</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:bg-parchment-200 dark:hover:bg-pine-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Greeting in Mobile */}
              <div className="mt-4 p-3 rounded-2xl bg-parchment-200/70 dark:bg-pine-900/60 flex items-center justify-between">
                {isLoggedIn ? (
                  <div className="flex items-center gap-2.5">
                    <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <span className="text-xs font-bold text-pine-950 dark:text-parchment-100 block">{user.name}</span>
                      <span className="text-[10px] text-honey-700 dark:text-honey-400 font-semibold">{user.phone}</span>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthModalMode("login");
                      setAuthModalOpen(true);
                    }}
                    className="w-full bg-pine-800 text-white py-2 rounded-xl text-xs font-bold"
                  >
                    ورود به حساب یا ثبت‌نام
                  </button>
                )}
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-1 mt-4">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <NextLink
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? "bg-pine-800 text-parchment-50 font-bold"
                          : "text-zinc-700 dark:text-parchment-200 hover:bg-parchment-200 dark:hover:bg-pine-900/60"
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-honey-500 text-pine-950 font-bold">
                          {link.badge}
                        </span>
                      )}
                    </NextLink>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-parchment-200 dark:border-pine-800 flex flex-col gap-2">
                <NextLink
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-honey-500/10 text-honey-800 dark:text-honey-300 font-semibold text-sm hover:bg-honey-500/20"
                >
                  <User className="w-4 h-4" />
                  <span>پیشخوان و آمار مطالعه</span>
                </NextLink>
                <NextLink
                  href="/library"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-zinc-700 dark:text-parchment-200 text-sm hover:bg-parchment-200 dark:hover:bg-pine-900/60"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>کتاب‌های من</span>
                </NextLink>

                {isLoggedIn && (
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-red-600 text-sm hover:bg-red-50 dark:hover:bg-red-950/40 text-right mt-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>خروج از حساب کاربری</span>
                  </button>
                )}
              </div>
            </div>

            {/* Bottom info */}
            <div className="pt-6 border-t border-parchment-200 dark:border-pine-800 text-center">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                کتابینو؛ خانه‌ای برای دوستداران داستان و اندیشه
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authModalMode}
      />
    </header>
  );
}
