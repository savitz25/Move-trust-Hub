import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Rhode Island counties plus cross-border MA and CT metro guides */
const RI_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  providence: [
    { slug: 'kent', name: 'Kent', seat: 'East Greenwich', href: '/local-movers/rhode-island/kent', displayLabel: 'Kent County, RI' },
    { slug: 'bristol', name: 'Bristol', seat: 'Bristol', href: '/local-movers/rhode-island/bristol', displayLabel: 'Bristol County, RI' },
    { slug: 'norfolk', name: 'Norfolk', seat: 'Dedham', href: '/local-movers/massachusetts/norfolk', displayLabel: 'Norfolk County, MA' },
    { slug: 'bristol', name: 'Bristol', seat: 'Taunton', href: '/local-movers/massachusetts/bristol', displayLabel: 'Bristol County, MA' },
    { slug: 'suffolk', name: 'Suffolk', seat: 'Boston', href: '/local-movers/massachusetts/suffolk', displayLabel: 'Suffolk County, MA' },
    { slug: 'washington', name: 'Washington', seat: 'South Kingstown', href: '/local-movers/rhode-island/washington', displayLabel: 'Washington County, RI' },
  ],
  kent: [
    { slug: 'providence', name: 'Providence', seat: 'Providence', href: '/local-movers/rhode-island/providence', displayLabel: 'Providence County, RI' },
    { slug: 'washington', name: 'Washington', seat: 'South Kingstown', href: '/local-movers/rhode-island/washington', displayLabel: 'Washington County, RI' },
    { slug: 'bristol', name: 'Bristol', seat: 'Bristol', href: '/local-movers/rhode-island/bristol', displayLabel: 'Bristol County, RI' },
    { slug: 'newport', name: 'Newport', seat: 'Newport', href: '/local-movers/rhode-island/newport', displayLabel: 'Newport County, RI' },
    { slug: 'norfolk', name: 'Norfolk', seat: 'Dedham', href: '/local-movers/massachusetts/norfolk', displayLabel: 'Norfolk County, MA' },
    { slug: 'plymouth', name: 'Plymouth', seat: 'Plymouth', href: '/local-movers/massachusetts/plymouth', displayLabel: 'Plymouth County, MA' },
  ],
  washington: [
    { slug: 'kent', name: 'Kent', seat: 'East Greenwich', href: '/local-movers/rhode-island/kent', displayLabel: 'Kent County, RI' },
    { slug: 'newport', name: 'Newport', seat: 'Newport', href: '/local-movers/rhode-island/newport', displayLabel: 'Newport County, RI' },
    { slug: 'providence', name: 'Providence', seat: 'Providence', href: '/local-movers/rhode-island/providence', displayLabel: 'Providence County, RI' },
    { slug: 'new-london', name: 'New London', seat: 'New London', href: '/local-movers/connecticut/new-london', displayLabel: 'New London County, CT' },
    { slug: 'bristol', name: 'Bristol', seat: 'Taunton', href: '/local-movers/massachusetts/bristol', displayLabel: 'Bristol County, MA' },
    { slug: 'windham', name: 'Windham', seat: 'Willimantic', href: '/local-movers/connecticut/windham', displayLabel: 'Windham County, CT' },
  ],
  newport: [
    { slug: 'washington', name: 'Washington', seat: 'South Kingstown', href: '/local-movers/rhode-island/washington', displayLabel: 'Washington County, RI' },
    { slug: 'bristol', name: 'Bristol', seat: 'Bristol', href: '/local-movers/rhode-island/bristol', displayLabel: 'Bristol County, RI' },
    { slug: 'kent', name: 'Kent', seat: 'East Greenwich', href: '/local-movers/rhode-island/kent', displayLabel: 'Kent County, RI' },
    { slug: 'providence', name: 'Providence', seat: 'Providence', href: '/local-movers/rhode-island/providence', displayLabel: 'Providence County, RI' },
    { slug: 'bristol', name: 'Bristol', seat: 'Taunton', href: '/local-movers/massachusetts/bristol', displayLabel: 'Bristol County, MA' },
    { slug: 'plymouth', name: 'Plymouth', seat: 'Plymouth', href: '/local-movers/massachusetts/plymouth', displayLabel: 'Plymouth County, MA' },
  ],
  bristol: [
    { slug: 'providence', name: 'Providence', seat: 'Providence', href: '/local-movers/rhode-island/providence', displayLabel: 'Providence County, RI' },
    { slug: 'kent', name: 'Kent', seat: 'East Greenwich', href: '/local-movers/rhode-island/kent', displayLabel: 'Kent County, RI' },
    { slug: 'newport', name: 'Newport', seat: 'Newport', href: '/local-movers/rhode-island/newport', displayLabel: 'Newport County, RI' },
    { slug: 'bristol', name: 'Bristol', seat: 'Taunton', href: '/local-movers/massachusetts/bristol', displayLabel: 'Bristol County, MA' },
    { slug: 'norfolk', name: 'Norfolk', seat: 'Dedham', href: '/local-movers/massachusetts/norfolk', displayLabel: 'Norfolk County, MA' },
    { slug: 'plymouth', name: 'Plymouth', seat: 'Plymouth', href: '/local-movers/massachusetts/plymouth', displayLabel: 'Plymouth County, MA' },
  ],
};

export function getRhodeIslandNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return RI_COUNTY_NEIGHBORS[countySlug] ?? [];
}