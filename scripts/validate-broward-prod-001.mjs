/**
 * BROWARD-PROD-001 static validator — read-only contracts.
 * Does not publish DB rows.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const OUT = resolve(
  'data/county-regulatory/fl/broward/production/broward-prod-001'
);

function load(name) {
  const p = resolve(OUT, name);
  assert.ok(existsSync(p), `missing ${name}`);
  return JSON.parse(readFileSync(p, 'utf8'));
}

assert.ok(existsSync('scripts/broward-prod-001-finalize.mjs'));
assert.ok(
  existsSync(
    'docs/county-regulatory/fl/broward/production/broward-prod-001-roster-recovery-qualification.md'
  )
);
assert.ok(existsSync('data/county-regulatory/fl/broward/normalized/fl-c004-summary.json'));

const summary = load('readiness-summary.json');
assert.equal(summary.status, 'BLOCKED — BROWARD OFFICIAL ROSTER REQUIRES PRA');
assert.equal(summary.production_db_writes, 0);
assert.equal(summary.google_places_api_requests, 0);
assert.equal(summary.pra_sent, false);
assert.equal(summary.records_recovered, 0);

const roster = load('roster-access-audit.json');
assert.equal(roster.completeness_class, 'PRA_REQUIRED');
assert.equal(roster.records_recovered, 0);
assert.equal(roster.commercial_substitution, false);
assert.equal(roster.sampling_used, false);

const norm = load('normalized-mover-roster.json');
assert.equal(norm.recovery_status, 'NOT_RECOVERED');
assert.equal(norm.count, 0);

const fdacs = load('fdacs-crosswalk.json');
assert.equal(fdacs.rows_evaluated, 0);
assert.equal(fdacs.name_only_matches, 0);
assert.equal(fdacs.wrong_company, 0);

const canon = load('canonical-crosswalk.json');
assert.equal(canon.CANONICAL_LINK_READY, 0);
assert.equal(canon.companies_created, 0);

const vehicle = load('vehicle-decal-audit.json');
assert.equal(vehicle.treat_decal_as_mover_registration, false);
assert.equal(vehicle.records, 0);

const complaints = load('complaint-data-audit.json');
assert.equal(complaints.allegation_equals_violation, false);
assert.equal(complaints.consumer_pii, 0);

const schema = load('schema-fit-audit.json');
assert.equal(schema.mover_registration.classification, 'REUSE_AS_IS');
assert.equal(schema.vehicle_decal.classification, 'MINIMAL_EXTENSION_REQUIRED');
assert.equal(schema.vehicle_decal.migration_in_this_task, false);

const pool = load('production-ready-pool.json');
assert.equal(pool.credential_rows, 0);
assert.equal(pool.distinct_companies, 0);

const wave = load('wave-a-internal-draft.json');
assert.equal(wave.status, 'NONE');
assert.equal(wave.apply, false);

const pra = load('pra-request-package.json');
assert.equal(pra.package_id, 'BROWARD_PRA_ROSTER_REQUEST_V1');
assert.equal(pra.sent, false);
assert.equal(pra.consumer_pii_requested, false);
assert.match(pra.request_text, /Consumer Affairs/);
assert.match(pra.request_text, /NOT provide/i);

const rules = load('qualification-ruleset.json');
assert.equal(rules.ruleset_id, 'BROWARD_COUNTY_MOVER_QUALIFICATION_V1');
assert.equal(rules.name_only_match, 'NOT_SUFFICIENT');

const pbc = load('pbc-freeze.json');
assert.equal(pbc.broward_task_pbc_writes, 0);
const mdc = load('mdc-freeze.json');
assert.equal(mdc.broward_task_mdc_writes, 0);
const state = load('state-freeze.json');
assert.equal(state.broward_task_state_writes, 0);

const ledger = load('broward-readiness-ledger.json');
assert.equal(ledger.production_writes, 0);
assert.equal(ledger.official_mover_records_recovered, 0);

// Ensure finalize script forbids commercial/Google paths
const fin = readFileSync('scripts/broward-prod-001-finalize.mjs', 'utf8');
assert.match(fin, /Production DB writes: 0/);
assert.match(fin, /Google Places: 0/);
assert.doesNotMatch(fin, /insert into provider_county_credential/i);
assert.doesNotMatch(fin, /places\.googleapis|maps\.googleapis/i);

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-broward-prod-001',
      status: summary.status,
      records_recovered: 0,
      pra_sent: false,
      production_db_writes: 0,
      google_places_api_requests: 0,
      consumer_pii: 0,
    },
    null,
    2
  )
);
