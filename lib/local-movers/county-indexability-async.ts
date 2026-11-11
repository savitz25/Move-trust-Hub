import 'server-only';

import {
  evaluateCountyIndexabilityFromResult,
  type CountyIndexDecision,
} from '@/lib/local-movers/county-indexability';
import { getMoversForCountyAsync, type CountyMoversResult } from '@/lib/local-movers/get-movers-for-county-async';
import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { capCountyIndexDecision } from '@/lib/local-movers/runtime-premium-cap';
import type { LocalCounty } from '@/lib/local-movers/types';

export type PublishedCountyEvaluation = {
  county: LocalCounty;
  result: CountyMoversResult | null;
  decision: CountyIndexDecision;
};

/** Same cap and mover list the county page and the local sitemap use. */
export async function publishedCountyIndexDecision(
  stateSlug: string,
  countySlug: string,
  result: CountyMoversResult | null
): Promise<CountyIndexDecision> {
  return capCountyIndexDecision(
    stateSlug,
    countySlug,
    evaluateCountyIndexabilityFromResult(stateSlug, countySlug, result)
  );
}

/** One pass of the shipped loader for every county in a state. */
export async function evaluatePublishedStateCounties(
  stateSlug: string
): Promise<PublishedCountyEvaluation[]> {
  const counties = getCountiesForState(stateSlug);
  return Promise.all(
    counties.map(async (county) => {
      const result = await getMoversForCountyAsync(stateSlug, county.slug);
      const decision = await publishedCountyIndexDecision(stateSlug, county.slug, result);
      return { county, result, decision };
    })
  );
}

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
  const result = await getMoversForCountyAsync(stateSlug, countySlug);
  return publishedCountyIndexDecision(stateSlug, countySlug, result);
}

export async function shouldIndexCountyAsync(
  stateSlug: string,
  countySlug: string
): Promise<boolean> {
  const decision = await evaluateCountyIndexabilityAsync(stateSlug, countySlug);
  return decision.tier === 'index';
}