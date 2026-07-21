/**
 * Unit checks for multi-query Google Places name matching (no API key needed).
 * Run: npx tsx scripts/check-google-places-name-queries.ts
 */
import {
  buildGooglePlacesQueryVariants,
  normalizeNameForMatch,
  scoreGooglePlaceMatch,
  stripLegalEntitySuffixes,
} from '../lib/verification/google-places-name-queries';

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error('FAIL:', msg);
    process.exitCode = 1;
  } else {
    console.log('ok:', msg);
  }
}

assert(
  stripLegalEntitySuffixes('Otterly Elite Movers LLC') === 'Otterly Elite Movers',
  'strips LLC'
);
assert(
  stripLegalEntitySuffixes('Budget Movers of Augusta, Inc.') ===
    'Budget Movers of Augusta',
  'strips Inc with comma'
);
assert(
  stripLegalEntitySuffixes('Acme Moving L.L.C.') === 'Acme Moving',
  'strips L.L.C.'
);
assert(
  stripLegalEntitySuffixes('Mighty Moving Inc') === 'Mighty Moving',
  'strips Inc'
);
assert(
  stripLegalEntitySuffixes('Otterly Elite Movers') === 'Otterly Elite Movers',
  'leaves clean trade name alone'
);

const otterlyVariants = buildGooglePlacesQueryVariants({
  legalName: 'Otterly Elite Movers LLC',
  city: 'Austin',
  state: 'TX',
});
assert(
  otterlyVariants.some((v) =>
    v.textQuery.toLowerCase().includes('otterly elite movers')
  ),
  'variants include stripped name'
);
assert(
  otterlyVariants.some(
    (v) =>
      normalizeNameForMatch(v.searchName) ===
      normalizeNameForMatch('Otterly Elite Movers')
  ),
  'searchName includes stripped Otterly Elite Movers'
);
const firstStrippedIdx = otterlyVariants.findIndex((v) =>
  v.strategy.includes('stripped')
);
const firstFullLegalIdx = otterlyVariants.findIndex(
  (v) =>
    normalizeNameForMatch(v.searchName) ===
    normalizeNameForMatch('Otterly Elite Movers LLC')
);
assert(firstStrippedIdx >= 0, 'has a stripped strategy');
assert(firstFullLegalIdx >= 0, 'still tries full legal name as a variant');
assert(
  firstStrippedIdx < firstFullLegalIdx,
  'stripped variants ordered before full legal LLC name'
);

const dbaVariants = buildGooglePlacesQueryVariants({
  legalName: '2001-31 REALTY LLC',
  dbaName: 'Dumbo Moving & Storage',
  city: 'Brooklyn',
  state: 'NY',
});
assert(
  dbaVariants[0]!.searchName.toLowerCase().includes('dumbo'),
  'DBA preferred early in variant list'
);

const high = scoreGooglePlaceMatch(
  {
    displayName: 'Otterly Elite Movers',
    formattedAddress: '123 Main St, Austin, TX 78701',
  },
  'Otterly Elite Movers',
  'Austin',
  'TX'
);
assert(high >= 72, `high-confidence match scores high (got ${high})`);

const low = scoreGooglePlaceMatch(
  {
    displayName: 'Random Plumbing Co',
    formattedAddress: 'Seattle, WA',
  },
  'Otterly Elite Movers',
  'Austin',
  'TX'
);
assert(low < 48, `unrelated place scores low (got ${low})`);

if (process.exitCode) {
  console.error('\nGoogle Places name-query checks failed.');
  process.exit(1);
}
console.log('\nAll Google Places name-query checks passed.');
