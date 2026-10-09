import { STATEWIDE_ROUTES } from '@/lib/seo/statewide-routes';
import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { planMoveRequest } from './plan';
import { normalizedPublishedStatePath } from '../seo/published-state-path';
import { KENTUCKY_HHG_ROSTER, KENTUCKY_MOVE_SNAPSHOT as s, lookupKyHhgCertificate } from '../kentucky-intelligence/snapshot';
import accepted from '../kentucky-intelligence/accepted-snapshot.json';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('Kentucky household-goods listing stays on its own grain', () => {
  assert.equal(s.statuteCertificate, 'KRS 281.630');
  assert.equal(s.statuteStandards, 'KRS 281.624');
  assert.equal(s.statuteLiability, 'KRS 281.655');
  assert.equal(s.hhgRoster, 'ACQUIRED');
  assert.equal(s.listingRows, 42);
  assert.equal(s.distinctCertificateNumbers, 42);
  assert.equal(KENTUCKY_HHG_ROSTER.length, 42);
  assert.equal(new Set(KENTUCKY_HHG_ROSTER.map((row) => row.certificateNumber)).size, 42);
  assert.equal(s.physicalAddressInKentucky, 34);
  assert.equal(s.physicalAddressOutsideKentucky, 8);
  assert.equal(s.statusPrinted, false);
  assert.equal(s.dmtOrDvrFieldPrinted, false);
  assert.equal(s.usdotPrinted, false);
  assert.equal(s.rowsWithPrintedUsdot, null);
  assert.equal(s.exactFederalBridges, null);
  assert.equal(s.cargoMinimumUsd, null);
  assert.equal(s.providerInsuranceStatus, 'NOT_ACQUIRED');
  assert.equal(s.tariffCorpus, 'NOT_ACQUIRED');
  assert.equal(s.annualReportFilings, 'NOT_ACQUIRED');
  assert.equal(s.providerComplaintRows, 'NOT_ACQUIRED');
  assert.equal(s.enforcementCorpus, 'NOT_ACQUIRED');
  assert.equal(s.priorListingUsedAsPopulation, false);
  assert.equal(s.newCanonicalOrganizations, 0);
  assert.equal(s.graphWrites, 0);
  assert.equal(s.claimEligibilityChanges, 0);
  assert.equal(accepted.householdGoodsAuthority.rows, s.listingRows);
  assert.equal(accepted.householdGoodsAuthority.distinctCertificateNumbers, s.distinctCertificateNumbers);
  assert.equal(accepted.householdGoodsAuthority.physicalAddressOutsideKentucky, 8);
  assert.equal(accepted.householdGoodsAuthority.statusPrinted, false);
  assert.equal(accepted.federalBridges.exactBridges, null);
  assert.equal(accepted.federalBridges.rowsWithPrintedUsdot, null);
  assert.equal(accepted.insurance.cargoMinimumUsd, null);
  assert.equal(accepted.insurance.declaredValueBaseRateIsInsurance, false);
  assert.equal(accepted.tariffs.isCurrentCompliance, false);
  assert.equal(accepted.priorListing.rows, null);
  assert.equal(accepted.priorListing.usedAsPopulation, false);
  assert.equal(lookupKyHhgCertificate('C03766')?.legalName, 'ABLE MOVING & STORAGE COMPANY OF LOUISVILLE LLC');
  assert.equal(lookupKyHhgCertificate('c03766')?.certificateNumber, 'C03766');
  assert.equal(lookupKyHhgCertificate('C0720'), null);
  assert.equal(lookupKyHhgCertificate('415'), null);
});

test('Kentucky page publishes the listing count and separate clocks', () => {
  const page = readFileSync('app/(move)/kentucky/page.tsx', 'utf8');
  assert.match(page, /s\.statuteCertificate/);
  assert.match(page, /September 1, 2026/);
  assert.match(page, /42 certificate rows/);
  assert.match(page, /does not print a status/);
  assert.match(page, /TC 95-622/);
  assert.match(page, /TC 95-44/);
  assert.doesNotMatch(page, /AggregateRating|ratingValue|Trust Score|\.insert\(|\.upsert\(|active certificates/);
  assert.equal(accepted.publication.canonical, 'https://www.movetrusthub.com/kentucky');
  assert.equal(accepted.publication.robots, 'index,follow');
  assert.equal(accepted.publication.rankings, false);
  assert.equal(accepted.sourceAsOf, '2026-09-01');
  assert.notEqual(accepted.retrievedAt, accepted.generatedAt);
  assert.notEqual(accepted.retrievedAt, accepted.sourceAsOf);
});

test('Kentucky Move routing answers from the listing or fail-closes', () => {
  for (const q of [
    'mover Kentucky', 'moving company Kentucky', 'household goods mover Kentucky',
    'Kentucky household goods authority', 'household goods in ky',
  ]) assert.match(plan(q).failReason ?? '', /42 certificate rows/, q);
  for (const city of ['Louisville', 'Lexington']) {
    assert.match(plan(`mover ${city}`).failReason ?? '', /geography only/, city);
  }
  assert.doesNotMatch(plan('best ky movers').failReason ?? '', /Kentucky Transportation Cabinet/);
  assert.match(plan('Kentucky certificate C03766').failReason ?? '', /ABLE MOVING & STORAGE COMPANY OF LOUISVILLE LLC/);
  assert.match(plan('Kentucky certificate C99999').failReason ?? '', /absent from the KYTC HHG Carrier Listing/);
  for (const q of ['USDOT 123456 Kentucky insurance', 'MC 123456 Kentucky']) assert.equal(plan(q).mode, 'identifier');
  assert.match(plan('mover 123456 Kentucky').failReason ?? '', /number has no label/);
  assert.match(plan('mover complaints Kentucky').failReason ?? '', /TC 95-622/);
  assert.match(plan('mover enforcement Kentucky').failReason ?? '', /NOT_ACQUIRED/);
  assert.match(plan('mover tariff Kentucky').failReason ?? '', /current tariff/);
  assert.match(plan('Kentucky cargo insurance').failReason ?? '', /Form H/);
  assert.match(plan('Kentucky annual report').failReason ?? '', /TC 95-44/);
});

test('Kentucky rankings fail closed, with no city publication', () => {
  for (const word of ['best', 'safest', 'recommended', 'most trustworthy', 'most trusted', 'top-rated', 'highest-rated', '#1', 'number one', 'Trust Score', 'AggregateRating', 'ratingValue', 'paid ranking', 'sponsored ranking']) {
    assert.match(plan(`${word} mover Kentucky`).failReason ?? '', /does not rank or recommend movers/, word);
  }
  assert.equal(normalizedPublishedStatePath('/Kentucky'), '/kentucky');
  assert.equal(normalizedPublishedStatePath('/kentucky/louisville'), null);
  for (const city of ['louisville', 'lexington', 'jefferson']) {
    assert.equal(existsSync(`app/(move)/kentucky/${city}`), false);
  }
  assert.equal(STATEWIDE_ROUTES.filter((path) => path === '/kentucky').length, 1);
});

test('Kentucky routing does not capture Louisiana or a labeled federal identifier', () => {
  assert.match(plan('mover Louisiana').failReason ?? '', /Louisiana Public Service Commission/);
  assert.equal(plan('USDOT 123456 Kentucky').mode, 'identifier');
});
