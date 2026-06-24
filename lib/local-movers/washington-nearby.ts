import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Washington premium hubs — Puget Sound corridor, regional links, long-distance hubs */
const WA_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  king: [
    { slug: 'snohomish', name: 'Snohomish', seat: 'Everett', href: '/local-movers/washington/snohomish', displayLabel: 'Snohomish County, WA' },
    { slug: 'pierce', name: 'Pierce', seat: 'Tacoma', href: '/local-movers/washington/pierce', displayLabel: 'Pierce County, WA' },
    { slug: 'kitsap', name: 'Kitsap', seat: 'Port Orchard', href: '/local-movers/washington/kitsap', displayLabel: 'Kitsap County, WA' },
    { slug: 'thurston', name: 'Thurston', seat: 'Olympia', href: '/local-movers/washington/thurston', displayLabel: 'Thurston County, WA' },
    { slug: 'anchorage', name: 'Anchorage', seat: 'Anchorage', href: '/local-movers/alaska/anchorage', displayLabel: 'Anchorage Municipality, AK' },
  ],
  pierce: [
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
    { slug: 'thurston', name: 'Thurston', seat: 'Olympia', href: '/local-movers/washington/thurston', displayLabel: 'Thurston County, WA' },
    { slug: 'kitsap', name: 'Kitsap', seat: 'Port Orchard', href: '/local-movers/washington/kitsap', displayLabel: 'Kitsap County, WA' },
    { slug: 'snohomish', name: 'Snohomish', seat: 'Everett', href: '/local-movers/washington/snohomish', displayLabel: 'Snohomish County, WA' },
    { slug: 'clark', name: 'Clark', seat: 'Vancouver', href: '/local-movers/washington/clark', displayLabel: 'Clark County, WA' },
  ],
  snohomish: [
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
    { slug: 'pierce', name: 'Pierce', seat: 'Tacoma', href: '/local-movers/washington/pierce', displayLabel: 'Pierce County, WA' },
    { slug: 'kitsap', name: 'Kitsap', seat: 'Port Orchard', href: '/local-movers/washington/kitsap', displayLabel: 'Kitsap County, WA' },
    { slug: 'spokane', name: 'Spokane', seat: 'Spokane', href: '/local-movers/washington/spokane', displayLabel: 'Spokane County, WA' },
    { slug: 'thurston', name: 'Thurston', seat: 'Olympia', href: '/local-movers/washington/thurston', displayLabel: 'Thurston County, WA' },
  ],
  spokane: [
    { slug: 'yakima', name: 'Yakima', seat: 'Yakima', href: '/local-movers/washington/yakima', displayLabel: 'Yakima County, WA' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
    { slug: 'snohomish', name: 'Snohomish', seat: 'Everett', href: '/local-movers/washington/snohomish', displayLabel: 'Snohomish County, WA' },
    { slug: 'pierce', name: 'Pierce', seat: 'Tacoma', href: '/local-movers/washington/pierce', displayLabel: 'Pierce County, WA' },
    { slug: 'clark', name: 'Clark', seat: 'Vancouver', href: '/local-movers/washington/clark', displayLabel: 'Clark County, WA' },
  ],
  clark: [
    { slug: 'pierce', name: 'Pierce', seat: 'Tacoma', href: '/local-movers/washington/pierce', displayLabel: 'Pierce County, WA' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
    { slug: 'thurston', name: 'Thurston', seat: 'Olympia', href: '/local-movers/washington/thurston', displayLabel: 'Thurston County, WA' },
    { slug: 'yakima', name: 'Yakima', seat: 'Yakima', href: '/local-movers/washington/yakima', displayLabel: 'Yakima County, WA' },
    { slug: 'snohomish', name: 'Snohomish', seat: 'Everett', href: '/local-movers/washington/snohomish', displayLabel: 'Snohomish County, WA' },
  ],
  thurston: [
    { slug: 'pierce', name: 'Pierce', seat: 'Tacoma', href: '/local-movers/washington/pierce', displayLabel: 'Pierce County, WA' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
    { slug: 'kitsap', name: 'Kitsap', seat: 'Port Orchard', href: '/local-movers/washington/kitsap', displayLabel: 'Kitsap County, WA' },
    { slug: 'clark', name: 'Clark', seat: 'Vancouver', href: '/local-movers/washington/clark', displayLabel: 'Clark County, WA' },
    { slug: 'snohomish', name: 'Snohomish', seat: 'Everett', href: '/local-movers/washington/snohomish', displayLabel: 'Snohomish County, WA' },
  ],
  kitsap: [
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
    { slug: 'pierce', name: 'Pierce', seat: 'Tacoma', href: '/local-movers/washington/pierce', displayLabel: 'Pierce County, WA' },
    { slug: 'thurston', name: 'Thurston', seat: 'Olympia', href: '/local-movers/washington/thurston', displayLabel: 'Thurston County, WA' },
    { slug: 'snohomish', name: 'Snohomish', seat: 'Everett', href: '/local-movers/washington/snohomish', displayLabel: 'Snohomish County, WA' },
    { slug: 'clark', name: 'Clark', seat: 'Vancouver', href: '/local-movers/washington/clark', displayLabel: 'Clark County, WA' },
  ],
  yakima: [
    { slug: 'spokane', name: 'Spokane', seat: 'Spokane', href: '/local-movers/washington/spokane', displayLabel: 'Spokane County, WA' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
    { slug: 'pierce', name: 'Pierce', seat: 'Tacoma', href: '/local-movers/washington/pierce', displayLabel: 'Pierce County, WA' },
    { slug: 'clark', name: 'Clark', seat: 'Vancouver', href: '/local-movers/washington/clark', displayLabel: 'Clark County, WA' },
    { slug: 'snohomish', name: 'Snohomish', seat: 'Everett', href: '/local-movers/washington/snohomish', displayLabel: 'Snohomish County, WA' },
  ],
};

export function getWashingtonNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return WA_COUNTY_NEIGHBORS[countySlug] ?? [];
}