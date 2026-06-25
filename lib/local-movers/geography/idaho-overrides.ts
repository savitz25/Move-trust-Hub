import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Idaho counties (batch 1: 21/44) */
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
};

export function applyIdahoCountyOverrides(county: LocalCounty): LocalCounty {
  const override = idahoCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
