import assert from 'node:assert/strict';
import test from 'node:test';
import {
  iccAuthorityCoversInterstateMove,
  insuranceFilingIsActiveAuthority,
  mcAloneProvesIlIntrastateAuthority,
  pccIsHouseholdGoodsLicense,
  usdotAloneProvesIlIntrastateAuthority,
} from './identity';
import { IL_MOVE_PUBLIC_FINGERPRINT, IL_MOVE_PUBLIC_PATH } from './publication';
import { assertIllinoisMoveSnapshot, ILLINOIS_MOVE_SNAPSHOT } from './snapshot';

test('IL-MOVE-001 snapshot grains stay separate', () => {
  const snap = assertIllinoisMoveSnapshot();
  assert.equal(snap.version, 'move-il-state-intel-v1');
  assert.equal(snap.fingerprint, IL_MOVE_PUBLIC_FINGERPRINT);
  assert.equal(IL_MOVE_PUBLIC_PATH, '/illinois');
  assert.equal(snap.current_hhg_roster.rows, null);
  assert.equal(snap.current_hhg_roster.distinctAuthorityIds, null);
  assert.equal(snap.federal.exact_state_to_usdot_crosswalks, 0);
  assert.equal(snap.federal.exact_state_to_mc_crosswalks, 0);
  assert.equal(snap.expansion_ledger.NET_NEW_PUBLIC_MOVE_PROFILES, 0);
  assert.equal(snap.expansion_ledger.EXISTING_ORGANIZATIONS_ENRICHED, 0);
  assert.equal(iccAuthorityCoversInterstateMove(), false);
  assert.equal(usdotAloneProvesIlIntrastateAuthority(), false);
  assert.equal(mcAloneProvesIlIntrastateAuthority(), false);
  assert.equal(pccIsHouseholdGoodsLicense(), false);
  assert.equal(insuranceFilingIsActiveAuthority(), false);
  assert.equal(snap.complaints.complaint_ne_violation, true);
  assert.equal(snap.insurance.insurance_filing_ne_active_authority, true);
  assert.equal(ILLINOIS_MOVE_SNAPSHOT.no_chicago_page, true);
});

test('null roster counts are not zero', () => {
  assert.notEqual(ILLINOIS_MOVE_SNAPSHOT.current_hhg_roster.rows, 0);
  assert.equal(ILLINOIS_MOVE_SNAPSHOT.searchOnlyIsNotZero, true);
});
