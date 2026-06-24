import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Maryland batch-1 counties plus cross-border DC and Virginia metro guides */
const MD_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  montgomery: [
    {
      slug: 'prince-georges',
      name: "Prince George's",
      seat: 'Upper Marlboro',
      href: '/local-movers/maryland/prince-georges',
      displayLabel: "Prince George's County, MD",
    },
    {
      slug: 'howard',
      name: 'Howard',
      seat: 'Ellicott City',
      href: '/local-movers/maryland/howard',
      displayLabel: 'Howard County, MD',
    },
    {
      slug: 'frederick',
      name: 'Frederick',
      seat: 'Frederick',
      href: '/local-movers/maryland/frederick',
      displayLabel: 'Frederick County, MD',
    },
    {
      slug: 'fairfax',
      name: 'Fairfax',
      seat: 'Fairfax',
      href: '/local-movers/virginia/fairfax',
      displayLabel: 'Fairfax County, VA',
    },
    {
      slug: 'arlington',
      name: 'Arlington',
      seat: 'Arlington',
      href: '/local-movers/virginia/arlington',
      displayLabel: 'Arlington, VA',
    },
    {
      slug: 'district-of-columbia',
      name: 'District of Columbia',
      seat: 'Washington',
      href: '/local-movers/district-of-columbia/district-of-columbia',
      displayLabel: 'Washington, DC',
    },
  ],
  'prince-georges': [
    {
      slug: 'montgomery',
      name: 'Montgomery',
      seat: 'Rockville',
      href: '/local-movers/maryland/montgomery',
      displayLabel: 'Montgomery County, MD',
    },
    {
      slug: 'charles',
      name: 'Charles',
      seat: 'La Plata',
      href: '/local-movers/maryland/charles',
      displayLabel: 'Charles County, MD',
    },
    {
      slug: 'anne-arundel',
      name: 'Anne Arundel',
      seat: 'Annapolis',
      href: '/local-movers/maryland/anne-arundel',
      displayLabel: 'Anne Arundel County, MD',
    },
    {
      slug: 'alexandria',
      name: 'Alexandria',
      seat: 'Alexandria',
      href: '/local-movers/virginia/alexandria',
      displayLabel: 'Alexandria, VA',
    },
    {
      slug: 'arlington',
      name: 'Arlington',
      seat: 'Arlington',
      href: '/local-movers/virginia/arlington',
      displayLabel: 'Arlington, VA',
    },
    {
      slug: 'district-of-columbia',
      name: 'District of Columbia',
      seat: 'Washington',
      href: '/local-movers/district-of-columbia/district-of-columbia',
      displayLabel: 'Washington, DC',
    },
  ],
  baltimore: [
    {
      slug: 'anne-arundel',
      name: 'Anne Arundel',
      seat: 'Annapolis',
      href: '/local-movers/maryland/anne-arundel',
      displayLabel: 'Anne Arundel County, MD',
    },
    {
      slug: 'harford',
      name: 'Harford',
      seat: 'Bel Air',
      href: '/local-movers/maryland/harford',
      displayLabel: 'Harford County, MD',
    },
    {
      slug: 'carroll',
      name: 'Carroll',
      seat: 'Westminster',
      href: '/local-movers/maryland/carroll',
      displayLabel: 'Carroll County, MD',
    },
    {
      slug: 'howard',
      name: 'Howard',
      seat: 'Ellicott City',
      href: '/local-movers/maryland/howard',
      displayLabel: 'Howard County, MD',
    },
    {
      slug: 'cecil',
      name: 'Cecil',
      seat: 'Elkton',
      href: '/local-movers/maryland/cecil',
      displayLabel: 'Cecil County, MD',
    },
    {
      slug: 'new-castle',
      name: 'New Castle',
      seat: 'Wilmington',
      href: '/local-movers/delaware/new-castle',
      displayLabel: 'New Castle County, DE',
    },
  ],
};

export function getMarylandNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return MD_COUNTY_NEIGHBORS[countySlug] ?? [];
}