/**
 * Unit checks for local county + hub placement eligibility.
 * Run: npx tsx scripts/check-local-placement.ts
 */
import { evaluateCuratedListing, isCuratedMover } from '../lib/trust/curated-listing-policy';
import { countyKeysForHubMarket } from '../lib/destinations/hub-adjacent-counties';
import {
  findNearbyHubsForCounties,
  getCountyCentroid,
  haversineMiles,
} from '../lib/destinations/hub-proximity';
import { companyToLocalMover } from '../lib/local-movers/company-to-local-mover';

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error('FAIL:', msg);
    process.exitCode = 1;
  } else {
    console.log('ok:', msg);
  }
}

// Local onboarded profile without USDOT must display on county pages
const localMover = companyToLocalMover({
  slug: 'otterly-elite-movers',
  name: 'Otterly Elite Movers',
  short_description: 'Local OR movers',
  headquarters: 'Winston, OR',
  usdot_number: null,
  overall_rating: 5,
  review_count: 25,
  services: ['Full Service'],
});
assert(localMover.id === 'directory-otterly-elite-movers', 'directory id prefix');
assert(isCuratedMover(localMover), 'local directory profile is curated/displayable');
assert(
  evaluateCuratedListing(localMover).reason === 'onboarded_local_directory_profile',
  'reason is onboarded_local_directory_profile'
);

// Hub adjacent: Eugene includes Douglas
const eugeneKeys = countyKeysForHubMarket('eugene-or', ['lane-or']);
assert(eugeneKeys.includes('lane-or'), 'eugene has lane');
assert(eugeneKeys.includes('douglas-or'), 'eugene includes douglas adjacent');
assert(eugeneKeys[0] === 'lane-or', 'primary county first for prioritization');

// SoCal: Orange/San Diego feed Inland Empire hub (~150 mi proximity)
const ieKeys = countyKeysForHubMarket('riverside-san-bernardino-ca', [
  'riverside-ca',
  'san-bernardino-ca',
]);
assert(ieKeys[0] === 'riverside-ca', 'IE primary first');
assert(ieKeys.includes('orange-ca'), 'IE includes Orange County proximity');
assert(ieKeys.includes('san-diego-ca'), 'IE includes San Diego proximity');

const oc = getCountyCentroid('orange-ca');
const iePt = { lat: 33.9533, lng: -117.3962 };
assert(Boolean(oc), 'orange-ca has centroid');
if (oc) {
  const miles = haversineMiles(oc, iePt);
  assert(miles < 150, `Orange→IE within 150 mi (got ${Math.round(miles)})`);
}

const hubs = findNearbyHubsForCounties([
  { stateSlug: 'california', countySlug: 'orange' },
  { stateSlug: 'california', countySlug: 'san-diego' },
]);
assert(
  hubs.some((h) => h.market.slug === 'riverside-san-bernardino-ca'),
  'OC+SD finds Inland Empire hub'
);

if (process.exitCode) {
  console.error('\nLocal placement checks failed.');
  process.exit(1);
}
console.log('\nAll local placement checks passed.');
