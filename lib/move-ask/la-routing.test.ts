import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { planMoveRequest } from './plan';
import { normalizedPublishedStatePath } from '../seo/published-state-path';
import { LOUISIANA_MOVE_SNAPSHOT as s } from '../louisiana-intelligence/snapshot';
import accepted from '../louisiana-intelligence/accepted-snapshot.json';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('Louisiana authority grains remain separate and unavailable rows stay unknown', () => {
  assert.equal(s.hhgAuthorityVerification, 'KNOWN');
  assert.equal(s.hhgRoster, 'NOT_ACQUIRED');
  assert.equal(s.searchPortal, 'OPEN_SEARCH_ONLY');
  assert.equal(s.authorityRows, null);
  assert.equal(s.distinctCertificateNumbers, null);
  assert.equal(s.exactFederalBridges, null);
  assert.equal(s.cargoMinimumUsd, null);
  assert.equal(s.providerInsuranceStatus, 'NOT_ACQUIRED');
  assert.equal(s.writtenEstimateRight, 'KNOWN');
  assert.equal(s.writtenEstimateOrderDate, '2013-07-12');
  assert.equal(s.tariffCorpus, 'NOT_ACQUIRED');
  assert.equal(s.providerEnforcementRows, 'NOT_ACQUIRED');
  assert.equal(s.newCanonicalOrganizations, 0);
  assert.equal(s.graphWrites, 0);
  assert.equal(s.claimEligibilityChanges, 0);
  assert.equal(accepted.householdGoodsAuthority.certificate, 'Common carrier certificate for intrastate household goods');
  assert.equal(accepted.householdGoodsAuthority.searchPortal, 'OPEN_SEARCH_ONLY');
  assert.equal(accepted.insurance.cargoMinimumUsd, null);
  assert.equal(accepted.writtenEstimate.isCensus, false);
  assert.equal(accepted.writtenEstimate.generalOrderDate, '2013-07-12');
  assert.equal(accepted.federalBridges.exactBridges, null);
  assert.equal(accepted.statute, 'La. R.S. 45:164(E)');
});

test('Louisiana page publishes LPSC authority and separate source clocks without a fake count', () => {
  const page = readFileSync('app/(move)/louisiana/page.tsx', 'utf8');
  assert.match(page, /La\. R\.S\. 45:164/);
  assert.match(page, /July 12, 2013/);
  assert.match(page, /OPEN_SEARCH_ONLY/);
  assert.match(page, /NOT_ACQUIRED/);
  assert.match(page, /not a census/);
  assert.doesNotMatch(page, /\$5,000|\$350,000|AggregateRating|ratingValue|Trust Score|\.insert\(|\.upsert\(/);
  assert.equal(accepted.publication.canonical, 'https://www.movetrusthub.com/louisiana');
  assert.equal(accepted.publication.robots, 'index,follow');
  assert.equal(accepted.sourceAsOf, null);
  assert.equal(accepted.snapshotAsOf, null);
  assert.notEqual(accepted.retrievedAt, accepted.generatedAt);
  assert.notEqual(accepted.writtenEstimate.generalOrderDate, accepted.retrievedAt);
});

test('Louisiana Move routing, labeled federal IDs and bare-number safety', () => {
  for (const q of [
    'mover Louisiana', 'moving company Louisiana', 'household goods mover Louisiana',
    'Louisiana operating authority', 'Louisiana household goods authority',
    'LPSC mover', 'Louisiana certificate', 'household goods in la',
  ]) assert.match(plan(q).failReason ?? '', /Louisiana Public Service Commission/, q);
  for (const city of ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette']) {
    assert.match(plan(`mover ${city}`).failReason ?? '', /geography only/, city);
  }
  assert.doesNotMatch(plan('best la movers').failReason ?? '', /Louisiana Public Service Commission/);
  for (const q of ['USDOT 123456 Louisiana insurance', 'MC 123456 Louisiana']) assert.equal(plan(q).mode, 'identifier');
  assert.match(plan('mover 123456 Louisiana').failReason ?? '', /number has no label/);
  assert.match(plan('mover complaints Louisiana').failReason ?? '', /complaint is not a finding/);
  assert.match(plan('mover enforcement Louisiana').failReason ?? '', /enforcement corpus/);
  assert.match(plan('mover tariff Louisiana').failReason ?? '', /tariff corpus/);
  assert.match(plan('Louisiana cargo insurance').failReason ?? '', /NOT_ACQUIRED/);
  assert.match(plan('Louisiana written estimate').failReason ?? '', /July 12, 2013/);
});

test('Louisiana rankings fail closed, with no city or parish publication', () => {
  for (const word of ['best', 'safest', 'recommended', 'most trustworthy', 'most trusted', 'top-rated', 'highest-rated', '#1', 'number one', 'Trust Score', 'AggregateRating', 'ratingValue', 'paid ranking', 'sponsored ranking']) {
    assert.match(plan(`${word} mover Louisiana`).failReason ?? '', /does not rank or recommend movers/, word);
  }
  assert.equal(normalizedPublishedStatePath('/Louisiana'), '/louisiana');
  assert.equal(normalizedPublishedStatePath('/louisiana/new-orleans'), null);
  for (const city of ['new-orleans', 'baton-rouge', 'shreveport', 'lafayette', 'orleans']) {
    assert.equal(existsSync(`app/(move)/louisiana/${city}`), false);
  }
  assert.equal((readFileSync('app/sitemap.ts', 'utf8').match(/'\/louisiana'/g) ?? []).length, 2);
});

test('Louisiana routing does not capture Alabama or a labeled federal identifier', () => {
  assert.match(plan('mover Alabama').failReason ?? '', /Alabama Public Service Commission/);
  assert.equal(plan('USDOT 123456 Louisiana').mode, 'identifier');
});
