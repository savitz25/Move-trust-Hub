import assert from 'node:assert/strict';
import { test } from 'node:test';
import { resolveDirectoryPlaceQuery } from './resolve-place-query';

// TH-DISCOVERY-PARITY-001A-REVIEW section 4: the shared place-resolution source
// (also used by directory pages and classify-intent.ts's category+place resolution,
// not new architecture) silently mapped bare "Miami" to Miami County, IN instead of
// the world-famous Miami, FL -- a real false-locality risk for any ordinary
// discovery query naming it. Root cause: a bare city with no state was resolved by
// iterating states in a fixed order and returning the FIRST county-name match, with
// no population/prominence signal, ahead of the scored city-index lookup that would
// have found the correct answer.

test('DANGEROUS-class regression: bare "Miami" resolves to Miami, FL, never Miami County, IN', () => {
  const place = resolveDirectoryPlaceQuery('Miami');
  assert.ok(place);
  assert.equal(place!.stateCode, 'FL');
  assert.notEqual(place!.stateCode, 'IN');
});

test('explicit "Miami Florida" resolves deterministically to Miami, FL', () => {
  const place = resolveDirectoryPlaceQuery('Miami Florida');
  assert.ok(place);
  assert.equal(place!.stateCode, 'FL');
  assert.equal(place!.kind, 'city');
});

test('explicit "Miami FL" (state code form) resolves the same way', () => {
  const place = resolveDirectoryPlaceQuery('Miami FL');
  assert.ok(place);
  assert.equal(place!.stateCode, 'FL');
});

test('a genuinely unambiguous same-name-elsewhere county control still resolves correctly (no state named)', () => {
  // "Denver" is a real county name in exactly one state (CO, coextensive with the
  // city) -- confirms the single-match fast path still works after requiring
  // exactly-one-match instead of first-match.
  const place = resolveDirectoryPlaceQuery('Denver');
  assert.ok(place);
  assert.equal(place!.stateCode, 'CO');
});

test('explicit CITY + STATE resolves deterministically when the place is in the supported geography reference', () => {
  const place = resolveDirectoryPlaceQuery('Fort Lauderdale, FL');
  assert.ok(place);
  assert.equal(place!.stateCode, 'FL');
  assert.equal(place!.kind, 'city');
});

// Section 4: "Aurora, Colorado" and "Pasadena, California" -- real, well-known
// mid/large US cities missing from this gazetteer entirely (a data-completeness
// gap, not a resolvable code bug in this pass). Results-First: an explicit,
// unambiguous STATE the consumer actually named must still produce a real state-
// level result instead of a bare dead end.
test('Results-First fallback: "Aurora Colorado" (city missing from the gazetteer) still returns real Colorado state-level results, not a dead end', () => {
  const place = resolveDirectoryPlaceQuery('Aurora Colorado');
  assert.ok(place, 'must not be a bare null dead end when the state is explicit and valid');
  assert.equal(place!.stateCode, 'CO');
  assert.equal(place!.kind, 'state');
});

test('Results-First fallback: "Pasadena California" (city missing from the gazetteer) still returns real California state-level results, not a dead end', () => {
  const place = resolveDirectoryPlaceQuery('Pasadena California');
  assert.ok(place, 'must not be a bare null dead end when the state is explicit and valid');
  assert.equal(place!.stateCode, 'CA');
  assert.equal(place!.kind, 'state');
});

test('an ambiguous bare city with NO state and no unambiguous county match is not guessed incorrectly', () => {
  // "Pasadena" alone (no state, and not itself a unique county name anywhere) must
  // not silently attribute a state -- honest non-resolution beats a false guess.
  const place = resolveDirectoryPlaceQuery('Pasadena');
  assert.equal(place, null);
});
