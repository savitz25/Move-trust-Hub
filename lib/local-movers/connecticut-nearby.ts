import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Connecticut counties plus cross-border NY, MA, and RI metro guides */
const CT_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  fairfield: [
    { slug: 'new-haven', name: 'New Haven', seat: 'New Haven', href: '/local-movers/connecticut/new-haven', displayLabel: 'New Haven County, CT' },
    { slug: 'litchfield', name: 'Litchfield', seat: 'Torrington', href: '/local-movers/connecticut/litchfield', displayLabel: 'Litchfield County, CT' },
    { slug: 'westchester', name: 'Westchester', seat: 'White Plains', href: '/local-movers/new-york/westchester', displayLabel: 'Westchester County, NY' },
    { slug: 'putnam', name: 'Putnam', seat: 'Carmel', href: '/local-movers/new-york/putnam', displayLabel: 'Putnam County, NY' },
    { slug: 'new-york', name: 'New York', seat: 'New York', href: '/local-movers/new-york/new-york', displayLabel: 'New York County, NY' },
    { slug: 'bronx', name: 'Bronx', seat: 'Bronx', href: '/local-movers/new-york/bronx', displayLabel: 'Bronx County, NY' },
  ],
  hartford: [
    { slug: 'tolland', name: 'Tolland', seat: 'Rockville', href: '/local-movers/connecticut/tolland', displayLabel: 'Tolland County, CT' },
    { slug: 'middlesex', name: 'Middlesex', seat: 'Middletown', href: '/local-movers/connecticut/middlesex', displayLabel: 'Middlesex County, CT' },
    { slug: 'litchfield', name: 'Litchfield', seat: 'Torrington', href: '/local-movers/connecticut/litchfield', displayLabel: 'Litchfield County, CT' },
    { slug: 'new-haven', name: 'New Haven', seat: 'New Haven', href: '/local-movers/connecticut/new-haven', displayLabel: 'New Haven County, CT' },
    { slug: 'hampden', name: 'Hampden', seat: 'Springfield', href: '/local-movers/massachusetts/hampden', displayLabel: 'Hampden County, MA' },
    { slug: 'windham', name: 'Windham', seat: 'Willimantic', href: '/local-movers/connecticut/windham', displayLabel: 'Windham County, CT' },
  ],
  'new-haven': [
    { slug: 'fairfield', name: 'Fairfield', seat: 'Bridgeport', href: '/local-movers/connecticut/fairfield', displayLabel: 'Fairfield County, CT' },
    { slug: 'hartford', name: 'Hartford', seat: 'Hartford', href: '/local-movers/connecticut/hartford', displayLabel: 'Hartford County, CT' },
    { slug: 'middlesex', name: 'Middlesex', seat: 'Middletown', href: '/local-movers/connecticut/middlesex', displayLabel: 'Middlesex County, CT' },
    { slug: 'litchfield', name: 'Litchfield', seat: 'Torrington', href: '/local-movers/connecticut/litchfield', displayLabel: 'Litchfield County, CT' },
    { slug: 'new-london', name: 'New London', seat: 'New London', href: '/local-movers/connecticut/new-london', displayLabel: 'New London County, CT' },
    { slug: 'westchester', name: 'Westchester', seat: 'White Plains', href: '/local-movers/new-york/westchester', displayLabel: 'Westchester County, NY' },
  ],
  litchfield: [
    { slug: 'fairfield', name: 'Fairfield', seat: 'Bridgeport', href: '/local-movers/connecticut/fairfield', displayLabel: 'Fairfield County, CT' },
    { slug: 'hartford', name: 'Hartford', seat: 'Hartford', href: '/local-movers/connecticut/hartford', displayLabel: 'Hartford County, CT' },
    { slug: 'new-haven', name: 'New Haven', seat: 'New Haven', href: '/local-movers/connecticut/new-haven', displayLabel: 'New Haven County, CT' },
    { slug: 'berkshire', name: 'Berkshire', seat: 'Pittsfield', href: '/local-movers/massachusetts/berkshire', displayLabel: 'Berkshire County, MA' },
    { slug: 'dutchess', name: 'Dutchess', seat: 'Poughkeepsie', href: '/local-movers/new-york/dutchess', displayLabel: 'Dutchess County, NY' },
    { slug: 'putnam', name: 'Putnam', seat: 'Carmel', href: '/local-movers/new-york/putnam', displayLabel: 'Putnam County, NY' },
  ],
  middlesex: [
    { slug: 'hartford', name: 'Hartford', seat: 'Hartford', href: '/local-movers/connecticut/hartford', displayLabel: 'Hartford County, CT' },
    { slug: 'new-haven', name: 'New Haven', seat: 'New Haven', href: '/local-movers/connecticut/new-haven', displayLabel: 'New Haven County, CT' },
    { slug: 'new-london', name: 'New London', seat: 'New London', href: '/local-movers/connecticut/new-london', displayLabel: 'New London County, CT' },
    { slug: 'tolland', name: 'Tolland', seat: 'Rockville', href: '/local-movers/connecticut/tolland', displayLabel: 'Tolland County, CT' },
    { slug: 'windham', name: 'Windham', seat: 'Willimantic', href: '/local-movers/connecticut/windham', displayLabel: 'Windham County, CT' },
    { slug: 'hampden', name: 'Hampden', seat: 'Springfield', href: '/local-movers/massachusetts/hampden', displayLabel: 'Hampden County, MA' },
  ],
  'new-london': [
    { slug: 'middlesex', name: 'Middlesex', seat: 'Middletown', href: '/local-movers/connecticut/middlesex', displayLabel: 'Middlesex County, CT' },
    { slug: 'new-haven', name: 'New Haven', seat: 'New Haven', href: '/local-movers/connecticut/new-haven', displayLabel: 'New Haven County, CT' },
    { slug: 'windham', name: 'Windham', seat: 'Willimantic', href: '/local-movers/connecticut/windham', displayLabel: 'Windham County, CT' },
    { slug: 'kent', name: 'Kent', seat: 'East Greenwich', href: '/local-movers/rhode-island/kent', displayLabel: 'Kent County, RI' },
    { slug: 'washington', name: 'Washington', seat: 'South Kingstown', href: '/local-movers/rhode-island/washington', displayLabel: 'Washington County, RI' },
    { slug: 'suffolk', name: 'Suffolk', seat: 'Riverhead', href: '/local-movers/new-york/suffolk', displayLabel: 'Suffolk County, NY' },
  ],
  tolland: [
    { slug: 'hartford', name: 'Hartford', seat: 'Hartford', href: '/local-movers/connecticut/hartford', displayLabel: 'Hartford County, CT' },
    { slug: 'windham', name: 'Windham', seat: 'Willimantic', href: '/local-movers/connecticut/windham', displayLabel: 'Windham County, CT' },
    { slug: 'middlesex', name: 'Middlesex', seat: 'Middletown', href: '/local-movers/connecticut/middlesex', displayLabel: 'Middlesex County, CT' },
    { slug: 'hampden', name: 'Hampden', seat: 'Springfield', href: '/local-movers/massachusetts/hampden', displayLabel: 'Hampden County, MA' },
    { slug: 'worcester', name: 'Worcester', seat: 'Worcester', href: '/local-movers/massachusetts/worcester', displayLabel: 'Worcester County, MA' },
    { slug: 'new-haven', name: 'New Haven', seat: 'New Haven', href: '/local-movers/connecticut/new-haven', displayLabel: 'New Haven County, CT' },
  ],
  windham: [
    { slug: 'tolland', name: 'Tolland', seat: 'Rockville', href: '/local-movers/connecticut/tolland', displayLabel: 'Tolland County, CT' },
    { slug: 'hartford', name: 'Hartford', seat: 'Hartford', href: '/local-movers/connecticut/hartford', displayLabel: 'Hartford County, CT' },
    { slug: 'new-london', name: 'New London', seat: 'New London', href: '/local-movers/connecticut/new-london', displayLabel: 'New London County, CT' },
    { slug: 'middlesex', name: 'Middlesex', seat: 'Middletown', href: '/local-movers/connecticut/middlesex', displayLabel: 'Middlesex County, CT' },
    { slug: 'worcester', name: 'Worcester', seat: 'Worcester', href: '/local-movers/massachusetts/worcester', displayLabel: 'Worcester County, MA' },
    { slug: 'kent', name: 'Kent', seat: 'East Greenwich', href: '/local-movers/rhode-island/kent', displayLabel: 'Kent County, RI' },
  ],
};

export function getConnecticutNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return CT_COUNTY_NEIGHBORS[countySlug] ?? [];
}