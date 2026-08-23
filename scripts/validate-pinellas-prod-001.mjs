/**
 * PINELLAS-PROD-001 static validator — read-only contracts.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const OUT = resolve(
  'data/county-regulatory/fl/pinellas/production/pinellas-prod-001'
);

function load(name) {
  const p = resolve(OUT, name);
  assert.ok(existsSync(p), `missing ${name}`);
  return JSON.parse(readFileSync(p, 'utf8'));
}

assert.ok(existsSync('scripts/pinellas-prod-001-finalize.mjs'));
assert.ok(
  existsSync(
    'docs/county-regulatory/fl/pinellas/production/pinellas-prod-001-complaint-qualification.md'
  )
);
assert.ok(
  existsSync('data/county-regulatory/fl/pinellas/normalized/fl-c007-summary.json')
);

const summary = load('readiness-summary.json');
assert.equal(
  summary.status,
  'PINELLAS COMPLAINT RESEARCH COMPLETE — NO_SAFE_INTERNAL_COHORT'
);
assert.equal(summary.production_db_writes, 0);
assert.equal(summary.google_places_api_requests, 0);
assert.equal(summary.consumer_pii_committed, 0);
assert.equal(summary.fake_credential, false);
assert.equal(summary.ready_pool, 0);

const model = load('regulatory-model-revalidation.json');
assert.equal(
  model.model,
  'ORDINANCE_REGULATION_WITHOUT_SEPARATE_PUBLIC_CREDENTIAL'
);
assert.equal(model.fake_credential_created, false);

const match = load('canonical-match-audit.json');
assert.equal(match.CANONICAL_LINK_READY, 0);
assert.equal(match.wrong_company, 0);
assert.ok(match.name_only_rejected >= 24);

const semantics = load('complaint-status-semantics.json');
assert.equal(semantics.allegation_equals_violation, false);
assert.equal(semantics.complaint_equals_enforcement, false);
assert.equal(semantics.complaint_vs_disposition, 'SEPARATE');

const zero = load('source-coverage-limitations.json');
assert.equal(zero.completeness_class, 'SAMPLE_ONLY');
assert.equal(
  zero.zero_result_semantics,
  'NO_COMPLAINT_RECORD_RETURNED_FOR_SEARCH_WINDOW'
);

const pii = load('consumer-pii-policy.json');
assert.equal(pii.consumer_pii_committed, 0);
assert.equal(pii.consumer_pii_published, 0);

const fit = load('production-model-fit.json');
assert.ok(
  ['REUSE_AS_IS', 'MINIMAL_EXTENSION_REQUIRED', 'MODEL_NOT_SAFE'].includes(
    fit.classification
  )
);
assert.equal(fit.force_into_provider_county_credential, false);
assert.equal(fit.migration_in_this_task, false);

const draft = load('internal-staging-draft.json');
assert.equal(draft.status, 'NONE');
assert.equal(draft.apply, false);

const pool = load('internal-ready-pool.json');
assert.equal(pool.cases, 0);

const broward = load('broward-freeze.json');
assert.equal(broward.pra_sent, false);
assert.equal(broward.pinellas_task_broward_writes, 0);

const pbc = load('pbc-freeze.json');
assert.equal(pbc.pinellas_task_pbc_writes, 0);
const mdc = load('mdc-freeze.json');
assert.equal(mdc.pinellas_task_mdc_writes, 0);

const sim = load('public-exposure-simulation.json');
assert.equal(sim.complaint_ui, 0);
assert.equal(sim.trust_score, 0);

const fin = readFileSync('scripts/pinellas-prod-001-finalize.mjs', 'utf8');
assert.match(fin, /Production DB writes: 0/);
assert.doesNotMatch(fin, /insert into provider_county_credential/i);
assert.doesNotMatch(fin, /places\.googleapis|maps\.googleapis/i);

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-pinellas-prod-001',
      status: summary.status,
      ready_pool: 0,
      fake_credential: false,
      production_db_writes: 0,
      google_places_api_requests: 0,
      consumer_pii: 0,
    },
    null,
    2
  )
);
