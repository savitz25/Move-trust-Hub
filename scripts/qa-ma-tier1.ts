/**
 * QA for Massachusetts Tier-1 Core 10.
 * Run: npx tsx scripts/qa-ma-tier1.ts
 */
import { writeFileSync } from 'node:fs';
import {
  MA_TIER1_CORE10,
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
  county: string;
  pass: boolean;
  localCount: number;
  nationalCount: number;
  specialized: string[];
  majorCorridors: string;
  h1: string;
  checks: Record<string, boolean | string | number>;
  recommendation: string;
};

const FORBIDDEN_REG =
  /\b(BHGS|FDACS|NCUC|NYSDOT|Class E|TDOR|VA DMV|PA PUC|NJ public-mover|public-mover credentials|Georgia DPS|MCCD|TxDMV|IL ICC|PUCO|Colorado PUC HHG|Title 40, Article 10\.1|Utilities and Transportation Commission|\bUTC household|MSP CVED)\b/i;

function auditCounty(slug: string): Row {
  const stateSlug = 'massachusetts';
  const result = getMoversForCounty(stateSlug, slug);
  const pack = getCountyIntelligencePack(stateSlug, slug);
  const checks: Record<string, boolean | string | number> = {};

  if (!pack) {
    return {
      county: slug,
      pass: false,
      localCount: 0,
      nationalCount: 0,
      specialized: [],
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
    ? buildCountyFaqItems(county, 'Massachusetts', movers)
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
  checks.specializedPresent = Boolean(pack.specialized?.length);
  checks.majorCorridorsFactual = isFactualCorridorList(
    pack.majorCorridors ?? snapshot.majorCorridors ?? ''
  );
  checks.noOperationalCorridors =
    !/tourism calendars|operational inputs|federal contractors drive/i.test(
      pack.majorCorridors ?? ''
    );
  checks.routesGte4 = routes.length >= 4;
  checks.maDpuPresent =
    /Department of Public Utilities|\bDPU\b|operating certificate/i.test(blob);
  checks.fmcsaPresent = /FMCSA/i.test(blob);
  checks.noForeignRegulator =
    !FORBIDDEN_REG.test(blob) && !FORBIDDEN_REG.test(faqText);
  checks.maStateSlug = pack.stateSlug === 'massachusetts';
  checks.notBatchTips = !isBatchTemplateCountyResearch(stateSlug, slug);
  checks.localCount = segments.localInState.length;
  checks.nationalCount = segments.national.length;
  checks.progressiveListReady = movers.length > 0;
  const indexDecision = evaluateCountyIndexability(stateSlug, slug);
  checks.indexReason = indexDecision.reason;
  checks.indexable = indexDecision.tier === 'index';

  const pass = Boolean(
    checks.narrativeH1 &&
      checks.zonesGte4 &&
      checks.zoneIdsUnique &&
      checks.relocationPresent &&
      checks.schoolsModule &&
      checks.hospitalsModule &&
      checks.majorCorridorsFactual &&
      checks.routesGte4 &&
      checks.maDpuPresent &&
      checks.fmcsaPresent &&
      checks.noForeignRegulator &&
      checks.maStateSlug &&
      checks.notBatchTips
  );

  return {
    county: slug,
    pass,
    localCount: segments.localInState.length,
    nationalCount: segments.national.length,
    specialized: (pack.specialized ?? []).map((s) => s.id),
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

const rows = MA_TIER1_CORE10.map((slug) => auditCounty(slug));
const passed = rows.filter((r) => r.pass).length;

const king = getCountyIntelligencePack('washington', 'king');
const denver = getCountyIntelligencePack('colorado', 'denver');
const regression = {
  king: Boolean(king?.h1 && king.zones.length >= 4),
  denver: Boolean(denver?.h1 && denver.zones.length >= 4),
};

const report = {
  maCore10: MA_TIER1_CORE10.length,
  passed,
  failed: MA_TIER1_CORE10.length - passed,
  regression,
  rows,
};

writeFileSync('scripts/qa-ma-tier1-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
console.log(
  `\nMA Core 10: ${passed}/${MA_TIER1_CORE10.length} pass | regression king=${regression.king} denver=${regression.denver}`
);
process.exit(passed === MA_TIER1_CORE10.length && regression.king && regression.denver ? 0 : 1);
