/**
 * One-shot script: expand KY curated assignments to minimum 5 movers (10 for major).
 * Run: npx tsx scripts/apply-kentucky-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { kentuckyCountyResearch } from '../data/kentucky-county-research';
import { applyKentuckyCountyOverrides } from '../lib/local-movers/geography/kentucky-overrides';
import { generatedCounties } from '../data/generated/index';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const kyCounties = generatedCounties
  .filter((c) => c.stateSlug === 'kentucky')
  .map(applyKentuckyCountyOverrides);

const MAJOR = new Set([
  'jefferson',
  'fayette',
  'kenton',
  'boone',
  'warren',
  'hardin',
  'daviess',
  'madison',
  'campbell',
  'mccracken',
  'bullitt',
  'oldham',
  'scott',
  'shelby',
  'christian',
  'pulaski',
  'laurel',
  'jessamine',
  'pike',
  'franklin',
  'nelson',
  'boyd',
  'barren',
  'hopkins',
  'henderson',
  'calloway',
  'clark',
  'whitley',
  'graves',
  'greenup',
  'floyd',
  'boyle',
  'marshall',
  'meade',
  'muhlenberg',
  'knox',
  'logan',
  'montgomery',
  'woodford',
  'grayson',
  'taylor',
  'grant',
  'perry',
  'carter',
  'lincoln',
  'anderson',
  'rowan',
  'harlan',
  'mercer',
  'allen',
  'bell',
  'johnson',
  'breckinridge',
  'spencer',
  'simpson',
  'hart',
  'marion',
]);
const curatedSlugs = new Set(Object.keys(kentuckyCountyResearch));

const assignmentsPath = 'data/kentucky-county-assignments.ts';
const file = readFileSync(assignmentsPath, 'utf8');
const match = file.match(/const CURATED_KY_COUNTIES[^=]*=\s*(\{[\s\S]*?\n\});/);
if (!match) throw new Error('Could not parse CURATED_KY_COUNTIES');

const current: Record<string, string[]> = eval(`(${match[1]})`);

function expandIds(countySlug: string, existing: string[]): string[] {
  const county = kyCounties.find((c) => c.slug === countySlug);
  const target = MAJOR.has(countySlug) ? 10 : 5;
  const ids = [...existing];
  const seen = new Set(ids);

  const metroIds = county?.metro ? metroMoverPools[county.metro]?.moverIds ?? [] : [];
  for (const id of metroIds) {
    if (ids.length >= target) break;
    if (fullMoversCatalog[id] && !seen.has(id)) {
      ids.push(id);
      seen.add(id);
    }
  }

  const kyMoverIds = Object.keys(fullMoversCatalog).filter((id) => id.endsWith('-ky'));
  for (const id of kyMoverIds) {
    if (ids.length >= target) break;
    if (!seen.has(id)) {
      ids.push(id);
      seen.add(id);
    }
  }

  return ids.slice(0, target);
}

for (const slug of curatedSlugs) {
  current[slug] = expandIds(slug, current[slug] ?? []);
}

const lines = Object.entries(current)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([slug, ids]) => {
    const idLines = ids.map((id) => `    '${id}',`).join('\n');
    return `  ${slug}: [\n${idLines}\n  ],`;
  });

const block = `const CURATED_KY_COUNTIES: Record<string, string[]> = {\n${lines.join('\n')}\n};`;
const updated = file.replace(/const CURATED_KY_COUNTIES[^=]*=\s*\{[\s\S]*?\n\};/, block);
writeFileSync(assignmentsPath, updated);
console.log('Updated', assignmentsPath);
for (const slug of curatedSlugs) {
  console.log(`  ${slug}: ${current[slug].length} movers`);
}