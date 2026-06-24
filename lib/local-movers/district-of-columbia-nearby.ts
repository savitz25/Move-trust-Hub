import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Cross-jurisdiction metro links for DC — Virginia and Maryland neighbors */
const DC_METRO_NEIGHBORS: NearbyCountyLink[] = [
  {
    slug: 'arlington',
    name: 'Arlington',
    seat: 'Arlington',
    href: '/local-movers/virginia/arlington',
    displayLabel: 'Arlington, VA',
  },
  {
    slug: 'alexandria',
    name: 'Alexandria',
    seat: 'Alexandria',
    href: '/local-movers/virginia/alexandria',
    displayLabel: 'Alexandria, VA',
  },
  {
    slug: 'fairfax',
    name: 'Fairfax',
    seat: 'Fairfax',
    href: '/local-movers/virginia/fairfax',
    displayLabel: 'Fairfax County, VA',
  },
  {
    slug: 'prince-william',
    name: 'Prince William',
    seat: 'Manassas',
    href: '/local-movers/virginia/prince-william',
    displayLabel: 'Prince William County, VA',
  },
  {
    slug: 'montgomery',
    name: 'Montgomery',
    seat: 'Rockville',
    href: '/local-movers/maryland/montgomery',
    displayLabel: 'Montgomery County, MD',
  },
];

export function getDistrictOfColumbiaNearbyCounties(
  _countySlug: string
): NearbyCountyLink[] {
  return DC_METRO_NEIGHBORS;
}