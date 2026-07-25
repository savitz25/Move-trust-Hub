/**
 * QA PA Tier 2 Wave 1 packs against locked contract.
 * Run: npx tsx --tsconfig tsconfig.json scripts/qa-pa-tier2-wave1.ts
 */
import {
  getCountyIntelligencePack,
  PA_TIER1_CORE12,
  PA_TIER2_WAVE1,
} from '../lib/local-movers/county-intelligence/registry';
import { getCountyPopularRoutes } from '../lib/local-movers/county-popular-routes';

const core = new Set(PA_TIER1_CORE12 as readonly string[]);
const wave1 = [...PA_TIER2_WAVE1];

console.log('Wave1 count:', wave1.length);
console.log('Core overlap (must be empty):', wave1.filter((s) => core.has(s)));

let fail = 0;
for (const slug of wave1) {
  const p = getCountyIntelligencePack('pennsylvania', slug);
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
  const routes = getCountyPopularRoutes('pennsylvania', slug);
  const issues: string[] = [];
  if (!h1ok) issues.push('H1');
  if (zones < 2 || zones > 4) issues.push(`zones=${zones}`);
  if (spec < 2 || spec > 3) issues.push(`spec=${spec}`);
  if (bullets < 3) issues.push(`parent=${bullets}`);
  if (!/school/i.test(reloc) || !/hospital/i.test(reloc))
    issues.push(`reloc=${reloc}`);
  if (!blob.includes('PUC') && !blob.includes('Public Utility'))
    issues.push('no-PUC');
  if (!blob.includes('FMCSA')) issues.push('no-FMCSA');
  if (p.contentTier !== 'tier2') issues.push(`tier=${p.contentTier}`);
  if (!p.parentCompare?.title?.match(/^Compared with/i))
    issues.push('parentTitle');
  if (routes.length < 4 || routes.length > 6)
    issues.push(`routes=${routes.length}`);
  if (/NJ BPU|NYSDOT|FDACS|TxDMV|BHGS/i.test(blob)) issues.push('REG-BLEED');
  // Relocation must not include lifestyle modules
  const relocIds = (p.relocation?.modules ?? []).map((m) => m.id).join(',');
  if (/housing|jobs|lifestyle|town/i.test(relocIds))
    issues.push(`relocIds=${relocIds}`);
  if (issues.length) fail++;
  console.log(
    [
      slug,
      issues.length ? issues.join(';') : 'PASS',
      `${zones}z`,
      `${spec}s`,
      `${bullets}b`,
      `${routes.length}r`,
      (p.h1 || '').slice(0, 64),
    ].join(' | ')
  );
}

// Tier 1 cores that have packs must not be tier2
for (const slug of ['philadelphia', 'allegheny', 'montgomery', 'lehigh', 'northampton']) {
  const p = getCountyIntelligencePack('pennsylvania', slug);
  if (!p) {
    console.log('T1 MISSING pack (ok if not built):', slug);
  } else if (p.contentTier === 'tier2') {
    console.log('T1 became tier2', slug);
    fail++;
  }
}

console.log(fail === 0 ? '\nALL PASS' : `\nFAILURES: ${fail}`);
process.exit(fail === 0 ? 0 : 1);
