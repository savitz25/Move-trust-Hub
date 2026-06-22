import { newYorkCounties } from '../lib/local-movers/geography/new-york';
import { getMoversForCounty } from '../lib/local-movers/index';
import { newYorkCountyMoverAssignments } from '../data/new-york-county-assignments';
import { metroMoverPools } from '../data/local-movers-seed';

const MAJOR = new Set([
  'albany',
  'bronx',
  'erie',
  'kings',
  'monroe',
  'nassau',
  'new-york',
  'niagara',
  'onondaga',
  'queens',
  'richmond',
  'suffolk',
  'westchester',
]);

const under5: string[] = [];
const under8Major: string[] = [];

for (const c of newYorkCounties) {
  const n = getMoversForCounty('new-york', c.slug)?.movers.length ?? 0;
  if (n < 5) under5.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 8) under8Major.push(`${c.slug}: ${n}`);
}

console.log('Under 5:', under5.length);
for (const line of under5) console.log(line);

console.log('\nMajor under 8:', under8Major.length);
for (const line of under8Major) console.log(line);

console.log('\n--- Suggestions ---');
for (const c of newYorkCounties) {
  const n = getMoversForCounty('new-york', c.slug)?.movers.length ?? 0;
  const target = MAJOR.has(c.slug) ? 10 : 5;
  if (n >= target) continue;

  const assignment = newYorkCountyMoverAssignments.find(
    (a) => a.countySlug === c.slug
  );
  const existing = new Set(assignment?.moverIds ?? []);
  const pool = metroMoverPools[c.metro ?? '']?.moverIds ?? [];
  const extras = pool.filter((id) => !existing.has(id)).slice(0, target - n);
  console.log(`${c.slug} (${n}→${target}): +${extras.join(', ')}`);
}