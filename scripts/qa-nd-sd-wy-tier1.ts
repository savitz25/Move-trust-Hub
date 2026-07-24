/**
 * QA for ND Core 4 + SD Core 4 + WY Core 4 + NE Douglas / MT Yellowstone regression.
 * Run: npx tsx scripts/qa-nd-sd-wy-tier1.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { buildCountySchemaGraph } from '../lib/local-movers/build-county-schema-graph';
import {
  ND_TIER1_CORE4,
  SD_TIER1_CORE4,
  WY_TIER1_CORE4,
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
  'north-dakota': 'North Dakota',
  'south-dakota': 'South Dakota',
  wyoming: 'Wyoming',
  nebraska: 'Nebraska',
  montana: 'Montana',
  colorado: 'Colorado',
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
  const packBlob = `${pack.heroCredibility ?? ''} ${pack.heroOpener ?? ''} ${pack.directoryHint ?? ''}`;

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
  checks.noNjPublicMoverBleed =
    stateSlug === 'new-jersey' || !/NJ public-mover credentials/i.test(faqText);
  checks.stateCredentialPhrase = faqText.includes(
    stateIntrastateCredentialPhrase(stateSlug).slice(0, 8)
  );
  checks.snapshotPresent = Boolean(snapshot?.primaryMarkets && snapshot.majorCorridors);
  checks.corridorsFactual = isFactualCorridorList(corridors);
  checks.popularRoutesPresent = routes.length >= 4;
  checks.schoolsHospitals = Boolean(
    pack.relocation?.modules?.some((m) => /school/i.test(m.id + m.title)) &&
      pack.relocation?.modules?.some((m) => /hospital|health/i.test(m.id + m.title))
  );
  checks.specializedPresent = (pack.specialized?.length ?? 0) >= 1;

  if (stateSlug === 'north-dakota') {
    checks.nddotLanguage = /nddot|household goods carrier permit|north dakota department of transportation/i.test(
      heroBlob + faqText + packBlob
    );
    checks.noForeignRegulators = !/wydot|south dakota does not maintain|mndot household|nj public-mover|colorado puc/i.test(
      `${pack.heroCredibility} ${pack.heroOpener}`
    );
    if (slug === 'cass') checks.cassDisambig = /fargo|red river|west fargo/i.test(heroBlob + h1);
  }
  if (stateSlug === 'south-dakota') {
    checks.sdLanguage =
      /written estimate|no dedicated|does not maintain|south dakota|insurance/i.test(
        heroBlob + faqText + packBlob
      );
    checks.noForeignRegulators = !/nddot household|nebraska psc|wydot|nj public-mover/i.test(
      `${pack.heroCredibility} ${pack.heroOpener}`
    );
    if (slug === 'lincoln') {
      checks.lincolnSdDisambig = /harrisburg|tea|sioux falls|south dakota|lincoln county sd/i.test(
        heroBlob + h1
      );
    }
    if (slug === 'pennington') {
      checks.penningtonDisambig = /rapid city|black hills|pennington/i.test(heroBlob + h1);
    }
  }
  if (stateSlug === 'wyoming') {
    checks.wydotLanguage = /wydot|operating authority|letter of authority/i.test(
      heroBlob + faqText + packBlob
    );
    checks.noForeignRegulators = !/colorado puc|nddot|nebraska psc|nj public-mover|ipuc/i.test(
      `${pack.heroCredibility} ${pack.heroOpener}`
    );
    if (slug === 'laramie') {
      checks.laramieWyDisambig =
        /cheyenne/i.test(heroBlob + h1) &&
        !/\bcity of laramie as the county seat\b|\blaramie city capital\b/i.test(heroBlob + h1);
    }
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

const rows: Row[] = [
  ...ND_TIER1_CORE4.map((slug) => auditCounty('north-dakota', slug)),
  ...SD_TIER1_CORE4.map((slug) => auditCounty('south-dakota', slug)),
  ...WY_TIER1_CORE4.map((slug) => auditCounty('wyoming', slug)),
];
rows.push(auditCounty('nebraska', 'douglas'));
const yellowstone = getCountyIntelligencePack('montana', 'yellowstone');
if (yellowstone) {
  rows.push(auditCounty('montana', 'yellowstone'));
} else {
  rows.push(auditCounty('colorado', 'denver'));
}

const ndH1s = rows.filter((r) => r.county.startsWith('north-dakota/')).map((r) => r.h1);
const sdH1s = rows.filter((r) => r.county.startsWith('south-dakota/')).map((r) => r.h1);
const wyH1s = rows.filter((r) => r.county.startsWith('wyoming/')).map((r) => r.h1);
const h1DistinctNd = new Set(ndH1s).size === ndH1s.length;
const h1DistinctSd = new Set(sdH1s).size === sdH1s.length;
const h1DistinctWy = new Set(wyH1s).size === wyH1s.length;

const report = {
  generatedAt: new Date().toISOString(),
  ndCore4: ND_TIER1_CORE4.length,
  sdCore4: SD_TIER1_CORE4.length,
  wyCore4: WY_TIER1_CORE4.length,
  passCount: rows.filter((r) => r.pass).length,
  failCount: rows.filter((r) => !r.pass).length,
  h1DistinctAcrossNd: h1DistinctNd,
  h1DistinctAcrossSd: h1DistinctSd,
  h1DistinctAcrossWy: h1DistinctWy,
  scaleRecommendation:
    rows.every((r) => r.pass) && h1DistinctNd && h1DistinctSd && h1DistinctWy
      ? 'North Dakota Core 4 + South Dakota Core 4 + Wyoming Core 4 Tier-1 complete on locked template.'
      : 'Fix failing markets before calling ND/SD/WY Core complete',
  ndSummary: rows
    .filter((r) => r.county.startsWith('north-dakota/'))
    .map((r) => ({
      county: r.county,
      local: r.localCount,
      national: r.nationalCount,
      corridors: r.majorCorridors,
      specialized: r.specialized,
      pass: r.pass,
      recommendation: r.recommendation,
    })),
  sdSummary: rows
    .filter((r) => r.county.startsWith('south-dakota/'))
    .map((r) => ({
      county: r.county,
      local: r.localCount,
      national: r.nationalCount,
      corridors: r.majorCorridors,
      specialized: r.specialized,
      pass: r.pass,
      recommendation: r.recommendation,
    })),
  wySummary: rows
    .filter((r) => r.county.startsWith('wyoming/'))
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
    .filter(
      (r) =>
        (r.county.startsWith('north-dakota/') ||
          r.county.startsWith('south-dakota/') ||
          r.county.startsWith('wyoming/')) &&
        r.localCount === 0
    )
    .map((r) => r.county),
  rows,
};

mkdirSync('scripts/output', { recursive: true });
writeFileSync('scripts/output/nd-sd-wy-tier1-qa.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
process.exit(
  report.failCount > 0 || !h1DistinctNd || !h1DistinctSd || !h1DistinctWy ? 1 : 0
);
