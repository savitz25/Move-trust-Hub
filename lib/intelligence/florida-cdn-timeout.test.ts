import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { FLORIDA_HTML_CDN_SECONDS, htmlCacheSecondsForPath } from '../cache/control';
import { MOVE_HOME_H1, MOVE_HOME_INTEL_VERSION } from './home-types';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');

function read(rel: string) {
  return readFileSync(join(root, rel), 'utf8');
}

test('Florida snapshot timeout and unstable_cache TTL are unchanged', () => {
  const snap = read('lib/intelligence/florida-snapshot.ts');
  assert.match(snap, /TIMEOUT_MS = 6_000/);
  assert.match(snap, /REVALIDATE_SEC = 1_800/);
  assert.match(snap, /export const MTH_FL_STATE_INTEL_VERSION = 'mth-fl-state-intel-v1'/);
  assert.doesNotMatch(snap, /\.insert\(|\.update\(|\.upsert\(|\.delete\(/);
});

test('Florida SSR-shell protections remain: one H1, no loading.tsx', () => {
  const page = read('app/(move)/florida/page.tsx');
  const ui = read('components/intelligence/FloridaMoveIntelligence.tsx');
  assert.equal(existsSync(join(root, 'app/(move)/florida/loading.tsx')), false);
  assert.doesNotMatch(page, /Suspense/);
  assert.doesNotMatch(page + ui, /Loading Florida research snapshot/);
  assert.equal((ui.match(/<h1\b/g) ?? []).length, 1);
  assert.match(page, /export default async function/);
});

test('failure HTML CDN lifetime cannot be 86400 seconds', () => {
  assert.equal(htmlCacheSecondsForPath('/florida', 86_400), FLORIDA_HTML_CDN_SECONDS);
  assert.ok(FLORIDA_HTML_CDN_SECONDS > 0);
  assert.ok(FLORIDA_HTML_CDN_SECONDS <= 60);
  assert.notEqual(FLORIDA_HTML_CDN_SECONDS, 86_400);
});

test('cache policy is /florida-scoped and does not retune homepage TTL', () => {
  assert.equal(htmlCacheSecondsForPath('/', 86_400), 86_400);
  const mw = read('middleware.ts');
  assert.match(mw, /htmlCacheSecondsForPath/);
  const flags = read('lib/edge-config/types.ts');
  assert.match(flags, /htmlCacheSeconds: 86_400/);
});

test('national homepage lock remains', () => {
  assert.equal(MOVE_HOME_H1, 'Understand the moving market before you book.');
  assert.equal(MOVE_HOME_INTEL_VERSION, 'move-home-intel-v1');
  const home = read('components/home-page.tsx');
  assert.doesNotMatch(home, /HomeBelowFoldReviews/);
  assert.doesNotMatch(home, /Featured review highlights/);
});
