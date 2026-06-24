import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Washington counties */
export const washingtonCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  king: { seat: 'Seattle', metro: 'king-metro-wa' },
  pierce: { seat: 'Tacoma', metro: 'pierce-metro-wa' },
  snohomish: { seat: 'Everett', metro: 'snohomish-metro-wa' },
  spokane: { seat: 'Spokane', metro: 'spokane-metro-wa' },
  clark: { seat: 'Vancouver', metro: 'clark-metro-wa' },
  thurston: { seat: 'Olympia', metro: 'thurston-metro-wa' },
  kitsap: { seat: 'Port Orchard', metro: 'kitsap-metro-wa' },
  yakima: { seat: 'Yakima', metro: 'yakima-metro-wa' },
};

export function applyWashingtonCountyOverrides(county: LocalCounty): LocalCounty {
  const override = washingtonCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}