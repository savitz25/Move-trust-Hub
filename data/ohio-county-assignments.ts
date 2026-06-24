import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Ohio county mover lists — real catalog IDs only (no regional-* placeholders) */
const CURATED_OH_COUNTIES: Record<string, string[]> = {
  franklin: [
    'two-men-and-a-truck-franklin-oh',
    'columbus-moving-franklin-oh',
    'franklin-county-moving-franklin-oh',
    'budd-van-lines-columbus-oh',
    'all-my-sons-columbus-oh',
    'college-hunks-moving-columbus-oh',
    'capital-city-moving-franklin-oh',
    'buckeye-moving-franklin-oh',
    'hercules-movers-columbus-oh',
    'krupp-moving-columbus-oh',
  ],
};

export const ohioCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_OH_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'ohio',
    countySlug,
    moverIds,
  }));