/**
 * TH-LEGACY-CONTAIN-001 redirect matrix + negative route regression guard.
 *
 * Confirms every historical Move `/lender/*` and `/insurance/*` path continues
 * to resolve to the correct standalone specialist host with no loop, and that
 * the admin carve-out (`/insurance/admin/**`) is never redirected away.
 *
 *   npx tsx --test lib/migration/hub-redirects.test.ts
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveHubMigrationRedirect, getNextConfigHubRedirects, getVercelHubRedirects } from './hub-redirects';

const LENDER_APEX = 'https://www.lendertrusthub.com';
const INSURANCE_APEX = 'https://www.insurancetrusthub.com';

const LENDER_MATRIX: [string, string][] = [
  ['/lender', `${LENDER_APEX}/`],
  ['/lender/', `${LENDER_APEX}/`],
  ['/lender/methodology', `${LENDER_APEX}/methodology`],
  ['/lender/foo', `${LENDER_APEX}/foo`],
  ['/lender/foo/bar', `${LENDER_APEX}/foo/bar`],
  ['/lender/first-time-homebuyer-programs', `${LENDER_APEX}/first-time-homebuyer-programs`],
];

const INSURANCE_MATRIX: [string, string][] = [
  ['/insurance', `${INSURANCE_APEX}/`],
  ['/insurance/', `${INSURANCE_APEX}/`],
  ['/insurance/providers/example', `${INSURANCE_APEX}/providers/example`],
  ['/insurance/foo', `${INSURANCE_APEX}/foo`],
  ['/insurance/foo/bar', `${INSURANCE_APEX}/foo/bar`],
];

test('every historical /lender/* path redirects to the LenderTrustHub apex host', () => {
  for (const [path, expected] of LENDER_MATRIX) {
    const dest = resolveHubMigrationRedirect(path);
    assert.ok(dest, `expected a redirect destination for ${path}`);
    assert.ok(
      new URL(dest as string).host === new URL(LENDER_APEX).host,
      `${path} must redirect to the LenderTrustHub host, got ${dest}`
    );
    assert.equal(dest, expected, `${path} destination mismatch`);
  }
});

test('every historical /insurance/* path (except admin) redirects to the InsuranceTrustHub apex host', () => {
  for (const [path, expected] of INSURANCE_MATRIX) {
    const dest = resolveHubMigrationRedirect(path);
    assert.ok(dest, `expected a redirect destination for ${path}`);
    assert.ok(
      new URL(dest as string).host === new URL(INSURANCE_APEX).host,
      `${path} must redirect to the InsuranceTrustHub host, got ${dest}`
    );
    assert.equal(dest, expected, `${path} destination mismatch`);
  }
});

test('/insurance/admin and its subpaths are never redirected away (the one intentional carve-out)', () => {
  assert.equal(resolveHubMigrationRedirect('/insurance/admin'), null);
  assert.equal(resolveHubMigrationRedirect('/insurance/admin/'), null);
  assert.equal(resolveHubMigrationRedirect('/insurance/admin/providers'), null);
});

test('/lender/admin has no carve-out and redirects like any other /lender/* path', () => {
  const dest = resolveHubMigrationRedirect('/lender/admin');
  assert.equal(dest, `${LENDER_APEX}/admin`);
});

test('doubled legacy prefixes resolve to the apex directly, not back through the Move host', () => {
  assert.equal(resolveHubMigrationRedirect('/insurance/insurance'), `${INSURANCE_APEX}/`);
  assert.equal(resolveHubMigrationRedirect('/insurance/insurance/providers/x'), `${INSURANCE_APEX}/providers/x`);
  assert.equal(resolveHubMigrationRedirect('/lender/lender'), `${LENDER_APEX}/`);
  assert.equal(resolveHubMigrationRedirect('/lender/lender/methodology'), `${LENDER_APEX}/methodology`);
});

test('requests already on the standalone apex hosts are never bounced back into Move paths', () => {
  assert.equal(resolveHubMigrationRedirect('/lender', 'www.lendertrusthub.com'), null);
  assert.equal(resolveHubMigrationRedirect('/insurance', 'www.insurancetrusthub.com'), null);
});

test('Move-native paths are never redirected to a specialist host', () => {
  for (const path of ['/companies', '/about', '/resources/how-to-choose', '/verify-dot', '/tools/move-quote-check']) {
    assert.equal(resolveHubMigrationRedirect(path), null, `${path} must stay on Move`);
  }
});

test('the next.config redirect set never redirects a path back onto a Move host (would loop)', () => {
  for (const rule of getNextConfigHubRedirects()) {
    assert.ok(
      !rule.destination.includes('movetrusthub.com'),
      `redirect for ${rule.source} must not point back at movetrusthub.com: ${rule.destination}`
    );
  }
});

test('the Vercel edge redirect set never redirects a path back onto a Move host (would loop)', () => {
  for (const rule of getVercelHubRedirects()) {
    assert.ok(
      !rule.destination.includes('movetrusthub.com'),
      `redirect for ${rule.source} must not point back at movetrusthub.com: ${rule.destination}`
    );
  }
});
