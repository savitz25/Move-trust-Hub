import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Tennessee counties */
export const tennesseeCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  shelby: { seat: 'Memphis', metro: 'memphis-metro-tn' },
  davidson: { seat: 'Nashville', metro: 'nashville-metro-tn' },
  knox: { seat: 'Knoxville', metro: 'knoxville-metro-tn' },
  hamilton: { seat: 'Chattanooga', metro: 'chattanooga-metro-tn' },
};

export function applyTennesseeCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'tennessee') return county;
  const override = tennesseeCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}