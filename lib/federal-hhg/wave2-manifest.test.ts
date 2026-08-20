import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  WAVE_2_ID,
  WAVE_2_PUBLICATION_ID,
  WAVE_ID,
  capabilitiesForClassification,
  isWave1Eligible,
  type StagedPublicationRow,
} from '@/lib/federal-hhg/wave-eligibility';
import {
  isWave2ManifestMember,
  revalidateWave2Candidate,
  selectWave2Canary,
} from '@/lib/federal-hhg/wave2-manifest';
import { TASK_002_PROTECTED_IDENTITIES } from '@/lib/federal-hhg/protected-identities';
import { companyListPageOffsets } from '@/lib/supabase/company-list-paging';

function staged(partial: Partial<StagedPublicationRow>): StagedPublicationRow {
  return {
    usdot: '4000001',
    mc: '111',
    legal_name: 'WAVE TWO MOVERS LLC',
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

test('Wave 2 publication ID is distinct from the candidate manifest ID and from Wave 1', () => {
  assert.equal(WAVE_2_PUBLICATION_ID, 'FEDERAL_HHG_2026_08_WAVE_2');
  assert.notEqual(WAVE_2_PUBLICATION_ID, WAVE_2_ID);
  assert.notEqual(WAVE_2_PUBLICATION_ID, WAVE_ID);
});

test('non-manifest USDOT cannot publish in Wave 2', () => {
  const manifest = new Set(['4000001']);
  const check = revalidateWave2Candidate(staged({ usdot: '4999999' }), manifest, new Set());
  assert.equal(check.ok, false);
  assert.equal(check.reason, 'not_in_manifest');
});

test('REVIEW_REQUIRED cannot publish in Wave 2', () => {
  const manifest = new Set(['4000001']);
  const check = revalidateWave2Candidate(
    staged({ disposition: 'IDENTITY_REVIEW_REQUIRED' }),
    manifest,
    new Set()
  );
  assert.equal(check.ok, false);
});

test('inactive cannot publish in Wave 2', () => {
  const manifest = new Set(['4000001']);
  assert.equal(
    isWave1Eligible(
      staged({ classification: 'INACTIVE', disposition: 'INACTIVE', hhg_carrier_verified: false })
    ).eligible,
    false
  );
  const check = revalidateWave2Candidate(
    staged({ classification: 'INACTIVE', disposition: 'INACTIVE', hhg_carrier_verified: false }),
    manifest,
    new Set()
  );
  assert.equal(check.ok, false);
});

test('exact canonical USDOT collision blocks Wave 2 publication', () => {
  const manifest = new Set(['4000001']);
  const check = revalidateWave2Candidate(staged({ usdot: '4000001' }), manifest, new Set(['4000001']));
  assert.equal(check.ok, false);
  assert.equal(check.reason, 'canonical_usdot_collision');
});

test('Wave 2 carrier receives only verified carrier capability', () => {
  assert.deepEqual(capabilitiesForClassification('HHG_CARRIER'), ['hhg_interstate_carrier']);
});

test('Wave 2 broker receives only verified broker capability', () => {
  assert.deepEqual(capabilitiesForClassification('HHG_BROKER'), ['hhg_broker']);
});

test('Wave 2 publication does not create local or auto capability', () => {
  for (const classification of ['HHG_CARRIER', 'HHG_BROKER']) {
    const caps = capabilitiesForClassification(classification);
    assert.equal(caps.includes('hhg_local' as never), false);
    assert.equal(caps.includes('auto_carrier' as never), false);
  }
});

test('Wave 2 canary is deterministic and broker-weighted', () => {
  const pool = [];
  for (let i = 0; i < 80; i += 1) {
    pool.push({
      usdot: String(5000000 + i),
      classification: i < 20 ? 'HHG_BROKER' : 'HHG_CARRIER',
      selection_rank: i + 1,
      state: ['ID', 'ME', 'NM', 'OR', 'WY'][i % 5],
    });
  }
  const a = selectWave2Canary(pool, { limit: 30, maxBrokers: 10 });
  const b = selectWave2Canary(pool, { limit: 30, maxBrokers: 10 });
  assert.deepEqual(
    a.map((row) => row.usdot),
    b.map((row) => row.usdot)
  );
  assert.equal(a.filter((row) => row.classification === 'HHG_BROKER').length, 10);
  assert.equal(a.length, 30);
});

test('manifest membership is exact USDOT only', () => {
  const manifest = new Set(['76235']);
  assert.equal(isWave2ManifestMember('76235', manifest), true);
  assert.equal(isWave2ManifestMember(TASK_002_PROTECTED_IDENTITIES.allied ?? '', manifest), true);
  assert.equal(isWave2ManifestMember('125563', manifest), false);
});

test('Wave 2 rollback wave id cannot match Wave 1', () => {
  assert.notEqual(WAVE_2_PUBLICATION_ID, WAVE_ID);
});

test('company paging remains complete above 2000 rows', () => {
  assert.deepEqual(companyListPageOffsets(2742), [0, 1000, 2000]);
});
