/**
 * QA for New Hampshire Core 5 + Maine Core 5.
 * Run: npx tsx scripts/qa-nh-me-tier1.ts
 */
import { writeFileSync } from 'node:fs';
import {
  NH_TIER1_CORE5,
  ME_TIER1_CORE5,
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

const FORBIDDEN_NH =
  /\b(BHGS|FDACS|NCUC|NYSDOT|Class E|TDOR|VA DMV|PA PUC|NJ public-mover|public-mover credentials|Georgia DPS|MCCD|TxDMV|IL ICC|PUCO household|UTC household goods permit|MSP CVED|MoDOT household goods|OCC Household Goods|Iowa DOT Intrastate|APSC|LPSC|KCC Certificate|MDOT household|Massachusetts DPU|MA DPU|CTDOT household)\b/i;

// Allow comparative mentions of MA DPU / NH RSA 359-T (ME packs correctly state ME lacks those programs).
// Flag only true foreign-regulator bleed / invented NH/MA authority-as-required language.
const FORBIDDEN_ME =
  /\b(BHGS|FDACS|NCUC|NYSDOT|Class E|TDOR|VA DMV|PA PUC|NJ public-mover|public-mover credentials|Georgia DPS|MCCD|TxDMV|IL ICC|PUCO household|UTC household goods permit|MSP CVED|MoDOT household goods|OCC Household Goods|Iowa DOT Intrastate|APSC|LPSC|KCC Certificate|MDOT household|CTDOT household|verify Massachusetts DPU|require Massachusetts DPU|require NH household goods|require New Hampshire household goods carrier)\b/i;

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

  if (stateSlug === 'new-hampshire' && slug === 'hillsborough') {
    checks.manchesterNashua = /Manchester|Nashua/i.test(h1 + blob);
  }
  if (stateSlug === 'new-hampshire' && slug === 'rockingham') {
    checks.seacoast = /Portsmouth|Seacoast|Hampton|Exeter/i.test(h1 + blob);
  }
  if (stateSlug === 'maine' && slug === 'cumberland') {
    checks.portland = /Portland/i.test(h1 + blob);
  }
  if (stateSlug === 'maine' && slug === 'york') {
    checks.notPortlandClone =
      /Biddeford|Saco|Sanford|Kennebunk|York/i.test(h1 + blob) &&
      !/^Moving in York County: Portland/i.test(h1);
  }
  if (stateSlug === 'maine' && slug === 'penobscot') {
    checks.bangor = /Bangor/i.test(h1 + blob) && !/Portland density as default/i.test(blob);
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
      (checks.manchesterNashua === undefined || checks.manchesterNashua) &&
      (checks.seacoast === undefined || checks.seacoast) &&
      (checks.portland === undefined || checks.portland) &&
      (checks.notPortlandClone === undefined || checks.notPortlandClone) &&
      (checks.bangor === undefined || checks.bangor)
  );

  return {
    state: stateSlug,
    county: slug,
    pass,
    localCount: Number(checks.localCount) || 0,
    nationalCount: Number(checks.nationalCount) || 0,
    majorCorridors: pack.majorCorridors ?? '',
    h1,
    checks,
    recommendation: pass ? 'OK' : 'FAIL',
  };
}

const nhReg = /RSA 359-T|household goods carrier|Department of Safety|DOS Bureau|written estimates on customer request/i;
const meReg = /BMV|Bureau of Motor Vehicles|Motor Carrier Services|written estimates|insurance certificates|does not maintain a dedicated/i;

const rows: Row[] = [
  ...NH_TIER1_CORE5.map((s) =>
    audit('new-hampshire', 'New Hampshire', s, nhReg, FORBIDDEN_NH)
  ),
  ...ME_TIER1_CORE5.map((s) =>
    audit('maine', 'Maine', s, meReg, FORBIDDEN_ME)
  ),
];

// Regressions
const maSuffolk = getCountyIntelligencePack('massachusetts', 'suffolk');
const ctFairfield = getCountyIntelligencePack('connecticut', 'fairfield');
const regression = {
  maSuffolk: Boolean(maSuffolk?.h1 && !/^Movers Serving/i.test(maSuffolk.h1)),
  ctFairfield: Boolean(ctFairfield?.h1 && !/^Movers Serving/i.test(ctFairfield.h1)),
};

const nhPassed = rows.filter((r) => r.state === 'new-hampshire' && r.pass).length;
const mePassed = rows.filter((r) => r.state === 'maine' && r.pass).length;

const report = {
  nhCore5: NH_TIER1_CORE5.length,
  nhPassed,
  meCore5: ME_TIER1_CORE5.length,
  mePassed,
  regression,
  rows,
};

writeFileSync(
  'scripts/qa-nh-me-tier1-report.json',
  JSON.stringify(report, null, 2)
);

console.log(JSON.stringify(report, null, 2));
console.log(
  `\nNH ${nhPassed}/${NH_TIER1_CORE5.length} · ME ${mePassed}/${ME_TIER1_CORE5.length} · reg maSuffolk=${regression.maSuffolk} ctFairfield=${regression.ctFairfield}`
);

if (
  nhPassed !== NH_TIER1_CORE5.length ||
  mePassed !== ME_TIER1_CORE5.length ||
  !regression.maSuffolk ||
  !regression.ctFairfield
) {
  process.exit(1);
}
