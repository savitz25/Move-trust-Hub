import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** New Hampshire counties plus cross-border MA, VT, ME, and RI metro guides */
const NH_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  hillsborough: [
    { slug: 'rockingham', name: 'Rockingham', seat: 'Brentwood', href: '/local-movers/new-hampshire/rockingham', displayLabel: 'Rockingham County, NH' },
    { slug: 'merrimack', name: 'Merrimack', seat: 'Concord', href: '/local-movers/new-hampshire/merrimack', displayLabel: 'Merrimack County, NH' },
    { slug: 'sullivan', name: 'Sullivan', seat: 'Newport', href: '/local-movers/new-hampshire/sullivan', displayLabel: 'Sullivan County, NH' },
    { slug: 'cheshire', name: 'Cheshire', seat: 'Keene', href: '/local-movers/new-hampshire/cheshire', displayLabel: 'Cheshire County, NH' },
    { slug: 'middlesex', name: 'Middlesex', seat: 'Cambridge', href: '/local-movers/massachusetts/middlesex', displayLabel: 'Middlesex County, MA' },
    { slug: 'essex', name: 'Essex', seat: 'Salem', href: '/local-movers/massachusetts/essex', displayLabel: 'Essex County, MA' },
  ],
  rockingham: [
    { slug: 'hillsborough', name: 'Hillsborough', seat: 'Nashua', href: '/local-movers/new-hampshire/hillsborough', displayLabel: 'Hillsborough County, NH' },
    { slug: 'strafford', name: 'Strafford', seat: 'Dover', href: '/local-movers/new-hampshire/strafford', displayLabel: 'Strafford County, NH' },
    { slug: 'carroll', name: 'Carroll', seat: 'Ossipee', href: '/local-movers/new-hampshire/carroll', displayLabel: 'Carroll County, NH' },
    { slug: 'merrimack', name: 'Merrimack', seat: 'Concord', href: '/local-movers/new-hampshire/merrimack', displayLabel: 'Merrimack County, NH' },
    { slug: 'essex', name: 'Essex', seat: 'Salem', href: '/local-movers/massachusetts/essex', displayLabel: 'Essex County, MA' },
    { slug: 'york', name: 'York', seat: 'Alfred', href: '/local-movers/maine/york', displayLabel: 'York County, ME' },
  ],
  merrimack: [
    { slug: 'hillsborough', name: 'Hillsborough', seat: 'Nashua', href: '/local-movers/new-hampshire/hillsborough', displayLabel: 'Hillsborough County, NH' },
    { slug: 'sullivan', name: 'Sullivan', seat: 'Newport', href: '/local-movers/new-hampshire/sullivan', displayLabel: 'Sullivan County, NH' },
    { slug: 'grafton', name: 'Grafton', seat: 'North Haverhill', href: '/local-movers/new-hampshire/grafton', displayLabel: 'Grafton County, NH' },
    { slug: 'belknap', name: 'Belknap', seat: 'Laconia', href: '/local-movers/new-hampshire/belknap', displayLabel: 'Belknap County, NH' },
    { slug: 'strafford', name: 'Strafford', seat: 'Dover', href: '/local-movers/new-hampshire/strafford', displayLabel: 'Strafford County, NH' },
    { slug: 'worcester', name: 'Worcester', seat: 'Worcester', href: '/local-movers/massachusetts/worcester', displayLabel: 'Worcester County, MA' },
  ],
  strafford: [
    { slug: 'rockingham', name: 'Rockingham', seat: 'Brentwood', href: '/local-movers/new-hampshire/rockingham', displayLabel: 'Rockingham County, NH' },
    { slug: 'carroll', name: 'Carroll', seat: 'Ossipee', href: '/local-movers/new-hampshire/carroll', displayLabel: 'Carroll County, NH' },
    { slug: 'belknap', name: 'Belknap', seat: 'Laconia', href: '/local-movers/new-hampshire/belknap', displayLabel: 'Belknap County, NH' },
    { slug: 'merrimack', name: 'Merrimack', seat: 'Concord', href: '/local-movers/new-hampshire/merrimack', displayLabel: 'Merrimack County, NH' },
    { slug: 'york', name: 'York', seat: 'Alfred', href: '/local-movers/maine/york', displayLabel: 'York County, ME' },
    { slug: 'hillsborough', name: 'Hillsborough', seat: 'Nashua', href: '/local-movers/new-hampshire/hillsborough', displayLabel: 'Hillsborough County, NH' },
  ],
  grafton: [
    { slug: 'sullivan', name: 'Sullivan', seat: 'Newport', href: '/local-movers/new-hampshire/sullivan', displayLabel: 'Sullivan County, NH' },
    { slug: 'merrimack', name: 'Merrimack', seat: 'Concord', href: '/local-movers/new-hampshire/merrimack', displayLabel: 'Merrimack County, NH' },
    { slug: 'belknap', name: 'Belknap', seat: 'Laconia', href: '/local-movers/new-hampshire/belknap', displayLabel: 'Belknap County, NH' },
    { slug: 'carroll', name: 'Carroll', seat: 'Ossipee', href: '/local-movers/new-hampshire/carroll', displayLabel: 'Carroll County, NH' },
    { slug: 'coos', name: 'Coos', seat: 'Lancaster', href: '/local-movers/new-hampshire/coos', displayLabel: 'Coos County, NH' },
    { slug: 'windsor', name: 'Windsor', seat: 'Woodstock', href: '/local-movers/vermont/windsor', displayLabel: 'Windsor County, VT' },
  ],
  cheshire: [
    { slug: 'hillsborough', name: 'Hillsborough', seat: 'Nashua', href: '/local-movers/new-hampshire/hillsborough', displayLabel: 'Hillsborough County, NH' },
    { slug: 'sullivan', name: 'Sullivan', seat: 'Newport', href: '/local-movers/new-hampshire/sullivan', displayLabel: 'Sullivan County, NH' },
    { slug: 'windham', name: 'Windham', seat: 'Brattleboro', href: '/local-movers/vermont/windham', displayLabel: 'Windham County, VT' },
    { slug: 'franklin', name: 'Franklin', seat: 'Greenfield', href: '/local-movers/massachusetts/franklin', displayLabel: 'Franklin County, MA' },
    { slug: 'berkshire', name: 'Berkshire', seat: 'Pittsfield', href: '/local-movers/massachusetts/berkshire', displayLabel: 'Berkshire County, MA' },
    { slug: 'worcester', name: 'Worcester', seat: 'Worcester', href: '/local-movers/massachusetts/worcester', displayLabel: 'Worcester County, MA' },
  ],
  belknap: [
    { slug: 'merrimack', name: 'Merrimack', seat: 'Concord', href: '/local-movers/new-hampshire/merrimack', displayLabel: 'Merrimack County, NH' },
    { slug: 'strafford', name: 'Strafford', seat: 'Dover', href: '/local-movers/new-hampshire/strafford', displayLabel: 'Strafford County, NH' },
    { slug: 'carroll', name: 'Carroll', seat: 'Ossipee', href: '/local-movers/new-hampshire/carroll', displayLabel: 'Carroll County, NH' },
    { slug: 'grafton', name: 'Grafton', seat: 'North Haverhill', href: '/local-movers/new-hampshire/grafton', displayLabel: 'Grafton County, NH' },
    { slug: 'hillsborough', name: 'Hillsborough', seat: 'Nashua', href: '/local-movers/new-hampshire/hillsborough', displayLabel: 'Hillsborough County, NH' },
    { slug: 'york', name: 'York', seat: 'Alfred', href: '/local-movers/maine/york', displayLabel: 'York County, ME' },
  ],
  carroll: [
    { slug: 'strafford', name: 'Strafford', seat: 'Dover', href: '/local-movers/new-hampshire/strafford', displayLabel: 'Strafford County, NH' },
    { slug: 'belknap', name: 'Belknap', seat: 'Laconia', href: '/local-movers/new-hampshire/belknap', displayLabel: 'Belknap County, NH' },
    { slug: 'grafton', name: 'Grafton', seat: 'North Haverhill', href: '/local-movers/new-hampshire/grafton', displayLabel: 'Grafton County, NH' },
    { slug: 'coos', name: 'Coos', seat: 'Lancaster', href: '/local-movers/new-hampshire/coos', displayLabel: 'Coos County, NH' },
    { slug: 'rockingham', name: 'Rockingham', seat: 'Brentwood', href: '/local-movers/new-hampshire/rockingham', displayLabel: 'Rockingham County, NH' },
    { slug: 'oxford', name: 'Oxford', seat: 'Paris', href: '/local-movers/maine/oxford', displayLabel: 'Oxford County, ME' },
  ],
  sullivan: [
    { slug: 'cheshire', name: 'Cheshire', seat: 'Keene', href: '/local-movers/new-hampshire/cheshire', displayLabel: 'Cheshire County, NH' },
    { slug: 'hillsborough', name: 'Hillsborough', seat: 'Nashua', href: '/local-movers/new-hampshire/hillsborough', displayLabel: 'Hillsborough County, NH' },
    { slug: 'merrimack', name: 'Merrimack', seat: 'Concord', href: '/local-movers/new-hampshire/merrimack', displayLabel: 'Merrimack County, NH' },
    { slug: 'grafton', name: 'Grafton', seat: 'North Haverhill', href: '/local-movers/new-hampshire/grafton', displayLabel: 'Grafton County, NH' },
    { slug: 'windsor', name: 'Windsor', seat: 'Woodstock', href: '/local-movers/vermont/windsor', displayLabel: 'Windsor County, VT' },
    { slug: 'newport', name: 'Newport', seat: 'Newport', href: '/local-movers/rhode-island/newport', displayLabel: 'Newport County, RI' },
  ],
  coos: [
    { slug: 'grafton', name: 'Grafton', seat: 'North Haverhill', href: '/local-movers/new-hampshire/grafton', displayLabel: 'Grafton County, NH' },
    { slug: 'carroll', name: 'Carroll', seat: 'Ossipee', href: '/local-movers/new-hampshire/carroll', displayLabel: 'Carroll County, NH' },
    { slug: 'essex', name: 'Essex', seat: 'Guildhall', href: '/local-movers/vermont/essex', displayLabel: 'Essex County, VT' },
    { slug: 'caledonia', name: 'Caledonia', seat: 'St. Johnsbury', href: '/local-movers/vermont/caledonia', displayLabel: 'Caledonia County, VT' },
    { slug: 'oxford', name: 'Oxford', seat: 'Paris', href: '/local-movers/maine/oxford', displayLabel: 'Oxford County, ME' },
    { slug: 'orleans', name: 'Orleans', seat: 'Newport', href: '/local-movers/vermont/orleans', displayLabel: 'Orleans County, VT' },
  ],
};

export function getNewHampshireNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return NH_COUNTY_NEIGHBORS[countySlug] ?? [];
}