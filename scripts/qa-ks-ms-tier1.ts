/**
 * QA for Kansas Core 6 + Mississippi Core 6.
 * Run: npx tsx scripts/qa-ks-ms-tier1.ts
 */
import { writeFileSync } from 'node:fs';
import {
  KS_TIER1_CORE6,
  MS_TIER1_CORE6,
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

const FORBIDDEN_KS =
  /\b(BHGS|FDACS|NCUC|NYSDOT|Class E|TDOR|VA DMV|PA PUC|NJ public-mover|public-mover credentials|Georgia DPS|MCCD|TxDMV|IL ICC|PUCO household|UTC household goods permit|MSP CVED|MoDOT household goods|OCC Household Goods|Iowa DOT Intrastate|APSC|LPSC)\b/i;

const FORBIDDEN_MS =
  /\b(BHGS|FDACS|NCUC|NYSDOT|Class E|TDOR|VA DMV|PA PUC|NJ public-mover|public-mover credentials|Georgia DPS|MCCD|TxDMV|IL ICC|PUCO household|UTC household goods permit|MSP CVED|KCC Certificate|KCC household goods|OCC Household Goods|APSC Motor Carrier|LPSC household)\b/i;

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

  if (stateSlug === 'kansas' && slug === 'johnson') {
    checks.notIaJohnson =
      /Kansas|JOCO|Overland Park|Olathe/i.test(h1 + blob) &&
      !/Johnson County, Iowa as default|Iowa City as default/i.test(blob);
  }
  if (stateSlug === 'kansas' && slug === 'wyandotte') {
    checks.kck =
      /Kansas City, Kansas|KCK|Wyandotte/i.test(h1 + blob) &&
      !/Kansas City, Missouri as default|KCMO elevators as default/i.test(blob);
  }
  if (stateSlug === 'mississippi' && slug === 'hinds') {
    checks.hindsCity = /Jackson/i.test(h1 + blob);
  }
  if (stateSlug === 'mississippi' && slug === 'jackson') {
    checks.coastNotCity =
      /Pascagoula|Ocean Springs|Gulf|Coast/i.test(h1 + blob) &&
      !/^Moving in Jackson County: Jackson Access/i.test(h1);
  }
  if (stateSlug === 'mississippi' && slug === 'madison') {
    checks.notAlMadison =
      /Mississippi|Ridgeland|Madison\/Ridgeland/i.test(h1 + blob) ||
      /Madison County, MS|Madison County, Mississippi/i.test(h1 + blob);
  }
  if (stateSlug === 'mississippi' && slug === 'desoto') {
    checks.memphisCollar = /Southaven|Olive Branch|Memphis/i.test(h1 + blob);
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
      (checks.notIaJohnson === undefined || checks.notIaJohnson) &&
      (checks.kck === undefined || checks.kck) &&
      (checks.hindsCity === undefined || checks.hindsCity) &&
      (checks.coastNotCity === undefined || checks.coastNotCity) &&
      (checks.notAlMadison === undefined || checks.notAlMadison) &&
      (checks.memphisCollar === undefined || checks.memphisCollar)
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

const ksRows = KS_TIER1_CORE6.map((slug) =>
  audit(
    'kansas',
    'Kansas',
    slug,
    /KCC|Corporation Commission|Certificate of Public Convenience/i,
    FORBIDDEN_KS
  )
);
const msRows = MS_TIER1_CORE6.map((slug) =>
  audit(
    'mississippi',
    'Mississippi',
    slug,
    /MDOT|Department of Transportation|Certificate of Public Convenience/i,
    FORBIDDEN_MS
  )
);

const rows = [...ksRows, ...msRows];
const ksPassed = ksRows.filter((r) => r.pass).length;
const msPassed = msRows.filter((r) => r.pass).length;

const moJackson = getCountyIntelligencePack('missouri', 'jackson');
const alMadison = getCountyIntelligencePack('alabama', 'madison');
const regression = {
  moJackson: Boolean(moJackson?.h1 && moJackson.zones.length >= 4),
  alMadison: Boolean(alMadison?.h1 && alMadison.zones.length >= 4),
};

const report = {
  ksCore6: KS_TIER1_CORE6.length,
  ksPassed,
  msCore6: MS_TIER1_CORE6.length,
  msPassed,
  regression,
  rows,
};

writeFileSync('scripts/qa-ks-ms-tier1-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
console.log(
  `\nKS ${ksPassed}/${KS_TIER1_CORE6.length} | MS ${msPassed}/${MS_TIER1_CORE6.length} | regression moJackson=${regression.moJackson} alMadison=${regression.alMadison}`
);
process.exit(
  ksPassed === KS_TIER1_CORE6.length &&
    msPassed === MS_TIER1_CORE6.length &&
    regression.moJackson &&
    regression.alMadison
    ? 0
    : 1
);
