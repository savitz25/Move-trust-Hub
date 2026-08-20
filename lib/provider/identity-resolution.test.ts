import assert from 'node:assert/strict';
import { test } from 'node:test';
import { detectIdentityCollisions } from '@/lib/provider/identity';
import {
  canRenderAuthorityVerifiedBadge,
  chooseCanonicalDuplicateId,
  isHistoricalAuthorityStatus,
  shouldInheritAgentUsdot,
  sharedUsdotRequiresMerge,
  type IdentityResolutionOutcome,
} from '@/lib/provider/identity-resolution';
import { isSeoIndexableCompany, resolvePublicationState } from '@/lib/provider/publication';
import { regulatoryCopyForProvider } from '@/lib/provider/copy';

test('shared placeholder or copied USDOT does not cause automatic company merge', () => {
  const collisions = detectIdentityCollisions([
    { id: 'allied', name: 'Allied Van Lines', usdotNumber: '125563', headquarters: 'Oakbrook Terrace, IL' },
    { id: 'mayflower', name: 'Mayflower Transit', usdotNumber: '125563', headquarters: 'Fenton, MO' },
  ]);
  assert.equal(collisions[0]?.resolution, 'REVIEW_REQUIRED');
  assert.equal(
    sharedUsdotRequiresMerge({
      usdot: '125563',
      legalNames: ['ALLIED VAN LINES INC', 'MAYFLOWER TRANSIT LLC'],
    }),
    false
  );
});

test('brand and legal operating entity can be represented distinctly', () => {
  const outcome: IdentityResolutionOutcome = {
    kind: 'BRAND_WITH_OPERATING_ENTITY',
    publicName: 'Aero Mayflower Transit Company',
    legalName: 'MAYFLOWER TRANSIT LLC',
    usdot: '125563',
  };
  assert.notEqual(outcome.publicName.toUpperCase(), outcome.legalName);
  assert.equal(outcome.kind, 'BRAND_WITH_OPERATING_ENTITY');
});

test('van-line network does not inherit an agent USDOT', () => {
  assert.equal(
    shouldInheritAgentUsdot({
      networkUsdot: '76235',
      agentUsdot: '864601',
    }),
    false
  );
});

test('true duplicate keeps a deterministic canonical identity', () => {
  const canonical = chooseCanonicalDuplicateId(['northern-michigan-moving-2', 'northern-michigan-moving']);
  assert.equal(canonical, 'northern-michigan-moving');
});

test('REVIEW_REQUIRED remains non-indexable', () => {
  const pub = resolvePublicationState({
    serviceScope: 'interstate',
    entityType: 'CARRIER',
    identityReviewRequired: true,
    isVerified: true,
  });
  assert.equal(pub.publicationState, 'REVIEW_REQUIRED');
  assert.equal(pub.indexable, false);
  assert.equal(isSeoIndexableCompany(pub), false);
});

test('VERIFIED capability requires VERIFIED evidence', () => {
  assert.equal(canRenderAuthorityVerifiedBadge('INFERRED'), false);
  assert.equal(canRenderAuthorityVerifiedBadge('REVIEW_REQUIRED'), false);
  assert.equal(canRenderAuthorityVerifiedBadge('VERIFIED'), true);
});

test('INFERRED capability cannot render an Authority Verified badge', () => {
  const copy = regulatoryCopyForProvider(
    {
      serviceScope: 'interstate',
      entityType: 'CARRIER',
      services: ['Carrier'],
      usdotNumber: '76235',
    },
    { evidenceState: 'INFERRED' }
  );
  assert.doesNotMatch(copy.badgeLabel, /authority verified/i);
});

test('historical authority remains distinguishable from current authority', () => {
  assert.equal(isHistoricalAuthorityStatus('inactive'), true);
  assert.equal(isHistoricalAuthorityStatus('revoked'), true);
  assert.equal(isHistoricalAuthorityStatus('active'), false);
});
