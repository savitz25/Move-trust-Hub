import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { hashWave2Draft } from '@/lib/state-hhg/fl/wave-2-readiness';
import { loadWave1Manifest } from '@/lib/state-hhg/fl/wave-1';
import {
  EXPECTED_ACTIVE,
  EXPECTED_REPRESENTED,
  EXPECTED_UNRESOLVED,
  FL_011G_GOOGLE_PLACES_REQUESTS,
  FL_011G_PRODUCTION_WRITES,
  FL_012_MATURITY,
  FL_WAVE1_LAUNCH,
  WAVE2_DRAFT_COUNT,
  WAVE2_DRAFT_HASH,
  classifyBrokerIdentity,
  classifyBrokerPublication,
  coveragePartitionValid,
  coverageSemantics,
  fl012MayExecute,
  notCoverageSemantics,
  observationElapsedHours,
} from '@/lib/state-hhg/fl/wave-011g';

test('FL-011G is read-only and Google-frozen', () => {
  assert.equal(FL_011G_GOOGLE_PLACES_REQUESTS, 0);
  assert.equal(FL_011G_PRODUCTION_WRITES, 0);
});

test('active IM partition 930+168=1098 and 84.7% is IM-only', () => {
  assert.equal(EXPECTED_ACTIVE, 1098);
  assert.equal(EXPECTED_REPRESENTED + EXPECTED_UNRESOLVED, EXPECTED_ACTIVE);
  assert.equal(coveragePartitionValid(1098, 930, 168), true);
  assert.equal(coveragePartitionValid(1098, 931, 168), false);
  assert.match(coverageSemantics(), /active FDACS intrastate-mover IM universe/);
  assert.ok(notCoverageSemantics().some((s) => /brokers/i.test(s)));
});

test('unresolved hold freeze is 114/46/5/3', () => {
  const hold = JSON.parse(
    readFileSync(resolve(process.cwd(), 'docs/task-fl-011f-remaining-unresolved.json'), 'utf8')
  ) as { remaining: number; tally: Record<string, number> };
  assert.equal(hold.remaining, 168);
  assert.equal(hold.tally.REMAINS_POSSIBLE_DUPLICATE, 114);
  assert.equal(hold.tally.REMAINS_CORPORATE_FAMILY_REVIEW, 46);
  assert.equal(hold.tally.CONFLICT_REMAINS, 5);
  assert.equal(hold.tally.SOURCE_STATUS_BLOCKED, 3);
});

test('Wave 1 is 37 and FL-012 cannot run before maturity', () => {
  const w = loadWave1Manifest();
  assert.equal(w.members.length, 37);
  assert.equal(fl012MayExecute('2026-08-22T23:00:00.000Z'), false);
  assert.equal(fl012MayExecute(FL_012_MATURITY), true);
  assert.equal(FL_WAVE1_LAUNCH, '2026-08-22T14:45:00.000Z');
  assert.ok(observationElapsedHours('2026-08-22T22:45:00.000Z') >= 8);
});

test('Wave 2 draft remains 50 / a5d15f3dca32a59a / apply=false', () => {
  const doc = JSON.parse(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fl-011b-wave2-draft-manifest.json'), 'utf8')
  ) as { hash: string; apply: boolean; members: Array<{ companyId: string; slug: string; fdacsIm: string; intendedPublicationState: 'PUBLISHABLE'; intendedIndexable: false }> };
  assert.equal(doc.members.length, WAVE2_DRAFT_COUNT);
  assert.equal(doc.hash, WAVE2_DRAFT_HASH);
  assert.equal(doc.apply, false);
  assert.equal(hashWave2Draft(doc.members as never), WAVE2_DRAFT_HASH);
});

test('broker identity is not a mover and name-only is review', () => {
  assert.equal(
    classifyBrokerIdentity({
      status: 'active',
      mbNumber: 'MB1',
      exactCanonicalCompanyId: null,
      nameOnlyHit: false,
      collidingCompanyIds: [],
    }),
    'BROKER_STATE_RECORD_ONLY'
  );
  assert.equal(
    classifyBrokerIdentity({
      status: 'active',
      mbNumber: 'MB1',
      exactCanonicalCompanyId: 'x',
      nameOnlyHit: true,
      collidingCompanyIds: [],
    }),
    'BROKER_IDENTITY_REVIEW'
  );
  assert.equal(
    classifyBrokerPublication('BROKER_EXISTING_CANONICAL_EXACT'),
    'BROKER_MODEL_REMEDIATION_REQUIRED'
  );
  assert.equal(classifyBrokerPublication('BROKER_STATE_RECORD_ONLY'), 'BROKER_IDENTITY_NOT_READY');
});
