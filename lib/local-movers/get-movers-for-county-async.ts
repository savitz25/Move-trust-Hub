import 'server-only';

import { getApprovedMoversForCounty } from '@/lib/local-movers/approved-county-movers';
import {
  getMoversForCounty,
  hasExplicitCountyAssignment,
} from '@/lib/local-movers/index';
import { mergeApprovedMovers } from '@/lib/local-movers/merge-approved-movers';
import { enrichMoversLocations } from '@/lib/local-movers/enrich-mover-location';
import { segmentCountyMovers } from '@/lib/local-movers/segment-county-movers';
import { isProductionBuildPhase } from '@/lib/ssg/ssg-params';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

const MAX_MOVERS_PER_COUNTY = 10;
const LARGE_MARKET_MAX_MOVERS = 40;

export async function getMoversForCountyAsync(
  stateSlug: string,
  countySlug: string
): Promise<{ county: LocalCounty; movers: LocalMover[]; isRegionalFallback: boolean } | null> {
  const base = getMoversForCounty(stateSlug, countySlug);
  if (!base) return null;

  // Bulk SSG + live Supabase cannot coexist on Vercel (thousands of concurrent calls).
  // Seed catalog is enough for build; runtime / on-demand pages merge approved movers.
  if (isProductionBuildPhase() && process.env.BULK_SSG !== '1') {
    return base;
  }

  const approved = await getApprovedMoversForCounty(stateSlug, countySlug);
  if (!approved.length) return base;

  const hasExplicitAssignment = hasExplicitCountyAssignment(stateSlug, countySlug);
  // Always room for every approved local + a healthy catalog fill for large markets.
  const displayLimit = Math.max(
    hasExplicitAssignment ? LARGE_MARKET_MAX_MOVERS : MAX_MOVERS_PER_COUNTY,
    base.movers.length + approved.length,
    approved.length + 10
  );

  const merged = mergeApprovedMovers(base.movers, approved, displayLimit);
  const enriched = enrichMoversLocations(merged);
  return {
    ...base,
    // Once directory locals are present, treat as explicit county coverage (not pure regional fallback).
    isRegionalFallback: base.isRegionalFallback && approved.length === 0,
    movers: segmentCountyMovers(enriched, base.county).ordered,
  };
}