import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  WAVE_4_ID,
  WAVE_4_PUBLICATION_ID,
  WAVE_ID,
  WAVE_2_PUBLICATION_ID,
  WAVE_3_PUBLICATION_ID,
  capabilitiesForClassification,
} from '@/lib/federal-hhg/wave-eligibility';
import {
  revalidateWave4Candidate,
  selectWave4Canary,
} from '@/lib/federal-hhg/wave4-manifest';
import type { StagedPublicationRow } from '@/lib/federal-hhg/wave-eligibility';

function staged(partial: Partial<StagedPublicationRow> = {}): StagedPublicationRow {
  return {
    usdot: '7000001',
    mc: '1',
    legal_name: 'WAVE FOUR LLC',
    dba_name: null,
    phy_city: 'Boise',
    phy_state: 'ID',
    phone: null,
    classification: 'HHG_CARRIER',
    disposition: 'NEW_CANONICAL_CANDIDATE',
    hhg_carrier_verified: true,
    hhg_broker_verified: false,
    ...partial,
  };
}

test('Wave 4 publication ID is distinct from candidate and prior waves', () => {
  assert.equal(WAVE_4_PUBLICATION_ID, 'FEDERAL_HHG_2026_08_WAVE_4_FINAL_CLEAN');
  assert.notEqual(WAVE_4_PUBLICATION_ID, WAVE_4_ID);
  assert.notEqual(WAVE_4_PUBLICATION_ID, WAVE_ID);
  assert.notEqual(WAVE_4_PUBLICATION_ID, WAVE_2_PUBLICATION_ID);
  assert.notEqual(WAVE_4_PUBLICATION_ID, WAVE_3_PUBLICATION_ID);
});

test('non-manifest USDOT cannot publish in Wave 4', () => {
  const check = revalidateWave4Candidate(staged({ usdot: '7999999' }), new Set(['7000001']), new Set());
  assert.equal(check.ok, false);
  assert.equal(check.reason, 'not_in_manifest');
});

test('identity-review disposition cannot publish in Wave 4', () => {
  const check = revalidateWave4Candidate(
    staged({ disposition: 'IDENTITY_REVIEW_REQUIRED' }),
    new Set(['7000001']),
    new Set()
  );
  assert.equal(check.ok, false);
});

test('inactive cannot publish in Wave 4', () => {
  const check = revalidateWave4Candidate(
    staged({ classification: 'INACTIVE', disposition: 'INACTIVE', hhg_carrier_verified: false }),
    new Set(['7000001']),
    new Set()
  );
  assert.equal(check.ok, false);
});

test('exact USDOT collision blocks Wave 4', () => {
  const check = revalidateWave4Candidate(staged(), new Set(['7000001']), new Set(['7000001']));
  assert.equal(check.reason, 'canonical_usdot_collision');
});

test('Wave 4 rejects brokers even if in manifest', () => {
  const check = revalidateWave4Candidate(
    staged({ classification: 'HHG_BROKER', hhg_carrier_verified: false, hhg_broker_verified: true }),
    new Set(['7000001']),
    new Set()
  );
  assert.equal(check.ok, false);
  assert.equal(check.reason, 'wave4_carriers_only');
});

test('Wave 4 rejects dual carrier+broker role changes', () => {
  const check = revalidateWave4Candidate(
    staged({
      classification: 'HHG_CARRIER_BROKER',
      hhg_carrier_verified: true,
      hhg_broker_verified: true,
    }),
    new Set(['7000001']),
    new Set()
  );
  assert.equal(check.ok, false);
  assert.equal(check.reason, 'wave4_carriers_only');
});

test('Wave 4 canary is geographic carriers only', () => {
  const canary = selectWave4Canary(
    [
      { usdot: '1', classification: 'HHG_CARRIER', selection_rank: 1, state: 'TX' },
      { usdot: '2', classification: 'HHG_BROKER', selection_rank: 2, state: 'FL' },
      { usdot: '3', classification: 'HHG_CARRIER', selection_rank: 3, state: 'CA' },
    ],
    2
  );
  assert.equal(canary.length, 2);
  assert.ok(canary.every((c) => c.classification === 'HHG_CARRIER'));
});

test('Wave 4 publishes carrier capability only', () => {
  assert.deepEqual(capabilitiesForClassification('HHG_CARRIER'), ['hhg_interstate_carrier']);
});
