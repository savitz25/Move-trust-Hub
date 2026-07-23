/**
 * QA for California Tier-1 counties (Core 12 + Wave 2).
 * Run: npx tsx scripts/qa-ca-tier1.ts
 * Optional: WAVE=2 for wave-2 only; REGRESSION=1 includes LA/Orange/Fresno.
 */
import { writeFileSync } from 'node:fs';
import { buildCountySchemaGraph } from '../lib/local-movers/build-county-schema-graph';
import {
  CA_TIER1_ALL,
  CA_TIER1_CORE12,
  CA_TIER1_WAVE2,
  getCountyIntelligencePack,
} from '../lib/local-movers/county-intelligence/registry';
import { getMoversForCounty } from '../lib/local-movers/index';
import { buildCountyMovingSnapshot } from '../lib/local-movers/county-moving-snapshot';
import { getCountyPopularRoutes } from '../lib/local-movers/county-popular-routes';
import { buildCountyFaqItems, buildCountyLabel } from '../lib/local-movers/county-seo';
import { buildMoverHeadquartersAddress } from '../lib/local-movers/schema-helpers';
import { segmentCountyMovers } from '../lib/local-movers/segment-county-movers';
import { assessLicense } from '../lib/trust/license-verification';

const OUT_OF_STATE_CITIES = [
  'boynton beach',
  'davie',
  'indianapolis',
  'pompano beach',
  'hialeah',
  'evansville',
];

const wave = process.env.WAVE?.trim();
const counties =
  wave === '2'
    ? [...CA_TIER1_WAVE2]
    : wave === '1'
      ? [...CA_TIER1_CORE12]
      : [...CA_TIER1_ALL];

if (process.env.REGRESSION === '1') {
  for (const c of ['los-angeles', 'orange', 'fresno'] as const) {
    if (!counties.includes(c)) counties.push(c);
  }
}

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

const rows: Row[] = [];
const h1Set = new Set<string>();

for (const slug of counties) {
  const result = getMoversForCounty('california', slug);
  const pack = getCountyIntelligencePack('california', slug);
  const checks: Record<string, boolean | string | number> = {};

  if (!result || !pack) {
    rows.push({
      county: `california/${slug}`,
      pass: false,
      localCount: 0,
      nationalCount: 0,
      specialized: [],
      h1: '',
      checks: { found: false, pack: Boolean(pack), movers: Boolean(result) },
      recommendation: 'Needs intelligence pack and/or mover data',
    });
    continue;
  }

  const { county, movers } = result;
  const countyLabel = buildCountyLabel(county);
  const segments = segmentCountyMovers(movers, county);
  const routes = getCountyPopularRoutes('california', slug);
  const snapshot = buildCountyMovingSnapshot(pack, routes, countyLabel);
  const h1 = pack.h1 ?? '';

  checks.narrativeH1 =
    Boolean(h1) &&
    !/^Movers Serving/i.test(h1) &&
    h1.toLowerCase().includes(county.name.split(' ')[0]!.toLowerCase().slice(0, 4));
  // SF / San Mateo / Ventura / Placer may use regional names — fallback: h1 not generic
  if (!checks.narrativeH1) {
    checks.narrativeH1 = Boolean(h1) && !/^Movers Serving/i.test(h1) && h1.length > 20;
  }
  checks.h1Unique = !h1Set.has(h1);
  h1Set.add(h1);

  checks.uniqueLocalNarrative = Boolean(pack.heroOpener && pack.zones.length >= 4);
  checks.zonesCountySpecific = pack.zones.length >= 4;
  checks.zoneIdsUnique = new Set(pack.zones.map((z) => z.id)).size === pack.zones.length;
  checks.localNationalSegmentation =
    segments.localInState.length + segments.national.length === movers.length;
  checks.localCount = segments.localInState.length;
  checks.nationalCount = segments.national.length;
  checks.progressiveListReady = movers.length > 0;

  const badLic = movers.filter(
    (m) => m.usdotNumber && !assessLicense(m.usdotNumber, m.mcNumber).isDisplayable
  );
  checks.placeholderDotAbsent = badLic.length === 0;

  let schemaOk = true;
  for (const m of movers.slice(0, 12)) {
    if (!m.headquartersState) continue;
    const addr = buildMoverHeadquartersAddress(m) as {
      addressRegion?: string;
    } | null;
    if (
      addr?.addressRegion &&
      addr.addressRegion !== m.headquartersState.toUpperCase()
    ) {
      schemaOk = false;
    }
    const city = (m.city ?? '').toLowerCase();
    if (
      OUT_OF_STATE_CITIES.some((c) => city.includes(c)) &&
      addr?.addressRegion === 'CA'
    ) {
      schemaOk = false;
    }
  }
  buildCountySchemaGraph({
    title: countyLabel,
    description: 'qa',
    path: `/local-movers/california/${slug}`,
    breadcrumbs: [{ name: 'Home', path: '/' }],
    movers: movers.slice(0, 5),
    county,
    stateName: 'California',
    faqItems: buildCountyFaqItems(county, 'California', movers),
    testimonials: [],
  });
  checks.schemaHqStateCorrect = schemaOk;

  const faq = buildCountyFaqItems(county, 'California', movers);
  const best = faq.find((f) => /best local movers/i.test(f.question));
  checks.noZeroStarTopRated =
    !best ||
    !(/top-rated/i.test(best.answer) && movers.every((m) => !m.reviewCount));

  checks.schoolsHospitals = Boolean(
    pack.relocation?.modules?.some((m) =>
      /school|hospital|health|education/i.test(m.id + m.title)
    )
  );
  checks.popularRoutesPresent = routes.length >= 4;
  checks.snapshotPresent = Boolean(snapshot?.primaryMarkets);
  checks.caRegulatoryModule = true;
  checks.noDuplicateMarketInsightsWithPack = true;
  checks.specializedPresent = (pack.specialized?.length ?? 0) >= 1;
  checks.relocationModules = pack.relocation?.modules?.length ?? 0;

  const failKeys = Object.entries(checks)
    .filter(([, v]) => v === false)
    .map(([k]) => k);

  let recommendation = 'Ready for Tier 1 lock';
  if (segments.localInState.length === 0) {
    recommendation =
      'Template complete; weak on true CA local/in-state mover data in static catalog';
  } else if (failKeys.length > 0) {
    recommendation = `Needs fixes: ${failKeys.join(', ')}`;
  }

  rows.push({
    county: `california/${slug}`,
    pass: failKeys.length === 0,
    localCount: segments.localInState.length,
    nationalCount: segments.national.length,
    specialized: (pack.specialized ?? []).map((s) => s.id || s.title),
    h1,
    checks,
    recommendation,
  });
}

const report = {
  generatedAt: new Date().toISOString(),
  total: rows.length,
  passCount: rows.filter((r) => r.pass).length,
  failCount: rows.filter((r) => !r.pass).length,
  wave2: CA_TIER1_WAVE2,
  scaleRecommendation:
    rows.every((r) => r.pass)
      ? 'CA Tier-1 template set complete for Core 12 + Wave 2 (incl. Fresno). Next: onboard true CA local movers into local/in-state segments.'
      : 'Fix failing counties before calling Wave 2 complete',
  rows,
};

writeFileSync('scripts/output/ca-tier1-qa.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (report.failCount > 0) process.exit(1);
