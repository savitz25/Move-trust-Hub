/**
 * Tier 1 system polish gate — five flagship counties + catalog greps.
 * Run: npx tsx scripts/qa-tier1-polish.ts
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { fullMoversCatalog } from '../lib/local-movers/catalog';
import {
  getCountyIntelligencePack,
} from '../lib/local-movers/county-intelligence/registry';
import { getMoversForCounty } from '../lib/local-movers/index';
import { buildCountyMovingSnapshot } from '../lib/local-movers/county-moving-snapshot';
import { getCountyPopularRoutes } from '../lib/local-movers/county-popular-routes';
import {
  buildCountyFaqItems,
  buildCountyLabel,
  stateIntrastateCredentialPhrase,
} from '../lib/local-movers/county-seo';
import { buildMoverHeadquartersAddress } from '../lib/local-movers/schema-helpers';
import { segmentCountyMovers } from '../lib/local-movers/segment-county-movers';
import { isPlaceholderMoverDescription } from '../lib/local-movers/sanitize-mover-description';
import { findUsdotIdentityCollisions } from '../lib/local-movers/usdot-collision-qa';
import { buildCountyReviewBlock } from '../lib/trust/verified-reviews';

const TARGETS: Array<{ stateSlug: string; countySlug: string; stateName: string }> = [
  { stateSlug: 'florida', countySlug: 'orange', stateName: 'Florida' },
  { stateSlug: 'florida', countySlug: 'palm-beach', stateName: 'Florida' },
  { stateSlug: 'new-york', countySlug: 'bronx', stateName: 'New York' },
  { stateSlug: 'georgia', countySlug: 'fulton', stateName: 'Georgia' },
  { stateSlug: 'texas', countySlug: 'dallas', stateName: 'Texas' },
];

const EXPECTED_CORRIDOR_HINTS: Record<string, RegExp> = {
  'florida/orange': /I-4|FL-408|FL-417|US-17|International Drive/i,
  'florida/palm-beach': /I-95|Turnpike|US-1|PGA/i,
  'new-york/bronx': /I-87|I-95|Cross Bronx|Bruckner|Grand Concourse|Major Deegan/i,
  'georgia/fulton': /I-75|I-285|GA-400|Connector/i,
  'texas/dallas': /I-35|I-30|I-635|Tollway|PGBT/i,
};

const CORRIDOR_BLOCKLIST =
  /tourism calendars|operational inputs|parking\/curb|curb staging|hoa density/i;

type Row = {
  county: string;
  pass: boolean;
  checks: Record<string, boolean | string | number>;
  beforeAfter: {
    majorCorridors: string;
    faqScamSnippet: string;
    reviewsShown: number;
    localCount: number;
    nationalCount: number;
  };
};

function auditTarget(t: (typeof TARGETS)[number]): Row {
  const key = `${t.stateSlug}/${t.countySlug}`;
  const result = getMoversForCounty(t.stateSlug, t.countySlug);
  const pack = getCountyIntelligencePack(t.stateSlug, t.countySlug);
  const checks: Record<string, boolean | string | number> = {};

  if (!result || !pack) {
    return {
      county: key,
      pass: false,
      checks: { found: false },
      beforeAfter: {
        majorCorridors: '',
        faqScamSnippet: '',
        reviewsShown: 0,
        localCount: 0,
        nationalCount: 0,
      },
    };
  }

  const { county, movers } = result;
  const countyLabel = buildCountyLabel(county);
  const segments = segmentCountyMovers(movers, county);
  const routes = getCountyPopularRoutes(t.stateSlug, t.countySlug);
  const snapshot = buildCountyMovingSnapshot(pack, routes, countyLabel);
  const faq = buildCountyFaqItems(county, t.stateName, movers);
  const faqText = faq.map((f) => f.answer).join('\n');
  const scam = faq.find((f) => /avoid moving scams/i.test(f.question));

  // 1) No NJ public-mover bleed outside NJ
  checks.noNjPublicMoverBleed =
    t.stateSlug === 'new-jersey' || !/NJ public-mover credentials/i.test(faqText);
  checks.stateCredentialPhrasePresent = faqText.includes(
    stateIntrastateCredentialPhrase(t.stateSlug).slice(0, 20)
  );

  // 2) Major corridors purity
  const corridors = snapshot?.majorCorridors ?? '';
  checks.corridorsPresent = corridors.length > 8;
  checks.corridorsNotOperationalEssay = !CORRIDOR_BLOCKLIST.test(corridors);
  checks.corridorsMatchExpected = EXPECTED_CORRIDOR_HINTS[key]
    ? EXPECTED_CORRIDOR_HINTS[key]!.test(corridors)
    : true;
  checks.packMajorCorridorsSet = Boolean(pack.majorCorridors?.trim());

  // 3) No placeholder descriptions on displayed movers
  checks.noPlaceholderDescriptions = !movers.some((m) =>
    isPlaceholderMoverDescription(m.shortDescription)
  );
  checks.noThisIsMyCompany = !movers.some((m) =>
    /this is my company/i.test(m.shortDescription ?? '')
  );

  // 4) Attributed reviews: suppress when no local source; never off-market national trio
  const reviewBlock = buildCountyReviewBlock(movers, 3, {
    preferLocalMovers: segments.localInState,
    countyLabel,
    marketTokens: [county.name, county.seat ?? '', countyLabel, t.stateName, county.stateCode],
    stateName: t.stateName,
    stateCode: county.stateCode,
  });
  const reviewsShown =
    reviewBlock.hasLocalSource && reviewBlock.reviews.length > 0
      ? reviewBlock.reviews.length
      : 0;
  checks.reviewsOnlyWhenLocalSource =
    segments.localInState.length === 0
      ? reviewsShown === 0
      : reviewsShown === 0 || reviewBlock.hasLocalSource;
  checks.noOffStateReviewLocations = reviewBlock.reviews.every((r) => {
    const loc = r.location.toLowerCase();
    // If a foreign full state name appears, fail
    const foreign = [
      'tennessee',
      'california',
      'georgia',
      'florida',
      'texas',
      'new york',
      'new jersey',
    ].filter((s) => s !== t.stateName.toLowerCase());
    return !foreign.some((s) => new RegExp(`\\b${s}\\b`, 'i').test(loc));
  });

  // 5) Bronx labeling
  if (key === 'new-york/bronx') {
    const h1 = pack.h1 ?? '';
    checks.bronxBoroughLabel =
      /The Bronx \(Bronx County\)/i.test(h1) ||
      /Bronx County.*New York City/i.test(h1);
    checks.bronxCoterminousNote = /coterminous/i.test(
      `${pack.heroOpener} ${pack.eyebrow}`
    );
  }

  // 6) USDOT identity collisions on page
  const collisions = findUsdotIdentityCollisions(movers);
  checks.usdotCollisionCount = collisions.length;
  checks.usdotDisplayClean = collisions.length === 0;

  // 7) Snapshot field presence
  checks.snapshotFieldsPresent = Boolean(
    snapshot?.primaryMarkets &&
      snapshot.moveProfile &&
      snapshot.peakSeason &&
      snapshot.keyChallenges &&
      snapshot.majorCorridors &&
      snapshot.popularDestinations
  );

  // 8) Schema HQ still correct (spot-check)
  let schemaOk = true;
  for (const m of movers.slice(0, 15)) {
    if (!m.headquartersState) continue;
    const addr = buildMoverHeadquartersAddress(m) as { addressRegion?: string } | null;
    if (
      addr?.addressRegion &&
      addr.addressRegion !== m.headquartersState.toUpperCase()
    ) {
      schemaOk = false;
    }
  }
  checks.schemaHqStateCorrect = schemaOk;

  // 9) Local/national split intact
  checks.localNationalSplit =
    segments.localInState.length + segments.national.length === movers.length;

  // 10) Progressive list ready
  checks.progressiveListReady = movers.length > 0;

  // 11) State regulatory language in pack credibility
  if (t.stateSlug === 'florida') {
    checks.regulatoryLanguage = /fdacs|chapter 507/i.test(
      `${pack.heroCredibility} ${pack.heroOpener}`
    );
  } else if (t.stateSlug === 'new-york') {
    checks.regulatoryLanguage = /nysdot/i.test(
      `${pack.heroCredibility} ${pack.heroOpener}`
    );
  } else if (t.stateSlug === 'georgia') {
    checks.regulatoryLanguage = /dps|mccd/i.test(
      `${pack.heroCredibility} ${pack.heroOpener}`
    );
  } else if (t.stateSlug === 'texas') {
    checks.regulatoryLanguage = /txdmv/i.test(
      `${pack.heroCredibility} ${pack.heroOpener}`
    );
  }

  const failKeys = Object.entries(checks)
    .filter(([, v]) => v === false)
    .map(([k]) => k);

  return {
    county: key,
    pass: failKeys.length === 0,
    checks,
    beforeAfter: {
      majorCorridors: corridors,
      faqScamSnippet: (scam?.answer ?? '').slice(0, 180),
      reviewsShown,
      localCount: segments.localInState.length,
      nationalCount: segments.national.length,
    },
  };
}

// Catalog-wide placeholder scan
const catalogPlaceholders = Object.values(fullMoversCatalog).filter((m) =>
  isPlaceholderMoverDescription(m.shortDescription)
);
const catalogThisIsMyCompany = Object.values(fullMoversCatalog).filter((m) =>
  /this is my company/i.test(m.shortDescription ?? '')
);
const catalogUsdotCollisions = findUsdotIdentityCollisions(
  Object.values(fullMoversCatalog).map((m) => ({
    id: m.id,
    name: m.name,
    usdotNumber: m.usdotNumber,
  }))
);

const rows = TARGETS.map(auditTarget);

const report = {
  generatedAt: new Date().toISOString(),
  greps: {
    njPublicMoverInFaqOutsideNj: rows
      .filter((r) => r.county !== 'new-jersey')
      .every((r) => r.checks.noNjPublicMoverBleed === true),
    thisIsMyCompanyInCatalog: catalogThisIsMyCompany.length,
    tourismCalendarsAsCorridors: rows.every(
      (r) => r.checks.corridorsNotOperationalEssay === true
    ),
  },
  catalog: {
    placeholderDescriptionCount: catalogPlaceholders.length,
    thisIsMyCompanyCount: catalogThisIsMyCompany.length,
    usdotIdentityCollisions: catalogUsdotCollisions.slice(0, 25),
    usdotIdentityCollisionCount: catalogUsdotCollisions.length,
  },
  passCount: rows.filter((r) => r.pass).length,
  failCount: rows.filter((r) => !r.pass).length,
  rows,
};

mkdirSync('scripts/output', { recursive: true });
writeFileSync('scripts/output/tier1-polish-qa.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

if (report.failCount > 0 || catalogThisIsMyCompany.length > 0) {
  process.exit(1);
}
