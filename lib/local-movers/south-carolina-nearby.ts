import { south_carolinaCounties } from '@/data/generated/states/south-carolina';
import { applySouthCarolinaCountyOverrides } from '@/lib/local-movers/geography/south-carolina-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const scCounties = south_carolinaCounties.map(applySouthCarolinaCountyOverrides);
const countyNameBySlug = new Map(scCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for internal linking on SC county pages */
const SC_COUNTY_NEIGHBORS: Record<string, string[]> = {
  aiken: ['edgefield', 'saluda', 'lexington', 'barnwell', 'bamberg', 'orangeburg'],
  dorchester: [
    'charleston',
    'berkeley',
    'colleton',
    'orangeburg',
    'bamberg',
    'lexington',
  ],
  pickens: ['greenville', 'anderson', 'oconee', 'abbeville', 'laurens', 'greenwood'],
  florence: ['darlington', 'marlboro', 'dillon', 'marion', 'sumter', 'williamsburg'],
  lancaster: ['chester', 'york', 'union', 'kershaw', 'fairfield', 'richland'],
  sumter: ['florence', 'darlington', 'lee', 'clarendon', 'calhoun', 'richland'],
  oconee: ['pickens', 'anderson', 'greenville', 'abbeville', 'laurens', 'greenwood'],
  orangeburg: ['aiken', 'bamberg', 'dorchester', 'colleton', 'calhoun', 'lexington'],
  kershaw: ['lancaster', 'richland', 'sumter', 'fairfield', 'chesterfield', 'lee'],
  laurens: ['greenville', 'spartanburg', 'greenwood', 'newberry', 'union', 'abbeville'],
  greenwood: ['laurens', 'abbeville', 'mccormick', 'edgefield', 'newberry', 'saluda'],
  georgetown: ['horry', 'berkeley', 'charleston', 'williamsburg', 'marion', 'florence'],
  darlington: ['florence', 'chesterfield', 'marlboro', 'lee', 'sumter', 'dillon'],
  cherokee: ['spartanburg', 'york', 'union', 'chester', 'laurens', 'greenville'],
  chesterfield: ['darlington', 'marlboro', 'richland', 'kershaw', 'florence', 'chester'],
  jasper: ['beaufort', 'hampton', 'colleton', 'charleston', 'dorchester', 'effingham'],
  newberry: ['laurens', 'greenwood', 'fairfield', 'lexington', 'union', 'saluda'],
  colleton: ['dorchester', 'charleston', 'bamberg', 'orangeburg', 'beaufort', 'jasper'],
  chester: ['lancaster', 'york', 'union', 'chesterfield', 'fairfield', 'kershaw'],
  clarendon: ['sumter', 'florence', 'williamsburg', 'orangeburg', 'calhoun', 'richland'],
  edgefield: ['aiken', 'greenwood', 'mccormick', 'saluda', 'lexington', 'richland'],
  williamsburg: ['georgetown', 'marion', 'florence', 'clarendon', 'berkeley', 'dorchester'],
  marion: ['florence', 'dillon', 'marlboro', 'horry', 'georgetown', 'williamsburg'],
  dillon: ['marion', 'marlboro', 'florence', 'darlington', 'horry', 'chesterfield'],
  union: ['spartanburg', 'cherokee', 'laurens', 'newberry', 'fairfield', 'chester'],
  marlboro: ['dillon', 'marion', 'florence', 'darlington', 'chesterfield', 'lee'],
  abbeville: ['greenwood', 'laurens', 'anderson', 'mccormick', 'greenville', 'pickens'],
  barnwell: ['aiken', 'bamberg', 'orangeburg', 'hampton', 'allendale', 'colleton'],
  fairfield: ['richland', 'lexington', 'newberry', 'union', 'chester', 'kershaw'],
  saluda: ['edgefield', 'newberry', 'lexington', 'greenwood', 'fairfield', 'aiken'],
  hampton: ['barnwell', 'allendale', 'jasper', 'beaufort', 'colleton', 'orangeburg'],
  lee: ['sumter', 'florence', 'darlington', 'clarendon', 'kershaw', 'richland'],
  calhoun: ['orangeburg', 'lexington', 'richland', 'clarendon', 'sumter', 'dorchester'],
  bamberg: ['barnwell', 'orangeburg', 'hampton', 'allendale', 'dorchester', 'colleton'],
  mccormick: ['greenwood', 'abbeville', 'edgefield', 'aiken', 'saluda', 'barnwell'],
  allendale: ['hampton', 'barnwell', 'colleton', 'jasper', 'orangeburg', 'aiken'],
};

export function getSouthCarolinaNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = SC_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = scCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    });
}