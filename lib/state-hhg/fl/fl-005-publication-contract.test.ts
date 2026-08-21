import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  isAnonymousPublicProfileAllowed,
  isConsumerVisibleCompany,
  isSeoIndexableCompany,
} from '@/lib/provider/publication';
import { loadExactCanaryManifests } from '@/lib/state-hhg/canary/manifest';
import {
  FL_005_GOOGLE_PLACES_REQUESTS,
  FL_FDACS_INTRASTATE_DETAIL,
  floridaFdacsEvidenceBlock,
  isUnsafeFederalAbsenceClaim,
} from '@/lib/state-hhg/fl/profile-presentation';
import { FL_004_SAFETY } from '@/lib/state-hhg/fl/fl-004';

test('INGESTED is excluded from search, sitemap, and anonymous profile', () => {
  const ingested = { publicationState: 'INGESTED' as const, indexable: false };
  assert.equal(isConsumerVisibleCompany(ingested), false);
  assert.equal(isAnonymousPublicProfileAllowed(ingested), false);
  assert.equal(isSeoIndexableCompany(ingested), false);
});

test('PUBLISHABLE canary remains reachable, noindex, sitemap-excluded', () => {
  const canary = { publicationState: 'PUBLISHABLE' as const, indexable: false };
  assert.equal(isAnonymousPublicProfileAllowed(canary), true);
  assert.equal(isConsumerVisibleCompany(canary), true);
  assert.equal(isSeoIndexableCompany(canary), false);
});

test('legacy null publication_state federal/live profiles remain reachable and indexable-eligible', () => {
  const live = { publicationState: null, indexable: null };
  assert.equal(isAnonymousPublicProfileAllowed(live), true);
  assert.equal(isConsumerVisibleCompany(live), true);
  assert.equal(isSeoIndexableCompany(live), true);
});

test('INDEXABLE/VERIFIED public profiles are unaffected', () => {
  assert.equal(isAnonymousPublicProfileAllowed({ publicationState: 'INDEXABLE' }), true);
  assert.equal(isAnonymousPublicProfileAllowed({ publicationState: 'VERIFIED' }), true);
  assert.equal(
    isSeoIndexableCompany({ publicationState: 'INDEXABLE', indexable: true }),
    true
  );
});

test('KEEP_80_NOINDEX canary manifests stay 50/30', () => {
  const man = loadExactCanaryManifests();
  assert.equal(man.FL.length, 50);
  assert.equal(man.WA.length, 30);
  assert.equal(man.companyIds.length, 80);
});

test('FDACS copy never claims no USDOT exists and is not an endorsement', () => {
  const block = floridaFdacsEvidenceBlock({
    authorityNumber: 'IM3138',
    status: 'active',
  });
  assert.equal(block.endorsement, false);
  assert.equal(block.federalIdClaim, 'NO_FEDERAL_ID_IN_CURRENT_MTH_DATA');
  assert.equal(isUnsafeFederalAbsenceClaim(block.detail), false);
  assert.match(FL_FDACS_INTRASTATE_DETAIL, /not FMCSA interstate/i);
  assert.equal(FL_005_GOOGLE_PLACES_REQUESTS, 0);
  assert.equal(FL_004_SAFETY.canonicalContactsMutated, false);
  assert.equal(FL_004_SAFETY.trustScoreChanged, false);
});
