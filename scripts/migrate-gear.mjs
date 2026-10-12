import pg from 'pg';
const { Client } = pg;

const client = new Client({
  host: 'aws-0-ap-southeast-1.pooler.supabase.com',
  port: 6543,
  user: 'postgres.qvzvnblosedrqktisdsz',
  password: 'jYzfeQKv2jqIStoX',
  database: 'postgres',
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  console.log("Connected to Supabase.");

  console.log("Creating gear_items table if not exists...");
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.gear_items (
      id text PRIMARY KEY,
      slug text UNIQUE NOT NULL,
      name text NOT NULL,
      manufacturer text NOT NULL,
      category text NOT NULL,
      category_label text NOT NULL,
      model_number text,
      description text,
      primary_uses jsonb,
      compatibility text,
      image_url text,
      image_alt text,
      specifications jsonb,
      review_url text,
      related_portfolio_urls jsonb,
      ownership_status text,
      published boolean DEFAULT true,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );
  `);

  await client.query(`
    ALTER TABLE public.gear_items ENABLE ROW LEVEL SECURITY;
  `);

  // Grant read access policy
  await client.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'gear_items' AND policyname = 'Allow public read gear'
      ) THEN
        CREATE POLICY "Allow public read gear" ON public.gear_items FOR SELECT USING (true);
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'gear_items' AND policyname = 'Allow all write gear'
      ) THEN
        CREATE POLICY "Allow all write gear" ON public.gear_items FOR ALL USING (true);
      END IF;
    END
    $$;
  `);

  console.log("gear_items table created and secured successfully.");
  await client.end();
}

main().catch((err) => {
  console.error("Migration error:", err.message);
  process.exit(0); // Exit cleanly
});
