import assert from 'node:assert/strict';
import test from 'node:test';
import {
  carrierTariffIsStatewideMaximumRate,
  complaintIsViolation,
  docketIsAdverseFinding,
  insuranceRequirementIsCurrentCoverage,
  mcAloneProvesPucoCertificate,
  officeAddressIsServiceTerritory,
  ohioHqIsPucoCertificate,
  pucoCertificateCoversInterstateMove,
  pucoCertificateIsMc,
  pucoCertificateIsUsdot,
  searchOnlyIsZeroMovers,
  tariffExistenceIsCurrentAuthority,
  tariffIsQuote,
  usdotAloneProvesPucoCertificate,
} from './identity';
import { lookupOhioPucoIdentity } from './lookup';
import { OH_MOVE_PUBLIC_FINGERPRINT, OH_MOVE_PUBLIC_PATH } from './publication';
import { assertOhioMoveSnapshot, OHIO_MOVE_SNAPSHOT } from './snapshot';

test('OH-MOVE-001 snapshot grains stay separate', () => {
  const snap = assertOhioMoveSnapshot();
  assert.equal(snap.version, 'move-oh-state-intel-v1');
  assert.equal(snap.fingerprint, OH_MOVE_PUBLIC_FINGERPRINT);
  assert.equal(OH_MOVE_PUBLIC_PATH, '/ohio');
  assert.equal(snap.current_hhg_roster.OH_PUCO_HHG_ROSTER_STATUS, 'OPEN_SEARCH_ONLY');
  assert.equal(snap.current_hhg_roster.OH_PUCO_HHG_ROWS, null);
  assert.equal(snap.current_hhg_roster.OH_PUCO_DISTINCT_CERTIFICATE_NUMBERS, null);
  assert.equal(snap.tariff.not_nc_statewide_maximum_rate_tariff, true);
  assert.equal(snap.tariff.OH_PUCO_TARIFF_DOCUMENT_ROWS, null);
  assert.equal(snap.federal.EXACT_PUCO_TO_USDOT_CROSSWALKS, 0);
  assert.equal(snap.federal.EXACT_PUCO_TO_MC_CROSSWALKS, 0);
  assert.equal(snap.expansion_ledger.GRAPH_WRITES, 0);
  assert.equal(snap.claimEligibilityBroadened, false);
  assert.equal(pucoCertificateCoversInterstateMove(), false);
  assert.equal(usdotAloneProvesPucoCertificate(), false);
  assert.equal(mcAloneProvesPucoCertificate(), false);
  assert.equal(pucoCertificateIsUsdot(), false);
  assert.equal(pucoCertificateIsMc(), false);
  assert.equal(carrierTariffIsStatewideMaximumRate(), false);
  assert.equal(tariffIsQuote(), false);
  assert.equal(tariffExistenceIsCurrentAuthority(), false);
  assert.equal(officeAddressIsServiceTerritory(), false);
  assert.equal(insuranceRequirementIsCurrentCoverage(), false);
  assert.equal(docketIsAdverseFinding(), false);
  assert.equal(complaintIsViolation(), false);
  assert.equal(searchOnlyIsZeroMovers(), false);
  assert.equal(ohioHqIsPucoCertificate(), false);
  assert.equal(OHIO_MOVE_SNAPSHOT.no_columbus_page, true);
  const hit = lookupOhioPucoIdentity('113554-HG');
  assert.equal(hit.hits[0]?.display, '113554-HG');
  assert.match(hit.hits[0]?.note ?? '', /not a USDOT or MC/i);
});

test('null roster counts are not zero', () => {
  assert.notEqual(OHIO_MOVE_SNAPSHOT.current_hhg_roster.OH_PUCO_HHG_ROWS, 0);
  assert.equal(OHIO_MOVE_SNAPSHOT.current_hhg_roster.search_only_is_not_zero, true);
});
