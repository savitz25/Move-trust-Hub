/**
 * One-shot script: ensure MA batch 1 curated assignments meet county mover targets.
 * Run: npx tsx scripts/apply-massachusetts-mover-expansion.ts
 *
 * Targets: 10 movers per curated county.
 */
import { readFileSync, writeFileSync } from 'fs';
import { massachusettsCountyResearch } from '../data/massachusetts-county-research';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const DEFAULT_TARGET = 10;

const assignmentsPath = 'data/massachusetts-county-assignments.ts';
const file = readFileSync(assignmentsPath, 'utf8');
const match = file.match(/const CURATED_MA_COUNTIES[^=]*=\s*(\{[\s\S]*?\n\});/);
if (!match) throw new Error('Could not parse CURATED_MA_COUNTIES');

const current: Record<string, string[]> = eval(`(${match[1]})`);

function expandIds(slug: string, existing: string[]): string[] {
  const ids = [...existing];
  const seen = new Set(ids);

  const poolId = `${slug}-metro-ma`;
  const metroIds = metroMoverPools[poolId]?.moverIds ?? [];
  for (const id of metroIds) {
    if (ids.length >= DEFAULT_TARGET) break;
    if (fullMoversCatalog[id] && !seen.has(id)) {
      ids.push(id);
      seen.add(id);
    }
  }

  const maMoverIds = Object.keys(fullMoversCatalog).filter((id) => id.endsWith('-ma'));
  for (const id of maMoverIds) {
    if (ids.length >= DEFAULT_TARGET) break;
    if (!seen.has(id) && id.includes(slug)) {
      ids.push(id);
      seen.add(id);
    }
  }

  return ids.slice(0, DEFAULT_TARGET);
}

for (const slug of Object.keys(massachusettsCountyResearch)) {
  current[slug] = expandIds(slug, current[slug] ?? []);
}

const lines = Object.entries(current)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([slug, ids]) => {
    const key = slug.includes('-') ? `'${slug}'` : slug;
    const idLines = ids.map((id) => `    '${id}',`).join('\n');
    return `  ${key}: [\n${idLines}\n  ],`;
  });

const block = `const CURATED_MA_COUNTIES: Record<string, string[]> = {\n${lines.join('\n')}\n};`;
const updated = file.replace(/const CURATED_MA_COUNTIES[^=]*=\s*\{[\s\S]*?\n\};/, block);
writeFileSync(assignmentsPath, updated);
console.log('Updated', assignmentsPath);
for (const slug of Object.keys(massachusettsCountyResearch)) {
  console.log(`  ${slug}: ${current[slug].length} movers (target ${DEFAULT_TARGET})`);
}