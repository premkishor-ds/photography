import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, posts: data || [] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      excerpt,
      category,
      author,
      author_role,
      read_time,
      hero_image,
      hero_alt,
      content,
      related_service_slug,
      published_date,
      modified_date,
    } = body;

    if (!title) {
      return NextResponse.json({ success: false, error: "Blog title is required" }, { status: 400 });
    }

    const cleanSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const cleanId = `blog-${cleanSlug}-${Date.now().toString().slice(-4)}`;
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("blog_posts")
      .insert([
        {
          id: cleanId,
          slug: cleanSlug,
          title,
          excerpt: excerpt || "",
          category: category || "Portrait Tips",
          author: author || "Lead Photographer",
          author_role: author_role || "Principal Photographer",
          read_time: read_time || "5 min read",
          hero_image:
            hero_image ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=80",
          hero_alt: hero_alt || title,
          content: Array.isArray(content) ? content : (typeof content === "string" ? JSON.parse(content || "[]") : []),
          related_service_slug: related_service_slug || "portrait-photography",
          published_date: published_date || today,
          modified_date: modified_date || today,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, post: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      slug,
      title,
      excerpt,
      category,
      author,
      author_role,
      read_time,
      hero_image,
      hero_alt,
      content,
      related_service_slug,
      published_date,
      modified_date,
    } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Post ID is required" }, { status: 400 });
    }

    const updates: Record<string, any> = {};
    if (slug !== undefined) updates.slug = slug;
    if (title !== undefined) updates.title = title;
    if (excerpt !== undefined) updates.excerpt = excerpt;
    if (category !== undefined) updates.category = category;
    if (author !== undefined) updates.author = author;
    if (author_role !== undefined) updates.author_role = author_role;
    if (read_time !== undefined) updates.read_time = read_time;
    if (hero_image !== undefined) updates.hero_image = hero_image;
    if (hero_alt !== undefined) updates.hero_alt = hero_alt;
    if (content !== undefined) {
      updates.content = Array.isArray(content) ? content : (typeof content === "string" ? JSON.parse(content || "[]") : content);
    }
    if (related_service_slug !== undefined) updates.related_service_slug = related_service_slug;
    if (published_date !== undefined) updates.published_date = published_date;
    updates.modified_date = modified_date || new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("blog_posts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, post: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Post ID is required" }, { status: 400 });
    }

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Blog post deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
