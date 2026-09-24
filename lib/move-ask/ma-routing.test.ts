import assert from 'node:assert/strict';
import test from 'node:test';
import { planMoveRequest } from './plan';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('Massachusetts household-goods questions stay on the DPU grain', () => {
  for (const q of ['movers Massachusetts', 'licensed movers Massachusetts', 'Massachusetts DPU mover', 'Massachusetts moving companies']) {
    const query = plan(q);
    assert.equal(query.mode, 'fail_closed', q);
    assert.match(query.failReason ?? '', /308 distinct certificate numbers on 309 company rows/, q);
    assert.match(query.failReason ?? '', /not FMCSA interstate authority/, q);
    assert.match(query.failReason ?? '', /no USDOT or MC/, q);
    assert.ok(query.alternatives?.includes('Open Massachusetts household-goods research.'), q);
  }
});

test('DPU certificate lookup is exact and is not a USDOT or MC number', () => {
  for (const [q, name] of [
    ['moving company by DPU certificate 32011', '21ST CENTURY MOVING AND STORAGE INC'],
    ['DPU certificate 24HG59', '5 SONS MOVING LLC'],
    ['Massachusetts certificate 24hg24b', 'RACE STREET PROPERTIES LLC'],
  ] as const) {
    const query = plan(q);
    assert.equal(query.mode, 'fail_closed', q);
    assert.match(query.failReason ?? '', new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), q);
    assert.match(query.failReason ?? '', /not a USDOT or MC number/, q);
  }
  const missing = plan('Massachusetts DPU certificate 99999');
  assert.match(missing.failReason ?? '', /No match on the accepted June 16, 2026 DPU list snapshot/);
  assert.match(missing.failReason ?? '', /not proof the company lacks FMCSA interstate authority/);
});

test('Massachusetts tariff is a filed rate, never a quote', () => {
  const query = plan('Massachusetts moving tariff');
  assert.equal(query.mode, 'fail_closed');
  assert.match(query.failReason ?? '', /may not charge more or less than the rates on file/);
  assert.match(query.failReason ?? '', /not a quote/);
  assert.match(query.failReason ?? '', /300 posted tariffs and shows 9 as pending/);
  assert.doesNotMatch(query.failReason ?? '', /\$\d/);
});

test('Interstate Massachusetts questions stay federal', () => {
  for (const q of ['interstate mover Massachusetts', 'Show current interstate household-goods carriers headquartered in Massachusetts.']) {
    const query = plan(q);
    assert.equal(query.mode, 'entity', q);
    assert.equal(query.jurisdiction?.state, 'MA', q);
    assert.equal(query.role, 'carrier', q);
    assert.doesNotMatch(query.failReason ?? '', /DPU/, q);
  }
  assert.equal(plan('moving from Massachusetts to Florida').journey?.task, 'MOVE_JOURNEY');
});

test('Boston is geography only, never a company name or an intelligence page', () => {
  for (const q of ['Boston mover', 'Boston movers', 'best movers Boston']) {
    const query = plan(q);
    assert.equal(query.mode, 'fail_closed', q);
    assert.match(query.failReason ?? '', /no Boston intelligence page/, q);
    assert.equal(query.nameQuery, undefined, q);
  }
  assert.equal(plan('movers in Boston MA').journey?.task, 'UNSUPPORTED_LOCALITY');
});

test('Company names stay federal; DPU name matches are never joined', () => {
  for (const q of ['Gentle Giant Moving', '617 Boston Movers']) {
    const query = plan(q);
    assert.equal(query.mode, 'entity', q);
    assert.ok(query.nameQuery, q);
  }
  const dpu = plan('Massachusetts DPU Gentle Giant');
  assert.equal(dpu.mode, 'fail_closed');
  assert.match(dpu.failReason ?? '', /GENTLE GIANT MOVING CO\., INC\., certificate 25908/);
  assert.match(dpu.failReason ?? '', /not linked to any USDOT or MC identity by name/);
});

test('Massachusetts complaints and rankings fail closed honestly', () => {
  const complaints = plan('Massachusetts mover complaints');
  assert.equal(complaints.coverageState, 'NOT_ACQUIRED');
  assert.match(complaints.failReason ?? '', /not zero complaints/);
  const ranking = plan('best movers in Massachusetts');
  assert.equal(ranking.mode, 'fail_closed');
  assert.match(ranking.failReason ?? '', /does not rank movers/);
});

test('Federal identifiers and other states are not captured by the DPU layer', () => {
  assert.equal(plan('USDOT 3244649 Massachusetts').mode, 'identifier');
  assert.doesNotMatch(plan('Georgia moving company').failReason ?? '', /DPU/);
  assert.match(plan('Ohio movers').failReason ?? '', /PUCO/);
  assert.match(plan('Oregon certificate 12345').failReason ?? '', /ODOT|Oregon/);
});
