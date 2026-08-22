/**
 * Conservative city/ZIP → county resolution for Ask handoffs.
 * Source-backed locked mappings only. No geocoding. No Places.
 *
 * ASK-SEARCH-006A.2: Keansburg, NJ / 07734 → Monmouth County, NJ.
 */

export type GeographyMatchClass =
  | 'explicit_service_zip'
  | 'explicit_service_city'
  | 'exact_physical_city'
  | 'exact_physical_zip'
  | 'county_service_area_match'
  | 'county_service_area_via_zip_resolution'
  | 'county_service_area'
  | 'state_service_area'
  | 'physical_state';

export type ResolvedGeography = {
  stateCode: string;
  stateSlug: string;
  countySlug?: string;
  countyName?: string;
  city?: string;
  zip?: string;
  matchClass: GeographyMatchClass;
  /** True when city/ZIP was resolved through county membership, not exact city/ZIP coverage. */
  cityCoveredByCountyOnly: boolean;
};

const STATE_SLUGS: Record<string, string> = {
  AL: 'alabama',
  AK: 'alaska',
  AZ: 'arizona',
  AR: 'arkansas',
  CA: 'california',
  CO: 'colorado',
  CT: 'connecticut',
  DE: 'delaware',
  DC: 'district-of-columbia',
  FL: 'florida',
  GA: 'georgia',
  HI: 'hawaii',
  ID: 'idaho',
  IL: 'illinois',
  IN: 'indiana',
  IA: 'iowa',
  KS: 'kansas',
  KY: 'kentucky',
  LA: 'louisiana',
  ME: 'maine',
  MD: 'maryland',
  MA: 'massachusetts',
  MI: 'michigan',
  MN: 'minnesota',
  MS: 'mississippi',
  MO: 'missouri',
  MT: 'montana',
  NE: 'nebraska',
  NV: 'nevada',
  NH: 'new-hampshire',
  NJ: 'new-jersey',
  NM: 'new-mexico',
  NY: 'new-york',
  NC: 'north-carolina',
  ND: 'north-dakota',
  OH: 'ohio',
  OK: 'oklahoma',
  OR: 'oregon',
  PA: 'pennsylvania',
  RI: 'rhode-island',
  SC: 'south-carolina',
  SD: 'south-dakota',
  TN: 'tennessee',
  TX: 'texas',
  UT: 'utah',
  VT: 'vermont',
  VA: 'virginia',
  WA: 'washington',
  WV: 'west-virginia',
  WI: 'wisconsin',
  WY: 'wyoming',
};

/** Locked city ∈ county membership used for search interpretation — not service-city rows. */
const CITY_IN_COUNTY: Record<
  string,
  { countySlug: string; countyName: string; city: string; stateCode: string }
> = {
  'nj:keansburg': {
    countySlug: 'monmouth',
    countyName: 'Monmouth County',
    city: 'Keansburg',
    stateCode: 'NJ',
  },
};

/** Locked ZIP → city/county. Not explicit service ZIP. */
const ZIP_IN_COUNTY: Record<
  string,
  { countySlug: string; countyName: string; city: string; stateCode: string }
> = {
  '07734': {
    countySlug: 'monmouth',
    countyName: 'Monmouth County',
    city: 'Keansburg',
    stateCode: 'NJ',
  },
};

export function stateSlugFromCode(code: string): string | undefined {
  return STATE_SLUGS[code.toUpperCase()];
}

export function isUspsStateCode(code: string): boolean {
  return Boolean(STATE_SLUGS[code.trim().toUpperCase()]);
}

export function countyDisplayName(countySlug: string, stateSlug?: string): string {
  const base = countySlug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  if (stateSlug === 'louisiana') return /parish$/i.test(base) ? base : `${base} Parish`;
  if (stateSlug === 'district-of-columbia') return base;
  if (/(county|parish|borough)$/i.test(base)) return base;
  return `${base} County`;
}

function cityKey(stateCode: string, city: string): string {
  return `${stateCode.toLowerCase()}:${city.trim().toLowerCase().replace(/[^a-z0-9]+/g, '')}`;
}

export function resolveHandoffGeography(input: {
  state?: string;
  county?: string;
  city?: string;
  zip?: string;
}): ResolvedGeography | null {
  const zipHit = input.zip ? ZIP_IN_COUNTY[input.zip] : undefined;
  const stateCode = (input.state || zipHit?.stateCode || '').toUpperCase();
  const stateSlug = stateCode ? stateSlugFromCode(stateCode) : undefined;
  if (!stateCode || !stateSlug) return null;

  if (zipHit && zipHit.stateCode === stateCode) {
    return {
      stateCode,
      stateSlug,
      countySlug: zipHit.countySlug,
      countyName: zipHit.countyName,
      city: zipHit.city,
      zip: input.zip,
      matchClass: 'county_service_area_via_zip_resolution',
      cityCoveredByCountyOnly: true,
    };
  }

  const cityHit = input.city ? CITY_IN_COUNTY[cityKey(stateCode, input.city)] : undefined;
  if (cityHit) {
    return {
      stateCode,
      stateSlug,
      countySlug: cityHit.countySlug,
      countyName: cityHit.countyName,
      city: cityHit.city,
      zip: input.zip,
      matchClass: 'county_service_area_match',
      cityCoveredByCountyOnly: true,
    };
  }

  if (input.county) {
    const cityIsExactCountyCity = false;
    return {
      stateCode,
      stateSlug,
      countySlug: input.county,
      countyName: countyDisplayName(input.county, stateSlug),
      city: input.city,
      zip: input.zip,
      matchClass: input.city && !cityIsExactCountyCity ? 'county_service_area_match' : 'county_service_area',
      cityCoveredByCountyOnly: Boolean(input.city),
    };
  }

  if (input.city) {
    // Unknown city: do not invent a county. State directory only.
    return {
      stateCode,
      stateSlug,
      city: input.city,
      zip: input.zip,
      matchClass: 'state_service_area',
      cityCoveredByCountyOnly: false,
    };
  }

  return {
    stateCode,
    stateSlug,
    zip: input.zip,
    matchClass: 'physical_state',
    cityCoveredByCountyOnly: false,
  };
}
