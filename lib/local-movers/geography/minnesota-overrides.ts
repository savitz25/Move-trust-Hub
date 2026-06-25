import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Minnesota counties (batch 1 — 11 counties) */
export const minnesotaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  hennepin: { seat: "Minneapolis", metro: "hennepin-metro-mn" },
  ramsey: { seat: "Saint Paul", metro: "ramsey-metro-mn" },
  dakota: { seat: "Hastings", metro: "dakota-metro-mn" },
  anoka: { seat: "Anoka", metro: "anoka-metro-mn" },
  washington: { seat: "Stillwater", metro: "washington-metro-mn" },
  'st-louis': { seat: "Duluth", metro: "st-louis-metro-mn" },
  olmsted: { seat: "Rochester", metro: "olmsted-metro-mn" },
  stearns: { seat: "St. Cloud", metro: "stearns-metro-mn" },
  scott: { seat: "Shakopee", metro: "scott-metro-mn" },
  wright: { seat: "Buffalo", metro: "wright-metro-mn" },
  carver: { seat: "Chaska", metro: "carver-metro-mn" },
};

export function applyMinnesotaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'minnesota') return county;
  const override = minnesotaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
