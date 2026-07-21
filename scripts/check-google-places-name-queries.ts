/**
 * Unit checks for multi-query Google Places name matching (no API key needed).
 * Run: npx tsx scripts/check-google-places-name-queries.ts
 */
import {
  buildGooglePlacesQueryVariants,
  normalizeNameForMatch,
  parseCityStateFromHeadquarters,
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

const polluted = parseCityStateFromHeadquarters('Otterly Elite Movers LLC, OR');
assert(polluted.state === 'OR', 'parses OR from Name, OR headquarters');
assert(
  !polluted.city || polluted.city.length === 0,
  'does not treat company name as city'
);

const realHq = parseCityStateFromHeadquarters('Winston, OR');
assert(realHq.city === 'Winston' && realHq.state === 'OR', 'parses Winston, OR');

const otterlyVariants = buildGooglePlacesQueryVariants({
  legalName: 'Otterly Elite Movers LLC',
  state: 'OR',
  phone: '(541) 900-6565',
});
assert(
  otterlyVariants.some(
    (v) =>
      normalizeNameForMatch(v.searchName) ===
        normalizeNameForMatch('Otterly Elite Movers') &&
      !v.textQuery.toLowerCase().includes('otterly elite movers llc or')
  ),
  'variants include stripped name without polluted city'
);
assert(
  otterlyVariants.some((v) => v.strategy.includes('phone')),
  'includes phone-based query variants'
);
assert(
  otterlyVariants.some((v) => v.locationBias != null),
  'applies state locationBias'
);

const falsePositive = scoreGooglePlaceMatch(
  {
    displayName: 'Elite Movers LLC',
    formattedAddress: '6486 Dorchester Rd, North Charleston, SC 29418',
    phone: '(843) 695-9979',
  },
  'Otterly Elite Movers',
  '',
  'OR'
);
assert(
  falsePositive === 0,
  `rejects Elite Movers when searching Otterly (got ${falsePositive})`
);

const falseSc = scoreGooglePlaceMatch(
  {
    displayName: 'Elite Movers LLC',
    formattedAddress: 'North Charleston, SC',
  },
  'Otterly Elite Movers LLC',
  'Winston',
  'OR'
);
assert(falseSc === 0, 'rejects wrong-state Elite Movers for Otterly LLC');

const good = scoreGooglePlaceMatch(
  {
    displayName: 'Otterly Elite Movers',
    formattedAddress: '21 SE Edwards St, Winston, OR 97496',
    phone: '(541) 900-6565',
  },
  'Otterly Elite Movers LLC',
  'Winston',
  'OR',
  '(541) 900-6565'
);
assert(good >= 78, `accepts true Otterly match with phone+OR (got ${good})`);

if (process.exitCode) {
  console.error('\nGoogle Places name-query checks failed.');
  process.exit(1);
}
console.log('\nAll Google Places name-query checks passed.');
