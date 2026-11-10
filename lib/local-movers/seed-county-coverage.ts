import { isCountyAdjacent } from '@/lib/local-movers/county-adjacency';
import { seedSlotCountsAsCoverage } from '@/lib/local-movers/county-coverage-evidence';
import { seedCountiesForMover } from '@/lib/local-movers/index';
import { resolveCityToCounty } from '@/lib/local-movers/resolve-city-to-county';
import { localStates } from '@/lib/local-movers/states';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

function stateSlugForCode(code: string | undefined): string | null {
  if (!code) return null;
  return localStates.find((state) => state.code === code.trim().toUpperCase())?.slug ?? null;
}

/**
 * Drop static catalog slots that are a statewide paste or a known
 * non-adjacent fill. Directory rows are not seed slots.
 */
export function filterSeedMoversForCountyCoverage(
  county: LocalCounty,
  movers: LocalMover[]
): LocalMover[] {
  return movers.filter((mover) => seedMoverCountsForCounty(county, mover));
}

export function seedMoverCountsForCounty(county: LocalCounty, mover: LocalMover): boolean {
  if (mover.listingSource === 'directory') return true;
  const counties = seedCountiesForMover(mover.id, county.stateSlug);
  if (!counties.length) return true;

  const hqStateSlug = stateSlugForCode(mover.headquartersState);
  const otherState = Boolean(hqStateSlug && hqStateSlug !== county.stateSlug);
  const hq = otherState
    ? null
    : resolveCityToCounty({
        city: mover.city,
        stateCode: mover.headquartersState,
        stateSlug: county.stateSlug,
      });
  const headquartersCounty = Boolean(
    hq && hq.stateSlug === county.stateSlug && hq.countySlug === county.slug
  );
  const adjacentToHeadquarters = Boolean(
    hq &&
      hq.stateSlug === county.stateSlug &&
      isCountyAdjacent(county.stateSlug, hq.countySlug, county.slug)
  );
  const headquartersKnown = Boolean(otherState || hq);

  return seedSlotCountsAsCoverage({
    countiesInState: counties.length,
    headquartersKnown,
    headquartersCounty,
    adjacentToHeadquarters,
  }).counts;
}
