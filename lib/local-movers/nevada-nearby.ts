import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Nevada premium hubs — regional corridor links */
const NV_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  clark: [
    { slug: 'washoe', name: 'Washoe', seat: 'Reno', href: '/local-movers/nevada/washoe', displayLabel: 'Washoe County, NV' },
    { slug: 'nye', name: 'Nye', seat: 'Tonopah', href: '/local-movers/nevada/nye', displayLabel: 'Nye County, NV' },
    { slug: 'lincoln', name: 'Lincoln', seat: 'Pioche', href: '/local-movers/nevada/lincoln', displayLabel: 'Lincoln County, NV' },
    { slug: 'san-bernardino', name: 'San Bernardino', seat: 'San Bernardino', href: '/local-movers/california/san-bernardino', displayLabel: 'San Bernardino County, CA' },
    { slug: 'los-angeles', name: 'Los Angeles', seat: 'Los Angeles', href: '/local-movers/california/los-angeles', displayLabel: 'Los Angeles County, CA' },
  ],
  washoe: [
    { slug: 'clark', name: 'Clark', seat: 'Las Vegas', href: '/local-movers/nevada/clark', displayLabel: 'Clark County, NV' },
    { slug: 'douglas', name: 'Douglas', seat: 'Minden', href: '/local-movers/nevada/douglas', displayLabel: 'Douglas County, NV' },
    { slug: 'carson-city', name: 'Carson City', seat: 'Carson City', href: '/local-movers/nevada/carson-city', displayLabel: 'Carson City, NV' },
    { slug: 'storey', name: 'Storey', seat: 'Virginia City', href: '/local-movers/nevada/storey', displayLabel: 'Storey County, NV' },
    { slug: 'lyon', name: 'Lyon', seat: 'Yerington', href: '/local-movers/nevada/lyon', displayLabel: 'Lyon County, NV' },
    { slug: 'placer', name: 'Placer', seat: 'Auburn', href: '/local-movers/california/placer', displayLabel: 'Placer County, CA' },
  ],
  lyon: [
    { slug: 'washoe', name: 'Washoe', seat: 'Reno', href: '/local-movers/nevada/washoe', displayLabel: 'Washoe County, NV' },
    { slug: 'storey', name: 'Storey', seat: 'Virginia City', href: '/local-movers/nevada/storey', displayLabel: 'Storey County, NV' },
    { slug: 'carson-city', name: 'Carson City', seat: 'Carson City', href: '/local-movers/nevada/carson-city', displayLabel: 'Carson City, NV' },
    { slug: 'churchill', name: 'Churchill', seat: 'Fallon', href: '/local-movers/nevada/churchill', displayLabel: 'Churchill County, NV' },
    { slug: 'mineral', name: 'Mineral', seat: 'Hawthorne', href: '/local-movers/nevada/mineral', displayLabel: 'Mineral County, NV' },
    { slug: 'douglas', name: 'Douglas', seat: 'Minden', href: '/local-movers/nevada/douglas', displayLabel: 'Douglas County, NV' },
  ],
  'carson-city': [
    { slug: 'washoe', name: 'Washoe', seat: 'Reno', href: '/local-movers/nevada/washoe', displayLabel: 'Washoe County, NV' },
    { slug: 'storey', name: 'Storey', seat: 'Virginia City', href: '/local-movers/nevada/storey', displayLabel: 'Storey County, NV' },
    { slug: 'lyon', name: 'Lyon', seat: 'Yerington', href: '/local-movers/nevada/lyon', displayLabel: 'Lyon County, NV' },
    { slug: 'douglas', name: 'Douglas', seat: 'Minden', href: '/local-movers/nevada/douglas', displayLabel: 'Douglas County, NV' },
    { slug: 'placer', name: 'Placer', seat: 'Auburn', href: '/local-movers/california/placer', displayLabel: 'Placer County, CA' },
  ],
  nye: [
    { slug: 'clark', name: 'Clark', seat: 'Las Vegas', href: '/local-movers/nevada/clark', displayLabel: 'Clark County, NV' },
    { slug: 'esmeralda', name: 'Esmeralda', seat: 'Goldfield', href: '/local-movers/nevada/esmeralda', displayLabel: 'Esmeralda County, NV' },
    { slug: 'mineral', name: 'Mineral', seat: 'Hawthorne', href: '/local-movers/nevada/mineral', displayLabel: 'Mineral County, NV' },
    { slug: 'eureka', name: 'Eureka', seat: 'Eureka', href: '/local-movers/nevada/eureka', displayLabel: 'Eureka County, NV' },
    { slug: 'lincoln', name: 'Lincoln', seat: 'Pioche', href: '/local-movers/nevada/lincoln', displayLabel: 'Lincoln County, NV' },
    { slug: 'inyo', name: 'Inyo', seat: 'Independence', href: '/local-movers/california/inyo', displayLabel: 'Inyo County, CA' },
  ],
  elko: [
    { slug: 'humboldt', name: 'Humboldt', seat: 'Winnemucca', href: '/local-movers/nevada/humboldt', displayLabel: 'Humboldt County, NV' },
    { slug: 'lander', name: 'Lander', seat: 'Battle Mountain', href: '/local-movers/nevada/lander', displayLabel: 'Lander County, NV' },
    { slug: 'eureka', name: 'Eureka', seat: 'Eureka', href: '/local-movers/nevada/eureka', displayLabel: 'Eureka County, NV' },
    { slug: 'white-pine', name: 'White Pine', seat: 'Ely', href: '/local-movers/nevada/white-pine', displayLabel: 'White Pine County, NV' },
    { slug: 'twin-falls', name: 'Twin Falls', seat: 'Twin Falls', href: '/local-movers/idaho/twin-falls', displayLabel: 'Twin Falls County, ID' },
  ],
  douglas: [
    { slug: 'washoe', name: 'Washoe', seat: 'Reno', href: '/local-movers/nevada/washoe', displayLabel: 'Washoe County, NV' },
    { slug: 'carson-city', name: 'Carson City', seat: 'Carson City', href: '/local-movers/nevada/carson-city', displayLabel: 'Carson City, NV' },
    { slug: 'lyon', name: 'Lyon', seat: 'Yerington', href: '/local-movers/nevada/lyon', displayLabel: 'Lyon County, NV' },
    { slug: 'storey', name: 'Storey', seat: 'Virginia City', href: '/local-movers/nevada/storey', displayLabel: 'Storey County, NV' },
    { slug: 'alpine', name: 'Alpine', seat: 'Markleeville', href: '/local-movers/california/alpine', displayLabel: 'Alpine County, CA' },
    { slug: 'mono', name: 'Mono', seat: 'Bridgeport', href: '/local-movers/california/mono', displayLabel: 'Mono County, CA' },
  ],
  churchill: [
    { slug: 'pershing', name: 'Pershing', seat: 'Lovelock', href: '/local-movers/nevada/pershing', displayLabel: 'Pershing County, NV' },
    { slug: 'lyon', name: 'Lyon', seat: 'Yerington', href: '/local-movers/nevada/lyon', displayLabel: 'Lyon County, NV' },
    { slug: 'mineral', name: 'Mineral', seat: 'Hawthorne', href: '/local-movers/nevada/mineral', displayLabel: 'Mineral County, NV' },
    { slug: 'lander', name: 'Lander', seat: 'Battle Mountain', href: '/local-movers/nevada/lander', displayLabel: 'Lander County, NV' },
    { slug: 'washoe', name: 'Washoe', seat: 'Reno', href: '/local-movers/nevada/washoe', displayLabel: 'Washoe County, NV' },
  ],
  humboldt: [
    { slug: 'pershing', name: 'Pershing', seat: 'Lovelock', href: '/local-movers/nevada/pershing', displayLabel: 'Pershing County, NV' },
    { slug: 'lander', name: 'Lander', seat: 'Battle Mountain', href: '/local-movers/nevada/lander', displayLabel: 'Lander County, NV' },
    { slug: 'elko', name: 'Elko', seat: 'Elko', href: '/local-movers/nevada/elko', displayLabel: 'Elko County, NV' },
    { slug: 'harney', name: 'Harney', seat: 'Burns', href: '/local-movers/oregon/harney', displayLabel: 'Harney County, OR' },
    { slug: 'malheur', name: 'Malheur', seat: 'Ontario', href: '/local-movers/oregon/malheur', displayLabel: 'Malheur County, OR' },
  ],
  'white-pine': [
    { slug: 'elko', name: 'Elko', seat: 'Elko', href: '/local-movers/nevada/elko', displayLabel: 'Elko County, NV' },
    { slug: 'eureka', name: 'Eureka', seat: 'Eureka', href: '/local-movers/nevada/eureka', displayLabel: 'Eureka County, NV' },
    { slug: 'lincoln', name: 'Lincoln', seat: 'Pioche', href: '/local-movers/nevada/lincoln', displayLabel: 'Lincoln County, NV' },
    { slug: 'nye', name: 'Nye', seat: 'Tonopah', href: '/local-movers/nevada/nye', displayLabel: 'Nye County, NV' },
    { slug: 'tooele', name: 'Tooele', seat: 'Tooele', href: '/local-movers/utah/tooele', displayLabel: 'Tooele County, UT' },
  ],
  pershing: [
    { slug: 'humboldt', name: 'Humboldt', seat: 'Winnemucca', href: '/local-movers/nevada/humboldt', displayLabel: 'Humboldt County, NV' },
    { slug: 'lander', name: 'Lander', seat: 'Battle Mountain', href: '/local-movers/nevada/lander', displayLabel: 'Lander County, NV' },
    { slug: 'churchill', name: 'Churchill', seat: 'Fallon', href: '/local-movers/nevada/churchill', displayLabel: 'Churchill County, NV' },
    { slug: 'lyon', name: 'Lyon', seat: 'Yerington', href: '/local-movers/nevada/lyon', displayLabel: 'Lyon County, NV' },
    { slug: 'washoe', name: 'Washoe', seat: 'Reno', href: '/local-movers/nevada/washoe', displayLabel: 'Washoe County, NV' },
  ],
  lander: [
    { slug: 'elko', name: 'Elko', seat: 'Elko', href: '/local-movers/nevada/elko', displayLabel: 'Elko County, NV' },
    { slug: 'eureka', name: 'Eureka', seat: 'Eureka', href: '/local-movers/nevada/eureka', displayLabel: 'Eureka County, NV' },
    { slug: 'humboldt', name: 'Humboldt', seat: 'Winnemucca', href: '/local-movers/nevada/humboldt', displayLabel: 'Humboldt County, NV' },
    { slug: 'pershing', name: 'Pershing', seat: 'Lovelock', href: '/local-movers/nevada/pershing', displayLabel: 'Pershing County, NV' },
    { slug: 'churchill', name: 'Churchill', seat: 'Fallon', href: '/local-movers/nevada/churchill', displayLabel: 'Churchill County, NV' },
  ],
  storey: [
    { slug: 'washoe', name: 'Washoe', seat: 'Reno', href: '/local-movers/nevada/washoe', displayLabel: 'Washoe County, NV' },
    { slug: 'carson-city', name: 'Carson City', seat: 'Carson City', href: '/local-movers/nevada/carson-city', displayLabel: 'Carson City, NV' },
    { slug: 'lyon', name: 'Lyon', seat: 'Yerington', href: '/local-movers/nevada/lyon', displayLabel: 'Lyon County, NV' },
    { slug: 'douglas', name: 'Douglas', seat: 'Minden', href: '/local-movers/nevada/douglas', displayLabel: 'Douglas County, NV' },
  ],
  mineral: [
    { slug: 'lyon', name: 'Lyon', seat: 'Yerington', href: '/local-movers/nevada/lyon', displayLabel: 'Lyon County, NV' },
    { slug: 'churchill', name: 'Churchill', seat: 'Fallon', href: '/local-movers/nevada/churchill', displayLabel: 'Churchill County, NV' },
    { slug: 'nye', name: 'Nye', seat: 'Tonopah', href: '/local-movers/nevada/nye', displayLabel: 'Nye County, NV' },
    { slug: 'esmeralda', name: 'Esmeralda', seat: 'Goldfield', href: '/local-movers/nevada/esmeralda', displayLabel: 'Esmeralda County, NV' },
    { slug: 'mono', name: 'Mono', seat: 'Bridgeport', href: '/local-movers/california/mono', displayLabel: 'Mono County, CA' },
  ],
  lincoln: [
    { slug: 'white-pine', name: 'White Pine', seat: 'Ely', href: '/local-movers/nevada/white-pine', displayLabel: 'White Pine County, NV' },
    { slug: 'nye', name: 'Nye', seat: 'Tonopah', href: '/local-movers/nevada/nye', displayLabel: 'Nye County, NV' },
    { slug: 'clark', name: 'Clark', seat: 'Las Vegas', href: '/local-movers/nevada/clark', displayLabel: 'Clark County, NV' },
    { slug: 'washington', name: 'Washington', seat: 'St. George', href: '/local-movers/utah/washington', displayLabel: 'Washington County, UT' },
    { slug: 'san-bernardino', name: 'San Bernardino', seat: 'San Bernardino', href: '/local-movers/california/san-bernardino', displayLabel: 'San Bernardino County, CA' },
  ],
  eureka: [
    { slug: 'elko', name: 'Elko', seat: 'Elko', href: '/local-movers/nevada/elko', displayLabel: 'Elko County, NV' },
    { slug: 'lander', name: 'Lander', seat: 'Battle Mountain', href: '/local-movers/nevada/lander', displayLabel: 'Lander County, NV' },
    { slug: 'white-pine', name: 'White Pine', seat: 'Ely', href: '/local-movers/nevada/white-pine', displayLabel: 'White Pine County, NV' },
    { slug: 'nye', name: 'Nye', seat: 'Tonopah', href: '/local-movers/nevada/nye', displayLabel: 'Nye County, NV' },
  ],
  esmeralda: [
    { slug: 'nye', name: 'Nye', seat: 'Tonopah', href: '/local-movers/nevada/nye', displayLabel: 'Nye County, NV' },
    { slug: 'mineral', name: 'Mineral', seat: 'Hawthorne', href: '/local-movers/nevada/mineral', displayLabel: 'Mineral County, NV' },
    { slug: 'clark', name: 'Clark', seat: 'Las Vegas', href: '/local-movers/nevada/clark', displayLabel: 'Clark County, NV' },
    { slug: 'inyo', name: 'Inyo', seat: 'Independence', href: '/local-movers/california/inyo', displayLabel: 'Inyo County, CA' },
    { slug: 'kern', name: 'Kern', seat: 'Bakersfield', href: '/local-movers/california/kern', displayLabel: 'Kern County, CA' },
  ],
};

export function getNevadaNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return NV_COUNTY_NEIGHBORS[countySlug] ?? [];
}