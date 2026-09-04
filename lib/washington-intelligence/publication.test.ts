import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { WASHINGTON_MOVE_SNAPSHOT, assertWashingtonMoveSnapshot } from './snapshot';
import { WA_MOVE_PUBLIC_FINGERPRINT } from './publication';
import {
  fmcsaActiveImpliesUtcIntrastateAuthorized,
  selectWaMoveProfileEvidence,
  ubiImpliesMoverAuthority,
  utcPermitImpliesFmcsaInterstate,
  usdotImpliesInterstateOperatingAuthority,
} from './identity';

const snap = assertWashingtonMoveSnapshot();
assert.equal(snap.fingerprint, WA_MOVE_PUBLIC_FINGERPRINT);
assert.equal(WASHINGTON_MOVE_SNAPSHOT.directory.active_result_count, 284);
assert.equal(WASHINGTON_MOVE_SNAPSHOT.bulk.utc_hhg_bulk_roster, 'SOURCE_NOT_ACQUIRED');
assert.equal(utcPermitImpliesFmcsaInterstate(), false);
assert.equal(fmcsaActiveImpliesUtcIntrastateAuthorized(), false);
assert.equal(usdotImpliesInterstateOperatingAuthority(), false);
assert.equal(ubiImpliesMoverAuthority(), false);
assert.equal(selectWaMoveProfileEvidence({ legalName: 'Acme Moving' }).render, false);
assert.equal(selectWaMoveProfileEvidence({ legalName: 'Acme Moving', city: 'Seattle' }).match, 'REVIEW_REQUIRED');
assert.equal(selectWaMoveProfileEvidence({ usdot: '123456' }).utcAuthorizedBadge, false);
assert.equal(selectWaMoveProfileEvidence({}).washingtonUnlicensedBadge, false);
assert.equal(snap.crosswalk.coverage, 'PARTIAL_RECORD_LEVEL');
assert.equal(snap.enforcement.profile_attachments, 0);
assert.equal(snap.directory.not_scraped, true);
assert.ok(snap.findings.length >= 3);
const artifact = JSON.parse(readFileSync('data/reports/wa-move-001-public-snapshot.json', 'utf8')) as {
  fingerprint: string;
  active_result_count: number;
};
assert.equal(artifact.fingerprint, WA_MOVE_PUBLIC_FINGERPRINT);
assert.equal(artifact.active_result_count, 284);
console.log('WA-MOVE-001 publication contract: PASS');
