import { STATEWIDE_ROUTES } from '@/lib/seo/statewide-routes';
import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { planMoveRequest } from './plan';
import { normalizedPublishedStatePath } from '../seo/published-state-path';
import { lookupNeHhgLicense, NEBRASKA_MOVE_SNAPSHOT as s } from '../nebraska-intelligence/snapshot';
import accepted from '../nebraska-intelligence/accepted-snapshot.json';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('Nebraska household-goods licenses stay a 42-row PSC table', () => {
  assert.equal(s.listingRows, 42);
  assert.equal(s.distinctLicenses, 42);
  assert.equal(s.feeIsAuthority, false);
  assert.equal(s.expirationColumn, 'NOT_PRINTED');
  assert.equal(s.providerInsuranceStatus, 'NOT_ACQUIRED');
  assert.equal(s.tariffCorpus, 'NOT_ACQUIRED');
  assert.equal(s.usdotBridges, null);
  assert.equal(s.fmcsaIsStateAuthority, false);
  assert.equal(s.graphWrites, 0);
  assert.equal(s.singlePublishedOrder.joinedToLicenseeRow, false);
  assert.equal(lookupNeHhgLicense('ML-01')?.name, 'NCM Transportat Co. Inc');
  assert.equal(lookupNeHhgLicense('ML-78')?.location, 'Fremont');
  assert.equal(lookupNeHhgLicense('ML-99'), null);
  assert.equal(accepted.householdGoodsAuthority.application, 'NOT_AN_ISSUED_LICENSE');
  assert.equal(accepted.federalBridges.exactBridges, null);
  assert.equal(accepted.enforcement.nameOnlyJoins, 0);
  assert.equal(accepted.sources.pageSha256, s.pageSha256);
});

test('Nebraska page cites the PSC table and does not invent compliance', () => {
  const page = readFileSync('app/(move)/nebraska/page.tsx', 'utf8');
  assert.match(page, /42 household-goods mover licenses/);
  assert.match(page, /NOT_ACQUIRED/);
  assert.match(page, /not current operating authority/);
  assert.match(page, /does not print an expiration date/);
  assert.doesNotMatch(page, /AggregateRating|ratingValue|Trust Score/);
  assert.doesNotMatch(page, /omaha\/|lincoln\//i);
  assert.equal(accepted.publication.canonical, 'https://www.movetrusthub.com/nebraska');
  assert.equal(accepted.publication.robots, 'index,follow');
});

test('Nebraska Move routing keeps grains apart and leaves other states alone', () => {
  assert.match(plan('mover Nebraska').failReason ?? '', /42 distinct/);
  assert.match(plan('household goods mover in ne').failReason ?? '', /Nebraska Public Service Commission/);
  assert.match(plan('Nebraska license ML-14').failReason ?? '', /ML-14/);
  assert.match(plan('Nebraska household goods insurance').failReason ?? '', /NOT_ACQUIRED/);
  assert.match(plan('Nebraska mover rates').failReason ?? '', /NOT_ACQUIRED/);
  assert.match(plan('best mover Nebraska').failReason ?? '', /does not rank or recommend movers/);
  assert.match(plan('mover Omaha Nebraska').failReason ?? '', /geography only/);
  assert.doesNotMatch(plan('mover Omaha').failReason ?? '', /Nebraska Public Service Commission/);
  assert.doesNotMatch(plan('mover Lincoln').failReason ?? '', /Nebraska Public Service Commission/);
  assert.doesNotMatch(plan('mover in Nevada').failReason ?? '', /Nebraska Public Service Commission/);
  assert.doesNotMatch(plan('mover Utah').failReason ?? '', /Nebraska Public Service Commission/);
  assert.doesNotMatch(plan('mover Iowa').failReason ?? '', /Nebraska Public Service Commission/);
  assert.doesNotMatch(plan('mover Kansas').failReason ?? '', /Nebraska Public Service Commission/);
  assert.doesNotMatch(plan('mover Arkansas').failReason ?? '', /Nebraska Public Service Commission/);
  assert.equal(STATEWIDE_ROUTES.filter((path) => path === '/nebraska').length, 1);
  assert.equal(normalizedPublishedStatePath('/Nebraska'), '/nebraska');
  assert.equal(normalizedPublishedStatePath('/nebraska/omaha'), null);
  assert.equal(existsSync('app/(move)/nebraska/omaha'), false);
  assert.equal(existsSync('app/(move)/nebraska/lincoln'), false);
});
