import {
  getCountyFromZip,
  getLenderBySlug,
  getLendersByCounty,
  lenders,
  type LenderFilters,
} from '@/lib/lender/lenders';
import { getEnrichmentBySlug, getAllEnrichments } from '@/lib/lender/enrichment/store';
import { mergeLenderWithEnrichment, type EnrichedLender } from '@/lib/lender/enrichment/merge';

export function getEnrichedLenderBySlug(slug: string): EnrichedLender | undefined {
  const lender = getLenderBySlug(slug);
  if (!lender) return undefined;
  return mergeLenderWithEnrichment(lender, getEnrichmentBySlug(slug));
}

export function getAllEnrichedLenders(): EnrichedLender[] {
  const store = getAllEnrichments();
  return lenders.map((l) => mergeLenderWithEnrichment(l, store[l.slug]));
}

export function filterEnrichedLenders(
  filters: LenderFilters & { minGoogleRating?: number; bbbAccredited?: boolean }
): EnrichedLender[] {
  let result = getAllEnrichedLenders();

  if (filters.zip) {
    const county = getCountyFromZip(filters.zip);
    if (county) {
      result = result.filter(
        (l) => l.stateSlug === county.stateSlug && l.countySlug === county.countySlug
      );
    } else {
      result = result.filter((l) => l.zipCodes.includes(filters.zip!));
    }
  }

  if (filters.stateSlug) {
    result = result.filter((l) => l.stateSlug === filters.stateSlug);
  }

  if (filters.countySlug) {
    result = result.filter((l) => l.countySlug === filters.countySlug);
  }

  if (filters.loanType) {
    result = result.filter((l) => l.loanTypes.includes(filters.loanType!));
  }

  if (filters.creditTier) {
    result = result.filter((l) => l.creditTiers.includes(filters.creditTier!));
  }

  if (filters.specialty) {
    result = result.filter((l) =>
      l.specialties.some((s) => s.toLowerCase().includes(filters.specialty!.toLowerCase()))
    );
  }

  const minRating = filters.minGoogleRating ?? filters.minRating;
  if (minRating) {
    result = result.filter((l) => l.rating >= minRating);
  }

  if (filters.bbbAccredited) {
    result = result.filter((l) => l.bbbAccredited);
  }

  if (filters.nmlsVerified) {
    result = result.filter((l) => l.nmlsVerified);
  }

  return result.sort((a, b) => {
    const countyDiff = b.countyExperienceScore - a.countyExperienceScore;
    if (countyDiff !== 0) return countyDiff;
    const ratingDiff = b.rating - a.rating;
    if (ratingDiff !== 0) return ratingDiff;
    return b.trustScore - a.trustScore;
  });
}

export function getEnrichedLendersByCounty(
  stateSlug: string,
  countySlug: string,
  filters: Pick<LenderFilters, 'zip'> & {
    minGoogleRating?: number;
    bbbAccredited?: boolean;
  } = {}
): EnrichedLender[] {
  const store = getAllEnrichments();
  let result = getLendersByCounty(stateSlug, countySlug).map((l) =>
    mergeLenderWithEnrichment(l, store[l.slug])
  );

  if (filters.zip) {
    const county = getCountyFromZip(filters.zip);
    if (county) {
      result = result.filter(
        (l) => l.stateSlug === county.stateSlug && l.countySlug === county.countySlug
      );
    } else {
      result = result.filter((l) => l.zipCodes.includes(filters.zip!));
    }
  }

  if (filters.minGoogleRating) {
    result = result.filter((l) => l.rating >= filters.minGoogleRating!);
  }

  if (filters.bbbAccredited) {
    result = result.filter((l) => l.bbbAccredited);
  }

  return result.sort((a, b) => {
    const countyDiff = b.countyExperienceScore - a.countyExperienceScore;
    if (countyDiff !== 0) return countyDiff;
    const ratingDiff = b.rating - a.rating;
    if (ratingDiff !== 0) return ratingDiff;
    return b.trustScore - a.trustScore;
  });
}