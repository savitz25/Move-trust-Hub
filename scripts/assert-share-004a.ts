import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getMoveSocialTextLayout, MOVE_SOCIAL_SAFE_AREA, MOVE_SOCIAL_TEXT_LIMITS } from '../lib/og/move-share-card';
const read = (path: string) => readFileSync(path, 'utf8');
const renderer = read('lib/og/move-share-card.tsx');
const hub = read('lib/seo/share-hub.ts');
const home = read('app/(move)/page.tsx');
const florida = read('app/(move)/florida/page.tsx');
const entity = read('app/(move)/companies/[slug]/share-og/route.tsx');
assert.match(renderer, /width: 1200, height: 630/);
assert.match(renderer, /Move Trust Hub/);
assert.match(renderer, /Independent Moving Research/);
assert.match(renderer, /#FF5A1F/);
assert.match(renderer, /Bracket/);
assert.match(renderer, /Nodes/);
assert.match(renderer, /s-maxage=31536000, immutable/);
assert.match(hub, /ogImagePath: '\/opengraph-image'/);
assert.match(hub, /ogImageRevision: '20260903'/);
assert.match(read('lib/seo/site-metadata.ts'), /ogImageRevision/);
assert.match(hub, /summary_large_image/);
assert.match(home, /Independent Moving Research/);
assert.match(florida, /contextualImage: true/);
assert.match(florida, /Move Trust Hub — Florida Moving Intelligence/);
assert.match(entity, /isAnonymousPublicProfileAllowed/);
assert.match(entity, /canShowLicenseNumbers/);
assert.doesNotMatch(renderer, /screenshot|route planner|Trust Score|recommended/i);
assert.deepEqual(MOVE_SOCIAL_SAFE_AREA, { width: 820, height: 520 });
assert.equal(MOVE_SOCIAL_TEXT_LIMITS.titleMaxLines, 2);
assert.equal(MOVE_SOCIAL_TEXT_LIMITS.stateTitleMinSize, 38);
assert.equal(MOVE_SOCIAL_TEXT_LIMITS.entityTitleMinSize, 32);
for (const [kind, title] of [
  ['content', 'Florida Moving Intelligence'],
  ['content', 'Consumer Moving Research Across a Complex Multi-State Market'],
  ['entity', 'SHIFL'],
  ['entity', 'International Household Goods Transportation and Relocation Services LLC'],
] as const) {
  const layout = getMoveSocialTextLayout(kind, title);
  assert.ok(layout.lines.length >= 1 && layout.lines.length <= 2, `${kind} title stays within two lines`);
  assert.ok(layout.fontSize >= (kind === 'entity' ? 32 : 38), `${kind} title respects minimum size`);
  assert.ok(layout.lines.every((line) => line.length <= 44), `${kind} title respects bounded line length`);
}
console.log('SHARE-004A social card contract passed.');
