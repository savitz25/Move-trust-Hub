import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Utah curated county corridor links — batch 1 */
const UT_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  'salt-lake': [
    { slug: 'utah', name: 'Utah', seat: 'Provo', href: '/local-movers/utah/utah', displayLabel: 'Utah County, UT' },
    { slug: 'davis', name: 'Davis', seat: 'Farmington', href: '/local-movers/utah/davis', displayLabel: 'Davis County, UT' },
    { slug: 'weber', name: 'Weber', seat: 'Ogden', href: '/local-movers/utah/weber', displayLabel: 'Weber County, UT' },
    { slug: 'tooele', name: 'Tooele', seat: 'Tooele', href: '/local-movers/utah/tooele', displayLabel: 'Tooele County, UT' },
    { slug: 'summit', name: 'Summit', seat: 'Coalville', href: '/local-movers/utah/summit', displayLabel: 'Summit County, UT' },
  ],
  utah: [
    { slug: 'salt-lake', name: 'Salt Lake', seat: 'Salt Lake City', href: '/local-movers/utah/salt-lake', displayLabel: 'Salt Lake County, UT' },
    { slug: 'davis', name: 'Davis', seat: 'Farmington', href: '/local-movers/utah/davis', displayLabel: 'Davis County, UT' },
    { slug: 'juab', name: 'Juab', seat: 'Nephi', href: '/local-movers/utah/juab', displayLabel: 'Juab County, UT' },
    { slug: 'wasatch', name: 'Wasatch', seat: 'Heber City', href: '/local-movers/utah/wasatch', displayLabel: 'Wasatch County, UT' },
    { slug: 'summit', name: 'Summit', seat: 'Coalville', href: '/local-movers/utah/summit', displayLabel: 'Summit County, UT' },
  ],
  davis: [
    { slug: 'salt-lake', name: 'Salt Lake', seat: 'Salt Lake City', href: '/local-movers/utah/salt-lake', displayLabel: 'Salt Lake County, UT' },
    { slug: 'weber', name: 'Weber', seat: 'Ogden', href: '/local-movers/utah/weber', displayLabel: 'Weber County, UT' },
    { slug: 'utah', name: 'Utah', seat: 'Provo', href: '/local-movers/utah/utah', displayLabel: 'Utah County, UT' },
    { slug: 'morgan', name: 'Morgan', seat: 'Morgan', href: '/local-movers/utah/morgan', displayLabel: 'Morgan County, UT' },
    { slug: 'box-elder', name: 'Box Elder', seat: 'Brigham City', href: '/local-movers/utah/box-elder', displayLabel: 'Box Elder County, UT' },
  ],
  weber: [
    { slug: 'davis', name: 'Davis', seat: 'Farmington', href: '/local-movers/utah/davis', displayLabel: 'Davis County, UT' },
    { slug: 'salt-lake', name: 'Salt Lake', seat: 'Salt Lake City', href: '/local-movers/utah/salt-lake', displayLabel: 'Salt Lake County, UT' },
    { slug: 'box-elder', name: 'Box Elder', seat: 'Brigham City', href: '/local-movers/utah/box-elder', displayLabel: 'Box Elder County, UT' },
    { slug: 'morgan', name: 'Morgan', seat: 'Morgan', href: '/local-movers/utah/morgan', displayLabel: 'Morgan County, UT' },
    { slug: 'cache', name: 'Cache', seat: 'Logan', href: '/local-movers/utah/cache', displayLabel: 'Cache County, UT' },
  ],
};

export function getUtahNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return UT_COUNTY_NEIGHBORS[countySlug] ?? [];
}