import { generatedCounties } from '../data/generated/index';
import { applyVirginiaCountyOverrides } from '../lib/local-movers/geography/virginia-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const vaCounties = generatedCounties
  .filter((c) => c.stateSlug === 'virginia')
  .map(applyVirginiaCountyOverrides);

/** Northern Virginia, Hampton Roads, Richmond metro, Roanoke Valley, and high-growth corridors */
const MAJOR = new Set([
  'fairfax',
  'loudoun',
  'prince-william',
  'arlington',
  'alexandria',
  'virginia-beach',
  'norfolk',
  'chesapeake',
  'richmond',
  'henrico',
  'chesterfield',
  'newport-news',
  'hampton',
  'stafford',
  'spotsylvania',
  'roanoke',
  'roanoke-county',
  'salem',
]);

const under5: string[] = [];
const under8Major: string[] = [];
const under10Major: string[] = [];
const distribution = new Map<number, number>();

for (const c of vaCounties) {
  const n = getMoversForCounty('virginia', c.slug)?.movers.length ?? 0;
  distribution.set(n, (distribution.get(n) ?? 0) + 1);
  if (n < 5) under5.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 8) under8Major.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 10) under10Major.push(`${c.slug}: ${n}`);
}

console.log(`Virginia localities: ${vaCounties.length}`);
console.log('\nDistribution:');
for (const [n, count] of [...distribution.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(`  ${n} movers: ${count} localities`);
}
console.log('\nUnder 5:', under5.length);
for (const line of under5) console.log(line);

console.log('\nMajor under 8:', under8Major.length);
for (const line of under8Major) console.log(line);

console.log('\nMajor under 10:', under10Major.length);
for (const line of under10Major) console.log(line);

if (under5.length === 0 && under8Major.length === 0 && under10Major.length === 0) {
  console.log('\n✓ All curated Virginia localities meet minimum mover targets.');
}