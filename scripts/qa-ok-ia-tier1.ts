/**
 * QA for Oklahoma Core 6 + Iowa Core 6.
 * Run: npx tsx scripts/qa-ok-ia-tier1.ts
 */
import { writeFileSync } from 'node:fs';
import {
  OK_TIER1_CORE6,
  IA_TIER1_CORE6,
  getCountyIntelligencePack,
} from '../lib/local-movers/county-intelligence/registry';
import { getMoversForCounty } from '../lib/local-movers/index';
import { buildCountyMovingSnapshot } from '../lib/local-movers/county-moving-snapshot';
import { getCountyPopularRoutes } from '../lib/local-movers/county-popular-routes';
import { isFactualCorridorList } from '../lib/local-movers/county-major-corridors';
import { buildCountyLabel, buildCountyFaqItems } from '../lib/local-movers/county-seo';
import { segmentCountyMovers } from '../lib/local-movers/segment-county-movers';
import { evaluateCountyIndexability } from '../lib/local-movers/county-indexability';
import { isBatchTemplateCountyResearch } from '../lib/local-movers/county-content-quality';

type Row = {
  state: string;
  county: string;
  pass: boolean;
  localCount: number;
  nationalCount: number;
  majorCorridors: string;
  h1: string;
  checks: Record<string, boolean | string | number>;
  recommendation: string;
};

const FORBIDDEN_OK =
  /\b(BHGS|FDACS|NCUC|NYSDOT|Class E|TDOR|VA DMV|PA PUC|NJ public-mover|public-mover credentials|Georgia DPS|MCCD|TxDMV|IL ICC|PUCO household|UTC household goods permit|MSP CVED|MnDOT household goods|KYTC|NTA household goods CPCN|Iowa DOT Intrastate)\b/i;

// Allow comparative "do not substitute IL ICC" anti-bleed language in packs.
const FORBIDDEN_IA =
  /\b(BHGS|FDACS|NCUC|NYSDOT|Class E|TDOR|VA DMV|PA PUC|NJ public-mover|public-mover credentials|Georgia DPS|MCCD|TxDMV|PUCO household|UTC household goods permit|MSP CVED|MnDOT household goods|OCC Household Goods Certificate|KYTC Division|NTA household goods CPCN)\b/i;

function audit(
  stateSlug: string,
  stateName: string,
  slug: string,
  regCheck: RegExp,
  forbidden: RegExp
): Row {
  const result = getMoversForCounty(stateSlug, slug);
  const pack = getCountyIntelligencePack(stateSlug, slug);
  const checks: Record<string, boolean | string | number> = {};

  if (!pack) {
    return {
      state: stateSlug,
      county: slug,
      pass: false,
      localCount: 0,
      nationalCount: 0,
      majorCorridors: '',
      h1: '',
      checks: { pack: false },
      recommendation: 'Missing intelligence pack',
    };
  }

  const movers = result?.movers ?? [];
  const county = result?.county;
  const countyLabel = county ? buildCountyLabel(county) : slug;
  const segments = county
    ? segmentCountyMovers(movers, county)
    : { localInState: [] as typeof movers, national: movers };
  const routes = getCountyPopularRoutes(stateSlug, slug);
  const snapshot = buildCountyMovingSnapshot(pack, routes, countyLabel);
  const h1 = pack.h1 ?? '';
  const blob = JSON.stringify(pack);
  const faqText = county
    ? buildCountyFaqItems(county, stateName, movers)
        .map((f) => f.answer)
        .join(' ')
    : '';

  checks.narrativeH1 =
    Boolean(h1) && !/^Movers Serving/i.test(h1) && h1.length > 20;
  checks.zonesGte4 = pack.zones.length >= 4;
  checks.zoneIdsUnique =
    new Set(pack.zones.map((z) => z.id)).size === pack.zones.length;
  checks.relocationPresent = Boolean(pack.relocation?.modules?.length);
  checks.schoolsModule = Boolean(
    pack.relocation?.modules?.some((m) => /school/i.test(m.title))
  );
  checks.hospitalsModule = Boolean(
    pack.relocation?.modules?.some((m) => /hospital|health/i.test(m.title))
  );
  checks.majorCorridorsFactual = isFactualCorridorList(
    pack.majorCorridors ?? snapshot.majorCorridors ?? ''
  );
  checks.routesGte4 = routes.length >= 4;
  checks.regPresent = regCheck.test(blob);
  checks.fmcsaPresent = /FMCSA/i.test(blob);
  checks.noForeignRegulator =
    !forbidden.test(blob) && !forbidden.test(faqText);
  checks.stateSlugOk = pack.stateSlug === stateSlug;
  checks.notBatchTips = !isBatchTemplateCountyResearch(stateSlug, slug);
  checks.localCount = segments.localInState.length;
  checks.nationalCount = segments.national.length;
  const indexDecision = evaluateCountyIndexability(stateSlug, slug);
  checks.indexReason = indexDecision.reason;
  checks.indexable = indexDecision.tier === 'index';

  if (stateSlug === 'oklahoma' && slug === 'oklahoma') {
    checks.countyClearH1 =
      /Oklahoma County/i.test(h1) && !/^Moving in Oklahoma:/i.test(h1);
  }
  if (stateSlug === 'oklahoma' && slug === 'cleveland') {
    // Allow anti-sameness ("not Cleveland, Ohio / Cuyahoga") when Norman/OK framing is present.
    checks.notClevelandOh =
      /Norman|Oklahoma/i.test(h1 + blob) &&
      !/Cuyahoga County movers|Lake Erie elevators as default|Ohio PUCO as Oklahoma authority/i.test(
        blob
      );
  }
  if (stateSlug === 'iowa' && slug === 'johnson') {
    checks.iowaCity =
      /Iowa City|University of Iowa|UI /i.test(h1 + blob) &&
      !/Johnson County, Kansas as default|Johnson County, Tennessee as default/i.test(
        blob
      );
  }
  if (stateSlug === 'iowa' && slug === 'scott') {
    checks.quadCities = /Quad Cities|Davenport|Bettendorf/i.test(h1 + blob);
  }

  const pass = Boolean(
    checks.narrativeH1 &&
      checks.zonesGte4 &&
      checks.zoneIdsUnique &&
      checks.relocationPresent &&
      checks.schoolsModule &&
      checks.hospitalsModule &&
      checks.majorCorridorsFactual &&
      checks.routesGte4 &&
      checks.regPresent &&
      checks.fmcsaPresent &&
      checks.noForeignRegulator &&
      checks.stateSlugOk &&
      checks.notBatchTips &&
      (checks.countyClearH1 === undefined || checks.countyClearH1) &&
      (checks.notClevelandOh === undefined || checks.notClevelandOh) &&
      (checks.iowaCity === undefined || checks.iowaCity) &&
      (checks.quadCities === undefined || checks.quadCities)
  );

  return {
    state: stateSlug,
    county: slug,
    pass,
    localCount: segments.localInState.length,
    nationalCount: segments.national.length,
    majorCorridors: pack.majorCorridors ?? snapshot.majorCorridors ?? '',
    h1,
    checks,
    recommendation: pass
      ? 'OK'
      : Object.entries(checks)
          .filter(([, v]) => v === false)
          .map(([k]) => k)
          .join(', '),
  };
}

const okRows = OK_TIER1_CORE6.map((slug) =>
  audit(
    'oklahoma',
    'Oklahoma',
    slug,
    /OCC|Corporation Commission|Household Goods Certificate/i,
    FORBIDDEN_OK
  )
);
const iaRows = IA_TIER1_CORE6.map((slug) =>
  audit(
    'iowa',
    'Iowa',
    slug,
    /Iowa DOT|Intrastate Motor Carrier Permit|Motor Carrier Services/i,
    FORBIDDEN_IA
  )
);

const rows = [...okRows, ...iaRows];
const okPassed = okRows.filter((r) => r.pass).length;
const iaPassed = iaRows.filter((r) => r.pass).length;

const dallas = getCountyIntelligencePack('texas', 'dallas');
const cook = getCountyIntelligencePack('illinois', 'cook');
const regression = {
  dallas: Boolean(dallas?.h1 && dallas.zones.length >= 4),
  cook: Boolean(cook?.h1 && cook.zones.length >= 4),
};

const report = {
  okCore6: OK_TIER1_CORE6.length,
  okPassed,
  iaCore6: IA_TIER1_CORE6.length,
  iaPassed,
  regression,
  rows,
};

writeFileSync('scripts/qa-ok-ia-tier1-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
console.log(
  `\nOK ${okPassed}/${OK_TIER1_CORE6.length} | IA ${iaPassed}/${IA_TIER1_CORE6.length} | regression dallas=${regression.dallas} cook=${regression.cook}`
);
process.exit(
  okPassed === OK_TIER1_CORE6.length &&
    iaPassed === IA_TIER1_CORE6.length &&
    regression.dallas &&
    regression.cook
    ? 0
    : 1
);
