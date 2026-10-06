import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { planMoveRequest } from './plan';
import { normalizedPublishedStatePath } from '../seo/published-state-path';
import { WEST_VIRGINIA_MOVE_SNAPSHOT as s } from '../west-virginia-intelligence/snapshot';
import accepted from '../west-virginia-intelligence/accepted-snapshot.json';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('West Virginia reviewed sources are not a household-goods roster', () => {
  assert.equal(s.hhgRoster, 'NOT_ACQUIRED');
  assert.equal(s.authorityRows, null);
  assert.notEqual(s.authorityRows, 0);
  assert.equal(s.applicationIsAuthority, false);
  assert.equal(s.tariffIsCurrentAuthority, false);
  assert.equal(s.insuranceRequirementIsObservedCoverage, false);
  assert.equal(s.formEObservations, 'NOT_ACQUIRED');
  assert.equal(s.ucrIsHhgAuthority, false);
  assert.equal(s.fmcsaIsStateAuthority, false);
  assert.equal(s.usdotBridges, 'NOT_ACQUIRED');
  assert.equal(s.graphWrites, 0);
  assert.equal(s.newCanonicalOrganizations, 0);
  assert.equal(s.nameOnlyJoins, 0);
  assert.equal(accepted.householdGoodsAuthority.roster, 'NOT_ACQUIRED');
  assert.equal(accepted.householdGoodsAuthority.rows, null);
  assert.equal(accepted.householdGoodsAuthority.fmcsaInterstate, 'SEPARATE');
  assert.equal(accepted.householdGoodsAuthority.application, 'NOT_AUTHORITY');
  assert.equal(accepted.publication.canonical, 'https://www.movetrusthub.com/west-virginia');
  assert.equal(accepted.publication.robots, 'index,follow');
  assert.equal(accepted.publication.rankings, false);
  assert.equal(accepted.publication.trustScore, false);
  assert.equal(accepted.sources.pageClockIsRosterClock, false);
});

test('West Virginia page does not invent a mover count', () => {
  const page = readFileSync('app/(move)/west-virginia/page.tsx', 'utf8');
  const sitemap = readFileSync('app/sitemap.ts', 'utf8');
  assert.match(page, /NOT_ACQUIRED/);
  assert.match(page, /Missing is not zero/);
  assert.match(page, /does not publish a mover count/);
  assert.match(page, /An application is not issued authority/);
  assert.match(page, /A tariff is not current authority/);
  assert.match(page, /An insurance requirement is not observed coverage/);
  assert.match(page, /not household-goods authority/);
  assert.match(page, /geography only/);
  assert.doesNotMatch(page, /AggregateRating|ratingValue|Trust Score/);
  assert.doesNotMatch(page, /0 movers|0 companies|0 certificates|zero movers/i);
  assert.doesNotMatch(page, /\/west-virginia\/charleston/);
  assert.equal((sitemap.match(/'\/west-virginia'/g) || []).length, 2);
  assert.match(sitemap, /'\/kansas'/);
  assert.match(sitemap, /'\/idaho'/);
  assert.equal(existsSync('app/(move)/west-virginia/charleston'), false);
  assert.equal(normalizedPublishedStatePath('/West-Virginia'), '/west-virginia');
  assert.equal(normalizedPublishedStatePath('/west-virginia'), null);
  assert.equal(normalizedPublishedStatePath('/west-virginia/charleston'), null);
});

test('West Virginia routing matches the state name and "in wv" only', () => {
  for (const q of ['mover West Virginia', 'moving company West Virginia', 'household goods mover in wv', 'mover in WV']) {
    assert.match(plan(q).failReason ?? '', /Public Service Commission of West Virginia/, q);
    assert.match(plan(q).failReason ?? '', /NOT_ACQUIRED/, q);
    assert.match(plan(q).failReason ?? '', /Missing is not zero/, q);
    assert.doesNotMatch(plan(q).failReason ?? '', /Virginia mover/, q);
  }
  for (const q of ['wv', 'WV', 'mover wv', 'mover WV', 'best mover wv']) {
    assert.doesNotMatch(plan(q).failReason ?? '', /Public Service Commission of West Virginia/, q);
  }
  assert.match(plan('mover Charleston West Virginia').failReason ?? '', /geography only/);
  assert.match(plan('best mover in West Virginia').failReason ?? '', /does not rank/);
  assert.match(plan('tariff for a West Virginia mover').failReason ?? '', /not current authority/);
  assert.match(plan('Form E insurance for West Virginia movers').failReason ?? '', /not observed coverage/);
  assert.doesNotMatch(plan('how many movers in Virginia').failReason ?? '', /Public Service Commission of West Virginia/);
});
