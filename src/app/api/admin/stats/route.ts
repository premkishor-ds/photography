import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [inquiriesRes, portfolioRes, servicesRes, settingsRes, blogRes, faqRes] = await Promise.all([
      supabase.from("inquiries").select("id, status, created_at"),
      supabase.from("portfolio_items").select("id"),
      supabase.from("services").select("id"),
      supabase.from("studio_settings").select("*").limit(1),
      supabase.from("blog_posts").select("id"),
      supabase.from("faqs").select("id"),
    ]);

    const inquiries = inquiriesRes.data || [];
    const totalInquiries = inquiries.length;
    const newInquiries = inquiries.filter((i) => i.status === "new").length;
    const confirmedBookings = inquiries.filter((i) => i.status === "confirmed").length;

    const totalPortfolio = portfolioRes.data?.length || 0;
    const totalServices = servicesRes.data?.length || 0;
    const totalBlogPosts = blogRes.data?.length || 0;
    const totalFaqs = faqRes.data?.length || 0;
    const settings = settingsRes.data?.[0] || null;

    return NextResponse.json({
      success: true,
      stats: {
        totalInquiries,
        newInquiries,
        confirmedBookings,
        totalPortfolio,
        totalServices,
        totalBlogPosts,
        totalFaqs,
        dbStatus: "connected",
        projectRef: "qvzvnblosedrqktisdsz",
        region: "ap-southeast-1 (AWS)",
      },
      settings,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message,
        stats: {
          totalInquiries: 0,
          newInquiries: 0,
          confirmedBookings: 0,
          totalPortfolio: 15,
          totalServices: 6,
          dbStatus: "error",
        },
      },
      { status: 500 }
    );
  }
}
