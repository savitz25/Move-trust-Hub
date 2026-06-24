import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Pennsylvania batch-1 counties plus cross-border NJ, DE, and MD metro guides */
const PA_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  philadelphia: [
    {
      slug: 'montgomery',
      name: 'Montgomery',
      seat: 'Norristown',
      href: '/local-movers/pennsylvania/montgomery',
      displayLabel: 'Montgomery County, PA',
    },
    {
      slug: 'delaware',
      name: 'Delaware',
      seat: 'Media',
      href: '/local-movers/pennsylvania/delaware',
      displayLabel: 'Delaware County, PA',
    },
    {
      slug: 'bucks',
      name: 'Bucks',
      seat: 'Doylestown',
      href: '/local-movers/pennsylvania/bucks',
      displayLabel: 'Bucks County, PA',
    },
    {
      slug: 'camden',
      name: 'Camden',
      seat: 'Camden',
      href: '/local-movers/new-jersey/camden',
      displayLabel: 'Camden County, NJ',
    },
    {
      slug: 'gloucester',
      name: 'Gloucester',
      seat: 'Woodbury',
      href: '/local-movers/new-jersey/gloucester',
      displayLabel: 'Gloucester County, NJ',
    },
    {
      slug: 'new-castle',
      name: 'New Castle',
      seat: 'Wilmington',
      href: '/local-movers/delaware/new-castle',
      displayLabel: 'New Castle County, DE',
    },
  ],
  allegheny: [
    {
      slug: 'beaver',
      name: 'Beaver',
      seat: 'Beaver',
      href: '/local-movers/pennsylvania/beaver',
      displayLabel: 'Beaver County, PA',
    },
    {
      slug: 'westmoreland',
      name: 'Westmoreland',
      seat: 'Greensburg',
      href: '/local-movers/pennsylvania/westmoreland',
      displayLabel: 'Westmoreland County, PA',
    },
    {
      slug: 'washington',
      name: 'Washington',
      seat: 'Washington',
      href: '/local-movers/pennsylvania/washington',
      displayLabel: 'Washington County, PA',
    },
    {
      slug: 'butler',
      name: 'Butler',
      seat: 'Butler',
      href: '/local-movers/pennsylvania/butler',
      displayLabel: 'Butler County, PA',
    },
    {
      slug: 'armstrong',
      name: 'Armstrong',
      seat: 'Kittanning',
      href: '/local-movers/pennsylvania/armstrong',
      displayLabel: 'Armstrong County, PA',
    },
    {
      slug: 'lawrence',
      name: 'Lawrence',
      seat: 'New Castle',
      href: '/local-movers/pennsylvania/lawrence',
      displayLabel: 'Lawrence County, PA',
    },
  ],
  montgomery: [
    {
      slug: 'philadelphia',
      name: 'Philadelphia',
      seat: 'Philadelphia',
      href: '/local-movers/pennsylvania/philadelphia',
      displayLabel: 'Philadelphia County, PA',
    },
    {
      slug: 'bucks',
      name: 'Bucks',
      seat: 'Doylestown',
      href: '/local-movers/pennsylvania/bucks',
      displayLabel: 'Bucks County, PA',
    },
    {
      slug: 'chester',
      name: 'Chester',
      seat: 'West Chester',
      href: '/local-movers/pennsylvania/chester',
      displayLabel: 'Chester County, PA',
    },
    {
      slug: 'delaware',
      name: 'Delaware',
      seat: 'Media',
      href: '/local-movers/pennsylvania/delaware',
      displayLabel: 'Delaware County, PA',
    },
    {
      slug: 'berks',
      name: 'Berks',
      seat: 'Reading',
      href: '/local-movers/pennsylvania/berks',
      displayLabel: 'Berks County, PA',
    },
    {
      slug: 'montgomery',
      name: 'Montgomery',
      seat: 'Rockville',
      href: '/local-movers/maryland/montgomery',
      displayLabel: 'Montgomery County, MD',
    },
  ],
};

export function getPennsylvaniaNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return PA_COUNTY_NEIGHBORS[countySlug] ?? [];
}