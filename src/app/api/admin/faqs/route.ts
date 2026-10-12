import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, faqs: data || [] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, question, answer, related_service_slug, order_index } = body;

    if (!question || !answer) {
      return NextResponse.json({ success: false, error: "Question and Answer are required" }, { status: 400 });
    }

    const cleanId = `faq-${question.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}-${Date.now().toString().slice(-4)}`;

    const { data, error } = await supabase
      .from("faqs")
      .insert([
        {
          id: cleanId,
          category: category || "General",
          question,
          answer,
          related_service_slug: related_service_slug || null,
          order_index: order_index !== undefined ? Number(order_index) : 0,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, faq: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, category, question, answer, related_service_slug, order_index } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "FAQ ID is required" }, { status: 400 });
    }

    const updates: Record<string, any> = {};
    if (category !== undefined) updates.category = category;
    if (question !== undefined) updates.question = question;
    if (answer !== undefined) updates.answer = answer;
    if (related_service_slug !== undefined) updates.related_service_slug = related_service_slug;
    if (order_index !== undefined) updates.order_index = Number(order_index);

    const { data, error } = await supabase
      .from("faqs")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, faq: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "FAQ ID is required" }, { status: 400 });
    }

    const { error } = await supabase.from("faqs").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "FAQ deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
