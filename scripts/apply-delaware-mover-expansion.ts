/**
 * One-shot script: ensure DE curated assignments meet county mover targets.
 * Run: npx tsx scripts/apply-delaware-mover-expansion.ts
 *
 * Targets: New Castle 12 (major metro), Kent & Sussex 8 minimum.
 */
import { readFileSync, writeFileSync } from 'fs';
import { delawareCountyResearch } from '../data/delaware-county-research';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const TARGETS: Record<string, number> = {
  'new-castle': 12,
  sussex: 8,
  kent: 8,
};

const assignmentsPath = 'data/delaware-county-assignments.ts';
const file = readFileSync(assignmentsPath, 'utf8');
const match = file.match(/const CURATED_DE_COUNTIES[^=]*=\s*(\{[\s\S]*?\n\});/);
if (!match) throw new Error('Could not parse CURATED_DE_COUNTIES');

const current: Record<string, string[]> = eval(`(${match[1]})`);

function expandIds(slug: string, existing: string[]): string[] {
  const target = TARGETS[slug] ?? 8;
  const ids = [...existing];
  const seen = new Set(ids);

  const poolId = `${slug}-metro-de`;
  const metroIds = metroMoverPools[poolId]?.moverIds ?? [];
  for (const id of metroIds) {
    if (ids.length >= target) break;
    if (fullMoversCatalog[id] && !seen.has(id)) {
      ids.push(id);
      seen.add(id);
    }
  }

  const deMoverIds = Object.keys(fullMoversCatalog).filter((id) => id.endsWith('-de'));
  for (const id of deMoverIds) {
    if (ids.length >= target) break;
    if (!seen.has(id) && id.includes(slug.replace('new-castle', 'new-castle'))) {
      if (id.includes(slug) || id.includes(slug.split('-')[0])) {
        ids.push(id);
        seen.add(id);
      }
    }
  }

  return ids.slice(0, target);
}

for (const slug of Object.keys(delawareCountyResearch)) {
  current[slug] = expandIds(slug, current[slug] ?? []);
}

const lines = Object.entries(current)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([slug, ids]) => {
    const key = slug.includes('-') ? `'${slug}'` : slug;
    const idLines = ids.map((id) => `    '${id}',`).join('\n');
    return `  ${key}: [\n${idLines}\n  ],`;
  });

const block = `const CURATED_DE_COUNTIES: Record<string, string[]> = {\n${lines.join('\n')}\n};`;
const updated = file.replace(/const CURATED_DE_COUNTIES[^=]*=\s*\{[\s\S]*?\n\};/, block);
writeFileSync(assignmentsPath, updated);
console.log('Updated', assignmentsPath);
for (const slug of Object.keys(delawareCountyResearch)) {
  console.log(`  ${slug}: ${current[slug].length} movers (target ${TARGETS[slug] ?? 8})`);
}