import { generatedCounties } from '../data/generated/index';
import { applyKentuckyCountyOverrides } from '../lib/local-movers/geography/kentucky-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const kyCounties = generatedCounties
  .filter((c) => c.stateSlug === 'kentucky')
  .map(applyKentuckyCountyOverrides);

/** Louisville, Lexington, NKY, Bowling Green, Fort Knox, and other high-traffic metros */
const MAJOR = new Set([
  'jefferson',
  'fayette',
  'kenton',
  'boone',
  'warren',
  'hardin',
  'daviess',
  'madison',
  'campbell',
  'mccracken',
  'bullitt',
  'oldham',
  'scott',
  'shelby',
  'christian',
  'pulaski',
  'laurel',
  'jessamine',
  'pike',
  'franklin',
  'nelson',
  'boyd',
  'barren',
  'hopkins',
  'henderson',
  'calloway',
  'clark',
  'whitley',
  'graves',
  'greenup',
  'floyd',
  'boyle',
  'marshall',
  'meade',
  'muhlenberg',
  'knox',
  'logan',
  'montgomery',
  'woodford',
  'grayson',
  'taylor',
  'grant',
  'perry',
  'carter',
  'lincoln',
  'anderson',
  'rowan',
  'harlan',
  'mercer',
  'allen',
  'bell',
  'johnson',
  'breckinridge',
  'spencer',
  'simpson',
  'hart',
  'marion',
]);

const under5: string[] = [];
const under8Major: string[] = [];
const under10Major: string[] = [];
const distribution = new Map<number, number>();

for (const c of kyCounties) {
  const n = getMoversForCounty('kentucky', c.slug)?.movers.length ?? 0;
  distribution.set(n, (distribution.get(n) ?? 0) + 1);
  if (n < 5) under5.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 8) under8Major.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 10) under10Major.push(`${c.slug}: ${n}`);
}

console.log(`Kentucky counties: ${kyCounties.length}`);
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
  console.log('\n✓ All curated Kentucky counties meet minimum mover targets.');
}