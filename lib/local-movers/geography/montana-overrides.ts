import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Montana counties (batch 1: 25/56) */
export const montanaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  yellowstone: { seat: 'Billings', metro: 'yellowstone-metro-mt' },
  gallatin: { seat: 'Bozeman', metro: 'gallatin-metro-mt' },
  missoula: { seat: 'Missoula', metro: 'missoula-metro-mt' },
  flathead: { seat: 'Kalispell', metro: 'flathead-metro-mt' },
  cascade: { seat: 'Great Falls', metro: 'cascade-metro-mt' },
  'lewis-and-clark': { seat: 'Helena', metro: 'lewis-and-clark-metro-mt' },
  ravalli: { seat: 'Hamilton', metro: 'ravalli-metro-mt' },
  'silver-bow': { seat: 'Butte', metro: 'silver-bow-metro-mt' },
  lake: { seat: 'Polson', metro: 'lake-metro-mt' },
  lincoln: { seat: 'Libby', metro: 'lincoln-metro-mt' },
  park: { seat: 'Livingston', metro: 'park-metro-mt' },
  hill: { seat: 'Havre', metro: 'hill-metro-mt' },
  sanders: { seat: 'Thompson Falls', metro: 'sanders-metro-mt' },
  jefferson: { seat: 'Boulder', metro: 'jefferson-metro-mt' },
  glacier: { seat: 'Cut Bank', metro: 'glacier-metro-mt' },
  'big-horn': { seat: 'Hardin', metro: 'big-horn-metro-mt' },
  custer: { seat: 'Miles City', metro: 'custer-metro-mt' },
  fergus: { seat: 'Lewistown', metro: 'fergus-metro-mt' },
  richland: { seat: 'Sidney', metro: 'richland-metro-mt' },
  carbon: { seat: 'Red Lodge', metro: 'carbon-metro-mt' },
  madison: { seat: 'Virginia City', metro: 'madison-metro-mt' },
  roosevelt: { seat: 'Wolf Point', metro: 'roosevelt-metro-mt' },
  beaverhead: { seat: 'Dillon', metro: 'beaverhead-metro-mt' },
  'deer-lodge': { seat: 'Anaconda', metro: 'deer-lodge-metro-mt' },
  stillwater: { seat: 'Columbus', metro: 'stillwater-metro-mt' },
};

export function applyMontanaCountyOverrides(county: LocalCounty): LocalCounty {
  const override = montanaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
