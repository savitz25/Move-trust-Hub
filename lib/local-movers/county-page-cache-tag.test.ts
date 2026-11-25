import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mock, test } from 'node:test';

const tags: unknown[] = [];
mock.module('server-only', { namedExports: {} });
mock.module('@vercel/functions', {
  namedExports: {
    addCacheTag: (tag: unknown) => {
      tags.push(tag);
      return Promise.resolve();
    },
  },
});

let resolveSeo: (stateSlug: string, countySlug: string) => Promise<unknown> = async () => null;
mock.module('@/lib/local-movers/county-page-seo', {
  namedExports: {
    resolveCountyPageSeo: (stateSlug: string, countySlug: string) => resolveSeo(stateSlug, countySlug),
  },
});

const countyPage = import('@/app/(move)/(marketing)/local-movers/[stateSlug]/[countySlug]/page');

const root = process.cwd();
const countySource = 'app/(move)/(marketing)/local-movers/[stateSlug]/[countySlug]/page.tsx';
const untaggedSources = [
  'app/(move)/(marketing)/local-movers/page.tsx',
  'app/(move)/(marketing)/local-movers/[stateSlug]/page.tsx',
  'app/(move)/companies/page.tsx',
  'app/(move)/companies/[slug]/page.tsx',
  'app/(move)/compare/page.tsx',
  'app/sitemap.ts',
  'app/sitemap-local/sitemap.ts',
];

function stopAfterPath(path: string) {
  return new Proxy({ path }, {
    get(target, prop) {
      if (prop === 'then') return undefined;
      if (prop === 'path') return target.path;
      throw new Error('stop after county tag');
    },
  });
}

test('county page render calls addCacheTag with the exact county tag', async () => {
  resolveSeo = async (stateSlug, countySlug) => stopAfterPath(`/local-movers/${stateSlug}/${countySlug}`);
  const { default: LocalMoversCountyPage } = await countyPage;
  tags.length = 0;
  await assert.rejects(
    () => LocalMoversCountyPage({ params: Promise.resolve({ stateSlug: 'florida', countySlug: 'miami-dade' }) }),
    /stop after county tag/,
  );
  assert.deepEqual(tags, ['county-florida-miami-dade']);
  assert.equal(tags.includes('approved-county-movers'), false);
  assert.equal(tags.includes('companies-directory'), false);
});

test('a missing county does not call addCacheTag', async () => {
  resolveSeo = async () => null;
  const { default: LocalMoversCountyPage } = await countyPage;
  tags.length = 0;
  await assert.rejects(
    () => LocalMoversCountyPage({ params: Promise.resolve({ stateSlug: 'florida', countySlug: 'not-a-county' }) }),
  );
  assert.deepEqual(tags, []);
});

test('hubs, companies, compare and sitemaps do not call the county tag', async () => {
  const county = readFileSync(`${root}/${countySource}`, 'utf8');
  assert.match(county, /export const dynamic = 'force-static';/);
  assert.match(county, /export const revalidate = 60;/);
  assert.match(county, /await attachCountyPageCacheTag\(seo\.path\);/);
  for (const file of untaggedSources) {
    const source = readFileSync(`${root}/${file}`, 'utf8');
    assert.equal(source.includes('attachCountyPageCacheTag'), false, file);
    assert.equal(source.includes('addCacheTag'), false, file);
  }
  tags.length = 0;
  const { attachCountyPageCacheTag } = await import('./attach-county-page-cache-tag');
  for (const path of ['/local-movers', '/local-movers/florida', '/companies', '/compare', '/sitemap-local', '/sitemap.xml']) {
    await attachCountyPageCacheTag(path);
  }
  assert.deepEqual(tags, []);
});
