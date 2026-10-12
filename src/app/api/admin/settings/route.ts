import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("studio_settings")
      .select("*")
      .eq("id", "default")
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, settings: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const updates = {
      studio_name: body.studio_name,
      email: body.email,
      phone: body.phone,
      whatsapp_number: body.whatsapp_number,
      address: body.address,
      hindi_address: body.hindi_address,
      working_hours: body.working_hours,
      tagline: body.tagline,
      subtagline: body.subtagline,
      hero_image_url: body.hero_image_url,
      photographer_name: body.photographer_name,
      photographer_role: body.photographer_role,
      photographer_bio_1: body.photographer_bio_1,
      photographer_bio_2: body.photographer_bio_2,
      photographer_quote: body.photographer_quote,
      photographer_portrait_url: body.photographer_portrait_url,
      stats_experience: body.stats_experience,
      stats_sessions: body.stats_sessions,
      stats_weddings: body.stats_weddings,
      stats_features: body.stats_features,
      instagram_url: body.instagram_url,
      facebook_url: body.facebook_url,
      pinterest_url: body.pinterest_url,
      five_hundred_px_url: body.five_hundred_px_url,
      youtube_url: body.youtube_url,
      terms_conditions_custom: body.terms_conditions_custom ?? "",
      privacy_policy_custom: body.privacy_policy_custom ?? "",
      booking_retainer_percent: body.booking_retainer_percent ?? "30–50%",
      governing_jurisdiction: body.governing_jurisdiction ?? "Jaipur, Rajasthan, India",
      favicon_url: body.favicon_url !== undefined ? body.favicon_url : "camera",
      default_min_booking_duration: body.default_min_booking_duration ? Math.max(60, Number(body.default_min_booking_duration)) : 60,
      map_latitude: body.map_latitude !== undefined ? Number(body.map_latitude) : 26.8285,
      map_longitude: body.map_longitude !== undefined ? Number(body.map_longitude) : 75.8654,
      map_zoom: body.map_zoom !== undefined ? Number(body.map_zoom) : 15,
      google_maps_api_key: body.google_maps_api_key !== undefined ? body.google_maps_api_key : "",
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("studio_settings")
      .update(updates)
      .eq("id", "default")
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, settings: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
