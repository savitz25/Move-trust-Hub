/**
 * One-shot script: expand TX curated assignments to minimum 5 movers (10 for major metros).
 * Run: npx tsx scripts/apply-texas-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { generatedCounties } from '../data/generated/index';
import { applyTexasCountyOverrides } from '../lib/local-movers/geography/texas-overrides';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const texasCounties = generatedCounties
  .filter((c) => c.stateSlug === 'texas')
  .map(applyTexasCountyOverrides);

const MAJOR = new Set([
  'harris',
  'dallas',
  'tarrant',
  'bexar',
  'travis',
  'collin',
  'denton',
  'fort-bend',
  'el-paso',
  'hidalgo',
  'cameron',
  'nueces',
  'lubbock',
  'brazoria',
  'williamson',
  'montgomery',
  'galveston',
  'bell',
  'hays',
  'webb',
  'mclennan',
  'jefferson',
  'smith',
  'comal',
  'kaufman',
  'johnson',
  'ellis',
  'brazos',
]);

/** Primary metro pool for high-traffic / metro counties */
const COUNTY_PRIMARY_POOL: Record<string, string> = {
  anderson: 'east-tx',
  angelina: 'east-tx',
  aransas: 'rio-grande-tx',
  atascosa: 'austin-sa-tx',
  bastrop: 'austin-sa-tx',
  bee: 'rio-grande-tx',
  bell: 'austin-sa-tx',
  bexar: 'austin-sa-tx',
  blanco: 'austin-sa-tx',
  bosque: 'austin-sa-tx',
  bowie: 'east-tx',
  brazoria: 'houston-tx',
  brazos: 'austin-sa-tx',
  brewster: 'el-paso-tx',
  burleson: 'austin-sa-tx',
  burnet: 'austin-sa-tx',
  caldwell: 'austin-sa-tx',
  cameron: 'rio-grande-tx',
  chambers: 'houston-tx',
  cherokee: 'east-tx',
  collin: 'dfw-tx',
  comal: 'austin-sa-tx',
  cooke: 'dfw-tx',
  coryell: 'austin-sa-tx',
  culberson: 'el-paso-tx',
  dallas: 'dfw-tx',
  denton: 'dfw-tx',
  'el-paso': 'el-paso-tx',
  ellis: 'dfw-tx',
  erath: 'dfw-tx',
  falls: 'austin-sa-tx',
  'fort-bend': 'houston-tx',
  freestone: 'east-tx',
  galveston: 'houston-tx',
  gillespie: 'austin-sa-tx',
  grayson: 'dfw-tx',
  gregg: 'east-tx',
  guadalupe: 'austin-sa-tx',
  hardin: 'houston-tx',
  harris: 'houston-tx',
  hays: 'austin-sa-tx',
  henderson: 'east-tx',
  hidalgo: 'rio-grande-tx',
  hood: 'dfw-tx',
  houston: 'east-tx',
  hudspeth: 'el-paso-tx',
  hunt: 'dfw-tx',
  jackson: 'houston-tx',
  jasper: 'east-tx',
  jefferson: 'houston-tx',
  johnson: 'dfw-tx',
  karnes: 'austin-sa-tx',
  kaufman: 'dfw-tx',
  kendall: 'austin-sa-tx',
  kerr: 'austin-sa-tx',
  kleberg: 'rio-grande-tx',
  lampasas: 'austin-sa-tx',
  leon: 'austin-sa-tx',
  liberty: 'houston-tx',
  llano: 'austin-sa-tx',
  lubbock: 'panhandle-tx',
  madison: 'austin-sa-tx',
  matagorda: 'houston-tx',
  mclennan: 'austin-sa-tx',
  medina: 'austin-sa-tx',
  midland: 'permian-tx',
  milam: 'austin-sa-tx',
  montgomery: 'houston-tx',
  nacogdoches: 'east-tx',
  navarro: 'dfw-tx',
  nueces: 'rio-grande-tx',
  orange: 'houston-tx',
  'palo-pinto': 'dfw-tx',
  parker: 'dfw-tx',
  polk: 'east-tx',
  potter: 'panhandle-tx',
  randall: 'panhandle-tx',
  rockwall: 'dfw-tx',
  rusk: 'east-tx',
  'san-jacinto': 'houston-tx',
  'san-patricio': 'rio-grande-tx',
  smith: 'east-tx',
  tarrant: 'dfw-tx',
  taylor: 'rural-north-tx',
  'tom-green': 'permian-tx',
  travis: 'austin-sa-tx',
  trinity: 'east-tx',
  tyler: 'east-tx',
  upshur: 'east-tx',
  uvalde: 'austin-sa-tx',
  'van-zandt': 'dfw-tx',
  victoria: 'rio-grande-tx',
  walker: 'houston-tx',
  waller: 'houston-tx',
  webb: 'rio-grande-tx',
  wharton: 'houston-tx',
  williamson: 'austin-sa-tx',
  wilson: 'austin-sa-tx',
  wise: 'dfw-tx',
  wood: 'east-tx',
};

const MOVER_TO_POOL: Record<string, string> = {
  'two-men-and-a-truck-houston': 'houston-tx',
  'houston-local-lines': 'houston-tx',
  'beaumont-area-moving': 'houston-tx',
  'huntsville-moving-inc': 'houston-tx',
  'two-men-and-a-truck-beaumont': 'houston-tx',
  'two-men-and-a-truck-dallas': 'dfw-tx',
  'two-men-and-a-truck-fort-worth': 'dfw-tx',
  'dallas-area-moving': 'dfw-tx',
  'fort-worth-area-moving': 'dfw-tx',
  'two-men-and-a-truck-denison': 'dfw-tx',
  'around-town-movers-gainesville-tx': 'dfw-tx',
  'two-men-and-a-truck-austin': 'austin-sa-tx',
  'college-hunks-moving-austin': 'austin-sa-tx',
  'two-men-and-a-truck-san-antonio': 'austin-sa-tx',
  'college-hunks-moving-san-antonio': 'austin-sa-tx',
  'san-antonio-area-moving': 'austin-sa-tx',
  'central-texas-movers-killeen': 'austin-sa-tx',
  'two-men-and-a-truck-waco': 'austin-sa-tx',
  'college-hunks-moving-waco': 'austin-sa-tx',
  'two-men-and-a-truck-mcallen': 'rio-grande-tx',
  'two-men-and-a-truck-brownsville': 'rio-grande-tx',
  'south-texas-moving-laredo': 'rio-grande-tx',
  'laredo-area-moving': 'rio-grande-tx',
  'allied-van-lines-laredo': 'rio-grande-tx',
  'two-men-and-a-truck-corpus-christi': 'rio-grande-tx',
  'corpus-christi-area-moving': 'rio-grande-tx',
  'two-men-and-a-truck-el-paso': 'el-paso-tx',
  'king-moving-company-el-paso': 'el-paso-tx',
  'all-my-sons-el-paso': 'el-paso-tx',
  'el-paso-area-moving': 'el-paso-tx',
  'carlsbad-nm-area-moving': 'el-paso-tx',
  'alpine-area-moving': 'el-paso-tx',
  'texas-moving-company-midland': 'permian-tx',
  'brothers-moving-odessa': 'permian-tx',
  'midland-area-moving': 'permian-tx',
  'odessa-area-moving': 'permian-tx',
  'two-men-and-a-truck-lubbock': 'panhandle-tx',
  'hart-moving-storage-lubbock': 'panhandle-tx',
  'lubbock-area-moving': 'panhandle-tx',
  'two-men-and-a-truck-amarillo': 'panhandle-tx',
  'aardvark-movers-amarillo': 'panhandle-tx',
  'amarillo-area-moving': 'panhandle-tx',
  'tyler-moving-storage': 'east-tx',
  'higgs-moving-longview': 'east-tx',
  'crossin-moving-lufkin': 'east-tx',
};

const FALLBACK_POOLS = [
  'houston-tx',
  'dfw-tx',
  'austin-sa-tx',
  'rio-grande-tx',
  'el-paso-tx',
  'permian-tx',
  'panhandle-tx',
  'east-tx',
  'rural-west-tx',
  'rural-south-tx',
  'rural-hill-country-tx',
  'rural-north-tx',
  'rural-panhandle-tx',
  'rural-central-tx',
  'rural-east-tx',
  'rural-northeast-tx',
];

const MIN_MOVERS = 5;
const MAJOR_TARGET = 10;

function getPrimaryPool(
  countySlug: string,
  metro: string | undefined,
  existingIds: string[]
): string {
  if (COUNTY_PRIMARY_POOL[countySlug]) return COUNTY_PRIMARY_POOL[countySlug];
  if (metro?.startsWith('rural-')) return metro;
  for (const id of existingIds) {
    const pool = MOVER_TO_POOL[id];
    if (pool) return pool;
  }
  return 'rural-central-tx';
}

// Parse current assignments from file
const assignmentsPath = 'data/texas-county-assignments.ts';
const assignmentsContent = readFileSync(assignmentsPath, 'utf8');
const assignmentMap = new Map<string, string[]>();

const blockRegex = /  ('?[\w-]+'?): \[([\s\S]*?)\],/g;
let match: RegExpExecArray | null;
while ((match = blockRegex.exec(assignmentsContent)) !== null) {
  const slug = match[1].replace(/'/g, '');
  const ids = [...match[2].matchAll(/'([^']+)'/g)].map((m) => m[1]);
  assignmentMap.set(slug, ids);
}

for (const county of texasCounties) {
  const target = MAJOR.has(county.slug) ? MAJOR_TARGET : MIN_MOVERS;
  const ids = [...(assignmentMap.get(county.slug) ?? [])];
  const existing = new Set(ids);

  const primaryPool = getPrimaryPool(county.slug, county.metro, ids);
  const poolOrder = [
    primaryPool,
    ...(county.metro?.startsWith('rural-') && county.metro !== primaryPool
      ? [county.metro]
      : []),
    ...FALLBACK_POOLS,
  ];

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
for (const county of texasCounties) {
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