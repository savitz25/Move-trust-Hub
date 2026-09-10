import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { VIRGINIA_MOVE_SNAPSHOT, assertVirginiaMoveSnapshot } from './snapshot';
import { VA_MOVE_PUBLIC_FINGERPRINT } from './publication';
import {
  applicantIsAuthorizedCarrier,
  hhgCertificateIsPropertyPermit,
  mcPresenceImpliesActiveAuthority,
  nameOnlyStateToFmcsaIsExact,
  propertyCarrierIsHouseholdGoodsCarrier,
  propertyCarriersAreMovers,
  stateAuthorityIsUsdot,
  usdotImpliesActiveInterstateAuthority,
  virginiaMoveIdentity,
  virginiaStateAuthorityCoversInterstateMove,
} from './identity';
import { lookupVirginiaHhg } from './lookup';

const snap = assertVirginiaMoveSnapshot();
assert.equal(snap.fingerprint, VA_MOVE_PUBLIC_FINGERPRINT);
assert.equal(VIRGINIA_MOVE_SNAPSHOT.hhg_roster.rows, 192);
assert.equal(snap.property_roster.rows, 4916);
assert.equal(hhgCertificateIsPropertyPermit(), false);
assert.equal(stateAuthorityIsUsdot(), false);
assert.equal(usdotImpliesActiveInterstateAuthority(), false);
assert.equal(mcPresenceImpliesActiveAuthority(), false);
assert.equal(applicantIsAuthorizedCarrier(), false);
assert.equal(propertyCarrierIsHouseholdGoodsCarrier(), false);
assert.equal(propertyCarriersAreMovers(), false);
assert.equal(virginiaStateAuthorityCoversInterstateMove(), false);
assert.equal(nameOnlyStateToFmcsaIsExact(), false);
assert.equal(virginiaMoveIdentity('HHG', '628'), 'VA-DMV-HHG:628');
assert.equal(virginiaMoveIdentity('PROP', '3603'), 'VA-DMV-PROP:3603');
assert.equal(lookupVirginiaHhg('628').hits[0]?.name.includes('PACK-RAT'), true);
assert.equal(snap.authority_classes.HOUSEHOLD_GOODS_CERTIFICATE.legal_authority_document, 'Certificate');
assert.equal(snap.clocks.authorized_carriers_sourceAsOf, null);
assert.equal(snap.applications.not_added_to_authorized_roster, true);
assert.equal(snap.expansion_ledger.NET_NEW_PUBLIC_MOVE_PROFILES, 0);
const artifact = JSON.parse(readFileSync('data/reports/va-move-001-public-snapshot.json', 'utf8'));
assert.equal(artifact.fingerprint, VA_MOVE_PUBLIC_FINGERPRINT);
console.log('VA-MOVE-001 publication contract: PASS');
