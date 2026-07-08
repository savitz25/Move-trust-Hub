/**
 * Safe multi-source verification backfill for ALL directory movers
 * (Supabase companies + curated static catalog, ~500+ unified targets).
 *
 * Enriches verification_sources.google + verification_sources.public_scrape only —
 * never overwrites FMCSA fields or top-level BBB columns.
 *
 * Usage:
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/backfill-company-verification.ts --dry-run
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/backfill-company-verification.ts --batch 25
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/backfill-company-verification.ts --batch 25 --offset 50
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/backfill-company-verification.ts --batch 25 --force
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/backfill-company-verification.ts --batch 25 --source catalog
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   GOOGLE_PLACES_API_KEY (optional — skips Google if missing)
 *
 * Rate limits:
 *   - Public scrape: lib/verification/scrape-rate-limit.ts (per-host window)
 *   - Google: --delay-ms between companies (default 400ms)
 *
 * After a non-dry run, directory list cache refreshes within ~60s.
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';
import {
  buildBackfillTargetList,
  countBackfillTargetsBySource,
  type BackfillTarget,
  type BackfillTargetSource,
} from '../lib/verification/build-backfill-targets';
import {
  buildVerificationBackfillUpdate,
  companyNeedsVerificationBackfill,
  FMCSA_PROTECTED_COLUMNS,
  type MoverCompanyRow,
} from '../lib/verification/backfill-helpers';
import { persistBackfillUpdate } from '../lib/verification/persist-backfill';
import { fetchGooglePlacesData } from '../lib/verification/google-places';
import { fetchPublicScrapeData } from '../lib/verification/public-scrape';
import type { CompanyEnrichmentInput, CompanyEnrichmentResult } from '../lib/verification/types';

function loadEnvLocal(): void {
  try {
    const envPath = resolve(process.cwd(), '.env.local');
    const content = readFileSync(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq < 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = value;
    }
  } catch {
    // .env.local optional when env vars are already exported
  }
}

loadEnvLocal();

type SourceFilter = 'all' | BackfillTargetSource;

type CliOptions = {
  batch: number;
  offset: number;
  dryRun: boolean;
  force: boolean;
  delayMs: number;
  source: SourceFilter;
};

function parseArgs(argv: string[]): CliOptions {
  let batch = 25;
  let offset = 0;
  let dryRun = false;
  let force = false;
  let delayMs = 400;
  let source: SourceFilter = 'all';

  for (const arg of argv) {
    if (arg === '--dry-run') dryRun = true;
    else if (arg === '--force') force = true;
    else if (arg.startsWith('--batch=')) {
      batch = Math.max(1, Number.parseInt(arg.split('=')[1] ?? '25', 10));
    } else if (arg.startsWith('--offset=')) {
      offset = Math.max(0, Number.parseInt(arg.split('=')[1] ?? '0', 10));
    } else if (arg.startsWith('--delay-ms=')) {
      delayMs = Math.max(0, Number.parseInt(arg.split('=')[1] ?? '400', 10));
    } else if (arg.startsWith('--source=')) {
      const value = arg.split('=')[1]?.trim();
      if (value === 'supabase' || value === 'catalog') source = value;
    }
  }

  const batchIdx = argv.indexOf('--batch');
  if (batchIdx >= 0 && argv[batchIdx + 1] && !argv[batchIdx + 1]!.startsWith('--')) {
    batch = Math.max(1, Number.parseInt(argv[batchIdx + 1]!, 10));
  }

  const offsetIdx = argv.indexOf('--offset');
  if (offsetIdx >= 0 && argv[offsetIdx + 1] && !argv[offsetIdx + 1]!.startsWith('--')) {
    offset = Math.max(0, Number.parseInt(argv[offsetIdx + 1]!, 10));
  }

  const sourceIdx = argv.indexOf('--source');
  if (sourceIdx >= 0 && argv[sourceIdx + 1] && !argv[sourceIdx + 1]!.startsWith('--')) {
    const value = argv[sourceIdx + 1]!.trim();
    if (value === 'supabase' || value === 'catalog') source = value;
  }

  return { batch, offset, dryRun, force, delayMs, source };
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchEnrichment(
  input: CompanyEnrichmentInput,
  needsGoogle: boolean,
  needsScrape: boolean
): Promise<CompanyEnrichmentResult> {
  const [google, publicScrape] = await Promise.all([
    needsGoogle ? fetchGooglePlacesData(input) : Promise.resolve(null),
    needsScrape ? fetchPublicScrapeData(input) : Promise.resolve(null),
  ]);

  return {
    google: google?.status === 'skipped' ? null : google,
    publicScrape,
    fetchedAt: new Date().toISOString(),
  };
}

function toMoverRow(target: BackfillTarget): MoverCompanyRow {
  return {
    id: target.id,
    slug: target.slug,
    name: target.name,
    headquarters: target.headquarters,
    verification_sources: target.verification_sources,
    verification_last_synced_at: target.verification_last_synced_at,
    overall_rating: target.overall_rating,
    review_count: target.review_count,
  };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
  }

  const admin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  console.log('── Mover verification backfill (unified) ──');
  console.log(`Mode: ${opts.dryRun ? 'DRY RUN (no writes)' : 'LIVE'}`);
  console.log(`Batch: ${opts.batch} | Offset: ${opts.offset} | Force: ${opts.force}`);
  console.log(`Source filter: ${opts.source}`);
  console.log(`Stale threshold: 30 days | Inter-company delay: ${opts.delayMs}ms`);
  console.log(`Protected columns (never written): ${FMCSA_PROTECTED_COLUMNS.join(', ')}`);
  console.log('');

  const { data: allRows, error: listError } = await admin
    .from('companies')
    .select(
      'id, slug, name, headquarters, usdot_number, mc_number, verification_sources, verification_last_synced_at, overall_rating, review_count'
    )
    .order('name', { ascending: true });

  if (listError) {
    console.error('Failed to list companies:', listError.message);
    process.exit(1);
  }

  const allTargets = buildBackfillTargetList((allRows ?? []) as Record<string, unknown>[]);
  const sourceCounts = countBackfillTargetsBySource(allTargets);

  console.log(`Unified directory targets: ${sourceCounts.total}`);
  console.log(`  Supabase rows: ${sourceCounts.supabase}`);
  console.log(`  Catalog-only:  ${sourceCounts.catalogOnly}`);
  console.log('');

  const filteredTargets =
    opts.source === 'all'
      ? allTargets
      : allTargets.filter((t) => t.source === opts.source);

  const candidates = filteredTargets
    .map((target) => ({
      target,
      plan: companyNeedsVerificationBackfill(toMoverRow(target), { force: opts.force }),
    }))
    .filter(({ plan }) => plan.needsAny);

  console.log(`Candidates needing enrichment: ${candidates.length}`);

  const slice = candidates.slice(opts.offset, opts.offset + opts.batch);
  if (!slice.length) {
    console.log('No companies in this batch window. Try a lower offset or --force.');
    return;
  }

  console.log(`Processing ${slice.length} companies (offset ${opts.offset})…\n`);

  const stats = {
    processed: 0,
    updated: 0,
    skipped: 0,
    errors: 0,
    supabase: 0,
    catalog: 0,
  };
  const updatedSlugs: string[] = [];
  const errorLog: Array<{ slug: string; error: string }> = [];

  for (let i = 0; i < slice.length; i++) {
    const { target, plan } = slice[i]!;
    const label = `[${opts.offset + i + 1}/${candidates.length}] ${target.slug} (${target.source})`;
    stats.processed++;

    const input: CompanyEnrichmentInput = {
      legalName: target.name,
      headquarters: target.headquarters,
    };

    try {
      if (plan.needsGoogle || plan.needsScrape) {
        await sleep(opts.delayMs);
      }

      const enrichment = await fetchEnrichment(input, plan.needsGoogle, plan.needsScrape);
      const updates = buildVerificationBackfillUpdate(
        toMoverRow(target),
        enrichment,
        plan.needsGoogle,
        plan.needsScrape
      );

      if (!updates) {
        console.log(`${label} — skip (no applicable changes)`);
        stats.skipped++;
        continue;
      }

      const fields = Object.keys(updates).join(', ');
      if (opts.dryRun) {
        console.log(`${label} — would update: ${fields}`);
        if (enrichment.google?.status) {
          console.log(
            `    google: ${enrichment.google.status} rating=${enrichment.google.rating ?? '—'}`
          );
        }
        if (enrichment.publicScrape) {
          console.log(
            `    scrape: bbb=${enrichment.publicScrape.bbb_rating ?? '—'} trustpilot=${enrichment.publicScrape.trustpilot_rating ?? '—'} yelp=${enrichment.publicScrape.yelp_rating ?? '—'}`
          );
        }
        stats.updated++;
        if (target.source === 'supabase') stats.supabase++;
        else stats.catalog++;
        updatedSlugs.push(target.slug);
        continue;
      }

      const { error: persistError } = await persistBackfillUpdate(admin, target, updates, {
        catalogStub: target.source === 'catalog',
      });

      if (persistError) {
        console.error(`${label} — ERROR: ${persistError}`);
        errorLog.push({ slug: target.slug, error: persistError });
        stats.errors++;
        continue;
      }

      console.log(`${label} — updated (${fields})`);
      stats.updated++;
      if (target.source === 'supabase') stats.supabase++;
      else stats.catalog++;
      updatedSlugs.push(target.slug);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`${label} — ERROR: ${message}`);
      errorLog.push({ slug: target.slug, error: message });
      stats.errors++;
    }
  }

  console.log('\n── Summary ──');
  console.log(JSON.stringify(stats, null, 2));

  if (updatedSlugs.length) {
    console.log(`\nUpdated slugs (${updatedSlugs.length}):`);
    for (const slug of updatedSlugs) {
      console.log(`  /companies/${slug}`);
    }
  }

  if (errorLog.length) {
    console.log('\nErrors:');
    for (const e of errorLog) {
      console.log(`  ${e.slug}: ${e.error}`);
    }
  }

  if (!opts.dryRun && stats.updated > 0) {
    console.log('\nRevalidation: companies-directory cache tag refreshes within ~60s.');
    console.log('Spot-check profiles listed above. Next batch:');
    console.log(
      `  npx tsx --require ./scripts/stub-server-only.cjs scripts/backfill-company-verification.ts --batch ${opts.batch} --offset ${opts.offset + opts.batch}`
    );
  }

  if (stats.errors > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});