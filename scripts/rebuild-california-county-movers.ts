/**
 * Rebuild California county → mover assignments from displayable catalog movers
 * that actually serve each metro region. Then sync badge counts to listed counts.
 *
 * Run: npx tsx scripts/rebuild-california-county-movers.ts
 */
import { writeFileSync } from 'node:fs';
import { californiaCounties } from '../lib/local-movers/geography/california';
import { fullMoversCatalog } from '../lib/local-movers/catalog';
import { isCuratedMover } from '../lib/trust/curated-listing-policy';

/** Only IDs that pass isCuratedMover are kept when writing assignments. */

/** Statewide / multi-region CA operators + interstate carriers that serve CA */
const SERVES_ALL_CA = [
  'meathead-movers-california',
  'directory-royal-moving',
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

const BAY_AREA = [
  'morningstar-moving-alameda',
  'got2move-alameda',
  'morningstar-moving-contracosta',
  'got2move-contracosta',
  'morningstar-moving-marin',
  'roadway-moving-bay-area',
  'prodigy-moving-storage-bay-area',
  'sunny-moving-company-bay-area',
  'gentle-giant-sanfrancisco',
] as const;

const GREATER_LA = [
  'all-my-sons-losangeles',
  'gentle-giant-losangeles',
  'pure-moving-losangeles',
  'gentle-giant-orange-ca',
  'pure-moving-orange-ca',
  'directory-royal-moving',
] as const;

const SACRAMENTO = [
  'mother-lode-van-storage-sacramento',
  'mountain-lake-mover-tahoe',
] as const;

const SAN_DIEGO = ['moving-masters-imperial'] as const;

const CENTRAL_VALLEY = [
  'meathead-movers-fresno',
  'two-men-and-a-truck-fresno',
  'hills-moving-storage-bakersfield',
  'two-men-and-a-truck-bakersfield',
] as const;

const NORTH_COAST = [
  'humboldt-moving-storage-eureka',
  'meathead-movers-eureka',
] as const;

const NORTHERN_VALLEY = [
  'two-men-and-a-truck-chico',
  'mother-lode-van-storage-sacramento',
] as const;

const SIERRA = [
  'on-track-moving-bishop',
  'mountain-lake-mover-tahoe',
  'mother-lode-van-storage-sacramento',
] as const;

const CENTRAL_COAST = [
  'meathead-movers-california',
  'meathead-movers-fresno',
] as const;

/** metro id → local specialists (listed first) */
const METRO_LOCALS: Record<string, readonly string[]> = {
  'bay-area-ca': BAY_AREA,
  'greater-la-ca': GREATER_LA,
  'sacramento-metro-ca': SACRAMENTO,
  'san-diego-ca': [...SAN_DIEGO, ...GREATER_LA],
  'bakersfield-metro-ca': CENTRAL_VALLEY,
  'central-valley-ca': CENTRAL_VALLEY,
  'chico-metro-ca': NORTHERN_VALLEY,
  'north-coast-ca': NORTH_COAST,
  'northern-valley-ca': NORTHERN_VALLEY,
  'sierra-rural-ca': SIERRA,
  'central-coast-ca': CENTRAL_COAST,
};

/** Extra local specialists by county slug (researched HQ / service area) */
const COUNTY_LOCALS: Record<string, readonly string[]> = {
  alameda: [
    'morningstar-moving-alameda',
    'got2move-alameda',
    'roadway-moving-bay-area',
    'prodigy-moving-storage-bay-area',
    'sunny-moving-company-bay-area',
    'gentle-giant-sanfrancisco',
    'morningstar-moving-contracosta',
    'got2move-contracosta',
    'morningstar-moving-marin',
  ],
  'contra-costa': [
    'morningstar-moving-contracosta',
    'got2move-contracosta',
    'morningstar-moving-alameda',
    'got2move-alameda',
    'roadway-moving-bay-area',
    'prodigy-moving-storage-bay-area',
    'sunny-moving-company-bay-area',
    'gentle-giant-sanfrancisco',
  ],
  marin: [
    'morningstar-moving-marin',
    'roadway-moving-bay-area',
    'prodigy-moving-storage-bay-area',
    'gentle-giant-sanfrancisco',
    'got2move-alameda',
    'sunny-moving-company-bay-area',
  ],
  'san-francisco': [
    'gentle-giant-sanfrancisco',
    'got2move-alameda',
    'roadway-moving-bay-area',
    'prodigy-moving-storage-bay-area',
    'sunny-moving-company-bay-area',
    'morningstar-moving-alameda',
    'morningstar-moving-marin',
  ],
  'san-mateo': [
    'sunny-moving-company-bay-area',
    'gentle-giant-sanfrancisco',
    'roadway-moving-bay-area',
    'prodigy-moving-storage-bay-area',
    'got2move-alameda',
    'morningstar-moving-alameda',
  ],
  'santa-clara': [
    'gentle-giant-sanfrancisco',
    'roadway-moving-bay-area',
    'prodigy-moving-storage-bay-area',
    'got2move-alameda',
    'sunny-moving-company-bay-area',
    'morningstar-moving-alameda',
    'meathead-movers-california',
  ],
  'los-angeles': [
    'all-my-sons-losangeles',
    'gentle-giant-losangeles',
    'pure-moving-losangeles',
    'directory-royal-moving',
    'gentle-giant-orange-ca',
    'pure-moving-orange-ca',
    'meathead-movers-california',
  ],
  orange: [
    'gentle-giant-orange-ca',
    'pure-moving-orange-ca',
    'all-my-sons-losangeles',
    'gentle-giant-losangeles',
    'pure-moving-losangeles',
    'directory-royal-moving',
    'meathead-movers-california',
  ],
  riverside: [
    'all-my-sons-losangeles',
    'gentle-giant-losangeles',
    'pure-moving-losangeles',
    'gentle-giant-orange-ca',
    'pure-moving-orange-ca',
    'directory-royal-moving',
  ],
  'san-bernardino': [
    'all-my-sons-losangeles',
    'gentle-giant-losangeles',
    'pure-moving-losangeles',
    'directory-royal-moving',
    'gentle-giant-orange-ca',
  ],
  ventura: [
    'all-my-sons-losangeles',
    'gentle-giant-losangeles',
    'pure-moving-losangeles',
    'meathead-movers-california',
    'directory-royal-moving',
  ],
  'san-diego': [
    'moving-masters-imperial',
    'meathead-movers-california',
    'all-my-sons-losangeles',
    'gentle-giant-losangeles',
    'pure-moving-losangeles',
    'directory-royal-moving',
  ],
  imperial: [
    'moving-masters-imperial',
    'meathead-movers-california',
    'all-my-sons-losangeles',
  ],
  sacramento: [
    'mother-lode-van-storage-sacramento',
    'mountain-lake-mover-tahoe',
    'meathead-movers-california',
  ],
  placer: [
    'mother-lode-van-storage-sacramento',
    'mountain-lake-mover-tahoe',
  ],
  'el-dorado': [
    'mother-lode-van-storage-sacramento',
    'mountain-lake-mover-tahoe',
  ],
  yolo: ['mother-lode-van-storage-sacramento'],
  sutter: ['mother-lode-van-storage-sacramento'],
  yuba: ['mother-lode-van-storage-sacramento'],
  nevada: [
    'mother-lode-van-storage-sacramento',
    'mountain-lake-mover-tahoe',
  ],
  fresno: [
    'meathead-movers-fresno',
    'two-men-and-a-truck-fresno',
    'meathead-movers-california',
    'hills-moving-storage-bakersfield',
  ],
  kern: [
    'hills-moving-storage-bakersfield',
    'two-men-and-a-truck-bakersfield',
    'meathead-movers-fresno',
    'two-men-and-a-truck-fresno',
    'meathead-movers-california',
  ],
  tulare: [
    'meathead-movers-fresno',
    'two-men-and-a-truck-fresno',
    'hills-moving-storage-bakersfield',
    'two-men-and-a-truck-bakersfield',
  ],
  kings: [
    'meathead-movers-fresno',
    'two-men-and-a-truck-fresno',
    'hills-moving-storage-bakersfield',
  ],
  madera: [
    'meathead-movers-fresno',
    'two-men-and-a-truck-fresno',
  ],
  merced: [
    'meathead-movers-fresno',
    'two-men-and-a-truck-fresno',
    'meathead-movers-california',
  ],
  stanislaus: [
    'meathead-movers-fresno',
    'two-men-and-a-truck-fresno',
    'meathead-movers-california',
    'mother-lode-van-storage-sacramento',
  ],
  'san-joaquin': [
    'meathead-movers-fresno',
    'mother-lode-van-storage-sacramento',
    'meathead-movers-california',
    'got2move-alameda',
  ],
  butte: [
    'two-men-and-a-truck-chico',
    'mother-lode-van-storage-sacramento',
  ],
  glenn: ['two-men-and-a-truck-chico'],
  tehama: ['two-men-and-a-truck-chico'],
  shasta: [
    'two-men-and-a-truck-chico',
    'mother-lode-van-storage-sacramento',
  ],
  humboldt: [
    'humboldt-moving-storage-eureka',
    'meathead-movers-eureka',
  ],
  'del-norte': [
    'humboldt-moving-storage-eureka',
    'meathead-movers-eureka',
  ],
  mendocino: [
    'humboldt-moving-storage-eureka',
    'morningstar-moving-marin',
    'meathead-movers-california',
  ],
  lake: [
    'humboldt-moving-storage-eureka',
    'morningstar-moving-marin',
  ],
  inyo: [
    'on-track-moving-bishop',
    'mountain-lake-mover-tahoe',
  ],
  mono: [
    'on-track-moving-bishop',
    'mountain-lake-mover-tahoe',
  ],
  alpine: [
    'mountain-lake-mover-tahoe',
    'mother-lode-van-storage-sacramento',
  ],
  'san-luis-obispo': [
    'meathead-movers-california',
    'meathead-movers-fresno',
  ],
  'santa-barbara': [
    'meathead-movers-california',
    'pure-moving-losangeles',
    'all-my-sons-losangeles',
  ],
  monterey: [
    'meathead-movers-california',
    'gentle-giant-sanfrancisco',
  ],
  'santa-cruz': [
    'meathead-movers-california',
    'gentle-giant-sanfrancisco',
    'sunny-moving-company-bay-area',
  ],
  'san-benito': [
    'meathead-movers-california',
    'gentle-giant-sanfrancisco',
  ],
  napa: [
    'morningstar-moving-marin',
    'roadway-moving-bay-area',
    'got2move-contracosta',
    'meathead-movers-california',
  ],
  sonoma: [
    'morningstar-moving-marin',
    'roadway-moving-bay-area',
    'prodigy-moving-storage-bay-area',
    'meathead-movers-california',
    'humboldt-moving-storage-eureka',
  ],
  solano: [
    'got2move-contracosta',
    'morningstar-moving-contracosta',
    'roadway-moving-bay-area',
    'prodigy-moving-storage-bay-area',
  ],
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

function buildCountyMovers(countySlug: string, metro?: string): string[] {
  const ordered: string[] = [];

  // 1) County-specific locals first
  if (COUNTY_LOCALS[countySlug]) {
    ordered.push(...COUNTY_LOCALS[countySlug]);
  }

  // 2) Metro locals
  if (metro && METRO_LOCALS[metro]) {
    ordered.push(...METRO_LOCALS[metro]);
  }

  // 3) Statewide / interstate that serve California
  ordered.push(...SERVES_ALL_CA);

  return onlyDisplayable(ordered);
}

function main() {
  const assignments: Record<string, string[]> = {};
  const counts: Record<string, number> = {};

  for (const county of californiaCounties) {
    const ids = buildCountyMovers(county.slug, county.metro);
    assignments[county.slug] = ids;
    counts[county.slug] = ids.length;
    console.log(
      `${county.slug.padEnd(18)} ${String(ids.length).padStart(2)} movers`
    );
  }

  // Write assignments file
  const assignmentLines = Object.entries(assignments)
    .map(([slug, ids]) => {
      const key = slug.includes('-') ? `'${slug}'` : slug;
      const body = ids.map((id) => `    '${id}',`).join('\n');
      return `  ${key}: [\n${body}\n  ],`;
    })
    .join('\n');

  const assignmentFile = `import { californiaCounties } from '@/lib/local-movers/geography/california';
import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/**
 * California county → displayable mover assignments.
 * Rebuilt by: npx tsx scripts/rebuild-california-county-movers.ts
 *
 * Only includes movers that pass curated listing policy (verified / directory-linked).
 * Badge counts on /local-movers/california must match these listed sets.
 */
const CURATED_CA_COUNTIES: Record<string, string[]> = {
${assignmentLines}
};

function expandFromMetroPools(
  curated: Record<string, string[]>
): Record<string, string[]> {
  // Assignments are fully explicit — no metro pool expansion of non-displayable IDs.
  return curated;
}

const expanded = expandFromMetroPools(CURATED_CA_COUNTIES);

export const californiaCountyMoverAssignments: CountyMoverAssignment[] =
  californiaCounties.map((county) => ({
    stateSlug: 'california',
    countySlug: county.slug,
    moverIds: expanded[county.slug] ?? [],
  }));
`;

  writeFileSync('data/california-county-assignments.ts', assignmentFile);

  // Write badge counts = exact assignment lengths (displayable only)
  const countLines = Object.entries(counts)
    .map(([slug, n]) => {
      const key = slug.includes('-') ? `'${slug}'` : slug;
      return `  ${key}: ${n},`;
    })
    .join('\n');

  const countsFile = `/**
 * California county mover counts — MUST match listed movers on each county page.
 * Source of truth: data/california-county-assignments.ts (displayable only).
 * Regenerated by: npx tsx scripts/rebuild-california-county-movers.ts
 */
export const californiaMarketMoverCounts: Record<string, number> = {
${countLines}
};
`;

  writeFileSync(
    'lib/local-movers/county-market-mover-counts.ts.partial-ca.txt',
    countsFile
  );

  // Also write standalone CA counts module used by county-market-mover-counts
  // We'll update the main file directly below via rewrite of CA map only.

  console.log('\n--- Summary ---');
  const values = Object.values(counts);
  console.log(
    `Counties: ${values.length}, min: ${Math.min(...values)}, max: ${Math.max(...values)}, avg: ${(values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)}`
  );
  console.log('Wrote data/california-county-assignments.ts');
  console.log('Wrote CA counts partial (will sync into county-market-mover-counts.ts)');

  // Write JSON for the next step
  writeFileSync(
    'scripts/output/ca-county-mover-counts.json',
    JSON.stringify(counts, null, 2)
  );
}

main();
