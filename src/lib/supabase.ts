import { createClient } from "@supabase/supabase-js";
import { PORTFOLIO_ITEMS, SERVICES, PortfolioItem, ServiceItem } from "@/data/photographyData";
import { BLOG_POSTS, BlogPost } from "@/data/blogData";
import { FAQ_ITEMS, FAQItem } from "@/data/faqData";
import { GEAR_ITEMS, GearItem, getGearItemBySlug } from "@/data/gearData";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://qvzvnblosedrqktisdsz.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable__ios76DkRwhZ9FWMyUr07Q_5a-JQx1d";

// Singleton Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  message: string;
  status: "new" | "contacted" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  created_at: string;
}

export interface DynamicPortfolioItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  aspect_ratio?: string;
  location?: string;
  year?: string;
  description?: string;
  featured?: boolean;
  order_index?: number;
  created_at?: string;
}

export interface DynamicServiceItem {
  id: string;
  title: string;
  tagline?: string;
  description?: string;
  image_url: string;
  duration?: string;
  delivery_time?: string;
  deliverables?: string[];
  detailed_description?: string;
  ideal_for?: string;
  starting_price_inr?: number;
  order_index?: number;
  created_at?: string;
}

// Fetch all portfolio items from Supabase with graceful fallback
export async function fetchPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return PORTFOLIO_ITEMS;
    }

    return data.map((item: DynamicPortfolioItem) => ({
      id: item.id,
      title: item.title,
      category: item.category as any,
      imageUrl: item.image_url,
      aspectRatio: (item.aspect_ratio || "landscape") as any,
      location: item.location || "Jaipur, India",
      year: item.year || "2026",
      description: item.description || "",
    }));
  } catch (err) {
    console.error("Failed to fetch dynamic portfolio items:", err);
    return PORTFOLIO_ITEMS;
  }
}

// Fetch all services from Supabase with graceful fallback
export async function fetchServices(): Promise<ServiceItem[]> {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return SERVICES;
    }

    return data.map((item: DynamicServiceItem) => ({
      id: item.id,
      title: item.title,
      tagline: item.tagline || "",
      description: item.description || "",
      imageUrl: item.image_url,
      duration: item.duration || "2 Hours",
      deliveryTime: item.delivery_time || "7 business days",
      deliverables: Array.isArray(item.deliverables) ? item.deliverables : [],
      detailedDescription: item.detailed_description || "",
      idealFor: item.ideal_for || "",
    }));
  } catch (err) {
    console.error("Failed to fetch dynamic services:", err);
    return SERVICES;
  }
}

// Insert new inquiry into Supabase with duration & travel buffers
export async function insertInquiry(inquiryData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  message: string;
  appointmentTime?: string;
  durationMinutes?: number;
  blockedStartTime?: string;
  blockedEndTime?: string;
  serviceId?: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const duration = Math.max(60, inquiryData.durationMinutes || 60);
    const appointmentTime = inquiryData.appointmentTime || "10:00";

    // Auto-compute travel buffers if not explicitly supplied
    let blockedStart = inquiryData.blockedStartTime;
    let blockedEnd = inquiryData.blockedEndTime;
    if (!blockedStart || !blockedEnd) {
      const parts = appointmentTime.split(":");
      const startM = (parseInt(parts[0], 10) || 10) * 60 + (parseInt(parts[1], 10) || 0);
      const bStartM = Math.max(0, startM - 60);
      const bEndM = Math.min(24 * 60, startM + duration + 60);
      const toStr = (m: number) =>
        `${Math.floor(m / 60).toString().padStart(2, "0")}:${(m % 60).toString().padStart(2, "0")}`;
      blockedStart = toStr(bStartM);
      blockedEnd = toStr(bEndM);
    }

    const { data, error } = await supabase
      .from("inquiries")
      .insert([
        {
          name: inquiryData.name,
          email: inquiryData.email,
          phone: inquiryData.phone,
          service: inquiryData.service,
          preferred_date: inquiryData.preferredDate,
          appointment_time: appointmentTime,
          duration_minutes: duration,
          blocked_start_time: blockedStart,
          blocked_end_time: blockedEnd,
          service_id: inquiryData.serviceId || null,
          message: inquiryData.message,
          status: "new",
        },
      ])
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert inquiry error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err: any) {
    console.error("Supabase insert inquiry exception:", err);
    return { success: false, error: err?.message || "Unknown error" };
  }
}

export interface StudioSettingsRecord {
  id: string;
  studio_name: string;
  email: string;
  phone: string;
  whatsapp_number: string;
  address: string;
  hindi_address: string;
  working_hours: string;
  tagline: string;
  subtagline: string;
  hero_image_url: string;
  photographer_name: string;
  photographer_role: string;
  photographer_bio_1: string;
  photographer_bio_2: string;
  photographer_quote: string;
  photographer_portrait_url: string;
  stats_experience: string;
  stats_sessions: string;
  stats_weddings: string;
  stats_features: string;
  instagram_url?: string;
  facebook_url?: string;
  pinterest_url?: string;
  five_hundred_px_url?: string;
  youtube_url?: string;
  terms_conditions_custom?: string;
  privacy_policy_custom?: string;
  booking_retainer_percent?: string;
  governing_jurisdiction?: string;
  cancellation_policy?: string;
  updated_at?: string;
}

export async function fetchStudioSettings(): Promise<StudioSettingsRecord | null> {
  try {
    const { data, error } = await supabase
      .from("studio_settings")
      .select("*")
      .eq("id", "default")
      .single();

    if (error || !data) {
      return null;
    }
    return data;
  } catch (err) {
    console.error("Failed to fetch dynamic studio settings:", err);
    return null;
  }
}

export interface DynamicBlogPostRecord {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  author_role: string;
  read_time: string;
  hero_image: string;
  hero_alt: string;
  content: any;
  related_service_slug: string;
  published_date: string;
  modified_date: string;
  created_at?: string;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return BLOG_POSTS;
    }

    return data.map((item: DynamicBlogPostRecord) => ({
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      category: item.category as any,
      author: item.author,
      authorRole: item.author_role,
      readTime: item.read_time,
      heroImage: item.hero_image,
      heroAlt: item.hero_alt,
      content: typeof item.content === "string" ? JSON.parse(item.content) : item.content,
      relatedServiceSlug: item.related_service_slug,
      publishedDate: item.published_date,
      modifiedDate: item.modified_date,
    }));
  } catch (err) {
    console.error("Failed to fetch dynamic blog posts:", err);
    return BLOG_POSTS;
  }
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return BLOG_POSTS.find((p) => p.slug === slug) || null;
    }

    const item = data as DynamicBlogPostRecord;
    return {
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      category: item.category as any,
      author: item.author,
      authorRole: item.author_role,
      readTime: item.read_time,
      heroImage: item.hero_image,
      heroAlt: item.hero_alt,
      content: typeof item.content === "string" ? JSON.parse(item.content) : item.content,
      relatedServiceSlug: item.related_service_slug,
      publishedDate: item.published_date,
      modifiedDate: item.modified_date,
    };
  } catch (err) {
    console.error("Failed to fetch dynamic blog post by slug:", err);
    return BLOG_POSTS.find((p) => p.slug === slug) || null;
  }
}

export interface DynamicFaqRecord {
  id: string;
  category: string;
  question: string;
  answer: string;
  related_service_slug?: string;
  order_index?: number;
  created_at?: string;
}

export async function fetchFaqItems(): Promise<FAQItem[]> {
  try {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return FAQ_ITEMS;
    }

    return data.map((item: DynamicFaqRecord) => ({
      id: item.id,
      category: item.category as any,
      question: item.question,
      answer: item.answer,
      relatedServiceSlug: item.related_service_slug,
    }));
  } catch (err) {
    console.error("Failed to fetch dynamic FAQ items:", err);
    return FAQ_ITEMS;
  }
}

export interface DynamicGearRecord {
  id: string;
  slug: string;
  name: string;
  manufacturer: string;
  category: string;
  category_label: string;
  model_number: string | null;
  description: string;
  primary_uses: string[] | string;
  compatibility: string;
  image_url: string;
  image_alt: string;
  specifications: { label: string; value: string | null }[] | string;
  review_url: string | null;
  related_portfolio_urls: { label: string; url: string }[] | string;
  ownership_status: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

let cachedGearItems: { data: GearItem[]; expiresAt: number } | null = null;
const GEAR_CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes cache

export function invalidateGearCache() {
  cachedGearItems = null;
}

export async function fetchGearItems(): Promise<GearItem[]> {
  const now = Date.now();
  if (cachedGearItems && now < cachedGearItems.expiresAt) {
    return cachedGearItems.data;
  }

  try {
    // 2-second timeout so slow network doesn't stall the page
    const timeoutPromise = new Promise<{ data: null; error: Error }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: new Error("Supabase gear query timeout") }), 2000)
    );

    const queryPromise = supabase
      .from("gear_items")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    const { data, error } = await Promise.race([queryPromise, timeoutPromise]);

    if (error || !data || data.length === 0) {
      cachedGearItems = { data: GEAR_ITEMS, expiresAt: now + GEAR_CACHE_TTL_MS };
      return GEAR_ITEMS;
    }

    const items = data.map((item: DynamicGearRecord) => {
      const baseStatic = GEAR_ITEMS.find((g) => g.id === item.id || g.slug === item.slug);
      return {
        ...(baseStatic || {}),
        id: item.id,
        slug: item.slug,
        name: item.name,
        manufacturer: item.manufacturer,
        category: item.category as any,
        categoryLabel: item.category_label,
        modelNumber: item.model_number,
        description: item.description,
        primaryUses: Array.isArray(item.primary_uses)
          ? item.primary_uses
          : typeof item.primary_uses === "string"
          ? JSON.parse(item.primary_uses)
          : [],
        compatibility: item.compatibility,
        imageUrl: item.image_url,
        imageAlt: item.image_alt,
        specifications: Array.isArray(item.specifications)
          ? item.specifications
          : typeof item.specifications === "string"
          ? JSON.parse(item.specifications)
          : [],
        reviewUrl: item.review_url,
        relatedPortfolioUrls: Array.isArray(item.related_portfolio_urls)
          ? item.related_portfolio_urls
          : typeof item.related_portfolio_urls === "string"
          ? JSON.parse(item.related_portfolio_urls)
          : [],
        ownershipStatus: item.ownership_status,
        published: item.published !== false,
      } as GearItem;
    });

    cachedGearItems = { data: items, expiresAt: now + GEAR_CACHE_TTL_MS };
    return items;
  } catch (err) {
    console.error("Failed to fetch dynamic gear items:", err);
    return GEAR_ITEMS;
  }
}

export async function fetchGearItemBySlug(slug: string): Promise<GearItem | null> {
  const normalized = slug.toLowerCase();

  // Fast path: if cache is hot, find in cache instantly without any async network delay
  if (cachedGearItems && Date.now() < cachedGearItems.expiresAt) {
    const cachedMatch = cachedGearItems.data.find(
      (i) =>
        i.slug.toLowerCase() === normalized ||
        (i.aliases && i.aliases.some((a) => a.toLowerCase() === normalized))
    );
    if (cachedMatch) return cachedMatch;
  }

  try {
    const items = await fetchGearItems();
    const found = items.find(
      (i) =>
        i.slug.toLowerCase() === normalized ||
        (i.aliases && i.aliases.some((a) => a.toLowerCase() === normalized))
    );
    return found || getGearItemBySlug(slug) || null;
  } catch (err) {
    console.error("Failed to fetch dynamic gear item by slug:", err);
    return getGearItemBySlug(slug) || null;
  }
}


