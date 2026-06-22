import type { LocalCounty } from '@/lib/local-movers/types';

const NJ = 'new-jersey';
const CODE = 'NJ';

/** All 21 New Jersey counties — slug matches URL segment */
export const newJerseyCounties: LocalCounty[] = [
  { slug: 'atlantic', name: 'Atlantic', stateCode: CODE, stateSlug: NJ, metro: 'jersey-shore-nj', seat: 'Mays Landing' },
  { slug: 'bergen', name: 'Bergen', stateCode: CODE, stateSlug: NJ, metro: 'nyc-metro-nj', seat: 'Hackensack' },
  { slug: 'burlington', name: 'Burlington', stateCode: CODE, stateSlug: NJ, metro: 'south-jersey-nj', seat: 'Mount Holly' },
  { slug: 'camden', name: 'Camden', stateCode: CODE, stateSlug: NJ, metro: 'south-jersey-nj', seat: 'Camden' },
  { slug: 'cape-may', name: 'Cape May', stateCode: CODE, stateSlug: NJ, metro: 'jersey-shore-nj', seat: 'Cape May Court House' },
  { slug: 'cumberland', name: 'Cumberland', stateCode: CODE, stateSlug: NJ, metro: 'south-jersey-nj', seat: 'Bridgeton' },
  { slug: 'essex', name: 'Essex', stateCode: CODE, stateSlug: NJ, metro: 'nyc-metro-nj', seat: 'Newark' },
  { slug: 'gloucester', name: 'Gloucester', stateCode: CODE, stateSlug: NJ, metro: 'south-jersey-nj', seat: 'Woodbury' },
  { slug: 'hudson', name: 'Hudson', stateCode: CODE, stateSlug: NJ, metro: 'nyc-metro-nj', seat: 'Jersey City' },
  { slug: 'hunterdon', name: 'Hunterdon', stateCode: CODE, stateSlug: NJ, metro: 'suburban-nj', seat: 'Flemington' },
  { slug: 'mercer', name: 'Mercer', stateCode: CODE, stateSlug: NJ, metro: 'suburban-nj', seat: 'Trenton' },
  { slug: 'middlesex', name: 'Middlesex', stateCode: CODE, stateSlug: NJ, metro: 'nyc-metro-nj', seat: 'New Brunswick' },
  { slug: 'monmouth', name: 'Monmouth', stateCode: CODE, stateSlug: NJ, metro: 'jersey-shore-nj', seat: 'Freehold' },
  { slug: 'morris', name: 'Morris', stateCode: CODE, stateSlug: NJ, metro: 'suburban-nj', seat: 'Morristown' },
  { slug: 'ocean', name: 'Ocean', stateCode: CODE, stateSlug: NJ, metro: 'jersey-shore-nj', seat: 'Toms River' },
  { slug: 'passaic', name: 'Passaic', stateCode: CODE, stateSlug: NJ, metro: 'nyc-metro-nj', seat: 'Paterson' },
  { slug: 'salem', name: 'Salem', stateCode: CODE, stateSlug: NJ, metro: 'south-jersey-nj', seat: 'Salem' },
  { slug: 'somerset', name: 'Somerset', stateCode: CODE, stateSlug: NJ, metro: 'suburban-nj', seat: 'Somerville' },
  { slug: 'sussex', name: 'Sussex', stateCode: CODE, stateSlug: NJ, metro: 'northwest-nj', seat: 'Newton' },
  { slug: 'union', name: 'Union', stateCode: CODE, stateSlug: NJ, metro: 'nyc-metro-nj', seat: 'Elizabeth' },
  { slug: 'warren', name: 'Warren', stateCode: CODE, stateSlug: NJ, metro: 'northwest-nj', seat: 'Belvidere' },
];