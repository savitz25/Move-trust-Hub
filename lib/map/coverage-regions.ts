import type { Region } from '@/types';

/** All US states and DC as slugs matching public/geo/us-states.json */
export const ALL_US_STATE_SLUGS = [
  'alabama',
  'alaska',
  'arizona',
  'arkansas',
  'california',
  'colorado',
  'connecticut',
  'delaware',
  'district-of-columbia',
  'florida',
  'georgia',
  'hawaii',
  'idaho',
  'illinois',
  'indiana',
  'iowa',
  'kansas',
  'kentucky',
  'louisiana',
  'maine',
  'maryland',
  'massachusetts',
  'michigan',
  'minnesota',
  'mississippi',
  'missouri',
  'montana',
  'nebraska',
  'nevada',
  'new-hampshire',
  'new-jersey',
  'new-mexico',
  'new-york',
  'north-carolina',
  'north-dakota',
  'ohio',
  'oklahoma',
  'oregon',
  'pennsylvania',
  'rhode-island',
  'south-carolina',
  'south-dakota',
  'tennessee',
  'texas',
  'utah',
  'vermont',
  'virginia',
  'washington',
  'west-virginia',
  'wisconsin',
  'wyoming',
] as const;

/** Lower 48 + DC — excludes Alaska and Hawaii */
export const CONTINENTAL_US_STATE_SLUGS = ALL_US_STATE_SLUGS.filter(
  (slug) => slug !== 'alaska' && slug !== 'hawaii'
);

/**
 * Maps each regional coverage label to the state slugs that should be highlighted.
 * Used when a company record only has a `coverage` region string (not per-state data).
 */
export const REGION_STATE_SLUGS: Record<
  Exclude<Region, 'All 50 States' | 'Continental US'>,
  readonly string[]
> = {
  Northeast: [
    'connecticut',
    'maine',
    'massachusetts',
    'new-hampshire',
    'new-jersey',
    'new-york',
    'pennsylvania',
    'rhode-island',
    'vermont',
  ],
  Southeast: [
    'alabama',
    'arkansas',
    'florida',
    'georgia',
    'kentucky',
    'louisiana',
    'mississippi',
    'north-carolina',
    'south-carolina',
    'tennessee',
    'virginia',
    'west-virginia',
  ],
  South: [
    'alabama',
    'arkansas',
    'florida',
    'georgia',
    'kentucky',
    'louisiana',
    'mississippi',
    'north-carolina',
    'oklahoma',
    'south-carolina',
    'tennessee',
    'texas',
    'virginia',
    'west-virginia',
  ],
  Midwest: [
    'illinois',
    'indiana',
    'iowa',
    'kansas',
    'michigan',
    'minnesota',
    'missouri',
    'nebraska',
    'north-dakota',
    'ohio',
    'south-dakota',
    'wisconsin',
  ],
  Southwest: ['arizona', 'colorado', 'nevada', 'new-mexico', 'oklahoma', 'texas', 'utah'],
  'West Coast': ['california', 'oregon', 'washington'],
  'East Coast': [
    'connecticut',
    'delaware',
    'district-of-columbia',
    'florida',
    'georgia',
    'maine',
    'maryland',
    'massachusetts',
    'new-hampshire',
    'new-jersey',
    'new-york',
    'north-carolina',
    'pennsylvania',
    'rhode-island',
    'south-carolina',
    'vermont',
    'virginia',
  ],
  'Pacific Northwest': ['idaho', 'montana', 'oregon', 'washington'],
};

/** Two-letter postal codes → geo slugs for optional per-state coverage arrays */
const STATE_CODE_TO_SLUG: Record<string, string> = {
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

const KNOWN_SLUGS = new Set<string>(ALL_US_STATE_SLUGS);

function normalizeStateIdentifier(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const upper = trimmed.toUpperCase();
  if (STATE_CODE_TO_SLUG[upper]) return STATE_CODE_TO_SLUG[upper];

  const slug = trimmed.toLowerCase().replace(/\s+/g, '-');
  if (KNOWN_SLUGS.has(slug)) return slug;

  return null;
}

function normalizeStateSlugs(states: string[]): Set<string> {
  const slugs = new Set<string>();
  for (const state of states) {
    const slug = normalizeStateIdentifier(state);
    if (slug) slugs.add(slug);
  }
  return slugs;
}

export type CoverageInput = {
  /** Regional label from the company record (e.g. "Northeast", "Continental US") */
  coverage?: Region | null;
  /** Optional explicit list of state slugs or 2-letter codes — takes priority when present */
  coverageStates?: string[] | null;
  /** Optional national flag — highlights full continental U.S. (or all 50 if coverage says so) */
  nationalCoverage?: boolean | null;
};

/**
 * Resolves which state slugs should be highlighted on the coverage map.
 *
 * Priority:
 * 1. `coverageStates` — explicit per-state list when available on the company record
 * 2. `nationalCoverage` flag or national `coverage` labels ("Continental US", "All 50 States")
 * 3. Regional `coverage` label mapped through REGION_STATE_SLUGS
 * 4. Default to continental U.S. when data is missing or unrecognized
 */
export function getCoveredStateSlugs(input: CoverageInput): Set<string> {
  if (input.coverageStates?.length) {
    return normalizeStateSlugs(input.coverageStates);
  }

  const coverage = input.coverage ?? 'Continental US';

  if (input.nationalCoverage || coverage === 'All 50 States' || coverage === 'Continental US') {
    return coverage === 'All 50 States'
      ? new Set(ALL_US_STATE_SLUGS)
      : new Set(CONTINENTAL_US_STATE_SLUGS);
  }

  const regional = REGION_STATE_SLUGS[coverage as keyof typeof REGION_STATE_SLUGS];
  if (regional?.length) {
    return new Set(regional);
  }

  return new Set(CONTINENTAL_US_STATE_SLUGS);
}

export function isNationalCoverage(coverage: Region): boolean {
  return coverage === 'All 50 States' || coverage === 'Continental US';
}