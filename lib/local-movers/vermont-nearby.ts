import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Vermont counties plus cross-border NH, NY, and MA metro guides */
const VT_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  chittenden: [
    { slug: 'grand-isle', name: 'Grand Isle', seat: 'North Hero', href: '/local-movers/vermont/grand-isle', displayLabel: 'Grand Isle County, VT' },
    { slug: 'franklin', name: 'Franklin', seat: 'St. Albans', href: '/local-movers/vermont/franklin', displayLabel: 'Franklin County, VT' },
    { slug: 'lamoille', name: 'Lamoille', seat: 'Hyde Park', href: '/local-movers/vermont/lamoille', displayLabel: 'Lamoille County, VT' },
    { slug: 'addison', name: 'Addison', seat: 'Middlebury', href: '/local-movers/vermont/addison', displayLabel: 'Addison County, VT' },
    { slug: 'washington', name: 'Washington', seat: 'Montpelier', href: '/local-movers/vermont/washington', displayLabel: 'Washington County, VT' },
    { slug: 'hillsborough', name: 'Hillsborough', seat: 'Manchester', href: '/local-movers/new-hampshire/hillsborough', displayLabel: 'Hillsborough County, NH' },
  ],
  washington: [
    { slug: 'chittenden', name: 'Chittenden', seat: 'Burlington', href: '/local-movers/vermont/chittenden', displayLabel: 'Chittenden County, VT' },
    { slug: 'orange', name: 'Orange', seat: 'Chelsea', href: '/local-movers/vermont/orange', displayLabel: 'Orange County, VT' },
    { slug: 'caledonia', name: 'Caledonia', seat: 'St. Johnsbury', href: '/local-movers/vermont/caledonia', displayLabel: 'Caledonia County, VT' },
    { slug: 'windsor', name: 'Windsor', seat: 'Woodstock', href: '/local-movers/vermont/windsor', displayLabel: 'Windsor County, VT' },
    { slug: 'lamoille', name: 'Lamoille', seat: 'Hyde Park', href: '/local-movers/vermont/lamoille', displayLabel: 'Lamoille County, VT' },
    { slug: 'franklin', name: 'Franklin', seat: 'Greenfield', href: '/local-movers/massachusetts/franklin', displayLabel: 'Franklin County, MA' },
  ],
  rutland: [
    { slug: 'addison', name: 'Addison', seat: 'Middlebury', href: '/local-movers/vermont/addison', displayLabel: 'Addison County, VT' },
    { slug: 'windsor', name: 'Windsor', seat: 'Woodstock', href: '/local-movers/vermont/windsor', displayLabel: 'Windsor County, VT' },
    { slug: 'bennington', name: 'Bennington', seat: 'Bennington', href: '/local-movers/vermont/bennington', displayLabel: 'Bennington County, VT' },
    { slug: 'washington', name: 'Washington', seat: 'Montpelier', href: '/local-movers/vermont/washington', displayLabel: 'Washington County, VT' },
    { slug: 'chittenden', name: 'Chittenden', seat: 'Burlington', href: '/local-movers/vermont/chittenden', displayLabel: 'Chittenden County, VT' },
    { slug: 'washington', name: 'Washington', seat: 'South Kingstown', href: '/local-movers/rhode-island/washington', displayLabel: 'Washington County, RI' },
  ],
  windsor: [
    { slug: 'rutland', name: 'Rutland', seat: 'Rutland', href: '/local-movers/vermont/rutland', displayLabel: 'Rutland County, VT' },
    { slug: 'orange', name: 'Orange', seat: 'Chelsea', href: '/local-movers/vermont/orange', displayLabel: 'Orange County, VT' },
    { slug: 'windham', name: 'Windham', seat: 'Brattleboro', href: '/local-movers/vermont/windham', displayLabel: 'Windham County, VT' },
    { slug: 'washington', name: 'Washington', seat: 'Montpelier', href: '/local-movers/vermont/washington', displayLabel: 'Washington County, VT' },
    { slug: 'grafton', name: 'Grafton', seat: 'North Haverhill', href: '/local-movers/new-hampshire/grafton', displayLabel: 'Grafton County, NH' },
    { slug: 'hillsborough', name: 'Hillsborough', seat: 'Manchester', href: '/local-movers/new-hampshire/hillsborough', displayLabel: 'Hillsborough County, NH' },
  ],
  franklin: [
    { slug: 'chittenden', name: 'Chittenden', seat: 'Burlington', href: '/local-movers/vermont/chittenden', displayLabel: 'Chittenden County, VT' },
    { slug: 'grand-isle', name: 'Grand Isle', seat: 'North Hero', href: '/local-movers/vermont/grand-isle', displayLabel: 'Grand Isle County, VT' },
    { slug: 'lamoille', name: 'Lamoille', seat: 'Hyde Park', href: '/local-movers/vermont/lamoille', displayLabel: 'Lamoille County, VT' },
    { slug: 'orleans', name: 'Orleans', seat: 'Newport', href: '/local-movers/vermont/orleans', displayLabel: 'Orleans County, VT' },
    { slug: 'essex', name: 'Essex', seat: 'Salem', href: '/local-movers/massachusetts/essex', displayLabel: 'Essex County, MA' },
    { slug: 'clinton', name: 'Clinton', seat: 'Plattsburgh', href: '/local-movers/new-york/clinton', displayLabel: 'Clinton County, NY' },
  ],
  windham: [
    { slug: 'windsor', name: 'Windsor', seat: 'Woodstock', href: '/local-movers/vermont/windsor', displayLabel: 'Windsor County, VT' },
    { slug: 'bennington', name: 'Bennington', seat: 'Bennington', href: '/local-movers/vermont/bennington', displayLabel: 'Bennington County, VT' },
    { slug: 'franklin', name: 'Franklin', seat: 'Greenfield', href: '/local-movers/massachusetts/franklin', displayLabel: 'Franklin County, MA' },
    { slug: 'hampden', name: 'Hampden', seat: 'Springfield', href: '/local-movers/massachusetts/hampden', displayLabel: 'Hampden County, MA' },
    { slug: 'cheshire', name: 'Cheshire', seat: 'Keene', href: '/local-movers/new-hampshire/cheshire', displayLabel: 'Cheshire County, NH' },
    { slug: 'windham', name: 'Windham', seat: 'Willimantic', href: '/local-movers/connecticut/windham', displayLabel: 'Windham County, CT' },
  ],
  addison: [
    { slug: 'chittenden', name: 'Chittenden', seat: 'Burlington', href: '/local-movers/vermont/chittenden', displayLabel: 'Chittenden County, VT' },
    { slug: 'rutland', name: 'Rutland', seat: 'Rutland', href: '/local-movers/vermont/rutland', displayLabel: 'Rutland County, VT' },
    { slug: 'washington', name: 'Washington', seat: 'Montpelier', href: '/local-movers/vermont/washington', displayLabel: 'Washington County, VT' },
    { slug: 'grand-isle', name: 'Grand Isle', seat: 'North Hero', href: '/local-movers/vermont/grand-isle', displayLabel: 'Grand Isle County, VT' },
    { slug: 'essex', name: 'Essex', seat: 'Elizabethtown', href: '/local-movers/new-york/essex', displayLabel: 'Essex County, NY' },
    { slug: 'washington', name: 'Washington', seat: 'Fort Edward', href: '/local-movers/new-york/washington', displayLabel: 'Washington County, NY' },
  ],
  bennington: [
    { slug: 'rutland', name: 'Rutland', seat: 'Rutland', href: '/local-movers/vermont/rutland', displayLabel: 'Rutland County, VT' },
    { slug: 'windham', name: 'Windham', seat: 'Brattleboro', href: '/local-movers/vermont/windham', displayLabel: 'Windham County, VT' },
    { slug: 'windsor', name: 'Windsor', seat: 'Woodstock', href: '/local-movers/vermont/windsor', displayLabel: 'Windsor County, VT' },
    { slug: 'berkshire', name: 'Berkshire', seat: 'Pittsfield', href: '/local-movers/massachusetts/berkshire', displayLabel: 'Berkshire County, MA' },
    { slug: 'rensselaer', name: 'Rensselaer', seat: 'Troy', href: '/local-movers/new-york/rensselaer', displayLabel: 'Rensselaer County, NY' },
    { slug: 'washington', name: 'Washington', seat: 'Fort Edward', href: '/local-movers/new-york/washington', displayLabel: 'Washington County, NY' },
  ],
  caledonia: [
    { slug: 'washington', name: 'Washington', seat: 'Montpelier', href: '/local-movers/vermont/washington', displayLabel: 'Washington County, VT' },
    { slug: 'orange', name: 'Orange', seat: 'Chelsea', href: '/local-movers/vermont/orange', displayLabel: 'Orange County, VT' },
    { slug: 'essex', name: 'Essex', seat: 'Guildhall', href: '/local-movers/vermont/essex', displayLabel: 'Essex County, VT' },
    { slug: 'orleans', name: 'Orleans', seat: 'Newport', href: '/local-movers/vermont/orleans', displayLabel: 'Orleans County, VT' },
    { slug: 'grafton', name: 'Grafton', seat: 'North Haverhill', href: '/local-movers/new-hampshire/grafton', displayLabel: 'Grafton County, NH' },
    { slug: 'coos', name: 'Coos', seat: 'Lancaster', href: '/local-movers/new-hampshire/coos', displayLabel: 'Coos County, NH' },
  ],
  orange: [
    { slug: 'washington', name: 'Washington', seat: 'Montpelier', href: '/local-movers/vermont/washington', displayLabel: 'Washington County, VT' },
    { slug: 'windsor', name: 'Windsor', seat: 'Woodstock', href: '/local-movers/vermont/windsor', displayLabel: 'Windsor County, VT' },
    { slug: 'caledonia', name: 'Caledonia', seat: 'St. Johnsbury', href: '/local-movers/vermont/caledonia', displayLabel: 'Caledonia County, VT' },
    { slug: 'rutland', name: 'Rutland', seat: 'Rutland', href: '/local-movers/vermont/rutland', displayLabel: 'Rutland County, VT' },
    { slug: 'grafton', name: 'Grafton', seat: 'North Haverhill', href: '/local-movers/new-hampshire/grafton', displayLabel: 'Grafton County, NH' },
    { slug: 'chittenden', name: 'Chittenden', seat: 'Burlington', href: '/local-movers/vermont/chittenden', displayLabel: 'Chittenden County, VT' },
  ],
  orleans: [
    { slug: 'franklin', name: 'Franklin', seat: 'St. Albans', href: '/local-movers/vermont/franklin', displayLabel: 'Franklin County, VT' },
    { slug: 'caledonia', name: 'Caledonia', seat: 'St. Johnsbury', href: '/local-movers/vermont/caledonia', displayLabel: 'Caledonia County, VT' },
    { slug: 'essex', name: 'Essex', seat: 'Guildhall', href: '/local-movers/vermont/essex', displayLabel: 'Essex County, VT' },
    { slug: 'lamoille', name: 'Lamoille', seat: 'Hyde Park', href: '/local-movers/vermont/lamoille', displayLabel: 'Lamoille County, VT' },
    { slug: 'coos', name: 'Coos', seat: 'Lancaster', href: '/local-movers/new-hampshire/coos', displayLabel: 'Coos County, NH' },
    { slug: 'newport', name: 'Newport', seat: 'Newport', href: '/local-movers/rhode-island/newport', displayLabel: 'Newport County, RI' },
  ],
  lamoille: [
    { slug: 'chittenden', name: 'Chittenden', seat: 'Burlington', href: '/local-movers/vermont/chittenden', displayLabel: 'Chittenden County, VT' },
    { slug: 'franklin', name: 'Franklin', seat: 'St. Albans', href: '/local-movers/vermont/franklin', displayLabel: 'Franklin County, VT' },
    { slug: 'washington', name: 'Washington', seat: 'Montpelier', href: '/local-movers/vermont/washington', displayLabel: 'Washington County, VT' },
    { slug: 'orleans', name: 'Orleans', seat: 'Newport', href: '/local-movers/vermont/orleans', displayLabel: 'Orleans County, VT' },
    { slug: 'caledonia', name: 'Caledonia', seat: 'St. Johnsbury', href: '/local-movers/vermont/caledonia', displayLabel: 'Caledonia County, VT' },
    { slug: 'grand-isle', name: 'Grand Isle', seat: 'North Hero', href: '/local-movers/vermont/grand-isle', displayLabel: 'Grand Isle County, VT' },
  ],
  'grand-isle': [
    { slug: 'chittenden', name: 'Chittenden', seat: 'Burlington', href: '/local-movers/vermont/chittenden', displayLabel: 'Chittenden County, VT' },
    { slug: 'franklin', name: 'Franklin', seat: 'St. Albans', href: '/local-movers/vermont/franklin', displayLabel: 'Franklin County, VT' },
    { slug: 'addison', name: 'Addison', seat: 'Middlebury', href: '/local-movers/vermont/addison', displayLabel: 'Addison County, VT' },
    { slug: 'lamoille', name: 'Lamoille', seat: 'Hyde Park', href: '/local-movers/vermont/lamoille', displayLabel: 'Lamoille County, VT' },
    { slug: 'clinton', name: 'Clinton', seat: 'Plattsburgh', href: '/local-movers/new-york/clinton', displayLabel: 'Clinton County, NY' },
    { slug: 'essex', name: 'Essex', seat: 'Elizabethtown', href: '/local-movers/new-york/essex', displayLabel: 'Essex County, NY' },
  ],
  essex: [
    { slug: 'caledonia', name: 'Caledonia', seat: 'St. Johnsbury', href: '/local-movers/vermont/caledonia', displayLabel: 'Caledonia County, VT' },
    { slug: 'orleans', name: 'Orleans', seat: 'Newport', href: '/local-movers/vermont/orleans', displayLabel: 'Orleans County, VT' },
    { slug: 'coos', name: 'Coos', seat: 'Lancaster', href: '/local-movers/new-hampshire/coos', displayLabel: 'Coos County, NH' },
    { slug: 'grafton', name: 'Grafton', seat: 'North Haverhill', href: '/local-movers/new-hampshire/grafton', displayLabel: 'Grafton County, NH' },
    { slug: 'essex', name: 'Essex', seat: 'Elizabethtown', href: '/local-movers/new-york/essex', displayLabel: 'Essex County, NY' },
    { slug: 'essex', name: 'Essex', seat: 'Salem', href: '/local-movers/massachusetts/essex', displayLabel: 'Essex County, MA' },
  ],
};

export function getVermontNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return VT_COUNTY_NEIGHBORS[countySlug] ?? [];
}