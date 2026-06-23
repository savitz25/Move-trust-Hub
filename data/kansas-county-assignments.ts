import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Kansas county mover lists — grows incrementally per batch */
const CURATED_KS_COUNTIES: Record<string, string[]> = {
  johnson: [
    'two-men-and-a-truck-johnson-ks',
    'all-my-sons-kansas-city-ks',
    'kansas-premier-moving',
    'kansas-pro-movers',
    'kansas-family-movers',
    'college-hunks-kansas-city-ks',
    'coleman-worldwide-kansas-city-ks',
    'north-american-van-lines-kansas-city-ks',
    'kansas-county-moving-co',
    'kansas-express-movers',
  ],
};

export const kansasCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_KS_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'kansas',
    countySlug,
    moverIds,
  }));