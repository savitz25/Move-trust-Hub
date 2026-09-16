import assert from 'node:assert/strict';
import test from 'node:test';
import {
  complaintIsViolation,
  enforcementFrameworkIsMatter,
  insuranceFilingIsActiveAuthority,
  localCartageIsOtherThanLocal,
  mcAloneProvesOrIntrastateAuthority,
  oregonCertificateCoversInterstateMove,
  oregonCertificateIsStatewideTerritory,
  packAndLoaderIsHhgCertificate,
  tariffIsOregonAuthority,
  usdotAloneProvesOrIntrastateAuthority,
} from './identity';
import { lookupOregonCertificate } from './lookup';
import { OR_MOVE_PUBLIC_FINGERPRINT, OR_MOVE_PUBLIC_PATH } from './publication';
import { assertOregonMoveSnapshot, OREGON_MOVE_SNAPSHOT } from './snapshot';

test('OR-MOVE-001 snapshot grains stay separate', () => {
  const snap = assertOregonMoveSnapshot();
  assert.equal(snap.version, 'move-or-state-intel-v1');
  assert.equal(snap.fingerprint, OR_MOVE_PUBLIC_FINGERPRINT);
  assert.equal(OR_MOVE_PUBLIC_PATH, '/oregon');
  assert.equal(snap.current_hhg_roster.rows, 113);
  assert.equal(snap.current_hhg_roster.distinctAuthorityIds, 113);
  assert.equal(snap.federal.exact_state_to_usdot_crosswalks, 0);
  assert.equal(snap.federal.exact_state_to_mc_crosswalks, 0);
  assert.equal(snap.expansion_ledger.NET_NEW_PUBLIC_MOVE_PROFILES, 0);
  assert.equal(snap.expansion_ledger.GRAPH_WRITES, 0);
  assert.equal(snap.complaints.OR_STATE_COMPLAINT_OBSERVATIONS, null);
  assert.equal(snap.enforcement.OR_STATE_ENFORCEMENT_OBSERVATIONS, null);
  assert.equal(oregonCertificateCoversInterstateMove(), false);
  assert.equal(usdotAloneProvesOrIntrastateAuthority(), false);
  assert.equal(mcAloneProvesOrIntrastateAuthority(), false);
  assert.equal(localCartageIsOtherThanLocal(), false);
  assert.equal(oregonCertificateIsStatewideTerritory(), false);
  assert.equal(tariffIsOregonAuthority(), false);
  assert.equal(insuranceFilingIsActiveAuthority(), false);
  assert.equal(packAndLoaderIsHhgCertificate(), false);
  assert.equal(complaintIsViolation(), false);
  assert.equal(enforcementFrameworkIsMatter(), false);
  assert.equal(OREGON_MOVE_SNAPSHOT.no_portland_page, true);
  assert.notEqual(snap.authority_classes.OR_LOCAL_CARTAGE_ROWS, snap.authority_classes.OR_OTHER_THAN_LOCAL_ROWS);
});

test('null complaint and enforcement counts are not zero', () => {
  assert.equal(OREGON_MOVE_SNAPSHOT.complaints.OR_STATE_COMPLAINT_OBSERVATIONS, null);
  assert.notEqual(OREGON_MOVE_SNAPSHOT.complaints.OR_STATE_COMPLAINT_OBSERVATIONS, 0);
  assert.equal(OREGON_MOVE_SNAPSHOT.enforcement.OR_STATE_ENFORCEMENT_OBSERVATIONS, null);
  assert.notEqual(OREGON_MOVE_SNAPSHOT.enforcement.OR_STATE_ENFORCEMENT_OBSERVATIONS, 0);
});

test('exact certificate lookup uses source-native numbers and not USDOT', () => {
  const hit = lookupOregonCertificate('201032');
  assert.equal(hit.hits.length, 1);
  assert.equal(hit.hits[0]?.title, 'All America Moving Inc.');
  assert.equal(hit.hits[0]?.certificateNumber, '201032');
  assert.match(hit.note, /not a USDOT/i);
  const missing = lookupOregonCertificate('999999');
  assert.equal(missing.hits.length, 0);
  const name = lookupOregonCertificate('All America');
  assert.equal(name.hits.length, 0);
});
