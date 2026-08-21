import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CANONICAL_CONTACT_FIELDS_NEVER_TOUCHED } from '@/lib/state-hhg/contact-observation';
import {
  FL_003_SAFETY,
  FL_PUBLICATION_RULESET_VERSION,
  detectFdacsDuplicateGroups,
  federalIdLabelFor,
  qualifyFloridaPublicationCandidate,
  type QualificationInput,
} from '@/lib/state-hhg/fl/publication-v1';
import {
  buildFloridaZipCountyIndex,
  resolveFloridaCounty,
  type ZipCountyIndex,
} from '@/lib/state-hhg/fl/zip-county';

function mover(overrides: Partial<QualificationInput> = {}): QualificationInput {
  return {
    regulatoryId: 'FL-FDACS-IM-2736',
    licenseType: 'IM',
    status: 'active',
    legalName: 'Sunshine Relocation LLC',
    physicalStreet: '100 Main Street',
    physicalCity: 'Tallahassee',
    physicalState: 'FL',
    physicalPostalCode: '32301',
    physicalAddress: '100 Main Street, Tallahassee, FL 32301',
    phone: '8505551212',
    email: 'ops@sunshinerelocation.com',
    matchDecision: 'NOT_FOUND',
    ...overrides,
  };
}

const zipIndex: ZipCountyIndex = {
  builtFromCacheEntries: 2,
  uniqueZips: 2,
  uniqueCountyZips: 1,
  multiCountyZips: 1,
  addressHits: 1,
  byZip: {
    '32301': { counties: ['Leon'], fips: ['12073'] },
    '33401': { counties: ['Palm Beach', 'Broward'], fips: ['12099', '12011'] },
  },
  byNormalizedAddress: {
    '100 MAIN ST TALLAHASSEE FL 32301': { county: 'Leon', fips: '12073' },
  },
};

test('ruleset version is FL_HHG_PUBLICATION_V1', () => {
  const result = qualifyFloridaPublicationCandidate(mover(), {
    county: resolveFloridaCounty({ zip: '32301', index: zipIndex }),
  });
  assert.equal(result.rulesetVersion, 'FL_HHG_PUBLICATION_V1');
  assert.equal(FL_PUBLICATION_RULESET_VERSION, 'FL_HHG_PUBLICATION_V1');
});

test('active IM with identity + unique ZIP is PUBLICATION_READY', () => {
  const result = qualifyFloridaPublicationCandidate(mover(), {
    county: resolveFloridaCounty({ zip: '32301', city: 'Tallahassee', index: zipIndex }),
  });
  assert.equal(result.cohort, 'PUBLICATION_READY');
  assert.equal(result.county.confidence, 'COUNTY_VERIFIED');
  assert.equal(result.county.county, 'Leon');
});

test('MB-only records are excluded from the mover cohort', () => {
  const result = qualifyFloridaPublicationCandidate(
    mover({ regulatoryId: 'FL-FDACS-MB-165', licenseType: 'MB' }),
    { county: resolveFloridaCounty({ zip: '32301', index: zipIndex }) }
  );
  assert.equal(result.cohort, 'BROKER_ONLY');
});

test('expired registrations are historical, not publication-ready', () => {
  const result = qualifyFloridaPublicationCandidate(mover({ status: 'expired' }), {
    county: resolveFloridaCounty({ zip: '32301', index: zipIndex }),
  });
  assert.equal(result.cohort, 'HISTORICAL');
});

test('unknown status is blocked', () => {
  const result = qualifyFloridaPublicationCandidate(mover({ status: 'unknown' }), {
    county: resolveFloridaCounty({ zip: '32301', index: zipIndex }),
  });
  assert.equal(result.cohort, 'STATUS_BLOCKED');
});

test('shared phone across different legal names is review, not auto-merged', () => {
  const a = mover({ regulatoryId: 'FL-FDACS-IM-1', legalName: 'Alpha Moving LLC', phone: '8505551212' });
  const b = mover({ regulatoryId: 'FL-FDACS-IM-2', legalName: 'Beta Moving LLC', phone: '8505551212' });
  const groups = detectFdacsDuplicateGroups([a, b]);
  const probable = groups.find((g) => g.kind === 'probable');
  assert.ok(probable);
  const result = qualifyFloridaPublicationCandidate(
    { ...b, duplicateGroupId: probable.id, duplicateKind: 'probable', duplicateSurvivor: false },
    { county: resolveFloridaCounty({ zip: '32301', index: zipIndex }) }
  );
  assert.equal(result.cohort, 'REVIEW_REQUIRED');
});

test('duplicate legal name + address is held', () => {
  const a = mover({ regulatoryId: 'FL-FDACS-IM-1' });
  const b = mover({ regulatoryId: 'FL-FDACS-IM-2' });
  const groups = detectFdacsDuplicateGroups([a, b]);
  assert.equal(groups.some((g) => g.kind === 'definite'), true);
  const result = qualifyFloridaPublicationCandidate(
    { ...b, duplicateGroupId: 'dup-1', duplicateKind: 'definite', duplicateSurvivor: false },
    { county: resolveFloridaCounty({ zip: '32301', index: zipIndex }) }
  );
  assert.equal(result.cohort, 'DUPLICATE_OR_OVERLAP');
});

test('existing-provider exact match becomes a link candidate, not a new company', () => {
  const result = qualifyFloridaPublicationCandidate(
    mover({
      existingCompanyId: 'acme-movers',
      alreadyLinkedViaAuthority: false,
      matchDecision: 'VERIFIED',
      matchMethod: 'exact_legal_name_and_address',
    }),
    { county: resolveFloridaCounty({ zip: '32301', index: zipIndex }) }
  );
  assert.equal(result.cohort, 'EXISTING_PROVIDER_LINK_CANDIDATE');
});

test('franchise brand without USDOT is never unique identity', () => {
  const result = qualifyFloridaPublicationCandidate(
    mover({
      legalName: 'NBF Moving LLC',
      dbaName: 'Two Men and a Truck',
      usdotNumber: null,
    }),
    { county: resolveFloridaCounty({ zip: '32301', index: zipIndex }) }
  );
  assert.equal(result.cohort, 'INSUFFICIENT_IDENTITY');
  assert.equal(result.collision, 'FRANCHISE_WITHOUT_USDOT');
});

test('College Hunks without USDOT is fail-closed', () => {
  const result = qualifyFloridaPublicationCandidate(
    mover({ legalName: 'College Hunks Hauling Junk', usdotNumber: null }),
    { county: resolveFloridaCounty({ zip: '32301', index: zipIndex }) }
  );
  assert.equal(result.cohort, 'INSUFFICIENT_IDENTITY');
});

test('unique ZIP is COUNTY_VERIFIED; multi-county ZIP is COUNTY_REVIEW_REQUIRED', () => {
  const unique = resolveFloridaCounty({ zip: '32301', index: zipIndex });
  assert.equal(unique.confidence, 'COUNTY_VERIFIED');
  const multi = resolveFloridaCounty({ zip: '33401', index: zipIndex });
  assert.equal(multi.confidence, 'COUNTY_REVIEW_REQUIRED');
  const cityOnly = resolveFloridaCounty({ city: 'Spring Hill', index: zipIndex });
  assert.equal(cityOnly.confidence, 'COUNTY_REVIEW_REQUIRED');
});

test('missing ZIP with no address cache hit is COUNTY_UNRESOLVED', () => {
  const unresolved = resolveFloridaCounty({ index: zipIndex });
  assert.equal(unresolved.confidence, 'COUNTY_UNRESOLVED');
});

test('missing website does not block publication-ready', () => {
  const result = qualifyFloridaPublicationCandidate(mover({ website: null }), {
    county: resolveFloridaCounty({ zip: '32301', index: zipIndex }),
  });
  assert.equal(result.cohort, 'PUBLICATION_READY');
  assert.equal(result.websiteRequired, false);
});

test('missing email does not block when identity and location are complete', () => {
  const result = qualifyFloridaPublicationCandidate(mover({ email: null }), {
    county: resolveFloridaCounty({ zip: '32301', index: zipIndex }),
  });
  assert.equal(result.cohort, 'PUBLICATION_READY');
  assert.equal(result.emailRequired, false);
});

test('state-only company is allowed without federal identity', () => {
  const result = qualifyFloridaPublicationCandidate(mover({ usdotNumber: null, mcNumber: null }), {
    county: resolveFloridaCounty({ zip: '32301', index: zipIndex }),
  });
  assert.equal(result.cohort, 'PUBLICATION_READY');
  assert.equal(result.fmcsaRequired, false);
  assert.equal(result.federalIdLabel, 'NO_FEDERAL_ID_IN_CURRENT_MTH_DATA');
  assert.equal(
    result.reasons.some((r) => r.includes('not treated as proof that no USDOT exists')),
    true
  );
});

test('federal absence is labeled, not a violation', () => {
  assert.equal(federalIdLabelFor({ usdotNumber: null, mcNumber: null }), 'NO_FEDERAL_ID_IN_CURRENT_MTH_DATA');
  assert.equal(federalIdLabelFor({ usdotNumber: '1234567' }), 'FEDERAL_ID_VERIFIED');
  assert.notEqual(federalIdLabelFor({ usdotNumber: null }), 'FEDERAL_ID_VERIFIED');
});

test('no live publication, no canonical contact mutation, no Google API requests', () => {
  assert.equal(FL_003_SAFETY.livePublication, false);
  assert.equal(FL_003_SAFETY.canonicalContactsMutated, false);
  assert.equal(FL_003_SAFETY.googlePlacesRequests, 0);
  assert.equal(FL_003_SAFETY.trustScoreChanged, false);
  assert.deepEqual(CANONICAL_CONTACT_FIELDS_NEVER_TOUCHED, [
    'companies.email',
    'companies.phone',
    'companies.physical_address',
  ]);
  const result = qualifyFloridaPublicationCandidate(mover(), {
    county: resolveFloridaCounty({ zip: '32301', index: zipIndex }),
  });
  assert.equal(result.googlePlacesRequests, 0);
});

test('buildFloridaZipCountyIndex reads Census MATCH rows only', () => {
  const index = buildFloridaZipCountyIndex({
    '100 MAIN ST, TALLAHASSEE, FL, 32301': {
      status: 'MATCH',
      countyFips: '12073',
      stateFips: '12',
      matchedAddress: '100 MAIN ST, TALLAHASSEE, FL, 32301',
    },
    '1 FAKE ST, TALLAHASSEE, FL, 32301': {
      status: 'NO_MATCH',
      countyFips: null,
      stateFips: null,
      matchedAddress: null,
    },
  });
  assert.equal(index.uniqueCountyZips, 1);
  assert.equal(index.byZip['32301']?.counties[0], 'Leon');
});
