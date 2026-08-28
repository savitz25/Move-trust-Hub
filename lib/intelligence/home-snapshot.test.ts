import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { assembleMoveHomePayload, emptyMoveHomePayload } from './home-assemble';
import { classifyDirectoryEntityClass } from './home-classify';
import { fingerprintMoveHomePayload } from './home-fingerprint';
import { MOVE_HOME_EVIDENCE_DEPTH, MOVE_HOME_LIMITATIONS } from './home-education';
import { buildMoveHomeSiteCoverage } from './home-site-coverage';
import { MOVE_HOME_H1, MOVE_HOME_INTEL_VERSION } from './home-types';

const coverage = buildMoveHomeSiteCoverage();

function sampleCounts(overrides: Partial<Parameters<typeof assembleMoveHomePayload>[0]> = {}) {
  return assembleMoveHomePayload({
    generatedAt: '2026-08-28T12:00:00.000Z',
    timedOut: false,
    asOf: '2026-08-27T00:00:00.000Z',
    publishableProfiles: 100,
    entityClasses: [
      { class: 'Carrier', count: 70 },
      { class: 'Broker', count: 10 },
      { class: 'Carrier/Broker', count: 15 },
      { class: 'Unknown', count: 5 },
    ],
    authority: { active: 80, notCurrent: 12, unknown: 8, total: 100 },
    siteCoverage: coverage,
    ...overrides,
  });
}

test('version is exact move-home-intel-v1', () => {
  assert.equal(MOVE_HOME_INTEL_VERSION, 'move-home-intel-v1');
  assert.equal(sampleCounts().version, 'move-home-intel-v1');
});

test('required metadata is present', () => {
  const payload = sampleCounts();
  assert.equal(typeof payload.generatedAt, 'string');
  assert.equal(typeof payload.asOf, 'string');
  assert.equal(typeof payload.timedOut, 'boolean');
  assert.equal(payload.canonicalFingerprint.length, 64);
  assert.ok(payload.sources.length >= 3);
  assert.ok(payload.limitations.length >= 8);
});

test('fingerprint is deterministic and excludes generatedAt/timedOut', () => {
  const a = sampleCounts({ generatedAt: '2026-08-28T12:00:00.000Z', timedOut: false });
  const b = sampleCounts({ generatedAt: '2026-08-29T01:00:00.000Z', timedOut: false });
  assert.equal(a.canonicalFingerprint, b.canonicalFingerprint);
  assert.equal(fingerprintMoveHomePayload(a), a.canonicalFingerprint);
  const again = sampleCounts({ generatedAt: '2026-08-28T12:00:00.000Z' });
  assert.equal(again.canonicalFingerprint, a.canonicalFingerprint);
});

test('timeout does not become zero and omits numeric metrics', () => {
  const payload = emptyMoveHomePayload('2026-08-28T12:00:00.000Z', true, coverage);
  assert.equal(payload.timedOut, true);
  assert.equal(payload.asOf, null);
  assert.equal(payload.metrics.length, 0);
  assert.equal(payload.entityClasses, null);
  assert.equal(payload.authority, null);
  assert.equal(
    payload.metrics.some((m) => m.value === 0),
    false
  );
});

test('missing asOf omits directory numbers even when counts exist', () => {
  const payload = sampleCounts({ asOf: null, publishableProfiles: 100 });
  assert.equal(payload.metrics.length, 0);
  assert.equal(payload.entityClasses, null);
  assert.equal(payload.authority, null);
});

test('null authority is unknown, not inactive', () => {
  const payload = sampleCounts();
  assert.ok(payload.authority);
  assert.equal(payload.authority.unknown, 8);
  assert.equal(payload.authority.active + payload.authority.notCurrent + payload.authority.unknown, 100);
  assert.notEqual(payload.authority.unknown, payload.authority.notCurrent);
});

test('carrier, broker, and dual stay separate', () => {
  const payload = sampleCounts();
  const classes = Object.fromEntries(payload.entityClasses!.map((row) => [row.class, row.count]));
  assert.equal(classes.Carrier, 70);
  assert.equal(classes.Broker, 10);
  assert.equal(classes['Carrier/Broker'], 15);
  assert.equal(classifyDirectoryEntityClass('CARRIER'), 'Carrier');
  assert.equal(classifyDirectoryEntityClass('BROKER'), 'Broker');
  assert.equal(classifyDirectoryEntityClass('CARRIER/BROKER'), 'Carrier/Broker');
  assert.equal(classifyDirectoryEntityClass('BROKER/CARRIER'), 'Carrier/Broker');
  assert.equal(classifyDirectoryEntityClass(null), 'Unknown');
});

test('overlapping entity-class counts fail closed', () => {
  const payload = sampleCounts({
    entityClasses: [
      { class: 'Carrier', count: 90 },
      { class: 'Broker', count: 20 },
      { class: 'Carrier/Broker', count: 15 },
      { class: 'Unknown', count: 0 },
    ],
  });
  assert.equal(payload.entityClasses, null);
});

test('authority split that does not sum to total fails closed', () => {
  const payload = sampleCounts({
    authority: { active: 80, notCurrent: 10, unknown: 0, total: 100 },
  });
  assert.equal(payload.authority, null);
});

test('site coverage is a landing fact, not service territory', () => {
  assert.equal(coverage.landingCount, 51);
  assert.equal(coverage.includesDc, true);
  assert.equal(coverage.allFiftyStatesAndDc, true);
  assert.match(coverage.limitation, /not service territory/i);
  assert.match(coverage.limitation, /not a count of movers/i);
});

test('H1 constant is the intelligence identity', () => {
  assert.equal(MOVE_HOME_H1, 'Understand the moving market before you book.');
});

test('evidence depth has required families and no invented percentages', () => {
  const ids = MOVE_HOME_EVIDENCE_DEPTH.map((item) => item.id);
  for (const id of [
    'identity',
    'fmcsa_authority',
    'insurance',
    'safety',
    'complaints',
    'state_registration',
    'geography',
    'contacts',
  ]) {
    assert.ok(ids.includes(id), id);
  }
  for (const item of MOVE_HOME_EVIDENCE_DEPTH) {
    assert.equal(/\d+%/.test(item.note), false);
  }
  assert.match(
    MOVE_HOME_EVIDENCE_DEPTH.find((i) => i.id === 'safety')!.status,
    /not currently available/i
  );
});

test('limitations include the required research-discipline statements', () => {
  const blob = MOVE_HOME_LIMITATIONS.join(' ');
  assert.match(blob, /not the complete FMCSA universe/i);
  assert.match(blob, /headquarters location does not prove service territory/i);
  assert.match(blob, /does not mean TrustHub endorsement/i);
  assert.match(blob, /inspection volume varies/i);
  assert.match(blob, /complaint found is not proof/i);
});

test('payload omits prohibited metric families', () => {
  const payload = sampleCounts();
  const blob = JSON.stringify(payload);
  assert.equal(/reputation_score/i.test(blob), false);
  assert.equal(/inspection/i.test(blob) && /"id":"dir_inspections"/.test(blob), false);
  const ids = payload.metrics.map((m) => m.id);
  for (const banned of [
    'fl_fdacs_im_active_registrations',
    'fl_fdacs_mb_active_registrations',
    'dir_inspections',
    'dir_complaints_trend',
    'dir_insurance_on_file',
    'reputation_score',
    'google_places',
  ]) {
    assert.equal(ids.includes(banned), false, banned);
  }
});
