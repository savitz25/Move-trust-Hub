import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated District of Columbia mover list — real catalog IDs only */
const CURATED_DC_COUNTIES: Record<string, string[]> = {
  'district-of-columbia': [
    'twomenandatruck-washingtondc',
    'allmysons-washingtondc',
    'beltway-movers-washingtondc',
    'washington-dc-moving-district-of-columbia-dc',
    'district-of-columbia-local-moving-district-of-columbia-dc',
    'college-hunks-moving-washington-dc-dc',
    'budd-van-lines-washington-dc-dc',
    'capitol-hill-moving-district-of-columbia-dc',
    'georgetown-moving-district-of-columbia-dc',
    'potomac-corridor-moving-district-of-columbia-dc',
    'federal-district-moving-district-of-columbia-dc',
    'nova-relocation-district-of-columbia-dc',
    'hercules-movers-washington-dc-dc',
    'krupp-moving-washington-dc-dc',
    'metro-dc-relocation-district-of-columbia-dc',
  ],
};

export const districtOfColumbiaCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_DC_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'district-of-columbia',
    countySlug,
    moverIds,
  }));