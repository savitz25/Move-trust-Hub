import { normalizePlace } from '@/lib/fmcsa/refresh/parse-headquarters';

/**
 * HQ cities that are not county seats but belong to curated local-movers counties.
 * Key: `${stateSlug}:${normalizedCity}` → county slugs (primary first).
 */
const CITY_COUNTY_ALIASES: Record<string, string[]> = {
  // Nevada — Carson Valley communities serve Douglas + capital-region spillover
  'nevada:gardnerville': ['douglas', 'carson-city'],
  'nevada:minden': ['douglas', 'carson-city'],
  'nevada:genoa': ['douglas'],
  'nevada:zephyr cove': ['douglas'],
  // Hawaii — Oʻahu suburbs beyond Honolulu seat
  'hawaii:pearl city': ['honolulu'],
  'hawaii:kapolei': ['honolulu'],
  'hawaii:kailua': ['honolulu'],
  'hawaii:waipahu': ['honolulu'],
  'hawaii:ewa beach': ['honolulu'],
  'hawaii:mililani': ['honolulu'],
  'hawaii:kaneohe': ['honolulu'],
};

export function countyAliasesForCity(stateSlug: string, city: string | null): string[] {
  if (!city) return [];
  const key = `${stateSlug}:${normalizePlace(city)}`;
  return CITY_COUNTY_ALIASES[key] ?? [];
}