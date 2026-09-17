import assert from 'node:assert/strict';
import test from 'node:test';
import {
  complaintIsViolation,
  docketIsAdverseFinding,
  hhgCarrierIsBroker,
  insuranceFilingIsActiveAuthority,
  mcAloneProvesPaPucAuthority,
  officeAddressIsServiceTerritory,
  paHqIsPucAuthority,
  paPucAuthorityCoversInterstateMove,
  usdotAloneProvesPaPucAuthority,
  utilityCodeIsAutomaticallyCarrierId,
} from './identity';
import { lookupPaPucIdentity } from './lookup';
import { PA_MOVE_PUBLIC_FINGERPRINT, PA_MOVE_PUBLIC_PATH } from './publication';
import { assertPennsylvaniaMoveSnapshot } from './snapshot';

test('PA-MOVE-001 snapshot grains stay separate', () => {
  const snap = assertPennsylvaniaMoveSnapshot();
  assert.equal(snap.version, 'move-pa-state-intel-v1');
  assert.equal(snap.fingerprint, PA_MOVE_PUBLIC_FINGERPRINT);
  assert.equal(PA_MOVE_PUBLIC_PATH, '/pennsylvania');
  assert.equal(snap.current_hhg_roster.PA_PUC_HHG_CARRIER_ROWS, 269);
  assert.equal(snap.current_hhg_roster.PA_PUC_HHG_DISTINCT_UTILITY_CODES, 267);
  assert.notEqual(snap.current_hhg_roster.PA_PUC_HHG_CARRIER_ROWS, snap.current_hhg_roster.PA_PUC_HHG_DISTINCT_UTILITY_CODES);
  assert.equal(snap.brokers.PA_PUC_HHG_BROKER_ROWS, null);
  assert.equal(snap.federal.EXACT_PA_PUC_TO_USDOT_CROSSWALKS, 0);
  assert.equal(snap.expansion_ledger.GRAPH_WRITES, 0);
  assert.equal(paPucAuthorityCoversInterstateMove(), false);
  assert.equal(usdotAloneProvesPaPucAuthority(), false);
  assert.equal(mcAloneProvesPaPucAuthority(), false);
  assert.equal(utilityCodeIsAutomaticallyCarrierId(), false);
  assert.equal(hhgCarrierIsBroker(), false);
  assert.equal(officeAddressIsServiceTerritory(), false);
  assert.equal(insuranceFilingIsActiveAuthority(), false);
  assert.equal(docketIsAdverseFinding(), false);
  assert.equal(complaintIsViolation(), false);
  assert.equal(paHqIsPucAuthority(), false);
  const hit = lookupPaPucIdentity('8919518');
  assert.ok(hit.hits.length);
  assert.equal(hit.hits[0]?.utilityCode, '8919518');
});
