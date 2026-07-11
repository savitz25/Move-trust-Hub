import 'server-only';

import { lenders } from '@/lib/lender/mockData';
import { enrichLenderSources } from '@/lib/lender/enrichment/enrich-lender';
import { persistLenderEnrichment } from '@/lib/lender/enrichment/persist';
import type { LenderEnrichmentRecord } from '@/lib/lender/enrichment/types';

export type LenderRefreshMode = 'full' | 'incremental';

export type LenderRefreshOptions = {
  mode?: LenderRefreshMode;
  limit?: number;
  offset?: number;
  slug?: string;
  dryRun?: boolean;
  concurrency?: number;
  /** Days between re-enrichment in incremental mode */
  staleDays?: number;
};

export type LenderRefreshResult = {
  status: 'ok' | 'partial' | 'failed';
  mode: LenderRefreshMode;
  dryRun: boolean;
  processed: number;
  enriched: number;
  skipped: number;
  failed: number;
  errors: Array<{ slug: string; message: string }>;
  durationMs: number;
};

const DEFAULT_CONCURRENCY = 2;
const INTER_LENDER_DELAY_MS = 750;

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
      if (i < items.length - 1) await sleep(INTER_LENDER_DELAY_MS);
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

export async function runLenderEnrichmentRefresh(
  options: LenderRefreshOptions = {}
): Promise<LenderRefreshResult> {
  const started = Date.now();
  const mode = options.mode ?? 'incremental';
  const dryRun = Boolean(options.dryRun);
  const concurrency = options.concurrency ?? DEFAULT_CONCURRENCY;
  const staleDays = options.staleDays ?? 7;

  let targets = [...lenders];
  if (options.slug) {
    targets = targets.filter((l) => l.slug === options.slug);
  }
  if (options.offset) {
    targets = targets.slice(options.offset);
  }
  if (options.limit) {
    targets = targets.slice(0, options.limit);
  }

  if (mode === 'incremental') {
    const { readEnrichmentStore } = await import('@/lib/lender/enrichment/store');
    const store = readEnrichmentStore();
    targets = targets.filter((l) => isStale(store[l.slug]?.enriched_at, staleDays));
  }

  const errors: LenderRefreshResult['errors'] = [];
  let enriched = 0;
  let skipped = 0;
  let failed = 0;

  await mapWithConcurrency(targets, concurrency, async (lender) => {
    try {
      const { readEnrichmentStore } = await import('@/lib/lender/enrichment/store');
      const existing = readEnrichmentStore()[lender.slug];

      const record: LenderEnrichmentRecord = await enrichLenderSources({
        slug: lender.slug,
        name: lender.name,
        nmlsId: lender.nmlsId,
        city: lender.city,
        state: lender.state,
        stateSlug: lender.stateSlug,
        county: lender.county,
        countySlug: lender.countySlug,
        zipCodes: lender.zipCodes,
        website: lender.website,
        phone: lender.phone,
        googlePlaceId: existing?.google_place_id,
      });

      if (record.enrichment_json.partial_failures.length > 0 && !record.google_rating && !record.bbb_rating) {
        skipped++;
        errors.push({
          slug: lender.slug,
          message: record.enrichment_json.partial_failures.join('; '),
        });
        return;
      }

      if (!dryRun) {
        const persisted = await persistLenderEnrichment(lender, record);
        if (persisted.dbError) {
          errors.push({ slug: lender.slug, message: persisted.dbError });
        }
      }

      enriched++;
    } catch (err) {
      failed++;
      errors.push({
        slug: lender.slug,
        message: err instanceof Error ? err.message : 'Unknown enrichment error',
      });
    }
  });

  const processed = targets.length;
  const status: LenderRefreshResult['status'] =
    failed > 0 && enriched === 0 ? 'failed' : failed > 0 || errors.length > enriched ? 'partial' : 'ok';

  return {
    status,
    mode,
    dryRun,
    processed,
    enriched,
    skipped,
    failed,
    errors: errors.slice(0, 50),
    durationMs: Date.now() - started,
  };
}