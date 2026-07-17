/**
 * Apply Verified Mover Portal tables (company_claims, company_owners, …).
 *
 * Requires direct Postgres access:
 *   SUPABASE_DB_URL=postgresql://...
 *   or SUPABASE_DB_PASSWORD=... (with NEXT_PUBLIC_SUPABASE_URL)
 *
 * Usage:
 *   npx tsx scripts/apply-portal-migration.ts
 *
 * Until this runs, the app falls back to storing portal claims in
 * company_suggestions (source_page = portal_claim).
 */
import { readFileSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import pg from 'pg';

const { Client } = pg;

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
        'Dashboard → Project Settings → Database → Connection string (URI).'
    );
  }

  const host = process.env.SUPABASE_DB_HOST?.trim() || `db.${ref}.supabase.co`;
  const port = process.env.SUPABASE_DB_PORT?.trim() || '5432';
  const user = process.env.SUPABASE_DB_USER?.trim() || 'postgres';
  const database = process.env.SUPABASE_DB_NAME?.trim() || 'postgres';
  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
}

async function main() {
  loadEnvFiles();
  const sqlPath = join(
    process.cwd(),
    'supabase',
    'migrations',
    '20260717120000_mover_portal.sql'
  );
  if (!existsSync(sqlPath)) {
    throw new Error(`Migration not found: ${sqlPath}`);
  }

  const sql = readFileSync(sqlPath, 'utf8');
  const client = new Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
  });

  console.log('Connecting…');
  await client.connect();
  console.log('Applying 20260717120000_mover_portal.sql …');
  await client.query(sql);

  const check = await client.query(
    `select table_name from information_schema.tables
     where table_schema = 'public'
       and table_name in ('company_claims','company_owners','company_portal_profiles','portal_claim_rate_limits')
     order by table_name`
  );
  console.log(
    'Portal tables present:',
    check.rows.map((r: { table_name: string }) => r.table_name).join(', ')
  );

  await client.end();
  console.log('Done. Reload PostgREST schema if needed (Supabase → API → Reload schema).');
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
