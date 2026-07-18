import type { UsZipPlace } from '@/lib/geo/lookup-us-zip';
import type { LocalCounty } from '@/lib/local-movers/types';
import type { Company } from '@/types';

export type MoverCoverageTier = 'local' | 'state' | 'national';

const TIER_ORDER: Record<MoverCoverageTier, number> = {
  local: 0,
  state: 1,
  national: 2,
};

const NATIONAL_COVERAGE = new Set([
  'All 50 States',
  'Continental US',
]);

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/\bst\.\b/g, 'saint')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function hqInState(hq: string, place: UsZipPlace): boolean {
  const h = hq.toLowerCase();
  const code = place.stateCode.toLowerCase();
  const name = place.stateName.toLowerCase();
  return (
    h.includes(`, ${code}`) ||
    h.endsWith(` ${code}`) ||
    h.includes(` ${code} `) ||
    h.includes(name)
  );
}

/**
 * Classify a directory company relative to the pickup place/county.
 * Local = same county (or city seat in that county); state = same state; else national.
 */
export function classifyMoverCoverage(
  company: Company,
  place: UsZipPlace,
  county: LocalCounty | null,
  localSlugs?: ReadonlySet<string>
): MoverCoverageTier {
  if (localSlugs?.has(company.slug)) return 'local';

  const hq = company.headquarters || '';
  const hqNorm = normalize(hq);
  const city = normalize(place.city);

  if (county) {
    const countyBase = normalize(county.name.replace(/ county$/i, ''));
    const seat = county.seat ? normalize(county.seat) : '';
    if (countyBase && hqNorm.includes(countyBase)) return 'local';
    if (seat && hqNorm.includes(seat)) return 'local';
  }

  // City in HQ + same state → treat as local to the metro/county market
  if (city && hqNorm.includes(city) && hqInState(hq, place)) {
    return 'local';
  }

  if (hqInState(hq, place)) return 'state';

  const coverage = String(company.coverage || '');
  if (NATIONAL_COVERAGE.has(coverage)) return 'national';

  return 'national';
}

export type RankedCompany = Company & { coverageTier: MoverCoverageTier };

/**
 * Rank movers: local → statewide → national, reputation within each tier.
 * Returns up to `limit` unique companies.
 */
export function rankMoversForPickup(
  companies: Company[],
  place: UsZipPlace,
  county: LocalCounty | null,
  options?: {
    limit?: number;
    /** Company slugs known to serve this county (assignments). */
    localSlugs?: ReadonlySet<string>;
  }
): RankedCompany[] {
  const limit = options?.limit ?? 10;
  const localSlugs = options?.localSlugs;

  const ranked: RankedCompany[] = companies.map((c) => ({
    ...c,
    coverageTier: classifyMoverCoverage(c, place, county, localSlugs),
  }));

  ranked.sort((a, b) => {
    const tierDiff = TIER_ORDER[a.coverageTier] - TIER_ORDER[b.coverageTier];
    if (tierDiff !== 0) return tierDiff;
    return (b.reputationScore || 0) - (a.reputationScore || 0);
  });

  const seen = new Set<string>();
  const out: RankedCompany[] = [];
  for (const c of ranked) {
    if (seen.has(c.slug)) continue;
    seen.add(c.slug);
    out.push(c);
    if (out.length >= limit) break;
  }
  return out;
}

export function tierLabel(
  tier: MoverCoverageTier,
  place: UsZipPlace,
  county: LocalCounty | null
): string {
  switch (tier) {
    case 'local':
      return county
        ? `Local · ${county.name}, ${place.stateCode}`
        : `Local · ${place.city}, ${place.stateCode}`;
    case 'state':
      return `Statewide · ${place.stateName}`;
    case 'national':
      return 'National carriers';
  }
}