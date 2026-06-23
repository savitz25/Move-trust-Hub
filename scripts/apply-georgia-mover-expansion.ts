/**
 * One-shot script: expand GA curated assignments to minimum 5 movers (10 for major metros).
 * Run: npx tsx scripts/apply-georgia-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { generatedCounties } from '../data/generated/index';
import { applyGeorgiaCountyOverrides } from '../lib/local-movers/geography/georgia-overrides';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const georgiaCounties = generatedCounties
  .filter((c) => c.stateSlug === 'georgia')
  .map(applyGeorgiaCountyOverrides);

const MAJOR = new Set([
  'fulton',
  'gwinnett',
  'cobb',
  'dekalb',
  'chatham',
  'cherokee',
  'clayton',
  'forsyth',
  'henry',
  'hall',
  'richmond',
  'muscogee',
  'paulding',
  'houston',
  'columbia',
  'coweta',
  'bibb',
  'douglas',
  'carroll',
  'clarke',
  'fayette',
  'rockdale',
  'newton',
  'barrow',
  'walton',
  'glynn',
  'liberty',
  'effingham',
  'bulloch',
  'lowndes',
  'dougherty',
  'troup',
  'floyd',
  'whitfield',
  'bartow',
  'pickens',
]);

const MIN_MOVERS = 5;
const MAJOR_TARGET = 10;

const FALLBACK_POOLS = [
  'atlanta-metro-ga',
  'savannah-metro-ga',
  'brunswick-metro-ga',
  'augusta-metro-ga',
  'columbus-metro-ga',
  'macon-metro-ga',
  'athens-metro-ga',
  'valdosta-metro-ga',
  'albany-metro-ga',
  'rome-metro-ga',
  'dalton-metro-ga',
  'chattanooga-metro-ga',
  'lagrange-metro-ga',
];

const assignmentsPath = 'data/georgia-county-assignments.ts';
const assignmentsContent = readFileSync(assignmentsPath, 'utf8');
const assignmentMap = new Map<string, string[]>();

const blockRegex = /  ('?[\w-]+'?): \[([\s\S]*?)\],/g;
let match: RegExpExecArray | null;
while ((match = blockRegex.exec(assignmentsContent)) !== null) {
  const slug = match[1].replace(/'/g, '');
  const ids = [...match[2].matchAll(/'([^']+)'/g)].map((m) => m[1]);
  assignmentMap.set(slug, ids);
}

for (const county of georgiaCounties) {
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
for (const county of georgiaCounties) {
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