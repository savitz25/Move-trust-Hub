import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Oregon premium hubs — regional corridor links */
const OR_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  multnomah: [
    { slug: 'washington', name: 'Washington', seat: 'Hillsboro', href: '/local-movers/oregon/washington', displayLabel: 'Washington County, OR' },
    { slug: 'clackamas', name: 'Clackamas', seat: 'Oregon City', href: '/local-movers/oregon/clackamas', displayLabel: 'Clackamas County, OR' },
    { slug: 'clark', name: 'Clark', seat: 'Vancouver', href: '/local-movers/washington/clark', displayLabel: 'Clark County, WA' },
    { slug: 'yamhill', name: 'Yamhill', seat: 'McMinnville', href: '/local-movers/oregon/yamhill', displayLabel: 'Yamhill County, OR' },
    { slug: 'marion', name: 'Marion', seat: 'Salem', href: '/local-movers/oregon/marion', displayLabel: 'Marion County, OR' },
  ],
  washington: [
    { slug: 'multnomah', name: 'Multnomah', seat: 'Portland', href: '/local-movers/oregon/multnomah', displayLabel: 'Multnomah County, OR' },
    { slug: 'clackamas', name: 'Clackamas', seat: 'Oregon City', href: '/local-movers/oregon/clackamas', displayLabel: 'Clackamas County, OR' },
    { slug: 'yamhill', name: 'Yamhill', seat: 'McMinnville', href: '/local-movers/oregon/yamhill', displayLabel: 'Yamhill County, OR' },
    { slug: 'clark', name: 'Clark', seat: 'Vancouver', href: '/local-movers/washington/clark', displayLabel: 'Clark County, WA' },
    { slug: 'marion', name: 'Marion', seat: 'Salem', href: '/local-movers/oregon/marion', displayLabel: 'Marion County, OR' },
  ],
  clackamas: [
    { slug: 'multnomah', name: 'Multnomah', seat: 'Portland', href: '/local-movers/oregon/multnomah', displayLabel: 'Multnomah County, OR' },
    { slug: 'washington', name: 'Washington', seat: 'Hillsboro', href: '/local-movers/oregon/washington', displayLabel: 'Washington County, OR' },
    { slug: 'marion', name: 'Marion', seat: 'Salem', href: '/local-movers/oregon/marion', displayLabel: 'Marion County, OR' },
    { slug: 'yamhill', name: 'Yamhill', seat: 'McMinnville', href: '/local-movers/oregon/yamhill', displayLabel: 'Yamhill County, OR' },
    { slug: 'clark', name: 'Clark', seat: 'Vancouver', href: '/local-movers/washington/clark', displayLabel: 'Clark County, WA' },
  ],
  lane: [
    { slug: 'benton', name: 'Benton', seat: 'Corvallis', href: '/local-movers/oregon/benton', displayLabel: 'Benton County, OR' },
    { slug: 'linn', name: 'Linn', seat: 'Albany', href: '/local-movers/oregon/linn', displayLabel: 'Linn County, OR' },
    { slug: 'douglas', name: 'Douglas', seat: 'Roseburg', href: '/local-movers/oregon/douglas', displayLabel: 'Douglas County, OR' },
    { slug: 'marion', name: 'Marion', seat: 'Salem', href: '/local-movers/oregon/marion', displayLabel: 'Marion County, OR' },
    { slug: 'deschutes', name: 'Deschutes', seat: 'Bend', href: '/local-movers/oregon/deschutes', displayLabel: 'Deschutes County, OR' },
  ],
  marion: [
    { slug: 'clackamas', name: 'Clackamas', seat: 'Oregon City', href: '/local-movers/oregon/clackamas', displayLabel: 'Clackamas County, OR' },
    { slug: 'yamhill', name: 'Yamhill', seat: 'McMinnville', href: '/local-movers/oregon/yamhill', displayLabel: 'Yamhill County, OR' },
    { slug: 'linn', name: 'Linn', seat: 'Albany', href: '/local-movers/oregon/linn', displayLabel: 'Linn County, OR' },
    { slug: 'benton', name: 'Benton', seat: 'Corvallis', href: '/local-movers/oregon/benton', displayLabel: 'Benton County, OR' },
    { slug: 'lane', name: 'Lane', seat: 'Eugene', href: '/local-movers/oregon/lane', displayLabel: 'Lane County, OR' },
  ],
  jackson: [
    { slug: 'douglas', name: 'Douglas', seat: 'Roseburg', href: '/local-movers/oregon/douglas', displayLabel: 'Douglas County, OR' },
    { slug: 'lane', name: 'Lane', seat: 'Eugene', href: '/local-movers/oregon/lane', displayLabel: 'Lane County, OR' },
    { slug: 'deschutes', name: 'Deschutes', seat: 'Bend', href: '/local-movers/oregon/deschutes', displayLabel: 'Deschutes County, OR' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
    { slug: 'clark', name: 'Clark', seat: 'Vancouver', href: '/local-movers/washington/clark', displayLabel: 'Clark County, WA' },
  ],
  deschutes: [
    { slug: 'lane', name: 'Lane', seat: 'Eugene', href: '/local-movers/oregon/lane', displayLabel: 'Lane County, OR' },
    { slug: 'linn', name: 'Linn', seat: 'Albany', href: '/local-movers/oregon/linn', displayLabel: 'Linn County, OR' },
    { slug: 'jackson', name: 'Jackson', seat: 'Medford', href: '/local-movers/oregon/jackson', displayLabel: 'Jackson County, OR' },
    { slug: 'marion', name: 'Marion', seat: 'Salem', href: '/local-movers/oregon/marion', displayLabel: 'Marion County, OR' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
  ],
  linn: [
    { slug: 'benton', name: 'Benton', seat: 'Corvallis', href: '/local-movers/oregon/benton', displayLabel: 'Benton County, OR' },
    { slug: 'marion', name: 'Marion', seat: 'Salem', href: '/local-movers/oregon/marion', displayLabel: 'Marion County, OR' },
    { slug: 'lane', name: 'Lane', seat: 'Eugene', href: '/local-movers/oregon/lane', displayLabel: 'Lane County, OR' },
    { slug: 'douglas', name: 'Douglas', seat: 'Roseburg', href: '/local-movers/oregon/douglas', displayLabel: 'Douglas County, OR' },
    { slug: 'deschutes', name: 'Deschutes', seat: 'Bend', href: '/local-movers/oregon/deschutes', displayLabel: 'Deschutes County, OR' },
  ],
  douglas: [
    { slug: 'lane', name: 'Lane', seat: 'Eugene', href: '/local-movers/oregon/lane', displayLabel: 'Lane County, OR' },
    { slug: 'jackson', name: 'Jackson', seat: 'Medford', href: '/local-movers/oregon/jackson', displayLabel: 'Jackson County, OR' },
    { slug: 'linn', name: 'Linn', seat: 'Albany', href: '/local-movers/oregon/linn', displayLabel: 'Linn County, OR' },
    { slug: 'deschutes', name: 'Deschutes', seat: 'Bend', href: '/local-movers/oregon/deschutes', displayLabel: 'Deschutes County, OR' },
    { slug: 'marion', name: 'Marion', seat: 'Salem', href: '/local-movers/oregon/marion', displayLabel: 'Marion County, OR' },
  ],
  yamhill: [
    { slug: 'washington', name: 'Washington', seat: 'Hillsboro', href: '/local-movers/oregon/washington', displayLabel: 'Washington County, OR' },
    { slug: 'clackamas', name: 'Clackamas', seat: 'Oregon City', href: '/local-movers/oregon/clackamas', displayLabel: 'Clackamas County, OR' },
    { slug: 'marion', name: 'Marion', seat: 'Salem', href: '/local-movers/oregon/marion', displayLabel: 'Marion County, OR' },
    { slug: 'multnomah', name: 'Multnomah', seat: 'Portland', href: '/local-movers/oregon/multnomah', displayLabel: 'Multnomah County, OR' },
    { slug: 'benton', name: 'Benton', seat: 'Corvallis', href: '/local-movers/oregon/benton', displayLabel: 'Benton County, OR' },
  ],
  benton: [
    { slug: 'linn', name: 'Linn', seat: 'Albany', href: '/local-movers/oregon/linn', displayLabel: 'Linn County, OR' },
    { slug: 'lane', name: 'Lane', seat: 'Eugene', href: '/local-movers/oregon/lane', displayLabel: 'Lane County, OR' },
    { slug: 'marion', name: 'Marion', seat: 'Salem', href: '/local-movers/oregon/marion', displayLabel: 'Marion County, OR' },
    { slug: 'yamhill', name: 'Yamhill', seat: 'McMinnville', href: '/local-movers/oregon/yamhill', displayLabel: 'Yamhill County, OR' },
    { slug: 'douglas', name: 'Douglas', seat: 'Roseburg', href: '/local-movers/oregon/douglas', displayLabel: 'Douglas County, OR' },
  ],
};

export function getOregonNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return OR_COUNTY_NEIGHBORS[countySlug] ?? [];
}