import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { VIRGINIA_MOVE_SNAPSHOT, assertVirginiaMoveSnapshot } from './snapshot';
import { VA_MOVE_PUBLIC_FINGERPRINT } from './publication';
import {
  applicantIsAuthorizedCarrier,
  hhgCertificateIsPropertyPermit,
  mcPresenceImpliesActiveAuthority,
  nameOnlyStateToFmcsaIsExact,
  propertyAuthorityResolvesUniqueCarrier,
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
assert.equal(virginiaMoveIdentity('PROP', ''), null);
assert.equal(virginiaMoveIdentity('PROP', '   '), null);
assert.equal(virginiaMoveIdentity('HHG', ''), null);
assert.equal(virginiaMoveIdentity('PROP', 'JD\'S TRUCKING LLC'), null);
assert.equal(propertyAuthorityResolvesUniqueCarrier('1276'), false);
assert.equal(propertyAuthorityResolvesUniqueCarrier('3603'), true);
assert.equal(propertyAuthorityResolvesUniqueCarrier(''), false);
assert.equal(lookupVirginiaHhg('628').hits[0]?.name.includes('PACK-RAT'), true);
assert.equal(snap.property_roster.distinct_non_null_authority_numbers, 4914);
assert.equal(snap.property_roster.non_null_authority_rows, 4915);
assert.equal(snap.property_roster.null_identifiers, 1);
assert.equal(snap.hhg_roster.distinct_labels, 192);
assert.equal(snap.expansion_ledger.NEW_VA_PROPERTY_AUTHORITY_IDENTITIES, 4914);
assert.equal(snap.expansion_ledger.NEW_VA_STATE_IDENTITIES, 5106);
assert.equal(snap.expansion_ledger.NEW_STATE_CREDENTIAL_ROWS, 5108);
assert.equal(snap.expansion_ledger.identity_grain, 'distinct_non_null_authority_number');
assert.equal(snap.expansion_ledger.credential_row_grain, 'authorized_listing_row');
assert.notEqual(snap.expansion_ledger.identity_grain, snap.expansion_ledger.credential_row_grain);
assert.equal(snap.expansion_ledger.credential_rows_are_not_authority_identities, true);
assert.equal(
  snap.expansion_ledger.NEW_VA_STATE_IDENTITIES,
  snap.hhg_roster.distinct_non_null_authority_numbers +
    snap.property_roster.distinct_non_null_authority_numbers,
);
assert.equal(
  snap.expansion_ledger.NEW_STATE_CREDENTIAL_ROWS,
  snap.hhg_roster.rows + snap.property_roster.rows,
);
assert.equal(snap.identity.property_1276_status, 'SOURCE_IDENTIFIER_CONFLICT');
assert.equal(snap.property_roster.source_identifier_conflicts[0]?.source_displayed_authority_number, '1276');
assert.equal(snap.property_roster.source_identifier_conflicts[0]?.listing_rows, 2);
assert.equal(snap.property_roster.source_identifier_conflicts[0]?.unique_carrier, false);
assert.equal(snap.expansion_ledger.NET_NEW_CANONICAL_ORGANIZATIONS, 0);
assert.equal(snap.expansion_ledger.NET_NEW_PUBLIC_MOVE_PROFILES, 0);
assert.equal(snap.expansion_ledger.EXISTING_ORGANIZATIONS_ENRICHED, 0);
assert.equal(snap.expansion_ledger.EXACT_STATE_TO_FEDERAL_CROSSWALKS, 0);
assert.equal(snap.expansion_ledger.EXACT_PROFILE_ATTACHMENTS, 0);
assert.equal(snap.federal.exact_federal_crosswalk, 'NOT_AVAILABLE_FROM_STATE_LISTING');
assert.equal(snap.authority_classes.HOUSEHOLD_GOODS_CERTIFICATE.legal_authority_document, 'Certificate');
assert.equal(snap.clocks.authorized_carriers_sourceAsOf, null);
assert.equal(snap.applications.not_added_to_authorized_roster, true);
assert.equal(snap.expansion_ledger.NET_NEW_PUBLIC_MOVE_PROFILES, 0);
const artifact = JSON.parse(readFileSync('data/reports/va-move-001-public-snapshot.json', 'utf8'));
assert.equal(artifact.fingerprint, VA_MOVE_PUBLIC_FINGERPRINT);
console.log('VA-MOVE-001 publication contract: PASS');
