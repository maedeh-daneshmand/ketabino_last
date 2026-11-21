import HeroSection from "@/components/home/HeroSection";
import CategoryPills from "@/components/home/CategoryPills";
import BookshelfSection from "@/components/books/BookshelfSection";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import AuthorsSection from "@/components/home/AuthorsSection";
import MembershipBanner from "@/components/home/MembershipBanner";
import ReaderQuotesSection from "@/components/home/ReaderQuotesSection";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* 1. Atmospheric Hero with Entrance */}
      <HeroSection />

      {/* 2. Visual Categories with Circular Badges */}
      <CategoryPills />

      {/* 3. Interactive Vertical Bookshelf with 3D Spines */}
      <BookshelfSection />

      {/* 4. Featured & Bestselling Books Showcase */}
      <FeaturedBooks />

      {/* 5. Featured Authors Gallery with Arched Frames */}
      <AuthorsSection />

      {/* 6. Subscription / Membership Promo */}
      <MembershipBanner />

      {/* 7. Daily Quotes & Reader Feedback */}
      <ReaderQuotesSection />
    </div>
  );
}
