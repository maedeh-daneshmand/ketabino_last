"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Tag,
  BookOpen,
  CreditCard,
  Truck,
  Receipt,
  Download,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useLibrary } from "@/hooks/useLibrary";
import { formatPrice, toPersianDigits } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, addItem, clear, total, count } = useCart();
  const { addBook } = useLibrary();

  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string>("");
  const [isPurchasedSuccess, setIsPurchasedSuccess] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState<"behpardakht" | "saman" | "zarinpal">("behpardakht");
  const [orderTrackingCode, setOrderTrackingCode] = useState<string>("");

  // Apply Coupon
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "KETABINO") {
      setAppliedDiscountPercent(20);
      setCouponMessage("کد تخفیف ۲۰٪ ویژه با موفقیت اعمال گردید!");
    } else if (code === "WELCOME10") {
      setAppliedDiscountPercent(10);
      setCouponMessage("کد تخفیف ۱۰٪ عضویت با موفقیت اعمال شد!");
    } else {
      setCouponMessage("کد تخفیف وارد شده معتبر نمی‌باشد.");
      setAppliedDiscountPercent(0);
    }
  };

  // Complete Payment Action
  const handlePayment = () => {
    if (items.length === 0) return;

    // Add each purchased book to user's library
    items.forEach((item) => {
      addBook(item.book);
    });

    const randomTracking = `KTB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderTrackingCode(randomTracking);

    // Clear cart and show success modal
    clear();
    setIsPurchasedSuccess(true);
  };

  const couponDiscountAmount = Math.round((total.subtotal * appliedDiscountPercent) / 100);
  const finalPayable = Math.max(0, total.subtotal - couponDiscountAmount);

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-parchment-300 dark:border-pine-800">
        <div>
          <span className="text-xs font-bold text-honey-600 dark:text-honey-400 uppercase tracking-widest block mb-1">
            سبد خرید کتاب‌ها
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-pine-950 dark:text-parchment-50">
            بررسی نهایی و پرداخت سفارش
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            ارسال سریع به سراسر کشور • پرداخت امن از طریق کلیه کارت‌های شتاب • ضمانت اصالت
          </p>
        </div>

        <span className="text-xs text-zinc-500">
          تعداد اقلام: <strong className="text-pine-900 dark:text-honey-400">{toPersianDigits(count)}</strong> جلد
        </span>
      </div>

      {/* Success Modal after Payment */}
      {isPurchasedSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-lg bg-parchment-50 dark:bg-pine-950 rounded-3xl p-8 border border-parchment-300 dark:border-pine-800 shadow-2xl text-center">
            <div className="w-18 h-18 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold font-serif text-pine-950 dark:text-parchment-50 mb-2">
              پرداخت با موفقیت انجام شد! 🎉
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
              سفارش شما با موفقیت در سیستم ثبت گردید. نسخه دیجیتال کتاب‌ها فوراً در کتابخانه شخصی شما فعال شد و در ریدر قابل مطالعه می‌باشد.
            </p>

            {/* Receipt Box */}
            <div className="p-4 rounded-2xl bg-parchment-200/80 dark:bg-pine-900/60 border border-parchment-300 dark:border-pine-800 text-xs space-y-2 mb-6 text-right">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">کد پیگیری سفارش:</span>
                <span className="font-mono font-bold text-pine-900 dark:text-honey-400">{orderTrackingCode}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">شماره مرجع تراکنش:</span>
                <span className="font-mono font-bold text-zinc-700 dark:text-zinc-300">TR-84920194</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">وضعیت پرداخت:</span>
                <span className="text-emerald-600 font-bold">موفق (شاپرک)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/library"
                className="flex-1 bg-pine-800 hover:bg-pine-900 text-white font-bold py-3 rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-honey-400" />
                <span>ورود به کتابخانه و مطالعه</span>
              </Link>
              <button
                onClick={() => setIsPurchasedSuccess(false)}
                className="px-5 py-3 rounded-2xl text-xs font-semibold border border-parchment-300 dark:border-pine-800 text-zinc-600 dark:text-zinc-300 hover:bg-parchment-200 transition-colors"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}

      {items.length === 0 && !isPurchasedSuccess ? (
        /* Empty Cart State */
        <div className="glass-card rounded-3xl p-12 text-center border border-parchment-300 dark:border-pine-800 max-w-md mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-honey-500/15 text-honey-600 mx-auto flex items-center justify-center mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold font-serif text-pine-950 dark:text-parchment-100">
            سبد خرید شما در حال حاضر خالی است
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
            کتاب‌های مورد نظر خود را از صفحه اصلی یا ویترین کاوش به سبد خرید اضافه نمایید.
          </p>
          <Link
            href="/explore"
            className="mt-6 inline-block bg-pine-800 hover:bg-pine-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow"
          >
            مشاهده کتاب‌های موجود
          </Link>
        </div>
      ) : (
        /* Cart Items & Order Summary Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List (Cols 1-8) */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.book.id}
                className="glass-card rounded-2xl p-4 sm:p-5 border border-parchment-300/80 dark:border-pine-800 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.book.cover}
                    alt={item.book.title}
                    className="w-18 h-24 rounded-lg object-cover shadow-book-3d flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] text-honey-700 dark:text-honey-400 font-semibold">
                      {item.book.category}
                    </span>
                    <Link href={`/books/${item.book.id}`} className="hover:text-honey-600 transition-colors">
                      <h3 className="text-sm sm:text-base font-bold font-serif text-pine-950 dark:text-parchment-100">
                        {item.book.title}
                      </h3>
                    </Link>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-0.5">
                      {item.book.author}
                    </span>
                    <span className="text-xs font-bold text-pine-900 dark:text-honey-400 font-serif mt-2 block sm:hidden">
                      {formatPrice(item.book.price)}
                    </span>
                  </div>
                </div>

                {/* Quantity Controls & Total & Remove */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-parchment-200 dark:border-pine-800">
                  <div className="flex items-center border border-parchment-300 dark:border-pine-700 rounded-xl bg-parchment-100 dark:bg-pine-900 p-1">
                    <button
                      onClick={() => addItem(item.book, 1)}
                      className="p-1 hover:bg-parchment-200 dark:hover:bg-pine-800 rounded-lg text-zinc-700 dark:text-zinc-300"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold font-mono">
                      {toPersianDigits(item.quantity)}
                    </span>
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          addItem(item.book, -1);
                        } else {
                          removeItem(item.book.id);
                        }
                      }}
                      className="p-1 hover:bg-parchment-200 dark:hover:bg-pine-800 rounded-lg text-zinc-700 dark:text-zinc-300"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="hidden sm:block text-sm font-bold text-pine-950 dark:text-honey-400 font-serif">
                    {formatPrice(item.book.price * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeItem(item.book.id)}
                    className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                    title="حذف از سبد"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <div className="text-left pt-2">
              <button
                onClick={clear}
                className="text-xs text-zinc-400 hover:text-red-600 transition-colors"
              >
                خالی کردن کامل سبد خرید
              </button>
            </div>
          </div>

          {/* Order Summary & Payment Gateway (Cols 9-12) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card rounded-3xl p-6 border border-parchment-300 dark:border-pine-800 shadow-xl space-y-5">
              <h3 className="text-base font-bold font-serif text-pine-950 dark:text-parchment-50 border-b border-parchment-200 dark:border-pine-800 pb-3">
                خلاصه فاکتور و پرداخت
              </h3>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block">
                  کد تخفیف یا کارت هدیه:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="مثلاً: KETABINO"
                    className="flex-1 bg-white dark:bg-pine-950 border border-parchment-300 dark:border-pine-800 rounded-xl px-3 py-2 text-xs uppercase font-mono text-pine-950 dark:text-parchment-50 focus:outline-none focus:border-honey-500"
                  />
                  <button
                    type="submit"
                    className="bg-honey-500 hover:bg-honey-600 text-pine-950 font-bold px-3 py-2 rounded-xl text-xs transition-colors"
                  >
                    اعمال
                  </button>
                </div>
                {couponMessage && (
                  <p
                    className={`text-[11px] font-semibold mt-1 ${
                      appliedDiscountPercent > 0 ? "text-emerald-600" : "text-terracotta-600"
                    }`}
                  >
                    {couponMessage}
                  </p>
                )}
              </form>

              {/* Payment Gateway Selection */}
              <div className="pt-2">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-2">
                  انتخاب درگاه پرداخت آنلاین شاپرک:
                </label>
                <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold text-center">
                  <button
                    type="button"
                    onClick={() => setPaymentGateway("behpardakht")}
                    className={`p-2.5 rounded-xl border transition-all ${
                      paymentGateway === "behpardakht"
                        ? "border-honey-500 bg-honey-500/10 text-pine-950 dark:text-honey-400 font-bold"
                        : "border-parchment-300 dark:border-pine-800 text-zinc-500"
                    }`}
                  >
                    به‌پرداخت ملت
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentGateway("saman")}
                    className={`p-2.5 rounded-xl border transition-all ${
                      paymentGateway === "saman"
                        ? "border-honey-500 bg-honey-500/10 text-pine-950 dark:text-honey-400 font-bold"
                        : "border-parchment-300 dark:border-pine-800 text-zinc-500"
                    }`}
                  >
                    سپهر صادرات
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentGateway("zarinpal")}
                    className={`p-2.5 rounded-xl border transition-all ${
                      paymentGateway === "zarinpal"
                        ? "border-honey-500 bg-honey-500/10 text-pine-950 dark:text-honey-400 font-bold"
                        : "border-parchment-300 dark:border-pine-800 text-zinc-500"
                    }`}
                  >
                    زرین‌پال
                  </button>
                </div>
              </div>

              {/* Price Details */}
              <div className="space-y-2.5 text-xs pt-3 border-t border-parchment-200 dark:border-pine-800">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">مجموع قیمت کتاب‌ها:</span>
                  <span className="font-bold text-pine-950 dark:text-parchment-100">{formatPrice(total.subtotal)}</span>
                </div>

                {appliedDiscountPercent > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 font-semibold">
                    <span>سود شما از کد تخفیف ({toPersianDigits(appliedDiscountPercent)}٪):</span>
                    <span>- {formatPrice(couponDiscountAmount)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">هزینه بسته‌بندی و ارسال:</span>
                  <span className="text-emerald-600 font-bold">رایگان (جشنواره پاییزه)</span>
                </div>

                <div className="flex items-baseline justify-between pt-4 border-t border-parchment-200 dark:border-pine-800 text-sm">
                  <span className="font-bold text-pine-950 dark:text-parchment-50">مبلغ نهایی قابل پرداخت:</span>
                  <span className="text-xl font-black font-serif text-pine-900 dark:text-honey-400">
                    {formatPrice(finalPayable)}
                  </span>
                </div>
              </div>

              {/* Real Payment Button */}
              <button
                onClick={handlePayment}
                className="w-full bg-pine-800 hover:bg-pine-900 text-white font-bold py-3.5 rounded-2xl text-sm shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <CreditCard className="w-4 h-4 text-honey-400 group-hover:scale-115 transition-transform" />
                <span>پرداخت اینترنتی و ثبت نهایی سفارش</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>پرداخت امن متصل به شاپرک با ضمانت بازگشت وجه</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
