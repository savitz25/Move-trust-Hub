import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { planMoveRequest } from './plan';
import { normalizedPublishedStatePath } from '../seo/published-state-path';
import { ALABAMA_MOVE_SNAPSHOT as s } from '../alabama-intelligence/snapshot';
import accepted from '../alabama-intelligence/accepted-snapshot.json';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('Alabama authority grains remain separate and unavailable rows stay unknown', () => {
  assert.equal(s.hhgAuthorityVerification, 'KNOWN');
  assert.equal(s.hhgRoster, 'NOT_ACQUIRED');
  assert.equal(s.authorityRows, null);
  assert.equal(s.distinctCertificateNumbers, null);
  assert.equal(s.exactFederalBridges, null);
  assert.equal(s.cargoMinimumUsd, 5000);
  assert.equal(s.propertyCombinedMinimumUsd, 350000);
  assert.equal(s.brokerSuretyUsd, 10000);
  assert.equal(s.providerInsuranceStatus, 'NOT_ACQUIRED');
  assert.equal(s.tariffCorpus, 'NOT_ACQUIRED');
  assert.equal(s.annualReportFiledRows, 'NOT_ACQUIRED');
  assert.equal(s.providerEnforcementRows, 'NOT_ACQUIRED');
  assert.equal(s.newCanonicalOrganizations, 0);
  assert.equal(s.graphWrites, 0);
  assert.equal(s.claimEligibilityChanges, 0);
  assert.equal(accepted.householdGoodsAuthority.form14h, 'Household Goods certificate application');
  assert.equal(accepted.householdGoodsAuthority.form14a, 'Property certificate application; not household goods');
  assert.equal(accepted.householdGoodsAuthority.form19a, 'Broker license; not a carrier certificate');
  assert.equal(accepted.householdGoodsAuthority.legacySearchHost, 'NOT_REACHED');
  assert.equal(accepted.insurance.passengerLimits, 'SEPARATE_EQUIPMENT_CLASS');
  assert.equal(accepted.annualReport.isCensus, false);
  assert.equal(accepted.annualReport.periodEnding, '2025-12-31');
  assert.equal(accepted.federalBridges.exactBridges, null);
});

test('Alabama page publishes APSC authority and separate source clocks without a fake count', () => {
  const page = readFileSync('app/(move)/alabama/page.tsx', 'utf8');
  assert.match(page, /Form 14H/);
  assert.match(page, /Form 14A/);
  assert.match(page, /Form 19A/);
  assert.match(page, /\$5,000/);
  assert.match(page, /\$350,000/);
  assert.match(page, /NOT_ACQUIRED/);
  assert.match(page, /not a census/);
  assert.doesNotMatch(page, /AggregateRating|ratingValue|Trust Score|\.insert\(|\.upsert\(/);
  assert.equal(accepted.publication.canonical, 'https://www.movetrusthub.com/alabama');
  assert.equal(accepted.publication.robots, 'index,follow');
  assert.equal(accepted.sourceAsOf, null);
  assert.equal(accepted.snapshotAsOf, null);
  assert.notEqual(accepted.retrievedAt, accepted.generatedAt);
  assert.notEqual(accepted.annualReport.periodEnding, accepted.retrievedAt);
});

test('Alabama Move routing, labeled federal IDs and bare-number safety', () => {
  for (const q of [
    'mover Alabama', 'moving company Alabama', 'household goods mover Alabama',
    'Alabama operating authority', 'Alabama household goods authority',
    'APSC mover', 'Alabama certificate',
  ]) assert.match(plan(q).failReason ?? '', /Alabama Public Service Commission/, q);
  for (const city of ['Birmingham', 'Montgomery', 'Huntsville']) {
    assert.match(plan(`mover ${city}`).failReason ?? '', /geography only/, city);
  }
  for (const q of ['USDOT 123456 Alabama insurance', 'MC 123456 Alabama']) assert.equal(plan(q).mode, 'identifier');
  assert.match(plan('mover 123456 Alabama').failReason ?? '', /number has no label/);
  assert.match(plan('mover complaints Alabama').failReason ?? '', /complaint is not a finding/);
  assert.match(plan('mover enforcement Alabama').failReason ?? '', /enforcement corpus/);
  assert.match(plan('mover tariff Alabama').failReason ?? '', /tariff corpus/);
  assert.match(plan('Alabama cargo insurance').failReason ?? '', /\$5,000/);
  assert.match(plan('Alabama property certificate').failReason ?? '', /Form 14A/);
  assert.match(plan('Alabama broker license').failReason ?? '', /broker/);
});

test('Alabama rankings fail closed, with no city publication', () => {
  for (const word of ['best', 'safest', 'recommended', 'most trustworthy', 'most trusted', 'top-rated', 'highest-rated', '#1', 'number one', 'Trust Score', 'AggregateRating', 'ratingValue', 'paid ranking', 'sponsored ranking']) {
    assert.match(plan(`${word} mover Alabama`).failReason ?? '', /does not rank or recommend movers/, word);
  }
  assert.equal(normalizedPublishedStatePath('/Alabama'), '/alabama');
  assert.equal(normalizedPublishedStatePath('/alabama/birmingham'), null);
  for (const city of ['birmingham', 'montgomery', 'huntsville', 'mobile']) assert.equal(existsSync(`app/(move)/alabama/${city}`), false);
  assert.equal((readFileSync('app/sitemap.ts', 'utf8').match(/'\/alabama'/g) ?? []).length, 2);
});

test('Alabama routing does not capture Indiana or a labeled federal identifier', () => {
  assert.match(plan('mover Indiana').failReason ?? '', /Indiana DOR/);
  assert.equal(plan('USDOT 123456 Alabama').mode, 'identifier');
});
