import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Alaska major boroughs — inter-borough guides plus Washington Lower 48 long-distance hubs */
const AK_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  anchorage: [
    { slug: 'matanuska-susitna', name: 'Matanuska-Susitna', seat: 'Palmer', href: '/local-movers/alaska/matanuska-susitna', displayLabel: 'Matanuska-Susitna Borough, AK' },
    { slug: 'kenai-peninsula', name: 'Kenai Peninsula', seat: 'Soldotna', href: '/local-movers/alaska/kenai-peninsula', displayLabel: 'Kenai Peninsula Borough, AK' },
    { slug: 'fairbanks-north-star', name: 'Fairbanks North Star', seat: 'Fairbanks', href: '/local-movers/alaska/fairbanks-north-star', displayLabel: 'Fairbanks North Star Borough, AK' },
    { slug: 'juneau', name: 'Juneau', seat: 'Juneau', href: '/local-movers/alaska/juneau', displayLabel: 'Juneau City and Borough, AK' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
    { slug: 'snohomish', name: 'Snohomish', seat: 'Everett', href: '/local-movers/washington/snohomish', displayLabel: 'Snohomish County, WA' },
  ],
  'matanuska-susitna': [
    { slug: 'anchorage', name: 'Anchorage', seat: 'Anchorage', href: '/local-movers/alaska/anchorage', displayLabel: 'Anchorage Municipality, AK' },
    { slug: 'fairbanks-north-star', name: 'Fairbanks North Star', seat: 'Fairbanks', href: '/local-movers/alaska/fairbanks-north-star', displayLabel: 'Fairbanks North Star Borough, AK' },
    { slug: 'kenai-peninsula', name: 'Kenai Peninsula', seat: 'Soldotna', href: '/local-movers/alaska/kenai-peninsula', displayLabel: 'Kenai Peninsula Borough, AK' },
    { slug: 'juneau', name: 'Juneau', seat: 'Juneau', href: '/local-movers/alaska/juneau', displayLabel: 'Juneau City and Borough, AK' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
  ],
  'fairbanks-north-star': [
    { slug: 'anchorage', name: 'Anchorage', seat: 'Anchorage', href: '/local-movers/alaska/anchorage', displayLabel: 'Anchorage Municipality, AK' },
    { slug: 'matanuska-susitna', name: 'Matanuska-Susitna', seat: 'Palmer', href: '/local-movers/alaska/matanuska-susitna', displayLabel: 'Matanuska-Susitna Borough, AK' },
    { slug: 'kenai-peninsula', name: 'Kenai Peninsula', seat: 'Soldotna', href: '/local-movers/alaska/kenai-peninsula', displayLabel: 'Kenai Peninsula Borough, AK' },
    { slug: 'juneau', name: 'Juneau', seat: 'Juneau', href: '/local-movers/alaska/juneau', displayLabel: 'Juneau City and Borough, AK' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
  ],
  'kenai-peninsula': [
    { slug: 'anchorage', name: 'Anchorage', seat: 'Anchorage', href: '/local-movers/alaska/anchorage', displayLabel: 'Anchorage Municipality, AK' },
    { slug: 'matanuska-susitna', name: 'Matanuska-Susitna', seat: 'Palmer', href: '/local-movers/alaska/matanuska-susitna', displayLabel: 'Matanuska-Susitna Borough, AK' },
    { slug: 'juneau', name: 'Juneau', seat: 'Juneau', href: '/local-movers/alaska/juneau', displayLabel: 'Juneau City and Borough, AK' },
    { slug: 'fairbanks-north-star', name: 'Fairbanks North Star', seat: 'Fairbanks', href: '/local-movers/alaska/fairbanks-north-star', displayLabel: 'Fairbanks North Star Borough, AK' },
    { slug: 'snohomish', name: 'Snohomish', seat: 'Everett', href: '/local-movers/washington/snohomish', displayLabel: 'Snohomish County, WA' },
  ],
  juneau: [
    { slug: 'anchorage', name: 'Anchorage', seat: 'Anchorage', href: '/local-movers/alaska/anchorage', displayLabel: 'Anchorage Municipality, AK' },
    { slug: 'kenai-peninsula', name: 'Kenai Peninsula', seat: 'Soldotna', href: '/local-movers/alaska/kenai-peninsula', displayLabel: 'Kenai Peninsula Borough, AK' },
    { slug: 'matanuska-susitna', name: 'Matanuska-Susitna', seat: 'Palmer', href: '/local-movers/alaska/matanuska-susitna', displayLabel: 'Matanuska-Susitna Borough, AK' },
    { slug: 'fairbanks-north-star', name: 'Fairbanks North Star', seat: 'Fairbanks', href: '/local-movers/alaska/fairbanks-north-star', displayLabel: 'Fairbanks North Star Borough, AK' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
  ],
};

export function getAlaskaNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return AK_COUNTY_NEIGHBORS[countySlug] ?? [];
}