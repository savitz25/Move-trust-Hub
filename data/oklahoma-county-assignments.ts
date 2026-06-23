import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Oklahoma county mover lists — grows incrementally per batch */
const CURATED_OK_COUNTIES: Record<string, string[]> = {
  oklahoma: [
    'two-men-and-a-truck-oklahoma-ok',
    'all-my-sons-oklahoma-city-ok',
    'oklahoma-capital-movers',
    'oklahoma-family-movers',
    'college-hunks-oklahoma-city-ok',
    'coleman-worldwide-oklahoma-city-ok',
    'north-american-van-lines-oklahoma-city-ok',
    'oklahoma-regional-moving',
    'oklahoma-premier-moving',
    'oklahoma-express-movers',
  ],
  tulsa: [
    'two-men-and-a-truck-tulsa-ok',
    'all-my-sons-tulsa-ok',
    'oklahoma-local-lines',
    'oklahoma-express-movers',
    'oklahoma-regional-moving',
    'college-hunks-tulsa-ok',
    'coleman-worldwide-tulsa-ok',
    'north-american-van-lines-tulsa-ok',
    'oklahoma-premier-moving',
    'oklahoma-pro-movers',
  ],
  cleveland: [
    'two-men-and-a-truck-cleveland-ok',
    'oklahoma-premier-moving',
    'oklahoma-pro-movers',
    'two-men-and-a-truck-oklahoma-ok',
    'all-my-sons-oklahoma-city-ok',
    'oklahoma-family-movers',
    'college-hunks-oklahoma-city-ok',
    'coleman-worldwide-oklahoma-city-ok',
    'oklahoma-capital-movers',
    'north-american-van-lines-oklahoma-city-ok',
  ],
};

export const oklahomaCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_OK_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'oklahoma',
    countySlug,
    moverIds,
  }));