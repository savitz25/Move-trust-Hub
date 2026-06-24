import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Hawaii counties — inter-island metro guides (no land borders) */
const HI_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  honolulu: [
    { slug: 'maui', name: 'Maui', seat: 'Wailuku', href: '/local-movers/hawaii/maui', displayLabel: 'Maui County, HI' },
    { slug: 'kauai', name: 'Kauai', seat: 'Lihue', href: '/local-movers/hawaii/kauai', displayLabel: 'Kauai County, HI' },
    { slug: 'hawaii', name: 'Hawaii', seat: 'Hilo', href: '/local-movers/hawaii/hawaii', displayLabel: 'Hawaii County, HI (Big Island)' },
    { slug: 'kalawao', name: 'Kalawao', seat: 'Kalaupapa', href: '/local-movers/hawaii/kalawao', displayLabel: 'Kalawao County, HI' },
  ],
  hawaii: [
    { slug: 'honolulu', name: 'Honolulu', seat: 'Honolulu', href: '/local-movers/hawaii/honolulu', displayLabel: 'Honolulu County, HI (Oahu)' },
    { slug: 'maui', name: 'Maui', seat: 'Wailuku', href: '/local-movers/hawaii/maui', displayLabel: 'Maui County, HI' },
    { slug: 'kauai', name: 'Kauai', seat: 'Lihue', href: '/local-movers/hawaii/kauai', displayLabel: 'Kauai County, HI' },
    { slug: 'kalawao', name: 'Kalawao', seat: 'Kalaupapa', href: '/local-movers/hawaii/kalawao', displayLabel: 'Kalawao County, HI' },
  ],
  maui: [
    { slug: 'honolulu', name: 'Honolulu', seat: 'Honolulu', href: '/local-movers/hawaii/honolulu', displayLabel: 'Honolulu County, HI (Oahu)' },
    { slug: 'kalawao', name: 'Kalawao', seat: 'Kalaupapa', href: '/local-movers/hawaii/kalawao', displayLabel: 'Kalawao County, HI' },
    { slug: 'hawaii', name: 'Hawaii', seat: 'Hilo', href: '/local-movers/hawaii/hawaii', displayLabel: 'Hawaii County, HI (Big Island)' },
    { slug: 'kauai', name: 'Kauai', seat: 'Lihue', href: '/local-movers/hawaii/kauai', displayLabel: 'Kauai County, HI' },
  ],
  kauai: [
    { slug: 'honolulu', name: 'Honolulu', seat: 'Honolulu', href: '/local-movers/hawaii/honolulu', displayLabel: 'Honolulu County, HI (Oahu)' },
    { slug: 'maui', name: 'Maui', seat: 'Wailuku', href: '/local-movers/hawaii/maui', displayLabel: 'Maui County, HI' },
    { slug: 'hawaii', name: 'Hawaii', seat: 'Hilo', href: '/local-movers/hawaii/hawaii', displayLabel: 'Hawaii County, HI (Big Island)' },
    { slug: 'kalawao', name: 'Kalawao', seat: 'Kalaupapa', href: '/local-movers/hawaii/kalawao', displayLabel: 'Kalawao County, HI' },
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