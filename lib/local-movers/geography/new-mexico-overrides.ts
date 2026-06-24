import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated New Mexico counties (batch 1) */
export const newMexicoCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  bernalillo: { seat: 'Albuquerque', metro: 'bernalillo-metro-nm' },
  'doa-ana': { seat: 'Las Cruces', metro: 'doa-ana-metro-nm' },
  sandoval: { seat: 'Bernalillo', metro: 'sandoval-metro-nm' },
  'santa-fe': { seat: 'Santa Fe', metro: 'santa-fe-metro-nm' },
  'san-juan': { seat: 'Aztec', metro: 'san-juan-metro-nm' },
  valencia: { seat: 'Los Lunas', metro: 'valencia-metro-nm' },
  lea: { seat: 'Lovington', metro: 'lea-metro-nm' },
  otero: { seat: 'Alamogordo', metro: 'otero-metro-nm' },
  mckinley: { seat: 'Gallup', metro: 'mckinley-metro-nm' },
  eddy: { seat: 'Carlsbad', metro: 'eddy-metro-nm' },
  chaves: { seat: 'Roswell', metro: 'chaves-metro-nm' },
};

export function applyNewMexicoCountyOverrides(county: LocalCounty): LocalCounty {
  const override = newMexicoCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}