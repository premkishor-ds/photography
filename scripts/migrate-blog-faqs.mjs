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

    // 1. Create blog_posts table
    console.log("Creating blog_posts table if not exists...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.blog_posts (
        id text PRIMARY KEY,
        slug text UNIQUE NOT NULL,
        title text NOT NULL,
        excerpt text,
        category text,
        author text,
        author_role text,
        read_time text,
        hero_image text,
        hero_alt text,
        content jsonb,
        related_service_slug text,
        published_date text,
        modified_date text,
        created_at timestamptz DEFAULT now()
      );
    `);

    // 2. Create faqs table
    console.log("Creating faqs table if not exists...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.faqs (
        id text PRIMARY KEY,
        category text NOT NULL,
        question text NOT NULL,
        answer text NOT NULL,
        related_service_slug text,
        order_index integer DEFAULT 0,
        created_at timestamptz DEFAULT now()
      );
    `);

    // Enable Row Level Security and allow public read
    await client.query(`
      ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
    `);

    // Drop old policies if any and create permissive ones for anon / authenticated
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'blog_posts' AND policyname = 'Allow public read on blog_posts'
        ) THEN
          CREATE POLICY "Allow public read on blog_posts" ON public.blog_posts FOR SELECT USING (true);
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'blog_posts' AND policyname = 'Allow all for anon on blog_posts'
        ) THEN
          CREATE POLICY "Allow all for anon on blog_posts" ON public.blog_posts FOR ALL USING (true) WITH CHECK (true);
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'faqs' AND policyname = 'Allow public read on faqs'
        ) THEN
          CREATE POLICY "Allow public read on faqs" ON public.faqs FOR SELECT USING (true);
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'faqs' AND policyname = 'Allow all for anon on faqs'
        ) THEN
          CREATE POLICY "Allow all for anon on faqs" ON public.faqs FOR ALL USING (true) WITH CHECK (true);
        END IF;
      END
      $$;
    `);

    // Check count of blog_posts
    const blogCountRes = await client.query(`SELECT count(*) FROM public.blog_posts;`);
    console.log("Current blog_posts count in DB:", blogCountRes.rows[0].count);

    const faqCountRes = await client.query(`SELECT count(*) FROM public.faqs;`);
    console.log("Current faqs count in DB:", faqCountRes.rows[0].count);

    await client.end();
    console.log("Migration completed successfully!");
  } catch (err) {
    console.error("Migration error:", err);
  }
}

migrate();
