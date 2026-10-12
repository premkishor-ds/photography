import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat") || "26.8285";
    const lng = searchParams.get("lng") || "75.8654";
    const zoom = searchParams.get("zoom") || "15";
    const width = searchParams.get("width") || "800";
    const height = searchParams.get("height") || "450";
    const maptype = searchParams.get("maptype") || "roadmap";

    // 1. Try to get Google Maps API key from DB or environment
    let apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    
    if (!apiKey) {
      try {
        const { data } = await supabase
          .from("studio_settings")
          .select("google_maps_api_key")
          .eq("id", "default")
          .single();
        if (data?.google_maps_api_key) {
          apiKey = data.google_maps_api_key;
        }
      } catch {
        // Continue to fallback
      }
    }

    // 2. If API Key is configured, fetch directly from Google Static Maps API
    if (apiKey) {
      const googleUrl = new URL("https://maps.googleapis.com/maps/api/staticmap");
      googleUrl.searchParams.set("center", `${lat},${lng}`);
      googleUrl.searchParams.set("zoom", zoom);
      googleUrl.searchParams.set("size", `${width}x${height}`);
      googleUrl.searchParams.set("scale", "2");
      googleUrl.searchParams.set("maptype", maptype);
      googleUrl.searchParams.set("markers", `color:0xBFA076|label:P|${lat},${lng}`);
      googleUrl.searchParams.set("key", apiKey);

      const upstream = await fetch(googleUrl.toString());
      if (upstream.ok) {
        const imageBuffer = await upstream.arrayBuffer();
        const contentType = upstream.headers.get("content-type") || "image/png";

        return new NextResponse(imageBuffer, {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=86400, s-maxage=86400",
          },
        });
      }
    }

    // 3. High-Quality SVG Luxury Fallback when API key is not yet set
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#BFA076" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#BFA076" stop-opacity="0" />
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.25" />
    </filter>
  </defs>

  <!-- Background / Landmass -->
  <rect width="100%" height="100%" fill="#FAF7F2" />
  
  <!-- Subtle terrain zones -->
  <polygon points="0,0 350,0 420,180 180,260 0,220" fill="#F3ECE1" opacity="0.7" />
  <polygon points="500,0 ${width},0 ${width},320 620,280 540,160" fill="#F3ECE1" opacity="0.6" />
  <polygon points="100,320 420,280 540,${height} 0,${height}" fill="#EDE4D6" opacity="0.6" />

  <!-- Secondary Roads Grid -->
  <g stroke="#E8DED0" stroke-width="2.5" fill="none">
    <line x1="0" y1="110" x2="${width}" y2="130" />
    <line x1="0" y1="240" x2="${width}" y2="250" />
    <line x1="0" y1="380" x2="${width}" y2="360" />
    <line x1="220" y1="0" x2="200" y2="${height}" />
    <line x1="420" y1="0" x2="440" y2="${height}" />
    <line x1="650" y1="0" x2="630" y2="${height}" />
    <path d="M 60,${height} C 220,320 340,360 480,220 C 620,80 720,120 ${width},100" />
    <path d="M 0,340 C 180,300 320,330 460,240 C 600,150 740,190 ${width},210" />
  </g>

  <!-- Arterial Roads (Tonk Road / Jagatpura Road) -->
  <g stroke="#D7C7B2" stroke-width="7" stroke-linecap="round" fill="none">
    <line x1="0" y1="280" x2="${width}" y2="210" />
    <line x1="460" y1="0" x2="460" y2="${height}" />
    <path d="M 120,0 C 280,160 380,220 540,320 C 700,420 740,${height} 820,${height}" />
  </g>

  <!-- Road White Centerlines -->
  <g stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" fill="none">
    <line x1="0" y1="280" x2="${width}" y2="210" />
    <line x1="460" y1="0" x2="460" y2="${height}" />
    <path d="M 120,0 C 280,160 380,220 540,320 C 700,420 740,${height} 820,${height}" />
  </g>

  <!-- Area District Names -->
  <text x="80" y="80" fill="#9E8870" font-size="11" font-family="'Plus Jakarta Sans', sans-serif" letter-spacing="2">PINK CITY HERITAGE</text>
  <text x="600" y="90" fill="#9E8870" font-size="11" font-family="'Plus Jakarta Sans', sans-serif" letter-spacing="2">MALVIYA NAGAR</text>
  <text x="140" y="420" fill="#9E8870" font-size="11" font-family="'Plus Jakarta Sans', sans-serif" letter-spacing="2">TONK ROAD</text>
  <text x="580" y="390" fill="#9E8870" font-size="11" font-family="'Plus Jakarta Sans', sans-serif" letter-spacing="2">JAGATPURA</text>
  <text x="475" y="270" fill="#121212" font-size="12" font-weight="600" font-family="'Plus Jakarta Sans', sans-serif" letter-spacing="1">KAROLAN KA BARH</text>

  <!-- Studio Center Pin (${lat}, ${lng}) -->
  <g transform="translate(${Math.round(Number(width) / 2)}, ${Math.round(Number(height) / 2)})" filter="url(#shadow)">
    <!-- Radar pulse circle -->
    <circle r="28" fill="url(#pinGlow)" />
    <!-- Pin Body -->
    <path d="M 0,0 C -12,-18 -12,-32 0,-32 C 12,-32 12,-18 0,0 Z" fill="#121212" stroke="#BFA076" stroke-width="2.5" />
    <!-- Camera icon inside pin -->
    <circle cx="0" cy="-21" r="5" fill="#BFA076" />
    <!-- Pin anchor dot -->
    <circle cx="0" cy="0" r="3" fill="#BFA076" />
  </g>

  <!-- Bottom Badge: Google Maps Coordinates -->
  <rect x="16" y="${Number(height) - 38}" width="280" height="26" fill="#FFFFFF" fill-opacity="0.9" stroke="#E8DED0" rx="2" />
  <text x="26" y="${Number(height) - 21}" fill="#121212" font-size="10" font-weight="600" font-family="'Plus Jakarta Sans', sans-serif">
    Google Maps • ${Number(lat).toFixed(4)}° N, ${Number(lng).toFixed(4)}° E
  </text>
</svg>
    `.trim();

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
