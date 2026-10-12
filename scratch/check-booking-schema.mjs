import pg from "pg";
const { Client } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres.qvzvnblosedrqktisdsz:jYzfeQKv2jqIStoX@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres";

async function main() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    await client.connect();
    const inq = await client.query(
      "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'inquiries';"
    );
    console.log("inquiries columns:", inq.rows.map((r) => `${r.column_name} (${r.data_type})`));

    const serv = await client.query(
      "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'services';"
    );
    console.log("services columns:", serv.rows.map((r) => `${r.column_name} (${r.data_type})`));

    const inqRows = await client.query("SELECT * FROM public.inquiries LIMIT 3;");
    console.log("Sample inquiry row:", inqRows.rows[0]);

    await client.end();
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
