import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Colorado counties (batch 1) */
export const coloradoCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  'el-paso': { seat: 'Colorado Springs', metro: 'el-paso-metro-co' },
  denver: { seat: 'Denver', metro: 'denver-metro-co' },
  arapahoe: { seat: 'Littleton', metro: 'arapahoe-metro-co' },
  jefferson: { seat: 'Golden', metro: 'jefferson-metro-co' },
  adams: { seat: 'Brighton', metro: 'adams-metro-co' },
  douglas: { seat: 'Castle Rock', metro: 'douglas-metro-co' },
  weld: { seat: 'Greeley', metro: 'weld-metro-co' },
};

export function applyColoradoCountyOverrides(county: LocalCounty): LocalCounty {
  const override = coloradoCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}