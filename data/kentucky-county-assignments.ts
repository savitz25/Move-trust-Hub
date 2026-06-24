import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Kentucky county mover lists — real catalog IDs only */
const CURATED_KY_COUNTIES: Record<string, string[]> = {
  jefferson: [
    'two-men-and-a-truck-jefferson-ky',
    'louisville-moving-jefferson-ky',
    'jefferson-county-moving-jefferson-ky',
    'budd-van-lines-louisville-ky',
    'all-my-sons-louisville-ky',
    'college-hunks-moving-louisville-ky',
    'derby-city-moving-jefferson-ky',
    'ohio-river-moving-jefferson-ky',
    'hercules-movers-louisville-ky',
    'krupp-moving-louisville-ky',
  ],
  fayette: [
    'two-men-and-a-truck-fayette-ky',
    'lexington-moving-fayette-ky',
    'fayette-county-moving-fayette-ky',
    'budd-van-lines-lexington-ky',
    'all-my-sons-lexington-ky',
    'college-hunks-moving-lexington-ky',
    'bluegrass-moving-fayette-ky',
    'horse-country-moving-fayette-ky',
    'hercules-movers-lexington-ky',
    'krupp-moving-lexington-ky',
  ],
  kenton: [
    'two-men-and-a-truck-kenton-ky',
    'covington-moving-kenton-ky',
    'kenton-county-moving-kenton-ky',
    'erlanger-moving-kenton-ky',
    'two-men-and-a-truck-hamilton-oh',
    'cincinnati-moving-hamilton-oh',
    'budd-van-lines-cincinnati-oh',
    'all-my-sons-cincinnati-oh',
    'college-hunks-moving-cincinnati-oh',
    'queen-city-moving-hamilton-oh',
  ],
  warren: [
    'two-men-and-a-truck-warren-ky',
    'bowling-green-moving-warren-ky',
    'warren-county-moving-warren-ky',
    'budd-van-lines-bowling-green-ky',
    'all-my-sons-bowling-green-ky',
    'college-hunks-moving-bowling-green-ky',
    'western-kentucky-moving-warren-ky',
    'hilltopper-moving-warren-ky',
    'hercules-movers-bowling-green-ky',
    'krupp-moving-bowling-green-ky',
  ],
};

export const kentuckyCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_KY_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'kentucky',
    countySlug,
    moverIds,
  }));