import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Utah curated county corridor links — 29/29 complete */
const UT_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  'salt-lake': [
    { slug: 'davis', name: 'Davis', seat: 'Farmington', href: '/local-movers/utah/davis', displayLabel: 'Davis County, UT' },
    { slug: 'morgan', name: 'Morgan', seat: 'Morgan', href: '/local-movers/utah/morgan', displayLabel: 'Morgan County, UT' },
    { slug: 'summit', name: 'Summit', seat: 'Coalville', href: '/local-movers/utah/summit' },
    { slug: 'tooele', name: 'Tooele', seat: 'Tooele', href: '/local-movers/utah/tooele' },
    { slug: 'utah', name: 'Utah', seat: 'Provo', href: '/local-movers/utah/utah', displayLabel: 'Utah County, UT' },
  ],
  utah: [
    { slug: 'carbon', name: 'Carbon', seat: 'Price', href: '/local-movers/utah/carbon' },
    { slug: 'duchesne', name: 'Duchesne', seat: 'Duchesne', href: '/local-movers/utah/duchesne' },
    { slug: 'juab', name: 'Juab', seat: 'Nephi', href: '/local-movers/utah/juab' },
    { slug: 'salt-lake', name: 'Salt Lake', seat: 'Salt Lake City', href: '/local-movers/utah/salt-lake', displayLabel: 'Salt Lake County, UT' },
    { slug: 'sanpete', name: 'Sanpete', seat: 'Manti', href: '/local-movers/utah/sanpete' },
  ],
  davis: [
    { slug: 'box-elder', name: 'Box Elder', seat: 'Brigham City', href: '/local-movers/utah/box-elder', displayLabel: 'Box Elder County, UT' },
    { slug: 'morgan', name: 'Morgan', seat: 'Morgan', href: '/local-movers/utah/morgan', displayLabel: 'Morgan County, UT' },
    { slug: 'salt-lake', name: 'Salt Lake', seat: 'Salt Lake City', href: '/local-movers/utah/salt-lake', displayLabel: 'Salt Lake County, UT' },
    { slug: 'weber', name: 'Weber', seat: 'Ogden', href: '/local-movers/utah/weber' },
  ],
  weber: [
    { slug: 'box-elder', name: 'Box Elder', seat: 'Brigham City', href: '/local-movers/utah/box-elder', displayLabel: 'Box Elder County, UT' },
    { slug: 'cache', name: 'Cache', seat: 'Logan', href: '/local-movers/utah/cache' },
    { slug: 'davis', name: 'Davis', seat: 'Farmington', href: '/local-movers/utah/davis', displayLabel: 'Davis County, UT' },
    { slug: 'morgan', name: 'Morgan', seat: 'Morgan', href: '/local-movers/utah/morgan', displayLabel: 'Morgan County, UT' },
    { slug: 'rich', name: 'Rich', seat: 'Randolph', href: '/local-movers/utah/rich', displayLabel: 'Rich County, UT' },
  ],
  washington: [
    { slug: 'iron', name: 'Iron', seat: 'Parowan', href: '/local-movers/utah/iron' },
    { slug: 'kane', name: 'Kane', seat: 'Kanab', href: '/local-movers/utah/kane' },
    { slug: 'clark', name: 'Clark', seat: 'Las Vegas', href: '/local-movers/nevada/clark', displayLabel: 'Clark County, NV' },
  ],
  cache: [
    { slug: 'box-elder', name: 'Box Elder', seat: 'Brigham City', href: '/local-movers/utah/box-elder', displayLabel: 'Box Elder County, UT' },
    { slug: 'rich', name: 'Rich', seat: 'Randolph', href: '/local-movers/utah/rich', displayLabel: 'Rich County, UT' },
    { slug: 'morgan', name: 'Morgan', seat: 'Morgan', href: '/local-movers/utah/morgan', displayLabel: 'Morgan County, UT' },
    { slug: 'weber', name: 'Weber', seat: 'Ogden', href: '/local-movers/utah/weber' },
  ],
  tooele: [
    { slug: 'box-elder', name: 'Box Elder', seat: 'Brigham City', href: '/local-movers/utah/box-elder', displayLabel: 'Box Elder County, UT' },
    { slug: 'davis', name: 'Davis', seat: 'Farmington', href: '/local-movers/utah/davis', displayLabel: 'Davis County, UT' },
    { slug: 'juab', name: 'Juab', seat: 'Nephi', href: '/local-movers/utah/juab' },
    { slug: 'salt-lake', name: 'Salt Lake', seat: 'Salt Lake City', href: '/local-movers/utah/salt-lake', displayLabel: 'Salt Lake County, UT' },
  ],
  iron: [
    { slug: 'beaver', name: 'Beaver', seat: 'Beaver', href: '/local-movers/utah/beaver' },
    { slug: 'garfield', name: 'Garfield', seat: 'Panguitch', href: '/local-movers/utah/garfield' },
    { slug: 'kane', name: 'Kane', seat: 'Kanab', href: '/local-movers/utah/kane' },
    { slug: 'washington', name: 'Washington', seat: 'St. George', href: '/local-movers/utah/washington', displayLabel: 'Washington County, UT' },
  ],
  'box-elder': [
    { slug: 'cache', name: 'Cache', seat: 'Logan', href: '/local-movers/utah/cache' },
    { slug: 'davis', name: 'Davis', seat: 'Farmington', href: '/local-movers/utah/davis', displayLabel: 'Davis County, UT' },
    { slug: 'tooele', name: 'Tooele', seat: 'Tooele', href: '/local-movers/utah/tooele' },
    { slug: 'weber', name: 'Weber', seat: 'Ogden', href: '/local-movers/utah/weber' },
    { slug: 'rich', name: 'Rich', seat: 'Randolph', href: '/local-movers/utah/rich', displayLabel: 'Rich County, UT' },
  ],
  summit: [
    { slug: 'daggett', name: 'Daggett', seat: 'Manila', href: '/local-movers/utah/daggett' },
    { slug: 'duchesne', name: 'Duchesne', seat: 'Duchesne', href: '/local-movers/utah/duchesne' },
    { slug: 'morgan', name: 'Morgan', seat: 'Morgan', href: '/local-movers/utah/morgan', displayLabel: 'Morgan County, UT' },
    { slug: 'rich', name: 'Rich', seat: 'Randolph', href: '/local-movers/utah/rich', displayLabel: 'Rich County, UT' },
    { slug: 'salt-lake', name: 'Salt Lake', seat: 'Salt Lake City', href: '/local-movers/utah/salt-lake', displayLabel: 'Salt Lake County, UT' },
  ],
  wasatch: [
    { slug: 'duchesne', name: 'Duchesne', seat: 'Duchesne', href: '/local-movers/utah/duchesne' },
    { slug: 'morgan', name: 'Morgan', seat: 'Morgan', href: '/local-movers/utah/morgan', displayLabel: 'Morgan County, UT' },
    { slug: 'salt-lake', name: 'Salt Lake', seat: 'Salt Lake City', href: '/local-movers/utah/salt-lake', displayLabel: 'Salt Lake County, UT' },
    { slug: 'summit', name: 'Summit', seat: 'Coalville', href: '/local-movers/utah/summit' },
    { slug: 'utah', name: 'Utah', seat: 'Provo', href: '/local-movers/utah/utah', displayLabel: 'Utah County, UT' },
  ],
  uintah: [
    { slug: 'daggett', name: 'Daggett', seat: 'Manila', href: '/local-movers/utah/daggett' },
    { slug: 'duchesne', name: 'Duchesne', seat: 'Duchesne', href: '/local-movers/utah/duchesne' },
    { slug: 'summit', name: 'Summit', seat: 'Coalville', href: '/local-movers/utah/summit' },
    { slug: 'sweetwater', name: 'Sweetwater', seat: 'Green River', href: '/local-movers/wyoming/sweetwater', displayLabel: 'Sweetwater County, WY' },
  ],
  sanpete: [
    { slug: 'carbon', name: 'Carbon', seat: 'Price', href: '/local-movers/utah/carbon' },
    { slug: 'emery', name: 'Emery', seat: 'Castle Dale', href: '/local-movers/utah/emery' },
    { slug: 'millard', name: 'Millard', seat: 'Fillmore', href: '/local-movers/utah/millard' },
    { slug: 'sevier', name: 'Sevier', seat: 'Richfield', href: '/local-movers/utah/sevier' },
    { slug: 'utah', name: 'Utah', seat: 'Provo', href: '/local-movers/utah/utah', displayLabel: 'Utah County, UT' },
  ],
  sevier: [
    { slug: 'beaver', name: 'Beaver', seat: 'Beaver', href: '/local-movers/utah/beaver' },
    { slug: 'emery', name: 'Emery', seat: 'Castle Dale', href: '/local-movers/utah/emery' },
    { slug: 'millard', name: 'Millard', seat: 'Fillmore', href: '/local-movers/utah/millard' },
    { slug: 'piute', name: 'Piute', seat: 'Junction', href: '/local-movers/utah/piute' },
    { slug: 'sanpete', name: 'Sanpete', seat: 'Manti', href: '/local-movers/utah/sanpete' },
  ],
  duchesne: [
    { slug: 'carbon', name: 'Carbon', seat: 'Price', href: '/local-movers/utah/carbon' },
    { slug: 'daggett', name: 'Daggett', seat: 'Manila', href: '/local-movers/utah/daggett' },
    { slug: 'summit', name: 'Summit', seat: 'Coalville', href: '/local-movers/utah/summit' },
    { slug: 'uintah', name: 'Uintah', seat: 'Vernal', href: '/local-movers/utah/uintah' },
    { slug: 'wasatch', name: 'Wasatch', seat: 'Heber City', href: '/local-movers/utah/wasatch' },
  ],
  carbon: [
    { slug: 'duchesne', name: 'Duchesne', seat: 'Duchesne', href: '/local-movers/utah/duchesne' },
    { slug: 'emery', name: 'Emery', seat: 'Castle Dale', href: '/local-movers/utah/emery' },
    { slug: 'sanpete', name: 'Sanpete', seat: 'Manti', href: '/local-movers/utah/sanpete' },
    { slug: 'utah', name: 'Utah', seat: 'Provo', href: '/local-movers/utah/utah', displayLabel: 'Utah County, UT' },
  ],
  'san-juan': [
    { slug: 'grand', name: 'Grand', seat: 'Moab', href: '/local-movers/utah/grand', displayLabel: 'Grand County, UT' },
    { slug: 'emery', name: 'Emery', seat: 'Castle Dale', href: '/local-movers/utah/emery' },
    { slug: 'garfield', name: 'Garfield', seat: 'Panguitch', href: '/local-movers/utah/garfield' },
    { slug: 'san-juan', name: 'San Juan', seat: 'Aztec', href: '/local-movers/new-mexico/san-juan', displayLabel: 'San Juan County, NM' },
    { slug: 'apache', name: 'Apache', seat: 'St. Johns', href: '/local-movers/arizona/apache', displayLabel: 'Apache County, AZ' },
  ],
  millard: [
    { slug: 'beaver', name: 'Beaver', seat: 'Beaver', href: '/local-movers/utah/beaver' },
    { slug: 'juab', name: 'Juab', seat: 'Nephi', href: '/local-movers/utah/juab' },
    { slug: 'sanpete', name: 'Sanpete', seat: 'Manti', href: '/local-movers/utah/sanpete' },
    { slug: 'sevier', name: 'Sevier', seat: 'Richfield', href: '/local-movers/utah/sevier' },
  ],
  juab: [
    { slug: 'millard', name: 'Millard', seat: 'Fillmore', href: '/local-movers/utah/millard' },
    { slug: 'sanpete', name: 'Sanpete', seat: 'Manti', href: '/local-movers/utah/sanpete' },
    { slug: 'utah', name: 'Utah', seat: 'Provo', href: '/local-movers/utah/utah', displayLabel: 'Utah County, UT' },
    { slug: 'tooele', name: 'Tooele', seat: 'Tooele', href: '/local-movers/utah/tooele' },
  ],
  morgan: [
    { slug: 'cache', name: 'Cache', seat: 'Logan', href: '/local-movers/utah/cache' },
    { slug: 'davis', name: 'Davis', seat: 'Farmington', href: '/local-movers/utah/davis', displayLabel: 'Davis County, UT' },
    { slug: 'salt-lake', name: 'Salt Lake', seat: 'Salt Lake City', href: '/local-movers/utah/salt-lake', displayLabel: 'Salt Lake County, UT' },
    { slug: 'summit', name: 'Summit', seat: 'Coalville', href: '/local-movers/utah/summit' },
    { slug: 'weber', name: 'Weber', seat: 'Ogden', href: '/local-movers/utah/weber' },
  ],
  emery: [
    { slug: 'carbon', name: 'Carbon', seat: 'Price', href: '/local-movers/utah/carbon' },
    { slug: 'grand', name: 'Grand', seat: 'Moab', href: '/local-movers/utah/grand', displayLabel: 'Grand County, UT' },
    { slug: 'sanpete', name: 'Sanpete', seat: 'Manti', href: '/local-movers/utah/sanpete' },
    { slug: 'sevier', name: 'Sevier', seat: 'Richfield', href: '/local-movers/utah/sevier' },
    { slug: 'wayne', name: 'Wayne', seat: 'Loa', href: '/local-movers/utah/wayne' },
  ],
  grand: [
    { slug: 'emery', name: 'Emery', seat: 'Castle Dale', href: '/local-movers/utah/emery' },
    { slug: 'san-juan', name: 'San Juan', seat: 'Monticello', href: '/local-movers/utah/san-juan', displayLabel: 'San Juan County, UT' },
    { slug: 'mesa', name: 'Mesa', seat: 'Grand Junction', href: '/local-movers/colorado/mesa', displayLabel: 'Mesa County, CO' },
  ],
  kane: [
    { slug: 'garfield', name: 'Garfield', seat: 'Panguitch', href: '/local-movers/utah/garfield' },
    { slug: 'iron', name: 'Iron', seat: 'Parowan', href: '/local-movers/utah/iron' },
    { slug: 'san-juan', name: 'San Juan', seat: 'Monticello', href: '/local-movers/utah/san-juan', displayLabel: 'San Juan County, UT' },
    { slug: 'washington', name: 'Washington', seat: 'St. George', href: '/local-movers/utah/washington', displayLabel: 'Washington County, UT' },
  ],
  beaver: [
    { slug: 'iron', name: 'Iron', seat: 'Parowan', href: '/local-movers/utah/iron' },
    { slug: 'millard', name: 'Millard', seat: 'Fillmore', href: '/local-movers/utah/millard' },
    { slug: 'piute', name: 'Piute', seat: 'Junction', href: '/local-movers/utah/piute' },
    { slug: 'sevier', name: 'Sevier', seat: 'Richfield', href: '/local-movers/utah/sevier' },
  ],
  garfield: [
    { slug: 'iron', name: 'Iron', seat: 'Parowan', href: '/local-movers/utah/iron' },
    { slug: 'kane', name: 'Kane', seat: 'Kanab', href: '/local-movers/utah/kane' },
    { slug: 'piute', name: 'Piute', seat: 'Junction', href: '/local-movers/utah/piute' },
    { slug: 'sanpete', name: 'Sanpete', seat: 'Manti', href: '/local-movers/utah/sanpete' },
    { slug: 'wayne', name: 'Wayne', seat: 'Loa', href: '/local-movers/utah/wayne' },
  ],
  rich: [
    { slug: 'box-elder', name: 'Box Elder', seat: 'Brigham City', href: '/local-movers/utah/box-elder', displayLabel: 'Box Elder County, UT' },
    { slug: 'cache', name: 'Cache', seat: 'Logan', href: '/local-movers/utah/cache' },
    { slug: 'morgan', name: 'Morgan', seat: 'Morgan', href: '/local-movers/utah/morgan', displayLabel: 'Morgan County, UT' },
    { slug: 'summit', name: 'Summit', seat: 'Coalville', href: '/local-movers/utah/summit' },
    { slug: 'weber', name: 'Weber', seat: 'Ogden', href: '/local-movers/utah/weber' },
  ],
  wayne: [
    { slug: 'emery', name: 'Emery', seat: 'Castle Dale', href: '/local-movers/utah/emery' },
    { slug: 'garfield', name: 'Garfield', seat: 'Panguitch', href: '/local-movers/utah/garfield' },
    { slug: 'piute', name: 'Piute', seat: 'Junction', href: '/local-movers/utah/piute' },
    { slug: 'sevier', name: 'Sevier', seat: 'Richfield', href: '/local-movers/utah/sevier' },
  ],
  piute: [
    { slug: 'beaver', name: 'Beaver', seat: 'Beaver', href: '/local-movers/utah/beaver' },
    { slug: 'garfield', name: 'Garfield', seat: 'Panguitch', href: '/local-movers/utah/garfield' },
    { slug: 'sevier', name: 'Sevier', seat: 'Richfield', href: '/local-movers/utah/sevier' },
    { slug: 'wayne', name: 'Wayne', seat: 'Loa', href: '/local-movers/utah/wayne' },
  ],
  daggett: [
    { slug: 'duchesne', name: 'Duchesne', seat: 'Duchesne', href: '/local-movers/utah/duchesne' },
    { slug: 'summit', name: 'Summit', seat: 'Coalville', href: '/local-movers/utah/summit' },
    { slug: 'uintah', name: 'Uintah', seat: 'Vernal', href: '/local-movers/utah/uintah' },
    { slug: 'sweetwater', name: 'Sweetwater', seat: 'Green River', href: '/local-movers/wyoming/sweetwater', displayLabel: 'Sweetwater County, WY' },
  ],
};

export function getUtahNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return UT_COUNTY_NEIGHBORS[countySlug] ?? [];
}
