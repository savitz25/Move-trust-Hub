import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { planMoveRequest } from './plan';
import { normalizedPublishedStatePath } from '../seo/published-state-path';
import { NEW_MEXICO_MOVE_SNAPSHOT as s } from '../new-mexico-intelligence/snapshot';
import accepted from '../new-mexico-intelligence/accepted-snapshot.json';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('New Mexico directory HTML is not a company roster', () => {
  assert.equal(s.hhgRoster, 'NOT_ACQUIRED');
  assert.equal(s.authorityRows, null);
  assert.notEqual(s.authorityRows, 0);
  assert.equal(s.directoryCompanyRowsInHtml, 'NONE_PRESENT');
  assert.equal(s.directoryTariffLinksInHtml, 'NONE_PRESENT');
  assert.equal(s.navigationAnchors, 71);
  assert.equal(s.navigationAnchorsWereCompanyRows, false);
  assert.equal(s.directoryHtmlBytes, 211258);
  assert.equal(s.directoryHtmlSha256, 'b73a70a33749ede004ef87fd8ec169eeebeda354365080a8d93d09eec11df0c0');
  assert.equal(s.yoastDatePublished, '2021-06-21');
  assert.equal(s.articleModifiedTime, '2023-06-20T20:58:14+00:00');
  assert.equal(s.pageClockIsRosterClock, false);
  assert.equal(s.e360IsCountedRoster, false);
  assert.equal(s.e360AnnouncedLive, '2026-01-26');
  assert.equal(s.providerComplaintRows, 'NOT_ACQUIRED');
  assert.equal(s.complaintFormIsCensus, false);
  assert.equal(s.tariffCorpus, 'NOT_ACQUIRED');
  assert.equal(s.usdotMcBridges, 'NOT_ACQUIRED');
  assert.equal(s.insurance, 'NOT_ACQUIRED');
  assert.equal(s.enforcementOrders, 'NOT_ACQUIRED');
  assert.equal(s.applicationIsActiveAuthority, false);
  assert.equal(s.otherUtilityDirectoriesParsedAsMovers, false);
  assert.equal(s.nameOnlyJoins, 0);
  assert.equal(s.graphWrites, 0);
  assert.equal(s.newCanonicalOrganizations, 0);
  assert.equal(accepted.householdGoodsAuthority.roster, 'NOT_ACQUIRED');
  assert.equal(accepted.householdGoodsAuthority.rows, null);
  assert.equal(accepted.householdGoodsAuthority.application, 'NOT_AN_ISSUED_AUTHORITY');
  assert.equal(accepted.householdGoodsAuthority.e360, 'CASE_SYSTEM_NOT_A_ROSTER');
  assert.equal(accepted.householdGoodsAuthority.fmcsaInterstate, 'SEPARATE');
  assert.equal(accepted.complaints.formIsCensus, false);
  assert.equal(accepted.enforcement.nameOnlyJoins, 0);
  assert.equal(accepted.sources.directoryHtmlSha256, s.directoryHtmlSha256);
  assert.equal(accepted.sources.pageClockIsRosterClock, false);
  assert.equal(accepted.sourceAsOf, null);
  assert.equal(accepted.publication.canonical, 'https://www.movetrusthub.com/new-mexico');
  assert.equal(accepted.publication.robots, 'index,follow');
  assert.equal(accepted.publication.rankings, false);
  assert.equal(accepted.publication.trustScore, false);
});

test('New Mexico page does not turn an empty directory into a mover count', () => {
  const page = readFileSync('app/(move)/new-mexico/page.tsx', 'utf8');
  assert.match(page, /New Mexico Public Regulation Commission/);
  assert.match(page, /Select a Household Goods Mover Company below to view their tariff/);
  assert.match(page, /NOT_ACQUIRED/);
  assert.match(page, /Missing is not zero/);
  assert.match(page, /no company rows/);
  assert.match(page, /no tariff links/);
  assert.match(page, /page clock, not a roster clock/);
  assert.match(page, /case system/);
  assert.match(page, /not a complaint census/);
  assert.match(page, /not active authority/);
  assert.match(page, /not parsed as movers/);
  assert.match(page, /protectYourMoveUrl/);
  assert.match(page, /directoryHtmlSha256/);
  assert.match(page, /geography only/);
  assert.equal(s.protectYourMoveUrl, 'https://www.protectyourmove.gov');
  assert.doesNotMatch(page, /AggregateRating|ratingValue|Trust Score/);
  assert.doesNotMatch(page, /0 movers|0 companies|0 certificates|zero movers/i);
  assert.doesNotMatch(page, /\/new-mexico\/albuquerque/);
});

test('New Mexico routing matches the state name and "in nm" only', () => {
  for (const q of ['mover New Mexico', 'moving company New Mexico', 'household goods mover New Mexico', 'mover in nm', 'household goods in NM']) {
    assert.match(plan(q).failReason ?? '', /New Mexico Public Regulation Commission/, q);
    assert.match(plan(q).failReason ?? '', /NOT_ACQUIRED/, q);
    assert.match(plan(q).failReason ?? '', /Missing is not zero/, q);
  }
  for (const q of ['nm', 'mover nm', 'NM movers', 'nm household goods', 'best mover nm']) {
    assert.doesNotMatch(plan(q).failReason ?? '', /New Mexico Public Regulation Commission/, q);
  }
  assert.match(plan('mover Albuquerque New Mexico').failReason ?? '', /geography only/);
  assert.match(plan('mover Santa Fe New Mexico').failReason ?? '', /geography only/);
  assert.match(plan('mover Las Cruces New Mexico').failReason ?? '', /geography only/);
  assert.match(plan('mover Rio Rancho New Mexico').failReason ?? '', /geography only/);
  assert.match(plan('mover Roswell New Mexico').failReason ?? '', /geography only/);
  assert.match(plan('mover Farmington New Mexico').failReason ?? '', /geography only/);
  assert.doesNotMatch(plan('mover Albuquerque').failReason ?? '', /New Mexico Public Regulation Commission/);
  assert.doesNotMatch(plan('mover Jackson').failReason ?? '', /New Mexico Public Regulation Commission/);
  assert.doesNotMatch(plan('mover Farmington').failReason ?? '', /New Mexico Public Regulation Commission/);
  assert.equal(plan('USDOT 123456 New Mexico').mode, 'identifier');
  assert.match(plan('mover 123456 New Mexico').failReason ?? '', /number has no label/);
  assert.match(plan('mover complaints New Mexico').failReason ?? '', /complaint is not a finding/);
  assert.match(plan('mover complaints New Mexico').failReason ?? '', /not a complaint census/);
  assert.match(plan('New Mexico household goods insurance').failReason ?? '', /NOT_ACQUIRED/);
  assert.match(plan('New Mexico tariff').failReason ?? '', /tariff corpus was NOT_ACQUIRED/);
  assert.match(plan('New Mexico enforcement orders').failReason ?? '', /NOT_ACQUIRED/);
  assert.match(plan('New Mexico application').failReason ?? '', /not active authority/);
  assert.match(plan('PRCe360 New Mexico').failReason ?? '', /case system/);
  assert.match(plan('FMCSA New Mexico').failReason ?? '', /not New Mexico intrastate authority/);
});

test('New Mexico rankings fail closed and do not capture other states', () => {
  for (const word of ['best', 'safest', 'recommended', 'most trustworthy', 'most trusted', 'top-rated', 'highest-rated', '#1', 'number one', 'Trust Score', 'AggregateRating', 'ratingValue']) {
    assert.match(plan(`${word} mover New Mexico`).failReason ?? '', /does not rank or recommend movers/, word);
    assert.match(plan(`${word} mover in nm`).failReason ?? '', /does not rank or recommend movers/, word);
  }
  assert.equal(normalizedPublishedStatePath('/New-Mexico'), '/new-mexico');
  assert.equal(normalizedPublishedStatePath('/new-mexico/albuquerque'), null);
  for (const city of ['albuquerque', 'santa-fe', 'las-cruces', 'rio-rancho', 'roswell', 'farmington']) {
    assert.equal(existsSync(`app/(move)/new-mexico/${city}`), false, city);
  }
  assert.equal((readFileSync('app/sitemap.ts', 'utf8').match(/'\/new-mexico'/g) ?? []).length, 2);
  assert.match(plan('mover Oklahoma').failReason ?? '', /Oklahoma Corporation Commission/);
  assert.doesNotMatch(plan('mover Oklahoma').failReason ?? '', /New Mexico Public Regulation Commission/);
  assert.match(plan('mover in ok').failReason ?? '', /Oklahoma Corporation Commission/);
  assert.match(plan('mover Arkansas').failReason ?? '', /Arkansas Department of Transportation/);
  assert.doesNotMatch(plan('mover Arkansas').failReason ?? '', /New Mexico Public Regulation Commission/);
  assert.doesNotMatch(plan('mover Utah').failReason ?? '', /New Mexico Public Regulation Commission/);
  assert.notEqual(plan('mover Utah').failReason ?? '', plan('mover New Mexico').failReason ?? '');
  assert.doesNotMatch(plan('mover Jackson').failReason ?? '', /New Mexico Public Regulation Commission/);
  assert.match(plan('mover Jackson Mississippi').failReason ?? '', /Mississippi Department of Transportation/);
  assert.doesNotMatch(plan('mover Jackson Mississippi').failReason ?? '', /New Mexico Public Regulation Commission/);
});
