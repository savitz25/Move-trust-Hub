import { countyAliasesForCity } from '@/lib/destinations/city-county-aliases';
import { markets } from '@/lib/destinations/markets';
import { REGION_STATE_SLUGS } from '@/lib/map/coverage-regions';
import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { localStates } from '@/lib/local-movers/states';
import { normalizePlace, parseHeadquarters } from '@/lib/fmcsa/refresh/parse-headquarters';
import type {
  ParsedCoverageCity,
  ParsedCoverageCounty,
  WebsiteCoverageData,
} from '@/lib/verification/coverage-scrape-types';

const NATIONAL_PHRASES = [
  'nationwide',
  'national coverage',
  'national moving',
  'entire united states',
  'entire us',
  'all 50 states',
  'all fifty states',
  'across the country',
  'coast to coast',
  'continental us',
  'continental united states',
  'serves the us',
  'serve the us',
  'united states wide',
];

const REGION_LABELS = Object.keys(REGION_STATE_SLUGS) as Array<
  keyof typeof REGION_STATE_SLUGS
>;

const STATE_BY_NAME = new Map(
  localStates.map((state) => [normalizePlace(state.name), state])
);
const STATE_BY_CODE = new Map(localStates.map((state) => [state.code.toLowerCase(), state]));

const MARKET_CITY_INDEX = markets
  .filter((market) => !market.isClusterParent)
  .map((market) => ({
    displayName: market.displayName,
    norm: normalizePlace(market.displayName),
    stateCode: market.stateCode,
  }))
  .sort((a, b) => b.norm.length - a.norm.length);

function containsNationalLanguage(text: string): boolean {
  const haystack = normalizePlace(text);
  return NATIONAL_PHRASES.some((phrase) => haystack.includes(normalizePlace(phrase)));
}

function extractRegions(text: string): string[] {
  const haystack = normalizePlace(text);
  return REGION_LABELS.filter((region) => haystack.includes(normalizePlace(region)));
}

function extractStateSlugs(text: string): string[] {
  const found = new Set<string>();
  const haystack = ` ${normalizePlace(text)} `;

  for (const state of localStates) {
    const nameNorm = normalizePlace(state.name);
    if (nameNorm.length >= 4 && haystack.includes(` ${nameNorm} `)) {
      found.add(state.slug);
    }
  }

  const codeMatches = text.match(/\b([A-Z]{2})\b/g) ?? [];
  for (const code of codeMatches) {
    const state = STATE_BY_CODE.get(code.toLowerCase());
    if (state) found.add(state.slug);
  }

  return [...found];
}

function extractCities(text: string): ParsedCoverageCity[] {
  const haystack = normalizePlace(text);
  const found: ParsedCoverageCity[] = [];

  for (const entry of MARKET_CITY_INDEX) {
    if (entry.norm.length < 4) continue;
    if (!haystack.includes(entry.norm)) continue;
    found.push({ city: entry.displayName, stateCode: entry.stateCode });
  }

  const seen = new Set<string>();
  return found.filter((entry) => {
    const key = `${normalizePlace(entry.city)}|${entry.stateCode}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractCounties(text: string): ParsedCoverageCounty[] {
  const haystack = normalizePlace(text);
  const found: ParsedCoverageCounty[] = [];

  for (const state of localStates) {
    for (const county of getCountiesForState(state.slug)) {
      const countyNorm = normalizePlace(county.name);
      const withSuffix = `${countyNorm} county`;
      if (countyNorm.length >= 4 && haystack.includes(withSuffix)) {
        found.push({
          stateSlug: state.slug,
          countySlug: county.slug,
          label: county.name,
        });
      }
    }
  }

  const seen = new Set<string>();
  return found.filter((entry) => {
    const key = `${entry.stateSlug}/${entry.countySlug}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractOfficeAddresses(text: string): string[] {
  const lines = text
    .split(/\n|\.|;/)
    .map((line) => line.trim())
    .filter((line) => line.length >= 12 && line.length <= 160);

  const addresses: string[] = [];
  for (const line of lines) {
    const parsed = parseHeadquarters(line);
    if (!parsed.city || !parsed.state) continue;
    if (!/\d/.test(line) && !/,\s*[A-Z]{2}\b/.test(line)) continue;
    addresses.push(line);
  }

  return [...new Set(addresses)].slice(0, 12);
}

function stateCapitalMarket(stateCode: string): ParsedCoverageCity | null {
  const state = localStates.find((entry) => entry.code === stateCode);
  if (!state) return null;

  const counties = getCountiesForState(state.slug);
  const capitalCounty = counties.find((county) => county.seat);
  if (!capitalCounty?.seat) return null;

  return { city: capitalCounty.seat, stateCode };
}

function expandRegionsToStateSlugs(regions: string[]): string[] {
  const slugs = new Set<string>();
  for (const region of regions) {
    const states = REGION_STATE_SLUGS[region as keyof typeof REGION_STATE_SLUGS];
    states?.forEach((slug) => slugs.add(slug));
  }
  return [...slugs];
}

export function parseCoverageText(
  text: string,
  options?: { consentGiven?: boolean; websiteUrl?: string | null }
): Omit<WebsiteCoverageData, 'scrapedAt' | 'status'> & { status: WebsiteCoverageData['status'] } {
  const consentGiven = options?.consentGiven ?? false;
  if (!consentGiven) {
    return {
      consentGiven: false,
      websiteUrl: options?.websiteUrl ?? null,
      status: 'skipped',
      isNationalOnly: false,
      summary: null,
      stateSlugs: [],
      cities: [],
      counties: [],
      officeAddresses: [],
      regions: [],
      pagesFetched: [],
      rawSnippets: [],
    };
  }

  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) {
    return {
      consentGiven: true,
      websiteUrl: options?.websiteUrl ?? null,
      status: 'not_found',
      isNationalOnly: false,
      summary: null,
      stateSlugs: [],
      cities: [],
      counties: [],
      officeAddresses: [],
      regions: [],
      pagesFetched: [],
      rawSnippets: [],
    };
  }

  const regions = extractRegions(text);
  const stateSlugs = extractStateSlugs(text);
  const cities = extractCities(text);
  const counties = extractCounties(text);
  const officeAddresses = extractOfficeAddresses(text);
  const hasNational = containsNationalLanguage(text);

  const explicitGeoCount =
    stateSlugs.length + cities.length + counties.length + officeAddresses.length + regions.length;

  const isNationalOnly = hasNational && explicitGeoCount === 0;

  const expandedStateSlugs = [
    ...new Set([...stateSlugs, ...expandRegionsToStateSlugs(regions)]),
  ];

  const stateOnlyCities: ParsedCoverageCity[] = [];
  if (!isNationalOnly) {
    for (const stateSlug of expandedStateSlugs) {
      const state = localStates.find((entry) => entry.slug === stateSlug);
      if (!state) continue;
      const alreadyHasCity = cities.some((city) => city.stateCode === state.code);
      if (alreadyHasCity) continue;
      const capital = stateCapitalMarket(state.code);
      if (capital) stateOnlyCities.push(capital);
    }
  }

  const officeCities: ParsedCoverageCity[] = officeAddresses
    .map((address) => {
      const parsed = parseHeadquarters(address);
      if (!parsed.city || !parsed.state) return null;
      return { city: parsed.city, stateCode: parsed.state };
    })
    .filter((entry): entry is ParsedCoverageCity => Boolean(entry));

  const allCities = [...cities, ...stateOnlyCities, ...officeCities];
  const citySeen = new Set<string>();
  const dedupedCities = allCities.filter((entry) => {
    const key = `${normalizePlace(entry.city)}|${entry.stateCode}`;
    if (citySeen.has(key)) return false;
    citySeen.add(key);
    return true;
  });

  const summaryParts = [
    ...dedupedCities.map((entry) => `${entry.city}, ${entry.stateCode}`),
    ...counties.map((entry) => `${entry.label} County`),
    ...regions,
  ];

  return {
    consentGiven: true,
    websiteUrl: options?.websiteUrl ?? null,
    status: explicitGeoCount > 0 || dedupedCities.length > 0 ? 'ok' : hasNational ? 'ok' : 'not_found',
    isNationalOnly,
    summary: isNationalOnly
      ? 'National coverage (no specific service areas listed)'
      : summaryParts.length
        ? summaryParts.slice(0, 10).join('; ')
        : null,
    stateSlugs: expandedStateSlugs,
    cities: dedupedCities,
    counties,
    officeAddresses,
    regions,
    pagesFetched: [],
    rawSnippets: normalized.slice(0, 2000).split(/(?<=\.)\s+/).slice(0, 8),
  };
}

export function countyAssignmentsFromParsedCity(city: string, stateCode: string) {
  const state = localStates.find((entry) => entry.code === stateCode);
  if (!state) return [];

  const countySlugs = new Set<string>();
  const seatMatches = getCountiesForState(state.slug)
    .filter((county) => {
      const seat = county.seat ? normalizePlace(county.seat) : '';
      const cityNorm = normalizePlace(city);
      return seat === cityNorm || seat.includes(cityNorm) || cityNorm.includes(seat);
    })
    .map((county) => county.slug);

  seatMatches.forEach((slug) => countySlugs.add(slug));
  countyAliasesForCity(state.slug, city).forEach((slug) => countySlugs.add(slug));

  return [...countySlugs].map((countySlug) => ({
    stateSlug: state.slug,
    countySlug,
    label: city,
  }));
}