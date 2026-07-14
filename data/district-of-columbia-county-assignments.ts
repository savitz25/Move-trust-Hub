import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/**
 * district-of-columbia county → displayable mover assignments.
 * Rebuilt by: npx tsx scripts/rebuild-all-states-county-movers.ts district-of-columbia
 *
 * Only includes movers that pass curated listing policy (verified / directory-linked).
 * Badge counts on /local-movers/district-of-columbia match these listed sets via getMoversForCounty.
 */
const CURATED_DISTRICT_OF_COLUMBIA_COUNTIES: Record<string, string[]> = {
  'district-of-columbia': [
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

export const districtOfColumbiaCountyMoverAssignments: CountyMoverAssignment[] = Object.entries(
  CURATED_DISTRICT_OF_COLUMBIA_COUNTIES
).map(([countySlug, moverIds]) => ({
  stateSlug: 'district-of-columbia',
  countySlug,
  moverIds,
}));
