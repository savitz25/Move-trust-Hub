import { generatedCounties } from '../data/generated/index';
import { applyOklahomaCountyOverrides } from '../lib/local-movers/geography/oklahoma-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const okCounties = generatedCounties
  .filter((c) => c.stateSlug === 'oklahoma')
  .map(applyOklahomaCountyOverrides);

/** Top 5 OK metros — 10 movers each */
const TOP5 = new Set([
  'oklahoma',
  'tulsa',
  'cleveland',
  'canadian',
  'rogers',
]);

/** Remote Panhandle / rural tier — minimum 3 movers */
const RURAL = new Set([
  'alfalfa',
  'jefferson',
  'coal',
  'cotton',
  'greer',
  'beaver',
  'dewey',
  'grant',
  'ellis',
  'roger-mills',
  'harper',
  'harmon',
  'cimarron',
]);

const top5Under10: string[] = [];
const mediumUnder8: string[] = [];
const ruralUnder3: string[] = [];
const distribution = new Map<number, number>();

for (const c of okCounties) {
  const n = getMoversForCounty('oklahoma', c.slug)?.movers.length ?? 0;
  distribution.set(n, (distribution.get(n) ?? 0) + 1);

  if (TOP5.has(c.slug) && n < 10) top5Under10.push(`${c.slug}: ${n}`);
  else if (RURAL.has(c.slug) && n < 3) ruralUnder3.push(`${c.slug}: ${n}`);
  else if (!TOP5.has(c.slug) && !RURAL.has(c.slug) && n < 8) {
    mediumUnder8.push(`${c.slug}: ${n}`);
  }
}

console.log(`Oklahoma counties: ${okCounties.length}`);
console.log('\nDistribution:');
for (const [n, count] of [...distribution.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(`  ${n} movers: ${count} counties`);
}

console.log('\nTop 5 under 10:', top5Under10.length);
for (const line of top5Under10) console.log(line);

console.log('\nMedium tier under 8:', mediumUnder8.length);
for (const line of mediumUnder8) console.log(line);

console.log('\nRural tier under 3:', ruralUnder3.length);
for (const line of ruralUnder3) console.log(line);

if (
  top5Under10.length === 0 &&
  mediumUnder8.length === 0 &&
  ruralUnder3.length === 0
) {
  console.log('\n✓ All counties meet tiered mover targets.');
}