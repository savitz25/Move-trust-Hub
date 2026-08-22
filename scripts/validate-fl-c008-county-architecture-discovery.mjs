/**
 * FL-C008 — validate county regulatory architecture discovery package.
 * No DB writes. No Google Places APIs. No production migrations.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
}

const ROOT = resolve('data/county-regulatory/fl/architecture/c008');
const META = resolve('data/county-regulatory/fl/architecture/meta');
const DOCS = resolve('docs/county-regulatory/architecture');

const requiredJson = [
  'four-pilot-summary.json',
  'county-regulatory-posture-model.json',
  'capability-matrix.json',
  'concept-catalog.json',
  'production-schema-reuse-audit.json',
  'evidence-lifecycle.json',
  'adapter-contract.json',
  'stack-manifest.json',
  'stack-integration-options.json',
  'state-track-coordination.json',
  'first-production-pilot.json',
  'first-production-feature-sequence.json',
  'national-portability.json',
  'network-reuse.json',
  'fl-c008-summary.json',
  'recommended-fl-c009.json',
];
for (const f of requiredJson) {
  assert.ok(existsSync(resolve(ROOT, f)), `missing ${f}`);
}

for (const f of [
  'COUNTY_REGULATORY_ARCHITECTURE_V1.md',
  'stack-integration-runbook.md',
  'future-county-onboarding-playbook.md',
  'schema-sketch.md',
]) {
  assert.ok(existsSync(resolve(DOCS, f)), `missing doc ${f}`);
}

assert.ok(existsSync(resolve(META, 'stack-vs-main-note.json')));
assert.ok(existsSync(resolve(META, 'raw-provenance.json')));

const summary = readJson(resolve(ROOT, 'fl-c008-summary.json'));
const state = readJson(resolve(ROOT, 'state-track-coordination.json'));
const pilot = readJson(resolve(ROOT, 'first-production-pilot.json'));
const rec = readJson(resolve(ROOT, 'recommended-fl-c009.json'));
const options = readJson(resolve(ROOT, 'stack-integration-options.json'));
const audit = readJson(resolve(ROOT, 'production-schema-reuse-audit.json'));
const concepts = readJson(resolve(ROOT, 'concept-catalog.json'));
const posture = readJson(resolve(ROOT, 'county-regulatory-posture-model.json'));
const lifecycle = readJson(resolve(ROOT, 'evidence-lifecycle.json'));
const waves = readJson(resolve(ROOT, 'first-production-feature-sequence.json'));
const manifest = readJson(resolve(ROOT, 'stack-manifest.json'));
const stackMeta = readJson(resolve(META, 'stack-vs-main-note.json'));
const provenance = readJson(resolve(META, 'raw-provenance.json'));
const four = readJson(resolve(ROOT, 'four-pilot-summary.json'));

assert.equal(summary.google_places_api_requests, 0);
assert.equal(summary.production_writes, false);
assert.equal(summary.production_db_migrations, 0);
assert.equal(summary.consumer_pii_committed, 0);
assert.equal(summary.trust_score_connection, false);
assert.equal(summary.production_schema_created, false);
assert.equal(provenance.google_places_api_requests, 0);
assert.equal(provenance.consumer_pii_committed, 0);
assert.equal(provenance.production_writes, false);
assert.equal(provenance.production_db_migrations, 0);

assert.equal(state.SAFE_TO_INTEGRATE_COUNTY_STACK_NOW, 'NO');
assert.equal(summary.SAFE_TO_INTEGRATE_COUNTY_STACK_NOW, 'NO');
assert.equal(stackMeta.SAFE_TO_INTEGRATE_COUNTY_STACK_NOW, 'NO');
assert.equal(stackMeta.rebase_performed, false);
assert.equal(stackMeta.merge_performed, false);

assert.equal(pilot.first_production_county, 'Palm Beach');
assert.equal(summary.first_production_pilot, 'Palm Beach');
assert.equal(four.first_production_pilot, 'Palm Beach');

const expectedC009 =
  'FL-C009 — Palm Beach County Production Evidence Integration Spec V1 (design-only; no merge/no publish)';
assert.equal(rec.recommended_fl_c009, expectedC009);
assert.equal(summary.recommended_fl_c009, expectedC009);
assert.ok(!/merge to main|publish to production/i.test(rec.recommended_fl_c009));

assert.equal(options.recommended_strategy_id, 'STRATEGY_3_SELECTIVE_TRANSPLANT');
assert.equal(options.execute_now, false);
assert.equal(options.strategies.length, 3);

assert.equal(audit.storage_recommendation, 'OPTION_D_HYBRID');
assert.equal(audit.psa_overload_forbidden, true);
assert.equal(audit.production_db_migrations, 0);
const psa = audit.audits.find((a) => a.concept === 'provider_state_authority');
assert.ok(psa);
assert.equal(psa.decision, 'REUSE_EXISTING');
const countyCred = audit.audits.find((a) => a.concept === 'county_credential');
assert.ok(countyCred);
assert.equal(countyCred.decision, 'NEW_CONCEPT_REQUIRED');

const postureIds = posture.postures.map((p) => p.id).sort();
assert.deepEqual(postureIds, ['CREDENTIAL_BASED', 'ORDINANCE_ONLY']);

const stageIds = lifecycle.stages.map((s) => s.id);
assert.deepEqual(stageIds, [
  'DISCOVERED',
  'ACQUIRED',
  'NORMALIZED',
  'QUALIFIED',
  'LINKED',
  'PUBLICATION_ELIGIBLE',
  'PUBLISHED',
]);

const waveIds = waves.waves.map((w) => w.id);
assert.deepEqual(waveIds, ['A', 'B', 'C', 'D']);
assert.equal(waves.pilot_county, 'Palm Beach');
assert.equal(waves.trust_score, 'UNCHANGED_IN_ALL_WAVES_V1');

const classSet = new Set(concepts.concepts.map((c) => c.classification));
for (const required of ['V1_REQUIRED', 'V1_OPTIONAL', 'RESEARCH_ONLY', 'FUTURE']) {
  assert.ok(classSet.has(required), `missing classification ${required}`);
}
const zero = concepts.concepts.find((c) => c.id === 'zero_result');
assert.equal(zero.classification, 'RESEARCH_ONLY');
const trust = concepts.concepts.find((c) => c.id === 'trust_score_boundary');
assert.equal(trust.classification, 'V1_REQUIRED');

assert.equal(manifest.origin_main_observed, '4711355486f3787e5c154cadeb0ff6d11dbb0118');
assert.equal(manifest.c007_head, '05e018e2236cd1f865ef3808874aa388065720df');
assert.equal(summary.origin_main_observed, '4711355486f3787e5c154cadeb0ff6d11dbb0118');
assert.equal(summary.c007_head, '05e018e2236cd1f865ef3808874aa388065720df');

const prs = Object.fromEntries(
  manifest.entries.filter((e) => e.pr !== 'TBD').map((e) => [e.task_id, e.pr])
);
assert.equal(prs['FL-C001'], 45);
assert.equal(prs['FL-C002'], 48);
assert.equal(prs['FL-C003'], 51);
assert.equal(prs['FL-C004'], 52);
assert.equal(prs['FL-C005'], 54);
assert.equal(prs['FL-C006'], 56);
assert.equal(prs['FL-C007'], 58);
assert.equal(manifest.entries.find((e) => e.task_id === 'FL-C008').pr, 'TBD');

// No Google/Places references as integration plan for county matching
const adr = readFileSync(resolve(DOCS, 'COUNTY_REGULATORY_ARCHITECTURE_V1.md'), 'utf8');
assert.ok(/Google Places/i.test(adr));
assert.ok(/do not change Trust Score|does NOT change Trust Score|MUST NOT alter Trust Score/i.test(adr));
assert.ok(/Palm Beach/i.test(adr));
assert.ok(/STRATEGY_3|Strategy 3/i.test(adr));
assert.ok(!/apply migration|run migration/i.test(summary.status));

// Prior pilot validator artifacts still exist
const priorArtifacts = [
  'docs/county-regulatory/fl/task-fl-c001-county-ranking.json',
  'data/county-regulatory/fl/palm-beach/normalized/fl-c002-summary.json',
  'data/county-regulatory/fl/palm-beach/evidence/c003/fl-c003-summary.json',
  'data/county-regulatory/fl/broward/normalized/fl-c004-summary.json',
  'data/county-regulatory/fl/miami-dade/normalized/fl-c005-summary.json',
  'data/county-regulatory/fl/miami-dade/qualified/fl-c006-summary.json',
  'data/county-regulatory/fl/pinellas/normalized/fl-c007-summary.json',
  'scripts/validate-fl-c001-catalog.mjs',
  'scripts/validate-fl-c002-palm-beach.mjs',
  'scripts/validate-fl-c003-palm-beach-qualification.mjs',
  'scripts/validate-fl-c004-broward-acquisition.mjs',
  'scripts/validate-fl-c005-miami-dade-acquisition.mjs',
  'scripts/validate-fl-c006-miami-dade-qualification.mjs',
  'scripts/validate-fl-c007-pinellas-acquisition.mjs',
];
for (const p of priorArtifacts) {
  assert.ok(existsSync(resolve(p)), `prior artifact missing: ${p}`);
}

assert.ok(summary.package_hash && summary.package_hash !== 'PENDING_EMIT');
assert.ok(String(summary.package_hash).length >= 8);

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-fl-c008-county-architecture-discovery',
      SAFE_TO_INTEGRATE_COUNTY_STACK_NOW: 'NO',
      first_production_pilot: 'Palm Beach',
      recommended_fl_c009: expectedC009,
      recommended_stack_strategy: 'STRATEGY_3_SELECTIVE_TRANSPLANT',
      package_hash: summary.package_hash,
      google_places_api_requests: 0,
      production_writes: false,
      production_db_migrations: 0,
      consumer_pii_committed: 0,
    },
    null,
    2
  )
);
