/**
 * Intelligent coverage matching for the movers directory.
 * Supports National, Regional, and State + optional counties.
 */

import { companyResolvesAsLocalMover } from '@/lib/companies/is-local-mover';
import type { Company, DirectoryCoverageFilter, Region } from '@/types';

export const NATIONAL_COVERAGE_LABELS = new Set([
  'All 50 States',
  'Continental US',
  'National',
  'Nationwide',
  'United States',
]);

export const REGIONAL_COVERAGE_OPTIONS: Region[] = [
  'East Coast',
  'West Coast',
  'Midwest',
  'South',
  'Northeast',
  'Southeast',
  'Southwest',
  'Pacific Northwest',
];

const STATE_CODE_TO_NAME: Record<string, string> = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};

const STATE_CODE_TO_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(STATE_CODE_TO_NAME).map(([code, name]) => [
    code,
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''),
  ])
);

export function stateCodeToSlug(code: string): string | null {
  const c = code.trim().toUpperCase();
  return STATE_CODE_TO_SLUG[c] ?? null;
}

export function stateCodeToName(code: string): string | null {
  return STATE_CODE_TO_NAME[code.trim().toUpperCase()] ?? null;
}

function isNationalCoverageLabel(coverage: string | null | undefined): boolean {
  if (!coverage?.trim()) return false;
  const t = coverage.trim();
  if (NATIONAL_COVERAGE_LABELS.has(t)) return true;
  return /national|nationwide|all 50|continental|united states/i.test(t);
}

function isRegionalCoverageLabel(coverage: string | null | undefined): boolean {
  if (!coverage?.trim()) return false;
  return REGIONAL_COVERAGE_OPTIONS.some(
    (r) => r.toLowerCase() === coverage.trim().toLowerCase()
  );
}

/** Parse "City, ST" or trailing state name from headquarters. */
export function extractStateCodeFromHeadquarters(
  headquarters: string | null | undefined
): string | null {
  if (!headquarters?.trim()) return null;
  const hq = headquarters.trim();

  // "City, ST" or "City, ST 12345" at end
  const codeMatch = hq.match(/\b([A-Z]{2})\b(?:\s+\d{5}(?:-\d{4})?)?$/i);
  if (codeMatch?.[1]) {
    const code = codeMatch[1].toUpperCase();
    if (STATE_CODE_TO_NAME[code]) return code;
  }

  // "…, ST, 97496" or "…, ST," mid-string (common FMCSA style)
  const midMatch = hq.match(/,\s*([A-Z]{2})\s*(?:,|$)/i);
  if (midMatch?.[1]) {
    const code = midMatch[1].toUpperCase();
    if (STATE_CODE_TO_NAME[code]) return code;
  }

  const lower = hq.toLowerCase();
  for (const [code, name] of Object.entries(STATE_CODE_TO_NAME)) {
    if (lower.endsWith(name.toLowerCase()) || lower.includes(`, ${name.toLowerCase()}`)) {
      return code;
    }
  }
  return null;
}

function companyCoverageCounties(company: Company): Array<{ stateSlug: string; countySlug: string }> {
  const raw = company.coverageCounties;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((c) => ({
      stateSlug: String((c as { stateSlug?: string }).stateSlug ?? '').toLowerCase(),
      countySlug: String((c as { countySlug?: string }).countySlug ?? '').toLowerCase(),
    }))
    .filter((c) => c.stateSlug && c.countySlug);
}

/** True for Local Mover badge / intrastate companies (not only service_scope column). */
export function companyIsLocal(
  company: Pick<
    Company,
    'serviceScope' | 'entityType' | 'services' | 'usdotNumber' | 'mcNumber'
  > & {
    fmcsaRaw?: Record<string, unknown> | null;
    isLocalOnly?: boolean;
  }
): boolean {
  return companyResolvesAsLocalMover(company);
}

export function companyIsNational(company: Company): boolean {
  if (companyIsLocal(company)) return false;
  return isNationalCoverageLabel(company.coverage) || !company.coverage;
}

export function companyMatchesRegion(company: Company, region: Region): boolean {
  if (companyIsLocal(company)) return false;
  if (companyIsNational(company)) return true;
  return company.coverage?.toLowerCase() === region.toLowerCase();
}

export function companyServesState(company: Company, stateCode: string): boolean {
  const code = stateCode.trim().toUpperCase();
  const stateSlug = stateCodeToSlug(code);
  if (!code || !stateSlug) return false;

  // Local movers: coverage_counties or HQ
  if (companyIsLocal(company)) {
    const counties = companyCoverageCounties(company);
    if (counties.some((c) => c.stateSlug === stateSlug)) return true;
    const hqCode = extractStateCodeFromHeadquarters(company.headquarters);
    return hqCode === code;
  }

  // Interstate national
  if (companyIsNational(company)) return true;

  // Regional labels — approximate: include if HQ in state or coverage text mentions state
  const hqCode = extractStateCodeFromHeadquarters(company.headquarters);
  if (hqCode === code) return true;

  const name = stateCodeToName(code);
  const cov = (company.coverage || '').toLowerCase();
  if (name && cov.includes(name.toLowerCase())) return true;
  if (cov.includes(code.toLowerCase())) return true;

  // Regional multi-state companies: still show if national-like
  if (isRegionalCoverageLabel(company.coverage)) {
    // HQ in selected state is enough; otherwise don't over-include
    return false;
  }

  return false;
}

/**
 * County-level match (mirrors county local-mover pages).
 * Prefer explicit coverage_counties / destination assignments — do not flood
 * results with every national carrier when a county is selected.
 */
export function companyServesAnyCounty(
  company: Company,
  stateCode: string,
  countySlugs: string[]
): boolean {
  const code = stateCode.trim().toUpperCase();
  const stateSlug = stateCodeToSlug(code);
  if (!stateSlug || !countySlugs.length) return companyServesState(company, code);

  const want = new Set(countySlugs.map((s) => s.toLowerCase()));
  const counties = companyCoverageCounties(company);

  if (counties.some((c) => c.stateSlug === stateSlug && want.has(c.countySlug))) {
    return true;
  }

  // Local with no county list yet: HQ in state is a soft match (same as county page lag).
  if (companyIsLocal(company) && counties.length === 0) {
    return companyServesState(company, code);
  }

  // Interstate without assignment to this county: exclude (county page does not list them all).
  return false;
}

/**
 * Relevance score for state/county directory results.
 * Higher = sort earlier. Locals rise to the top unless type chips force Carrier/Broker only.
 */
export function companyGeoPriorityScore(
  company: Company,
  filter: DirectoryCoverageFilter,
  options?: { prioritizeLocalMovers?: boolean }
): number {
  if (filter.mode !== 'state' || !filter.stateCode) return 0;

  const prioritize = options?.prioritizeLocalMovers !== false;
  const isLocal = companyIsLocal(company);
  const counties = filter.countySlugs ?? [];
  const hasCountyFilter = counties.length > 0;
  const inCounty =
    hasCountyFilter && companyServesAnyCounty(company, filter.stateCode, counties);
  const inState = companyServesState(company, filter.stateCode);

  if (!inState && !inCounty) return 0;

  if (prioritize) {
    // County search: local-in-county strongest, then other locals in state, then assigned interstate
    if (hasCountyFilter) {
      if (isLocal && inCounty) return 400;
      if (isLocal && inState) return 300;
      if (inCounty) return 200;
      return 50;
    }
    // State search: all locals first, then interstate serving the state
    if (isLocal) return 300;
    return 100;
  }

  // Type filter suppressed local boost — still nudge county assignments slightly
  if (hasCountyFilter && inCounty) return 20;
  return 0;
}

/** True when state/county results should sort Local Mover companies first. */
export function shouldPrioritizeLocalMoversInCoverage(
  services: string[] | null | undefined,
  coverage: DirectoryCoverageFilter
): boolean {
  if (coverage.mode !== 'state') return false;
  const typeChips = (services ?? []).filter(
    (s) =>
      s === 'Carrier' ||
      s === 'Broker' ||
      s === 'Carrier / Broker' ||
      s === 'Local Mover'
  );
  // User explicitly filtered to carrier/broker types only → no local boost
  if (
    typeChips.length > 0 &&
    !typeChips.includes('Local Mover') &&
    typeChips.every((s) => s === 'Carrier' || s === 'Broker' || s === 'Carrier / Broker')
  ) {
    return false;
  }
  return true;
}

/**
 * Resolve structured filter from legacy `coverage` string or full coverageFilter.
 * Also accepts direct `state` + `countySlugs` shorthand.
 */
export function normalizeCoverageFilter(
  filters: {
    coverage?: string | null;
    coverageFilter?: DirectoryCoverageFilter | null;
    /** Shorthand: 2-letter state code (URL `state`) */
    state?: string | null;
    /** Shorthand county slugs (URL `counties` / `counties[]`) */
    counties?: string[] | null;
  }
): DirectoryCoverageFilter {
  const fromFilter = filters.coverageFilter;
  const stateFromShorthand = (filters.state || '').trim().toUpperCase();
  const countiesFromShorthand = (filters.counties ?? [])
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  // Explicit structured filter wins when mode is set
  if (fromFilter?.mode && fromFilter.mode !== 'any') {
    return {
      mode: fromFilter.mode,
      region: fromFilter.region ?? null,
      stateCode: fromFilter.stateCode ?? (stateFromShorthand || null),
      countySlugs:
        fromFilter.countySlugs?.length
          ? fromFilter.countySlugs
          : countiesFromShorthand,
    };
  }

  // state=AZ or coverageFilter.stateCode without mode
  const stateCode =
    (fromFilter?.stateCode || stateFromShorthand || '').trim().toUpperCase() || null;
  const countySlugs =
    fromFilter?.countySlugs?.length
      ? fromFilter.countySlugs
      : countiesFromShorthand;

  if (stateCode && STATE_CODE_TO_NAME[stateCode]) {
    return { mode: 'state', stateCode, countySlugs };
  }

  if (fromFilter?.mode === 'any') {
    return { mode: 'any' };
  }

  const c = (filters.coverage || 'Any').trim();
  if (!c || c === 'Any') return { mode: 'any' };
  if (c === 'National' || NATIONAL_COVERAGE_LABELS.has(c as never)) {
    return { mode: 'national' };
  }
  if (c === 'Regional') {
    return { mode: 'regional', region: 'South' };
  }
  if (REGIONAL_COVERAGE_OPTIONS.some((r) => r === c)) {
    return { mode: 'regional', region: c as Region };
  }
  // state code like CA or state name
  const asCode = c.length === 2 ? c.toUpperCase() : null;
  if (asCode && STATE_CODE_TO_NAME[asCode]) {
    return { mode: 'state', stateCode: asCode, countySlugs: [] };
  }
  // Full state name
  for (const [code, name] of Object.entries(STATE_CODE_TO_NAME)) {
    if (name.toLowerCase() === c.toLowerCase()) {
      return { mode: 'state', stateCode: code, countySlugs: [] };
    }
  }
  return { mode: 'any' };
}

export function companyMatchesCoverageFilter(
  company: Company,
  filter: DirectoryCoverageFilter
): boolean {
  switch (filter.mode) {
    case 'any':
      return true;
    case 'national':
      return companyIsNational(company);
    case 'regional': {
      const region = filter.region;
      if (!region) return !companyIsLocal(company) && isRegionalCoverageLabel(company.coverage);
      return companyMatchesRegion(company, region);
    }
    case 'state': {
      const code = filter.stateCode;
      if (!code) return true;
      const counties = filter.countySlugs ?? [];
      if (counties.length > 0) {
        return companyServesAnyCounty(company, code, counties);
      }
      return companyServesState(company, code);
    }
    default:
      return true;
  }
}
