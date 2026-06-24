import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Hawaii counties — inter-island guides plus mainland long-distance hubs (CA, WA, TX) */
const HI_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  honolulu: [
    { slug: 'maui', name: 'Maui', seat: 'Wailuku', href: '/local-movers/hawaii/maui', displayLabel: 'Maui County, HI' },
    { slug: 'kauai', name: 'Kauai', seat: 'Lihue', href: '/local-movers/hawaii/kauai', displayLabel: 'Kauai County, HI' },
    { slug: 'hawaii', name: 'Hawaii', seat: 'Hilo', href: '/local-movers/hawaii/hawaii', displayLabel: 'Hawaii County, HI (Big Island)' },
    { slug: 'kalawao', name: 'Kalawao', seat: 'Kalaupapa', href: '/local-movers/hawaii/kalawao', displayLabel: 'Kalawao County, HI' },
    { slug: 'los-angeles', name: 'Los Angeles', seat: 'Los Angeles', href: '/local-movers/california/los-angeles', displayLabel: 'Los Angeles County, CA' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
    { slug: 'harris', name: 'Harris', seat: 'Houston', href: '/local-movers/texas/harris', displayLabel: 'Harris County, TX' },
  ],
  hawaii: [
    { slug: 'honolulu', name: 'Honolulu', seat: 'Honolulu', href: '/local-movers/hawaii/honolulu', displayLabel: 'Honolulu County, HI (Oahu)' },
    { slug: 'maui', name: 'Maui', seat: 'Wailuku', href: '/local-movers/hawaii/maui', displayLabel: 'Maui County, HI' },
    { slug: 'kauai', name: 'Kauai', seat: 'Lihue', href: '/local-movers/hawaii/kauai', displayLabel: 'Kauai County, HI' },
    { slug: 'kalawao', name: 'Kalawao', seat: 'Kalaupapa', href: '/local-movers/hawaii/kalawao', displayLabel: 'Kalawao County, HI' },
    { slug: 'los-angeles', name: 'Los Angeles', seat: 'Los Angeles', href: '/local-movers/california/los-angeles', displayLabel: 'Los Angeles County, CA' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
  ],
  maui: [
    { slug: 'honolulu', name: 'Honolulu', seat: 'Honolulu', href: '/local-movers/hawaii/honolulu', displayLabel: 'Honolulu County, HI (Oahu)' },
    { slug: 'kalawao', name: 'Kalawao', seat: 'Kalaupapa', href: '/local-movers/hawaii/kalawao', displayLabel: 'Kalawao County, HI' },
    { slug: 'hawaii', name: 'Hawaii', seat: 'Hilo', href: '/local-movers/hawaii/hawaii', displayLabel: 'Hawaii County, HI (Big Island)' },
    { slug: 'kauai', name: 'Kauai', seat: 'Lihue', href: '/local-movers/hawaii/kauai', displayLabel: 'Kauai County, HI' },
    { slug: 'los-angeles', name: 'Los Angeles', seat: 'Los Angeles', href: '/local-movers/california/los-angeles', displayLabel: 'Los Angeles County, CA' },
    { slug: 'harris', name: 'Harris', seat: 'Houston', href: '/local-movers/texas/harris', displayLabel: 'Harris County, TX' },
  ],
  kauai: [
    { slug: 'honolulu', name: 'Honolulu', seat: 'Honolulu', href: '/local-movers/hawaii/honolulu', displayLabel: 'Honolulu County, HI (Oahu)' },
    { slug: 'maui', name: 'Maui', seat: 'Wailuku', href: '/local-movers/hawaii/maui', displayLabel: 'Maui County, HI' },
    { slug: 'hawaii', name: 'Hawaii', seat: 'Hilo', href: '/local-movers/hawaii/hawaii', displayLabel: 'Hawaii County, HI (Big Island)' },
    { slug: 'kalawao', name: 'Kalawao', seat: 'Kalaupapa', href: '/local-movers/hawaii/kalawao', displayLabel: 'Kalawao County, HI' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
  ],
  kalawao: [
    { slug: 'maui', name: 'Maui', seat: 'Wailuku', href: '/local-movers/hawaii/maui', displayLabel: 'Maui County, HI' },
    { slug: 'honolulu', name: 'Honolulu', seat: 'Honolulu', href: '/local-movers/hawaii/honolulu', displayLabel: 'Honolulu County, HI (Oahu)' },
    { slug: 'hawaii', name: 'Hawaii', seat: 'Hilo', href: '/local-movers/hawaii/hawaii', displayLabel: 'Hawaii County, HI (Big Island)' },
    { slug: 'kauai', name: 'Kauai', seat: 'Lihue', href: '/local-movers/hawaii/kauai', displayLabel: 'Kauai County, HI' },
  ],
};

export function getHawaiiNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return HI_COUNTY_NEIGHBORS[countySlug] ?? [];
}