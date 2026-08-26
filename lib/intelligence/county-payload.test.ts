import assert from 'node:assert/strict';
import { test } from 'node:test';
import { FLORIDA_COUNTY_INTEL_CATALOG } from './county-catalog';
import { COUNTY_MOVE_EDUCATION } from './county-education';
import {
  buildCountyMoveIntelligencePayload,
  publicCountyMetrics,
} from './county-payload';
import {
  countyResearchCoverage,
  evaluateEnhancedLocalResearchGate,
  FLORIDA_RESEARCH_COUNTIES,
  isFloridaResearchCounty,
} from './coverage';
import { isPublicReady } from './readiness';

const GENERATED = '2026-08-26T00:00:00.000Z';

function pbcCounts() {
  return {
    published: 11,
    internalOnly: 35,
    total: 46,
    program: {
      agency_name: 'Palm Beach County Public Safety — Consumer Affairs Division',
      program_name: 'Moving Business Permit',
      credential_type: 'Moving business permit',
      source_key: 'pbc-consumer-affairs-moving-business-permit',
      source_url: 'https://discover.pbc.gov/publicsafety/consumeraffairs/Pages/Moving_App.aspx',
      retrieved_at: '2026-08-01T00:00:00.000Z',
      county_name: 'Palm Beach',
    },
  };
}

function mdcCounts() {
  return {
    published: 9,
    internalOnly: 61,
    total: 70,
    program: {
      agency_name:
        'Miami-Dade Department of Regulatory and Economic Resources (RER) — Consumer and Neighborhood Protection Division',
      program_name: 'Moving Business Registration',
      credential_type: 'Miami-Dade Moving Business Registration',
      source_key: 'mdc-moving-business-registration',
      source_url: 'https://energov.miamidade.gov/EnerGov_Prod/SelfService',
      retrieved_at: '2026-08-01T00:00:00.000Z',
      county_name: 'Miami-Dade',
    },
  };
}

test('canonical research counties stay Statewide Research', () => {
  for (const c of FLORIDA_RESEARCH_COUNTIES) {
    assert.equal(isFloridaResearchCounty(c.slug), true);
    assert.equal(countyResearchCoverage(c.slug), 'statewide');
    const payload = buildCountyMoveIntelligencePayload({
      countySlug: c.slug,
      generatedAt: GENERATED,
      timedOut: false,
      counts:
        c.slug === 'palm-beach'
          ? pbcCounts()
          : c.slug === 'miami-dade'
            ? mdcCounts()
            : { published: null, internalOnly: null, total: null, program: null },
    });
    assert.equal(payload.coverageLevel, 'statewide');
    assert.equal(payload.enhancedGateActivated, false);
    assert.equal(payload.enhancedGateDocumented, true);
    assert.equal(payload.canonicalPath, c.href);
  }
});

test('Enhanced gate is documented and stays inactive without operating geography', () => {
  assert.equal(
    evaluateEnhancedLocalResearchGate({
      countyCredentialCensusValidated: true,
      complaintsAttributed: true,
      enforcementFinalDispositionsAttributed: true,
      operatingGeographyProven: false,
      identityReviewed: true,
      publicEligibilityReviewed: true,
    }),
    'statewide'
  );
  assert.equal(
    evaluateEnhancedLocalResearchGate({
      countyCredentialCensusValidated: true,
      complaintsAttributed: true,
      enforcementFinalDispositionsAttributed: true,
      operatingGeographyProven: true,
      identityReviewed: true,
      publicEligibilityReviewed: true,
    }),
    'enhanced'
  );
});

test('countyResearchCoverage is not wired to the Enhanced gate', () => {
  assert.equal(countyResearchCoverage('palm-beach'), 'statewide');
  assert.equal(countyResearchCoverage('miami-dade'), 'statewide');
  assert.equal(countyResearchCoverage('broward'), 'statewide');
  assert.equal(countyResearchCoverage('pinellas'), 'statewide');
});

test('Palm Beach publishes READY credentials and keeps INTERNAL_ONLY off the public surface', () => {
  const payload = buildCountyMoveIntelligencePayload({
    countySlug: 'palm-beach',
    generatedAt: GENERATED,
    timedOut: false,
    counts: pbcCounts(),
  });
  assert.equal(payload.credentials.datasetPresent, true);
  assert.equal(payload.credentials.published, 11);
  assert.equal(payload.credentials.internalOnly, 35);
  assert.equal(payload.credentials.total, 46);
  const pub = publicCountyMetrics(payload);
  assert.equal(pub.length, 1);
  assert.equal(pub[0].id, 'county_published_credentials');
  assert.equal(pub[0].value, 11);
  const internal = payload.metrics.find((m) => m.id === 'county_internal_credentials');
  assert.equal(internal?.readiness, 'INTERNAL_ONLY');
  assert.equal(isPublicReady(internal!.readiness, internal!.publicEligibility), false);
  assert.match(payload.credentials.attribution, /≠ FDACS/i);
  assert.match(payload.credentials.attribution, /≠ company/i);
});

test('Miami-Dade publishes READY credentials distinct from FDACS/FMCSA', () => {
  const payload = buildCountyMoveIntelligencePayload({
    countySlug: 'miami-dade',
    generatedAt: GENERATED,
    timedOut: false,
    counts: mdcCounts(),
  });
  assert.equal(payload.credentials.published, 9);
  assert.equal(payload.credentials.internalOnly, 61);
  assert.equal(payload.credentials.total, 70);
  assert.equal(publicCountyMetrics(payload)[0]?.value, 9);
  assert.match(payload.credentials.attribution, /FMCSA/i);
});

test('Broward and Pinellas do not fake local depth or emit zero credentials', () => {
  for (const slug of ['broward', 'pinellas'] as const) {
    const payload = buildCountyMoveIntelligencePayload({
      countySlug: slug,
      generatedAt: GENERATED,
      timedOut: false,
      counts: { published: 0, internalOnly: 0, total: 0, program: null },
    });
    assert.equal(payload.credentials.datasetPresent, false);
    assert.equal(payload.credentials.published, null);
    assert.equal(payload.credentials.internalOnly, null);
    assert.equal(payload.credentials.total, null);
    assert.equal(publicCountyMetrics(payload).length, 0);
    const published = payload.metrics.find((m) => m.id === 'county_published_credentials');
    assert.equal(published?.readiness, 'NOT_READY');
    assert.equal(published?.value, null);
    assert.match(payload.credentials.attribution, /not zero/i);
    assert.equal(FLORIDA_COUNTY_INTEL_CATALOG[slug].sourceKey, null);
  }
});

test('NOT_READY safety/regulatory metrics stay off the public page', () => {
  const payload = buildCountyMoveIntelligencePayload({
    countySlug: 'broward',
    generatedAt: GENERATED,
    timedOut: false,
    counts: { published: null, internalOnly: null, total: null, program: null },
  });
  for (const id of [
    'county_hq_profiles',
    'county_fdacs_registrations',
    'county_complaints',
    'county_enforcement',
    'county_inspections',
    'county_operating_geography',
    'county_contact_observations',
  ]) {
    const m = payload.metrics.find((row) => row.id === id);
    assert.ok(m, id);
    assert.equal(m!.readiness, 'NOT_READY');
    assert.equal(m!.value, null);
    assert.equal(isPublicReady(m!.readiness, m!.publicEligibility), false);
  }
});

test('upgrade contract modules are present for every county', () => {
  const payload = buildCountyMoveIntelligencePayload({
    countySlug: 'palm-beach',
    generatedAt: GENERATED,
    timedOut: false,
    counts: pbcCounts(),
  });
  const ids = payload.modules.map((m) => m.id);
  for (const id of [
    'county_credentials',
    'county_complaints',
    'enforcement_dispositions',
    'permit_local_credential',
    'county_consumer_affairs',
    'civil_public_regulatory',
    'expanded_contact_observations',
    'operating_activity_evidence',
  ]) {
    assert.ok(ids.includes(id as (typeof ids)[number]), id);
  }
  assert.equal(payload.modules.find((m) => m.id === 'operating_activity_evidence')?.readiness, 'NOT_READY');
});

test('discovery links use canonical county routes and disclose listing semantics', () => {
  const payload = buildCountyMoveIntelligencePayload({
    countySlug: 'broward',
    generatedAt: GENERATED,
    timedOut: false,
    counts: { published: null, internalOnly: null, total: null, program: null },
  });
  assert.equal(payload.discoveryLinks[0]?.href, '/local-movers/florida/broward#movers');
  assert.match(payload.discoveryLinks[0]!.semantics, /not a headquarters/i);
  assert.doesNotMatch(payload.discoveryLinks[0]!.href, /counties=/);
});

test('timeout omits numbers instead of publishing zeros', () => {
  const payload = buildCountyMoveIntelligencePayload({
    countySlug: 'palm-beach',
    generatedAt: GENERATED,
    timedOut: true,
    counts: pbcCounts(),
  });
  assert.equal(payload.timedOut, true);
  assert.equal(payload.metrics.length, 0);
  assert.equal(publicCountyMetrics(payload).length, 0);
  assert.equal(payload.credentials.datasetPresent, false);
});

test('education covers the semantic safety distinctions', () => {
  const ids = new Set(COUNTY_MOVE_EDUCATION.map((m) => m.id));
  for (const id of [
    'hq-vs-service-area',
    'state-registration-vs-company',
    'county-credential-vs-fdacs-fmcsa',
    'complaint-vs-finding',
    'no-dataset-not-zero',
    'inspection-volume-not-quality',
    'internal-only-not-public',
    'statewide-vs-enhanced',
  ]) {
    assert.ok(ids.has(id), id);
  }
  const enhanced = COUNTY_MOVE_EDUCATION.find((m) => m.id === 'statewide-vs-enhanced');
  assert.match(enhanced!.body, /Statewide Research/i);
  assert.match(enhanced!.body, /not Enhanced/i);
});
