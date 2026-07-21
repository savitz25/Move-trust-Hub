import {
  aliasCitiesForState,
  countyAliasesForCity,
} from '@/lib/destinations/city-county-aliases';
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

const STATE_BY_CODE = new Map(localStates.map((state) => [state.code.toLowerCase(), state]));

const MARKET_CITY_INDEX = markets
  .filter((market) => !market.isClusterParent)
  .map((market) => ({
    displayName: market.displayName,
    norm: normalizePlace(market.displayName),
    stateCode: market.stateCode,
  }))
  .sort((a, b) => b.norm.length - a.norm.length);

/** Words that look like cities but are noise when matched alone in HTML. */
const CITY_NOISE = new Set([
  'home',
  'about',
  'contact',
  'services',
  'service',
  'area',
  'areas',
  'quote',
  'free',
  'get',
  'your',
  'our',
  'the',
  'and',
  'for',
  'more',
  'local',
  'state',
  'states',
  'county',
  'counties',
  'moving',
  'movers',
  'move',
  'menu',
  'search',
  'login',
  'email',
  'phone',
  'call',
  'blog',
  'news',
  'faq',
  'faqs',
]);

export type ParseCoverageOptions = {
  consentGiven?: boolean;
  websiteUrl?: string | null;
  /**
   * When set (e.g. onboarding state OR from FMCSA physical state),
   * only keep cities/counties/states that match this jurisdiction.
   */
  preferredStateCode?: string | null;
};

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

/** Strip leading noise from "Local Service Area Roseburg" → "Roseburg". */
function cleanCityLabel(raw: string): string {
  let city = raw.trim();
  // Drop leading boilerplate words often glued onto city lists
  city = city.replace(
    /^(?:our\s+)?(?:local\s+)?(?:service\s+)?(?:area|areas|locations?|serving|serves)\s+/i,
    ''
  );
  // Keep at most the last 3 title-case words (Grants Pass, Cottage Grove)
  const words = city.split(/\s+/).filter(Boolean);
  if (words.length > 3) {
    city = words.slice(-3).join(' ');
  }
  return city.trim();
}

/** "Roseburg, OR" / "Grants Pass, OR" patterns — highest-confidence city extraction. */
function extractCityStatePairs(text: string): ParsedCoverageCity[] {
  const found: ParsedCoverageCity[] = [];
  const re =
    /\b([A-Z][A-Za-z.'-]{1,30}(?:\s+[A-Z][A-Za-z.']{1,24}){0,3}),\s*([A-Z]{2})\b/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const city = cleanCityLabel(m[1] ?? '');
    const stateCode = (m[2] ?? '').toUpperCase();
    if (!city || !STATE_BY_CODE.has(stateCode.toLowerCase())) continue;
    if (CITY_NOISE.has(normalizePlace(city))) continue;
    if (city.length < 3) continue;
    // Reject labels that still look like sentences
    if (/\b(area|service|local|our|the)\b/i.test(city) && city.split(/\s+/).length > 2) {
      continue;
    }
    found.push({ city, stateCode });
  }
  return found;
}

function extractMarketCities(
  text: string,
  preferredStateCode?: string | null
): ParsedCoverageCity[] {
  // Market substring matching is too noisy without a state constraint
  // (e.g. "Erie"/"Eagan" inside unrelated HTML). Only use with preferred state.
  const preferred = preferredStateCode?.toUpperCase() || null;
  if (!preferred) return [];

  const haystack = normalizePlace(text);
  const found: ParsedCoverageCity[] = [];

  for (const entry of MARKET_CITY_INDEX) {
    if (entry.norm.length < 5) continue;
    if (entry.stateCode !== preferred) continue;
    if (!haystack.includes(entry.norm)) continue;
    found.push({ city: entry.displayName, stateCode: entry.stateCode });
  }
  return found;
}

/** Match known seats + aliases inside a preferred state (e.g. Winston → Douglas County, OR). */
function extractKnownCitiesInState(text: string, stateCode: string): ParsedCoverageCity[] {
  const state = localStates.find((s) => s.code === stateCode.toUpperCase());
  if (!state) return [];
  const haystack = ` ${normalizePlace(text)} `;
  const found: ParsedCoverageCity[] = [];
  const seen = new Set<string>();

  const pushCity = (city: string) => {
    const norm = normalizePlace(city);
    if (norm.length < 4 || seen.has(norm)) return;
    if (!haystack.includes(norm)) return;
    seen.add(norm);
    found.push({ city, stateCode: state.code });
  };

  for (const county of getCountiesForState(state.slug)) {
    if (county.seat) pushCity(county.seat);
  }
  for (const aliasCity of aliasCitiesForState(state.slug)) {
    pushCity(aliasCity);
  }

  return found;
}

function extractCounties(
  text: string,
  preferredStateCode?: string | null
): ParsedCoverageCounty[] {
  const haystack = normalizePlace(text);
  const found: ParsedCoverageCounty[] = [];
  const preferred = preferredStateCode?.toUpperCase() || null;
  const states = preferred
    ? localStates.filter((s) => s.code === preferred)
    : localStates;

  for (const state of states) {
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

function expandRegionsToStateSlugs(regions: string[]): string[] {
  const slugs = new Set<string>();
  for (const region of regions) {
    const states = REGION_STATE_SLUGS[region as keyof typeof REGION_STATE_SLUGS];
    states?.forEach((slug) => slugs.add(slug));
  }
  return [...slugs];
}

function dedupeCities(cities: ParsedCoverageCity[]): ParsedCoverageCity[] {
  const seen = new Set<string>();
  return cities.filter((entry) => {
    const key = `${normalizePlace(entry.city)}|${entry.stateCode}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Map service cities to local-movers counties (seat match + aliases).
 * Works for any state that has geography data.
 */
export function countyAssignmentsFromParsedCity(
  city: string,
  stateCode: string
): ParsedCoverageCounty[] {
  const state = localStates.find((entry) => entry.code === stateCode.toUpperCase());
  if (!state) return [];

  const cityNorm = normalizePlace(city);
  const countySlugs = new Set<string>();

  for (const county of getCountiesForState(state.slug)) {
    const seat = county.seat ? normalizePlace(county.seat) : '';
    if (seat && (seat === cityNorm || seat.includes(cityNorm) || cityNorm.includes(seat))) {
      countySlugs.add(county.slug);
    }
    // City named same as county (e.g. "Douglas") is too ambiguous — skip unless seat match
  }

  countyAliasesForCity(state.slug, city).forEach((slug) => countySlugs.add(slug));

  return [...countySlugs].map((countySlug) => {
    const county = getCountiesForState(state.slug).find((c) => c.slug === countySlug);
    return {
      stateSlug: state.slug,
      countySlug,
      label: county?.name ?? city,
    };
  });
}

function mergeCounties(
  ...lists: ParsedCoverageCounty[][]
): ParsedCoverageCounty[] {
  const seen = new Set<string>();
  const out: ParsedCoverageCounty[] = [];
  for (const list of lists) {
    for (const entry of list) {
      const key = `${entry.stateSlug}/${entry.countySlug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(entry);
    }
  }
  return out;
}

export function parseCoverageText(
  text: string,
  options?: ParseCoverageOptions
): Omit<WebsiteCoverageData, 'scrapedAt' | 'status'> & {
  status: WebsiteCoverageData['status'];
} {
  const consentGiven = options?.consentGiven ?? false;
  const preferredStateCode = options?.preferredStateCode?.trim().toUpperCase() || null;

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

  const regions = preferredStateCode ? [] : extractRegions(text);
  let stateSlugs = extractStateSlugs(text);
  if (preferredStateCode) {
    const preferred = localStates.find((s) => s.code === preferredStateCode);
    stateSlugs = preferred ? [preferred.slug] : stateSlugs.filter((slug) => {
      const st = localStates.find((s) => s.slug === slug);
      return st?.code === preferredStateCode;
    });
    if (preferred && stateSlugs.length === 0) stateSlugs = [preferred.slug];
  }

  const pairCities = extractCityStatePairs(text);
  const marketCities = extractMarketCities(text, preferredStateCode);
  const knownInState = preferredStateCode
    ? extractKnownCitiesInState(text, preferredStateCode)
    : [];

  let cities = dedupeCities([...pairCities, ...marketCities, ...knownInState]);
  if (preferredStateCode) {
    cities = cities.filter((c) => c.stateCode === preferredStateCode);
  }

  let counties = extractCounties(text, preferredStateCode);
  const officeAddresses = extractOfficeAddresses(text).filter((addr) => {
    if (!preferredStateCode) return true;
    const parsed = parseHeadquarters(addr);
    return !parsed.state || parsed.state === preferredStateCode;
  });

  const hasNational = containsNationalLanguage(text);
  const explicitGeoCount =
    stateSlugs.length + cities.length + counties.length + officeAddresses.length + regions.length;
  const isNationalOnly = hasNational && cities.length === 0 && counties.length === 0;

  const expandedStateSlugs = preferredStateCode
    ? stateSlugs
    : [...new Set([...stateSlugs, ...expandRegionsToStateSlugs(regions)])];

  const officeCities: ParsedCoverageCity[] = officeAddresses
    .map((address) => {
      const parsed = parseHeadquarters(address);
      if (!parsed.city || !parsed.state) return null;
      if (preferredStateCode && parsed.state !== preferredStateCode) return null;
      return { city: parsed.city, stateCode: parsed.state };
    })
    .filter((entry): entry is ParsedCoverageCity => Boolean(entry));

  cities = dedupeCities([...cities, ...officeCities]);

  // City → county mapping (Douglas from Roseburg, Lane from Eugene, etc.)
  const fromCities = cities.flatMap((c) =>
    countyAssignmentsFromParsedCity(c.city, c.stateCode)
  );
  counties = mergeCounties(counties, fromCities);

  if (preferredStateCode) {
    const preferredSlug = localStates.find((s) => s.code === preferredStateCode)?.slug;
    if (preferredSlug) {
      counties = counties.filter((c) => c.stateSlug === preferredSlug);
    }
  }

  const summaryParts = [
    ...cities.map((entry) => `${entry.city}, ${entry.stateCode}`),
    ...counties.map((entry) => `${entry.label} County`),
    ...(preferredStateCode ? [] : regions),
  ];

  return {
    consentGiven: true,
    websiteUrl: options?.websiteUrl ?? null,
    status:
      explicitGeoCount > 0 || cities.length > 0 || counties.length > 0
        ? 'ok'
        : hasNational
          ? 'ok'
          : 'not_found',
    isNationalOnly,
    summary: isNationalOnly
      ? 'National coverage (no specific service areas listed)'
      : summaryParts.length
        ? summaryParts.slice(0, 12).join('; ')
        : null,
    stateSlugs: expandedStateSlugs,
    cities,
    counties,
    officeAddresses,
    regions: preferredStateCode ? [] : regions,
    pagesFetched: [],
    rawSnippets: normalized.slice(0, 2000).split(/(?<=\.)\s+/).slice(0, 8),
  };
}
