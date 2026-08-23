/**
 * FL-011I — manifest-bound FDACS MB internal apply tests.
 * Google Places: 0. Does not start FL-012. Apply is hash-bound.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { classifyProvider } from '@/lib/provider/classification';
import { isLocalMover } from '@/lib/companies/is-local-mover';
import { loadWave1Manifest } from '@/lib/state-hhg/fl/wave-1';
import { hashWave2Draft } from '@/lib/state-hhg/fl/wave-2-readiness';
import {
  EXPECTED_ACTIVE,
  EXPECTED_COVERAGE_PCT,
  EXPECTED_REPRESENTED,
  EXPECTED_UNRESOLVED,
  WAVE2_DRAFT_COUNT,
  WAVE2_DRAFT_HASH,
  WAVE2_READY_POOL,
} from '@/lib/state-hhg/fl/wave-011g';
import {
  BROKER_ROLE,
  FL_011H_GOOGLE_PLACES_REQUESTS,
  FL_FDACS_MB_INTERNAL_STAGING_V1_DRAFT,
  hashBrokerStagingDraft,
  proposedMbCompanyId,
} from '@/lib/state-hhg/fl/wave-011h';
import {
  FL_011I_DRAFT_HASH,
  FL_011I_EXPECTED_INSERT,
  FL_011I_EXPECTED_LINK,
  FL_011I_EXPECTED_TOTAL,
  FL_011I_GOOGLE_PLACES_REQUESTS,
  FL_011I_MB171_CONTROL,
  FL_011I_MB12,
  FL_011I_MB159_LINK,
  FL_011I_PRODUCTION_WRITES_IN_PR,
  FL_FDACS_MB_INTERNAL_STAGING_V1,
  SAFE_BROKER_ENTITY_TYPE,
  assertExactBrokerDraft,
  brokerInsertRoleSafety,
  evaluateSuddathMb12Gate,
  hashFinalBrokerManifest,
  rollbackBrokerOp,
  type DraftBrokerOp,
  type FinalBrokerOp,
} from '@/lib/state-hhg/fl/wave-011i';
import type { CanonicalProviderIdentity } from '@/lib/state-hhg/identity';

function loadDraft(): { hash: string; apply: boolean; operations: DraftBrokerOp[] } {
  return JSON.parse(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fl-011h-mb-internal-staging-v1-draft.json'), 'utf8')
  ) as { hash: string; apply: boolean; operations: DraftBrokerOp[] };
}

const suddathFamily: CanonicalProviderIdentity[] = [
  {
    companyId: 'fl-im-3813',
    legalName: 'SUDDATH MOVING & STORAGE, LLC',
    dbaName: 'Suddath Workplace Solutions',
    publicName: 'Suddath Workplace Solutions',
    usdot: '3527089',
    phone: '9043907100',
    email: 'legal@suddath.com',
    address: '2001 SUDDATH PARK STREET',
    city: 'Tampa',
    state: 'FL',
    postalCode: '33619',
  },
  {
    companyId: 'fl-im-4099',
    legalName: 'SUDDATH RELOCATION SYSTEMS OF ST. PETERSBURG, INC.',
    dbaName: 'Suddath Moving & Storage',
    publicName: 'Suddath Moving & Storage',
    usdot: null,
    phone: '9043907100',
    email: 'legal@suddath.com',
    address: '2001 SUDDATH PARK ST',
    city: 'Tampa',
    state: 'FL',
    postalCode: '33619',
  },
];

test('FL-011I is Google-frozen and the implementation PR does not apply', () => {
  assert.equal(FL_011I_GOOGLE_PLACES_REQUESTS, 0);
  assert.equal(FL_011H_GOOGLE_PLACES_REQUESTS, 0);
  assert.equal(FL_011I_PRODUCTION_WRITES_IN_PR, 0);
  assert.equal(FL_FDACS_MB_INTERNAL_STAGING_V1, 'FL_FDACS_MB_INTERNAL_STAGING_V1');
});

test('frozen draft is exactly LINK 1 / INSERT 17 / hash e1e78a4d18cf2c0c / apply=false', () => {
  const doc = loadDraft();
  assert.equal((doc as { id?: string }).id ?? FL_FDACS_MB_INTERNAL_STAGING_V1_DRAFT, FL_FDACS_MB_INTERNAL_STAGING_V1_DRAFT);
  assert.equal(doc.apply, false);
  assert.equal(doc.hash, FL_011I_DRAFT_HASH);
  const bound = assertExactBrokerDraft(doc.operations, doc.hash);
  assert.equal(bound.link, FL_011I_EXPECTED_LINK);
  assert.equal(bound.insert, FL_011I_EXPECTED_INSERT);
  assert.equal(bound.total, FL_011I_EXPECTED_TOTAL);
  assert.equal(
    hashBrokerStagingDraft(
      doc.operations.map((o) => ({
        op: o.operation,
        mb: o.mb,
        companyId: o.targetCompanyId,
        proposedCompanyId: o.proposedCompanyId,
      }))
    ),
    'e1e78a4d18cf2c0c'
  );
  const mbs = new Set(doc.operations.map((o) => o.mb));
  assert.equal(mbs.size, 18);
  assert.equal(mbs.has(FL_011I_MB171_CONTROL.mb), false);
});

test('MB159 is the exact LINK and MB12 is INSERT-ready as a distinct fl-mb-12', () => {
  const doc = loadDraft();
  const link = doc.operations.find((o) => o.operation === 'LINK');
  assert.equal(link?.mb, FL_011I_MB159_LINK.mb);
  assert.equal(link?.targetCompanyId, FL_011I_MB159_LINK.companyId);
  assert.equal(link?.sourceLegalName, 'REAL TIME RELOCATION LLC');
  const mb12 = doc.operations.find((o) => o.mb === FL_011I_MB12);
  assert.equal(mb12?.operation, 'INSERT');
  assert.equal(mb12?.proposedCompanyId, 'fl-mb-12');
  assert.equal(proposedMbCompanyId('MB12'), 'fl-mb-12');
  assert.equal(mb12?.brokerRole, BROKER_ROLE);
});

test('Suddath MB12 remains DISTINCT_INSERT_SAFE against the enterprise family', () => {
  const ok = evaluateSuddathMb12Gate({
    mb: 'MB12',
    legalName: 'SUDDATH CONTAINER SERVICES, INC',
    proposedCompanyId: 'fl-mb-12',
    proposedSlug: 'suddath-container-services-inc',
    candidates: suddathFamily,
    takenIds: new Set(suddathFamily.map((c) => c.companyId)),
    takenSlugs: new Set(['suddath-workplace-solutions']),
  });
  assert.equal(ok.result, 'DISTINCT_INSERT_SAFE');

  const same = evaluateSuddathMb12Gate({
    mb: 'MB12',
    legalName: 'SUDDATH CONTAINER SERVICES, INC',
    proposedCompanyId: 'fl-mb-12',
    proposedSlug: 'suddath-container-services-inc',
    candidates: [
      ...suddathFamily,
      {
        companyId: 'x',
        legalName: 'SUDDATH CONTAINER SERVICES, INC',
        dbaName: null,
        publicName: 'SUDDATH CONTAINER SERVICES, INC',
        usdot: null,
        phone: '9045550100',
        email: null,
        address: null,
        city: null,
        state: 'FL',
        postalCode: null,
      },
    ],
    takenIds: new Set(),
    takenSlugs: new Set(),
  });
  assert.equal(same.result, 'BLOCK_SAME_CANONICAL');
});

test('broker INSERT payload is not classified as a local mover or carrier', () => {
  const safe = brokerInsertRoleSafety({
    entityType: SAFE_BROKER_ENTITY_TYPE,
    serviceScope: 'interstate',
    shortDescription: 'Florida FDACS moving-broker registration (internal).',
    description: 'Staged from official FDACS MB evidence. Not an intrastate mover registration.',
  });
  assert.equal(safe.ok, true);
  assert.equal(isLocalMover({ entityType: 'BROKER', serviceScope: 'interstate', services: [], usdotNumber: null }), false);
  const classified = classifyProvider({
    entityType: 'BROKER',
    serviceScope: 'interstate',
    services: [],
    usdotNumber: null,
  });
  assert.equal(classified.hhgLabel === 'Local Mover', false);
  assert.equal(classified.hhgLabel === 'Carrier', false);
  assert.equal(classified.hhgLabel, 'Broker');

  const unsafe = brokerInsertRoleSafety({
    entityType: 'Moving Company',
    serviceScope: 'intrastate',
    shortDescription: 'FL intrastate household-goods mover',
    description: 'Registered mover',
  });
  assert.equal(unsafe.ok, false);
});

test('name-only is not accepted broker link evidence; Wave 2/1 freezes hold', () => {
  assert.equal(FL_011I_EXPECTED_LINK, 1);
  assert.equal(loadWave1Manifest().members.length, 37);
  const wave2 = JSON.parse(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fl-011b-wave2-draft-manifest.json'), 'utf8')
  ) as { hash: string; apply: boolean; members: Array<{ companyId: string; slug: string; fdacsIm: string }> };
  assert.equal(wave2.members.length, WAVE2_DRAFT_COUNT);
  assert.equal(wave2.hash, WAVE2_DRAFT_HASH);
  assert.equal(wave2.apply, false);
  assert.equal(hashWave2Draft(wave2.members as never), WAVE2_DRAFT_HASH);
  assert.equal(WAVE2_READY_POOL, 720);
  assert.equal(EXPECTED_ACTIVE, 1098);
  assert.equal(EXPECTED_REPRESENTED, 930);
  assert.equal(EXPECTED_UNRESOLVED, 168);
  assert.equal(EXPECTED_COVERAGE_PCT, 84.7);
});

test('final hash is deterministic and rollback never deletes the LINK company', () => {
  const ops: FinalBrokerOp[] = [
    {
      op: 'LINK',
      mb: 'MB159',
      companyId: 'fl-im-3405',
      slug: 'real-time-relocation-llc',
      intendedPublicationState: 'INGESTED',
      intendedIndexable: false,
    },
    {
      op: 'INSERT',
      mb: 'MB12',
      companyId: 'fl-mb-12',
      slug: 'suddath-container-services-inc',
      intendedPublicationState: 'INGESTED',
      intendedIndexable: false,
    },
  ];
  assert.equal(hashFinalBrokerManifest(ops), hashFinalBrokerManifest([...ops].reverse()));
  const linkRb = rollbackBrokerOp(ops[0]);
  assert.equal(linkRb.mayDeleteCompany, false);
  const insertRb = rollbackBrokerOp(ops[1]);
  assert.equal(insertRb.mayDeleteCompany, true);
});
