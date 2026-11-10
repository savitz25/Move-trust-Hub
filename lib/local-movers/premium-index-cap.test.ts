import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluateCountyIndexabilityFromResult } from '@/lib/local-movers/county-indexability';
import {
  applyPremiumCapToDecision,
  PREMIUM_INDEX_CAP,
  premiumAllowanceKeys,
  rankPremiumCandidates,
} from '@/lib/local-movers/premium-index-cap';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

test('premium cap keeps 400 by score then slug and leaves standard uncapped', () => {
  assert.equal(PREMIUM_INDEX_CAP, 400);
  const rows = [
    ...Array.from({ length: 401 }, (_, index) => ({
      stateSlug: 'texas',
      countySlug: `county-${String(index).padStart(4, '0')}`,
      tier: 'index' as const,
      seoTier: 1 as const,
      qualityScore: 100 - (index % 5),
    })),
    {
      stateSlug: 'florida',
      countySlug: 'standard-one',
      tier: 'index' as const,
      seoTier: 2 as const,
      qualityScore: 99,
    },
  ];

  const ranked = rankPremiumCandidates(rows);
  assert.equal(ranked.length, 401);
  assert.ok((ranked[0]!.qualityScore ?? 0) >= (ranked[1]!.qualityScore ?? 0));
  const tied = ranked.filter((row) => row.qualityScore === ranked[0]!.qualityScore);
  const slugs = tied.map((row) => `${row.stateSlug}/${row.countySlug}`);
  assert.deepEqual(slugs, [...slugs].sort());

  const allowed = premiumAllowanceKeys(rows);
  assert.equal(allowed.size, 400);
  assert.equal(allowed.has('florida/standard-one'), false);

  const overflow = ranked[400]!;
  const demoted = applyPremiumCapToDecision(
    { tier: 'index', seoTier: 1, qualityScore: overflow.qualityScore, reason: 'premium_deep_research' },
    overflow.stateSlug,
    overflow.countySlug,
    allowed
  );
  assert.equal(demoted.tier, 'index');
  assert.equal(demoted.seoTier, 2);
  assert.equal(demoted.reason, 'premium_cap_fallback_standard');

  const belowStandard = applyPremiumCapToDecision(
    { tier: 'index', seoTier: 1, qualityScore: 10, reason: 'premium_deep_research' },
    'texas',
    'not-in-the-set',
    allowed
  );
  assert.equal(belowStandard.tier, 'noindex');
  assert.equal(belowStandard.reason, 'premium_cap_noindex');

  const standard = applyPremiumCapToDecision(
    { tier: 'index', seoTier: 2, qualityScore: 50, reason: 'standard_quality_bar' },
    'florida',
    'standard-one',
    allowed
  );
  assert.equal(standard.seoTier, 2);
  assert.equal(standard.reason, 'standard_quality_bar');
});

test('a county with no qualifying movers is noindex', () => {
  const county: LocalCounty = {
    slug: 'example',
    name: 'Example',
    stateCode: 'FL',
    stateSlug: 'florida',
  };
  const outsider: LocalMover = {
    id: 'out',
    name: 'Out',
    rating: 4,
    reviewCount: 10,
    shortDescription: '',
    services: [],
    city: 'Detroit',
    headquartersState: 'MI',
  };
  const decision = evaluateCountyIndexabilityFromResult('florida', 'example', {
    county,
    movers: [outsider],
    isRegionalFallback: false,
  });
  assert.equal(decision.tier, 'noindex');
  assert.equal(decision.reason, 'no_qualifying_publishable_movers');
});
