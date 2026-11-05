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
import { assessProfileQuality } from '@/lib/directory/profile-quality';
import { methodologyHref } from '@/lib/trust/methodology-paths';
import {
  networkHubHref,
  publicHubUrl,
  rewriteCrossHubHref,
} from '@/lib/network/handoff-href';
import { isEnrichedCompanyProfile } from '@/lib/seo/company-index-eligibility';
import { dispositionForDeletedSlug } from '@/lib/seo/company-slug-disposition';
import { isGates014HeldSlug } from '@/lib/seo/gates-014-hold';
import { moveLenderLegacyDecision } from '@/lib/seo/move-lender-legacy';
import {
  cityIndexRollup,
  countyIndexRollup,
  forbiddenSitemapPaths,
} from '@/lib/seo/thin-pages-inventory';
import {
  isBasedInOrLicensedForCounty,
  isOutOfStateCarrier,
  listedCountyMovers,
} from '@/lib/seo/unique-local-movers';
import { rowLastModified } from '@/lib/seo/sitemap-lastmod';
import { cleanCanonicalUrl, isCompareOrVerifyResult, urlHasTrackingParam } from '@/lib/seo/crawl-variants';
import type { Company } from '@/types';
import type { LocalMover } from '@/lib/local-movers/types';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');

test('noindex county and city URLs are absent from sitemap path sets', () => {
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
  assert.deepEqual(forbiddenSitemapPaths([...sitemapPaths]), []);
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

test('thin and held company profiles stay out of the enriched sitemap set', () => {
  const dotOnly = {
    slug: 'dot-only-carrier',
    usdotNumber: '3051842',
    indexable: true,
    publicationState: 'PUBLISHABLE',
    reviewCount: 0,
  } as Company;
  const enriched = {
    slug: 'enriched-carrier',
    usdotNumber: '3051842',
    indexable: true,
    publicationState: 'PUBLISHABLE',
    reviewCount: 4,
    website: 'https://example.com',
  } as Company;
  assert.equal(isEnrichedCompanyProfile(dotOnly), false);
  assert.equal(assessProfileQuality(dotOnly).indexable, false);
  assert.equal(isEnrichedCompanyProfile(enriched), true);
  assert.equal(assessProfileQuality(enriched).indexable, true);

  for (const slug of ['cord-moving-storage', 'gouffon-moving-storage-2', 'true-friends', 'true-friends-moving-company-llc']) {
    assert.equal(isGates014HeldSlug(slug), true);
    assert.equal(
      isEnrichedCompanyProfile({
        ...enriched,
        slug,
        reviewCount: 200,
        phone: '404-555-0100',
        website: 'https://example.com',
      }),
      false
    );
    assert.equal(assessProfileQuality({ ...enriched, slug }).indexable, false);
  }
});

test('deleted company slugs resolve to 410 or 301 and are not live 200s', () => {
  assert.equal(dispositionForDeletedSlug('cord-moving-storage'), null);
  assert.deepEqual(dispositionForDeletedSlug('removed-carrier', { 'removed-carrier': { status: 410 } }), {
    status: 410,
  });
  assert.deepEqual(
    dispositionForDeletedSlug('old-carrier', { 'old-carrier': { status: 301, to: '/companies/new-carrier' } }),
    { status: 301, to: '/companies/new-carrier' }
  );
});

test('tracking params canonical to the clean URL and compare results are noindex', () => {
  const url = new URL('https://www.movetrusthub.com/companies/example?from=/x&fromLabel=Back&add=1&q=atlas');
  assert.equal(urlHasTrackingParam(url), true);
  assert.equal(cleanCanonicalUrl(url), 'https://www.movetrusthub.com/companies/example');
  assert.equal(isCompareOrVerifyResult('/compare', '?add=a'), true);
  assert.equal(isCompareOrVerifyResult('/compare', ''), false);
  assert.equal(isCompareOrVerifyResult('/verify-dot', '?q=1'), true);
  assert.equal(
    methodologyHref('badges', { returnPath: '/companies/example', returnLabel: 'Example' }).includes('?'),
    false
  );
});

test('cross-hub crawlable hrefs are public hub URLs', () => {
  const lender = networkHubHref('lender', true, '/my-lending');
  assert.equal(lender, 'https://www.lendertrusthub.com/my-lending');
  assert.equal(lender.includes('/api/auth/network-handoff'), false);
  assert.equal(publicHubUrl('lender', '/lender/florida'), 'https://www.lendertrusthub.com/florida');
  assert.equal(
    rewriteCrossHubHref('/lender/no-such-page', true, 'move'),
    'https://www.lendertrusthub.com/no-such-page'
  );
  assert.equal(
    rewriteCrossHubHref('/insurance/resources/guides/example', true, 'move'),
    'https://www.insurancetrusthub.com/resources/guides/example'
  );
  assert.equal(
    rewriteCrossHubHref('https://www.lendertrusthub.com/local-lenders', true, 'move').startsWith(
      'https://www.lendertrusthub.com/'
    ),
    true
  );
});

test('Move lender legacy paths 308 only when Lender publishes that path', () => {
  const florida = moveLenderLegacyDecision('/lender/florida');
  assert.equal(florida?.status, 308);
  if (florida?.status === 308) {
    assert.equal(florida.destination, 'https://www.lendertrusthub.com/florida');
  }
  assert.deepEqual(moveLenderLegacyDecision('/lender/resources/first-time-homebuyer-programs'), {
    status: 410,
  });
  assert.equal(moveLenderLegacyDecision('/companies/example'), null);
});

test('sitemap lastmod ignores empty timestamps and sitemap sources omit deploy dates', () => {
  assert.equal(rowLastModified(null), undefined);
  assert.equal(rowLastModified(''), undefined);
  assert.equal(rowLastModified('not-a-date'), undefined);
  assert.ok(rowLastModified('2026-04-01T00:00:00.000Z') instanceof Date);

  const main = readFileSync(join(root, 'app/sitemap.ts'), 'utf8');
  const local = readFileSync(join(root, 'app/sitemap-local/sitemap.ts'), 'utf8');
  const vercel = readFileSync(join(root, 'vercel.json'), 'utf8');
  assert.doesNotMatch(main, /new Date\(/);
  assert.doesNotMatch(local, /new Date\(/);
  assert.match(main, /evaluateCityHubIndexability/);
  assert.match(main, /isForbiddenMoveSitemapPath/);
  assert.match(main, /isEnrichedCompanyProfile/);
  assert.match(main, /isGates014HeldSlug/);
  assert.match(local, /getIndexableCounties/);
  assert.match(local, /tier !== 'index'/);
  assert.doesNotMatch(vercel, /"source": "\/lender\/:path\*"/);
});
