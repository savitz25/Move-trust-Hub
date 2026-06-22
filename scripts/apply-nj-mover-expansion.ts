/**
 * One-shot script: expand NJ curated assignments to minimum 7 movers (10 for major metros).
 * Run: npx tsx scripts/apply-nj-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { newJerseyCounties } from '../lib/local-movers/geography/new-jersey';
import { newJerseyCountyMoverAssignments } from '../data/new-jersey-county-assignments';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const MAJOR = new Set([
  'bergen',
  'middlesex',
  'essex',
  'hudson',
  'monmouth',
  'ocean',
  'union',
  'passaic',
]);

const MIN_MOVERS = 7;
const MAJOR_TARGET = 10;

const assignmentMap = new Map(
  newJerseyCountyMoverAssignments.map((a) => [a.countySlug, [...a.moverIds]])
);

for (const county of newJerseyCounties) {
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

  const fallbackPools = [
    'nyc-metro-nj',
    'jersey-shore-nj',
    'suburban-nj',
    'south-jersey-nj',
    'northwest-nj',
  ];
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

const path = 'data/new-jersey-county-assignments.ts';
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

let underMin = 0;
let underMajor = 0;
for (const county of newJerseyCounties) {
  const n = assignmentMap.get(county.slug)?.length ?? 0;
  if (n < MIN_MOVERS && !MAJOR.has(county.slug)) {
    console.warn(`Still under ${MIN_MOVERS}: ${county.slug} (${n})`);
    underMin++;
  }
  if (MAJOR.has(county.slug) && n < 8) {
    console.warn(`Major under 8: ${county.slug} (${n})`);
    underMajor++;
  }
}
console.log(
  `Updated ${assignmentMap.size} counties. Under ${MIN_MOVERS}: ${underMin}. Major under 8: ${underMajor}`
);