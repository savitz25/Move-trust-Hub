import 'server-only';

import { cache } from 'react';
import { unstable_noStore } from 'next/cache';
import {
  getApprovedMoversForState,
  loadProfileFacts,
  recheckPublishedCompanySlugs,
} from '@/lib/local-movers/approved-county-movers';
import { mapWithConcurrency } from '@/lib/local-movers/bounded-concurrency';
import {
  evaluateCountyIndexabilityFromResult,
  type CountyIndexDecision,
} from '@/lib/local-movers/county-indexability';
import {
  getMoversForCountyAsync,
  type CountyLoadShare,
  type CountyMoversResult,
} from '@/lib/local-movers/get-movers-for-county-async';
import { getMoversForCounty } from '@/lib/local-movers/index';
import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { logger } from '@/lib/logging/logger';
import { capCountyIndexDecision } from '@/lib/local-movers/runtime-premium-cap';
import {
  settleStateCountyLoads,
  STATE_COUNTY_LOAD_CONCURRENCY,
  type CompleteStateSnapshot,
  type FreshCountyLoad,
} from '@/lib/local-movers/state-county-fanout';
import {
  readCompleteStateSnapshot,
  writeCompleteStateSnapshot,
} from '@/lib/local-movers/state-county-snapshot';
import type { LocalCounty } from '@/lib/local-movers/types';

export type PublishedCountyEvaluation = {
  county: LocalCounty;
  result: CountyMoversResult | null;
  decision: CountyIndexDecision;
};

const FAILED_DECISION: CountyIndexDecision = {
  tier: 'noindex',
  reason: 'county_load_failed',
  seoTier: 3,
  qualityScore: 0,
};

/** Same cap and mover list the county page and the local sitemap use. */
export async function publishedCountyIndexDecision(
  stateSlug: string,
  countySlug: string,
  result: CountyMoversResult | null
): Promise<CountyIndexDecision> {
  if (result?.loadStatus === 'failed') return FAILED_DECISION;
  return capCountyIndexDecision(
    stateSlug,
    countySlug,
    evaluateCountyIndexabilityFromResult(stateSlug, countySlug, result)
  );
}

function countyKey(stateSlug: string, countySlug: string) {
  return `${stateSlug}::${countySlug}`;
}

async function loadFreshStateCounties(stateSlug: string): Promise<FreshCountyLoad[]> {
  const counties = getCountiesForState(stateSlug);
  const started = Date.now();
  let approvedByCounty: Record<string, CountyMoversResult['movers']> | null = null;
  let approvedFailure: string | null = null;
  try {
    approvedByCounty = await getApprovedMoversForState(stateSlug);
  } catch (err) {
    approvedFailure = err instanceof Error ? err.message : String(err);
    logger.warn('state_counties.approved_load_failed', {
      stateSlug,
      message: approvedFailure,
      failure: approvedFailure.includes('timeout') ? 'timeout' : 'error',
      durationMs: Date.now() - started,
    });
  }

  const profileSlugs: string[] = [];
  for (const county of counties) {
    const raw = getMoversForCounty(stateSlug, county.slug);
    if (!raw) continue;
    for (const mover of raw.movers) {
      const slug = mover.profileSlug?.trim();
      if (slug) profileSlugs.push(slug);
    }
  }
  const profileFacts = await loadProfileFacts(profileSlugs);

  return mapWithConcurrency(counties, STATE_COUNTY_LOAD_CONCURRENCY, async (county) => {
    const share: CountyLoadShare = { profileFacts };
    if (approvedByCounty) {
      share.skipApprovedFetch = true;
      share.approved = approvedByCounty[countyKey(stateSlug, county.slug)] ?? [];
    } else if (approvedFailure) {
      share.skipApprovedFetch = true;
      share.approvedFailed = true;
    }
    try {
      const result = await getMoversForCountyAsync(stateSlug, county.slug, share);
      const failed = result?.loadStatus === 'failed';
      return {
        county,
        result,
        loadStatus: failed ? ('failed' as const) : ('ok' as const),
        failureReason: result?.loadFailure,
      };
    } catch (err) {
      logger.warn('state_counties.county_load_failed', {
        stateSlug,
        countySlug: county.slug,
        message: err instanceof Error ? err.message : String(err),
        failure: 'error',
      });
      return {
        county,
        result: null,
        loadStatus: 'failed' as const,
        failureReason: 'error' as const,
      };
    }
  });
}

async function evaluateSettledState(
  stateSlug: string,
  fresh: FreshCountyLoad[]
): Promise<PublishedCountyEvaluation[]> {
  const freshComplete = fresh.every((row) => row.loadStatus === 'ok');
  let snapshot: CompleteStateSnapshot | null = null;
  let publication: Awaited<ReturnType<typeof recheckPublishedCompanySlugs>> | null = null;
  if (!freshComplete) {
    snapshot = await readCompleteStateSnapshot(stateSlug);
    if (snapshot) {
      const slugs = snapshot.entries.flatMap((entry) =>
        entry.result.movers.map((mover) => mover.profileSlug?.trim() ?? '').filter(Boolean)
      );
      publication = await recheckPublishedCompanySlugs(slugs);
    }
    unstable_noStore();
  }

  const settled = settleStateCountyLoads({ fresh, snapshot, publication });
  if (!settled.cacheable) {
    logger.warn('state_counties.degraded', {
      stateSlug,
      failedCounties: settled.failedCounties,
      usedFallback: settled.usedFallback,
      publicationRecheck: publication?.status ?? 'not_run',
      cacheable: false,
      failure: settled.failedCounties.length ? 'timeout_or_error' : 'fallback',
    });
  }

  const evaluations: PublishedCountyEvaluation[] = [];
  for (const row of settled.settled) {
    const county = row.county;
    const result = row.result;
    const decision =
      row.loadStatus === 'failed'
        ? FAILED_DECISION
        : await publishedCountyIndexDecision(stateSlug, county.slug, result);
    evaluations.push({ county, result, decision });
  }

  if (freshComplete) {
    const entries = fresh.flatMap((row) =>
      row.result ? [{ countySlug: row.county.slug, result: row.result }] : []
    );
    try {
      await writeCompleteStateSnapshot({
        stateSlug,
        complete: true,
        entries,
        storedAt: new Date().toISOString(),
      });
    } catch (err) {
      logger.warn('state_counties.snapshot_persist_failed', {
        stateSlug,
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return evaluations;
}

/** One bounded pass of the shipped loader for every county in a state. */
export const evaluatePublishedStateCounties = cache(async function evaluatePublishedStateCounties(
  stateSlug: string
): Promise<PublishedCountyEvaluation[]> {
  const fresh = await loadFreshStateCounties(stateSlug);
  return evaluateSettledState(stateSlug, fresh);
});

/** Counties the state directory and the sitemap may link. */
export async function getPublishedIndexableCounties(stateSlug: string): Promise<LocalCounty[]> {
  const evaluated = await evaluatePublishedStateCounties(stateSlug);
  return evaluated.filter((entry) => entry.decision.tier === 'index').map((entry) => entry.county);
}

/** Authoritative evaluator — matches live county page mover resolution. */
export async function evaluateCountyIndexabilityAsync(
  stateSlug: string,
  countySlug: string
) {
  const evaluated = await evaluatePublishedStateCounties(stateSlug);
  return (
    evaluated.find((entry) => entry.county.slug === countySlug)?.decision ?? {
      tier: 'noindex' as const,
      reason: 'missing_county',
      seoTier: 3 as const,
      qualityScore: 0,
    }
  );
}

export async function publishedCountyEvaluation(
  stateSlug: string,
  countySlug: string
): Promise<PublishedCountyEvaluation | null> {
  const evaluated = await evaluatePublishedStateCounties(stateSlug);
  return evaluated.find((entry) => entry.county.slug === countySlug) ?? null;
}

export async function shouldIndexCountyAsync(
  stateSlug: string,
  countySlug: string
): Promise<boolean> {
  const decision = await evaluateCountyIndexabilityAsync(stateSlug, countySlug);
  return decision.tier === 'index';
}
