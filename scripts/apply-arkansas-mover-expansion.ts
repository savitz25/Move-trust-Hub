/**
 * One-shot script: expand AR curated assignments to minimum 5 movers (10 for major metros).
 * Run: npx tsx scripts/apply-arkansas-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { generatedCounties } from '../data/generated/index';
import { applyArkansasCountyOverrides } from '../lib/local-movers/geography/arkansas-overrides';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const arCounties = generatedCounties
  .filter((c) => c.stateSlug === 'arkansas')
  .map(applyArkansasCountyOverrides);

const MAJOR = new Set([
  'pulaski',
  'benton',
  'washington',
  'faulkner',
  'saline',
  'sebastian',
  'craighead',
  'garland',
  'lonoke',
  'pope',
  'white',
  'jefferson',
]);

const MIN_MOVERS = 5;
const MAJOR_TARGET = 10;

const FALLBACK_POOLS = [
  'little-rock-metro-ar',
  'northwest-arkansas-metro-ar',
  'fort-smith-metro-ar',
  'jonesboro-metro-ar',
  'hot-springs-metro-ar',
  'searcy-metro-ar',
  'russellville-metro-ar',
  'pine-bluff-metro-ar',
  'paragould-metro-ar',
  'west-memphis-metro-ar',
  'mountain-home-metro-ar',
  'texarkana-metro-ar',
  'batesville-metro-ar',
  'harrison-metro-ar',
  'blytheville-metro-ar',
  'el-dorado-metro-ar',
  'malvern-metro-ar',
  'berryville-metro-ar',
  'clarksville-metro-ar',
  'heber-springs-metro-ar',
  'harrisburg-metro-ar',
  'magnolia-metro-ar',
  'paris-metro-ar',
  'forrest-city-metro-ar',
  'camden-metro-ar',
  'morrilton-metro-ar',
  'arkadelphia-metro-ar',
];

const assignmentsPath = 'data/arkansas-county-assignments.ts';
const assignmentsContent = readFileSync(assignmentsPath, 'utf8');
const assignmentMap = new Map<string, string[]>();

const blockRegex = /  ('?[\w-]+'?): \[([\s\S]*?)\],/g;
let match: RegExpExecArray | null;
while ((match = blockRegex.exec(assignmentsContent)) !== null) {
  const slug = match[1].replace(/'/g, '');
  const ids = [...match[2].matchAll(/'([^']+)'/g)].map((m) => m[1]);
  assignmentMap.set(slug, ids);
}

for (const county of arCounties) {
  const target = MAJOR.has(county.slug) ? MAJOR_TARGET : MIN_MOVERS;
  const ids = [...(assignmentMap.get(county.slug) ?? [])];
  const existing = new Set(ids);

  const poolOrder = [
    county.metro,
    ...FALLBACK_POOLS.filter((p) => p !== county.metro),
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

  assignmentMap.set(county.slug, ids.slice(0, 10));
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
for (const county of arCounties) {
  const n = assignmentMap.get(county.slug)?.length ?? 0;
  if (n < MIN_MOVERS) {
    console.warn(`Still under 5: ${county.slug} (${n})`);
    under5++;
  }
  if (MAJOR.has(county.slug) && n < MAJOR_TARGET) {
    console.warn(`Major under 10: ${county.slug} (${n})`);
    majorUnder10++;
  }
}
console.log(
  `Updated ${assignmentMap.size} counties. Still under 5: ${under5}. Major under 10: ${majorUnder10}`
);