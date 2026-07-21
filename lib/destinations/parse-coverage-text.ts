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
  // Address fragments: "Street Los Angeles" / "Avenue Santa Monica" / "Main Street Los Angeles"
  city = city.replace(
    /^(?:street|st|avenue|ave|road|rd|boulevard|blvd|drive|dr|lane|ln|way|court|ct|place|pl)\s+/i,
    ''
  );
  city = city.replace(
    /\s+(?:street|st|avenue|ave|road|rd|boulevard|blvd|drive|dr)\s+/i,
    ' '
  );
  // If still "Something Los Angeles", keep last two words when last is a major city token
  const parts = city.split(/\s+/).filter(Boolean);
  if (parts.length >= 3) {
    const lastTwo = parts.slice(-2).join(' ');
    if (/^(los angeles|san diego|san francisco|san jose|long beach)$/i.test(lastTwo)) {
      city = lastTwo;
    }
  }
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

/**
 * Pull windows of text around service-area language so we don't map every city
 * mentioned site-wide (footer SEO cities, blog posts, etc.).
 */
function extractServiceAreaWindows(text: string): string {
  const lower = text.toLowerCase();
  const markers = [
    'service area',
    'service areas',
    'areas we serve',
    'cities we serve',
    'locations we serve',
    'areas served',
    'we serve',
    'serving',
    'coverage area',
    'local service',
    'neighborhoods we',
  ];
  const windows: string[] = [];
  for (const marker of markers) {
    let from = 0;
    while (from < lower.length) {
      const idx = lower.indexOf(marker, from);
      if (idx < 0) break;
      windows.push(text.slice(Math.max(0, idx - 80), Math.min(text.length, idx + 900)));
      from = idx + marker.length;
      if (windows.length >= 12) break;
    }
    if (windows.length >= 12) break;
  }
  return windows.length ? windows.join('\n') : '';
}

/**
 * Market substring matching is high-noise for large states (CA lists every metro).
 * Only used as a last-resort fallback when no City,ST pairs exist, and only inside
 * service-area windows with longer names + word boundaries.
 */
function extractMarketCities(
  text: string,
  preferredStateCode?: string | null
): ParsedCoverageCity[] {
  const preferred = preferredStateCode?.toUpperCase() || null;
  if (!preferred) return [];

  const haystack = ` ${normalizePlace(text)} `;
  const found: ParsedCoverageCity[] = [];

  for (const entry of MARKET_CITY_INDEX) {
    // Require longer names to avoid false hits
    if (entry.norm.length < 7) continue;
    if (entry.stateCode !== preferred) continue;
    if (!haystack.includes(` ${entry.norm} `) && !haystack.includes(entry.norm)) {
      continue;
    }
    // Prefer word-boundary style: surrounded by spaces in normalized haystack
    if (!haystack.includes(` ${entry.norm} `) && entry.norm.length < 10) continue;
    found.push({ city: entry.displayName, stateCode: entry.stateCode });
    if (found.length >= 15) break;
  }
  return found;
}

/** Match known seats + aliases only inside service-area windows (not whole page). */
function extractKnownCitiesInState(text: string, stateCode: string): ParsedCoverageCity[] {
  const state = localStates.find((s) => s.code === stateCode.toUpperCase());
  if (!state) return [];
  const haystack = ` ${normalizePlace(text)} `;
  const found: ParsedCoverageCity[] = [];
  const seen = new Set<string>();

  const pushCity = (city: string) => {
    const norm = normalizePlace(city);
    if (norm.length < 5 || seen.has(norm)) return;
    // Word-boundary-ish match
    if (!haystack.includes(` ${norm} `) && !haystack.includes(` ${norm},`)) return;
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

/**
 * Explicit "X County" mentions — only when preferred state is set, require
 * service-area context nearby to avoid footer boilerplate.
 */
function extractCounties(
  text: string,
  preferredStateCode?: string | null,
  options?: { requireServiceContext?: boolean }
): ParsedCoverageCounty[] {
  const haystack = normalizePlace(text);
  const found: ParsedCoverageCounty[] = [];
  const preferred = preferredStateCode?.toUpperCase() || null;
  const states = preferred
    ? localStates.filter((s) => s.code === preferred)
    : localStates;

  const serviceContext =
    haystack.includes('service area') ||
    haystack.includes('areas we serve') ||
    haystack.includes('cities we serve') ||
    haystack.includes('we serve') ||
    haystack.includes('serving');

  if (options?.requireServiceContext && preferred && !serviceContext) {
    return [];
  }

  for (const state of states) {
    for (const county of getCountiesForState(state.slug)) {
      const countyNorm = normalizePlace(county.name);
      const withSuffix = `${countyNorm} county`;
      // Short county names are too noisy (Lee, Lake, Polk, etc.)
      if (countyNorm.length < 5) continue;
      if (!haystack.includes(withSuffix)) continue;
      found.push({
        stateSlug: state.slug,
        countySlug: county.slug,
        label: county.name,
      });
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

/** CA metro clusters for dropping isolated SEO cities (e.g. one San Jose hit amid LA). */
const CA_METRO_CLUSTERS: string[][] = [
  ['los-angeles', 'orange', 'ventura', 'san-bernardino', 'riverside'],
  ['san-francisco', 'san-mateo', 'alameda', 'contra-costa', 'marin', 'santa-clara'],
  ['san-diego'],
  ['sacramento', 'yolo', 'placer', 'el-dorado'],
];

function dominantMetroSlugs(countySlugs: string[]): Set<string> | null {
  if (countySlugs.length < 2) return null;
  let best: string[] = [];
  for (const cluster of CA_METRO_CLUSTERS) {
    const hit = countySlugs.filter((s) => cluster.includes(s));
    if (hit.length > best.length) best = cluster;
  }
  if (best.length < 2) return null;
  // Only tighten when a clear majority of mapped counties sit in one metro
  const inBest = countySlugs.filter((s) => best.includes(s)).length;
  if (inBest < 2 || inBest < countySlugs.length * 0.5) return null;
  return new Set(best);
}

/** Cap / cluster counties when a site SEO-lists half a state. */
function tightenCountiesForState(
  cities: ParsedCoverageCity[],
  counties: ParsedCoverageCounty[],
  preferredStateCode: string | null
): { cities: ParsedCoverageCity[]; counties: ParsedCoverageCounty[] } {
  if (!preferredStateCode) return { cities, counties };

  // Prefer counties derived from explicit City,ST pairs only when we have them
  const fromPairs = cities.flatMap((c) =>
    countyAssignmentsFromParsedCity(c.city, c.stateCode)
  );
  let merged = mergeCounties(fromPairs, counties);

  const preferredSlug = localStates.find((s) => s.code === preferredStateCode)?.slug;
  if (preferredSlug) {
    merged = merged.filter((c) => c.stateSlug === preferredSlug);
  }

  // CA only: drop isolated SEO cities in a different metro when a clear hub dominates
  // (e.g. 2× Los Angeles cities vs 1× San Jose). Do NOT collapse multi-county OR lists.
  if (preferredStateCode === 'CA' && fromPairs.length > 0 && merged.length > 1) {
    const support = new Map<string, number>();
    for (const c of fromPairs) {
      support.set(c.countySlug, (support.get(c.countySlug) ?? 0) + 1);
    }
    const maxSupport = Math.max(...[...support.values()]);
    const winners = [...support.entries()]
      .filter(([, n]) => n === maxSupport)
      .map(([slug]) => slug);

    if (maxSupport >= 2) {
      let winnerMetro: Set<string> | null = null;
      for (const cluster of CA_METRO_CLUSTERS) {
        if (winners.some((w) => cluster.includes(w))) {
          winnerMetro = new Set(cluster);
          break;
        }
      }
      if (winnerMetro) {
        const filtered = merged.filter((c) => winnerMetro!.has(c.countySlug));
        if (filtered.length >= 1 && filtered.length < merged.length) {
          merged = filtered;
          cities = cities.filter((city) =>
            countyAssignmentsFromParsedCity(city.city, city.stateCode).some((c) =>
              winnerMetro!.has(c.countySlug)
            )
          );
        }
      }
    }
  }

  // Hard cap — local onboarding rarely needs 20 counties from one scan
  const MAX_COUNTIES = 6;
  if (merged.length > MAX_COUNTIES) {
    // Keep counties that came from the densest cluster of mapped cities
    const counts = new Map<string, number>();
    for (const c of fromPairs) {
      const k = `${c.stateSlug}/${c.countySlug}`;
      counts.set(k, (counts.get(k) ?? 0) + 1);
    }
    merged = [...merged]
      .sort((a, b) => {
        const ka = `${a.stateSlug}/${a.countySlug}`;
        const kb = `${b.stateSlug}/${b.countySlug}`;
        return (counts.get(kb) ?? 0) - (counts.get(ka) ?? 0);
      })
      .slice(0, MAX_COUNTIES);
  }

  return { cities, counties: merged };
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

  // When onboarding in a state, prefer service-area windows over whole-page SEO cities.
  const serviceWindows = preferredStateCode ? extractServiceAreaWindows(text) : '';
  const scopedText = serviceWindows || text;

  const pairCitiesAll = extractCityStatePairs(text);
  const pairCitiesScoped = serviceWindows
    ? extractCityStatePairs(serviceWindows)
    : pairCitiesAll;

  // Explicit City,ST in preferred state is highest signal
  let pairCities = pairCitiesAll.filter((c) =>
    preferredStateCode ? c.stateCode === preferredStateCode : true
  );
  const pairInWindow = pairCitiesScoped.filter((c) =>
    preferredStateCode ? c.stateCode === preferredStateCode : true
  );
  // Prefer window-scoped pairs when available
  if (pairInWindow.length >= 1) {
    pairCities = pairInWindow;
  }

  // Only fall back to market/seat substring matching when no City,ST pairs found
  let marketCities: ParsedCoverageCity[] = [];
  let knownInState: ParsedCoverageCity[] = [];
  if (preferredStateCode && pairCities.length === 0) {
    marketCities = extractMarketCities(scopedText, preferredStateCode);
    knownInState = extractKnownCitiesInState(scopedText, preferredStateCode);
  }

  let cities = dedupeCities([...pairCities, ...marketCities, ...knownInState]);
  if (preferredStateCode) {
    cities = cities.filter((c) => c.stateCode === preferredStateCode);
  }

  // Bare "X County" only from service windows when we have a preferred state
  let counties = preferredStateCode
    ? extractCounties(scopedText || text, preferredStateCode, {
        requireServiceContext: true,
      })
    : extractCounties(text, preferredStateCode);

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

  // When we already have strong City,ST pairs, don't expand via office SEO spam
  if (pairCities.length === 0) {
    cities = dedupeCities([...cities, ...officeCities]);
  } else {
    cities = dedupeCities([...pairCities, ...officeCities.filter((o) =>
      pairCities.some((p) => normalizePlace(p.city) === normalizePlace(o.city))
    )]);
  }

  // City → county mapping
  const fromCities = cities.flatMap((c) =>
    countyAssignmentsFromParsedCity(c.city, c.stateCode)
  );
  // When we have city→county maps, prefer those over bare county name hits
  counties =
    fromCities.length > 0
      ? mergeCounties(fromCities)
      : mergeCounties(counties, fromCities);

  if (preferredStateCode) {
    const tightened = tightenCountiesForState(cities, counties, preferredStateCode);
    cities = tightened.cities;
    counties = tightened.counties;
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
