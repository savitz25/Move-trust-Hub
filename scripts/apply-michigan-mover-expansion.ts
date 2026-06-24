/**
 * One-shot script: expand MI curated assignments to minimum 5 movers (10 for major; Wayne up to 18).
 * Run: npx tsx scripts/apply-michigan-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { generatedCounties } from '../data/generated/index';
import { applyMichiganCountyOverrides } from '../lib/local-movers/geography/michigan-overrides';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const miCounties = generatedCounties
  .filter((c) => c.stateSlug === 'michigan')
  .map(applyMichiganCountyOverrides);

const MAJOR = new Set([
  'wayne',
  'oakland',
  'macomb',
  'kent',
  'ottawa',
  'washtenaw',
  'ingham',
  'genesee',
  'kalamazoo',
  'livingston',
  'saginaw',
  'muskegon',
  'monroe',
  'grand-traverse',
  'marquette',
]);

const MIN_MOVERS = 5;
const TARGET_MOVERS = 10;
const WAYNE_CAP = 18;

const FALLBACK_POOLS = [
  'detroit-metro-mi',
  'grand-rapids-metro-mi',
  'flint-metro-mi',
  'ann-arbor-metro-mi',
  'lansing-metro-mi',
  'kalamazoo-metro-mi',
  'saginaw-metro-mi',
  'muskegon-metro-mi',
  'port-huron-metro-mi',
  'jackson-metro-mi',
  'battle-creek-metro-mi',
  'holland-allegan-metro-mi',
  'bay-city-metro-mi',
  'traverse-city-metro-mi',
  'midland-metro-mi',
  'marquette-metro-mi',
  'mount-pleasant-metro-mi',
  'petoskey-metro-mi',
  'cadillac-metro-mi',
  'escanaba-metro-mi',
];

const assignmentsPath = 'data/michigan-county-assignments.ts';
const assignmentsContent = readFileSync(assignmentsPath, 'utf8');
const assignmentMap = new Map<string, string[]>();

const blockRegex = /  ('?[\w-]+'?): \[([\s\S]*?)\],/g;
let match: RegExpExecArray | null;
while ((match = blockRegex.exec(assignmentsContent)) !== null) {
  const slug = match[1].replace(/'/g, '');
  const ids = [...match[2].matchAll(/'([^']+)'/g)].map((m) => m[1]);
  assignmentMap.set(slug, ids);
}

for (const county of miCounties) {
  const cap = county.slug === 'wayne' ? WAYNE_CAP : TARGET_MOVERS;
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
for (const county of miCounties) {
  const n = assignmentMap.get(county.slug)?.length ?? 0;
  if (n < MIN_MOVERS) {
    console.warn(`Still under 5: ${county.slug} (${n})`);
    under5++;
  }
  if (MAJOR.has(county.slug) && n < TARGET_MOVERS) {
    console.warn(`Major under 10: ${county.slug} (${n})`);
    majorUnder10++;
  }
}
console.log(
  `Updated ${assignmentMap.size} counties. Still under 5: ${under5}. Major under 10: ${majorUnder10}. Wayne: ${assignmentMap.get('wayne')?.length ?? 0} movers`
);