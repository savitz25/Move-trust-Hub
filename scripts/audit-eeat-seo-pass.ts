/**
 * E-E-A-T & thin-content audit after external feedback remediation.
 * Run: npx tsx scripts/audit-eeat-seo-pass.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { getPublishedCityHubSlugs } from '../lib/destinations/content';
import { getAllCountyParams } from '../lib/local-movers/geography/index';
import { evaluateCountyIndexability } from '../lib/local-movers/county-indexability';
import {
  isGenericTemplateCountyResearch,
  hasCountyResearch,
} from '../lib/local-movers/county-research';
import { getExtendedRouteSlugs } from '../lib/resources/routes/content';
import { routeGuides } from '../lib/resources/routes';
import { moverHasSchemaAggregateRating } from '../lib/trust/verified-reviews';
import { getMoversForCounty } from '../lib/local-movers/index';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const params = getAllCountyParams();
const indexReasons = new Map<string, number>();
const noindexReasons = new Map<string, number>();
let indexable = 0;
let noindex = 0;
let genericResearchCounties = 0;

for (const { stateSlug, countySlug } of params) {
  const decision = evaluateCountyIndexability(stateSlug, countySlug);
  if (decision.tier === 'index') {
    indexable += 1;
    indexReasons.set(decision.reason, (indexReasons.get(decision.reason) ?? 0) + 1);
  } else {
    noindex += 1;
    noindexReasons.set(decision.reason, (noindexReasons.get(decision.reason) ?? 0) + 1);
  }
  if (hasCountyResearch(stateSlug, countySlug) && isGenericTemplateCountyResearch(stateSlug, countySlug)) {
    genericResearchCounties += 1;
  }
}

const allMovers = Object.values(fullMoversCatalog);
let schemaEligibleMovers = 0;
for (const mover of allMovers) {
  if (moverHasSchemaAggregateRating(mover)) schemaEligibleMovers += 1;
}

const report = {
  generatedAt: new Date().toISOString(),
  countyIndexability: {
    indexable,
    noindex,
    total: params.length,
    indexReasons: Object.fromEntries(indexReasons),
    noindexReasons: Object.fromEntries(noindexReasons),
    genericTemplateResearchCounties: genericResearchCounties,
  },
  contentCoverage: {
    publishedCityHubs: getPublishedCityHubSlugs().length,
    routeGuidesTotal: routeGuides.length,
    extendedRouteGuides: getExtendedRouteSlugs().length,
  },
  eeat: {
    moversWithAggregateRatingSchema: schemaEligibleMovers,
    totalMoversInCatalog: allMovers.length,
    editorialTeamExperts: 3,
    reviewSchemaPolicy: 'attributable_google_reviews_only',
  },
  improvementsApplied: [
    'Stricter county noindex for generic template research',
    'Dynamic county market insights (costs, seasonal, HOA/parking, migration)',
    'Editorial team panel + Person schema authorship on routes/city hubs/counties',
    'Route calculator embed mid-page on extended guides',
    'Strengthened FMCSA/USDOT verification messaging',
    'How We Score + Verification panels on county, route, and city hub pages',
  ],
  recommendedNext: [
    'Replace generic county research tips in high-traffic metros (FL, CA, TX, NY, SC)',
    'Expand attributable Google reviews beyond current 17 counties',
    'Add hand-written neighborhood modules to priority-2 city hubs',
    'Monitor GSC for index coverage after generic_template_research noindex wave',
  ],
};

mkdirSync('scripts/output', { recursive: true });
writeFileSync('scripts/output/eeat-seo-pass-report.json', JSON.stringify(report, null, 2));

console.log('Move Trust Hub — E-E-A-T & Thin Content Audit');
console.log('===========================================');
console.log(`Counties indexable: ${indexable} / ${params.length}`);
console.log(`Counties noindex: ${noindex}`);
console.log(`Generic template research counties: ${genericResearchCounties}`);
console.log('');
console.log('Noindex reasons:');
for (const [reason, count] of [...noindexReasons.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${reason}: ${count}`);
}
console.log('');
console.log(`Movers eligible for AggregateRating schema: ${schemaEligibleMovers}`);
console.log(`Extended route guides: ${report.contentCoverage.extendedRouteGuides}/${report.contentCoverage.routeGuidesTotal}`);
console.log('\nWrote scripts/output/eeat-seo-pass-report.json');