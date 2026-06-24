import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Washington county mover lists — premium hubs (expanding) */
const CURATED_WA_COUNTIES: Record<string, string[]> = {
  king: [
    'twomenandatruck-king-wa',
    'all-my-sons-seattle-wa',
    'seattle-moving-king-wa',
    'king-county-moving-king-wa',
    'college-hunks-moving-seattle-wa',
    'budd-van-lines-seattle-wa',
    'seattle-corridor-moving-king-wa',
    'puget-sound-moving-king-wa',
    'hercules-movers-seattle-wa',
    'krupp-moving-seattle-wa',
  ],
};

export const washingtonCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_WA_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'washington',
    countySlug,
    moverIds,
  }));