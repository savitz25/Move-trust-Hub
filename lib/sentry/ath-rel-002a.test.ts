import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '../..');
const read = (rel: string) => readFileSync(join(root, rel), 'utf8');

test('ATH-REL-002A: Sentry Session Replay stays off', () => {
  const client = read('instrumentation-client.ts');
  assert.doesNotMatch(client, /replayIntegration/);
  assert.doesNotMatch(client, /replaysSessionSampleRate/);
  assert.doesNotMatch(client, /replaysOnErrorSampleRate/);
  const nextConfig = read('next.config.ts');
  assert.match(nextConfig, /excludeReplayWorker:\s*true/);
});

test('ATH-REL-002A: DSN/org/project come from env only', () => {
  const client = read('instrumentation-client.ts');
  const server = read('sentry.server.config.ts');
  const edge = read('sentry.edge.config.ts');
  const nextConfig = read('next.config.ts');
  assert.doesNotMatch(client, /ingest\.(sentry|us\.sentry)\.io/);
  assert.doesNotMatch(server, /ingest\.(sentry|us\.sentry)\.io/);
  assert.doesNotMatch(edge, /ingest\.(sentry|us\.sentry)\.io/);
  assert.match(nextConfig, /process\.env\.SENTRY_ORG/);
  assert.match(nextConfig, /process\.env\.SENTRY_PROJECT/);
  assert.match(nextConfig, /process\.env\.SENTRY_AUTH_TOKEN/);
  assert.doesNotMatch(nextConfig, /ask-trust-hub/);
  assert.doesNotMatch(nextConfig, /javascript-nextjs/);
  assert.doesNotMatch(nextConfig, /movetrusthub-web/);
  assert.doesNotMatch(nextConfig, /movetrusthub/);
});

test('ATH-REL-002A: privacy and environment reuse analytics helpers', () => {
  const privacy = read('lib/sentry/privacy.ts');
  const options = read('lib/sentry/options.ts');
  const runtime = read('lib/sentry/runtime.ts');
  assert.match(privacy, /from '\.\.\/analytics\/posthog\/privacy'/);
  assert.match(privacy, /lower === 'referer' \|\| lower === 'referrer'/);
  assert.match(privacy, /sanitizeAnalyticsUrl\(raw\)/);
  assert.match(runtime, /from '\.\.\/analytics\/posthog\/environment'/);
  assert.match(options, /sendDefaultPii:\s*false/);
  assert.match(options, /userInfo:\s*false/);
  assert.match(options, /httpBodies:\s*\[\]/);
  assert.match(options, /hub:\s*'move'/);
});

test('ATH-REL-002A: PostHog and Vercel Analytics stay independent of Sentry', () => {
  const init = read('lib/analytics/posthog/posthog-browser.ts');
  assert.doesNotMatch(init, /@sentry/);
  assert.match(init, /maskTextSelector:/);
  assert.match(init, /before_send: \(event\) => sanitizeEvent\(event\)/);
  const rootLayout = read('app/layout.tsx');
  assert.match(rootLayout, /PosthogRoot/);
  assert.doesNotMatch(rootLayout, /@sentry\/nextjs/);
  const deferred = read('components/performance/deferred-analytics.tsx');
  assert.match(deferred, /@vercel\/analytics\/next/);
  assert.doesNotMatch(deferred, /@sentry/);
});

test('ATH-REL-002A: probe route is gated and three runtimes are registered', () => {
  const probe = read('app/api/internal/sentry-probe/route.ts');
  const probeHelper = read('lib/sentry/probe.ts');
  const instrumentation = read('instrumentation.ts');
  assert.match(probe, /sentryProbeEnabled/);
  assert.match(probe, /sentryProbeAuthorized/);
  assert.match(probe, /createSentryProbeError/);
  assert.match(probeHelper, /ATH-REL-002A controlled Sentry probe/);
  assert.match(instrumentation, /sentry\.server\.config/);
  assert.match(instrumentation, /sentry\.edge\.config/);
  assert.match(instrumentation, /onRequestError = Sentry\.captureRequestError/);
});

test('ATH-REL-002A: Ask Sentry project slug is not reused or renamed', () => {
  const docs = read('docs/analytics/sentry-move-reference.md');
  assert.match(docs, /movetrusthub-web/);
  assert.match(docs, /do not rename/);
  assert.match(docs, /javascript-nextjs/);
  assert.match(docs, /SENTRY_PROBE_ENABLED/);
  assert.match(docs, /SENTRY_AUTH_TOKEN/);
});
