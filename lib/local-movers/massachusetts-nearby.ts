import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Massachusetts batch 1 counties plus cross-border NH, RI, and CT metro guides */
const MA_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  middlesex: [
    { slug: 'suffolk', name: 'Suffolk', seat: 'Boston', href: '/local-movers/massachusetts/suffolk', displayLabel: 'Suffolk County, MA' },
    { slug: 'essex', name: 'Essex', seat: 'Salem', href: '/local-movers/massachusetts/essex', displayLabel: 'Essex County, MA' },
    { slug: 'worcester', name: 'Worcester', seat: 'Worcester', href: '/local-movers/massachusetts/worcester', displayLabel: 'Worcester County, MA' },
    { slug: 'norfolk', name: 'Norfolk', seat: 'Dedham', href: '/local-movers/massachusetts/norfolk', displayLabel: 'Norfolk County, MA' },
    { slug: 'hillsborough', name: 'Hillsborough', seat: 'Manchester', href: '/local-movers/new-hampshire/hillsborough', displayLabel: 'Hillsborough County, NH' },
    { slug: 'rockingham', name: 'Rockingham', seat: 'Exeter', href: '/local-movers/new-hampshire/rockingham', displayLabel: 'Rockingham County, NH' },
  ],
  worcester: [
    { slug: 'middlesex', name: 'Middlesex', seat: 'Cambridge', href: '/local-movers/massachusetts/middlesex', displayLabel: 'Middlesex County, MA' },
    { slug: 'norfolk', name: 'Norfolk', seat: 'Dedham', href: '/local-movers/massachusetts/norfolk', displayLabel: 'Norfolk County, MA' },
    { slug: 'hampden', name: 'Hampden', seat: 'Springfield', href: '/local-movers/massachusetts/hampden', displayLabel: 'Hampden County, MA' },
    { slug: 'hampshire', name: 'Hampshire', seat: 'Northampton', href: '/local-movers/massachusetts/hampshire', displayLabel: 'Hampshire County, MA' },
    { slug: 'franklin', name: 'Franklin', seat: 'Greenfield', href: '/local-movers/massachusetts/franklin', displayLabel: 'Franklin County, MA' },
    { slug: 'tolland', name: 'Tolland', seat: 'Rockville', href: '/local-movers/connecticut/tolland', displayLabel: 'Tolland County, CT' },
  ],
  essex: [
    { slug: 'middlesex', name: 'Middlesex', seat: 'Cambridge', href: '/local-movers/massachusetts/middlesex', displayLabel: 'Middlesex County, MA' },
    { slug: 'suffolk', name: 'Suffolk', seat: 'Boston', href: '/local-movers/massachusetts/suffolk', displayLabel: 'Suffolk County, MA' },
    { slug: 'norfolk', name: 'Norfolk', seat: 'Dedham', href: '/local-movers/massachusetts/norfolk', displayLabel: 'Norfolk County, MA' },
    { slug: 'rockingham', name: 'Rockingham', seat: 'Exeter', href: '/local-movers/new-hampshire/rockingham', displayLabel: 'Rockingham County, NH' },
    { slug: 'hillsborough', name: 'Hillsborough', seat: 'Manchester', href: '/local-movers/new-hampshire/hillsborough', displayLabel: 'Hillsborough County, NH' },
    { slug: 'strafford', name: 'Strafford', seat: 'Dover', href: '/local-movers/new-hampshire/strafford', displayLabel: 'Strafford County, NH' },
  ],
};

export function getMassachusettsNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return MA_COUNTY_NEIGHBORS[countySlug] ?? [];
}