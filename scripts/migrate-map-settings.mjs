import pg from 'pg';

const { Client } = pg;
const connectionString = 'postgresql://postgres.qvzvnblosedrqktisdsz:jYzfeQKv2jqIStoX@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function migrateMapColumns() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  console.log('Connected to Supabase PostgreSQL...');

  await client.query(`
    ALTER TABLE studio_settings
    ADD COLUMN IF NOT EXISTS map_latitude numeric DEFAULT 26.8285,
    ADD COLUMN IF NOT EXISTS map_longitude numeric DEFAULT 75.8654,
    ADD COLUMN IF NOT EXISTS map_zoom integer DEFAULT 15,
    ADD COLUMN IF NOT EXISTS google_maps_api_key text DEFAULT '';
  `);

  console.log('Map columns added to studio_settings successfully!');

  await client.query(`
    UPDATE studio_settings
    SET 
      map_latitude = COALESCE(map_latitude, 26.8285),
      map_longitude = COALESCE(map_longitude, 75.8654),
      map_zoom = COALESCE(map_zoom, 15),
      google_maps_api_key = COALESCE(google_maps_api_key, '')
    WHERE id = 'default';
  `);

  console.log('Default studio_settings updated with map fields!');
  await client.end();
}

migrateMapColumns().catch(console.error);
