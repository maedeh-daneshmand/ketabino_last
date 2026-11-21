"use client";

import { useState } from "react";
import { X, User, Phone, Mail, Lock, Eye, EyeOff, Sparkles, CheckCircle2, BookOpen, MapPin, Target } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { CATEGORIES } from "@/data/categories";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "login" | "register";
}

export default function AuthModal({ isOpen, onClose, defaultMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const { login, register } = useUser();

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regGoal, setRegGoal] = useState("12");
  const [selectedCats, setSelectedCats] = useState<string[]>(["fiction", "psychology"]);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Feedback
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!loginIdentifier.trim()) {
      setErrorMessage("لطفاً شماره موبایل یا ایمیل خود را وارد نمایید.");
      return;
    }

    const res = login(loginIdentifier.trim(), loginPassword);
    if (res.success) {
      setSuccessMessage("با موفقیت وارد شدید! به کتابینو خوش آمدید.");
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setErrorMessage(res.message || "اطلاعات ورود صحیح نمی‌باشد.");
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!regName.trim()) {
      setErrorMessage("لطفاً نام و نام خانوادگی خود را وارد کنید.");
      return;
    }
    if (!regPhone.trim() || regPhone.length < 10) {
      setErrorMessage("لطفاً شماره موبایل معتبر (مثلاً ۰۹۱۲۳۴۵۶۷۸۹) وارد کنید.");
      return;
    }
    if (!regEmail.trim() || !regEmail.includes("@")) {
      setErrorMessage("لطفاً یک آدرس ایمیل معتبر وارد کنید.");
      return;
    }
    if (regPassword.length < 6) {
      setErrorMessage("رمز عبور باید دست‌کم ۶ کاراکتر باشد.");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage("رمز عبور با تکرار آن یکسان نیست.");
      return;
    }
    if (!acceptTerms) {
      setErrorMessage("لطفاً شرایط و قوانین کتابینو را تأیید فرمایید.");
      return;
    }

    register({
      name: regName.trim(),
      phone: regPhone.trim(),
      email: regEmail.trim(),
      password: regPassword,
      address: regAddress.trim(),
      yearlyGoal: parseInt(regGoal, 10) || 12,
      favoriteCategories: selectedCats,
    });

    setSuccessMessage("ثبت‌نام شما با موفقیت انجام شد و وارد حساب شدید!");
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const toggleCategory = (id: string) => {
    setSelectedCats((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-pine-950/80 backdrop-blur-md transition-opacity" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-parchment-50 dark:bg-pine-950 rounded-3xl shadow-2xl border border-parchment-300 dark:border-pine-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-parchment-200 dark:border-pine-800 bg-parchment-100/90 dark:bg-pine-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-pine-900 flex items-center justify-center text-honey-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold font-serif text-pine-950 dark:text-parchment-100 block">
                کتابینو • حساب کاربری
              </span>
              <span className="text-[10px] text-zinc-500">پلتفرم کتاب و کلمات</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-parchment-200 dark:hover:bg-pine-800 text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switch Tabs */}
        <div className="grid grid-cols-2 p-1.5 bg-parchment-200/80 dark:bg-pine-900/40 border-b border-parchment-200 dark:border-pine-800 text-xs font-bold">
          <button
            onClick={() => {
              setMode("login");
              setErrorMessage("");
            }}
            className={`py-2.5 rounded-2xl transition-all ${
              mode === "login"
                ? "bg-white dark:bg-pine-800 text-pine-950 dark:text-parchment-50 shadow-sm"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400"
            }`}
          >
            ورود به حساب کاربری
          </button>
          <button
            onClick={() => {
              setMode("register");
              setErrorMessage("");
            }}
            className={`py-2.5 rounded-2xl transition-all ${
              mode === "register"
                ? "bg-white dark:bg-pine-800 text-pine-950 dark:text-parchment-50 shadow-sm"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400"
            }`}
          >
            ثبت‌نام کاربر جدید
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Error & Success Messages */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {mode === "login" ? (
            /* --- LOGIN FORM --- */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  شماره موبایل یا آدرس ایمیل:
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-400 absolute top-1/2 -translate-y-1/2 right-3" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="مثلاً: ۰۹۱۲۳۴۵۶۷۸۹ یا info@example.com"
                    className="w-full bg-white dark:bg-pine-900 border border-parchment-300 dark:border-pine-800 rounded-xl pr-9 pl-3 py-2.5 text-xs text-pine-950 dark:text-parchment-50 placeholder:text-zinc-400 focus:outline-none focus:border-honey-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    رمز عبور:
                  </label>
                  <button
                    type="button"
                    onClick={() => alert("لینک بازیابی رمز عبور به شماره یا ایمیل شما پیامک خواهد شد.")}
                    className="text-[11px] text-honey-700 dark:text-honey-400 hover:underline"
                  >
                    فراموشی رمز؟
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute top-1/2 -translate-y-1/2 right-3" />
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="رمز عبور خود را وارد کنید..."
                    className="w-full bg-white dark:bg-pine-900 border border-parchment-300 dark:border-pine-800 rounded-xl pr-9 pl-10 py-2.5 text-xs text-pine-950 dark:text-parchment-50 placeholder:text-zinc-400 focus:outline-none focus:border-honey-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute top-1/2 -translate-y-1/2 left-3 text-zinc-400 hover:text-zinc-600"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-600 dark:text-zinc-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-parchment-400 text-pine-800 focus:ring-honey-500 w-3.5 h-3.5"
                  />
                  <span>مرا به خاطر بسپار</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-pine-800 hover:bg-pine-900 text-white font-bold py-3 rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span>ورود به حساب کاربری</span>
              </button>

              <div className="text-center pt-3 border-t border-parchment-200 dark:border-pine-800 text-xs text-zinc-500">
                <span>هنوز ثبت‌نام نکرده‌اید؟ </span>
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="font-bold text-honey-700 dark:text-honey-400 hover:underline"
                >
                  ایجاد حساب کاربری جدید
                </button>
              </div>
            </form>
          ) : (
            /* --- REGISTER FORM --- */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
              {/* Full Name */}
              <div>
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  نام و نام خانوادگی: *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute top-1/2 -translate-y-1/2 right-3" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="مثلاً: علی رضایی"
                    className="w-full bg-white dark:bg-pine-900 border border-parchment-300 dark:border-pine-800 rounded-xl pr-9 pl-3 py-2 text-xs text-pine-950 dark:text-parchment-50 placeholder:text-zinc-400 focus:outline-none focus:border-honey-500"
                  />
                </div>
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    شماره تلفن همراه: *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-400 absolute top-1/2 -translate-y-1/2 right-3" />
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      className="w-full bg-white dark:bg-pine-900 border border-parchment-300 dark:border-pine-800 rounded-xl pr-9 pl-3 py-2 text-xs text-pine-950 dark:text-parchment-50 placeholder:text-zinc-400 focus:outline-none focus:border-honey-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    آدرس ایمیل: *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-400 absolute top-1/2 -translate-y-1/2 right-3" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-white dark:bg-pine-900 border border-parchment-300 dark:border-pine-800 rounded-xl pr-9 pl-3 py-2 text-xs text-pine-950 dark:text-parchment-50 placeholder:text-zinc-400 focus:outline-none focus:border-honey-500"
                    />
                  </div>
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    رمز عبور: *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-zinc-400 absolute top-1/2 -translate-y-1/2 right-3" />
                    <input
                      type={showRegPassword ? "text" : "password"}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="حداقل ۶ کاراکتر..."
                      className="w-full bg-white dark:bg-pine-900 border border-parchment-300 dark:border-pine-800 rounded-xl pr-9 pl-8 py-2 text-xs text-pine-950 dark:text-parchment-50 placeholder:text-zinc-400 focus:outline-none focus:border-honey-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute top-1/2 -translate-y-1/2 left-2.5 text-zinc-400"
                    >
                      {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    تکرار رمز عبور: *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-zinc-400 absolute top-1/2 -translate-y-1/2 right-3" />
                    <input
                      type={showRegPassword ? "text" : "password"}
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="تکرار دقیق رمز..."
                      className="w-full bg-white dark:bg-pine-900 border border-parchment-300 dark:border-pine-800 rounded-xl pr-9 pl-3 py-2 text-xs text-pine-950 dark:text-parchment-50 placeholder:text-zinc-400 focus:outline-none focus:border-honey-500"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  نشانی پستی (اختیاری - جهت ارسال کتاب‌های فیزیکی):
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-zinc-400 absolute top-3 right-3" />
                  <textarea
                    rows={2}
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                    placeholder="استان، شهر، خیابان، پلاک، کد پستی..."
                    className="w-full bg-white dark:bg-pine-900 border border-parchment-300 dark:border-pine-800 rounded-xl pr-9 pl-3 py-2 text-xs text-pine-950 dark:text-parchment-50 placeholder:text-zinc-400 focus:outline-none focus:border-honey-500"
                  />
                </div>
              </div>

              {/* Yearly Goal & Topics */}
              <div className="pt-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
                  موضوعات و حوزه‌های مورد علاقه شما:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.slice(0, 6).map((cat) => {
                    const active = selectedCats.includes(cat.id);
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                          active
                            ? "bg-pine-800 text-white"
                            : "bg-parchment-200 dark:bg-pine-900 text-zinc-600 dark:text-zinc-300"
                        }`}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-600 dark:text-zinc-400">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="rounded border-parchment-400 text-pine-800 focus:ring-honey-500 w-3.5 h-3.5"
                  />
                  <span>قوانین و حریم خصوصی کتابینو را مطالعه کرده و می‌پذیرم.</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-pine-800 hover:bg-pine-900 text-white font-bold py-3 rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Sparkles className="w-4 h-4 text-honey-400" />
                <span>ثبت‌نام و عضویت در کتابینو</span>
              </button>

              <div className="text-center pt-2 text-zinc-500">
                <span>قبلاً عضو شده‌اید؟ </span>
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-bold text-honey-700 dark:text-honey-400 hover:underline"
                >
                  ورود به حساب کاربری
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
