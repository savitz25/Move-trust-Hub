import assert from 'node:assert/strict';
import test from 'node:test';
import { countIndexableCountyTiers } from './tier1-circuit-breaker';

test('Premium count at the exact 400-page cap passes', () => {
  const result = countIndexableCountyTiers(
    Array.from({ length: 400 }, () => ({ tier: 'index' as const, seoTier: 1 }))
  );
  assert.equal(result.premium, 400);
  assert.equal(result.pass, true);
});

test('Premium count 401 fails without raising the fixed cap', () => {
  const result = countIndexableCountyTiers(
    Array.from({ length: 401 }, () => ({ tier: 'index' as const, seoTier: 1 }))
  );
  assert.equal(result.maxAllowed, 400);
  assert.equal(result.pass, false);
});

test('Standard counties remain indexable and do not consume Premium capacity', () => {
  const result = countIndexableCountyTiers([
    ...Array.from({ length: 400 }, () => ({ tier: 'index' as const, seoTier: 1 })),
    ...Array.from({ length: 1_287 }, () => ({ tier: 'index' as const, seoTier: 2 })),
  ]);
  assert.equal(result.premium, 400);
  assert.equal(result.standard, 1_287);
  assert.equal(result.pass, true);
});

test('missing and ambiguous indexed tier evidence fails closed', () => {
  for (const seoTier of [undefined, 3, 0]) {
    const result = countIndexableCountyTiers([
      { tier: 'index', seoTier },
    ]);
    assert.equal(result.unclassified, 1);
    assert.equal(result.pass, false);
  }
});

test('noindex Development counties are excluded consistently from indexed tier counts', () => {
  const result = countIndexableCountyTiers([
    { tier: 'noindex', seoTier: 3 },
    { tier: 'index', seoTier: 1 },
    { tier: 'index', seoTier: 2 },
  ]);
  assert.equal(result.premium, 1);
  assert.equal(result.standard, 1);
  assert.equal(result.unclassified, 0);
  assert.equal(result.pass, true);
});
