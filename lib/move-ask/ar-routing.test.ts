import { STATEWIDE_ROUTES } from '@/lib/seo/statewide-routes';
import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { planMoveRequest } from './plan';
import { normalizedPublishedStatePath } from '../seo/published-state-path';
import { ARKANSAS_MOVE_SNAPSHOT as s } from '../arkansas-intelligence/snapshot';
import accepted from '../arkansas-intelligence/accepted-snapshot.json';

const plan = (q: string) => planMoveRequest({ q } as Parameters<typeof planMoveRequest>[0]).query;

test('Arkansas authority grains remain separate and the roster stays unknown', () => {
  assert.equal(s.hhgRoster, 'NOT_ACQUIRED');
  assert.equal(s.authorityRows, null);
  assert.notEqual(s.authorityRows, 0);
  assert.equal(s.hhgInsuranceDollars, 'NOT_ACQUIRED');
  assert.equal(s.generalFreightLimitsApplyToHouseholdGoods, false);
  assert.equal(s.filingFeeUsd, 50);
  assert.equal(s.perVehicleInsuranceFilingFeeUsd, 5);
  assert.equal(s.providerInsuranceStatus, 'NOT_ACQUIRED');
  assert.equal(s.newCanonicalOrganizations, 0);
  assert.equal(accepted.householdGoodsAuthority.application, 'NOT_AN_ISSUED_AUTHORITY');
  assert.equal(accepted.householdGoodsAuthority.generalFreightMobileHome, 'SEPARATE');
  assert.equal(accepted.householdGoodsAuthority.passengerAuthority, 'SEPARATE');
  assert.equal(accepted.householdGoodsAuthority.fmcsaInterstate, 'SEPARATE');
  assert.equal(accepted.householdGoodsAuthority.usdot, 'SEPARATE');
  assert.equal(accepted.insurance.hhgDollarMinima, 'NOT_ACQUIRED');
  assert.equal(accepted.fees.feeIsAuthority, false);
  assert.equal(accepted.federalBridges.exactBridges, null);
  assert.equal(accepted.enforcement.nameOnlyJoins, 0);
  assert.equal(accepted.sources.hhgIndividualSha256, s.hhgIndividualSha256);
});

test('Arkansas page does not turn an application packet into a mover count', () => {
  const page = readFileSync('app/(move)/arkansas/page.tsx', 'utf8');
  assert.match(page, /NOT_ACQUIRED/);
  assert.match(page, /Missing is not zero/);
  assert.match(page, /not issued authority/);
  assert.match(page, /except passengers and household goods/);
  assert.match(page, /Rule 13.1/);
  assert.doesNotMatch(page, /AggregateRating|ratingValue|Trust Score/);
  assert.doesNotMatch(page, /0 certificates|0 movers/);
  assert.equal(accepted.publication.canonical, 'https://www.movetrusthub.com/arkansas');
  assert.equal(accepted.publication.robots, 'index,follow');
  assert.equal(accepted.sourceAsOf, null);
});

test('Arkansas Move routing keeps classes apart', () => {
  for (const q of ['mover Arkansas', 'household goods mover Arkansas', 'mover in ar']) {
    assert.match(plan(q).failReason ?? '', /Arkansas Department of Transportation/, q);
  }
  assert.match(plan('mover Little Rock').failReason ?? '', /geography only/);
  assert.doesNotMatch(plan('mover Jackson').failReason ?? '', /Arkansas Department of Transportation/);
  assert.match(plan('Arkansas household goods insurance').failReason ?? '', /NOT_ACQUIRED/);
  assert.match(plan('Arkansas household goods insurance').failReason ?? '', /not household-goods limits/);
  assert.match(plan('Arkansas general freight authority').failReason ?? '', /separate/);
  assert.match(plan('Arkansas passenger authority').failReason ?? '', /Passenger authority is separate/);
  assert.match(plan('mover complaints Arkansas').failReason ?? '', /complaint is not a finding/);
  assert.equal(plan('USDOT 123456 Arkansas').mode, 'identifier');
  assert.match(plan('mover 123456 Arkansas').failReason ?? '', /number has no label/);
});

test('Arkansas rankings fail closed and do not capture Oklahoma or Arizona', () => {
  assert.match(plan('best mover Arkansas').failReason ?? '', /does not rank or recommend movers/);
  assert.equal(normalizedPublishedStatePath('/Arkansas'), '/arkansas');
  assert.equal(normalizedPublishedStatePath('/arkansas/little-rock'), null);
  for (const city of ['little-rock', 'fayetteville', 'fort-smith']) assert.equal(existsSync(`app/(move)/arkansas/${city}`), false);
  assert.equal(STATEWIDE_ROUTES.filter((path) => path === '/arkansas').length, 1);
  assert.match(plan('mover Oklahoma').failReason ?? '', /Oklahoma Corporation Commission/);
  assert.doesNotMatch(plan('mover in Arizona').failReason ?? '', /Arkansas Department of Transportation/);
  assert.doesNotMatch(plan('mover Fayetteville').failReason ?? '', /Arkansas Department of Transportation/);
  assert.match(plan('mover Fayetteville Arkansas').failReason ?? '', /geography only/);
  assert.doesNotMatch(plan('mover Missouri').failReason ?? '', /Arkansas Department of Transportation/);
});
