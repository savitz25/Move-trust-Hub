/**
 * One-shot script: ensure CT curated assignments meet county mover targets.
 * Run: npx tsx scripts/apply-connecticut-mover-expansion.ts
 *
 * Targets: Fairfield 12 (premium metro), other counties 8 minimum.
 */
import { readFileSync, writeFileSync } from 'fs';
import { connecticutCountyResearch } from '../data/connecticut-county-research';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const TARGETS: Record<string, number> = {
  fairfield: 12,
};

const DEFAULT_TARGET = 8;

const assignmentsPath = 'data/connecticut-county-assignments.ts';
const file = readFileSync(assignmentsPath, 'utf8');
const match = file.match(/const CURATED_CT_COUNTIES[^=]*=\s*(\{[\s\S]*?\n\});/);
if (!match) throw new Error('Could not parse CURATED_CT_COUNTIES');

const current: Record<string, string[]> = eval(`(${match[1]})`);

function expandIds(slug: string, existing: string[]): string[] {
  const target = TARGETS[slug] ?? DEFAULT_TARGET;
  const ids = [...existing];
  const seen = new Set(ids);

  const poolId = `${slug}-metro-ct`;
  const metroIds = metroMoverPools[poolId]?.moverIds ?? [];
  for (const id of metroIds) {
    if (ids.length >= target) break;
    if (fullMoversCatalog[id] && !seen.has(id)) {
      ids.push(id);
      seen.add(id);
    }
  }

  const ctMoverIds = Object.keys(fullMoversCatalog).filter((id) => id.endsWith('-ct'));
  for (const id of ctMoverIds) {
    if (ids.length >= target) break;
    if (!seen.has(id) && id.includes(slug)) {
      ids.push(id);
      seen.add(id);
    }
  }

  return ids.slice(0, target);
}

for (const slug of Object.keys(connecticutCountyResearch)) {
  current[slug] = expandIds(slug, current[slug] ?? []);
}

const lines = Object.entries(current)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([slug, ids]) => {
    const key = slug.includes('-') ? `'${slug}'` : slug;
    const idLines = ids.map((id) => `    '${id}',`).join('\n');
    return `  ${key}: [\n${idLines}\n  ],`;
  });

const block = `const CURATED_CT_COUNTIES: Record<string, string[]> = {\n${lines.join('\n')}\n};`;
const updated = file.replace(/const CURATED_CT_COUNTIES[^=]*=\s*\{[\s\S]*?\n\};/, block);
writeFileSync(assignmentsPath, updated);
console.log('Updated', assignmentsPath);
for (const slug of Object.keys(connecticutCountyResearch)) {
  const target = TARGETS[slug] ?? DEFAULT_TARGET;
  console.log(`  ${slug}: ${current[slug].length} movers (target ${target})`);
}