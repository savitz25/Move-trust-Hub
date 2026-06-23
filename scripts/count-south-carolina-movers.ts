import { generatedCounties } from '../data/generated/index';
import { applySouthCarolinaCountyOverrides } from '../lib/local-movers/geography/south-carolina-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const scCounties = generatedCounties
  .filter((c) => c.stateSlug === 'south-carolina')
  .map(applySouthCarolinaCountyOverrides);

const MAJOR = new Set([
  'charleston',
  'greenville',
  'richland',
  'horry',
  'spartanburg',
  'york',
  'lexington',
  'berkeley',
  'dorchester',
  'aiken',
  'anderson',
  'pickens',
  'sumter',
  'beaufort',
  'florence',
  'georgetown',
  'lancaster',
  'oconee',
  'cherokee',
]);

const under5: string[] = [];
const under8Major: string[] = [];
const distribution = new Map<number, number>();

for (const c of scCounties) {
  const n = getMoversForCounty('south-carolina', c.slug)?.movers.length ?? 0;
  distribution.set(n, (distribution.get(n) ?? 0) + 1);
  if (n < 5) under5.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 8) under8Major.push(`${c.slug}: ${n}`);
}

console.log(`South Carolina counties: ${scCounties.length}`);
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