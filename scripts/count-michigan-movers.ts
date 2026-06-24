import { generatedCounties } from '../data/generated/index';
import { applyMichiganCountyOverrides } from '../lib/local-movers/geography/michigan-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const miCounties = generatedCounties
  .filter((c) => c.stateSlug === 'michigan')
  .map(applyMichiganCountyOverrides);

/** Detroit metro, Grand Rapids, university towns, and regional hubs */
const MAJOR = new Set([
  'wayne',
  'oakland',
  'macomb',
  'kent',
  'ottawa',
  'washtenaw',
  'ingham',
  'genesee',
  'kalamazoo',
  'livingston',
  'saginaw',
  'muskegon',
  'monroe',
  'grand-traverse',
  'marquette',
]);

const under5: string[] = [];
const under8Major: string[] = [];
const under10Major: string[] = [];
const under5Rural: string[] = [];
const distribution = new Map<number, number>();

for (const c of miCounties) {
  const n = getMoversForCounty('michigan', c.slug)?.movers.length ?? 0;
  distribution.set(n, (distribution.get(n) ?? 0) + 1);
  if (n < 5) under5.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 8) under8Major.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 10) under10Major.push(`${c.slug}: ${n}`);
  if (!MAJOR.has(c.slug) && n < 5) under5Rural.push(`${c.slug}: ${n}`);
}

console.log(`Michigan counties: ${miCounties.length}`);
console.log('\nDistribution:');
for (const [n, count] of [...distribution.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(`  ${n} movers: ${count} counties`);
}
console.log('\nUnder 5 (all):', under5.length);
for (const line of under5) console.log(line);

console.log('\nMajor under 8:', under8Major.length);
for (const line of under8Major) console.log(line);

console.log('\nMajor under 10:', under10Major.length);
for (const line of under10Major) console.log(line);

console.log('\nRural under 5:', under5Rural.length);
for (const line of under5Rural) console.log(line);

if (under5.length === 0 && under8Major.length === 0) {
  console.log('\n✓ All counties meet minimum mover targets (5 rural / 8 major).');
}