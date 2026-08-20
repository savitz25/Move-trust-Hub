import assert from 'node:assert/strict';
import { test } from 'node:test';
import { classifyIdentityReview } from '@/lib/federal-hhg/identity-review';
import { WAVE_3_ID, WAVE_ID, isWave1Eligible } from '@/lib/federal-hhg/wave-eligibility';

test('identity-review triage never auto-merges', () => {
  const result = classifyIdentityReview({
    matchReason: 'name similarity only — not a canonical match',
    legalName: 'ACME MOVING LLC',
    dbaName: null,
    phyCity: 'Boise',
    phyState: 'ID',
    existingName: 'Acme Movers',
    existingCity: 'Meridian',
    existingState: 'ID',
  });
  assert.equal(result.autoMerge, false);
});

test('same name same city is high-risk duplicate review not a merge', () => {
  const result = classifyIdentityReview({
    matchReason: 'name similarity only — not a canonical match',
    legalName: 'ACME MOVING LLC',
    dbaName: null,
    phyCity: 'Boise',
    phyState: 'ID',
    existingName: 'Acme Moving',
    existingCity: 'Boise',
    existingState: 'ID',
  });
  assert.equal(result.category, 'SAME_NAME_SAME_LOCATION_DIFFERENT_USDOT');
  assert.equal(result.risk, 'HIGH');
  assert.equal(result.autoMerge, false);
});

test('Wave 3 candidate ID cannot be treated as a live publication wave', () => {
  assert.equal(WAVE_3_ID, 'FEDERAL_HHG_2026_08_WAVE_3_CANDIDATE');
  assert.notEqual(WAVE_3_ID, WAVE_ID);
  assert.match(WAVE_3_ID, /CANDIDATE/);
});

test('REVIEW_REQUIRED remains ineligible for any federal publication wave', () => {
  assert.equal(
    isWave1Eligible({
      usdot: '9',
      mc: null,
      legal_name: 'X',
      dba_name: null,
      phy_city: 'Boise',
      phy_state: 'ID',
      phone: null,
      classification: 'HHG_CARRIER',
      disposition: 'IDENTITY_REVIEW_REQUIRED',
      hhg_carrier_verified: true,
      hhg_broker_verified: false,
    }).eligible,
    false
  );
});
