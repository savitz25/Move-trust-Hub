import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated New Hampshire counties */
export const newHampshireCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  hillsborough: { seat: 'Nashua', metro: 'hillsborough-metro-nh' },
  rockingham: { seat: 'Brentwood', metro: 'rockingham-metro-nh' },
  merrimack: { seat: 'Concord', metro: 'merrimack-metro-nh' },
  strafford: { seat: 'Dover', metro: 'strafford-metro-nh' },
  grafton: { seat: 'North Haverhill', metro: 'grafton-metro-nh' },
  cheshire: { seat: 'Keene', metro: 'cheshire-metro-nh' },
  belknap: { seat: 'Laconia', metro: 'belknap-metro-nh' },
  carroll: { seat: 'Ossipee', metro: 'carroll-metro-nh' },
  sullivan: { seat: 'Newport', metro: 'sullivan-metro-nh' },
  coos: { seat: 'Lancaster', metro: 'coos-metro-nh' },
};

export function applyNewHampshireCountyOverrides(county: LocalCounty): LocalCounty {
  
if (county.stateSlug !== 'new-hampshire') return county;
  const override = newHampshireCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}