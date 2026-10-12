import pg from "pg";
const { Client } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres.qvzvnblosedrqktisdsz:jYzfeQKv2jqIStoX@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres";

async function run() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL.");

    // Add legal policy columns if they do not exist
    await client.query(`
      ALTER TABLE public.studio_settings
      ADD COLUMN IF NOT EXISTS terms_conditions_custom text DEFAULT '',
      ADD COLUMN IF NOT EXISTS privacy_policy_custom text DEFAULT '',
      ADD COLUMN IF NOT EXISTS booking_retainer_percent text DEFAULT '30–50%',
      ADD COLUMN IF NOT EXISTS governing_jurisdiction text DEFAULT 'Jaipur, Rajasthan, India',
      ADD COLUMN IF NOT EXISTS cancellation_policy text DEFAULT 'Outdoor sessions affected by extreme weather are rescheduled at zero fee. Cancellations made 14+ days prior receive full retainer credit toward future sessions.';
    `);

    console.log("Columns added successfully!");

    // Check current row in studio_settings
    const res = await client.query(`SELECT id, governing_jurisdiction, booking_retainer_percent FROM public.studio_settings WHERE id = 'default';`);
    console.log("Current row:", res.rows[0]);

    await client.end();
  } catch (err) {
    console.error("Migration error:", err);
  }
}

run();
