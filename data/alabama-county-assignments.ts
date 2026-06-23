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
  baldwin: [
    'two-men-and-a-truck-baldwin',
    'motivated-movers-baldwin',
    'college-hunks-moving-baldwin',
    'chosen-one-movers-baldwin',
    'coleman-worldwide-moving-mobile',
    'handy-guys-moving-mobile',
    'griner-moving-services-mobile',
    'all-my-sons-mobile',
    'j-w-moving-storage-mobile',
    'rs-moving-warehousing-mobile',
  ],
  tuscaloosa: [
    'two-men-and-a-truck-tuscaloosa',
    'motivated-movers-tuscaloosa',
    'awesome-moving-tuscaloosa',
    'new-latitude-movers-birmingham',
    'secure-moving-birmingham',
    'all-my-sons-birmingham',
    'armstrong-relocation-birmingham',
    'movedaddy-birmingham',
    'lambert-transfer-birmingham',
    'fortson-moving-birmingham',
  ],
  shelby: [
    'two-men-and-a-truck-shelby',
    'motivated-movers-birmingham',
    'secure-moving-birmingham',
    'armstrong-relocation-birmingham',
    'all-my-sons-birmingham',
    'changing-spaces-moving-birmingham',
    'new-latitude-movers-birmingham',
    'college-hunks-moving-birmingham',
    'lambert-transfer-birmingham',
    'movedaddy-birmingham',
  ],
  montgomery: [
    'two-men-and-a-truck-montgomery',
    'admiral-movers-montgomery',
    'mccorquodale-transfer-montgomery',
    'coleman-worldwide-moving-montgomery',
    'motivated-movers-montgomery',
    'c-r-movers-montgomery',
    'all-my-sons-montgomery',
    'jubilee-city-movers-montgomery',
    'secure-moving-birmingham',
    'new-latitude-movers-birmingham',
  ],
};

export const alabamaCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_AL_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'alabama',
    countySlug,
    moverIds,
  }));