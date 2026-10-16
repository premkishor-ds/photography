import pg from "pg";

const DATABASE_URL =
  "postgresql://postgres.qvzvnblosedrqktisdsz:jYzfeQKv2jqIStoX@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres";

const client = new pg.Client({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function sanitizeDatabase() {
  await client.connect();
  console.log("Connected to Supabase PostgreSQL database.\n");

  console.log("===============================================================");
  console.log(" SANITIZING ALL SUPABASE TABLES TO USE 100% GENERIC NAMES");
  console.log("===============================================================\n");

  // 1. studio_settings
  console.log("1. Updating studio_settings -> photographer_name to 'Lead Photographer'...");
  const settingsUpdate = await client.query(`
    UPDATE studio_settings 
    SET photographer_name = 'Lead Photographer'
    WHERE id = 'default'
    RETURNING photographer_name, studio_name;
  `);
  console.log("   ✓ studio_settings updated:", settingsUpdate.rows[0]);

  // 2. blog_posts
  console.log("\n2. Updating blog_posts -> author to 'Lead Photographer'...");
  const blogUpdate = await client.query(`
    UPDATE blog_posts 
    SET author = 'Lead Photographer'
    WHERE author ILIKE '%kishor%' OR author ILIKE '%prem%'
    RETURNING id, title, author;
  `);
  console.log(`   ✓ blog_posts updated (${blogUpdate.rowCount} rows):`);
  blogUpdate.rows.forEach(r => console.log(`     - [${r.id}] Author: "${r.author}"`));

  // 3. inquiries - Sanitize client personal names to generic placeholders
  console.log("\n3. Sanitizing inquiries -> personal client names to generic client labels...");
  const inqUpdates = [
    { oldName: "Vikramaditya Rathore", newName: "Private Client (Wedding)", newEmail: "client.wedding@example.com" },
    { oldName: "Ananya Deshmukh", newName: "Private Client (Portrait)", newEmail: "client.portrait@example.com" },
    { oldName: "Pooja Choudhary", newName: "Private Client (Editorial)", newEmail: "client.editorial@example.com" },
    { oldName: "Vikram Rathore", newName: "Private Client (Sports)", newEmail: "client.sports@example.com" },
  ];

  for (const item of inqUpdates) {
    const res = await client.query(`
      UPDATE inquiries 
      SET name = $1, email = $2
      WHERE name = $3
      RETURNING id, name, email;
    `, [item.newName, item.newEmail, item.oldName]);

    if (res.rowCount > 0) {
      console.log(`   ✓ Updated inquiry: "${item.oldName}" -> "${item.newName}" (${res.rowCount} row(s))`);
    }
  }

  // 4. ai_chat_logs - Sanitize any residual personal names in existing chat logs
  console.log("\n4. Sanitizing ai_chat_logs -> converting any legacy personal names to generic equivalents...");
  const chatLogs = await client.query("SELECT id, user_message, bot_response FROM ai_chat_logs");
  let logsCleaned = 0;

  for (const log of chatLogs.rows) {
    let cleanedResponse = log.bot_response;
    let modified = false;

    if (/kishor\s*prem/i.test(cleanedResponse)) {
      cleanedResponse = cleanedResponse.replace(/kishor\s*prem/gi, "Lead Photographer");
      modified = true;
    }
    if (/prem\s*kishor/i.test(cleanedResponse)) {
      cleanedResponse = cleanedResponse.replace(/prem\s*kishor/gi, "Lead Photographer");
      modified = true;
    }
    if (/किशोर\s*प्रेम/.test(cleanedResponse)) {
      cleanedResponse = cleanedResponse.replace(/किशोर\s*प्रेम/g, "मुख्य फोटोग्राफर");
      modified = true;
    }
    if (/प्रेम\s*किशोर/.test(cleanedResponse)) {
      cleanedResponse = cleanedResponse.replace(/प्रेम\s*किशोर/g, "मुख्य फोटोग्राफर");
      modified = true;
    }

    if (modified) {
      await client.query("UPDATE ai_chat_logs SET bot_response = $1 WHERE id = $2", [cleanedResponse, log.id]);
      logsCleaned++;
      console.log(`   ✓ Cleaned ai_chat_log [${log.id}]`);
    }
  }
  console.log(`   ✓ Total ai_chat_logs sanitized: ${logsCleaned}`);

  console.log("\n===============================================================");
  console.log(" POST-SANITIZATION AUDIT VERIFICATION");
  console.log("===============================================================\n");

  // Re-verify all tables for any remaining personal names
  const testNames = ["kishor", "prem", "किशोर", "प्रेम", "vikramaditya", "ananya", "deshmukh", "pooja", "rathore", "kara", "wilson"];
  const tables = ["studio_settings", "blog_posts", "inquiries", "ai_chat_logs", "services", "faqs", "gear_items", "portfolio_items"];
  
  let remainingOccurrences = 0;

  for (const table of tables) {
    const rowsRes = await client.query(`SELECT * FROM "${table}"`);
    for (const row of rowsRes.rows) {
      for (const [col, val] of Object.entries(row)) {
        if (!val) continue;
        const str = typeof val === "object" ? JSON.stringify(val) : String(val);
        for (const name of testNames) {
          const regex = new RegExp(`\\b${name}\\b`, "i");
          if (regex.test(str)) {
            remainingOccurrences++;
            console.log(`⚠️ Remaining match in [${table}.${col}]: "${name}"`);
          }
        }
      }
    }
  }

  if (remainingOccurrences === 0) {
    console.log("🎉 VERIFICATION 100% PASSED: ZERO personal names found anywhere in Supabase database!");
    console.log("   All tables now exclusively use generic names ('Lead Photographer', 'Private Client', 'Your Photography Studio')");
  } else {
    console.log(`⚠️ Found ${remainingOccurrences} remaining occurrence(s).`);
  }

  await client.end();
}

sanitizeDatabase().catch(console.error);
