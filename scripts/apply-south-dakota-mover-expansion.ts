/**
 * One-shot script: ensure SD curated assignments meet county mover targets.
 * Run: npx tsx scripts/apply-south-dakota-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { southDakotaCountyResearch } from '../data/south-dakota-county-research';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const PREMIUM_TARGETS: Record<string, number> = {
  minnehaha: 11,
  pennington: 10,
};
const SECONDARY_TARGETS: Record<string, number> = {
  brown: 8,
  codington: 8,
  lincoln: 8,
};
const DEFAULT_TARGET = 5;

function getTarget(slug: string): number {
  return PREMIUM_TARGETS[slug] ?? SECONDARY_TARGETS[slug] ?? DEFAULT_TARGET;
}

const assignmentsPath = 'data/south-dakota-county-assignments.ts';
const file = readFileSync(assignmentsPath, 'utf8');
const match = file.match(/const CURATED_SD_COUNTIES[^=]*=\s*(\{[\s\S]*?\n\});/);
if (!match) throw new Error('Could not parse CURATED_SD_COUNTIES');

const current: Record<string, string[]> = eval(`(${match[1]})`);

function poolIdForSlug(slug: string): string {
  return `${slug}-metro-sd`;
}

function expandIds(slug: string, existing: string[]): string[] {
  const target = getTarget(slug);
  const ids = [...existing];
  const seen = new Set(ids);

  const poolId = poolIdForSlug(slug);
  const metroIds = metroMoverPools[poolId]?.moverIds ?? [];
  for (const id of metroIds) {
    if (ids.length >= target) break;
    if (fullMoversCatalog[id] && !seen.has(id)) {
      ids.push(id);
      seen.add(id);
    }
  }

  const sdMoverIds = Object.keys(fullMoversCatalog).filter((id) => id.endsWith('-sd'));
  for (const id of sdMoverIds) {
    if (ids.length >= target) break;
    if (!seen.has(id) && id.includes(slug)) {
      ids.push(id);
      seen.add(id);
    }
  }

  return ids.slice(0, target);
}

for (const slug of Object.keys(southDakotaCountyResearch)) {
  current[slug] = expandIds(slug, current[slug] ?? []);
}

const lines = Object.entries(current)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([slug, ids]) => {
    const key = slug.includes('-') ? `'${slug}'` : slug;
    const idLines = ids.map((id) => `    '${id}',`).join('\n');
    return `  ${key}: [\n${idLines}\n  ],`;
  });

const block = `const CURATED_SD_COUNTIES: Record<string, string[]> = {\n${lines.join('\n')}\n};`;
const updated = file.replace(/const CURATED_SD_COUNTIES[^=]*=\s*\{[\s\S]*?\n\};/, block);
writeFileSync(assignmentsPath, updated);
console.log('Updated', assignmentsPath);
for (const slug of Object.keys(southDakotaCountyResearch)) {
  const target = getTarget(slug);
  console.log(`  ${slug}: ${current[slug].length} movers (target ${target})`);
}