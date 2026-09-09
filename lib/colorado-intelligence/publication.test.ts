import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { COLORADO_MOVE_SNAPSHOT, assertColoradoMoveSnapshot } from './snapshot';
import { CO_MOVE_PUBLIC_FINGERPRINT } from './publication';
import {
  fmcsaActiveImpliesColoradoIntrastateAuthorized,
  hhgPermitImpliesFmcsaInterstate,
  mcPresenceImpliesActiveAuthority,
  selectCoMoveProfileEvidence,
  usdotImpliesColoradoHhgPermit,
  usdotImpliesInterstateOperatingAuthority,
} from './identity';
import { lookupColoradoPermit } from './lookup';

const snap = assertColoradoMoveSnapshot();
assert.equal(snap.fingerprint, CO_MOVE_PUBLIC_FINGERPRINT);
assert.equal(COLORADO_MOVE_SNAPSHOT.active_universe.official_total_permits, 203);
assert.equal(snap.status_classes.classes.ACTIVE.current_universe, true);
assert.equal(snap.status_classes.classes.REVOKED.current_universe, false);
assert.equal(hhgPermitImpliesFmcsaInterstate(), false);
assert.equal(fmcsaActiveImpliesColoradoIntrastateAuthorized(), false);
assert.equal(usdotImpliesInterstateOperatingAuthority(), false);
assert.equal(usdotImpliesColoradoHhgPermit(), false);
assert.equal(mcPresenceImpliesActiveAuthority(), false);
assert.equal(selectCoMoveProfileEvidence({ legalName: 'Acme Moving' }).render, false);
assert.equal(selectCoMoveProfileEvidence({ legalName: 'Acme Moving', city: 'Denver' }).match, 'REVIEW_REQUIRED');
assert.equal(selectCoMoveProfileEvidence({ usdot: '123456' }).pucAuthorizedBadge, false);
assert.equal(snap.crosswalk.name_only, 'UNSAFE');
assert.equal(snap.crosswalk.coverage, 'REVIEW');
assert.equal(snap.complaints.bulk_observation_universe, 'NOT_ACQUIRED / UNKNOWN');
assert.equal(snap.insurance.coverage, 'NOT_ACQUIRED / VERIFY_PATH');
assert.equal(snap.no_denver_work, true);
assert.equal(lookupColoradoPermit('HHG-00513').hits[0]?.status, 'ACTIVE');
assert.equal(lookupColoradoPermit('513').hits[0]?.identity, 'CO-PUC-HHG:HHG-00513');
const artifact = JSON.parse(readFileSync('data/reports/co-move-001-public-snapshot.json', 'utf8')) as {
  fingerprint: string;
  active_official_total: number;
};
assert.equal(artifact.fingerprint, CO_MOVE_PUBLIC_FINGERPRINT);
assert.equal(artifact.active_official_total, 203);
console.log('CO-MOVE-001 publication contract: PASS');
