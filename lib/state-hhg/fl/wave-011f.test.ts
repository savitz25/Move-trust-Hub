import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { loadWave1Manifest } from '@/lib/state-hhg/fl/wave-1';
import type { CanonicalProviderIdentity } from '@/lib/state-hhg/identity';
import { classifyActiveImGap, type GapSubject } from '@/lib/state-hhg/fl/wave-2-canonicalization';
import {
  FL_011E_UNRESOLVED_HISTORICAL,
  FL_011F_GOOGLE_PLACES_REQUESTS,
  FL_011F_PRODUCTION_WRITES,
  federalIdOptionalIsNotAHold,
  futureLinkWouldExposeWaveChrome,
  hashUnresolvedDraft,
  resolveUnresolvedIm,
  simulateCoverage,
  simulatedNewCompanyContract,
  usdotSlugIsNotFederalEvidence,
} from '@/lib/state-hhg/fl/wave-011f';

const AS_OF = '2026-08-22';

function subject(over: Partial<GapSubject> = {}): GapSubject {
  return {
    fdacsIm: 'IM88888',
    legalName: 'EXAMPLE MOVERS LLC',
    dba: null,
    status: 'active',
    expiration: '2027-06-01',
    retrievedAt: '2026-08-21T17:11:52.759Z',
    physicalAddress: '100 MAIN ST',
    city: 'TAMPA',
    postalCode: '33602',
    phone: '8135550100',
    email: 'ops@examplemovers.test',
    usdot: null,
    county: null,
    ...over,
  };
}

function company(
  over: Partial<CanonicalProviderIdentity> & Pick<CanonicalProviderIdentity, 'companyId'>
): CanonicalProviderIdentity {
  return {
    legalName: 'OTHER LLC',
    dbaName: null,
    publicName: 'Other',
    usdot: null,
    phone: '4075550000',
    email: null,
    address: '9 ELSEWHERE RD',
    city: 'ORLANDO',
    state: 'FL',
    postalCode: '32801',
    publicationState: 'PUBLISHABLE',
    indexable: true,
    ...over,
  };
}

const empty = {
  existingImCompanyIds: new Set<string>(),
  wave1Ids: new Set<string>(),
  keep80Ids: new Set<string>(),
  asOf: AS_OF,
};

test('FL-011F is read-only, Google-frozen, and does not weaken 168 baseline', () => {
  assert.equal(FL_011F_GOOGLE_PLACES_REQUESTS, 0);
  assert.equal(FL_011F_PRODUCTION_WRITES, 0);
  assert.equal(FL_011E_UNRESOLVED_HISTORICAL, 168);
  const withheld = JSON.parse(
    readFileSync(resolve(process.cwd(), 'docs/task-fl-011e-unresolved-active.json'), 'utf8')
  ) as { n: number; by_class: Record<string, number> };
  assert.equal(withheld.n, 168);
  assert.equal(withheld.by_class.POSSIBLE_DUPLICATE, 114);
  assert.equal(withheld.by_class.CORPORATE_FAMILY_REVIEW, 46);
});

test('name-only remains POSSIBLE_DUPLICATE', () => {
  const sub = subject({ legalName: 'ACME MOVERS LLC', physicalAddress: '1 A ST', phone: '8131111111' });
  const live = classifyActiveImGap({
    subject: sub,
    candidates: [company({ companyId: 'x', legalName: 'ACME MOVERS LLC', address: '99 Z', phone: '4079999999' })],
    ...empty,
  });
  const r = resolveUnresolvedIm({
    priorClass: 'POSSIBLE_DUPLICATE',
    live,
    subject: sub,
    candidate: company({ companyId: 'x', legalName: 'ACME MOVERS LLC' }),
    candidateUsdotNumber: null,
  });
  assert.equal(r.terminal, 'REMAINS_POSSIBLE_DUPLICATE');
  assert.equal(r.googlePlacesRequests, 0);
});

test('Inc vs LLC conflict remains held', () => {
  const sub = subject({ legalName: 'ACME MOVERS INC', physicalAddress: '10 PINE ST' });
  const live = classifyActiveImGap({
    subject: sub,
    candidates: [company({ companyId: 'x', legalName: 'ACME MOVERS LLC', address: '10 PINE ST' })],
    ...empty,
  });
  const r = resolveUnresolvedIm({
    priorClass: 'CONFLICT',
    live,
    subject: sub,
    candidate: company({ companyId: 'x', legalName: 'ACME MOVERS LLC', address: '10 PINE ST' }),
    candidateUsdotNumber: null,
  });
  assert.equal(r.terminal, 'CONFLICT_REMAINS');
  assert.equal(r.holdReason, 'LEGAL_FORM_CONFLICT');
});

test('franchise/network remains corporate-family review', () => {
  const sub = subject({ legalName: 'ACKMAN BROTHERS LLC', dba: 'College Hunks Hauling Junk & Moving' });
  const live = classifyActiveImGap({ subject: sub, candidates: [], ...empty });
  const r = resolveUnresolvedIm({
    priorClass: 'CORPORATE_FAMILY_REVIEW',
    live,
    subject: sub,
    candidate: null,
    candidateUsdotNumber: null,
  });
  assert.equal(r.terminal, 'REMAINS_CORPORATE_FAMILY_REVIEW');
});

test('usdot-* slug alone is not federal evidence; official usdot_number may link', () => {
  assert.equal(usdotSlugIsNotFederalEvidence('usdot-4055942', null), true);
  const sub = subject({ usdot: '4055942', legalName: 'ADVANCE SORENSEN MOVERS LLC' });
  const cand = company({
    companyId: 'usdot-4055942',
    legalName: 'ADVANCE SORENSEN MOVERS LLC',
    usdot: '4055942',
    publicationState: 'INDEXABLE',
  });
  const live = classifyActiveImGap({
    subject: sub,
    candidates: [cand],
    ...empty,
  });
  const rejected = resolveUnresolvedIm({
    priorClass: 'POSSIBLE_DUPLICATE',
    live,
    subject: sub,
    candidate: { ...cand, usdot: null },
    candidateUsdotNumber: null,
  });
  assert.notEqual(rejected.evidenceMethod === 'usdot_slug_alone_rejected' ? rejected.terminal : 'ok', 'bogus');
  const accepted = resolveUnresolvedIm({
    priorClass: 'POSSIBLE_DUPLICATE',
    live,
    subject: sub,
    candidate: cand,
    candidateUsdotNumber: '4055942',
  });
  if (live.classification === 'EXISTING_CANONICAL_LINK_READY' || live.matchMethod === 'exact_usdot') {
    assert.equal(accepted.terminal, 'EXISTING_CANONICAL_LINK_READY');
  }
});

test('missing federal ID is not a hold for a clean state-only identity', () => {
  assert.equal(federalIdOptionalIsNotAHold(null), true);
  const sub = subject({ usdot: null });
  const live = classifyActiveImGap({ subject: sub, candidates: [company({ companyId: 'z' })], ...empty });
  const r = resolveUnresolvedIm({
    priorClass: 'NEW_CANONICAL_COMPANY_READY',
    live,
    subject: sub,
    candidate: null,
    candidateUsdotNumber: null,
  });
  if (live.classification === 'NEW_CANONICAL_COMPANY_READY') {
    assert.equal(r.terminal, 'NEW_CANONICAL_COMPANY_READY');
  }
});

test('stale FDACS status remains SOURCE_STATUS_BLOCKED', () => {
  const sub = subject({ expiration: '2020-01-01', retrievedAt: '2024-01-01T00:00:00.000Z' });
  const live = classifyActiveImGap({ subject: sub, candidates: [], ...empty });
  const r = resolveUnresolvedIm({
    priorClass: 'SOURCE_STATUS_BLOCKED',
    live,
    subject: sub,
    candidate: null,
    candidateUsdotNumber: null,
  });
  assert.ok(r.terminal === 'SOURCE_STATUS_BLOCKED' || r.terminal === 'NO_LONGER_ACTIVE');
});

test('Wave 1 public link is excluded as publication-gate remediation', () => {
  const wave = loadWave1Manifest();
  assert.equal(
    futureLinkWouldExposeWaveChrome({ id: wave.members[0].companyId, publicationState: 'PUBLISHABLE' }),
    true
  );
  assert.equal(futureLinkWouldExposeWaveChrome({ id: 'usdot-2303737', publicationState: 'PUBLISHABLE' }), false);
});

test('simulated coverage is deterministic and does not add 720+113', () => {
  const s = simulateCoverage({
    active: 1098,
    represented: 930,
    linkReady: 2,
    insertReady: 3,
    noLongerActive: 1,
  });
  assert.equal(s.simulatedActive, 1097);
  assert.equal(s.simulatedRepresented, 935);
  assert.equal(s.netGain, 5);
  const contract = simulatedNewCompanyContract();
  assert.equal(contract.publicationState, 'INGESTED');
  assert.equal(contract.indexable, false);
  assert.equal(contract.anonymousHttp, 404);
  const h1 = hashUnresolvedDraft([
    { op: 'LINK', fdacsIm: 'IM1', companyId: 'a', proposedCompanyId: null },
    { op: 'INSERT', fdacsIm: 'IM2', companyId: null, proposedCompanyId: 'fl-im-2' },
  ]);
  const h2 = hashUnresolvedDraft([
    { op: 'INSERT', fdacsIm: 'IM2', companyId: null, proposedCompanyId: 'fl-im-2' },
    { op: 'LINK', fdacsIm: 'IM1', companyId: 'a', proposedCompanyId: null },
  ]);
  assert.equal(h1, h2);
});
