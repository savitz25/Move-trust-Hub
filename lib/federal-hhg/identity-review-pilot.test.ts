import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  independentlyConfirmDistinct,
  resolveIdentityPilot,
  resolutionDoesNotPublish,
  selectIdentityReviewPilot,
  type ExistingIdentity,
  type PilotCandidate,
} from '@/lib/federal-hhg/identity-review-pilot';
import { WAVE_2_PUBLICATION_ID, WAVE_3_PUBLICATION_ID, WAVE_ID } from '@/lib/federal-hhg/wave-eligibility';
import { TASK_002_PROTECTED_IDENTITIES } from '@/lib/federal-hhg/protected-identities';

function existing(partial: Partial<ExistingIdentity> = {}): ExistingIdentity {
  return {
    id: 'acme-boise',
    slug: 'acme-movers-boise',
    name: 'Acme Movers',
    usdot: '1000001',
    mc: '2000001',
    city: 'Boise',
    state: 'ID',
    phone: '2085550100',
    ...partial,
  };
}

function candidate(partial: Partial<PilotCandidate> = {}): PilotCandidate {
  return {
    usdot: '6000001',
    mc: '3000001',
    legalName: 'ACME MOVERS LLC',
    dbaName: null,
    city: 'Tampa',
    state: 'FL',
    phone: '8135550199',
    classification: 'HHG_CARRIER',
    disposition: 'IDENTITY_REVIEW_REQUIRED',
    matchReason: 'name similarity only — not a canonical match',
    hhgCarrierVerified: true,
    hhgBrokerVerified: false,
    matchedExisting: [existing()],
    ...partial,
  };
}

const universe = {
  existingUsdots: new Set(['1000001', '76235', '125563']),
  existingMcs: new Set(['2000001']),
};

test('identity-review pilot is non-public even when resolved distinct', () => {
  const result = resolveIdentityPilot(candidate(), universe);
  assert.equal(result.resolution, 'RESOLVED_DISTINCT');
  assert.equal(result.public, false);
  assert.equal(result.indexable, false);
  assert.equal(resolutionDoesNotPublish(result), true);
});

test('RESOLVED_DISTINCT does not become indexable', () => {
  const result = resolveIdentityPilot(candidate(), universe);
  assert.equal(result.eligibleForCanonicalization, true);
  assert.equal(result.indexable, false);
});

test('different USDOT alone is insufficient', () => {
  const result = resolveIdentityPilot(
    candidate({ city: '', state: '', matchedExisting: [existing({ city: '', state: '' })] }),
    universe
  );
  assert.notEqual(result.resolution, 'RESOLVED_DISTINCT');
  assert.equal(result.eligibleForCanonicalization, false);
});

test('different HQ alone is insufficient', () => {
  const result = resolveIdentityPilot(candidate({ usdot: '', hhgCarrierVerified: false }), universe);
  assert.notEqual(result.resolution, 'RESOLVED_DISTINCT');
});

test('exact MC collision blocks resolved-distinct', () => {
  const result = resolveIdentityPilot(candidate({ mc: '2000001' }), {
    existingUsdots: universe.existingUsdots,
    existingMcs: new Set(['2000001']),
  });
  assert.equal(result.resolution, 'LEGAL_ENTITY_CONFLICT');
  assert.match(result.reasons.join(','), /mc_collision/);
});

test('same-location conflict blocks resolved-distinct', () => {
  const result = resolveIdentityPilot(
    candidate({ city: 'Boise', state: 'ID' }),
    universe
  );
  assert.equal(result.resolution, 'POSSIBLE_DUPLICATE');
});

test('brand/franchise pattern escalates', () => {
  const result = resolveIdentityPilot(
    candidate({
      legalName: 'LIGHTNER & LIGHTNER, INC.',
      dbaName: 'TWO MEN AND A TRUCK',
      matchedExisting: [existing({ name: 'Two Men And A Truck Madison', id: 'tmt-madison' })],
    }),
    universe
  );
  assert.equal(result.resolution, 'BRAND_OR_FRANCHISE_REVIEW');
});

test('successor/predecessor pattern escalates when legal cores match without independent contacts', () => {
  const result = resolveIdentityPilot(
    candidate({
      legalName: 'ACME MOVERS LLC',
      phone: null,
      matchedExisting: [existing({ name: 'Acme Movers Inc', legalName: 'ACME MOVERS INC', phone: '' })],
    }),
    universe
  );
  assert.equal(result.resolution, 'POSSIBLE_SUCCESSOR_PREDECESSOR');
});

test('possible duplicate does not auto-merge', () => {
  const result = resolveIdentityPilot(candidate({ usdot: '1000001' }), universe);
  assert.equal(result.resolution, 'POSSIBLE_DUPLICATE');
  assert.equal(result.autoMerge, false);
});

test('protected Task 002 identities fail closed', () => {
  const result = resolveIdentityPilot(
    candidate({
      legalName: 'ALLIED VAN LINES INC',
      matchedExisting: [
        existing({
          id: 'allied',
          slug: 'allied-van-lines',
          name: 'Allied Van Lines',
          usdot: '76235',
          city: 'Oakbrook Terrace',
          state: 'IL',
        }),
      ],
    }),
    universe
  );
  assert.equal(result.resolution, 'BRAND_OR_FRANCHISE_REVIEW');
  assert.equal(TASK_002_PROTECTED_IDENTITIES.allied, '76235');
});

test('original review history is not rewritten by resolution overlay', () => {
  const row = candidate();
  const result = resolveIdentityPilot(row, universe);
  assert.equal(row.disposition, 'IDENTITY_REVIEW_REQUIRED');
  assert.equal(row.matchReason, 'name similarity only — not a canonical match');
  assert.ok(result.resolution);
});

test('resolution overlay is auditable and fail-closed on fuzzy merge', () => {
  const result = resolveIdentityPilot(candidate(), universe);
  assert.equal(result.autoMerge, false);
  assert.ok(result.reasons.length >= 1);
  assert.ok(result.matchedCompanyId);
});

test('fuzzy merge never occurs', () => {
  for (const row of [
    candidate(),
    candidate({ city: 'Boise', state: 'ID' }),
    candidate({ mc: '2000001' }),
  ]) {
    assert.equal(resolveIdentityPilot(row, universe).autoMerge, false);
  }
});

test('Wave publication IDs remain distinct constants', () => {
  assert.equal(WAVE_ID, 'FEDERAL_HHG_2026_08_WAVE_1');
  assert.equal(WAVE_2_PUBLICATION_ID, 'FEDERAL_HHG_2026_08_WAVE_2');
  assert.equal(WAVE_3_PUBLICATION_ID, 'FEDERAL_HHG_2026_08_WAVE_3');
});

test('pilot selection is deterministic and bounded', () => {
  const pool = Array.from({ length: 80 }, (_, i) => ({
    usdot: String(7000000 + i),
    classification: i % 10 === 0 ? 'HHG_BROKER' : 'HHG_CARRIER',
    state: ['FL', 'CA', 'TX', 'NY'][i % 4]!,
    exactName: i % 3 === 0,
  }));
  const a = selectIdentityReviewPilot(pool, 25);
  const b = selectIdentityReviewPilot(pool, 25);
  assert.deepEqual(
    a.map((r) => r.usdot),
    b.map((r) => r.usdot)
  );
  assert.equal(a.length, 25);
  assert.ok(a.some((r) => r.classification === 'HHG_BROKER'));
});

test('independent confirmation agrees with a clean distinct case', () => {
  const row = candidate();
  const resolved = resolveIdentityPilot(row, universe);
  const audit = independentlyConfirmDistinct(row, universe);
  assert.equal(resolved.resolution, 'RESOLVED_DISTINCT');
  assert.equal(audit.ok, true);
});

test('independent confirmation rejects same-location even if caller expected distinct', () => {
  const audit = independentlyConfirmDistinct(candidate({ city: 'Boise', state: 'ID' }), universe);
  assert.equal(audit.ok, false);
});

test('common trade names with exact cores remain review-required', () => {
  const result = resolveIdentityPilot(
    candidate({
      legalName: 'ELITE MOVERS INC',
      dbaName: 'ELITE MOVERS',
      matchedExisting: [existing({ name: 'ELITE MOVERS', usdot: '1019567', city: 'Pocola', state: 'OK' })],
    }),
    universe
  );
  assert.equal(result.resolution, 'REMAIN_REVIEW_REQUIRED');
});

test('one-token weak similarity is not resolved distinct', () => {
  const result = resolveIdentityPilot(
    candidate({
      legalName: "BROWN'S MOVING AND STORAGE, INC",
      matchedExisting: [existing({ name: 'BROWN BOX MOVERS', usdot: '2295684', city: 'Denton', state: 'TX' })],
    }),
    universe
  );
  assert.equal(result.resolution, 'REMAIN_REVIEW_REQUIRED');
});

test('identical van-line brand across states escalates rather than resolving distinct', () => {
  const result = resolveIdentityPilot(
    candidate({
      legalName: 'COLONIAL VAN LINES INC',
      matchedExisting: [
        existing({
          id: 'colonial',
          name: 'Colonial Van Lines',
          usdot: '143437',
          city: 'Pompano Beach',
          state: 'FL',
        }),
      ],
    }),
    universe
  );
  assert.equal(result.resolution, 'BRAND_OR_FRANCHISE_REVIEW');
});

test('existing rows without USDOT do not block a strong counterpart that has one', () => {
  const result = resolveIdentityPilot(
    candidate({
      matchedExisting: [
        existing({ id: 'legacy', name: 'Acme Movers Catalog', usdot: '', city: '', state: '' }),
        existing(),
      ],
    }),
    universe
  );
  assert.equal(result.resolution, 'RESOLVED_DISTINCT');
});
