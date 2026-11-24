import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { shouldEnableGoogleAnalytics } from '../ga-privacy';
import { analyticsConsent, shouldEnablePosthog } from './environment';
import {
  ABSENT_ANALYTICS_HOSTS,
  ENFORCED_CSP_HEADER,
  FIRST_PARTY_ANALYTICS_PATHS,
  buildAnalyticsContentSecurityPolicy,
  enforcedDocumentContentSecurityPolicy,
} from './network-policy';

const root = join(dirname(fileURLToPath(import.meta.url)), '../../..');

test('the enforced policy blocks PostHog and Google Analytics and keeps application hosts', () => {
  assert.equal(ENFORCED_CSP_HEADER, 'Content-Security-Policy');
  assert.equal(analyticsConsent(), 'unresolved');
  assert.equal(shouldEnablePosthog(), false);
  assert.equal(shouldEnableGoogleAnalytics(), false);
  const policy = enforcedDocumentContentSecurityPolicy();
  assert.match(policy, /connect-src [^;]*'self'/);
  assert.match(policy, /https:\/\/\*\.supabase\.co/);
  assert.match(policy, /wss:\/\/\*\.supabase\.co/);
  assert.match(policy, /https:\/\/\*\.sentry\.io/);
  assert.match(policy, /https:\/\/accounts\.google\.com/);
  assert.match(policy, /https:\/\/cdn\.jsdelivr\.net/);
  assert.match(policy, /script-src [^;]*https:\/\/accounts\.google\.com/);
  assert.match(policy, /https:\/\/va\.vercel-scripts\.com/);
  assert.doesNotMatch(policy, /unsafe-eval/);
  assert.doesNotMatch(policy, /Report-Only/);
  for (const host of ABSENT_ANALYTICS_HOSTS) assert.equal(policy.includes(host), false, host);
  const open = buildAnalyticsContentSecurityPolicy({
    posthogOpen: true,
    posthogHost: 'https://us.i.posthog.com',
    googleAnalyticsOpen: true,
    includeTurnstile: false,
    includeGoogleIdentity: true,
    includeJsdelivr: true,
  });
  assert.match(open, /https:\/\/us\.i\.posthog\.com/);
  assert.match(open, /https:\/\/us-assets\.i\.posthog\.com/);
  assert.match(open, /https:\/\/www\.googletagmanager\.com/);
  assert.match(open, /https:\/\/www\.google-analytics\.com/);
  assert.doesNotMatch(open, /eu\.i\.posthog\.com/);
});

test('the SDK module is isolated and the response header stays enforced', () => {
  const browser = readFileSync(join(root, 'lib/analytics/posthog/posthog-browser.ts'), 'utf8');
  const sdk = readFileSync(join(root, 'lib/analytics/posthog/posthog-sdk.ts'), 'utf8');
  const layout = readFileSync(join(root, 'app/layout.tsx'), 'utf8');
  const config = readFileSync(join(root, 'next.config.ts'), 'utf8');
  const ga = readFileSync(join(root, 'lib/analytics/ga-privacy.ts'), 'utf8');
  const load = browser.slice(browser.indexOf('async function loadPosthog'), browser.indexOf('const gate'));
  assert.ok(load.indexOf('if (!shouldEnablePosthog()) return null;') < load.indexOf("import('./posthog-sdk')"));
  assert.doesNotMatch(browser, /import\('posthog-js'\)/);
  assert.match(browser, /import type \{ PostHog \} from 'posthog-js'/);
  assert.equal((browser.match(/from 'posthog-js'/g) ?? []).length, 1);
  assert.match(sdk, /import\('posthog-js'\)/);
  assert.match(sdk, /trusthub-posthog-sdk-isolated/);
  assert.match(layout, /analyticsTransportBlockScript/);
  assert.match(ga, /consent !== 'granted'/);
  assert.match(config, /Content-Security-Policy/);
  assert.match(config, /enforcedDocumentContentSecurityPolicy\(\)/);
  assert.match(config, /X-Content-Type-Options/);
  assert.match(config, /X-Frame-Options/);
  assert.match(config, /Referrer-Policy/);
  assert.match(config, /Permissions-Policy/);
  assert.doesNotMatch(config, /Content-Security-Policy-Report-Only/);
  assert.equal(FIRST_PARTY_ANALYTICS_PATHS[0], '/api/analytics/identity');
  for (const path of ['app/ingest/route.ts', 'app/ph/route.ts', 'app/api/posthog/route.ts', 'app/api/ingest/route.ts']) {
    assert.equal(existsSync(join(root, path)), false, path);
  }
  assert.doesNotMatch(config, /destination: 'https:\/\/[^']*posthog\.com/);
});
