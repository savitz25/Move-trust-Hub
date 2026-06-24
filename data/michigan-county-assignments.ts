import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Michigan county mover lists — real catalog IDs only (no regional-* placeholders) */
const CURATED_MI_COUNTIES: Record<string, string[]> = {
  wayne: [
    'two-men-and-a-truck-wayne-mi',
    'detroit-moving-wayne-mi',
    'wayne-county-moving-wayne-mi',
    'all-my-sons-detroit-mi',
    'men-on-the-move-wayne-mi',
    'corrigan-moving-wayne-mi',
    'frisbie-moving-wayne-mi',
    'metropolitan-moving-wayne-mi',
    'zip-moving-wayne-mi',
    'juggernaut-moving-wayne-mi',
  ],
};

export const michiganCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_MI_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'michigan',
    countySlug,
    moverIds,
  }));