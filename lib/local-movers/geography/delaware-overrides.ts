import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Delaware counties */
export const delawareCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  'new-castle': { seat: 'Wilmington', metro: 'new-castle-metro-de' },
  sussex: { seat: 'Georgetown', metro: 'sussex-metro-de' },
  kent: { seat: 'Dover', metro: 'kent-metro-de' },
};

export function applyDelawareCountyOverrides(county: LocalCounty): LocalCounty {
  
if (county.stateSlug !== 'delaware') return county;
  const override = delawareCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}