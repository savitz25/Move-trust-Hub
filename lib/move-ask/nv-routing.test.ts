import assert from 'node:assert/strict';
import test from 'node:test';
import { planMoveRequest } from './plan';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('Nevada household-goods questions answer from NTA certificates, never a combined count', () => {
  for (const q of [
    'movers Nevada',
    'licensed movers Nevada',
    'household goods movers Nevada',
    'Nevada CPCN mover',
    'intrastate mover Nevada',
  ]) {
    const query = plan(q);
    assert.equal(query.mode, 'fail_closed', q);
    assert.match(query.failReason ?? '', /Certificate of Public Convenience and Necessity \(CPCN\) from the Nevada Transportation Authority/, q);
    assert.match(query.failReason ?? '', /41 certificates on its Active Mover list/, q);
    assert.match(query.failReason ?? '', /not a USDOT or MC number/, q);
    assert.match(query.failReason ?? '', /no combined Nevada mover count/, q);
    assert.ok(query.alternatives?.includes('Open Nevada household-goods research.'), q);
  }
});

test('Nevada cities are geography only', () => {
  for (const [q, city] of [
    ['movers Las Vegas', 'Las Vegas'],
    ['movers Reno', 'Reno'],
    ['movers Henderson', 'Henderson'],
    ['movers Carson City', 'Carson City'],
  ] as const) {
    const query = plan(q);
    assert.match(query.failReason ?? '', new RegExp(`${city} is geography only; MoveTrustHub has no city intelligence page`), q);
    assert.doesNotMatch(query.failReason ?? '', /\bis a company\b/, q);
  }
});

test('tariffs, applications and complaints keep their own meaning', () => {
  for (const q of ['Nevada moving tariff', 'mover rates Nevada', 'moving estimate Nevada', 'household goods tariff Nevada']) {
    const query = plan(q);
    assert.equal(query.mode, 'fail_closed', q);
    assert.match(query.failReason ?? '', /A tariff is not a quote/, q);
    assert.match(query.failReason ?? '', /no statewide Nevada moving price/, q);
  }
  for (const q of ['moving complaint Nevada', 'NTA mover complaint']) {
    const query = plan(q);
    assert.equal(query.coverageState, 'NOT_ACQUIRED', q);
    assert.match(query.failReason ?? '', /does not have jurisdiction over interstate service/, q);
    assert.match(query.failReason ?? '', /A complaint is not a finding/, q);
  }
  assert.match(plan('Nevada mover applications').failReason ?? '', /An application is not a granted CPCN/);
  assert.match(plan('best movers Nevada').failReason ?? '', /does not rank movers/);
});

test('exact CPCN lookup, and federal intent stays federal', () => {
  assert.match(plan('Nevada CPCN 3251.3').failReason ?? '', /Ace World Wide Moving and Storage Co Inc/);
  assert.match(plan('CPCN 3380').failReason ?? '', /Forward Moving, LLC.*CPCN 3380\.1/);
  assert.match(plan('Nevada CPCN 3394').failReason ?? '', /directory: Temporary Discontinuance/);
  assert.match(plan('Nevada CPCN 7304').failReason ?? '', /may belong to another NTA class/);
  for (const q of ['USDOT 3244649', 'MC 123456', 'USDOT 3244649 Nevada', 'MC 123456 Nevada']) assert.equal(plan(q).mode, 'identifier', q);
  assert.doesNotMatch(plan('interstate mover Nevada').failReason ?? '', /Nevada Transportation Authority/);
  assert.doesNotMatch(plan('Nevada to California mover').failReason ?? '', /Active Mover list/);
  assert.doesNotMatch(plan('How many carriers headquartered in Nevada').failReason ?? '', /Active Mover list/);
});

test('other states are not captured by the Nevada layer', () => {
  assert.match(plan('movers Massachusetts').failReason ?? '', /Massachusetts DPU/);
  assert.match(plan('movers Tennessee').failReason ?? '', /Tennessee Intrastate Authority/);
  assert.doesNotMatch(plan('movers Georgia').failReason ?? '', /Nevada/);
});
