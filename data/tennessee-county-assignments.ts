import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Tennessee county mover lists — grows incrementally per batch */
const CURATED_TN_COUNTIES: Record<string, string[]> = {
  shelby: [
    'two-men-and-a-truck-memphis',
    'college-hunks-moving-memphis',
    'all-my-sons-memphis',
    'spyder-moving-memphis',
    'big-league-movers-memphis',
    'red-carpet-moving-memphis',
    'cord-moving-memphis',
    'a-1-freeman-memphis',
    'my-town-movers-memphis',
    'wrightway-moving-memphis',
  ],
};

export const tennesseeCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_TN_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'tennessee',
    countySlug,
    moverIds,
  }));