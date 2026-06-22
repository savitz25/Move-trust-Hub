import { californiaCounties } from '../lib/local-movers/geography/california';
import { getMoversForCounty } from '../lib/local-movers/index';
import { californiaCountyMoverAssignments } from '../data/california-county-assignments';
import { metroMoverPools } from '../data/local-movers-seed';

const MAJOR = new Set([
  'alameda',
  'contra-costa',
  'los-angeles',
  'orange',
  'riverside',
  'sacramento',
  'san-bernardino',
  'san-diego',
  'san-francisco',
  'san-mateo',
  'santa-clara',
  'ventura',
]);

const under5: string[] = [];
const under10Major: string[] = [];

for (const c of californiaCounties) {
  const n = getMoversForCounty('california', c.slug)?.movers.length ?? 0;
  if (n < 5) under5.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 10) under10Major.push(`${c.slug}: ${n}`);
}

console.log('Under 5:', under5.length);
for (const line of under5) console.log(line);

console.log('\nMajor under 10:', under10Major.length);
for (const line of under10Major) console.log(line);

console.log('\n--- Suggestions ---');
for (const c of californiaCounties) {
  const n = getMoversForCounty('california', c.slug)?.movers.length ?? 0;
  const target = MAJOR.has(c.slug) ? 10 : 5;
  if (n >= target) continue;

  const assignment = californiaCountyMoverAssignments.find(
    (a) => a.countySlug === c.slug
  );
  const existing = new Set(assignment?.moverIds ?? []);
  const pool = metroMoverPools[c.metro ?? '']?.moverIds ?? [];
  const extras = pool.filter((id) => !existing.has(id)).slice(0, target - n);
  console.log(`${c.slug} (${n}→${target}): +${extras.join(', ')}`);
}