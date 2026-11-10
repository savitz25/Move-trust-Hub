import assert from 'node:assert/strict';
import test from 'node:test';
import { parseHeadquarters } from '@/lib/local-movers/parse-headquarters';

test('comma-separated ZIP formats keep the state and never invent one', () => {
  const cases: Array<[string, string, string | undefined]> = [
    ['CITY, ST, 12345', 'CITY', undefined],
    ['MIAMI, FL, 33101', 'MIAMI', 'FL'],
    ['Miami, FL 33101', 'Miami', 'FL'],
    ['Miami, FL 33101-1234', 'Miami', 'FL'],
    ['  west palm beach  ,  fl  ,  33413  ', 'west palm beach', 'FL'],
    ['Miami, fl', 'Miami', 'FL'],
    ['Miami', 'Miami', undefined],
    ['Miami, 33101', 'Miami', undefined],
    ['Miami, ZZ, 33101', 'Miami', undefined],
    ['', '', undefined],
    ['123 Main St, Miami, FL 33101', 'Miami', 'FL'],
  ];

  for (const [raw, city, stateCode] of cases) {
    const parsed = parseHeadquarters(raw);
    assert.equal(parsed.city.toLowerCase(), city.toLowerCase(), raw);
    assert.equal(parsed.stateCode, stateCode, raw);
  }

  // "CITY, ST" is a state only when ST is a real code. ZZ is not.
  assert.equal(parseHeadquarters('CITY, ST, 12345').stateCode, undefined);
  assert.equal(parseHeadquarters('CITY, ZZ 12345').stateCode, undefined);
});

test('audit carrier headquarters strings parse to the right state', () => {
  const carriers = [
    ['6051 SOUTHERN BLVD #400, WEST PALM BEACH, FL, 33413', 'WEST PALM BEACH', 'FL'],
    ['15887 RATTLESNAKE RD, GRASS VALLEY, CA, 95945', 'GRASS VALLEY', 'CA'],
    ['10049 HARRISON STE 500, ROMULUS, MI, 48174', 'ROMULUS', 'MI'],
    ['18850 MASONIC BLVD, ROSEVILLE, MI, 48066-1296', 'ROSEVILLE', 'MI'],
    ['1220 S Dale Mabry Hwy Ste 205, Tampa, FL 33629', 'TAMPA', 'FL'],
    ['5815 Memorial Hwy Ste B, Tampa, FL 33615', 'TAMPA', 'FL'],
  ] as const;

  for (const [raw, city, stateCode] of carriers) {
    const parsed = parseHeadquarters(raw);
    assert.equal(parsed.stateCode, stateCode, raw);
    assert.equal(parsed.city.toUpperCase(), city, raw);
  }

  assert.equal(
    parseHeadquarters('18850 MASONIC BLVD, ROSEVILLE, MI, 48066-1296').stateCode,
    'MI'
  );
  assert.notEqual(
    parseHeadquarters('10049 HARRISON STE 500, ROMULUS, MI, 48174').stateCode,
    'FL'
  );
});
