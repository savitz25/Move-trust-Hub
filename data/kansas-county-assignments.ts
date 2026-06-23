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
  sedgwick: [
    'two-men-and-a-truck-sedgwick-ks',
    'all-my-sons-wichita-ks',
    'kansas-local-lines',
    'kansas-express-movers',
    'kansas-regional-moving',
    'college-hunks-wichita-ks',
    'coleman-worldwide-wichita-ks',
    'north-american-van-lines-wichita-ks',
    'kansas-pro-movers',
    'kansas-family-movers',
  ],
  shawnee: [
    'two-men-and-a-truck-shawnee-ks',
    'all-my-sons-topeka-ks',
    'kansas-capital-movers',
    'kansas-family-movers',
    'kansas-county-moving-co',
    'college-hunks-topeka-ks',
    'coleman-worldwide-topeka-ks',
    'north-american-van-lines-topeka-ks',
    'kansas-express-movers',
    'kansas-regional-moving',
  ],
  wyandotte: [
    'two-men-and-a-truck-wyandotte-ks',
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
  douglas: [
    'two-men-and-a-truck-douglas-ks',
    'all-my-sons-lawrence-ks',
    'college-hunks-lawrence-ks',
    'kansas-local-lines',
    'kansas-express-movers',
    'kansas-regional-moving',
    'coleman-worldwide-kansas-city-ks',
    'north-american-van-lines-kansas-city-ks',
    'kansas-capital-movers',
    'kansas-family-movers',
  ],
};

export const kansasCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_KS_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'kansas',
    countySlug,
    moverIds,
  }));