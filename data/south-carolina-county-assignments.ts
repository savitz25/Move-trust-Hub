import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated South Carolina county mover lists — grows incrementally per batch */
const CURATED_SC_COUNTIES: Record<string, string[]> = {
  aiken: [
    'two-men-and-a-truck-aiken',
    'coleman-worldwide-augusta',
    'smooth-move-charleston',
    'dailey-moving-storage-aiken',
    'budget-movers-augusta',
    'adsi-moving-augusta',
    'college-hunks-moving-augusta',
  ],
  dorchester: [
    'extra-muscle-moving-charleston',
    'burbage-transport-charleston',
    'nu-lyfe-moving-charleston',
    'college-hunks-moving-charleston',
    'smooth-move-charleston',
  ],
  pickens: [
    'tiger-town-movers-pickens',
    'swamp-rabbit-moving-greenville',
    'two-men-and-a-truck-greenville',
    'college-hunks-moving-greenville',
  ],
  florence: [
    'two-men-and-a-truck-florence',
    'coleman-worldwide-columbia',
    'move-it-williams-florence',
    'all-my-sons-myrtle-beach',
    'smooth-move-charleston',
    'college-hunks-moving-columbia',
    'two-men-and-a-truck-columbia',
  ],
  lancaster: [
    'two-men-and-a-truck-rock-hill',
    'college-hunks-moving-charlotte',
    'all-my-sons-rock-hill',
    'two-men-and-a-truck-charlotte-nc',
    'gentle-giants-moving-charlotte',
  ],
  sumter: [
    'anderson-transfer-sumter',
    'two-men-and-a-truck-columbia',
    'jega-movers-columbia',
    'gentlemen-movers-columbia',
    'college-hunks-moving-columbia',
  ],
};

export const southCarolinaCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_SC_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'south-carolina',
    countySlug,
    moverIds,
  }));