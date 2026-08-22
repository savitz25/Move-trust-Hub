import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { loadWave1Manifest } from '@/lib/state-hhg/fl/wave-1';
import { loadExactCanaryManifests } from '@/lib/state-hhg/canary/manifest';
import {
  FL_011B_GOOGLE_PLACES_REQUESTS,
  FL_STATE_WAVE_2_READINESS_V1,
  hashWave2Draft,
  loadFl007HoldCompanyIds,
  qualifyWave2Readiness,
  recommendWave2Subset,
  type Wave2DraftMember,
} from '@/lib/state-hhg/fl/wave-2-readiness';
import type { ReadinessInput } from '@/lib/state-hhg/fl/publication-readiness';

const AS_OF = '2026-08-22';

function ingested(overrides: Partial<ReadinessInput> = {}): ReadinessInput {
  return {
    companyId: 'fl-im-99999',
    slug: 'example-movers',
    displayName: 'Example Movers',
    legalName: 'EXAMPLE MOVERS LLC',
    publicationState: 'INGESTED',
    indexable: false,
    fdacsRegulatoryId: 'FL-FDACS-IM-99999',
    fdacsAuthorityNumber: 'IM99999',
    authorityType: 'intrastate_mover_registration',
    authorityStatus: 'active',
    regulator: 'FDACS',
    sourceProvenance: 'fdacs_legacy_xls',
    retrievedAt: '2026-08-21T17:11:52.759Z',
    expiration: '2027-06-01',
    physicalStreet: '100 MAIN ST',
    city: 'TAMPA',
    state: 'FL',
    zip: '33602',
    county: 'Hillsborough',
    countyFips: '12057',
    countyVerification: 'COUNTY_VERIFIED',
    phoneObservation: true,
    emailObservation: true,
    addressObservation: true,
    canonicalPhone: null,
    canonicalEmail: null,
    usdot: null,
    mcNumber: null,
    unresolvedDuplicate: false,
    unresolvedMultiStateCollision: false,
    brandOnlyIdentity: false,
    corporateFamilyDeferral: false,
    currentlyInCanary: false,
    cohortOrigin: 'FL-011B',
    asOf: AS_OF,
    ...overrides,
  };
}

test('Wave 2 constants freeze Google and do not apply', () => {
  assert.equal(FL_011B_GOOGLE_PLACES_REQUESTS, 0);
  assert.equal(FL_STATE_WAVE_2_READINESS_V1, 'FL_STATE_WAVE_2_READINESS_V1');
});

test('Wave 1 members are excluded from Wave 2', () => {
  const wave = loadWave1Manifest();
  const r = qualifyWave2Readiness({
    ...ingested({ companyId: wave.members[0].companyId }),
    inWave1: true,
    inKeep80: false,
    inHoldList: false,
    missingCanonicalCompany: false,
  });
  assert.equal(r.wave2State, 'EXCLUDED_WAVE_1');
});

test('KEEP_80 members are excluded from Wave 2', () => {
  const canary = loadExactCanaryManifests();
  const r = qualifyWave2Readiness({
    ...ingested({ companyId: canary.companyIds[0], currentlyInCanary: true }),
    inWave1: false,
    inKeep80: true,
    inHoldList: false,
    missingCanonicalCompany: false,
  });
  assert.equal(r.wave2State, 'EXCLUDED_KEEP_80');
});

test('FL-007 / Suddath holds are excluded', () => {
  const holds = loadFl007HoldCompanyIds();
  assert.ok(holds.includes('fl-im-350'));
  assert.ok(holds.includes('fl-im-4099'));
  const r = qualifyWave2Readiness({
    ...ingested({ companyId: 'fl-im-350' }),
    inWave1: false,
    inKeep80: false,
    inHoldList: true,
    missingCanonicalCompany: false,
  });
  assert.equal(r.wave2State, 'EXCLUDED_HOLD');
});

test('INGESTED state-only IM with verified geography and contact is READY_FOR_WAVE_2', () => {
  const r = qualifyWave2Readiness({
    ...ingested(),
    inWave1: false,
    inKeep80: false,
    inHoldList: false,
    missingCanonicalCompany: false,
  });
  assert.equal(r.wave2State, 'READY_FOR_WAVE_2');
  assert.equal(r.indexableAuthorized, false);
  assert.equal(r.publicationMutation, false);
});

test('missing canonical company is STATE_RECORD_ONLY', () => {
  const r = qualifyWave2Readiness({
    ...ingested(),
    inWave1: false,
    inKeep80: false,
    inHoldList: false,
    missingCanonicalCompany: true,
  });
  assert.equal(r.wave2State, 'STATE_RECORD_ONLY');
});

test('recommendWave2Subset round-robins counties and respects cap', () => {
  const rows = [
    { companyId: 'a', county: 'Miami-Dade' },
    { companyId: 'b', county: 'Miami-Dade' },
    { companyId: 'c', county: 'Duval' },
    { companyId: 'd', county: 'Lee' },
  ];
  const rec = recommendWave2Subset(rows, 3);
  assert.equal(rec.length, 3);
  const counties = new Set(rec.map((r) => r.county));
  assert.ok(counties.size >= 2);
});

test('frozen Wave 2 draft does not include Wave 1 or KEEP_80 and apply is false', () => {
  const wave = loadWave1Manifest();
  const canary = new Set(loadExactCanaryManifests().companyIds);
  const draft = JSON.parse(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fl-011b-wave2-draft-manifest.json'), 'utf8')
  ) as {
    apply: boolean;
    hash: string;
    members: Array<{ companyId: string; intendedIndexable: boolean }>;
  };
  assert.equal(draft.apply, false);
  assert.equal(draft.members.length, 50);
  assert.equal(draft.hash, hashWave2Draft(draft.members as never));
  const waveIds = new Set(wave.members.map((m) => m.companyId));
  for (const m of draft.members) {
    assert.equal(waveIds.has(m.companyId), false);
    assert.equal(canary.has(m.companyId), false);
    assert.equal(m.intendedIndexable, false);
  }
});

test('draft hash is deterministic and changes when membership changes', () => {
  const member = (id: string): Wave2DraftMember => ({
    companyId: id,
    slug: id,
    fdacsId: `FL-FDACS-IM-${id.replace('fl-im-', '')}`,
    fdacsIm: `IM${id.replace('fl-im-', '')}`,
    county: 'Lee',
    countyFips: '12071',
    readinessRuleVersion: FL_STATE_WAVE_2_READINESS_V1,
    currentPublicationState: 'INGESTED',
    currentIndexable: false,
    intendedPublicationState: 'PUBLISHABLE',
    intendedIndexable: false,
    freshness: 'STATUS_FRESH',
    rollbackPublicationState: 'INGESTED',
    rollbackIndexable: false,
  });
  const a = hashWave2Draft([member('fl-im-1'), member('fl-im-2')]);
  const b = hashWave2Draft([member('fl-im-2'), member('fl-im-1')]);
  const c = hashWave2Draft([member('fl-im-1')]);
  assert.equal(a, b);
  assert.notEqual(a, c);
});
