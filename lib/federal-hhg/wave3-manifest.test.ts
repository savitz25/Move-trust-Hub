import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import {
  WAVE_3_ID,
  WAVE_3_PUBLICATION_ID,
  WAVE_ID,
  WAVE_2_PUBLICATION_ID,
  capabilitiesForClassification,
  waveSlug,
} from '@/lib/federal-hhg/wave-eligibility';
import { revalidateWave3Candidate, selectWave2Canary } from '@/lib/federal-hhg/wave2-manifest';
import { companyListPageOffsets } from '@/lib/supabase/company-list-paging';
import { TASK_002_PROTECTED_IDENTITIES } from '@/lib/federal-hhg/protected-identities';
import { buildCompaniesDirectorySchemaGraph } from '@/lib/seo/build-directory-list-schema';
import type { StagedPublicationRow } from '@/lib/federal-hhg/wave-eligibility';

function staged(partial: Partial<StagedPublicationRow>): StagedPublicationRow {
  return {
    usdot: '6000001',
    mc: '1',
    legal_name: 'WAVE THREE LLC',
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

test('Wave 3 publication ID is distinct from candidate and prior waves', () => {
  assert.equal(WAVE_3_PUBLICATION_ID, 'FEDERAL_HHG_2026_08_WAVE_3');
  assert.notEqual(WAVE_3_PUBLICATION_ID, WAVE_3_ID);
  assert.notEqual(WAVE_3_PUBLICATION_ID, WAVE_ID);
  assert.notEqual(WAVE_3_PUBLICATION_ID, WAVE_2_PUBLICATION_ID);
});

test('non-manifest USDOT cannot publish in Wave 3', () => {
  const check = revalidateWave3Candidate(staged({ usdot: '6999999' }), new Set(['6000001']), new Set());
  assert.equal(check.ok, false);
  assert.equal(check.reason, 'not_in_manifest');
});

test('REVIEW_REQUIRED cannot publish in Wave 3', () => {
  const check = revalidateWave3Candidate(
    staged({ disposition: 'IDENTITY_REVIEW_REQUIRED' }),
    new Set(['6000001']),
    new Set()
  );
  assert.equal(check.ok, false);
});

test('inactive cannot publish in Wave 3', () => {
  const check = revalidateWave3Candidate(
    staged({ classification: 'INACTIVE', disposition: 'INACTIVE', hhg_carrier_verified: false }),
    new Set(['6000001']),
    new Set()
  );
  assert.equal(check.ok, false);
});

test('exact USDOT collision blocks Wave 3', () => {
  const check = revalidateWave3Candidate(staged(), new Set(['6000001']), new Set(['6000001']));
  assert.equal(check.reason, 'canonical_usdot_collision');
});

test('Wave 3 rejects brokers even if they are in the manifest set', () => {
  const check = revalidateWave3Candidate(
    staged({ classification: 'HHG_BROKER', hhg_carrier_verified: false, hhg_broker_verified: true }),
    new Set(['6000001']),
    new Set()
  );
  assert.equal(check.ok, false);
  assert.equal(check.reason, 'wave3_carriers_only');
});

test('Wave 3 carrier capability is interstate carrier only', () => {
  assert.deepEqual(capabilitiesForClassification('HHG_CARRIER'), ['hhg_interstate_carrier']);
  const caps = capabilitiesForClassification('HHG_CARRIER');
  assert.equal(caps.includes('hhg_local' as never), false);
  assert.equal(caps.includes('hhg_broker'), false);
  assert.equal(caps.includes('auto_carrier' as never), false);
});

test('Wave 3 canary is geographic carriers only', () => {
  const pool = [];
  for (let i = 0; i < 60; i += 1) {
    pool.push({
      usdot: String(7000000 + i),
      classification: 'HHG_CARRIER',
      selection_rank: i + 1,
      state: ['AZ', 'CA', 'TX', 'FL'][i % 4],
    });
  }
  const a = selectWave2Canary(pool, { limit: 20, maxBrokers: 0 });
  const b = selectWave2Canary(pool, { limit: 20, maxBrokers: 0 });
  assert.deepEqual(
    a.map((r) => r.usdot),
    b.map((r) => r.usdot)
  );
  assert.equal(a.length, 20);
  assert.equal(a.every((r) => r.classification === 'HHG_CARRIER'), true);
});

test('Wave 3 rollback cannot target Wave 1 or Wave 2 IDs', () => {
  assert.notEqual(WAVE_3_PUBLICATION_ID, WAVE_ID);
  assert.notEqual(WAVE_3_PUBLICATION_ID, WAVE_2_PUBLICATION_ID);
});

test('sitemap paging remains complete above 3000 company URLs', () => {
  assert.deepEqual(companyListPageOffsets(3985), [0, 1000, 2000, 3000]);
});

test('Task 002 Allied USDOT remains protected', () => {
  assert.equal(TASK_002_PROTECTED_IDENTITIES.allied, '76235');
  assert.equal(TASK_002_PROTECTED_IDENTITIES.mayflower, '125563');
  assert.equal(TASK_002_PROTECTED_IDENTITIES.atlas, '125550');
});

test('Wave 3 does not create local, intrastate, or auto capability', () => {
  const caps = capabilitiesForClassification('HHG_CARRIER');
  assert.equal(caps.includes('hhg_intrastate' as never), false);
  assert.equal(caps.includes('hhg_local' as never), false);
  assert.equal(caps.includes('auto_carrier' as never), false);
  assert.equal(caps.includes('auto_broker' as never), false);
  assert.equal(caps.includes('hhg_broker'), false);
});

test('Wave 3 slugs are deterministic and fail closed on collision', () => {
  assert.equal(waveSlug('GOMUVERZ LLC', '4525347', new Set()), waveSlug('GOMUVERZ LLC', '4525347', new Set()));
  assert.equal(
    waveSlug('GOMUVERZ LLC', '4525347', new Set(['gomuverz-llc'])),
    'gomuverz-llc-usdot-4525347'
  );
});

test('IDENTITY_REVIEW queues cannot publish in Wave 3', () => {
  for (const disposition of [
    'IDENTITY_REVIEW_REQUIRED',
    'IDENTITY_REVIEW_LOW_RISK',
    'IDENTITY_REVIEW_BRAND_FRANCHISE',
    'IDENTITY_REVIEW_DUPLICATE_CANDIDATE',
  ]) {
    const check = revalidateWave3Candidate(
      staged({ disposition }),
      new Set(['6000001']),
      new Set()
    );
    assert.equal(check.ok, false, disposition);
  }
});

test('already-published Wave 3 members are excluded from a second insert set', () => {
  const check = revalidateWave3Candidate(staged(), new Set(['6000001']), new Set(['6000001']));
  assert.equal(check.ok, false);
  assert.equal(check.reason, 'canonical_usdot_collision');
});

test('sitemap generator uses the narrow indexable projection, not getAllCompanies', () => {
  const src = readFileSync(resolve(process.cwd(), 'app/sitemap.ts'), 'utf8');
  assert.equal(/getAllCompanies/.test(src), false);
  assert.equal(/getIndexableCompanySitemapEntries/.test(src), true);
});

test('directory JSON-LD stays bounded at Wave 3 scale', () => {
  const companies = Array.from({ length: 50 }, (_, i) => ({
    name: `Co ${i}`,
    slug: `co-${i}`,
    reputationScore: i,
  })) as never;
  const graph = buildCompaniesDirectorySchemaGraph(companies, { limit: 24, total: 3685 });
  const collection = (graph['@graph'] as Array<Record<string, unknown>>)[0]!;
  const list = (graph['@graph'] as Array<Record<string, unknown>>)[1]!;
  assert.equal(collection.numberOfItems, 3685);
  assert.equal(list.numberOfItems, 24);
  assert.equal((list.itemListElement as unknown[]).length, 24);
});

test('Wave 1 and Wave 2 publication IDs remain distinct constants', () => {
  assert.equal(WAVE_ID, 'FEDERAL_HHG_2026_08_WAVE_1');
  assert.equal(WAVE_2_PUBLICATION_ID, 'FEDERAL_HHG_2026_08_WAVE_2');
});
