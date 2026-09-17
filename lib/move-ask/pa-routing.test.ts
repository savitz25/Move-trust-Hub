import assert from 'node:assert/strict';
import test from 'node:test';
import { interpretMoveAskQuery } from './interpret';

test('Pennsylvania PUC identity outranks geography', () => {
  const parsed = interpretMoveAskQuery('PA PUC 8919518');
  assert.equal(parsed.query.mode, 'fail_closed');
  assert.match(parsed.query.failReason ?? '', /8919518/);
  assert.match(parsed.query.failReason ?? '', /not a USDOT|not an MC/i);
  assert.doesNotMatch(parsed.query.failReason ?? '', /Florida IM|FDACS|ODOT/i);
});

test('Pennsylvania household-goods questions stay on PUC grain', () => {
  for (const q of [
    'movers in Pennsylvania',
    'household goods movers Pennsylvania',
    'licensed movers Pennsylvania',
    'PUC mover Pennsylvania',
    'Pennsylvania PUC moving company',
  ]) {
    const parsed = interpretMoveAskQuery(q);
    assert.equal(parsed.query.mode, 'fail_closed', q);
    assert.match(parsed.query.failReason ?? '', /PUC|Utility Code|Household Goods/i, q);
    assert.doesNotMatch(parsed.query.failReason ?? '', /Florida IM|FDACS|ODOT CCD/i, q);
  }
});

test('brokers, insurance, complaints, and dockets stay separate', () => {
  const broker = interpretMoveAskQuery('household goods broker Pennsylvania');
  assert.equal(broker.query.mode, 'fail_closed');
  assert.match(broker.query.failReason ?? '', /OPEN_SEARCH_ONLY|not the active carrier/i);
  const insurance = interpretMoveAskQuery('moving company insurance Pennsylvania');
  assert.match(insurance.query.failReason ?? '', /Form E|Form H|not authority/i);
  const complaints = interpretMoveAskQuery('complaints against movers Pennsylvania');
  assert.equal(complaints.query.coverageState, 'NOT_ACQUIRED');
  assert.match(complaints.query.failReason ?? '', /not an adverse finding|not zero complaints/i);
  const docket = interpretMoveAskQuery('Pennsylvania mover docket');
  assert.match(docket.query.failReason ?? '', /docket/i);
});

test('Philadelphia and Pittsburgh do not create local routes', () => {
  const phl = interpretMoveAskQuery('movers Philadelphia');
  assert.equal(phl.query.mode, 'fail_closed');
  assert.match(phl.query.failReason ?? '', /Philadelphia|statewide/i);
  const best = interpretMoveAskQuery('best mover Pennsylvania');
  assert.equal(best.query.mode, 'fail_closed');
  assert.match(best.query.failReason ?? '', /does not rank|PUC|Utility Code/i);
});

test('USDOT and MC stay federal', () => {
  const usdot = interpretMoveAskQuery('USDOT 1234567');
  assert.equal(usdot.query.mode, 'identifier');
  assert.equal(usdot.query.identifier?.type, 'usdot');
  const mixed = interpretMoveAskQuery('USDOT 3244649 Pennsylvania mover');
  assert.notEqual(mixed.query.mode, 'count');
});

test('interstate mover in Pennsylvania uses federal headquarters path', () => {
  const parsed = interpretMoveAskQuery('interstate mover Pennsylvania');
  assert.notEqual(parsed.query.mode, 'fail_closed');
  assert.equal(parsed.query.mode, 'entity');
  assert.equal(parsed.query.jurisdiction?.state, 'PA');
});
