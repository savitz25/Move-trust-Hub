/**
 * QA for Kentucky Core 6 + Nevada Core 5.
 * Run: npx tsx scripts/qa-ky-nv-tier1.ts
 */
import { writeFileSync } from 'node:fs';
import {
  KY_TIER1_CORE6,
  NV_TIER1_CORE5,
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

const FORBIDDEN_KY =
  /\b(BHGS|FDACS|NCUC|NYSDOT|Class E|TDOR|VA DMV|PA PUC|NJ public-mover|public-mover credentials|Georgia DPS|MCCD|TxDMV|IL ICC|PUCO household|UTC household goods permit|MSP CVED|MoDOT household goods|NTA household goods CPCN|Indiana DOR)\b/i;

const FORBIDDEN_NV =
  /\b(BHGS|FDACS|NCUC|NYSDOT|Class E|TDOR|VA DMV|PA PUC|NJ public-mover|public-mover credentials|Georgia DPS|MCCD|TxDMV|IL ICC|PUCO household|UTC household goods permit|MSP CVED|KYTC Division|MoDOT household goods|Colorado PUC HHG)\b/i;

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

  if (stateSlug === 'kentucky' && slug === 'jefferson') {
    checks.notMoJefferson =
      /Kentucky|Louisville/i.test(h1 + blob) &&
      !/Jefferson County, Missouri as default|St\. Louis metro fringe as default/i.test(
        blob
      );
  }
  if (stateSlug === 'kentucky' && slug === 'boone') {
    checks.nkyBoone = /Florence|CVG|Northern Kentucky|NKY/i.test(h1 + blob);
  }
  if (stateSlug === 'nevada' && slug === 'clark') {
    checks.notRenoClone = !/Reno–Sparks product as default/i.test(blob);
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
      (checks.notMoJefferson === undefined || checks.notMoJefferson) &&
      (checks.nkyBoone === undefined || checks.nkyBoone)
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

const kyRows = KY_TIER1_CORE6.map((slug) =>
  audit(
    'kentucky',
    'Kentucky',
    slug,
    /KYTC|Division of Motor Carriers|DMT|DVR|household goods certificate/i,
    FORBIDDEN_KY
  )
);
const nvRows = NV_TIER1_CORE5.map((slug) =>
  audit(
    'nevada',
    'Nevada',
    slug,
    /NTA|Transportation Authority|CPCN/i,
    FORBIDDEN_NV
  )
);

const rows = [...kyRows, ...nvRows];
const kyPassed = kyRows.filter((r) => r.pass).length;
const nvPassed = nvRows.filter((r) => r.pass).length;

const hamilton = getCountyIntelligencePack('ohio', 'hamilton');
const maricopa = getCountyIntelligencePack('arizona', 'maricopa');
const regression = {
  hamilton: Boolean(hamilton?.h1 && hamilton.zones.length >= 4),
  maricopa: Boolean(maricopa?.h1 && maricopa.zones.length >= 4),
};

const report = {
  kyCore6: KY_TIER1_CORE6.length,
  kyPassed,
  nvCore5: NV_TIER1_CORE5.length,
  nvPassed,
  regression,
  rows,
};

writeFileSync('scripts/qa-ky-nv-tier1-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
console.log(
  `\nKY ${kyPassed}/${KY_TIER1_CORE6.length} | NV ${nvPassed}/${NV_TIER1_CORE5.length} | regression hamilton=${regression.hamilton} maricopa=${regression.maricopa}`
);
process.exit(
  kyPassed === KY_TIER1_CORE6.length &&
    nvPassed === NV_TIER1_CORE5.length &&
    regression.hamilton &&
    regression.maricopa
    ? 0
    : 1
);
