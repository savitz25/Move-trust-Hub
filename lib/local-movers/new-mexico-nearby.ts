import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** New Mexico curated county corridor links — batch 1 */
const NM_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  bernalillo: [
    { slug: 'sandoval', name: 'Sandoval', seat: 'Bernalillo', href: '/local-movers/new-mexico/sandoval', displayLabel: 'Sandoval County, NM' },
    { slug: 'valencia', name: 'Valencia', seat: 'Los Lunas', href: '/local-movers/new-mexico/valencia', displayLabel: 'Valencia County, NM' },
    { slug: 'santa-fe', name: 'Santa Fe', seat: 'Santa Fe', href: '/local-movers/new-mexico/santa-fe', displayLabel: 'Santa Fe County, NM' },
    { slug: 'cibola', name: 'Cibola', seat: 'Grants', href: '/local-movers/new-mexico/cibola', displayLabel: 'Cibola County, NM' },
    { slug: 'torrance', name: 'Torrance', seat: 'Estancia', href: '/local-movers/new-mexico/torrance', displayLabel: 'Torrance County, NM' },
  ],
  'doa-ana': [
    { slug: 'otero', name: 'Otero', seat: 'Alamogordo', href: '/local-movers/new-mexico/otero', displayLabel: 'Otero County, NM' },
    { slug: 'luna', name: 'Luna', seat: 'Deming', href: '/local-movers/new-mexico/luna', displayLabel: 'Luna County, NM' },
    { slug: 'bernalillo', name: 'Bernalillo', seat: 'Albuquerque', href: '/local-movers/new-mexico/bernalillo', displayLabel: 'Bernalillo County, NM' },
    { slug: 'el-paso', name: 'El Paso', seat: 'El Paso', href: '/local-movers/texas/el-paso', displayLabel: 'El Paso County, TX' },
    { slug: 'pima', name: 'Pima', seat: 'Tucson', href: '/local-movers/arizona/pima', displayLabel: 'Pima County, AZ' },
  ],
  sandoval: [
    { slug: 'bernalillo', name: 'Bernalillo', seat: 'Albuquerque', href: '/local-movers/new-mexico/bernalillo', displayLabel: 'Bernalillo County, NM' },
    { slug: 'santa-fe', name: 'Santa Fe', seat: 'Santa Fe', href: '/local-movers/new-mexico/santa-fe', displayLabel: 'Santa Fe County, NM' },
    { slug: 'rio-arriba', name: 'Rio Arriba', seat: 'Tierra Amarilla', href: '/local-movers/new-mexico/rio-arriba', displayLabel: 'Rio Arriba County, NM' },
    { slug: 'mckinley', name: 'McKinley', seat: 'Gallup', href: '/local-movers/new-mexico/mckinley', displayLabel: 'McKinley County, NM' },
    { slug: 'cibola', name: 'Cibola', seat: 'Grants', href: '/local-movers/new-mexico/cibola', displayLabel: 'Cibola County, NM' },
  ],
  'santa-fe': [
    { slug: 'sandoval', name: 'Sandoval', seat: 'Bernalillo', href: '/local-movers/new-mexico/sandoval', displayLabel: 'Sandoval County, NM' },
    { slug: 'bernalillo', name: 'Bernalillo', seat: 'Albuquerque', href: '/local-movers/new-mexico/bernalillo', displayLabel: 'Bernalillo County, NM' },
    { slug: 'los-alamos', name: 'Los Alamos', seat: 'Los Alamos', href: '/local-movers/new-mexico/los-alamos', displayLabel: 'Los Alamos County, NM' },
    { slug: 'san-miguel', name: 'San Miguel', seat: 'Las Vegas', href: '/local-movers/new-mexico/san-miguel', displayLabel: 'San Miguel County, NM' },
    { slug: 'rio-arriba', name: 'Rio Arriba', seat: 'Tierra Amarilla', href: '/local-movers/new-mexico/rio-arriba', displayLabel: 'Rio Arriba County, NM' },
  ],
  'san-juan': [
    { slug: 'mckinley', name: 'McKinley', seat: 'Gallup', href: '/local-movers/new-mexico/mckinley', displayLabel: 'McKinley County, NM' },
    { slug: 'rio-arriba', name: 'Rio Arriba', seat: 'Tierra Amarilla', href: '/local-movers/new-mexico/rio-arriba', displayLabel: 'Rio Arriba County, NM' },
    { slug: 'cibola', name: 'Cibola', seat: 'Grants', href: '/local-movers/new-mexico/cibola', displayLabel: 'Cibola County, NM' },
    { slug: 'san-juan', name: 'San Juan', seat: 'Monticello', href: '/local-movers/utah/san-juan', displayLabel: 'San Juan County, UT' },
    { slug: 'apache', name: 'Apache', seat: 'St. Johns', href: '/local-movers/arizona/apache', displayLabel: 'Apache County, AZ' },
  ],
  valencia: [
    { slug: 'bernalillo', name: 'Bernalillo', seat: 'Albuquerque', href: '/local-movers/new-mexico/bernalillo', displayLabel: 'Bernalillo County, NM' },
    { slug: 'socorro', name: 'Socorro', seat: 'Socorro', href: '/local-movers/new-mexico/socorro', displayLabel: 'Socorro County, NM' },
    { slug: 'torrance', name: 'Torrance', seat: 'Estancia', href: '/local-movers/new-mexico/torrance', displayLabel: 'Torrance County, NM' },
    { slug: 'cibola', name: 'Cibola', seat: 'Grants', href: '/local-movers/new-mexico/cibola', displayLabel: 'Cibola County, NM' },
    { slug: 'doa-ana', name: 'Doña Ana', seat: 'Las Cruces', href: '/local-movers/new-mexico/doa-ana', displayLabel: 'Doña Ana County, NM' },
  ],
  lea: [
    { slug: 'eddy', name: 'Eddy', seat: 'Carlsbad', href: '/local-movers/new-mexico/eddy', displayLabel: 'Eddy County, NM' },
    { slug: 'chaves', name: 'Chaves', seat: 'Roswell', href: '/local-movers/new-mexico/chaves', displayLabel: 'Chaves County, NM' },
    { slug: 'curry', name: 'Curry', seat: 'Clovis', href: '/local-movers/new-mexico/curry', displayLabel: 'Curry County, NM' },
    { slug: 'roosevelt', name: 'Roosevelt', seat: 'Portales', href: '/local-movers/new-mexico/roosevelt', displayLabel: 'Roosevelt County, NM' },
    { slug: 'andrews', name: 'Andrews', seat: 'Andrews', href: '/local-movers/texas/andrews', displayLabel: 'Andrews County, TX' },
  ],
  otero: [
    { slug: 'doa-ana', name: 'Doña Ana', seat: 'Las Cruces', href: '/local-movers/new-mexico/doa-ana', displayLabel: 'Doña Ana County, NM' },
    { slug: 'chaves', name: 'Chaves', seat: 'Roswell', href: '/local-movers/new-mexico/chaves', displayLabel: 'Chaves County, NM' },
    { slug: 'lincoln', name: 'Lincoln', seat: 'Carrizozo', href: '/local-movers/new-mexico/lincoln', displayLabel: 'Lincoln County, NM' },
    { slug: 'el-paso', name: 'El Paso', seat: 'El Paso', href: '/local-movers/texas/el-paso', displayLabel: 'El Paso County, TX' },
    { slug: 'cochise', name: 'Cochise', seat: 'Bisbee', href: '/local-movers/arizona/cochise', displayLabel: 'Cochise County, AZ' },
  ],
  mckinley: [
    { slug: 'cibola', name: 'Cibola', seat: 'Grants', href: '/local-movers/new-mexico/cibola', displayLabel: 'Cibola County, NM' },
    { slug: 'san-juan', name: 'San Juan', seat: 'Aztec', href: '/local-movers/new-mexico/san-juan', displayLabel: 'San Juan County, NM' },
    { slug: 'sandoval', name: 'Sandoval', seat: 'Bernalillo', href: '/local-movers/new-mexico/sandoval', displayLabel: 'Sandoval County, NM' },
    { slug: 'apache', name: 'Apache', seat: 'St. Johns', href: '/local-movers/arizona/apache', displayLabel: 'Apache County, AZ' },
    { slug: 'navajo', name: 'Navajo', seat: 'Holbrook', href: '/local-movers/arizona/navajo', displayLabel: 'Navajo County, AZ' },
  ],
  eddy: [
    { slug: 'lea', name: 'Lea', seat: 'Lovington', href: '/local-movers/new-mexico/lea', displayLabel: 'Lea County, NM' },
    { slug: 'chaves', name: 'Chaves', seat: 'Roswell', href: '/local-movers/new-mexico/chaves', displayLabel: 'Chaves County, NM' },
    { slug: 'otero', name: 'Otero', seat: 'Alamogordo', href: '/local-movers/new-mexico/otero', displayLabel: 'Otero County, NM' },
    { slug: 'culberson', name: 'Culberson', seat: 'Van Horn', href: '/local-movers/texas/culberson', displayLabel: 'Culberson County, TX' },
    { slug: 'reeves', name: 'Reeves', seat: 'Pecos', href: '/local-movers/texas/reeves', displayLabel: 'Reeves County, TX' },
  ],
  chaves: [
    { slug: 'otero', name: 'Otero', seat: 'Alamogordo', href: '/local-movers/new-mexico/otero', displayLabel: 'Otero County, NM' },
    { slug: 'lea', name: 'Lea', seat: 'Lovington', href: '/local-movers/new-mexico/lea', displayLabel: 'Lea County, NM' },
    { slug: 'eddy', name: 'Eddy', seat: 'Carlsbad', href: '/local-movers/new-mexico/eddy', displayLabel: 'Eddy County, NM' },
    { slug: 'lincoln', name: 'Lincoln', seat: 'Carrizozo', href: '/local-movers/new-mexico/lincoln', displayLabel: 'Lincoln County, NM' },
    { slug: 'roosevelt', name: 'Roosevelt', seat: 'Portales', href: '/local-movers/new-mexico/roosevelt', displayLabel: 'Roosevelt County, NM' },
  ],
};

export function getNewMexicoNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return NM_COUNTY_NEIGHBORS[countySlug] ?? [];
}