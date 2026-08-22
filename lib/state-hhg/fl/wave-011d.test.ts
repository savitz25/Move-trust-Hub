import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { loadWave1Manifest } from '@/lib/state-hhg/fl/wave-1';
import { loadExactCanaryManifests } from '@/lib/state-hhg/canary/manifest';
import type { CanonicalProviderIdentity } from '@/lib/state-hhg/identity';
import {
  hashCanonicalizationDraft,
  proposedImCompanyId,
  type CanonicalizationDraftOp,
  type GapSubject,
} from '@/lib/state-hhg/fl/wave-2-canonicalization';
import {
  ACCEPTED_LINK_EVIDENCE,
  EXISTING_COMPANY_IMMUTABLE_FIELDS,
  FL_011C_DRAFT_HASH,
  FL_011D_CONSUMER_PII,
  FL_011D_EXPECTED_INSERT,
  FL_011D_EXPECTED_LINK,
  FL_011D_EXPECTED_TOTAL,
  FL_011D_FORBIDDEN_TABLES,
  FL_011D_GOOGLE_PLACES_REQUESTS,
  FL_011D_MATCH_METHOD_PREFIX,
  FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1,
  assertExactDraftMembership,
  canonicalContactOverwriteForbidden,
  collapsedSlug,
  fl011dMatchMethod,
  hashFinalManifest,
  newCompanyPublicExposure,
  planContactAction,
  planPsaAction,
  postApplyIdempotentDelta,
  publicExposureGateForExistingLink,
  revalidateDraftOp,
  rollbackForOp,
  slugCollidesInsensitively,
  type FinalCanonicalizationOp,
} from '@/lib/state-hhg/fl/wave-011d';

const DRAFT_PATH = resolve(process.cwd(), 'data/state-hhg/fl/fl-011c-canonicalization-wave-internal-draft.json');

function loadDraft(): CanonicalizationDraftOp[] {
  const doc = JSON.parse(readFileSync(DRAFT_PATH, 'utf8')) as {
    hash: string;
    operations: CanonicalizationDraftOp[];
  };
  assert.equal(doc.hash, FL_011C_DRAFT_HASH);
  return doc.operations;
}

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

const emptySets = {
  existingImCompanyIds: new Set<string>(),
  wave1Ids: new Set<string>(),
  keep80Ids: new Set<string>(),
  asOf: '2026-08-22',
};

test('Google freeze, PII freeze, Wave id, and exact 113 membership', () => {
  assert.equal(FL_011D_GOOGLE_PLACES_REQUESTS, 0);
  assert.equal(FL_011D_CONSUMER_PII, 0);
  assert.equal(FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1, 'FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1');
  const ops = loadDraft();
  const bound = assertExactDraftMembership(ops);
  assert.equal(bound.link, FL_011D_EXPECTED_LINK);
  assert.equal(bound.insert, FL_011D_EXPECTED_INSERT);
  assert.equal(bound.hash, FL_011C_DRAFT_HASH);
  assert.equal(ops.length, FL_011D_EXPECTED_TOTAL);
  assert.equal(hashCanonicalizationDraft(ops), FL_011C_DRAFT_HASH);
});

test('name-only is not accepted link evidence', () => {
  assert.equal(ACCEPTED_LINK_EVIDENCE.includes('none' as never), false);
  const draft: CanonicalizationDraftOp = {
    op: 'LINK_EXISTING_CANONICAL',
    fdacsIm: 'IM88888',
    sourceLegalName: 'EXAMPLE MOVERS LLC',
    dba: null,
    canonicalCompanyId: 'usdot-1',
    proposedCompanyId: null,
    sourceAddress: '100 MAIN ST',
    sourcePhone: '8135550100',
    sourceEmail: 'ops@examplemovers.test',
    evidenceMethod: 'none',
    ruleset: 'FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1_DRAFT',
    intendedPublicationState: 'INGESTED',
    intendedIndexable: false,
    rollbackOp: 'DETACH_PSA',
  };
  const r = revalidateDraftOp({
    draft,
    subject: subject(),
    candidates: [company({ companyId: 'usdot-1', legalName: 'EXAMPLE MOVERS LLC' })],
    ...emptySets,
    liveCompany: { ...company({ companyId: 'usdot-1', legalName: 'EXAMPLE MOVERS LLC' }), slug: 'example' },
    takenIds: new Set(),
    psa: [],
  });
  assert.equal(r.pass, false);
  assert.ok(r.failures.some((f) => f.includes('evidence_not_accepted') || f.includes('link_class')));
});

test('Inc vs LLC legal-form conflict is rejected', () => {
  const draft: CanonicalizationDraftOp = {
    op: 'LINK_EXISTING_CANONICAL',
    fdacsIm: 'IM88888',
    sourceLegalName: 'EXAMPLE MOVERS INC',
    dba: null,
    canonicalCompanyId: 'usdot-1',
    proposedCompanyId: null,
    sourceAddress: '100 MAIN ST',
    sourcePhone: '8135550100',
    sourceEmail: null,
    evidenceMethod: 'exact_legal_name_and_phone',
    ruleset: 'FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1_DRAFT',
    intendedPublicationState: 'INGESTED',
    intendedIndexable: false,
    rollbackOp: 'DETACH_PSA',
  };
  const r = revalidateDraftOp({
    draft,
    subject: subject({ legalName: 'EXAMPLE MOVERS INC', phone: '8135550100' }),
    candidates: [
      company({
        companyId: 'usdot-1',
        legalName: 'EXAMPLE MOVERS LLC',
        phone: '8135550100',
        address: '100 MAIN ST',
      }),
    ],
    ...emptySets,
    liveCompany: {
      ...company({ companyId: 'usdot-1', legalName: 'EXAMPLE MOVERS LLC', phone: '8135550100' }),
      slug: 'example',
    },
    takenIds: new Set(),
    psa: [],
  });
  assert.equal(r.pass, false);
});

test('duplicate company id and duplicate IM authority are blocked', () => {
  const proposed = proposedImCompanyId('IM88888');
  const insertDraft: CanonicalizationDraftOp = {
    op: 'INSERT_NEW_CANONICAL',
    fdacsIm: 'IM88888',
    sourceLegalName: 'EXAMPLE MOVERS LLC',
    dba: null,
    canonicalCompanyId: null,
    proposedCompanyId: proposed,
    sourceAddress: '100 MAIN ST',
    sourcePhone: '8135550100',
    sourceEmail: 'ops@examplemovers.test',
    evidenceMethod: 'new_canonical_from_official_fdacs_im',
    ruleset: 'FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1_DRAFT',
    intendedPublicationState: 'INGESTED',
    intendedIndexable: false,
    rollbackOp: 'DELETE_INGESTED_COMPANY',
  };
  const idCollision = revalidateDraftOp({
    draft: insertDraft,
    subject: subject(),
    candidates: [],
    ...emptySets,
    liveCompany: null,
    takenIds: new Set([proposed]),
    psa: [],
  });
  assert.equal(idCollision.pass, false);
  assert.ok(idCollision.failures.some((f) => f.includes('company_id_collision')));

  const psaCollision = planPsaAction({
    fdacsIm: 'IM88888',
    companyId: 'fl-im-88888',
    existing: [{ id: '1', companyId: 'other', authorityNumber: 'IM88888', rawSourceKey: 'x' }],
  });
  assert.equal(psaCollision.action, 'COLLISION');

  const historicalPlusOrphan = planPsaAction({
    fdacsIm: 'IM31',
    companyId: 'fl-im-31',
    existing: [
      {
        id: 'h',
        companyId: null,
        authorityNumber: 'IM31',
        rawSourceKey: 'FDACS:INTRASTATE_MOVER:IM31',
        status: 'expired',
        verificationState: 'HISTORICAL',
      },
      {
        id: 'a',
        companyId: null,
        authorityNumber: 'IM31',
        rawSourceKey: 'FDACS:INTRASTATE_MOVERS:IM31',
        status: 'active',
        verificationState: 'UNRESOLVED',
      },
    ],
  });
  assert.equal(historicalPlusOrphan.action, 'ATTACH_ORPHAN');
});

test('existing company identity fields are immutable', () => {
  const before = {
    id: 'usdot-1',
    slug: 'acme',
    name: 'Acme',
    fmcsa_legal_name: 'ACME INC',
    publication_state: 'INDEXABLE',
    indexable: true,
    phone: '4075550000',
    email: 'a@x.com',
    physical_address: '1 A ST',
    website: 'https://acme.test',
  };
  assert.equal(canonicalContactOverwriteForbidden(before, before), false);
  assert.equal(canonicalContactOverwriteForbidden(before, { ...before, phone: '4075559999' }), true);
  assert.ok(EXISTING_COMPANY_IMMUTABLE_FIELDS.includes('phone'));
  assert.ok(EXISTING_COMPANY_IMMUTABLE_FIELDS.includes('publication_state'));
});

test('new company contract is INGESTED / indexable=false / anonymous 404', () => {
  const exp = newCompanyPublicExposure({ publicationState: 'INGESTED', indexable: false });
  assert.equal(exp.consumerVisible, false);
  assert.equal(exp.seoIndexable, false);
  assert.equal(exp.anonymousHttp, 404);
});

test('missing federal ID is accepted for INSERT revalidation', () => {
  const proposed = proposedImCompanyId('IM88888');
  const draft: CanonicalizationDraftOp = {
    op: 'INSERT_NEW_CANONICAL',
    fdacsIm: 'IM88888',
    sourceLegalName: 'EXAMPLE MOVERS LLC',
    dba: null,
    canonicalCompanyId: null,
    proposedCompanyId: proposed,
    sourceAddress: '100 MAIN ST',
    sourcePhone: '8135550100',
    sourceEmail: 'ops@examplemovers.test',
    evidenceMethod: 'new_canonical_from_official_fdacs_im',
    ruleset: 'FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1_DRAFT',
    intendedPublicationState: 'INGESTED',
    intendedIndexable: false,
    rollbackOp: 'DELETE_INGESTED_COMPANY',
  };
  const r = revalidateDraftOp({
    draft,
    subject: subject({ usdot: null }),
    candidates: [company({ companyId: 'usdot-9' })],
    ...emptySets,
    liveCompany: null,
    takenIds: new Set(),
    psa: [],
  });
  assert.equal(r.pass, true);
});

test('Wave 1 and KEEP_80 overlap fail closed on LINK', () => {
  const wave = loadWave1Manifest();
  const keep = loadExactCanaryManifests();
  const draft: CanonicalizationDraftOp = {
    op: 'LINK_EXISTING_CANONICAL',
    fdacsIm: 'IM88888',
    sourceLegalName: 'GENTLETOUCH MOVING COMPANY',
    dba: null,
    canonicalCompanyId: wave.members[0].companyId,
    proposedCompanyId: null,
    sourceAddress: '1900 FLORA RD',
    sourcePhone: '8135550100',
    sourceEmail: null,
    evidenceMethod: 'exact_legal_name_and_phone',
    ruleset: 'FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1_DRAFT',
    intendedPublicationState: 'INGESTED',
    intendedIndexable: false,
    rollbackOp: 'DETACH_PSA',
  };
  const r = revalidateDraftOp({
    draft,
    subject: subject({
      legalName: 'GENTLETOUCH MOVING COMPANY',
      physicalAddress: '1900 FLORA RD',
      phone: '8135550100',
    }),
    candidates: [
      company({
        companyId: wave.members[0].companyId,
        legalName: 'GENTLETOUCH MOVING COMPANY',
        address: '1900 FLORA RD',
        phone: '8135550100',
      }),
    ],
    ...emptySets,
    wave1Ids: new Set([wave.members[0].companyId]),
    liveCompany: {
      ...company({ companyId: wave.members[0].companyId, publicationState: 'PUBLISHABLE' }),
      slug: 'wave',
    },
    takenIds: new Set(),
    psa: [],
  });
  assert.equal(r.pass, false);

  const r2 = revalidateDraftOp({
    draft: { ...draft, canonicalCompanyId: keep.companyIds[0] },
    subject: subject({ legalName: 'KEEP CANARY LLC', physicalAddress: '2 CANARY ST', phone: '8135550100' }),
    candidates: [
      company({
        companyId: keep.companyIds[0],
        legalName: 'KEEP CANARY LLC',
        address: '2 CANARY ST',
        phone: '8135550100',
      }),
    ],
    ...emptySets,
    keep80Ids: new Set([keep.companyIds[0]]),
    liveCompany: { ...company({ companyId: keep.companyIds[0] }), slug: 'keep' },
    takenIds: new Set(),
    psa: [],
  });
  assert.equal(r2.pass, false);
});

test('public FDACS chrome is not auto-enabled for existing federal/public companies', () => {
  const gate = publicExposureGateForExistingLink({
    id: 'usdot-2303737',
    publicationState: null,
  });
  assert.equal(gate.pass, true);
  const wave = loadWave1Manifest();
  const blocked = publicExposureGateForExistingLink({
    id: wave.members[0].companyId,
    publicationState: 'PUBLISHABLE',
  });
  assert.equal(blocked.pass, false);
});

test('rollback distinguishes LINK vs INSERT and never deletes existing companies', () => {
  const link: FinalCanonicalizationOp = {
    op: 'LINK_EXISTING_CANONICAL',
    fdacsIm: 'IM1',
    fdacsLegalName: 'A',
    dba: null,
    companyId: 'usdot-1',
    slug: 'a',
    existingOrNew: 'existing',
    identityEvidence: 'exact_legal_name_and_phone',
    identityRuleset: FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1,
    officialSourceStatus: 'active',
    sourceFreshness: 'ACTIVE_FRESH',
    sourcePhone: '4075550000',
    sourceEmail: null,
    sourceAddress: '1 A',
    currentPublicationState: 'INDEXABLE',
    intendedPublicationState: 'INDEXABLE',
    currentIndexable: true,
    intendedIndexable: false,
    stateAuthorityOperation: 'INSERT_REQUIRED',
    contactObservationOperation: 'SAFE_SOURCE_OBSERVATION',
    rollbackOperation: 'DETACH_FL011D_PSA',
  };
  const insert: FinalCanonicalizationOp = {
    ...link,
    op: 'INSERT_NEW_CANONICAL',
    companyId: 'fl-im-1',
    existingOrNew: 'new',
    intendedPublicationState: 'INGESTED',
    currentPublicationState: null,
    currentIndexable: null,
    rollbackOperation: 'DELETE_INGESTED_COMPANY',
  };
  assert.equal(rollbackForOp(link).mayDeleteCompany, false);
  assert.equal(rollbackForOp(insert).mayDeleteCompany, true);
  assert.ok(fl011dMatchMethod('exact_legal_name_and_phone').startsWith(FL_011D_MATCH_METHOD_PREFIX));
});

test('contact planning never promotes canonical fields; collision fail-closed', () => {
  const insert = planContactAction({
    regulatoryId: 'FL-FDACS-IM-1',
    kind: 'business_phone',
    companyId: 'fl-im-1',
    existing: [],
  });
  assert.equal(insert.action, 'INSERT');
  const noop = planContactAction({
    regulatoryId: 'FL-FDACS-IM-1',
    kind: 'business_phone',
    companyId: 'fl-im-1',
    existing: [
      {
        regulatoryId: 'FL-FDACS-IM-1',
        observationType: 'business_phone',
        companyId: 'fl-im-1',
        normalizedValue: '4075550000',
      },
    ],
  });
  assert.equal(noop.action, 'NOOP');
  const collision = planContactAction({
    regulatoryId: 'FL-FDACS-IM-1',
    kind: 'business_phone',
    companyId: 'fl-im-1',
    existing: [
      {
        regulatoryId: 'FL-FDACS-IM-1',
        observationType: 'business_phone',
        companyId: 'other',
        normalizedValue: '4075550000',
      },
    ],
  });
  assert.equal(collision.action, 'COLLISION');
});

test('hyphen-collapsed slugs collide (llc vs l-l-c)', () => {
  assert.equal(collapsedSlug('a-1-freeman-moving-storage-llc'), collapsedSlug('a-1-freeman-moving-storage-l-l-c'));
  assert.equal(
    slugCollidesInsensitively('a-1-freeman-moving-storage-llc', ['a-1-freeman-moving-storage-l-l-c']),
    true
  );
  assert.equal(slugCollidesInsensitively('blubox-movers', ['other-movers']), false);
});

test('post-apply dry-run must be zero inserts (idempotency)', () => {
  assert.equal(postApplyIdempotentDelta({ companiesInserted: 0, psaInserted: 0, contactsInserted: 0 }).ok, true);
  assert.equal(postApplyIdempotentDelta({ companiesInserted: 1, psaInserted: 0, contactsInserted: 0 }).ok, false);
});

test('final manifest hash is deterministic and Builder 2 tables are forbidden', () => {
  const ops = loadDraft();
  const finals: FinalCanonicalizationOp[] = ops.map((o) => ({
    op: o.op,
    fdacsIm: o.fdacsIm,
    fdacsLegalName: o.sourceLegalName,
    dba: o.dba,
    companyId: o.canonicalCompanyId ?? o.proposedCompanyId ?? '',
    slug: (o.canonicalCompanyId ?? o.proposedCompanyId ?? 'x').toLowerCase(),
    existingOrNew: o.op === 'LINK_EXISTING_CANONICAL' ? 'existing' : 'new',
    identityEvidence: o.evidenceMethod,
    identityRuleset: FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1,
    officialSourceStatus: 'active',
    sourceFreshness: 'ACTIVE_FRESH',
    sourcePhone: o.sourcePhone,
    sourceEmail: o.sourceEmail,
    sourceAddress: o.sourceAddress,
    currentPublicationState: o.op === 'INSERT_NEW_CANONICAL' ? null : 'INDEXABLE',
    intendedPublicationState: o.op === 'INSERT_NEW_CANONICAL' ? 'INGESTED' : 'INDEXABLE',
    currentIndexable: o.op === 'INSERT_NEW_CANONICAL' ? null : true,
    intendedIndexable: false,
    stateAuthorityOperation: 'PENDING',
    contactObservationOperation: 'PENDING',
    rollbackOperation: o.op === 'INSERT_NEW_CANONICAL' ? 'DELETE_INGESTED_COMPANY' : 'DETACH_FL011D_PSA',
  }));
  assert.equal(hashFinalManifest(finals), hashFinalManifest([...finals].reverse()));
  assert.ok(FL_011D_FORBIDDEN_TABLES.includes('provider_county_credential'));
  assert.ok(FL_011D_FORBIDDEN_TABLES.includes('county_regulatory_program'));
});
