import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Wyoming counties (23/23) */
export const wyomingCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  laramie: { seat: 'Cheyenne', metro: 'laramie-metro-wy' },
  natrona: { seat: 'Casper', metro: 'natrona-metro-wy' },
  campbell: { seat: 'Gillette', metro: 'campbell-metro-wy' },
  sweetwater: { seat: 'Green River', metro: 'sweetwater-metro-wy' },
  fremont: { seat: 'Lander', metro: 'fremont-metro-wy' },
  albany: { seat: 'Laramie', metro: 'albany-metro-wy' },
  sheridan: { seat: 'Sheridan', metro: 'sheridan-metro-wy' },
  park: { seat: 'Cody', metro: 'park-metro-wy' },
  teton: { seat: 'Jackson', metro: 'teton-metro-wy' },
  lincoln: { seat: 'Kemmerer', metro: 'lincoln-metro-wy' },
  uinta: { seat: 'Evanston', metro: 'uinta-metro-wy' },
  carbon: { seat: 'Rawlins', metro: 'carbon-metro-wy' },
  converse: { seat: 'Douglas', metro: 'converse-metro-wy' },
  goshen: { seat: 'Torrington', metro: 'goshen-metro-wy' },
  'big-horn': { seat: 'Basin', metro: 'big-horn-metro-wy' },
  johnson: { seat: 'Buffalo', metro: 'johnson-metro-wy' },
  sublette: { seat: 'Pinedale', metro: 'sublette-metro-wy' },
  platte: { seat: 'Wheatland', metro: 'platte-metro-wy' },
  crook: { seat: 'Sundance', metro: 'crook-metro-wy' },
  washakie: { seat: 'Worland', metro: 'washakie-metro-wy' },
  weston: { seat: 'Newcastle', metro: 'weston-metro-wy' },
  'hot-springs': { seat: 'Thermopolis', metro: 'hot-springs-metro-wy' },
  niobrara: { seat: 'Lusk', metro: 'niobrara-metro-wy' },
};

export function applyWyomingCountyOverrides(county: LocalCounty): LocalCounty {
  
if (county.stateSlug !== 'wyoming') return county;
  const override = wyomingCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
