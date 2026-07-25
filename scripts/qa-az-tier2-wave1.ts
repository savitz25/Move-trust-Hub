/**
 * QA AZ Tier 2 Wave 1 packs against locked contract.
 * Run: npx tsx --tsconfig tsconfig.json scripts/qa-az-tier2-wave1.ts
 */
import {
  getCountyIntelligencePack,
  AZ_TIER1_CORE7,
  AZ_TIER2_WAVE1,
} from '../lib/local-movers/county-intelligence/registry';
import { getCountyPopularRoutes } from '../lib/local-movers/county-popular-routes';

const core = new Set(AZ_TIER1_CORE7 as readonly string[]);
const wave1 = [...AZ_TIER2_WAVE1];

console.log('Wave1 count:', wave1.length);
console.log('Core overlap (must be empty):', wave1.filter((s) => core.has(s)));
console.log('Pima skipped (Tier-1 depth preserved):', !wave1.includes('pima'));

let fail = 0;
for (const slug of wave1) {
  const p = getCountyIntelligencePack('arizona', slug);
  if (!p) {
    console.log(slug, 'MISSING PACK');
    fail++;
    continue;
  }
  const zones = p.zones?.length ?? 0;
  const spec = p.specialized?.length ?? 0;
  const bullets = p.parentCompare?.bullets?.length ?? 0;
  const reloc = (p.relocation?.modules ?? []).map((m) => m.title).join('|');
  const h1ok =
    /^Moving in /i.test(p.h1 || '') && !/Movers Serving/i.test(p.h1 || '');
  const blob = JSON.stringify(p);
  const routes = getCountyPopularRoutes('arizona', slug);
  const issues: string[] = [];
  if (!h1ok) issues.push('H1');
  if (zones < 2 || zones > 4) issues.push(`zones=${zones}`);
  if (spec < 2 || spec > 3) issues.push(`spec=${spec}`);
  if (bullets < 3) issues.push(`parent=${bullets}`);
  if (!/school/i.test(reloc) || !/hospital/i.test(reloc))
    issues.push(`reloc=${reloc}`);
  if (!blob.includes('ACC') && !blob.includes('Corporation Commission'))
    issues.push('no-ACC');
  if (!blob.includes('FMCSA')) issues.push('no-FMCSA');
  if (p.contentTier !== 'tier2') issues.push(`tier=${p.contentTier}`);
  if (!p.parentCompare?.title?.match(/^Compared with/i))
    issues.push('parentTitle');
  if (routes.length < 4 || routes.length > 6)
    issues.push(`routes=${routes.length}`);
  // Allow mentioning out-of-state legs (CA/NV/etc.) as FMCSA triggers; flag true foreign-regulator bleed only.
  if (
    /NJ BPU|NYSDOT|NCUC household|PA PUC|Illinois Commerce Commission|TxDMV|Florida FDACS|California BHGS/i.test(
      blob
    )
  )
    issues.push('REG-BLEED');
  if (!p.lastReviewed || Number.isNaN(Date.parse(p.lastReviewed)))
    issues.push(`lastReviewed=${p.lastReviewed}`);
  if (issues.length) fail++;
  console.log(
    [
      slug,
      issues.length ? issues.join(';') : 'PASS',
      `${zones}z`,
      `${spec}s`,
      `${bullets}b`,
      `${routes.length}r`,
      `rev=${p.lastReviewed}`,
      (p.h1 || '').slice(0, 64),
    ].join(' | ')
  );
}

const pima = getCountyIntelligencePack('arizona', 'pima');
if (!pima) {
  console.log('PIMA MISSING (should remain deep Tier-1-style pack)');
  fail++;
} else if (pima.contentTier === 'tier2') {
  console.log('PIMA became tier2 (should remain deep non-wave pack)');
  fail++;
} else {
  console.log('pima | PRESERVED deep pack | tier=', pima.contentTier ?? 'default');
}

const maricopa = getCountyIntelligencePack('arizona', 'maricopa');
if (!maricopa) {
  console.log('MARICOPA MISSING');
  fail++;
} else if (maricopa.contentTier === 'tier2') {
  console.log('MARICOPA became tier2');
  fail++;
}

console.log(fail === 0 ? '\nALL PASS' : `\nFAILURES: ${fail}`);
process.exit(fail === 0 ? 0 : 1);
