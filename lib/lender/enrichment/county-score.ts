import type { CountyExperienceResult, LenderEnrichmentInput } from '@/lib/lender/enrichment/types';
import { getCountyFromZip } from '@/lib/lender/lenders';

export type CountyScoreSignals = {
  googleAddress?: string | null;
  bbbListed?: boolean;
  yearsInBusiness?: number | null;
};

function parseYearsFromBbbDate(fileOpened?: string | null): number | null {
  if (!fileOpened) return null;
  const yearMatch = fileOpened.match(/\b(19|20)\d{2}\b/);
  if (!yearMatch) return null;
  const year = Number.parseInt(yearMatch[0], 10);
  const currentYear = new Date().getFullYear();
  if (year < 1950 || year > currentYear) return null;
  return currentYear - year;
}

function googleMatchesLocalArea(
  googleAddress: string | undefined | null,
  state: string,
  county: string,
  city: string
): boolean {
  if (!googleAddress) return false;
  const normalized = googleAddress.toLowerCase();
  const stateToken = state.toLowerCase().slice(0, 2);
  const hasState =
    normalized.includes(`, ${stateToken}`) ||
    normalized.includes(` ${state.toLowerCase()}`) ||
    normalized.includes(state.toLowerCase());
  const hasCity = city ? normalized.includes(city.toLowerCase()) : false;
  const hasCounty = county ? normalized.includes(county.toLowerCase().replace(/ county$/i, '')) : false;
  return hasState && (hasCity || hasCounty);
}

/**
 * County experience score (0–100) — mirrors mover local-presence weighting for lenders.
 * Rewards primary county assignment, ZIP coverage, verified local listings, and tenure.
 */
export function computeCountyExperienceScore(
  lender: Pick<
    LenderEnrichmentInput,
    'stateSlug' | 'countySlug' | 'zipCodes' | 'state' | 'county' | 'city'
  >,
  signals: CountyScoreSignals = {}
): { score: number; factors: CountyExperienceResult['factors']; yearsInBusiness: number | null } {
  const yearsInBusiness = signals.yearsInBusiness ?? null;

  const zipInCounty = lender.zipCodes.filter((zip) => {
    const mapped = getCountyFromZip(zip);
    return mapped?.stateSlug === lender.stateSlug && mapped?.countySlug === lender.countySlug;
  }).length;

  const primaryCounty = 30;
  const zipCoverage = Math.min(zipInCounty * 4, 20);
  const googleLocal = googleMatchesLocalArea(
    signals.googleAddress,
    lender.state,
    lender.county,
    lender.city
  )
    ? 15
    : 0;
  const bbbPresence = signals.bbbListed ? 10 : 0;
  const tenure = yearsInBusiness != null ? Math.min(Math.round(yearsInBusiness * 1.5), 25) : 5;

  const raw = primaryCounty + zipCoverage + googleLocal + bbbPresence + tenure;
  const score = Math.max(0, Math.min(100, raw));

  return {
    score,
    factors: {
      primary_county: primaryCounty,
      zip_coverage: zipCoverage,
      google_local_match: googleLocal,
      bbb_presence: bbbPresence,
      tenure,
    },
    yearsInBusiness,
  };
}

export function yearsInBusinessFromBbb(fileOpened?: string | null): number | null {
  return parseYearsFromBbbDate(fileOpened);
}