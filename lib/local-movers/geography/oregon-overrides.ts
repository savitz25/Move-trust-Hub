import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Oregon premium counties */
export const oregonCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  multnomah: { seat: 'Portland', metro: 'multnomah-metro-or' },
  washington: { seat: 'Hillsboro', metro: 'washington-metro-or' },
  clackamas: { seat: 'Oregon City', metro: 'clackamas-metro-or' },
  lane: { seat: 'Eugene', metro: 'lane-metro-or' },
  marion: { seat: 'Salem', metro: 'marion-metro-or' },
  jackson: { seat: 'Medford', metro: 'jackson-metro-or' },
  deschutes: { seat: 'Bend', metro: 'deschutes-metro-or' },
  linn: { seat: 'Albany', metro: 'linn-metro-or' },
  douglas: { seat: 'Roseburg', metro: 'douglas-metro-or' },
  yamhill: { seat: 'McMinnville', metro: 'yamhill-metro-or' },
  benton: { seat: 'Corvallis', metro: 'benton-metro-or' },
  wasco: { seat: 'The Dalles', metro: 'wasco-metro-or' },
  union: { seat: 'La Grande', metro: 'union-metro-or' },
  jefferson: { seat: 'Madras', metro: 'jefferson-metro-or' },
  'hood-river': { seat: 'Hood River', metro: 'hood-river-metro-or' },
  curry: { seat: 'Gold Beach', metro: 'curry-metro-or' },
  baker: { seat: 'Baker City', metro: 'baker-metro-or' },
  morrow: { seat: 'Heppner', metro: 'morrow-metro-or' },
  lake: { seat: 'Lakeview', metro: 'lake-metro-or' },
  wallowa: { seat: 'Enterprise', metro: 'wallowa-metro-or' },
  harney: { seat: 'Burns', metro: 'harney-metro-or' },
  grant: { seat: 'Canyon City', metro: 'grant-metro-or' },
  sherman: { seat: 'Moro', metro: 'sherman-metro-or' },
  gilliam: { seat: 'Condon', metro: 'gilliam-metro-or' },
  wheeler: { seat: 'Fossil', metro: 'wheeler-metro-or' },
  clatsop: { seat: 'Astoria', metro: 'clatsop-metro-or' },
  columbia: { seat: 'St. Helens', metro: 'columbia-metro-or' },
  coos: { seat: 'Coquille', metro: 'coos-metro-or' },
  crook: { seat: 'Prineville', metro: 'crook-metro-or' },
  josephine: { seat: 'Grants Pass', metro: 'josephine-metro-or' },
  klamath: { seat: 'Klamath Falls', metro: 'klamath-metro-or' },
  lincoln: { seat: 'Newport', metro: 'lincoln-metro-or' },
  malheur: { seat: 'Ontario', metro: 'malheur-metro-or' },
  polk: { seat: 'Dallas', metro: 'polk-metro-or' },
  tillamook: { seat: 'Tillamook', metro: 'tillamook-metro-or' },
  umatilla: { seat: 'Pendleton', metro: 'umatilla-metro-or' },
};

export function applyOregonCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'oregon') return county;
  const override = oregonCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}