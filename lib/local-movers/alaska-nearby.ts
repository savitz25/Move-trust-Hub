import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Alaska major boroughs — regional metro guides */
const AK_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  anchorage: [
    { slug: 'matanuska-susitna', name: 'Matanuska-Susitna', seat: 'Palmer', href: '/local-movers/alaska/matanuska-susitna', displayLabel: 'Matanuska-Susitna Borough, AK' },
    { slug: 'kenai-peninsula', name: 'Kenai Peninsula', seat: 'Soldotna', href: '/local-movers/alaska/kenai-peninsula', displayLabel: 'Kenai Peninsula Borough, AK' },
    { slug: 'fairbanks-north-star', name: 'Fairbanks North Star', seat: 'Fairbanks', href: '/local-movers/alaska/fairbanks-north-star', displayLabel: 'Fairbanks North Star Borough, AK' },
    { slug: 'juneau', name: 'Juneau', seat: 'Juneau', href: '/local-movers/alaska/juneau', displayLabel: 'Juneau City and Borough, AK' },
  ],
  'matanuska-susitna': [
    { slug: 'anchorage', name: 'Anchorage', seat: 'Anchorage', href: '/local-movers/alaska/anchorage', displayLabel: 'Anchorage Municipality, AK' },
    { slug: 'fairbanks-north-star', name: 'Fairbanks North Star', seat: 'Fairbanks', href: '/local-movers/alaska/fairbanks-north-star', displayLabel: 'Fairbanks North Star Borough, AK' },
    { slug: 'kenai-peninsula', name: 'Kenai Peninsula', seat: 'Soldotna', href: '/local-movers/alaska/kenai-peninsula', displayLabel: 'Kenai Peninsula Borough, AK' },
    { slug: 'juneau', name: 'Juneau', seat: 'Juneau', href: '/local-movers/alaska/juneau', displayLabel: 'Juneau City and Borough, AK' },
  ],
  'fairbanks-north-star': [
    { slug: 'anchorage', name: 'Anchorage', seat: 'Anchorage', href: '/local-movers/alaska/anchorage', displayLabel: 'Anchorage Municipality, AK' },
    { slug: 'matanuska-susitna', name: 'Matanuska-Susitna', seat: 'Palmer', href: '/local-movers/alaska/matanuska-susitna', displayLabel: 'Matanuska-Susitna Borough, AK' },
    { slug: 'kenai-peninsula', name: 'Kenai Peninsula', seat: 'Soldotna', href: '/local-movers/alaska/kenai-peninsula', displayLabel: 'Kenai Peninsula Borough, AK' },
    { slug: 'juneau', name: 'Juneau', seat: 'Juneau', href: '/local-movers/alaska/juneau', displayLabel: 'Juneau City and Borough, AK' },
  ],
  'kenai-peninsula': [
    { slug: 'anchorage', name: 'Anchorage', seat: 'Anchorage', href: '/local-movers/alaska/anchorage', displayLabel: 'Anchorage Municipality, AK' },
    { slug: 'matanuska-susitna', name: 'Matanuska-Susitna', seat: 'Palmer', href: '/local-movers/alaska/matanuska-susitna', displayLabel: 'Matanuska-Susitna Borough, AK' },
    { slug: 'juneau', name: 'Juneau', seat: 'Juneau', href: '/local-movers/alaska/juneau', displayLabel: 'Juneau City and Borough, AK' },
    { slug: 'fairbanks-north-star', name: 'Fairbanks North Star', seat: 'Fairbanks', href: '/local-movers/alaska/fairbanks-north-star', displayLabel: 'Fairbanks North Star Borough, AK' },
  ],
  juneau: [
    { slug: 'anchorage', name: 'Anchorage', seat: 'Anchorage', href: '/local-movers/alaska/anchorage', displayLabel: 'Anchorage Municipality, AK' },
    { slug: 'kenai-peninsula', name: 'Kenai Peninsula', seat: 'Soldotna', href: '/local-movers/alaska/kenai-peninsula', displayLabel: 'Kenai Peninsula Borough, AK' },
    { slug: 'matanuska-susitna', name: 'Matanuska-Susitna', seat: 'Palmer', href: '/local-movers/alaska/matanuska-susitna', displayLabel: 'Matanuska-Susitna Borough, AK' },
    { slug: 'fairbanks-north-star', name: 'Fairbanks North Star', seat: 'Fairbanks', href: '/local-movers/alaska/fairbanks-north-star', displayLabel: 'Fairbanks North Star Borough, AK' },
  ],
};

export function getAlaskaNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return AK_COUNTY_NEIGHBORS[countySlug] ?? [];
}