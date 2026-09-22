import assert from 'node:assert/strict';
import { test } from 'node:test';
import { companyProfileReviewMeta } from '@/lib/trust/review-display-policy';

const NONEXISTENT_COMPANY_ID = '__move-profile-v3-001d-nonexistent__';

/**
 * MOVE-PROFILE-V3-001D: direct regression coverage for the meta-description
 * leak found by independent audit (MOVE-PROFILE-V3-001B) -- the
 * zero-attributable branch used to interpolate "${editorialRating}★
 * editorial rating" straight into a public <meta name="description">
 * on app/(move)/auto-transport/[slug]/page.tsx's generateMetadata.
 */

test('companyProfileReviewMeta: zero attributable reviews never surfaces the star rating', () => {
  const meta = companyProfileReviewMeta({
    companyId: NONEXISTENT_COMPANY_ID,
    editorialReviewCount: 12000,
    editorialRating: 4.8,
  });
  assert.ok(!meta.headline.includes('★'), `headline must not contain a star rating: ${meta.headline}`);
  assert.ok(!meta.detail.includes('★'), `detail must not contain a star rating: ${meta.detail}`);
  assert.ok(!/editorial rating/i.test(meta.headline), `headline must not say "editorial rating": ${meta.headline}`);
  assert.ok(!/editorial rating/i.test(meta.detail), `detail must not say "editorial rating": ${meta.detail}`);
  assert.ok(!meta.headline.includes('4.8'), `headline must not embed the raw rating number: ${meta.headline}`);
});

test('companyProfileReviewMeta: the reconstructed public meta description string is clean', () => {
  // Rebuilds the exact template from app/(move)/auto-transport/[slug]/page.tsx
  // generateMetadata, so this test breaks if that leak pattern reappears
  // even under a different call site.
  const meta = companyProfileReviewMeta({
    companyId: NONEXISTENT_COMPANY_ID,
    editorialReviewCount: 28000,
    editorialRating: 4.6,
  });
  const description = `uShip auto transport profile. ${meta.headline}. USDOT 1234567. BBB B. Coverage: All 50 States. Open & enclosed vehicle shipping.`;
  assert.ok(!/★/.test(description), `public meta description must not contain a star rating: ${description}`);
  assert.ok(!/editorial rating/i.test(description), `public meta description must not say "editorial rating": ${description}`);
  assert.ok(!/reputation score/i.test(description), `public meta description must not say "reputation score": ${description}`);
});

test('companyProfileReviewMeta: zero on-site reviews still produces honest, non-empty copy', () => {
  const meta = companyProfileReviewMeta({
    companyId: NONEXISTENT_COMPANY_ID,
    editorialReviewCount: 0,
    editorialRating: 0,
  });
  assert.equal(meta.headline, 'Not reported');
  assert.ok(meta.detail.length > 0);
});
