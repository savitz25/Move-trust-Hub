/**
 * Audit sitemap/robots hygiene — duplicates, doubled prefixes, admin/noindex leaks.
 * Usage: npx tsx scripts/audit-sitemap-hygiene.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { DESTINATION_STATES } from '../lib/insurance/destinations/data';
import { ARTICLES } from '../lib/insurance/resources/articles';
import { FALLBACK_PROVIDERS } from '../lib/insurance/providers/fallback-data';
import { INSURANCE_HUBS, getAllStateSlugs } from '../lib/insurance/hubs/registry';
import { SPECIALTY_TOPICS } from '../lib/insurance/hubs/specialty-topics';
import { finalizeHubSitemap, hubSitemapEntry } from '../lib/hub/sitemap-helpers';
import { hubCanonicalUrl } from '../lib/hub/paths';
import { lenders } from '../lib/lender/mockData';
import { stateData } from '../lib/lender/fdic/stateData';
import { getStateSlugsWithLenders } from '../lib/lender/mortgage/stateLenders';
import { getStateSlugsWithAutoProviders } from '../lib/lender/auto/stateProviders';
import { getAllClusterParams } from '../lib/lender/clusters/registry';

const SITE = 'https://www.movetrusthub.com';

const INSURANCE_NOINDEX_PATHS = new Set([
  '/insurance/admin',
  '/insurance/admin/login',
  '/insurance/admin/reviews',
  '/insurance/admin/providers',
  '/insurance/admin/leads',
]);

const INSURANCE_REDIRECT_PATHS = new Set([
  '/insurance/hubs/south-florida', // 301 → /insurance/hubs/florida/miami-fort-lauderdale
]);

function collectInsuranceUrls(): string[] {
  const HUB = 'insurance' as const;
  const staticPaths = [
    '/',
    '/directory',
    '/destinations',
    '/resources',
    '/tools',
    '/providers',
    '/hubs',
    '/hubs/browse',
    '/calculators',
    '/calculators/premium-estimator',
    '/calculators/medicare-gap',
    '/calculators/aca-subsidy',
    '/tools/cost-estimator',
    '/tools/needs-assessment',
    '/tools/license-verification',
    '/tools/quote-comparison',
    '/tools/medicare-plan-finder',
    '/tools/aca-eligibility-checker',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ];

  return finalizeHubSitemap(HUB, [
    ...staticPaths.map((p) => hubSitemapEntry(HUB, p)),
    ...getAllStateSlugs().map((s) => hubSitemapEntry(HUB, `/hubs/browse/${s}`)),
    ...SPECIALTY_TOPICS.map((t) => hubSitemapEntry(HUB, `/hubs/${t.slug}`, { priority: 0.85 })),
    ...DESTINATION_STATES.map((s) => hubSitemapEntry(HUB, `/destinations/${s.slug}`)),
    ...DESTINATION_STATES.flatMap((s) =>
      s.cities.map((c) => hubSitemapEntry(HUB, `/destinations/${s.slug}/${c.slug}`))
    ),
    ...ARTICLES.map((a) => hubSitemapEntry(HUB, `/resources/${a.slug}`)),
    ...FALLBACK_PROVIDERS.map((p) => hubSitemapEntry(HUB, `/providers/${p.slug}`)),
    ...INSURANCE_HUBS.map((h) => hubSitemapEntry(HUB, `/hubs/${h.stateSlug}/${h.slug}`)),
    ...getAllStateSlugs().map((s) => hubSitemapEntry(HUB, `/hubs/${s}`)),
  ]).map((e) => e.url);
}

function collectLenderUrls(): string[] {
  const HUB = 'lender' as const;
  const now = new Date('2026-07-02');
  const staticPaths = [
    '/',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/calculators',
    '/compare',
    '/local-lenders',
    '/fdic-insured-banks',
    '/auto-loan-companies',
    '/resources',
    '/resources/how-to-choose-mortgage-lender',
  ];

  return finalizeHubSitemap(HUB, [
    ...staticPaths.map((p) => hubSitemapEntry(HUB, p, { lastModified: now })),
    ...Object.keys(stateData).map((s) =>
      hubSitemapEntry(HUB, `/fdic-insured-banks/${s}`, { lastModified: now })
    ),
    ...getStateSlugsWithLenders().map((s) =>
      hubSitemapEntry(HUB, `/local-lenders/${s}`, { lastModified: now })
    ),
    ...getStateSlugsWithAutoProviders().map((s) =>
      hubSitemapEntry(HUB, `/auto-loan-companies/${s}`, { lastModified: now })
    ),
    ...getAllClusterParams().map(({ state, cluster }) =>
      hubSitemapEntry(HUB, `/local-lenders/${state}/${cluster}`, { lastModified: now })
    ),
    ...lenders.map((l) => hubSitemapEntry(HUB, `/lenders/${l.slug}`, { lastModified: now })),
  ]).map((e) => e.url);
}

function collectMoveHubLandings(): string[] {
  return [`${SITE}/lender`, `${SITE}/insurance`];
}

function findDuplicates(urls: string[], label: string): string[] {
  const seen = new Map<string, number>();
  for (const url of urls) {
    seen.set(url, (seen.get(url) ?? 0) + 1);
  }
  return [...seen.entries()].filter(([, n]) => n > 1).map(([u]) => u);
}

function findBadPrefixes(urls: string[]): string[] {
  return urls.filter(
    (u) =>
      u.includes('/lender/lender') ||
      u.includes('/insurance/insurance') ||
      u.includes('/lender/insurance') ||
      u.includes('/insurance/lender')
  );
}

function readRobotsDisallows(): string[] {
  const robotsPath = path.join(__dirname, '../app/robots.ts');
  const content = fs.readFileSync(robotsPath, 'utf8');
  const match = content.match(/disallow:\s*\[([\s\S]*?)\]/);
  if (!match) return [];
  return [...match[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
}

const insurance = collectInsuranceUrls();
const lender = collectLenderUrls();
const moveLandings = collectMoveHubLandings();

const insuranceDupes = findDuplicates(insurance, 'insurance');
const lenderDupes = findDuplicates(lender, 'lender');
const crossDupes = [...new Set(moveLandings)].filter((u) => insurance.includes(u) || lender.includes(u));

const badInsurance = insurance.filter((u) => {
  const pathname = u.replace(SITE, '');
  return (
    INSURANCE_NOINDEX_PATHS.has(pathname) ||
    pathname.startsWith('/insurance/admin/') ||
    INSURANCE_REDIRECT_PATHS.has(pathname)
  );
});

const badPrefixes = [...findBadPrefixes(insurance), ...findBadPrefixes(lender)];
const disallows = readRobotsDisallows();

const clusterCount = getAllClusterParams().length;
const clusterInSitemap = lender.filter((u) => /\/local-lenders\/[^/]+\/[^/]+$/.test(u.replace(SITE, ''))).length;

console.log('\n=== Sitemap Hygiene Audit ===\n');
console.log(`Insurance URLs: ${insurance.length}`);
console.log(`Lender URLs: ${lender.length}`);
console.log(`Move hub landings: ${moveLandings.length}`);
console.log(`Cluster params: ${clusterCount}, cluster URLs in lender sitemap: ${clusterInSitemap}`);

if (insuranceDupes.length) {
  console.log('\n[ERROR] Insurance internal duplicates:');
  insuranceDupes.forEach((u) => console.log(`  ${u}`));
}

if (lenderDupes.length) {
  console.log('\n[ERROR] Lender internal duplicates:');
  lenderDupes.forEach((u) => console.log(`  ${u}`));
}

if (crossDupes.length) {
  console.log('\n[WARN] Hub landings duplicated across move + hub sitemaps (expected for /lender, /insurance):');
  crossDupes.forEach((u) => console.log(`  ${u}`));
}

if (badInsurance.length) {
  console.log('\n[ERROR] Insurance sitemap includes noindex/redirect/admin paths:');
  badInsurance.forEach((u) => console.log(`  ${u}`));
}

if (badPrefixes.length) {
  console.log('\n[ERROR] Doubled/wrong hub prefixes:');
  badPrefixes.forEach((u) => console.log(`  ${u}`));
}

const requiredDisallows = ['/api/', '/lender/admin', '/insurance/admin'];
const missingDisallows = requiredDisallows.filter((d) => !disallows.some((x) => x === d || x.startsWith(d)));
if (missingDisallows.length) {
  console.log('\n[ERROR] robots.ts missing disallows:');
  missingDisallows.forEach((d) => console.log(`  ${d}`));
} else {
  console.log('\n[OK] robots.ts has required disallows');
}

// Sample canonical check
const sampleCluster = hubSitemapEntry('lender', '/local-lenders/florida/south-florida').url;
const expectedCluster = hubCanonicalUrl('lender', '/local-lenders/florida/south-florida');
if (sampleCluster !== expectedCluster) {
  console.log(`\n[ERROR] Cluster canonical mismatch: ${sampleCluster} vs ${expectedCluster}`);
} else {
  console.log(`\n[OK] Cluster canonical: ${sampleCluster}`);
}

const errors =
  insuranceDupes.length +
  lenderDupes.length +
  badInsurance.length +
  badPrefixes.length +
  missingDisallows.length;

process.exit(errors > 0 ? 1 : 0);