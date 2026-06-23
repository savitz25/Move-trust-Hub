/**
 * One-shot script: expand LA curated assignments to minimum 5 movers (10 for major parishes).
 * Run: npx tsx scripts/apply-louisiana-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { generatedCounties } from '../data/generated/index';
import { applyLouisianaCountyOverrides } from '../lib/local-movers/geography/louisiana-overrides';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const laParishes = generatedCounties
  .filter((c) => c.stateSlug === 'louisiana')
  .map(applyLouisianaCountyOverrides);

const MAJOR = new Set([
  'orleans',
  'jefferson',
  'east-baton-rouge',
  'st-tammany',
  'lafayette',
  'caddo',
  'calcasieu',
  'bossier',
  'livingston',
  'tangipahoa',
  'ascension',
  'terrebonne',
  'rapides',
  'ouachita',
  'st-landry',
]);

const MIN_MOVERS = 5;
const MAJOR_TARGET = 10;

const FALLBACK_POOLS = [
  'baton-rouge-metro-la',
  'new-orleans-metro-la',
  'north-shore-metro-la',
  'lafayette-metro-la',
  'shreveport-bossier-metro-la',
  'lake-charles-metro-la',
  'monroe-metro-la',
  'hammond-metro-la',
  'alexandria-metro-la',
  'houma-bayou-metro-la',
  'ruston-metro-la',
  'natchitoches-metro-la',
  'leesville-metro-la',
];

const assignmentsPath = 'data/louisiana-county-assignments.ts';
const assignmentsContent = readFileSync(assignmentsPath, 'utf8');
const assignmentMap = new Map<string, string[]>();

const blockRegex = /  ('?[\w-]+'?): \[([\s\S]*?)\],/g;
let match: RegExpExecArray | null;
while ((match = blockRegex.exec(assignmentsContent)) !== null) {
  const slug = match[1].replace(/'/g, '');
  const ids = [...match[2].matchAll(/'([^']+)'/g)].map((m) => m[1]);
  assignmentMap.set(slug, ids);
}

for (const parish of laParishes) {
  const target = MAJOR.has(parish.slug) ? MAJOR_TARGET : MIN_MOVERS;
  const ids = [...(assignmentMap.get(parish.slug) ?? [])];
  const existing = new Set(ids);

  const poolOrder = [
    parish.metro,
    ...FALLBACK_POOLS.filter((p) => p !== parish.metro),
  ].filter((p): p is string => Boolean(p));

  for (const poolId of poolOrder) {
    const pool = metroMoverPools[poolId]?.moverIds ?? [];
    for (const id of pool) {
      if (ids.length >= target) break;
      if (!existing.has(id) && fullMoversCatalog[id]) {
        ids.push(id);
        existing.add(id);
      }
    }
    if (ids.length >= target) break;
  }

  assignmentMap.set(parish.slug, ids.slice(0, 10));
}

let content = assignmentsContent;
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

writeFileSync(assignmentsPath, content);

let under5 = 0;
let majorUnder10 = 0;
for (const parish of laParishes) {
  const n = assignmentMap.get(parish.slug)?.length ?? 0;
  if (n < MIN_MOVERS) {
    console.warn(`Still under 5: ${parish.slug} (${n})`);
    under5++;
  }
  if (MAJOR.has(parish.slug) && n < MAJOR_TARGET) {
    console.warn(`Major under 10: ${parish.slug} (${n})`);
    majorUnder10++;
  }
}
console.log(
  `Updated ${assignmentMap.size} parishes. Still under 5: ${under5}. Major under 10: ${majorUnder10}`
);