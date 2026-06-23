import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Louisiana parish mover lists — grows incrementally per batch */
const CURATED_LA_PARISHES: Record<string, string[]> = {
  'east-baton-rouge': [
    'two-men-and-a-truck-baton-rouge-la',
    'atmosphere-movers-baton-rouge-la',
    'all-my-sons-baton-rouge-la',
    'lee-moving-storage-baton-rouge-la',
    'coleman-worldwide-baton-rouge-la',
    'north-american-van-lines-baton-rouge-la',
    'ds-moving-services-baton-rouge-la',
    'quality-group-baton-rouge-la',
    'college-hunks-baton-rouge-la',
    'fisk-moving-baton-rouge-la',
  ],
};

export const louisianaCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_LA_PARISHES).map(([countySlug, moverIds]) => ({
    stateSlug: 'louisiana',
    countySlug,
    moverIds,
  }));