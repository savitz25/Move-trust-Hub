import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Arizona premium hubs — regional corridor links */
const AZ_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  maricopa: [
    { slug: 'pinal', name: 'Pinal', seat: 'Florence', href: '/local-movers/arizona/pinal', displayLabel: 'Pinal County, AZ' },
    { slug: 'pima', name: 'Pima', seat: 'Tucson', href: '/local-movers/arizona/pima', displayLabel: 'Pima County, AZ' },
    { slug: 'yavapai', name: 'Yavapai', seat: 'Prescott', href: '/local-movers/arizona/yavapai', displayLabel: 'Yavapai County, AZ' },
    { slug: 'san-bernardino', name: 'San Bernardino', seat: 'San Bernardino', href: '/local-movers/california/san-bernardino', displayLabel: 'San Bernardino County, CA' },
    { slug: 'clark', name: 'Clark', seat: 'Las Vegas', href: '/local-movers/nevada/clark', displayLabel: 'Clark County, NV' },
  ],
  pima: [
    { slug: 'maricopa', name: 'Maricopa', seat: 'Phoenix', href: '/local-movers/arizona/maricopa', displayLabel: 'Maricopa County, AZ' },
    { slug: 'pinal', name: 'Pinal', seat: 'Florence', href: '/local-movers/arizona/pinal', displayLabel: 'Pinal County, AZ' },
    { slug: 'santa-cruz', name: 'Santa Cruz', seat: 'Nogales', href: '/local-movers/arizona/santa-cruz', displayLabel: 'Santa Cruz County, AZ' },
    { slug: 'cochise', name: 'Cochise', seat: 'Bisbee', href: '/local-movers/arizona/cochise', displayLabel: 'Cochise County, AZ' },
    { slug: 'imperial', name: 'Imperial', seat: 'El Centro', href: '/local-movers/california/imperial', displayLabel: 'Imperial County, CA' },
  ],
  pinal: [
    { slug: 'maricopa', name: 'Maricopa', seat: 'Phoenix', href: '/local-movers/arizona/maricopa', displayLabel: 'Maricopa County, AZ' },
    { slug: 'pima', name: 'Pima', seat: 'Tucson', href: '/local-movers/arizona/pima', displayLabel: 'Pima County, AZ' },
    { slug: 'gila', name: 'Gila', seat: 'Globe', href: '/local-movers/arizona/gila', displayLabel: 'Gila County, AZ' },
    { slug: 'graham', name: 'Graham', seat: 'Safford', href: '/local-movers/arizona/graham', displayLabel: 'Graham County, AZ' },
    { slug: 'san-bernardino', name: 'San Bernardino', seat: 'San Bernardino', href: '/local-movers/california/san-bernardino', displayLabel: 'San Bernardino County, CA' },
  ],
  yavapai: [
    { slug: 'maricopa', name: 'Maricopa', seat: 'Phoenix', href: '/local-movers/arizona/maricopa', displayLabel: 'Maricopa County, AZ' },
    { slug: 'coconino', name: 'Coconino', seat: 'Flagstaff', href: '/local-movers/arizona/coconino', displayLabel: 'Coconino County, AZ' },
    { slug: 'gila', name: 'Gila', seat: 'Globe', href: '/local-movers/arizona/gila', displayLabel: 'Gila County, AZ' },
    { slug: 'mohave', name: 'Mohave', seat: 'Kingman', href: '/local-movers/arizona/mohave', displayLabel: 'Mohave County, AZ' },
    { slug: 'la-paz', name: 'La Paz', seat: 'Parker', href: '/local-movers/arizona/la-paz', displayLabel: 'La Paz County, AZ' },
  ],
  mohave: [
    { slug: 'la-paz', name: 'La Paz', seat: 'Parker', href: '/local-movers/arizona/la-paz', displayLabel: 'La Paz County, AZ' },
    { slug: 'yavapai', name: 'Yavapai', seat: 'Prescott', href: '/local-movers/arizona/yavapai', displayLabel: 'Yavapai County, AZ' },
    { slug: 'coconino', name: 'Coconino', seat: 'Flagstaff', href: '/local-movers/arizona/coconino', displayLabel: 'Coconino County, AZ' },
    { slug: 'clark', name: 'Clark', seat: 'Las Vegas', href: '/local-movers/nevada/clark', displayLabel: 'Clark County, NV' },
    { slug: 'san-bernardino', name: 'San Bernardino', seat: 'San Bernardino', href: '/local-movers/california/san-bernardino', displayLabel: 'San Bernardino County, CA' },
  ],
  yuma: [
    { slug: 'pima', name: 'Pima', seat: 'Tucson', href: '/local-movers/arizona/pima', displayLabel: 'Pima County, AZ' },
    { slug: 'maricopa', name: 'Maricopa', seat: 'Phoenix', href: '/local-movers/arizona/maricopa', displayLabel: 'Maricopa County, AZ' },
    { slug: 'la-paz', name: 'La Paz', seat: 'Parker', href: '/local-movers/arizona/la-paz', displayLabel: 'La Paz County, AZ' },
    { slug: 'imperial', name: 'Imperial', seat: 'El Centro', href: '/local-movers/california/imperial', displayLabel: 'Imperial County, CA' },
    { slug: 'san-diego', name: 'San Diego', seat: 'San Diego', href: '/local-movers/california/san-diego', displayLabel: 'San Diego County, CA' },
  ],
  coconino: [
    { slug: 'yavapai', name: 'Yavapai', seat: 'Prescott', href: '/local-movers/arizona/yavapai', displayLabel: 'Yavapai County, AZ' },
    { slug: 'navajo', name: 'Navajo', seat: 'Holbrook', href: '/local-movers/arizona/navajo', displayLabel: 'Navajo County, AZ' },
    { slug: 'apache', name: 'Apache', seat: 'St. Johns', href: '/local-movers/arizona/apache', displayLabel: 'Apache County, AZ' },
    { slug: 'mohave', name: 'Mohave', seat: 'Kingman', href: '/local-movers/arizona/mohave', displayLabel: 'Mohave County, AZ' },
    { slug: 'maricopa', name: 'Maricopa', seat: 'Phoenix', href: '/local-movers/arizona/maricopa', displayLabel: 'Maricopa County, AZ' },
  ],
  cochise: [
    { slug: 'pima', name: 'Pima', seat: 'Tucson', href: '/local-movers/arizona/pima', displayLabel: 'Pima County, AZ' },
    { slug: 'santa-cruz', name: 'Santa Cruz', seat: 'Nogales', href: '/local-movers/arizona/santa-cruz', displayLabel: 'Santa Cruz County, AZ' },
    { slug: 'graham', name: 'Graham', seat: 'Safford', href: '/local-movers/arizona/graham', displayLabel: 'Graham County, AZ' },
    { slug: 'greenlee', name: 'Greenlee', seat: 'Clifton', href: '/local-movers/arizona/greenlee', displayLabel: 'Greenlee County, AZ' },
    { slug: 'hidalgo', name: 'Hidalgo', seat: 'Lordsburg', href: '/local-movers/new-mexico/hidalgo', displayLabel: 'Hidalgo County, NM' },
  ],
  navajo: [
    { slug: 'apache', name: 'Apache', seat: 'St. Johns', href: '/local-movers/arizona/apache', displayLabel: 'Apache County, AZ' },
    { slug: 'coconino', name: 'Coconino', seat: 'Flagstaff', href: '/local-movers/arizona/coconino', displayLabel: 'Coconino County, AZ' },
    { slug: 'gila', name: 'Gila', seat: 'Globe', href: '/local-movers/arizona/gila', displayLabel: 'Gila County, AZ' },
    { slug: 'graham', name: 'Graham', seat: 'Safford', href: '/local-movers/arizona/graham', displayLabel: 'Graham County, AZ' },
    { slug: 'cibola', name: 'Cibola', seat: 'Grants', href: '/local-movers/new-mexico/cibola', displayLabel: 'Cibola County, NM' },
  ],
  apache: [
    { slug: 'navajo', name: 'Navajo', seat: 'Holbrook', href: '/local-movers/arizona/navajo', displayLabel: 'Navajo County, AZ' },
    { slug: 'gila', name: 'Gila', seat: 'Globe', href: '/local-movers/arizona/gila', displayLabel: 'Gila County, AZ' },
    { slug: 'graham', name: 'Graham', seat: 'Safford', href: '/local-movers/arizona/graham', displayLabel: 'Graham County, AZ' },
    { slug: 'greenlee', name: 'Greenlee', seat: 'Clifton', href: '/local-movers/arizona/greenlee', displayLabel: 'Greenlee County, AZ' },
    { slug: 'coconino', name: 'Coconino', seat: 'Flagstaff', href: '/local-movers/arizona/coconino', displayLabel: 'Coconino County, AZ' },
  ],
  gila: [
    { slug: 'maricopa', name: 'Maricopa', seat: 'Phoenix', href: '/local-movers/arizona/maricopa', displayLabel: 'Maricopa County, AZ' },
    { slug: 'pinal', name: 'Pinal', seat: 'Florence', href: '/local-movers/arizona/pinal', displayLabel: 'Pinal County, AZ' },
    { slug: 'navajo', name: 'Navajo', seat: 'Holbrook', href: '/local-movers/arizona/navajo', displayLabel: 'Navajo County, AZ' },
    { slug: 'graham', name: 'Graham', seat: 'Safford', href: '/local-movers/arizona/graham', displayLabel: 'Graham County, AZ' },
    { slug: 'coconino', name: 'Coconino', seat: 'Flagstaff', href: '/local-movers/arizona/coconino', displayLabel: 'Coconino County, AZ' },
  ],
  graham: [
    { slug: 'greenlee', name: 'Greenlee', seat: 'Clifton', href: '/local-movers/arizona/greenlee', displayLabel: 'Greenlee County, AZ' },
    { slug: 'cochise', name: 'Cochise', seat: 'Bisbee', href: '/local-movers/arizona/cochise', displayLabel: 'Cochise County, AZ' },
    { slug: 'pinal', name: 'Pinal', seat: 'Florence', href: '/local-movers/arizona/pinal', displayLabel: 'Pinal County, AZ' },
    { slug: 'gila', name: 'Gila', seat: 'Globe', href: '/local-movers/arizona/gila', displayLabel: 'Gila County, AZ' },
    { slug: 'apache', name: 'Apache', seat: 'St. Johns', href: '/local-movers/arizona/apache', displayLabel: 'Apache County, AZ' },
  ],
  greenlee: [
    { slug: 'graham', name: 'Graham', seat: 'Safford', href: '/local-movers/arizona/graham', displayLabel: 'Graham County, AZ' },
    { slug: 'apache', name: 'Apache', seat: 'St. Johns', href: '/local-movers/arizona/apache', displayLabel: 'Apache County, AZ' },
    { slug: 'cochise', name: 'Cochise', seat: 'Bisbee', href: '/local-movers/arizona/cochise', displayLabel: 'Cochise County, AZ' },
    { slug: 'gila', name: 'Gila', seat: 'Globe', href: '/local-movers/arizona/gila', displayLabel: 'Gila County, AZ' },
    { slug: 'catron', name: 'Catron', seat: 'Reserve', href: '/local-movers/new-mexico/catron', displayLabel: 'Catron County, NM' },
  ],
  'la-paz': [
    { slug: 'mohave', name: 'Mohave', seat: 'Kingman', href: '/local-movers/arizona/mohave', displayLabel: 'Mohave County, AZ' },
    { slug: 'yuma', name: 'Yuma', seat: 'Yuma', href: '/local-movers/arizona/yuma', displayLabel: 'Yuma County, AZ' },
    { slug: 'yavapai', name: 'Yavapai', seat: 'Prescott', href: '/local-movers/arizona/yavapai', displayLabel: 'Yavapai County, AZ' },
    { slug: 'maricopa', name: 'Maricopa', seat: 'Phoenix', href: '/local-movers/arizona/maricopa', displayLabel: 'Maricopa County, AZ' },
    { slug: 'riverside', name: 'Riverside', seat: 'Riverside', href: '/local-movers/california/riverside', displayLabel: 'Riverside County, CA' },
  ],
  'santa-cruz': [
    { slug: 'pima', name: 'Pima', seat: 'Tucson', href: '/local-movers/arizona/pima', displayLabel: 'Pima County, AZ' },
    { slug: 'cochise', name: 'Cochise', seat: 'Bisbee', href: '/local-movers/arizona/cochise', displayLabel: 'Cochise County, AZ' },
    { slug: 'pinal', name: 'Pinal', seat: 'Florence', href: '/local-movers/arizona/pinal', displayLabel: 'Pinal County, AZ' },
    { slug: 'maricopa', name: 'Maricopa', seat: 'Phoenix', href: '/local-movers/arizona/maricopa', displayLabel: 'Maricopa County, AZ' },
    { slug: 'hidalgo', name: 'Hidalgo', seat: 'Lordsburg', href: '/local-movers/new-mexico/hidalgo', displayLabel: 'Hidalgo County, NM' },
  ],
};

export function getArizonaNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return AZ_COUNTY_NEIGHBORS[countySlug] ?? [];
}