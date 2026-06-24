import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Nevada premium counties */
export const nevadaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  clark: { seat: 'Las Vegas', metro: 'clark-metro-nv' },
  washoe: { seat: 'Reno', metro: 'washoe-metro-nv' },
  lyon: { seat: 'Yerington', metro: 'lyon-metro-nv' },
  'carson-city': { seat: 'Carson City', metro: 'carson-city-metro-nv' },
  nye: { seat: 'Tonopah', metro: 'nye-metro-nv' },
  elko: { seat: 'Elko', metro: 'elko-metro-nv' },
  douglas: { seat: 'Minden', metro: 'douglas-metro-nv' },
  churchill: { seat: 'Fallon', metro: 'churchill-metro-nv' },
  humboldt: { seat: 'Winnemucca', metro: 'humboldt-metro-nv' },
  'white-pine': { seat: 'Ely', metro: 'white-pine-metro-nv' },
  pershing: { seat: 'Lovelock', metro: 'pershing-metro-nv' },
  lander: { seat: 'Battle Mountain', metro: 'lander-metro-nv' },
  storey: { seat: 'Virginia City', metro: 'storey-metro-nv' },
  mineral: { seat: 'Hawthorne', metro: 'mineral-metro-nv' },
  lincoln: { seat: 'Pioche', metro: 'lincoln-metro-nv' },
  eureka: { seat: 'Eureka', metro: 'eureka-metro-nv' },
  esmeralda: { seat: 'Goldfield', metro: 'esmeralda-metro-nv' },
};

export function applyNevadaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'nevada') return county;
  const override = nevadaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}