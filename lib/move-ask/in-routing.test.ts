import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { planMoveRequest } from './plan';
import { normalizedPublishedStatePath } from '../seo/published-state-path';
import { INDIANA_MOVE_SNAPSHOT as s } from '../indiana-intelligence/snapshot';
import accepted from '../indiana-intelligence/accepted-snapshot.json';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('Indiana authority grains remain separate and unavailable rows stay unknown', () => {
  assert.equal(s.hhgAuthorityVerification, 'KNOWN');
  assert.equal(s.hhgRoster, 'NOT_ACQUIRED');
  assert.equal(s.authorityRows, null);
  assert.equal(s.distinctAuthorityNumbers, null);
  assert.equal(s.exactFederalBridges, null);
  assert.equal(s.formERequirement, 'KNOWN');
  assert.equal(s.tariffRequestCapability, 'KNOWN');
  assert.equal(s.tariffCorpus, 'NOT_ACQUIRED');
  assert.equal(s.providerEnforcementRows, 'NOT_ACQUIRED');
  assert.equal(s.newCanonicalOrganizations, 0);
  assert.equal(s.graphWrites, 0);
  assert.equal(s.claimEligibilityChanges, 0);
  assert.equal(accepted.householdGoodsAuthority.temporaryAuthorityDays, 180);
  assert.equal(accepted.householdGoodsAuthority.emergencyTemporaryAuthorityDays, 30);
  assert.equal(accepted.householdGoodsAuthority.commonAndContractGrains, 'SEPARATE');
  assert.equal(accepted.federalBridges.exactBridges, null);
});

test('Indiana page publishes DOR authority and separate source clocks without a fake count', () => {
  const page = readFileSync('app/(move)/indiana/page.tsx', 'utf8');
  assert.match(page, /Certificate of Public Convenience and Necessity/);
  assert.match(page, /November 30/);
  assert.match(page, /Form E/);
  assert.match(page, /tariff/);
  assert.match(page, /NOT_ACQUIRED/);
  assert.doesNotMatch(page, /AggregateRating|ratingValue|Trust Score|\.insert\(|\.upsert\(/);
  assert.equal(accepted.publication.canonical, 'https://www.movetrusthub.com/indiana');
  assert.equal(accepted.publication.robots, 'index,follow');
  assert.equal(accepted.sourceAsOf, null);
  assert.equal(accepted.snapshotAsOf, null);
  assert.notEqual(accepted.retrievedAt, accepted.generatedAt);
});

test('Indiana Move routing, labeled federal IDs and bare-number safety', () => {
  for (const q of [
    'mover Indiana', 'moving company Indiana', 'household goods mover Indiana',
    'Indiana operating authority', 'Indiana household goods authority',
    'Certificate of Public Convenience and Necessity Indiana', 'Indiana DOR mover',
  ]) assert.match(plan(q).failReason ?? '', /Indiana DOR Motor Carrier Services/);
  for (const city of ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend']) {
    assert.match(plan(`mover ${city}`).failReason ?? '', /geography only/);
  }
  for (const q of ['USDOT 123456 Indiana insurance', 'MC 123456 Indiana lender']) assert.equal(plan(q).mode, 'identifier');
  assert.match(plan('mover 123456 Indiana').failReason ?? '', /number has no label/);
  assert.match(plan('mover complaints Indiana').failReason ?? '', /complaint is not a finding/);
  assert.match(plan('mover enforcement Indiana').failReason ?? '', /enforcement corpus/);
  assert.match(plan('mover tariff Indiana').failReason ?? '', /tariff corpus/);
  assert.match(plan('mover Form E Indiana').failReason ?? '', /Form E/);
});

test('Indiana rankings fail closed, with no city publication', () => {
  for (const word of ['best', 'safest', 'recommended', 'most trustworthy', 'most trusted', 'top-rated', 'highest-rated', '#1', 'number one', 'Trust Score', 'AggregateRating', 'ratingValue', 'paid ranking', 'sponsored ranking']) {
    assert.match(plan(`${word} mover Indiana`).failReason ?? '', /does not rank or recommend movers/, word);
  }
  assert.equal(normalizedPublishedStatePath('/Indiana'), '/indiana');
  assert.equal(normalizedPublishedStatePath('/indiana/indianapolis'), null);
  for (const city of ['indianapolis', 'fort-wayne', 'evansville', 'south-bend']) assert.equal(existsSync(`app/(move)/indiana/${city}`), false);
  assert.equal((readFileSync('app/sitemap.ts', 'utf8').match(/'\/indiana'/g) ?? []).length, 2);
});

test('Wisconsin, Maryland, Connecticut and Michigan routes retain their meaning', () => {
  assert.match(plan('mover Wisconsin').failReason ?? '', /WisDOT/);
  assert.match(plan('mover Maryland').failReason ?? '', /Maryland Labor/);
  assert.match(plan('movers Connecticut').failReason ?? '', /CTDOT/);
  assert.match(plan('movers Michigan').failReason ?? '', /CVED/);
  assert.equal(plan('USDOT 123456 Michigan insurance').mode, 'identifier');
});
