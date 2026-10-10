import assert from 'node:assert/strict';
import { getIndexableCounties } from '../lib/local-movers/indexable-counties';
import { STATEWIDE_ROUTES } from '../lib/seo/statewide-routes';

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

for (const [state, count] of [['new-jersey', 21], ['florida', 67]] as const) {
  const counties = getIndexableCounties(state);
  assert.equal(counties.length, count);
  const links = new Set(hrefs(await htmlAt(`/${state}`)));
  const missing = counties.filter((county) => !links.has(`/local-movers/${state}/${county.slug}`));
  assert.equal(missing.length, 0, `${state}: ${missing.map((county) => county.slug).join(', ')}`);
  assert.ok(links.has(`/local-movers/${state}`));
  console.log(`${state}: INDEXABLE_COUNTIES = ${count}; STATE_PAGE_MISSING_COUNTY_LINKS = 0`);
}
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
