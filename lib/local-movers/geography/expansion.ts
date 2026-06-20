import type { LocalCounty } from '@/lib/local-movers/types';

/** Sample counties for additional states — demonstrates scalable expansion beyond Florida */
export const expansionCounties: LocalCounty[] = [
  // California
  { slug: 'los-angeles', name: 'Los Angeles', stateCode: 'CA', stateSlug: 'california', metro: 'greater-la', seat: 'Los Angeles' },
  { slug: 'orange', name: 'Orange', stateCode: 'CA', stateSlug: 'california', metro: 'greater-la', seat: 'Santa Ana' },
  { slug: 'san-diego', name: 'San Diego', stateCode: 'CA', stateSlug: 'california', metro: 'san-diego-metro', seat: 'San Diego' },
  { slug: 'san-francisco', name: 'San Francisco', stateCode: 'CA', stateSlug: 'california', metro: 'bay-area', seat: 'San Francisco' },
  { slug: 'alameda', name: 'Alameda', stateCode: 'CA', stateSlug: 'california', metro: 'bay-area', seat: 'Oakland' },
  // Texas
  { slug: 'harris', name: 'Harris', stateCode: 'TX', stateSlug: 'texas', metro: 'greater-houston', seat: 'Houston' },
  { slug: 'dallas', name: 'Dallas', stateCode: 'TX', stateSlug: 'texas', metro: 'dfw-metro', seat: 'Dallas' },
  { slug: 'travis', name: 'Travis', stateCode: 'TX', stateSlug: 'texas', metro: 'austin-metro', seat: 'Austin' },
  { slug: 'bexar', name: 'Bexar', stateCode: 'TX', stateSlug: 'texas', metro: 'san-antonio-metro', seat: 'San Antonio' },
  { slug: 'tarrant', name: 'Tarrant', stateCode: 'TX', stateSlug: 'texas', metro: 'dfw-metro', seat: 'Fort Worth' },
  // New York
  { slug: 'new-york', name: 'New York', stateCode: 'NY', stateSlug: 'new-york', metro: 'nyc-metro', seat: 'Manhattan' },
  { slug: 'kings', name: 'Kings', stateCode: 'NY', stateSlug: 'new-york', metro: 'nyc-metro', seat: 'Brooklyn' },
  { slug: 'queens', name: 'Queens', stateCode: 'NY', stateSlug: 'new-york', metro: 'nyc-metro', seat: 'Queens' },
  { slug: 'bronx', name: 'Bronx', stateCode: 'NY', stateSlug: 'new-york', metro: 'nyc-metro', seat: 'Bronx' },
  { slug: 'nassau', name: 'Nassau', stateCode: 'NY', stateSlug: 'new-york', metro: 'long-island', seat: 'Mineola' },
  { slug: 'suffolk', name: 'Suffolk', stateCode: 'NY', stateSlug: 'new-york', metro: 'long-island', seat: 'Riverhead' },
];