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
};

export function applyIndianaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'indiana') return county;
  const override = indianaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}