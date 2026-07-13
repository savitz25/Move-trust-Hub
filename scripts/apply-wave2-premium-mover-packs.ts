/**
 * Wave 2 Phase A (premium metros): FMCSA packs for TX/PA/OH/NC deep-content counties.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { DEEP_COUNTY_UPGRADE_WAVE_2 } from '../data/deep-county-research';
import { buildMetroMoverPack } from '../lib/local-movers/build-metro-mover-pack';

const STATE_FILES: Record<string, { path: string; blockName: string }> = {
  texas: { path: 'data/texas-county-assignments.ts', blockName: 'CURATED_TX_COUNTIES' },
  pennsylvania: { path: 'data/pennsylvania-county-assignments.ts', blockName: 'CURATED_PA_COUNTIES' },
  ohio: { path: 'data/ohio-county-assignments.ts', blockName: 'CURATED_OH_COUNTIES' },
  'north-carolina': {
    path: 'data/north-carolina-county-assignments.ts',
    blockName: 'CURATED_NC_COUNTIES',
  },
};

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

const loaded = new Map<string, { file: string; meta: (typeof STATE_FILES)[string]; counties: Record<string, string[]> }>();

for (const { stateSlug, countySlug } of DEEP_COUNTY_UPGRADE_WAVE_2) {
  const meta = STATE_FILES[stateSlug];
  if (!loaded.has(stateSlug)) {
    const file = readFileSync(meta.path, 'utf8');
    loaded.set(stateSlug, { file, meta, counties: parseBlock(file, meta.blockName) });
  }
  const pack = buildMetroMoverPack(stateSlug, countySlug, 12);
  loaded.get(stateSlug)!.counties[countySlug] = pack;
  console.log(`OK ${stateSlug}/${countySlug}: ${pack.length} movers`);
}

for (const [stateSlug, { file, meta, counties }] of loaded) {
  const block = formatBlock(meta.blockName, counties);
  const regex = new RegExp(`const ${meta.blockName}[^=]*=\\s*\\{[\\s\\S]*?\\n\\};`);
  writeFileSync(meta.path, file.replace(regex, block));
  console.log(`Wrote ${meta.path}`);
}