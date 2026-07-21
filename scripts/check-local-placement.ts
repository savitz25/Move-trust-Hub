/**
 * Unit checks for local county + hub placement eligibility.
 * Run: npx tsx scripts/check-local-placement.ts
 */
import { evaluateCuratedListing, isCuratedMover } from '../lib/trust/curated-listing-policy';
import { countyKeysForHubMarket } from '../lib/destinations/hub-adjacent-counties';
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

if (process.exitCode) {
  console.error('\nLocal placement checks failed.');
  process.exit(1);
}
console.log('\nAll local placement checks passed.');
