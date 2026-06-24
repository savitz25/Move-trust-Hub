import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Delaware counties plus cross-border MD, PA, and NJ metro guides */
const DE_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  'new-castle': [
    { slug: 'kent', name: 'Kent', seat: 'Dover', href: '/local-movers/delaware/kent', displayLabel: 'Kent County, DE' },
    { slug: 'chester', name: 'Chester', seat: 'West Chester', href: '/local-movers/pennsylvania/chester', displayLabel: 'Chester County, PA' },
    { slug: 'cecil', name: 'Cecil', seat: 'Elkton', href: '/local-movers/maryland/cecil', displayLabel: 'Cecil County, MD' },
    { slug: 'gloucester', name: 'Gloucester', seat: 'Woodbury', href: '/local-movers/new-jersey/gloucester', displayLabel: 'Gloucester County, NJ' },
    { slug: 'camden', name: 'Camden', seat: 'Camden', href: '/local-movers/new-jersey/camden', displayLabel: 'Camden County, NJ' },
  ],
  sussex: [
    { slug: 'kent', name: 'Kent', seat: 'Dover', href: '/local-movers/delaware/kent', displayLabel: 'Kent County, DE' },
    { slug: 'worcester', name: 'Worcester', seat: 'Snow Hill', href: '/local-movers/maryland/worcester', displayLabel: 'Worcester County, MD' },
    { slug: 'cumberland', name: 'Cumberland', seat: 'Bridgeton', href: '/local-movers/new-jersey/cumberland', displayLabel: 'Cumberland County, NJ' },
    { slug: 'salem', name: 'Salem', seat: 'Salem', href: '/local-movers/new-jersey/salem', displayLabel: 'Salem County, NJ' },
  ],
  kent: [
    { slug: 'new-castle', name: 'New Castle', seat: 'Wilmington', href: '/local-movers/delaware/new-castle', displayLabel: 'New Castle County, DE' },
    { slug: 'sussex', name: 'Sussex', seat: 'Georgetown', href: '/local-movers/delaware/sussex', displayLabel: 'Sussex County, DE' },
    { slug: 'cecil', name: 'Cecil', seat: 'Elkton', href: '/local-movers/maryland/cecil', displayLabel: 'Cecil County, MD' },
    { slug: 'harford', name: 'Harford', seat: 'Bel Air', href: '/local-movers/maryland/harford', displayLabel: 'Harford County, MD' },
  ],
};

export function getDelawareNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return DE_COUNTY_NEIGHBORS[countySlug] ?? [];
}