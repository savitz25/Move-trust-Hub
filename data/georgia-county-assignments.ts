import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Georgia county mover lists — real catalog IDs only (no regional-* placeholders) */
const CURATED_GA_COUNTIES: Record<string, string[]> = {
  fulton: [
    'two-men-and-a-truck-atlanta',
    'mark-the-mover-atlanta',
    'college-hunks-moving-atlanta',
    'all-my-sons-atlanta',
    'zip-moving-atlanta',
    'atlanta-peach-movers',
    'bulldog-movers-atlanta',
    'ac-white-transfer-atlanta',
  ],
  gwinnett: [
    'two-men-and-a-truck-atlanta',
    'all-my-sons-atlanta',
    'bulldog-movers-atlanta',
    'college-hunks-moving-atlanta',
    'zip-moving-atlanta',
    'mark-the-mover-atlanta',
    'atlanta-peach-movers',
    'ac-white-transfer-atlanta',
  ],
  cobb: [
    'two-men-and-a-truck-atlanta',
    'mark-the-mover-atlanta',
    'bulldog-movers-atlanta',
    'all-my-sons-atlanta',
    'college-hunks-moving-atlanta',
    'zip-moving-atlanta',
    'atlanta-peach-movers',
    'ac-white-transfer-atlanta',
  ],
  dekalb: [
    'mark-the-mover-atlanta',
    'two-men-and-a-truck-atlanta',
    'college-hunks-moving-atlanta',
    'all-my-sons-atlanta',
    'zip-moving-atlanta',
    'atlanta-peach-movers',
    'ac-white-transfer-atlanta',
    'bulldog-movers-atlanta',
  ],
  clayton: [
    'two-men-and-a-truck-atlanta',
    'all-my-sons-atlanta',
    'college-hunks-moving-atlanta',
    'atlanta-peach-movers',
  ],
  cherokee: [
    'bulldog-movers-atlanta',
    'two-men-and-a-truck-atlanta',
    'all-my-sons-atlanta',
    'zip-moving-atlanta',
  ],
  forsyth: [
    'bulldog-movers-atlanta',
    'two-men-and-a-truck-atlanta',
    'all-my-sons-atlanta',
    'zip-moving-atlanta',
  ],
  henry: [
    'two-men-and-a-truck-atlanta',
    'all-my-sons-atlanta',
    'college-hunks-moving-atlanta',
    'mark-the-mover-atlanta',
  ],
  fayette: [
    'two-men-and-a-truck-atlanta',
    'mark-the-mover-atlanta',
    'all-my-sons-atlanta',
    'college-hunks-moving-atlanta',
  ],
  douglas: [
    'two-men-and-a-truck-atlanta',
    'zip-moving-atlanta',
    'all-my-sons-atlanta',
    'atlanta-peach-movers',
  ],
  rockdale: [
    'two-men-and-a-truck-atlanta',
    'all-my-sons-atlanta',
    'college-hunks-moving-atlanta',
    'zip-moving-atlanta',
  ],
  paulding: [
    'two-men-and-a-truck-atlanta',
    'bulldog-movers-atlanta',
    'zip-moving-atlanta',
    'all-my-sons-atlanta',
  ],
};

export const georgiaCountyMoverAssignments: CountyMoverAssignment[] = Object.entries(
  CURATED_GA_COUNTIES
).map(([countySlug, moverIds]) => ({
  stateSlug: 'georgia',
  countySlug,
  moverIds,
}));