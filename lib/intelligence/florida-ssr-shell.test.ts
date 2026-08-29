import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { MOVE_HOME_H1, MOVE_HOME_INTEL_VERSION } from './home-types';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');

function read(rel: string) {
  return readFileSync(join(root, rel), 'utf8');
}

test('Florida route page awaits the snapshot and does not mount a loading H1 shell', () => {
  const page = read('app/(move)/florida/page.tsx');
  assert.match(page, /getFloridaMoveIntelligenceSnapshot/);
  assert.match(page, /FloridaMoveIntelligence/);
  assert.match(page, /export default async function/);
  assert.doesNotMatch(page, /Suspense/);
  assert.doesNotMatch(page, /Loading Florida research snapshot/);
  assert.equal((page.match(/<h1\b/g) ?? []).length, 0);
  assert.match(page, /robots: \{ index: true, follow: true \}|index: true, follow: true|buildMovePageMetadata/);
  assert.match(page, /path: '\/florida'/);
});

test('Florida route has no loading.tsx crawler shell', () => {
  assert.equal(existsSync(join(root, 'app/(move)/florida/loading.tsx')), false);
});

test('canonical Florida Intelligence page has exactly one H1', () => {
  const ui = read('components/intelligence/FloridaMoveIntelligence.tsx');
  assert.equal((ui.match(/<h1\b/g) ?? []).length, 1);
  assert.match(ui, /Research Florida movers/);
  assert.doesNotMatch(ui, /Loading Florida research snapshot/);
});

test('Florida snapshot version and fail-closed contract are unchanged', () => {
  const snap = read('lib/intelligence/florida-snapshot.ts');
  assert.match(snap, /export const MTH_FL_STATE_INTEL_VERSION = 'mth-fl-state-intel-v1'/);
  assert.match(snap, /timedOut/);
  assert.match(snap, /TIMEOUT_MS = 6_000/);
  assert.match(snap, /REVALIDATE_SEC = 1_800/);
  assert.doesNotMatch(snap, /\.insert\(|\.update\(|\.upsert\(|\.delete\(/);
});

test('Florida page files do not write to Supabase', () => {
  const page = read('app/(move)/florida/page.tsx');
  const ui = read('components/intelligence/FloridaMoveIntelligence.tsx');
  for (const src of [page, ui]) {
    assert.doesNotMatch(src, /\.insert\(|\.update\(|\.upsert\(|\.delete\(/);
  }
});

test('national homepage identity and fingerprint helpers stay locked', () => {
  assert.equal(MOVE_HOME_H1, 'Understand the moving market before you book.');
  assert.equal(MOVE_HOME_INTEL_VERSION, 'move-home-intel-v1');
  const home = read('components/home-page.tsx');
  assert.doesNotMatch(home, /HomeBelowFoldReviews/);
  assert.doesNotMatch(home, /Featured review highlights/);
  const intel = read('components/intelligence/MoveNationalIntelligence.tsx');
  assert.match(intel, /Latest observed FMCSA refresh/);
  assert.doesNotMatch(intel, /Directory FMCSA flags as of/);
});

test('no Trust Score or ranking language on Florida intelligence UI', () => {
  const ui = read('components/intelligence/FloridaMoveIntelligence.tsx');
  assert.doesNotMatch(ui, /\bTrust Score\b|\bSafety Score\b|\bbest movers\b|\btop movers\b/i);
});
