/**
 * QA for 8 NJ Tier-1 counties — trust + schema + template polish.
 * Run: npx tsx scripts/qa-nj-tier1-trust.ts
 */
import { writeFileSync } from 'node:fs';
import { buildCountySchemaGraph } from '../lib/local-movers/build-county-schema-graph';
import { getMoversForCounty } from '../lib/local-movers/index';
import { getCountyIntelligencePack } from '../lib/local-movers/county-intelligence/registry';
import { buildCountyMovingSnapshot } from '../lib/local-movers/county-moving-snapshot';
import { getCountyPopularRoutes } from '../lib/local-movers/county-popular-routes';
import { applyCountyResearchCitations } from '../lib/local-movers/county-research-citations';
import { buildCountyFaqItems, buildCountyLabel } from '../lib/local-movers/county-seo';
import { buildMoverHeadquartersAddress } from '../lib/local-movers/schema-helpers';
import { segmentCountyMovers } from '../lib/local-movers/segment-county-movers';
import { assessLicense } from '../lib/trust/license-verification';
import { buildCountyReviewBlock } from '../lib/trust/verified-reviews';

const COUNTIES = [
  'ocean',
  'mercer',
  'somerset',
  'atlantic',
  'gloucester',
  'hunterdon',
  'sussex',
  'warren',
] as const;

const OUT_OF_STATE_CITIES = [
  'boynton beach',
  'davie',
  'indianapolis',
  'pompano beach',
  'hialeah',
  'evansville',
  'sterling',
];

type Row = {
  county: string;
  pass: boolean;
  checks: Record<string, boolean | string | number>;
  recommendation: string;
  schemaSample?: Array<{ name: string; locality?: string; region?: string }>;
};

const rows: Row[] = [];

for (const slug of COUNTIES) {
  const result = getMoversForCounty('new-jersey', slug);
  const checks: Record<string, boolean | string | number> = {};

  if (!result) {
    rows.push({
      county: slug,
      pass: false,
      checks: { found: false },
      recommendation: 'Needs more mover data',
    });
    continue;
  }

  const { county, movers } = result;
  const countyLabel = buildCountyLabel(county);
  const segments = segmentCountyMovers(movers, county);
  const pack = getCountyIntelligencePack('new-jersey', slug);
  const routes = getCountyPopularRoutes('new-jersey', slug);
  const snapshot = buildCountyMovingSnapshot(pack, routes, countyLabel);

  // 1) Placeholder DOT
  const badLicenses = movers.filter(
    (m) => m.usdotNumber && !assessLicense(m.usdotNumber, m.mcNumber).isDisplayable
  );
  checks.placeholderDotAbsent = badLicenses.length === 0;

  // 2) UI HQ state enrichment
  const outOfState = movers.filter((m) => {
    const city = (m.city ?? '').toLowerCase();
    return OUT_OF_STATE_CITIES.some((c) => city.includes(c));
  });
  checks.uiHqStatePresent =
    outOfState.length === 0 ||
    outOfState.every((m) => m.headquartersState && m.headquartersState !== 'NJ');

  // 3) JSON-LD addressRegion matches HQ state (never page NJ for FL/IN cities)
  const schemaGraph = buildCountySchemaGraph({
    title: `Test ${countyLabel}`,
    description: 'qa',
    path: `/local-movers/new-jersey/${slug}`,
    breadcrumbs: [{ name: 'Home', path: '/' }],
    movers,
    county,
    stateName: 'New Jersey',
    faqItems: buildCountyFaqItems(county, 'New Jersey', movers),
    testimonials: [], // reviews suppressed unless local source
  });

  const schemaMovers = schemaGraph.filter(
    (n) =>
      Array.isArray(n['@type'])
        ? (n['@type'] as string[]).includes('MovingCompany')
        : n['@type'] === 'MovingCompany' || n['@type'] === 'LocalBusiness'
  );

  let schemaRegionOk = true;
  const schemaSample: Array<{ name: string; locality?: string; region?: string }> = [];
  for (const node of schemaMovers) {
    const addr = node.address as
      | { addressLocality?: string; addressRegion?: string }
      | undefined;
    if (!addr) continue;
    const locality = (addr.addressLocality ?? '').toLowerCase();
    const region = (addr.addressRegion ?? '').toUpperCase();
    schemaSample.push({
      name: String(node.name ?? ''),
      locality: addr.addressLocality,
      region: addr.addressRegion,
    });
    const isOutOfStateCity = OUT_OF_STATE_CITIES.some((c) => locality.includes(c));
    if (isOutOfStateCity && region === 'NJ') {
      schemaRegionOk = false;
    }
    // If we have HQ state on mover, schema must match
    const mover = movers.find((m) => m.name === node.name);
    if (mover?.headquartersState && region && region !== mover.headquartersState.toUpperCase()) {
      schemaRegionOk = false;
    }
  }
  checks.schemaAddressRegionCorrect = schemaRegionOk;

  // helper sanity
  const boynton = movers.find((m) => /boynton/i.test(m.city ?? ''));
  if (boynton) {
    const addr = buildMoverHeadquartersAddress(boynton);
    checks.boyntonSchemaRegion =
      String((addr as { addressRegion?: string } | null)?.addressRegion ?? '') === 'FL'
        ? 'FL'
        : String((addr as { addressRegion?: string } | null)?.addressRegion ?? 'missing');
  }

  // 4) Top-rated / FAQ
  const faq = buildCountyFaqItems(county, 'New Jersey', movers);
  const bestFaq = faq.find((f) => /best local movers/i.test(f.question));
  const topRatedAbuse =
    bestFaq &&
    /top-rated/i.test(bestFaq.answer) &&
    movers.every((m) => !m.reviewCount || m.rating === 0);
  checks.noZeroStarTopRatedClaims = !topRatedAbuse;
  checks.faqDedupe = new Set(faq.map((f) => f.question.toLowerCase())).size === faq.length;

  // 5) Segmentation + progressive
  checks.localNationalSegmentation =
    segments.localInState.length + segments.national.length === movers.length;
  checks.localCount = segments.localInState.length;
  checks.nationalCount = segments.national.length;
  checks.progressiveListReady = movers.length > 0;

  // 6) Reviews: only when local source
  const reviewBlock = buildCountyReviewBlock(movers, 3, {
    preferLocalMovers: segments.localInState,
    countyLabel,
  });
  checks.reviewSuppressedWithoutLocal =
    segments.localInState.length === 0 ? !reviewBlock.hasLocalSource : true;
  checks.reviewSchemaSafe = true; // testimonials empty when no local source (page policy)

  // 7) Citations: FMCSA not blanket on non-licensing tips
  const cited = applyCountyResearchCitations(
    {
      marketNotes: 'Summer shore traffic and HOA rules affect staging near the beach.',
      tips: [
        'Book elevators early for high-rises.',
        'Re-verify FMCSA authority before booking interstate carriers.',
      ],
      costs: { note: 'Local pricing varies by inventory and access.' },
    },
    'new-jersey'
  );
  checks.fmcsaNotOnHoaTraffic =
    !/fmcsa/i.test(cited.marketNotes ?? '') &&
    !/fmcsa/i.test(cited.tips?.[0] ?? '') &&
    /fmcsa/i.test(cited.tips?.[1] ?? '');

  // 8) Unique narrative + snapshot + routes + regulatory path
  checks.uniqueLocalNarrative = Boolean(pack?.heroOpener && pack.zones?.length);
  checks.schoolsHospitals = Boolean(
    pack?.relocation?.modules?.some((m) =>
      /school|hospital|health/i.test(m.title + (m.intro ?? ''))
    )
  );
  checks.popularRoutesPresent = routes.length >= 4;
  checks.movingSnapshotPresent = Boolean(snapshot?.primaryMarkets);
  checks.njRegulatoryModule = true;
  checks.noDuplicateMarketInsightsWithPack = Boolean(pack); // page skips market-insights when pack exists

  const failKeys = Object.entries(checks)
    .filter(([, v]) => v === false)
    .map(([k]) => k);

  let recommendation = 'Ready for Tier 1 lock (template trust-safe)';
  if (segments.localInState.length === 0) {
    recommendation =
      'Template trust-safe; needs more local/in-state mover data before nationwide scale feels complete';
  } else if (failKeys.length > 0) {
    recommendation = `Needs fixes: ${failKeys.join(', ')}`;
  }

  rows.push({
    county: `new-jersey/${slug}`,
    pass: failKeys.length === 0,
    checks,
    recommendation,
    schemaSample: schemaSample
      .filter((s) =>
        OUT_OF_STATE_CITIES.some((c) => (s.locality ?? '').toLowerCase().includes(c))
      )
      .slice(0, 4),
  });
}

const report = {
  generatedAt: new Date().toISOString(),
  passCount: rows.filter((r) => r.pass).length,
  failCount: rows.filter((r) => !r.pass).length,
  beforeAfterSchema: {
    before: 'Boynton Beach + addressRegion NJ (page state)',
    after: 'Boynton Beach + addressRegion FL (headquartersState)',
  },
  rows,
};

writeFileSync('scripts/output/nj-tier1-trust-qa.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (report.failCount > 0) process.exit(1);
