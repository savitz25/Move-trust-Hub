import { generatedCounties } from '../data/generated/index';
import { applyMichiganCountyOverrides } from '../lib/local-movers/geography/michigan-overrides';
import { getMoversForCounty } from '../lib/local-movers/index';

const miCounties = generatedCounties
  .filter((c) => c.stateSlug === 'michigan')
  .map(applyMichiganCountyOverrides);

/** Detroit metro premium */
const PREMIUM = new Set(['wayne', 'oakland', 'macomb']);
/** Grand Rapids, Ann Arbor, secondary hubs */
const SECONDARY = new Set(['kent', 'washtenaw', 'ingham', 'genesee', 'kalamazoo', 'ottawa']);
/** Other regional hubs */
const MAJOR = new Set([
  'wayne',
  'oakland',
  'macomb',
  'kent',
  'ottawa',
  'washtenaw',
  'ingham',
  'genesee',
  'kalamazoo',
  'livingston',
  'saginaw',
  'muskegon',
  'monroe',
  'grand-traverse',
  'marquette',
]);

function getMinTarget(slug: string): number {
  if (PREMIUM.has(slug)) return 11;
  if (SECONDARY.has(slug)) return slug === 'kent' || slug === 'washtenaw' ? 9 : 8;
  if (MAJOR.has(slug)) return 8;
  return 5;
}

const underMin: string[] = [];
const distribution = new Map<number, number>();

for (const c of miCounties) {
  const n = getMoversForCounty('michigan', c.slug)?.movers.length ?? 0;
  distribution.set(n, (distribution.get(n) ?? 0) + 1);
  const min = getMinTarget(c.slug);
  if (n < min) underMin.push(`${c.slug}: ${n} (min ${min})`);
}

console.log(`Michigan counties: ${miCounties.length}`);
console.log('\nDistribution:');
for (const [n, count] of [...distribution.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(`  ${n} movers: ${count} counties`);
}
console.log('\nUnder minimum:', underMin.length);
for (const line of underMin) console.log(line);

if (underMin.length === 0) {
  console.log('\n✓ All counties meet Michigan mover targets.');
}