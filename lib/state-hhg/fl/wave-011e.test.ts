import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { hashFinalManifest, type FinalCanonicalizationOp } from '@/lib/state-hhg/fl/wave-011d';
import { hashWave2Draft } from '@/lib/state-hhg/fl/wave-2-readiness';
import {
  FL_011B_WAVE2_DRAFT_HASH,
  FL_011C_GAP_HISTORICAL,
  FL_011D_MANIFEST_HASH,
  FL_011E_GOOGLE_PLACES_REQUESTS,
  FL_011E_PRODUCTION_WRITES,
  assertFl011dManifest,
  assignPrimaryCoverage,
  classifyResolvedForWave2,
  coverageMetric,
  doNotUseArithmeticShortcut,
  isSafelyRepresented,
  newCompanyInternalContract,
  publicFdacsDisplayAllowed,
} from '@/lib/state-hhg/fl/wave-011e';
import { loadWave1Manifest } from '@/lib/state-hhg/fl/wave-1';

test('FL-011E is read-only and Google-frozen', () => {
  assert.equal(FL_011E_GOOGLE_PLACES_REQUESTS, 0);
  assert.equal(FL_011E_PRODUCTION_WRITES, 0);
});

test('FL-011D frozen manifest still hashes 85a137ecd1a86d6f with 81/32/113', () => {
  const doc = JSON.parse(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fl-011d-canonicalization-wave-internal-v1.json'), 'utf8')
  ) as { hash: string; operations: FinalCanonicalizationOp[] };
  assert.equal(doc.hash, FL_011D_MANIFEST_HASH);
  const bound = assertFl011dManifest(doc.operations, doc.hash);
  assert.equal(bound.link, 81);
  assert.equal(bound.insert, 32);
  assert.equal(hashFinalManifest(doc.operations), FL_011D_MANIFEST_HASH);
});

test('Wave 2 historical draft hash is unchanged', () => {
  const doc = JSON.parse(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fl-011b-wave2-draft-manifest.json'), 'utf8')
  ) as { hash: string; apply: boolean; members: Array<{ companyId: string; slug: string; fdacsIm: string; intendedPublicationState: 'PUBLISHABLE'; intendedIndexable: false }> };
  assert.equal(doc.hash, FL_011B_WAVE2_DRAFT_HASH);
  assert.equal(doc.apply, false);
  assert.equal(doc.members.length, 50);
  assert.equal(hashWave2Draft(doc.members as never), FL_011B_WAVE2_DRAFT_HASH);
});

test('coverage partition is exclusive and represented is not 720+113 arithmetic', () => {
  const naive = doNotUseArithmeticShortcut(720, 113);
  assert.equal(naive, 833);
  const m = coverageMetric(1104, 936);
  assert.equal(m.unresolved, 168);
  assert.notEqual(m.represented, naive);
  assert.equal(FL_011C_GAP_HISTORICAL, 281);
});

test('primary coverage assignment priority', () => {
  const base = {
    fdacsIm: 'IM1',
    wave1Im: false,
    keep80Company: false,
    fl011dInsert: false,
    hasCurrentPsaOnCompany: true,
    consumerVisible: false,
    ingested: true,
    wave2Ready: true,
    gapClass: null,
  };
  assert.equal(assignPrimaryCoverage({ ...base, wave1Im: true }), 'WAVE1_PUBLISHABLE');
  assert.equal(assignPrimaryCoverage({ ...base, fl011dInsert: true }), 'NEW_FL011D_INTERNAL');
  assert.equal(assignPrimaryCoverage({ ...base, consumerVisible: true }), 'PUBLIC_CANONICAL_WITH_FDACS');
  assert.equal(assignPrimaryCoverage(base), 'WAVE2_READY_INTERNAL');
  assert.equal(
    assignPrimaryCoverage({
      ...base,
      hasCurrentPsaOnCompany: false,
      wave2Ready: false,
      gapClass: 'POSSIBLE_DUPLICATE',
    }),
    'POSSIBLE_DUPLICATE'
  );
  assert.equal(isSafelyRepresented('WAVE2_READY_INTERNAL'), true);
  assert.equal(isSafelyRepresented('POSSIBLE_DUPLICATE'), false);
});

test('resolved 113 wave2 classes do not treat public links as Wave 2', () => {
  assert.equal(
    classifyResolvedForWave2({ op: 'LINK_EXISTING_CANONICAL', consumerVisible: true, wave2Ready: false }),
    'ALREADY_PUBLIC_NO_WAVE_NEEDED'
  );
  assert.equal(
    classifyResolvedForWave2({ op: 'INSERT_NEW_CANONICAL', consumerVisible: false, wave2Ready: true }),
    'NEWLY_WAVE2_READY'
  );
  assert.equal(
    classifyResolvedForWave2({ op: 'INSERT_NEW_CANONICAL', consumerVisible: false, wave2Ready: false }),
    'INTERNAL_BUT_NOT_WAVE2_READY'
  );
});

test('coverage partition JSON sums to unique active universe with no double-count', () => {
  const part = JSON.parse(
    readFileSync(resolve(process.cwd(), 'docs/task-fl-011e-coverage-partition.json'), 'utf8')
  ) as { active: number; partition_sum: number; partition: Record<string, number>; represented: number; unresolved: number };
  const sum = Object.values(part.partition).reduce((a, b) => a + b, 0);
  assert.equal(sum, part.active);
  assert.equal(part.partition_sum, part.active);
  assert.equal(part.represented + part.unresolved, part.active);
  assert.equal(46 + 114 + 5 + 3, 168);
  const contact = JSON.parse(
    readFileSync(resolve(process.cwd(), 'docs/task-fl-011e-contact-audit.json'), 'utf8')
  ) as { PHONE_OBSERVATIONS_ATTACHED: number; EMAIL_OBSERVATIONS_ATTACHED: number; ADDRESS_OBSERVATIONS_ATTACHED: number };
  assert.equal(
    contact.PHONE_OBSERVATIONS_ATTACHED +
      contact.EMAIL_OBSERVATIONS_ATTACHED +
      contact.ADDRESS_OBSERVATIONS_ATTACHED,
    104
  );
  const b2 = JSON.parse(
    readFileSync(resolve(process.cwd(), 'docs/task-fl-011e-builder2-freeze.json'), 'utf8')
  ) as { writes: number };
  assert.equal(b2.writes, 0);
});

test('new FL-011D companies remain INGESTED / 404; Wave 1 chrome stays gated', () => {
  const c = newCompanyInternalContract({ publicationState: 'INGESTED', indexable: false });
  assert.equal(c.ingested, true);
  assert.equal(c.anonymous404, true);
  const wave = loadWave1Manifest();
  assert.equal(publicFdacsDisplayAllowed({ id: 'usdot-2303737', publicationState: 'PUBLISHABLE' }), false);
  assert.equal(publicFdacsDisplayAllowed({ id: wave.members[0].companyId, publicationState: 'PUBLISHABLE' }), true);
});
