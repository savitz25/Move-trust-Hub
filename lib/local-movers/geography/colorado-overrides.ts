import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Colorado counties (batch 1+2: 23/64) */
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
  larimer: { seat: 'Fort Collins', metro: 'larimer-metro-co' },
  boulder: { seat: 'Boulder', metro: 'boulder-metro-co' },
  pueblo: { seat: 'Pueblo', metro: 'pueblo-metro-co' },
  mesa: { seat: 'Grand Junction', metro: 'mesa-metro-co' },
  broomfield: { seat: 'Broomfield', metro: 'broomfield-metro-co' },
  garfield: { seat: 'Glenwood Springs', metro: 'garfield-metro-co' },
  'la-plata': { seat: 'Durango', metro: 'la-plata-metro-co' },
  eagle: { seat: 'Eagle', metro: 'eagle-metro-co' },
  fremont: { seat: 'Canon City', metro: 'fremont-metro-co' },
  montrose: { seat: 'Montrose', metro: 'montrose-metro-co' },
  delta: { seat: 'Delta', metro: 'delta-metro-co' },
  elbert: { seat: 'Kiowa', metro: 'elbert-metro-co' },
  summit: { seat: 'Breckenridge', metro: 'summit-metro-co' },
  morgan: { seat: 'Fort Morgan', metro: 'morgan-metro-co' },
  montezuma: { seat: 'Cortez', metro: 'montezuma-metro-co' },
  routt: { seat: 'Steamboat Springs', metro: 'routt-metro-co' },
};

export function applyColoradoCountyOverrides(county: LocalCounty): LocalCounty {
  const override = coloradoCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
