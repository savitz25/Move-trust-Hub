/**
 * One-shot script: expand VA curated assignments to minimum 5 movers (10 for major metros).
 * Run: npx tsx scripts/apply-virginia-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { virginiaCountyResearch } from '../data/virginia-county-research';
import { applyVirginiaCountyOverrides } from '../lib/local-movers/geography/virginia-overrides';
import { generatedCounties } from '../data/generated/index';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const vaCounties = generatedCounties
  .filter((c) => c.stateSlug === 'virginia')
  .map(applyVirginiaCountyOverrides);

const MAJOR = new Set([
  'fairfax',
  'loudoun',
  'prince-william',
  'arlington',
  'alexandria',
  'virginia-beach',
  'norfolk',
  'chesapeake',
  'richmond',
  'henrico',
  'chesterfield',
  'newport-news',
  'hampton',
  'stafford',
  'spotsylvania',
  'roanoke',
  'roanoke-county',
  'salem',
]);

const FALLBACK_POOLS = [
  'fairfax-metro-va',
  'loudoun-metro-va',
  'prince-william-metro-va',
  'arlington-metro-va',
  'alexandria-metro-va',
  'virginia-beach-metro-va',
  'norfolk-metro-va',
  'chesapeake-metro-va',
  'richmond-metro-va',
  'henrico-metro-va',
  'chesterfield-metro-va',
  'hampton-roads-metro-va',
  'roanoke-metro-va',
];

const curatedSlugs = new Set(Object.keys(virginiaCountyResearch));

const assignmentsPath = 'data/virginia-county-assignments.ts';
const file = readFileSync(assignmentsPath, 'utf8');
const match = file.match(/const CURATED_VA_COUNTIES[^=]*=\s*(\{[\s\S]*?\n\});/);
if (!match) throw new Error('Could not parse CURATED_VA_COUNTIES');

const current: Record<string, string[]> = eval(`(${match[1]})`);

function expandIds(countySlug: string, existing: string[]): string[] {
  const county = vaCounties.find((c) => c.slug === countySlug);
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

  const vaMoverIds = Object.keys(fullMoversCatalog).filter((id) => id.endsWith('-va'));
  for (const id of vaMoverIds) {
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
    const key = slug.includes('-') ? `'${slug}'` : slug;
    const idLines = ids.map((id) => `    '${id}',`).join('\n');
    return `  ${key}: [\n${idLines}\n  ],`;
  });

const block = `const CURATED_VA_COUNTIES: Record<string, string[]> = {\n${lines.join('\n')}\n};`;
const updated = file.replace(/const CURATED_VA_COUNTIES[^=]*=\s*\{[\s\S]*?\n\};/, block);
writeFileSync(assignmentsPath, updated);
console.log('Updated', assignmentsPath);
for (const slug of curatedSlugs) {
  console.log(`  ${slug}: ${current[slug].length} movers`);
}