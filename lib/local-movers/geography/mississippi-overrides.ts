import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Mississippi counties */
export const mississippiCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  harrison: { seat: 'Gulfport', metro: 'gulfport-biloxi-metro-ms' },
  hinds: { seat: 'Jackson', metro: 'jackson-ms-metro-ms' },
  desoto: { seat: 'Hernando', metro: 'desoto-metro-ms' },
  rankin: { seat: 'Brandon', metro: 'jackson-ms-metro-ms' },
  jackson: { seat: 'Pascagoula', metro: 'pascagoula-metro-ms' },
};

export function applyMississippiCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'mississippi') return county;
  const override = mississippiCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}