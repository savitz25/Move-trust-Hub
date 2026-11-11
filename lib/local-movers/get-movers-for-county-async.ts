import 'server-only';

import {
  applyProfilePublicationMap,
  getApprovedMoversForCounty,
  loadProfileFacts,
} from '@/lib/local-movers/approved-county-movers';
import { getCanaryMoversForCounty } from '@/lib/local-movers/canary-county-movers';
import { assembleShownCountyMovers } from '@/lib/local-movers/county-listing';
import { getMoversForCounty } from '@/lib/local-movers/index';
import { pageSeedMovers } from '@/lib/local-movers/seed-county-coverage';
import { isProductionBuildPhase } from '@/lib/ssg/ssg-params';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';
import { logger } from '@/lib/logging/logger';

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
  const raw = getMoversForCounty(stateSlug, countySlug);
  if (!raw) return null;
  const profileSlugs = raw.movers
    .map((mover) => mover.profileSlug?.trim() ?? '')
    .filter(Boolean);
  const profileFacts = await loadProfileFacts(profileSlugs);
  const headquartersBySlug = new Map(
    [...profileFacts].map(([slug, facts]) => [slug, facts.headquarters])
  );
  const base = {
    ...raw,
    movers: applyProfilePublicationMap(
      pageSeedMovers(raw.county, raw.movers, headquartersBySlug),
      profileFacts
    ),
  };

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

  // Task 011D.3: exact local canary (PUBLISHABLE + home-county evidence), FL/WA only.
  let canary: LocalMover[] = [];
  try {
    canary = await getCanaryMoversForCounty(stateSlug, countySlug);
  } catch (err) {
    logger.warn('county_movers.canary_fetch_failed', {
      stateSlug,
      countySlug,
      message: err instanceof Error ? err.message : String(err),
    });
  }

  const shown = assembleShownCountyMovers(base.county, base.movers, approved, canary);
  const onlyApproved =
    shown.directoryCount > 0 && shown.movers.every((mover) => mover.listingSource === 'directory');
  const sourceMode: MoverSourceMode = approvedFetchFailed && shown.directoryCount === 0
    ? 'degraded'
    : onlyApproved
      ? 'db'
      : shown.directoryCount > 0
        ? 'hybrid'
        : 'seed';

  return {
    ...base,
    isRegionalFallback: base.isRegionalFallback && shown.directoryCount === 0,
    movers: shown.movers,
    sourceMode,
    approvedCount: shown.directoryCount,
    catalogCount: base.movers.length,
  };
}
