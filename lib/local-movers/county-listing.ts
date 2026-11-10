import { enrichMoversLocations } from '@/lib/local-movers/enrich-mover-location';
import { hasExplicitCountyAssignment } from '@/lib/local-movers/index';
import { mergeApprovedMovers } from '@/lib/local-movers/merge-approved-movers';
import { segmentCountyMovers } from '@/lib/local-movers/segment-county-movers';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

const MAX_MOVERS_PER_COUNTY = 10;
const LARGE_MARKET_MAX_MOVERS = 40;

/**
 * The mover list a county page shows, and the list the Premium cap scores.
 * Directory and canary rows come first. Seed rows are already coverage-filtered.
 */
export function assembleShownCountyMovers(
  county: LocalCounty,
  seed: LocalMover[],
  approved: LocalMover[],
  canary: LocalMover[]
): { movers: LocalMover[]; directoryCount: number } {
  const directoryLocals = mergeApprovedMovers(approved, canary, 80);
  if (!directoryLocals.length) {
    return { movers: seed, directoryCount: 0 };
  }
  const hasExplicit = hasExplicitCountyAssignment(county.stateSlug, county.slug);
  const displayLimit = Math.max(
    hasExplicit ? LARGE_MARKET_MAX_MOVERS : MAX_MOVERS_PER_COUNTY,
    seed.length + directoryLocals.length,
    directoryLocals.length + 10,
    40
  );
  const merged = mergeApprovedMovers(seed, directoryLocals, displayLimit);
  return {
    movers: segmentCountyMovers(enrichMoversLocations(merged), county).ordered,
    directoryCount: directoryLocals.length,
  };
}
