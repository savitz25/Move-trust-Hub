import assert from 'node:assert/strict';
import test from 'node:test';
import { interpretMoveAskQuery } from './interpret';

test('Oregon certificate identity outranks unlabeled federal digits', () => {
  const parsed = interpretMoveAskQuery('Oregon mover certificate 201032');
  assert.equal(parsed.query.mode, 'fail_closed');
  assert.match(parsed.query.failReason ?? '', /201032/);
  assert.match(parsed.query.failReason ?? '', /All America Moving/i);
  assert.match(parsed.query.failReason ?? '', /not a USDOT|not an MC/i);
  assert.doesNotMatch(parsed.query.failReason ?? '', /Florida IM|FDACS/i);
});

test('Oregon household-goods questions stay on ODOT grain', () => {
  for (const q of [
    'Oregon movers',
    'household goods movers in Oregon',
    'is this mover licensed in Oregon',
    'Oregon household goods mover All America',
  ]) {
    const parsed = interpretMoveAskQuery(q);
    assert.equal(parsed.query.mode, 'fail_closed', q);
    assert.notEqual(parsed.query.mode, 'count', q);
    assert.match(parsed.query.failReason ?? '', /ODOT|Oregon certificate|authorized list/i, q);
    assert.doesNotMatch(parsed.query.failReason ?? '', /Florida IM|FDACS/i, q);
  }
});

test('Oregon complaint and enforcement questions do not invent zero', () => {
  const complaints = interpretMoveAskQuery('complaints against a company in Oregon');
  assert.equal(complaints.query.mode, 'fail_closed');
  assert.equal(complaints.query.coverageState, 'NOT_ACQUIRED');
  assert.match(complaints.query.failReason ?? '', /not zero|form 9976|complaint/i);
  assert.doesNotMatch(complaints.query.failReason ?? '', /\b0 complaints\b/i);

  const enforcement = interpretMoveAskQuery('Oregon mover enforcement');
  assert.equal(enforcement.query.mode, 'fail_closed');
  assert.equal(enforcement.query.coverageState, 'NOT_ACQUIRED');
  assert.match(enforcement.query.failReason ?? '', /not a disciplinary record|Final Order|framework/i);
});

test('interstate mover in Oregon uses federal headquarters path', () => {
  const parsed = interpretMoveAskQuery('interstate mover in Oregon');
  assert.notEqual(parsed.query.mode, 'fail_closed');
  assert.equal(parsed.query.mode, 'entity');
  assert.equal(parsed.query.jurisdiction?.state, 'OR');
  assert.equal(parsed.query.jurisdiction?.meaning, 'recorded_headquarters_state');
});

test('USDOT and MC stay federal and do not prove Oregon authority', () => {
  const usdot = interpretMoveAskQuery('USDOT 1234567');
  assert.equal(usdot.query.mode, 'identifier');
  assert.equal(usdot.query.identifier?.type, 'usdot');
  const mixed = interpretMoveAskQuery('USDOT 3244649 Oregon mover');
  assert.equal(mixed.query.mode, 'fail_closed');
  assert.match(mixed.query.failReason ?? '', /not an Oregon|ODOT|certificate/i);
});

test('Portland local ranking is not created', () => {
  const parsed = interpretMoveAskQuery('safest mover in Portland Oregon');
  assert.equal(parsed.query.mode, 'fail_closed');
  assert.match(parsed.query.failReason ?? '', /Portland|does not rank|Multnomah/i);
});
