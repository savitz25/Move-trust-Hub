import { generatedCounties } from '../data/generated/index';
import { applyIllinoisCountyOverrides } from '../lib/local-movers/geography/illinois-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const ilCounties = generatedCounties
  .filter((c) => c.stateSlug === 'illinois')
  .map(applyIllinoisCountyOverrides);

/** Chicago collar, downstate hubs, and St. Louis-metro IL counties */
const MAJOR = new Set([
  'cook',
  'dupage',
  'lake',
  'will',
  'kane',
  'mchenry',
  'winnebago',
  'madison',
  'st-clair',
  'champaign',
  'sangamon',
  'peoria',
  'mclean',
  'rock-island',
  'kendall',
]);

const under5: string[] = [];
const under10Major: string[] = [];
const under10Rural: string[] = [];
const distribution = new Map<number, number>();

for (const c of ilCounties) {
  const n = getMoversForCounty('illinois', c.slug)?.movers.length ?? 0;
  distribution.set(n, (distribution.get(n) ?? 0) + 1);
  if (n < 5) under5.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 10) under10Major.push(`${c.slug}: ${n}`);
  if (!MAJOR.has(c.slug) && c.slug !== 'cook' && n < 10)
    under10Rural.push(`${c.slug}: ${n}`);
}

console.log(`Illinois counties: ${ilCounties.length}`);
console.log('\nDistribution:');
for (const [n, count] of [...distribution.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(`  ${n} movers: ${count} counties`);
}
console.log('\nUnder 5:', under5.length);
for (const line of under5) console.log(line);

console.log('\nMajor under 10:', under10Major.length);
for (const line of under10Major) console.log(line);

console.log('\nNon-major under 10:', under10Rural.length);
if (under10Rural.length <= 30) {
  for (const line of under10Rural) console.log(line);
} else {
  console.log(`  (${under10Rural.length} counties — run apply-illinois-mover-expansion.ts to reach 10)`);
}

if (under5.length === 0 && under10Major.length === 0) {
  console.log('\n✓ All counties meet minimum mover targets (5 rural / 10 major).');
}