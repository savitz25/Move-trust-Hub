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
};

export function applyIllinoisCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'illinois') return county;
  const override = illinoisCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}