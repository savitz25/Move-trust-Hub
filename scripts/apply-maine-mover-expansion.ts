/**
 * One-shot script: ensure ME curated assignments meet county mover targets.
 * Run: npx tsx scripts/apply-maine-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { maineCountyResearch } from '../data/maine-county-research';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const DEFAULT_TARGET = 10;

const assignmentsPath = 'data/maine-county-assignments.ts';
const file = readFileSync(assignmentsPath, 'utf8');
const match = file.match(/const CURATED_ME_COUNTIES[^=]*=\s*(\{[\s\S]*?\n\});/);
if (!match) throw new Error('Could not parse CURATED_ME_COUNTIES');

const current: Record<string, string[]> = eval(`(${match[1]})`);

function poolIdForSlug(slug: string): string {
  return `${slug}-metro-me`;
}

function expandIds(slug: string, existing: string[]): string[] {
  const ids = [...existing];
  const seen = new Set(ids);

  const poolId = poolIdForSlug(slug);
  const metroIds = metroMoverPools[poolId]?.moverIds ?? [];
  for (const id of metroIds) {
    if (ids.length >= DEFAULT_TARGET) break;
    if (fullMoversCatalog[id] && !seen.has(id)) {
      ids.push(id);
      seen.add(id);
    }
  }

  const meMoverIds = Object.keys(fullMoversCatalog).filter((id) => id.endsWith('-me'));
  for (const id of meMoverIds) {
    if (ids.length >= DEFAULT_TARGET) break;
    if (!seen.has(id) && id.includes(slug)) {
      ids.push(id);
      seen.add(id);
    }
  }

  return ids.slice(0, DEFAULT_TARGET);
}

for (const slug of Object.keys(maineCountyResearch)) {
  current[slug] = expandIds(slug, current[slug] ?? []);
}

const lines = Object.entries(current)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([slug, ids]) => {
    const key = slug.includes('-') ? `'${slug}'` : slug;
    const idLines = ids.map((id) => `    '${id}',`).join('\n');
    return `  ${key}: [\n${idLines}\n  ],`;
  });

const block = `const CURATED_ME_COUNTIES: Record<string, string[]> = {\n${lines.join('\n')}\n};`;
const updated = file.replace(/const CURATED_ME_COUNTIES[^=]*=\s*\{[\s\S]*?\n\};/, block);
writeFileSync(assignmentsPath, updated);
console.log('Updated', assignmentsPath);
for (const slug of Object.keys(maineCountyResearch)) {
  console.log(`  ${slug}: ${current[slug].length} movers (target ${DEFAULT_TARGET})`);
}