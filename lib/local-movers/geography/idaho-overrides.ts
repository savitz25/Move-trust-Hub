import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Idaho counties (batch 1–2: 44/44) */
export const idahoCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  ada: { seat: 'Boise', metro: 'ada-metro-id' },
  canyon: { seat: 'Caldwell', metro: 'canyon-metro-id' },
  kootenai: { seat: "Coeur d'Alene", metro: 'kootenai-metro-id' },
  bonneville: { seat: 'Idaho Falls', metro: 'bonneville-metro-id' },
  'twin-falls': { seat: 'Twin Falls', metro: 'twin-falls-metro-id' },
  bannock: { seat: 'Pocatello', metro: 'bannock-metro-id' },
  madison: { seat: 'Rexburg', metro: 'madison-metro-id' },
  bonner: { seat: 'Sandpoint', metro: 'bonner-metro-id' },
  bingham: { seat: 'Blackfoot', metro: 'bingham-metro-id' },
  'nez-perce': { seat: 'Lewiston', metro: 'nez-perce-metro-id' },
  latah: { seat: 'Moscow', metro: 'latah-metro-id' },
  jefferson: { seat: 'Rigby', metro: 'jefferson-metro-id' },
  elmore: { seat: 'Mountain Home', metro: 'elmore-metro-id' },
  payette: { seat: 'Payette', metro: 'payette-metro-id' },
  cassia: { seat: 'Burley', metro: 'cassia-metro-id' },
  jerome: { seat: 'Jerome', metro: 'jerome-metro-id' },
  blaine: { seat: 'Hailey', metro: 'blaine-metro-id' },
  minidoka: { seat: 'Rupert', metro: 'minidoka-metro-id' },
  gem: { seat: 'Emmett', metro: 'gem-metro-id' },
  idaho: { seat: 'Grangeville', metro: 'idaho-metro-id' },
  gooding: { seat: 'Gooding', metro: 'gooding-metro-id' },
  franklin: { seat: 'Preston', metro: 'franklin-metro-id' },
  shoshone: { seat: 'Wallace', metro: 'shoshone-metro-id' },
  boundary: { seat: 'Bonners Ferry', metro: 'boundary-metro-id' },
  fremont: { seat: 'St. Anthony', metro: 'fremont-metro-id' },
  teton: { seat: 'Driggs', metro: 'teton-metro-id' },
  valley: { seat: 'Cascade', metro: 'valley-metro-id' },
  owyhee: { seat: 'Murphy', metro: 'owyhee-metro-id' },
  washington: { seat: 'Weiser', metro: 'washington-metro-id' },
  benewah: { seat: 'St. Maries', metro: 'benewah-metro-id' },
  clearwater: { seat: 'Orofino', metro: 'clearwater-metro-id' },
  boise: { seat: 'Idaho City', metro: 'boise-metro-id' },
  lemhi: { seat: 'Salmon', metro: 'lemhi-metro-id' },
  power: { seat: 'American Falls', metro: 'power-metro-id' },
  caribou: { seat: 'Soda Springs', metro: 'caribou-metro-id' },
  'bear-lake': { seat: 'Paris', metro: 'bear-lake-metro-id' },
  lincoln: { seat: 'Shoshone', metro: 'lincoln-metro-id' },
  oneida: { seat: 'Malad City', metro: 'oneida-metro-id' },
  adams: { seat: 'Council', metro: 'adams-metro-id' },
  custer: { seat: 'Challis', metro: 'custer-metro-id' },
  lewis: { seat: 'Nezperce', metro: 'lewis-metro-id' },
  butte: { seat: 'Arco', metro: 'butte-metro-id' },
  camas: { seat: 'Fairfield', metro: 'camas-metro-id' },
  clark: { seat: 'Dubois', metro: 'clark-metro-id' },
};

export function applyIdahoCountyOverrides(county: LocalCounty): LocalCounty {
  const override = idahoCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
