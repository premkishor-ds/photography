import pg from 'pg';
import { createClient } from '@supabase/supabase-js';

const { Client } = pg;

const connectionString = 'postgresql://postgres.qvzvnblosedrqktisdsz:jYzfeQKv2jqIStoX@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function setup() {
  console.log('Connecting to Supabase PostgreSQL...');
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();

  console.log('Inserting public bucket "portfolio"...');
  await client.query(`
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('portfolio', 'portfolio', true)
    ON CONFLICT (id) DO UPDATE SET public = true;
  `);

  console.log('Configuring storage.objects RLS policies...');
  await client.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public Access Portfolio') THEN
        CREATE POLICY "Public Access Portfolio" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow Uploads Portfolio') THEN
        CREATE POLICY "Allow Uploads Portfolio" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow Updates Portfolio') THEN
        CREATE POLICY "Allow Updates Portfolio" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow Deletes Portfolio') THEN
        CREATE POLICY "Allow Deletes Portfolio" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio');
      END IF;
    END
    $$;
  `);

  console.log('Storage bucket setup completed successfully in DB!');
  await client.end();

  // Test storage upload via Supabase JS Client
  console.log('Testing upload via Supabase JS client...');
  const supabase = createClient(
    'https://qvzvnblosedrqktisdsz.supabase.co',
    'sb_publishable__ios76DkRwhZ9FWMyUr07Q_5a-JQx1d'
  );

  const testBuffer = Buffer.from('Test portfolio image upload', 'utf-8');
  const testFileName = `test-${Date.now()}.txt`;
  const { data, error } = await supabase.storage
    .from('portfolio')
    .upload(testFileName, testBuffer, { contentType: 'text/plain' });

  if (error) {
    console.error('Test upload error:', error);
  } else {
    console.log('Test upload successful:', data);
    const { data: publicUrlData } = supabase.storage
      .from('portfolio')
      .getPublicUrl(testFileName);
    console.log('Public URL:', publicUrlData.publicUrl);
  }
}

setup().catch(console.error);
