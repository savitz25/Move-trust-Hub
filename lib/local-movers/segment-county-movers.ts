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
 * Honest local / in-state classification.
 *
 * Rules (distance / HQ / service-radius proxy without inventing geo coords):
 * - Explicit intrastate / local-only scope → local
 * - Out-of-state headquarters → never local
 * - Same-state HQ alone is NOT enough (LA carrier is not a “local mover” in Eureka)
 * - Require strong in-market signals: HQ city ≈ county seat/name, or local-only scope
 *   (localRelevanceScore ≥ 50 requires city/seat match or isLocalOnly)
 *
 * Distant same-state HQs and pure national carriers fall into the regional/national segment.
 */
export function isLocalOrInStateMover(
  mover: LocalMover,
  county: LocalCounty
): boolean {
  if (mover.isLocalOnly) return true;

  const hq = (mover.headquartersState ?? '').toUpperCase();
  const pageState = (county.stateCode ?? '').toUpperCase();

  // Out-of-state HQ never qualifies as local/in-state (even if city names collide).
  if (hq && pageState && hq !== pageState) return false;

  // Require strong local relevance — not merely “somewhere in this state.”
  // Score ≥ 50 ≈ city/seat match (or isLocalOnly, already handled above).
  return localRelevanceScore(mover, county) >= 50;
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
