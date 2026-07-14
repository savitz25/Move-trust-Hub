/**
 * Rebuild Texas county → mover assignments from displayable catalog movers
 * that serve each region. Then sync badge counts to listed counts.
 *
 * Run:
 *   npx tsx scripts/rebuild-texas-county-movers.ts
 *   npx tsx scripts/sync-texas-badge-counts.ts
 */
import { writeFileSync } from 'node:fs';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { fullMoversCatalog } from '../lib/local-movers/catalog';
import { isCuratedMover } from '../lib/trust/curated-listing-policy';

/** Interstate / directory carriers that serve Texas */
const SERVES_ALL_TX = [
  'directory-allied-van-lines',
  'directory-united-van-lines',
  'directory-north-american-van-lines',
  'directory-mayflower-transit',
  'directory-jk-moving-services',
  'directory-safeway-moving',
  'directory-bekins-van-lines',
  'directory-atlas-van-lines',
  'directory-two-men-and-a-truck',
  'directory-pensey-moving',
  'directory-wheaton-world-wide',
  'directory-graebel-van-lines',
  'directory-gentle-giant-moving',
  'directory-arpin-van-lines',
  'directory-national-van-lines',
  'amerisafe-van-lines',
  'international-van-lines',
  'american-van-lines',
  'colonial-van-lines',
  'moving-apt',
] as const;

const HOUSTON = [
  'two-men-and-a-truck-houston',
  'two-men-and-a-truck-beaumont',
  'little-guys-movers-college-station',
  'huntsville-moving-inc',
  'two-men-and-a-truck-corpus-christi',
  'two-men-and-a-truck-austin',
  'two-men-and-a-truck-waco',
] as const;

const DFW = [
  'two-men-and-a-truck-dallas',
  'two-men-and-a-truck-fort-worth',
  'two-men-and-a-truck-denison',
  'two-men-and-a-truck-waco',
  'tyler-moving-storage',
  'two-men-and-a-truck-austin',
] as const;

const AUSTIN = [
  'two-men-and-a-truck-austin',
  'two-men-and-a-truck-san-antonio',
  'two-men-and-a-truck-waco',
  'little-guys-movers-college-station',
  'two-men-and-a-truck-houston',
] as const;

const SAN_ANTONIO = [
  'two-men-and-a-truck-san-antonio',
  'two-men-and-a-truck-austin',
  'two-men-and-a-truck-corpus-christi',
  'two-men-and-a-truck-waco',
] as const;

const EL_PASO = [
  'two-men-and-a-truck-el-paso',
  'texas-moving-company-midland',
  'two-men-and-a-truck-lubbock',
  'two-men-and-a-truck-san-antonio',
] as const;

const RIO_GRANDE = [
  'two-men-and-a-truck-mcallen',
  'two-men-and-a-truck-corpus-christi',
  'two-men-and-a-truck-san-antonio',
  'two-men-and-a-truck-austin',
] as const;

const CORPUS = [
  'two-men-and-a-truck-corpus-christi',
  'two-men-and-a-truck-mcallen',
  'two-men-and-a-truck-san-antonio',
  'two-men-and-a-truck-houston',
] as const;

const EAST_TX = [
  'tyler-moving-storage',
  'crossin-moving-lufkin',
  'two-men-and-a-truck-beaumont',
  'two-men-and-a-truck-dallas',
  'two-men-and-a-truck-denison',
] as const;

const PANHANDLE = [
  'two-men-and-a-truck-amarillo',
  'two-men-and-a-truck-lubbock',
  'texas-moving-company-midland',
  'two-men-and-a-truck-fort-worth',
] as const;

const PERMIAN = [
  'texas-moving-company-midland',
  'two-men-and-a-truck-lubbock',
  'two-men-and-a-truck-el-paso',
  'two-men-and-a-truck-amarillo',
] as const;

const WACO_CENTRAL = [
  'two-men-and-a-truck-waco',
  'two-men-and-a-truck-austin',
  'little-guys-movers-college-station',
  'two-men-and-a-truck-dallas',
  'two-men-and-a-truck-houston',
] as const;

const BEAUMONT = [
  'two-men-and-a-truck-beaumont',
  'two-men-and-a-truck-houston',
  'crossin-moving-lufkin',
  'little-guys-movers-college-station',
] as const;

/** Explicit county → regional locals (researched HQ / service area) */
const COUNTY_LOCALS: Record<string, readonly string[]> = {
  // Houston metro
  harris: HOUSTON,
  'fort-bend': HOUSTON,
  montgomery: HOUSTON,
  brazoria: HOUSTON,
  galveston: HOUSTON,
  liberty: HOUSTON,
  chambers: HOUSTON,
  waller: HOUSTON,
  walker: HOUSTON,
  austin: HOUSTON, // Austin County (Bellville), near Houston
  colorado: HOUSTON,
  wharton: HOUSTON,
  matagorda: HOUSTON,
  // DFW
  dallas: DFW,
  tarrant: DFW,
  collin: DFW,
  denton: DFW,
  rockwall: DFW,
  ellis: DFW,
  johnson: DFW,
  kaufman: DFW,
  parker: DFW,
  wise: DFW,
  hunt: DFW,
  hood: DFW,
  somervell: DFW,
  // Austin
  travis: AUSTIN,
  williamson: AUSTIN,
  hays: AUSTIN,
  bastrop: AUSTIN,
  caldwell: AUSTIN,
  blanco: AUSTIN,
  burnet: AUSTIN,
  llano: AUSTIN,
  // San Antonio
  bexar: SAN_ANTONIO,
  comal: SAN_ANTONIO,
  guadalupe: SAN_ANTONIO,
  medina: SAN_ANTONIO,
  atascosa: SAN_ANTONIO,
  bandera: SAN_ANTONIO,
  kendall: SAN_ANTONIO,
  wilson: SAN_ANTONIO,
  karnes: SAN_ANTONIO,
  // El Paso
  'el-paso': EL_PASO,
  hudspeth: EL_PASO,
  // Rio Grande Valley / Laredo
  hidalgo: RIO_GRANDE,
  cameron: RIO_GRANDE,
  willacy: RIO_GRANDE,
  starr: RIO_GRANDE,
  webb: RIO_GRANDE,
  zapata: RIO_GRANDE,
  'jim-hogg': RIO_GRANDE,
  // Coastal bend
  nueces: CORPUS,
  'san-patricio': CORPUS,
  aransas: CORPUS,
  kleberg: CORPUS,
  bee: CORPUS,
  refugio: CORPUS,
  // East Texas
  smith: EAST_TX,
  gregg: EAST_TX,
  angelina: EAST_TX,
  nacogdoches: EAST_TX,
  harrison: EAST_TX,
  bowie: EAST_TX,
  rusk: EAST_TX,
  cherokee: EAST_TX,
  panola: EAST_TX,
  shelby: EAST_TX,
  houston: EAST_TX, // Houston County (Crockett)
  anderson: EAST_TX,
  // Panhandle / South Plains
  potter: PANHANDLE,
  randall: PANHANDLE,
  lubbock: PANHANDLE,
  moore: PANHANDLE,
  hutchinson: PANHANDLE,
  gray: PANHANDLE,
  // Permian
  midland: PERMIAN,
  ector: PERMIAN,
  andrews: PERMIAN,
  martin: PERMIAN,
  howard: PERMIAN,
  // Central / Waco / Temple
  mclennan: WACO_CENTRAL,
  bell: WACO_CENTRAL,
  coryell: WACO_CENTRAL,
  falls: WACO_CENTRAL,
  milam: WACO_CENTRAL,
  robertson: WACO_CENTRAL,
  brazos: [...WACO_CENTRAL, 'little-guys-movers-college-station'],
  // Beaumont / Port Arthur
  jefferson: BEAUMONT,
  orange: BEAUMONT,
  hardin: BEAUMONT,
  jasper: BEAUMONT,
  // Other notable
  grayson: [...DFW, 'two-men-and-a-truck-denison'],
  cooke: DFW,
  fannin: DFW,
  collingsworth: PANHANDLE,
  'tom-green': PERMIAN,
  taylor: [...PERMIAN, 'two-men-and-a-truck-fort-worth'],
  wichita: [...DFW, 'two-men-and-a-truck-fort-worth'],
  victoria: CORPUS,
  'san-angelo': PERMIAN,
};

/** metro tag → region locals (fallback when county not in COUNTY_LOCALS) */
const METRO_LOCALS: Record<string, readonly string[]> = {
  'houston-tx': HOUSTON,
  'greater-houston': HOUSTON,
  'dfw-tx': DFW,
  'dfw-metro': DFW,
  'austin-sa-tx': [...AUSTIN, ...SAN_ANTONIO],
  'austin-metro': AUSTIN,
  'san-antonio-metro': SAN_ANTONIO,
  'rio-grande-tx': RIO_GRANDE,
  'el-paso-tx': EL_PASO,
  'permian-tx': PERMIAN,
  'panhandle-tx': PANHANDLE,
  'east-tx': EAST_TX,
  'rural-east-tx': EAST_TX,
  'rural-northeast-tx': [...EAST_TX, ...DFW],
  'rural-north-tx': DFW,
  'rural-panhandle-tx': PANHANDLE,
  'rural-west-tx': PERMIAN,
  'rural-south-tx': RIO_GRANDE,
  'rural-central-tx': WACO_CENTRAL,
  'rural-hill-country-tx': [...AUSTIN, ...SAN_ANTONIO],
  'texas-region-1': EAST_TX,
  'texas-region-2': WACO_CENTRAL,
  'texas-region-3': AUSTIN,
  'texas-region-4': SAN_ANTONIO,
  'texas-region-5': WACO_CENTRAL,
  'texas-region-6': HOUSTON,
};

function onlyDisplayable(ids: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) continue;
    seen.add(id);
    const mover = fullMoversCatalog[id];
    if (!mover) {
      console.warn(`  missing catalog: ${id}`);
      continue;
    }
    if (!isCuratedMover(mover)) {
      console.warn(`  not displayable: ${id}`);
      continue;
    }
    out.push(id);
  }
  return out;
}

function regionForMetro(metro?: string): readonly string[] {
  if (!metro) return WACO_CENTRAL;
  if (METRO_LOCALS[metro]) return METRO_LOCALS[metro];
  // Heuristics on messy metro tags
  if (/houston|galveston|brazos|beaumont/i.test(metro)) return HOUSTON;
  if (/dfw|dallas|fort.?worth|denton|collin/i.test(metro)) return DFW;
  if (/austin|travis|williamson|hays/i.test(metro)) return AUSTIN;
  if (/san.?antonio|bexar|comal/i.test(metro)) return SAN_ANTONIO;
  if (/el.?paso/i.test(metro)) return EL_PASO;
  if (/rio|mcallen|laredo|hidalgo|cameron|brownsville/i.test(metro)) return RIO_GRANDE;
  if (/corpus|nueces|coastal/i.test(metro)) return CORPUS;
  if (/panhandle|amarillo|lubbock/i.test(metro)) return PANHANDLE;
  if (/permian|midland|odessa/i.test(metro)) return PERMIAN;
  if (/east|tyler|lufkin|longview/i.test(metro)) return EAST_TX;
  if (/rural-west/i.test(metro)) return PERMIAN;
  if (/rural-south/i.test(metro)) return RIO_GRANDE;
  if (/rural-north/i.test(metro)) return DFW;
  if (/rural-panhandle/i.test(metro)) return PANHANDLE;
  if (/rural-east/i.test(metro)) return EAST_TX;
  if (/texas-region/i.test(metro)) return WACO_CENTRAL;
  return WACO_CENTRAL;
}

function buildCountyMovers(countySlug: string, metro?: string): string[] {
  const ordered: string[] = [];

  if (COUNTY_LOCALS[countySlug]) {
    ordered.push(...COUNTY_LOCALS[countySlug]);
  } else {
    ordered.push(...regionForMetro(metro));
  }

  ordered.push(...SERVES_ALL_TX);
  return onlyDisplayable(ordered);
}

function main() {
  const counties = getCountiesForState('texas');
  const assignments: Record<string, string[]> = {};
  const counts: Record<string, number> = {};

  for (const county of counties) {
    const ids = buildCountyMovers(county.slug, county.metro);
    assignments[county.slug] = ids;
    counts[county.slug] = ids.length;
    console.log(
      `${county.slug.padEnd(18)} ${String(ids.length).padStart(2)} movers`
    );
  }

  const assignmentLines = Object.keys(assignments)
    .sort()
    .map((slug) => {
      const key = /[^a-z0-9]/.test(slug) ? `'${slug}'` : slug;
      const body = assignments[slug].map((id) => `    '${id}',`).join('\n');
      return `  ${key}: [\n${body}\n  ],`;
    })
    .join('\n');

  const assignmentFile = `import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/**
 * Texas county → displayable mover assignments.
 * Rebuilt by: npx tsx scripts/rebuild-texas-county-movers.ts
 *
 * Only includes movers that pass curated listing policy (verified / directory-linked).
 * Badge counts on /local-movers/texas must match these listed sets.
 */
const CURATED_TX_COUNTIES: Record<string, string[]> = {
${assignmentLines}
};

export const texasCountyMoverAssignments: CountyMoverAssignment[] = Object.entries(
  CURATED_TX_COUNTIES
).map(([countySlug, moverIds]) => ({
  stateSlug: 'texas',
  countySlug,
  moverIds,
}));
`;

  writeFileSync('data/texas-county-assignments.ts', assignmentFile);

  writeFileSync(
    'scripts/output/tx-county-mover-counts.json',
    JSON.stringify(counts, null, 2)
  );

  const values = Object.values(counts);
  console.log('\n--- Summary ---');
  console.log(
    `Counties: ${values.length}, min: ${Math.min(...values)}, max: ${Math.max(...values)}, avg: ${(values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)}`
  );
  console.log(
    `Harris=${counts.harris}, Dallas=${counts.dallas}, Travis=${counts.travis}, Bexar=${counts.bexar}`
  );
  console.log('Wrote data/texas-county-assignments.ts');
}

main();
