/**
 * Safe multi-source verification backfill for published mover companies (~387 rows).
 *
 * Enriches google_data + public_scrape_data only — never overwrites FMCSA fields.
 *
 * Usage:
 *   npx tsx scripts/backfill-company-verification.ts --dry-run
 *   npx tsx scripts/backfill-company-verification.ts --batch 25
 *   npx tsx scripts/backfill-company-verification.ts --batch 25 --offset 50
 *   npx tsx scripts/backfill-company-verification.ts --batch 25 --force
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
 * After a non-dry run, directory list cache refreshes within ~60s; profile pages may
 * need a deploy or wait for ISR. Updated slugs are printed for manual checks.
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';
import {
  buildVerificationBackfillUpdate,
  companyNeedsVerificationBackfill,
  FMCSA_PROTECTED_COLUMNS,
  type MoverCompanyRow,
  parseGoogleData,
  parsePublicScrapeData,
} from '../lib/verification/backfill-helpers';
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

type CliOptions = {
  batch: number;
  offset: number;
  dryRun: boolean;
  force: boolean;
  delayMs: number;
};

function parseArgs(argv: string[]): CliOptions {
  let batch = 25;
  let offset = 0;
  let dryRun = false;
  let force = false;
  let delayMs = 400;

  for (const arg of argv) {
    if (arg === '--dry-run') dryRun = true;
    else if (arg === '--force') force = true;
    else if (arg.startsWith('--batch=')) batch = Math.max(1, Number.parseInt(arg.split('=')[1] ?? '25', 10));
    else if (arg === '--batch') {
      /* allow --batch 25 via next arg handled below */
    }
    else if (arg.startsWith('--offset=')) offset = Math.max(0, Number.parseInt(arg.split('=')[1] ?? '0', 10));
    else if (arg.startsWith('--delay-ms=')) delayMs = Math.max(0, Number.parseInt(arg.split('=')[1] ?? '400', 10));
  }

  const batchIdx = argv.indexOf('--batch');
  if (batchIdx >= 0 && argv[batchIdx + 1] && !argv[batchIdx + 1]!.startsWith('--')) {
    batch = Math.max(1, Number.parseInt(argv[batchIdx + 1]!, 10));
  }

  const offsetIdx = argv.indexOf('--offset');
  if (offsetIdx >= 0 && argv[offsetIdx + 1] && !argv[offsetIdx + 1]!.startsWith('--')) {
    offset = Math.max(0, Number.parseInt(argv[offsetIdx + 1]!, 10));
  }

  return { batch, offset, dryRun, force, delayMs };
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

function mapRow(row: Record<string, unknown>): MoverCompanyRow {
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    headquarters: (row.headquarters as string | null) ?? null,
    google_data: parseGoogleData(row.google_data),
    public_scrape_data: parsePublicScrapeData(row.public_scrape_data),
    overall_rating: (row.overall_rating as number | null) ?? null,
    review_count: (row.review_count as number | null) ?? null,
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

  console.log('── Mover verification backfill ──');
  console.log(`Mode: ${opts.dryRun ? 'DRY RUN (no writes)' : 'LIVE'}`);
  console.log(`Batch: ${opts.batch} | Offset: ${opts.offset} | Force: ${opts.force}`);
  console.log(`Stale threshold: 30 days | Inter-company delay: ${opts.delayMs}ms`);
  console.log(`Protected columns (never written): ${FMCSA_PROTECTED_COLUMNS.join(', ')}`);
  console.log('');

  const { data: allRows, error: listError } = await admin
    .from('companies')
    .select(
      'id, slug, name, headquarters, google_data, public_scrape_data, overall_rating, review_count'
    )
    .order('name', { ascending: true });

  if (listError) {
    console.error('Failed to list companies:', listError.message);
    process.exit(1);
  }

  const companies = (allRows ?? []).map((r) => mapRow(r as Record<string, unknown>));
  console.log(`Total mover companies in directory: ${companies.length}`);

  const candidates = companies
    .map((row) => ({ row, plan: companyNeedsVerificationBackfill(row, { force: opts.force }) }))
    .filter(({ plan }) => plan.needsAny);

  console.log(`Candidates needing enrichment: ${candidates.length}`);

  const slice = candidates.slice(opts.offset, opts.offset + opts.batch);
  if (!slice.length) {
    console.log('No companies in this batch window. Try a lower offset or disable --force.');
    return;
  }

  console.log(`Processing ${slice.length} companies (offset ${opts.offset})…\n`);

  const stats = {
    processed: 0,
    updated: 0,
    skipped: 0,
    errors: 0,
  };
  const updatedSlugs: string[] = [];
  const errorLog: Array<{ slug: string; error: string }> = [];

  for (let i = 0; i < slice.length; i++) {
    const { row, plan } = slice[i]!;
    const label = `[${opts.offset + i + 1}/${candidates.length}] ${row.slug}`;
    stats.processed++;

    const input: CompanyEnrichmentInput = {
      legalName: row.name,
      headquarters: row.headquarters,
    };

    try {
      if (plan.needsGoogle && plan.needsScrape) {
        await sleep(opts.delayMs);
      } else if (plan.needsGoogle) {
        await sleep(opts.delayMs);
      }

      const enrichment = await fetchEnrichment(input, plan.needsGoogle, plan.needsScrape);
      const updates = buildVerificationBackfillUpdate(
        row,
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
          console.log(`    google: ${enrichment.google.status} rating=${enrichment.google.rating ?? '—'}`);
        }
        if (enrichment.publicScrape) {
          console.log(
            `    scrape: bbb=${enrichment.publicScrape.bbb_rating ?? '—'} trustpilot=${enrichment.publicScrape.trustpilot_rating ?? '—'} yelp=${enrichment.publicScrape.yelp_rating ?? '—'}`
          );
        }
        stats.updated++;
        updatedSlugs.push(row.slug);
        continue;
      }

      const { error: updateError } = await admin
        .from('companies')
        .update(updates)
        .eq('id', row.id);

      if (updateError) {
        console.error(`${label} — ERROR: ${updateError.message}`);
        errorLog.push({ slug: row.slug, error: updateError.message });
        stats.errors++;
        continue;
      }

      console.log(`${label} — updated (${fields})`);
      stats.updated++;
      updatedSlugs.push(row.slug);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`${label} — ERROR: ${message}`);
      errorLog.push({ slug: row.slug, error: message });
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
    console.log('Spot-check profiles listed above. Re-run next batch with:');
    console.log(
      `  npx tsx scripts/backfill-company-verification.ts --batch ${opts.batch} --offset ${opts.offset + opts.batch}`
    );
  }

  if (stats.errors > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});