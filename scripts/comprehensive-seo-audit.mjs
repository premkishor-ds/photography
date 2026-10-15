import http from "node:http";

const BASE_URL = process.env.TEST_URL || "http://localhost:3002";

const ROUTES_TO_AUDIT = [
  { name: "Homepage", path: "/" },
  { name: "About Page", path: "/about" },
  { name: "Services Hub", path: "/services" },
  { name: "Service: Portrait", path: "/services/portrait-photography" },
  { name: "Service: Wedding", path: "/services/wedding-photography" },
  { name: "Service: Sports", path: "/services/sports-photography" },
  { name: "Portfolio Hub", path: "/portfolio" },
  { name: "Portfolio: Portraits", path: "/portfolio/portraits" },
  { name: "Portfolio: Weddings", path: "/portfolio/weddings" },
  { name: "Portfolio: Sports", path: "/portfolio/sports" },
  { name: "FAQ Page", path: "/faq" },
  { name: "Blog Hub", path: "/blog" },
  { name: "Blog: What to Wear", path: "/blog/what-to-wear-for-a-portrait-photoshoot" },
  { name: "Blog: Wedding Guide", path: "/blog/how-to-choose-a-wedding-photographer" },
  { name: "Contact Page", path: "/contact" },
  { name: "Locations Hub", path: "/locations" },
  { name: "Location: Jaipur", path: "/locations/jaipur" },
  { name: "Location: New York", path: "/locations/new-york" },
  { name: "Gear Hub", path: "/photography-gear" },
  { name: "Gear: Sony A7 V", path: "/photography-gear/sony-a7-v" },
  { name: "Gear: Sony A6000", path: "/photography-gear/sony-a6000" },
  { name: "Gear: Sony 200-600mm", path: "/photography-gear/sony-200-600mm" },
  { name: "Gear: DJI Action 6", path: "/photography-gear/dji-osmo-action-6" },
  { name: "Gear Comparison", path: "/photography-gear/comparisons/sony-200-600mm-vs-sony-100-400mm" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms & Conditions", path: "/terms-and-conditions" },
];

async function fetchHtml(urlPath) {
  const res = await fetch(`${BASE_URL}${urlPath}`);
  const html = await res.text();
  return { status: res.status, html, headers: Object.fromEntries(res.headers.entries()) };
}

function extractMeta(html) {
  // Title
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;

  // Description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
  const description = descMatch ? descMatch[1].trim() : null;

  // Canonical
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i) ||
                         html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["'][^>]*>/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : null;

  // OpenGraph
  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const ogUrlMatch = html.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["'][^>]*>/i);

  // Twitter
  const twCardMatch = html.match(/<meta[^>]*name=["']twitter:card["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const twTitleMatch = html.match(/<meta[^>]*name=["']twitter:title["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const twDescMatch = html.match(/<meta[^>]*name=["']twitter:description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const twImageMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']*)["'][^>]*>/i);

  // H1 tags
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

  // JSON-LD scripts
  const jsonLdMatches = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const schemas = [];
  for (const m of jsonLdMatches) {
    try {
      schemas.push(JSON.parse(m[1]));
    } catch {
      schemas.push({ parseError: true });
    }
  }

  // Robots meta
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const robotsMeta = robotsMatch ? robotsMatch[1].trim() : null;

  return {
    title,
    description,
    canonical,
    ogTitle: ogTitleMatch ? ogTitleMatch[1] : null,
    ogDesc: ogDescMatch ? ogDescMatch[1] : null,
    ogImage: ogImageMatch ? ogImageMatch[1] : null,
    ogUrl: ogUrlMatch ? ogUrlMatch[1] : null,
    twCard: twCardMatch ? twCardMatch[1] : null,
    twTitle: twTitleMatch ? twTitleMatch[1] : null,
    twDesc: twDescMatch ? twDescMatch[1] : null,
    twImage: twImageMatch ? twImageMatch[1] : null,
    h1Count: h1Matches.length,
    h1First: h1Matches[0] || null,
    schemas,
    robotsMeta,
  };
}

async function auditSEO() {
  console.log("==========================================================================");
  console.log(" COMPREHENSIVE ON-PAGE & TECHNICAL SEO AUDIT REPORT");
  console.log(` Target Server: ${BASE_URL}`);
  console.log("==========================================================================\n");

  let totalPages = ROUTES_TO_AUDIT.length;
  let passedPages = 0;
  let issues = [];

  for (let i = 0; i < ROUTES_TO_AUDIT.length; i++) {
    const route = ROUTES_TO_AUDIT[i];
    try {
      const { status, html } = await fetchHtml(route.path);
      const meta = extractMeta(html);

      const routeIssues = [];

      // Check Status
      if (status !== 200) {
        routeIssues.push(`HTTP status is ${status} (expected 200)`);
      }

      // Check Title
      if (!meta.title) {
        routeIssues.push("Missing <title> tag");
      } else if (meta.title.length < 20) {
        routeIssues.push(`Title too short (${meta.title.length} chars): "${meta.title}"`);
      } else if (meta.title.length > 70) {
        routeIssues.push(`Title may be truncated in SERPs (${meta.title.length} chars)`);
      }

      // Check Description
      if (!meta.description) {
        routeIssues.push("Missing meta description");
      } else if (meta.description.length < 50) {
        routeIssues.push(`Meta description too short (${meta.description.length} chars)`);
      } else if (meta.description.length > 175) {
        routeIssues.push(`Meta description exceeds 175 chars (${meta.description.length} chars)`);
      }

      // Check Canonical
      if (!meta.canonical) {
        routeIssues.push("Missing <link rel='canonical'>");
      }

      // Check H1 Count
      if (meta.h1Count === 0) {
        routeIssues.push("Missing <h1> tag");
      } else if (meta.h1Count > 1) {
        routeIssues.push(`Multiple <h1> tags found (${meta.h1Count})`);
      }

      // Check OpenGraph
      if (!meta.ogTitle) routeIssues.push("Missing og:title");
      if (!meta.ogDesc) routeIssues.push("Missing og:description");
      if (!meta.ogImage) routeIssues.push("Missing og:image");

      // Check Twitter
      if (!meta.twCard) routeIssues.push("Missing twitter:card");

      // Check Structured Data
      if (meta.schemas.length === 0) {
        routeIssues.push("No JSON-LD structured data found");
      } else {
        const hasError = meta.schemas.some(s => s.parseError);
        if (hasError) routeIssues.push("Invalid JSON-LD syntax detected");
      }

      // Check Robots
      if (meta.robotsMeta && meta.robotsMeta.toLowerCase().includes("noindex")) {
        routeIssues.push(`Warning: Page has noindex directive: "${meta.robotsMeta}"`);
      }

      const icon = routeIssues.length === 0 ? "✅ PERFECT" : (routeIssues.length <= 2 ? "⚠️ MINOR" : "❌ ISSUES");
      console.log(`[${String(i + 1).padStart(2, "0")}/${totalPages}] ${icon.padEnd(10)} | ${route.path.padEnd(46)} | Title: ${meta.title ? meta.title.substring(0, 35) + "..." : "NONE"}`);

      if (routeIssues.length > 0) {
        routeIssues.forEach(iss => console.log(`      ↳ ${iss}`));
        issues.push({ path: route.path, issues: routeIssues });
      } else {
        passedPages++;
      }
    } catch (err) {
      console.log(`[${String(i + 1).padStart(2, "0")}/${totalPages}] ❌ ERROR   | ${route.path} | ${err.message}`);
      issues.push({ path: route.path, issues: [err.message] });
    }
  }

  console.log("\n==========================================================================");
  console.log(` SUMMARY: ${passedPages}/${totalPages} pages 100% issue-free`);
  console.log(` Total Minor/Potential Enhancements Flagged: ${issues.length}`);
  console.log("==========================================================================\n");

  // Output schemas breakdown
  console.log("CHECKING STRUCTURED DATA SCHEMAS ON KEY PAGES:");
  const sampleRoutes = ["/", "/services/portrait-photography", "/photography-gear/sony-a7-v", "/about", "/faq"];
  for (const p of sampleRoutes) {
    const { html } = await fetchHtml(p);
    const meta = extractMeta(html);
    const types = meta.schemas.map(s => s["@type"] || (Array.isArray(s) ? s.map(x => x["@type"]).join(", ") : "Unknown")).join(", ");
    console.log(` • ${p.padEnd(35)} -> Schema Types: [${types}]`);
  }
}

auditSEO().catch(console.error);
