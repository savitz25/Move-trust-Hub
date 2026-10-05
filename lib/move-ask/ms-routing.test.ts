import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { planMoveRequest } from './plan';
import { normalizedPublishedStatePath } from '../seo/published-state-path';
import { MISSISSIPPI_MOVE_SNAPSHOT as s } from '../mississippi-intelligence/snapshot';
import accepted from '../mississippi-intelligence/accepted-snapshot.json';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('Mississippi authority grains remain separate and unavailable rows stay unknown', () => {
  assert.equal(s.hhgAuthorityVerification, 'KNOWN');
  assert.equal(s.hhgRoster, 'NOT_ACQUIRED');
  assert.equal(s.authorityRows, null);
  assert.notEqual(s.authorityRows, 0);
  assert.equal(s.distinctCertificateNumbers, null);
  assert.equal(s.exactFederalBridges, null);
  assert.equal(s.propertyLiabilityNonHazardousUsd, 750000);
  assert.equal(s.cargoThreeTonsOrLessUsd, 5000);
  assert.equal(s.cargoMoreThanThreeTonsUsd, 10000);
  assert.equal(s.passengerSixteenOrMoreUsd, 5000000);
  assert.equal(s.passengerFifteenOrLessUsd, 1500000);
  assert.equal(s.providerInsuranceStatus, 'NOT_ACQUIRED');
  assert.equal(s.tariffCorpus, 'NOT_ACQUIRED');
  assert.equal(s.providerEnforcementRows, 'NOT_ACQUIRED');
  assert.equal(s.newCanonicalOrganizations, 0);
  assert.equal(s.graphWrites, 0);
  assert.equal(s.claimEligibilityChanges, 0);
  assert.equal(accepted.householdGoodsAuthority.certificate, 'Certificate of public convenience and necessity');
  assert.equal(accepted.householdGoodsAuthority.contractCarrierPermit, 'SEPARATE');
  assert.equal(accepted.householdGoodsAuthority.passengerAuthority, 'SEPARATE');
  assert.equal(accepted.householdGoodsAuthority.application, 'NOT_AN_ISSUED_CERTIFICATE');
  assert.equal(accepted.insurance.passengerLimits, 'SEPARATE');
  assert.equal(accepted.fees.ucrPerVehicleFeeWaiver, 'FEE_WAIVER_NOT_AUTHORITY');
  assert.equal(accepted.federalBridges.exactBridges, null);
  assert.equal(accepted.enforcement.nameOnlyJoins, 0);
  assert.equal(accepted.sources.guidelinesSha256, s.guidelinesSha256);
  assert.equal(accepted.sources.receiptApplicationSha256, s.receiptApplicationSha256);
});

test('Mississippi page publishes MDOT certificate rules without a fake count', () => {
  const page = readFileSync('app/(move)/mississippi/page.tsx', 'utf8');
  assert.match(page, /certificate of public convenience and necessity/);
  assert.match(page, /\$5,000/);
  assert.match(page, /\$10,000/);
  assert.match(page, /propertyLiabilityNonHazardousUsd/);
  assert.match(page, /NOT_ACQUIRED/);
  assert.match(page, /Missing is not zero/);
  assert.match(page, /Passenger limits are separate/);
  assert.match(page, /not a roster/);
  assert.doesNotMatch(page, /AggregateRating|ratingValue|Trust Score|\.insert\(|\.upsert\(/);
  assert.match(page, /not a count of zero movers/);
  assert.doesNotMatch(page, /Mighty Men|349 companies|0 certificates/);
  assert.equal(accepted.publication.canonical, 'https://www.movetrusthub.com/mississippi');
  assert.equal(accepted.publication.robots, 'index,follow');
  assert.equal(accepted.sourceAsOf, null);
  assert.equal(accepted.snapshotAsOf, null);
  assert.notEqual(accepted.retrievedAt, accepted.generatedAt);
  assert.notEqual(accepted.sources.guidelinesPdfModified, accepted.retrievedAt);
});

test('Mississippi Move routing keeps federal IDs and unlabeled numbers out of a roster lookup', () => {
  for (const q of [
    'mover Mississippi', 'moving company Mississippi', 'household goods mover Mississippi',
    'Mississippi operating authority', 'Mississippi household goods authority',
    'Mississippi certificate', 'mover in ms',
  ]) assert.match(plan(q).failReason ?? '', /Mississippi Department of Transportation/, q);
  for (const city of ['Gulfport', 'Biloxi']) {
    assert.match(plan(`mover ${city}`).failReason ?? '', /geography only/, city);
  }
  assert.match(plan('mover Jackson Mississippi').failReason ?? '', /geography only/);
  assert.doesNotMatch(plan('mover Jackson').failReason ?? '', /Mississippi Department of Transportation/);
  for (const q of ['USDOT 123456 Mississippi insurance', 'MC 123456 Mississippi']) assert.equal(plan(q).mode, 'identifier');
  assert.match(plan('mover 123456 Mississippi').failReason ?? '', /number has no label/);
  assert.match(plan('mover complaints Mississippi').failReason ?? '', /complaint is not a finding/);
  assert.match(plan('mover enforcement Mississippi').failReason ?? '', /NOT_ACQUIRED/);
  assert.match(plan('Mississippi cargo insurance').failReason ?? '', /\$5,000/);
  assert.match(plan('Mississippi cargo insurance').failReason ?? '', /\$10,000/);
  assert.match(plan('Mississippi passenger authority').failReason ?? '', /Passenger authority is separate/);
  assert.match(plan('Mississippi contract carrier permit').failReason ?? '', /contract-carrier permit/i);
});

test('Mississippi rankings fail closed, with no city publication', () => {
  for (const word of ['best', 'safest', 'recommended', 'most trustworthy', 'most trusted', 'top-rated', 'highest-rated', '#1', 'number one', 'Trust Score', 'AggregateRating', 'ratingValue', 'paid ranking', 'sponsored ranking']) {
    assert.match(plan(`${word} mover Mississippi`).failReason ?? '', /does not rank or recommend movers/, word);
  }
  assert.equal(normalizedPublishedStatePath('/Mississippi'), '/mississippi');
  assert.equal(normalizedPublishedStatePath('/mississippi/jackson'), null);
  for (const city of ['jackson', 'gulfport', 'biloxi']) assert.equal(existsSync(`app/(move)/mississippi/${city}`), false);
  assert.equal((readFileSync('app/sitemap.ts', 'utf8').match(/'\/mississippi'/g) ?? []).length, 2);
});

test('Mississippi routing does not capture South Carolina, Indiana, or Missouri wording', () => {
  assert.match(plan('mover in sc').failReason ?? '', /South Carolina/);
  assert.match(plan('mover Indiana').failReason ?? '', /Indiana DOR/);
  assert.doesNotMatch(plan('mover Missouri').failReason ?? '', /Mississippi Department of Transportation/);
  assert.equal(plan('USDOT 123456 Mississippi').mode, 'identifier');
});
