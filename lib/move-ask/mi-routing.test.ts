import assert from 'node:assert/strict';
import test from 'node:test';
import { planMoveRequest } from './plan';
import { MICHIGAN_MOVE_SNAPSHOT as s } from '../michigan-intelligence/snapshot';
import { normalizedPublishedStatePath } from '../seo/published-state-path';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('Michigan CVED public roster keeps source grain and exact bridges', () => {
  assert.equal(s.activeHhgAuthorityRows, 199);
  assert.equal(s.distinctCvedNumbers, 199);
  assert.equal(s.printedUsdotBridges, 188);
  assert.equal(s.distinctPrintedUsdot, 187);
  assert.equal(s.printedFederalMotorCarrierBridges, 99);
  assert.equal(s.sourceAsOf, null);
  assert.equal(s.graphWrites, 0);
  assert.equal(s.newCanonicalOrganizations, 0);
  assert.equal(s.providerComplaintRows, null);
  assert.equal(s.tariffDocuments, null);
});

test('Michigan routing separates CVED, federal identifiers, city context and evidence', () => {
  for (const q of ['Michigan mover', 'moving company Michigan', 'household goods mover Michigan', 'Michigan CVED authority', 'MSP carrier authority', 'Michigan mover permit']) {
    assert.match(plan(q).failReason ?? '', /199 Active Household Goods rows/, q);
  }
  for (const city of ['Detroit', 'Grand Rapids', 'Lansing', 'Ann Arbor']) {
    assert.match(plan(`moving company ${city}`).failReason ?? '', /geography only/, city);
  }
  assert.match(plan('CVED 1106').failReason ?? '', /USDOT # 153343.*federal motor carrier # 41608/);
  assert.equal(plan('USDOT 153343 Michigan').mode, 'identifier');
  assert.equal(plan('MC 41608 Michigan').mode, 'identifier');
  assert.match(plan('Michigan mover tariff').failReason ?? '', /continuous contract/);
  assert.match(plan('Michigan mover insurance').failReason ?? '', /Form H/);
  assert.match(plan('Michigan mover complaints').failReason ?? '', /A complaint is not a finding/);
  assert.match(plan('best movers Michigan').failReason ?? '', /does not rank movers/);
  assert.match(plan('Michigan mover 123456').failReason ?? '', /number has no label/);
});

test('Michigan canonical route has no city child and prior states keep their own routing', () => {
  assert.equal(normalizedPublishedStatePath('/Michigan'), '/michigan');
  assert.equal(normalizedPublishedStatePath('/MICHIGAN'), '/michigan');
  assert.equal(normalizedPublishedStatePath('/Michigan/detroit'), null);
  assert.match(plan('movers Minnesota').failReason ?? '', /MnDOT/);
  assert.match(plan('movers Nevada').failReason ?? '', /Nevada Transportation Authority/);
  assert.match(plan('movers Tennessee').failReason ?? '', /Tennessee Intrastate Authority/);
});
