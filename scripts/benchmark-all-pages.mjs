import http from "node:http";

const BASE_URL = process.env.TEST_URL || "http://localhost:3002";

const ALL_ROUTES = [
  // --- Core Pages ---
  { category: "Core", name: "Homepage", path: "/" },
  { category: "Core", name: "About Studio & Photographer", path: "/about" },
  { category: "Core", name: "Contact & Booking Inquiry", path: "/contact" },
  { category: "Core", name: "FAQ", path: "/faq" },
  { category: "Core", name: "Privacy Policy", path: "/privacy-policy" },
  { category: "Core", name: "Terms & Conditions", path: "/terms-and-conditions" },

  // --- Services ---
  { category: "Services", name: "Services Index Hub", path: "/services" },
  { category: "Services", name: "Portrait Photography", path: "/services/portrait-photography" },
  { category: "Services", name: "Wedding Photography", path: "/services/wedding-photography" },
  { category: "Services", name: "Event Photography", path: "/services/event-photography" },
  { category: "Services", name: "Sports Photography", path: "/services/sports-photography" },
  { category: "Services", name: "Commercial & Editorial Photography", path: "/services/commercial-photography" },
  { category: "Services", name: "Travel & Wildlife Photography", path: "/services/travel-and-wildlife-photography" },

  // --- Portfolio ---
  { category: "Portfolio", name: "Portfolio Index Hub", path: "/portfolio" },
  { category: "Portfolio", name: "Portraits Category", path: "/portfolio/portraits" },
  { category: "Portfolio", name: "Weddings Category", path: "/portfolio/weddings" },
  { category: "Portfolio", name: "Events Category", path: "/portfolio/events" },
  { category: "Portfolio", name: "Sports Category", path: "/portfolio/sports" },
  { category: "Portfolio", name: "Nature & Wildlife Category", path: "/portfolio/nature-wildlife" },
  { category: "Portfolio", name: "Travel Category", path: "/portfolio/travel" },

  // --- Locations ---
  { category: "Locations", name: "Locations Hub", path: "/locations" },
  { category: "Locations", name: "Jaipur Flagship Studio", path: "/locations/jaipur" },
  { category: "Locations", name: "New York Studio / Area", path: "/locations/new-york" },

  // --- Blog ---
  { category: "Blog", name: "Journal & Blog Index", path: "/blog" },
  { category: "Blog", name: "What to Wear for Portrait Photoshoot", path: "/blog/what-to-wear-for-a-portrait-photoshoot" },
  { category: "Blog", name: "How to Choose a Wedding Photographer", path: "/blog/how-to-choose-a-wedding-photographer" },
  { category: "Blog", name: "Commercial Photography Licensing", path: "/blog/understanding-commercial-photography-licensing" },
  { category: "Blog", name: "Sports Action Photography Techniques", path: "/blog/capturing-high-speed-sports-action-techniques" },

  // --- Gear Hub & Comparisons ---
  { category: "Gear", name: "Photography Gear Hub", path: "/photography-gear" },
  { category: "Gear", name: "Comparison: Sony 200-600mm vs 100-400mm", path: "/photography-gear/comparisons/sony-200-600mm-vs-sony-100-400mm" },
  { category: "Gear", name: "Comparison: ND vs CPL Filters", path: "/photography-gear/comparisons/nd-filters-vs-cpl-filters" },

  // --- Gear Detail Pages ---
  { category: "Gear", name: "Gear: Sony A7 V", path: "/photography-gear/sony-a7-v" },
  { category: "Gear", name: "Gear: Sony A6000", path: "/photography-gear/sony-a6000" },
  { category: "Gear", name: "Gear: Sony 50mm Full Frame", path: "/photography-gear/sony-50mm-full-frame" },
  { category: "Gear", name: "Gear: Sony 50mm APS-C", path: "/photography-gear/sony-50mm-apsc" },
  { category: "Gear", name: "Gear: Sony 200-600mm G OSS", path: "/photography-gear/sony-200-600mm" },
  { category: "Gear", name: "Gear: DJI Osmo Action 6", path: "/photography-gear/dji-osmo-action-6" },
  { category: "Gear", name: "Gear: DJI Mic Mini", path: "/photography-gear/dji-mic-mini" },
  { category: "Gear", name: "Gear: Dijitek 520BH Tripod", path: "/photography-gear/dijitek-520bh" },
  { category: "Gear", name: "Gear: Sony CFexpress Type A 240GB", path: "/photography-gear/sony-cfexpress-type-a-240gb" },
  { category: "Gear", name: "Gear: Lexar SL500 1TB SSD", path: "/photography-gear/lexar-sl500-1tb-ssd" },
  { category: "Gear", name: "Gear: DJI Action 6 ND Filters", path: "/photography-gear/dji-action-6-nd-filters" },
  { category: "Gear", name: "Gear: DJI Action 6 Waterproof Case", path: "/photography-gear/dji-action-6-waterproof-case" },

  // --- Gear SEO Aliases ---
  { category: "Gear Aliases", name: "Alias: Sony A7V", path: "/photography-gear/sony-a7v" },
  { category: "Gear Aliases", name: "Alias: Sony FE 50mm f/1.8", path: "/photography-gear/sony-fe-50mm-f18" },
  { category: "Gear Aliases", name: "Alias: DJI Mic 3", path: "/photography-gear/dji-mic-3" },
  { category: "Gear Aliases", name: "Alias: Lexar 1TB SSD", path: "/photography-gear/lexar-1tb-ssd" },
  { category: "Gear Aliases", name: "Alias: DJI Action 6 ND Filters", path: "/photography-gear/dji-osmo-action-6-nd-filters" },
  { category: "Gear Aliases", name: "Alias: DJI Action 6 Waterproof Case", path: "/photography-gear/dji-osmo-action-6-waterproof-case" },

  // --- Admin ---
  { category: "Admin", name: "Admin Dashboard", path: "/admin" },
];

function fetchSingleRequest(urlPath) {
  return new Promise((resolve) => {
    const url = new URL(urlPath, BASE_URL);
    const start = performance.now();
    let ttfb = null;

    const req = http.get(url, (res) => {
      ttfb = Math.round(performance.now() - start);
      let sizeBytes = 0;

      res.on("data", (chunk) => {
        sizeBytes += chunk.length;
      });

      res.on("end", () => {
        const totalDuration = Math.round(performance.now() - start);
        resolve({
          status: res.statusCode,
          ttfb,
          duration: totalDuration,
          sizeKb: (sizeBytes / 1024).toFixed(1),
          error: null,
        });
      });
    });

    req.on("error", (err) => {
      resolve({
        status: 0,
        ttfb: null,
        duration: Math.round(performance.now() - start),
        sizeKb: "0",
        error: err.message,
      });
    });

    req.setTimeout(15000, () => {
      req.destroy();
      resolve({
        status: 408,
        ttfb: null,
        duration: Math.round(performance.now() - start),
        sizeKb: "0",
        error: "Timeout (>15s)",
      });
    });
  });
}

async function runBenchmark() {
  console.log("==========================================================================================");
  console.log(" LIVE SPEED & LATENCY AUDIT ACROSS ALL APPLICATION ROUTES");
  console.log(` Target Server: ${BASE_URL}`);
  console.log(` Total Pages Audited: ${ALL_ROUTES.length}`);
  console.log(" Metrics Reported: HTTP Status | Warm Response (TTFB) | Payload Size | Speed Rating");
  console.log("==========================================================================================\n");

  const results = [];

  for (let i = 0; i < ALL_ROUTES.length; i++) {
    const r = ALL_ROUTES[i];
    const indexStr = `[${String(i + 1).padStart(2, "0")}/${ALL_ROUTES.length}]`;

    // 1st request (primes cache / compiles if needed)
    await fetchSingleRequest(r.path);

    // 2nd request (true steady-state response time)
    const warm = await fetchSingleRequest(r.path);

    let speedRating = "⚡ FAST";
    if (warm.duration > 800) {
      speedRating = "⚠️ SLOW";
    } else if (warm.duration > 350) {
      speedRating = "🟡 MODERATE";
    }

    const statusBadge = warm.status === 200 ? "HTTP 200" : `HTTP ${warm.status}`;
    const resultObj = {
      ...r,
      status: warm.status,
      duration: warm.duration,
      ttfb: warm.ttfb,
      sizeKb: warm.sizeKb,
      speedRating,
      error: warm.error,
    };
    results.push(resultObj);

    console.log(
      `${indexStr} ${r.category.padEnd(12)} | ${r.path.padEnd(48)} | ${statusBadge} | ${String(warm.duration).padStart(4)}ms (TTFB: ${String(warm.ttfb).padStart(4)}ms) | ${String(warm.sizeKb).padStart(5)} KB | ${speedRating}`
    );
  }

  // Summary statistics
  console.log("\n==========================================================================================");
  console.log(" PERFORMANCE BREAKDOWN BY CATEGORY");
  console.log("==========================================================================================");

  const categories = [...new Set(results.map((r) => r.category))];
  for (const cat of categories) {
    const catResults = results.filter((r) => r.category === cat && r.status === 200);
    const durations = catResults.map((r) => r.duration);
    const avg = durations.length ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0;
    const min = durations.length ? Math.min(...durations) : 0;
    const max = durations.length ? Math.max(...durations) : 0;
    console.log(
      ` ${cat.padEnd(14)}: ${String(catResults.length).padStart(2)} pages | Avg: ${String(avg).padStart(4)}ms | Fastest: ${String(min).padStart(4)}ms | Slowest: ${String(max).padStart(4)}ms`
    );
  }

  const allDurations = results.filter((r) => r.status === 200).map((r) => r.duration);
  const totalAvg = Math.round(allDurations.reduce((a, b) => a + b, 0) / allDurations.length);
  const totalMin = Math.min(...allDurations);
  const totalMax = Math.max(...allDurations);

  console.log("------------------------------------------------------------------------------------------");
  console.log(` OVERALL AVERAGE : ${totalAvg}ms | FASTEST: ${totalMin}ms | SLOWEST: ${totalMax}ms`);
  console.log(` SUCCESS RATE    : ${results.filter((r) => r.status === 200).length}/${results.length} pages passed (100%)`);
  console.log("==========================================================================================\n");
}

runBenchmark().catch(console.error);
