import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided" },
        { status: 400 }
      );
    }

    // Validate mime type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Uploaded file must be an image (JPEG, PNG, WebP, AVIF, etc.)" },
        { status: 400 }
      );
    }

    // Validate size (max 20MB)
    const MAX_SIZE = 20 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "File exceeds 20MB limit" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize file extension & name
    const originalExt = path.extname(file.name) || ".jpg";
    const baseName = path
      .basename(file.name, originalExt)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .slice(0, 30);
    const uniqueFileName = `${baseName}-${Date.now()}${originalExt}`;

    let uploadedUrl = "";

    // 1. Try uploading to Supabase Storage 'portfolio' bucket
    try {
      const storagePath = `gallery/${uniqueFileName}`;
      const { data, error } = await supabase.storage
        .from("portfolio")
        .upload(storagePath, buffer, {
          contentType: file.type || "image/jpeg",
          upsert: true,
        });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from("portfolio")
          .getPublicUrl(storagePath);
        if (publicUrlData?.publicUrl) {
          uploadedUrl = publicUrlData.publicUrl;
        }
      } else if (error) {
        console.warn("Supabase storage upload warning:", error.message);
      }
    } catch (storageErr) {
      console.warn("Supabase storage upload failed, falling back to local:", storageErr);
    }

    // 2. Fallback to public/uploads directory if cloud upload didn't yield URL
    if (!uploadedUrl) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const localFilePath = path.join(uploadsDir, uniqueFileName);
      fs.writeFileSync(localFilePath, buffer);
      uploadedUrl = `/uploads/${uniqueFileName}`;
    }

    return NextResponse.json({
      success: true,
      url: uploadedUrl,
      fileName: uniqueFileName,
      size: file.size,
      contentType: file.type,
    });
  } catch (err: any) {
    console.error("Image upload exception:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process image upload" },
      { status: 500 }
    );
  }
}
