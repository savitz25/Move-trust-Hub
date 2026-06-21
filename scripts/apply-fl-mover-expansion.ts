/**
 * One-shot script: expand FL curated assignments to minimum 5 movers (8 for major metros).
 * Run: npx tsx scripts/apply-fl-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { floridaCounties } from '../lib/local-movers/geography/florida';
import { floridaCountyMoverAssignments } from '../data/florida-county-assignments';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const MAJOR = new Set([
  'broward',
  'miami-dade',
  'palm-beach',
  'orange',
  'hillsborough',
  'duval',
  'pinellas',
  'lee',
  'sarasota',
]);

const MIN_MOVERS = 5;
const MAJOR_TARGET = 8;

const assignmentMap = new Map(
  floridaCountyMoverAssignments.map((a) => [a.countySlug, [...a.moverIds]])
);

for (const county of floridaCounties) {
  const target = MAJOR.has(county.slug) ? MAJOR_TARGET : MIN_MOVERS;
  const ids = assignmentMap.get(county.slug) ?? [];
  const existing = new Set(ids);

  const pool = metroMoverPools[county.metro ?? '']?.moverIds ?? [];
  for (const id of pool) {
    if (ids.length >= target) break;
    if (!existing.has(id) && fullMoversCatalog[id]) {
      ids.push(id);
      existing.add(id);
    }
  }

  // Cross-metro fallbacks for thin rural counties
  const fallbackPools = ['panhandle-fl', 'north-central-fl', 'central-florida', 'southwest-fl', 'northeast-fl', 'tampa-bay'];
  if (ids.length < target) {
    for (const metroId of fallbackPools) {
      const fallback = metroMoverPools[metroId]?.moverIds ?? [];
      for (const id of fallback) {
        if (ids.length >= target) break;
        if (!existing.has(id) && fullMoversCatalog[id]) {
          ids.push(id);
          existing.add(id);
        }
      }
    }
  }

  assignmentMap.set(county.slug, ids.slice(0, 10));
}

const path = 'data/florida-county-assignments.ts';
let content = readFileSync(path, 'utf8');

for (const [slug, ids] of assignmentMap) {
  const quoted = slug.includes('-') ? `'${slug}'` : slug;
  const block = `  ${quoted}: [\n${ids.map((id) => `    '${id}',`).join('\n')}\n  ]`;
  const regex = new RegExp(
    `  ${quoted.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}: \\[[\\s\\S]*?\\],`,
    'm'
  );
  if (!regex.test(content)) {
    console.warn(`No block found for ${slug}`);
    continue;
  }
  content = content.replace(regex, `${block},`);
}

writeFileSync(path, content);

let under5 = 0;
for (const county of floridaCounties) {
  const n = assignmentMap.get(county.slug)?.length ?? 0;
  if (n < MIN_MOVERS && !MAJOR.has(county.slug)) {
    console.warn(`Still under 5: ${county.slug} (${n})`);
    under5++;
  }
}
console.log(`Updated ${assignmentMap.size} counties. Still under 5: ${under5}`);