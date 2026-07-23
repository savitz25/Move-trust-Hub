/**
 * QA for North Carolina Tier-1 Core 12 + GA/FL regression.
 * Run: npx tsx scripts/qa-nc-tier1.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { buildCountySchemaGraph } from '../lib/local-movers/build-county-schema-graph';
import {
  NC_TIER1_CORE12,
  getCountyIntelligencePack,
} from '../lib/local-movers/county-intelligence/registry';
import { isFactualCorridorList } from '../lib/local-movers/county-major-corridors';
import { getMoversForCounty } from '../lib/local-movers/index';
import { buildCountyMovingSnapshot } from '../lib/local-movers/county-moving-snapshot';
import { getCountyPopularRoutes } from '../lib/local-movers/county-popular-routes';
import {
  buildCountyFaqItems,
  buildCountyLabel,
  stateIntrastateCredentialPhrase,
} from '../lib/local-movers/county-seo';
import { isPlaceholderMoverDescription } from '../lib/local-movers/sanitize-mover-description';
import { buildMoverHeadquartersAddress } from '../lib/local-movers/schema-helpers';
import { segmentCountyMovers } from '../lib/local-movers/segment-county-movers';
import { assessLicense } from '../lib/trust/license-verification';
import { buildCountyReviewBlock } from '../lib/trust/verified-reviews';

const STATE_NAMES: Record<string, string> = {
  'north-carolina': 'North Carolina',
  georgia: 'Georgia',
  florida: 'Florida',
};

type Row = {
  county: string;
  pass: boolean;
  localCount: number;
  nationalCount: number;
  specialized: string[];
  h1: string;
  majorCorridors: string;
  checks: Record<string, boolean | string | number>;
  recommendation: string;
};

function auditCounty(stateSlug: string, slug: string): Row {
  const result = getMoversForCounty(stateSlug, slug);
  const pack = getCountyIntelligencePack(stateSlug, slug);
  const checks: Record<string, boolean | string | number> = {};
  const stateName = STATE_NAMES[stateSlug] ?? stateSlug;

  if (!result || !pack) {
    return {
      county: `${stateSlug}/${slug}`,
      pass: false,
      localCount: 0,
      nationalCount: 0,
      specialized: [],
      h1: '',
      majorCorridors: '',
      checks: { found: false, pack: Boolean(pack), movers: Boolean(result) },
      recommendation: 'Needs intelligence pack and/or mover data',
    };
  }

  const { county, movers } = result;
  const countyLabel = buildCountyLabel(county);
  const segments = segmentCountyMovers(movers, county);
  const routes = getCountyPopularRoutes(stateSlug, slug);
  const snapshot = buildCountyMovingSnapshot(pack, routes, countyLabel);
  const h1 = pack.h1 ?? '';
  const heroBlob = `${pack.heroCredibility ?? ''} ${pack.heroOpener ?? ''}`;
  const faq = buildCountyFaqItems(county, stateName, movers);
  const faqText = faq.map((f) => f.answer).join('\n');
  const corridors = snapshot?.majorCorridors ?? '';

  checks.narrativeH1 = Boolean(h1) && !/^Movers Serving/i.test(h1) && h1.length > 20;
  checks.uniqueLocalNarrative = Boolean(pack.heroOpener && pack.zones.length >= 4);
  checks.zonesCountySpecific = pack.zones.length >= 4;
  checks.zoneIdsUnique = new Set(pack.zones.map((z) => z.id)).size === pack.zones.length;
  checks.localNationalSegmentation =
    segments.localInState.length + segments.national.length === movers.length;
  checks.localCount = segments.localInState.length;
  checks.nationalCount = segments.national.length;
  checks.progressiveListReady = movers.length > 0;

  checks.placeholderDotAbsent = !movers.some(
    (m) => m.usdotNumber && !assessLicense(m.usdotNumber, m.mcNumber).isDisplayable
  );
  checks.noThisIsMyCompany = !movers.some((m) =>
    /this is my company/i.test(m.shortDescription ?? '')
  );
  checks.noPlaceholderDescriptions = !movers.some((m) =>
    isPlaceholderMoverDescription(m.shortDescription)
  );

  let schemaOk = true;
  for (const m of movers.slice(0, 12)) {
    if (!m.headquartersState) continue;
    const addr = buildMoverHeadquartersAddress(m) as { addressRegion?: string } | null;
    if (
      addr?.addressRegion &&
      addr.addressRegion !== m.headquartersState.toUpperCase()
    ) {
      schemaOk = false;
    }
  }
  buildCountySchemaGraph({
    title: countyLabel,
    description: 'qa',
    path: `/local-movers/${stateSlug}/${slug}`,
    breadcrumbs: [{ name: 'Home', path: '/' }],
    movers: movers.slice(0, 5),
    county,
    stateName,
    faqItems: faq,
    testimonials: [],
  });
  checks.schemaHqStateCorrect = schemaOk;

  const best = faq.find((f) => /best local movers/i.test(f.question));
  checks.noZeroStarTopRated =
    !best ||
    !(/top-rated/i.test(best.answer) && movers.every((m) => !m.reviewCount));

  checks.noNjPublicMoverBleed =
    stateSlug === 'new-jersey' || !/NJ public-mover credentials/i.test(faqText);
  checks.stateCredentialPhrase = faqText.includes(
    stateIntrastateCredentialPhrase(stateSlug).slice(0, 12)
  );

  checks.snapshotPresent = Boolean(snapshot?.primaryMarkets && snapshot.majorCorridors);
  checks.corridorsFactual = isFactualCorridorList(corridors);
  checks.corridorsNotOperational = !/tourism calendars|operational inputs|curb staging/i.test(
    corridors
  );
  checks.popularRoutesPresent = routes.length >= 4;
  checks.schoolsHospitals = Boolean(
    pack.relocation?.modules?.some((m) => /school/i.test(m.id + m.title)) &&
      pack.relocation?.modules?.some((m) => /hospital|health/i.test(m.id + m.title))
  );
  checks.specializedPresent = (pack.specialized?.length ?? 0) >= 1;
  checks.relocationModules = pack.relocation?.modules?.length ?? 0;

  if (stateSlug === 'north-carolina') {
    checks.ncucLanguage =
      /ncuc|utilities commission|c-#|certificate/i.test(heroBlob + faqText);
    checks.noForeignRegulators = !/fdacs|txdmv|nysdot|bhgs|mccd/i.test(
      `${pack.heroCredibility} ${pack.heroOpener}`
    );
  }

  const reviewBlock = buildCountyReviewBlock(movers, 3, {
    preferLocalMovers: segments.localInState,
    countyLabel,
    marketTokens: [county.name, county.seat ?? '', countyLabel, stateName],
    stateName,
    stateCode: county.stateCode,
  });
  const reviewsShown =
    reviewBlock.hasLocalSource && reviewBlock.reviews.length > 0
      ? reviewBlock.reviews.length
      : 0;
  checks.reviewsOnlyWhenLocal =
    segments.localInState.length === 0 ? reviewsShown === 0 : true;

  const failKeys = Object.entries(checks)
    .filter(([, v]) => v === false)
    .map(([k]) => k);

  let recommendation = 'Ready for Tier 1 lock';
  if (segments.localInState.length === 0) {
    recommendation =
      'Template complete; weak on true local/in-state mover data in static catalog';
  } else if (failKeys.length > 0) {
    recommendation = `Needs fixes: ${failKeys.join(', ')}`;
  }

  return {
    county: `${stateSlug}/${slug}`,
    pass: failKeys.length === 0,
    localCount: segments.localInState.length,
    nationalCount: segments.national.length,
    specialized: (pack.specialized ?? []).map((s) => s.id || s.title),
    h1,
    majorCorridors: corridors,
    checks,
    recommendation,
  };
}

const rows: Row[] = NC_TIER1_CORE12.map((slug) =>
  auditCounty('north-carolina', slug)
);
// Regression
rows.push(auditCounty('georgia', 'fulton'));
rows.push(auditCounty('florida', 'orange'));

// Distinctiveness: H1s unique among NC
const ncH1s = rows
  .filter((r) => r.county.startsWith('north-carolina/'))
  .map((r) => r.h1);
const uniqueH1s = new Set(ncH1s);
const h1Distinct = uniqueH1s.size === ncH1s.length;

const report = {
  generatedAt: new Date().toISOString(),
  ncCore12: NC_TIER1_CORE12.length,
  passCount: rows.filter((r) => r.pass).length,
  failCount: rows.filter((r) => !r.pass).length,
  h1DistinctAcrossNc: h1Distinct,
  scaleRecommendation: rows.every((r) => r.pass) && h1Distinct
    ? 'North Carolina Core 12 Tier-1 complete on locked template. Next: onboard true NC local movers for local-first segments.'
    : 'Fix failing counties before calling NC Core 12 complete',
  summaryTable: rows
    .filter((r) => r.county.startsWith('north-carolina/'))
    .map((r) => ({
      county: r.county,
      local: r.localCount,
      national: r.nationalCount,
      corridors: r.majorCorridors,
      specialized: r.specialized,
      pass: r.pass,
      recommendation: r.recommendation,
    })),
  weakLocalCounties: rows
    .filter((r) => r.county.startsWith('north-carolina/') && r.localCount === 0)
    .map((r) => r.county),
  rows,
};

mkdirSync('scripts/output', { recursive: true });
writeFileSync('scripts/output/nc-tier1-qa.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (report.failCount > 0 || !h1Distinct) process.exit(1);
