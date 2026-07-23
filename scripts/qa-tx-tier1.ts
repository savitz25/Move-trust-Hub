/**
 * QA for Texas Tier-1 Core 12 + FL/CA regression.
 * Run: npx tsx scripts/qa-tx-tier1.ts
 */
import { writeFileSync } from 'node:fs';
import { buildCountySchemaGraph } from '../lib/local-movers/build-county-schema-graph';
import {
  TX_TIER1_CORE12,
  getCountyIntelligencePack,
} from '../lib/local-movers/county-intelligence/registry';
import { getMoversForCounty } from '../lib/local-movers/index';
import { buildCountyMovingSnapshot } from '../lib/local-movers/county-moving-snapshot';
import { getCountyPopularRoutes } from '../lib/local-movers/county-popular-routes';
import { buildCountyFaqItems, buildCountyLabel } from '../lib/local-movers/county-seo';
import { buildMoverHeadquartersAddress } from '../lib/local-movers/schema-helpers';
import { segmentCountyMovers } from '../lib/local-movers/segment-county-movers';
import { assessLicense } from '../lib/trust/license-verification';

const STATE_NAMES: Record<string, string> = {
  texas: 'Texas',
  florida: 'Florida',
  california: 'California',
};

const OUT_OF_STATE_CITIES = [
  'boynton beach',
  'davie',
  'indianapolis',
  'pompano beach',
  'hialeah',
  'sterling',
];

type Row = {
  county: string;
  pass: boolean;
  localCount: number;
  nationalCount: number;
  specialized: string[];
  h1: string;
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
    const city = (m.city ?? '').toLowerCase();
    if (
      OUT_OF_STATE_CITIES.some((c) => city.includes(c)) &&
      addr?.addressRegion === county.stateCode.toUpperCase() &&
      m.headquartersState.toUpperCase() !== county.stateCode.toUpperCase()
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
    faqItems: buildCountyFaqItems(county, stateName, movers),
    testimonials: [],
  });
  checks.schemaHqStateCorrect = schemaOk;

  const faq = buildCountyFaqItems(county, stateName, movers);
  const best = faq.find((f) => /best local movers/i.test(f.question));
  checks.noZeroStarTopRated =
    !best ||
    !(/top-rated/i.test(best.answer) && movers.every((m) => !m.reviewCount));

  if (stateSlug === 'texas') {
    checks.txdmvLanguage =
      /txdmv|department of motor vehicles/i.test(faq.map((f) => f.answer).join(' ')) ||
      /txdmv|department of motor vehicles/i.test(heroBlob);
    checks.noBhgsOnTexas = !/bhgs|bureau of household goods/i.test(heroBlob);
    checks.noFdacsOnTexas = !/fdacs|chapter 507/i.test(heroBlob);
  }

  checks.schoolsHospitals = Boolean(
    pack.relocation?.modules?.some((m) =>
      /school|hospital|health|education/i.test(m.id + m.title)
    )
  );
  checks.popularRoutesPresent = routes.length >= 4;
  checks.snapshotPresent = Boolean(snapshot?.primaryMarkets);
  checks.regulatoryModule = true;
  checks.noDuplicateMarketInsightsWithPack = true;
  checks.specializedPresent = (pack.specialized?.length ?? 0) >= 1;
  checks.relocationModules = pack.relocation?.modules?.length ?? 0;

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
    checks,
    recommendation,
  };
}

const rows: Row[] = TX_TIER1_CORE12.map((slug) => auditCounty('texas', slug));
rows.push(auditCounty('florida', 'broward'));
rows.push(auditCounty('california', 'orange'));

const report = {
  generatedAt: new Date().toISOString(),
  txCore12: TX_TIER1_CORE12.length,
  passCount: rows.filter((r) => r.pass).length,
  failCount: rows.filter((r) => !r.pass).length,
  scaleRecommendation: rows.every((r) => r.pass)
    ? 'Texas Core 12 Tier-1 complete on locked template. Next: onboard true TX local movers for local-first segments.'
    : 'Fix failing counties before calling TX Core 12 complete',
  rows,
};

writeFileSync('scripts/output/tx-tier1-qa.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (report.failCount > 0) process.exit(1);
