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
  whatcom: { seat: 'Bellingham', metro: 'whatcom-metro-wa' },
  benton: { seat: 'Kennewick', metro: 'benton-metro-wa' },
  skagit: { seat: 'Mount Vernon', metro: 'skagit-metro-wa' },
  cowlitz: { seat: 'Kelso', metro: 'cowlitz-metro-wa' },
  grant: { seat: 'Ephrata', metro: 'grant-metro-wa' },
  franklin: { seat: 'Pasco', metro: 'franklin-metro-wa' },
  lewis: { seat: 'Chehalis', metro: 'lewis-metro-wa' },
  island: { seat: 'Coupeville', metro: 'island-metro-wa' },
  chelan: { seat: 'Wenatchee', metro: 'chelan-metro-wa' },
  clallam: { seat: 'Port Angeles', metro: 'clallam-metro-wa' },
  'grays-harbor': { seat: 'Montesano', metro: 'grays-harbor-metro-wa' },
};

export function applyWashingtonCountyOverrides(county: LocalCounty): LocalCounty {
  const override = washingtonCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}