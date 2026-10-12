import http from "node:http";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const ALL_ROUTES = [
  "/",
  "/about",
  "/services",
  "/services/portrait-photography",
  "/services/wedding-photography",
  "/services/event-photography",
  "/services/sports-photography",
  "/services/commercial-photography",
  "/services/travel-and-wildlife-photography",
  "/portfolio",
  "/portfolio/portraits",
  "/portfolio/weddings",
  "/portfolio/events",
  "/portfolio/sports",
  "/portfolio/nature-wildlife",
  "/portfolio/travel",
  "/faq",
  "/blog",
  "/blog/what-to-wear-for-a-portrait-photoshoot",
  "/blog/how-to-choose-a-wedding-photographer",
  "/blog/understanding-commercial-photography-licensing",
  "/blog/capturing-high-speed-sports-action-techniques",
  "/locations",
  "/locations/jaipur",
  "/locations/new-york",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
  "/photography-gear",
  "/photography-gear/sony-a7v",
  "/photography-gear/sony-200-600mm",
  "/photography-gear/sony-fe-50mm-f18",
  "/photography-gear/dji-osmo-action-6",
  "/photography-gear/dji-mic-3",
  "/photography-gear/polarpro-quartzline-filters",
  "/photography-gear/comparisons/sony-200-600mm-vs-sony-100-400mm",
  "/photography-gear/comparisons/nd-filters-vs-cpl-filters"
];

async function fetchPage(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, options);
  const text = await res.text();
  const headers = Object.fromEntries(res.headers.entries());
  return { status: res.status, text, headers, url };
}

function extractMatches(regex, str) {
  const matches = [];
  let m;
  while ((m = regex.exec(str)) !== null) {
    matches.push(m);
  }
  return matches;
}

async function runAudit() {
  console.log("=".repeat(70));
  console.log("DEEP INDEPENDENT TECHNICAL SEO AUDIT");
  console.log(`Target: ${BASE_URL}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log("=".repeat(70));

  const findings = [];
  const addFinding = (checkId, name, severity, url, issue, recommendation, verified = false) => {
    findings.push({ checkId, name, severity, url, issue, recommendation, verified });
  };

  const pageData = new Map();

  // 1. CRAWLABILITY, STATUS CODES, HEADERS
  console.log("\n>>> AUDITING CRITERION 1, 14 & 16: Crawlability, Status Codes, HTTP Security");
  for (const path of ALL_ROUTES) {
    try {
      const res = await fetchPage(path);
      pageData.set(path, res);

      if (res.status !== 200) {
        addFinding(1, "Status Code Error", "Critical", path, `Returned HTTP ${res.status} instead of 200`, "Fix route rendering / routing logic", false);
      }

      // Check security headers
      const xfo = res.headers["x-frame-options"];
      const xcto = res.headers["x-content-type-options"];
      const referrer = res.headers["referrer-policy"];
      if (!xfo || !xcto || !referrer) {
        addFinding(16, "Security Headers Missing", "Medium", path, `Missing one or more security headers (X-Frame-Options: ${xfo}, X-Content-Type-Options: ${xcto}, Referrer-Policy: ${referrer})`, "Configure security headers in next.config.ts", false);
      }
    } catch (e) {
      addFinding(1, "Network Fetch Failed", "Critical", path, e.message, "Ensure server is running", false);
    }
  }

  // Check 404 handling
  try {
    const notFoundRes = await fetchPage("/non-existent-page-test-404-audit");
    if (notFoundRes.status !== 404) {
      addFinding(1, "404 Error Handling", "High", "/non-existent-page-test-404-audit", `Returned HTTP ${notFoundRes.status} instead of 404`, "Return proper 404 status code via Next.js not-found template", false);
    }
  } catch (e) {
    addFinding(1, "404 Check Failed", "Critical", "/non-existent-page-test-404-audit", e.message, "Inspect 404 routing", false);
  }

  // 2. UNIQUE TITLES AND META DESCRIPTIONS
  console.log("\n>>> AUDITING CRITERION 2: Unique Titles & Meta Descriptions");
  const titles = new Map();
  const descriptions = new Map();

  for (const [path, data] of pageData.entries()) {
    const titleMatch = /<title[^>]*>([^<]+)<\/title>/i.exec(data.text);
    const descMatch = /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i.exec(data.text)
      || /<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i.exec(data.text);

    if (!titleMatch) {
      addFinding(2, "Missing Title Tag", "Critical", path, "Page has no <title> element", "Export metadata.title in page template", false);
    } else {
      const title = titleMatch[1].trim();
      if (title.length < 20 || title.length > 75) {
        addFinding(2, "Sub-optimal Title Length", "Low", path, `Title length is ${title.length} chars ('${title}')`, "Keep title between 30 and 65 chars for search SERP snippet display", true);
      }
      if (titles.has(title)) {
        addFinding(2, "Duplicate Title Tag", "High", path, `Duplicate title matches ${titles.get(title)}: '${title}'`, "Ensure each page has a unique, descriptive title", false);
      } else {
        titles.set(title, path);
      }
    }

    if (!descMatch) {
      addFinding(2, "Missing Meta Description", "High", path, "Page has no meta description tag", "Export metadata.description in page template", false);
    } else {
      const desc = descMatch[1].trim();
      if (desc.length < 70 || desc.length > 200) {
        addFinding(2, "Sub-optimal Meta Description Length", "Low", path, `Description length is ${desc.length} chars`, "Maintain 120-160 characters for optimal snippet truncation", true);
      }
      if (descriptions.has(desc)) {
        addFinding(2, "Duplicate Meta Description", "High", path, `Duplicate description matches ${descriptions.get(desc)}`, "Ensure every page has unique meta description", false);
      } else {
        descriptions.set(desc, path);
      }
    }
  }

  // 3. CANONICAL URLS
  console.log("\n>>> AUDITING CRITERION 3: Canonical URLs");
  for (const [path, data] of pageData.entries()) {
    const canonicalMatch = /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i.exec(data.text)
      || /<link\s+href=["']([^"']+)["']\s+rel=["']canonical["']/i.exec(data.text);

    if (!canonicalMatch) {
      addFinding(3, "Missing Canonical URL", "High", path, "No <link rel='canonical'> element found", "Define metadata.alternates.canonical", false);
    } else {
      const canonical = canonicalMatch[1];
      if (!canonical.startsWith("https://")) {
        addFinding(3, "Non-HTTPS or Relative Canonical", "High", path, `Canonical is '${canonical}'`, "Use absolute HTTPS canonical URLs", false);
      }
      if (canonical.includes("localhost")) {
        addFinding(3, "Localhost Leaked in Canonical", "Critical", path, `Canonical contains localhost: '${canonical}'`, "Configure production domain in siteConfig", false);
      }
      // Check trailing slash consistency
      if (canonical.endsWith("/") && canonical !== "https://yourphotography.com/") {
        addFinding(3, "Trailing Slash in Subpage Canonical", "Medium", path, `Canonical has trailing slash: '${canonical}'`, "Normalize canonical URLs without trailing slash", false);
      }
    }
  }

  // 4. ROBOTS.TXT & XML SITEMAP
  console.log("\n>>> AUDITING CRITERION 4 & 12: Robots.txt, XML Sitemap, & AI Crawler Config");
  try {
    const robotsRes = await fetchPage("/robots.txt");
    if (robotsRes.status !== 200) {
      addFinding(4, "Robots.txt HTTP Failure", "Critical", "/robots.txt", `HTTP status ${robotsRes.status}`, "Ensure robots.ts returns valid response", false);
    }
    const robotsText = robotsRes.text;
    if (!robotsText.includes("Sitemap:")) {
      addFinding(4, "Sitemap Directive Missing", "High", "/robots.txt", "No Sitemap declaration in robots.txt", "Add Sitemap directive", false);
    }

    // AI crawlers inspection
    const aiBots = ["GPTBot", "ClaudeBot", "PerplexityBot"];
    for (const bot of aiBots) {
      if (!robotsText.includes(`User-Agent: ${bot}`) && !robotsText.includes(`User-agent: ${bot}`)) {
        addFinding(12, "AI Crawler Policy Undeclared", "Low", "/robots.txt", `Robots.txt does not explicitly mention ${bot}`, "Declare AI crawler policy explicitly", true);
      }
    }
  } catch (e) {
    addFinding(4, "Robots.txt Unreachable", "Critical", "/robots.txt", e.message, "Fix robots.txt", false);
  }

  try {
    const sitemapRes = await fetchPage("/sitemap.xml");
    if (sitemapRes.status !== 200) {
      addFinding(4, "Sitemap HTTP Failure", "Critical", "/sitemap.xml", `HTTP status ${sitemapRes.status}`, "Fix sitemap.ts", false);
    }
    const sitemapText = sitemapRes.text;
    const locMatches = extractMatches(/<loc>([^<]+)<\/loc>/g, sitemapText);
    const sitemapUrls = locMatches.map(m => m[1]);

    if (sitemapUrls.length < 20) {
      addFinding(4, "Incomplete Sitemap", "High", "/sitemap.xml", `Sitemap only contains ${sitemapUrls.length} URLs`, "Ensure all static, service, category, and blog pages are included", false);
    }

    // Check for broken loc in sitemap
    for (const url of sitemapUrls) {
      if (url.includes("localhost")) {
        addFinding(4, "Localhost in Sitemap", "Critical", "/sitemap.xml", `URL '${url}' contains localhost`, "Use production baseUrl in sitemap.ts", false);
      }
    }
  } catch (e) {
    addFinding(4, "Sitemap Unreachable", "Critical", "/sitemap.xml", e.message, "Fix sitemap.xml", false);
  }

  // 5. STRUCTURED DATA VALIDITY
  console.log("\n>>> AUDITING CRITERION 5: Structured Data (Schema.org JSON-LD)");
  for (const [path, data] of pageData.entries()) {
    const scriptMatches = extractMatches(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi, data.text);

    if (scriptMatches.length === 0) {
      addFinding(5, "Missing Structured Data", "Medium", path, "No application/ld+json script found", "Add relevant Schema.org JSON-LD structured data", false);
    } else {
      for (const m of scriptMatches) {
        try {
          const parsed = JSON.parse(m[1]);
          if (!parsed["@context"] || !parsed["@type"]) {
            addFinding(5, "Invalid Schema Root", "High", path, "Missing @context or @type in JSON-LD", "Ensure @context is https://schema.org and @type is valid", false);
          }
          if (parsed["@context"] !== "https://schema.org") {
            addFinding(5, "Non-standard Schema Context", "Medium", path, `@context is '${parsed["@context"]}' instead of 'https://schema.org'`, "Standardize to https://schema.org", false);
          }
        } catch (jsonErr) {
          addFinding(5, "Malformed JSON-LD Syntax", "Critical", path, `JSON.parse error: ${jsonErr.message}`, "Fix JSON syntax in structured data block", false);
        }
      }
    }
  }

  // 6. INTERNAL LINKING & ANCHOR TEXT
  console.log("\n>>> AUDITING CRITERION 6 & 14: Internal Linking & Broken Links");
  const internalLinks = new Set();
  const genericAnchors = ["click here", "here", "read more", "more", "learn more"];
  let genericAnchorCount = 0;

  for (const [path, data] of pageData.entries()) {
    const anchorMatches = extractMatches(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, data.text);
    for (const m of anchorMatches) {
      const href = m[1];
      const anchorContent = m[2].replace(/<[^>]+>/g, "").trim().toLowerCase();

      if (genericAnchors.includes(anchorContent)) {
        genericAnchorCount++;
      }

      if (href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/#") && !href.startsWith("/api/")) {
        internalLinks.add(href.split("#")[0].split("?")[0]);
      }
    }
  }

  if (genericAnchorCount > 10) {
    addFinding(6, "Repetitive Non-Descriptive Anchor Text", "Low", "Site-wide", `Found ${genericAnchorCount} generic anchor texts (e.g. 'Learn More', 'Read More')`, "Supplement generic labels with aria-label or descriptive context for accessibility & SEO", true);
  }

  // Verify internal links exist
  for (const link of internalLinks) {
    if (link === "") continue;
    try {
      const res = await fetchPage(link);
      if (res.status === 404) {
        addFinding(14, "Broken Internal Link (404)", "High", link, `Internal link target returned HTTP 404`, "Correct broken link href", false);
      }
    } catch (e) {
      addFinding(14, "Internal Link Error", "High", link, e.message, "Inspect link", false);
    }
  }

  // 7. IMAGE OPTIMIZATION & ALT TEXT
  console.log("\n>>> AUDITING CRITERION 7: Images & Alt Text");
  for (const [path, data] of pageData.entries()) {
    const imgMatches = extractMatches(/<img\s+([^>]+)>/gi, data.text);
    for (const m of imgMatches) {
      const attrs = m[1];
      const hasAlt = /alt=["']([^"']*)["']/i.exec(attrs);
      if (!hasAlt) {
        addFinding(7, "Missing Alt Attribute", "High", path, `Image element missing alt attribute entirely: <img ${attrs.slice(0, 50)}...>`, "Always provide alt attribute", false);
      } else if (hasAlt[1].trim() === "") {
        // Empty alt is acceptable only if presentation/decorative
        const role = /role=["']([^"']*)["']/i.exec(attrs);
        if (!role || role[1] !== "presentation") {
          addFinding(7, "Empty Alt Text on Non-Decorative Image", "Medium", path, `Image has empty alt="" without role="presentation"`, "Add descriptive alt text describing the image content", true);
        }
      }
    }
  }

  // 8. MOBILE USABILITY & ACCESSIBILITY
  console.log("\n>>> AUDITING CRITERION 8: Headings & Accessibility");
  for (const [path, data] of pageData.entries()) {
    const h1Matches = extractMatches(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, data.text);
    if (h1Matches.length === 0) {
      addFinding(8, "Missing H1 Heading", "High", path, "Page has zero <h1> elements", "Every page should have exactly one descriptive <h1>", false);
    } else if (h1Matches.length > 1) {
      addFinding(8, "Multiple H1 Headings", "Medium", path, `Page has ${h1Matches.length} <h1> elements`, "Maintain single <h1> heading per page", false);
    }
  }

  // 10. LOCAL SEO
  console.log("\n>>> AUDITING CRITERION 10: Local SEO");
  const hpData = pageData.get("/");
  if (hpData) {
    if (!hpData.text.includes("New York") && !hpData.text.includes("Soho")) {
      addFinding(10, "Weak Local Signals on Homepage", "Medium", "/", "Homepage text lacks physical locality keywords", "Mention NYC/SoHo service location", true);
    }
  }
  const nyPage = pageData.get("/locations/new-york");
  if (!nyPage) {
    addFinding(10, "Missing Dedicated Local Landing Page", "High", "/locations/new-york", "No local lander found for NYC", "Create dedicated local landing page", false);
  }

  // 13. LLMS.TXT
  console.log("\n>>> AUDITING CRITERION 13: llms.txt AI File");
  try {
    const llmsRes = await fetchPage("/llms.txt");
    if (llmsRes.status !== 200) {
      addFinding(13, "llms.txt Not Found", "High", "/llms.txt", `HTTP status ${llmsRes.status}`, "Provide valid llms.txt route handler", false);
    } else {
      const llmsText = llmsRes.text;
      if (!llmsText.includes("Your Photography") || !llmsText.includes("Services")) {
        addFinding(13, "Sparse llms.txt Content", "Medium", "/llms.txt", "Missing core entity or service details", "Expand llms.txt with comprehensive business context", false);
      }
    }
  } catch (e) {
    addFinding(13, "llms.txt Error", "High", "/llms.txt", e.message, "Inspect /llms.txt", false);
  }

  // 15. CONVERSION FUNCTIONALITY (API & FORMS)
  console.log("\n>>> AUDITING CRITERION 15: Conversion Endpoints & Spam Protection");
  try {
    // Test 1: Empty payload should reject with 400
    const emptyRes = await fetchPage("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });
    if (emptyRes.status !== 400) {
      addFinding(15, "Contact API Empty Submission Accepted", "High", "/api/contact", `Expected 400 for empty form, got ${emptyRes.status}`, "Reject invalid submissions with HTTP 400", false);
    }

    // Test 2: Honeypot submission should return success without sending
    const botRes = await fetchPage("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Spam Bot",
        email: "spam@bot.com",
        phone: "+15550000000",
        service: "Portrait Photography",
        preferredDate: "2026-10-15",
        message: "Spam message payload",
        website_hp: "https://spam.com"
      })
    });
    if (botRes.status !== 200) {
      addFinding(15, "Contact API Honeypot Handling Error", "High", "/api/contact", `Honeypot trap returned HTTP ${botRes.status}`, "Return 200 silent success for trapped bot inquiries", false);
    }

    // Test 3: Valid submission
    const validRes = await fetchPage("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Test Client",
        email: "client@test.com",
        phone: "+15551234567",
        service: "Sports Photography",
        preferredDate: "2026-10-20",
        message: "Auditing inquiry conversion flow"
      })
    });
    if (validRes.status !== 200) {
      addFinding(15, "Contact API Valid Submission Failed", "Critical", "/api/contact", `Valid inquiry returned HTTP ${validRes.status}`, "Fix contact API processing", false);
    }
  } catch (e) {
    addFinding(15, "Contact API Failure", "Critical", "/api/contact", e.message, "Inspect contact API route", false);
  }

  // SUMMARY REPORT
  console.log("\n" + "=".repeat(70));
  console.log(`AUDIT COMPLETE: ${findings.length} findings recorded`);
  console.log("=".repeat(70));

  const critical = findings.filter(f => f.severity === "Critical");
  const high = findings.filter(f => f.severity === "High");
  const medium = findings.filter(f => f.severity === "Medium");
  const low = findings.filter(f => f.severity === "Low");

  console.log(`CRITICAL: ${critical.length}`);
  console.log(`HIGH:     ${high.length}`);
  console.log(`MEDIUM:   ${medium.length}`);
  console.log(`LOW:      ${low.length}`);

  if (findings.length > 0) {
    console.log("\n--- DETAILED FINDINGS ---");
    for (const f of findings) {
      console.log(`[${f.severity.toUpperCase()}] (${f.name}) on ${f.url}: ${f.issue}`);
      console.log(`  -> Fix Recommendation: ${f.recommendation}`);
    }
  }

  return { total: findings.length, critical, high, medium, low, findings };
}

runAudit();
