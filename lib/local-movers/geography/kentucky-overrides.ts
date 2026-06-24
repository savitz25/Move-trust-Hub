import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Kentucky counties */
export const kentuckyCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  jefferson: { seat: 'Louisville', metro: 'louisville-metro-ky' },
  fayette: { seat: 'Lexington', metro: 'lexington-metro-ky' },
  kenton: { seat: 'Covington', metro: 'cincinnati-metro-ky' },
  warren: { seat: 'Bowling Green', metro: 'bowling-green-metro-ky' },
  boone: { seat: 'Burlington', metro: 'cincinnati-metro-ky' },
  hardin: { seat: 'Elizabethtown', metro: 'elizabethtown-metro-ky' },
  daviess: { seat: 'Owensboro', metro: 'owensboro-metro-ky' },
  madison: { seat: 'Richmond', metro: 'richmond-metro-ky' },
  campbell: { seat: 'Alexandria', metro: 'cincinnati-metro-ky' },
  bullitt: { seat: 'Shepherdsville', metro: 'louisville-metro-ky' },
  oldham: { seat: 'La Grange', metro: 'louisville-metro-ky' },
  christian: { seat: 'Hopkinsville', metro: 'hopkinsville-metro-ky' },
  pulaski: { seat: 'Somerset', metro: 'somerset-metro-ky' },
  mccracken: { seat: 'Paducah', metro: 'paducah-metro-ky' },
};

export function applyKentuckyCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'kentucky') return county;
  const override = kentuckyCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}