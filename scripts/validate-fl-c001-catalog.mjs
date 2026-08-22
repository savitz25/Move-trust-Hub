/**
 * FL-C001 — lightweight catalog/ranking schema validation.
 * No DB. No Google APIs.
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import assert from 'node:assert/strict';

const ranking = JSON.parse(
  readFileSync(
    resolve('docs/county-regulatory/fl/task-fl-c001-county-ranking.json'),
    'utf8'
  )
);
const catalog = JSON.parse(
  readFileSync(resolve('data/regulatory-source-catalog/fl/county-sources.json'), 'utf8')
);

assert.equal(ranking.google_places_api_requests, 0);
assert.equal(ranking.production_mutations, false);
assert.equal(ranking.counties.length, 15);
assert.equal(catalog.google_places_api_requests, 0);
assert.equal(catalog.production_writes, false);

const tiers = Object.fromEntries(
  ranking.counties.map((c) => [c.county, c.tier])
);
assert.equal(tiers['Palm Beach'], 'A');
assert.equal(tiers.Broward, 'A');
assert.equal(tiers['Miami-Dade'], 'A');
assert.equal(tiers.Pinellas, 'A');

const scores = ranking.counties.map((c) => c.county_value_score);
const sorted = [...ranking.counties].sort(
  (a, b) => b.county_value_score - a.county_value_score || a.rank - b.rank
);
assert.deepEqual(
  ranking.counties.map((c) => c.county),
  sorted.map((c) => c.county)
);

for (const s of catalog.sources) {
  assert.ok(s.source_id && s.agency && s.official_url);
  assert.ok(['HIGH', 'MEDIUM', 'LOW', 'NONE', 'UNKNOWN', true, false].includes(s.move_value) || typeof s.move_value === 'string');
}

assert.equal(
  ranking.recommended_fl_c002.county,
  'Palm Beach'
);

console.log(
  JSON.stringify(
    {
      ok: true,
      counties: ranking.counties.length,
      sources: catalog.sources.length,
      google: 0,
      recommended: ranking.recommended_fl_c002.task,
    },
    null,
    2
  )
);
