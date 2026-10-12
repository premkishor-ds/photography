import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { GEAR_ITEMS, GearItem } from "@/data/gearData";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const id = searchParams.get("id");

    // Try fetching from Supabase table first
    const { data, error } = await supabase
      .from("gear_items")
      .select("*")
      .order("created_at", { ascending: false });

    let items: any[] = [];
    if (!error && Array.isArray(data) && data.length > 0) {
      items = data.map((row) => ({
        id: row.id,
        slug: row.slug,
        name: row.name,
        manufacturer: row.manufacturer,
        category: row.category,
        categoryLabel: row.category_label,
        modelNumber: row.model_number,
        description: row.description,
        primaryUses: Array.isArray(row.primary_uses) ? row.primary_uses : [],
        compatibility: row.compatibility,
        imageUrl: row.image_url,
        imageAlt: row.image_alt,
        specifications: Array.isArray(row.specifications) ? row.specifications : [],
        reviewUrl: row.review_url,
        relatedPortfolioUrls: Array.isArray(row.related_portfolio_urls) ? row.related_portfolio_urls : [],
        ownershipStatus: row.ownership_status,
        published: row.published !== false,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));
    } else {
      // Fallback to static centralized inventory
      items = GEAR_ITEMS;
    }

    if (slug) {
      const match = items.find((i) => i.slug === slug || (i.aliases && i.aliases.includes(slug)));
      return NextResponse.json({ success: true, item: match || null });
    }

    if (id) {
      const match = items.find((i) => i.id === id);
      return NextResponse.json({ success: true, item: match || null });
    }

    return NextResponse.json({ success: true, items });
  } catch (err: any) {
    // Graceful fallback to static items if database call throws
    return NextResponse.json({ success: true, items: GEAR_ITEMS });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      manufacturer,
      category,
      categoryLabel,
      modelNumber,
      description,
      primaryUses,
      compatibility,
      imageUrl,
      imageAlt,
      specifications,
      reviewUrl,
      relatedPortfolioUrls,
      ownershipStatus,
      published,
    } = body;

    if (!name || !category) {
      return NextResponse.json(
        { success: false, error: "Product name and category are required" },
        { status: 400 }
      );
    }

    const cleanSlug =
      body.slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newId = `gear-${cleanSlug}-${Date.now().toString().slice(-4)}`;

    const record = {
      id: newId,
      slug: cleanSlug,
      name,
      manufacturer: manufacturer || "Custom",
      category,
      category_label: categoryLabel || category,
      model_number: modelNumber || null,
      description: description || "",
      primary_uses: Array.isArray(primaryUses) ? primaryUses : [],
      compatibility: compatibility || "",
      image_url: imageUrl || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
      image_alt: imageAlt || `${name} photography equipment`,
      specifications: Array.isArray(specifications) ? specifications : [],
      review_url: reviewUrl || `/photography-gear/${cleanSlug}`,
      related_portfolio_urls: Array.isArray(relatedPortfolioUrls) ? relatedPortfolioUrls : [],
      ownership_status: ownershipStatus || "Active Kit",
      published: published !== false,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("gear_items")
      .insert([record])
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
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Equipment ID is required" }, { status: 400 });
    }

    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.slug !== undefined) payload.slug = updates.slug;
    if (updates.manufacturer !== undefined) payload.manufacturer = updates.manufacturer;
    if (updates.category !== undefined) payload.category = updates.category;
    if (updates.categoryLabel !== undefined) payload.category_label = updates.categoryLabel;
    if (updates.modelNumber !== undefined) payload.model_number = updates.modelNumber;
    if (updates.description !== undefined) payload.description = updates.description;
    if (updates.primaryUses !== undefined) payload.primary_uses = updates.primaryUses;
    if (updates.compatibility !== undefined) payload.compatibility = updates.compatibility;
    if (updates.imageUrl !== undefined) payload.image_url = updates.imageUrl;
    if (updates.imageAlt !== undefined) payload.image_alt = updates.imageAlt;
    if (updates.specifications !== undefined) payload.specifications = updates.specifications;
    if (updates.reviewUrl !== undefined) payload.review_url = updates.reviewUrl;
    if (updates.relatedPortfolioUrls !== undefined) payload.related_portfolio_urls = updates.relatedPortfolioUrls;
    if (updates.ownershipStatus !== undefined) payload.ownership_status = updates.ownershipStatus;
    if (updates.published !== undefined) payload.published = updates.published;

    const { data, error } = await supabase
      .from("gear_items")
      .update(payload)
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
      return NextResponse.json({ success: false, error: "Equipment ID is required" }, { status: 400 });
    }

    const { error } = await supabase.from("gear_items").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Equipment record deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
