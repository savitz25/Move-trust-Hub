/**
 * One-shot script: expand WV curated assignments to minimum 5 movers (10 for major metros).
 * Run: npx tsx scripts/apply-west-virginia-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { westVirginiaCountyResearch } from '../data/west-virginia-county-research';
import { applyWestVirginiaCountyOverrides } from '../lib/local-movers/geography/west-virginia-overrides';
import { generatedCounties } from '../data/generated/index';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const wvCounties = generatedCounties
  .filter((c) => c.stateSlug === 'west-virginia')
  .map(applyWestVirginiaCountyOverrides);

const MAJOR = new Set([
  'kanawha',
  'berkeley',
  'monongalia',
  'cabell',
  'wood',
  'raleigh',
  'jefferson',
  'harrison',
  'mercer',
  'putnam',
  'marion',
  'ohio',
  'fayette',
  'wayne',
  'preston',
]);

const FALLBACK_POOLS = [
  'charleston-metro-wv',
  'martinsburg-metro-wv',
  'morgantown-metro-wv',
  'huntington-metro-wv',
  'parkersburg-metro-wv',
  'beckley-metro-wv',
  'wheeling-metro-wv',
  'clarksburg-metro-wv',
  'fairmont-metro-wv',
  'princeton-metro-wv',
];

const curatedSlugs = new Set(Object.keys(westVirginiaCountyResearch));

const assignmentsPath = 'data/west-virginia-county-assignments.ts';
const file = readFileSync(assignmentsPath, 'utf8');
const match = file.match(/const CURATED_WV_COUNTIES[^=]*=\s*(\{[\s\S]*?\n\});/);
if (!match) throw new Error('Could not parse CURATED_WV_COUNTIES');

const current: Record<string, string[]> = eval(`(${match[1]})`);

function expandIds(countySlug: string, existing: string[]): string[] {
  const county = wvCounties.find((c) => c.slug === countySlug);
  const target = MAJOR.has(countySlug) ? 10 : 5;
  const ids = [...existing];
  const seen = new Set(ids);

  const poolOrder = [
    county?.metro,
    ...FALLBACK_POOLS.filter((p) => p !== county?.metro),
  ].filter((p): p is string => Boolean(p));

  for (const poolId of poolOrder) {
    const metroIds = metroMoverPools[poolId]?.moverIds ?? [];
    for (const id of metroIds) {
      if (ids.length >= target) break;
      if (fullMoversCatalog[id] && !seen.has(id)) {
        ids.push(id);
        seen.add(id);
      }
    }
    if (ids.length >= target) break;
  }

  const wvMoverIds = Object.keys(fullMoversCatalog).filter((id) => id.endsWith('-wv'));
  for (const id of wvMoverIds) {
    if (ids.length >= target) break;
    if (!seen.has(id)) {
      ids.push(id);
      seen.add(id);
    }
  }

  return ids.slice(0, target);
}

for (const slug of curatedSlugs) {
  current[slug] = expandIds(slug, current[slug] ?? []);
}

const lines = Object.entries(current)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([slug, ids]) => {
    const idLines = ids.map((id) => `    '${id}',`).join('\n');
    return `  ${slug}: [\n${idLines}\n  ],`;
  });

const block = `const CURATED_WV_COUNTIES: Record<string, string[]> = {\n${lines.join('\n')}\n};`;
const updated = file.replace(/const CURATED_WV_COUNTIES[^=]*=\s*\{[\s\S]*?\n\};/, block);
writeFileSync(assignmentsPath, updated);
console.log('Updated', assignmentsPath);
for (const slug of curatedSlugs) {
  console.log(`  ${slug}: ${current[slug].length} movers`);
}