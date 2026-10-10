import { STATEWIDE_ROUTES } from '@/lib/seo/statewide-routes';
import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { planMoveRequest } from './plan';
import { normalizedPublishedStatePath } from '../seo/published-state-path';
import { IDAHO_MOVE_SNAPSHOT as s } from '../idaho-intelligence/snapshot';
import accepted from '../idaho-intelligence/accepted-snapshot.json';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('Idaho reviewed sources are not a household-goods roster', () => {
  assert.equal(s.hhgRoster, 'NOT_ACQUIRED');
  assert.equal(s.authorityRows, null);
  assert.notEqual(s.authorityRows, 0);
  assert.equal(s.moverSpecificLicenseIdentified, false);
  assert.equal(s.commodities.householdGoods, 'Exempt');
  assert.equal(s.commodities.furnitureMovingAndStorage, 'Exempt');
  assert.equal(s.commodities.furnitureFromFactoryOrStoreUnlessPaidByCustomer, 'Regulated');
  assert.equal(s.commodities.isLicenseCensus, false);
  assert.equal(s.commodities.htmlBytes, 137502);
  assert.equal(s.commodities.htmlSha256, '21d068771fe28f17dc2a8f6701cda07fd3437b9220e78f80a557323ac90d6a33');
  assert.equal(s.commodities.dateModified, '2023-12-27T15:29:31-07:00');
  assert.equal(s.pageClockIsRosterClock, false);
  assert.equal(s.financialResponsibility.isCertificate, false);
  assert.equal(s.financialResponsibility.isRoster, false);
  assert.equal(s.financialResponsibility.section49117Amounts, 'NOT_ACQUIRED');
  assert.equal(s.publicUtilitiesDefinition.stillPublished, true);
  assert.equal(s.publicUtilitiesDefinition.isLicenseCount, false);
  assert.equal(s.publicUtilitiesDefinition.repealTreatedAsCurrentLaw, false);
  assert.equal(s.ipuc.hhgRosterOnHomepage, false);
  assert.equal(s.ipuc.complaintFormIsCensus, false);
  assert.equal(s.tariffCorpus, 'NOT_ACQUIRED');
  assert.equal(s.historicalPermitIsCurrentProgram, false);
  assert.equal(s.graphWrites, 0);
  assert.equal(s.newCanonicalOrganizations, 0);
  assert.equal(s.nameOnlyJoins, 0);
  assert.equal(accepted.householdGoodsAuthority.roster, 'NOT_ACQUIRED');
  assert.equal(accepted.householdGoodsAuthority.rows, null);
  assert.equal(accepted.householdGoodsAuthority.fmcsaInterstate, 'SEPARATE');
  assert.equal(accepted.complaints.formIsCensus, false);
  assert.equal(accepted.enforcement.nameOnlyJoins, 0);
  assert.equal(accepted.sources.pageClockIsRosterClock, false);
  assert.equal(accepted.sourceAsOf, null);
  assert.equal(accepted.publication.canonical, 'https://www.movetrusthub.com/idaho');
  assert.equal(accepted.publication.robots, 'index,follow');
  assert.equal(accepted.publication.rankings, false);
  assert.equal(accepted.publication.trustScore, false);
});

test('Idaho page does not turn an exemption into a mover count', () => {
  const page = readFileSync('app/(move)/idaho/page.tsx', 'utf8');
  assert.match(page, /NOT_ACQUIRED/);
  assert.match(page, /Missing is not zero/);
  assert.match(page, /does not publish a mover count/);
  assert.match(page, /Household Goods/);
  assert.match(page, /not a mover license/);
  assert.match(page, /not a roster clock/);
  assert.match(page, /not a household-goods certificate/);
  assert.match(page, /not a household-goods license count/);
  assert.match(page, /does not treat a bill as a repeal/);
  assert.match(page, /not a complaint census/);
  assert.match(page, /geography only/);
  assert.match(page, /htmlSha256/);
  assert.equal(s.protectYourMoveUrl, 'https://www.protectyourmove.gov');
  assert.doesNotMatch(page, /AggregateRating|ratingValue|Trust Score/);
  assert.doesNotMatch(page, /0 movers|0 companies|0 certificates|zero movers/i);
  assert.doesNotMatch(page, /\/idaho\/boise/);
  assert.doesNotMatch(page, /\$750,000|750,000/);
});

test('Idaho routing matches the state name and "in id" only', () => {
  for (const q of ['mover Idaho', 'moving company Idaho', 'household goods mover Idaho', 'mover in id', 'household goods in ID']) {
    assert.match(plan(q).failReason ?? '', /Idaho State Police/, q);
    assert.match(plan(q).failReason ?? '', /NOT_ACQUIRED/, q);
    assert.match(plan(q).failReason ?? '', /Missing is not zero/, q);
  }
  for (const q of ['id', 'ID', 'mover id', 'mover ID', 'id household goods', 'best mover id']) {
    assert.doesNotMatch(plan(q).failReason ?? '', /Idaho State Police/, q);
  }
  assert.match(plan('mover Boise Idaho').failReason ?? '', /geography only/);
  assert.match(plan('mover Idaho Falls').failReason ?? '', /geography only/);
  assert.match(plan('mover Twin Falls Idaho').failReason ?? '', /geography only/);
  assert.match(plan("mover Coeur d'Alene Idaho").failReason ?? '', /geography only/);
  assert.doesNotMatch(plan('mover Boise').failReason ?? '', /Idaho State Police/);
  assert.doesNotMatch(plan('mover Jackson').failReason ?? '', /Idaho State Police/);
  assert.equal(plan('USDOT 123456 Idaho').mode, 'identifier');
  assert.match(plan('mover 123456 Idaho').failReason ?? '', /number has no label/);
  assert.match(plan('mover complaints Idaho').failReason ?? '', /complaint is not a finding/);
  assert.match(plan('Idaho household goods insurance').failReason ?? '', /NOT_ACQUIRED/);
  assert.match(plan('Idaho tariff').failReason ?? '', /tariff corpus was NOT_ACQUIRED/);
  assert.match(plan('Idaho enforcement orders').failReason ?? '', /NOT_ACQUIRED/);
  assert.match(plan('Idaho FMCSA').failReason ?? '', /not an Idaho household-goods roster/);
  assert.match(plan('Idaho commercial vehicle registration').failReason ?? '', /not a household-goods license census/);
});

test('Idaho rankings fail closed and do not capture other states', () => {
  for (const word of ['best', 'safest', 'recommended', 'most trustworthy', 'most trusted', 'top-rated', 'highest-rated', '#1', 'number one', 'Trust Score', 'AggregateRating', 'ratingValue']) {
    assert.match(plan(`${word} mover Idaho`).failReason ?? '', /does not rank or recommend movers/, word);
    assert.match(plan(`${word} mover in id`).failReason ?? '', /does not rank or recommend movers/, word);
  }
  assert.equal(normalizedPublishedStatePath('/Idaho'), '/idaho');
  assert.equal(normalizedPublishedStatePath('/idaho'), null);
  assert.equal(normalizedPublishedStatePath('/idaho/boise'), null);
  for (const city of ['boise', 'meridian', 'nampa', 'pocatello', 'idaho-falls', 'twin-falls', 'coeur-d-alene']) {
    assert.equal(existsSync(`app/(move)/idaho/${city}`), false, city);
  }
  assert.equal(STATEWIDE_ROUTES.filter((path) => path === '/idaho').length, 1);
  assert.match(plan('mover Nebraska').failReason ?? '', /Nebraska Public Service Commission/);
  assert.doesNotMatch(plan('mover Nebraska').failReason ?? '', /Idaho State Police/);
  assert.match(plan('mover New Mexico').failReason ?? '', /New Mexico Public Regulation Commission/);
  assert.doesNotMatch(plan('mover New Mexico').failReason ?? '', /Idaho State Police/);
  assert.match(plan('mover in nm').failReason ?? '', /New Mexico Public Regulation Commission/);
  assert.doesNotMatch(plan('mover Utah').failReason ?? '', /Idaho State Police/);
  assert.doesNotMatch(plan('mover in in').failReason ?? '', /Idaho State Police/);
});
