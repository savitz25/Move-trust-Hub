import assert from 'node:assert/strict';
import test from 'node:test';
import { interpretMoveAskQuery } from './interpret';

test('NY intrastate roster requests do not execute Florida IM', () => {
  for (const q of [
    'Show intrastate movers in New York',
    'Show intrastate movers in NY',
    'How many intrastate movers are registered in New York?',
    'New York intrastate household-goods movers',
  ]) {
    const parsed = interpretMoveAskQuery(q);
    assert.equal(parsed.query.floridaIm, undefined, q);
    assert.notEqual(parsed.query.jurisdiction?.state, 'FL', q);
    assert.notEqual(parsed.query.jurisdiction?.meaning, 'florida_im_registration', q);
    assert.notEqual(parsed.query.mode, 'count', q);
    assert.notEqual(parsed.query.mode, 'entity', q);
    assert.equal(parsed.query.mode, 'fail_closed', q);
    assert.equal(parsed.query.coverageState, 'NOT_ACQUIRED', q);
    assert.match(parsed.query.failReason ?? '', /NYSDOT|CarCert|search/i, q);
    assert.doesNotMatch(parsed.query.failReason ?? '', /Florida IM|FDACS/i, q);
  }
});

test('Florida IM queries still execute Florida registration grain', () => {
  const parsed = interpretMoveAskQuery('Show Florida intrastate movers registered with FDACS');
  assert.equal(parsed.query.mode, 'entity');
  assert.equal(parsed.query.floridaIm, true);
  assert.equal(parsed.query.jurisdiction?.state, 'FL');
  assert.equal(parsed.query.jurisdiction?.meaning, 'florida_im_registration');

  const count = interpretMoveAskQuery('How many active Florida Intrastate Mover registrations are indexed?');
  assert.equal(count.query.mode, 'count');
  assert.equal(count.query.floridaIm, true);
  assert.equal(count.query.aggregateMetric, 'florida_im_active');
});

test('explicit New York headquarters interstate research uses federal directory', () => {
  for (const q of [
    'Show an interstate mover headquartered in New York',
    'Show interstate movers headquartered in New York',
    'Show interstate movers headquartered in NY',
    'Show an interstate mover headquartered in NY',
    'interstate mover in New York',
  ]) {
    const parsed = interpretMoveAskQuery(q);
    assert.notEqual(parsed.query.mode, 'fail_closed', q);
    assert.equal(parsed.query.mode, 'entity', q);
    assert.equal(parsed.query.floridaIm, undefined, q);
    assert.equal(parsed.query.jurisdiction?.state, 'NY', q);
    assert.equal(parsed.query.jurisdiction?.meaning, 'recorded_headquarters_state', q);
    assert.equal(parsed.query.role, 'carrier', q);
    assert.equal(parsed.query.authorityCurrent, 'any', q);
  }

  const current = interpretMoveAskQuery(
    'Show current interstate household-goods carriers headquartered in New York',
  );
  assert.equal(current.query.mode, 'entity');
  assert.equal(current.query.floridaIm, undefined);
  assert.equal(current.query.jurisdiction?.state, 'NY');
  assert.equal(current.query.jurisdiction?.meaning, 'recorded_headquarters_state');
  assert.equal(current.query.role, 'carrier');
  assert.equal(current.query.authorityCurrent, true);
});

test('labeled USDOT lookup with NY geography stays identifier research', () => {
  const parsed = interpretMoveAskQuery('Find USDOT 3244649 in New York');
  assert.equal(parsed.query.mode, 'identifier');
  assert.equal(parsed.query.identifier?.type, 'usdot');
  assert.equal(parsed.query.identifier?.value, '3244649');
  assert.equal(parsed.query.floridaIm, undefined);
  assert.equal(parsed.query.evidenceFamily, undefined);
});

test('TH-SEARCH-R1-001 labeled identifiers still parse', () => {
  const usdot = interpretMoveAskQuery('Find USDOT 3244649');
  assert.equal(usdot.query.mode, 'identifier');
  assert.equal(usdot.query.identifier?.type, 'usdot');
  assert.equal(usdot.query.identifier?.value, '3244649');

  const mc = interpretMoveAskQuery('Find MC 1019808');
  assert.equal(mc.query.mode, 'identifier');
  assert.equal(mc.query.identifier?.type, 'mc');
  assert.equal(mc.query.identifier?.value, '1019808');
});

test('labeled USDOT complaint research is not blocked by New York geography', () => {
  const parsed = interpretMoveAskQuery('Show complaint observations for USDOT 3244649, a New York mover');
  assert.equal(parsed.query.mode, 'evidence');
  assert.equal(parsed.query.evidenceFamily, 'complaint');
  assert.equal(parsed.query.identifier?.type, 'usdot');
  assert.equal(parsed.query.identifier?.value, '3244649');
  assert.equal(parsed.query.floridaIm, undefined);
  assert.doesNotMatch(parsed.query.failReason ?? '', /exact identity required/i);
});

test('explicit NYSDOT complaint corpus stays unavailable even with a USDOT', () => {
  const parsed = interpretMoveAskQuery('NYSDOT complaints for USDOT 3244649');
  assert.equal(parsed.query.mode, 'fail_closed');
  assert.equal(parsed.query.coverageState, 'NOT_ACQUIRED');
  assert.notEqual(parsed.query.evidenceFamily, 'complaint');
  assert.match(parsed.query.failReason ?? '', /NYSDOT/);
  assert.doesNotMatch(parsed.query.failReason ?? '', /exact identity required/i);
});

test('USDOT does not prove New York intrastate authority', () => {
  const parsed = interpretMoveAskQuery('Is USDOT 3244649 authorized for intrastate moves in New York?');
  assert.equal(parsed.query.mode, 'fail_closed');
  assert.equal(parsed.query.coverageState, 'NOT_ACQUIRED');
  assert.match(parsed.query.failReason ?? '', /intrastate|NYSDOT|not New York/i);
  assert.notEqual(parsed.query.evidenceFamily, 'authority');
  assert.notEqual(parsed.query.mode, 'identifier');
});

test('name-only New York complaint still requires a labeled identity', () => {
  const parsed = interpretMoveAskQuery('complaints against mover X in New York');
  assert.equal(parsed.query.mode, 'fail_closed');
  assert.equal(parsed.query.coverageState, 'PARTIAL');
});

test('ranking, route, and malformed identifier safeguards still fail closed', () => {
  const best = interpretMoveAskQuery('best mover in New York');
  assert.equal(best.query.mode, 'fail_closed');
  assert.match(best.query.failReason ?? '', /does not rank/i);

  const route = interpretMoveAskQuery('I am moving from Miami to New York');
  assert.equal(route.query.mode, 'fail_closed');
  assert.equal(route.query.coverageState, 'UNSUPPORTED');

  const malformed = interpretMoveAskQuery('USDOT banana');
  assert.equal(malformed.query.mode, 'fail_closed');

  const conflicting = interpretMoveAskQuery('USDOT 3244649 USDOT 1019808');
  assert.equal(conflicting.query.mode, 'fail_closed');
});
