/**
 * One-shot script: expand KS curated assignments to minimum 5 movers (10 for major metros).
 * Run: npx tsx scripts/apply-kansas-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { generatedCounties } from '../data/generated/index';
import { applyKansasCountyOverrides } from '../lib/local-movers/geography/kansas-overrides';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const ksCounties = generatedCounties
  .filter((c) => c.stateSlug === 'kansas')
  .map(applyKansasCountyOverrides);

const MAJOR = new Set([
  'johnson',
  'sedgwick',
  'shawnee',
  'wyandotte',
  'douglas',
  'butler',
  'riley',
  'reno',
  'saline',
  'crawford',
  'ellis',
  'ford',
  'finney',
]);

const MIN_MOVERS = 5;
const MAJOR_TARGET = 10;

const FALLBACK_POOLS = [
  'kansas-city-metro-ks',
  'wichita-metro-ks',
  'topeka-metro-ks',
  'lawrence-metro-ks',
  'manhattan-metro-ks',
  'wichita-metro-east-ks',
  'hutchinson-metro-ks',
  'salina-metro-ks',
  'pittsburg-metro-ks',
  'garden-city-metro-ks',
  'junction-city-metro-ks',
  'winfield-metro-ks',
  'dodge-city-metro-ks',
  'emporia-metro-ks',
  'mcpherson-metro-ks',
  'independence-metro-ks',
  'hays-metro-ks',
  'ottawa-metro-ks',
  'great-bend-metro-ks',
  'wellington-metro-ks',
  'liberal-metro-ks',
  'parsons-metro-ks',
  'columbus-metro-ks',
  'abilene-metro-ks',
  'kansas-city-metro-south-ks',
  'wichita-metro-north-ks',
];

const assignmentsPath = 'data/kansas-county-assignments.ts';
const assignmentsContent = readFileSync(assignmentsPath, 'utf8');
const assignmentMap = new Map<string, string[]>();

const blockRegex = /  ('?[\w-]+'?): \[([\s\S]*?)\],/g;
let match: RegExpExecArray | null;
while ((match = blockRegex.exec(assignmentsContent)) !== null) {
  const slug = match[1].replace(/'/g, '');
  const ids = [...match[2].matchAll(/'([^']+)'/g)].map((m) => m[1]);
  assignmentMap.set(slug, ids);
}

for (const county of ksCounties) {
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
for (const county of ksCounties) {
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