import 'server-only';

import { enrichProviderSources } from '@/lib/insurance/enrichment/enrich-provider';
import { persistProviderEnrichment } from '@/lib/insurance/enrichment/persist';
import { getAllEnrichments } from '@/lib/insurance/enrichment/store';
import { listEnrichmentTargets } from '@/lib/insurance/enrichment/targets';
import type { ProviderEnrichmentRecord } from '@/lib/insurance/enrichment/types';

export type ProviderRefreshMode = 'full' | 'incremental';

export type ProviderRefreshOptions = {
  mode?: ProviderRefreshMode;
  limit?: number;
  offset?: number;
  slug?: string;
  dryRun?: boolean;
  concurrency?: number;
  /** Days between re-enrichment in incremental mode */
  staleDays?: number;
};

export type ProviderRefreshResult = {
  status: 'ok' | 'partial' | 'failed';
  mode: ProviderRefreshMode;
  dryRun: boolean;
  processed: number;
  enriched: number;
  skipped: number;
  failed: number;
  manualReview: number;
  errors: Array<{ slug: string; message: string }>;
  durationMs: number;
};

const DEFAULT_CONCURRENCY = 2;
const INTER_PROVIDER_DELAY_MS = 750;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const i = index++;
      results[i] = await fn(items[i]!);
      if (i < items.length - 1) await sleep(INTER_PROVIDER_DELAY_MS);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return results;
}

function isStale(enrichedAt: string | undefined, staleDays: number): boolean {
  if (!enrichedAt) return true;
  const ageMs = Date.now() - new Date(enrichedAt).getTime();
  return ageMs > staleDays * 24 * 60 * 60 * 1000;
}

export async function runProviderEnrichmentRefresh(
  options: ProviderRefreshOptions = {}
): Promise<ProviderRefreshResult> {
  const started = Date.now();
  const mode = options.mode ?? 'incremental';
  const dryRun = Boolean(options.dryRun);
  const concurrency = options.concurrency ?? DEFAULT_CONCURRENCY;
  const staleDays = options.staleDays ?? 7;

  let targets = await listEnrichmentTargets();

  if (options.slug) {
    targets = targets.filter((p) => p.slug === options.slug);
  }
  if (options.offset) {
    targets = targets.slice(options.offset);
  }
  if (options.limit) {
    targets = targets.slice(0, options.limit);
  }

  if (mode === 'incremental') {
    const store = getAllEnrichments();
    targets = targets.filter((p) => isStale(store[p.slug]?.enriched_at, staleDays));
  }

  const errors: ProviderRefreshResult['errors'] = [];
  let enriched = 0;
  let skipped = 0;
  let failed = 0;
  let manualReview = 0;

  await mapWithConcurrency(targets, concurrency, async (target) => {
    try {
      const store = getAllEnrichments();
      const existing = store[target.slug];

      const record: ProviderEnrichmentRecord = await enrichProviderSources({
        ...target,
        googlePlaceId: existing?.google_place_id ?? target.googlePlaceId,
      });

      if (
        record.enrichment_json.partial_failures.length > 0 &&
        !record.google_rating &&
        !record.bbb_rating
      ) {
        skipped++;
        errors.push({
          slug: target.slug,
          message: record.enrichment_json.partial_failures.join('; '),
        });
        return;
      }

      if (record.needs_manual_review) {
        manualReview++;
      }

      if (!dryRun) {
        const persisted = await persistProviderEnrichment(target, record);
        if (persisted.dbError) {
          errors.push({ slug: target.slug, message: persisted.dbError });
        }
      }

      enriched++;
    } catch (err) {
      failed++;
      errors.push({
        slug: target.slug,
        message: err instanceof Error ? err.message : 'Unknown enrichment error',
      });
    }
  });

  const processed = targets.length;
  const status: ProviderRefreshResult['status'] =
    failed > 0 && enriched === 0
      ? 'failed'
      : failed > 0 || errors.length > enriched
        ? 'partial'
        : 'ok';

  return {
    status,
    mode,
    dryRun,
    processed,
    enriched,
    skipped,
    failed,
    manualReview,
    errors: errors.slice(0, 50),
    durationMs: Date.now() - started,
  };
}