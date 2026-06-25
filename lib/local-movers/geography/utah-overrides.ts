import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Utah counties (29/29 complete) */
export const utahCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  'salt-lake': { seat: 'Salt Lake City', metro: 'salt-lake-metro-ut' },
  utah: { seat: 'Provo', metro: 'utah-metro-ut' },
  davis: { seat: 'Farmington', metro: 'davis-metro-ut' },
  weber: { seat: 'Ogden', metro: 'weber-metro-ut' },
  washington: { seat: 'St. George', metro: 'washington-metro-ut' },
  cache: { seat: 'Logan', metro: 'cache-metro-ut' },
  tooele: { seat: 'Tooele', metro: 'tooele-metro-ut' },
  iron: { seat: 'Parowan', metro: 'iron-metro-ut' },
  'box-elder': { seat: 'Brigham City', metro: 'box-elder-metro-ut' },
  summit: { seat: 'Coalville', metro: 'summit-metro-ut' },
  wasatch: { seat: 'Heber City', metro: 'wasatch-metro-ut' },
  uintah: { seat: 'Vernal', metro: 'uintah-metro-ut' },
  sanpete: { seat: 'Manti', metro: 'sanpete-metro-ut' },
  sevier: { seat: 'Richfield', metro: 'sevier-metro-ut' },
  duchesne: { seat: 'Duchesne', metro: 'duchesne-metro-ut' },
  carbon: { seat: 'Price', metro: 'carbon-metro-ut' },
  'san-juan': { seat: 'Monticello', metro: 'san-juan-metro-ut' },
  millard: { seat: 'Fillmore', metro: 'millard-metro-ut' },
  juab: { seat: 'Nephi', metro: 'juab-metro-ut' },
  morgan: { seat: 'Morgan', metro: 'morgan-metro-ut' },
  emery: { seat: 'Castle Dale', metro: 'emery-metro-ut' },
  grand: { seat: 'Moab', metro: 'grand-metro-ut' },
  kane: { seat: 'Kanab', metro: 'kane-metro-ut' },
  beaver: { seat: 'Beaver', metro: 'beaver-metro-ut' },
  garfield: { seat: 'Panguitch', metro: 'garfield-metro-ut' },
  rich: { seat: 'Randolph', metro: 'rich-metro-ut' },
  wayne: { seat: 'Loa', metro: 'wayne-metro-ut' },
  piute: { seat: 'Junction', metro: 'piute-metro-ut' },
  daggett: { seat: 'Manila', metro: 'daggett-metro-ut' },
};

export function applyUtahCountyOverrides(county: LocalCounty): LocalCounty {
  const override = utahCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
