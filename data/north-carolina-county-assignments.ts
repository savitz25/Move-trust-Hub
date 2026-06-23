import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated North Carolina county mover lists — grows incrementally per batch */
const CURATED_NC_COUNTIES: Record<string, string[]> = {
  wake: [
    'two-men-and-a-truck-raleigh',
    'college-hunks-moving-raleigh',
    'little-guys-movers-raleigh',
    'athens-moving-experts-raleigh',
    'miracle-movers-raleigh',
    'crabtree-family-moving-raleigh',
    'excel-moving-storage-raleigh',
    'all-my-sons-raleigh',
    'raleigh-moving-company-raleigh',
    'next-stop-movers-raleigh',
  ],
  mecklenburg: [
    'two-men-and-a-truck-charlotte-nc',
    'college-hunks-moving-charlotte',
    'gentle-giants-moving-charlotte',
    'you-move-me-charlotte',
    'suddath-charlotte',
    'road-haugs-moving-charlotte',
    'flex-moving-storage-charlotte',
    'all-my-sons-charlotte-nc',
    'move-and-go-charlotte',
    'make-a-move-charlotte',
  ],
};

export const northCarolinaCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_NC_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'north-carolina',
    countySlug,
    moverIds,
  }));