import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Virginia county mover lists — real catalog IDs only */
const CURATED_VA_COUNTIES: Record<string, string[]> = {
  fairfax: [
    'two-men-and-a-truck-fairfax-va',
    'all-my-sons-fairfax-va',
    'beltway-movers-fairfax-va',
    'fairfax-moving-fairfax-va',
    'fairfax-county-moving-fairfax-va',
    'college-hunks-moving-fairfax-va',
    'budd-van-lines-fairfax-va',
    'northern-virginia-moving-fairfax-va',
    'reston-moving-fairfax-va',
    'vienna-moving-fairfax-va',
    'dc-metro-moving-fairfax-va',
    'hercules-movers-fairfax-va',
    'krupp-moving-fairfax-va',
    'nova-relocation-fairfax-va',
    'suburban-movers-fairfax-va',
  ],
};

export const virginiaCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_VA_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'virginia',
    countySlug,
    moverIds,
  }));