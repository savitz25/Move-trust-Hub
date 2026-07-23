/**
 * Global Tier-1 system polish gate — all shipped Tier-1 states.
 * Run: npx tsx scripts/qa-tier1-global-polish.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { fullMoversCatalog } from '../lib/local-movers/catalog';
import {
  AZ_TIER1_CORE7,
  CA_TIER1_ALL,
  FL_TIER1_CORE12,
  GA_TIER1_CORE12,
  NY_TIER1_CORE12,
  TX_TIER1_CORE12,
  getCountyIntelligencePack,
  listCountyIntelligencePacks,
} from '../lib/local-movers/county-intelligence/registry';
import {
  getCountyMajorCorridors,
  isFactualCorridorList,
  listCuratedMajorCorridorKeys,
} from '../lib/local-movers/county-major-corridors';
import { buildCountyMovingSnapshot } from '../lib/local-movers/county-moving-snapshot';
import { getCountyPopularRoutes } from '../lib/local-movers/county-popular-routes';
import {
  buildCountyFaqItems,
  buildCountyLabel,
  stateIntrastateCredentialPhrase,
} from '../lib/local-movers/county-seo';
import { getMoversForCounty } from '../lib/local-movers/index';
import { isPlaceholderMoverDescription } from '../lib/local-movers/sanitize-mover-description';
import { segmentCountyMovers } from '../lib/local-movers/segment-county-movers';
import { buildCountyReviewBlock } from '../lib/trust/verified-reviews';

const STATE_NAME: Record<string, string> = {
  california: 'California',
  florida: 'Florida',
  texas: 'Texas',
  georgia: 'Georgia',
  'new-york': 'New York',
  arizona: 'Arizona',
  'new-jersey': 'New Jersey',
};

const TIER1_TARGETS: Array<{ stateSlug: string; countySlug: string }> = [
  ...CA_TIER1_ALL.map((c) => ({ stateSlug: 'california', countySlug: c })),
  ...FL_TIER1_CORE12.map((c) => ({ stateSlug: 'florida', countySlug: c })),
  ...TX_TIER1_CORE12.map((c) => ({ stateSlug: 'texas', countySlug: c })),
  ...GA_TIER1_CORE12.map((c) => ({ stateSlug: 'georgia', countySlug: c })),
  ...NY_TIER1_CORE12.map((c) => ({ stateSlug: 'new-york', countySlug: c })),
  ...AZ_TIER1_CORE7.map((c) => ({ stateSlug: 'arizona', countySlug: c })),
];

// Sample pages for report spotlight
const SPOTLIGHT = [
  'florida/orange',
  'california/los-angeles',
  'texas/dallas',
  'georgia/fulton',
  'new-york/bronx',
  'arizona/maricopa',
];

type Row = {
  county: string;
  pass: boolean;
  failKeys: string[];
  majorCorridors: string;
  localCount: number;
  reviewsShown: number;
  faqCredentialOk: boolean;
};

function audit(stateSlug: string, countySlug: string): Row {
  const key = `${stateSlug}/${countySlug}`;
  const stateName = STATE_NAME[stateSlug] ?? stateSlug;
  const result = getMoversForCounty(stateSlug, countySlug);
  const pack = getCountyIntelligencePack(stateSlug, countySlug);
  const failKeys: string[] = [];

  if (!result || !pack) {
    return {
      county: key,
      pass: false,
      failKeys: ['missing_pack_or_movers'],
      majorCorridors: '',
      localCount: 0,
      reviewsShown: 0,
      faqCredentialOk: false,
    };
  }

  const { county, movers } = result;
  const countyLabel = buildCountyLabel(county);
  const segments = segmentCountyMovers(movers, county);
  const routes = getCountyPopularRoutes(stateSlug, countySlug);
  const snapshot = buildCountyMovingSnapshot(pack, routes, countyLabel);
  const faq = buildCountyFaqItems(county, stateName, movers);
  const faqText = faq.map((f) => f.answer).join('\n');
  const corridors = snapshot?.majorCorridors ?? '';

  // 1) NJ bleed
  if (stateSlug !== 'new-jersey' && /NJ public-mover credentials/i.test(faqText)) {
    failKeys.push('nj_faq_bleed');
  }
  if (stateSlug !== 'new-jersey' && /New Jersey.?s public movers/i.test(faqText)) {
    failKeys.push('nj_licensing_bleed');
  }
  const expectedPhrase = stateIntrastateCredentialPhrase(stateSlug);
  if (!faqText.includes(expectedPhrase.slice(0, 16))) {
    failKeys.push('missing_state_credential_phrase');
  }

  // 2) Placeholder descriptions
  if (movers.some((m) => isPlaceholderMoverDescription(m.shortDescription))) {
    failKeys.push('placeholder_descriptions');
  }
  if (movers.some((m) => /this is my company/i.test(m.shortDescription ?? ''))) {
    failKeys.push('this_is_my_company');
  }

  // 3) Major corridors purity
  if (!corridors || !isFactualCorridorList(corridors)) {
    failKeys.push('corridors_not_factual');
  }
  if (/tourism calendars|operational inputs|curb staging|hoa density/i.test(corridors)) {
    failKeys.push('corridors_operational_essay');
  }
  // Prefer curated map coverage for Tier-1
  if (!getCountyMajorCorridors(stateSlug, countySlug) && !pack.majorCorridors?.trim()) {
    // Extraction fallback may still pass isFactualCorridorList — flag soft coverage gap
    if (!isFactualCorridorList(corridors) || corridors.includes('see zone guide')) {
      failKeys.push('missing_curated_corridors');
    }
  }

  // 4) Reviews: suppress without local source; no off-state locations
  const reviewBlock = buildCountyReviewBlock(movers, 3, {
    preferLocalMovers: segments.localInState,
    countyLabel,
    marketTokens: [county.name, county.seat ?? '', countyLabel, stateName, county.stateCode],
    stateName,
    stateCode: county.stateCode,
  });
  const reviewsShown =
    reviewBlock.hasLocalSource && reviewBlock.reviews.length > 0
      ? reviewBlock.reviews.length
      : 0;
  if (segments.localInState.length === 0 && reviewsShown > 0) {
    failKeys.push('reviews_without_local_source');
  }
  if (reviewsShown > 0 && !reviewBlock.hasLocalSource) {
    failKeys.push('reviews_not_local_source');
  }

  // 5) Snapshot fields present
  if (
    !snapshot?.primaryMarkets ||
    !snapshot.moveProfile ||
    !snapshot.peakSeason ||
    !snapshot.keyChallenges ||
    !snapshot.majorCorridors ||
    !snapshot.popularDestinations
  ) {
    failKeys.push('snapshot_incomplete');
  }

  // 6) Local/national split + progressive list
  if (segments.localInState.length + segments.national.length !== movers.length) {
    failKeys.push('local_national_split');
  }
  if (movers.length === 0) {
    failKeys.push('empty_list');
  }

  // 7) Bronx labeling
  if (key === 'new-york/bronx') {
    const h1 = pack.h1 ?? '';
    if (!/The Bronx \(Bronx County\)/i.test(h1) && !/Bronx County.*New York City/i.test(h1)) {
      failKeys.push('bronx_label');
    }
  }

  // 8) Regulatory language in pack
  const cred = `${pack.heroCredibility ?? ''} ${pack.heroOpener}`;
  if (stateSlug === 'florida' && !/fdacs|chapter 507/i.test(cred)) failKeys.push('reg_fl');
  if (stateSlug === 'california' && !/bhgs|household goods/i.test(cred)) {
    // CA packs may mention BHGS only in resources — soft check on FAQ instead
    if (!/BHGS/i.test(faqText)) failKeys.push('reg_ca');
  }
  if (stateSlug === 'texas' && !/txdmv/i.test(cred) && !/TxDMV/i.test(faqText)) {
    failKeys.push('reg_tx');
  }
  if (stateSlug === 'georgia' && !/dps|mccd/i.test(cred) && !/MCCD|DPS/i.test(faqText)) {
    failKeys.push('reg_ga');
  }
  if (stateSlug === 'new-york' && !/nysdot/i.test(cred) && !/NYSDOT/i.test(faqText)) {
    failKeys.push('reg_ny');
  }
  if (stateSlug === 'arizona' && !/acc|corporation commission|fmcsa/i.test(cred + faqText)) {
    failKeys.push('reg_az');
  }

  return {
    county: key,
    pass: failKeys.length === 0,
    failKeys,
    majorCorridors: corridors,
    localCount: segments.localInState.length,
    reviewsShown,
    faqCredentialOk: !failKeys.includes('nj_faq_bleed'),
  };
}

const rows = TIER1_TARGETS.map((t) => audit(t.stateSlug, t.countySlug));

// Also audit all NJ packs that share the template
const njPacks = listCountyIntelligencePacks().filter((p) => p.stateSlug === 'new-jersey');
const njRows = njPacks.map((p) => audit(p.stateSlug, p.countySlug));

const allRows = [...rows, ...njRows];

const catalogThisIsMyCompany = Object.values(fullMoversCatalog).filter((m) =>
  /this is my company/i.test(m.shortDescription ?? '')
);
const catalogPlaceholders = Object.values(fullMoversCatalog).filter((m) =>
  isPlaceholderMoverDescription(m.shortDescription)
);

const curatedKeys = new Set(listCuratedMajorCorridorKeys());
const missingCurated = TIER1_TARGETS.filter(
  (t) => !curatedKeys.has(`${t.stateSlug}/${t.countySlug}`)
);

const report = {
  generatedAt: new Date().toISOString(),
  scope: {
    ca: CA_TIER1_ALL.length,
    fl: FL_TIER1_CORE12.length,
    tx: TX_TIER1_CORE12.length,
    ga: GA_TIER1_CORE12.length,
    ny: NY_TIER1_CORE12.length,
    az: AZ_TIER1_CORE7.length,
    nj: njPacks.length,
    totalAudited: allRows.length,
  },
  greps: {
    thisIsMyCompanyInCatalog: catalogThisIsMyCompany.length,
    placeholderDescriptionsInCatalog: catalogPlaceholders.length,
    njPublicMoverOutsideNj: rows.every((r) => r.faqCredentialOk),
  },
  curatedCorridorCoverage: {
    defined: curatedKeys.size,
    missingTier1Keys: missingCurated.map((t) => `${t.stateSlug}/${t.countySlug}`),
  },
  passCount: allRows.filter((r) => r.pass).length,
  failCount: allRows.filter((r) => !r.pass).length,
  failures: allRows.filter((r) => !r.pass),
  spotlight: SPOTLIGHT.map((k) => allRows.find((r) => r.county === k)),
  zeroLocalFlagships: allRows
    .filter((r) => SPOTLIGHT.includes(r.county) && r.localCount === 0)
    .map((r) => r.county),
};

mkdirSync('scripts/output', { recursive: true });
writeFileSync(
  'scripts/output/tier1-global-polish-qa.json',
  JSON.stringify(report, null, 2)
);
console.log(JSON.stringify(report, null, 2));

if (
  report.failCount > 0 ||
  catalogThisIsMyCompany.length > 0 ||
  missingCurated.length > 0
) {
  process.exit(1);
}
