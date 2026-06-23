import { generatedCounties } from '../data/generated/index';
import { applyNorthCarolinaCountyOverrides } from '../lib/local-movers/geography/north-carolina-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const ncCounties = generatedCounties
  .filter((c) => c.stateSlug === 'north-carolina')
  .map(applyNorthCarolinaCountyOverrides);

const MAJOR = new Set([
  'wake',
  'mecklenburg',
  'guilford',
  'forsyth',
  'cumberland',
  'durham',
  'buncombe',
  'new-hanover',
  'onslow',
  'cabarrus',
  'union',
  'iredell',
  'johnston',
  'henderson',
  'gaston',
  'catawba',
  'robeson',
  'pitt',
  'wayne',
  'alamance',
  'brunswick',
  'chatham',
  'craven',
  'davidson',
  'harnett',
  'moore',
  'orange',
  'randolph',
  'rowan',
]);

const under5: string[] = [];
const under8Major: string[] = [];
const distribution = new Map<number, number>();

for (const c of ncCounties) {
  const n = getMoversForCounty('north-carolina', c.slug)?.movers.length ?? 0;
  distribution.set(n, (distribution.get(n) ?? 0) + 1);
  if (n < 5) under5.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 8) under8Major.push(`${c.slug}: ${n}`);
}

console.log(`North Carolina counties: ${ncCounties.length}`);
console.log('\nDistribution:');
for (const [n, count] of [...distribution.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(`  ${n} movers: ${count} counties`);
}
console.log('\nUnder 5:', under5.length);
for (const line of under5) console.log(line);

console.log('\nMajor under 8:', under8Major.length);
for (const line of under8Major) console.log(line);

if (under5.length === 0 && under8Major.length === 0) {
  console.log('\n✓ All counties meet mover targets.');
}