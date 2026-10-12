import pg from 'pg';

const { Client } = pg;
const connectionString = 'postgresql://postgres.qvzvnblosedrqktisdsz:jYzfeQKv2jqIStoX@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function updateSchema() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  console.log('Connected to Supabase PostgreSQL...');

  // Add columns to studio_settings
  await client.query(`
    ALTER TABLE studio_settings
    ADD COLUMN IF NOT EXISTS tagline text DEFAULT 'Capturing Moments, Creating Memories',
    ADD COLUMN IF NOT EXISTS subtagline text DEFAULT 'Professional photography for life''s most meaningful moments.',
    ADD COLUMN IF NOT EXISTS hero_image_url text DEFAULT 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85',
    ADD COLUMN IF NOT EXISTS photographer_name text DEFAULT 'Kishor Prem',
    ADD COLUMN IF NOT EXISTS photographer_role text DEFAULT 'Principal Photographer & Visual Artist',
    ADD COLUMN IF NOT EXISTS photographer_bio_1 text DEFAULT 'For over twelve years, I have dedicated my life to the delicate art of seeing. Photography, to me, is not merely capturing what is before the lens, but feeling the heartbeat of a fleeting moment and preserving it before it disappears into memory.',
    ADD COLUMN IF NOT EXISTS photographer_bio_2 text DEFAULT 'Trained in classical fine-art, documentary, and dynamic action photography, my style blends soft, warm natural light with subtle editorial composition. I look for the unscripted pauses: the quiet touch of hands before vows, the fleeting glint in an eye, or the explosive energy of an athlete in mid-air.',
    ADD COLUMN IF NOT EXISTS photographer_quote text DEFAULT '“Light reveals what exists; emotion reveals what truly matters.”',
    ADD COLUMN IF NOT EXISTS photographer_portrait_url text DEFAULT 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
    ADD COLUMN IF NOT EXISTS stats_experience text DEFAULT '12+ Years',
    ADD COLUMN IF NOT EXISTS stats_sessions text DEFAULT '650+',
    ADD COLUMN IF NOT EXISTS stats_weddings text DEFAULT '180+',
    ADD COLUMN IF NOT EXISTS stats_features text DEFAULT '24+',
    ADD COLUMN IF NOT EXISTS instagram_url text DEFAULT 'https://instagram.com/yourphotography',
    ADD COLUMN IF NOT EXISTS facebook_url text DEFAULT 'https://facebook.com/yourphotography',
    ADD COLUMN IF NOT EXISTS pinterest_url text DEFAULT 'https://pinterest.com/yourphotography',
    ADD COLUMN IF NOT EXISTS five_hundred_px_url text DEFAULT 'https://500px.com/yourphotography',
    ADD COLUMN IF NOT EXISTS youtube_url text DEFAULT 'https://youtube.com/@yourphotography';
  `);
  console.log('Columns added to studio_settings successfully!');

  // Update default row
  await client.query(`
    UPDATE studio_settings
    SET 
      tagline = COALESCE(tagline, 'Capturing Moments, Creating Memories'),
      subtagline = COALESCE(subtagline, 'Professional photography for life''s most meaningful moments.'),
      hero_image_url = COALESCE(hero_image_url, 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85'),
      photographer_name = COALESCE(photographer_name, 'Kishor Prem'),
      photographer_role = COALESCE(photographer_role, 'Principal Photographer & Visual Artist'),
      photographer_portrait_url = COALESCE(photographer_portrait_url, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80'),
      stats_experience = COALESCE(stats_experience, '12+ Years'),
      stats_sessions = COALESCE(stats_sessions, '650+'),
      stats_weddings = COALESCE(stats_weddings, '180+'),
      stats_features = COALESCE(stats_features, '24+')
    WHERE id = 'default';
  `);

  console.log('Default row updated in studio_settings!');
  await client.end();
}

updateSchema().catch(console.error);
