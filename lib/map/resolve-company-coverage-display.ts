import { parseCoverageText } from '@/lib/destinations/parse-coverage-text';
import { parseHeadquarters } from '@/lib/fmcsa/refresh/parse-headquarters';
import { localStates } from '@/lib/local-movers/states';
import type { Region } from '@/types';
import {
  ALL_US_STATE_SLUGS,
  CONTINENTAL_US_STATE_SLUGS,
  getCoveredStateSlugs,
  isNationalCoverage,
  REGION_STATE_SLUGS,
} from '@/lib/map/coverage-regions';

const KNOWN_REGIONS = new Set<string>([
  'All 50 States',
  'Continental US',
  'East Coast',
  'West Coast',
  'Midwest',
  'South',
  'Northeast',
  'Southeast',
  'Southwest',
  'Pacific Northwest',
]);

export type CompanyCoverageDisplay = {
  coveredStateSlugs: Set<string>;
  description: string;
  isNational: boolean;
};

function stateNameFromSlug(slug: string): string | null {
  return localStates.find((state) => state.slug === slug)?.name ?? null;
}

function addStateCode(slugs: Set<string>, stateCode: string | null | undefined): void {
  if (!stateCode) return;
  const state = localStates.find((entry) => entry.code === stateCode);
  if (state) slugs.add(state.slug);
}

function formatStateNameList(names: string[]): string {
  const unique = [...new Set(names)].filter(Boolean).sort((a, b) => a.localeCompare(b));
  if (unique.length === 0) return 'their local service area';
  if (unique.length === 1) return unique[0]!;
  if (unique.length === 2) return `${unique[0]} and ${unique[1]}`;
  return `${unique.slice(0, -1).join(', ')}, and ${unique[unique.length - 1]}`;
}

function isNationalCoverageLabel(label: string): boolean {
  const normalized = label.trim().toLowerCase();
  return (
    normalized === 'continental us' ||
    normalized === 'all 50 states' ||
    normalized === 'national coverage (no specific service areas listed)' ||
    normalized === 'nationwide' ||
    /^serves?\s+(the\s+)?(entire\s+)?(united states|continental us|all 50 states)/i.test(label)
  );
}

/**
 * Resolve highlighted states and human-readable coverage copy for company profiles.
 */
export function resolveCompanyCoverageDisplay(input: {
  coverage?: string | null;
  headquarters?: string | null;
  assignmentStateSlugs?: string[] | null;
}): CompanyCoverageDisplay {
  const coverageRaw = (input.coverage ?? '').trim();

  if (KNOWN_REGIONS.has(coverageRaw)) {
    const region = coverageRaw as Region;
    const slugs = getCoveredStateSlugs({ coverage: region });
    return {
      coveredStateSlugs: slugs,
      description: coverageRaw,
      isNational: isNationalCoverage(region),
    };
  }

  if (isNationalCoverageLabel(coverageRaw)) {
    const allFifty = coverageRaw.toLowerCase().includes('50');
    return {
      coveredStateSlugs: new Set(allFifty ? ALL_US_STATE_SLUGS : CONTINENTAL_US_STATE_SLUGS),
      description: allFifty ? 'All 50 States' : 'Continental US',
      isNational: true,
    };
  }

  const slugs = new Set<string>();

  addStateCode(slugs, parseHeadquarters(input.headquarters).state);

  for (const assignmentSlug of input.assignmentStateSlugs ?? []) {
    if (assignmentSlug?.trim()) slugs.add(assignmentSlug.trim());
  }

  if (coverageRaw) {
    const parsed = parseCoverageText(coverageRaw, { consentGiven: true });

    if (parsed.isNationalOnly) {
      const names = [...slugs].map(stateNameFromSlug).filter((name): name is string => Boolean(name));
      return {
        coveredStateSlugs: slugs,
        description: names.length ? formatStateNameList(names) : 'Continental US',
        isNational: false,
      };
    }

    for (const stateSlug of parsed.stateSlugs) slugs.add(stateSlug);
    for (const city of parsed.cities) addStateCode(slugs, city.stateCode);
    for (const county of parsed.counties) slugs.add(county.stateSlug);
    for (const address of parsed.officeAddresses) {
      addStateCode(slugs, parseHeadquarters(address).state);
    }
    for (const region of parsed.regions) {
      const regional = REGION_STATE_SLUGS[region as keyof typeof REGION_STATE_SLUGS];
      regional?.forEach((stateSlug) => slugs.add(stateSlug));
    }
  }

  const stateNames = [...slugs].map(stateNameFromSlug).filter((name): name is string => Boolean(name));

  if (stateNames.length === 0) {
    return {
      coveredStateSlugs: new Set(CONTINENTAL_US_STATE_SLUGS),
      description: 'Continental US',
      isNational: true,
    };
  }

  if (stateNames.length >= CONTINENTAL_US_STATE_SLUGS.length - 2) {
    return {
      coveredStateSlugs: new Set(CONTINENTAL_US_STATE_SLUGS),
      description: 'Continental US',
      isNational: true,
    };
  }

  return {
    coveredStateSlugs: slugs,
    description: formatStateNameList(stateNames),
    isNational: false,
  };
}