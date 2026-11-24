import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { seedAutoTransportCompanies } from '@/data/seed-auto-transport';
import { CITY_HUB_SLUG_ALIASES } from '@/lib/destinations/city-hub-slug-aliases';
import { getMarketBySlug, markets } from '@/lib/destinations/markets';
import { getLocalState, localStates } from '@/lib/local-movers/states';
import { destinationGuides, getDestinationGuide } from '@/lib/resources/destination-guides';
import { getRouteGuide, routeGuides } from '@/lib/resources/routes';
import { isPubliclyDisplayableCompany } from '@/lib/trust/company-display-policy';
import {
  A2_AUTO_SLUGS,
  A2_CITY_CLUSTER,
  A2_GUIDE_SLUGS,
  A2_ROUTE_SLUGS,
  A2_STATE_SLUGS,
} from './a2-catalog-index';
import {
  a2UnknownCacheHeaders,
  a2UnknownNotFoundHtml,
  A2_UNKNOWN_CACHE_CONTROL,
  A2_UNKNOWN_CDN_CACHE_CONTROL,
  A2_UNKNOWN_ROBOTS,
} from './a2-unknown-slug';

test('unknown catalog slugs are no-store and known pages keep their policy', () => {
  const unknown = [
    '/local-movers/zz-not-a-state-b3',
    '/resources/guides/zz-not-a-guide-b3',
    '/resources/routes/zz-not-a-route-b3',
    '/moving-to/zz-not-a-city-b3',
    '/moving-to/florida/zz-not-a-city-b3',
    '/auto-transport/zz-not-an-auto-b3',
  ];
  for (const path of unknown) {
    assert.deepEqual(a2UnknownCacheHeaders(path), {
      cacheControl: A2_UNKNOWN_CACHE_CONTROL,
      cdnCacheControl: A2_UNKNOWN_CDN_CACHE_CONTROL,
    });
  }
  assert.equal(A2_UNKNOWN_CACHE_CONTROL.includes('no-store'), true);
  assert.equal(A2_UNKNOWN_CDN_CACHE_CONTROL.includes('max-age'), false);

  const known = [
    '/local-movers/florida',
    '/local-movers/florida/miami-dade',
    '/resources/guides/moving-to-myrtle-beach-2026',
    '/resources/routes/california-to-texas',
    '/moving-to/florida',
    '/moving-to/florida/miami',
    '/moving-to/florida/miami-fl',
    '/auto-transport/montway-auto-transport',
    '/company/zz-not-a-company-b3',
    '/companies/example',
  ];
  for (const path of known) {
    assert.equal(a2UnknownCacheHeaders(path), null, path);
  }
});

test('the 404 document has one robots directive and no canonical', () => {
  const html = a2UnknownNotFoundHtml();
  const robots = html.match(/<meta name="robots"/g) ?? [];
  assert.equal(robots.length, 1);
  assert.equal(html.includes(`content="${A2_UNKNOWN_ROBOTS}"`), true);
  assert.equal(html.includes('canonical'), false);
  assert.equal(html.includes('https://www.movetrusthub.com'), false);
});

test('middleware returns the 404 before the page, including prefetch matchers', () => {
  const source = readFileSync(new URL('../../middleware.ts', import.meta.url), 'utf8');
  const start = source.indexOf('const unresolvedA2 = a2UnknownCacheHeaders');
  const end = source.indexOf('const response = NextResponse.next', start);
  assert.ok(start >= 0 && end > start);
  const block = source.slice(start, end);
  assert.equal(block.includes('status: 404'), true);
  assert.equal(block.includes('a2UnknownNotFoundHtml()'), true);
  assert.equal(block.includes('NextResponse.next'), false);
  assert.ok(source.indexOf('const baseTtl', end) > end);
  for (const matcher of [
    "'/local-movers/:stateSlug'",
    "'/resources/guides/:slug'",
    "'/resources/routes/:slug'",
    "'/moving-to/:slug'",
    "'/moving-to/:stateSlug/:citySlug'",
    "'/auto-transport/:slug'",
  ]) {
    assert.equal(source.includes(matcher), true, matcher);
  }
});

test('the edge slug index matches the catalog modules', () => {
  const slugOk = /^[a-z0-9-]+$/;
  assert.deepEqual(
    [...A2_STATE_SLUGS].sort(),
    localStates.map((state) => state.slug).sort()
  );
  for (const slug of A2_STATE_SLUGS) {
    assert.equal(slugOk.test(slug), true, slug);
    assert.ok(getLocalState(slug));
    assert.equal(a2UnknownCacheHeaders(`/local-movers/${slug}`), null);
  }

  assert.deepEqual(
    [...A2_GUIDE_SLUGS].sort(),
    destinationGuides.map((guide) => guide.slug).sort()
  );
  for (const slug of A2_GUIDE_SLUGS) {
    assert.equal(slugOk.test(slug), true, slug);
    assert.ok(getDestinationGuide(slug));
    assert.equal(a2UnknownCacheHeaders(`/resources/guides/${slug}`), null);
  }

  assert.deepEqual(
    [...A2_ROUTE_SLUGS].sort(),
    routeGuides.map((route) => route.slug).sort()
  );
  for (const slug of A2_ROUTE_SLUGS) {
    assert.equal(slugOk.test(slug), true, slug);
    assert.ok(getRouteGuide(slug));
    assert.equal(a2UnknownCacheHeaders(`/resources/routes/${slug}`), null);
  }

  const displayable = seedAutoTransportCompanies
    .filter((company) => isPubliclyDisplayableCompany(company))
    .map((company) => company.slug)
    .sort();
  assert.deepEqual([...A2_AUTO_SLUGS].sort(), displayable);
  for (const slug of A2_AUTO_SLUGS) {
    assert.equal(slugOk.test(slug), true, slug);
    assert.equal(a2UnknownCacheHeaders(`/auto-transport/${slug}`), null);
  }

  const expectedCity: Record<string, string | null> = {};
  for (const market of markets) {
    expectedCity[market.slug] = market.clusterParent ?? null;
  }
  for (const [alias, canonical] of Object.entries(CITY_HUB_SLUG_ALIASES)) {
    const market = markets.find((item) => item.slug === canonical);
    assert.ok(market, alias);
    expectedCity[alias] = market.clusterParent ?? null;
  }
  assert.deepEqual(
    Object.keys(A2_CITY_CLUSTER).sort(),
    Object.keys(expectedCity).sort()
  );
  for (const [slug, parent] of Object.entries(expectedCity)) {
    assert.equal(slugOk.test(slug), true, slug);
    assert.equal(A2_CITY_CLUSTER[slug], parent);
    assert.equal(getMarketBySlug(slug)?.clusterParent ?? null, parent);
    if (parent) {
      assert.equal(a2UnknownCacheHeaders(`/moving-to/${parent}/${slug}`), null);
    }
  }
});
