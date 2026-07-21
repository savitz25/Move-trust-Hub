import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated New Mexico counties — 33/33 complete */
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
  curry: { seat: 'Clovis', metro: 'curry-metro-nm' },
  'rio-arriba': { seat: 'Tierra Amarilla', metro: 'rio-arriba-metro-nm' },
  taos: { seat: 'Taos', metro: 'taos-metro-nm' },
  grant: { seat: 'Silver City', metro: 'grant-metro-nm' },
  cibola: { seat: 'Grants', metro: 'cibola-metro-nm' },
  'san-miguel': { seat: 'Las Vegas', metro: 'san-miguel-metro-nm' },
  luna: { seat: 'Deming', metro: 'luna-metro-nm' },
  lincoln: { seat: 'Carrizozo', metro: 'lincoln-metro-nm' },
  'los-alamos': { seat: 'Los Alamos', metro: 'los-alamos-metro-nm' },
  roosevelt: { seat: 'Portales', metro: 'roosevelt-metro-nm' },
  torrance: { seat: 'Estancia', metro: 'torrance-metro-nm' },
  socorro: { seat: 'Socorro', metro: 'socorro-metro-nm' },
  colfax: { seat: 'Raton', metro: 'colfax-metro-nm' },
  sierra: { seat: 'Truth or Consequences', metro: 'sierra-metro-nm' },
  quay: { seat: 'Tucumcari', metro: 'quay-metro-nm' },
  guadalupe: { seat: 'Santa Rosa', metro: 'guadalupe-metro-nm' },
  mora: { seat: 'Mora', metro: 'mora-metro-nm' },
  hidalgo: { seat: 'Lordsburg', metro: 'hidalgo-metro-nm' },
  catron: { seat: 'Reserve', metro: 'catron-metro-nm' },
  union: { seat: 'Clayton', metro: 'union-metro-nm' },
  'de-baca': { seat: 'Fort Sumner', metro: 'de-baca-metro-nm' },
  harding: { seat: 'Roy', metro: 'harding-metro-nm' },
};

export function applyNewMexicoCountyOverrides(county: LocalCounty): LocalCounty {
  
if (county.stateSlug !== 'new-mexico') return county;
  const override = newMexicoCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}