import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Maryland county mover lists — batch 1 (large DC/Baltimore metros) */
const CURATED_MD_COUNTIES: Record<string, string[]> = {
  montgomery: [
    'twomenandatruck-montgomery-md',
    'all-my-sons-rockville-md',
    'rockville-moving-montgomery-md',
    'montgomery-county-moving-montgomery-md',
    'college-hunks-moving-rockville-md',
    'budd-van-lines-rockville-md',
    'dc-metro-moving-montgomery-md',
    'bethesda-corridor-moving-montgomery-md',
    'hercules-movers-rockville-md',
    'krupp-moving-rockville-md',
  ],
  'prince-georges': [
    'twomenandatruck-princegeorges-md',
    'all-my-sons-upper-marlboro-md',
    'upper-marlboro-moving-prince-georges-md',
    'prince-georges-county-moving-prince-georges-md',
    'college-hunks-moving-upper-marlboro-md',
    'budd-van-lines-upper-marlboro-md',
    'dc-metro-moving-prince-georges-md',
    'bowie-corridor-moving-prince-georges-md',
    'hercules-movers-upper-marlboro-md',
    'krupp-moving-upper-marlboro-md',
  ],
  baltimore: [
    'twomenandatruck-baltimorecounty-md',
    'all-my-sons-towson-md',
    'towson-moving-baltimore-md',
    'baltimore-county-moving-baltimore-md',
    'college-hunks-moving-towson-md',
    'budd-van-lines-towson-md',
    'catonsville-corridor-moving-baltimore-md',
    'dundalk-area-moving-baltimore-md',
    'hercules-movers-towson-md',
    'krupp-moving-towson-md',
  ],
};

export const marylandCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_MD_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'maryland',
    countySlug,
    moverIds,
  }));