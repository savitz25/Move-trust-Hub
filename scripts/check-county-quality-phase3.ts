/**
 * Phase 3 county quality score + tier regression.
 * Run: npx tsx scripts/check-county-quality-phase3.ts
 */
import { evaluateCountyIndexability } from '../lib/local-movers/county-indexability';
import {
  scoreCountyQuality,
  COUNTY_QUALITY_THRESHOLDS,
} from '../lib/local-movers/county-quality-score';
import { getMoversForCounty } from '../lib/local-movers/index';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { localStates } from '../lib/local-movers/states';

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error('FAIL:', msg);
    process.exitCode = 1;
  } else {
    console.log('ok:', msg);
  }
}

// Known strong markets should score and index when catalog allows
const miami = getMoversForCounty('florida', 'miami-dade');
const miamiQ = scoreCountyQuality({
  stateSlug: 'florida',
  countySlug: 'miami-dade',
  county: miami?.county ?? null,
  movers: miami?.movers ?? [],
  isRegionalFallback: miami?.isRegionalFallback ?? false,
});
console.log('miami-dade', miamiQ.tier, miamiQ.score, miamiQ.reason, miamiQ.indexable);

const la = getMoversForCounty('california', 'los-angeles');
const laQ = scoreCountyQuality({
  stateSlug: 'california',
  countySlug: 'los-angeles',
  county: la?.county ?? null,
  movers: la?.movers ?? [],
  isRegionalFallback: la?.isRegionalFallback ?? false,
});
console.log('los-angeles', laQ.tier, laQ.score, laQ.reason, laQ.indexable);

// Empty / missing should be development noindex
const missing = scoreCountyQuality({
  stateSlug: 'nebraska',
  countySlug: 'not-a-real-county-xyz',
  county: null,
  movers: [],
  isRegionalFallback: false,
});
assert(missing.tier === 3 && !missing.indexable, 'missing county → tier 3 noindex');

// Index decision wires to quality
const idxMiami = evaluateCountyIndexability('florida', 'miami-dade');
assert(
  (idxMiami.seoTier === 1 || idxMiami.seoTier === 2 || idxMiami.seoTier === 3) &&
    typeof idxMiami.qualityScore === 'number',
  'index decision carries seoTier + qualityScore'
);

// Sample distribution across a few states (catalog-only)
const dist = { 1: 0, 2: 0, 3: 0 };
const sampleStates = ['florida', 'california', 'texas', 'nebraska', 'wyoming'];
for (const st of sampleStates) {
  if (!localStates.some((s) => s.slug === st)) continue;
  for (const c of getCountiesForState(st).slice(0, 40)) {
    const r = getMoversForCounty(st, c.slug);
    const q = scoreCountyQuality({
      stateSlug: st,
      countySlug: c.slug,
      county: r?.county ?? c,
      movers: r?.movers ?? [],
      isRegionalFallback: r?.isRegionalFallback ?? false,
    });
    dist[q.tier]++;
  }
}
console.log('sample tier distribution (first 40 counties × sample states):', dist);
assert(dist[1] + dist[2] + dist[3] > 0, 'scored sample counties');
// Premium should not be the only tier when rural states are included
assert(
  dist[2] + dist[3] > 0,
  'standard/development tiers exist alongside premium (not all equal assets)'
);

assert(COUNTY_QUALITY_THRESHOLDS.tier1MinScore === 70, 'tier1 floor 70');
assert(COUNTY_QUALITY_THRESHOLDS.tier2MinScore === 48, 'tier2 floor 48');

// Tier 1 must be indexable; tier 3 not
assert(!(miamiQ.tier === 1 && !miamiQ.indexable), 'premium cannot be non-indexable');
assert(!(missing.tier === 3 && missing.indexable), 'development cannot be indexable');

if (process.exitCode) {
  console.error('\nPhase 3 quality checks failed.');
  process.exit(1);
}
console.log('\nAll Phase 3 county quality checks passed.');
