import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  CALIFORNIA_MOVE_SNAPSHOT,
  assertCaliforniaMoveSnapshot,
} from './snapshot';
import { CA_MOVE_PUBLIC_FINGERPRINT } from './publication';
import {
  calTImpliesFmcsaInterstate,
  fmcsaActiveImpliesCaliforniaLicensed,
  selectCaMoveProfileEvidence,
} from './identity';

const snap = assertCaliforniaMoveSnapshot();
assert.equal(snap.fingerprint, CA_MOVE_PUBLIC_FINGERPRINT);
assert.equal(CALIFORNIA_MOVE_SNAPSHOT.enforcement.rows, 132);
assert.equal(CALIFORNIA_MOVE_SNAPSHOT.enforcement.unlicensed_rows, 120);
assert.equal(CALIFORNIA_MOVE_SNAPSHOT.enforcement.exact_cal_t_rows, 12);
assert.equal(CALIFORNIA_MOVE_SNAPSHOT.authority.license_count_published, null);
assert.equal(calTImpliesFmcsaInterstate(), false);
assert.equal(fmcsaActiveImpliesCaliforniaLicensed(), false);
assert.equal(selectCaMoveProfileEvidence({ legalName: 'Acme Moving' }).render, false);
assert.equal(selectCaMoveProfileEvidence({ legalName: 'Acme Moving', city: 'Fresno' }).match, 'REVIEW_REQUIRED');
assert.equal(selectCaMoveProfileEvidence({ usdot: '123456' }).calTLicensedBadge, false);
assert.equal(selectCaMoveProfileEvidence({}).californiaUnlicensedBadge, false);
const artifact = JSON.parse(readFileSync('data/reports/ca-move-001-public-snapshot.json', 'utf8')) as {
  fingerprint: string;
};
assert.equal(artifact.fingerprint, CA_MOVE_PUBLIC_FINGERPRINT);
console.log('CA-MOVE-001 publication contract: PASS');
