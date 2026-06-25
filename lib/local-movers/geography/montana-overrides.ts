import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Montana counties (batch 1–2: 56/56) */
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
  broadwater: { seat: 'Townsend', metro: 'broadwater-metro-mt' },
  dawson: { seat: 'Glendive', metro: 'dawson-metro-mt' },
  rosebud: { seat: 'Forsyth', metro: 'rosebud-metro-mt' },
  valley: { seat: 'Glasgow', metro: 'valley-metro-mt' },
  powell: { seat: 'Deer Lodge', metro: 'powell-metro-mt' },
  blaine: { seat: 'Chinook', metro: 'blaine-metro-mt' },
  teton: { seat: 'Choteau', metro: 'teton-metro-mt' },
  pondera: { seat: 'Conrad', metro: 'pondera-metro-mt' },
  chouteau: { seat: 'Fort Benton', metro: 'chouteau-metro-mt' },
  musselshell: { seat: 'Roundup', metro: 'musselshell-metro-mt' },
  toole: { seat: 'Shelby', metro: 'toole-metro-mt' },
  mineral: { seat: 'Superior', metro: 'mineral-metro-mt' },
  phillips: { seat: 'Malta', metro: 'phillips-metro-mt' },
  'sweet-grass': { seat: 'Big Timber', metro: 'sweet-grass-metro-mt' },
  granite: { seat: 'Philipsburg', metro: 'granite-metro-mt' },
  sheridan: { seat: 'Plentywood', metro: 'sheridan-metro-mt' },
  fallon: { seat: 'Baker', metro: 'fallon-metro-mt' },
  'judith-basin': { seat: 'Stanford', metro: 'judith-basin-metro-mt' },
  meagher: { seat: 'White Sulphur Springs', metro: 'meagher-metro-mt' },
  wheatland: { seat: 'Harlowton', metro: 'wheatland-metro-mt' },
  liberty: { seat: 'Chester', metro: 'liberty-metro-mt' },
  'powder-river': { seat: 'Broadus', metro: 'powder-river-metro-mt' },
  mccone: { seat: 'Circle', metro: 'mccone-metro-mt' },
  daniels: { seat: 'Scobey', metro: 'daniels-metro-mt' },
  carter: { seat: 'Ekalaka', metro: 'carter-metro-mt' },
  garfield: { seat: 'Jordan', metro: 'garfield-metro-mt' },
  prairie: { seat: 'Terry', metro: 'prairie-metro-mt' },
  wibaux: { seat: 'Wibaux', metro: 'wibaux-metro-mt' },
  'golden-valley': { seat: 'Ryegate', metro: 'golden-valley-metro-mt' },
  treasure: { seat: 'Hysham', metro: 'treasure-metro-mt' },
  petroleum: { seat: 'Winnett', metro: 'petroleum-metro-mt' },
};

export function applyMontanaCountyOverrides(county: LocalCounty): LocalCounty {
  const override = montanaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
