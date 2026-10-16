import pg from "pg";

const DATABASE_URL =
  "postgresql://postgres.qvzvnblosedrqktisdsz:jYzfeQKv2jqIStoX@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres";

const client = new pg.Client({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Comprehensive list of known names, potential names, and name patterns
const KNOWN_NAMES = [
  // Names from previous versions or repositories
  "kara", "wilson", "kara wilson",
  "kishor", "prem", "prem kishor", "kishor prem", "kishore",
  "किशोर", "प्रेम",
  // Customer/inquiry names in db
  "vikramaditya", "rathore", "vikram",
  "ananya", "deshmukh",
  "pooja", "choudhary", "choudhary",
  // Common photography template names
  "elena", "rostova", "marcus", "vance", "sophia", "alexander", "clara", "oliver", "charlotte",
  "sarah", "michael", "emily", "david", "jessica", "daniel", "rachel", "james", "emma", "liam",
  // Common Indian personal names (First & Last)
  "rahul", "priya", "rohit", "sneha", "amit", "neha", "arjun", "anjali", "sanjay", "deepika",
  "sharma", "verma", "gupta", "singh", "sharma", "agarwal", "meena", "mishra", "joshi", "patel"
];

// Regex for titles + names like Mr./Ms./Dr./Photographer [Name]
const TITLE_NAME_REGEX = /\b(mr\.|mrs\.|ms\.|dr\.|by|with|shot by|curated by|author:|photographer:?)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/gi;

// Regex for potential couples like "X & Y" or "X and Y"
const COUPLE_REGEX = /\b([A-Z][a-z]+)\s+(?:&|and)\s+([A-Z][a-z]+)\b/g;

async function scanDatabase() {
  await client.connect();
  console.log("Connected to Supabase PostgreSQL database.\n");

  const tablesRes = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
    ORDER BY table_name;
  `);

  const tables = tablesRes.rows.map((r) => r.table_name);
  console.log("Inspecting public tables:", tables);

  const findings = [];
  const allDetectedNames = new Set();

  for (const table of tables) {
    const rowsRes = await client.query(`SELECT * FROM "${table}"`);
    const rows = rowsRes.rows;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowId = row.id || `row_${i}`;

      for (const [col, val] of Object.entries(row)) {
        if (val === null || val === undefined) continue;
        const strVal = typeof val === "object" ? JSON.stringify(val) : String(val);

        // 1. Direct check against KNOWN_NAMES
        for (const name of KNOWN_NAMES) {
          const regex = new RegExp(`\\b${name}\\b`, "i");
          if (regex.test(strVal)) {
            allDetectedNames.add(name.toLowerCase());
            findings.push({
              table,
              rowId,
              column: col,
              type: "KNOWN_NAME",
              matchedWord: name,
              snippet: extractSnippet(strVal, name),
            });
          }
        }

        // 2. Check for "by [Name]" or "photographer [Name]"
        let titleMatch;
        while ((titleMatch = TITLE_NAME_REGEX.exec(strVal)) !== null) {
          const candidate = titleMatch[2];
          // Filter out generic phrases
          if (!isGenericWord(candidate)) {
            allDetectedNames.add(candidate);
            findings.push({
              table,
              rowId,
              column: col,
              type: "ATTRIBUTED_NAME",
              matchedWord: titleMatch[0],
              snippet: extractSnippet(strVal, titleMatch[0]),
            });
          }
        }

        // 3. Name-specific columns (e.g. name, author, photographer_name)
        if (["name", "author", "photographer_name", "client_name", "customer_name"].includes(col.toLowerCase())) {
          findings.push({
            table,
            rowId,
            column: col,
            type: "IDENTITY_COLUMN_VALUE",
            matchedWord: strVal,
            snippet: strVal,
          });
        }
      }
    }
  }

  // Deduplicate findings by table + rowId + column + matchedWord
  const uniqueFindings = [];
  const seenKey = new Set();

  for (const f of findings) {
    const key = `${f.table}:${f.rowId}:${f.column}:${f.matchedWord.toLowerCase()}`;
    if (!seenKey.has(key)) {
      seenKey.add(key);
      uniqueFindings.push(f);
    }
  }

  console.log("\n=======================================================");
  console.log(` DEEP NAME AUDIT RESULTS: Found ${uniqueFindings.length} occurrences`);
  console.log("=======================================================\n");

  uniqueFindings.forEach((f, idx) => {
    console.log(`[${idx + 1}] Table: "${f.table}" | Row: "${f.rowId}" | Column: "${f.column}"`);
    console.log(`    Category: [${f.type}]`);
    console.log(`    Match: "${f.matchedWord}"`);
    console.log(`    Snippet: ${JSON.stringify(f.snippet)}`);
    console.log("-------------------------------------------------------");
  });

  console.log("\nUnique Detected Names/Phrases:", Array.from(allDetectedNames));

  await client.end();
}

function extractSnippet(text, match) {
  const idx = text.toLowerCase().indexOf(match.toLowerCase());
  if (idx === -1) return text.substring(0, 80);
  const start = Math.max(0, idx - 30);
  const end = Math.min(text.length, idx + match.length + 40);
  return (start > 0 ? "..." : "") + text.substring(start, end) + (end < text.length ? "..." : "");
}

function isGenericWord(word) {
  const generic = [
    "appointment", "lead photographer", "principal photographer", "our studio",
    "your photography", "fine art", "high speed", "sony", "nikon", "canon", "day", "week", "month"
  ];
  return generic.includes(word.toLowerCase());
}

scanDatabase().catch(console.error);
