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
  // Oregon — Southern/Willamette service cities (not always county seats)
  'oregon:roseburg': ['douglas'],
  'oregon:winston': ['douglas'],
  'oregon:sutherlin': ['douglas'],
  'oregon:canyonville': ['douglas'],
  'oregon:myrtle creek': ['douglas'],
  'oregon:glendale': ['douglas'],
  'oregon:reedsport': ['douglas'],
  'oregon:cottage grove': ['lane'],
  'oregon:springfield': ['lane'],
  'oregon:junction city': ['lane'],
  'oregon:florence': ['lane'],
  'oregon:medford': ['jackson'],
  'oregon:central point': ['jackson'],
  'oregon:ashland': ['jackson'],
  'oregon:eagle point': ['jackson'],
  'oregon:white city': ['jackson'],
  'oregon:phoenix': ['jackson'],
  'oregon:talent': ['jackson'],
  'oregon:cave junction': ['josephine'],
  'oregon:grants pass': ['josephine'],
  // California — LA-area service cities (Trek Movers, etc.)
  'california:los angeles': ['los-angeles'],
  'california:west hollywood': ['los-angeles'],
  'california:hollywood': ['los-angeles'],
  'california:beverly hills': ['los-angeles'],
  'california:santa monica': ['los-angeles'],
  'california:culver city': ['los-angeles'],
  'california:pasadena': ['los-angeles'],
  'california:glendale': ['los-angeles'],
  'california:burbank': ['los-angeles'],
  'california:long beach': ['los-angeles'],
  'california:torrance': ['los-angeles'],
  'california:inglewood': ['los-angeles'],
  'california:downey': ['los-angeles'],
  'california:pomona': ['los-angeles'],
  'california:el segundo': ['los-angeles'],
  'california:manhattan beach': ['los-angeles'],
  'california:redondo beach': ['los-angeles'],
  'california:sherman oaks': ['los-angeles'],
  'california:van nuys': ['los-angeles'],
  'california:north hollywood': ['los-angeles'],
  'california:studio city': ['los-angeles'],
  'california:encino': ['los-angeles'],
  'california:woodland hills': ['los-angeles'],
  'california:anaheim': ['orange'],
  'california:irvine': ['orange'],
  'california:santa ana': ['orange'],
  'california:huntington beach': ['orange'],
  'california:newport beach': ['orange'],
};

export function countyAliasesForCity(stateSlug: string, city: string | null): string[] {
  if (!city) return [];
  const key = `${stateSlug}:${normalizePlace(city)}`;
  return CITY_COUNTY_ALIASES[key] ?? [];
}

/** All alias city names registered for a state (for coverage text matching). */
export function aliasCitiesForState(stateSlug: string): string[] {
  const prefix = `${stateSlug}:`;
  const cities: string[] = [];
  for (const key of Object.keys(CITY_COUNTY_ALIASES)) {
    if (!key.startsWith(prefix)) continue;
    const cityNorm = key.slice(prefix.length);
    // Title-case-ish for display: "cottage grove" → "Cottage Grove"
    const display = cityNorm
      .split(/[\s-]+/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    if (display) cities.push(display);
  }
  return cities;
}