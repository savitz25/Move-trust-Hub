/**
 * Expand MI curated assignments with FMCSA-verified mover packs.
 * Run: npx tsx scripts/enrich-michigan-mover-licenses.ts  (first, if needed)
 *      npx tsx scripts/apply-michigan-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { generatedCounties } from '../data/generated/index';
import { applyMichiganCountyOverrides } from '../lib/local-movers/geography/michigan-overrides';
import { metroMoverPools } from '../data/local-movers-seed';
import { directoryMoverIdsByReputation } from '../data/directory-local-movers';
import { fullMoversCatalog } from '../lib/local-movers/catalog';
import { buildMetroMoverPack } from '../lib/local-movers/build-metro-mover-pack';
import { isCuratedMover } from '../lib/trust/curated-listing-policy';

const miCounties = generatedCounties
  .filter((c) => c.stateSlug === 'michigan')
  .map(applyMichiganCountyOverrides);

const DETROIT_METRO = new Set(['wayne', 'oakland', 'macomb']);
const PREMIUM_WEST = new Set(['kent', 'washtenaw']);
const KEY_SECONDARY = new Set(['ingham', 'genesee', 'kalamazoo', 'ottawa']);

const MAJOR = new Set([
  ...DETROIT_METRO,
  ...PREMIUM_WEST,
  ...KEY_SECONDARY,
  'livingston',
  'saginaw',
  'muskegon',
  'monroe',
  'grand-traverse',
  'marquette',
]);

const TARGET_BY_SLUG: Record<string, number> = {
  wayne: 13,
  oakland: 13,
  macomb: 13,
  kent: 11,
  washtenaw: 11,
  ingham: 10,
  genesee: 10,
  kalamazoo: 10,
  ottawa: 10,
};

const DEFAULT_MAJOR_TARGET = 10;
const DEFAULT_RURAL_TARGET = 7;

const CORE_DIRECTORY_IDS = [
  'amerisafe-van-lines',
  'international-van-lines',
  'american-van-lines',
  'colonial-van-lines',
  'moving-apt',
] as const;

function getTarget(slug: string): number {
  return (
    TARGET_BY_SLUG[slug] ??
    (MAJOR.has(slug) ? DEFAULT_MAJOR_TARGET : DEFAULT_RURAL_TARGET)
  );
}

const FALLBACK_POOLS = [
  'detroit-metro-mi',
  'grand-rapids-metro-mi',
  'ann-arbor-metro-mi',
  'lansing-metro-mi',
  'flint-metro-mi',
  'kalamazoo-metro-mi',
  'holland-allegan-metro-mi',
  'saginaw-metro-mi',
  'muskegon-metro-mi',
  'traverse-city-metro-mi',
  'marquette-metro-mi',
  'port-huron-metro-mi',
  'jackson-metro-mi',
  'battle-creek-metro-mi',
  'bay-city-metro-mi',
  'midland-metro-mi',
  'mount-pleasant-metro-mi',
  'petoskey-metro-mi',
  'cadillac-metro-mi',
  'escanaba-metro-mi',
];

function buildCountyPack(countySlug: string, metro: string | undefined, target: number): string[] {
  const ids: string[] = [];
  const seen = new Set<string>();

  const add = (id: string) => {
    const mover = fullMoversCatalog[id];
    if (!mover || !isCuratedMover(mover) || seen.has(id)) return;
    seen.add(id);
    ids.push(id);
  };

  const useLocalFirst = DETROIT_METRO.has(countySlug) || PREMIUM_WEST.has(countySlug);
  const directoryLead = useLocalFirst ? 0 : MAJOR.has(countySlug) ? 5 : 2;
  for (const id of CORE_DIRECTORY_IDS.slice(0, directoryLead)) {
    add(id);
  }

  if (DETROIT_METRO.has(countySlug) || PREMIUM_WEST.has(countySlug) || KEY_SECONDARY.has(countySlug)) {
    for (const id of buildMetroMoverPack('michigan', countySlug, Math.min(target, 13))) {
      add(id);
    }
  }

  const countyMoverIds = Object.keys(fullMoversCatalog)
    .filter((id) => id.includes(`-${countySlug}-mi`) || id.endsWith(`-${countySlug}-mi`))
    .sort((a, b) => {
      const ma = fullMoversCatalog[a]!;
      const mb = fullMoversCatalog[b]!;
      return mb.reviewCount - ma.reviewCount || mb.rating - ma.rating;
    });
  for (const id of countyMoverIds) {
    if (ids.length >= target) break;
    add(id);
  }

  const poolOrder = [metro, ...FALLBACK_POOLS.filter((p) => p !== metro)].filter(
    (p): p is string => Boolean(p)
  );
  for (const poolId of poolOrder) {
    const pool = metroMoverPools[poolId]?.moverIds ?? [];
    for (const id of pool) {
      if (ids.length >= target) break;
      add(id);
    }
    if (ids.length >= target) break;
  }

  for (const id of directoryMoverIdsByReputation) {
    if (ids.length >= target) break;
    add(id);
  }

  return ids.slice(0, target);
}

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
  const target = getTarget(county.slug);
  assignmentMap.set(county.slug, buildCountyPack(county.slug, county.metro, target));
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
let underTargetMajor = 0;
for (const county of miCounties) {
  const target = getTarget(county.slug);
  const n = assignmentMap.get(county.slug)?.length ?? 0;
  if (n < 5) {
    console.warn(`Still under 5: ${county.slug} (${n})`);
    under5++;
  }
  if (MAJOR.has(county.slug) && n < target) {
    console.warn(`Major under target: ${county.slug} (${n}/${target})`);
    underTargetMajor++;
  }
}

console.log(
  `Updated ${assignmentMap.size} counties. Under 5: ${under5}. Major under target: ${underTargetMajor}. Wayne: ${assignmentMap.get('wayne')?.length ?? 0}, Kent: ${assignmentMap.get('kent')?.length ?? 0}`
);