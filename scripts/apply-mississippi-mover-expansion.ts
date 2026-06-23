/**
 * One-shot script: expand MS curated assignments to minimum 5 movers (10 for major metros).
 * Run: npx tsx scripts/apply-mississippi-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { generatedCounties } from '../data/generated/index';
import { applyMississippiCountyOverrides } from '../lib/local-movers/geography/mississippi-overrides';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const msCounties = generatedCounties
  .filter((c) => c.stateSlug === 'mississippi')
  .map(applyMississippiCountyOverrides);

const MAJOR = new Set([
  'hinds',
  'harrison',
  'desoto',
  'rankin',
  'madison',
  'lee',
  'forrest',
  'lauderdale',
  'jones',
  'lamar',
  'oktibbeha',
  'lowndes',
  'pearl-river',
  'hancock',
  'monroe',
]);

const MIN_MOVERS = 5;
const MAJOR_TARGET = 10;

const FALLBACK_POOLS = [
  'jackson-ms-metro-ms',
  'gulfport-biloxi-metro-ms',
  'desoto-metro-ms',
  'tupelo-metro-ms',
  'hattiesburg-metro-ms',
  'meridian-metro-ms',
  'oxford-metro-ms',
  'pascagoula-metro-ms',
  'columbus-ms-metro-ms',
  'starkville-metro-ms',
  'hancock-coastal-ms',
  'picayune-metro-ms',
  'laurel-metro-ms',
];

const assignmentsPath = 'data/mississippi-county-assignments.ts';
const assignmentsContent = readFileSync(assignmentsPath, 'utf8');
const assignmentMap = new Map<string, string[]>();

const blockRegex = /  ('?[\w-]+'?): \[([\s\S]*?)\],/g;
let match: RegExpExecArray | null;
while ((match = blockRegex.exec(assignmentsContent)) !== null) {
  const slug = match[1].replace(/'/g, '');
  const ids = [...match[2].matchAll(/'([^']+)'/g)].map((m) => m[1]);
  assignmentMap.set(slug, ids);
}

for (const county of msCounties) {
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
for (const county of msCounties) {
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