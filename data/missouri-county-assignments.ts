import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Missouri county mover lists — grows incrementally per batch */
const CURATED_MO_COUNTIES: Record<string, string[]> = {
  'st-louis': [
    'two-men-and-a-truck-st-louis-mo',
    'all-my-sons-st-louis-mo',
    'missouri-premier-moving',
    'missouri-pro-movers',
    'missouri-family-movers',
    'college-hunks-st-louis-mo',
    'coleman-worldwide-st-louis-mo',
    'north-american-van-lines-st-louis-mo',
    'missouri-county-moving-co',
    'missouri-express-movers',
  ],
};

export const missouriCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_MO_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'missouri',
    countySlug,
    moverIds,
  }));