import 'server-only';

import { getApprovedMoversForCounty } from '@/lib/local-movers/approved-county-movers';
import {
  getMoversForCounty,
  hasExplicitCountyAssignment,
} from '@/lib/local-movers/index';
import { mergeApprovedMovers } from '@/lib/local-movers/merge-approved-movers';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

const MAX_MOVERS_PER_COUNTY = 10;
const LARGE_MARKET_MAX_MOVERS = 40;

export async function getMoversForCountyAsync(
  stateSlug: string,
  countySlug: string
): Promise<{ county: LocalCounty; movers: LocalMover[]; isRegionalFallback: boolean } | null> {
  const base = getMoversForCounty(stateSlug, countySlug);
  if (!base) return null;

  const approved = await getApprovedMoversForCounty(stateSlug, countySlug);
  if (!approved.length) return base;

  const hasExplicitAssignment = hasExplicitCountyAssignment(stateSlug, countySlug);
  const displayLimit = Math.max(
    hasExplicitAssignment ? LARGE_MARKET_MAX_MOVERS : MAX_MOVERS_PER_COUNTY,
    base.movers.length + approved.length
  );

  return {
    ...base,
    movers: mergeApprovedMovers(base.movers, approved, displayLimit),
  };
}