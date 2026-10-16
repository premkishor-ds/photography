const BASE_URL = "http://localhost:3002";

const TEST_QUERIES = [
  {
    id: "Q1",
    category: "Delivery & Turnaround",
    language: "en",
    query: "How long does it take to receive our final retouched photos, and is expedited delivery available?",
    expectedKeywords: ["days", "delivery", "retouch", "turnaround"],
  },
  {
    id: "Q2",
    category: "Retainer & Weather Policy",
    language: "en",
    query: "What is your booking retainer policy and what happens if our outdoor shoot is hit by bad weather?",
    expectedKeywords: ["retainer", "weather", "reschedul"],
  },
  {
    id: "Q3",
    category: "Camera Equipment",
    language: "en",
    query: "What camera bodies and lenses do you shoot with for wildlife and portrait work?",
    expectedKeywords: ["sony", "50mm", "200-600mm"],
  },
  {
    id: "Q4",
    category: "Destination Coverage",
    language: "en",
    query: "Do you travel outside Jaipur to places like Udaipur, Jodhpur, or New York?",
    expectedKeywords: ["jaipur", "udaipur", "rajasthan", "destination"],
  },
  {
    id: "Q5",
    category: "Hindi Portrait Booking",
    language: "hi",
    query: "मुझे अपने परिवार के लिए एक पोर्ट्रेट फोटोशूट बुक करना है। इसके लिए क्या प्रक्रिया है?",
    expectedKeywords: ["सत्र", "बुकिंग", "पोर्ट्रेट"],
  },
  {
    id: "Q6",
    category: "Hinglish Wedding Rates & Duration",
    language: "en",
    query: "Wedding photography ke packages kya hain aur minimum booking duration kitni hoti hai?",
    expectedKeywords: ["wedding", "60", "minute"],
  },
  {
    id: "Q7",
    category: "Policy Enforcement (Sub-60 min check)",
    language: "en",
    query: "Can I book a quick 20-minute session for ₹500?",
    expectedKeywords: ["60", "minute", "minimum"],
  },
];

async function runTests() {
  console.log("==========================================================");
  console.log(" MULTI-QUERY AI CHATBOT VALIDATION & STRESS TEST");
  console.log(" Target: " + BASE_URL + "/api/ai/chat");
  console.log(` Running ${TEST_QUERIES.length} diverse queries...`);
  console.log("==========================================================\n");

  const results = [];

  for (let i = 0; i < TEST_QUERIES.length; i++) {
    const t = TEST_QUERIES[i];
    console.log(`[${i + 1}/${TEST_QUERIES.length}] Testing: "${t.query}"`);
    console.log(`     Category: ${t.category} | Language: ${t.language}`);

    const startTime = Date.now();
    try {
      const res = await fetch(`${BASE_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: t.query }],
          session_id: `test-multi-${t.id}-${Date.now()}`,
          language: t.language,
          page_url: "/",
        }),
      });

      const data = await res.json();
      const clientDuration = Date.now() - startTime;

      if (!res.ok || !data.success) {
        console.error(`     ❌ FAILED: ${data.error || res.statusText}`);
        results.push({ ...t, success: false, error: data.error });
        continue;
      }

      const responseText = data.message?.content || "";
      const modelUsed = data.model_used;
      const latencyMs = data.latency_ms;

      // Check for forbidden personal names
      const hasForbiddenNames =
        /kishor\s*prem/i.test(responseText) ||
        /prem\s*kishor/i.test(responseText) ||
        /किशोर\s*प्रेम/.test(responseText) ||
        /प्रेम\s*किशोर/.test(responseText);

      // Check expected keywords
      const lowerResp = responseText.toLowerCase();
      const matchedKeywords = t.expectedKeywords.filter((k) =>
        lowerResp.includes(k.toLowerCase())
      );

      console.log(`     ✓ Status: SUCCESS`);
      console.log(`     ✓ Model: ${modelUsed} (Backend: ${latencyMs}ms, Total: ${clientDuration}ms)`);
      console.log(`     ✓ Generic Naming Pass: ${!hasForbiddenNames ? "PASS (Zero personal names)" : "FAIL"}`);
      console.log(`     ✓ Key Info Matches: ${matchedKeywords.join(", ")}`);
      console.log(`     Response Snippet: "${responseText.substring(0, 160).replace(/\n/g, " ")}..."\n`);

      results.push({
        ...t,
        success: true,
        modelUsed,
        latencyMs,
        clientDuration,
        hasForbiddenNames,
        matchedKeywordsCount: matchedKeywords.length,
        logId: data.log_id,
      });
    } catch (err) {
      console.error(`     ❌ EXCEPTION: ${err.message}\n`);
      results.push({ ...t, success: false, error: err.message });
    }
  }

  // Verify Admin Logs
  console.log("==========================================================");
  console.log(" VERIFYING ADMIN LOGGING & ANALYTICS PERSISTENCE");
  console.log(" Target: " + BASE_URL + "/api/admin/ai/logs");
  console.log("==========================================================");

  try {
    const adminRes = await fetch(`${BASE_URL}/api/admin/ai/logs?limit=20`);
    const adminData = await adminRes.json();

    if (adminData.success) {
      console.log(`✓ Total Logs Recorded in DB: ${adminData.analytics.totalLogs}`);
      console.log(`✓ Total Unique Sessions: ${adminData.analytics.totalSessions}`);
      console.log(`✓ Average Latency: ${adminData.analytics.avgLatency}ms`);
      console.log(`✓ Detected Intents:`, adminData.analytics.intentBreakdown);
      console.log(`✓ Models Distributed:`, adminData.analytics.modelBreakdown);
    } else {
      console.error("❌ Admin logs verification failed:", adminData.error);
    }
  } catch (err) {
    console.error("❌ Admin logs fetch exception:", err.message);
  }

  console.log("\n==========================================================");
  console.log(" TEST SUMMARY REPORT");
  console.log("==========================================================");
  const successCount = results.filter((r) => r.success).length;
  console.log(` Total Queries Executed : ${TEST_QUERIES.length}`);
  console.log(` Successful Responses   : ${successCount}`);
  console.log(` Failed Responses       : ${TEST_QUERIES.length - successCount}`);
  console.log(` Generic Naming Violations: ${results.filter((r) => r.hasForbiddenNames).length}`);
  console.log("==========================================================\n");
}

runTests();
