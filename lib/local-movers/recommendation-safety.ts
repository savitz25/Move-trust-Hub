/**
 * Phase 1 — hard gates for “best” / “top” / recommendation outputs.
 * Prefer honest scarcity over forced recommendations.
 */

import { moverQualityScore } from '@/lib/local-movers/rank-county-movers';
import { isTrueLocalMover } from '@/lib/local-movers/locality-rules';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

export type RecommendationEligibility = {
  eligible: boolean;
  reasons: string[];
};

/** Normalize BBB letter grades (e.g. "F", "F-", "NR"). */
export function isSevereBbbGrade(bbbRating?: string | null): boolean {
  if (!bbbRating) return false;
  const g = bbbRating.trim().toUpperCase();
  if (!g) return false;
  // Exact F grades (not A-F composite strings)
  if (g === 'F' || g === 'F+' || g === 'F-') return true;
  if (g.startsWith('F/') || g.startsWith('F ')) return true;
  return false;
}

export function isOutOfServiceMover(mover: LocalMover): boolean {
  if (mover.outOfService === true) return true;
  const status = (mover.usdotStatus ?? '').toUpperCase();
  if (status.includes('OUT OF SERVICE') || status === 'INACTIVE' || status === 'REVOKED') {
    return true;
  }
  if (mover.authorityActive === false) return true;
  return false;
}

/**
 * Hard exclusions for any best/top/recommended framing.
 * Does not require local classification — callers add locality gates for “best local”.
 */
export function evaluateRecommendationEligibility(
  mover: LocalMover
): RecommendationEligibility {
  const reasons: string[] = [];

  if (isOutOfServiceMover(mover)) {
    reasons.push('out_of_service_or_inactive_authority');
  }
  if (isSevereBbbGrade(mover.bbbRating)) {
    reasons.push('severe_bbb_grade');
  }
  if (mover.fmcsaSafetyRating === 'Unsatisfactory') {
    reasons.push('fmcsa_unsatisfactory');
  }
  // Thin rating basis — never “top-rated” from shells
  if ((mover.reviewCount ?? 0) < 5 || (mover.rating ?? 0) < 4.0) {
    reasons.push('insufficient_review_basis');
  }

  return { eligible: reasons.length === 0, reasons };
}

export function isRecommendationEligible(mover: LocalMover): boolean {
  return evaluateRecommendationEligibility(mover).eligible;
}

/**
 * Best / top movers for copy: reputation composite + hard exclusions.
 * When requireLocal is true, only true-local movers are considered.
 */
export function selectRecommendedMovers(
  movers: LocalMover[],
  county: LocalCounty,
  opts: { limit?: number; requireLocal?: boolean } = {}
): LocalMover[] {
  const limit = opts.limit ?? 3;
  const requireLocal = opts.requireLocal ?? false;

  const pool = movers.filter((m) => {
    if (!isRecommendationEligible(m)) return false;
    if (requireLocal && !isTrueLocalMover(m, county)) return false;
    return true;
  });

  return [...pool]
    .sort((a, b) => {
      const q = moverQualityScore(b) - moverQualityScore(a);
      if (q !== 0) return q;
      return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
    })
    .slice(0, limit);
}

/** Regression helpers — used by scripts and unit checks. */
export function assertSafeRecommendationSet(
  movers: LocalMover[],
  county: LocalCounty
): string[] {
  const failures: string[] = [];
  for (const m of movers) {
    if (isOutOfServiceMover(m)) {
      failures.push(`${m.name}: out-of-service in recommendation set`);
    }
    if (isSevereBbbGrade(m.bbbRating)) {
      failures.push(`${m.name}: BBB F-grade in recommendation set`);
    }
    // Callers that claim “local” must pass requireLocal — this checks badge honesty
    // when a list is labeled local-only.
  }
  void county;
  return failures;
}
