/**
 * Apply Task 009A.1 additive directory query migration (indexes + RPC).
 *
 * Usage:
 *   npx tsx scripts/apply-task-009a1-directory-engine.ts --dry-run
 *   npx tsx scripts/apply-task-009a1-directory-engine.ts
 *   npx tsx scripts/apply-task-009a1-directory-engine.ts --validate
 */
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

const { Client } = pg;

const MIGRATION_PATH = resolve(
  process.cwd(),
  'supabase/migrations/20260820220000_task_009a1_directory_query_engine.sql'
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
  const fn = await client.query(
    `SELECT proname FROM pg_proc WHERE proname = 'directory_query_page'`
  );
  const idx = await client.query(
    `SELECT indexname FROM pg_indexes
      WHERE schemaname = 'public'
        AND indexname LIKE 'idx_companies_%'
        AND (
          indexname LIKE '%publication%'
          OR indexname LIKE '%scope_reputation%'
          OR indexname LIKE '%name_lower%'
          OR indexname LIKE '%mc_number%'
          OR indexname LIKE '%usdot_number%'
        )
      ORDER BY indexname`
  );
  const sample = await client.query(
    `SELECT total_count, company_id
       FROM public.directory_query_page(0, 3, NULL, 'reputation')
      LIMIT 3`
  );
  console.log(
    JSON.stringify(
      {
        ok: fn.rowCount === 1,
        function: fn.rows[0]?.proname ?? null,
        indexes: idx.rows.map((r) => r.indexname),
        sampleTotal: sample.rows[0] ? Number(sample.rows[0].total_count) : null,
        sampleIds: sample.rows.map((r) => r.company_id),
        sampleRowCount: sample.rowCount,
      },
      null,
      2
    )
  );
}

async function main() {
  loadEnvFiles();
  const dryRun = process.argv.includes('--dry-run');
  const doValidate = process.argv.includes('--validate');

  if (!existsSync(MIGRATION_PATH)) {
    throw new Error(`Missing migration: ${MIGRATION_PATH}`);
  }
  const sql = readFileSync(MIGRATION_PATH, 'utf8');
  console.log(
    JSON.stringify({
      migration: '20260820220000_task_009a1_directory_query_engine.sql',
      bytes: sql.length,
      dryRun,
      validate: doValidate,
    })
  );

  const client = new Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    if (doValidate && !dryRun) {
      await validate(client);
      return;
    }
    if (dryRun) {
      console.log(JSON.stringify({ status: 'dry-run', wouldApplyBytes: sql.length }));
      return;
    }
    await client.query(sql);
    await validate(client);
    console.log(JSON.stringify({ status: 'applied' }));
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(JSON.stringify({ status: 'error', message: sanitizeError(err) }));
  process.exit(1);
});
