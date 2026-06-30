/**
 * Full-site SEO audit — city hubs, routes, linking, indexability, sitemap tiers.
 * Run: npx tsx scripts/audit-seo-pass.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { getPublishedCityHubSlugs } from '../lib/destinations/content';
import {
  countAutoCountyHubLinks,
  getAutoDestinationHubLinkForCounty,
} from '../lib/destinations/hub-county-linking';
import { getDestinationHubLinkForCounty } from '../lib/destinations/county-destination-links';
import {
  getClusterParentMarkets,
  getMarketBySlug,
  markets,
} from '../lib/destinations/markets';
import { getAllCountyParams } from '../lib/local-movers/geography/index';
import { evaluateCountyIndexability } from '../lib/local-movers/county-indexability';
import { routeGuides } from '../lib/resources/routes';
import { getExtendedRouteSlugs } from '../lib/resources/routes/content';
import { isSyntheticExtendedRoute } from '../lib/resources/routes/build-synthetic-extended';
import {
  CITY_HUBS_CONTENT_UPDATED,
  DESTINATION_CLUSTERS_CONTENT_UPDATED,
  RESOURCES_CONTENT_UPDATED,
} from '../lib/seo/content-dates';
import { getCityHubSitemapPriority } from '../lib/seo/sitemap-priority';

const publishedSlugs = getPublishedCityHubSlugs();
const extendedSlugs = new Set(getExtendedRouteSlugs());
const clusterParents = getClusterParentMarkets();

const hubSitemapBuckets: Record<string, number> = {};
for (const slug of publishedSlugs) {
  const market = getMarketBySlug(slug);
  if (!market || market.isClusterParent) continue;
  const bucket = String(getCityHubSitemapPriority(market.priority));
  hubSitemapBuckets[bucket] = (hubSitemapBuckets[bucket] ?? 0) + 1;
}

const params = getAllCountyParams();
let indexableCounties = 0;
let noindexCounties = 0;
let manualHubLinks = 0;
let autoHubLinks = 0;
let countiesWithHubLink = 0;

for (const { stateSlug, countySlug } of params) {
  const decision = evaluateCountyIndexability(stateSlug, countySlug);
  if (decision.tier === 'index') indexableCounties += 1;
  else noindexCounties += 1;

  const link = getDestinationHubLinkForCounty(stateSlug, countySlug);
  if (link) {
    countiesWithHubLink += 1;
    if (link.href.includes('/moving-to/')) {
      const autoLink = getAutoDestinationHubLinkForCounty(stateSlug, countySlug);
      if (autoLink?.href === link.href) autoHubLinks += 1;
      else manualHubLinks += 1;
    }
  }
}

const basicRoutes = routeGuides.filter((r) => !extendedSlugs.has(r.slug));
const syntheticRoutes = routeGuides.filter((r) => isSyntheticExtendedRoute(r.slug));
const handExtendedRoutes = [...extendedSlugs].filter((s) => !isSyntheticExtendedRoute(s));

const topPriorityHubs = publishedSlugs
  .map((slug) => getMarketBySlug(slug))
  .filter((m): m is NonNullable<typeof m> => Boolean(m) && !m.isClusterParent)
  .filter((m) => m.priority <= 2)
  .slice(0, 15)
  .map((m) => ({ slug: m.slug, displayName: m.displayName, priority: m.priority }));

const routeExpansionCandidates = basicRoutes
  .map((r) => ({ slug: r.slug, title: r.title, from: r.from, to: r.to }))
  .slice(0, 10);

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    publishedCityHubs: publishedSlugs.length,
    stateClusterHubs: clusterParents.length,
    totalMarketsDefined: markets.length,
    routeGuidesTotal: routeGuides.length,
    extendedRouteGuides: extendedSlugs.size,
    handWrittenExtended: handExtendedRoutes.length,
    syntheticExtended: syntheticRoutes.length,
    basicThinRoutes: basicRoutes.length,
  },
  contentDates: {
    cityHubs: CITY_HUBS_CONTENT_UPDATED.toISOString().slice(0, 10),
    clusters: DESTINATION_CLUSTERS_CONTENT_UPDATED.toISOString().slice(0, 10),
    resources: RESOURCES_CONTENT_UPDATED.toISOString().slice(0, 10),
  },
  internalLinking: {
    autoCountyToHubMappings: countAutoCountyHubLinks(),
    countiesWithDestinationHubLink: countiesWithHubLink,
    manualHubLinkOverrides: manualHubLinks,
    autoHubLinkFallbacks: autoHubLinks,
  },
  countyIndexability: {
    indexable: indexableCounties,
    noindex: noindexCounties,
    total: params.length,
  },
  sitemap: {
    hubSitemapPriorityBuckets: hubSitemapBuckets,
    samplePriorities: {
      priority1: getCityHubSitemapPriority(1),
      priority2: getCityHubSitemapPriority(2),
      priority3: getCityHubSitemapPriority(3),
      priority4: getCityHubSitemapPriority(4),
      priority5: getCityHubSitemapPriority(5),
    },
  },
  recommendations: {
    topPriorityCityHubs: topPriorityHubs,
    routesToExpandNext: routeExpansionCandidates,
    syntheticRoutesNeedingHandContent: syntheticRoutes.map((r) => r.slug),
  },
  improvementsApplied: [
    'Auto county→city hub linking via primaryCounties',
    'Data-driven route suggestions on city hubs and county pages',
    'Synthetic extended content for 6 high-intent corridor routes',
    'Tiered city hub sitemap priorities by market.priority',
    'Unified Reputation Score methodology (E-E-A-T)',
    'Stable schema dateModified on city hubs and route guides',
    'About page metadata + AboutPage/BreadcrumbList schema',
  ],
};

mkdirSync('scripts/output', { recursive: true });
writeFileSync('scripts/output/seo-pass-report.json', JSON.stringify(report, null, 2));

console.log('Move Trust Hub — SEO Pass Audit');
console.log('================================');
console.log(`Published city hubs: ${report.summary.publishedCityHubs}`);
console.log(`State cluster hubs: ${report.summary.stateClusterHubs}`);
console.log(`Route guides: ${report.summary.routeGuidesTotal} (${report.summary.extendedRouteGuides} extended)`);
console.log(`  hand-written: ${report.summary.handWrittenExtended}`);
console.log(`  synthetic: ${report.summary.syntheticExtended}`);
console.log(`  basic/thin: ${report.summary.basicThinRoutes}`);
console.log('');
console.log('Internal linking:');
console.log(`  auto county→hub mappings: ${report.internalLinking.autoCountyToHubMappings}`);
console.log(`  counties with hub link: ${report.internalLinking.countiesWithDestinationHubLink}`);
console.log('');
console.log('County indexability:');
console.log(`  index: ${report.countyIndexability.indexable}`);
console.log(`  noindex: ${report.countyIndexability.noindex}`);
console.log('');
console.log('Hub sitemap priority buckets:', report.sitemap.hubSitemapPriorityBuckets);
console.log('\nWrote scripts/output/seo-pass-report.json');