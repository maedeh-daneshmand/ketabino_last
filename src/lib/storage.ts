import { CartItem, LibraryItem, ReadingProgress, UserProfile, Book, Review } from "@/types";
import { BOOKS } from "@/data/books";
import { INITIAL_REVIEWS } from "@/data/reviews";

const STORAGE_KEYS = {
  CART: "ketabino_cart",
  FAVORITES: "ketabino_favorites",
  LIBRARY: "ketabino_library",
  PROGRESS: "ketabino_reading_progress",
  CURRENT_USER: "ketabino_current_user",
  ALL_USERS: "ketabino_users_list",
  REVIEWS: "ketabino_reviews",
  THEME: "ketabino_theme",
  SAVED_QUOTES: "ketabino_saved_quotes",
};

const isClient = typeof window !== "undefined";

export function notifyStorageChange(key: string) {
  if (isClient) {
    window.dispatchEvent(new CustomEvent("ketabino-storage-change", { detail: { key } }));
  }
}

// Initial default user for quick demo or fresh guest
export const DEFAULT_USER: UserProfile = {
  id: "user-1",
  name: "مریم رادمنش",
  email: "maryam.rad@ketabino.ir",
  phone: "۰۹۱۲۳۴۵۶۷۸۹",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
  bio: "علاقه‌مند به ادبیات کلاسیک قرن بیستم، فلسفه اگزیستانسیالیسم و قهوه فرانسه.",
  joinedDate: "فروردین ۱۴۰۳",
  membershipPlan: "monthly",
  membershipExpiresAt: "۱۴۰۴/۰۱/۱۵",
  readingStreakDays: 7,
  readingHoursThisWeek: 34.6,
  yearlyGoal: 12,
  completedThisYear: 4,
};

// Initial library seed with 3 starter books
export const INITIAL_LIBRARY: LibraryItem[] = [
  {
    bookId: "boofe-koor",
    book: BOOKS.find((b) => b.id === "boofe-koor") || BOOKS[0],
    purchasedAt: "۱۴۰۳/۰۸/۰۱",
    status: "reading",
    currentPage: 48,
    totalPages: 144,
    progressPercent: 33,
    lastReadAt: "امروز",
    favorite: true,
    shelf: "کلاسیک‌های ایرانی",
  },
  {
    bookId: "atomic-habits",
    book: BOOKS.find((b) => b.id === "atomic-habits") || BOOKS[1],
    purchasedAt: "۱۴۰۳/۰۷/۱۰",
    status: "reading",
    currentPage: 210,
    totalPages: 320,
    progressPercent: 66,
    lastReadAt: "دیروز",
    favorite: true,
    shelf: "رشد فردی",
  },
  {
    bookId: "little-prince",
    book: BOOKS.find((b) => b.id === "little-prince") || BOOKS[2],
    purchasedAt: "۱۴۰۳/۰۶/۱۵",
    status: "completed",
    currentPage: 112,
    totalPages: 112,
    progressPercent: 100,
    lastReadAt: "هفته گذشته",
    shelf: "شاهکارهای جهان",
  },
];

// --- AUTH & USER STORAGE ---
export interface RegisteredUser extends UserProfile {
  password?: string;
  address?: string;
  favoriteCategories?: string[];
}

export const AuthStorage = {
  getAllUsers(): RegisteredUser[] {
    if (!isClient) return [DEFAULT_USER];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ALL_USERS);
      if (!data) {
        const initial = [DEFAULT_USER];
        localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(data);
    } catch {
      return [DEFAULT_USER];
    }
  },

  getCurrentUser(): UserProfile | null {
    if (!isClient) return DEFAULT_USER;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (!data) {
        // By default initialize with DEFAULT_USER
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USER));
        return DEFAULT_USER;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_USER;
    }
  },

  register(userData: {
    name: string;
    phone: string;
    email: string;
    password?: string;
    address?: string;
    yearlyGoal?: number;
    favoriteCategories?: string[];
  }): UserProfile {
    const users = this.getAllUsers();
    const newUser: RegisteredUser = {
      id: `user-${Date.now()}`,
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      password: userData.password,
      address: userData.address || "",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300",
      bio: "کتاب‌خوان و همراه تازه کتابینو",
      joinedDate: new Date().toLocaleDateString("fa-IR"),
      membershipPlan: "free",
      readingStreakDays: 1,
      readingHoursThisWeek: 0,
      yearlyGoal: userData.yearlyGoal || 12,
      completedThisYear: 0,
      favoriteCategories: userData.favoriteCategories || [],
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    notifyStorageChange(STORAGE_KEYS.CURRENT_USER);
    return newUser;
  },

  login(identifier: string, password?: string): { success: boolean; user?: UserProfile; message?: string } {
    const users = this.getAllUsers();
    const cleanId = identifier.trim().toLowerCase();

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === cleanId ||
        u.phone.replace(/\s+/g, "") === cleanId.replace(/\s+/g, "")
    );

    if (!user) {
      // If user doesn't exist, create an account on the fly for smooth seamless UX!
      const autoRegistered = this.register({
        name: identifier.includes("@") ? identifier.split("@")[0] : `کاربر ${identifier.slice(-4)}`,
        phone: identifier.includes("@") ? "۰۹۱۲۰۰۰۰۰۰۰" : identifier,
        email: identifier.includes("@") ? identifier : `${identifier}@ketabino.ir`,
        password,
      });
      return { success: true, user: autoRegistered };
    }

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    notifyStorageChange(STORAGE_KEYS.CURRENT_USER);
    return { success: true, user };
  },

  logout(): void {
    if (!isClient) return;
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    notifyStorageChange(STORAGE_KEYS.CURRENT_USER);
  },

  updateProfile(profile: Partial<RegisteredUser>): UserProfile {
    if (!isClient) return DEFAULT_USER;
    const current = this.getCurrentUser() || DEFAULT_USER;
    const updated: RegisteredUser = { ...current, ...profile };

    // Update in current user
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updated));

    // Update in users list
    const users = this.getAllUsers();
    const index = users.findIndex((u) => u.id === updated.id);
    if (index > -1) {
      users[index] = updated;
    } else {
      users.push(updated);
    }
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(users));

    notifyStorageChange(STORAGE_KEYS.CURRENT_USER);
    return updated;
  },

  upgradeMembership(plan: "monthly" | "yearly"): UserProfile {
    const expiresDate = plan === "yearly" ? "۱۴۰۴/۱۱/۲۰" : "۱۴۰۳/۱۲/۲۰";
    return this.updateProfile({
      membershipPlan: plan,
      membershipExpiresAt: expiresDate,
    });
  },
};

// Aliases for compatibility
export const UserStorage = {
  get: () => AuthStorage.getCurrentUser() || DEFAULT_USER,
  update: (profile: Partial<UserProfile>) => AuthStorage.updateProfile(profile),
  upgradeMembership: (plan: "monthly" | "yearly") => AuthStorage.upgradeMembership(plan),
};

// --- CART STORAGE ---
export const CartStorage = {
  get(): CartItem[] {
    if (!isClient) return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CART);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addItem(book: Book, quantity: number = 1): CartItem[] {
    if (!isClient) return [];
    const items = this.get();
    const existingIndex = items.findIndex((i) => i.book.id === book.id);
    let updated: CartItem[];

    if (existingIndex > -1) {
      updated = [...items];
      updated[existingIndex].quantity += quantity;
    } else {
      updated = [...items, { book, quantity, addedAt: new Date().toISOString() }];
    }

    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(updated));
    notifyStorageChange(STORAGE_KEYS.CART);
    return updated;
  },

  removeItem(bookId: string): CartItem[] {
    if (!isClient) return [];
    const items = this.get().filter((i) => i.book.id !== bookId);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
    notifyStorageChange(STORAGE_KEYS.CART);
    return items;
  },

  clear(): void {
    if (!isClient) return;
    localStorage.removeItem(STORAGE_KEYS.CART);
    notifyStorageChange(STORAGE_KEYS.CART);
  },

  getTotal(): { subtotal: number; discount: number; finalTotal: number; count: number } {
    const items = this.get();
    let subtotal = 0;
    let originalTotal = 0;
    let count = 0;

    items.forEach((item) => {
      const price = item.book.price * item.quantity;
      const original = (item.book.originalPrice || item.book.price) * item.quantity;
      subtotal += price;
      originalTotal += original;
      count += item.quantity;
    });

    return {
      subtotal,
      discount: Math.max(0, originalTotal - subtotal),
      finalTotal: subtotal,
      count,
    };
  },
};

// --- FAVORITES STORAGE ---
export const FavoritesStorage = {
  get(): string[] {
    if (!isClient) return ["boofe-koor", "atomic-habits", "crime-and-punishment"];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (!data) {
        const initial = ["boofe-koor", "atomic-habits", "crime-and-punishment"];
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  toggle(bookId: string): boolean {
    if (!isClient) return false;
    const favs = this.get();
    const exists = favs.includes(bookId);
    const updated = exists ? favs.filter((id) => id !== bookId) : [...favs, bookId];
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    notifyStorageChange(STORAGE_KEYS.FAVORITES);
    return !exists;
  },

  isFavorite(bookId: string): boolean {
    return this.get().includes(bookId);
  },
};

// --- LIBRARY STORAGE ---
export const LibraryStorage = {
  get(): LibraryItem[] {
    if (!isClient) return INITIAL_LIBRARY;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LIBRARY);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.LIBRARY, JSON.stringify(INITIAL_LIBRARY));
        return INITIAL_LIBRARY;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_LIBRARY;
    }
  },

  addBook(book: Book): LibraryItem[] {
    if (!isClient) return [];
    const lib = this.get();
    const exists = lib.some((i) => i.bookId === book.id);
    if (exists) return lib;

    const newItem: LibraryItem = {
      bookId: book.id,
      book,
      purchasedAt: new Date().toLocaleDateString("fa-IR"),
      status: "unread",
      currentPage: 1,
      totalPages: book.pages,
      progressPercent: 0,
      lastReadAt: "به‌تازگی اضافه شده",
      shelf: "کتابخانه شخصی",
    };

    const updated = [newItem, ...lib];
    localStorage.setItem(STORAGE_KEYS.LIBRARY, JSON.stringify(updated));
    notifyStorageChange(STORAGE_KEYS.LIBRARY);
    return updated;
  },

  isOwned(bookId: string): boolean {
    return this.get().some((i) => i.bookId === bookId);
  },

  updateProgress(bookId: string, page: number, totalPages?: number): void {
    if (!isClient) return;
    const lib = this.get();
    const index = lib.findIndex((i) => i.bookId === bookId);
    if (index === -1) return;

    const currentItem = lib[index];
    const total = totalPages || currentItem.totalPages || 100;
    const progress = Math.min(100, Math.round((page / total) * 100));
    const status: LibraryItem["status"] = progress >= 100 ? "completed" : page > 1 ? "reading" : "unread";

    lib[index] = {
      ...currentItem,
      currentPage: page,
      totalPages: total,
      progressPercent: progress,
      status,
      lastReadAt: "امروز",
    };

    localStorage.setItem(STORAGE_KEYS.LIBRARY, JSON.stringify(lib));
    notifyStorageChange(STORAGE_KEYS.LIBRARY);
  },
};

// --- READING PROGRESS STORAGE ---
export const ProgressStorage = {
  get(bookId: string): ReadingProgress {
    if (!isClient) {
      return { bookId, currentPage: 1, totalPages: 100, progressPercent: 0, lastReadAt: "", bookmarks: [] };
    }
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS) || "{}");
      return (
        all[bookId] || {
          bookId,
          currentPage: 1,
          totalPages: 100,
          progressPercent: 0,
          lastReadAt: "",
          bookmarks: [],
        }
      );
    } catch {
      return { bookId, currentPage: 1, totalPages: 100, progressPercent: 0, lastReadAt: "", bookmarks: [] };
    }
  },

  save(progress: ReadingProgress): void {
    if (!isClient) return;
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS) || "{}");
      all[progress.bookId] = progress;
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(all));
      LibraryStorage.updateProgress(progress.bookId, progress.currentPage, progress.totalPages);
      notifyStorageChange(STORAGE_KEYS.PROGRESS);
    } catch {}
  },

  toggleBookmark(bookId: string, page: number): boolean {
    const cur = this.get(bookId);
    const bookmarks = cur.bookmarks || [];
    const exists = bookmarks.includes(page);
    const updatedBookmarks = exists ? bookmarks.filter((p) => p !== page) : [...bookmarks, page];
    this.save({
      ...cur,
      bookmarks: updatedBookmarks,
    });
    return !exists;
  },
};

// --- REVIEWS STORAGE ---
export const ReviewsStorage = {
  get(bookId?: string): Review[] {
    if (!isClient) return INITIAL_REVIEWS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      const list: Review[] = data ? JSON.parse(data) : INITIAL_REVIEWS;
      return bookId ? list.filter((r) => r.bookId === bookId) : list;
    } catch {
      return INITIAL_REVIEWS;
    }
  },

  addReview(review: Omit<Review, "id" | "date" | "likes">): Review {
    if (!isClient) {
      return { ...review, id: "temp", date: "امروز", likes: 0 };
    }
    const current = this.get();
    const newRev: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString("fa-IR"),
      likes: 1,
    };
    const updated = [newRev, ...current];
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));
    notifyStorageChange(STORAGE_KEYS.REVIEWS);
    return newRev;
  },
};
