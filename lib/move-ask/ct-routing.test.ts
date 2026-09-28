import assert from 'node:assert/strict';
import test from 'node:test';
import { planMoveRequest } from './plan';
import { CONNECTICUT_MOVE_SNAPSHOT as s, lookupCtHhgCertificate } from '../connecticut-intelligence/snapshot';
import { normalizedPublishedStatePath } from '../seo/published-state-path';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('CTDOT 2026 source grain, clocks and identity boundaries', () => {
  assert.equal(s.rosterRows, 117);
  assert.equal(s.sourceAnnouncedTotal, 117);
  assert.equal(s.rows.length, 117);
  assert.equal(new Set(s.rows.map((row) => row.ctdotCertificate)).size, 115);
  assert.equal(s.distinctCertificates, 115);
  assert.equal(s.duplicateCertificateRows, 2);
  assert.equal(lookupCtHhgCertificate('HG1775').length, 2);
  assert.equal(lookupCtHhgCertificate('HG1792').length, 2);
  assert.equal(s.printedUsdotRows, 0);
  assert.equal(s.printedMcRows, 0);
  assert.equal(s.rowsWithoutPrintedFederalIdentifier, 117);
  assert.equal(s.sourcePublicationDate, null);
  assert.match(s.sourceFileLastModifiedHttp ?? '', /20 May 2026/);
  assert.match(s.retrievedAt, /^2026-09-28T/);
  assert.match(s.generatedAt, /^2026-09-28T/);
  assert.equal(s.elicenseVerifiedAt, null);
  assert.equal(s.elicenseCode, 'RCHG');
  assert.equal(s.providerComplaintRows, null);
  assert.equal(s.providerEnforcementRows, null);
  assert.equal(s.carrierTariffDocuments, null);
  assert.equal(s.newCanonicalOrganizations, 0);
  assert.equal(s.graphWrites, 0);
  assert.equal(s.claimEligibilityChanges, 0);
});

test('Connecticut authority, identifiers, city context and evidence route safely', () => {
  for (const q of [
    'mover Connecticut', 'moving company Connecticut', 'household goods mover Connecticut',
    'Connecticut HHG carrier', 'CTDOT mover', 'CTDOT household goods certificate',
    'RCHG Connecticut', 'Connecticut mover certificate',
  ]) assert.match(plan(q).failReason ?? '', /117 roster rows and 115 distinct HG certificates/, q);
  for (const city of ['Hartford', 'New Haven', 'Stamford', 'Bridgeport']) {
    assert.match(plan(`mover ${city}`).failReason ?? '', /geography only/, city);
  }
  assert.match(plan('CTDOT certificate HG1775').failReason ?? '', /2 rows/);
  assert.match(plan('HG1776 Connecticut').failReason ?? '', /2026 household-goods roster/);
  assert.match(plan('CTDOT certificate HG9999').failReason ?? '', /Absence does not prove no authority/);
  assert.equal(plan('USDOT 123456 Connecticut').mode, 'identifier');
  assert.equal(plan('MC 123456 Connecticut').mode, 'identifier');
  assert.match(plan('mover 123456 Connecticut').failReason ?? '', /number has no label/);
  assert.match(plan('moving tariff Connecticut').failReason ?? '', /fuel surcharges/);
  assert.match(plan('moving complaints Connecticut').failReason ?? '', /not a finding/);
  assert.match(plan('mover citation Connecticut').failReason ?? '', /Administrative Law Unit/);
});

test('ranking refusal, canonical path and prior state essentials', () => {
  for (const word of ['best', 'safest', 'recommended', 'recommend', 'top-rated', 'highest-rated', '#1', 'number one', 'most trustworthy', 'most trusted', 'Trust Score', 'AggregateRating', 'ratingValue', 'paid ranking', 'sponsored ranking']) {
    assert.match(plan(`${word} mover Connecticut`).failReason ?? '', /does not rank or recommend movers/, word);
  }
  assert.match(plan('best CTDOT certificate HG1775 Connecticut').failReason ?? '', /does not rank or recommend movers/);
  assert.equal(normalizedPublishedStatePath('/Connecticut'), '/connecticut');
  assert.equal(normalizedPublishedStatePath('/CONNECTICUT'), '/connecticut');
  assert.equal(normalizedPublishedStatePath('/Connecticut/hartford'), null);
  assert.match(plan('movers Michigan').failReason ?? '', /CVED/);
  assert.match(plan('movers Minnesota').failReason ?? '', /MnDOT/);
  assert.match(plan('movers Nevada').failReason ?? '', /Nevada Transportation Authority/);
});
