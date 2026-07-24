/**
 * QA for Texas Tier 2 Wave 1 content contract.
 */
import { writeFileSync } from 'node:fs';
import {
  TX_TIER2_WAVE1,
  TX_TIER1_CORE5,
  getCountyIntelligencePack,
} from '../lib/local-movers/county-intelligence/registry';
import { getCountyPopularRoutes } from '../lib/local-movers/county-popular-routes';
import { isFactualCorridorList } from '../lib/local-movers/county-major-corridors';
import { getMoversForCounty } from '../lib/local-movers/index';
import { segmentCountyMovers } from '../lib/local-movers/segment-county-movers';
import { buildCountyFaqItems } from '../lib/local-movers/county-seo';

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
  /\b(NJ public-mover|public-mover credentials|NYSDOT|PA PUC|BHGS|UTC household goods permit|FDACS|NCUC)\b/i;

const PARENT_HINTS: Record<string, RegExp> = {
  'fort-bend': /Harris|Houston/i,
  montgomery: /Harris|Houston/i,
  galveston: /Harris|Houston/i,
  brazoria: /Harris|Houston/i,
  collin: /Dallas|DFW/i,
  denton: /Dallas|DFW|Tarrant/i,
  williamson: /Travis|Austin/i,
  hays: /Travis|Austin/i,
  'el-paso': /Houston|DFW|Triangle|Independent|border/i,
  hidalgo: /Houston|DFW|Triangle|RGV|Independent/i,
  nueces: /Houston|Triangle|Corpus|Independent|coastal/i,
  bell: /Travis|Austin|military|Cavazos|Independent/i,
};

function audit(slug: string): Row {
  const pack = getCountyIntelligencePack('texas', slug);
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

  const result = getMoversForCounty('texas', slug);
  const movers = result?.movers ?? [];
  const county = result?.county;
  const segments = county
    ? segmentCountyMovers(movers, county)
    : { localInState: [] as typeof movers, national: movers };
  const routes = getCountyPopularRoutes('texas', slug);
  const h1 = pack.h1 ?? '';
  const blob = JSON.stringify(pack);
  const faqText = county
    ? buildCountyFaqItems(county, 'Texas', movers)
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
  checks.txdmv = /TxDMV|Texas Department of Motor Vehicles/i.test(blob);
  checks.fmcsa = /FMCSA/i.test(blob);
  checks.noForeignBleed = !FORBIDDEN.test(blob) && !FORBIDDEN.test(faqText);
  checks.stateSlugOk = pack.stateSlug === 'texas';
  checks.parentHint = PARENT_HINTS[slug]
    ? PARENT_HINTS[slug].test(
        (pack.parentCompare?.title ?? '') +
          (pack.parentCompare?.intro ?? '') +
          JSON.stringify(pack.parentCompare?.bullets ?? [])
      )
    : true;
  checks.notCore5 = !(TX_TIER1_CORE5 as readonly string[]).includes(slug);
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
      checks.txdmv &&
      checks.fmcsa &&
      checks.noForeignBleed &&
      checks.stateSlugOk &&
      checks.parentHint &&
      checks.notCore5
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

const rows = TX_TIER2_WAVE1.map(audit);
const passed = rows.filter((r) => r.pass).length;

const core5ok = (TX_TIER1_CORE5 as readonly string[]).every((slug) => {
  const p = getCountyIntelligencePack('texas', slug);
  return Boolean(p && p.contentTier !== 'tier2' && p.h1);
});

const caFresno = getCountyIntelligencePack('california', 'fresno');
const caFresnoOk = Boolean(
  caFresno?.contentTier === 'tier2' &&
    caFresno.parentCompare?.bullets?.length &&
    caFresno.h1
);

const report = {
  wave1: TX_TIER2_WAVE1.length,
  passed,
  core5Intact: core5ok,
  caFresnoTier2Regression: caFresnoOk,
  rows,
};

writeFileSync(
  'scripts/qa-tx-tier2-wave1-report.json',
  JSON.stringify(report, null, 2)
);
console.log(JSON.stringify(report, null, 2));
console.log(
  `\nTX Tier2 Wave1 ${passed}/${TX_TIER2_WAVE1.length} · core5=${core5ok} · caFresno=${caFresnoOk}`
);

if (passed !== TX_TIER2_WAVE1.length || !core5ok || !caFresnoOk) process.exit(1);
