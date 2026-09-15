/**
 * TH-LEGACY-CONTAIN-001 sitemap isolation guard.
 *
 * The Move sitemap must never publish a public Lender or Insurance consumer
 * URL — those verticals are standalone products with their own sitemaps.
 *
 * app/sitemap.ts imports `server-only` (via lib/data-server), so it cannot be
 * invoked outside a real Next.js server-render context in a plain node:test
 * run — this is a static-source guard instead, checked against the file that
 * actually ships. (Full runtime coverage: the production build was verified
 * to emit a /sitemap.xml route with zero /lender or /insurance entries, and
 * the live production sitemap was independently curl-verified.)
 *
 *   npx tsx --test app/sitemap.test.ts
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const source = readFileSync(join(__dirname, 'sitemap.ts'), 'utf8');

test('sitemap source never imports a lender/insurance-vertical module', () => {
  assert.doesNotMatch(source, /@\/lib\/lender/);
  assert.doesNotMatch(source, /@\/lib\/insurance/);
  assert.doesNotMatch(source, /@\/components\/lender/);
  assert.doesNotMatch(source, /@\/components\/insurance/);
});

test('sitemap source never constructs a /lender or /insurance URL entry', () => {
  assert.doesNotMatch(source, /`\$\{SITE\}\/lender/);
  assert.doesNotMatch(source, /`\$\{SITE\}\/insurance/);
  assert.doesNotMatch(source, /url:\s*['"`].*\/(lender|insurance)\//);
});

test('sitemap source no longer contains the dead insurance-standalone-host generator branch', () => {
  assert.doesNotMatch(source, /isInsuranceStandaloneHost/);
  assert.doesNotMatch(source, /generateInsuranceSitemap/);
});
