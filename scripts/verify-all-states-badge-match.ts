import { localStates } from '../lib/local-movers/states';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';
import { getCountyMarketMoverCount } from '../lib/local-movers/county-market-mover-counts';

const samples = [
  'florida',
  'new-york',
  'illinois',
  'michigan',
  'georgia',
  'ohio',
  'pennsylvania',
  'arizona',
  'washington',
  'colorado',
  'california',
  'texas',
];

let totalCounties = 0;
let mismatches = 0;
let empty = 0;

for (const state of localStates) {
  const counties = getCountiesForState(state.slug);
  for (const c of counties) {
    totalCounties++;
    const listed =
      getMoversForCounty(state.slug, c.slug)?.movers.length ?? 0;
    if (listed === 0) empty++;
    // State page uses listed first — badge matches listed
    // Map is secondary; report map drift only
    const mapped = getCountyMarketMoverCount(state.slug, c.slug);
    if (mapped !== null && mapped !== listed) {
      mismatches++;
      if (mismatches <= 15) {
        console.log(
          `map drift ${state.slug}/${c.slug} map=${mapped} listed=${listed}`
        );
      }
    }
  }
}

console.log({
  totalCounties,
  emptyListings: empty,
  mapDrifts: mismatches,
});

for (const slug of samples) {
  const counties = getCountiesForState(slug);
  const first = counties[0];
  if (!first) continue;
  const n =
    getMoversForCounty(slug, first.slug)?.movers.length ?? 0;
  const major = counties.find((c) =>
    [
      'miami-dade',
      'cook',
      'wayne',
      'fulton',
      'kings',
      'harris',
      'los-angeles',
      'maricopa',
      'king',
      'denver',
      'philadelphia',
      'franklin',
    ].includes(c.slug)
  );
  const majorN = major
    ? getMoversForCounty(slug, major.slug)?.movers.length
    : null;
  console.log(
    `${slug}: first=${first.slug}:${n}` +
      (major ? ` major=${major.slug}:${majorN}` : '')
  );
}
