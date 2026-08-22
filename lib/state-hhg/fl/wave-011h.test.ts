/**
 * FL-011H — read-only FDACS MB / moving-broker identity model tests.
 * Production writes: 0. Google Places: 0. Does not start FL-012.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { hashWave2Draft } from '@/lib/state-hhg/fl/wave-2-readiness';
import { loadWave1Manifest } from '@/lib/state-hhg/fl/wave-1';
import { mapFdacsAuthorityType } from '@/lib/state-hhg/fl/adapter';
import {
  EXPECTED_ACTIVE,
  EXPECTED_COVERAGE_PCT,
  EXPECTED_REPRESENTED,
  EXPECTED_UNRESOLVED,
  FL_012_MATURITY,
  WAVE2_DRAFT_COUNT,
  WAVE2_DRAFT_HASH,
  WAVE2_READY_POOL,
  coveragePartitionValid,
} from '@/lib/state-hhg/fl/wave-011g';
import {
  ACCEPTED_BROKER_LINK_EVIDENCE,
  BROKER_ROLE,
  FL_011H_CONSUMER_PII,
  FL_011H_GOOGLE_PLACES_REQUESTS,
  FL_011H_PRODUCTION_WRITES,
  FL_FDACS_MB_INTERNAL_STAGING_V1_DRAFT,
  IM_DENOMINATOR_DELTA,
  INTRASTATE_MOVER_ROLE,
  PROHIBITED_BROKER_LANGUAGE,
  STATE_AUTHORITY_MODEL_VERDICT,
  auditExistingCanonicalBroker,
  brokerCoveragePct,
  classifyBrokerPublicationModel,
  classifyBrokerRoleOverlap,
  classifyBrokerTerminal,
  floridaFdacsBrokerEvidenceBlock,
  hashBrokerStagingDraft,
  imCoverageUnchanged,
  nameOnlyAutoLinkCount,
  proposedMbCompanyId,
  proposedMbSlug,
  revalidateBrokerStatus,
  successStateFromReadyPool,
  terminalTallyValid,
  usdotSlugIsNotFederalEvidence,
  wave1ClockReset,
} from '@/lib/state-hhg/fl/wave-011h';
import type { CanonicalProviderIdentity } from '@/lib/state-hhg/identity';

const candidate = (over: Partial<CanonicalProviderIdentity> = {}): CanonicalProviderIdentity => ({
  companyId: 'fl-im-3405',
  legalName: 'REAL TIME RELOCATION LLC',
  dbaName: null,
  publicName: 'REAL TIME RELOCATION LLC',
  usdot: '1234567',
  phone: '5615550100',
  email: 'ops@example.com',
  address: '1 Main St',
  city: 'West Palm Beach',
  state: 'FL',
  postalCode: '33401',
  publicationState: 'INGESTED',
  indexable: false,
  ...over,
});

test('FL-011H is read-only, Google-frozen, and does not change the IM denominator', () => {
  assert.equal(FL_011H_GOOGLE_PLACES_REQUESTS, 0);
  assert.equal(FL_011H_PRODUCTION_WRITES, 0);
  assert.equal(FL_011H_CONSUMER_PII, 0);
  assert.deepEqual(IM_DENOMINATOR_DELTA, { active: 0, represented: 0, unresolved: 0, coverage: 0 });
  assert.equal(imCoverageUnchanged(1098, 930, 168, 84.7), true);
  assert.equal(imCoverageUnchanged(1098, 931, 167, 84.8), false);
  assert.equal(EXPECTED_ACTIVE, 1098);
  assert.equal(EXPECTED_REPRESENTED, 930);
  assert.equal(EXPECTED_UNRESOLVED, 168);
  assert.equal(EXPECTED_COVERAGE_PCT, 84.7);
  assert.equal(coveragePartitionValid(1098, 930, 168), true);
});

test('MB broker role is distinct from Florida intrastate mover', () => {
  assert.equal(BROKER_ROLE, 'MOVING_BROKER');
  assert.equal(INTRASTATE_MOVER_ROLE, 'INTRASTATE_MOVER');
  assert.notEqual(BROKER_ROLE, INTRASTATE_MOVER_ROLE);
  assert.equal(mapFdacsAuthorityType('Moving Broker'), 'intrastate_hhg_broker');
  assert.equal(mapFdacsAuthorityType('Intrastate Mover'), 'intrastate_mover_registration');
  assert.notEqual(mapFdacsAuthorityType('Moving Broker'), mapFdacsAuthorityType('Intrastate Mover'));
});

test('generic provider_state_authority can represent IM and MB without a second table', () => {
  assert.equal(STATE_AUTHORITY_MODEL_VERDICT, 'REUSE_AS_IS');
});

test('proposed broker company ids are fl-mb-* and never inferred from usdot slugs', () => {
  assert.equal(proposedMbCompanyId('MB137'), 'fl-mb-137');
  assert.equal(proposedMbCompanyId('mb171'), 'fl-mb-171');
  assert.equal(proposedMbSlug('PINNACLE VAN LINES LLC', 'MB171', new Set()), 'pinnacle-van-lines-llc');
  assert.equal(
    proposedMbSlug('PINNACLE VAN LINES LLC', 'MB171', new Set(['pinnacle-van-lines-llc'])),
    'pinnacle-van-lines-llc-fl-mb-171'
  );
  assert.equal(usdotSlugIsNotFederalEvidence('usdot-3197443', null), true);
  assert.equal(usdotSlugIsNotFederalEvidence('usdot-3197443', '3197443'), false);
  assert.equal(usdotSlugIsNotFederalEvidence('fl-im-3405', null), true);
});

test('name-only is never an auto-link; strong evidence may link', () => {
  const nameOnly = classifyBrokerTerminal({
    mb: 'MB137',
    legalName: 'AMS MOVING INC',
    dba: null,
    status: 'active',
    expiration: '2027-01-01',
    retrievedAt: '2026-08-21T17:11:52.759Z',
    asOf: '2026-08-22',
    phone: '4075550100',
    email: null,
    physicalAddress: '2 Oak Ave',
    city: 'Orlando',
    postalCode: '32801',
    usdot: null,
    attachedCompanyId: null,
    existingMbCompanyIds: new Set(),
    wave1Ids: new Set(),
    keep80Ids: new Set(),
    candidates: [candidate({ companyId: 'x', legalName: 'AMS MOVING INC', phone: '9999999999' })],
    candidateUsdotById: {},
    imAuthorityByCompany: {},
  });
  assert.equal(nameOnly.terminal, 'REMAINS_IDENTITY_REVIEW');
  assert.equal(nameOnly.matchMethod, 'none');

  const strong = classifyBrokerTerminal({
    mb: 'MB159',
    legalName: 'REAL TIME RELOCATION LLC',
    dba: null,
    status: 'active',
    expiration: '2027-01-01',
    retrievedAt: '2026-08-21T17:11:52.759Z',
    asOf: '2026-08-22',
    phone: '5615550100',
    email: null,
    physicalAddress: null,
    city: null,
    postalCode: null,
    usdot: null,
    attachedCompanyId: null,
    existingMbCompanyIds: new Set(),
    wave1Ids: new Set(),
    keep80Ids: new Set(),
    candidates: [candidate()],
    candidateUsdotById: { 'fl-im-3405': '1234567' },
    imAuthorityByCompany: { 'fl-im-3405': 'IM3405' },
  });
  assert.equal(strong.terminal, 'EXISTING_CANONICAL_LINK_READY');
  assert.ok(ACCEPTED_BROKER_LINK_EVIDENCE.includes(strong.matchMethod as (typeof ACCEPTED_BROKER_LINK_EVIDENCE)[number]));
  assert.equal(nameOnlyAutoLinkCount([nameOnly, strong]), 0);
});

test('unique official broker identity with no canonical hit is INSERT-ready', () => {
  const row = classifyBrokerTerminal({
    mb: 'MB174',
    legalName: 'EASY DAY MOVING LLC',
    dba: null,
    status: 'active',
    expiration: '2027-06-01',
    retrievedAt: '2026-08-21T17:11:52.759Z',
    asOf: '2026-08-22',
    phone: '3055550100',
    email: 'hello@easyday.example',
    physicalAddress: '9 Pine St',
    city: 'Miami',
    postalCode: '33101',
    usdot: null,
    attachedCompanyId: null,
    existingMbCompanyIds: new Set(),
    wave1Ids: new Set(),
    keep80Ids: new Set(),
    candidates: [candidate()],
    candidateUsdotById: {},
    imAuthorityByCompany: {},
  });
  assert.equal(row.terminal, 'NEW_BROKER_CANONICAL_READY');
  assert.equal(row.proposedCompanyId, 'fl-mb-174');
  assert.equal(row.matchedCompanyId, null);
});

test('expired and unknown statuses are held; already-modeled MB is not restaged', () => {
  const expired = classifyBrokerTerminal({
    mb: 'MB165',
    legalName: 'ARCA INTERNATIONAL, INC.',
    dba: null,
    status: 'expired',
    expiration: '2024-01-01',
    retrievedAt: '2026-08-21T17:11:52.759Z',
    asOf: '2026-08-22',
    phone: null,
    email: null,
    physicalAddress: null,
    city: null,
    postalCode: null,
    usdot: null,
    attachedCompanyId: null,
    existingMbCompanyIds: new Set(),
    wave1Ids: new Set(),
    keep80Ids: new Set(),
    candidates: [],
    candidateUsdotById: {},
    imAuthorityByCompany: {},
  });
  assert.equal(expired.terminal, 'EXPIRED_NO_STAGING');

  const unknown = classifyBrokerTerminal({
    mb: 'MB105',
    legalName: 'RELOCATE US LLC',
    dba: null,
    status: 'unknown',
    expiration: null,
    retrievedAt: '2026-08-21T17:11:52.759Z',
    asOf: '2026-08-22',
    phone: null,
    email: null,
    physicalAddress: null,
    city: null,
    postalCode: null,
    usdot: null,
    attachedCompanyId: null,
    existingMbCompanyIds: new Set(),
    wave1Ids: new Set(),
    keep80Ids: new Set(),
    candidates: [],
    candidateUsdotById: {},
    imAuthorityByCompany: {},
  });
  assert.equal(unknown.terminal, 'STATUS_BLOCKED');

  const modeled = classifyBrokerTerminal({
    mb: 'MB159',
    legalName: 'REAL TIME RELOCATION LLC',
    dba: null,
    status: 'active',
    expiration: '2027-01-01',
    retrievedAt: '2026-08-21T17:11:52.759Z',
    asOf: '2026-08-22',
    phone: '5615550100',
    email: null,
    physicalAddress: null,
    city: null,
    postalCode: null,
    usdot: null,
    attachedCompanyId: 'fl-im-3405',
    existingMbCompanyIds: new Set(['fl-mb-159']),
    wave1Ids: new Set(),
    keep80Ids: new Set(),
    candidates: [candidate()],
    candidateUsdotById: { 'fl-im-3405': '1234567' },
    imAuthorityByCompany: { 'fl-im-3405': 'IM3405' },
  });
  assert.equal(modeled.terminal, 'EXISTING_CANONICAL_ALREADY_MODELED');
});

test('existing canonical audit PASSes on name+phone and flags identity drift', () => {
  const pass = auditExistingCanonicalBroker({
    mb: 'MB159',
    legalName: 'REAL TIME RELOCATION LLC',
    phone: '5615550100',
    email: null,
    physicalAddress: null,
    company: candidate(),
  });
  assert.equal(pass.verdict, 'PASS');

  const drift = auditExistingCanonicalBroker({
    mb: 'MB159',
    legalName: 'REAL TIME RELOCATION LLC',
    phone: '5615550100',
    email: null,
    physicalAddress: null,
    company: candidate({ legalName: 'OTHER ENTITY LLC', publicName: 'OTHER ENTITY LLC' }),
  });
  assert.equal(drift.verdict, 'IDENTITY_DRIFT');
});

test('status revalidation does not invent live FDACS status', () => {
  assert.equal(revalidateBrokerStatus({ snapshotStatus: 'active', liveStatus: null }), 'ACTIVE_FRESH');
  assert.equal(revalidateBrokerStatus({ snapshotStatus: 'expired', liveStatus: null }), 'STATUS_REFRESH_REQUIRED');
  assert.equal(revalidateBrokerStatus({ snapshotStatus: 'unknown', liveStatus: null }), 'STATUS_REFRESH_REQUIRED');
  assert.equal(revalidateBrokerStatus({ snapshotStatus: 'expired', liveStatus: 'expired' }), 'EXPIRED');
  assert.equal(revalidateBrokerStatus({ snapshotStatus: 'active', liveStatus: 'expired' }), 'STATUS_CONFLICT');
});

test('broker coverage is independent of 84.7% IM coverage', () => {
  assert.equal(brokerCoveragePct(26, 2), 7.7);
  assert.equal(brokerCoveragePct(26, 0), 0);
  assert.equal(brokerCoveragePct(0, 0), 0);
});

test('role overlap uses authoritative IM PSA and usdot_number, never the slug', () => {
  assert.equal(
    classifyBrokerRoleOverlap({
      imAuthorityNumber: 'IM3405',
      usdotNumber: '1234567',
      companyId: 'usdot-3197443',
    }),
    'MOVER_FEDERAL_AND_BROKER'
  );
  assert.equal(
    classifyBrokerRoleOverlap({ imAuthorityNumber: null, usdotNumber: null, companyId: 'usdot-3197443' }),
    'BROKER_ONLY'
  );
  assert.equal(
    classifyBrokerRoleOverlap({ imAuthorityNumber: 'IM1', usdotNumber: null, companyId: 'fl-im-1' }),
    'MOVER_AND_BROKER'
  );
  assert.equal(
    classifyBrokerRoleOverlap({ imAuthorityNumber: null, usdotNumber: '3197443', companyId: 'usdot-3197443' }),
    'FEDERAL_AND_BROKER'
  );
});

test('future broker consumer copy is not mover/carrier/endorsement language', () => {
  const block = floridaFdacsBrokerEvidenceBlock({
    authorityNumber: 'MB159',
    status: 'active',
    retrievedAt: '2026-08-21T17:11:52.759Z',
  });
  assert.equal(block.role, BROKER_ROLE);
  assert.match(block.headline, /Moving Broker/i);
  assert.match(block.verificationWording, /Florida FDACS/);
  assert.match(block.roleClarification, /distinct from registration as an intrastate household-goods mover/i);
  const blob = `${block.headline} ${block.detail} ${block.roleClarification} ${block.verificationWording}`;
  for (const term of PROHIBITED_BROKER_LANGUAGE) {
    assert.equal(new RegExp(term, 'i').test(blob), false, term);
  }
});

test('publication model remains extension-required until broker chrome exists', () => {
  assert.equal(
    classifyBrokerPublicationModel({
      terminal: 'EXISTING_CANONICAL_LINK_READY',
      companyPublic: true,
    }),
    'MODEL_EXTENSION_REQUIRED'
  );
  assert.equal(
    classifyBrokerPublicationModel({ terminal: 'NEW_BROKER_CANONICAL_READY', companyPublic: false }),
    'COMPANY_NOT_PUBLIC'
  );
  assert.equal(
    classifyBrokerPublicationModel({ terminal: 'REMAINS_IDENTITY_REVIEW', companyPublic: false }),
    'IDENTITY_NOT_READY'
  );
  assert.equal(
    classifyBrokerPublicationModel({ terminal: 'EXPIRED_NO_STAGING', companyPublic: false }),
    'STATUS_NOT_READY'
  );
});

test('staging draft hash is deterministic and apply stays false', () => {
  const ops = [
    { op: 'LINK' as const, mb: 'MB159', companyId: 'fl-im-3405', proposedCompanyId: null },
    { op: 'INSERT' as const, mb: 'MB174', companyId: null, proposedCompanyId: 'fl-mb-174' },
  ];
  const a = hashBrokerStagingDraft(ops);
  const b = hashBrokerStagingDraft([...ops].reverse());
  assert.equal(a, b);
  assert.equal(a.length, 16);
  assert.equal(FL_FDACS_MB_INTERNAL_STAGING_V1_DRAFT, 'FL_FDACS_MB_INTERNAL_STAGING_V1_DRAFT');
  assert.equal(successStateFromReadyPool(2), 'READY_FOR_FL_BROKER_INTERNAL_STAGING');
  assert.equal(successStateFromReadyPool(0), 'FL_BROKER_SCOPE_DISPOSITIONED — NO_SAFE_INTERNAL_STAGING');
});

test('terminal classes must sum to the universe; Wave 1 clock is not reset', () => {
  assert.equal(
    terminalTallyValid(
      {
        EXISTING_CANONICAL_LINK_READY: 2,
        NEW_BROKER_CANONICAL_READY: 17,
        EXISTING_CANONICAL_ALREADY_MODELED: 0,
        EXPIRED_NO_STAGING: 2,
        STATUS_BLOCKED: 1,
        REMAINS_IDENTITY_REVIEW: 7,
        CONFLICT: 0,
        OTHER_WITHHOLD: 0,
      },
      29
    ),
    true
  );
  assert.equal(wave1ClockReset(), false);
  assert.equal(loadWave1Manifest().members.length, 37);
  assert.equal(FL_012_MATURITY, '2026-09-05T14:45:00.000Z');
});

test('Wave 2 freeze remains 720 / 50 / a5d15f3dca32a59a / apply=false', () => {
  const doc = JSON.parse(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fl-011b-wave2-draft-manifest.json'), 'utf8')
  ) as {
    hash: string;
    apply: boolean;
    members: Array<{ companyId: string; slug: string; fdacsIm: string }>;
  };
  assert.equal(doc.members.length, WAVE2_DRAFT_COUNT);
  assert.equal(doc.hash, WAVE2_DRAFT_HASH);
  assert.equal(doc.apply, false);
  assert.equal(hashWave2Draft(doc.members as never), WAVE2_DRAFT_HASH);
  assert.equal(WAVE2_READY_POOL, 720);
});

test('committed FL-011H artifacts stay apply=false with MB excluded from IM math', () => {
  const summaryPath = resolve(process.cwd(), 'docs/task-fl-011h-readiness-summary.json');
  if (!existsSync(summaryPath)) return;
  const summary = JSON.parse(readFileSync(summaryPath, 'utf8')) as {
    google_places_requests: number;
    production_db_writes: number;
    im: { active: number; represented: number; unresolved: number; coverage: number };
    mb: { total: number; duplicate: number };
    draft: { apply: boolean };
    name_only_auto_link: number;
  };
  assert.equal(summary.google_places_requests, 0);
  assert.equal(summary.production_db_writes, 0);
  assert.equal(summary.im.active, 1098);
  assert.equal(summary.im.represented, 930);
  assert.equal(summary.im.unresolved, 168);
  assert.equal(summary.im.coverage, 84.7);
  assert.equal(summary.mb.duplicate, 0);
  assert.equal(summary.draft.apply, false);
  assert.equal(summary.name_only_auto_link, 0);

  const draft = JSON.parse(
    readFileSync(resolve(process.cwd(), 'docs/task-fl-011h-mb-internal-staging-draft.json'), 'utf8')
  ) as { apply: boolean; id: string };
  assert.equal(draft.apply, false);
  assert.equal(draft.id, FL_FDACS_MB_INTERNAL_STAGING_V1_DRAFT);
});
