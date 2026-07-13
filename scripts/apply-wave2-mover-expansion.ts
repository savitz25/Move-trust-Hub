/**
 * Wave 2 Phase A: FMCSA-verified mover packs for Wave 1 metros + high-empty states.
 * Run: node .\node_modules\tsx\dist\cli.mjs scripts/apply-wave2-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { DEEP_COUNTY_UPGRADE_WAVE_1 } from '../data/deep-county-research';
import { buildMetroMoverPack } from '../lib/local-movers/build-metro-mover-pack';
import { getMoversForCounty } from '../lib/local-movers/index';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const WAVE1_KEYS = new Set(
  DEEP_COUNTY_UPGRADE_WAVE_1.map((p) => `${p.stateSlug}/${p.countySlug}`)
);

const WAVE2_MOVER_STATES = [
  'virginia',
  'kentucky',
  'missouri',
  'kansas',
  'illinois',
  'indiana',
  'nebraska',
  'iowa',
] as const;

const STATE_FILES: Record<string, { path: string; blockName: string }> = {
  virginia: { path: 'data/virginia-county-assignments.ts', blockName: 'CURATED_VA_COUNTIES' },
  kentucky: { path: 'data/kentucky-county-assignments.ts', blockName: 'CURATED_KY_COUNTIES' },
  missouri: { path: 'data/missouri-county-assignments.ts', blockName: 'CURATED_MO_COUNTIES' },
  kansas: { path: 'data/kansas-county-assignments.ts', blockName: 'CURATED_KS_COUNTIES' },
  illinois: { path: 'data/illinois-county-assignments.ts', blockName: 'CURATED_IL_COUNTIES' },
  indiana: { path: 'data/indiana-county-assignments.ts', blockName: 'CURATED_IN_COUNTIES' },
  nebraska: { path: 'data/nebraska-county-assignments.ts', blockName: 'CURATED_NE_COUNTIES' },
  iowa: { path: 'data/iowa-county-assignments.ts', blockName: 'CURATED_IA_COUNTIES' },
};

const MIN_DISPLAYABLE = 8;
const WAVE1_PACK_SIZE = 12;
const BULK_PACK_SIZE = 10;

function parseBlock(file: string, blockName: string): Record<string, string[]> {
  const regex = new RegExp(`const ${blockName}[^=]*=\\s*(\\{[\\s\\S]*?\\n\\});`);
  const match = file.match(regex);
  if (!match) throw new Error(`Could not parse ${blockName}`);
  return eval(`(${match[1]})`) as Record<string, string[]>;
}

function formatBlock(blockName: string, counties: Record<string, string[]>): string {
  const lines = Object.entries(counties)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([slug, ids]) => {
      const key = slug.includes('-') || slug.includes('.') ? `'${slug}'` : slug;
      const idLines = ids.map((id) => `    '${id}',`).join('\n');
      return `  ${key}: [\n${idLines}\n  ],`;
    });
  return `const ${blockName}: Record<string, string[]> = {\n${lines.join('\n')}\n};`;
}

function usdotCoverage(ids: string[]): number {
  const movers = ids.map((id) => fullMoversCatalog[id]).filter(Boolean);
  if (!movers.length) return 0;
  return movers.filter((m) => Boolean(m.usdotNumber)).length / movers.length;
}

let updated = 0;
let wave1Updated = 0;

for (const stateSlug of WAVE2_MOVER_STATES) {
  const meta = STATE_FILES[stateSlug];
  const file = readFileSync(meta.path, 'utf8');
  const counties = parseBlock(file, meta.blockName);

  for (const countySlug of Object.keys(counties)) {
    const key = `${stateSlug}/${countySlug}`;
    const isWave1 = WAVE1_KEYS.has(key);
    const currentCount = getMoversForCounty(stateSlug, countySlug)?.movers.length ?? 0;
    const targetSize = isWave1 ? WAVE1_PACK_SIZE : BULK_PACK_SIZE;

    if (!isWave1 && currentCount >= MIN_DISPLAYABLE) continue;

    const pack = buildMetroMoverPack(stateSlug, countySlug, targetSize);
    if (pack.length < MIN_DISPLAYABLE) {
      console.warn(`SKIP ${key}: pack only ${pack.length}`);
      continue;
    }

    counties[countySlug] = pack;
    updated += 1;
    if (isWave1) wave1Updated += 1;

    const coverage = (usdotCoverage(pack) * 100).toFixed(0);
    console.log(`OK ${key}: ${pack.length} movers (${coverage}% USDOT)`);
  }

  const block = formatBlock(meta.blockName, counties);
  const regex = new RegExp(`const ${meta.blockName}[^=]*=\\s*\\{[\\s\\S]*?\\n\\};`);
  writeFileSync(meta.path, file.replace(regex, block));
  console.log(`Wrote ${meta.path}\n`);
}

console.log(`Done. Updated ${updated} counties (${wave1Updated} Wave 1 metros).`);