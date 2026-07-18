/**
 * Apply baseline schema (if needed) + key directory migrations in order.
 *
 * Requires direct Postgres access via one of:
 *   SUPABASE_DB_URL=postgresql://postgres.[ref]:[password]@...
 *   SUPABASE_DB_PASSWORD=[database password]  (uses project ref from NEXT_PUBLIC_SUPABASE_URL)
 *
 * Usage:
 *   npx tsx scripts/run-key-migrations.ts
 *   npx tsx scripts/run-key-migrations.ts --skip-schema
 */
import { readFileSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import pg from 'pg';

const { Client } = pg;

const KEY_MIGRATIONS = [
  '20260702120000_fmcsa_refresh_pipeline.sql',
  '20260705120000_company_suggestions.sql',
  '20260707120000_multi_source_verification.sql',
] as const;

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

function projectRef(): string | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!url) return null;
  const m = url.match(/https:\/\/([^.]+)\.supabase\.co/);
  return m?.[1] ?? null;
}

function resolveDatabaseUrl(): string {
  const direct = process.env.SUPABASE_DB_URL?.trim() || process.env.DATABASE_URL?.trim();
  if (direct) return direct;

  const password = process.env.SUPABASE_DB_PASSWORD?.trim();
  const ref = projectRef();
  if (!password || !ref) {
    throw new Error(
      'Set SUPABASE_DB_URL (or DATABASE_URL), or SUPABASE_DB_PASSWORD + NEXT_PUBLIC_SUPABASE_URL.\n' +
        'Find the database password in Supabase Dashboard → Project Settings → Database → Connection string.'
    );
  }

  const host = process.env.SUPABASE_DB_HOST?.trim() || `db.${ref}.supabase.co`;
  const port = process.env.SUPABASE_DB_PORT?.trim() || '5432';
  const user = process.env.SUPABASE_DB_USER?.trim() || 'postgres';
  const database = process.env.SUPABASE_DB_NAME?.trim() || 'postgres';
  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
}

async function runSql(client: pg.Client, label: string, sql: string) {
  console.log(`\n▶ ${label}`);
  await client.query(sql);
  console.log(`✓ ${label}`);
}

async function tableExists(client: pg.Client, table: string): Promise<boolean> {
  const res = await client.query(
    `select exists (
      select 1 from information_schema.tables
      where table_schema = 'public' and table_name = $1
    ) as present`,
    [table]
  );
  return Boolean(res.rows[0]?.present);
}

async function main() {
  loadEnvFiles();
  const skipSchema = process.argv.includes('--skip-schema');
  const connectionString = resolveDatabaseUrl();
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  console.log('Connected to Supabase Postgres.');

  try {
    if (!skipSchema) {
      const hasCompanies = await tableExists(client, 'companies');
      if (!hasCompanies) {
        const schemaPath = resolve(process.cwd(), 'supabase/schema.sql');
        const schemaSql = readFileSync(schemaPath, 'utf8');
        await runSql(client, 'supabase/schema.sql (baseline)', schemaSql);
      } else {
        console.log('✓ public.companies already exists — skipping baseline schema.sql');
      }
    }

    for (const file of KEY_MIGRATIONS) {
      const path = join(process.cwd(), 'supabase/migrations', file);
      if (!existsSync(path)) {
        throw new Error(`Missing migration file: ${path}`);
      }
      const sql = readFileSync(path, 'utf8');
      await runSql(client, `supabase/migrations/${file}`, sql);
    }

    console.log('\nAll key migrations applied successfully.');
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});