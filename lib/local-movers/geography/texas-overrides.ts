import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Texas counties (merged onto generated geography) */
export const texasCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  armstrong: { seat: 'Claude', metro: 'rural-panhandle-tx' },
  borden: { seat: 'Gail', metro: 'rural-west-tx' },
  briscoe: { seat: 'Silverton', metro: 'rural-panhandle-tx' },
  cochran: { seat: 'Morton', metro: 'rural-west-tx' },
  coke: { seat: 'Robert Lee', metro: 'rural-west-tx' },
  collingsworth: { seat: 'Wellington', metro: 'rural-panhandle-tx' },
  crockett: { seat: 'Ozona', metro: 'rural-west-tx' },
  cottle: { seat: 'Paducah', metro: 'rural-north-tx' },
  culberson: { seat: 'Van Horn', metro: 'rural-west-tx' },
  dickens: { seat: 'Dickens', metro: 'rural-north-tx' },
  donley: { seat: 'Clarendon', metro: 'rural-panhandle-tx' },
  edwards: { seat: 'Rocksprings', metro: 'rural-south-tx' },
  foard: { seat: 'Crowell', metro: 'rural-north-tx' },
  glasscock: { seat: 'Garden City', metro: 'rural-west-tx' },
  hall: { seat: 'Memphis', metro: 'rural-panhandle-tx' },
  irion: { seat: 'Mertzon', metro: 'rural-west-tx' },
  'jeff-davis': { seat: 'Fort Davis', metro: 'rural-west-tx' },
  kenedy: { seat: 'Sarita', metro: 'rural-south-tx' },
  kinney: { seat: 'Brackettville', metro: 'rural-south-tx' },
  king: { seat: 'Guthrie', metro: 'rural-west-tx' },
  lipscomb: { seat: 'Lipscomb', metro: 'rural-panhandle-tx' },
  loving: { seat: 'Mentone', metro: 'rural-west-tx' },
  menard: { seat: 'Menard', metro: 'rural-west-tx' },
  oldham: { seat: 'Vega', metro: 'rural-panhandle-tx' },
  real: { seat: 'Leakey', metro: 'rural-south-tx' },
  reagan: { seat: 'Big Lake', metro: 'rural-west-tx' },
  schleicher: { seat: 'Eldorado', metro: 'rural-west-tx' },
  shackelford: { seat: 'Albany', metro: 'rural-north-tx' },
  sherman: { seat: 'Stratford', metro: 'rural-panhandle-tx' },
  sutton: { seat: 'Sonora', metro: 'rural-west-tx' },
  sterling: { seat: 'Sterling City', metro: 'rural-west-tx' },
  stonewall: { seat: 'Aspermont', metro: 'rural-north-tx' },
  throckmorton: { seat: 'Throckmorton', metro: 'rural-north-tx' },
  upton: { seat: 'Rankin', metro: 'rural-west-tx' },
};

export function applyTexasCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'texas') return county;
  const override = texasCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}