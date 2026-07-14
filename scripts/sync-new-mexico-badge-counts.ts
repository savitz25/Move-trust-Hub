import { readFileSync, writeFileSync } from 'node:fs';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const counties = getCountiesForState('new-mexico');
const counts: Record<string, number> = {};
for (const c of counties) {
  counts[c.slug] =
    getMoversForCounty('new-mexico', c.slug)?.movers.length ?? 0;
}

const countLines = Object.keys(counts)
  .sort()
  .map((slug) => {
    const key = /[^a-z0-9]/.test(slug) ? `'${slug}'` : slug;
    return `  ${key}: ${counts[slug]},`;
  })
  .join('\n');

const nmBlock = `/** New Mexico — exact listed (active directory only) movers per county page */
export const newMexicoMarketMoverCounts: Record<string, number> = {
${countLines}
};
`;

const path = 'lib/local-movers/county-market-mover-counts.ts';
let src = readFileSync(path, 'utf8');

if (/export const newMexicoMarketMoverCounts/.test(src)) {
  src = src.replace(
    /\/\*\* New Mexico[\s\S]*?export const newMexicoMarketMoverCounts: Record<string, number> = \{[\s\S]*?\n\};\n/,
    nmBlock + '\n'
  );
} else if (/export const arizonaMarketMoverCounts/.test(src)) {
  src = src.replace(
    /(export const arizonaMarketMoverCounts: Record<string, number> = \{[\s\S]*?\n\};\n)/,
    `$1\n${nmBlock}\n`
  );
} else if (/export const texasMarketMoverCounts/.test(src)) {
  src = src.replace(
    /(export const texasMarketMoverCounts: Record<string, number> = \{[\s\S]*?\n\};\n)/,
    `$1\n${nmBlock}\n`
  );
} else {
  src = src.replace(
    /(export const californiaMarketMoverCounts: Record<string, number> = \{[\s\S]*?\n\};\n)/,
    `$1\n${nmBlock}\n`
  );
}

if (!/newMexico: newMexicoMarketMoverCounts|'new-mexico': newMexicoMarketMoverCounts/.test(src)) {
  // marketCountsByState uses state slug keys
  if (!/['"]new-mexico['"]:\s*newMexicoMarketMoverCounts/.test(src)) {
    src = src.replace(
      /arizona: arizonaMarketMoverCounts,?/,
      `arizona: arizonaMarketMoverCounts,\n  'new-mexico': newMexicoMarketMoverCounts,`
    );
  }
  if (!/['"]new-mexico['"]:\s*newMexicoMarketMoverCounts/.test(src)) {
    src = src.replace(
      /texas: texasMarketMoverCounts,?/,
      `texas: texasMarketMoverCounts,\n  'new-mexico': newMexicoMarketMoverCounts,`
    );
  }
  if (!/['"]new-mexico['"]:\s*newMexicoMarketMoverCounts/.test(src)) {
    src = src.replace(
      /california: californiaMarketMoverCounts,?/,
      `california: californiaMarketMoverCounts,\n  'new-mexico': newMexicoMarketMoverCounts,`
    );
  }
}

writeFileSync(path, src);
const vals = Object.values(counts);
console.log(
  `Synced NM badges: ${vals.length} counties, min=${Math.min(...vals)}, max=${Math.max(...vals)}`
);
console.log(
  `Bernalillo=${counts.bernalillo}, SantaFe=${counts['santa-fe']}, DonaAna=${counts['dona-ana']}`
);
