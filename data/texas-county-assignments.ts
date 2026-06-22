import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Texas county mover lists — grows incrementally as counties are researched */
const CURATED_TX_COUNTIES: Record<string, string[]> = {
  borden: ['lubbock-area-moving', 'midland-area-moving'],
  kenedy: ['corpus-christi-area-moving', 'kingsville-area-moving'],
  king: ['lubbock-area-moving', 'wichita-falls-area-moving'],
  loving: ['odessa-area-moving', 'hobbs-nm-area-moving'],
};

export const texasCountyMoverAssignments: CountyMoverAssignment[] = Object.entries(
  CURATED_TX_COUNTIES
).map(([countySlug, moverIds]) => ({
  stateSlug: 'texas',
  countySlug,
  moverIds,
}));