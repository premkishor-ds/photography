import pg from "pg";

const DATABASE_URL = "postgresql://postgres.qvzvnblosedrqktisdsz:jYzfeQKv2jqIStoX@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres";

const client = new pg.Client({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function run() {
  await client.connect();
  console.log("Connected to Supabase PostgreSQL database directly.");

  // Get all tables in public schema
  const tablesRes = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
    ORDER BY table_name;
  `);

  const tables = tablesRes.rows.map(r => r.table_name);
  console.log("Found public tables:", tables);

  const personalNamePatterns = [
    /kishor/i,
    /prem/i,
    /किशोर/,
    /प्रेम/
  ];

  console.log("\n=======================================================");
  console.log(" SCANNING ALL SUPABASE TABLES FOR PERSONAL NAMES");
  console.log("=======================================================\n");

  const findings = [];

  for (const table of tables) {
    try {
      const rowsRes = await client.query(`SELECT * FROM "${table}"`);
      const rows = rowsRes.rows;
      console.log(`Table [${table}]: ${rows.length} rows`);

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        for (const [col, val] of Object.entries(row)) {
          if (val === null || val === undefined) continue;
          const strVal = typeof val === "object" ? JSON.stringify(val) : String(val);

          for (const pattern of personalNamePatterns) {
            if (pattern.test(strVal)) {
              // Find matches
              const matches = strVal.match(pattern);
              findings.push({
                table,
                rowId: row.id || `row_${i}`,
                column: col,
                match: matches ? matches[0] : "",
                snippet: strVal.length > 100 ? strVal.substring(0, 100) + "..." : strVal,
              });
              break;
            }
          }
        }
      }
    } catch (err) {
      console.error(`Error querying table ${table}:`, err.message);
    }
  }

  console.log("\n=======================================================");
  console.log(` SCAN RESULTS: Found ${findings.length} personal name occurrence(s)`);
  console.log("=======================================================\n");

  findings.forEach((f, idx) => {
    console.log(`[${idx + 1}] Table: "${f.table}" | Column: "${f.column}" | Row: "${f.rowId}"`);
    console.log(`    Matched Pattern: "${f.match}"`);
    console.log(`    Content Snippet: ${JSON.stringify(f.snippet)}`);
    console.log("-------------------------------------------------------");
  });

  await client.end();
}

run().catch(console.error);
