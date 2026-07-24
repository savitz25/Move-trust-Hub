/**
 * QA for Vermont Core 5 + Delaware Core 3 + NH Hillsborough / MD Montgomery regression.
 * Run: npx tsx scripts/qa-vt-de-tier1.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { buildCountySchemaGraph } from '../lib/local-movers/build-county-schema-graph';
import {
  VT_TIER1_CORE5,
  DE_TIER1_CORE3,
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
  vermont: 'Vermont',
  delaware: 'Delaware',
  'new-hampshire': 'New Hampshire',
  maryland: 'Maryland',
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

  if (stateSlug === 'vermont') {
    checks.vtDmvLanguage =
      /vermont dmv|commercial vehicle|written estimate|no dedicated|does not maintain a dedicated|cvo/i.test(
        heroBlob + faqText + packBlob
      );
    checks.noForeignRegulators = !/rsa 359|massachusetts dpu|nj public-mover|delaware dmv motor carrier services|pa puc household/i.test(
      `${pack.heroCredibility} ${pack.heroOpener}`
    );
    if (slug === 'washington') {
      checks.washingtonVtDisambig =
        /montpelier|barre|vermont/i.test(heroBlob + h1) &&
        !/\bmoving in washington state\b/i.test(heroBlob + h1);
    }
    if (slug === 'chittenden') {
      checks.chittendenDisambig = /burlington|chittenden|winooski|essex|champlain/i.test(
        heroBlob + h1
      );
    }
  }
  if (stateSlug === 'delaware') {
    checks.deDmvLanguage =
      /delaware dmv|written estimate|no special|does not issue a special|motor carrier services|intrastate/i.test(
        heroBlob + faqText + packBlob
      );
    checks.noForeignRegulators = !/nj public-mover|pa puc household|maryland household goods|vermont dmv cvo/i.test(
      `${pack.heroCredibility} ${pack.heroOpener}`
    );
    if (slug === 'kent') {
      checks.kentDeDisambig = /dover|delaware|kent county de|capital/i.test(heroBlob + h1);
    }
    if (slug === 'sussex') {
      checks.sussexDeDisambig = /rehoboth|lewes|georgetown|beach|sussex county de|delaware/i.test(
        heroBlob + h1
      );
    }
    if (slug === 'new-castle') {
      checks.newCastleDisambig = /wilmington|newark|i-95|new castle/i.test(heroBlob + h1);
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
  ...VT_TIER1_CORE5.map((slug) => auditCounty('vermont', slug)),
  ...DE_TIER1_CORE3.map((slug) => auditCounty('delaware', slug)),
];
rows.push(auditCounty('new-hampshire', 'hillsborough'));
rows.push(auditCounty('maryland', 'montgomery'));

const vtH1s = rows.filter((r) => r.county.startsWith('vermont/')).map((r) => r.h1);
const deH1s = rows.filter((r) => r.county.startsWith('delaware/')).map((r) => r.h1);
const h1DistinctVt = new Set(vtH1s).size === vtH1s.length;
const h1DistinctDe = new Set(deH1s).size === deH1s.length;

const report = {
  generatedAt: new Date().toISOString(),
  vtCore5: VT_TIER1_CORE5.length,
  deCore3: DE_TIER1_CORE3.length,
  passCount: rows.filter((r) => r.pass).length,
  failCount: rows.filter((r) => !r.pass).length,
  h1DistinctAcrossVt: h1DistinctVt,
  h1DistinctAcrossDe: h1DistinctDe,
  scaleRecommendation:
    rows.every((r) => r.pass) && h1DistinctVt && h1DistinctDe
      ? 'Vermont Core 5 + Delaware Core 3 (full state) Tier-1 complete on locked template.'
      : 'Fix failing markets before calling VT/DE Core complete',
  vtSummary: rows
    .filter((r) => r.county.startsWith('vermont/'))
    .map((r) => ({
      county: r.county,
      local: r.localCount,
      national: r.nationalCount,
      corridors: r.majorCorridors,
      specialized: r.specialized,
      pass: r.pass,
      recommendation: r.recommendation,
    })),
  deSummary: rows
    .filter((r) => r.county.startsWith('delaware/'))
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
        (r.county.startsWith('vermont/') || r.county.startsWith('delaware/')) &&
        r.localCount === 0
    )
    .map((r) => r.county),
  rows,
};

mkdirSync('scripts/output', { recursive: true });
writeFileSync('scripts/output/vt-de-tier1-qa.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
process.exit(report.failCount > 0 || !h1DistinctVt || !h1DistinctDe ? 1 : 0);
