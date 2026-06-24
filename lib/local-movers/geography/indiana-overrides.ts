import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Indiana counties */
export const indianaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  marion: { seat: 'Indianapolis', metro: 'indianapolis-metro-in' },
  lake: { seat: 'Crown Point', metro: 'northwest-indiana-metro-in' },
  allen: { seat: 'Fort Wayne', metro: 'fort-wayne-metro-in' },
  hamilton: { seat: 'Noblesville', metro: 'indianapolis-metro-in' },
  'st-joseph': { seat: 'South Bend', metro: 'south-bend-metro-in' },
  elkhart: { seat: 'Goshen', metro: 'elkhart-goshen-metro-in' },
  hendricks: { seat: 'Danville', metro: 'indianapolis-metro-in' },
  tippecanoe: { seat: 'Lafayette', metro: 'lafayette-metro-in' },
  vanderburgh: { seat: 'Evansville', metro: 'evansville-metro-in' },
  johnson: { seat: 'Franklin', metro: 'indianapolis-metro-in' },
  porter: { seat: 'Valparaiso', metro: 'northwest-indiana-metro-in' },
  monroe: { seat: 'Bloomington', metro: 'bloomington-metro-in' },
  madison: { seat: 'Anderson', metro: 'anderson-metro-in' },
  clark: { seat: 'Jeffersonville', metro: 'louisville-metro-in' },
  delaware: { seat: 'Muncie', metro: 'muncie-metro-in' },
  laporte: { seat: 'La Porte', metro: 'laporte-metro-in' },
  vigo: { seat: 'Terre Haute', metro: 'terre-haute-metro-in' },
  hancock: { seat: 'Greenfield', metro: 'indianapolis-metro-in' },
  bartholomew: { seat: 'Columbus', metro: 'columbus-metro-in' },
  howard: { seat: 'Kokomo', metro: 'kokomo-metro-in' },
  boone: { seat: 'Lebanon', metro: 'indianapolis-metro-in' },
  floyd: { seat: 'New Albany', metro: 'louisville-metro-in' },
  kosciusko: { seat: 'Warsaw', metro: 'warsaw-metro-in' },
  morgan: { seat: 'Martinsville', metro: 'indianapolis-metro-in' },
  warrick: { seat: 'Boonville', metro: 'evansville-metro-in' },
  grant: { seat: 'Marion', metro: 'grant-marion-metro-in' },
  wayne: { seat: 'Richmond', metro: 'richmond-metro-in' },
  dearborn: { seat: 'Lawrenceburg', metro: 'cincinnati-metro-in' },
  henry: { seat: 'New Castle', metro: 'new-castle-metro-in' },
  noble: { seat: 'Albion', metro: 'noble-metro-in' },
  jackson: { seat: 'Seymour', metro: 'seymour-metro-in' },
  marshall: { seat: 'Plymouth', metro: 'plymouth-metro-in' },
  shelby: { seat: 'Shelbyville', metro: 'indianapolis-metro-in' },
};

export function applyIndianaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'indiana') return county;
  const override = indianaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}