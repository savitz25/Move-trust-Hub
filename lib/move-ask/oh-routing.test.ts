import assert from 'node:assert/strict';
import test from 'node:test';
import { interpretMoveAskQuery } from './interpret';

test('Ohio PUCO certificate outranks geography', () => {
  const parsed = interpretMoveAskQuery('PUCO 113554-HG');
  assert.equal(parsed.query.mode, 'fail_closed');
  assert.match(parsed.query.failReason ?? '', /113554-HG/);
  assert.match(parsed.query.failReason ?? '', /not a USDOT|not an MC/i);
  assert.doesNotMatch(parsed.query.failReason ?? '', /Utility Code|NCUC|ODOT|HICPA/i);
});

test('Source-native -HG identity is PUCO, not USDOT', () => {
  const parsed = interpretMoveAskQuery('1288-HG');
  assert.equal(parsed.query.mode, 'fail_closed');
  assert.match(parsed.query.failReason ?? '', /1288-HG/);
  assert.match(parsed.query.failReason ?? '', /PUCO/i);
});

test('Ohio household-goods questions stay on PUCO grain', () => {
  for (const q of [
    'movers Ohio',
    'moving companies Ohio',
    'licensed movers Ohio',
    'certified movers Ohio',
    'PUCO mover',
    'Ohio mover certificate',
  ]) {
    const parsed = interpretMoveAskQuery(q);
    assert.equal(parsed.query.mode, 'fail_closed', q);
    assert.match(parsed.query.failReason ?? '', /PUCO|OPEN_SEARCH_ONLY|search-only is not zero/i, q);
    assert.doesNotMatch(parsed.query.failReason ?? '', /Utility Code|NCUC C-number|HICPA|Maximum Rate Tariff/i, q);
  }
});

test('rates, insurance, complaints, and ranking stay separate', () => {
  const rates = interpretMoveAskQuery('how much can a mover charge in Ohio?');
  assert.match(rates.query.failReason ?? '', /own tariff|not a quote|Maximum Rate Tariff/i);
  const insurance = interpretMoveAskQuery('is this Ohio mover insured?');
  assert.match(insurance.query.failReason ?? '', /Form E|Form H|not acquired|not actual current/i);
  const complaints = interpretMoveAskQuery('complaints against movers Ohio');
  assert.equal(complaints.query.coverageState, 'NOT_ACQUIRED');
  assert.match(complaints.query.failReason ?? '', /not zero|intake|not a census/i);
  const best = interpretMoveAskQuery('best mover Ohio');
  assert.equal(best.query.mode, 'fail_closed');
  assert.match(best.query.failReason ?? '', /does not rank|PUCO/i);
});

test('Columbus and Cleveland do not create local routes', () => {
  const clt = interpretMoveAskQuery('movers Columbus');
  assert.equal(clt.query.mode, 'fail_closed');
  assert.match(clt.query.failReason ?? '', /Columbus|statewide|Ohio|PUCO/i);
});

test('USDOT and MC stay federal', () => {
  const usdot = interpretMoveAskQuery('USDOT 1234567');
  assert.equal(usdot.query.mode, 'identifier');
  assert.equal(usdot.query.identifier?.type, 'usdot');
  const mixed = interpretMoveAskQuery('USDOT 3244649 Ohio mover');
  assert.notEqual(mixed.query.mode, 'count');
  assert.notEqual(mixed.query.mode, 'fail_closed');
});

test('interstate mover in Ohio uses federal headquarters path', () => {
  const parsed = interpretMoveAskQuery('interstate mover Ohio');
  assert.notEqual(parsed.query.mode, 'fail_closed');
  assert.equal(parsed.query.mode, 'entity');
  assert.equal(parsed.query.jurisdiction?.state, 'OH');
});
