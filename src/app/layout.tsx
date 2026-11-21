import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "کتابینو (Ketabino) | فروشگاه و کتابخانه دیجیتال کتاب‌های برگزیده",
  description: "کتابینو، پلتفرم فاخر کشف، خرید و مطالعه آنلاین کتاب‌های الکترونیکی و کلاسیک با ریدر هوشمند و کتابخانه شخصی.",
  keywords: ["کتاب", "کتابخانه دیجیتال", "کتاب آنلاین", "کتاب صوتی", "کتابینو", "مطالعه رمان", "رمان کلاسیک"],
  authors: [{ name: "تیم طراحی و توسعه کتابینو" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased vintage-paper selection:bg-honey-200 selection:text-pine-900">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
