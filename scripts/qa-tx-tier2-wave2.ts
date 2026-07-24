/**
 * QA for Texas Tier 2 Wave 2 content contract.
 * Run: npm run qa:tx-tier2-wave2
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import {
  TX_TIER2_WAVE2,
  TX_TIER1_CORE5,
  TX_TIER2_WAVE1,
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
  /\b(NJ public-mover|public-mover credentials|NYSDOT|PA PUC|BHGS|UTC household goods permit|FDACS|NCUC)\b/i;

const PARENT_HINTS: Record<string, RegExp> = {
  comal: /Bexar|San Antonio|Travis|Austin/i,
  guadalupe: /Bexar|San Antonio/i,
  parker: /Tarrant|Fort Worth|FW/i,
  johnson: /Tarrant|Fort Worth|FW/i,
  ellis: /Dallas/i,
  kaufman: /Dallas/i,
  brazos: /Independent|A&M|Travis|Harris|Bryan|College Station/i,
  lubbock: /Independent|South Plains|Tech|Lubbock/i,
  mclennan: /Independent|Waco|I-35|Baylor|Travis/i,
  jefferson: /Independent|Golden Triangle|Beaumont|Port Arthur|Harris/i,
  smith: /Independent|Tyler|East TX|East Texas/i,
  cameron: /Hidalgo|RGV|Brownsville|McAllen|border/i,
  webb: /Independent|Laredo|border|trade/i,
  midland: /Independent|Permian|Ector|Odessa|energy/i,
  ector: /Independent|Permian|Midland|Odessa|energy/i,
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
      parent: '',
      zones: 0,
      specialized: 0,
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
  const corridors =
    pack.majorCorridors ?? getCountyMajorCorridors('texas', slug) ?? '';

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
  checks.majorCorridorsFactual = isFactualCorridorList(corridors);
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
  checks.notWave1 = !(TX_TIER2_WAVE1 as readonly string[]).includes(slug);
  checks.localCount = segments.localInState.length;
  checks.nationalCount = segments.national.length;

  if (slug === 'midland') {
    checks.midlandDistinct = /Midland|Loop 250|energy HQ|Permian/i.test(h1 + blob);
  }
  if (slug === 'ector') {
    checks.ectorDistinct = /Odessa|Ector|Loop 338|industrial/i.test(h1 + blob);
  }
  if (slug === 'cameron') {
    checks.cameronNotHidalgoClone = /Brownsville|Harlingen|South RGV|south RGV/i.test(
      h1 + blob
    );
  }

  const failKeys = Object.entries(checks)
    .filter(([, v]) => v === false)
    .map(([k]) => k);

  const pass = failKeys.length === 0;

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
    recommendation: pass ? 'OK' : `FAIL: ${failKeys.join(', ')}`,
  };
}

const rows = TX_TIER2_WAVE2.map(audit);
const passed = rows.filter((r) => r.pass).length;
const h1s = rows.map((r) => r.h1);
const h1Distinct = new Set(h1s).size === h1s.length;

const core5ok = (TX_TIER1_CORE5 as readonly string[]).every((slug) => {
  const p = getCountyIntelligencePack('texas', slug);
  return Boolean(p && p.contentTier !== 'tier2' && p.h1);
});

const wave1ok = (TX_TIER2_WAVE1 as readonly string[]).every((slug) => {
  const p = getCountyIntelligencePack('texas', slug);
  return Boolean(p && p.contentTier === 'tier2' && p.h1);
});

const caMarin = getCountyIntelligencePack('california', 'marin');
const caMarinOk = Boolean(
  caMarin?.contentTier === 'tier2' && caMarin.parentCompare?.bullets?.length && caMarin.h1
);

const report = {
  wave2: TX_TIER2_WAVE2.length,
  passed,
  failCount: rows.length - passed,
  h1DistinctAcrossWave2: h1Distinct,
  core5Intact: core5ok,
  wave1Intact: wave1ok,
  caMarinTier2Regression: caMarinOk,
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
  'scripts/output/tx-tier2-wave2-qa.json',
  JSON.stringify(report, null, 2)
);
console.log(JSON.stringify(report, null, 2));
console.log(
  `\nTX Tier2 Wave2 ${passed}/${TX_TIER2_WAVE2.length} · h1Distinct=${h1Distinct} · core5=${core5ok} · wave1=${wave1ok} · marin=${caMarinOk}`
);

if (
  passed !== TX_TIER2_WAVE2.length ||
  !h1Distinct ||
  !core5ok ||
  !wave1ok ||
  !caMarinOk
) {
  process.exit(1);
}
