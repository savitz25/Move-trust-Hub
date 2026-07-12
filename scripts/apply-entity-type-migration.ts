import { readFileSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import pg from 'pg';

function loadEnvFiles() {
  for (const file of ['.env.local', '.env.production.local']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m && !process.env[m[1].trim()]) {
        process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
      }
    }
  }
}

async function main() {
  loadEnvFiles();
  const direct = process.env.SUPABASE_DB_URL?.trim() || process.env.DATABASE_URL?.trim();
  const password = process.env.SUPABASE_DB_PASSWORD?.trim();
  const ref = process.env.NEXT_PUBLIC_SUPABASE_URL?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

  let connectionString = direct;
  if (!connectionString && password && ref) {
    connectionString = `postgresql://postgres.${ref}:${encodeURIComponent(password)}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;
  }

  if (!connectionString) {
    console.log('SKIP: set SUPABASE_DB_URL or SUPABASE_DB_PASSWORD to apply migration');
    process.exit(0);
  }

  const sql = readFileSync(
    join(process.cwd(), 'supabase/migrations/20260712180000_company_entity_type.sql'),
    'utf8'
  );

  const client = new pg.Client({ connectionString });
  await client.connect();
  await client.query(sql);
  await client.end();
  console.log('Applied entity_type migration');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});