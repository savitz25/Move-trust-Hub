/**
 * One-shot script: ensure PA curated assignments meet county mover targets.
 * Run: npx tsx scripts/apply-pennsylvania-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { pennsylvaniaCountyResearch } from '../data/pennsylvania-county-research';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const TARGET = 10;

const assignmentsPath = 'data/pennsylvania-county-assignments.ts';
const file = readFileSync(assignmentsPath, 'utf8');
const match = file.match(/const CURATED_PA_COUNTIES[^=]*=\s*(\{[\s\S]*?\n\});/);
if (!match) throw new Error('Could not parse CURATED_PA_COUNTIES');

const current: Record<string, string[]> = eval(`(${match[1]})`);

function expandIds(slug: string, existing: string[]): string[] {
  const ids = [...existing];
  const seen = new Set(ids);

  const poolId = `${slug}-metro-pa`;
  const metroIds = metroMoverPools[poolId]?.moverIds ?? [];
  for (const id of metroIds) {
    if (ids.length >= TARGET) break;
    if (fullMoversCatalog[id] && !seen.has(id)) {
      ids.push(id);
      seen.add(id);
    }
  }

  const paMoverIds = Object.keys(fullMoversCatalog).filter((id) => id.endsWith('-pa'));
  for (const id of paMoverIds) {
    if (ids.length >= TARGET) break;
    if (!seen.has(id) && id.includes(slug)) {
      ids.push(id);
      seen.add(id);
    }
  }

  return ids.slice(0, TARGET);
}

for (const slug of Object.keys(pennsylvaniaCountyResearch)) {
  current[slug] = expandIds(slug, current[slug] ?? []);
}

const lines = Object.entries(current)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([slug, ids]) => {
    const idLines = ids.map((id) => `    '${id}',`).join('\n');
    return `  '${slug}': [\n${idLines}\n  ],`;
  })
  .join('\n');

const updated = file.replace(
  /const CURATED_PA_COUNTIES[^=]*=\s*\{[\s\S]*?\n\};/,
  `const CURATED_PA_COUNTIES: Record<string, string[]> = {\n${lines}\n};`
);

writeFileSync(assignmentsPath, updated);
console.log('Pennsylvania assignments updated to', TARGET, 'movers per county.');