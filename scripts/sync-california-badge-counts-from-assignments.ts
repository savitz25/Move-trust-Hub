import { readFileSync, writeFileSync } from 'node:fs';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const counties = getCountiesForState('california');
const counts: Record<string, number> = {};
for (const c of counties) {
  counts[c.slug] =
    getMoversForCounty('california', c.slug)?.movers.length ?? 0;
}

const countLines = Object.keys(counts)
  .sort()
  .map((slug) => {
    const key = /[^a-z0-9]/.test(slug) ? `'${slug}'` : slug;
    return `  ${key}: ${counts[slug]},`;
  })
  .join('\n');

const caBlock = `/** California — exact listed (active directory only) movers per county page */
export const californiaMarketMoverCounts: Record<string, number> = {
${countLines}
};
`;

const path = 'lib/local-movers/county-market-mover-counts.ts';
let src = readFileSync(path, 'utf8');

if (/export const californiaMarketMoverCounts/.test(src)) {
  src = src.replace(
    /\/\*\* California[\s\S]*?export const californiaMarketMoverCounts: Record<string, number> = \{[\s\S]*?\n\};\n/,
    caBlock + '\n'
  );
} else {
  throw new Error('californiaMarketMoverCounts block not found');
}

writeFileSync(path, src);
const vals = Object.values(counts);
console.log(
  `Synced CA badges: ${vals.length} counties, min=${Math.min(...vals)}, max=${Math.max(...vals)}`
);
console.log(
  `LA=${counts['los-angeles']}, Orange=${counts.orange}, Alameda=${counts.alameda}, SF=${counts['san-francisco']}`
);
