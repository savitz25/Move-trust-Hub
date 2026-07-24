/**
 * QA for Missouri Core 6 + South Carolina Core 6.
 * Run: npx tsx scripts/qa-mo-sc-tier1.ts
 */
import { writeFileSync } from 'node:fs';
import {
  MO_TIER1_CORE6,
  SC_TIER1_CORE6,
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

const FORBIDDEN_MO =
  /\b(BHGS|FDACS|NCUC|NYSDOT|Class E certificate|TDOR|VA DMV|PA PUC|NJ public-mover|public-mover credentials|Georgia DPS|MCCD|TxDMV|IL ICC|PUCO household|UTC household goods permit|MSP CVED|DPU operating certificate|Indiana DOR|SC ORS)\b/i;

const FORBIDDEN_SC =
  /\b(BHGS|FDACS|NCUC|NYSDOT|TDOR|VA DMV|PA PUC|NJ public-mover|public-mover credentials|Georgia DPS|MCCD|TxDMV|IL ICC|PUCO household|UTC household goods permit|MSP CVED|MnDOT household goods|DPU operating certificate|Indiana DOR|MoDOT household goods operating)\b/i;

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

  // Special disambiguation
  if (stateSlug === 'missouri' && slug === 'st-louis') {
    checks.notMnDuluth =
      /Missouri/i.test(h1 + blob) &&
      !/Duluth hill grades as default|North Shore MN-61 as default/i.test(blob);
  }
  if (stateSlug === 'missouri' && slug === 'jackson') {
    checks.kcMo =
      /Kansas City/i.test(h1 + blob) && !/St\. Louis County elevators as default/i.test(blob);
  }
  if (stateSlug === 'south-carolina' && slug === 'charleston') {
    checks.notHorryClone = !/Myrtle Beach tourism peaks as default/i.test(blob);
  }
  if (stateSlug === 'south-carolina' && slug === 'greenville') {
    checks.notSpartanburgClone = !/renamed Spartanburg/i.test(blob)
      ? true
      : /not a renamed Spartanburg/i.test(blob);
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
      (checks.notMnDuluth === undefined || checks.notMnDuluth) &&
      (checks.kcMo === undefined || checks.kcMo)
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

const moRows = MO_TIER1_CORE6.map((slug) =>
  audit(
    'missouri',
    'Missouri',
    slug,
    /MoDOT|household goods operating authority/i,
    FORBIDDEN_MO
  )
);
const scRows = SC_TIER1_CORE6.map((slug) =>
  audit(
    'south-carolina',
    'South Carolina',
    slug,
    /Class E|ORS|PSC/i,
    FORBIDDEN_SC
  )
);

const rows = [...moRows, ...scRows];
const moPassed = moRows.filter((r) => r.pass).length;
const scPassed = scRows.filter((r) => r.pass).length;

const cook = getCountyIntelligencePack('illinois', 'cook');
const meck = getCountyIntelligencePack('north-carolina', 'mecklenburg');
const regression = {
  cook: Boolean(cook?.h1 && cook.zones.length >= 4),
  mecklenburg: Boolean(meck?.h1 && meck.zones.length >= 4),
};

const report = {
  moCore6: MO_TIER1_CORE6.length,
  moPassed,
  scCore6: SC_TIER1_CORE6.length,
  scPassed,
  regression,
  rows,
};

writeFileSync('scripts/qa-mo-sc-tier1-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
console.log(
  `\nMO ${moPassed}/${MO_TIER1_CORE6.length} | SC ${scPassed}/${SC_TIER1_CORE6.length} | regression cook=${regression.cook} meck=${regression.mecklenburg}`
);
process.exit(
  moPassed === MO_TIER1_CORE6.length &&
    scPassed === SC_TIER1_CORE6.length &&
    regression.cook &&
    regression.mecklenburg
    ? 0
    : 1
);
