import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { planMoveRequest } from './plan';
import { normalizedPublishedStatePath } from '../seo/published-state-path';
import { WISCONSIN_MOVE_SNAPSHOT as s } from '../wisconsin-intelligence/snapshot';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('Wisconsin LC and HHG grains remain distinct and missing stays unknown', () => {
  assert.equal(s.lcAuthorityVerification, 'KNOWN');
  assert.equal(s.lcRoster, 'NOT_ACQUIRED');
  assert.equal(s.householdGoodsRoster, 'NOT_ACQUIRED');
  assert.equal(s.lcRows, null);
  assert.equal(s.householdGoodsRows, null);
  assert.equal(s.exactFederalBridges, null);
  assert.equal(s.newCanonicalOrganizations, 0);
  assert.equal(s.graphWrites, 0);
  assert.equal(s.claimEligibilityChanges, 0);
  const page = readFileSync('app/(move)/wisconsin/page.tsx', 'utf8');
  assert.match(page, /LC covers more commodities than household goods/);
  assert.match(page, /Form E/);
  assert.doesNotMatch(page, /AggregateRating|ratingValue|Trust Score/);
});

test('Wisconsin routing, identifiers, bare numbers and ranking refusal', () => {
  for (const q of ['mover Wisconsin', 'moving company Wisconsin', 'household goods mover Wisconsin', 'Wisconsin mover authority', 'Wisconsin LC authority', 'local cartage Wisconsin', 'Wisconsin motor carrier authority']) assert.match(plan(q).failReason ?? '', /LC/);
  for (const city of ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha']) assert.match(plan(`mover ${city}`).failReason ?? '', /geography only/);
  for (const q of ['USDOT 123456 Wisconsin insurance', 'MC 123456 Wisconsin lender']) assert.equal(plan(q).mode, 'identifier');
  assert.match(plan('mover 123456 Wisconsin').failReason ?? '', /number has no label/);
  assert.match(plan('moving complaints Wisconsin').failReason ?? '', /complaint is not a finding/);
  assert.match(plan('mover enforcement Wisconsin').failReason ?? '', /enforcement corpus/);
  for (const word of ['best', 'safest', 'recommended', 'most trustworthy', 'top-rated', 'highest-rated', '#1', 'Trust Score', 'AggregateRating', 'ratingValue', 'paid ranking', 'sponsored ranking']) assert.match(plan(`${word} mover Wisconsin`).failReason ?? '', /does not rank or recommend movers/);
  assert.equal(normalizedPublishedStatePath('/Wisconsin'), '/wisconsin');
  assert.equal(normalizedPublishedStatePath('/wisconsin/milwaukee'), null);
});

test('Maryland, Connecticut and Michigan behavior remains intact', () => {
  assert.match(plan('mover Maryland').failReason ?? '', /Maryland Labor/);
  assert.match(plan('movers Connecticut').failReason ?? '', /CTDOT/);
  assert.match(plan('movers Michigan').failReason ?? '', /CVED/);
  assert.equal(plan('USDOT 123456 Michigan insurance').mode, 'identifier');
});
