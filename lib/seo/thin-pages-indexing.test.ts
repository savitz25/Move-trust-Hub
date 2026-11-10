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
import {
  buildCountyHeroIntro,
  buildMoversSectionHeading,
} from '@/lib/local-movers/county-display-copy';
import { buildCountyFaqItems } from '@/lib/local-movers/county-seo';
import { getIndexableCounties } from '@/lib/local-movers/indexable-counties';
import { getMoversForCounty } from '@/lib/local-movers';
import { evaluateCountyIndexability } from '@/lib/local-movers/county-indexability';
import { buildCountyPageMetadata } from '@/lib/local-movers/seo-metadata';
import { isSitemapExcludedHoldProfile } from '@/lib/seo/sitemap-hold-profiles';
import { localStates } from '@/lib/local-movers/states';
import { cityIndexRollup, countyIndexRollup } from '@/lib/seo/thin-pages-inventory';
import {
  isBasedInOrLicensedForCounty,
  isCountyListOutOfState,
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
  assert.match(local, /export const dynamic = 'force-dynamic'/);
  assert.doesNotMatch(local, /getIndexableCounties/);
  assert.doesNotMatch(local, /getMoversForCounty\(/);

  assert.match(cityPage, /market\.isClusterParent/);
  assert.match(cityPage, /evaluateCityHubIndexability\(market\)\.tier === 'index'/);
  assert.match(
    main,
    /market\.isClusterParent \|\| evaluateCityHubIndexability\(market\)\.tier === 'index'/
  );
  assert.match(main, /export const dynamic = 'force-dynamic'/);
  assert.match(main, /isSeoIndexableCompany/);
  assert.doesNotMatch(main, /isEnrichedCompanyProfile|isGates014HeldSlug|isForbiddenMoveSitemapPath/);
});

test('listed county movers exclude out-of-state and unconfirmed blank headquarters', () => {
  const county = {
    slug: 'fulton',
    name: 'Fulton',
    stateCode: 'GA',
    stateSlug: 'georgia',
    seat: 'Atlanta',
  };
  const outsider = {
    id: 'out',
    name: 'Out',
    headquartersState: 'TX',
    city: 'Dallas',
  } as LocalMover;
  const local = {
    id: 'in',
    name: 'In',
    headquartersState: 'GA',
    city: 'Atlanta',
  } as LocalMover;
  const unknown = {
    id: 'unknown',
    name: 'Unknown',
    headquartersState: '',
    city: '21-00 MORLOT AVE',
  } as LocalMover;
  const confirmedBlank = {
    id: 'blank-local',
    name: 'Blank Local',
    headquartersState: '',
    city: 'Fulton',
  } as LocalMover;
  const listed = listedCountyMovers([outsider, local, unknown, confirmedBlank], county);
  assert.deepEqual(listed.map((mover) => mover.id), ['in', 'blank-local']);
  assert.equal(isOutOfStateCarrier(outsider, 'GA'), true);
  assert.equal(isCountyListOutOfState(unknown, county), true);
  assert.equal(isCountyListOutOfState(confirmedBlank, county), false);
  assert.equal(listed.some((mover) => isCountyListOutOfState(mover, county)), false);

  const losAngeles = getMoversForCounty('california', 'los-angeles');
  assert.ok(losAngeles);
  if (losAngeles) {
    const qualifying = losAngeles.movers.filter((mover) =>
      isBasedInOrLicensedForCounty(mover, losAngeles.county)
    );
    assert.equal(qualifying.length, losAngeles.movers.length);
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
    for (const mover of listedCountyMovers(result.movers, result.county)) {
      assert.equal(isCountyListOutOfState(mover, result.county), false);
    }
    checked += 1;
    if (checked >= 8) break;
  }
  // Static selections without independently readable HQ evidence may all be
  // noindex; live publication-enriched rows are evaluated by the async path.
});

test('a county with zero listed movers does not claim those listings exist', () => {
  const page = readFileSync(
    join(root, 'app/(move)/(marketing)/local-movers/[stateSlug]/[countySlug]/page.tsx'),
    'utf8'
  );
  const jump = readFileSync(
    join(root, 'components/local-movers/county-jump-to-movers.tsx'),
    'utf8'
  );
  const baldwin = getMoversForCounty('alabama', 'baldwin');
  assert.ok(baldwin);
  if (!baldwin) return;
  assert.equal(listedCountyMovers(baldwin.movers, baldwin.county).length, 0);

  const countyLabel = 'Baldwin County';
  const hero = buildCountyHeroIntro(countyLabel, 0, true);
  const heroWithOpener = buildCountyHeroIntro(countyLabel, 0, true, 'Coastal access notes.');
  const heading = buildMoversSectionHeading(countyLabel, 0);
  const faqs = buildCountyFaqItems(baldwin.county, 'Alabama', []);
  const best = faqs.find((item) => item.question.includes('best local movers'));
  const metadata = buildCountyPageMetadata(
    baldwin.county,
    'Alabama',
    baldwin.movers,
    '/local-movers/alabama/baldwin'
  );
  const description = String(metadata.description ?? '');
  const blob = [hero, heroWithOpener, heading, best?.answer ?? '', description].join('\n');
  for (const phrase of [
    'being added',
    'being expanded',
    'are building',
    'still expanding',
    'Carriers and brokers below',
    'below serve',
    'Compare regional carriers on this page',
    'verified listings',
    'View Local Movers',
    'Movers listed serve',
  ]) {
    assert.equal(blob.includes(phrase), false, phrase);
  }
  assert.match(hero, /No movers are listed for Baldwin County/);
  assert.match(heading, /No movers listed for Baldwin County/);
  assert.match(description, /Moving in Baldwin County, Alabama/);
  assert.match(description, /No movers are listed for this county/);
  assert.doesNotMatch(description, /\d+ movers/);
  assert.match(best?.answer ?? '', /No movers are listed for Baldwin County/);
  assert.doesNotMatch(best?.answer ?? '', /below/);

  const regional = {
    id: 'regional-al',
    name: 'Regional Haul',
    headquartersState: 'AL',
    city: 'Huntsville',
    rating: 4.2,
    reviewCount: 12,
  } as LocalMover;
  const listedFaqs = buildCountyFaqItems(baldwin.county, 'Alabama', [regional]);
  const listedBest = listedFaqs.find((item) => item.question.includes('best local movers'));
  assert.match(listedBest?.answer ?? '', /Carriers and brokers below serve it regionally/);

  const withListings = buildCountyHeroIntro(countyLabel, 2, false);
  assert.match(withListings, /Compare 2 FMCSA-licensed movers serving Baldwin County/);

  assert.match(page, /isRegionalFallback && listedMovers\.length > 0/);
  assert.match(page, /No movers are listed for this county\. Search/);
  assert.doesNotMatch(page, /Mover listings for this county are being added/);
  assert.match(page, /listedMovers\.length > 0\s*\?/);
  assert.match(jump, /moverCount === 0/);
  assert.match(jump, /No movers listed for \$\{countyLabel\}/);
  assert.match(jump, /This county page does not list movers/);
  assert.match(jump, /View Local Movers in \$\{countyLabel\}/);

  const losAngeles = getMoversForCounty('california', 'los-angeles');
  assert.ok(losAngeles);
  if (!losAngeles) return;
  assert.equal(listedCountyMovers(losAngeles.movers, losAngeles.county).length, 0);
  const laMeta = buildCountyPageMetadata(
    losAngeles.county,
    'California',
    losAngeles.movers,
    '/local-movers/california/los-angeles'
  );
  const laDescription = String(laMeta.description ?? '');
  assert.match(laDescription, /No movers are listed for this county/);
  assert.doesNotMatch(laDescription, /\d+ movers/);

  const baldwinDecision = evaluateCountyIndexability('alabama', 'baldwin');
  const laDecision = evaluateCountyIndexability('california', 'los-angeles');
  assert.equal(baldwinDecision.tier, 'noindex');
  assert.equal(baldwinDecision.reason, 'no_evidence_supported_movers');
  assert.equal(laDecision.tier, 'noindex');
  assert.equal(laDecision.reason, 'no_evidence_supported_movers');
  assert.equal(robotsIndex(metadata), false);
  assert.equal(robotsIndex(laMeta), false);
  assert.equal(
    getIndexableCounties('alabama').some((county) => county.slug === 'baldwin'),
    false
  );
  assert.equal(
    getIndexableCounties('california').some((county) => county.slug === 'los-angeles'),
    false
  );
});

function robotsIndex(metadata: { robots?: unknown }): boolean | undefined {
  const robots = metadata.robots;
  if (!robots || typeof robots === 'string' || Array.isArray(robots)) return undefined;
  return (robots as { index?: boolean }).index;
}

test('indexable county sitemap pages list at least one mover', () => {
  let indexable = 0;
  const empty: string[] = [];
  for (const state of localStates) {
    for (const county of getIndexableCounties(state.slug)) {
      indexable += 1;
      const result = getMoversForCounty(state.slug, county.slug);
      const listed = result ? listedCountyMovers(result.movers, result.county).length : 0;
      const decision = evaluateCountyIndexability(state.slug, county.slug);
      if (listed === 0 || decision.tier !== 'index') {
        empty.push(`/local-movers/${state.slug}/${county.slug}`);
      }
    }
  }
  assert.ok(indexable > 0);
  assert.deepEqual(empty, []);
});

test('hold profiles stay out of sitemap.xml and identified profiles stay eligible', () => {
  assert.equal(isSitemapExcludedHoldProfile('cord-moving-storage'), true);
  assert.equal(isSitemapExcludedHoldProfile('gouffon-moving-storage-2'), true);
  assert.equal(isSitemapExcludedHoldProfile('cord-moving-storage-memphis'), false);
  assert.equal(isSitemapExcludedHoldProfile('gouffon-moving-storage'), false);

  const sitemap = readFileSync(join(root, 'app/sitemap.ts'), 'utf8');
  const companies = readFileSync(join(root, 'lib/supabase/queries/companies.ts'), 'utf8');
  assert.match(sitemap, /isSitemapExcludedHoldProfile\(company\.slug\)/);
  assert.match(companies, /isSitemapExcludedHoldProfile\(company\.slug\)/);
  assert.match(companies, /isSitemapExcludedHoldProfile\(row\.slug\)/);
  assert.match(companies, /company-sitemap-entries-v3-hold-exclusions/);
  assert.doesNotMatch(sitemap, /cord-moving-storage-memphis|gouffon-moving-storage'/);
});
