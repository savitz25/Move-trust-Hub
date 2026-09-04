import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TEXAS_MOVE_SNAPSHOT, assertTexasMoveSnapshot } from './snapshot';
import { TX_MOVE_PUBLIC_FINGERPRINT } from './publication';
import {
  fmcsaActiveImpliesTexasIntrastateAuthorized,
  selectTxMoveProfileEvidence,
  txdmvCertificateImpliesFmcsaInterstate,
  usdotImpliesInterstateOperatingAuthority,
} from './identity';

const snap = assertTexasMoveSnapshot();
assert.equal(snap.fingerprint, TX_MOVE_PUBLIC_FINGERPRINT);
assert.equal(TEXAS_MOVE_SNAPSHOT.authority.license_count_published, null);
assert.equal(TEXAS_MOVE_SNAPSHOT.tow.hero_inclusion, false);
assert.equal(TEXAS_MOVE_SNAPSHOT.tow.count_from_ath_tx_001, 3797);
assert.equal(txdmvCertificateImpliesFmcsaInterstate(), false);
assert.equal(fmcsaActiveImpliesTexasIntrastateAuthorized(), false);
assert.equal(usdotImpliesInterstateOperatingAuthority(), false);
assert.equal(selectTxMoveProfileEvidence({ legalName: 'Acme Moving' }).render, false);
assert.equal(selectTxMoveProfileEvidence({ legalName: 'Acme Moving', city: 'Austin' }).match, 'REVIEW_REQUIRED');
assert.equal(selectTxMoveProfileEvidence({ usdot: '123456' }).txdmvLicensedBadge, false);
assert.equal(selectTxMoveProfileEvidence({}).texasUnlicensedBadge, false);
assert.equal(snap.crosswalk.coverage, 'SOURCE_NOT_ACQUIRED');
assert.equal(snap.enforcement.profile_attachments, 0);
assert.ok(snap.findings.length >= 3);
const artifact = JSON.parse(readFileSync('data/reports/tx-move-001-public-snapshot.json', 'utf8')) as {
  fingerprint: string;
};
assert.equal(artifact.fingerprint, TX_MOVE_PUBLIC_FINGERPRINT);
console.log('TX-MOVE-001 publication contract: PASS');
