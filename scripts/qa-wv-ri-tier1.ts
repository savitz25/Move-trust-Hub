/**
 * QA for West Virginia Core 5 + Rhode Island Core 5.
 * Run: npx tsx scripts/qa-wv-ri-tier1.ts
 */
import { writeFileSync } from 'node:fs';
import {
  WV_TIER1_CORE5,
  RI_TIER1_CORE5,
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

const FORBIDDEN_WV =
  /\b(BHGS|FDACS|NCUC|NYSDOT|Class E|TDOR|VA DMV|PA PUC|NJ public-mover|public-mover credentials|Georgia DPS|MCCD|TxDMV|IL ICC|PUCO household|UTC household goods permit|MSP CVED|MoDOT household goods|OCC Household Goods|Iowa DOT Intrastate|APSC|LPSC|KCC Certificate|MDOT household|Massachusetts DPU|MA DPU|CTDOT household|RI DPUC|DPUC household)\b/i;

const FORBIDDEN_RI =
  /\b(BHGS|FDACS|NCUC|NYSDOT|Class E|TDOR|VA DMV|PA PUC|NJ public-mover|public-mover credentials|Georgia DPS|MCCD|TxDMV|IL ICC|PUCO household|UTC household goods permit|MSP CVED|MoDOT household goods|OCC Household Goods|Iowa DOT Intrastate|APSC|LPSC|KCC Certificate|MDOT household|WV PSC|Certificate of Convenience and Necessity from the Public Service Commission of West Virginia|require Massachusetts DPU|CTDOT household)\b/i;

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

  if (stateSlug === 'west-virginia' && slug === 'kanawha') {
    checks.charleston =
      /Charleston|Kanawha Valley/i.test(h1 + blob) &&
      !/Huntington as default|Morgantown as default/i.test(blob);
  }
  if (stateSlug === 'west-virginia' && slug === 'berkeley') {
    checks.easternPanhandle = /Martinsburg|Eastern Panhandle|I-81/i.test(
      h1 + blob
    );
  }
  if (stateSlug === 'rhode-island' && slug === 'washington') {
    // Comparative "not Seattle / not Washington State" language is correct disambiguation.
    checks.southCountyRi =
      /Washington County, RI|Washington County, Rhode Island|South County/i.test(
        h1 + blob
      ) && /Narragansett|Kingston|South Kingstown|Rhode Island/i.test(h1 + blob);
  }
  if (stateSlug === 'rhode-island' && slug === 'newport') {
    checks.peninsula =
      /Newport|Aquidneck|peninsula|Historic/i.test(h1 + blob) &&
      !/^Moving in Newport County: Providence/i.test(h1);
  }
  if (stateSlug === 'rhode-island' && slug === 'bristol') {
    checks.eastBay = /East Bay|Barrington|Warren|Bristol/i.test(h1 + blob);
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
      (checks.charleston === undefined || checks.charleston) &&
      (checks.easternPanhandle === undefined || checks.easternPanhandle) &&
      (checks.southCountyRi === undefined || checks.southCountyRi) &&
      (checks.peninsula === undefined || checks.peninsula) &&
      (checks.eastBay === undefined || checks.eastBay)
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

const wvReg =
  /PSC|Public Service Commission|Certificate of Convenience and Necessity|Motor Carrier/i;
const riReg =
  /DPUC|Division of Public Utilities and Carriers|household goods certificate|Bill of Lading/i;

const rows: Row[] = [
  ...WV_TIER1_CORE5.map((s) =>
    audit('west-virginia', 'West Virginia', s, wvReg, FORBIDDEN_WV)
  ),
  ...RI_TIER1_CORE5.map((s) =>
    audit('rhode-island', 'Rhode Island', s, riReg, FORBIDDEN_RI)
  ),
];

const paAllegheny = getCountyIntelligencePack('pennsylvania', 'allegheny');
const maSuffolk = getCountyIntelligencePack('massachusetts', 'suffolk');
const regression = {
  paAllegheny: Boolean(
    paAllegheny?.h1 && !/^Movers Serving/i.test(paAllegheny.h1)
  ),
  maSuffolk: Boolean(maSuffolk?.h1 && !/^Movers Serving/i.test(maSuffolk.h1)),
};

const wvPassed = rows.filter((r) => r.state === 'west-virginia' && r.pass)
  .length;
const riPassed = rows.filter((r) => r.state === 'rhode-island' && r.pass).length;

const report = {
  wvCore5: WV_TIER1_CORE5.length,
  wvPassed,
  riCore5: RI_TIER1_CORE5.length,
  riPassed,
  regression,
  rows,
};

writeFileSync(
  'scripts/qa-wv-ri-tier1-report.json',
  JSON.stringify(report, null, 2)
);

console.log(JSON.stringify(report, null, 2));
console.log(
  `\nWV ${wvPassed}/${WV_TIER1_CORE5.length} · RI ${riPassed}/${RI_TIER1_CORE5.length} · reg paAllegheny=${regression.paAllegheny} maSuffolk=${regression.maSuffolk}`
);

if (
  wvPassed !== WV_TIER1_CORE5.length ||
  riPassed !== RI_TIER1_CORE5.length ||
  !regression.paAllegheny ||
  !regression.maSuffolk
) {
  process.exit(1);
}
