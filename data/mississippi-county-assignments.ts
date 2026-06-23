import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Mississippi county mover lists — grows incrementally per batch */
const CURATED_MS_COUNTIES: Record<string, string[]> = {
  harrison: [
    'two-men-and-a-truck-gulfport-ms',
    'mighty-men-movers-gulfport-ms',
    'good-movers-gulfport-ms',
    'allsouth-moving-mobile',
    'let-us-move-it-mobile',
    'coleman-worldwide-moving-mobile',
    'handy-guys-moving-mobile',
    'all-my-sons-mobile',
    'two-men-and-a-truck-baldwin',
    'motivated-movers-baldwin',
  ],
  hinds: [
    'two-men-and-a-truck-jackson-ms',
    'armstrong-relocation-jackson-ms',
    'all-my-sons-jackson-ms',
    'helping-hands-moving-jackson-ms',
    'professional-family-relocation-jackson-ms',
    'central-mississippi-movers-jackson-ms',
    'movemint-brandon-ms',
    'strong-brothers-moving-jackson-ms',
    'my-two-movers-brandon-ms',
    'coleman-worldwide-moving-montgomery',
  ],
  desoto: [
    'two-men-and-a-truck-memphis',
    'college-hunks-moving-memphis',
    'all-my-sons-memphis',
    'spyder-moving-memphis',
    'big-league-movers-memphis',
    'my-town-movers-memphis',
    'memphis-mighty-movers-ms',
    'over-and-beyond-movers-desoto-ms',
    'red-carpet-moving-memphis',
    'wrightway-moving-memphis',
  ],
  rankin: [
    'movemint-brandon-ms',
    'two-men-and-a-truck-jackson-ms',
    'armstrong-relocation-jackson-ms',
    'all-my-sons-jackson-ms',
    'helping-hands-moving-jackson-ms',
    'professional-family-relocation-jackson-ms',
    'central-mississippi-movers-jackson-ms',
    'my-two-movers-brandon-ms',
    'strong-brothers-moving-jackson-ms',
    'coleman-worldwide-moving-montgomery',
  ],
  jackson: [
    'two-men-and-a-truck-gulfport-ms',
    'ready-movers-moss-point-ms',
    'allsouth-moving-mobile',
    'coleman-worldwide-moving-mobile',
    'handy-guys-moving-mobile',
    'griner-moving-services-mobile',
    'all-my-sons-mobile',
    'mighty-men-movers-gulfport-ms',
    'let-us-move-it-mobile',
    'rs-moving-warehousing-mobile',
  ],
};

export const mississippiCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_MS_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'mississippi',
    countySlug,
    moverIds,
  }));