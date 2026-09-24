import assert from 'node:assert/strict';
import test from 'node:test';
import { planMoveRequest } from './plan';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('Tennessee household-goods questions answer with the Intrastate Authority model, not a fake count', () => {
  for (const q of [
    'movers Tennessee',
    'licensed movers Tennessee',
    'Tennessee intrastate mover',
    'household goods mover Tennessee',
    'Tennessee mover authority',
    'Tennessee intrastate authority',
  ]) {
    const query = plan(q);
    assert.equal(query.mode, 'fail_closed', q);
    assert.equal(query.coverageState, 'NOT_ACQUIRED', q);
    assert.match(query.failReason ?? '', /Tennessee Intrastate Authority from the Tennessee Department of Revenue/, q);
    assert.match(query.failReason ?? '', /Form H cargo insurance/, q);
    assert.match(query.failReason ?? '', /no public Intrastate Authority roster or search/, q);
    assert.match(query.failReason ?? '', /not a USDOT or MC number/, q);
    assert.doesNotMatch(query.failReason ?? '', /\b\d{3,}\s+(movers|carriers|holders)\b/, q);
    assert.ok(query.alternatives?.includes('Open Tennessee household-goods research.'), q);
  }
});

test('Tennessee cities are geography only', () => {
  for (const [q, city] of [
    ['mover Nashville Tennessee', 'Nashville'],
    ['mover Memphis Tennessee', 'Memphis'],
    ['mover Knoxville Tennessee', 'Knoxville'],
    ['mover Chattanooga Tennessee', 'Chattanooga'],
  ] as const) {
    const query = plan(q);
    assert.match(query.failReason ?? '', new RegExp(`${city} is geography only; MoveTrustHub has no city intelligence page`), q);
  }
  const locality = plan('movers in Nashville TN');
  assert.match(locality.failReason ?? '', /requested locality is retained/);
});

test('interstate moves, headquarters questions and federal identifiers stay federal', () => {
  assert.equal(plan('interstate mover Tennessee').mode, 'entity');
  assert.doesNotMatch(plan('interstate mover Tennessee').failReason ?? '', /Intrastate Authority/);
  assert.equal(plan('moving from Tennessee to Florida').mode, 'definition');
  for (const q of ['USDOT 3244649', 'MC 123456', 'USDOT 3244649 Tennessee']) assert.equal(plan(q).mode, 'identifier', q);
  const hq = plan('How many carriers headquartered in Tennessee');
  assert.equal(hq.mode, 'count');
  assert.doesNotMatch(hq.failReason ?? '', /Intrastate Authority/);
});

test('rules, tariffs and complaints use the current text and never fake protections or counts', () => {
  for (const q of ['Tennessee moving tariff', 'Tennessee moving estimate rules']) {
    const query = plan(q);
    assert.equal(query.mode, 'fail_closed', q);
    assert.match(query.failReason ?? '', /effective 2026-03-09/, q);
    assert.match(query.failReason ?? '', /were repealed effective 2026-03-09; they are not current protections/, q);
    assert.match(query.failReason ?? '', /A tariff is not a quote/, q);
  }
  const complaints = plan('Tennessee mover complaints');
  assert.equal(complaints.coverageState, 'NOT_ACQUIRED');
  assert.match(complaints.failReason ?? '', /Division of Consumer Affairs/);
  assert.match(complaints.failReason ?? '', /a complaint is not a finding/);
  const best = plan('best movers Tennessee');
  assert.equal(best.mode, 'fail_closed');
  assert.match(best.failReason ?? '', /does not rank movers/);
});

test('other states and Massachusetts are not captured by the Tennessee layer', () => {
  assert.match(plan('movers Massachusetts').failReason ?? '', /Massachusetts DPU/);
  assert.doesNotMatch(plan('movers Georgia').failReason ?? '', /Tennessee/);
  assert.doesNotMatch(plan('movers in Nashville TN').failReason ?? '', /Intrastate Authority from the Tennessee/);
});
