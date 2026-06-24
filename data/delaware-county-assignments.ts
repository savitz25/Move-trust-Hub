import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Delaware county mover lists — real catalog IDs only */
const CURATED_DE_COUNTIES: Record<string, string[]> = {
  'new-castle': [
    'twomenandatruck-newcastle-de',
    'all-my-sons-wilmington-de',
    'wilmington-moving-new-castle-de',
    'new-castle-county-moving-new-castle-de',
    'college-hunks-moving-wilmington-de',
    'budd-van-lines-wilmington-de',
    'delaware-river-moving-new-castle-de',
    'brandywine-valley-moving-new-castle-de',
    'hercules-movers-wilmington-de',
    'krupp-moving-wilmington-de',
    'philadelphia-metro-moving-new-castle-de',
    'corporate-relocation-wilmington-new-castle-de',
  ],
  sussex: [
    'two-men-and-a-truck-sussex-de',
    'all-my-sons-georgetown-de',
    'georgetown-moving-sussex-de',
    'sussex-county-moving-sussex-de',
    'college-hunks-moving-georgetown-de',
    'budd-van-lines-georgetown-de',
    'delaware-beach-moving-sussex-de',
    'coastal-sussex-moving-sussex-de',
    'hercules-movers-georgetown-de',
    'krupp-moving-georgetown-de',
  ],
  kent: [
    'two-men-and-a-truck-kent-de',
    'all-my-sons-dover-de',
    'dover-moving-kent-de',
    'kent-county-moving-kent-de',
    'college-hunks-moving-dover-de',
    'budd-van-lines-dover-de',
    'central-delaware-moving-kent-de',
    'delaware-bay-moving-kent-de',
    'hercules-movers-dover-de',
    'krupp-moving-dover-de',
  ],
};

export const delawareCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_DE_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'delaware',
    countySlug,
    moverIds,
  }));