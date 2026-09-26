import assert from 'node:assert/strict';
import test from 'node:test';
import { planMoveRequest } from './plan';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('Minnesota authority questions answer with the MnDOT permit model, never a fake count', () => {
  for (const q of [
    'movers Minnesota',
    'licensed movers Minnesota',
    'household goods movers Minnesota',
    'Minnesota mover permit',
    'MnDOT mover permit',
  ]) {
    const query = plan(q);
    assert.equal(query.mode, 'fail_closed', q);
    assert.equal(query.coverageState, 'NOT_ACQUIRED', q);
    assert.match(query.failReason ?? '', /Household Goods Mover Permit from MnDOT/, q);
    assert.match(query.failReason ?? '', /statewide operation/, q);
    assert.match(query.failReason ?? '', /missing is not zero/, q);
    assert.match(query.failReason ?? '', /not a USDOT or MC number/, q);
    assert.doesNotMatch(query.failReason ?? '', /\b\d{2,}\s+(movers|carriers|permits|permit holders)\b/, q);
  }
});

test('Minnesota cities are geography only', () => {
  for (const [q, city] of [
    ['movers Minneapolis', 'Minneapolis'],
    ['movers St Paul', 'St. Paul'],
    ['movers Rochester Minnesota', 'Rochester'],
    ['movers Duluth', 'Duluth'],
    ['movers Bloomington Minnesota', 'Bloomington'],
  ] as const) {
    assert.match(plan(q).failReason ?? '', new RegExp(`${city.replace('.', '\\.')} is geography only; MoveTrustHub has no city intelligence page`), q);
  }
  // City-to-city moves stay on the shared journey planner: intrastate when both ends are in Minnesota,
  // a clarification when the state is not given, and never an interstate claim.
  const intrastate = plan('mover Minneapolis MN to Duluth MN') as { journey?: { moveScope?: string; authorityGrain?: string } };
  assert.equal(intrastate.journey?.moveScope, 'intrastate');
  assert.equal(intrastate.journey?.authorityGrain, 'state_intrastate_research');
  const unlabeled = plan('mover Minneapolis to Duluth') as { journey?: { moveScope?: string } };
  assert.notEqual(unlabeled.journey?.moveScope, 'interstate');
  const cross = plan('mover Minnesota to Wisconsin') as { journey?: { moveScope?: string } };
  assert.equal(cross.journey?.moveScope, 'interstate');
});

test('rules answer from current Minnesota law', () => {
  assert.match(plan('Minnesota moving insurance requirements').failReason ?? '', /Form E.*Form H/);
  assert.match(plan('Minnesota moving insurance requirements').failReason ?? '', /\$100,000\/\$300,000/);
  for (const q of ['Minnesota mover rates', 'Minnesota moving estimate']) {
    const r = plan(q).failReason ?? '';
    assert.match(r, /A tariff is not a quote/, q);
    assert.match(r, /no statewide Minnesota moving price/, q);
  }
  assert.match(plan('Minnesota moving bill of lading').failReason ?? '', /at least three years/);
  const complaint = plan('Minnesota mover complaint');
  assert.equal(complaint.coverageState, 'NOT_ACQUIRED');
  assert.match(complaint.failReason ?? '', /A complaint is not a finding/);
  assert.match(plan('best movers Minnesota').failReason ?? '', /does not rank movers/);
});

test('identifiers: federal stays federal, MnDOT # verifies on MnDOT, bare numbers fail closed', () => {
  for (const q of ['USDOT 3244649', 'MC 123456', 'USDOT 3244649 Minnesota', 'MC 123456 Minnesota']) assert.equal(plan(q).mode, 'identifier', q);
  assert.match(plan('MnDOT 384567').failReason ?? '', /Verify it on MnDOT's Carrier Search/);
  assert.match(plan('Minnesota permit 384567').failReason ?? '', /MnDOT # 384567/);
  assert.match(plan('Minnesota mover 384567').failReason ?? '', /That number has no label/);
  assert.doesNotMatch(plan('interstate mover Minnesota').failReason ?? '', /Household Goods Mover Permit from MnDOT/);
  assert.doesNotMatch(plan('mover Minnesota to Wisconsin').failReason ?? '', /Household Goods Mover Permit from MnDOT/);
  assert.doesNotMatch(plan('How many carriers headquartered in Minnesota').failReason ?? '', /Household Goods Mover Permit/);
});

test('other states are not captured by the Minnesota layer', () => {
  assert.match(plan('movers Nevada').failReason ?? '', /Nevada Transportation Authority/);
  assert.match(plan('movers Tennessee').failReason ?? '', /Tennessee Intrastate Authority/);
  assert.match(plan('movers Massachusetts').failReason ?? '', /Massachusetts DPU/);
  assert.doesNotMatch(plan('movers Rochester New York').failReason ?? '', /MnDOT/);
  assert.doesNotMatch(plan('movers Georgia').failReason ?? '', /Minnesota/);
});
