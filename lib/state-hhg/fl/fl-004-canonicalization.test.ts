import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isConsumerVisibleCompany, isSeoIndexableCompany } from '@/lib/provider/publication';
import { buildStateOnlyCompanyId, allocateCompanySlug } from '@/lib/state-hhg/canonicalization/ids';
import {
  FL_004_GOOGLE_PLACES_REQUESTS,
  FL_004_INDEXABLE,
  FL_004_PUBLICATION_STATE,
  FL_004_SAFETY,
  assertManifestBound,
  classifyFl004Action,
  fl004PublicExposure,
  freezeFl004Manifest,
  hashFl004Manifest,
  intendedCompanyIdFor,
  neverInventFederalId,
  type EligibilityRow,
} from '@/lib/state-hhg/fl/fl-004';
import { FL_PUBLICATION_RULESET_VERSION } from '@/lib/state-hhg/fl/publication-v1';
import { loadExactCanaryManifests } from '@/lib/state-hhg/canary/manifest';

function ready(overrides: Partial<EligibilityRow> = {}): EligibilityRow {
  return {
    regulatory_id: 'FL-FDACS-IM-3138',
    candidate_company_key: 'fl-im-3138',
    publication_status: 'PUBLICATION_READY',
    eligibility_reason: 'ok',
    legal_name: 'Acceleration Moving Solutions LLC',
    dba: null,
    registration_type: 'IM',
    registration_status: 'active',
    status_raw: 'Registered',
    expiration: '2027-05-08',
    phone: '9415046152',
    email: 'joewolfson5@gmail.com',
    physical_address: '14205 BATHGATE TER',
    city: 'BRADENTON',
    zip: '34202',
    county: 'Manatee',
    county_fips: '12081',
    county_resolution_status: 'COUNTY_VERIFIED',
    existing_company_id: null,
    existing_publication_state: null,
    match_decision: 'NOT_FOUND',
    match_method: 'none',
    collision: 'NONE',
    federal_id_label: 'NO_FEDERAL_ID_IN_CURRENT_MTH_DATA',
    source_provenance: 'fdacs_legacy_xls',
    ruleset_version: FL_PUBLICATION_RULESET_VERSION,
    ...overrides,
  };
}

test('FL-004 uses deterministic fl-im ids and does not invent USDOT', () => {
  assert.equal(intendedCompanyIdFor('FL-FDACS-IM-3138'), 'fl-im-3138');
  assert.equal(buildStateOnlyCompanyId('FL', 'IM3138'), 'fl-im-3138');
  assert.equal(neverInventFederalId('NO_FEDERAL_ID_IN_CURRENT_MTH_DATA'), true);
  assert.equal(neverInventFederalId('NO_USDOT_EXISTS'), false);
});

test('slug collisions disambiguate with authority token', () => {
  const taken = new Set(['acceleration-moving-solutions-llc']);
  const a = allocateCompanySlug({
    displayName: 'Acceleration Moving Solutions LLC',
    stateCode: 'FL',
    authorityNumber: 'IM3138',
    takenSlugs: taken,
  });
  assert.equal(a.collision, true);
  assert.match(a.slug, /fl-im-3138/);
});

test('existing company id collision is not inserted', () => {
  const rows = freezeFl004Manifest([ready()], {
    takenIds: new Set(['fl-im-3138']),
    takenSlugs: new Set(),
  });
  assert.equal(rows[0]?.action, 'SKIP_ALREADY_CANONICAL');
});

test('out-of-state exact match is held, not linked', () => {
  const classified = classifyFl004Action(
    ready({
      publication_status: 'EXISTING_PROVIDER_LINK_CANDIDATE',
      existing_company_id: 'wa-hg-064493',
      match_decision: 'VERIFIED',
      match_method: 'exact_legal_name_and_email',
    })
  );
  assert.equal(classified.action, 'HOLD');
});

test('strong same-state link remains LINK', () => {
  const classified = classifyFl004Action(
    ready({
      publication_status: 'EXISTING_PROVIDER_LINK_CANDIDATE',
      existing_company_id: 'fl-im-3150',
      match_decision: 'VERIFIED',
      match_method: 'exact_legal_name_and_email',
    })
  );
  assert.equal(classified.action, 'LINK');
});

test('name-only is never a link', () => {
  const classified = classifyFl004Action(
    ready({
      publication_status: 'EXISTING_PROVIDER_LINK_CANDIDATE',
      existing_company_id: 'acme',
      match_decision: 'REVIEW_REQUIRED',
      match_method: 'none',
    })
  );
  assert.equal(classified.action, 'HOLD');
});

test('manifest is bound, hashed, INGESTED, not indexable, not consumer-visible', () => {
  const rows = freezeFl004Manifest([ready(), ready({ regulatory_id: 'FL-FDACS-IM-22', legal_name: 'Fuentes Moving Corp.' })], {
    takenIds: new Set(),
    takenSlugs: new Set(),
  });
  assert.equal(rows.length, 2);
  assert.ok(rows.every((r) => r.action === 'INSERT'));
  assert.ok(rows.every((r) => r.publication_state === 'INGESTED'));
  assert.ok(rows.every((r) => r.indexable === false));
  const hash = hashFl004Manifest(rows);
  assert.equal(hash.length, 16);
  assert.deepEqual(hashFl004Manifest(rows), hash);
  const bound = assertManifestBound(
    rows.map((r) => r.intended_company_id),
    rows.map((r) => r.intended_company_id)
  );
  assert.equal(bound.ok, true);
  const leaked = assertManifestBound(['fl-im-999999'], rows.map((r) => r.intended_company_id));
  assert.equal(leaked.ok, false);
  const exposure = fl004PublicExposure({
    publicationState: FL_004_PUBLICATION_STATE,
    indexable: FL_004_INDEXABLE,
  });
  assert.equal(exposure.consumerVisible, false);
  assert.equal(exposure.seoIndexable, false);
  assert.equal(isConsumerVisibleCompany({ publicationState: 'INGESTED' }), false);
  assert.equal(isSeoIndexableCompany({ publicationState: 'INGESTED', indexable: false }), false);
});

test('KEEP_80_NOINDEX canary manifests stay exact 50/30 and indexable false', () => {
  const man = loadExactCanaryManifests();
  assert.equal(man.FL.length, 50);
  assert.equal(man.WA.length, 30);
  assert.equal(man.companyIds.length, 80);
  assert.equal(man.publish, false);
});

test('FL-004 does not change Trust Score, Google, or live publication constants', () => {
  assert.equal(FL_004_GOOGLE_PLACES_REQUESTS, 0);
  assert.equal(FL_004_SAFETY.googlePlacesRequests, 0);
  assert.equal(FL_004_SAFETY.livePublication, false);
  assert.equal(FL_004_SAFETY.trustScoreChanged, false);
  assert.equal(FL_004_SAFETY.canonicalContactsMutated, false);
  assert.equal(FL_004_INDEXABLE, false);
});

test('state-only role is Florida IM, not federal interstate', () => {
  const rows = freezeFl004Manifest([ready()], { takenIds: new Set(), takenSlugs: new Set() });
  assert.equal(rows[0]?.federal_id_label, 'NO_FEDERAL_ID_IN_CURRENT_MTH_DATA');
  assert.equal(rows[0]?.fdacs_im_number.startsWith('IM'), true);
});
