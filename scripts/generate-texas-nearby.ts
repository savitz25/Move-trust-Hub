/**
 * Generate TX county adjacency map from Census GeoJSON.
 * Run: npx tsx scripts/generate-texas-nearby.ts > /tmp/tx-neighbors.txt
 */
import { readFileSync, writeFileSync } from 'fs';
import { generatedCounties } from '../data/generated/index';


type GeoFeature = {
  properties: { STATE: string; NAME: string };
  geometry: { type: string; coordinates: number[][][] | number[][][][] };
};

const geo = JSON.parse(
  readFileSync('data/us-counties-fips.json', 'utf8')
) as { features: GeoFeature[] };

const texasCounties = generatedCounties.filter((c) => c.stateSlug === 'texas');
const slugByName = new Map(texasCounties.map((c) => [c.name.toUpperCase(), c.slug]));

function flattenCoords(
  geometry: GeoFeature['geometry']
): number[][] {
  if (geometry.type === 'Polygon') {
    return (geometry.coordinates as number[][][]).flat();
  }
  return (geometry.coordinates as number[][][][]).flat(2);
}

function quantize([lng, lat]: number[]): string {
  return `${lng.toFixed(4)},${lat.toFixed(4)}`;
}

const txFeatures = geo.features.filter((f) => f.properties.STATE === '48');
const pointsByCounty = new Map<string, Set<string>>();
const slugByFipsName = new Map<string, string>();

for (const feature of txFeatures) {
  const name = feature.properties.NAME.toUpperCase();
  const slug = slugByName.get(name);
  if (!slug) continue;
  slugByFipsName.set(name, slug);
  const pts = new Set(flattenCoords(feature.geometry).map(quantize));
  pointsByCounty.set(slug, pts);
}

const neighbors = new Map<string, Set<string>>();

for (const [slugA, ptsA] of pointsByCounty) {
  const adj = new Set<string>();
  for (const [slugB, ptsB] of pointsByCounty) {
    if (slugA === slugB) continue;
    for (const p of ptsA) {
      if (ptsB.has(p)) {
        adj.add(slugB);
        break;
      }
    }
  }
  neighbors.set(slugA, adj);
}

const lines: string[] = [];
for (const county of texasCounties.sort((a, b) => a.slug.localeCompare(b.slug))) {
  const adj = [...(neighbors.get(county.slug) ?? [])].sort().slice(0, 6);
  const key = county.slug.includes('-') ? `'${county.slug}'` : county.slug;
  lines.push(`  ${key}: [${adj.map((s) => `'${s}'`).join(', ')}],`);
}

const missing = texasCounties.filter((c) => !(neighbors.get(c.slug)?.size));
console.error(`Counties with 0 neighbors: ${missing.length}`);
if (missing.length) {
  console.error(missing.map((c) => c.slug).join(', '));
}

const outPath = 'lib/local-movers/texas-nearby.generated.ts';
writeFileSync(
  outPath,
  `/** AUTO-GENERATED — run scripts/generate-texas-nearby.ts to refresh */\nexport const TX_COUNTY_NEIGHBORS_GENERATED: Record<string, string[]> = {\n${lines.join('\n')}\n};\n`
);
console.error(`Wrote ${outPath} with ${lines.length} counties`);