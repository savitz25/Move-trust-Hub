/**
 * Phase 1 regression: locality gates + recommendation safety.
 * Run: npx tsx scripts/check-locality-and-recommendations.ts
 */
import { classifyMoverLocality, LOCAL_HQ_MAX_MILES } from '../lib/local-movers/locality-rules';
import {
  isOutOfServiceMover,
  isRecommendationEligible,
  isSevereBbbGrade,
  selectRecommendedMovers,
} from '../lib/local-movers/recommendation-safety';
import { isLocalOrInStateMover } from '../lib/local-movers/segment-county-movers';
import type { LocalCounty, LocalMover } from '../lib/local-movers/types';

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error('FAIL:', msg);
    process.exitCode = 1;
  } else {
    console.log('ok:', msg);
  }
}

const laCounty: LocalCounty = {
  slug: 'los-angeles',
  name: 'Los Angeles',
  stateCode: 'CA',
  stateSlug: 'california',
  seat: 'Los Angeles',
};

const eurekaCounty: LocalCounty = {
  slug: 'humboldt',
  name: 'Humboldt',
  stateCode: 'CA',
  stateSlug: 'california',
  seat: 'Eureka',
};

const distantSameState: LocalMover = {
  id: 'test-la-distant',
  name: 'SoCal Distant Movers',
  city: 'San Diego',
  headquartersState: 'CA',
  rating: 4.9,
  reviewCount: 200,
  shortDescription: 'Serving California',
  services: ['Local'],
  isLocalOnly: false,
};

const trueLocal: LocalMover = {
  id: 'test-la-local',
  name: 'LA Local Movers',
  city: 'Los Angeles',
  headquartersState: 'CA',
  rating: 4.5,
  reviewCount: 40,
  shortDescription: 'Los Angeles County specialists',
  services: ['Local'],
  isLocalOnly: false,
};

const oosCarrier: LocalMover = {
  id: 'test-oos',
  name: 'Out of Service Co',
  city: 'Los Angeles',
  headquartersState: 'CA',
  rating: 5,
  reviewCount: 100,
  shortDescription: 'Local',
  services: ['Local'],
  outOfService: true,
};

const bbbF: LocalMover = {
  id: 'test-f',
  name: 'F Grade Co',
  city: 'Los Angeles',
  headquartersState: 'CA',
  rating: 4.8,
  reviewCount: 80,
  shortDescription: 'Local',
  services: ['Local'],
  bbbRating: 'F',
};

// Distant same-state must NOT be Local on Humboldt (Eureka)
assert(
  classifyMoverLocality(distantSameState, eurekaCounty).class !== 'local',
  'San Diego HQ is not local in Humboldt County'
);
assert(
  !isLocalOrInStateMover(distantSameState, eurekaCounty),
  'isLocalOrInStateMover rejects distant same-state'
);

// Seat match is local
assert(
  classifyMoverLocality(trueLocal, laCounty).class === 'local',
  'LA city HQ is local in Los Angeles County'
);

// OOS / F never recommended
assert(isOutOfServiceMover(oosCarrier), 'OOS detected');
assert(isSevereBbbGrade('F'), 'BBB F detected');
assert(!isRecommendationEligible(oosCarrier), 'OOS not recommendation-eligible');
assert(!isRecommendationEligible(bbbF), 'BBB F not recommendation-eligible');

const recs = selectRecommendedMovers(
  [oosCarrier, bbbF, trueLocal, distantSameState],
  laCounty,
  { limit: 5, requireLocal: true }
);
assert(
  recs.every((m) => m.id === 'test-la-local'),
  'recommendations only true-local safe movers'
);
assert(
  !recs.some((m) => m.outOfService || m.bbbRating === 'F'),
  'no OOS or F-grade in recommendation set'
);

assert(LOCAL_HQ_MAX_MILES === 50, 'published 50-mile threshold');

if (process.exitCode) {
  console.error('\nLocality / recommendation checks failed.');
  process.exit(1);
}
console.log('\nAll Phase 1 locality + recommendation checks passed.');
