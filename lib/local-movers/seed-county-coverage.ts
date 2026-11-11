import { isCountyAdjacent } from '@/lib/local-movers/county-adjacency';
import { seedSlotCountsAsCoverage } from '@/lib/local-movers/county-coverage-evidence';
import { seedCountiesForMover } from '@/lib/local-movers/index';
import { resolveHeadquartersCounty } from '@/lib/local-movers/resolve-headquarters-county';
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
/**
 * When the catalog city is only a street, use the company headquarters
 * string so a known county can be resolved. Unresolved addresses are left
 * alone and do not, by themselves, drop an in-state slot under 50 counties.
 */
export function withCompanyHeadquarters(
  movers: LocalMover[],
  headquartersBySlug: Map<string, string | null>
): LocalMover[] {
  return movers.map((mover) => {
    const slug = mover.profileSlug?.trim();
    const headquarters = slug ? headquartersBySlug.get(slug) : undefined;
    if (!headquarters) return mover;
    const current = resolveHeadquartersCounty(
      [mover.city, mover.headquartersState].filter(Boolean).join(', ')
    );
    if (current.countyResolved) return mover;
    const resolved = resolveHeadquartersCounty(headquarters);
    if (!resolved.countyResolved && !resolved.stateKnown) return mover;
    return { ...mover, headquartersAddress: headquarters };
  });
}

/** Same seed list the county page shows: company headquarters, then coverage. */
export function pageSeedMovers(
  county: LocalCounty,
  movers: LocalMover[],
  headquartersBySlug: Map<string, string | null>
): LocalMover[] {
  return filterSeedMoversForCountyCoverage(
    county,
    withCompanyHeadquarters(movers, headquartersBySlug)
  );
}

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
  const fromCatalog = resolveHeadquartersCounty(
    [mover.city, mover.headquartersState].filter(Boolean).join(', ')
  );
  const fromAddress = mover.headquartersAddress
    ? resolveHeadquartersCounty(mover.headquartersAddress)
    : null;
  const fromParts =
    fromAddress && (fromAddress.countyResolved || fromAddress.stateKnown)
      ? fromAddress
      : fromCatalog;
  const hqState = fromParts.stateSlug ?? hqStateSlug;
  const inState = hqState ? hqState === county.stateSlug : null;
  const countyResolved = Boolean(fromParts.countyResolved && inState !== false);
  const headquartersCounty = Boolean(
    countyResolved && fromParts.countySlug === county.slug && fromParts.stateSlug === county.stateSlug
  );
  const adjacentToHeadquarters = Boolean(
    countyResolved &&
      fromParts.countySlug &&
      fromParts.stateSlug === county.stateSlug &&
      isCountyAdjacent(county.stateSlug, fromParts.countySlug, county.slug)
  );

  return seedSlotCountsAsCoverage({
    countiesInState: counties.length,
    headquartersKnown: countyResolved,
    headquartersCounty,
    adjacentToHeadquarters,
    headquartersInState: inState,
  }).counts;
}
