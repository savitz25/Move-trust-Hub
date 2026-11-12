import React from 'react';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { StateCountyLinkList } from '@/components/local-movers/state-county-links';
import { getPublishedIndexableCounties } from '@/lib/local-movers/county-indexability-async';
import { STATEWIDE_ROUTES } from '@/lib/seo/statewide-routes';
import { PUBLISHED_STATEWIDE_SLUGS } from '@/lib/seo/published-state-path';
import localSitemap from '@/app/sitemap-local/sitemap';
import StatesPage, { metadata } from '@/app/(move)/states/page';

Object.assign(globalThis, { React });

for (const [stateSlug, stateName] of [
  ['new-jersey', 'New Jersey'],
  ['florida', 'Florida'],
] as const) {
  test(`${stateName} directory links match the sitemap decision`, async () => {
    const counties = await getPublishedIndexableCounties(stateSlug);
    const html = renderToStaticMarkup(
      <StateCountyLinkList stateSlug={stateSlug} stateName={stateName} counties={counties} />
    );
    const links = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
    const sitemapPaths = (await localSitemap({ id: stateSlug })).map(({ url }) => new URL(url).pathname);
    assert.deepEqual(links.sort(), sitemapPaths.sort());
    assert.ok(html.includes(`${stateName} counties`));
    assert.equal(links.filter((href) => href === `/local-movers/${stateSlug}`).length, 1);
  });
}

test('state directory source uses the published sitemap evaluator', () => {
  const links = readFileSync('components/local-movers/state-county-links.tsx', 'utf8');
  const sitemap = readFileSync('app/sitemap-local/sitemap.ts', 'utf8');
  const page = readFileSync('lib/local-movers/county-page-seo.ts', 'utf8');
  assert.match(links, /getPublishedIndexableCounties/);
  assert.doesNotMatch(links, /getIndexableCounties/);
  assert.match(sitemap, /evaluatePublishedStateCounties/);
  assert.doesNotMatch(sitemap, /getIndexableCounties/);
  assert.match(page, /publishedCountyEvaluation/);
});

test('state index matches the sitemap route source and includes IA/KS/MO', () => {
  const html = renderToStaticMarkup(<StatesPage />);
  const paths = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(paths.sort(), [...STATEWIDE_ROUTES].sort());
  assert.equal(metadata.alternates?.canonical, 'https://www.movetrusthub.com/states');
  for (const slug of ['iowa', 'kansas', 'missouri', 'alaska', 'hawaii', 'montana', 'north-dakota', 'rhode-island', 'south-dakota', 'vermont', 'wyoming'] as const) {
    assert.ok(PUBLISHED_STATEWIDE_SLUGS.includes(slug));
    assert.ok(paths.includes(`/${slug}`));
  }
  for (const path of STATEWIDE_ROUTES) {
    const grouped = `app/(move)${path}/page.tsx`;
    const page = existsSync(grouped) ? grouped : `app${path}/page.tsx`;
    assert.ok(existsSync(page), page);
    const source = readFileSync(page, 'utf8');
    if (source.includes('StateCountyLinks')) {
      assert.ok(source.includes(`stateSlug="${path.slice(1)}"`), page);
    }
  }
  const sitemapSource = readFileSync('app/sitemap.ts', 'utf8');
  assert.ok(sitemapSource.includes('...STATEWIDE_ROUTES'));
  assert.ok(sitemapSource.includes("'/states'"));
  assert.ok(readFileSync('app/(move)/page.tsx', 'utf8').includes('href="/states"'));
  assert.ok(readFileSync('lib/hub/config.ts', 'utf8').includes("{ href: '/states', label: 'All states' }"));
});
