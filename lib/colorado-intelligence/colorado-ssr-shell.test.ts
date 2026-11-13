/**
 * MOVE-SEO-PATTERN-002 regression guard for /colorado (PR #251).
 *
 * /colorado must put its H1 and Colorado Intelligence in the initial server
 * HTML. A sibling loading.tsx (or a <Suspense> around the payload) makes
 * Next.js flush "Loading Colorado mover intelligence..." as the visible page
 * and stream the real content into hidden chunks that need browser
 * JavaScript. These checks fail if that comes back, and pin the canonical,
 * robots and sitemap behavior the fix must not change. Runtime HTML is
 * checked by scripts/check-move-seo-pattern-002.mjs.
 */
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');

function read(rel: string) {
  return readFileSync(join(root, rel), 'utf8');
}

const stripComments = (s: string) =>
  s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');

test('Colorado route has no loading.tsx crawler shell', () => {
  assert.equal(existsSync(join(root, 'app/(move)/colorado/loading.tsx')), false);
  assert.equal(existsSync(join(root, 'app/(move)/loading.tsx')), false);
  assert.equal(existsSync(join(root, 'app/loading.tsx')), false);
});

test('Florida route still has no loading.tsx crawler shell', () => {
  assert.equal(existsSync(join(root, 'app/(move)/florida/loading.tsx')), false);
});

test('Colorado route page awaits the payload on the server', () => {
  const page = stripComments(read('app/(move)/colorado/page.tsx'));
  assert.match(page, /export default async function/);
  assert.match(page, /await getColoradoMoveIntelligence\(/);
  assert.match(page, /<ColoradoMoveIntelligence\b/);
  assert.doesNotMatch(page, /\bSuspense\b/);
  assert.doesNotMatch(page, /Loading Colorado/);
  assert.doesNotMatch(page, /ssr\s*:\s*false/);
  assert.doesNotMatch(page, /^\s*['"]use client['"]/m);
  // The H1 comes from the Intelligence component, so the route adds none.
  assert.equal((page.match(/<h1\b/g) ?? []).length, 0);
});

test('Colorado Intelligence renders exactly one H1 with the expected text', () => {
  const ui = stripComments(read('components/intelligence/ColoradoMoveIntelligence.tsx'));
  const h1s = ui.match(/<h1\b[\s\S]*?<\/h1>/g) ?? [];
  assert.equal(h1s.length, 1);
  assert.match(h1s[0], /Colorado Moving &amp; Household-Goods Intelligence/);
  assert.doesNotMatch(ui, /Loading Colorado/);
  assert.doesNotMatch(ui, /\bSuspense\b/);
});

test('Colorado loader stays bounded, cached and read-only', () => {
  const load = read('lib/colorado-intelligence/load.ts');
  assert.match(load, /TIMEOUT_MS = 6_000/);
  assert.match(load, /REVALIDATE_SEC = 1_800/);
  assert.match(load, /unstable_cache/);
  assert.doesNotMatch(load, /\.insert\(|\.update\(|\.upsert\(|\.delete\(/);
});

test('Colorado canonical, robots and sitemap behavior is unchanged', async () => {
  const { COLORADO_INTELLIGENCE_GATE } = await import('./publication');
  assert.equal(COLORADO_INTELLIGENCE_GATE.path, '/colorado');
  assert.equal(COLORADO_INTELLIGENCE_GATE.robotsIndex, true);
  assert.equal(COLORADO_INTELLIGENCE_GATE.sitemap, true);
  assert.match(read('app/sitemap.ts'), /['"]\/colorado['"]/);

  const page = stripComments(read('app/(move)/colorado/page.tsx'));
  assert.match(page, /buildMovePageMetadata\(\{[\s\S]*path: COLORADO_INTELLIGENCE_GATE\.path/);
  assert.doesNotMatch(page, /noIndex|index:\s*false/);
  const { buildMovePageMetadata } = await import('../seo/move-metadata');
  const meta = buildMovePageMetadata({
    title: COLORADO_INTELLIGENCE_GATE.title,
    description: COLORADO_INTELLIGENCE_GATE.description,
    path: COLORADO_INTELLIGENCE_GATE.path,
  });
  assert.equal(meta.alternates?.canonical, 'https://www.movetrusthub.com/colorado');
  assert.deepEqual(meta.robots, { index: true, follow: true });
});

test('unknown /colorado/* routes fall through to the noindex 404 page', () => {
  // Only page.tsx lives under /colorado (no dynamic or catch-all child), so
  // any other child path has no matching route and renders app/not-found.tsx.
  const entries = readdirSync(join(root, 'app/(move)/colorado')).sort();
  assert.deepEqual(entries, ['page.tsx']);
  const notFound = read('app/not-found.tsx');
  assert.match(notFound, /robots:\s*\{\s*index:\s*false/);
  assert.match(notFound, /Page not found/);
});
