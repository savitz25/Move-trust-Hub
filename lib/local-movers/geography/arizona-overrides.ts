import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Arizona counties */
export const arizonaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  maricopa: { seat: 'Phoenix', metro: 'maricopa-metro-az' },
  pima: { seat: 'Tucson', metro: 'pima-metro-az' },
  pinal: { seat: 'Florence', metro: 'pinal-metro-az' },
  yavapai: { seat: 'Prescott', metro: 'yavapai-metro-az' },
  mohave: { seat: 'Kingman', metro: 'mohave-metro-az' },
  yuma: { seat: 'Yuma', metro: 'yuma-metro-az' },
  coconino: { seat: 'Flagstaff', metro: 'coconino-metro-az' },
  navajo: { seat: 'Holbrook', metro: 'navajo-metro-az' },
  apache: { seat: 'St. Johns', metro: 'apache-metro-az' },
  gila: { seat: 'Globe', metro: 'gila-metro-az' },
  graham: { seat: 'Safford', metro: 'graham-metro-az' },
  greenlee: { seat: 'Clifton', metro: 'greenlee-metro-az' },
  'la-paz': { seat: 'Parker', metro: 'la-paz-metro-az' },
  'santa-cruz': { seat: 'Nogales', metro: 'santa-cruz-metro-az' },
  cochise: { seat: 'Bisbee', metro: 'cochise-metro-az' },
};

export function applyArizonaCountyOverrides(county: LocalCounty): LocalCounty {
  
if (county.stateSlug !== 'arizona') return county;
  const override = arizonaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}