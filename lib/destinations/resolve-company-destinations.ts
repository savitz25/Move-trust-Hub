import {
  resolveDestinationsWithDebug,
  type DestinationResolutionDebug,
  type ResolvedDestinationAssignment,
} from '@/lib/destinations/resolve-from-headquarters';
import type { HeadquartersResolutionInput } from '@/lib/destinations/headquarters-input';
import {
  countyAssignmentsFromParsedCity,
  parseCoverageText,
} from '@/lib/destinations/parse-coverage-text';
import { markets } from '@/lib/destinations/markets';
import { parseCountyKey } from '@/lib/destinations/county-keys';
import { normalizePlace, parseHeadquarters } from '@/lib/fmcsa/refresh/parse-headquarters';
import { localStates } from '@/lib/local-movers/states';
import type { WebsiteCoverageData } from '@/lib/verification/coverage-scrape-types';

export type CompanyDestinationInput = HeadquartersResolutionInput & {
  coverage?: WebsiteCoverageData | null;
};

export type CompanyDestinationDebug = DestinationResolutionDebug & {
  coverageApplied: boolean;
  coverageSummary: string | null;
  coverageNationalOnly: boolean;
};

function marketSlugsForCountyKey(countyKey: string, city: string | null, stateCode: string): string[] {
  const fromCounty = markets
    .filter((market) => market.primaryCounties.includes(countyKey))
    .map((market) => market.slug);

  const cityNorm = city ? normalizePlace(city) : '';
  const fromCity =
    cityNorm.length > 0
      ? markets
          .filter(
            (market) =>
              market.stateCode === stateCode &&
              !market.isClusterParent &&
              normalizePlace(market.displayName) === cityNorm
          )
          .map((market) => market.slug)
      : [];

  return [...new Set([...fromCity, ...fromCounty])];
}

function assignmentFromCounty(
  stateSlug: string,
  countySlug: string,
  stateCode: string,
  matchedCity: string
): ResolvedDestinationAssignment {
  const countyKey = `${countySlug}-${stateCode.toLowerCase()}`;
  return {
    stateSlug,
    countySlug,
    countyKey,
    marketSlugs: marketSlugsForCountyKey(countyKey, matchedCity, stateCode),
    matchedCity,
  };
}

function assignmentsFromCoverage(coverage: WebsiteCoverageData): ResolvedDestinationAssignment[] {
  if (coverage.status !== 'ok' || coverage.isNationalOnly) return [];

  const assignments: ResolvedDestinationAssignment[] = [];

  for (const county of coverage.counties) {
    const state = localStates.find((entry) => entry.slug === county.stateSlug);
    if (!state) continue;
    assignments.push(
      assignmentFromCounty(county.stateSlug, county.countySlug, state.code, county.label)
    );
  }

  for (const cityEntry of coverage.cities) {
    const countyTargets = countyAssignmentsFromParsedCity(cityEntry.city, cityEntry.stateCode);
    for (const target of countyTargets) {
      assignments.push(
        assignmentFromCounty(target.stateSlug, target.countySlug, cityEntry.stateCode, cityEntry.city)
      );
    }

    const cityNorm = normalizePlace(cityEntry.city);
    const cityMarkets = markets.filter(
      (market) =>
        market.stateCode === cityEntry.stateCode &&
        !market.isClusterParent &&
        normalizePlace(market.displayName) === cityNorm
    );

    for (const market of cityMarkets) {
      const parsed = parseCountyKey(market.primaryCounties[0] ?? '');
      if (!parsed) continue;
      assignments.push({
        stateSlug: parsed.stateSlug,
        countySlug: parsed.countySlug,
        countyKey: market.primaryCounties[0]!,
        marketSlugs: [market.slug],
        matchedCity: cityEntry.city,
      });
    }
  }

  for (const address of coverage.officeAddresses) {
    const parsed = parseHeadquarters(address);
    if (!parsed.city || !parsed.state) continue;
    const countyTargets = countyAssignmentsFromParsedCity(parsed.city, parsed.state);
    for (const target of countyTargets) {
      assignments.push(
        assignmentFromCounty(target.stateSlug, target.countySlug, parsed.state, parsed.city!)
      );
    }
  }

  return assignments;
}

function dedupeAssignments(assignments: ResolvedDestinationAssignment[]): ResolvedDestinationAssignment[] {
  const seen = new Set<string>();
  return assignments.filter((entry) => {
    const key = `${entry.stateSlug}/${entry.countySlug}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function resolveCompanyDestinationsWithDebug(
  input: string | CompanyDestinationInput | null | undefined
): CompanyDestinationDebug {
  const resolutionInput: CompanyDestinationInput =
    typeof input === 'string' ? { headquarters: input } : input ?? {};

  const hqDebug = resolveDestinationsWithDebug(resolutionInput);
  const coverage = resolutionInput.coverage ?? null;

  let merged = [...hqDebug.assignments];

  if (coverage?.consentGiven && coverage.status === 'ok' && !coverage.isNationalOnly) {
    merged = [...merged, ...assignmentsFromCoverage(coverage)];
  }

  const assignments = dedupeAssignments(merged);

  return {
    ...hqDebug,
    assignments,
    coverageApplied: Boolean(
      coverage?.consentGiven && coverage.status === 'ok' && !coverage.isNationalOnly
    ),
    coverageSummary: coverage?.summary ?? null,
    coverageNationalOnly: Boolean(coverage?.isNationalOnly),
  };
}

export function resolveCompanyDestinations(
  input: string | CompanyDestinationInput | null | undefined
): ResolvedDestinationAssignment[] {
  return resolveCompanyDestinationsWithDebug(input).assignments;
}

export function formatCompanyCoverageLabel(
  headquarters: string | null | undefined,
  coverage: WebsiteCoverageData | null | undefined
): string {
  if (!coverage?.consentGiven || coverage.status !== 'ok') {
    const { city, state } = parseHeadquarters(headquarters);
    if (city && state) return `${city}, ${state}`;
    if (state) return state;
    return 'Continental US';
  }

  if (coverage.isNationalOnly) {
    const { city, state } = parseHeadquarters(headquarters);
    if (city && state) return `${city}, ${state}`;
    return 'Continental US';
  }

  if (coverage.summary) return coverage.summary;

  const { city, state } = parseHeadquarters(headquarters);
  if (city && state) return `${city}, ${state}`;
  return 'Continental US';
}

/** Parse stored coverage JSON from onboarding without hitting a website. */
export function coverageDataFromStoredText(
  text: string,
  options: { consentGiven: boolean; websiteUrl?: string | null }
): WebsiteCoverageData {
  const parsed = parseCoverageText(text, options);
  return {
    ...parsed,
    scrapedAt: new Date().toISOString(),
    pagesFetched: parsed.pagesFetched ?? [],
  };
}