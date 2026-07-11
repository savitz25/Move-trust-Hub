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
  // Georgia — Metro Atlanta suburbs (not county seats)
  'georgia:alpharetta': ['fulton'],
  'georgia:roswell': ['fulton'],
  'georgia:johns creek': ['fulton'],
  'georgia:johns-creek': ['fulton'],
  'georgia:sandy springs': ['fulton'],
  'georgia:sandy-springs': ['fulton'],
  'georgia:marietta': ['cobb'],
  'georgia:kennesaw': ['cobb'],
  'georgia:acworth': ['cobb'],
  'georgia:smyrna': ['cobb'],
  'georgia:lawrenceville': ['gwinnett'],
  'georgia:duluth': ['gwinnett'],
  'georgia:buford': ['gwinnett'],
  'georgia:decatur': ['dekalb'],
  'georgia:brookhaven': ['dekalb'],
  'georgia:dunwoody': ['dekalb'],
  'georgia:cumming': ['forsyth'],
  'georgia:mcdonough': ['henry'],
  'georgia:stockbridge': ['henry'],
  'georgia:peachtree city': ['fayette'],
  'georgia:peachtree-city': ['fayette'],
  'georgia:douglasville': ['douglas'],
  'georgia:conyers': ['rockdale'],
  'georgia:pooler': ['chatham'],
  'georgia:warner robins': ['houston'],
  'georgia:warner-robins': ['houston'],
};

export function countyAliasesForCity(stateSlug: string, city: string | null): string[] {
  if (!city) return [];
  const key = `${stateSlug}:${normalizePlace(city)}`;
  return CITY_COUNTY_ALIASES[key] ?? [];
}