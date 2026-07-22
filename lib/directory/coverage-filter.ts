/**
 * Intelligent coverage matching for the movers directory.
 * Supports National, Regional, and State + optional counties.
 */

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
  const codeMatch = hq.match(/\b([A-Z]{2})\b(?:\s+\d{5})?$/);
  if (codeMatch?.[1] && STATE_CODE_TO_NAME[codeMatch[1]]) return codeMatch[1];
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

export function companyIsLocal(company: Pick<Company, 'serviceScope'>): boolean {
  return company.serviceScope === 'intrastate';
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

export function companyServesAnyCounty(
  company: Company,
  stateCode: string,
  countySlugs: string[]
): boolean {
  const code = stateCode.trim().toUpperCase();
  const stateSlug = stateCodeToSlug(code);
  if (!stateSlug || !countySlugs.length) return companyServesState(company, code);

  const want = new Set(countySlugs.map((s) => s.toLowerCase()));

  if (companyIsLocal(company)) {
    const counties = companyCoverageCounties(company);
    return counties.some(
      (c) => c.stateSlug === stateSlug && want.has(c.countySlug)
    );
  }

  // Interstate national/regional: treat as serving any county in the state
  if (companyIsNational(company) || isRegionalCoverageLabel(company.coverage)) {
    return companyServesState(company, code);
  }

  // HQ in state without county granularity
  return companyServesState(company, code);
}

/**
 * Resolve structured filter from legacy `coverage` string or full coverageFilter.
 */
export function normalizeCoverageFilter(
  filters: {
    coverage?: string | null;
    coverageFilter?: DirectoryCoverageFilter | null;
  }
): DirectoryCoverageFilter {
  if (filters.coverageFilter?.mode) {
    return {
      mode: filters.coverageFilter.mode,
      region: filters.coverageFilter.region ?? null,
      stateCode: filters.coverageFilter.stateCode ?? null,
      countySlugs: filters.coverageFilter.countySlugs ?? [],
    };
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
