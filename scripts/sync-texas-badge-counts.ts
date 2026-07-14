/**
 * Sync texasMarketMoverCounts into county-market-mover-counts.ts
 * from exact getMoversForCounty lengths.
 *
 * Run after rebuild-texas-county-movers.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';
import { texasCountyMoverAssignments } from '../data/texas-county-assignments';

const counties = getCountiesForState('texas');
const counts: Record<string, number> = {};
const mismatches: Array<{ slug: string; listed: number; assigned: number }> =
  [];

for (const county of counties) {
  const listed =
    getMoversForCounty('texas', county.slug)?.movers.length ?? 0;
  const assigned =
    texasCountyMoverAssignments.find((a) => a.countySlug === county.slug)
      ?.moverIds.length ?? 0;
  counts[county.slug] = listed;
  if (listed !== assigned) {
    mismatches.push({ slug: county.slug, listed, assigned });
  }
}

if (mismatches.length) {
  console.error('Listed vs assigned mismatches:', mismatches.slice(0, 20));
  process.exitCode = 1;
}

const countLines = Object.keys(counts)
  .sort()
  .map((slug) => {
    const key = /[^a-z0-9]/.test(slug) ? `'${slug}'` : slug;
    return `  ${key}: ${counts[slug]},`;
  })
  .join('\n');

const texasBlock = `/** Texas — exact listed (displayable) movers per county page */
export const texasMarketMoverCounts: Record<string, number> = {
${countLines}
};
`;

// Update county-market-mover-counts.ts: replace or insert texas map + wire into marketCountsByState
const path = 'lib/local-movers/county-market-mover-counts.ts';
let src = readFileSync(path, 'utf8');

if (/export const texasMarketMoverCounts/.test(src)) {
  src = src.replace(
    /\/\*\* Texas[\s\S]*?export const texasMarketMoverCounts: Record<string, number> = \{[\s\S]*?\n\};\n/,
    texasBlock + '\n'
  );
} else {
  // Insert after californiaMarketMoverCounts block
  src = src.replace(
    /(export const californiaMarketMoverCounts: Record<string, number> = \{[\s\S]*?\n\};\n)/,
    `$1\n${texasBlock}\n`
  );
}

if (!/texas: texasMarketMoverCounts/.test(src)) {
  src = src.replace(
    /const marketCountsByState: Record<string, Record<string, number>> = \{[\s\S]*?\};/,
    (block) => {
      if (block.includes('texas:')) return block;
      return block.replace(
        /california: californiaMarketMoverCounts,?/,
        `california: californiaMarketMoverCounts,\n  texas: texasMarketMoverCounts,`
      );
    }
  );
}

// Ensure header comment mentions Texas
if (!src.includes('Texas values')) {
  src = src.replace(
    'EXCEPT California:',
    'EXCEPT California and Texas:'
  );
}

writeFileSync(path, src);

const values = Object.values(counts);
console.log(
  `Synced ${values.length} TX counties. min=${Math.min(...values)} max=${Math.max(...values)} avg=${(values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)}`
);
console.log(
  `Harris=${counts.harris}, Dallas=${counts.dallas}, Travis=${counts.travis}, Bexar=${counts.bexar}, Alpine-equivalent rural sample: Brewster=${counts.brewster}`
);
console.log(`Wrote ${path}`);
if (mismatches.length === 0) console.log('All listed === assigned ✓');
