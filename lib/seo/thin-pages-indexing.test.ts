/**
 * MOVE-THIN-PAGES-INDEXING-001
 * Fails when a noindex county or city URL is also a sitemap URL.
 *
 *   npm run check:move-thin-pages-indexing
 */

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { getIndexableCounties } from '@/lib/local-movers/indexable-counties';
import { getMoversForCounty } from '@/lib/local-movers';
import { localStates } from '@/lib/local-movers/states';
import { cityIndexRollup, countyIndexRollup } from '@/lib/seo/thin-pages-inventory';
import {
  isBasedInOrLicensedForCounty,
  isOutOfStateCarrier,
  listedCountyMovers,
} from '@/lib/seo/unique-local-movers';
import type { LocalMover } from '@/lib/local-movers/types';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');

test('seed noindex county and city URLs stay out of the seed indexable set', () => {
  const counties = countyIndexRollup();
  const cities = cityIndexRollup();
  const dropped = new Set([
    ...counties.flatMap((row) => row.dropped),
    ...cities.flatMap((row) => row.dropped),
  ]);
  const sitemapPaths = new Set<string>();
  for (const state of localStates) {
    sitemapPaths.add(`/local-movers/${state.slug}`);
    for (const county of getIndexableCounties(state.slug)) {
      sitemapPaths.add(`/local-movers/${state.slug}/${county.slug}`);
    }
  }
  for (const row of cities) {
    for (const url of row.kept) sitemapPaths.add(url);
  }

  const leaks = [...dropped].filter((url) => sitemapPaths.has(url));
  assert.deepEqual(leaks, []);

  for (const row of counties) {
    for (const url of row.kept) {
      assert.equal(sitemapPaths.has(url), true, url);
    }
  }
});

test('county sitemap and live county page share the async mover source', () => {
  const page = readFileSync(join(root, 'lib/local-movers/county-page-seo.ts'), 'utf8');
  const local = readFileSync(join(root, 'app/sitemap-local/sitemap.ts'), 'utf8');
  const cityPage = readFileSync(join(root, 'lib/destinations/resolve-city-hub-page.ts'), 'utf8');
  const main = readFileSync(join(root, 'app/sitemap.ts'), 'utf8');

  assert.match(page, /getMoversForCountyAsync\(stateSlug, countySlug\)/);
  assert.match(page, /evaluateCountyIndexabilityFromResult\(\s*stateSlug,\s*countySlug,\s*result/);
  assert.match(local, /getMoversForCountyAsync\(id, county\.slug\)/);
  assert.match(local, /evaluateCountyIndexabilityFromResult\(id, county\.slug, result\)/);
  assert.match(local, /entry\.decision\.tier === 'index'/);
  assert.doesNotMatch(local, /getIndexableCounties/);
  assert.doesNotMatch(local, /getMoversForCounty\(/);

  assert.match(cityPage, /market\.isClusterParent/);
  assert.match(cityPage, /evaluateCityHubIndexability\(market\)\.tier === 'index'/);
  assert.match(
    main,
    /market\.isClusterParent \|\| evaluateCityHubIndexability\(market\)\.tier === 'index'/
  );
  assert.match(main, /isSeoIndexableCompany/);
  assert.doesNotMatch(main, /isEnrichedCompanyProfile|isGates014HeldSlug|isForbiddenMoveSitemapPath/);
});

test('listed county movers exclude confirmed out-of-state carriers', () => {
  const outsider = {
    id: 'out',
    name: 'Out',
    headquartersState: 'TX',
  } as LocalMover;
  const local = {
    id: 'in',
    name: 'In',
    headquartersState: 'GA',
  } as LocalMover;
  const unknown = {
    id: 'unknown',
    name: 'Unknown',
    headquartersState: '',
  } as LocalMover;
  const listed = listedCountyMovers([outsider, local, unknown], 'GA');
  assert.deepEqual(listed.map((mover) => mover.id), ['in', 'unknown']);
  assert.equal(isOutOfStateCarrier(outsider, 'GA'), true);
  assert.equal(listed.some((mover) => isOutOfStateCarrier(mover, 'GA')), false);

  const losAngeles = getMoversForCounty('california', 'los-angeles');
  assert.ok(losAngeles);
  if (losAngeles) {
    const qualifying = losAngeles.movers.filter((mover) =>
      isBasedInOrLicensedForCounty(mover, losAngeles.county)
    );
    assert.ok(qualifying.length >= 3);
    assert.equal(
      qualifying.some((mover) => isOutOfStateCarrier(mover, losAngeles.county.stateCode)),
      false
    );
  }

  let checked = 0;
  for (const state of localStates) {
    const county = getIndexableCounties(state.slug)[0];
    if (!county) continue;
    const result = getMoversForCounty(state.slug, county.slug);
    if (!result) continue;
    for (const mover of listedCountyMovers(result.movers, result.county.stateCode)) {
      assert.equal(isOutOfStateCarrier(mover, result.county.stateCode), false);
    }
    checked += 1;
    if (checked >= 8) break;
  }
  assert.ok(checked > 0);
});
