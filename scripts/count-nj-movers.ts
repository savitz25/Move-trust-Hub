import { newJerseyCounties } from '../lib/local-movers/geography/new-jersey';
import { getMoversForCounty } from '../lib/local-movers/index';
import { newJerseyCountyMoverAssignments } from '../data/new-jersey-county-assignments';
import { metroMoverPools } from '../data/local-movers-seed';

const MAJOR = new Set([
  'bergen',
  'middlesex',
  'essex',
  'hudson',
  'monmouth',
  'ocean',
  'union',
  'passaic',
]);

const under7: string[] = [];
const under8Major: string[] = [];

for (const c of newJerseyCounties) {
  const n = getMoversForCounty('new-jersey', c.slug)?.movers.length ?? 0;
  if (n < 7) under7.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 8) under8Major.push(`${c.slug}: ${n}`);
}

console.log('Under 7:', under7.length);
for (const line of under7) console.log(line);

console.log('\nMajor under 8:', under8Major.length);
for (const line of under8Major) console.log(line);

console.log('\n--- Suggestions ---');
for (const c of newJerseyCounties) {
  const n = getMoversForCounty('new-jersey', c.slug)?.movers.length ?? 0;
  const target = MAJOR.has(c.slug) ? 10 : 7;
  if (n >= target) continue;

  const assignment = newJerseyCountyMoverAssignments.find(
    (a) => a.countySlug === c.slug
  );
  const existing = new Set(assignment?.moverIds ?? []);
  const pool = metroMoverPools[c.metro ?? '']?.moverIds ?? [];
  const extras = pool.filter((id) => !existing.has(id)).slice(0, target - n);
  console.log(`${c.slug} (${n}→${target}): +${extras.join(', ')}`);
}