/**
 * Sync texasMarketMoverCounts in county-market-mover-counts.ts
 * from texasCountyMoverAssignments / getMoversForCounty.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const counties = getCountiesForState('texas');
const counts: Record<string, number> = {};
for (const c of counties) {
  counts[c.slug] =
    getMoversForCounty('texas', c.slug)?.movers.length ?? 0;
}

const countLines = Object.keys(counts)
  .sort()
  .map((slug) => {
    const key = /[^a-z0-9]/.test(slug) ? `'${slug}'` : slug;
    return `  ${key}: ${counts[slug]},`;
  })
  .join('\n');

const texasBlock = `/** Texas — exact listed (active directory only) movers per county page */
export const texasMarketMoverCounts: Record<string, number> = {
${countLines}
};
`;

const path = 'lib/local-movers/county-market-mover-counts.ts';
let src = readFileSync(path, 'utf8');

if (/export const texasMarketMoverCounts/.test(src)) {
  src = src.replace(
    /\/\*\* Texas[\s\S]*?export const texasMarketMoverCounts: Record<string, number> = \{[\s\S]*?\n\};\n/,
    texasBlock + '\n'
  );
} else {
  src = src.replace(
    /(export const californiaMarketMoverCounts: Record<string, number> = \{[\s\S]*?\n\};\n)/,
    `$1\n${texasBlock}\n`
  );
}

if (!/texas: texasMarketMoverCounts/.test(src)) {
  src = src.replace(
    /const marketCountsByState[^=]*=\s*\{/,
    (m) => `${m}\n  texas: texasMarketMoverCounts,`
  );
  // If california line exists without texas
  if (!/texas: texasMarketMoverCounts/.test(src)) {
    src = src.replace(
      /california: californiaMarketMoverCounts,?/,
      `california: californiaMarketMoverCounts,\n  texas: texasMarketMoverCounts,`
    );
  }
}

writeFileSync(path, src);
const vals = Object.values(counts);
console.log(
  `Synced TX badges: ${vals.length} counties, min=${Math.min(...vals)}, max=${Math.max(...vals)}`
);
console.log(
  `Harris=${counts.harris}, Dallas=${counts.dallas}, Travis=${counts.travis}`
);
