import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  NJ_MOVE_PUBLIC_FINGERPRINT,
  NJ_MOVE_PUBLIC_SNAPSHOT,
  assertNjMovePublicSnapshot,
  selectNjPmwProfileEvidence,
} from './publication';
import { mapNjPmwClass, pwOnlyAppearsInConsumerMoverSearch } from './adapter';

const snap = assertNjMovePublicSnapshot();
assert.equal(snap.fingerprint, NJ_MOVE_PUBLIC_FINGERPRINT);
assert.equal(NJ_MOVE_PUBLIC_SNAPSHOT.osm.years['2025'].novs, 11);
assert.equal(NJ_MOVE_PUBLIC_SNAPSHOT.osm.years['2024'].novs, 23);
assert.equal(NJ_MOVE_PUBLIC_SNAPSHOT.osm.rows.length, 34);
assert.equal(NJ_MOVE_PUBLIC_SNAPSHOT.authority.licenseCountPublished, null);
assert.equal(pwOnlyAppearsInConsumerMoverSearch(), false);
assert.equal(mapNjPmwClass('PW')?.consumerMoverSearch, false);
assert.equal(selectNjPmwProfileEvidence({ legalName: 'Hawes Moving' }).render, false);
assert.equal(selectNjPmwProfileEvidence({ legalName: 'Hawes Moving', city: 'Cinnaminson' }).match, 'REVIEW_REQUIRED');
assert.equal(selectNjPmwProfileEvidence({ usdot: '123456' }).njLicensedBadge, false);
assert.equal(selectNjPmwProfileEvidence({}).njUnlicensedBadge, false);
const artifact = JSON.parse(
  readFileSync('data/reports/nj-move-002-public-snapshot.json', 'utf8'),
) as { fingerprint: string };
assert.equal(artifact.fingerprint, NJ_MOVE_PUBLIC_FINGERPRINT);
console.log('NJ-MOVE-002 publication contract: PASS');
