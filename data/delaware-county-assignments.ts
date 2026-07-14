import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/**
 * delaware county → displayable mover assignments.
 * Rebuilt by: npx tsx scripts/rebuild-all-states-county-movers.ts delaware
 *
 * Only includes movers that pass curated listing policy (verified / directory-linked).
 * Badge counts on /local-movers/delaware match these listed sets via getMoversForCounty.
 */
const CURATED_DELAWARE_COUNTIES: Record<string, string[]> = {
  kent: [
    'directory-allied-van-lines',
    'directory-united-van-lines',
    'directory-north-american-van-lines',
    'directory-mayflower-transit',
    'directory-jk-moving-services',
    'directory-safeway-moving',
    'directory-bekins-van-lines',
    'directory-atlas-van-lines',
    'directory-two-men-and-a-truck',
    'directory-pensey-moving',
    'directory-wheaton-world-wide',
    'directory-graebel-van-lines',
    'directory-gentle-giant-moving',
    'directory-arpin-van-lines',
    'directory-national-van-lines',
    'amerisafe-van-lines',
    'international-van-lines',
    'american-van-lines',
    'colonial-van-lines',
    'moving-apt',
  ],
  'new-castle': [
    'directory-allied-van-lines',
    'directory-united-van-lines',
    'directory-north-american-van-lines',
    'directory-mayflower-transit',
    'directory-jk-moving-services',
    'directory-safeway-moving',
    'directory-bekins-van-lines',
    'directory-atlas-van-lines',
    'directory-two-men-and-a-truck',
    'directory-pensey-moving',
    'directory-wheaton-world-wide',
    'directory-graebel-van-lines',
    'directory-gentle-giant-moving',
    'directory-arpin-van-lines',
    'directory-national-van-lines',
    'amerisafe-van-lines',
    'international-van-lines',
    'american-van-lines',
    'colonial-van-lines',
    'moving-apt',
  ],
  sussex: [
    'directory-allied-van-lines',
    'directory-united-van-lines',
    'directory-north-american-van-lines',
    'directory-mayflower-transit',
    'directory-jk-moving-services',
    'directory-safeway-moving',
    'directory-bekins-van-lines',
    'directory-atlas-van-lines',
    'directory-two-men-and-a-truck',
    'directory-pensey-moving',
    'directory-wheaton-world-wide',
    'directory-graebel-van-lines',
    'directory-gentle-giant-moving',
    'directory-arpin-van-lines',
    'directory-national-van-lines',
    'amerisafe-van-lines',
    'international-van-lines',
    'american-van-lines',
    'colonial-van-lines',
    'moving-apt',
  ],
};

export const delawareCountyMoverAssignments: CountyMoverAssignment[] = Object.entries(
  CURATED_DELAWARE_COUNTIES
).map(([countySlug, moverIds]) => ({
  stateSlug: 'delaware',
  countySlug,
  moverIds,
}));
