import { floridaCounties } from '../lib/local-movers/geography/florida';
import { getMoversForCounty } from '../lib/local-movers/index';
import { floridaCountyMoverAssignments } from '../data/florida-county-assignments';
import { metroMoverPools } from '../data/local-movers-seed';

const MAJOR = new Set([
  'broward',
  'miami-dade',
  'palm-beach',
  'orange',
  'hillsborough',
  'duval',
  'pinellas',
  'lee',
  'sarasota',
]);

const under5: string[] = [];
const under6Major: string[] = [];

for (const c of floridaCounties) {
  const n = getMoversForCounty('florida', c.slug)?.movers.length ?? 0;
  if (n < 5) under5.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 6) under6Major.push(`${c.slug}: ${n}`);
}

console.log('Under 5:', under5.length);
for (const line of under5) console.log(line);

console.log('\nMajor under 6:', under6Major.length);
for (const line of under6Major) console.log(line);

// Suggest additions for under-5 counties
console.log('\n--- Suggestions ---');
for (const c of floridaCounties) {
  const n = getMoversForCounty('florida', c.slug)?.movers.length ?? 0;
  const target = MAJOR.has(c.slug) ? 8 : 5;
  if (n >= target) continue;

  const assignment = floridaCountyMoverAssignments.find((a) => a.countySlug === c.slug);
  const existing = new Set(assignment?.moverIds ?? []);
  const pool = metroMoverPools[c.metro ?? '']?.moverIds ?? [];
  const extras = pool.filter((id) => !existing.has(id)).slice(0, target - n);
  console.log(`${c.slug} (${n}→${target}): +${extras.join(', ')}`);
}