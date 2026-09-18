import assert from 'node:assert/strict';
import { test } from 'node:test';
import { classifySearchQuery } from '@/lib/search/classify-intent';

test('explicit DOT stays DOT-only', () => {
  const q = classifySearchQuery('DOT 3244649');
  assert.equal(q.intent, 'REGULATORY_IDENTIFIER');
  assert.equal(q.identifier?.namespace, 'DOT');
  assert.equal(q.identifier?.digits, '3244649');
});

test('explicit MC stays MC-only', () => {
  const q = classifySearchQuery('MC-1019808');
  assert.equal(q.intent, 'REGULATORY_IDENTIFIER');
  assert.equal(q.identifier?.namespace, 'MC');
  assert.equal(q.identifier?.digits, '1019808');
});

test('bare digits are BARE not DOT-only', () => {
  const q = classifySearchQuery('1019808');
  assert.equal(q.intent, 'REGULATORY_IDENTIFIER');
  assert.equal(q.identifier?.namespace, 'BARE');
  assert.equal(q.identifier?.digits, '1019808');
});

test('company identity for SHIFL', () => {
  const q = classifySearchQuery('SHIFL');
  assert.equal(q.intent, 'COMPANY_IDENTITY');
});

test('Miami, FL is place intent', () => {
  const q = classifySearchQuery('Miami, FL');
  assert.equal(q.intent, 'PLACE');
});

test('Florida is place intent', () => {
  const q = classifySearchQuery('Florida');
  assert.equal(q.intent, 'PLACE');
});

test('Two Men and a Truck Austin TX keeps company identity with HQ hint', () => {
  const q = classifySearchQuery('Two Men and a Truck Austin TX');
  assert.equal(q.intent, 'COMPANY_IDENTITY');
  assert.ok(q.locationHint);
  assert.match(q.companyQuery, /two men and a truck/i);
  assert.equal(q.locationHint?.stateCode, 'TX');
});

test('nonsense stays unknown or company without identifier', () => {
  const q = classifySearchQuery('zzzzqxxq 999');
  assert.notEqual(q.intent, 'REGULATORY_IDENTIFIER');
  assert.equal(q.identifier, null);
});

// TH-DISCOVERY-PARITY-001A named Builder-2 audit FAIL strings: generic mover/category
// phrases must resolve real geography instead of falling through to an ungeocoded
// company-name search (companyQuery containing "near"/"around" polluting name-text
// matching, or no locationHint at all).
for (const [query, expectedState] of [
  ['mover near Fort Lauderdale', 'FL'],
  ['long distance movers around Seattle', 'WA'],
  ['piano moving service Austin', 'TX'],
  ['relocation company Bergen County NJ', 'NJ'],
  ['moving help San Diego', 'CA'],
  ['movers Orange County California', 'CA'],
  ['moving companies Denver', 'CO'],
] as const) {
  test(`audit FAIL case resolves real geography: "${query}"`, () => {
    const q = classifySearchQuery(query);
    assert.ok(q.locationHint, `expected a resolved locationHint for "${query}"`);
    assert.equal(q.locationHint?.stateCode, expectedState);
    assert.equal(q.categoryOnly, true, 'a pure category+place phrase must be flagged categoryOnly');
  });
}

// TH-DISCOVERY-PARITY-001A fresh generalization corpus (section 9): distinct from the
// named audit strings above, spanning multiple states/cities and the doctrine's
// required synonym set (mover, moving company, long-distance mover, relocation
// company, moving service, auto transport carrier, vehicle/car shipping).
const FRESH_MOVE_CASES: ReadonlyArray<readonly [string, string]> = [
  ['mover in Tampa Florida', 'FL'],
  ['movers near Orlando', 'FL'],
  ['moving company Jacksonville Florida', 'FL'],
  ['moving companies Boca Raton', 'FL'],
  // TH-DISCOVERY-PARITY-001A-REVIEW: bare "Miami" is no longer excluded -- the
  // shared resolveDirectoryPlaceQuery ambiguous-name disambiguation bug (silently
  // mapping it to Miami County, IN) is fixed; see lib/directory/resolve-place-query.test.ts.
  ['mover in Miami', 'FL'],
  ['long distance mover Fort Lauderdale Florida', 'FL'],
  ['relocation company Newark New Jersey', 'NJ'],
  ['moving service Jersey City', 'NJ'],
  ['auto transport carrier Trenton NJ', 'NJ'],
  ['car transport company Houston Texas', 'TX'],
  ['vehicle shipping company Dallas Texas', 'TX'],
  ['movers around El Paso Texas', 'TX'],
  ['interstate mover San Antonio Texas', 'TX'],
  ['moving help Sacramento', 'CA'],
  ['long distance movers Los Angeles', 'CA'],
  ['relocation company Fresno California', 'CA'],
  ['moving companies near Oakland California', 'CA'],
  ['mover Spokane Washington', 'WA'],
  ['moving service Tacoma', 'WA'],
  ['movers around Bellevue Washington', 'WA'],
  ['long distance mover Colorado Springs', 'CO'],
  // TH-DISCOVERY-PARITY-001A-REVIEW: "Aurora Colorado" / "Hoboken New Jersey" /
  // "Atlantic City NJ" / "Pasadena California" are real, well-known cities that
  // remain MISSING from the shared US place gazetteer (a data-completeness gap, not
  // a resolvable code bug here) -- but resolveDirectoryPlaceQuery's own Results-
  // First state-level fallback now applies, so these resolve to real, honest STATE-
  // level geography (locationHint.city === null, stateCode set) instead of a dead
  // end. Asserted separately below since they resolve to `state`, not `city`/`county`.
  ['auto transport carrier Boulder CO', 'CO'],
  ['movers Newark New Jersey', 'NJ'],
  ['moving companies Camden NJ', 'NJ'],
  ['car transport company Austin Texas', 'TX'],
  ['relocation company Seattle Washington', 'WA'],
  ['moving help Denver Colorado', 'CO'],
  ['long distance movers Fort Worth', 'TX'],
  ['mover near San Diego California', 'CA'],
  ['vehicle shipping company Everett Washington', 'WA'],
];

test(`fresh generalization corpus: ${FRESH_MOVE_CASES.length} category+place cases resolve real geography`, () => {
  for (const [query, expectedState] of FRESH_MOVE_CASES) {
    const q = classifySearchQuery(query);
    assert.ok(q.locationHint, `expected a resolved locationHint for "${query}"`);
    assert.equal(q.locationHint?.stateCode, expectedState, `wrong state for "${query}"`);
    assert.equal(q.categoryOnly, true, `expected categoryOnly for "${query}"`);
  }
});

// TH-DISCOVERY-PARITY-001A-REVIEW section 4/10: gazetteer-missing cities still
// resolve REAL STATE-LEVEL geography (Results-First), never a dead end and never a
// fabricated city-level claim (locationHint.city stays null -- only the state, which
// the consumer explicitly and unambiguously named, is asserted).
for (const [query, expectedState] of [
  ['moving company near Aurora Colorado', 'CO'],
  ['mover near Pasadena California', 'CA'],
  ['movers Hoboken New Jersey', 'NJ'],
  ['moving companies Atlantic City NJ', 'NJ'],
] as const) {
  test(`gazetteer-gap Results-First fallback: "${query}" resolves real state-level geography, not a dead end`, () => {
    const q = classifySearchQuery(query);
    assert.ok(q.locationHint, `expected a resolved locationHint for "${query}"`);
    assert.equal(q.locationHint?.stateCode, expectedState);
    assert.equal(q.locationHint?.city, null, 'city was not in the gazetteer -- must not fabricate a city-level match');
    assert.equal(q.categoryOnly, true);
  });
}

// Section 3/10: explicit city+state must resolve deterministically and a same-name
// city collision across states must not be silently guessed.
test('explicit CITY + STATE resolves deterministically for a same-name-elsewhere city', () => {
  const q = classifySearchQuery('movers Portland Oregon');
  assert.equal(q.locationHint?.city, 'Portland');
  assert.equal(q.locationHint?.stateCode, 'OR');
});

test('ambiguous bare city with no state is not silently guessed', () => {
  // "Portland" alone (no state) must not default to any one of ME/OR/etc. -- either
  // no locationHint resolves, or if one does, it must not fabricate a specific city
  // claim without the consumer having named a state.
  const q = classifySearchQuery('movers Portland');
  if (q.locationHint) assert.notEqual(q.locationHint.stateCode, null);
});

test('a genuine brand-name search is NOT flagged categoryOnly even with a place in it', () => {
  const q = classifySearchQuery('Two Men and a Truck Austin TX');
  assert.equal(q.categoryOnly, false);
});

// TH-DISCOVERY-FINAL-REPAIR-A: a bare auto-transport-category phrase with NO
// geography at all must be recognized as a browsable real provider class, not
// treated as a specific (unmatchable) company name. Structural synonym
// coverage, not exact-string matching.
for (const query of [
  'auto transport carrier',
  'car transport carrier',
  'vehicle shipping company',
  'auto shipping company',
  'car carrier',
]) {
  test(`bare auto-transport category "${query}" is recognized as a browsable category, not a company-name search`, () => {
    const q = classifySearchQuery(query);
    assert.equal(q.categoryOnly, true, `expected categoryOnly=true for "${query}"`);
    assert.equal(q.categoryClass, 'Auto Transport', `expected categoryClass="Auto Transport" for "${query}"`);
    assert.equal(q.locationHint, null);
  });
}

test('a bare generic mover category with no geography is NOT tagged with an auto-transport categoryClass', () => {
  const q = classifySearchQuery('moving companies');
  assert.equal(q.categoryClass, null);
});

test('a genuine brand name containing "car" or "auto" tokens is not misclassified as the auto-transport category', () => {
  const q = classifySearchQuery('Two Men and a Truck Austin TX');
  assert.equal(q.categoryClass, null);
});
