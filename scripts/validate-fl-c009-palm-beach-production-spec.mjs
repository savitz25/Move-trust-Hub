/**
 * FL-C009 — validate Palm Beach production integration specification package.
 * Design-only. No DB writes. No Google Places APIs.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
}

const ROOT = resolve('data/county-regulatory/fl/architecture/c009');
const DOCS = resolve('docs/county-regulatory/architecture/palm-beach-v1');
const META = resolve(ROOT, 'meta');
const COHORT = resolve(ROOT, 'cohort/pbc-production-integration-cohort-v1.json');
const READY = resolve(ROOT, 'cohort/pbc-production-link-ready-v1.json');

const requiredDocs = [
  'PALM_BEACH_COUNTY_REGULATORY_PILOT_V1.md',
  'storage-and-schema-spec.md',
  'wave-a-credential-spec.md',
  'wave-b-identity-contact-spec.md',
  'wave-c-complaint-disposition-spec.md',
  'wave-d-enforcement-spec.md',
  'read-api-and-ingestion-contracts.md',
  'selective-transplant-allowlist.md',
  'implementation-sequence.md',
  'current-main-compatibility.md',
];
for (const f of requiredDocs) {
  assert.ok(existsSync(resolve(DOCS, f)), `missing doc ${f}`);
}

const requiredJson = [
  'fl-c009-summary.json',
  'state-track-coordination.json',
  'production-storage-decision.json',
  'credential-storage-spec.json',
  'source-provenance-spec.json',
  'contact-observation-reuse.json',
  'owner-officer-decision.json',
  'fleet-decision.json',
  'complaint-storage-spec.json',
  'disposition-storage-spec.json',
  'enforcement-storage-spec.json',
  'evidence-publication-state.json',
  'cross-source-link-decision.json',
  'wave-a-spec.json',
  'wave-b-spec.json',
  'wave-c-spec.json',
  'wave-d-spec.json',
  'company-publication-interaction.json',
  'profile-presentation-spec.json',
  'county-page-presentation-spec.json',
  'read-api-contract.json',
  'ingestion-upsert-contract.json',
  'freshness-history-spec.json',
  'migration-specification.json',
  'future-data-delta.json',
  'duplicate-collision-safety.json',
  'pii-gate.json',
  'rollback-spec.json',
  'selective-transplant-allowlist.json',
  'implementation-sequence.json',
  'first-implementation-task-spec.json',
  'network-portability.json',
  'recommended-fl-c010.json',
];
for (const f of requiredJson) {
  assert.ok(existsSync(resolve(ROOT, f)), `missing json ${f}`);
}

assert.ok(existsSync(COHORT));
assert.ok(existsSync(READY));
assert.ok(existsSync(resolve(META, 'stack-vs-main-note.json')));
assert.ok(existsSync(resolve(META, 'raw-provenance.json')));
assert.ok(
  existsSync(resolve('docs/county-regulatory/architecture/COUNTY_REGULATORY_ARCHITECTURE_V1.md'))
);

const summary = readJson(resolve(ROOT, 'fl-c009-summary.json'));
const state = readJson(resolve(ROOT, 'state-track-coordination.json'));
const storage = readJson(resolve(ROOT, 'production-storage-decision.json'));
const waveA = readJson(resolve(ROOT, 'wave-a-spec.json'));
const rec = readJson(resolve(ROOT, 'recommended-fl-c010.json'));
const cohort = readJson(COHORT);
const ready = readJson(READY);
const provenance = readJson(resolve(META, 'raw-provenance.json'));
const stackMeta = readJson(resolve(META, 'stack-vs-main-note.json'));
const firstTask = readJson(resolve(ROOT, 'first-implementation-task-spec.json'));

assert.equal(summary.design_only, true);
assert.equal(summary.google_places_api_requests, 0);
assert.equal(summary.production_writes, false);
assert.equal(summary.production_db_migrations, 0);
assert.equal(summary.consumer_pii_committed, 0);
assert.equal(summary.trust_score_connection, false);
assert.equal(summary.production_schema_created, false);
assert.equal(summary.SAFE_TO_INTEGRATE_COUNTY_STACK_NOW, 'NO');
assert.equal(state.SAFE_TO_INTEGRATE_COUNTY_STACK_NOW, 'NO');
assert.equal(stackMeta.SAFE_TO_INTEGRATE_COUNTY_STACK_NOW, 'NO');
assert.equal(stackMeta.rebase_performed, false);
assert.equal(provenance.google_places_api_requests, 0);
assert.equal(provenance.consumer_pii_committed, 0);

assert.equal(summary.first_production_pilot, 'Palm Beach');
assert.equal(summary.production_link_ready, 46);
assert.equal(ready.row_count, 46);
assert.equal(cohort.integration_class_counts.PRODUCTION_LINK_READY, 46);
assert.equal(cohort.integration_class_counts.FDACS_LINKED_NO_CANONICAL, 18);
assert.equal(cohort.integration_class_counts.REVIEW_REQUIRED, 12);
assert.equal(cohort.integration_class_counts.COUNTY_ONLY, 66);
assert.equal(cohort.baseline_permits, 142);
assert.equal(cohort.reconciliation_counts.VERIFIED, 64);
assert.equal(cohort.current_verified_with_canonical, 46);
assert.equal(cohort.canonical_delta.gained, 0);
assert.equal(cohort.canonical_delta.lost, 0);

assert.equal(summary.psa_overload_forbidden, true);
assert.ok(/STATE/i.test(String(summary.psa_remains)));
assert.equal(storage.storage_recommendation || storage.recommendation || summary.storage_recommendation, 'OPTION_D_HYBRID');

assert.equal(summary.wave_a_evidence_publication_state, 'INTERNAL_ONLY');
assert.equal(summary.wave_a_publish, false);
assert.ok(/INTERNAL/i.test(JSON.stringify(waveA)));

const expectedC010 =
  'FL-C010 — County Stack Integration Gate — WAIT_FOR_STATE_TRACK_STABILITY';
assert.equal(summary.recommended_fl_c010, expectedC010);
assert.equal(rec.recommended_fl_c010, expectedC010);
assert.equal(rec.execute_transplant_in_c010, false);
assert.equal(state.execute_transplant_now, false);
assert.equal(summary.stack_transplant_before_pbc_prod, true);

assert.ok(/PBC-PROD-001/i.test(JSON.stringify(firstTask)));
assert.ok(/publish nothing|INTERNAL_ONLY|publish:\s*false/i.test(JSON.stringify(firstTask)));

// No production migration files introduced by this task path
assert.ok(!existsSync(resolve('supabase/migrations/fl-c009-palm-beach.sql')));

// Prior county validators/artifacts still present
assert.ok(
  existsSync(resolve('data/county-regulatory/fl/palm-beach/qualified/pbc-fdacs-crosswalk-v1.json'))
);
assert.ok(existsSync(resolve('data/county-regulatory/fl/broward/normalized/fl-c004-summary.json')));
assert.ok(
  existsSync(resolve('data/county-regulatory/fl/miami-dade/qualified/fl-c006-summary.json'))
);
assert.ok(existsSync(resolve('data/county-regulatory/fl/pinellas/normalized/fl-c007-summary.json')));
assert.ok(
  existsSync(resolve('data/county-regulatory/fl/architecture/c008/fl-c008-summary.json'))
);

const script = readFileSync(resolve('scripts/fl-c009-emit-palm-beach-production-spec.mjs'), 'utf8');
assert.ok(!/places\.googleapis\.com/i.test(script));
assert.ok(!/google\.maps\.places/i.test(script));
assert.ok(!/prisma\.(company|companies)\.(create|update|upsert)/i.test(script));

const docs = readdirSync(DOCS).filter((f) => f.endsWith('.md'));
assert.ok(docs.length >= 10);

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-fl-c009-palm-beach-production-spec',
      SAFE_TO_INTEGRATE_COUNTY_STACK_NOW: 'NO',
      PRODUCTION_LINK_READY: 46,
      first_production_pilot: 'Palm Beach',
      wave_a: 'INTERNAL_ONLY',
      recommended_fl_c010: expectedC010,
      package_hash: summary.package_hash,
      google: 0,
      consumer_pii_committed: 0,
      production_writes: false,
      production_db_migrations: 0,
    },
    null,
    2
  )
);
