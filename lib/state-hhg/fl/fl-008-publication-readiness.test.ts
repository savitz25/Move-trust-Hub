import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import {
  isAnonymousPublicProfileAllowed,
  isConsumerVisibleCompany,
  isSeoIndexableCompany,
} from '@/lib/provider/publication';
import { loadExactCanaryManifests } from '@/lib/state-hhg/canary/manifest';
import {
  FL_005_GOOGLE_PLACES_REQUESTS,
  FL_FDACS_EMAIL_SOURCE_LABEL,
  FL_FDACS_PHONE_SOURCE_LABEL,
  FL_FDACS_ADDRESS_SOURCE_LABEL,
  FL_NO_FEDERAL_ID_IN_MTH_DATA,
  FL_STATE_ONLY_REGISTRATION_COPY,
  FL_FDACS_SCOPE_EXPLANATION,
  floridaFdacsEvidenceBlock,
  floridaFederalPlusStatePresentation,
  isUnsafeEndorsementCopy,
  isUnsafeFederalAbsenceClaim,
} from '@/lib/state-hhg/fl/profile-presentation';
import {
  FL_008_GOOGLE_PLACES_REQUESTS,
  FL_008_POST_FL004_ADDITIONS,
  FL_STATE_PUBLICATION_READINESS_V1,
  FL_STATE_WAVE_1,
  assessStatusFreshness,
  buildFl008Cohort,
  evaluateConsumerValue,
  evaluatePresentationLayout,
  hashFl008Manifest,
  qualifyFloridaPublicationReadiness,
  simulatePublishableNoindexSurface,
  simulateStateOnlyStructuredData,
  type Fl008CandidateSeed,
  type ReadinessInput,
} from '@/lib/state-hhg/fl/publication-readiness';
import type { Fl004ManifestRow } from '@/lib/state-hhg/fl/fl-004';

const AS_OF = '2026-08-21';

function ready(overrides: Partial<ReadinessInput> = {}): ReadinessInput {
  return {
    companyId: 'fl-im-1025',
    slug: 'gentletouch-moving-company',
    displayName: 'Gentletouch Moving Company',
    legalName: 'CHARLES L CARTER',
    publicationState: 'INGESTED',
    indexable: false,
    fdacsRegulatoryId: 'FL-FDACS-IM-1025',
    fdacsAuthorityNumber: 'IM1025',
    authorityType: 'intrastate_mover_registration',
    authorityStatus: 'active',
    regulator: 'FDACS',
    sourceProvenance: 'fdacs_legacy_xls',
    retrievedAt: '2026-08-21T17:11:52.759Z',
    expiration: '2027-06-01',
    physicalStreet: '1900 FLORA RD',
    city: 'CLEARWATER',
    state: 'FL',
    zip: '33755',
    county: 'Pinellas',
    countyFips: '12103',
    countyVerification: 'COUNTY_VERIFIED',
    phoneObservation: true,
    emailObservation: true,
    addressObservation: true,
    canonicalPhone: '7274460712',
    canonicalEmail: 'deb2chuck@msn.com',
    usdot: null,
    mcNumber: null,
    unresolvedDuplicate: false,
    unresolvedMultiStateCollision: false,
    brandOnlyIdentity: false,
    corporateFamilyDeferral: false,
    currentlyInCanary: false,
    cohortOrigin: 'FL-004',
    asOf: AS_OF,
    ...overrides,
  };
}

test('ruleset version and Google/Trust Score freeze constants', () => {
  assert.equal(FL_STATE_PUBLICATION_READINESS_V1, 'FL_STATE_PUBLICATION_READINESS_V1');
  assert.equal(FL_008_GOOGLE_PLACES_REQUESTS, 0);
  assert.equal(FL_005_GOOGLE_PLACES_REQUESTS, 0);
  const r = qualifyFloridaPublicationReadiness(ready());
  assert.equal(r.googlePlacesRequests, 0);
  assert.equal(r.trustScoreChanged, false);
  assert.equal(r.publicationMutation, false);
});

test('exact legal name + identity/authority/geo/phone is READY_FOR_PUBLISHABLE_CANARY', () => {
  const r = qualifyFloridaPublicationReadiness(ready());
  assert.equal(r.state, 'READY_FOR_PUBLISHABLE_CANARY');
  assert.equal(r.statusFreshness, 'STATUS_FRESH');
  assert.equal(r.consumerValue, 'SUFFICIENT');
  assert.ok(r.reasons.some((x) => /intrastate mover registration/i.test(x)));
});

test('missing slug or company id is NOT_ELIGIBLE', () => {
  assert.equal(
    qualifyFloridaPublicationReadiness(ready({ slug: null })).state,
    'NOT_ELIGIBLE'
  );
  assert.equal(
    qualifyFloridaPublicationReadiness(ready({ companyId: '' })).state,
    'NOT_ELIGIBLE'
  );
});

test('inactive or non-IM authority is NOT_ELIGIBLE', () => {
  assert.equal(
    qualifyFloridaPublicationReadiness(ready({ authorityStatus: 'expired' })).state,
    'NOT_ELIGIBLE'
  );
  assert.equal(
    qualifyFloridaPublicationReadiness(
      ready({ authorityType: 'moving_broker_registration', fdacsAuthorityNumber: 'MB12' })
    ).state,
    'NOT_ELIGIBLE'
  );
});

test('already PUBLISHABLE or indexable true is NOT_ELIGIBLE for this gate', () => {
  assert.equal(
    qualifyFloridaPublicationReadiness(ready({ publicationState: 'PUBLISHABLE' })).state,
    'NOT_ELIGIBLE'
  );
  assert.equal(
    qualifyFloridaPublicationReadiness(ready({ indexable: true })).state,
    'NOT_ELIGIBLE'
  );
});

test('unresolved duplicate or multi-state collision is REVIEW_REQUIRED', () => {
  assert.equal(
    qualifyFloridaPublicationReadiness(ready({ unresolvedDuplicate: true })).state,
    'REVIEW_REQUIRED'
  );
  assert.equal(
    qualifyFloridaPublicationReadiness(ready({ unresolvedMultiStateCollision: true })).state,
    'REVIEW_REQUIRED'
  );
});

test('brand-only identity is REVIEW_REQUIRED', () => {
  assert.equal(
    qualifyFloridaPublicationReadiness(ready({ brandOnlyIdentity: true })).state,
    'REVIEW_REQUIRED'
  );
});

test('county not COUNTY_VERIFIED fails closed', () => {
  assert.equal(
    qualifyFloridaPublicationReadiness(ready({ countyVerification: 'COUNTY_UNRESOLVED' })).state,
    'REVIEW_REQUIRED'
  );
  assert.equal(
    qualifyFloridaPublicationReadiness(
      ready({ county: null, countyFips: null, countyVerification: 'COUNTY_REVIEW_REQUIRED' })
    ).state,
    'REVIEW_REQUIRED'
  );
});

test('incomplete geography fails closed', () => {
  assert.equal(
    qualifyFloridaPublicationReadiness(ready({ physicalStreet: null })).state,
    'REVIEW_REQUIRED'
  );
  assert.equal(
    qualifyFloridaPublicationReadiness(ready({ city: null })).state,
    'REVIEW_REQUIRED'
  );
  assert.equal(
    qualifyFloridaPublicationReadiness(ready({ zip: null })).state,
    'REVIEW_REQUIRED'
  );
  assert.equal(
    qualifyFloridaPublicationReadiness(ready({ state: 'WA' })).state,
    'REVIEW_REQUIRED'
  );
});

test('name + permit + address without phone and email is HOLD_PROFILE_THIN', () => {
  const r = qualifyFloridaPublicationReadiness(
    ready({
      phoneObservation: false,
      emailObservation: false,
      canonicalPhone: null,
      canonicalEmail: null,
    })
  );
  assert.equal(r.state, 'HOLD_PROFILE_THIN');
  assert.equal(r.consumerValue, 'THIN');
});

test('phone is usability not a legal eligibility requirement when email exists', () => {
  const r = qualifyFloridaPublicationReadiness(
    ready({ phoneObservation: false, canonicalPhone: null, emailObservation: true })
  );
  assert.equal(r.state, 'READY_FOR_PUBLISHABLE_CANARY');
});

test('Suddath corporate-family dual-credential first wave is DEFERRED', () => {
  const r = qualifyFloridaPublicationReadiness(
    ready({
      companyId: 'fl-im-4099',
      slug: 'suddath-relocation-systems-of-st-petersburg-inc',
      legalName: 'SUDDATH RELOCATION SYSTEMS OF ST. PETERSBURG, INC.',
      fdacsRegulatoryId: 'FL-FDACS-IM-4099',
      fdacsAuthorityNumber: 'IM4099',
      usdot: '1018395',
      corporateFamilyDeferral: true,
      cohortOrigin: 'FL-006',
    })
  );
  assert.equal(r.state, 'DEFERRED');
  assert.ok(r.reasons.some((x) => /corporate family/i.test(x)));
});

test('expired FDACS status is STATUS_REFRESH_REQUIRED and not READY', () => {
  assert.equal(assessStatusFreshness({ status: 'active', expiration: '2026-01-01', retrievedAt: '2026-08-21T00:00:00Z', asOf: AS_OF }), 'STATUS_REFRESH_REQUIRED');
  const r = qualifyFloridaPublicationReadiness(ready({ expiration: '2026-01-01' }));
  assert.equal(r.statusFreshness, 'STATUS_REFRESH_REQUIRED');
  assert.equal(r.state, 'NOT_ELIGIBLE');
});

test('fresh active registration with future expiration is STATUS_FRESH', () => {
  assert.equal(
    assessStatusFreshness({
      status: 'active',
      expiration: '2027-06-01',
      retrievedAt: '2026-08-21T17:11:52.759Z',
      asOf: AS_OF,
    }),
    'STATUS_FRESH'
  );
});

test('stale snapshot without recent retrieval is STATUS_REFRESH_REQUIRED', () => {
  assert.equal(
    assessStatusFreshness({
      status: 'active',
      expiration: '2027-06-01',
      retrievedAt: '2024-01-01T00:00:00Z',
      asOf: AS_OF,
    }),
    'STATUS_REFRESH_REQUIRED'
  );
});

test('consumer value: name+permit+address+phone is sufficient for noindex canary, not for INDEXABLE', () => {
  assert.equal(evaluateConsumerValue(ready()), 'SUFFICIENT');
  const thin = evaluateConsumerValue(
    ready({ phoneObservation: false, emailObservation: false, canonicalPhone: null, canonicalEmail: null })
  );
  assert.equal(thin, 'THIN');
});

test('INGESTED remains 404 / search-excluded / sitemap-excluded', () => {
  const ingested = { publicationState: 'INGESTED' as const, indexable: false };
  assert.equal(isAnonymousPublicProfileAllowed(ingested), false);
  assert.equal(isConsumerVisibleCompany(ingested), false);
  assert.equal(isSeoIndexableCompany(ingested), false);
});

test('hypothetical PUBLISHABLE + indexable=false renders, noindex, sitemap-excluded', () => {
  const sim = simulatePublishableNoindexSurface({
    publicationState: 'PUBLISHABLE',
    indexable: false,
  });
  assert.equal(sim.anonymousProfileRenders, true);
  assert.equal(sim.robots, 'noindex, follow');
  assert.equal(sim.sitemapIncluded, false);
  assert.equal(sim.seoIndexable, false);
  assert.equal(sim.directorySearchIncluded, true);
  assert.equal(sim.authorizedDiscoveryOnly, true);
  assert.equal(sim.indexableFlag, false);
  assert.equal(
    isSeoIndexableCompany({ publicationState: 'PUBLISHABLE', indexable: false }),
    false
  );
});

test('PUBLISHABLE readiness is not INDEXABLE readiness', () => {
  const r = qualifyFloridaPublicationReadiness(ready());
  assert.equal(r.state, 'READY_FOR_PUBLISHABLE_CANARY');
  assert.equal(r.indexableAuthorized, false);
  assert.equal(FL_STATE_WAVE_1.indexable, false);
});

test('state-only copy never claims no USDOT exists and is not an endorsement', () => {
  assert.match(FL_STATE_ONLY_REGISTRATION_COPY, /intrastate household-goods mover/i);
  assert.match(FL_FDACS_SCOPE_EXPLANATION, /within Florida/i);
  assert.equal(isUnsafeFederalAbsenceClaim(FL_NO_FEDERAL_ID_IN_MTH_DATA), false);
  assert.equal(isUnsafeFederalAbsenceClaim('no USDOT exists'), true);
  assert.equal(isUnsafeEndorsementCopy('Registration verified from Florida FDACS records'), false);
  assert.equal(isUnsafeEndorsementCopy('Certified by TrustHub'), true);
  assert.equal(isUnsafeEndorsementCopy('Approved mover'), true);
  const block = floridaFdacsEvidenceBlock({
    authorityNumber: 'IM1025',
    status: 'active',
    retrievedAt: '2026-08-21T17:11:52.759Z',
  });
  assert.equal(block.endorsement, false);
  assert.equal(block.registrationType, 'Intrastate Mover');
  assert.match(block.verificationWording, /Registration verified from Florida FDACS records/i);
});

test('federal + state credentials stay separate', () => {
  const both = floridaFederalPlusStatePresentation({
    fdacsNumber: 'IM4099',
    fdacsStatus: 'active',
    usdot: '1018395',
    mcNumber: '425403',
  });
  assert.ok(both.federal);
  assert.ok(both.florida);
  assert.equal(both.floridaImpliesFederal, false);
  assert.equal(both.federalImpliesFlorida, false);
  assert.notEqual(both.florida.registrationNumber, both.federal?.usdot);
});

test('contact source labels stay FDACS-observation specific', () => {
  assert.match(FL_FDACS_PHONE_SOURCE_LABEL, /Florida FDACS registration/i);
  assert.match(FL_FDACS_EMAIL_SOURCE_LABEL, /Florida FDACS registration/i);
  assert.match(FL_FDACS_ADDRESS_SOURCE_LABEL, /Florida FDACS registration/i);
});

test('structured data omits ratings, federal IDs, and service areas when unevidenced', () => {
  const sd = simulateStateOnlyStructuredData({
    name: 'Gentletouch Moving Company',
    slug: 'gentletouch-moving-company',
    street: '1900 FLORA RD',
    city: 'CLEARWATER',
    state: 'FL',
    zip: '33755',
    phone: '7274460712',
    usdot: null,
    reviewCount: 0,
    avgRating: 0,
    fdacsNumber: 'IM1025',
    serviceAreaClaimed: false,
  });
  assert.equal(sd.ok, true);
  assert.equal(sd.hasAggregateRating, false);
  assert.equal(sd.hasUsdot, false);
  assert.equal(sd.hasAreaServed, false);
  assert.equal(sd.hasFdacsRegistration, true);
});

test('structured data is unsafe if it would emit ratings or unevidenced USDOT', () => {
  const bad = simulateStateOnlyStructuredData({
    name: 'Example',
    slug: 'example',
    street: '1 Main',
    city: 'Miami',
    state: 'FL',
    zip: '33101',
    phone: null,
    usdot: null,
    reviewCount: 4,
    avgRating: 4.5,
    fdacsNumber: 'IM1',
    serviceAreaClaimed: true,
    emitUnsupportedRating: true,
    emitUnevidencedUsdot: '9999999',
  });
  assert.equal(bad.ok, false);
  assert.ok(bad.bannedClaims.includes('aggregate_rating'));
  assert.ok(bad.bannedClaims.includes('unevidenced_usdot'));
  assert.ok(bad.bannedClaims.includes('unevidenced_area_served'));
});

test('KEEP_80_NOINDEX canary manifests stay 50/30 and are not mutated by the ruleset', () => {
  const man = loadExactCanaryManifests();
  assert.equal(man.FL.length, 50);
  assert.equal(man.WA.length, 30);
  assert.equal(man.companyIds.length, 80);
});

test('cohort is bounded to FL-004 INSERT plus explicit post-FL-004 additions', () => {
  const manifest = JSON.parse(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fl-004-canonicalization-manifest.json'), 'utf8')
  ) as { rows: Fl004ManifestRow[] };
  const seeds = buildFl008Cohort(manifest.rows, FL_008_POST_FL004_ADDITIONS);
  const inserts = manifest.rows.filter((r) => r.action === 'INSERT');
  assert.equal(inserts.length, 37);
  assert.equal(seeds.filter((s) => s.cohortOrigin === 'FL-004').length, 37);
  assert.ok(seeds.some((s) => s.companyId === 'fl-im-4099' && s.cohortOrigin === 'FL-006'));
  assert.equal(seeds.length, 38);
  assert.ok(seeds.every((s) => s.companyId.startsWith('fl-im-')));
  assert.ok(!seeds.some((s) => s.companyId === 'fl-im-350'));
});

test('older INGESTED fl-im records are excluded unless on the allowlist', () => {
  const rogue: Fl004ManifestRow[] = [];
  const seeds = buildFl008Cohort(rogue, ['fl-im-2736', 'fl-im-4099']);
  assert.deepEqual(
    seeds.map((s) => s.companyId),
    ['fl-im-4099']
  );
});

test('manifest hash is deterministic', () => {
  const rows: Fl008CandidateSeed[] = [
    { companyId: 'fl-im-1025', regulatoryId: 'FL-FDACS-IM-1025', cohortOrigin: 'FL-004' },
    { companyId: 'fl-im-4099', regulatoryId: 'FL-FDACS-IM-4099', cohortOrigin: 'FL-006' },
  ];
  assert.equal(hashFl008Manifest(rows), hashFl008Manifest([...rows].reverse()));
  assert.notEqual(
    hashFl008Manifest(rows),
    hashFl008Manifest([{ companyId: 'fl-im-22', regulatoryId: 'FL-FDACS-IM-22', cohortOrigin: 'FL-004' }])
  );
});

test('presentation layout flags long names and missing status, not overflow of required labels', () => {
  const long = evaluatePresentationLayout({
    displayName: 'DOUG\'S HOURLY MUSCLE MOVERS & PACKERS, INC.',
    hasEmail: true,
    hasPhone: true,
    address: '3200 61ST ST E, PALMETTO, FL 34221',
    fdacsNumber: 'IM410',
    usdot: null,
    statusLabel: 'Registered / Active',
    viewport: 'mobile',
  });
  assert.equal(long.overflowRisk, true);
  assert.equal(long.confusingLabels, false);
  assert.equal(long.duplicatedCredentials, false);
  const dup = evaluatePresentationLayout({
    displayName: 'Ace',
    hasEmail: false,
    hasPhone: true,
    address: '1 Main',
    fdacsNumber: 'IM350',
    usdot: '1052359',
    statusLabel: 'Registered / Active',
    viewport: 'desktop',
    showUsdotAsFdacs: true,
  });
  assert.equal(dup.duplicatedCredentials, true);
});
