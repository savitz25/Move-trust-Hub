/**
 * One-shot script: expand CA curated assignments to minimum 5 movers (10 for major metros).
 * Run: npx tsx scripts/apply-california-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { californiaCounties } from '../lib/local-movers/geography/california';
import { californiaCountyMoverAssignments } from '../data/california-county-assignments';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const MAJOR = new Set([
  'alameda',
  'contra-costa',
  'los-angeles',
  'orange',
  'riverside',
  'sacramento',
  'san-bernardino',
  'san-diego',
  'san-francisco',
  'san-mateo',
  'santa-clara',
  'ventura',
]);

const MIN_MOVERS = 5;
const MAJOR_TARGET = 10;

const assignmentMap = new Map(
  californiaCountyMoverAssignments.map((a) => [a.countySlug, [...a.moverIds]])
);

for (const county of californiaCounties) {
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
    'bay-area-ca',
    'greater-la-ca',
    'sacramento-metro-ca',
    'san-diego-ca',
    'central-valley-ca',
    'bakersfield-metro-ca',
    'chico-metro-ca',
    'north-coast-ca',
    'northern-valley-ca',
    'sierra-rural-ca',
    'central-coast-ca',
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

const path = 'data/california-county-assignments.ts';
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
for (const county of californiaCounties) {
  const n = assignmentMap.get(county.slug)?.length ?? 0;
  if (n < MIN_MOVERS && !MAJOR.has(county.slug)) {
    console.warn(`Still under ${MIN_MOVERS}: ${county.slug} (${n})`);
    underMin++;
  }
  if (MAJOR.has(county.slug) && n < MAJOR_TARGET) {
    console.warn(`Major under ${MAJOR_TARGET}: ${county.slug} (${n})`);
    underMajor++;
  }
}
console.log(
  `Updated ${assignmentMap.size} counties. Under ${MIN_MOVERS}: ${underMin}. Major under ${MAJOR_TARGET}: ${underMajor}`
);