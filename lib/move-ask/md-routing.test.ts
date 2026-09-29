import assert from 'node:assert/strict';
import test from 'node:test';
import { planMoveRequest } from './plan';
import { normalizedPublishedStatePath } from '../seo/published-state-path';
import { MARYLAND_MOVE_SNAPSHOT as s } from '../maryland-intelligence/snapshot';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('Maryland public query is verification only; missing is not zero', () => {
  assert.equal(s.rosterCoverage, 'VERIFICATION_ONLY');
  assert.equal(s.rows, null);
  assert.equal(s.distinctRegistrations, null);
  assert.equal(s.exactFederalBridges, null);
  assert.equal(s.providerEnforcementRows, null);
  assert.equal(s.newCanonicalOrganizations, 0);
  assert.equal(s.graphWrites, 0);
  assert.equal(s.claimEligibilityChanges, 0);
});

test('Maryland routing, federal precedence, numbers and ranking refusal', () => {
  for (const q of ['mover Maryland', 'moving company Maryland', 'household goods mover Maryland', 'Maryland household goods registration', 'registered mover Maryland', 'Maryland mover license', 'Maryland Labor mover']) assert.match(plan(q).failReason ?? '', /live public query/);
  for (const city of ['Baltimore', 'Annapolis', 'Frederick', 'Rockville']) assert.match(plan(`mover ${city}`).failReason ?? '', /geography only/);
  for (const q of ['USDOT 123456 Maryland', 'MC 123456 Maryland']) assert.equal(plan(q).mode, 'identifier');
  assert.match(plan('mover 123456 Maryland').failReason ?? '', /number has no label/);
  assert.match(plan('mover complaint Maryland').failReason ?? '', /not a finding/);
  for (const word of ['best', 'safest', 'recommended', 'most trustworthy', 'top-rated', 'highest-rated', '#1', 'Trust Score', 'AggregateRating', 'ratingValue', 'paid ranking', 'sponsored ranking']) assert.match(plan(`${word} mover Maryland`).failReason ?? '', /does not rank or recommend movers/);
  assert.equal(normalizedPublishedStatePath('/Maryland'), '/maryland');
  assert.equal(normalizedPublishedStatePath('/maryland/baltimore'), null);
});

test('prior-state routing remains intact', () => {
  assert.match(plan('movers Connecticut').failReason ?? '', /CTDOT/);
  assert.match(plan('movers Michigan').failReason ?? '', /CVED/);
});
