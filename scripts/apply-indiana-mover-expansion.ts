/**
 * One-shot script: expand IN curated assignments to minimum 5 movers (10 for major; Marion up to 18).
 * Run: npx tsx scripts/apply-indiana-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { generatedCounties } from '../data/generated/index';
import { applyIndianaCountyOverrides } from '../lib/local-movers/geography/indiana-overrides';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const inCounties = generatedCounties
  .filter((c) => c.stateSlug === 'indiana')
  .map(applyIndianaCountyOverrides);

const MAJOR = new Set([
  'marion',
  'lake',
  'allen',
  'hamilton',
  'st-joseph',
  'elkhart',
  'hendricks',
  'tippecanoe',
  'vanderburgh',
  'johnson',
  'porter',
  'monroe',
  'madison',
  'clark',
  'delaware',
  'laporte',
  'vigo',
  'hancock',
  'bartholomew',
  'howard',
  'boone',
  'floyd',
  'kosciusko',
  'morgan',
  'warrick',
  'grant',
  'wayne',
  'dearborn',
  'henry',
  'noble',
  'jackson',
  'marshall',
  'shelby',
  'lawrence',
  'dekalb',
  'dubois',
  'lagrange',
  'harrison',
  'montgomery',
  'putnam',
  'cass',
  'huntington',
  'adams',
  'knox',
  'whitley',
  'steuben',
  'miami',
  'daviess',
  'jasper',
  'jefferson',
  'clinton',
  'gibson',
  'greene',
  'wabash',
  'ripley',
  'wells',
  'washington',
  'jennings',
  'decatur',
  'clay',
  'scott',
  'white',
  'posey',
  'randolph',
  'fayette',
  'starke',
  'franklin',
  'owen',
  'sullivan',
  'carroll',
  'fulton',
  'jay',
  'spencer',
  'orange',
  'perry',
  'fountain',
  'parke',
  'rush',
  'brown',
  'vermillion',
  'tipton',
  'newton',
  'pulaski',
  'pike',
  'blackford',
  'crawford',
  'switzerland',
  'martin',
  'benton',
  'warren',
  'union',
  'ohio',
]);

const MIN_MOVERS = 5;
const TARGET_MOVERS = 10;
const MARION_CAP = 18;

const FALLBACK_POOLS = [
  'indianapolis-metro-in',
  'northwest-indiana-metro-in',
  'fort-wayne-metro-in',
  'south-bend-metro-in',
  'elkhart-goshen-metro-in',
  'lafayette-metro-in',
  'evansville-metro-in',
  'bloomington-metro-in',
  'anderson-metro-in',
  'louisville-metro-in',
  'muncie-metro-in',
  'laporte-metro-in',
  'terre-haute-metro-in',
  'columbus-metro-in',
  'kokomo-metro-in',
  'warsaw-metro-in',
  'grant-marion-metro-in',
  'richmond-metro-in',
  'cincinnati-metro-in',
  'new-castle-metro-in',
  'noble-metro-in',
  'seymour-metro-in',
  'plymouth-metro-in',
  'bedford-metro-in',
  'auburn-metro-in',
  'jasper-metro-in',
  'lagrange-metro-in',
  'crawfordsville-metro-in',
  'greencastle-metro-in',
  'logansport-metro-in',
  'huntington-county-metro-in',
  'adams-decatur-metro-in',
  'vincennes-metro-in',
  'columbia-city-metro-in',
  'angola-metro-in',
  'peru-metro-in',
  'daviess-metro-in',
  'rensselaer-metro-in',
  'madison-jefferson-metro-in',
  'frankfort-metro-in',
  'princeton-metro-in',
  'bloomfield-metro-in',
  'wabash-metro-in',
  'versailles-metro-in',
  'bluffton-metro-in',
  'salem-metro-in',
  'vernon-metro-in',
  'greensburg-metro-in',
  'brazil-metro-in',
  'scottsburg-metro-in',
  'monticello-metro-in',
  'winchester-metro-in',
  'connersville-metro-in',
  'starke-metro-in',
  'brookville-metro-in',
  'owen-metro-in',
  'sullivan-metro-in',
  'delphi-metro-in',
  'rochester-metro-in',
  'portland-metro-in',
  'rockport-metro-in',
  'paoli-metro-in',
  'tell-city-metro-in',
  'covington-metro-in',
  'rockville-metro-in',
  'rushville-metro-in',
  'nashville-metro-in',
  'newport-metro-in',
  'tipton-metro-in',
  'kentland-metro-in',
  'winamac-metro-in',
  'petersburg-metro-in',
  'hartford-city-metro-in',
  'english-metro-in',
  'vevay-metro-in',
  'shoals-metro-in',
  'fowler-metro-in',
  'williamsport-metro-in',
  'liberty-metro-in',
  'rising-sun-metro-in',
];

const assignmentsPath = 'data/indiana-county-assignments.ts';
const assignmentsContent = readFileSync(assignmentsPath, 'utf8');
const assignmentMap = new Map<string, string[]>();

const blockRegex = /  ('?[\w-]+'?): \[([\s\S]*?)\],/g;
let match: RegExpExecArray | null;
while ((match = blockRegex.exec(assignmentsContent)) !== null) {
  const slug = match[1].replace(/'/g, '');
  const ids = [...match[2].matchAll(/'([^']+)'/g)].map((m) => m[1]);
  assignmentMap.set(slug, ids);
}

for (const county of inCounties) {
  if (!assignmentMap.has(county.slug)) continue;
  const cap = county.slug === 'marion' ? MARION_CAP : TARGET_MOVERS;
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
for (const county of inCounties) {
  if (!assignmentMap.has(county.slug)) continue;
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
  `Updated ${assignmentMap.size} counties. Still under 5: ${under5}. Major under 10: ${majorUnder10}. Marion: ${assignmentMap.get('marion')?.length ?? 0} movers`
);