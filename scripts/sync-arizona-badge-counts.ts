import { readFileSync, writeFileSync } from 'node:fs';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const counties = getCountiesForState('arizona');
const counts: Record<string, number> = {};
for (const c of counties) {
  counts[c.slug] = getMoversForCounty('arizona', c.slug)?.movers.length ?? 0;
}

const countLines = Object.keys(counts)
  .sort()
  .map((slug) => {
    const key = /[^a-z0-9]/.test(slug) ? `'${slug}'` : slug;
    return `  ${key}: ${counts[slug]},`;
  })
  .join('\n');

const azBlock = `/** Arizona — exact listed (active directory only) movers per county page */
export const arizonaMarketMoverCounts: Record<string, number> = {
${countLines}
};
`;

const path = 'lib/local-movers/county-market-mover-counts.ts';
let src = readFileSync(path, 'utf8');

if (/export const arizonaMarketMoverCounts/.test(src)) {
  src = src.replace(
    /\/\*\* Arizona[\s\S]*?export const arizonaMarketMoverCounts: Record<string, number> = \{[\s\S]*?\n\};\n/,
    azBlock + '\n'
  );
} else {
  // Insert after texas block if present, else after california
  if (/export const texasMarketMoverCounts/.test(src)) {
    src = src.replace(
      /(export const texasMarketMoverCounts: Record<string, number> = \{[\s\S]*?\n\};\n)/,
      `$1\n${azBlock}\n`
    );
  } else {
    src = src.replace(
      /(export const californiaMarketMoverCounts: Record<string, number> = \{[\s\S]*?\n\};\n)/,
      `$1\n${azBlock}\n`
    );
  }
}

if (!/arizona: arizonaMarketMoverCounts/.test(src)) {
  src = src.replace(
    /const marketCountsByState[^=]*=\s*\{([^}]*)\}/s,
    (full, body) => {
      if (body.includes('arizona:')) return full;
      return `const marketCountsByState: Record<string, Record<string, number>> = {${body}  arizona: arizonaMarketMoverCounts,\n}`;
    }
  );
  // Simpler fallback
  if (!/arizona: arizonaMarketMoverCounts/.test(src)) {
    src = src.replace(
      /texas: texasMarketMoverCounts,?/,
      `texas: texasMarketMoverCounts,\n  arizona: arizonaMarketMoverCounts,`
    );
  }
  if (!/arizona: arizonaMarketMoverCounts/.test(src)) {
    src = src.replace(
      /california: californiaMarketMoverCounts,?/,
      `california: californiaMarketMoverCounts,\n  arizona: arizonaMarketMoverCounts,`
    );
  }
}

writeFileSync(path, src);
const vals = Object.values(counts);
console.log(
  `Synced AZ badges: ${vals.length} counties, min=${Math.min(...vals)}, max=${Math.max(...vals)}`
);
console.log(
  `Maricopa=${counts.maricopa}, Pima=${counts.pima}, Coconino=${counts.coconino}`
);
