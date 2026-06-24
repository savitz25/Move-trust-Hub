import { generatedCounties } from '../data/generated/index';
import { applyIndianaCountyOverrides } from '../lib/local-movers/geography/indiana-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const inCounties = generatedCounties
  .filter((c) => c.stateSlug === 'indiana')
  .map(applyIndianaCountyOverrides);

/** Indianapolis metro, Northwest Indiana, Fort Wayne, South Bend hubs */
const MAJOR = new Set([
  'marion',
  'lake',
  'allen',
  'hamilton',
  'st-joseph',
  'elkhart',
  'hendricks',
  'tippecanoe',
  'vanderburgh',
  'johnson',
  'porter',
  'monroe',
  'madison',
  'clark',
  'delaware',
  'laporte',
  'vigo',
  'hancock',
  'bartholomew',
  'howard',
  'boone',
  'floyd',
]);

const under5: string[] = [];
const under8Major: string[] = [];
const under10Major: string[] = [];
const distribution = new Map<number, number>();

for (const c of inCounties) {
  const n = getMoversForCounty('indiana', c.slug)?.movers.length ?? 0;
  distribution.set(n, (distribution.get(n) ?? 0) + 1);
  if (n < 5) under5.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 8) under8Major.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 10) under10Major.push(`${c.slug}: ${n}`);
}

console.log(`Indiana counties: ${inCounties.length}`);
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

if (under5.length === 0 && under8Major.length === 0) {
  console.log('\n✓ All curated counties meet minimum mover targets (5 rural / 8 major).');
}