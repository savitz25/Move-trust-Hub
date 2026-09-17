import assert from 'node:assert/strict';
import test from 'node:test';
import { interpretMoveAskQuery } from './interpret';

test('North Carolina C-number outranks geography', () => {
  const parsed = interpretMoveAskQuery('NCUC C-2655');
  assert.equal(parsed.query.mode, 'fail_closed');
  assert.match(parsed.query.failReason ?? '', /C-2655/);
  assert.match(parsed.query.failReason ?? '', /not a USDOT|not an MC/i);
  assert.doesNotMatch(parsed.query.failReason ?? '', /Utility Code|PA PUC|ODOT|HICPA/i);
});

test('North Carolina T-number is not a C-number', () => {
  const parsed = interpretMoveAskQuery('NCUC T-4664');
  assert.equal(parsed.query.mode, 'fail_closed');
  assert.match(parsed.query.failReason ?? '', /T-4664/);
  assert.match(parsed.query.failReason ?? '', /C-2655|company\/docket|docket/i);
});

test('North Carolina household-goods questions stay on NCUC grain', () => {
  for (const q of [
    'movers North Carolina',
    'moving companies North Carolina',
    'licensed movers North Carolina',
    'certified movers North Carolina',
    'NCUC mover',
    'North Carolina mover certificate',
  ]) {
    const parsed = interpretMoveAskQuery(q);
    assert.equal(parsed.query.mode, 'fail_closed', q);
    assert.match(parsed.query.failReason ?? '', /NCUC|C-number|Certificate of Exemption/i, q);
    assert.doesNotMatch(parsed.query.failReason ?? '', /Utility Code|PA PUC|HICPA/i, q);
  }
});

test('rates, insurance, complaints, and ranking stay separate', () => {
  const rates = interpretMoveAskQuery('how much can a mover charge in North Carolina?');
  assert.match(rates.query.failReason ?? '', /Maximum Rate Tariff|not a quote/i);
  const insurance = interpretMoveAskQuery('is this North Carolina mover insured?');
  assert.match(insurance.query.failReason ?? '', /requires|not acquired|not current/i);
  const complaints = interpretMoveAskQuery('complaints against movers North Carolina');
  assert.equal(complaints.query.coverageState, 'NOT_ACQUIRED');
  assert.match(complaints.query.failReason ?? '', /not zero|intake|not a census/i);
  const best = interpretMoveAskQuery('best mover North Carolina');
  assert.equal(best.query.mode, 'fail_closed');
  assert.match(best.query.failReason ?? '', /does not rank|C-number|NCUC/i);
});

test('Charlotte and Raleigh do not create local routes', () => {
  const clt = interpretMoveAskQuery('movers Charlotte');
  assert.equal(clt.query.mode, 'fail_closed');
  assert.match(clt.query.failReason ?? '', /Charlotte|statewide|North Carolina/i);
});

test('USDOT and MC stay federal', () => {
  const usdot = interpretMoveAskQuery('USDOT 1234567');
  assert.equal(usdot.query.mode, 'identifier');
  assert.equal(usdot.query.identifier?.type, 'usdot');
  const mixed = interpretMoveAskQuery('USDOT 3244649 North Carolina mover');
  assert.notEqual(mixed.query.mode, 'count');
});

test('interstate mover in North Carolina uses federal headquarters path', () => {
  const parsed = interpretMoveAskQuery('interstate mover North Carolina');
  assert.notEqual(parsed.query.mode, 'fail_closed');
  assert.equal(parsed.query.mode, 'entity');
  assert.equal(parsed.query.jurisdiction?.state, 'NC');
});
