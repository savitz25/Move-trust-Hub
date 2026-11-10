import 'server-only';

import { unstable_cache } from 'next/cache';
import { getCachedApprovedMoversByCounty } from '@/lib/local-movers/approved-county-movers';
import {
  evaluateCountyIndexabilityFromResult,
  type CountyIndexDecision,
} from '@/lib/local-movers/county-indexability';
import { getAllCountyParams } from '@/lib/local-movers/geography/index';
import { getMoversForCounty } from '@/lib/local-movers/index';
import { mergeApprovedMovers } from '@/lib/local-movers/merge-approved-movers';
import {
  applyPremiumCapToDecision,
  premiumAllowanceKeys,
  type PremiumCapRow,
} from '@/lib/local-movers/premium-index-cap';
import { filterSeedMoversForCountyCoverage } from '@/lib/local-movers/seed-county-coverage';
import type { LocalMover } from '@/lib/local-movers/types';
import { logger } from '@/lib/logging/logger';

/**
 * Runtime Premium cap.
 *
 * Scores every county from the seed catalog (after the coverage filter) plus
 * the cached directory mover map, then keeps the top 400 Premium counties.
 * Standard is not capped. If the directory map cannot be loaded, the ranking
 * uses the filtered seed list only, which still enforces the cap.
 *
 * Over-cap Premium counties become Standard when they meet the Standard score
 * floor, and noindex otherwise. See premium-index-cap.ts.
 */
async function computePremiumAllowanceKeys(): Promise<string[]> {
  let approved: Record<string, LocalMover[]> = {};
  try {
    approved = await getCachedApprovedMoversByCounty();
  } catch (err) {
    logger.warn('premium_cap.approved_movers_unavailable', {
      message: err instanceof Error ? err.message : String(err),
    });
    approved = {};
  }

  const rows: PremiumCapRow[] = [];
  for (const { stateSlug, countySlug } of getAllCountyParams()) {
    const base = getMoversForCounty(stateSlug, countySlug);
    if (!base) continue;
    const seeded = filterSeedMoversForCountyCoverage(base.county, base.movers);
    const directory = approved[`${stateSlug}::${countySlug}`] ?? [];
    const movers = directory.length
      ? mergeApprovedMovers(seeded, directory, Math.max(80, seeded.length + directory.length))
      : seeded;
    const decision = evaluateCountyIndexabilityFromResult(stateSlug, countySlug, {
      county: base.county,
      movers,
      isRegionalFallback: base.isRegionalFallback && directory.length === 0,
    });
    rows.push({
      stateSlug,
      countySlug,
      tier: decision.tier,
      seoTier: decision.seoTier,
      qualityScore: decision.qualityScore,
    });
  }

  return [...premiumAllowanceKeys(rows)];
}

const loadPremiumAllowanceKeys = unstable_cache(
  computePremiumAllowanceKeys,
  ['premium-index-cap-v1'],
  { revalidate: 60 }
);

export async function loadPremiumAllowance(): Promise<ReadonlySet<string>> {
  const keys = await loadPremiumAllowanceKeys();
  return new Set(keys);
}

export async function capCountyIndexDecision(
  stateSlug: string,
  countySlug: string,
  decision: CountyIndexDecision
): Promise<CountyIndexDecision> {
  if (decision.tier !== 'index' || decision.seoTier !== 1) return decision;
  try {
    const allowed = await loadPremiumAllowance();
    return applyPremiumCapToDecision(decision, stateSlug, countySlug, allowed);
  } catch (err) {
    logger.warn('premium_cap.allowance_failed', {
      stateSlug,
      countySlug,
      message: err instanceof Error ? err.message : String(err),
    });
    // Fail closed under the cap: this Premium county is not proven to be inside it.
    return applyPremiumCapToDecision(decision, stateSlug, countySlug, new Set());
  }
}

