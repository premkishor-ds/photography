import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, items: data || [] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, category, image_url, location, year, description, featured } = body;

    if (!title || !category || !image_url) {
      return NextResponse.json(
        { success: false, error: "Title, category, and image URL are required" },
        { status: 400 }
      );
    }

    // Generate clean ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const prefix = category.slice(0, 3).toLowerCase().replace(/[^a-z]/g, "");
    const id = `${prefix}-${Date.now().toString().slice(-4)}${randomSuffix}`;

    const { data, error } = await supabase
      .from("portfolio_items")
      .insert([
        {
          id,
          title,
          category,
          image_url,
          aspect_ratio: "landscape",
          location: location || "Jaipur, India",
          year: year || new Date().getFullYear().toString(),
          description: description || "",
          featured: featured !== undefined ? featured : true,
          order_index: Date.now() % 1000,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, item: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, category, image_url, location, year, description, featured } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Item ID is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("portfolio_items")
      .update({
        title,
        category,
        image_url,
        location,
        year,
        description,
        featured,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, item: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Item ID is required" }, { status: 400 });
    }

    const { error } = await supabase.from("portfolio_items").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Portfolio item deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
