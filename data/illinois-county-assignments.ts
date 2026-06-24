import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Illinois county mover lists — real catalog IDs only (no regional-* placeholders) */
const CURATED_IL_COUNTIES: Record<string, string[]> = {
  cook: [
    'two-men-and-a-truck-chicago-il',
    'all-my-sons-chicago-il',
    'new-city-moving-chicago-il',
    'move-tastic-chicago-il',
    'college-hunks-chicago-il',
    'reebie-storage-moving-chicago-il',
    'usa-moving-storage-chicago-il',
    'mid-west-moving-storage-chicago-il',
    'coleman-worldwide-chicago-il',
    'golan-moving-chicago-il',
  ],
};

export const illinoisCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_IL_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'illinois',
    countySlug,
    moverIds,
  }));