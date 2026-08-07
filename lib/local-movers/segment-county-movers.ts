import {
  localRelevanceScore,
  moverQualityScore,
} from '@/lib/local-movers/rank-county-movers';
import {
  classifyMoverLocality,
  isTrueLocalMover,
} from '@/lib/local-movers/locality-rules';
import {
  isRecommendationEligible,
  selectRecommendedMovers,
} from '@/lib/local-movers/recommendation-safety';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

export type CountyMoverSegment = 'local_in_state' | 'national';

export type SegmentedCountyMovers = {
  /** True local HQ / intrastate in-market only (Phase 1 distance rule). */
  localInState: LocalMover[];
  /** Regional same-state + national / long-distance — never labeled Local. */
  national: LocalMover[];
  /** Full list: local first, then regional/national — each segment quality-ranked. */
  ordered: LocalMover[];
};

/**
 * Honest local classification — Phase 1.
 *
 * Same-state HQ alone is NOT local. Requires:
 * - explicit local/intrastate scope (in-state, not distant when measurable), or
 * - HQ city ≈ county seat/name, or
 * - HQ within ~50 miles of county centroid when coordinates resolve.
 *
 * Distant same-state operators are Regional (returned in `national` segment for UI).
 */
export function isLocalOrInStateMover(
  mover: LocalMover,
  county: LocalCounty
): boolean {
  return isTrueLocalMover(mover, county);
}

export function segmentCountyMovers(
  movers: LocalMover[],
  county: LocalCounty
): SegmentedCountyMovers {
  const localInState: LocalMover[] = [];
  const national: LocalMover[] = [];

  for (const mover of movers) {
    const verdict = classifyMoverLocality(mover, county);
    if (verdict.class === 'local') localInState.push(mover);
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

/** @deprecated Use isRecommendationEligible from recommendation-safety */
export function isTopRatedEligible(mover: LocalMover): boolean {
  return isRecommendationEligible(mover);
}

/**
 * “Best” / top movers for FAQ and copy — reputation composite + hard exclusions.
 * Prefer true locals when available; never force distant carriers into “best local”.
 */
export function topRatedMoversForCopy(
  movers: LocalMover[],
  county: LocalCounty,
  limit = 3
): LocalMover[] {
  const localOnly = selectRecommendedMovers(movers, county, {
    limit,
    requireLocal: true,
  });
  if (localOnly.length > 0) return localOnly;
  // No true locals: do not invent “best local” from regional — return empty.
  // Callers should render honest scarcity copy.
  return [];
}

/** Safer non-local recommendations (never under “best local” phrasing). */
export function topRatedRegionalForCopy(
  movers: LocalMover[],
  county: LocalCounty,
  limit = 3
): LocalMover[] {
  return selectRecommendedMovers(movers, county, { limit, requireLocal: false }).filter(
    (m) => !isTrueLocalMover(m, county)
  );
}
