/**
 * Audit state hub directory badges against the STRICT count rule.
 *
 * Rule: moverCount > 30 → Deep guide; ≤30 → Limited
 * No editorial overrides in production (allowNearThresholdEditorial is off).
 *
 * Usage:
 *   npx tsx scripts/audit-state-hub-badges.ts
 *   npx tsx scripts/audit-state-hub-badges.ts florida
 *   npx tsx scripts/audit-state-hub-badges.ts --strict   # exit 1 if any ≤30 is Deep guide
 */
import {
  DEEP_GUIDE_MOVER_THRESHOLD,
  resolveStateHubDirectoryBadge,
} from '../lib/local-movers/county-guide-badge';
import { getCountyMarketMoverCount } from '../lib/local-movers/county-market-mover-counts';
import { getMoversForCounty } from '../lib/local-movers/index';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { localStates } from '../lib/local-movers/states';
import { getCountyGuideTierMeta } from '../lib/local-movers/county-tier';
import { evaluateCountyIndexability } from '../lib/local-movers/county-indexability';
import { hasDeepCountyResearch } from '../data/deep-county-research';

type Row = {
  state: string;
  county: string;
  moverCount: number;
  badge: string;
  oldTierBadge: string;
  hasDeep: boolean;
  violation: boolean;
};

const args = process.argv.slice(2).filter((a) => a !== '--strict');
const strict = process.argv.includes('--strict');
const stateFilter = args.length > 0 ? new Set(args.map((s) => s.toLowerCase())) : null;

function countMovers(stateSlug: string, countySlug: string): number {
  const listed = getMoversForCounty(stateSlug, countySlug);
  if (listed != null) return listed.movers.length;
  const mapped = getCountyMarketMoverCount(stateSlug, countySlug);
  return mapped ?? 0;
}

function expectedBadge(moverCount: number): 'Deep guide' | 'Limited' {
  return moverCount > DEEP_GUIDE_MOVER_THRESHOLD ? 'Deep guide' : 'Limited';
}

const rows: Row[] = [];
const states = localStates.filter((s) =>
  stateFilter ? stateFilter.has(s.slug) : true
);

for (const state of states) {
  for (const county of getCountiesForState(state.slug)) {
    const moverCount = countMovers(state.slug, county.slug);
    const badge = resolveStateHubDirectoryBadge(moverCount);
    const oldTierBadge = getCountyGuideTierMeta(
      evaluateCountyIndexability(state.slug, county.slug),
      state.slug,
      county.slug
    ).badge;
    const expected = expectedBadge(moverCount);
    rows.push({
      state: state.slug,
      county: county.slug,
      moverCount,
      badge,
      oldTierBadge,
      hasDeep: hasDeepCountyResearch(state.slug, county.slug),
      violation: badge !== expected,
    });
  }
}

const violations = rows.filter((r) => r.violation);
const deepLe28to30 = rows.filter(
  (r) =>
    r.badge === 'Deep guide' &&
    r.moverCount <= DEEP_GUIDE_MOVER_THRESHOLD
);
const limitedOver30 = rows.filter(
  (r) =>
    r.badge === 'Limited' && r.moverCount > DEEP_GUIDE_MOVER_THRESHOLD
);
const flLe30Deep = rows.filter(
  (r) =>
    r.state === 'florida' &&
    r.moverCount <= DEEP_GUIDE_MOVER_THRESHOLD &&
    r.badge === 'Deep guide'
);

console.log('=== Strict state hub badge audit ===');
console.log(`Rule: >${DEEP_GUIDE_MOVER_THRESHOLD} Deep guide, ≤${DEEP_GUIDE_MOVER_THRESHOLD} Limited`);
console.log(`States: ${states.length}  Counties: ${rows.length}`);
console.log(`Rule violations: ${violations.length}`);
console.log(`Deep guide with ≤30 movers (must be 0): ${deepLe28to30.length}`);
console.log(`Limited with >30 movers (must be 0): ${limitedOver30.length}`);
console.log(`Florida ≤30 still Deep guide (must be 0): ${flLe30Deep.length}`);

const deep = rows.filter((r) => r.badge === 'Deep guide').length;
const limited = rows.filter((r) => r.badge === 'Limited').length;
console.log(`Totals: Deep guide=${deep} Limited=${limited}`);

console.log('\n--- Florida counties with 25–35 movers (sample) ---');
for (const r of rows
  .filter((x) => x.state === 'florida' && x.moverCount >= 25 && x.moverCount <= 35)
  .sort((a, b) => b.moverCount - a.moverCount)
  .slice(0, 40)) {
  console.log(
    `  ${r.county}: count=${r.moverCount} badge=${r.badge} deepResearch=${r.hasDeep}`
  );
}

console.log('\n--- High-volume spot checks ---');
const samples = [
  ['california', 'los-angeles'],
  ['texas', 'harris'],
  ['illinois', 'cook'],
  ['arizona', 'maricopa'],
  ['florida', 'miami-dade'],
  ['florida', 'broward'],
  ['new-york', 'kings'],
  ['ohio', 'franklin'],
];
for (const [st, co] of samples) {
  const r = rows.find((x) => x.state === st && x.county === co);
  if (!r) {
    console.log(`  MISS ${st}/${co}`);
    continue;
  }
  const ok = r.badge === expectedBadge(r.moverCount);
  console.log(
    `  ${st}/${co}: count=${r.moverCount} badge=${r.badge} ${ok ? 'OK' : 'FAIL'}`
  );
}

if (deepLe28to30.length) {
  console.log('\n--- FAIL: Deep guide with ≤30 movers ---');
  for (const r of deepLe28to30.slice(0, 50)) {
    console.log(`  ${r.state}/${r.county}: count=${r.moverCount}`);
  }
}

// Per-state
console.log('\n--- Per-state Deep / Limited ---');
const byState = new Map<string, { deep: number; limited: number; max: number }>();
for (const r of rows) {
  const s = byState.get(r.state) ?? { deep: 0, limited: 0, max: 0 };
  if (r.badge === 'Deep guide') s.deep += 1;
  else s.limited += 1;
  if (r.moverCount > s.max) s.max = r.moverCount;
  byState.set(r.state, s);
}
for (const [st, s] of [...byState.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  console.log(`  ${st}: Deep=${s.deep} Limited=${s.limited} maxCount=${s.max}`);
}

const fail =
  violations.length > 0 ||
  deepLe28to30.length > 0 ||
  limitedOver30.length > 0 ||
  flLe30Deep.length > 0;

if (fail || (strict && fail)) {
  console.error('\nFAIL: strict badge rule violations');
  process.exit(1);
}

console.log('\nPASS: all badges match strict >30 / ≤30 rule');
process.exit(0);
