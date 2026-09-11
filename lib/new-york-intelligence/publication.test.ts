import assert from 'node:assert/strict';
import test from 'node:test';
import {
  bulletinApplicationIsCurrentAuthority,
  nydotAuthorityCoversInterstateMove,
  usdotAloneProvesNyIntrastateAuthority,
} from './identity';
import { NY_MOVE_PUBLIC_FINGERPRINT, NY_MOVE_PUBLIC_PATH } from './publication';
import { assertNewYorkMoveSnapshot, NEW_YORK_MOVE_SNAPSHOT } from './snapshot';

test('NY-MOVE-001 snapshot grains stay separate', () => {
  const snap = assertNewYorkMoveSnapshot();
  assert.equal(snap.version, 'move-ny-state-intel-v1');
  assert.equal(snap.fingerprint, NY_MOVE_PUBLIC_FINGERPRINT);
  assert.equal(NY_MOVE_PUBLIC_PATH, '/new-york');
  assert.equal(snap.current_hhg_roster.rows, null);
  assert.equal(snap.bulletin_2026.issues, 36);
  assert.equal(snap.bulletin_2026.hhgApplicationObservations, 108);
  assert.equal(snap.bulletin_2026.distinctCaseNumbers, 103);
  assert.equal(snap.federal.exact_state_to_federal_crosswalks, 0);
  assert.equal(snap.expansion_ledger.NET_NEW_PUBLIC_MOVE_PROFILES, 0);
  assert.equal(snap.expansion_ledger.EXISTING_ORGANIZATIONS_ENRICHED, 0);
  assert.equal(bulletinApplicationIsCurrentAuthority(), false);
  assert.equal(nydotAuthorityCoversInterstateMove(), false);
  assert.equal(usdotAloneProvesNyIntrastateAuthority(), false);
  assert.equal(snap.bulletin_2026.application_ne_authority, true);
  assert.equal(snap.complaints.complaint_ne_violation, true);
  assert.equal(snap.insurance.insurance_ne_quality, true);
  assert.equal(snap.tariff.tariff_ne_quality, true);
  assert.equal(NEW_YORK_MOVE_SNAPSHOT.no_new_york_local_routes, true);
});

test('nested mutations change the NY snapshot fingerprint input', () => {
  const mutated = structuredClone(NEW_YORK_MOVE_SNAPSHOT) as { bulletin_2026: { hhgApplicationObservations: number } };
  mutated.bulletin_2026.hhgApplicationObservations = 109;
  assert.notEqual(
    JSON.stringify(mutated.bulletin_2026.hhgApplicationObservations),
    JSON.stringify(NEW_YORK_MOVE_SNAPSHOT.bulletin_2026.hhgApplicationObservations),
  );
});
