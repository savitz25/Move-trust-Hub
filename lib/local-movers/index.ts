import { generatedCountyAssignments } from '@/data/generated/index';
import { floridaCountyMoverAssignments } from '@/data/florida-county-assignments';
import { countyMoverAssignments } from '@/data/local-movers-seed';
import { fullMetroPools, fullMoversCatalog } from '@/lib/local-movers/catalog';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';
import { getCounty } from '@/lib/local-movers/geography/index';
import { getLocalState } from '@/lib/local-movers/states';

const MAX_MOVERS_PER_COUNTY = 10;

const allCountyAssignments = [
  ...floridaCountyMoverAssignments,
  ...generatedCountyAssignments,
  ...countyMoverAssignments,
];

function resolveMoverIds(county: LocalCounty): string[] {
  const assignment = allCountyAssignments.find(
    (entry) =>
      entry.stateSlug === county.stateSlug && entry.countySlug === county.slug
  );

  if (assignment?.moverIds.length) {
    return assignment.moverIds;
  }

  if (county.metro && fullMetroPools[county.metro]) {
    return fullMetroPools[county.metro];
  }

  return [];
}

export function getMoversForCounty(
  stateSlug: string,
  countySlug: string
): { county: LocalCounty; movers: LocalMover[]; isRegionalFallback: boolean } | null {
  const county = getCounty(stateSlug, countySlug);
  if (!county) return null;

  const moverIds = resolveMoverIds(county);
  const hasExplicitAssignment = allCountyAssignments.some(
    (entry) =>
      entry.stateSlug === county.stateSlug && entry.countySlug === county.slug
  );

  const movers = moverIds
    .map((id) => fullMoversCatalog[id])
    .filter((mover): mover is LocalMover => Boolean(mover))
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, MAX_MOVERS_PER_COUNTY);

  return {
    county,
    movers,
    isRegionalFallback: !hasExplicitAssignment && Boolean(county.metro),
  };
}

export function getLocalMoverById(id: string): LocalMover | undefined {
  return fullMoversCatalog[id];
}

export function buildCountyTitle(county: LocalCounty, stateName: string): string {
  return `Best Local Movers in ${county.name} County, ${stateName}`;
}

export function buildCountyDescription(
  county: LocalCounty,
  stateName: string,
  moverCount: number
): string {
  const seat = county.seat ? ` (${county.seat})` : '';
  return `Compare ${moverCount} top-rated local movers in ${county.name} County, ${stateName}${seat}. FMCSA licensing, ratings, services, and links to full profiles. Free quote tools.`;
}

export function buildStateTitle(stateName: string, countyCount: number): string {
  return `Local Movers in ${stateName} — ${countyCount} County Guides`;
}

export function buildStateDescription(
  stateName: string,
  countyCount: number
): string {
  return `Find trusted local movers by county in ${stateName}. Browse ${countyCount} county guides with ratings, FMCSA info, and links to our interstate directory and moving calculator.`;
}

export function getCountyPath(stateSlug: string, countySlug: string): string {
  return `/local-movers/${stateSlug}/${countySlug}`;
}

export function getStatePath(stateSlug: string): string {
  return `/local-movers/${stateSlug}`;
}

export { getLocalState, localStates } from '@/lib/local-movers/states';
export {
  getAllCountyParams,
  getCountiesForState,
  getCounty,
  stateHasCounties,
} from '@/lib/local-movers/geography/index';