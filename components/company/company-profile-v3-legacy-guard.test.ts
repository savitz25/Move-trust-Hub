import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

/**
 * MOVE-PROFILE-V3-001A: static source guard against legacy label resurrection
 * on the shared company-profile contract. This intentionally checks source
 * text, not a live render, so it fails fast (no DB/dev server needed) if
 * someone re-adds a retired label to a file this contract owns.
 *
 * If a legitimate new field genuinely needs one of these words (e.g. a
 * *link* to the existing "how reputation scores work" methodology page is
 * fine — that is navigation copy, not a rendered score), update the
 * allowlist below deliberately rather than deleting the assertion.
 */

const ROOT = path.resolve(__dirname, '..', '..');

const PROFILE_CONTRACT_FILES = [
  'components/company/company-profile-stats.tsx',
  'components/company/external-reputation-header.tsx',
  'components/reviews/attributed-reviews-panel.tsx',
  'components/verification/google-reviews-section.tsx',
  'components/reviews/legacy-company-user-reviews.tsx',
  'app/(move)/companies/[slug]/page.tsx',
  'app/(move)/auto-transport/[slug]/page.tsx',
];

// Case-sensitive: intentionally narrow so we do not false-positive on
// unrelated lowercase prose (e.g. "the industry reports X" in some other
// disclaimer sentence would not match "Industry-reported rating").
const RETIRED_PUBLIC_LABELS = [
  'Move Trust Hub Reputation Score',
  'Reputation Score / 100',
  'Reputation score',
  'Directory composite score',
  'Editorial star rating',
  'Industry-reported rating',
  'Price Tier',
  'On-site reviews',
  'Industry volume',
  'Live snapshot from Google',
  'Live third-party snapshot',
];

test('retired legacy labels do not appear in the V3 profile contract files', () => {
  for (const relPath of PROFILE_CONTRACT_FILES) {
    const abs = path.join(ROOT, relPath);
    const source = fs.readFileSync(abs, 'utf8');
    for (const label of RETIRED_PUBLIC_LABELS) {
      assert.ok(
        !source.includes(label),
        `${relPath} contains the retired label "${label}" — this was removed from the public rendering contract (MOVE-PROFILE-V3-001A). If this is a deliberate new use, update this test's allowlist explicitly.`
      );
    }
  }
});

test('the retired CompanyProfileReviewSources component is gone, not merely unused', () => {
  const abs = path.join(ROOT, 'components/company/company-profile-review-sources.tsx');
  assert.ok(!fs.existsSync(abs), 'company-profile-review-sources.tsx should be deleted, not left as dead code');
});

test('CompanyProfileStats no longer imports reputationScore/price display-quality gates', () => {
  const abs = path.join(ROOT, 'components/company/company-profile-stats.tsx');
  const source = fs.readFileSync(abs, 'utf8');
  assert.ok(!source.includes('shouldShowReputationScore'), 'reputation score gate must not be imported by the profile stats component');
  assert.ok(!source.includes('shouldShowAvgPrice'), 'avg-price gate must not be imported by the profile stats component');
  assert.ok(!source.includes('avgPricePerMove'), 'avg price must not render on the shared profile stats component');
});

test('the main company profile emits exactly one Google reputation card, not a duplicate', () => {
  const abs = path.join(ROOT, 'app/(move)/companies/[slug]/page.tsx');
  const source = fs.readFileSync(abs, 'utf8');
  const googleReviewsSectionUsages = (source.match(/<GoogleReviewsSection/g) ?? []).length;
  assert.equal(googleReviewsSectionUsages, 1, 'GoogleReviewsSection must be rendered exactly once on the profile');
  assert.ok(!source.includes('CompanyProfileReviewSources'), 'the retired duplicate Google/score card must not be imported');
});
