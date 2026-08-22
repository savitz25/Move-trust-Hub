/**
 * PBC-PROD-001 package validator (pre-apply / post-apply aware).
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const OUT = resolve('data/county-regulatory/fl/palm-beach/production/pbc-prod-001');
const mig = resolve(
  'supabase/migrations/20260822170000_pbc_prod_001_county_credential_foundation.sql'
);

assert.ok(existsSync(mig), 'migration missing');
const sql = readFileSync(mig, 'utf8');
assert.match(sql, /county_regulatory_program/);
assert.match(sql, /provider_county_credential/);
assert.match(sql, /ENABLE ROW LEVEL SECURITY/);
assert.match(sql, /REVOKE ALL ON public\.provider_county_credential FROM anon, authenticated/);
assert.doesNotMatch(sql, /CREATE TABLE IF NOT EXISTS public\.provider_state_authority/i);
assert.doesNotMatch(sql, /ALTER TABLE\s+public\.provider_state_authority/i);
assert.doesNotMatch(sql, /UPDATE\s+public\.companies/i);
assert.doesNotMatch(sql, /INSERT INTO\s+public\.provider_state_authority/i);
assert.ok(
  /Distinct from provider_state_authority|Never overload provider_state_authority/i.test(sql),
  'migration should document PSA boundary'
);

assert.ok(existsSync(resolve(OUT, 'live-cohort-preflight.json')));
assert.ok(existsSync(resolve(OUT, 'pbc-county-credential-wave-a-internal-v1.json')));
assert.ok(existsSync(resolve(OUT, 'schema-reuse-audit.json')));

const pre = JSON.parse(readFileSync(resolve(OUT, 'live-cohort-preflight.json'), 'utf8'));
assert.equal(pre.gate, 'PASS');
assert.equal(pre.still_production_link_ready, 46);
assert.equal(pre.dropped_from_current_linkage, 0);
assert.equal(pre.review_required_now, 0);

const manifest = JSON.parse(
  readFileSync(resolve(OUT, 'pbc-county-credential-wave-a-internal-v1.json'), 'utf8')
);
assert.equal(manifest.wave_id, 'PBC_COUNTY_CREDENTIAL_WAVE_A_INTERNAL_V1');
assert.equal(manifest.count, 46);
assert.equal(manifest.members.length, 46);
assert.equal(manifest.evidence_publication_state, 'INTERNAL_ONLY');
assert.equal(manifest.publish, false);
assert.ok(manifest.manifest_hash && manifest.manifest_hash.length === 64);
assert.equal(manifest.google_places_api_requests, 0);
assert.equal(manifest.consumer_pii_committed, 0);

const mvs = new Set();
const companies = new Set();
for (const m of manifest.members) {
  assert.ok(m.company_id);
  assert.ok(m.palm_beach_mv);
  assert.ok(m.fdacs_im);
  assert.equal(m.evidence_publication_state, 'INTERNAL_ONLY');
  assert.equal(m.match_ruleset, 'PBC_FDACS_RECONCILIATION_V1');
  assert.ok(!mvs.has(m.palm_beach_mv), `dup mv ${m.palm_beach_mv}`);
  mvs.add(m.palm_beach_mv);
  companies.add(m.company_id);
}
assert.equal(mvs.size, 46);

assert.ok(existsSync('scripts/ingest-pbc-prod-001-wave-a.mjs'));
assert.ok(
  existsSync('docs/county-regulatory/fl/palm-beach/production/pbc-prod-001-implementation.md')
);

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-pbc-prod-001',
      wave_id: manifest.wave_id,
      count: 46,
      manifest_hash: manifest.manifest_hash,
      unique_companies: companies.size,
      preflight_gate: pre.gate,
      google_places_api_requests: 0,
      consumer_pii_committed: 0,
    },
    null,
    2
  )
);
