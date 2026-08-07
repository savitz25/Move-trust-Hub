/**
 * Phase 2 data-quality regression checks.
 * Run: npx tsx scripts/check-data-quality-phase2.ts
 */
import { parseHeadquarters } from '../lib/local-movers/parse-headquarters';
import { looksLikeStreetAddress, sanitizeCityLocality } from '../lib/data-quality/location';
import {
  buildDedupIdentity,
  dedupeEntitiesByIdentity,
  pickCanonicalEntity,
} from '../lib/data-quality/entity-dedup';
import { normalizeServiceTags } from '../lib/data-quality/display-normalize';
import {
  evaluateDataQualityAlarms,
  allowVerifiedPresentation,
} from '../lib/data-quality/consistency-alarms';
import {
  shouldShowAvgPrice,
  shouldShowReputationScore,
} from '../lib/data-quality/metrics';
import { primaryRegulatoryDate } from '../lib/data-quality/record-dates';

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error('FAIL:', msg);
    process.exitCode = 1;
  } else {
    console.log('ok:', msg);
  }
}

// Location parsing
assert(looksLikeStreetAddress('123 Main St'), 'street detected');
assert(!looksLikeStreetAddress('Miami'), 'city ok');
assert(sanitizeCityLocality('Suite 200').quarantined, 'suite quarantined');
const hq = parseHeadquarters('123 Main Street, Austin, TX 78701');
assert(hq.stateCode === 'TX', 'state from address');
assert(!looksLikeStreetAddress(hq.city || 'x') || hq.city === 'Austin', `city is locality got=${hq.city}`);

// Dedup by USDOT
const a = {
  slug: 'acme-movers-2',
  name: 'Acme Movers LLC',
  usdotNumber: '1234567',
  isVerified: false,
  reputationScore: 40,
  reviewCount: 10,
};
const b = {
  slug: 'acme-movers',
  name: 'Acme Movers',
  usdotNumber: '1234567',
  isVerified: true,
  reputationScore: 80,
  reviewCount: 50,
};
assert(pickCanonicalEntity(a, b).slug === 'acme-movers', 'canonical prefers clean slug + verified');
const { unique, suppressed } = dedupeEntitiesByIdentity([a, b]);
assert(unique.length === 1 && unique[0]!.slug === 'acme-movers', 'dedupe list collapses USDOT peers');
assert(suppressed.length === 1, 'one suppressed');
assert(
  buildDedupIdentity({ name: 'Acme', usdot: '1234567' }).compositeKey === 'usdot:1234567',
  'usdot key'
);

// Attribute normalize
assert(
  normalizeServiceTags(['Carrier', 'carrier', 'Full Service', 'Full Service']).length === 2,
  'service tags deduped'
);

// Metrics
assert(!shouldShowAvgPrice(0), 'suppress zero price');
assert(!shouldShowReputationScore({ reputationScore: 0, reviewCount: 0, overallRating: 0 }), 'suppress empty rep');

// Dates: no FMCSA → no fake regulatory date from lastUpdated alone for primary
assert(
  primaryRegulatoryDate({ fmcsaLastChecked: null, lastUpdated: '2026-01-01' }) === null,
  'no decorative regulatory date from lastUpdated only'
);
assert(
  primaryRegulatoryDate({ fmcsaLastChecked: '2026-06-01', lastUpdated: '2026-01-01' }) ===
    '2026-06-01',
  'prefer FMCSA check'
);

// Alarms
const localNational = evaluateDataQualityAlarms({
  name: 'Local Co',
  serviceScope: 'intrastate',
  coverage: 'All 50 States',
  isLocalOnly: true,
});
assert(
  localNational.some((a) => a.code === 'local_with_national_coverage'),
  'local+national flagged'
);
const oosVerified = evaluateDataQualityAlarms({
  name: 'OOS Co',
  outOfService: true,
  isVerified: true,
  usdotNumber: '999',
});
assert(oosVerified.some((a) => a.severity === 'block'), 'OOS+verified blocked');
assert(!allowVerifiedPresentation({ outOfService: true, isVerified: true }), 'allowVerified blocks OOS');

const brokerHaul = evaluateDataQualityAlarms({
  name: 'Broker Co',
  entityType: 'Broker',
  shortDescription: 'We haul your household goods on our trucks',
});
assert(brokerHaul.some((a) => a.code === 'broker_implies_hauling'), 'broker hauling language flagged');

if (process.exitCode) {
  console.error('\nPhase 2 data-quality checks failed.');
  process.exit(1);
}
console.log('\nAll Phase 2 data-quality checks passed.');
