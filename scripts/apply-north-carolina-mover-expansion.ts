/**
 * One-shot script: expand NC curated assignments to minimum 5 movers (10 for major metros).
 * Run: npx tsx scripts/apply-north-carolina-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { generatedCounties } from '../data/generated/index';
import { applyNorthCarolinaCountyOverrides } from '../lib/local-movers/geography/north-carolina-overrides';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const ncCounties = generatedCounties
  .filter((c) => c.stateSlug === 'north-carolina')
  .map(applyNorthCarolinaCountyOverrides);

const MAJOR = new Set([
  'wake',
  'mecklenburg',
  'guilford',
  'forsyth',
  'cumberland',
  'durham',
  'buncombe',
  'new-hanover',
  'onslow',
  'cabarrus',
  'union',
  'iredell',
  'johnston',
  'henderson',
  'gaston',
  'catawba',
  'robeson',
  'pitt',
  'wayne',
  'alamance',
  'brunswick',
  'chatham',
  'craven',
  'davidson',
  'harnett',
  'moore',
  'orange',
  'randolph',
  'rowan',
]);

const MIN_MOVERS = 5;
const MAJOR_TARGET = 10;

const FALLBACK_POOLS = [
  'raleigh-triangle-metro-nc',
  'charlotte-metro-nc',
  'greensboro-high-point-metro-nc',
  'winston-salem-triad-metro-nc',
  'durham-chapel-hill-metro-nc',
  'fayetteville-metro-nc',
  'asheville-metro-nc',
  'wilmington-metro-nc',
  'jacksonville-metro-nc',
  'greenville-metro-nc',
  'hickory-lenoir-metro-nc',
  'goldsboro-metro-nc',
  'new-bern-metro-nc',
  'pinehurst-metro-nc',
  'rocky-mount-metro-nc',
  'wilson-metro-nc',
  'sanford-metro-nc',
  'crystal-coast-metro-nc',
  'boone-metro-nc',
  'kinston-metro-nc',
  'elizabeth-city-metro-nc',
  'outer-banks-metro-nc',
];

const assignmentsPath = 'data/north-carolina-county-assignments.ts';
const assignmentsContent = readFileSync(assignmentsPath, 'utf8');
const assignmentMap = new Map<string, string[]>();

const blockRegex = /  ('?[\w-]+'?): \[([\s\S]*?)\],/g;
let match: RegExpExecArray | null;
while ((match = blockRegex.exec(assignmentsContent)) !== null) {
  const slug = match[1].replace(/'/g, '');
  const ids = [...match[2].matchAll(/'([^']+)'/g)].map((m) => m[1]);
  assignmentMap.set(slug, ids);
}

for (const county of ncCounties) {
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
let majorUnder8 = 0;
for (const county of ncCounties) {
  const n = assignmentMap.get(county.slug)?.length ?? 0;
  if (n < MIN_MOVERS) {
    console.warn(`Still under 5: ${county.slug} (${n})`);
    under5++;
  }
  if (MAJOR.has(county.slug) && n < 8) {
    console.warn(`Major under 8: ${county.slug} (${n})`);
    majorUnder8++;
  }
}
console.log(
  `Updated ${assignmentMap.size} counties. Still under 5: ${under5}. Major under 8: ${majorUnder8}`
);