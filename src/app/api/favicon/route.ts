import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const PRESET_FAVICONS: Record<string, string> = {
  camera: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="16" fill="#121212"/>
  <rect width="30" height="30" x="1" y="1" rx="15" fill="none" stroke="#BFA076" stroke-width="0.75" stroke-opacity="0.6"/>
  <path d="M9 13.5C9 12.67 9.67 12 10.5 12H12.2L13.1 10.7C13.3 10.4 13.6 10.2 14 10.2H18C18.4 10.2 18.7 10.4 18.9 10.7L19.8 12H21.5C22.33 12 23 12.67 23 13.5V20.5C23 21.33 22.33 22 21.5 22H10.5C9.67 22 9 21.33 9 20.5V13.5Z" fill="#FAF7F2"/>
  <circle cx="16" cy="17" r="3.75" fill="#121212" stroke="#BFA076" stroke-width="1.25"/>
  <circle cx="16" cy="17" r="1.8" fill="#BFA076"/>
  <circle cx="15.3" cy="16.3" r="0.6" fill="#FFFFFF" fill-opacity="0.8"/>
  <circle cx="20.5" cy="13.7" r="0.6" fill="#BFA076"/>
</svg>`,
  aperture: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="16" fill="#121212"/>
  <rect width="30" height="30" x="1" y="1" rx="15" fill="none" stroke="#BFA076" stroke-width="0.75" stroke-opacity="0.6"/>
  <circle cx="16" cy="16" r="9" fill="none" stroke="#FAF7F2" stroke-width="1.5"/>
  <line x1="16" y1="7" x2="23.8" y2="20.5" stroke="#BFA076" stroke-width="1.2"/>
  <line x1="23.8" y1="20.5" x2="8.2" y2="20.5" stroke="#BFA076" stroke-width="1.2"/>
  <line x1="8.2" y1="20.5" x2="16" y2="7" stroke="#BFA076" stroke-width="1.2"/>
  <circle cx="16" cy="16" r="2.2" fill="#BFA076"/>
</svg>`,
  monogram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="16" fill="#121212"/>
  <rect width="30" height="30" x="1" y="1" rx="15" fill="none" stroke="#BFA076" stroke-width="0.75" stroke-opacity="0.6"/>
  <text x="16" y="21.5" font-family="Georgia, serif" font-size="16" font-weight="bold" fill="#BFA076" text-anchor="middle">P</text>
  <circle cx="21.5" cy="12" r="1.2" fill="#FAF7F2"/>
</svg>`,
};

export async function GET(req: NextRequest) {
  try {
    const { data } = await supabase
      .from("studio_settings")
      .select("favicon_url")
      .eq("id", "default")
      .single();

    const faviconUrl = data?.favicon_url?.trim();

    if (faviconUrl) {
      if (faviconUrl.startsWith("http")) {
        return NextResponse.redirect(faviconUrl, 307);
      }
      if (PRESET_FAVICONS[faviconUrl]) {
        return new NextResponse(PRESET_FAVICONS[faviconUrl], {
          headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "public, max-age=60, s-maxage=300",
          },
        });
      }
    }

    // Default to luxury camera icon
    return new NextResponse(PRESET_FAVICONS.camera, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=60, s-maxage=300",
      },
    });
  } catch {
    return new NextResponse(PRESET_FAVICONS.camera, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=60, s-maxage=300",
      },
    });
  }
}
