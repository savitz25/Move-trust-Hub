import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Georgia counties */
export const georgiaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  fulton: { seat: 'Atlanta', metro: 'atlanta-metro-ga' },
  gwinnett: { seat: 'Lawrenceville', metro: 'atlanta-metro-ga' },
};

export function applyGeorgiaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'georgia') return county;
  const override = georgiaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}