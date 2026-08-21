/**
 * Task 009A.1 baseline timing profile for directory loaders.
 * Times SQL consumer-visible COUNT and, when importable under stub-server-only,
 * getCompaniesCached / getUnifiedDirectoryCompanies / queryDirectoryPage.
 * Does not change production defaults, publish providers, or call Google Places.
 *
 * Usage:
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/task-009a1-baseline-profile.ts
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

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
  const cleaned = raw
    .replace(/postgres(?:ql)?:\/\/[^@\s]+@/gi, 'postgresql://***@')
    .replace(/password[=:][^\s]+/gi, 'password=***')
    // unstable_cache dumps the wrapped fn source into the message under tsx
    .replace(/\s+/g, ' ')
    .trim();
  if (cleaned.includes('incrementalCache missing')) {
    return 'Invariant: incrementalCache missing in unstable_cache (tsx outside Next.js runtime)';
  }
  return cleaned.length > 400 ? `${cleaned.slice(0, 400)}…` : cleaned;
}

async function timeMs<T>(fn: () => Promise<T>): Promise<{ ms: number; result: T }> {
  const start = performance.now();
  const result = await fn();
  return { ms: Math.round(performance.now() - start), result };
}

type TimingEntry = {
  name: string;
  ok: boolean;
  ms?: number;
  result_count?: number;
  total?: number;
  limit?: number;
  filters?: Record<string, unknown>;
  error?: string;
};

async function main() {
  loadEnvFiles();
  const timings: TimingEntry[] = [];
  const notes: string[] = [
    'Baseline only. google_places_requests must stay 0.',
    'Default directory page size is 24 (DIRECTORY_PAGE_SIZE); not changed.',
    'Cached loaders use next/cache unstable_cache and require a Next.js request runtime; under tsx they import but cannot execute.',
  ];

  const client = new Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  let consumerVisibleCount = 0;
  try {
    const sqlTiming = await timeMs(async () => {
      const res = await client.query<{ n: number }>(`
        SELECT count(*)::int AS n
          FROM public.companies
         WHERE publication_state IS NULL
            OR publication_state IN ('PUBLISHABLE', 'INDEXABLE', 'VERIFIED')
      `);
      return res.rows[0]?.n ?? 0;
    });
    consumerVisibleCount = sqlTiming.result;
    timings.push({
      name: 'sql_consumer_visible_count',
      ok: true,
      ms: sqlTiming.ms,
      result_count: sqlTiming.result,
    });
  } catch (error) {
    timings.push({
      name: 'sql_consumer_visible_count',
      ok: false,
      error: sanitizeError(error),
    });
  } finally {
    await client.end();
  }

  const DEFAULT_LIMIT = 24;

  async function tryImportAndTime() {
    try {
      const companiesMod = await import('../lib/supabase/queries/companies');
      const unifiedMod = await import('../lib/directory/unified-directory');
      const pageMod = await import('../lib/directory/query-directory-page');

      const getCompaniesCached = companiesMod.getCompaniesCached;
      const getUnifiedDirectoryCompanies = unifiedMod.getUnifiedDirectoryCompanies;
      const queryDirectoryPage = pageMod.queryDirectoryPage;

      try {
        const t = await timeMs(() => getCompaniesCached());
        timings.push({
          name: 'getCompaniesCached',
          ok: true,
          ms: t.ms,
          result_count: t.result.length,
        });
      } catch (error) {
        timings.push({
          name: 'getCompaniesCached',
          ok: false,
          error: sanitizeError(error),
        });
        notes.push('getCompaniesCached failed under tsx/stub-server-only (see timings).');
      }

      try {
        const t = await timeMs(() => getUnifiedDirectoryCompanies());
        timings.push({
          name: 'getUnifiedDirectoryCompanies',
          ok: true,
          ms: t.ms,
          result_count: t.result.length,
        });
      } catch (error) {
        timings.push({
          name: 'getUnifiedDirectoryCompanies',
          ok: false,
          error: sanitizeError(error),
        });
        notes.push(
          'getUnifiedDirectoryCompanies failed under tsx/stub-server-only (see timings).'
        );
      }

      const pageCases: Array<{ name: string; filters?: Record<string, unknown> }> = [
        { name: 'queryDirectoryPage_default_limit_24', filters: {} },
        {
          name: 'queryDirectoryPage_onlyVerified',
          filters: { onlyVerified: true },
        },
        {
          name: 'queryDirectoryPage_local_mover',
          filters: { services: ['Local Mover'] },
        },
        {
          name: 'queryDirectoryPage_state_TX',
          filters: { state: 'TX' },
        },
        {
          name: 'queryDirectoryPage_minRating_4',
          filters: { minRating: 4 },
        },
      ];

      for (const pageCase of pageCases) {
        try {
          const t = await timeMs(() =>
            queryDirectoryPage({
              offset: 0,
              limit: DEFAULT_LIMIT,
              filters: pageCase.filters as never,
            })
          );
          timings.push({
            name: pageCase.name,
            ok: true,
            ms: t.ms,
            result_count: t.result.companies.length,
            total: t.result.total,
            limit: t.result.limit,
            filters: pageCase.filters,
          });
        } catch (error) {
          timings.push({
            name: pageCase.name,
            ok: false,
            limit: DEFAULT_LIMIT,
            filters: pageCase.filters,
            error: sanitizeError(error),
          });
        }
      }
    } catch (error) {
      notes.push(
        `Directory module import failed under tsx --require stub-server-only: ${sanitizeError(error)}`
      );
      timings.push({
        name: 'directory_module_import',
        ok: false,
        error: sanitizeError(error),
      });
    }
  }

  await tryImportAndTime();

  const report = {
    generated_at: new Date().toISOString(),
    task: '009A.1',
    google_places_requests: 0,
    default_limit: DEFAULT_LIMIT,
    sql_consumer_visible_count: consumerVisibleCount,
    timings,
    notes,
  };

  const docsDir = resolve(process.cwd(), 'docs');
  if (!existsSync(docsDir)) mkdirSync(docsDir);
  const outPath = resolve(docsDir, 'task-009a1-baseline-profile.json');
  writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n', 'utf8');
  console.log(JSON.stringify(report, null, 2));
  console.log(`Wrote ${outPath}`);
}

main().catch((error) => {
  console.error(sanitizeError(error));
  process.exit(1);
});
