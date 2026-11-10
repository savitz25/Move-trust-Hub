import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { hasCountyServiceEvidence, isPublishableCountyCompany } from './county-evidence';
import { projectPublishedCatalogMovers, type CountyCatalogPublicationRow } from './county-catalog-publication';
import { evaluateCountyIndexabilityFromResult } from './county-indexability';
import { getCounty } from './geography/index';
import { parseHeadquarters } from './parse-headquarters';
import { isPremiumCountyWithinCap } from './premium-county-cap';
import { getAllCountyParams } from './geography/index';
import type { LocalMover } from './types';

const mover = (city: string, headquartersState: string): LocalMover => ({
  id: `fixture-${city}`,
  name: `${city} Mover`,
  rating: 4.8,
  reviewCount: 12,
  shortDescription: '',
  services: ['Local Moving'],
  city,
  headquartersState,
  listingSource: 'directory',
});

test('CITY, ST, ZIP and street variants preserve city and state', () => {
  assert.deepEqual(parseHeadquarters('Jacksonville, FL, 32202').city, 'Jacksonville');
  assert.equal(parseHeadquarters('Jacksonville, FL, 32202').stateCode, 'FL');
  assert.deepEqual(parseHeadquarters('714 SOUTH HILL STREET, LOS ANGELES, CA, 90014').city, 'LOS ANGELES');
  assert.equal(parseHeadquarters('720 Rusk St, Houston, TX 77002').stateCode, 'TX');
  assert.deepEqual(parseHeadquarters('Jacksonville, FL, 32O02').city, 'Jacksonville');
  assert.equal(parseHeadquarters('Jacksonville, FL, 32O02').stateCode, 'FL');
  assert.deepEqual(parseHeadquarters('Jacksonville, ZZ, 32202'), {
    city: 'Jacksonville', stateCode: undefined, cityQuarantined: false,
  });
  assert.equal(parseHeadquarters('Jacksonville, 32202').city, 'Jacksonville');
  assert.equal(parseHeadquarters('Jacksonville, 32202').stateCode, undefined);
  assert.equal(parseHeadquarters(null).stateCode, undefined);
});

test('PR #243 projection stays free of the missing usdot_status column', () => {
  const source = readFileSync('lib/local-movers/approved-county-movers.ts', 'utf8');
  for (const name of ['COMPANY_MOVER_SELECT_FULL', 'COMPANY_MOVER_SELECT_CORE']) {
    const projection = source.match(new RegExp(`const ${name}\\s*=\\s*'([^']+)'`))?.[1];
    assert.ok(projection, name);
    assert.equal(projection.includes('usdot_status'), false, name);
    assert.equal(projection.includes('publication_state'), true, name);
  }
});

test('public county company gate rejects hidden states without treating state-only as federal', () => {
  for (const publication_state of ['INACTIVE', 'REVIEW_REQUIRED', 'INGESTED', 'CLASSIFIED', 'UNKNOWN']) {
    assert.equal(isPublishableCountyCompany({ publication_state }), false, publication_state);
  }
  assert.equal(isPublishableCountyCompany({ publication_state: 'PUBLISHABLE', service_scope: 'intrastate', authority_active: false }), true);
  assert.equal(isPublishableCountyCompany({ publication_state: 'PUBLISHABLE', out_of_service: true }), false);
  assert.equal(isPublishableCountyCompany({ publication_state: null }), true); // legacy federal
});

test('named county selections need individual evidence; Duval rejects Tampa and Orlando', () => {
  const duval = getCounty('florida', 'duval')!;
  assert.equal(hasCountyServiceEvidence(mover('Tampa', 'FL'), duval), false);
  assert.equal(hasCountyServiceEvidence(mover('Orlando', 'FL'), duval), false);
  assert.equal(hasCountyServiceEvidence(mover('Jacksonville', 'NC'), duval), false);
  assert.equal(hasCountyServiceEvidence(mover('Jacksonville', 'FL'), duval), true);
  assert.equal(hasCountyServiceEvidence({ ...mover('', ''), countyEvidence: 'verified_home_county' }, duval), true);
  const duvalCanary = {
    ...mover('', ''), isLocalOnly: true,
    countyEvidence: 'verified_home_county' as const,
  };
  assert.equal(evaluateCountyIndexabilityFromResult('florida', 'duval', {
    county: duval, movers: [duvalCanary], isRegionalFallback: false,
  }).tier, 'index');

  const harris = getCounty('texas', 'harris')!;
  assert.equal(hasCountyServiceEvidence(mover('Houston', 'TX'), harris), true);
  assert.equal(hasCountyServiceEvidence(mover('Dallas', 'TX'), harris), false);
  // A multi-state selection is not proof of local coverage in a different state.
  assert.equal(hasCountyServiceEvidence(mover('Los Angeles', 'CA'), harris), false);
  for (const [state, county, city, hq] of [
    ['texas', 'hays', 'McKinney', 'TX'],
    ['georgia', 'thomas', 'Atlanta', 'GA'],
    ['california', 'los-angeles', 'San Francisco', 'CA'],
  ] as const) {
    assert.equal(hasCountyServiceEvidence(mover(city, hq), getCounty(state, county)!), false);
  }
});

test('live publication rows suppress withdrawn profiles and unsupported county links', () => {
  const county = getCounty('texas', 'harris')!;
  const selected = ['houston', 'review', 'dallas', 'missing'].map((id) => ({
    ...mover('720 Rusk St', 'TX'), id, profileSlug: id,
  }));
  const row = (slug: string, headquarters: string, publication_state = 'PUBLISHABLE'):
    CountyCatalogPublicationRow => ({
      slug, headquarters, publication_state, out_of_service: false,
      authority_active: true, service_scope: 'intrastate',
    });
  const published = projectPublishedCatalogMovers(selected, county, [
    row('houston', '720 Rusk St, Houston, TX, 77002'),
    row('review', 'Houston, TX 77002', 'REVIEW_REQUIRED'),
    row('dallas', 'Dallas, TX 75201'),
  ]);
  assert.deepEqual(published.map((item) => item.profileSlug), ['houston']);
  assert.equal(published[0]?.city, 'Houston');
  assert.equal(published[0]?.headquartersState, 'TX');
});

test('zero evidence noindexes; one qualified mover may index without a three-mover floor', () => {
  const county = getCounty('california', 'los-angeles')!;
  assert.equal(evaluateCountyIndexabilityFromResult('california', 'los-angeles', {
    county, movers: [], isRegionalFallback: false,
  }).tier, 'noindex');
  const decision = evaluateCountyIndexabilityFromResult('california', 'los-angeles', {
    county, movers: [mover('Los Angeles', 'CA')], isRegionalFallback: false,
  });
  assert.equal(decision.tier, 'index');
  assert.equal(decision.seoTier, 2);
  assert.equal(evaluateCountyIndexabilityFromResult('california', 'los-angeles', {
    county, movers: [mover('Los Angeles', 'CA')], isRegionalFallback: false, sourceMode: 'degraded',
  }).tier, 'noindex');
});

test('global Premium allowlist is deterministic and never exceeds 400; Standard is independent', () => {
  const keys = getAllCountyParams().filter(({ stateSlug, countySlug }) =>
    isPremiumCountyWithinCap(stateSlug, countySlug)
  );
  assert.equal(keys.length, 400);
  assert.equal(isPremiumCountyWithinCap('california', 'los-angeles'),
    isPremiumCountyWithinCap('california', 'los-angeles'));
});
