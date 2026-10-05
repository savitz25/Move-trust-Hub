import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { planMoveRequest } from './plan';
import { normalizedPublishedStatePath } from '../seo/published-state-path';
import { SOUTH_CAROLINA_HHG_ROSTER, SOUTH_CAROLINA_MOVE_SNAPSHOT as s, lookupScHhgCertificate } from '../south-carolina-intelligence/snapshot';
import accepted from '../south-carolina-intelligence/accepted-snapshot.json';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('South Carolina Class E household-goods rows stay on their own grain', () => {
  assert.equal(s.statute, 'S.C. Code Ann. § 58-23-10 et seq.');
  assert.equal(s.classRegulation, 'S.C. Code Ann. Regs. 103-114');
  assert.equal(s.hhgRoster, 'ACQUIRED');
  assert.equal(s.listingRows, 150);
  assert.equal(s.distinctCertificateNumbers, 149);
  assert.equal(s.distinctCrmRecords, 150);
  assert.equal(s.distinctPrintedProviderNames, 149);
  assert.equal(s.sheetDataRows, 153);
  assert.equal(s.classEHazRowsInThisWorkbook, 3);
  assert.equal(s.filingStatusActive, 150);
  assert.equal(s.rowsPrintingDba, 46);
  assert.equal(SOUTH_CAROLINA_HHG_ROSTER.length, 150);
  assert.equal(SOUTH_CAROLINA_HHG_ROSTER.every((row) => row.filingType === 'Class E HHG'), true);
  assert.equal(new Set(SOUTH_CAROLINA_HHG_ROSTER.map((row) => row.certificateNumber)).size, 149);
  assert.equal(s.rowsWithPrintedUsdot, null);
  assert.equal(s.exactFederalBridges, null);
  assert.equal(s.insuranceMinimumUsd, null);
  assert.equal(s.providerInsuranceStatus, 'NOT_ACQUIRED');
  assert.equal(s.tariffCorpus, 'NOT_ACQUIRED');
  assert.equal(s.tariffSampleIsCarrierTariff, false);
  assert.equal(s.complaintCorpus, 'NOT_ACQUIRED');
  assert.equal(s.enforcementCorpus, 'NOT_ACQUIRED');
  assert.equal(s.docketCorpusUsedAsRoster, false);
  assert.equal(s.hazWorkbookParsed, false);
  assert.equal(s.newCanonicalOrganizations, 0);
  assert.equal(s.graphWrites, 0);
  assert.equal(s.claimEligibilityChanges, 0);
  assert.equal(accepted.householdGoodsAuthority.rows, 150);
  assert.equal(accepted.householdGoodsAuthority.distinctCertificateNumbers, 149);
  assert.equal(accepted.classEHazInThisWorkbook.includedInHouseholdGoodsCount, false);
  assert.equal(accepted.separateHazCarrierFile.rows, null);
  assert.equal(accepted.federalBridges.exactBridges, null);
  assert.equal(accepted.insurance.minimumUsd, null);
  assert.equal(accepted.tariffs.isCurrentCompliance, false);
  assert.equal(accepted.enforcement.docketCorpusUsedAsRoster, false);
  const dup = lookupScHhgCertificate('9774-A');
  assert.equal(dup.length, 2);
  assert.equal(dup.every((row) => row.providerCompany === 'American Van Lines Inc.'), true);
  assert.equal(lookupScHhgCertificate('9792-B')[0]?.providerCompany, 'All My Sons Moving & Storage of Charleston, LLC');
  assert.equal(lookupScHhgCertificate('8208').length, 0);
  assert.equal(lookupScHhgCertificate('C03766').length, 0);
});

test('South Carolina page publishes the household-goods count and separate clocks', () => {
  const page = readFileSync('app/(move)/south-carolina/page.tsx', 'utf8');
  assert.match(page, /150 Class E household-goods certificate rows/);
  assert.match(page, /s\.listingRows/);
  assert.match(page, /Class E HAZ/);
  assert.match(page, /s\.repeatedCertificateNumber/);
  assert.match(page, /American Van Lines Inc\./);
  assert.match(page, /s\.tariffRegulation/);
  assert.match(page, /not parsed/);
  assert.doesNotMatch(page, /AggregateRating|ratingValue|Trust Score|\.insert\(|\.upsert\(|153 Class E HHG|153 household/);
  assert.equal(accepted.publication.canonical, 'https://www.movetrusthub.com/south-carolina');
  assert.equal(accepted.publication.robots, 'index,follow');
  assert.equal(accepted.publication.rankings, false);
  assert.equal(accepted.sourceAsOf, '2026-08-04');
  assert.notEqual(accepted.retrievedAt, accepted.generatedAt);
  assert.notEqual(accepted.householdGoodsAuthority.crmModifiedOnMax.slice(0, 10), accepted.sourceAsOf);
});

test('South Carolina Move routing answers from the workbook or fail-closes', () => {
  for (const q of [
    'mover South Carolina', 'moving company South Carolina', 'household goods mover South Carolina',
    'South Carolina household goods authority', 'household goods in sc',
  ]) {
    assert.match(plan(q).failReason ?? '', /150 Class E HHG/, q);
    assert.doesNotMatch(plan(q).failReason ?? '', /153 Class E HHG|153 household/, q);
  }
  assert.match(plan('mover Charleston South Carolina').failReason ?? '', /geography only/);
  assert.doesNotMatch(plan('mover Charleston').failReason ?? '', /Office of Regulatory Staff/);
  assert.doesNotMatch(plan('mover Columbia').failReason ?? '', /Office of Regulatory Staff/);
  assert.doesNotMatch(plan('best sc movers').failReason ?? '', /Office of Regulatory Staff/);
  assert.match(plan('South Carolina certificate 9792-B').failReason ?? '', /All My Sons Moving & Storage of Charleston, LLC/);
  assert.match(plan('South Carolina certificate 9774-A').failReason ?? '', /two Class E HHG rows/);
  assert.match(plan('South Carolina certificate 9774-A').failReason ?? '', /American Van Lines Inc/);
  assert.match(plan('South Carolina certificate 8208').failReason ?? '', /absent from the Class E HHG rows/);
  assert.match(plan('South Carolina certificate 99999').failReason ?? '', /absent from the Class E HHG rows/);
  for (const q of ['USDOT 123456 South Carolina insurance', 'MC 123456 South Carolina']) assert.equal(plan(q).mode, 'identifier');
  assert.match(plan('mover 123456 South Carolina').failReason ?? '', /number has no label/);
  assert.match(plan('mover complaints South Carolina').failReason ?? '', /NOT_ACQUIRED/);
  assert.match(plan('mover enforcement South Carolina').failReason ?? '', /NOT_ACQUIRED/);
  assert.match(plan('mover tariff South Carolina').failReason ?? '', /103-190/);
  assert.match(plan('South Carolina cargo insurance').failReason ?? '', /Form E/);
});

test('South Carolina rankings fail closed, with no city publication', () => {
  for (const word of ['best', 'safest', 'recommended', 'most trustworthy', 'most trusted', 'top-rated', 'highest-rated', '#1', 'number one', 'Trust Score', 'AggregateRating', 'ratingValue', 'paid ranking', 'sponsored ranking']) {
    assert.match(plan(`${word} mover South Carolina`).failReason ?? '', /does not rank or recommend movers/, word);
  }
  assert.equal(normalizedPublishedStatePath('/South-Carolina'), '/south-carolina');
  assert.equal(normalizedPublishedStatePath('/south-carolina/charleston'), null);
  for (const city of ['charleston', 'columbia', 'greenville']) {
    assert.equal(existsSync(`app/(move)/south-carolina/${city}`), false);
  }
  assert.equal((readFileSync('app/sitemap.ts', 'utf8').match(/'\/south-carolina'/g) ?? []).length, 2);
});

test('South Carolina routing does not capture Kentucky or a labeled federal identifier', () => {
  assert.match(plan('mover Kentucky').failReason ?? '', /Kentucky Transportation Cabinet/);
  assert.equal(plan('USDOT 123456 South Carolina').mode, 'identifier');
});
