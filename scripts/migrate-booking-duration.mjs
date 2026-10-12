import pg from "pg";
const { Client } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres.qvzvnblosedrqktisdsz:jYzfeQKv2jqIStoX@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres";

async function migrate() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL.");

    // 1. Add columns to public.inquiries for appointments, duration & travel buffers
    console.log("Updating inquiries table...");
    await client.query(`
      ALTER TABLE public.inquiries
      ADD COLUMN IF NOT EXISTS appointment_time text DEFAULT '10:00',
      ADD COLUMN IF NOT EXISTS duration_minutes integer DEFAULT 60,
      ADD COLUMN IF NOT EXISTS blocked_start_time text DEFAULT '09:00',
      ADD COLUMN IF NOT EXISTS blocked_end_time text DEFAULT '12:00',
      ADD COLUMN IF NOT EXISTS service_id text;
    `);

    // Add check constraint so duration_minutes can never fall below 60
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'check_min_booking_duration_60'
        ) THEN
          ALTER TABLE public.inquiries
          ADD CONSTRAINT check_min_booking_duration_60 CHECK (duration_minutes >= 60);
        END IF;
      END
      $$;
    `);

    // 2. Add columns to public.services for duration configuration
    console.log("Updating services table...");
    await client.query(`
      ALTER TABLE public.services
      ADD COLUMN IF NOT EXISTS min_duration_minutes integer DEFAULT 60,
      ADD COLUMN IF NOT EXISTS duration_type text DEFAULT 'selectable',
      ADD COLUMN IF NOT EXISTS supported_durations jsonb DEFAULT '[60, 120, 180, 240]';
    `);

    // Add check constraint so service min_duration_minutes cannot fall below 60
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'check_service_min_duration_60'
        ) THEN
          ALTER TABLE public.services
          ADD CONSTRAINT check_service_min_duration_60 CHECK (min_duration_minutes >= 60);
        END IF;
      END
      $$;
    `);

    // 3. Add default_min_booking_duration to studio_settings
    console.log("Updating studio_settings table...");
    await client.query(`
      ALTER TABLE public.studio_settings
      ADD COLUMN IF NOT EXISTS default_min_booking_duration integer DEFAULT 60;
    `);

    // Ensure all existing services have valid min_duration_minutes >= 60
    await client.query(`
      UPDATE public.services
      SET 
        min_duration_minutes = CASE 
          WHEN lower(title) LIKE '%wedding%' THEN 180
          WHEN lower(title) LIKE '%event%' THEN 120
          WHEN lower(title) LIKE '%commercial%' THEN 180
          ELSE 60
        END,
        duration_type = CASE
          WHEN lower(title) LIKE '%wedding%' THEN 'selectable'
          ELSE 'selectable'
        END,
        supported_durations = CASE
          WHEN lower(title) LIKE '%wedding%' THEN '[180, 240, 360, 480]'::jsonb
          WHEN lower(title) LIKE '%event%' THEN '[120, 180, 240]'::jsonb
          WHEN lower(title) LIKE '%commercial%' THEN '[180, 240, 360]'::jsonb
          ELSE '[60, 120, 180, 240]'::jsonb
        END
      WHERE min_duration_minutes IS NULL OR min_duration_minutes < 60;
    `);

    console.log("Migration for booking duration & travel buffer completed successfully!");

    // Verify sample
    const sRes = await client.query("SELECT id, title, min_duration_minutes, supported_durations FROM public.services;");
    console.log("Services configured:", sRes.rows);

    await client.end();
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

migrate();
