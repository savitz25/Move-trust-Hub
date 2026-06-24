/**
 * One-shot script: expand IL curated assignments to minimum 5 movers (10 for all curated counties).
 * Run: npx tsx scripts/apply-illinois-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { generatedCounties } from '../data/generated/index';
import { applyIllinoisCountyOverrides } from '../lib/local-movers/geography/illinois-overrides';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const ilCounties = generatedCounties
  .filter((c) => c.stateSlug === 'illinois')
  .map(applyIllinoisCountyOverrides);

const MAJOR = new Set([
  'cook',
  'dupage',
  'lake',
  'will',
  'kane',
  'mchenry',
  'winnebago',
  'madison',
  'st-clair',
  'champaign',
  'sangamon',
  'peoria',
  'mclean',
  'rock-island',
  'kendall',
]);

const MIN_MOVERS = 5;
const TARGET_MOVERS = 10;
const COOK_CAP = 20;

const FALLBACK_POOLS = [
  'chicago-metro-il',
  'chicago-metro-west-il',
  'chicago-metro-north-il',
  'chicago-metro-southwest-il',
  'chicago-metro-northwest-il',
  'rockford-metro-il',
  'st-louis-metro-il',
  'springfield-metro-il',
  'peoria-metro-il',
  'bloomington-normal-metro-il',
  'champaign-urbana-metro-il',
  'decatur-metro-il',
  'danville-metro-il',
  'kankakee-metro-il',
  'quincy-metro-il',
  'galesburg-metro-il',
  'quad-cities-metro-il',
  'ottawa-metro-il',
  'carbondale-metro-il',
  'marion-metro-il',
  'sterling-rock-falls-metro-il',
  'galena-metro-il',
  'oregon-metro-il',
  'dekalb-metro-il',
];

const assignmentsPath = 'data/illinois-county-assignments.ts';
const assignmentsContent = readFileSync(assignmentsPath, 'utf8');
const assignmentMap = new Map<string, string[]>();

const blockRegex = /  ('?[\w-]+'?): \[([\s\S]*?)\],/g;
let match: RegExpExecArray | null;
while ((match = blockRegex.exec(assignmentsContent)) !== null) {
  const slug = match[1].replace(/'/g, '');
  const ids = [...match[2].matchAll(/'([^']+)'/g)].map((m) => m[1]);
  assignmentMap.set(slug, ids);
}

for (const county of ilCounties) {
  const cap = county.slug === 'cook' ? COOK_CAP : TARGET_MOVERS;
  const floor = MAJOR.has(county.slug) ? TARGET_MOVERS : MIN_MOVERS;
  const target = Math.min(cap, Math.max(floor, TARGET_MOVERS));
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

  assignmentMap.set(county.slug, ids.slice(0, cap));
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
let ruralUnder10 = 0;
for (const county of ilCounties) {
  const n = assignmentMap.get(county.slug)?.length ?? 0;
  if (n < MIN_MOVERS) {
    console.warn(`Still under 5: ${county.slug} (${n})`);
    under5++;
  }
  if (MAJOR.has(county.slug) && n < TARGET_MOVERS) {
    console.warn(`Major under 10: ${county.slug} (${n})`);
    majorUnder10++;
  }
  if (!MAJOR.has(county.slug) && county.slug !== 'cook' && n < TARGET_MOVERS) {
    ruralUnder10++;
  }
}
console.log(
  `Updated ${assignmentMap.size} counties. Still under 5: ${under5}. Major under 10: ${majorUnder10}. Non-major under 10: ${ruralUnder10}`
);