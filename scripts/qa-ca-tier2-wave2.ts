/**
 * QA for California Tier 2 Wave 2 content contract.
 * Run: node node_modules/tsx/dist/cli.mjs scripts/qa-ca-tier2-wave2.ts
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import {
  CA_TIER2_WAVE2,
  CA_TIER1_CORE12,
  getCountyIntelligencePack,
} from '../lib/local-movers/county-intelligence/registry';
import { getCountyPopularRoutes } from '../lib/local-movers/county-popular-routes';
import {
  getCountyMajorCorridors,
  isFactualCorridorList,
} from '../lib/local-movers/county-major-corridors';
import { getMoversForCounty } from '../lib/local-movers/index';
import { segmentCountyMovers } from '../lib/local-movers/segment-county-movers';
import { buildCountyFaqItems } from '../lib/local-movers/county-seo';

type Row = {
  county: string;
  pass: boolean;
  localCount: number;
  nationalCount: number;
  h1: string;
  parent: string;
  zones: number;
  specialized: number;
  majorCorridors: string;
  checks: Record<string, boolean | string | number>;
  recommendation: string;
};

const FORBIDDEN =
  /\b(NJ public-mover|public-mover credentials|NYSDOT|PA PUC|UTC household goods permit|TxDMV|FDACS|NCUC)\b/i;

const PARENT_HINTS: Record<string, RegExp> = {
  tulare: /Fresno/i,
  'santa-cruz': /Santa Clara|Monterey|Bay/i,
  marin: /San Francisco|Sonoma|Bay/i,
  yolo: /Sacramento/i,
  'el-dorado': /Sacramento|Placer/i,
  butte: /Sacramento|independent|North Valley|Chico/i,
  napa: /Sonoma|San Francisco|Bay/i,
  merced: /Fresno|Stanislaus/i,
  shasta: /Sacramento|independent|North|Redding|Bay/i,
  imperial: /San Diego/i,
  humboldt: /San Francisco|Bay|independent|North Coast/i,
  madera: /Fresno/i,
};

function audit(slug: string): Row {
  const pack = getCountyIntelligencePack('california', slug);
  const checks: Record<string, boolean | string | number> = {};
  if (!pack) {
    return {
      county: slug,
      pass: false,
      localCount: 0,
      nationalCount: 0,
      h1: '',
      parent: '',
      zones: 0,
      specialized: 0,
      majorCorridors: '',
      checks: { pack: false },
      recommendation: 'Missing pack',
    };
  }

  const result = getMoversForCounty('california', slug);
  const movers = result?.movers ?? [];
  const county = result?.county;
  const segments = county
    ? segmentCountyMovers(movers, county)
    : { localInState: [] as typeof movers, national: movers };
  const routes = getCountyPopularRoutes('california', slug);
  const h1 = pack.h1 ?? '';
  const blob = JSON.stringify(pack);
  const faqText = county
    ? buildCountyFaqItems(county, 'California', movers)
        .map((f) => f.answer)
        .join(' ')
    : '';
  const corridors =
    pack.majorCorridors ?? getCountyMajorCorridors('california', slug) ?? '';

  checks.contentTier2 = pack.contentTier === 'tier2';
  checks.parentCompare = Boolean(pack.parentCompare?.bullets?.length >= 3);
  checks.narrativeH1 =
    Boolean(h1) && !/^Movers Serving/i.test(h1) && h1.length > 20;
  checks.zones2to4 = pack.zones.length >= 2 && pack.zones.length <= 4;
  checks.zoneIdsUnique =
    new Set(pack.zones.map((z) => z.id)).size === pack.zones.length;
  checks.specialized2to3 =
    (pack.specialized?.length ?? 0) >= 2 &&
    (pack.specialized?.length ?? 0) <= 3;
  checks.schools = Boolean(
    pack.relocation?.modules?.some((m) => /school/i.test(m.title))
  );
  checks.hospitals = Boolean(
    pack.relocation?.modules?.some((m) => /hospital|health/i.test(m.title))
  );
  checks.relocCompressed =
    (pack.relocation?.modules?.length ?? 0) >= 2 &&
    (pack.relocation?.modules?.length ?? 0) <= 4;
  checks.majorCorridorsFactual = isFactualCorridorList(corridors);
  checks.routesGte4 = routes.length >= 4;
  checks.bhgs = /BHGS|Bureau of Household Goods/i.test(blob);
  checks.fmcsa = /FMCSA/i.test(blob);
  checks.noForeignBleed = !FORBIDDEN.test(blob) && !FORBIDDEN.test(faqText);
  checks.stateSlugOk = pack.stateSlug === 'california';
  checks.parentHint = PARENT_HINTS[slug]
    ? PARENT_HINTS[slug].test(
        (pack.parentCompare?.title ?? '') +
          (pack.parentCompare?.intro ?? '') +
          JSON.stringify(pack.parentCompare?.bullets ?? [])
      )
    : true;
  checks.notCore12 = !(CA_TIER1_CORE12 as readonly string[]).includes(slug);
  checks.localCount = segments.localInState.length;
  checks.nationalCount = segments.national.length;

  const pass = Boolean(
    checks.contentTier2 &&
      checks.parentCompare &&
      checks.narrativeH1 &&
      checks.zones2to4 &&
      checks.zoneIdsUnique &&
      checks.specialized2to3 &&
      checks.schools &&
      checks.hospitals &&
      checks.relocCompressed &&
      checks.majorCorridorsFactual &&
      checks.routesGte4 &&
      checks.bhgs &&
      checks.fmcsa &&
      checks.noForeignBleed &&
      checks.stateSlugOk &&
      checks.parentHint &&
      checks.notCore12
  );

  return {
    county: slug,
    pass,
    localCount: Number(checks.localCount) || 0,
    nationalCount: Number(checks.nationalCount) || 0,
    h1,
    parent: pack.parentCompare?.parentLabel ?? '',
    zones: pack.zones.length,
    specialized: pack.specialized?.length ?? 0,
    majorCorridors: corridors,
    checks,
    recommendation: pass
      ? 'OK'
      : `FAIL: ${Object.entries(checks)
          .filter(([, v]) => v === false)
          .map(([k]) => k)
          .join(', ')}`,
  };
}

const rows = CA_TIER2_WAVE2.map(audit);
const passed = rows.filter((r) => r.pass).length;
const h1s = rows.map((r) => r.h1);
const h1Distinct = new Set(h1s).size === h1s.length;

const t1ok = (CA_TIER1_CORE12 as readonly string[]).every((slug) => {
  const p = getCountyIntelligencePack('california', slug);
  return Boolean(p && p.contentTier !== 'tier2' && p.h1);
});

const sac = getCountyIntelligencePack('california', 'sacramento');
const fresno = getCountyIntelligencePack('california', 'fresno');
const regression = {
  sacramentoIntact: Boolean(sac && sac.contentTier !== 'tier2' && sac.h1),
  fresnoPresent: Boolean(fresno && fresno.h1),
};

const report = {
  wave2: CA_TIER2_WAVE2.length,
  passed,
  failCount: rows.length - passed,
  h1DistinctAcrossWave2: h1Distinct,
  tier1CoresIntact: t1ok,
  regression,
  skipped: [] as string[],
  summary: rows.map((r) => ({
    county: r.county,
    pass: r.pass,
    h1: r.h1,
    parent: r.parent,
    zones: r.zones,
    specialized: r.specialized,
    local: r.localCount,
    national: r.nationalCount,
    corridors: r.majorCorridors,
  })),
  weakLocal: rows.filter((r) => r.localCount === 0).map((r) => r.county),
  rows,
};

mkdirSync('scripts/output', { recursive: true });
writeFileSync(
  'scripts/output/ca-tier2-wave2-qa.json',
  JSON.stringify(report, null, 2)
);
console.log(JSON.stringify(report, null, 2));
console.log(
  `\nCA Tier2 Wave2 ${passed}/${CA_TIER2_WAVE2.length} · h1Distinct=${h1Distinct} · T1 cores intact=${t1ok}`
);

if (passed !== CA_TIER2_WAVE2.length || !t1ok || !h1Distinct) process.exit(1);
