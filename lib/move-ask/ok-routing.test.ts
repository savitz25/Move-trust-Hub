import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { planMoveRequest } from './plan';
import { normalizedPublishedStatePath } from '../seo/published-state-path';
import { OKLAHOMA_MOVE_SNAPSHOT as s, lookupOkHhgPin } from '../oklahoma-intelligence/snapshot';
import accepted from '../oklahoma-intelligence/accepted-snapshot.json';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('Oklahoma certificate grains stay separate from the stale posted list', () => {
  assert.equal(s.hhgAuthorityVerification, 'KNOWN');
  assert.equal(s.currentRoster, 'NOT_ACQUIRED');
  assert.equal(s.postedListIsCurrentCensus, false);
  assert.equal(s.postedListRows, 64);
  assert.equal(s.distinctPins, 64);
  assert.equal(s.rowsWithPrintedUsdot, 64);
  assert.equal(s.distinctPrintedUsdots, 64);
  assert.equal(s.rowsWithPrintedMc, null);
  assert.equal(s.exactFederalBridges, null);
  assert.equal(s.identificationStampUsd, 7);
  assert.equal(s.insuranceDollarMinima, 'NOT_ACQUIRED');
  assert.equal(s.providerInsuranceStatus, 'NOT_ACQUIRED');
  assert.equal(s.newCanonicalOrganizations, 0);
  assert.equal(s.graphWrites, 0);
  assert.equal(s.claimEligibilityChanges, 0);
  assert.equal(accepted.householdGoodsAuthority.currentRoster, 'NOT_ACQUIRED');
  assert.equal(accepted.householdGoodsAuthority.postedListIsCurrentCensus, false);
  assert.equal(accepted.householdGoodsAuthority.application, 'MCF 1 is an application, not an issued certificate');
  assert.equal(accepted.federalBridges.exactBridges, null);
  assert.equal(accepted.enforcement.nameOnlyJoins, 0);
  assert.equal(accepted.sources.listSha256, s.listSha256);
  assert.equal(lookupOkHhgPin('140137')?.legalName, 'A VAN&STORAGE OF LAWTON INC');
  assert.equal(lookupOkHhgPin('000000'), null);
});

test('Oklahoma page publishes the dated list without calling it current', () => {
  const page = readFileSync('app/(move)/oklahoma/page.tsx', 'utf8');
  assert.match(page, /Household Goods Certificate/);
  assert.match(page, /not a current census/);
  assert.match(page, /NOT_ACQUIRED/);
  assert.match(page, /identification stamp/);
  assert.match(page, /not an issued certificate/);
  assert.doesNotMatch(page, /AggregateRating|ratingValue|Trust Score|\.insert\(|\.upsert\(/);
  assert.doesNotMatch(page, /64 current|64 certificated movers|0 certificates/);
  assert.equal(accepted.publication.canonical, 'https://www.movetrusthub.com/oklahoma');
  assert.equal(accepted.publication.robots, 'index,follow');
  assert.equal(accepted.sources.listDated, '2023-11-27');
  assert.notEqual(accepted.retrievedAt, accepted.sources.listDated);
});

test('Oklahoma Move routing reads a PIN and refuses a current census', () => {
  for (const q of [
    'mover Oklahoma', 'moving company Oklahoma', 'household goods mover Oklahoma',
    'Oklahoma household goods certificate', 'mover in ok',
  ]) assert.match(plan(q).failReason ?? '', /Oklahoma Corporation Commission/, q);
  assert.match(plan('Oklahoma PIN 140137').failReason ?? '', /A VAN&STORAGE OF LAWTON INC/);
  assert.match(plan('Oklahoma PIN 140137').failReason ?? '', /not a current census/);
  assert.match(plan('Oklahoma PIN 140137').failReason ?? '', /1824927/);
  assert.match(plan('Oklahoma PIN 999999').failReason ?? '', /absent from the OCC list dated November 27, 2023/);
  for (const city of ['Tulsa', 'Norman', 'Lawton']) {
    assert.match(plan(`mover ${city}`).failReason ?? '', /geography only/, city);
  }
  assert.match(plan('mover Oklahoma City').failReason ?? '', /geography only/);
  assert.doesNotMatch(plan('mover Jackson').failReason ?? '', /Oklahoma Corporation Commission/);
  assert.equal(plan('USDOT 1824927 Oklahoma').mode, 'identifier');
  assert.match(plan('mover 123456 Oklahoma').failReason ?? '', /number has no label/);
  assert.match(plan('mover complaints Oklahoma').failReason ?? '', /complaint is not a finding/);
  assert.match(plan('Oklahoma cargo insurance').failReason ?? '', /NOT_ACQUIRED/);
  assert.match(plan('Oklahoma passenger authority').failReason ?? '', /Passenger authority is separate/);
});

test('Oklahoma rankings fail closed, with no city publication', () => {
  for (const word of ['best', 'safest', 'recommended', 'most trustworthy', 'most trusted', 'top-rated', 'highest-rated', '#1', 'number one', 'Trust Score', 'AggregateRating', 'ratingValue']) {
    assert.match(plan(`${word} mover Oklahoma`).failReason ?? '', /does not rank or recommend movers/, word);
  }
  assert.equal(normalizedPublishedStatePath('/Oklahoma'), '/oklahoma');
  assert.equal(normalizedPublishedStatePath('/oklahoma/tulsa'), null);
  for (const city of ['tulsa', 'oklahoma-city', 'norman']) assert.equal(existsSync(`app/(move)/oklahoma/${city}`), false);
  assert.equal((readFileSync('app/sitemap.ts', 'utf8').match(/'\/oklahoma'/g) ?? []).length, 2);
});

test('Oklahoma routing does not capture Arkansas, Missouri, Utah, or Mississippi', () => {
  assert.doesNotMatch(plan('mover Arkansas').failReason ?? '', /Oklahoma Corporation Commission/);
  assert.doesNotMatch(plan('mover Missouri').failReason ?? '', /Oklahoma Corporation Commission/);
  assert.doesNotMatch(plan('mover Utah').failReason ?? '', /Oklahoma Corporation Commission/);
  assert.match(plan('mover in ms').failReason ?? '', /Mississippi Department of Transportation/);
  assert.match(plan('mover in sc').failReason ?? '', /South Carolina/);
});
