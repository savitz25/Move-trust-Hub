import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Arkansas county mover lists — grows incrementally per batch */
const CURATED_AR_COUNTIES: Record<string, string[]> = {
  pulaski: [
    'two-men-and-a-truck-pulaski-ar',
    'all-my-sons-little-rock-ar',
    'arkansas-capital-movers',
    'arkansas-family-movers',
    'college-hunks-little-rock-ar',
    'coleman-worldwide-little-rock-ar',
    'north-american-van-lines-little-rock-ar',
    'arkansas-county-moving-co',
    'arkansas-express-movers',
    'arkansas-premier-moving',
  ],
};

export const arkansasCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_AR_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'arkansas',
    countySlug,
    moverIds,
  }));