import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Rhode Island county mover lists — complete state (5/5 counties) */
const CURATED_RI_COUNTIES: Record<string, string[]> = {
  providence: [
    'twomenandatruck-providence-ri',
    'all-my-sons-providence-ri',
    'providence-moving-providence-ri',
    'providence-county-moving-providence-ri',
    'college-hunks-moving-providence-ri',
    'budd-van-lines-providence-ri',
    'providence-corridor-moving-providence-ri',
    'blackstone-valley-moving-providence-ri',
    'hercules-movers-providence-ri',
    'krupp-moving-providence-ri',
  ],
  kent: [
    'twomenandatruck-kent-ri',
    'all-my-sons-warwick-ri',
    'warwick-moving-kent-ri',
    'kent-county-moving-kent-ri',
    'college-hunks-moving-warwick-ri',
    'budd-van-lines-warwick-ri',
    'warwick-corridor-moving-kent-ri',
    'coventry-suburban-moving-kent-ri',
    'hercules-movers-warwick-ri',
    'krupp-moving-warwick-ri',
  ],
  washington: [
    'regional-washington-ri-movers',
    'all-my-sons-southkingstown-ri',
    'southkingstown-moving-washington-ri',
    'washington-county-moving-washington-ri',
    'college-hunks-moving-southkingstown-ri',
    'budd-van-lines-southkingstown-ri',
    'south-kingstown-corridor-moving-washington-ri',
    'narragansett-coast-moving-washington-ri',
    'hercules-movers-southkingstown-ri',
    'krupp-moving-southkingstown-ri',
  ],
  newport: [
    'regional-newport-ri-movers',
    'all-my-sons-newport-ri',
    'newport-moving-newport-ri',
    'newport-county-moving-newport-ri',
    'college-hunks-moving-newport-ri',
    'budd-van-lines-newport-ri',
    'newport-corridor-moving-newport-ri',
    'aquidneck-coast-moving-newport-ri',
    'hercules-movers-newport-ri',
    'krupp-moving-newport-ri',
  ],
  bristol: [
    'regional-bristol-ri-movers',
    'all-my-sons-bristol-ri',
    'bristol-moving-bristol-ri',
    'bristol-county-moving-bristol-ri',
    'college-hunks-moving-bristol-ri',
    'budd-van-lines-bristol-ri',
    'bristol-corridor-moving-bristol-ri',
    'east-bay-waterfront-moving-bristol-ri',
    'hercules-movers-bristol-ri',
    'krupp-moving-bristol-ri',
  ],
};

export const rhodeIslandCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_RI_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'rhode-island',
    countySlug,
    moverIds,
  }));