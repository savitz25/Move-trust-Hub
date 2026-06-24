import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Alaska borough mover lists — major population centers (5/5) */
const CURATED_AK_COUNTIES: Record<string, string[]> = {
  anchorage: [
    'twomenandatruck-anchorage-ak',
    'all-my-sons-anchorage-ak',
    'anchorage-moving-anchorage-ak',
    'anchorage-county-moving-anchorage-ak',
    'college-hunks-moving-anchorage-ak',
    'budd-van-lines-anchorage-ak',
    'anchorage-corridor-moving-anchorage-ak',
    'municipality-metro-moving-anchorage-ak',
    'hercules-movers-anchorage-ak',
    'krupp-moving-anchorage-ak',
  ],
  'matanuska-susitna': [
    'regional-matanuska-susitna-ak-movers',
    'all-my-sons-palmer-ak',
    'palmer-moving-matanuska-susitna-ak',
    'matanuska-susitna-county-moving-matanuska-susitna-ak',
    'college-hunks-moving-palmer-ak',
    'budd-van-lines-palmer-ak',
    'palmer-corridor-moving-matanuska-susitna-ak',
    'mat-su-valley-moving-matanuska-susitna-ak',
    'hercules-movers-palmer-ak',
    'krupp-moving-palmer-ak',
  ],
  'fairbanks-north-star': [
    'regional-fairbanksnorthstar-ak-movers',
    'all-my-sons-fairbanks-ak',
    'fairbanks-moving-fairbanks-north-star-ak',
    'fairbanks-north-star-county-moving-fairbanks-north-star-ak',
    'college-hunks-moving-fairbanks-ak',
    'budd-van-lines-fairbanks-ak',
    'fairbanks-corridor-moving-fairbanks-north-star-ak',
    'north-star-borough-moving-fairbanks-north-star-ak',
    'hercules-movers-fairbanks-ak',
    'krupp-moving-fairbanks-ak',
  ],
  'kenai-peninsula': [
    'regional-kenaipeninsula-ak-movers',
    'all-my-sons-kenai-ak',
    'kenai-moving-kenai-peninsula-ak',
    'kenai-peninsula-county-moving-kenai-peninsula-ak',
    'college-hunks-moving-kenai-ak',
    'budd-van-lines-kenai-ak',
    'kenai-corridor-moving-kenai-peninsula-ak',
    'peninsula-coastal-moving-kenai-peninsula-ak',
    'hercules-movers-kenai-ak',
    'krupp-moving-kenai-ak',
  ],
  juneau: [
    'regional-juneau-ak-movers',
    'all-my-sons-juneau-ak',
    'juneau-moving-juneau-ak',
    'juneau-county-moving-juneau-ak',
    'college-hunks-moving-juneau-ak',
    'budd-van-lines-juneau-ak',
    'juneau-corridor-moving-juneau-ak',
    'capital-coast-moving-juneau-ak',
    'hercules-movers-juneau-ak',
    'krupp-moving-juneau-ak',
  ],
};

export const alaskaCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_AK_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'alaska',
    countySlug,
    moverIds,
  }));