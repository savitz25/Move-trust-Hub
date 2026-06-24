/**
 * One-shot script: expand OH curated assignments to minimum 5 movers (10 for major).
 * Run: npx tsx scripts/apply-ohio-mover-expansion.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { ohioCountyResearch } from '../data/ohio-county-research';
import { applyOhioCountyOverrides } from '../lib/local-movers/geography/ohio-overrides';
import { generatedCounties } from '../data/generated/index';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const ohCounties = generatedCounties
  .filter((c) => c.stateSlug === 'ohio')
  .map(applyOhioCountyOverrides);

const MAJOR = new Set([
  'franklin',
  'cuyahoga',
  'hamilton',
  'montgomery',
  'summit',
  'lucas',
  'butler',
  'stark',
  'lorain',
  'warren',
  'delaware',
  'lake',
  'mahoning',
  'clermont',
  'trumbull',
  'licking',
  'medina',
  'greene',
  'fairfield',
  'portage',
  'wood',
  'clark',
  'richland',
  'wayne',
  'miami',
  'allen',
  'columbiana',
  'ashtabula',
]);
const curatedSlugs = new Set(Object.keys(ohioCountyResearch));

const assignmentsPath = 'data/ohio-county-assignments.ts';
const file = readFileSync(assignmentsPath, 'utf8');
const match = file.match(/const CURATED_OH_COUNTIES[^=]*=\s*(\{[\s\S]*?\n\});/);
if (!match) throw new Error('Could not parse CURATED_OH_COUNTIES');

const current: Record<string, string[]> = eval(`(${match[1]})`);

function expandIds(countySlug: string, existing: string[]): string[] {
  const county = ohCounties.find((c) => c.slug === countySlug);
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

  const ohMoverIds = Object.keys(fullMoversCatalog).filter(
    (id) => id.endsWith('-oh') || id.includes('-franklin-oh') || id.includes('-columbus-oh')
  );
  for (const id of ohMoverIds) {
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

const block = `const CURATED_OH_COUNTIES: Record<string, string[]> = {\n${lines.join('\n')}\n};`;
const updated = file.replace(/const CURATED_OH_COUNTIES[^=]*=\s*\{[\s\S]*?\n\};/, block);
writeFileSync(assignmentsPath, updated);
console.log('Updated', assignmentsPath);
for (const slug of curatedSlugs) {
  console.log(`  ${slug}: ${current[slug].length} movers`);
}