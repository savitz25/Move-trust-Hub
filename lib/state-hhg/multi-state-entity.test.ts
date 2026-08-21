import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isAnonymousPublicProfileAllowed } from '@/lib/provider/publication';
import { loadExactCanaryManifests } from '@/lib/state-hhg/canary/manifest';
import {
  MULTI_STATE_GOOGLE_PLACES_REQUESTS,
  MULTI_STATE_RULESET_VERSION,
  actionForResolution,
  classifyMultiStateEntity,
  isGenericEnterpriseEmail,
} from '@/lib/state-hhg/multi-state-entity';
import { isFranchiseOrNetworkBrandName } from '@/lib/state-hhg/normalize';

test('ruleset version and Google constant', () => {
  assert.equal(MULTI_STATE_RULESET_VERSION, 'MULTI_STATE_REGULATED_ENTITY_V1');
  assert.equal(MULTI_STATE_GOOGLE_PLACES_REQUESTS, 0);
});

test('official regulator/filing tie plus exact legal name is SAME_CANONICAL_ENTITY', () => {
  const r = classifyMultiStateEntity({
    subject: { legalName: 'Suddath Moving & Storage, LLC', phone: '9043907100', email: 'legal@suddath.com' },
    candidate: { legalName: 'SUDDATH MOVING & STORAGE LLC', usdot: '3527089', phone: '2537773190', email: 'legal@suddath.com' },
    officialSameEntityTie: true,
  });
  assert.equal(r.state, 'SAME_CANONICAL_ENTITY');
});

test('same legal name + same USDOT is SAME_CANONICAL_ENTITY', () => {
  const r = classifyMultiStateEntity({
    subject: { legalName: 'Suddath Moving & Storage, LLC', usdot: '3527089', phone: '9043907100' },
    candidate: { legalName: 'SUDDATH MOVING & STORAGE LLC', usdot: '3527089', phone: '2537773190' },
    officialSameEntityTie: true,
  });
  assert.equal(r.state, 'SAME_CANONICAL_ENTITY');
  assert.equal(actionForResolution(r.state), 'ATTACH_TO_EXISTING');
});

test('separate legal entities under one brand stay DISTINCT', () => {
  const r = classifyMultiStateEntity({
    subject: {
      legalName: 'Suddath Relocation Systems of St. Petersburg, Inc.',
      email: 'legal@suddath.com',
      usdot: '1018395',
    },
    candidate: {
      legalName: 'Suddath Moving & Storage, LLC',
      email: 'legal@suddath.com',
      usdot: '3527089',
    },
    conflictingUsdot: true,
  });
  assert.equal(r.state, 'DISTINCT_LEGAL_ENTITIES');
  assert.equal(isGenericEnterpriseEmail('legal@suddath.com'), true);
});

test('shared generic email is insufficient', () => {
  const r = classifyMultiStateEntity({
    subject: { legalName: 'Alpha Moving LLC', email: 'legal@suddath.com' },
    candidate: { legalName: 'Beta Moving LLC', email: 'legal@suddath.com' },
  });
  assert.notEqual(r.state, 'SAME_CANONICAL_ENTITY');
  assert.equal(r.state, 'CORPORATE_FAMILY_RELATED');
});

test('shared website/domain-style mailbox without legal match is not same entity', () => {
  const r = classifyMultiStateEntity({
    subject: { legalName: 'Northside Movers Inc', email: 'info@unitedvanlines.com' },
    candidate: { legalName: 'Southside Movers LLC', email: 'info@unitedvanlines.com' },
  });
  assert.notEqual(r.state, 'SAME_CANONICAL_ENTITY');
});

test('franchise/network without USDOT fail-closed', () => {
  assert.equal(isFranchiseOrNetworkBrandName('Two Men and a Truck'), true);
  const r = classifyMultiStateEntity({
    subject: { legalName: 'Two Men and a Truck', dba: 'Two Men and a Truck', phone: '3055551212' },
    candidate: { legalName: 'Two Men and a Truck Tampa', phone: '3055551212' },
  });
  assert.equal(r.state, 'REVIEW_REQUIRED');
});

test('same legal name + generic email only stays REVIEW_REQUIRED', () => {
  const r = classifyMultiStateEntity({
    subject: { legalName: 'Acme Moving LLC', email: 'legal@acme.com' },
    candidate: { legalName: 'Acme Moving LLC', email: 'legal@acme.com' },
  });
  assert.equal(r.state, 'REVIEW_REQUIRED');
  assert.equal(actionForResolution(r.state), 'KEEP_HOLD');
});

test('INGESTED 404 contract and canary preservation constants remain', () => {
  assert.equal(isAnonymousPublicProfileAllowed({ publicationState: 'INGESTED' }), false);
  assert.equal(isAnonymousPublicProfileAllowed({ publicationState: 'PUBLISHABLE' }), true);
  const man = loadExactCanaryManifests();
  assert.equal(man.companyIds.length, 80);
});
