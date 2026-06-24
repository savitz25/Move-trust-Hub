import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Indiana county mover lists — real catalog IDs only (no regional-* placeholders) */
const CURATED_IN_COUNTIES: Record<string, string[]> = {
  marion: [
    'two-men-and-a-truck-marion-in',
    'indianapolis-moving-marion-in',
    'marion-county-moving-marion-in',
    'budd-van-lines-indianapolis-in',
    'midnight-moving-indianapolis-in',
    'circle-city-moving-marion-in',
    'hoosier-moving-marion-in',
    'two-men-and-a-truck-hamilton-in',
    'carmel-moving-hamilton-in',
    'fishers-moving-hamilton-in',
  ],
  lake: [
    'two-men-and-a-truck-lake-in',
    'crown-point-moving-lake-in',
    'lake-county-moving-lake-in',
    'merrillville-moving-lake-in',
    'hammond-moving-lake-in',
    'gary-moving-lake-in',
    'two-men-and-a-truck-lake-il',
    'schroeder-moving-dupage-il',
    'coleman-worldwide-chicago-il',
    'mid-west-moving-storage-chicago-il',
  ],
  allen: [
    'two-men-and-a-truck-allen-in',
    'fort-wayne-moving-allen-in',
    'allen-county-moving-allen-in',
    'summit-moving-allen-in',
    'around-town-moving-allen-in',
    'two-men-and-a-truck-marion-in',
    'indianapolis-moving-marion-in',
    'marion-county-moving-marion-in',
    'hoosier-moving-marion-in',
    'circle-city-moving-marion-in',
  ],
  hamilton: [
    'two-men-and-a-truck-hamilton-in',
    'carmel-moving-hamilton-in',
    'hamilton-county-moving-hamilton-in',
    'fishers-moving-hamilton-in',
    'noblesville-moving-hamilton-in',
    'two-men-and-a-truck-marion-in',
    'indianapolis-moving-marion-in',
    'marion-county-moving-marion-in',
    'budd-van-lines-indianapolis-in',
    'midnight-moving-indianapolis-in',
  ],
  'st-joseph': [
    'two-men-and-a-truck-st-joseph-in',
    'south-bend-moving-st-joseph-in',
    'st-joseph-county-moving-st-joseph-in',
    'mishawaka-moving-st-joseph-in',
    'nd-area-moving-st-joseph-in',
    'two-men-and-a-truck-allen-in',
    'fort-wayne-moving-allen-in',
    'allen-county-moving-allen-in',
    'summit-moving-allen-in',
    'around-town-moving-allen-in',
  ],
};

export const indianaCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_IN_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'indiana',
    countySlug,
    moverIds,
  }));