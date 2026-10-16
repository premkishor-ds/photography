import pg from "pg";

const DATABASE_URL =
  "postgresql://postgres.qvzvnblosedrqktisdsz:jYzfeQKv2jqIStoX@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres";

const client = new pg.Client({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function run() {
  await client.connect();

  console.log("=================================================================");
  console.log(" SUPABASE DATABASE: COMPLETE AUDIT FOR ANY PERSONAL NAMES");
  console.log("=================================================================\n");

  // 1. Studio Settings
  console.log("--- 1. TABLE: studio_settings ---");
  const settingsRes = await client.query("SELECT * FROM studio_settings");
  for (const row of settingsRes.rows) {
    console.log(`studio_name: "${row.studio_name}"`);
    console.log(`photographer_name: "${row.photographer_name}"`);
    console.log(`photographer_role: "${row.photographer_role}"`);
    console.log(`email: "${row.email}"`);
    console.log(`tagline: "${row.tagline}"`);
    console.log(`subtagline: "${row.subtagline}"`);
    console.log(`bio_1: "${row.photographer_bio_1?.substring(0, 80)}..."`);
    console.log(`bio_2: "${row.photographer_bio_2?.substring(0, 80)}..."`);
    console.log(`quote: "${row.photographer_quote}"`);
  }

  // 2. Blog Posts
  console.log("\n--- 2. TABLE: blog_posts ---");
  const blogRes = await client.query("SELECT id, title, author, author_role FROM blog_posts");
  blogRes.rows.forEach((r) => {
    console.log(`[${r.id}] Title: "${r.title}" | Author: "${r.author}" | Role: "${r.author_role}"`);
  });

  // 3. Inquiries
  console.log("\n--- 3. TABLE: inquiries ---");
  const inqRes = await client.query("SELECT id, name, email, service FROM inquiries");
  inqRes.rows.forEach((r) => {
    console.log(`[${r.id}] Name: "${r.name}" | Email: "${r.email}" | Service: "${r.service}"`);
  });

  // 4. Portfolio Items
  console.log("\n--- 4. TABLE: portfolio_items ---");
  const portRes = await client.query("SELECT id, title, location FROM portfolio_items");
  portRes.rows.forEach((r) => {
    console.log(`[${r.id}] Title: "${r.title}" | Loc: "${r.location}"`);
  });

  // 5. Services
  console.log("\n--- 5. TABLE: services ---");
  const srvRes = await client.query("SELECT id, title, tagline FROM services");
  srvRes.rows.forEach((r) => {
    console.log(`[${r.id}] Title: "${r.title}" | Tagline: "${r.tagline}"`);
  });

  // 6. FAQs
  console.log("\n--- 6. TABLE: faqs ---");
  const faqRes = await client.query("SELECT id, question FROM faqs");
  faqRes.rows.forEach((r) => {
    console.log(`[${r.id}] Q: "${r.question}"`);
  });

  // 7. Gear Items
  console.log("\n--- 7. TABLE: gear_items ---");
  const gearRes = await client.query("SELECT id, name, category FROM gear_items");
  gearRes.rows.forEach((r) => {
    console.log(`[${r.id}] Name: "${r.name}" | Category: "${r.category}"`);
  });

  // 8. AI Chat Logs
  console.log("\n--- 8. TABLE: ai_chat_logs ---");
  const logsRes = await client.query("SELECT id, user_message, bot_response FROM ai_chat_logs");
  let personalInLogs = 0;
  logsRes.rows.forEach((r) => {
    const combined = r.user_message + " " + r.bot_response;
    if (/kishor|prem|किशोर|प्रेम|kara|wilson/i.test(combined)) {
      personalInLogs++;
      console.log(`  Log [${r.id}]:`);
      console.log(`    User: "${r.user_message}"`);
      console.log(`    Bot : "${r.bot_response.substring(0, 100)}..."`);
    }
  });
  console.log(`Total logs: ${logsRes.rows.length}, logs with personal names: ${personalInLogs}`);

  await client.end();
}

run().catch(console.error);
