import assert from 'node:assert/strict';
import test from 'node:test';
import { interpretMoveAskQuery } from './interpret';

test('Illinois HHG questions stay on ICC search grain and do not execute Florida IM', () => {
  for (const q of [
    'moving companies in Illinois',
    'How many movers are licensed in Illinois?',
    'licensed household goods movers in Illinois',
    'is this mover licensed in Illinois?',
  ]) {
    const parsed = interpretMoveAskQuery(q);
    assert.equal(parsed.query.floridaIm, undefined, q);
    assert.notEqual(parsed.query.jurisdiction?.state, 'FL', q);
    assert.notEqual(parsed.query.mode, 'count', q);
    assert.notEqual(parsed.query.mode, 'entity', q);
    assert.equal(parsed.query.mode, 'fail_closed', q);
    assert.equal(parsed.query.coverageState, 'NOT_ACQUIRED', q);
    assert.match(parsed.query.failReason ?? '', /ICC|Illinois Commerce|search/i, q);
    assert.doesNotMatch(parsed.query.failReason ?? '', /Florida IM|FDACS/i, q);
  }
});

test('Illinois complaint questions do not silently use FMCSA complaints', () => {
  const parsed = interpretMoveAskQuery('complaints against a mover in Illinois');
  assert.equal(parsed.query.mode, 'fail_closed');
  assert.equal(parsed.query.coverageState, 'NOT_ACQUIRED');
  assert.match(parsed.query.failReason ?? '', /ICC|Illinois Commerce/i);
  assert.doesNotMatch(parsed.query.failReason ?? '', /exact identity required/i);
});

test('interstate mover in Illinois uses federal headquarters path', () => {
  const parsed = interpretMoveAskQuery('interstate mover in Illinois');
  assert.notEqual(parsed.query.mode, 'fail_closed');
  assert.equal(parsed.query.mode, 'entity');
  assert.equal(parsed.query.jurisdiction?.state, 'IL');
  assert.equal(parsed.query.jurisdiction?.meaning, 'recorded_headquarters_state');
  assert.equal(parsed.query.role, 'carrier');
});

test('labeled USDOT and MC lookups stay federal', () => {
  const usdot = interpretMoveAskQuery('USDOT 1234567');
  assert.equal(usdot.query.mode, 'identifier');
  assert.equal(usdot.query.identifier?.type, 'usdot');
  const mc = interpretMoveAskQuery('MC 123456');
  assert.equal(mc.query.mode, 'identifier');
  assert.equal(mc.query.identifier?.type, 'mc');
});

test('ranking and Chicago routes fail closed', () => {
  const best = interpretMoveAskQuery('best mover in Illinois');
  assert.equal(best.query.mode, 'fail_closed');
  assert.match(best.query.failReason ?? '', /does not rank/i);

  const chicago = interpretMoveAskQuery('safest mover in Chicago');
  assert.equal(chicago.query.mode, 'fail_closed');
  assert.match(chicago.query.failReason ?? '', /Chicago|does not rank/i);
});

test('USDOT does not prove Illinois intrastate authority', () => {
  const parsed = interpretMoveAskQuery('Is USDOT 3244649 licensed in Illinois?');
  assert.equal(parsed.query.mode, 'fail_closed');
  assert.match(parsed.query.failReason ?? '', /ICC|intrastate|not Illinois/i);
});
