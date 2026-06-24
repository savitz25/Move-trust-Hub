import type { LocalCounty } from '@/lib/local-movers/types';

const CT = 'connecticut';
const CODE = 'CT';

/** Connecticut counties — hand-curated geography (8 counties, state complete) */
export const connecticutCounties: LocalCounty[] = [
  { slug: 'fairfield', name: 'Fairfield', stateCode: CODE, stateSlug: CT, metro: 'fairfield-metro-ct', seat: 'Bridgeport' },
  { slug: 'hartford', name: 'Hartford', stateCode: CODE, stateSlug: CT, metro: 'hartford-metro-ct', seat: 'Hartford' },
  { slug: 'litchfield', name: 'Litchfield', stateCode: CODE, stateSlug: CT, metro: 'litchfield-metro-ct', seat: 'Torrington' },
  { slug: 'middlesex', name: 'Middlesex', stateCode: CODE, stateSlug: CT, metro: 'middlesex-metro-ct', seat: 'Middletown' },
  { slug: 'new-haven', name: 'New Haven', stateCode: CODE, stateSlug: CT, metro: 'new-haven-metro-ct', seat: 'New Haven' },
  { slug: 'new-london', name: 'New London', stateCode: CODE, stateSlug: CT, metro: 'new-london-metro-ct', seat: 'New London' },
  { slug: 'tolland', name: 'Tolland', stateCode: CODE, stateSlug: CT, metro: 'tolland-metro-ct', seat: 'Rockville' },
  { slug: 'windham', name: 'Windham', stateCode: CODE, stateSlug: CT, metro: 'windham-metro-ct', seat: 'Willimantic' },
];