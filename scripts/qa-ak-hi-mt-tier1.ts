/**
 * QA for Alaska Core 4 + Hawaii Core 4 + Montana Core 5.
 */
import { writeFileSync } from 'node:fs';
import {
  AK_TIER1_CORE4,
  HI_TIER1_CORE4,
  MT_TIER1_CORE5,
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

// Allow comparative "not WA UTC / not OR ODOT" language in AK_REG_BULLET.
const FORBIDDEN_AK =
  /\b(BHGS|FDACS|NCUC|NYSDOT|Class E|TDOR|VA DMV|PA PUC|NJ public-mover|public-mover credentials|require Washington UTC|require Oregon ODOT|require IPUC)\b/i;

const FORBIDDEN_HI =
  /\b(BHGS|FDACS|NCUC|NYSDOT|Class E|TDOR|VA DMV|PA PUC|NJ public-mover|public-mover credentials|UTC household goods permit|require California BHGS|IPUC household)\b/i;

const FORBIDDEN_MT =
  /\b(BHGS|FDACS|NCUC|NYSDOT|Class E|TDOR|VA DMV|PA PUC|NJ public-mover|public-mover credentials|UTC household goods permit|require Idaho IPUC|require IPUC|Nebraska PSC Household Goods Mover License as required)\b/i;

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

  if (stateSlug === 'alaska' && slug === 'anchorage') {
    checks.anchorageDistinct = /Anchorage|Glenn|Seward|Hillside/i.test(
      h1 + blob
    );
  }
  if (stateSlug === 'alaska' && slug === 'juneau') {
    checks.juneauCapital =
      /Juneau|capital|Egan|Glacier|ferry|air/i.test(h1 + blob) &&
      !/I-5 ·|I-90 ·|I-405/i.test(pack.majorCorridors ?? '');
  }
  if (stateSlug === 'hawaii' && slug === 'honolulu') {
    checks.oahu = /Oʻahu|Oahu|Honolulu|H-1/i.test(h1 + blob);
  }
  if (stateSlug === 'hawaii' && slug === 'hawaii') {
    checks.bigIsland =
      /Big Island|Hilo|Kona|Hawaii County/i.test(h1 + blob) &&
      !/^Moving in Hawaii County: Honolulu/i.test(h1);
  }
  if (stateSlug === 'montana' && slug === 'yellowstone') {
    checks.billingsNotPark =
      /Billings/i.test(h1 + blob) &&
      !/^Moving in Yellowstone County: Yellowstone National Park/i.test(h1);
  }
  if (stateSlug === 'montana' && slug === 'gallatin') {
    checks.bozeman = /Bozeman|Gallatin/i.test(h1 + blob);
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
      (checks.anchorageDistinct === undefined || checks.anchorageDistinct) &&
      (checks.juneauCapital === undefined || checks.juneauCapital) &&
      (checks.oahu === undefined || checks.oahu) &&
      (checks.bigIsland === undefined || checks.bigIsland) &&
      (checks.billingsNotPark === undefined || checks.billingsNotPark) &&
      (checks.bozeman === undefined || checks.bozeman)
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

const akReg =
  /business license|written estimates|does not maintain a dedicated|Outside|insurance/i;
const hiReg =
  /PUC|Public Utilities Commission|Certificate of Public Convenience|household goods classification|inter-island/i;
const mtReg =
  /written estimates|insurance|MDT|Motor Carrier Services|does not currently operate|do not invent/i;

const rows: Row[] = [
  ...AK_TIER1_CORE4.map((s) =>
    audit('alaska', 'Alaska', s, akReg, FORBIDDEN_AK)
  ),
  ...HI_TIER1_CORE4.map((s) =>
    audit('hawaii', 'Hawaii', s, hiReg, FORBIDDEN_HI)
  ),
  ...MT_TIER1_CORE5.map((s) =>
    audit('montana', 'Montana', s, mtReg, FORBIDDEN_MT)
  ),
];

const waKing = getCountyIntelligencePack('washington', 'king');
const idAda = getCountyIntelligencePack('idaho', 'ada');
const regression = {
  waKing: Boolean(waKing?.h1 && !/^Movers Serving/i.test(waKing.h1)),
  idAda: Boolean(idAda?.h1 && !/^Movers Serving/i.test(idAda.h1)),
};

const akPassed = rows.filter((r) => r.state === 'alaska' && r.pass).length;
const hiPassed = rows.filter((r) => r.state === 'hawaii' && r.pass).length;
const mtPassed = rows.filter((r) => r.state === 'montana' && r.pass).length;

const report = {
  akCore4: AK_TIER1_CORE4.length,
  akPassed,
  hiCore4: HI_TIER1_CORE4.length,
  hiPassed,
  mtCore5: MT_TIER1_CORE5.length,
  mtPassed,
  regression,
  rows,
};

writeFileSync(
  'scripts/qa-ak-hi-mt-tier1-report.json',
  JSON.stringify(report, null, 2)
);

console.log(JSON.stringify(report, null, 2));
console.log(
  `\nAK ${akPassed}/${AK_TIER1_CORE4.length} · HI ${hiPassed}/${HI_TIER1_CORE4.length} · MT ${mtPassed}/${MT_TIER1_CORE5.length} · reg waKing=${regression.waKing} idAda=${regression.idAda}`
);

if (
  akPassed !== AK_TIER1_CORE4.length ||
  hiPassed !== HI_TIER1_CORE4.length ||
  mtPassed !== MT_TIER1_CORE5.length ||
  !regression.waKing ||
  !regression.idAda
) {
  process.exit(1);
}
