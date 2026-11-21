"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingBag,
  BookOpen,
  CheckCircle2,
  Share2,
  Calendar,
  Layers,
  FileText,
  Bookmark,
  Sparkles,
  ArrowRight,
  Send,
  User,
} from "lucide-react";
import { BOOKS } from "@/data/books";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useLibrary } from "@/hooks/useLibrary";
import { ReviewsStorage } from "@/lib/storage";
import { Review, Book } from "@/types";
import { formatPrice, toPersianDigits } from "@/lib/utils";
import BookCard from "@/components/books/BookCard";

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params?.id as string;

  const book = BOOKS.find((b) => b.id === bookId);

  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addBook, isOwned } = useLibrary();

  const [activeTab, setActiveTab] = useState<"about" | "toc" | "author" | "reviews">("about");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showPurchaseToast, setShowPurchaseToast] = useState(false);
  const [reviewSubmittedToast, setReviewSubmittedToast] = useState(false);

  useEffect(() => {
    if (bookId) {
      setReviews(ReviewsStorage.get(bookId));
    }
  }, [bookId]);

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold font-serif text-pine-950 dark:text-parchment-100">
          کتاب مورد نظر یافت نشد!
        </h2>
        <p className="text-sm text-zinc-500 mt-2">ممکن است نشانی کتاب تغییر کرده باشد.</p>
        <Link
          href="/explore"
          className="mt-6 inline-block bg-pine-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs"
        >
          بازگشت به ویترین کتاب‌ها
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(book.id);
  const owned = isOwned(book.id);

  // Fast demo buy
  const handleFastBuy = () => {
    addBook(book);
    setShowPurchaseToast(true);
    setTimeout(() => {
      setShowPurchaseToast(false);
    }, 3500);
  };

  // Submit new review
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const newRev = ReviewsStorage.addReview({
      bookId: book.id,
      userName: newReviewAuthor.trim() || "کاربر کتابینو",
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
      rating: newReviewRating,
      comment: newReviewText.trim(),
    });

    setReviews([newRev, ...reviews]);
    setNewReviewText("");
    setReviewSubmittedToast(true);
    setTimeout(() => setReviewSubmittedToast(false), 3000);
  };

  // Similar books from same category
  const similarBooks = BOOKS.filter((b) => b.category === book.category && b.id !== book.id).slice(0, 4);

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-6">
        <Link href="/" className="hover:text-pine-800 dark:hover:text-parchment-200">
          خانه
        </Link>
        <span>/</span>
        <Link href="/explore" className="hover:text-pine-800 dark:hover:text-parchment-200">
          کتاب‌ها
        </Link>
        <span>/</span>
        <span className="text-pine-900 dark:text-parchment-100 font-bold">{book.title}</span>
      </div>

      {/* Main Top Section: Cover & Key Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Cover Column (Cols 1-5) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative group">
            {/* 3D Book Display */}
            <div
              className="w-60 sm:w-72 h-84 sm:h-96 rounded-r-2xl rounded-l-sm overflow-hidden relative shadow-book-3d border-r-4 border-black/20"
              style={{
                boxShadow: "-14px 18px 32px -4px rgba(25, 40, 25, 0.4), -2px 6px 12px rgba(0,0,0,0.2)",
              }}
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 via-white/10 to-transparent pointer-events-none" />
            </div>

            {/* Spine mark on left */}
            <div className="absolute -left-3 inset-y-1 w-3 bg-zinc-900 rounded-l shadow-inner" />
          </div>

          {/* Quick Details Below Cover */}
          <div className="w-full max-w-sm grid grid-cols-3 gap-3 mt-8 p-4 rounded-2xl bg-parchment-200/70 dark:bg-pine-900/40 border border-parchment-300 dark:border-pine-800 text-center text-xs">
            <div>
              <span className="block text-zinc-400">صفحات</span>
              <span className="font-bold text-pine-900 dark:text-parchment-100">{toPersianDigits(book.pages)} ص</span>
            </div>
            <div>
              <span className="block text-zinc-400">سال انتشار</span>
              <span className="font-bold text-pine-900 dark:text-parchment-100">{toPersianDigits(book.year)}</span>
            </div>
            <div>
              <span className="block text-zinc-400">زبان</span>
              <span className="font-bold text-pine-900 dark:text-parchment-100">{book.language === "fa" ? "فارسی" : "انگلیسی"}</span>
            </div>
          </div>
        </div>

        {/* Info Column (Cols 6-12) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Category & Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-honey-500/15 text-honey-800 dark:text-honey-300">
              {book.category}
            </span>
            {book.bestseller && (
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-terracotta-500/15 text-terracotta-700 dark:text-terracotta-300">
                پرفروش‌ترین
              </span>
            )}
            {book.editorPick && (
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-pine-500/15 text-pine-800 dark:text-pine-300">
                برگزیده ویراستار
              </span>
            )}
          </div>

          {/* Title & Author */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-pine-950 dark:text-parchment-50 leading-tight">
              {book.title}
            </h1>
            {book.originalTitle && (
              <span className="text-xs text-zinc-400 font-mono block mt-1">
                {book.originalTitle}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
            <span>نویسنده: <strong className="text-pine-900 dark:text-parchment-100">{book.author}</strong></span>
            {book.translator && (
              <span>• مترجم: <strong className="text-pine-900 dark:text-parchment-100">{book.translator}</strong></span>
            )}
            <span>• ناشر: <strong className="text-pine-900 dark:text-parchment-100">{book.publisher}</strong></span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(book.rating) ? "fill-amber-500 text-amber-500" : "text-zinc-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-pine-900 dark:text-parchment-100">
              {toPersianDigits(book.rating)}
            </span>
            <span className="text-xs text-zinc-400">
              ({toPersianDigits(book.ratingCount)} نظر ثبت‌شده)
            </span>
          </div>

          {/* Synopsis Short */}
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed text-justify">
            {book.synopsis || book.description}
          </p>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-parchment-200/80 dark:bg-pine-900/60 border border-parchment-300 dark:border-pine-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-zinc-500 block mb-1">قیمت نسخه دیجیتال:</span>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-pine-950 dark:text-honey-400 font-serif">
                  {formatPrice(book.price)}
                </span>
                {book.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through">
                    {formatPrice(book.originalPrice)}
                  </span>
                )}
                {book.discountPercent && (
                  <span className="px-2 py-0.5 rounded-md bg-terracotta-500 text-white text-xs font-bold">
                    {toPersianDigits(book.discountPercent)}٪ تخفیف
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {owned ? (
                <Link
                  href={`/reader/${book.id}`}
                  className="bg-pine-800 hover:bg-pine-900 text-white font-bold py-3 px-6 rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-honey-400" />
                  <span>ادامه مطالعه در ریدر</span>
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => addItem(book)}
                    className="bg-pine-800 hover:bg-pine-900 text-white font-bold py-3 px-5 rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-honey-400" />
                    <span>افزودن به سبد</span>
                  </button>

                  <button
                    onClick={handleFastBuy}
                    className="bg-honey-500 hover:bg-honey-600 text-pine-950 font-bold py-3 px-5 rounded-2xl text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>خرید مستقیم و دریافت آنی</span>
                  </button>
                </>
              )}

              <Link
                href={`/reader/${book.id}`}
                className="bg-parchment-100 hover:bg-white text-pine-900 dark:bg-pine-800 dark:text-parchment-100 font-bold py-3 px-4 rounded-2xl text-xs border border-parchment-300 dark:border-pine-700 transition-all flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-honey-500" />
                <span>نمونه رایگان</span>
              </Link>

              <button
                onClick={() => toggleFavorite(book.id)}
                className={`p-3 rounded-2xl border transition-all ${
                  favorite
                    ? "bg-terracotta-50 text-terracotta-600 border-terracotta-300 dark:bg-terracotta-950/40"
                    : "border-parchment-300 dark:border-pine-800 text-zinc-500 hover:text-terracotta-500"
                }`}
                title={favorite ? "حذف از علاقه‌مندی‌ها" : "نشان کردن کتاب"}
              >
                <Heart className={`w-5 h-5 ${favorite ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>

          {/* Success Purchase Toast */}
          {showPurchaseToast && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>کتاب «{book.title}» با موفقیت خریداری شد و به کتابخانه شخصی شما اضافه گردید!</span>
              </div>
              <Link
                href="/library"
                className="bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors"
              >
                مشاهده کتابخانه
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Tabs Section: About, Contents, Author, Reviews */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-parchment-300/80 dark:border-pine-800 mb-12">
        <div className="flex flex-wrap items-center gap-2 border-b border-parchment-200 dark:border-pine-800 pb-4 mb-6">
          <button
            onClick={() => setActiveTab("about")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "about"
                ? "bg-pine-800 text-white"
                : "text-zinc-600 dark:text-zinc-400 hover:text-pine-900"
            }`}
          >
            درباره کتاب
          </button>

          <button
            onClick={() => setActiveTab("toc")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "toc"
                ? "bg-pine-800 text-white"
                : "text-zinc-600 dark:text-zinc-400 hover:text-pine-900"
            }`}
          >
            فهرست و سرفصل‌ها
          </button>

          <button
            onClick={() => setActiveTab("author")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "author"
                ? "bg-pine-800 text-white"
                : "text-zinc-600 dark:text-zinc-400 hover:text-pine-900"
            }`}
          >
            درباره نویسنده
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "reviews"
                ? "bg-pine-800 text-white"
                : "text-zinc-600 dark:text-zinc-400 hover:text-pine-900"
            }`}
          >
            دیدگاه‌ها و نقدها ({toPersianDigits(reviews.length)})
          </button>
        </div>

        {/* Tab 1: About */}
        {activeTab === "about" && (
          <div className="space-y-4 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed text-justify">
            <p>{book.description}</p>
            <div className="mt-4 p-4 rounded-2xl bg-parchment-200/50 dark:bg-pine-900/40 border border-parchment-300 dark:border-pine-800">
              <h4 className="font-bold text-pine-950 dark:text-parchment-100 font-serif mb-2">
                مشخصات فنی و شناسنامه اثر:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <li>• شابک (ISBN): <span className="font-mono">{book.isbn}</span></li>
                <li>• ناشر: <strong>{book.publisher}</strong></li>
                <li>• تعداد صفحات: <strong>{toPersianDigits(book.pages)} صفحه</strong></li>
                <li>• زبان اصلی: <strong>{book.originalTitle || "فارسی"}</strong></li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Table of Contents */}
        {activeTab === "toc" && (
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-pine-950 dark:text-parchment-100 font-serif mb-4">
              فهرست بخش‌ها و عناوین کتاب:
            </h4>
            {book.tableOfContents && book.tableOfContents.length > 0 ? (
              <div className="divide-y divide-parchment-200 dark:divide-pine-800">
                {book.tableOfContents.map((chapter, i) => (
                  <div key={i} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{chapter}</span>
                    <span className="text-zinc-400">بخش {toPersianDigits(i + 1)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500">فهرست کامل این کتاب در ریدر دیجیتال در دسترس است.</p>
            )}
          </div>
        )}

        {/* Tab 3: Author Bio */}
        {activeTab === "author" && (
          <div className="space-y-4 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <h4 className="text-lg font-bold font-serif text-pine-950 dark:text-parchment-100">
              {book.author}
            </h4>
            <p>{book.authorBio || "از نویسندگان نامدار و تاثیرگذار تاریخ ادبیات."}</p>
          </div>
        )}

        {/* Tab 4: User Reviews */}
        {activeTab === "reviews" && (
          <div className="space-y-8">
            {/* Submit Review Form */}
            <form onSubmit={handleReviewSubmit} className="p-5 rounded-2xl bg-parchment-200/60 dark:bg-pine-900/40 border border-parchment-300 dark:border-pine-800 space-y-4">
              <h4 className="text-sm font-bold font-serif text-pine-950 dark:text-parchment-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-honey-600" />
                <span>ثبت نظر و امتیاز شما برای این کتاب</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">
                    نام شما:
                  </label>
                  <input
                    type="text"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="مثلاً: مریم نیک‌بین"
                    className="w-full bg-white dark:bg-pine-950 border border-parchment-300 dark:border-pine-800 rounded-xl px-3 py-2 text-xs text-pine-950 dark:text-parchment-50 focus:outline-none focus:border-honey-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">
                    امتیاز شما به کتاب:
                  </label>
                  <div className="flex items-center gap-1.5 py-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="text-amber-500 focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newReviewRating ? "fill-amber-500" : "text-zinc-300 dark:text-zinc-600"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-pine-900 dark:text-parchment-200 mr-2">
                      ({toPersianDigits(newReviewRating)} از ۵)
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">
                  متن دیدگاه شما:
                </label>
                <textarea
                  required
                  rows={3}
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="نظرتان را درباره قلم نویسنده، ترجمه یا درونمایه اثر بنویسید..."
                  className="w-full bg-white dark:bg-pine-950 border border-parchment-300 dark:border-pine-800 rounded-xl px-3 py-2 text-xs text-pine-950 dark:text-parchment-50 focus:outline-none focus:border-honey-500"
                />
              </div>

              <button
                type="submit"
                className="bg-pine-800 hover:bg-pine-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ثبت و انتشار دیدگاه</span>
              </button>
            </form>

            {reviewSubmittedToast && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>دیدگاه شما با موفقیت ثبت شد و در سیستم ذخیره گردید.</span>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-white/70 dark:bg-pine-900/30 border border-parchment-200 dark:border-pine-800/80"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={rev.userAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"}
                        alt={rev.userName}
                        className="w-8 h-8 rounded-full object-cover border border-honey-400"
                      />
                      <div>
                        <span className="text-xs font-bold text-pine-950 dark:text-parchment-100 font-serif block">
                          {rev.userName}
                        </span>
                        <span className="text-[10px] text-zinc-400">{rev.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-2.5 leading-relaxed text-justify">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Similar Books Section */}
      {similarBooks.length > 0 && (
        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-parchment-300 dark:border-pine-800">
            <h3 className="text-xl font-bold font-serif text-pine-950 dark:text-parchment-50">
              کتاب‌های مشابه در همین موضوع
            </h3>
            <Link href={`/explore?category=${book.category}`} className="text-xs text-honey-700 dark:text-honey-400 font-bold hover:underline">
              مشاهده بیشتر
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {similarBooks.map((simBook) => (
              <BookCard key={simBook.id} book={simBook} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
