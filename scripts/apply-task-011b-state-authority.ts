/**
 * Apply Task 011B additive state authority / staging migration.
 * Usage:
 *   npx tsx scripts/apply-task-011b-state-authority.ts --dry-run
 *   npx tsx scripts/apply-task-011b-state-authority.ts
 *   npx tsx scripts/apply-task-011b-state-authority.ts --validate
 */
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

const { Client } = pg;
const MIGRATION_PATH = resolve(
  process.cwd(),
  'supabase/migrations/20260821010000_task_011b_state_authority.sql'
);

function loadEnvFiles() {
  for (const file of ['.env.local', '.env.production.local']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const raw of readFileSync(path, 'utf8').split('\n')) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (!match) continue;
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
      if (!process.env.DATABASE_URL && /^postgres(ql)?:\/\//i.test(value)) {
        process.env.DATABASE_URL = value;
      }
    }
  }
}

function resolveDatabaseUrl(): string {
  const direct =
    process.env.SUPABASE_DB_URL?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim();
  if (direct) return direct;
  const password = process.env.SUPABASE_DB_PASSWORD?.trim();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const ref = url?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  if (!password || !ref) {
    throw new Error(
      'BLOCKED — DATABASE ACCESS: need SUPABASE_DB_URL or DATABASE_URL or SUPABASE_DB_PASSWORD'
    );
  }
  return `postgresql://postgres.${ref}:${encodeURIComponent(password)}@aws-1-us-west-2.pooler.supabase.com:5432/postgres`;
}

function sanitizeError(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error);
  return raw
    .replace(/postgres(?:ql)?:\/\/[^@\s]+@/gi, 'postgresql://***@')
    .replace(/password[=:][^\s]+/gi, 'password=***');
}

async function validate(client: pg.Client) {
  const tables = await client.query(
    `SELECT tablename FROM pg_tables
      WHERE schemaname='public'
        AND tablename IN (
          'state_hhg_ingest_run',
          'state_hhg_registry_staging',
          'provider_state_authority'
        )
      ORDER BY tablename`
  );
  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        tables: tables.rows.map((r) => r.tablename),
        ok: tables.rows.length === 3,
      },
      null,
      2
    )
  );
  if (tables.rows.length !== 3) {
    throw new Error('validation failed — missing 011B tables');
  }
}

async function main() {
  loadEnvFiles();
  const dryRun = process.argv.includes('--dry-run');
  const validateOnly = process.argv.includes('--validate');
  if (!existsSync(MIGRATION_PATH)) throw new Error(`missing ${MIGRATION_PATH}`);
  const sql = readFileSync(MIGRATION_PATH, 'utf8');
  if (dryRun) {
    console.log(JSON.stringify({ dryRun: true, bytes: sql.length, path: MIGRATION_PATH }));
    return;
  }
  const client = new Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    if (!validateOnly) {
      await client.query(sql);
    }
    await validate(client);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(sanitizeError(err));
  process.exit(1);
});
