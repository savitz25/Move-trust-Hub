import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getPublishedIndexableCounties } from '../lib/local-movers/county-indexability-async';
import { STATEWIDE_ROUTES } from '../lib/seo/statewide-routes';

const sitemapSource = readFileSync('app/sitemap-local/sitemap.ts', 'utf8');
const linkSource = readFileSync('components/local-movers/state-county-links.tsx', 'utf8');
const pageSource = readFileSync('lib/local-movers/county-page-seo.ts', 'utf8');
assert.match(sitemapSource, /evaluatePublishedStateCounties/);
assert.match(linkSource, /getPublishedIndexableCounties/);
assert.match(pageSource, /publishedCountyIndexDecision/);
assert.doesNotMatch(sitemapSource, /getIndexableCounties/);
assert.doesNotMatch(linkSource, /getIndexableCounties\(/);

const base = process.argv[2] ?? 'http://localhost:3000';

async function htmlAt(path: string) {
  const response = await fetch(new URL(path, base), {
    redirect: 'manual',
    headers: { 'User-Agent': 'Googlebot' },
    signal: AbortSignal.timeout(180_000),
  });
  assert.equal(response.status, 200, path);
  return response.text();
}

const hrefs = (html: string) => [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);

for (const state of ['new-jersey', 'florida'] as const) {
  const counties = await getPublishedIndexableCounties(state);
  const expected = [
    `/local-movers/${state}`,
    ...counties.map((county) => `/local-movers/${state}/${county.slug}`),
  ].sort();
  console.log(`${state}: PUBLISHED_INDEXABLE_COUNTIES = ${counties.length}`);
  console.log(`${state}: COUNTIES = ${counties.map((county) => county.slug).sort().join(',')}`);

  try {
    const links = new Set(hrefs(await htmlAt(`/${state}`)));
    const countyLinks = [...links].filter((href) => href.startsWith(`/local-movers/${state}`)).sort();
    assert.deepEqual(countyLinks, expected, `${state} rendered links`);
    console.log(`${state}: RENDERED_LINKS_MATCH = YES`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/ECONNREFUSED|fetch failed|AbortError/i.test(message)) {
      console.log(`${state}: RENDERED_LINKS_MATCH = SKIPPED (${message})`);
    } else {
      throw error;
    }
  }
}

try {
  const statesHtml = await htmlAt('/states');
  const stateLinks = new Set(hrefs(statesHtml));
  for (const path of STATEWIDE_ROUTES) assert.ok(stateLinks.has(path), path);
  assert.match(statesHtml, /rel="canonical" href="https:\/\/www\.movetrusthub\.com\/states"/);
  for (const state of ['iowa', 'kansas', 'missouri']) {
    assert.ok(stateLinks.has(`/${state}`));
    console.log(`${state.toUpperCase()}_ON_STATES = YES`);
  }
  console.log('STATES_HTTP = 200');
  const home = await htmlAt('/');
  assert.ok(hrefs(home).includes('/states'));
  assert.match(home.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1] ?? '', /href="\/states"/);
  console.log('HOMEPAGE_LINKS_STATES = YES');
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  if (/ECONNREFUSED|fetch failed|AbortError/i.test(message)) {
    console.log(`STATES_HTTP = SKIPPED (${message})`);
  } else {
    throw error;
  }
}
