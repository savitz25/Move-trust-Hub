/**
 * One-shot script: ensure MD batch-1 curated assignments meet county mover targets.
 * Run: npx tsx scripts/apply-maryland-mover-expansion.ts
 *
 * Targets: Montgomery, Prince George's, Baltimore County — 10 each.
 */
import { readFileSync, writeFileSync } from 'fs';
import { marylandCountyResearch } from '../data/maryland-county-research';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const TARGET = 10;

const assignmentsPath = 'data/maryland-county-assignments.ts';
const file = readFileSync(assignmentsPath, 'utf8');
const match = file.match(/const CURATED_MD_COUNTIES[^=]*=\s*(\{[\s\S]*?\n\});/);
if (!match) throw new Error('Could not parse CURATED_MD_COUNTIES');

const current: Record<string, string[]> = eval(`(${match[1]})`);

function expandIds(slug: string, existing: string[]): string[] {
  const ids = [...existing];
  const seen = new Set(ids);

  const poolId = `${slug}-metro-md`;
  const metroIds = metroMoverPools[poolId]?.moverIds ?? [];
  for (const id of metroIds) {
    if (ids.length >= TARGET) break;
    if (fullMoversCatalog[id] && !seen.has(id)) {
      ids.push(id);
      seen.add(id);
    }
  }

  const mdMoverIds = Object.keys(fullMoversCatalog).filter((id) => id.endsWith('-md'));
  for (const id of mdMoverIds) {
    if (ids.length >= TARGET) break;
    if (!seen.has(id) && id.includes(slug)) {
      ids.push(id);
      seen.add(id);
    }
  }

  return ids.slice(0, TARGET);
}

for (const slug of Object.keys(marylandCountyResearch)) {
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
  /const CURATED_MD_COUNTIES[^=]*=\s*\{[\s\S]*?\n\};/,
  `const CURATED_MD_COUNTIES: Record<string, string[]> = {\n${lines}\n};`
);

writeFileSync(assignmentsPath, updated);
console.log('Maryland batch-1 assignments updated to', TARGET, 'movers per county.');