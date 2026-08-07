import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

export const COUNTY_MOVER_PAGE_SIZE = 10;

/**
 * Local relevance — only real signals (no fabricated "local" status).
 * Higher = more likely a true local / in-market specialist for this county.
 */
export function localRelevanceScore(mover: LocalMover, county: LocalCounty): number {
  let score = 0;
  const city = (mover.city ?? '').trim().toLowerCase();
  const seat = (county.seat ?? '').trim().toLowerCase();
  const countyName = county.name.trim().toLowerCase();
  const desc = (mover.shortDescription ?? '').toLowerCase();
  const name = mover.name.toLowerCase();

  // Explicit intrastate / local-only service scope (never invent this).
  if (mover.isLocalOnly) score += 100;

  // Directory listings with verified scope beat anonymous catalog seeds.
  if (mover.listingSource === 'directory') score += 8;

  const hqState = (mover.headquartersState ?? '').toUpperCase();
  const pageState = (county.stateCode ?? '').toUpperCase();
  // City/seat name matches only count when HQ state is unknown or matches the page state.
  // Prevents "Somerville, MA" from scoring as local for Somerville (Somerset County), NJ.
  const stateAllowsLocalNameMatch = !hqState || !pageState || hqState === pageState;

  if (city && stateAllowsLocalNameMatch) {
    // HQ city matches county seat (strong local signal).
    if (seat && (city === seat || city.includes(seat) || seat.includes(city))) {
      score += 50;
    }
    // HQ city string includes county name (e.g. "Atlantic City" / county "Atlantic").
    if (countyName.length >= 3 && city.includes(countyName)) {
      score += 35;
    }
  }

  // Honest local-market language in description (weak; never enough alone for Local).
  if (
    stateAllowsLocalNameMatch &&
    countyName.length >= 3 &&
    (desc.includes(`${countyName} county`) ||
      desc.includes(`serves ${countyName}`) ||
      name.includes(countyName))
  ) {
    score += 12;
  }

  // Phase 1: same-state HQ alone is NOT a local signal (distant same-state = regional).
  // Tiny soft boost only for ranking among regionals — does not pass the Local gate.
  if (hqState && pageState && hqState === pageState) {
    score += 5;
  }

  return score;
}

/**
 * Quality / reputation score from existing listing signals.
 * Deterministic — same inputs always yield the same score.
 */
export function moverQualityScore(mover: LocalMover): number {
  let score = 0;
  score += (mover.rating || 0) * 20;
  score += Math.min(mover.reviewCount || 0, 500) / 5;
  if (mover.usdotNumber) score += 15;
  if (mover.mcNumber) score += 5;
  if (mover.fmcsaSafetyRating === 'Satisfactory') score += 12;
  else if (mover.fmcsaSafetyRating === 'Conditional') score += 2;
  if (mover.bbbRating) {
    const g = mover.bbbRating.trim().toUpperCase();
    if (g === 'F' || g === 'F+' || g === 'F-') score -= 40;
    else score += 4;
  }
  if (mover.outOfService) score -= 80;
  if (mover.authorityActive === false) score -= 50;
  if (mover.listingSource === 'directory') score += 6;
  if (mover.recentlyAdded) score += 3;
  return score;
}

/**
 * Deterministic county mover ranking:
 * 1. Local relevance (true local / in-county HQ first)
 * 2. Quality / reputation
 * 3. Name, then id (stable ties)
 */
export function rankCountyMovers(
  movers: LocalMover[],
  county: LocalCounty
): LocalMover[] {
  return [...movers].sort((a, b) => {
    const localDiff =
      localRelevanceScore(b, county) - localRelevanceScore(a, county);
    if (localDiff !== 0) return localDiff;

    const qualityDiff = moverQualityScore(b) - moverQualityScore(a);
    if (qualityDiff !== 0) return qualityDiff;

    const nameDiff = a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
    if (nameDiff !== 0) return nameDiff;

    return a.id.localeCompare(b.id);
  });
}

export function nextRevealCount(visible: number, total: number, step = COUNTY_MOVER_PAGE_SIZE): number {
  if (visible >= total) return total;
  const remaining = total - visible;
  if (remaining <= step) return total;
  return visible + step;
}

export function revealButtonLabel(visible: number, total: number, step = COUNTY_MOVER_PAGE_SIZE): string {
  const remaining = total - visible;
  if (remaining <= 0) return '';
  if (remaining <= step) {
    return remaining === 1
      ? 'Show 1 remaining mover'
      : `Show all remaining movers (${remaining})`;
  }
  return `Show next ${step} movers`;
}
