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
    'american-moving-cook-il',
    'the-moving-company-cook-il',
    'h2h-movers-cook-il',
    'chicago-moving-company-cook-il',
    'a1-moving-cook-il',
    'elite-moving-cook-il',
    'north-shore-movers-cook-il',
    'alliance-moving-cook-il',
    'metro-movers-chicago-cook-il',
  ],
};

export const illinoisCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_IL_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'illinois',
    countySlug,
    moverIds,
  }));