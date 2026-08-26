import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  countyResearchCoverage,
  evaluateEnhancedLocalResearchGate,
  FLORIDA_RESEARCH_COUNTIES,
} from './coverage';
import { FLORIDA_MOVE_EDUCATION } from './education';
import { MOVE_FL_METRIC_DICTIONARY } from './metric-dictionary';
import { isPublicReady } from './readiness';
import { FLORIDA_MOVE_SOURCE_CATALOG } from './source-catalog';

test('no Florida county is hard-coded Enhanced', () => {
  for (const c of FLORIDA_RESEARCH_COUNTIES) {
    assert.equal(countyResearchCoverage(c.slug), 'statewide');
  }
});

test('Enhanced gate stays inactive when operating geography is unproven', () => {
  assert.equal(
    evaluateEnhancedLocalResearchGate({
      countyCredentialCensusValidated: true,
      complaintsAttributed: false,
      enforcementFinalDispositionsAttributed: false,
      operatingGeographyProven: false,
      identityReviewed: false,
      publicEligibilityReviewed: true,
    }),
    'statewide'
  );
});

test('READY public metrics never claim all movers or equate inspections with quality', () => {
  const ready = Object.values(MOVE_FL_METRIC_DICTIONARY).filter(
    (m) => m.defaultReadiness === 'READY' && m.publicEligibility === 'public'
  );
  assert.ok(ready.length >= 4);
  const im = MOVE_FL_METRIC_DICTIONARY.fl_fdacs_im_active_registrations;
  assert.match(im.limitation, /not .*all florida movers/i);
  assert.equal(im.entityCounted, 'registration');
  assert.equal(MOVE_FL_METRIC_DICTIONARY.fl_hq_publishable_profiles.entityCounted, 'directory_profile');
  assert.equal(MOVE_FL_METRIC_DICTIONARY.fl_inspections.defaultReadiness, 'NOT_READY');
  assert.equal(MOVE_FL_METRIC_DICTIONARY.fl_fdacs_complaints.defaultReadiness, 'NOT_READY');
});

test('complaint and inspection metrics stay off the public page', () => {
  assert.equal(isPublicReady('NOT_READY', 'internal_only'), false);
  assert.equal(isPublicReady('READY', 'public'), true);
  assert.equal(isPublicReady('INTERNAL_ONLY', 'public'), false);
});

test('education covers interstate, carrier/broker, USDOT, deposits, and complaint semantics', () => {
  const ids = new Set(FLORIDA_MOVE_EDUCATION.map((m) => m.id));
  for (const id of [
    'interstate-vs-intrastate',
    'carrier-vs-broker',
    'usdot-mc',
    'florida-registration',
    'deposit-red-flags',
    'complaints-enforcement',
  ]) {
    assert.ok(ids.has(id), id);
  }
  const complaints = FLORIDA_MOVE_EDUCATION.find((m) => m.id === 'complaints-enforcement');
  assert.match(complaints!.body, /not a finding/i);
});

test('source catalog includes FMCSA, FDACS, and transparent FDOT non-contribution', () => {
  const ids = FLORIDA_MOVE_SOURCE_CATALOG.map((s) => s.id);
  assert.ok(ids.includes('fmcsa'));
  assert.ok(ids.includes('fdacs_im'));
  assert.ok(ids.includes('fdacs_mb'));
  const fdot = FLORIDA_MOVE_SOURCE_CATALOG.find((s) => s.id === 'fdot');
  assert.equal(fdot?.observationCount, 0);
  assert.match(fdot!.limitation, /not contributing|not a reason/i);
});

test('HQ metric discloses headquarters is not operating authority', () => {
  const hq = MOVE_FL_METRIC_DICTIONARY.fl_hq_publishable_profiles;
  assert.match(hq.geographicSemantics, /not service area/i);
  assert.match(hq.limitation, /not proof of Florida operating authority/i);
});
