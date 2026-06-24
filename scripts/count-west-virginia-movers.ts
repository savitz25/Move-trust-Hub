import { generatedCounties } from '../data/generated/index';
import { applyWestVirginiaCountyOverrides } from '../lib/local-movers/geography/west-virginia-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const wvCounties = generatedCounties
  .filter((c) => c.stateSlug === 'west-virginia')
  .map(applyWestVirginiaCountyOverrides);

/** Charleston, Eastern Panhandle, university hubs, tri-state metros, and Southern WV anchors */
const MAJOR = new Set([
  'kanawha',
  'berkeley',
  'monongalia',
  'cabell',
  'wood',
  'raleigh',
  'jefferson',
  'harrison',
  'mercer',
  'putnam',
  'marion',
  'ohio',
  'fayette',
  'wayne',
  'preston',
]);

const under5: string[] = [];
const under8Major: string[] = [];
const under10Major: string[] = [];
const distribution = new Map<number, number>();

for (const c of wvCounties) {
  const n = getMoversForCounty('west-virginia', c.slug)?.movers.length ?? 0;
  distribution.set(n, (distribution.get(n) ?? 0) + 1);
  if (n < 5) under5.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 8) under8Major.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 10) under10Major.push(`${c.slug}: ${n}`);
}

console.log(`West Virginia counties: ${wvCounties.length}`);
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

if (under5.length === 0 && under8Major.length === 0 && under10Major.length === 0) {
  console.log('\n✓ All curated West Virginia counties meet minimum mover targets.');
}