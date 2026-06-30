/**
 * Unlock premium metro counties by assigning FMCSA-verified directory mover packs.
 * Run: npx tsx scripts/unlock-premium-metro-counties.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { evaluateCountyIndexability } from '../lib/local-movers/county-indexability';
import { buildMetroMoverPack } from '../lib/local-movers/build-metro-mover-pack';
import { PREMIUM_METRO_COUNTIES } from '../lib/local-movers/premium-metro-counties';
import { hasCountyResearch } from '../lib/local-movers/county-research';

const STATE_ASSIGNMENT_FILES: Record<string, { path: string; blockName: string }> = {
  alabama: { path: 'data/alabama-county-assignments.ts', blockName: 'CURATED_AL_COUNTIES' },
  alaska: { path: 'data/alaska-county-assignments.ts', blockName: 'CURATED_AK_COUNTIES' },
  arizona: { path: 'data/arizona-county-assignments.ts', blockName: 'CURATED_AZ_COUNTIES' },
  arkansas: { path: 'data/arkansas-county-assignments.ts', blockName: 'CURATED_AR_COUNTIES' },
  california: { path: 'data/california-county-assignments.ts', blockName: 'CURATED_CA_COUNTIES' },
  colorado: { path: 'data/colorado-county-assignments.ts', blockName: 'CURATED_CO_COUNTIES' },
  connecticut: { path: 'data/connecticut-county-assignments.ts', blockName: 'CURATED_CT_COUNTIES' },
  delaware: { path: 'data/delaware-county-assignments.ts', blockName: 'CURATED_DE_COUNTIES' },
  florida: { path: 'data/florida-county-assignments.ts', blockName: 'CURATED_FL_COUNTIES' },
  georgia: { path: 'data/georgia-county-assignments.ts', blockName: 'CURATED_GA_COUNTIES' },
  hawaii: { path: 'data/hawaii-county-assignments.ts', blockName: 'CURATED_HI_COUNTIES' },
  idaho: { path: 'data/idaho-county-assignments.ts', blockName: 'CURATED_ID_COUNTIES' },
  illinois: { path: 'data/illinois-county-assignments.ts', blockName: 'CURATED_IL_COUNTIES' },
  indiana: { path: 'data/indiana-county-assignments.ts', blockName: 'CURATED_IN_COUNTIES' },
  iowa: { path: 'data/iowa-county-assignments.ts', blockName: 'CURATED_IA_COUNTIES' },
  kansas: { path: 'data/kansas-county-assignments.ts', blockName: 'CURATED_KS_COUNTIES' },
  kentucky: { path: 'data/kentucky-county-assignments.ts', blockName: 'CURATED_KY_COUNTIES' },
  louisiana: { path: 'data/louisiana-county-assignments.ts', blockName: 'CURATED_LA_PARISHES' },
  maine: { path: 'data/maine-county-assignments.ts', blockName: 'CURATED_ME_COUNTIES' },
  maryland: { path: 'data/maryland-county-assignments.ts', blockName: 'CURATED_MD_COUNTIES' },
  massachusetts: { path: 'data/massachusetts-county-assignments.ts', blockName: 'CURATED_MA_COUNTIES' },
  michigan: { path: 'data/michigan-county-assignments.ts', blockName: 'CURATED_MI_COUNTIES' },
  minnesota: { path: 'data/minnesota-county-assignments.ts', blockName: 'CURATED_MN_COUNTIES' },
  mississippi: { path: 'data/mississippi-county-assignments.ts', blockName: 'CURATED_MS_COUNTIES' },
  missouri: { path: 'data/missouri-county-assignments.ts', blockName: 'CURATED_MO_COUNTIES' },
  montana: { path: 'data/montana-county-assignments.ts', blockName: 'CURATED_MT_COUNTIES' },
  nebraska: { path: 'data/nebraska-county-assignments.ts', blockName: 'CURATED_NE_COUNTIES' },
  nevada: { path: 'data/nevada-county-assignments.ts', blockName: 'CURATED_NV_COUNTIES' },
  'new-hampshire': { path: 'data/new-hampshire-county-assignments.ts', blockName: 'CURATED_NH_COUNTIES' },
  'new-jersey': { path: 'data/new-jersey-county-assignments.ts', blockName: 'CURATED_NJ_COUNTIES' },
  'new-mexico': { path: 'data/new-mexico-county-assignments.ts', blockName: 'CURATED_NM_COUNTIES' },
  'new-york': { path: 'data/new-york-county-assignments.ts', blockName: 'CURATED_NY_COUNTIES' },
  'north-carolina': { path: 'data/north-carolina-county-assignments.ts', blockName: 'CURATED_NC_COUNTIES' },
  'north-dakota': { path: 'data/north-dakota-county-assignments.ts', blockName: 'CURATED_ND_COUNTIES' },
  ohio: { path: 'data/ohio-county-assignments.ts', blockName: 'CURATED_OH_COUNTIES' },
  oklahoma: { path: 'data/oklahoma-county-assignments.ts', blockName: 'CURATED_OK_COUNTIES' },
  oregon: { path: 'data/oregon-county-assignments.ts', blockName: 'CURATED_OR_COUNTIES' },
  pennsylvania: { path: 'data/pennsylvania-county-assignments.ts', blockName: 'CURATED_PA_COUNTIES' },
  'rhode-island': { path: 'data/rhode-island-county-assignments.ts', blockName: 'CURATED_RI_COUNTIES' },
  'south-carolina': { path: 'data/south-carolina-county-assignments.ts', blockName: 'CURATED_SC_COUNTIES' },
  'south-dakota': { path: 'data/south-dakota-county-assignments.ts', blockName: 'CURATED_SD_COUNTIES' },
  tennessee: { path: 'data/tennessee-county-assignments.ts', blockName: 'CURATED_TN_COUNTIES' },
  texas: { path: 'data/texas-county-assignments.ts', blockName: 'CURATED_TX_COUNTIES' },
  utah: { path: 'data/utah-county-assignments.ts', blockName: 'CURATED_UT_COUNTIES' },
  vermont: { path: 'data/vermont-county-assignments.ts', blockName: 'CURATED_VT_COUNTIES' },
  virginia: { path: 'data/virginia-county-assignments.ts', blockName: 'CURATED_VA_COUNTIES' },
  washington: { path: 'data/washington-county-assignments.ts', blockName: 'CURATED_WA_COUNTIES' },
  'west-virginia': { path: 'data/west-virginia-county-assignments.ts', blockName: 'CURATED_WV_COUNTIES' },
  wisconsin: { path: 'data/wisconsin-county-assignments.ts', blockName: 'CURATED_WI_COUNTIES' },
  wyoming: { path: 'data/wyoming-county-assignments.ts', blockName: 'CURATED_WY_COUNTIES' },
};

function parseCountiesBlock(file: string, blockName: string): Record<string, string[]> {
  const regex = new RegExp(`const ${blockName}[^=]*=\\s*(\\{[\\s\\S]*?\\n\\});`);
  const match = file.match(regex);
  if (!match) throw new Error(`Could not parse ${blockName}`);
  return eval(`(${match[1]})`) as Record<string, string[]>;
}

function formatCountiesBlock(blockName: string, counties: Record<string, string[]>): string {
  const lines = Object.entries(counties)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([slug, ids]) => {
      const key = slug.includes('-') || slug.includes('.') ? `'${slug}'` : slug;
      const idLines = ids.map((id) => `    '${id}',`).join('\n');
      return `  ${key}: [\n${idLines}\n  ],`;
    });
  return `const ${blockName}: Record<string, string[]> = {\n${lines.join('\n')}\n};`;
}

const updatesByState = new Map<string, Record<string, string[]>>();

for (const { stateSlug, countySlug } of PREMIUM_METRO_COUNTIES) {
  if (!hasCountyResearch(stateSlug, countySlug)) {
    console.warn(`SKIP (no research): ${stateSlug}/${countySlug}`);
    continue;
  }

  const pack = buildMetroMoverPack(stateSlug, countySlug, 10);
  if (pack.length < 8) {
    console.warn(`SKIP (pack too small: ${pack.length}): ${stateSlug}/${countySlug}`);
    continue;
  }

  if (!updatesByState.has(stateSlug)) {
    const meta = STATE_ASSIGNMENT_FILES[stateSlug];
    if (!meta) {
      console.warn(`SKIP (no assignment file): ${stateSlug}/${countySlug}`);
      continue;
    }
    const file = readFileSync(meta.path, 'utf8');
    updatesByState.set(stateSlug, parseCountiesBlock(file, meta.blockName));
  }

  const counties = updatesByState.get(stateSlug)!;
  counties[countySlug] = pack;

  const decision = evaluateCountyIndexability(stateSlug, countySlug);
  console.log(
    `OK ${stateSlug}/${countySlug}: ${pack.length} movers → ${decision.tier} (${decision.reason})`
  );
}

for (const [stateSlug, counties] of updatesByState) {
  const meta = STATE_ASSIGNMENT_FILES[stateSlug]!;
  const file = readFileSync(meta.path, 'utf8');
  const block = formatCountiesBlock(meta.blockName, counties);
  const regex = new RegExp(`const ${meta.blockName}[^=]*=\\s*\\{[\\s\\S]*?\\n\\};`);
  writeFileSync(meta.path, file.replace(regex, block));
  console.log(`Wrote ${meta.path}`);
}

console.log('\nDone. Re-run: npx tsx scripts/audit-thin-counties.ts');