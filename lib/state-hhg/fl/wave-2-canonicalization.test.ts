import assert from 'node:assert/strict';
import { test } from 'node:test';
import { loadWave1Manifest } from '@/lib/state-hhg/fl/wave-1';
import { loadExactCanaryManifests } from '@/lib/state-hhg/canary/manifest';
import type { CanonicalProviderIdentity } from '@/lib/state-hhg/identity';
import {
  FL_011C_GOOGLE_PLACES_REQUESTS,
  classifyActiveImGap,
  hashCanonicalizationDraft,
  proposedImCompanyId,
  toDraftOp,
  type CanonicalizationDraftOp,
  type GapSubject,
} from '@/lib/state-hhg/fl/wave-2-canonicalization';

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
    county: 'Hillsborough',
    ...over,
  };
}

function company(over: Partial<CanonicalProviderIdentity> & Pick<CanonicalProviderIdentity, 'companyId'>): CanonicalProviderIdentity {
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

test('Google freeze and proposed id from IM', () => {
  assert.equal(FL_011C_GOOGLE_PLACES_REQUESTS, 0);
  assert.equal(proposedImCompanyId('IM1234'), 'fl-im-1234');
});

test('exact legal name + address links existing canonical company', () => {
  const r = classifyActiveImGap({
    subject: subject({ legalName: 'ACME MOVERS INC', physicalAddress: '10 PINE ST' }),
    candidates: [company({ companyId: 'usdot-1', legalName: 'ACME MOVERS INC', address: '10 PINE ST' })],
    ...empty,
  });
  assert.equal(r.classification, 'EXISTING_CANONICAL_LINK_READY');
  assert.equal(r.matchedCompanyId, 'usdot-1');
  assert.equal(r.matchMethod, 'exact_legal_name_and_address');
});

test('no match with official identity is NEW_CANONICAL_COMPANY_READY and allows missing federal ID', () => {
  const r = classifyActiveImGap({
    subject: subject({ usdot: null }),
    candidates: [company({ companyId: 'usdot-1' })],
    ...empty,
  });
  assert.equal(r.classification, 'NEW_CANONICAL_COMPANY_READY');
  assert.equal(r.proposedCompanyId, 'fl-im-88888');
  assert.equal(r.matchedCompanyId, null);
});

test('Inc vs LLC with exact name+address is CONFLICT', () => {
  const r = classifyActiveImGap({
    subject: subject({ legalName: 'ACME MOVERS INC', physicalAddress: '10 PINE ST' }),
    candidates: [company({ companyId: 'x', legalName: 'ACME MOVERS LLC', address: '10 PINE ST' })],
    ...empty,
  });
  assert.equal(r.classification, 'CONFLICT');
});

test('name-only similarity is POSSIBLE_DUPLICATE not a link', () => {
  const r = classifyActiveImGap({
    subject: subject({ legalName: 'ACME MOVERS LLC', physicalAddress: '1 A ST', phone: '8131111111' }),
    candidates: [company({ companyId: 'x', legalName: 'ACME MOVERS LLC', address: '99 Z ST', phone: '4079999999' })],
    ...empty,
  });
  assert.equal(r.classification, 'POSSIBLE_DUPLICATE');
});

test('inactive source is SOURCE_STATUS_BLOCKED', () => {
  const r = classifyActiveImGap({
    subject: subject({ status: 'expired' }),
    candidates: [],
    ...empty,
  });
  assert.equal(r.classification, 'SOURCE_STATUS_BLOCKED');
});

test('Wave 1 and KEEP_80 are not auto-linked', () => {
  const wave = loadWave1Manifest();
  const keep = loadExactCanaryManifests();
  const r1 = classifyActiveImGap({
    subject: subject({ legalName: 'GENTLETOUCH MOVING COMPANY', physicalAddress: '1900 FLORA RD' }),
    candidates: [
      company({
        companyId: wave.members[0].companyId,
        legalName: 'GENTLETOUCH MOVING COMPANY',
        publicName: 'Gentletouch Moving Company',
        address: '1900 FLORA RD',
      }),
    ],
    ...empty,
    wave1Ids: new Set([wave.members[0].companyId]),
  });
  assert.equal(r1.classification, 'REVIEW_REQUIRED');
  const r2 = classifyActiveImGap({
    subject: subject({ legalName: 'KEEP CANARY LLC', physicalAddress: '2 CANARY ST' }),
    candidates: [company({ companyId: keep.companyIds[0], legalName: 'KEEP CANARY LLC', address: '2 CANARY ST' })],
    ...empty,
    keep80Ids: new Set([keep.companyIds[0]]),
  });
  assert.equal(r2.classification, 'REVIEW_REQUIRED');
});

test('draft ops split LINK vs INSERT and stay INGESTED/noindex', () => {
  const link = classifyActiveImGap({
    subject: subject({ legalName: 'ACME MOVERS INC', physicalAddress: '10 PINE ST' }),
    candidates: [company({ companyId: 'usdot-1', legalName: 'ACME MOVERS INC', address: '10 PINE ST' })],
    ...empty,
  });
  const insert = classifyActiveImGap({
    subject: subject(),
    candidates: [company({ companyId: 'usdot-1' })],
    ...empty,
  });
  const a = toDraftOp(link, subject())!;
  const b = toDraftOp(insert, subject())!;
  assert.equal(a.op, 'LINK_EXISTING_CANONICAL');
  assert.equal(b.op, 'INSERT_NEW_CANONICAL');
  assert.equal(a.intendedPublicationState, 'INGESTED');
  assert.equal(b.intendedIndexable, false);
  const h1 = hashCanonicalizationDraft([a, b]);
  const h2 = hashCanonicalizationDraft([b, a]);
  assert.equal(h1, h2);
  const emptyHash = hashCanonicalizationDraft([] as CanonicalizationDraftOp[]);
  assert.notEqual(h1, emptyHash);
});
