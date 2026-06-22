import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Texas counties (merged onto generated geography) */
export const texasCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  borden: { seat: 'Gail', metro: 'rural-west-tx' },
  kenedy: { seat: 'Sarita', metro: 'rural-south-tx' },
  king: { seat: 'Guthrie', metro: 'rural-west-tx' },
  loving: { seat: 'Mentone', metro: 'rural-west-tx' },
};

export function applyTexasCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'texas') return county;
  const override = texasCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}