import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import {
  buildBackfillTargetList,
  countBackfillTargetsBySource,
  type BackfillTarget,
  type BackfillTargetSource,
} from '@/lib/verification/build-backfill-targets';
import {
  buildVerificationBackfillUpdate,
  companyNeedsVerificationBackfill,
  ENRICHMENT_STALE_DAYS,
  FMCSA_PROTECTED_COLUMNS,
  type MoverCompanyRow,
} from '@/lib/verification/backfill-helpers';
import { persistBackfillUpdate } from '@/lib/verification/persist-backfill';
import { fetchGooglePlacesData } from '@/lib/verification/google-places';
import { fetchPublicScrapeData } from '@/lib/verification/public-scrape';
import type {
  CompanyEnrichmentInput,
  CompanyEnrichmentResult,
  PublicScrapeData,
  GooglePlacesData,
} from '@/lib/verification/types';

export type ProductionBackfillOptions = {
  batch: number;
  offset: number;
  dryRun: boolean;
  force: boolean;
  delayMs: number;
  source: 'all' | BackfillTargetSource;
  scriptName: string;
};

export type ProductionBackfillStats = {
  processed: number;
  updated: number;
  skipped: number;
  errors: number;
  supabase: number;
  catalog: number;
  googleOk: number;
  bbbOk: number;
};

export function parseProductionBackfillArgs(argv: string[]): ProductionBackfillOptions {
  let batch = 25;
  let offset = 0;
  let dryRun = false;
  let force = false;
  let delayMs = 400;
  let source: 'all' | BackfillTargetSource = 'all';

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

  return {
    batch,
    offset,
    dryRun,
    force,
    delayMs,
    source,
    scriptName: 'backfill-all-companies',
  };
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

export function formatGooglePull(google: GooglePlacesData | null | undefined): string {
  if (!google) return 'google: —';
  return `google: ${google.status} rating=${google.rating ?? '—'} reviews=${google.review_count ?? '—'} snippets=${google.review_snippets?.length ?? 0}`;
}

export function formatBbbPull(scrape: PublicScrapeData | null | undefined): string {
  if (!scrape) return 'bbb: —';
  if (scrape.sources.bbb?.status === 'not_found') return 'bbb: not listed';
  const d = scrape.bbb_details;
  const parts = [
    `bbb: grade=${scrape.bbb_rating ?? '—'}`,
    `accredited=${scrape.bbb_accredited ?? '—'}`,
    d?.accreditation_status ? `status=${d.accreditation_status}` : null,
    d?.file_opened_date ? `file_opened=${d.file_opened_date}` : null,
    d?.accredited_since ? `accredited_since=${d.accredited_since}` : null,
    `reviews=${scrape.bbb_review_count ?? '—'}`,
    d?.review_snippets?.length ? `bbb_snippets=${d.review_snippets.length}` : null,
    scrape.sources.bbb?.method ? `via=${scrape.sources.bbb.method}` : null,
    scrape.bbb_profile_url ? 'listed=yes' : 'listed=no',
  ].filter(Boolean);
  return parts.join(' ');
}

async function recordBatchAudit(
  admin: SupabaseClient,
  opts: ProductionBackfillOptions,
  candidatesTotal: number,
  stats: ProductionBackfillStats,
  updatedSlugs: string[],
  errorLog: Array<{ slug: string; error: string }>
): Promise<void> {
  if (opts.dryRun) return;

  const { error } = await admin.from('company_verification_backfill_runs').insert({
    mode: 'live',
    batch_size: opts.batch,
    companies_total: candidatesTotal,
    companies_processed: stats.processed,
    companies_updated: stats.updated,
    companies_failed: stats.errors,
    error_summary: errorLog.length ? errorLog.map((e) => e.slug).join(', ').slice(0, 500) : null,
    finished_at: new Date().toISOString(),
    metadata: {
      script: opts.scriptName,
      offset: opts.offset,
      force: opts.force,
      updated_slugs: updatedSlugs,
      errors: errorLog,
    },
  });

  if (error && !error.message.includes('does not exist')) {
    console.warn('Audit log insert skipped:', error.message);
  }
}

export async function runProductionBackfill(
  opts: ProductionBackfillOptions
): Promise<{ stats: ProductionBackfillStats; exitCode: number }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    return {
      stats: {
        processed: 0,
        updated: 0,
        skipped: 0,
        errors: 1,
        supabase: 0,
        catalog: 0,
        googleOk: 0,
        bbbOk: 0,
      },
      exitCode: 1,
    };
  }

  const admin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  console.log(`── Production backfill: ${opts.scriptName} ──`);
  console.log(`Mode: ${opts.dryRun ? 'DRY RUN (no writes)' : 'LIVE'}`);
  console.log(`Batch: ${opts.batch} | Offset: ${opts.offset} | Force: ${opts.force}`);
  console.log(`Source filter: ${opts.source}`);
  console.log(`Stale threshold: ${ENRICHMENT_STALE_DAYS} days | Delay: ${opts.delayMs}ms`);
  console.log('Updates ONLY: verification_sources (google + public_scrape), ratings, timestamps');
  console.log(`NEVER writes: ${FMCSA_PROTECTED_COLUMNS.join(', ')}`);
  console.log('');

  const { data: allRows, error: listError } = await admin
    .from('companies')
    .select(
      'id, slug, name, headquarters, usdot_number, mc_number, verification_sources, verification_last_synced_at, overall_rating, review_count'
    )
    .order('name', { ascending: true });

  if (listError) {
    console.error('Failed to list companies:', listError.message);
    return {
      stats: {
        processed: 0,
        updated: 0,
        skipped: 0,
        errors: 1,
        supabase: 0,
        catalog: 0,
        googleOk: 0,
        bbbOk: 0,
      },
      exitCode: 1,
    };
  }

  const allTargets = buildBackfillTargetList((allRows ?? []) as Record<string, unknown>[]);
  const sourceCounts = countBackfillTargetsBySource(allTargets);

  console.log(`Unified directory targets: ${sourceCounts.total}`);
  console.log(`  Supabase:      ${sourceCounts.supabase}`);
  console.log(`  Catalog-only:  ${sourceCounts.catalogOnly}`);
  console.log('');

  const filteredTargets =
    opts.source === 'all' ? allTargets : allTargets.filter((t) => t.source === opts.source);

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
    return {
      stats: {
        processed: 0,
        updated: 0,
        skipped: 0,
        errors: 0,
        supabase: 0,
        catalog: 0,
        googleOk: 0,
        bbbOk: 0,
      },
      exitCode: 0,
    };
  }

  console.log(`Processing ${slice.length} companies (offset ${opts.offset})…\n`);

  const stats: ProductionBackfillStats = {
    processed: 0,
    updated: 0,
    skipped: 0,
    errors: 0,
    supabase: 0,
    catalog: 0,
    googleOk: 0,
    bbbOk: 0,
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
      usdotNumber: target.usdotNumber,
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

      if (enrichment.google?.status === 'ok') stats.googleOk++;
      if (
        enrichment.publicScrape?.sources.bbb?.status === 'ok' &&
        enrichment.publicScrape?.bbb_profile_url
      ) {
        stats.bbbOk++;
      }

      if (!updates) {
        console.log(`${label} — SKIP (no applicable changes)`);
        stats.skipped++;
        continue;
      }

      const fields = Object.keys(updates).join(', ');
      console.log(`${label}`);
      console.log(`    ${formatGooglePull(enrichment.google)}`);
      console.log(`    ${formatBbbPull(enrichment.publicScrape)}`);

      if (opts.dryRun) {
        console.log(`    → would update: ${fields}`);
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
        console.log(`    → ERROR: ${persistError}`);
        errorLog.push({ slug: target.slug, error: persistError });
        stats.errors++;
        continue;
      }

      console.log(`    → UPDATED (${fields})`);
      stats.updated++;
      if (target.source === 'supabase') stats.supabase++;
      else stats.catalog++;
      updatedSlugs.push(target.slug);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.log(`${label} — ERROR: ${message}`);
      errorLog.push({ slug: target.slug, error: message });
      stats.errors++;
    }
  }

  console.log('\n══════════════════════════════════════');
  console.log('BATCH SUMMARY');
  console.log('══════════════════════════════════════');
  console.log(`  Processed:     ${stats.processed}`);
  console.log(`  Updated:       ${stats.updated}`);
  console.log(`  Skipped:       ${stats.skipped}`);
  console.log(`  Errors:        ${stats.errors}`);
  console.log(`  Google OK:     ${stats.googleOk}`);
  console.log(`  BBB data:      ${stats.bbbOk}`);
  console.log(`  Supabase:      ${stats.supabase}`);
  console.log(`  Catalog:       ${stats.catalog}`);
  console.log('══════════════════════════════════════');

  if (updatedSlugs.length) {
    console.log(`\nUpdated slugs (${updatedSlugs.length}):`);
    for (const slug of updatedSlugs) {
      console.log(`  https://www.movetrusthub.com/companies/${slug}`);
    }
  }

  if (errorLog.length) {
    console.log('\nErrors:');
    for (const e of errorLog) {
      console.log(`  ${e.slug}: ${e.error}`);
    }
  }

  if (!opts.dryRun) {
    await recordBatchAudit(admin, opts, candidates.length, stats, updatedSlugs, errorLog);
  }

  if (!opts.dryRun && stats.updated > 0) {
    const nextOffset = opts.offset + opts.batch;
    console.log('\nNext batch:');
    console.log(
      `  npx tsx --require ./scripts/stub-server-only.cjs scripts/backfill-all-companies.ts --batch ${opts.batch} --offset ${nextOffset}`
    );
  }

  return { stats, exitCode: stats.errors > 0 ? 1 : 0 };
}