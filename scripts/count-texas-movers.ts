import { generatedCounties } from '../data/generated/index';
import { applyTexasCountyOverrides } from '../lib/local-movers/geography/texas-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const texasCounties = generatedCounties
  .filter((c) => c.stateSlug === 'texas')
  .map(applyTexasCountyOverrides);

const MAJOR = new Set([
  'harris',
  'dallas',
  'tarrant',
  'bexar',
  'travis',
  'collin',
  'denton',
  'fort-bend',
  'el-paso',
  'hidalgo',
  'cameron',
  'nueces',
  'lubbock',
  'brazoria',
  'williamson',
  'montgomery',
  'galveston',
  'bell',
  'hays',
  'webb',
  'mclennan',
  'jefferson',
  'smith',
  'comal',
  'kaufman',
  'johnson',
  'ellis',
  'brazos',
]);

const under5: string[] = [];
const under8Major: string[] = [];

for (const c of texasCounties) {
  const n = getMoversForCounty('texas', c.slug)?.movers.length ?? 0;
  if (n < 5) under5.push(`${c.slug}: ${n}`);
  if (MAJOR.has(c.slug) && n < 8) under8Major.push(`${c.slug}: ${n}`);
}

console.log(`Texas counties: ${texasCounties.length}`);
console.log('Under 5:', under5.length);
for (const line of under5) console.log(line);

console.log('\nMajor under 8:', under8Major.length);
for (const line of under8Major) console.log(line);

if (under5.length === 0 && under8Major.length === 0) {
  console.log('\n✓ All counties meet mover targets.');
}