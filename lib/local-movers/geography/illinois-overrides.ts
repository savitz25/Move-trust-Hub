import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Illinois counties */
export const illinoisCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  cook: { seat: 'Chicago', metro: 'chicago-metro-il' },
  dupage: { seat: 'Wheaton', metro: 'chicago-metro-west-il' },
  lake: { seat: 'Waukegan', metro: 'chicago-metro-north-il' },
  will: { seat: 'Joliet', metro: 'chicago-metro-southwest-il' },
  kane: { seat: 'Geneva', metro: 'chicago-metro-west-il' },
  mchenry: { seat: 'Woodstock', metro: 'chicago-metro-northwest-il' },
  winnebago: { seat: 'Rockford', metro: 'rockford-metro-il' },
  madison: { seat: 'Edwardsville', metro: 'st-louis-metro-il' },
  'st-clair': { seat: 'Belleville', metro: 'st-louis-metro-il' },
  champaign: { seat: 'Urbana', metro: 'champaign-urbana-metro-il' },
  sangamon: { seat: 'Springfield', metro: 'springfield-metro-il' },
  peoria: { seat: 'Peoria', metro: 'peoria-metro-il' },
  mclean: { seat: 'Bloomington', metro: 'bloomington-normal-metro-il' },
  kendall: { seat: 'Yorkville', metro: 'chicago-metro-southwest-il' },
  'rock-island': { seat: 'Rock Island', metro: 'quad-cities-metro-il' },
  tazewell: { seat: 'Pekin', metro: 'peoria-metro-il' },
  lasalle: { seat: 'Ottawa', metro: 'ottawa-metro-il' },
  kankakee: { seat: 'Kankakee', metro: 'kankakee-metro-il' },
  dekalb: { seat: 'Sycamore', metro: 'dekalb-metro-il' },
  macon: { seat: 'Decatur', metro: 'decatur-metro-il' },
  vermilion: { seat: 'Danville', metro: 'danville-metro-il' },
  williamson: { seat: 'Marion', metro: 'marion-metro-il' },
  adams: { seat: 'Quincy', metro: 'quincy-metro-il' },
  grundy: { seat: 'Morris', metro: 'chicago-metro-southwest-il' },
  whiteside: { seat: 'Morrison', metro: 'sterling-rock-falls-metro-il' },
  boone: { seat: 'Belvidere', metro: 'rockford-metro-il' },
  jackson: { seat: 'Murphysboro', metro: 'carbondale-metro-il' },
  ogle: { seat: 'Oregon', metro: 'oregon-metro-il' },
};

export function applyIllinoisCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'illinois') return county;
  const override = illinoisCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}