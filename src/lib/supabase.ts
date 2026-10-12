import { createClient } from "@supabase/supabase-js";
import { PORTFOLIO_ITEMS, SERVICES, PortfolioItem, ServiceItem } from "@/data/photographyData";

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

// Insert new inquiry into Supabase
export async function insertInquiry(inquiryData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  message: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("inquiries")
      .insert([
        {
          name: inquiryData.name,
          email: inquiryData.email,
          phone: inquiryData.phone,
          service: inquiryData.service,
          preferred_date: inquiryData.preferredDate,
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
