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
  davidson: [
    'two-men-and-a-truck-nashville',
    'college-hunks-moving-nashville',
    'all-my-sons-nashville',
    'bellhop-nashville',
    'fox-moving-nashville',
    'music-city-movers-nashville',
    'master-movers-nashville',
    'armstrong-relocation-nashville',
    'alexanders-mobility-nashville',
    'spyder-moving-nashville',
  ],
  knox: [
    'two-men-and-a-truck-knoxville',
    'college-hunks-moving-knoxville',
    'all-my-sons-knoxville',
    'gouffon-moving-knoxville',
    'knoxville-moving-company-knoxville',
    'mighty-moving-knoxville',
    'brooks-transfer-knoxville',
    'hilldrup-moving-knoxville',
    'bellhop-knoxville',
    'spyder-moving-knoxville',
  ],
  hamilton: [
    'two-men-and-a-truck-chattanooga',
    'college-hunks-moving-chattanooga',
    'all-my-sons-chattanooga',
    'good-guys-moving-chattanooga',
    'elizabeth-moving-chattanooga',
    'bellhop-chattanooga',
    'river-city-moving-chattanooga',
    'armstrong-relocation-chattanooga',
    'fox-moving-chattanooga',
    'spyder-moving-chattanooga',
  ],
};

export const tennesseeCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_TN_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'tennessee',
    countySlug,
    moverIds,
  }));