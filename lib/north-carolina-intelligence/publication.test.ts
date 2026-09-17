import assert from 'node:assert/strict';
import test from 'node:test';
import {
  cNumberIsTNumber,
  complaintIsViolation,
  docketIsAdverseFinding,
  insuranceRequirementIsCurrentCoverage,
  mcAloneProvesNcucCertificate,
  monthlyListIsRealtimeCensus,
  ncHqIsNcucCertificate,
  ncucCertificateCoversInterstateMove,
  officeAddressIsServiceTerritory,
  passengerBrokerIsHhgBroker,
  usdotAloneProvesNcucCertificate,
} from './identity';
import { lookupNcNcucIdentity } from './lookup';
import { NC_MOVE_PUBLIC_FINGERPRINT, NC_MOVE_PUBLIC_PATH } from './publication';
import { assertNorthCarolinaMoveSnapshot } from './snapshot';

test('NC-MOVE-001 snapshot grains stay separate', () => {
  const snap = assertNorthCarolinaMoveSnapshot();
  assert.equal(snap.version, 'move-nc-state-intel-v1');
  assert.equal(snap.fingerprint, NC_MOVE_PUBLIC_FINGERPRINT);
  assert.equal(NC_MOVE_PUBLIC_PATH, '/north-carolina');
  assert.equal(snap.current_hhg_roster.NC_NCUC_DISTINCT_C_NUMBERS, 362);
  assert.equal(snap.current_hhg_roster.NC_NCUC_HHG_SOURCE_ANNOUNCED_TOTAL, 361);
  assert.notEqual(
    snap.current_hhg_roster.NC_NCUC_HHG_SOURCE_ANNOUNCED_TOTAL,
    snap.current_hhg_roster.NC_NCUC_DISTINCT_C_NUMBERS,
  );
  assert.equal(snap.brokers.NC_HHG_BROKER_ROWS, null);
  assert.equal(snap.federal.EXACT_NC_NCUC_TO_USDOT_CROSSWALKS, 0);
  assert.equal(snap.expansion_ledger.GRAPH_WRITES, 0);
  assert.equal(ncucCertificateCoversInterstateMove(), false);
  assert.equal(usdotAloneProvesNcucCertificate(), false);
  assert.equal(mcAloneProvesNcucCertificate(), false);
  assert.equal(cNumberIsTNumber(), false);
  assert.equal(officeAddressIsServiceTerritory(), false);
  assert.equal(insuranceRequirementIsCurrentCoverage(), false);
  assert.equal(docketIsAdverseFinding(), false);
  assert.equal(complaintIsViolation(), false);
  assert.equal(monthlyListIsRealtimeCensus(), false);
  assert.equal(ncHqIsNcucCertificate(), false);
  assert.equal(passengerBrokerIsHhgBroker(), false);
  const hit = lookupNcNcucIdentity('C-2655');
  assert.equal(hit.hits[0]?.cNumber, 'C-2655');
  assert.equal(hit.hits[0]?.tNumber, 'T-4664');
  const tHit = lookupNcNcucIdentity('NCUC T-4664');
  assert.equal(tHit.hits[0]?.cNumber, 'C-2655');
});
