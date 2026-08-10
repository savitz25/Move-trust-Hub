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
import { logger } from '@/lib/logging/logger';

const MAX_MOVERS_PER_COUNTY = 10;
const LARGE_MARKET_MAX_MOVERS = 40;

export type MoverSourceMode = 'db' | 'seed' | 'hybrid' | 'degraded';

export type CountyMoversResult = {
  county: LocalCounty;
  movers: LocalMover[];
  isRegionalFallback: boolean;
  /** How the list was assembled — for health + degraded UI. */
  sourceMode: MoverSourceMode;
  approvedCount: number;
  catalogCount: number;
};

/**
 * Resolve movers for a county: catalog assignments + approved Supabase locals.
 *
 * Merge order (local-movers pages):
 *  1) Approved onboarded / assignment rows from are (directory locals first)
 *  2) Curated county assignment / seed catalog fill
 *
 * Never silently pretends seed-only is a full directory when Supabase failed —
 * sourceMode === 'degraded' when approved fetch soft-failed and only catalog remains.
 */
export async function getMoversForCountyAsync(
  stateSlug: string,
  countySlug: string
): Promise<CountyMoversResult | null> {
  const base = getMoversForCounty(stateSlug, countySlug);
  if (!base) return null;

  // Bulk SSG without Supabase: seed catalog only (opt-in via BULK_SSG without FORCE).
  // Runtime / on-demand / revalidate always merges approved movers.
  // CRITICAL: must merge at runtime or funnel-onboarded locals never appear.
  const skipApproved =
    isProductionBuildPhase() &&
    process.env.BULK_SSG === '1' &&
    process.env.FORCE_APPROVED_MOVERS !== '1';

  if (skipApproved) {
    return {
      ...base,
      sourceMode: 'seed',
      approvedCount: 0,
      catalogCount: base.movers.length,
    };
  }

  let approved: LocalMover[] = [];
  let approvedFetchFailed = false;
  try {
    approved = await getApprovedMoversForCounty(stateSlug, countySlug);
  } catch (err) {
    approvedFetchFailed = true;
    logger.error('county_movers.approved_fetch_failed', {
      stateSlug,
      countySlug,
      message: err instanceof Error ? err.message : String(err),
    });
  }

  if (!approved.length) {
    const sourceMode: MoverSourceMode = approvedFetchFailed
      ? 'degraded'
      : base.movers.length
        ? 'seed'
        : 'seed';
    return {
      ...base,
      sourceMode,
      approvedCount: 0,
      catalogCount: base.movers.length,
    };
  }

  const hasExplicitAssignment = hasExplicitCountyAssignment(stateSlug, countySlug);
  // Always room for every approved local + a healthy catalog fill for large markets.
  const displayLimit = Math.max(
    hasExplicitAssignment ? LARGE_MARKET_MAX_MOVERS : MAX_MOVERS_PER_COUNTY,
    base.movers.length + approved.length,
    approved.length + 10,
    40
  );

  const merged = mergeApprovedMovers(base.movers, approved, displayLimit);
  const enriched = enrichMoversLocations(merged);
  const onlyApproved =
    approved.length > 0 && merged.every((m) => m.listingSource === 'directory');
  const sourceMode: MoverSourceMode = onlyApproved
    ? 'db'
    : approved.length > 0
      ? 'hybrid'
      : 'seed';

  return {
    ...base,
    isRegionalFallback: base.isRegionalFallback && approved.length === 0,
    movers: segmentCountyMovers(enriched, base.county).ordered,
    sourceMode,
    approvedCount: approved.length,
    catalogCount: base.movers.length,
  };
}
