import 'server-only';

import { unstable_cache } from 'next/cache';
import {
  applyProfilePublicationMap,
  getCachedApprovedMoversByCounty,
  loadProfileFacts,
} from '@/lib/local-movers/approved-county-movers';
import { getCanaryMoversForCounty } from '@/lib/local-movers/canary-county-movers';
import {
  evaluateCountyIndexabilityFromResult,
  type CountyIndexDecision,
} from '@/lib/local-movers/county-indexability';
import { getAllCountyParams } from '@/lib/local-movers/geography/index';
import { assembleShownCountyMovers } from '@/lib/local-movers/county-listing';
import { getMoversForCounty } from '@/lib/local-movers/index';
import {
  applyPremiumCapToDecision,
  closedPremiumCapDecision,
  premiumAllowanceKeys,
  type PremiumCapRow,
} from '@/lib/local-movers/premium-index-cap';
import { pageSeedMovers } from '@/lib/local-movers/seed-county-coverage';
import type { LocalMover } from '@/lib/local-movers/types';
import { logger } from '@/lib/logging/logger';

/**
 * Runtime Premium cap.
 *
 * Scores every county from the same mover set as the page: filtered seed,
 * profile publication, approved directory rows, and FL/WA canary movers.
 * The cap changes a county only when more than 400 counties qualify as
 * Premium. Ranking is score descending, then state and county. Standard is
 * not capped. If the directory map cannot be loaded, the ranking uses the
 * filtered seed list plus canaries.
 *
 * Over-cap Premium counties become Standard when they meet the Standard score
 * floor, and noindex otherwise. See premium-index-cap.ts.
 */
async function computePremiumAllowance(): Promise<{ keys: string[]; premiumCount: number }> {
  let approved: Record<string, LocalMover[]> = {};
  try {
    approved = await getCachedApprovedMoversByCounty();
  } catch (err) {
    logger.warn('premium_cap.approved_movers_unavailable', {
      message: err instanceof Error ? err.message : String(err),
    });
    approved = {};
  }

  const params = getAllCountyParams();
  const bases = params.map(({ stateSlug, countySlug }) => ({
    stateSlug,
    countySlug,
    base: getMoversForCounty(stateSlug, countySlug),
  }));
  const profileSlugs: string[] = [];
  for (const entry of bases) {
    if (!entry.base) continue;
    for (const mover of entry.base.movers) {
      const slug = mover.profileSlug?.trim();
      if (slug) profileSlugs.push(slug);
    }
  }
  const profileFacts = await loadProfileFacts(profileSlugs);
  const headquartersBySlug = new Map(
    [...profileFacts].map(([slug, facts]) => [slug, facts.headquarters])
  );

  const rows: PremiumCapRow[] = [];
  for (const { stateSlug, countySlug, base } of bases) {
    if (!base) continue;
    const seeded = applyProfilePublicationMap(
      pageSeedMovers(base.county, base.movers, headquartersBySlug),
      profileFacts
    );
    const directory = approved[`${stateSlug}::${countySlug}`] ?? [];
    let canary: LocalMover[] = [];
    if (stateSlug === 'florida' || stateSlug === 'washington') {
      try {
        canary = await getCanaryMoversForCounty(stateSlug, countySlug);
      } catch (err) {
        logger.warn('premium_cap.canary_unavailable', {
          stateSlug,
          countySlug,
          message: err instanceof Error ? err.message : String(err),
        });
      }
    }
    const shown = assembleShownCountyMovers(base.county, seeded, directory, canary);
    const decision = evaluateCountyIndexabilityFromResult(stateSlug, countySlug, {
      county: base.county,
      movers: shown.movers,
      isRegionalFallback: base.isRegionalFallback && shown.directoryCount === 0,
    });
    rows.push({
      stateSlug,
      countySlug,
      tier: decision.tier,
      seoTier: decision.seoTier,
      qualityScore: decision.qualityScore,
    });
  }

  const premiumCount = rows.filter((row) => row.tier === 'index' && row.seoTier === 1).length;
  return { keys: [...premiumAllowanceKeys(rows)], premiumCount };
}

const loadPremiumAllowanceCached = unstable_cache(
  computePremiumAllowance,
  ['premium-index-cap-v2-canary'],
  { revalidate: 60 }
);

export type PremiumAllowance = {
  keys: ReadonlySet<string>;
  premiumCount: number;
};

export async function loadPremiumAllowance(): Promise<PremiumAllowance> {
  const loaded = await loadPremiumAllowanceCached();
  return { keys: new Set(loaded.keys), premiumCount: loaded.premiumCount };
}

export async function capCountyIndexDecision(
  stateSlug: string,
  countySlug: string,
  decision: CountyIndexDecision
): Promise<CountyIndexDecision> {
  if (decision.tier !== 'index' || decision.seoTier !== 1) return decision;
  try {
    const allowed = await loadPremiumAllowance();
    return applyPremiumCapToDecision(
      decision,
      stateSlug,
      countySlug,
      allowed.keys,
      allowed.premiumCount
    );
  } catch (err) {
    logger.warn('premium_cap.allowance_failed', {
      stateSlug,
      countySlug,
      message: err instanceof Error ? err.message : String(err),
    });
    return closedPremiumCapDecision(decision, stateSlug, countySlug);
  }
}

