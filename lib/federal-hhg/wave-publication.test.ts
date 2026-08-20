import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  WAVE_ID,
  WAVE_2_ID,
  capabilitiesForClassification,
  isWave1Eligible,
  publicDisplayName,
  waveCompanyId,
  waveSlug,
  type StagedPublicationRow,
} from '@/lib/federal-hhg/wave-eligibility';
import { selectWaveCandidates } from '@/lib/federal-hhg/select-wave';
import { TASK_002_PROTECTED_IDENTITIES } from '@/lib/federal-hhg/protected-identities';
import { isSeoIndexableCompany } from '@/lib/provider/publication';

function row(partial: Partial<StagedPublicationRow>): StagedPublicationRow {
  return {
    usdot: '2000000',
    mc: '111111',
    legal_name: 'EXAMPLE MOVING LLC',
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

test('only NEW_CANONICAL_CANDIDATE can publish', () => {
  assert.equal(isWave1Eligible(row({ disposition: 'NEW_CANONICAL_CANDIDATE' })).eligible, true);
  assert.equal(
    isWave1Eligible(row({ disposition: 'IDENTITY_REVIEW_REQUIRED' })).eligible,
    false
  );
  assert.equal(isWave1Eligible(row({ disposition: 'MATCHED_EXISTING' })).eligible, false);
});

test('inactive cannot publish', () => {
  assert.equal(
    isWave1Eligible(
      row({ classification: 'INACTIVE', disposition: 'INACTIVE', hhg_carrier_verified: false })
    ).eligible,
    false
  );
});

test('valid federal Carrier publishes Carrier capability only', () => {
  assert.deepEqual(capabilitiesForClassification('HHG_CARRIER'), ['hhg_interstate_carrier']);
});

test('valid Broker publishes Broker capability only', () => {
  assert.deepEqual(capabilitiesForClassification('HHG_BROKER'), ['hhg_broker']);
});

test('valid dual publishes both underlying capabilities', () => {
  assert.deepEqual(capabilitiesForClassification('HHG_CARRIER_BROKER'), [
    'hhg_interstate_carrier',
    'hhg_broker',
  ]);
});

test('publication does not create local or auto capability', () => {
  for (const classification of ['HHG_CARRIER', 'HHG_BROKER', 'HHG_CARRIER_BROKER']) {
    const caps = capabilitiesForClassification(classification);
    assert.equal(caps.includes('hhg_local' as never), false);
    assert.equal(caps.includes('auto_carrier' as never), false);
  }
});

test('slug generation is deterministic and collision-safe', () => {
  const first = waveSlug('Acme Moving', '1234567', new Set());
  const second = waveSlug('Acme Moving', '1234567', new Set());
  assert.equal(first, second);
  const collided = waveSlug('Acme Moving', '1234567', new Set(['acme-moving']));
  assert.equal(collided, 'acme-moving-usdot-1234567');
});

test('company id is USDOT-stable', () => {
  assert.equal(waveCompanyId('001234567'), 'usdot-1234567');
});

test('DBA is preferred over legal name when distinct', () => {
  assert.equal(
    publicDisplayName(
      row({ legal_name: 'SMITH HOLDINGS LLC', dba_name: 'SUN VALLEY MOVERS' })
    ),
    'SUN VALLEY MOVERS'
  );
});

test('non-indexable profile stays out of sitemap', () => {
  assert.equal(
    isSeoIndexableCompany({ publicationState: 'PUBLISHABLE', indexable: false }),
    false
  );
});

test('Task 002 protected identities remain mapped', () => {
  assert.equal(TASK_002_PROTECTED_IDENTITIES.allied, '76235');
  assert.equal(TASK_002_PROTECTED_IDENTITIES.mayflower, '125563');
  assert.equal(TASK_002_PROTECTED_IDENTITIES.national, '76628');
});

test('mismatched FMCSA raw census cannot rename a canonical company', async () => {
  const { resolvePublicCompanyNameFromSources } = await import(
    '@/lib/companies/public-display-name'
  );
  const resolved = resolvePublicCompanyNameFromSources({
    storedName: 'Allied Van Lines',
    fmcsaLegalName: 'ALLIED VAN LINES INC',
    canonicalUsdot: '76235',
    fmcsaRaw: {
      legalName: 'MAYFLOWER TRANSIT LLC',
      dbaName: 'AERO MAYFLOWER TRANSIT COMPANY',
      dotNumber: '125563',
    },
  });
  assert.equal(resolved.publicName, 'Allied Van Lines');
});

test('county lookup aliases bind Mayflower county IDs to the canonical company', async () => {
  const { companyCountyLookupKeys } = await import(
    '@/lib/directory/enrich-static-county-coverage'
  );
  const keys = companyCountyLookupKeys({
    id: 'mayflower',
    slug: 'aero-mayflower-transit-company',
  });
  assert.ok(keys.includes('directory-mayflower-transit'));
  assert.ok(keys.includes('mayflower-transit'));
});

test('catalog snapshot does not reuse forbidden van-line USDOTs', async () => {
  const { activeDirectoryMovers } = await import('@/data/active-directory-movers');
  assert.equal(activeDirectoryMovers['directory-allied-van-lines']?.usdotNumber, '76235');
  assert.equal(
    activeDirectoryMovers['directory-aero-mayflower-transit-company']?.usdotNumber,
    '125563'
  );
  assert.equal(activeDirectoryMovers['directory-atlas-van-lines']?.usdotNumber, '125550');
  assert.equal(activeDirectoryMovers['directory-wheaton-world-wide']?.usdotNumber, '70719');
  assert.equal(activeDirectoryMovers['directory-arpin-van-lines']?.usdotNumber, '49922');
  assert.equal(activeDirectoryMovers['directory-national-van-lines']?.usdotNumber, '76628');
  assert.equal(
    activeDirectoryMovers['directory-graebel-van-lines']?.usdotNumber,
    ''
  );
});

test('wave selection is geographically mixed and deterministic', () => {
  const pool: StagedPublicationRow[] = [];
  const states = ['ID', 'ME', 'NM', 'OR', 'VT', 'WY', 'FL', 'CA'];
  for (let i = 0; i < 80; i += 1) {
    pool.push(
      row({
        usdot: String(3000000 + i),
        phy_state: states[i % states.length],
        classification: i < 8 ? 'HHG_BROKER' : i < 12 ? 'HHG_CARRIER_BROKER' : 'HHG_CARRIER',
        hhg_carrier_verified: i >= 8,
        hhg_broker_verified: i < 12,
        legal_name: `FIRM ${i} LLC`,
      })
    );
  }
  const a = selectWaveCandidates(pool, { limit: 24, perStateCap: 4, maxBrokers: 6, maxDuals: 4 });
  const b = selectWaveCandidates(pool, { limit: 24, perStateCap: 4, maxBrokers: 6, maxDuals: 4 });
  assert.deepEqual(
    a.map((row) => row.usdot),
    b.map((row) => row.usdot)
  );
  assert.equal(a.length, 24);
  assert.ok(new Set(a.map((row) => row.phy_state)).size >= 6);
});

test('directory merge keeps canonical DB identity over a richer catalog snapshot', async () => {
  const { mergeDirectoryCompanies } = await import('@/lib/directory/merge-directory');
  const db = {
    id: 'allied',
    slug: 'allied-van-lines',
    name: 'Allied Van Lines',
    shortDescription: 'x',
    description: 'x',
    headquarters: 'Oakbrook Terrace, IL',
    website: '',
    usdotNumber: '76235',
    mcNumber: '15735',
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 0,
    bbbRating: 'NR',
    bbbAccredited: false,
    overallRating: 0,
    reviewCount: 0,
    reputationScore: 10,
    yearsInBusiness: 0,
    avgPricePerMove: 0,
    priceRange: '',
    coverage: '',
    services: ['Carrier'],
    specialties: [],
    ratingBreakdown: { fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0 },
    isVerified: true,
    lastUpdated: '2026-08-20',
  };
  const catalog = {
    ...db,
    id: 'directory-allied-van-lines',
    name: 'Aero Mayflower Transit Company',
    usdotNumber: '76235',
    description: 'much longer catalog description that would otherwise win richness scoring '.repeat(8),
  };
  const merged = mergeDirectoryCompanies([db as never], [catalog as never]);
  const allied = merged.find((row) => row.id === 'allied');
  assert.equal(allied?.name, 'Allied Van Lines');
  assert.equal(allied?.usdotNumber, '76235');
  assert.equal(allied?.slug, 'allied-van-lines');
});

test('incomplete geography is excluded', () => {
  assert.equal(isWave1Eligible(row({ phy_state: 'BA' })).eligible, false);
  assert.equal(isWave1Eligible(row({ phy_state: 'PR' })).eligible, false);
  assert.equal(isWave1Eligible(row({ phy_city: '' })).eligible, false);
});

test('Wave 2 candidate ID is selection-only and never a public publication state', () => {
  assert.equal(WAVE_2_ID, 'FEDERAL_HHG_2026_08_WAVE_2_CANDIDATE');
  assert.notEqual(WAVE_2_ID, WAVE_ID);
});

test('REVIEW_REQUIRED and INACTIVE cannot enter Wave 2', () => {
  assert.equal(
    isWave1Eligible(
      row({ disposition: 'IDENTITY_REVIEW_REQUIRED', classification: 'HHG_CARRIER' })
    ).eligible,
    false
  );
  assert.equal(
    isWave1Eligible(
      row({
        classification: 'INACTIVE',
        disposition: 'INACTIVE',
        hhg_carrier_verified: false,
      })
    ).eligible,
    false
  );
});

test('company list paging continues past the PostgREST 1000-row cap', async () => {
  const { companyListPageOffsets } = await import('@/lib/supabase/company-list-paging');
  assert.deepEqual(companyListPageOffsets(1000), [0]);
  assert.deepEqual(companyListPageOffsets(1468), [0, 1000]);
});

test('selection exits when every state hits perStateCap', () => {
  const pool: StagedPublicationRow[] = [];
  for (let i = 0; i < 40; i += 1) {
    pool.push(
      row({
        usdot: String(4000000 + i),
        phy_state: i < 20 ? 'ID' : 'ME',
        legal_name: `CAP FIRM ${i} LLC`,
      })
    );
  }
  const selected = selectWaveCandidates(pool, { limit: 30, perStateCap: 2 });
  assert.equal(selected.length, 4);
});
