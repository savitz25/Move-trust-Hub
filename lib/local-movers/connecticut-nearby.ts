import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Connecticut planning regions plus cross-border NY, MA, and RI metro guides */
const CT_REGION_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  capitol: [
    { slug: 'south-central-connecticut', name: 'South Central Connecticut', seat: 'New Haven', href: '/local-movers/connecticut/south-central-connecticut', displayLabel: 'South Central CT Planning Region' },
    { slug: 'naugatuck-valley', name: 'Naugatuck Valley', seat: 'Waterbury', href: '/local-movers/connecticut/naugatuck-valley', displayLabel: 'Naugatuck Valley Planning Region' },
    { slug: 'lower-connecticut-river-valley', name: 'Lower Connecticut River Valley', seat: 'Middletown', href: '/local-movers/connecticut/lower-connecticut-river-valley', displayLabel: 'Lower CT River Valley Planning Region' },
    { slug: 'northwest-hills', name: 'Northwest Hills', seat: 'Torrington', href: '/local-movers/connecticut/northwest-hills', displayLabel: 'Northwest Hills Planning Region' },
    { slug: 'hampden', name: 'Hampden', seat: 'Springfield', href: '/local-movers/massachusetts/hampden', displayLabel: 'Hampden County, MA' },
    { slug: 'northeastern-connecticut', name: 'Northeastern Connecticut', seat: 'Putnam', href: '/local-movers/connecticut/northeastern-connecticut', displayLabel: 'Northeastern CT Planning Region' },
  ],
  'western-connecticut': [
    { slug: 'greater-bridgeport', name: 'Greater Bridgeport', seat: 'Bridgeport', href: '/local-movers/connecticut/greater-bridgeport', displayLabel: 'Greater Bridgeport Planning Region' },
    { slug: 'northwest-hills', name: 'Northwest Hills', seat: 'Torrington', href: '/local-movers/connecticut/northwest-hills', displayLabel: 'Northwest Hills Planning Region' },
    { slug: 'capitol', name: 'Capitol', seat: 'Hartford', href: '/local-movers/connecticut/capitol', displayLabel: 'Capitol Planning Region' },
    { slug: 'westchester', name: 'Westchester', seat: 'White Plains', href: '/local-movers/new-york/westchester', displayLabel: 'Westchester County, NY' },
    { slug: 'putnam', name: 'Putnam', seat: 'Carmel', href: '/local-movers/new-york/putnam', displayLabel: 'Putnam County, NY' },
    { slug: 'fairfield', name: 'Fairfield', seat: 'Bridgeport', href: '/local-movers/connecticut/greater-bridgeport', displayLabel: 'Greater Bridgeport Planning Region, CT' },
  ],
  'south-central-connecticut': [
    { slug: 'capitol', name: 'Capitol', seat: 'Hartford', href: '/local-movers/connecticut/capitol', displayLabel: 'Capitol Planning Region' },
    { slug: 'naugatuck-valley', name: 'Naugatuck Valley', seat: 'Waterbury', href: '/local-movers/connecticut/naugatuck-valley', displayLabel: 'Naugatuck Valley Planning Region' },
    { slug: 'lower-connecticut-river-valley', name: 'Lower Connecticut River Valley', seat: 'Middletown', href: '/local-movers/connecticut/lower-connecticut-river-valley', displayLabel: 'Lower CT River Valley Planning Region' },
    { slug: 'greater-bridgeport', name: 'Greater Bridgeport', seat: 'Bridgeport', href: '/local-movers/connecticut/greater-bridgeport', displayLabel: 'Greater Bridgeport Planning Region' },
    { slug: 'new-haven', name: 'New Haven', seat: 'New Haven', href: '/local-movers/connecticut/south-central-connecticut', displayLabel: 'South Central CT Planning Region' },
    { slug: 'middlesex', name: 'Middlesex', seat: 'Middletown', href: '/local-movers/connecticut/lower-connecticut-river-valley', displayLabel: 'Lower CT River Valley Planning Region, CT' },
  ],
  'naugatuck-valley': [
    { slug: 'capitol', name: 'Capitol', seat: 'Hartford', href: '/local-movers/connecticut/capitol', displayLabel: 'Capitol Planning Region' },
    { slug: 'south-central-connecticut', name: 'South Central Connecticut', seat: 'New Haven', href: '/local-movers/connecticut/south-central-connecticut', displayLabel: 'South Central CT Planning Region' },
    { slug: 'northwest-hills', name: 'Northwest Hills', seat: 'Torrington', href: '/local-movers/connecticut/northwest-hills', displayLabel: 'Northwest Hills Planning Region' },
    { slug: 'western-connecticut', name: 'Western Connecticut', seat: 'Danbury', href: '/local-movers/connecticut/western-connecticut', displayLabel: 'Western Connecticut Planning Region' },
    { slug: 'litchfield', name: 'Litchfield', seat: 'Torrington', href: '/local-movers/connecticut/northwest-hills', displayLabel: 'Northwest Hills Planning Region, CT' },
    { slug: 'new-haven', name: 'New Haven', seat: 'New Haven', href: '/local-movers/connecticut/south-central-connecticut', displayLabel: 'South Central CT Planning Region, CT' },
  ],
  'greater-bridgeport': [
    { slug: 'western-connecticut', name: 'Western Connecticut', seat: 'Danbury', href: '/local-movers/connecticut/western-connecticut', displayLabel: 'Western Connecticut Planning Region' },
    { slug: 'south-central-connecticut', name: 'South Central Connecticut', seat: 'New Haven', href: '/local-movers/connecticut/south-central-connecticut', displayLabel: 'South Central CT Planning Region' },
    { slug: 'fairfield', name: 'Fairfield', seat: 'Bridgeport', href: '/local-movers/connecticut/greater-bridgeport', displayLabel: 'Greater Bridgeport Planning Region, CT' },
    { slug: 'westchester', name: 'Westchester', seat: 'White Plains', href: '/local-movers/new-york/westchester', displayLabel: 'Westchester County, NY' },
    { slug: 'new-york', name: 'New York', seat: 'New York', href: '/local-movers/new-york/new-york', displayLabel: 'New York County, NY' },
    { slug: 'suffolk', name: 'Suffolk', seat: 'Riverhead', href: '/local-movers/new-york/suffolk', displayLabel: 'Suffolk County, NY' },
  ],
  'southeastern-connecticut': [
    { slug: 'south-central-connecticut', name: 'South Central Connecticut', seat: 'New Haven', href: '/local-movers/connecticut/south-central-connecticut', displayLabel: 'South Central CT Planning Region' },
    { slug: 'lower-connecticut-river-valley', name: 'Lower Connecticut River Valley', seat: 'Middletown', href: '/local-movers/connecticut/lower-connecticut-river-valley', displayLabel: 'Lower CT River Valley Planning Region' },
    { slug: 'northeastern-connecticut', name: 'Northeastern Connecticut', seat: 'Putnam', href: '/local-movers/connecticut/northeastern-connecticut', displayLabel: 'Northeastern CT Planning Region' },
    { slug: 'kent', name: 'Kent', seat: 'East Greenwich', href: '/local-movers/rhode-island/kent', displayLabel: 'Kent County, RI' },
    { slug: 'washington', name: 'Washington', seat: 'South Kingstown', href: '/local-movers/rhode-island/washington', displayLabel: 'Washington County, RI' },
    { slug: 'new-london', name: 'New London', seat: 'New London', href: '/local-movers/connecticut/southeastern-connecticut', displayLabel: 'Southeastern CT Planning Region, CT' },
  ],
  'lower-connecticut-river-valley': [
    { slug: 'capitol', name: 'Capitol', seat: 'Hartford', href: '/local-movers/connecticut/capitol', displayLabel: 'Capitol Planning Region' },
    { slug: 'south-central-connecticut', name: 'South Central Connecticut', seat: 'New Haven', href: '/local-movers/connecticut/south-central-connecticut', displayLabel: 'South Central CT Planning Region' },
    { slug: 'southeastern-connecticut', name: 'Southeastern Connecticut', seat: 'New London', href: '/local-movers/connecticut/southeastern-connecticut', displayLabel: 'Southeastern CT Planning Region' },
    { slug: 'naugatuck-valley', name: 'Naugatuck Valley', seat: 'Waterbury', href: '/local-movers/connecticut/naugatuck-valley', displayLabel: 'Naugatuck Valley Planning Region' },
    { slug: 'middlesex', name: 'Middlesex', seat: 'Middletown', href: '/local-movers/connecticut/lower-connecticut-river-valley', displayLabel: 'Lower CT River Valley Planning Region, CT' },
    { slug: 'new-london', name: 'New London', seat: 'New London', href: '/local-movers/connecticut/southeastern-connecticut', displayLabel: 'Southeastern CT Planning Region, CT' },
  ],
  'northwest-hills': [
    { slug: 'capitol', name: 'Capitol', seat: 'Hartford', href: '/local-movers/connecticut/capitol', displayLabel: 'Capitol Planning Region' },
    { slug: 'western-connecticut', name: 'Western Connecticut', seat: 'Danbury', href: '/local-movers/connecticut/western-connecticut', displayLabel: 'Western Connecticut Planning Region' },
    { slug: 'naugatuck-valley', name: 'Naugatuck Valley', seat: 'Waterbury', href: '/local-movers/connecticut/naugatuck-valley', displayLabel: 'Naugatuck Valley Planning Region' },
    { slug: 'northeastern-connecticut', name: 'Northeastern Connecticut', seat: 'Putnam', href: '/local-movers/connecticut/northeastern-connecticut', displayLabel: 'Northeastern CT Planning Region' },
    { slug: 'berkshire', name: 'Berkshire', seat: 'Pittsfield', href: '/local-movers/massachusetts/berkshire', displayLabel: 'Berkshire County, MA' },
    { slug: 'litchfield', name: 'Litchfield', seat: 'Torrington', href: '/local-movers/connecticut/northwest-hills', displayLabel: 'Northwest Hills Planning Region, CT' },
  ],
  'northeastern-connecticut': [
    { slug: 'northwest-hills', name: 'Northwest Hills', seat: 'Torrington', href: '/local-movers/connecticut/northwest-hills', displayLabel: 'Northwest Hills Planning Region' },
    { slug: 'southeastern-connecticut', name: 'Southeastern Connecticut', seat: 'New London', href: '/local-movers/connecticut/southeastern-connecticut', displayLabel: 'Southeastern CT Planning Region' },
    { slug: 'capitol', name: 'Capitol', seat: 'Hartford', href: '/local-movers/connecticut/capitol', displayLabel: 'Capitol Planning Region' },
    { slug: 'worcester', name: 'Worcester', seat: 'Worcester', href: '/local-movers/massachusetts/worcester', displayLabel: 'Worcester County, MA' },
    { slug: 'kent', name: 'Kent', seat: 'East Greenwich', href: '/local-movers/rhode-island/kent', displayLabel: 'Kent County, RI' },
    { slug: 'windham', name: 'Windham', seat: 'Putnam', href: '/local-movers/connecticut/northeastern-connecticut', displayLabel: 'Northeastern CT Planning Region, CT' },
  ],
};

export function getConnecticutNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return CT_REGION_NEIGHBORS[countySlug] ?? [];
}