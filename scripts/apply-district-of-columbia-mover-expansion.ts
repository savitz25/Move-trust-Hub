/**
 * One-shot script: ensure DC curated assignment meets 15-mover large-market target.
 * Run: npx tsx scripts/apply-district-of-columbia-mover-expansion.ts
 *
 * Note: DC is a federal district with a single jurisdiction (not a state with counties).
 */
import { readFileSync, writeFileSync } from 'fs';
import { districtOfColumbiaCountyResearch } from '../data/district-of-columbia-county-research';
import { metroMoverPools } from '../data/local-movers-seed';
import { fullMoversCatalog } from '../lib/local-movers/catalog';

const TARGET = 15;
const DC_SLUG = 'district-of-columbia';

const assignmentsPath = 'data/district-of-columbia-county-assignments.ts';
const file = readFileSync(assignmentsPath, 'utf8');
const match = file.match(/const CURATED_DC_COUNTIES[^=]*=\s*(\{[\s\S]*?\n\});/);
if (!match) throw new Error('Could not parse CURATED_DC_COUNTIES');

const current: Record<string, string[]> = eval(`(${match[1]})`);

function expandIds(existing: string[]): string[] {
  const ids = [...existing];
  const seen = new Set(ids);

  const poolOrder = [
    'washington-dc-metro-dc',
    'northern-virginia-metro-va',
  ];

  for (const poolId of poolOrder) {
    const metroIds = metroMoverPools[poolId]?.moverIds ?? [];
    for (const id of metroIds) {
      if (ids.length >= TARGET) break;
      if (fullMoversCatalog[id] && !seen.has(id)) {
        ids.push(id);
        seen.add(id);
      }
    }
    if (ids.length >= TARGET) break;
  }

  const dcMoverIds = Object.keys(fullMoversCatalog).filter(
    (id) => id.endsWith('-dc') || id.includes('washingtondc') || id.includes('washington-dc')
  );
  for (const id of dcMoverIds) {
    if (ids.length >= TARGET) break;
    if (!seen.has(id)) {
      ids.push(id);
      seen.add(id);
    }
  }

  return ids.slice(0, TARGET);
}

for (const slug of Object.keys(districtOfColumbiaCountyResearch)) {
  current[slug] = expandIds(current[slug] ?? []);
}

const lines = Object.entries(current)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([slug, ids]) => {
    const key = slug.includes('-') ? `'${slug}'` : slug;
    const idLines = ids.map((id) => `    '${id}',`).join('\n');
    return `  ${key}: [\n${idLines}\n  ],`;
  });

const block = `const CURATED_DC_COUNTIES: Record<string, string[]> = {\n${lines.join('\n')}\n};`;
const updated = file.replace(/const CURATED_DC_COUNTIES[^=]*=\s*\{[\s\S]*?\n\};/, block);
writeFileSync(assignmentsPath, updated);
console.log('Updated', assignmentsPath);
console.log(`  ${DC_SLUG}: ${current[DC_SLUG].length} movers`);