import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Alabama county mover lists — grows incrementally per batch */
const CURATED_AL_COUNTIES: Record<string, string[]> = {
  jefferson: [
    'two-men-and-a-truck-birmingham',
    'college-hunks-moving-birmingham',
    'new-latitude-movers-birmingham',
    'secure-moving-birmingham',
    'all-my-sons-birmingham',
    'armstrong-relocation-birmingham',
    'lambert-transfer-birmingham',
    'motivated-movers-birmingham',
    'movedaddy-birmingham',
    'fortson-moving-birmingham',
  ],
};

export const alabamaCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_AL_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'alabama',
    countySlug,
    moverIds,
  }));