import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Washington premium hubs — Puget Sound corridor plus long-distance Alaska links */
const WA_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  king: [
    { slug: 'snohomish', name: 'Snohomish', seat: 'Everett', href: '/local-movers/washington/snohomish', displayLabel: 'Snohomish County, WA' },
    { slug: 'pierce', name: 'Pierce', seat: 'Tacoma', href: '/local-movers/washington/pierce', displayLabel: 'Pierce County, WA' },
    { slug: 'kitsap', name: 'Kitsap', seat: 'Port Orchard', href: '/local-movers/washington/kitsap', displayLabel: 'Kitsap County, WA' },
    { slug: 'anchorage', name: 'Anchorage', seat: 'Anchorage', href: '/local-movers/alaska/anchorage', displayLabel: 'Anchorage Municipality, AK' },
    { slug: 'honolulu', name: 'Honolulu', seat: 'Honolulu', href: '/local-movers/hawaii/honolulu', displayLabel: 'Honolulu County, HI (Oahu)' },
  ],
};

export function getWashingtonNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return WA_COUNTY_NEIGHBORS[countySlug] ?? [];
}