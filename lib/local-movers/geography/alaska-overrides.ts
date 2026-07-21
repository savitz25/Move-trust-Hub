import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Alaska boroughs */
export const alaskaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  anchorage: { seat: 'Anchorage', metro: 'anchorage-metro-ak' },
  'matanuska-susitna': { seat: 'Palmer', metro: 'matanuska-susitna-metro-ak' },
  'fairbanks-north-star': { seat: 'Fairbanks', metro: 'fairbanks-north-star-metro-ak' },
  'kenai-peninsula': { seat: 'Soldotna', metro: 'kenai-peninsula-metro-ak' },
  juneau: { seat: 'Juneau', metro: 'juneau-metro-ak' },
};

export function applyAlaskaCountyOverrides(county: LocalCounty): LocalCounty {
  
if (county.stateSlug !== 'alaska') return county;
  const override = alaskaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}