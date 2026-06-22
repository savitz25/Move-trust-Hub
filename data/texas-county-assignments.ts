import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Texas county mover lists — grows incrementally as counties are researched */
const CURATED_TX_COUNTIES: Record<string, string[]> = {
  armstrong: ['amarillo-area-moving', 'lubbock-area-moving'],
  borden: ['lubbock-area-moving', 'midland-area-moving'],
  briscoe: ['amarillo-area-moving', 'lubbock-area-moving'],
  cottle: ['wichita-falls-area-moving', 'abilene-area-moving'],
  edwards: ['san-angelo-area-moving', 'del-rio-area-moving'],
  foard: ['wichita-falls-area-moving', 'abilene-area-moving'],
  glasscock: ['midland-area-moving', 'san-angelo-area-moving'],
  irion: ['san-angelo-area-moving', 'midland-area-moving'],
  kenedy: ['corpus-christi-area-moving', 'kingsville-area-moving'],
  king: ['lubbock-area-moving', 'wichita-falls-area-moving'],
  loving: ['odessa-area-moving', 'hobbs-nm-area-moving'],
  sterling: ['san-angelo-area-moving', 'midland-area-moving'],
  stonewall: ['abilene-area-moving', 'wichita-falls-area-moving'],
  throckmorton: ['abilene-area-moving', 'wichita-falls-area-moving'],
};

export const texasCountyMoverAssignments: CountyMoverAssignment[] = Object.entries(
  CURATED_TX_COUNTIES
).map(([countySlug, moverIds]) => ({
  stateSlug: 'texas',
  countySlug,
  moverIds,
}));