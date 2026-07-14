import 'server-only';

import { evaluateCountyIndexabilityFromResult } from '@/lib/local-movers/county-indexability';
import { getMoversForCountyAsync } from '@/lib/local-movers/get-movers-for-county-async';

/** Authoritative evaluator — matches live county page mover resolution. */
export async function evaluateCountyIndexabilityAsync(
  stateSlug: string,
  countySlug: string
) {
  const result = await getMoversForCountyAsync(stateSlug, countySlug);
  return evaluateCountyIndexabilityFromResult(stateSlug, countySlug, result);
}

export async function shouldIndexCountyAsync(
  stateSlug: string,
  countySlug: string
): Promise<boolean> {
  const decision = await evaluateCountyIndexabilityAsync(stateSlug, countySlug);
  return decision.tier === 'index';
}