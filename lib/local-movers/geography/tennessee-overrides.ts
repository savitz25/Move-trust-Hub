import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Tennessee counties */
export const tennesseeCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  shelby: { seat: 'Memphis', metro: 'memphis-metro-tn' },
  davidson: { seat: 'Nashville', metro: 'nashville-metro-tn' },
  knox: { seat: 'Knoxville', metro: 'knoxville-metro-tn' },
  hamilton: { seat: 'Chattanooga', metro: 'chattanooga-metro-tn' },
  rutherford: { seat: 'Murfreesboro', metro: 'nashville-metro-tn' },
  williamson: { seat: 'Franklin', metro: 'nashville-metro-tn' },
  montgomery: { seat: 'Clarksville', metro: 'clarksville-metro-tn' },
  sumner: { seat: 'Gallatin', metro: 'nashville-metro-tn' },
  wilson: { seat: 'Lebanon', metro: 'nashville-metro-tn' },
  sullivan: { seat: 'Blountville', metro: 'kingsport-bristol-metro-tn' },
  blount: { seat: 'Maryville', metro: 'knoxville-metro-tn' },
  washington: { seat: 'Jonesborough', metro: 'kingsport-bristol-metro-tn' },
  maury: { seat: 'Columbia', metro: 'nashville-metro-tn' },
  bradley: { seat: 'Cleveland', metro: 'cleveland-metro-tn' },
  sevier: { seat: 'Sevierville', metro: 'sevierville-metro-tn' },
  madison: { seat: 'Jackson', metro: 'jackson-metro-tn' },
  putnam: { seat: 'Cookeville', metro: 'cookeville-metro-tn' },
};

export function applyTennesseeCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'tennessee') return county;
  const override = tennesseeCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}