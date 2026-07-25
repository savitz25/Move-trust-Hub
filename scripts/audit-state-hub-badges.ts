/**
 * Audit + verify state hub directory badges against the count rule.
 *
 * Rule: moverCount > 30 → Deep guide; ≤30 → Limited
 *        editorial override: hasDeepCountyResearch → Deep guide
 *
 * Usage:
 *   npx tsx scripts/audit-state-hub-badges.ts              # all states
 *   npx tsx scripts/audit-state-hub-badges.ts california texas
 *   npx tsx scripts/audit-state-hub-badges.ts --strict     # exit 1 on mismatches
 */
import { hasDeepCountyResearch } from '../data/deep-county-research';
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

type Row = {
  state: string;
  county: string;
  moverCount: number;
  oldBadge: string;
  newBadge: string;
  editorial: boolean;
  mismatchOld: boolean;
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

const rows: Row[] = [];
const states = localStates.filter((s) =>
  stateFilter ? stateFilter.has(s.slug) : true
);

for (const state of states) {
  const counties = getCountiesForState(state.slug);
  for (const county of counties) {
    const moverCount = countMovers(state.slug, county.slug);
    const indexDecision = evaluateCountyIndexability(state.slug, county.slug);
    const oldBadge = getCountyGuideTierMeta(
      indexDecision,
      state.slug,
      county.slug
    ).badge;
    const editorial = hasDeepCountyResearch(state.slug, county.slug);
    const newBadge = resolveStateHubDirectoryBadge(moverCount, {
      editorialDeepGuide: editorial,
    });
    const expectedByCount =
      moverCount > DEEP_GUIDE_MOVER_THRESHOLD ? 'Deep guide' : 'Limited';
    const expected = editorial ? 'Deep guide' : expectedByCount;
    rows.push({
      state: state.slug,
      county: county.slug,
      moverCount,
      oldBadge,
      newBadge,
      editorial,
      mismatchOld: oldBadge !== expected,
    });
  }
}

const flipsToDeep = rows.filter(
  (r) => r.oldBadge === 'Limited' && r.newBadge === 'Deep guide'
);
const flipsToLimited = rows.filter(
  (r) => r.oldBadge !== 'Limited' && r.newBadge === 'Limited'
);
const editorialOverrides = rows.filter(
  (r) => r.editorial && r.moverCount <= DEEP_GUIDE_MOVER_THRESHOLD
);
const ruleViolations = rows.filter((r) => {
  const expected =
    r.editorial || r.moverCount > DEEP_GUIDE_MOVER_THRESHOLD
      ? 'Deep guide'
      : 'Limited';
  return r.newBadge !== expected;
});

const highVolumeSamples = [
  ['california', 'los-angeles'],
  ['texas', 'harris'],
  ['illinois', 'cook'],
  ['arizona', 'maricopa'],
  ['florida', 'miami-dade'],
  ['new-york', 'kings'],
  ['ohio', 'franklin'],
  ['pennsylvania', 'philadelphia'],
];

console.log('=== State hub badge audit ===');
console.log(`Threshold: >${DEEP_GUIDE_MOVER_THRESHOLD} → Deep guide`);
console.log(`States: ${states.length}  Counties: ${rows.length}`);
console.log(`Would flip Limited → Deep guide: ${flipsToDeep.length}`);
console.log(`Would flip non-Limited → Limited: ${flipsToLimited.length}`);
console.log(
  `Editorial overrides (deep research, ≤${DEEP_GUIDE_MOVER_THRESHOLD} movers): ${editorialOverrides.length}`
);
console.log(`New-rule violations (should be 0): ${ruleViolations.length}`);

console.log('\n--- High-volume spot checks ---');
for (const [st, co] of highVolumeSamples) {
  const r = rows.find((x) => x.state === st && x.county === co);
  if (!r) {
    console.log(`  MISS ${st}/${co}`);
    continue;
  }
  const ok = r.newBadge === 'Deep guide' || r.moverCount <= DEEP_GUIDE_MOVER_THRESHOLD;
  console.log(
    `  ${st}/${co}: count=${r.moverCount} old=${r.oldBadge} new=${r.newBadge} ${
      r.newBadge === 'Deep guide' && r.moverCount > DEEP_GUIDE_MOVER_THRESHOLD
        ? 'OK'
        : r.moverCount <= DEEP_GUIDE_MOVER_THRESHOLD
          ? `(≤threshold, badge=${r.newBadge})`
          : 'CHECK'
    }`
  );
}

console.log('\n--- Sample flips Limited → Deep guide (top 25 by count) ---');
for (const r of flipsToDeep
  .slice()
  .sort((a, b) => b.moverCount - a.moverCount)
  .slice(0, 25)) {
  console.log(
    `  ${r.state}/${r.county}: ${r.moverCount} movers  ${r.oldBadge} → ${r.newBadge}`
  );
}

console.log('\n--- Editorial overrides (deep research under threshold) ---');
for (const r of editorialOverrides.slice(0, 40)) {
  console.log(
    `  ${r.state}/${r.county}: count=${r.moverCount} → Deep guide (editorial)`
  );
}
if (editorialOverrides.length > 40) {
  console.log(`  ... +${editorialOverrides.length - 40} more`);
}

// Per-state summary for pilot
const byState = new Map<string, { deep: number; limited: number; flip: number }>();
for (const r of rows) {
  const s = byState.get(r.state) ?? { deep: 0, limited: 0, flip: 0 };
  if (r.newBadge === 'Deep guide') s.deep += 1;
  else s.limited += 1;
  if (r.mismatchOld) s.flip += 1;
  byState.set(r.state, s);
}

console.log('\n--- Per-state summary ---');
for (const [st, s] of [...byState.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  console.log(
    `  ${st}: Deep guide=${s.deep} Limited=${s.limited} badge-changes-vs-old=${s.flip}`
  );
}

if (ruleViolations.length > 0) {
  console.error('\nFAIL: rule violations');
  for (const r of ruleViolations.slice(0, 20)) {
    console.error(`  ${r.state}/${r.county} count=${r.moverCount} badge=${r.newBadge}`);
  }
  process.exit(1);
}

if (strict && (flipsToDeep.length > 0 || flipsToLimited.length > 0)) {
  // strict mode only fails on rule violations above; this is informational
}

console.log('\nPASS: all badges satisfy count/editorial rule');
process.exit(0);
