import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Kansas counties */
export const kansasCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  johnson: { seat: 'Olathe', metro: 'kansas-city-metro-ks' },
  sedgwick: { seat: 'Wichita', metro: 'wichita-metro-ks' },
  shawnee: { seat: 'Topeka', metro: 'topeka-metro-ks' },
  wyandotte: { seat: 'Kansas City', metro: 'kansas-city-metro-ks' },
  douglas: { seat: 'Lawrence', metro: 'lawrence-metro-ks' },
  leavenworth: { seat: 'Leavenworth', metro: 'kansas-city-metro-ks' },
  riley: { seat: 'Manhattan', metro: 'manhattan-metro-ks' },
  butler: { seat: 'El Dorado', metro: 'wichita-metro-east-ks' },
  reno: { seat: 'Hutchinson', metro: 'hutchinson-metro-ks' },
  saline: { seat: 'Salina', metro: 'salina-metro-ks' },
  crawford: { seat: 'Girard', metro: 'pittsburg-metro-ks' },
  finney: { seat: 'Garden City', metro: 'garden-city-metro-ks' },
  geary: { seat: 'Junction City', metro: 'junction-city-metro-ks' },
  miami: { seat: 'Paola', metro: 'kansas-city-metro-south-ks' },
  cowley: { seat: 'Winfield', metro: 'winfield-metro-ks' },
  ford: { seat: 'Dodge City', metro: 'dodge-city-metro-ks' },
};

export function applyKansasCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'kansas') return county;
  const override = kansasCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}