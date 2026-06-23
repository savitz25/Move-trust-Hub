import { generatedCounties } from '../data/generated/index';
import { applyLouisianaCountyOverrides } from '../lib/local-movers/geography/louisiana-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const laParishes = generatedCounties
  .filter((c) => c.stateSlug === 'louisiana')
  .map(applyLouisianaCountyOverrides);

const MAJOR = new Set([
  'orleans',
  'jefferson',
  'east-baton-rouge',
  'st-tammany',
  'lafayette',
  'caddo',
  'calcasieu',
  'bossier',
  'livingston',
  'tangipahoa',
  'ascension',
  'terrebonne',
  'rapides',
  'ouachita',
  'st-landry',
]);

const under5: string[] = [];
const under10Major: string[] = [];
const distribution = new Map<number, number>();

for (const c of laParishes) {
  const n = getMoversForCounty('louisiana', c.slug)?.movers.length ?? 0;
  distribution.set(n, (distribution.get(n) ?? 0) + 1);
  if (n < 5) under5.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 10) under10Major.push(`${c.slug}: ${n}`);
}

console.log(`Louisiana parishes: ${laParishes.length}`);
console.log('\nDistribution:');
for (const [n, count] of [...distribution.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(`  ${n} movers: ${count} parishes`);
}
console.log('\nUnder 5:', under5.length);
for (const line of under5) console.log(line);

console.log('\nMajor under 10:', under10Major.length);
for (const line of under10Major) console.log(line);

if (under5.length === 0 && under10Major.length === 0) {
  console.log('\n✓ All parishes meet mover targets.');
}