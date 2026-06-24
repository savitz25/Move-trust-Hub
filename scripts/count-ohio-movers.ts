import { generatedCounties } from '../data/generated/index';
import { applyOhioCountyOverrides } from '../lib/local-movers/geography/ohio-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const ohCounties = generatedCounties
  .filter((c) => c.stateSlug === 'ohio')
  .map(applyOhioCountyOverrides);

/** Columbus metro hub — expands as more counties are curated */
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

const under5: string[] = [];
const under8Major: string[] = [];
const under10Major: string[] = [];
const distribution = new Map<number, number>();

for (const c of ohCounties) {
  const n = getMoversForCounty('ohio', c.slug)?.movers.length ?? 0;
  distribution.set(n, (distribution.get(n) ?? 0) + 1);
  if (n < 5) under5.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 8) under8Major.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 10) under10Major.push(`${c.slug}: ${n}`);
}

console.log(`Ohio counties: ${ohCounties.length}`);
console.log('\nDistribution:');
for (const [n, count] of [...distribution.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(`  ${n} movers: ${count} counties`);
}
console.log('\nUnder 5:', under5.length);
for (const line of under5) console.log(line);

console.log('\nMajor under 8:', under8Major.length);
for (const line of under8Major) console.log(line);

console.log('\nMajor under 10:', under10Major.length);
for (const line of under10Major) console.log(line);

if (under8Major.length === 0 && under10Major.length === 0) {
  console.log('\n✓ All curated major Ohio counties meet minimum mover targets.');
}