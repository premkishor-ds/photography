import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, services: data || [] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      tagline,
      description,
      image_url,
      starting_price_inr,
      duration,
      delivery_time,
      deliverables,
      ideal_for,
      min_duration_minutes,
      duration_type,
      supported_durations,
    } = body;

    if (!title) {
      return NextResponse.json({ success: false, error: "Service title is required" }, { status: 400 });
    }

    const minDur = min_duration_minutes ? Math.max(60, Number(min_duration_minutes)) : 60;
    const durType = duration_type === "fixed" ? "fixed" : "selectable";
    const suppDur = Array.isArray(supported_durations) && supported_durations.length > 0
      ? supported_durations.map((d: any) => Math.max(60, Number(d))).filter((d: number) => d >= minDur)
      : [60, 120, 180, 240];

    const cleanId = `${title.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-")}-service-${Date.now().toString().slice(-4)}`;

    const { data, error } = await supabase
      .from("services")
      .insert([
        {
          id: cleanId,
          title,
          tagline: tagline || "",
          description: description || "",
          image_url: image_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
          starting_price_inr: starting_price_inr ? Number(starting_price_inr) : 25000,
          duration: duration || `${minDur / 60} Hours`,
          delivery_time: delivery_time || "7 business days",
          deliverables: Array.isArray(deliverables) ? deliverables : [],
          ideal_for: ideal_for || "",
          min_duration_minutes: minDur,
          duration_type: durType,
          supported_durations: suppDur,
          order_index: Date.now() % 1000,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, service: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      tagline,
      description,
      image_url,
      starting_price_inr,
      duration,
      delivery_time,
      deliverables,
      ideal_for,
      min_duration_minutes,
      duration_type,
      supported_durations,
    } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Service ID is required" }, { status: 400 });
    }

    const updates: Record<string, any> = {};
    if (title !== undefined) updates.title = title;
    if (tagline !== undefined) updates.tagline = tagline;
    if (description !== undefined) updates.description = description;
    if (image_url !== undefined) updates.image_url = image_url;
    if (starting_price_inr !== undefined) updates.starting_price_inr = Number(starting_price_inr);
    if (duration !== undefined) updates.duration = duration;
    if (delivery_time !== undefined) updates.delivery_time = delivery_time;
    if (deliverables !== undefined) updates.deliverables = Array.isArray(deliverables) ? deliverables : [];
    if (ideal_for !== undefined) updates.ideal_for = ideal_for;

    if (min_duration_minutes !== undefined) {
      const minD = Number(min_duration_minutes);
      if (minD < 60) {
        return NextResponse.json(
          {
            success: false,
            error: "Service minimum booking duration cannot fall below 60 minutes (1 hour).",
          },
          { status: 400 }
        );
      }
      updates.min_duration_minutes = minD;
    }

    if (duration_type !== undefined) {
      updates.duration_type = duration_type === "fixed" ? "fixed" : "selectable";
    }

    if (supported_durations !== undefined) {
      if (Array.isArray(supported_durations)) {
        const clean = supported_durations
          .map((d: any) => Number(d))
          .filter((d: number) => !isNaN(d) && d >= 60);
        updates.supported_durations = clean.length > 0 ? clean : [60, 120, 180, 240];
      }
    }

    const { data, error } = await supabase
      .from("services")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, service: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Service ID is required" }, { status: 400 });
    }

    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Service deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
