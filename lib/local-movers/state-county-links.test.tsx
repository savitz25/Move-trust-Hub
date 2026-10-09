import React from 'react';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { StateCountyLinks } from '@/components/local-movers/state-county-links';
import { getIndexableCounties } from '@/lib/local-movers/indexable-counties';
import { localStates } from '@/lib/local-movers/states';
import { STATEWIDE_ROUTES } from '@/lib/seo/statewide-routes';
import { PUBLISHED_STATEWIDE_SLUGS } from '@/lib/seo/published-state-path';
import localSitemap from '@/app/sitemap-local/sitemap';
import StatesPage, { metadata } from '@/app/(move)/states/page';

Object.assign(globalThis, { React });

for (const [stateSlug, stateName, count] of [
  ['new-jersey', 'New Jersey', 21],
  ['florida', 'Florida', 67],
] as const) {
  test(`${stateName} server HTML links every indexable county`, async () => {
    const counties = getIndexableCounties(stateSlug);
    assert.equal(counties.length, count);
    const html = renderToStaticMarkup(<StateCountyLinks stateSlug={stateSlug} stateName={stateName} />);
    const links = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
    const sitemapPaths = (await localSitemap({ id: stateSlug })).map(({ url }) => new URL(url).pathname);
    assert.deepEqual(links.sort(), sitemapPaths.sort());
    assert.ok(html.includes(`${stateName} counties`));
  });
}

test('all local sitemaps retain 1,746 URLs and share the same county selection', async () => {
  let total = 0;
  for (const state of localStates) {
    const entries = await localSitemap({ id: state.slug });
    total += entries.length;
    assert.deepEqual(
      entries.slice(1).map(({ url }) => new URL(url).pathname).sort(),
      getIndexableCounties(state.slug).map((county) => `/local-movers/${state.slug}/${county.slug}`).sort(),
    );
  }
  assert.equal(total, 1746);
});

test('state index matches the sitemap route source and includes IA/KS/MO', () => {
  const html = renderToStaticMarkup(<StatesPage />);
  const paths = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(paths.sort(), [...STATEWIDE_ROUTES].sort());
  assert.equal(metadata.alternates?.canonical, 'https://www.movetrusthub.com/states');
  for (const slug of ['iowa', 'kansas', 'missouri'] as const) {
    assert.ok(PUBLISHED_STATEWIDE_SLUGS.includes(slug));
    assert.ok(paths.includes(`/${slug}`));
  }
  for (const path of STATEWIDE_ROUTES) {
    const page = `app/(move)${path}/page.tsx`;
    assert.ok(existsSync(page), page);
    assert.ok(readFileSync(page, 'utf8').includes(`stateSlug="${path.slice(1)}"`), page);
  }
  const sitemapSource = readFileSync('app/sitemap.ts', 'utf8');
  assert.ok(sitemapSource.includes('...STATEWIDE_ROUTES'));
  assert.ok(sitemapSource.includes("'/states'"));
  assert.ok(readFileSync('app/(move)/page.tsx', 'utf8').includes('href="/states"'));
  assert.ok(readFileSync('lib/hub/config.ts', 'utf8').includes("{ href: '/states', label: 'All states' }"));
});
