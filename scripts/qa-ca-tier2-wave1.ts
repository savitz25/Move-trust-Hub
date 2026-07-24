/**
 * QA for California Tier 2 Wave 1 content contract.
 * Run: node node_modules/tsx/dist/cli.mjs scripts/qa-ca-tier2-wave1.ts
 */
import { writeFileSync } from 'node:fs';
import {
  CA_TIER2_WAVE1,
  CA_TIER1_CORE12,
  getCountyIntelligencePack,
} from '../lib/local-movers/county-intelligence/registry';
import { getCountyPopularRoutes } from '../lib/local-movers/county-popular-routes';
import { isFactualCorridorList } from '../lib/local-movers/county-major-corridors';
import { getMoversForCounty } from '../lib/local-movers/index';
import { segmentCountyMovers } from '../lib/local-movers/segment-county-movers';
import { buildCountyLabel, buildCountyFaqItems } from '../lib/local-movers/county-seo';

type Row = {
  county: string;
  pass: boolean;
  localCount: number;
  nationalCount: number;
  h1: string;
  majorCorridors: string;
  checks: Record<string, boolean | string | number>;
  recommendation: string;
};

const FORBIDDEN =
  /\b(NJ public-mover|public-mover credentials|NYSDOT|PA PUC|UTC household goods permit|TxDMV|FDACS|NCUC)\b/i;

const PARENT_HINTS: Record<string, RegExp> = {
  fresno: /Los Angeles|Sacramento|LA County|coastal/i,
  kern: /Los Angeles|LA County|405|coastal/i,
  'san-joaquin': /Bay Area|Alameda|Santa Clara|Sacramento|San Francisco/i,
  sonoma: /San Francisco|Bay Area|San Mateo|Peninsula/i,
  placer: /Sacramento/i,
  'santa-barbara': /Los Angeles|Ventura|LA County/i,
  monterey: /Santa Clara|San Francisco|Bay Area|South Bay/i,
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

  checks.contentTier2 = pack.contentTier === 'tier2';
  checks.parentCompare = Boolean(pack.parentCompare?.bullets?.length >= 3);
  checks.parentTitleComparedWith = Boolean(
    pack.parentCompare?.title &&
      /^Compared with/i.test(pack.parentCompare.title)
  );
  checks.relocOnlySchoolsHospitals = Boolean(
    pack.relocation?.modules?.length &&
      pack.relocation.modules.every(
        (m) =>
          /school|education/i.test(m.title) || /hospital|health/i.test(m.title)
      ) &&
      pack.relocation.modules.length <= 2
  );
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
  checks.majorCorridorsFactual = isFactualCorridorList(
    pack.majorCorridors ?? ''
  );
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
      checks.parentTitleComparedWith &&
      checks.relocOnlySchoolsHospitals &&
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
    majorCorridors: pack.majorCorridors ?? '',
    checks,
    recommendation: pass ? 'OK' : 'FAIL',
  };
}

const rows = CA_TIER2_WAVE1.map(audit);
const passed = rows.filter((r) => r.pass).length;

// Regression: Tier 1 cores still present and NOT contentTier tier2
const t1ok = (CA_TIER1_CORE12 as readonly string[]).every((slug) => {
  const p = getCountyIntelligencePack('california', slug);
  return Boolean(p && p.contentTier !== 'tier2' && p.h1);
});

const report = {
  wave1: CA_TIER2_WAVE1.length,
  passed,
  tier1CoresIntact: t1ok,
  rows,
};

writeFileSync(
  'scripts/qa-ca-tier2-wave1-report.json',
  JSON.stringify(report, null, 2)
);
console.log(JSON.stringify(report, null, 2));
console.log(
  `\nCA Tier2 Wave1 ${passed}/${CA_TIER2_WAVE1.length} · T1 cores intact=${t1ok}`
);

if (passed !== CA_TIER2_WAVE1.length || !t1ok) process.exit(1);
