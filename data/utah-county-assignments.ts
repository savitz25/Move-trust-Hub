import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Utah county mover lists — batch 1: 4/29 */
const CURATED_UT_COUNTIES: Record<string, string[]> = {
  'salt-lake': [
    'twomenandatruck-saltlake-ut',
    'all-my-sons-salt-lake-city-ut',
    'salt-lake-city-moving-salt-lake-ut',
    'salt-lake-county-moving-salt-lake-ut',
    'college-hunks-moving-salt-lake-city-ut',
    'budd-van-lines-salt-lake-city-ut',
    'salt-lake-corridor-moving-salt-lake-ut',
    'wasatch-front-moving-salt-lake-ut',
    'hercules-movers-salt-lake-city-ut',
    'krupp-moving-salt-lake-city-ut',
  ],
  utah: [
    'twomenandatruck-utah-ut',
    'all-my-sons-provo-ut',
    'provo-moving-utah-ut',
    'utah-county-moving-utah-ut',
    'college-hunks-moving-provo-ut',
    'budd-van-lines-provo-ut',
    'provo-corridor-moving-utah-ut',
    'utah-valley-moving-utah-ut',
    'hercules-movers-provo-ut',
    'krupp-moving-provo-ut',
  ],
  davis: [
    'twomenandatruck-davis-ut',
    'all-my-sons-layton-ut',
    'layton-moving-davis-ut',
    'davis-county-moving-davis-ut',
    'college-hunks-moving-layton-ut',
    'budd-van-lines-layton-ut',
    'layton-corridor-moving-davis-ut',
    'north-salt-lake-moving-davis-ut',
    'hercules-movers-layton-ut',
    'krupp-moving-layton-ut',
  ],
  weber: [
    'twomenandatruck-weber-ut',
    'all-my-sons-ogden-ut',
    'ogden-moving-weber-ut',
    'weber-county-moving-weber-ut',
    'college-hunks-moving-ogden-ut',
    'budd-van-lines-ogden-ut',
    'ogden-corridor-moving-weber-ut',
    'wasatch-north-moving-weber-ut',
    'hercules-movers-ogden-ut',
    'krupp-moving-ogden-ut',
  ],
};

export const utahCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_UT_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'utah',
    countySlug,
    moverIds,
  }));