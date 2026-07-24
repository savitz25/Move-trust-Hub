/**
 * QA for Florida Tier 2 Wave 2 content contract.
 */
import { writeFileSync } from 'node:fs';
import {
  FL_TIER2_WAVE2,
  FL_TIER2_WAVE1,
  FL_TIER1_CORE9,
  getCountyIntelligencePack,
} from '../lib/local-movers/county-intelligence/registry';
import { getCountyPopularRoutes } from '../lib/local-movers/county-popular-routes';
import { isFactualCorridorList } from '../lib/local-movers/county-major-corridors';
import { getMoversForCounty } from '../lib/local-movers/index';
import { segmentCountyMovers } from '../lib/local-movers/segment-county-movers';
import { buildCountyFaqItems } from '../lib/local-movers/county-seo';

const FORBIDDEN =
  /\b(NJ public-mover|public-mover credentials|NYSDOT|PA PUC|TxDMV|BHGS|UTC household goods permit|NCUC)\b/i;

const WAVE1_SET = new Set(FL_TIER2_WAVE1 as readonly string[]);
const CORE9_SET = new Set(FL_TIER1_CORE9 as readonly string[]);

function audit(slug: string) {
  const pack = getCountyIntelligencePack('florida', slug);
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

  const result = getMoversForCounty('florida', slug);
  const movers = result?.movers ?? [];
  const county = result?.county;
  const segments = county
    ? segmentCountyMovers(movers, county)
    : { localInState: [] as typeof movers, national: movers };
  const routes = getCountyPopularRoutes('florida', slug);
  const h1 = pack.h1 ?? '';
  const blob = JSON.stringify(pack);
  const faqText = county
    ? buildCountyFaqItems(county, 'Florida', movers)
        .map((f) => f.answer)
        .join(' ')
    : '';

  checks.contentTier2 = pack.contentTier === 'tier2';
  checks.parentCompare = Boolean(pack.parentCompare?.bullets?.length >= 3);
  checks.parentTitleComparedWith = Boolean(
    pack.parentCompare?.title && /^Compared with/i.test(pack.parentCompare.title)
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
    pack.relocation?.modules?.some((m) => /school|education/i.test(m.title))
  );
  checks.hospitals = Boolean(
    pack.relocation?.modules?.some((m) => /hospital|health/i.test(m.title))
  );
  checks.relocOnlySchoolsHospitals = Boolean(
    pack.relocation?.modules?.length &&
      pack.relocation.modules.every(
        (m) =>
          /school|education/i.test(m.title) || /hospital|health/i.test(m.title)
      ) &&
      pack.relocation.modules.length <= 2
  );
  checks.majorCorridorsFactual = isFactualCorridorList(pack.majorCorridors ?? '');
  checks.routesGte4 = routes.length >= 4;
  checks.fdacs = /FDACS|Chapter 507|Agriculture and Consumer Services/i.test(blob);
  checks.fmcsa = /FMCSA/i.test(blob);
  checks.noForeignBleed = !FORBIDDEN.test(blob) && !FORBIDDEN.test(faqText);
  checks.stateSlugOk = pack.stateSlug === 'florida';
  checks.notWave1 = !WAVE1_SET.has(slug);
  checks.notCore9 = !CORE9_SET.has(slug);
  checks.localCount = segments.localInState.length;
  checks.nationalCount = segments.national.length;

  const pass = Boolean(
    checks.contentTier2 &&
      checks.parentCompare &&
      checks.parentTitleComparedWith &&
      checks.narrativeH1 &&
      checks.zones2to4 &&
      checks.zoneIdsUnique &&
      checks.specialized2to3 &&
      checks.schools &&
      checks.hospitals &&
      checks.relocOnlySchoolsHospitals &&
      checks.majorCorridorsFactual &&
      checks.routesGte4 &&
      checks.fdacs &&
      checks.fmcsa &&
      checks.noForeignBleed &&
      checks.stateSlugOk &&
      checks.notWave1 &&
      checks.notCore9
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

const rows = FL_TIER2_WAVE2.map(audit);
const passed = rows.filter((r) => r.pass).length;

const wave1ok = (FL_TIER2_WAVE1 as readonly string[]).every((slug) => {
  const p = getCountyIntelligencePack('florida', slug);
  return Boolean(p?.contentTier === 'tier2' && p.h1);
});

const core9ok = (FL_TIER1_CORE9 as readonly string[]).every((slug) => {
  if (slug === 'sarasota') {
    const p = getCountyIntelligencePack('florida', slug);
    return !p || p.contentTier !== 'tier2';
  }
  const p = getCountyIntelligencePack('florida', slug);
  return Boolean(p && p.contentTier !== 'tier2' && p.h1);
});

const report = {
  wave2: FL_TIER2_WAVE2.length,
  passed,
  wave1Intact: wave1ok,
  core9Intact: core9ok,
  rows,
};

writeFileSync(
  'scripts/qa-fl-tier2-wave2-report.json',
  JSON.stringify(report, null, 2)
);
console.log(JSON.stringify(report, null, 2));
console.log(
  `\nFL Tier2 Wave2 ${passed}/${FL_TIER2_WAVE2.length} · wave1=${wave1ok} · core9=${core9ok}`
);

if (passed !== FL_TIER2_WAVE2.length || !wave1ok || !core9ok) process.exit(1);
