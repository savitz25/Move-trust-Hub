/**
 * Task 009A.1 static directory inventory baseline.
 * Counts DB companies + static catalog; estimates DB/static overlap.
 * Does not change production query defaults, publish providers, or call Google Places.
 *
 * Usage:
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/task-009a1-static-directory-inventory.ts
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { activeDirectoryMovers } from '../data/active-directory-movers';

const { Client } = pg;

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

function normalizeUsdot(value: string | null | undefined): string | null {
  const digits = String(value ?? '').replace(/\D/g, '');
  return digits.length >= 5 ? digits : null;
}

function normalizeSlug(value: string | null | undefined): string | null {
  const slug = String(value ?? '')
    .trim()
    .toLowerCase();
  return slug || null;
}

async function main() {
  loadEnvFiles();
  const client = new Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  try {
    const totals = await client.query<{
      total: number;
      consumer_visible: number;
      indexable: number;
    }>(`
      SELECT
        count(*)::int AS total,
        count(*) FILTER (
          WHERE publication_state IS NULL
             OR publication_state IN ('PUBLISHABLE', 'INDEXABLE', 'VERIFIED')
        )::int AS consumer_visible,
        count(*) FILTER (WHERE indexable = true)::int AS indexable
      FROM public.companies
    `);

    const byPublication = await client.query<{
      publication_state: string | null;
      n: number;
    }>(`
      SELECT publication_state, count(*)::int AS n
        FROM public.companies
       GROUP BY publication_state
       ORDER BY n DESC, publication_state NULLS FIRST
    `);

    const byServiceScope = await client.query<{
      service_scope: string | null;
      n: number;
    }>(`
      SELECT service_scope, count(*)::int AS n
        FROM public.companies
       GROUP BY service_scope
       ORDER BY n DESC, service_scope NULLS FIRST
    `);

    const identityRows = await client.query<{
      slug: string | null;
      usdot_number: string | null;
    }>(`
      SELECT slug, usdot_number
        FROM public.companies
    `);

    const dbUsdots = new Set<string>();
    const dbSlugs = new Set<string>();
    for (const row of identityRows.rows) {
      const usdot = normalizeUsdot(row.usdot_number);
      if (usdot) dbUsdots.add(usdot);
      const slug = normalizeSlug(row.slug);
      if (slug) dbSlugs.add(slug);
    }

    const staticKeys = Object.keys(activeDirectoryMovers);
    const staticCount = staticKeys.length;

    let staticWithUsdot = 0;
    let usdotOverlap = 0;
    let slugOverlap = 0;
    let eitherOverlap = 0;
    const overlappedUsdots: string[] = [];
    const overlappedSlugs: string[] = [];

    for (const key of staticKeys) {
      const mover = activeDirectoryMovers[key];
      const usdot = normalizeUsdot(mover?.usdotNumber);
      const slug = normalizeSlug(mover?.profileSlug || key.replace(/^directory-/, ''));
      if (usdot) staticWithUsdot += 1;

      const hitUsdot = Boolean(usdot && dbUsdots.has(usdot));
      const hitSlug = Boolean(slug && dbSlugs.has(slug));
      if (hitUsdot) {
        usdotOverlap += 1;
        if (overlappedUsdots.length < 25 && usdot) overlappedUsdots.push(usdot);
      }
      if (hitSlug) {
        slugOverlap += 1;
        if (overlappedSlugs.length < 25 && slug) overlappedSlugs.push(slug);
      }
      if (hitUsdot || hitSlug) eitherOverlap += 1;
    }

    const publication_state: Record<string, number> = {};
    for (const row of byPublication.rows) {
      publication_state[row.publication_state ?? 'null'] = row.n;
    }

    const service_scope: Record<string, number> = {};
    for (const row of byServiceScope.rows) {
      service_scope[row.service_scope ?? 'null'] = row.n;
    }

    const report = {
      generated_at: new Date().toISOString(),
      task: '009A.1',
      google_places_requests: 0,
      notes:
        'Inventory only. No production query defaults changed; no providers published; no Google Places calls.',
      db: {
        total: totals.rows[0]?.total ?? 0,
        by_publication_state: publication_state,
        consumer_visible: totals.rows[0]?.consumer_visible ?? 0,
        consumer_visible_definition:
          "publication_state IS NULL OR publication_state IN ('PUBLISHABLE','INDEXABLE','VERIFIED')",
        indexable: totals.rows[0]?.indexable ?? 0,
        by_service_scope: service_scope,
      },
      static_catalog: {
        source: 'data/active-directory-movers.ts',
        object_keys_count: staticCount,
        with_usdot: staticWithUsdot,
        without_usdot: staticCount - staticWithUsdot,
      },
      db_static_overlap_estimate: {
        usdot_overlap: usdotOverlap,
        slug_overlap: slugOverlap,
        either_usdot_or_slug_overlap: eitherOverlap,
        static_only_estimate: staticCount - eitherOverlap,
        sample_overlapped_usdots: overlappedUsdots,
        sample_overlapped_slugs: overlappedSlugs,
      },
    };

    const docsDir = resolve(process.cwd(), 'docs');
    if (!existsSync(docsDir)) mkdirSync(docsDir);
    const outPath = resolve(docsDir, 'task-009a1-static-directory-inventory.json');
    writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n', 'utf8');
    console.log(JSON.stringify(report, null, 2));
    console.log(`Wrote ${outPath}`);
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(sanitizeError(error));
  process.exit(1);
});
