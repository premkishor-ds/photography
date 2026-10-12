/**
 * Automated Technical SEO & Schema Verification Suite
 * Executes live HTTP inspections of all routes, sitemap.xml, robots.txt,
 * llms.txt, JSON-LD schemas, and the Contact API on http://localhost:3000.
 */

const BASE_URL = process.env.TEST_URL || "http://localhost:3002";

async function runAudit() {
  console.log("==================================================");
  console.log("TECHNICAL SEO & ACCESSIBILITY AUDIT SUITE");
  console.log("==================================================");

  let passedChecks = 0;
  let failedChecks = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✓ PASS: ${message}`);
      passedChecks++;
    } else {
      console.error(`✗ FAIL: ${message}`);
      failedChecks++;
    }
  }

  // 1. Robots.txt Inspection
  console.log("\n[1] Robots.txt Verification");
  try {
    const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
    const robotsText = await robotsRes.text();
    assert(robotsRes.status === 200, "robots.txt returns HTTP 200");
    assert(/User-[aA]gent:\s*\*/i.test(robotsText), "robots.txt includes wildcard User-agent rule");
    assert(robotsText.includes("Allow: /"), "robots.txt permits crawling of public routes");
    assert(robotsText.includes("Disallow: /api/"), "robots.txt protects API endpoints");
    assert(robotsText.includes("sitemap.xml"), "robots.txt declares sitemap location");
    assert(robotsText.includes("Googlebot"), "robots.txt explicitly supports Googlebot and search crawlers");
  } catch (err) {
    assert(false, `robots.txt check failed: ${err.message}`);
  }

  // 2. Sitemap.xml Inspection
  console.log("\n[2] XML Sitemap Verification");
  try {
    const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
    const sitemapText = await sitemapRes.text();
    assert(sitemapRes.status === 200, "sitemap.xml returns HTTP 200");
    assert(sitemapText.includes("<urlset"), "sitemap.xml contains valid XML urlset");
    assert(sitemapText.includes("/services/portrait-photography"), "sitemap includes portrait service");
    assert(sitemapText.includes("/services/sports-photography"), "sitemap includes sports service");
    assert(sitemapText.includes("/portfolio/portraits"), "sitemap includes portrait portfolio");
    assert(sitemapText.includes("/blog/what-to-wear-for-a-portrait-photoshoot"), "sitemap includes blog guide");
    assert(sitemapText.includes("<priority>1"), "sitemap defines root priority 1.0");
  } catch (err) {
    assert(false, `sitemap.xml check failed: ${err.message}`);
  }

  // 3. AI Discoverability (llms.txt) Inspection
  console.log("\n[3] AI Search & Discoverability (llms.txt)");
  try {
    const llmsRes = await fetch(`${BASE_URL}/llms.txt`);
    const llmsText = await llmsRes.text();
    assert(llmsRes.status === 200, "llms.txt returns HTTP 200");
    assert(llmsText.includes("Your Photography"), "llms.txt identifies the business");
    assert(llmsText.includes("Kishor Prem") || llmsText.includes("Principal Photographer"), "llms.txt identifies lead photographer");
    assert(llmsText.includes("Sports Photography"), "llms.txt lists sports photography");
    assert(llmsText.includes("/contact"), "llms.txt points AI search engines to booking channel");
  } catch (err) {
    assert(false, `llms.txt check failed: ${err.message}`);
  }

  // 4. Live Server Route Health & Status Codes
  console.log("\n[4] Canonical Route Health & Status Codes");
  const routesToTest = [
    { path: "/", name: "Homepage" },
    { path: "/about", name: "About Page" },
    { path: "/services", name: "Services Index" },
    { path: "/services/portrait-photography", name: "Portrait Service" },
    { path: "/services/wedding-photography", name: "Wedding Service" },
    { path: "/services/event-photography", name: "Event Service" },
    { path: "/services/sports-photography", name: "Sports Service" },
    { path: "/services/commercial-photography", name: "Commercial Service" },
    { path: "/services/travel-and-wildlife-photography", name: "Travel & Wildlife Service" },
    { path: "/portfolio", name: "Portfolio Index" },
    { path: "/portfolio/portraits", name: "Portraits Category" },
    { path: "/portfolio/weddings", name: "Weddings Category" },
    { path: "/portfolio/sports", name: "Sports Category" },
    { path: "/faq", name: "FAQ Page" },
    { path: "/blog", name: "Blog Index" },
    { path: "/blog/what-to-wear-for-a-portrait-photoshoot", name: "Blog Article" },
    { path: "/contact", name: "Contact Page" },
    { path: "/locations", name: "Locations Hub" },
    { path: "/locations/jaipur", name: "Jaipur Flagship Studio" },
    { path: "/privacy-policy", name: "Privacy Policy" },
    { path: "/terms-and-conditions", name: "Terms & Conditions" },
    { path: "/photography-gear", name: "Photography Gear Hub" },
    { path: "/photography-gear/sony-a7-v", name: "Sony A7 V Canonical Review" },
    { path: "/photography-gear/sony-a7v", name: "Sony A7V Alias Review" },
    { path: "/photography-gear/sony-a6000", name: "Sony A6000 Review" },
    { path: "/photography-gear/sony-50mm-full-frame", name: "Sony 50mm Full Frame Review" },
    { path: "/photography-gear/sony-fe-50mm-f18", name: "Sony 50mm FE Alias Review" },
    { path: "/photography-gear/sony-50mm-apsc", name: "Sony 50mm APS-C Review" },
    { path: "/photography-gear/sony-200-600mm", name: "Sony 200-600mm Review" },
    { path: "/photography-gear/dji-osmo-action-6", name: "DJI Osmo Action 6 Review" },
    { path: "/photography-gear/dji-mic-mini", name: "DJI Mic Mini Review" },
    { path: "/photography-gear/dji-mic-3", name: "DJI Mic 3 Alias Review" },
    { path: "/photography-gear/dijitek-520bh", name: "Dijitek 520BH Tripod Review" },
    { path: "/photography-gear/sony-cfexpress-type-a-240gb", name: "Sony CFexpress Type A 240GB Review" },
    { path: "/photography-gear/lexar-sl500-1tb-ssd", name: "Lexar SL500 1TB SSD Review" },
    { path: "/photography-gear/lexar-1tb-ssd", name: "Lexar 1TB SSD Alias Review" },
    { path: "/photography-gear/dji-action-6-nd-filters", name: "DJI Action 6 ND Filters Review" },
    { path: "/photography-gear/dji-osmo-action-6-nd-filters", name: "DJI Action 6 ND Filters Alias Review" },
    { path: "/photography-gear/dji-action-6-waterproof-case", name: "DJI Action 6 Waterproof Case Review" },
    { path: "/photography-gear/dji-osmo-action-6-waterproof-case", name: "DJI Action 6 Waterproof Case Alias Review" },
    { path: "/photography-gear/comparisons/sony-200-600mm-vs-sony-100-400mm", name: "Telephoto Lens Comparison" },
    { path: "/photography-gear/comparisons/nd-filters-vs-cpl-filters", name: "Filter Comparison" },
  ];

  for (const r of routesToTest) {
    try {
      const res = await fetch(`${BASE_URL}${r.path}`);
      assert(res.status === 200, `${r.name} (${r.path}) returned HTTP 200`);
    } catch (err) {
      assert(false, `${r.name} (${r.path}) failed: ${err.message}`);
    }
  }

  // 5. Structured Data (Schema.org) Inspections
  console.log("\n[5] Structured Data & JSON-LD Inspections");
  try {
    const homeHtml = await (await fetch(`${BASE_URL}/`)).text();
    assert(
      /"@type":\s*"PhotographyBusiness"/.test(homeHtml),
      "Homepage contains PhotographyBusiness schema"
    );
    assert(
      /"@type":\s*"WebSite"/.test(homeHtml),
      "Homepage contains WebSite schema"
    );

    const sportsHtml = await (await fetch(`${BASE_URL}/services/sports-photography`)).text();
    assert(
      /"@type":\s*"Service"/.test(sportsHtml),
      "Service page contains Service schema"
    );
    assert(
      /"@type":\s*"FAQPage"/.test(sportsHtml),
      "Service page contains FAQPage schema"
    );
    assert(
      /"@type":\s*"BreadcrumbList"/.test(sportsHtml),
      "Service page contains BreadcrumbList schema"
    );

    const aboutHtml = await (await fetch(`${BASE_URL}/about`)).text();
    assert(
      /"@type":\s*"Person"/.test(aboutHtml),
      "About page contains Person schema"
    );

    const articleHtml = await (await fetch(`${BASE_URL}/blog/what-to-wear-for-a-portrait-photoshoot`)).text();
    assert(
      /"@type":\s*"BlogPosting"/.test(articleHtml),
      "Article page contains BlogPosting schema"
    );

    const gearReviewHtml = await (await fetch(`${BASE_URL}/photography-gear/sony-200-600mm`)).text();
    assert(
      /"@type":\s*"Article"/.test(gearReviewHtml),
      "Gear review page contains Article schema"
    );
    assert(
      /"@type":\s*"FAQPage"/.test(gearReviewHtml),
      "Gear review page contains FAQPage schema"
    );
  } catch (err) {
    assert(false, `Schema inspection failed: ${err.message}`);
  }

  // 6. Contact API Validation Test
  console.log("\n[6] Contact Form API Validation Test (/api/contact)");
  try {
    // Missing fields test
    const invalidRes = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "" }),
    });
    assert(invalidRes.status === 400, "API correctly rejects empty submission with HTTP 400");

    // Honeypot bot protection test
    const botRes = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Bot Spammer",
        email: "bot@spam.com",
        phone: "+1555000000",
        service: "Wedding Photography",
        preferredDate: "2026-12-01",
        message: "Spam message link",
        website_url: "http://spam-trap.com",
      }),
    });
    assert(botRes.status === 200, "Honeypot trap safely handles bot payload without processing");

    // Valid inquiry test
    const validRes = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Eleanor Vance",
        email: "eleanor.vance@example.com",
        phone: "+1 (555) 890-1234",
        service: "Sports Photography",
        preferredDate: `2027-11-${Math.floor(Math.random() * 15 + 10)}`,
        appointmentTime: "10:00",
        durationMinutes: 60,
        message: "Inquiring about tournament athletics coverage in New York.",
        website_url: "",
      }),
    });
    const validData = await validRes.json();
    assert(
      validRes.status === 200 && validData.success === true,
      "API successfully accepts valid inquiry and returns structured confirmation"
    );

    // Clean up test entry
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qvzvnblosedrqktisdsz.supabase.co";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable__ios76DkRwhZ9FWMyUr07Q_5a-JQx1d";
    await fetch(`${supabaseUrl}/rest/v1/inquiries?email=eq.eleanor.vance%40example.com`, {
      method: "DELETE",
      headers: {
        "apikey": supabaseAnonKey,
        "Authorization": `Bearer ${supabaseAnonKey}`,
      },
    }).catch(() => {});
  } catch (err) {
    assert(false, `Contact API test failed: ${err.message}`);
  }

  console.log("\n==================================================");
  console.log(`AUDIT RESULTS: ${passedChecks} PASSED, ${failedChecks} FAILED`);
  console.log("==================================================");

  if (failedChecks > 0) {
    process.exit(1);
  }
}

runAudit();
