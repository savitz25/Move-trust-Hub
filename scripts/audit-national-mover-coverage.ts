/**
 * National county mover coverage audit.
 * Run: npx tsx scripts/audit-national-mover-coverage.ts
 */
import { writeFileSync } from 'node:fs';
import { getAllCountyParams } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const STATE_NAMES: Record<string, string> = {
  alabama: 'Alabama',
  alaska: 'Alaska',
  arizona: 'Arizona',
  arkansas: 'Arkansas',
  california: 'California',
  colorado: 'Colorado',
  connecticut: 'Connecticut',
  delaware: 'Delaware',
  'district-of-columbia': 'District of Columbia',
  florida: 'Florida',
  georgia: 'Georgia',
  hawaii: 'Hawaii',
  idaho: 'Idaho',
  illinois: 'Illinois',
  indiana: 'Indiana',
  iowa: 'Iowa',
  kansas: 'Kansas',
  kentucky: 'Kentucky',
  louisiana: 'Louisiana',
  maine: 'Maine',
  maryland: 'Maryland',
  massachusetts: 'Massachusetts',
  michigan: 'Michigan',
  minnesota: 'Minnesota',
  mississippi: 'Mississippi',
  missouri: 'Missouri',
  montana: 'Montana',
  nebraska: 'Nebraska',
  nevada: 'Nevada',
  'new-hampshire': 'New Hampshire',
  'new-jersey': 'New Jersey',
  'new-mexico': 'New Mexico',
  'new-york': 'New York',
  'north-carolina': 'North Carolina',
  'north-dakota': 'North Dakota',
  ohio: 'Ohio',
  oklahoma: 'Oklahoma',
  oregon: 'Oregon',
  pennsylvania: 'Pennsylvania',
  'rhode-island': 'Rhode Island',
  'south-carolina': 'South Carolina',
  'south-dakota': 'South Dakota',
  tennessee: 'Tennessee',
  texas: 'Texas',
  utah: 'Utah',
  vermont: 'Vermont',
  virginia: 'Virginia',
  washington: 'Washington',
  'west-virginia': 'West Virginia',
  wisconsin: 'Wisconsin',
  wyoming: 'Wyoming',
};

const params = getAllCountyParams();
const zeroByState = new Map<string, number>();
const lowByState = new Map<string, number>();
const distribution = new Map<number, number>();
let zeroTotal = 0;
let lowTotal = 0;

for (const { stateSlug, countySlug } of params) {
  const movers = getMoversForCounty(stateSlug, countySlug)?.movers.length ?? 0;
  distribution.set(movers, (distribution.get(movers) ?? 0) + 1);

  if (movers === 0) {
    zeroTotal += 1;
    zeroByState.set(stateSlug, (zeroByState.get(stateSlug) ?? 0) + 1);
  } else if (movers >= 1 && movers <= 4) {
    lowTotal += 1;
    lowByState.set(stateSlug, (lowByState.get(stateSlug) ?? 0) + 1);
  }
}

const topEmptyStates = [...zeroByState.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 8)
  .map(([slug, count]) => ({
    stateSlug: slug,
    stateName: STATE_NAMES[slug] ?? slug,
    emptyCounties: count,
  }));

const pct = ((zeroTotal / params.length) * 100).toFixed(1);

const report = {
  generatedAt: new Date().toISOString(),
  totalCounties: params.length,
  zeroMovers: zeroTotal,
  zeroMoversPct: Number(pct),
  lowMovers1to4: lowTotal,
  distribution: Object.fromEntries([...distribution.entries()].sort((a, b) => a[0] - b[0])),
  topEmptyStates,
  zeroByState: Object.fromEntries(
    [...zeroByState.entries()].sort((a, b) => b[1] - a[1])
  ),
};

writeFileSync('scripts/output/national-mover-coverage-report.json', JSON.stringify(report, null, 2));

console.log('National Mover Coverage Audit');
console.log('=============================');
console.log(`Total Counties: ${params.length}`);
console.log(`Counties with 0 movers: ${zeroTotal} (${pct}%)`);
console.log(`Counties with 1–4 movers: ${lowTotal}`);
console.log('');
console.log('Top empty states:');
for (const row of topEmptyStates) {
  console.log(`  ${row.stateName} (${row.emptyCounties})`);
}
console.log('');
console.log('Mover count distribution (sample):');
for (const [n, count] of [...distribution.entries()].sort((a, b) => a[0] - b[0]).slice(0, 12)) {
  console.log(`  ${n} movers: ${count} counties`);
}
console.log('\nWrote scripts/output/national-mover-coverage-report.json');