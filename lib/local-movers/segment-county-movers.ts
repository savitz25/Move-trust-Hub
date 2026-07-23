import {
  localRelevanceScore,
  moverQualityScore,
  rankCountyMovers,
} from '@/lib/local-movers/rank-county-movers';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

export type CountyMoverSegment = 'local_in_state' | 'national';

export type SegmentedCountyMovers = {
  localInState: LocalMover[];
  national: LocalMover[];
  /** Full list: local first, then national — each segment quality-ranked. */
  ordered: LocalMover[];
};

/**
 * True local / in-state when we have honest signals only:
 * - isLocalOnly (intrastate scope)
 * - headquartersState matches the page county's state
 * - strong local relevance (HQ city in seat/county name)
 */
export function isLocalOrInStateMover(
  mover: LocalMover,
  county: LocalCounty
): boolean {
  if (mover.isLocalOnly) return true;
  const hq = (mover.headquartersState ?? '').toUpperCase();
  const pageState = county.stateCode.toUpperCase();
  // True in-state HQ always qualifies.
  if (hq && hq === pageState) return true;
  // Out-of-state HQ never qualifies as local/in-state (even if city names collide).
  if (hq && hq !== pageState) return false;
  // Unknown HQ state: only strong seat/county name match (score from ranker).
  if (localRelevanceScore(mover, county) >= 50) return true;
  return false;
}

export function segmentCountyMovers(
  movers: LocalMover[],
  county: LocalCounty
): SegmentedCountyMovers {
  const localInState: LocalMover[] = [];
  const national: LocalMover[] = [];

  for (const mover of movers) {
    if (isLocalOrInStateMover(mover, county)) localInState.push(mover);
    else national.push(mover);
  }

  const sortSeg = (list: LocalMover[]) =>
    [...list].sort((a, b) => {
      const localDiff =
        localRelevanceScore(b, county) - localRelevanceScore(a, county);
      if (localDiff !== 0) return localDiff;
      const q = moverQualityScore(b) - moverQualityScore(a);
      if (q !== 0) return q;
      return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
    });

  const localSorted = sortSeg(localInState);
  const nationalSorted = sortSeg(national);

  return {
    localInState: localSorted,
    national: nationalSorted,
    ordered: [...localSorted, ...nationalSorted],
  };
}

/** Minimum rating + review basis for any “top-rated” / “best movers” copy. */
export function isTopRatedEligible(mover: LocalMover): boolean {
  return (mover.rating ?? 0) >= 4.0 && (mover.reviewCount ?? 0) >= 5;
}

export function topRatedMoversForCopy(
  movers: LocalMover[],
  county: LocalCounty,
  limit = 3
): LocalMover[] {
  const ranked = rankCountyMovers(movers, county);
  return ranked.filter(isTopRatedEligible).slice(0, limit);
}
