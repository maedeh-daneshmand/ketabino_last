export interface Book {
  id: string;
  title: string;
  originalTitle?: string;
  author: string;
  translator?: string;
  publisher: string;
  year: number;
  category: string;
  tags: string[];
  description: string;
  synopsis?: string;
  cover: string;
  spineColor?: string; // Color for the 3D shelf spine
  spineTextColor?: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  language: "fa" | "en";
  isbn: string;
  rating: number;
  ratingCount: number;
  pages: number;
  featured?: boolean;
  bestseller?: boolean;
  newRelease?: boolean;
  editorPick?: boolean;
  sampleContent: {
    chapterTitle: string;
    paragraphs: string[];
  }[];
  tableOfContents?: string[];
  authorBio?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  bookCount: number;
  color: string;
  accentColor: string;
  badgeBg: string;
}

export interface Review {
  id: string;
  bookId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
}

export interface CartItem {
  book: Book;
  quantity: number;
  addedAt: string;
}

export interface LibraryItem {
  bookId: string;
  book: Book;
  purchasedAt: string;
  status: "unread" | "reading" | "completed";
  currentPage: number;
  totalPages: number;
  progressPercent: number;
  lastReadAt: string;
  favorite?: boolean;
  shelf?: string;
}

export interface ReadingProgress {
  bookId: string;
  currentPage: number;
  totalPages: number;
  progressPercent: number;
  lastReadAt: string;
  bookmarks: number[];
  notes?: { page: number; text: string; date: string }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  joinedDate: string;
  membershipPlan: "free" | "monthly" | "yearly";
  membershipExpiresAt?: string;
  readingStreakDays: number;
  readingHoursThisWeek: number;
  yearlyGoal: number; // e.g. 12 books
  completedThisYear: number;
  address?: string;
  favoriteCategories?: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  badge?: string;
  price: number;
  originalPrice?: number;
  duration: string;
  popular?: boolean;
  features: string[];
  description: string;
  colorScheme: "bronze" | "silver" | "gold";
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  bookTitle: string;
  bookId?: string;
  category?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  color: string;
}

export interface Author {
  id: string;
  name: string;
  originalName?: string;
  avatar: string;
  bio: string;
  booksCount: number;
  born?: string;
}
