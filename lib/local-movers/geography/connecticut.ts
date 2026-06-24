import type { LocalCounty } from '@/lib/local-movers/types';

const CT = 'connecticut';
const CODE = 'CT';

/** Connecticut planning regions — county-equivalent jurisdictions (9 regions, state complete) */
export const connecticutCounties: LocalCounty[] = [
  {
    slug: 'capitol',
    name: 'Capitol Planning Region',
    stateCode: CODE,
    stateSlug: CT,
    metro: 'capitol-metro-ct',
    seat: 'Hartford',
  },
  {
    slug: 'western-connecticut',
    name: 'Western Connecticut Planning Region',
    stateCode: CODE,
    stateSlug: CT,
    metro: 'western-connecticut-metro-ct',
    seat: 'Danbury',
  },
  {
    slug: 'south-central-connecticut',
    name: 'South Central Connecticut Planning Region',
    stateCode: CODE,
    stateSlug: CT,
    metro: 'south-central-connecticut-metro-ct',
    seat: 'New Haven',
  },
  {
    slug: 'naugatuck-valley',
    name: 'Naugatuck Valley Planning Region',
    stateCode: CODE,
    stateSlug: CT,
    metro: 'naugatuck-valley-metro-ct',
    seat: 'Waterbury',
  },
  {
    slug: 'greater-bridgeport',
    name: 'Greater Bridgeport Planning Region',
    stateCode: CODE,
    stateSlug: CT,
    metro: 'greater-bridgeport-metro-ct',
    seat: 'Bridgeport',
  },
  {
    slug: 'southeastern-connecticut',
    name: 'Southeastern Connecticut Planning Region',
    stateCode: CODE,
    stateSlug: CT,
    metro: 'southeastern-connecticut-metro-ct',
    seat: 'New London',
  },
  {
    slug: 'lower-connecticut-river-valley',
    name: 'Lower Connecticut River Valley Planning Region',
    stateCode: CODE,
    stateSlug: CT,
    metro: 'lower-connecticut-river-valley-metro-ct',
    seat: 'Middletown',
  },
  {
    slug: 'northwest-hills',
    name: 'Northwest Hills Planning Region',
    stateCode: CODE,
    stateSlug: CT,
    metro: 'northwest-hills-metro-ct',
    seat: 'Torrington',
  },
  {
    slug: 'northeastern-connecticut',
    name: 'Northeastern Connecticut Planning Region',
    stateCode: CODE,
    stateSlug: CT,
    metro: 'northeastern-connecticut-metro-ct',
    seat: 'Putnam',
  },
];