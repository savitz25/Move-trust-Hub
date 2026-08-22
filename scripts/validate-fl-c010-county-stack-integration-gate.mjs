/**
 * FL-C010 — validate county stack integration gate package.
 * Design/readiness only. No merge. No DB writes. No Google Places.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
}

const ROOT = resolve('data/county-regulatory/fl/architecture/c010');
const DOCS = resolve('docs/county-regulatory/architecture/integration');

const requiredJson = [
  'fl-county-research-v1-freeze.json',
  'file-inventory.json',
  'transplant-allowlist.json',
  'large-artifact-audit.json',
  'pii-audit.json',
  'main-compatibility-audit.json',
  'state-track-gate.json',
  'fl-c010-summary.json',
  'rehearsal-copy-report.json',
  'rehearsal-results.json',
  'conflict-report.json',
  'integration-readiness.json',
  'future-integration-manifest.json',
];

for (const f of requiredJson) {
  assert.ok(existsSync(resolve(ROOT, f)), `missing ${f}`);
}

assert.ok(existsSync(resolve(DOCS, 'FL_COUNTY_STACK_INTEGRATION_RUNBOOK_V1.md')));
assert.ok(existsSync(resolve(DOCS, 'FL_C010_INTEGRATION_GATE.md')));

const freeze = readJson(resolve(ROOT, 'fl-county-research-v1-freeze.json'));
assert.equal(freeze.freeze_id, 'FL_COUNTY_RESEARCH_V1_FREEZE');
assert.equal(
  freeze.frozen_head_sha,
  '1256170855439413242acadf68e659e53f4aabc3'
);

const allow = readJson(resolve(ROOT, 'transplant-allowlist.json'));
assert.equal(allow.strategy, 'STRATEGY_3_SELECTIVE_TRANSPLANT');
assert.ok(allow.include_count >= 300, 'include_count unexpectedly low');
assert.equal(allow.include.length, allow.include_count);
assert.equal(allow.review.length, allow.review_count);
assert.equal(allow.exclude.length, allow.exclude_count);

const pii = readJson(resolve(ROOT, 'pii-audit.json'));
assert.equal(pii.consumer_pii_included_in_transplant_allowlist, 0);

const gate = readJson(resolve(ROOT, 'state-track-gate.json'));
assert.ok(['YES', 'NO'].includes(gate.SAFE_TO_INTEGRATE_COUNTY_STACK_NOW));
assert.equal(gate.merge_now, false);
assert.equal(gate.transplant_now, false);

const ready = readJson(resolve(ROOT, 'integration-readiness.json'));
assert.equal(ready.STATE_TRACK_ACTIVE, 'YES');
assert.equal(ready.TECHNICALLY_READY_FOR_SELECTIVE_TRANSPLANT, 'YES');
assert.ok(['YES', 'NO'].includes(ready.SAFE_TO_INTEGRATE_COUNTY_STACK_NOW));
assert.equal(ready.transplant_now, false);
assert.equal(ready.merge_now, false);

const rehearsal = readJson(resolve(ROOT, 'rehearsal-results.json'));
assert.equal(rehearsal.validators_failed, 0);
assert.ok(rehearsal.validators_passed >= 10);
assert.equal(rehearsal.persistent_changes_to_main, false);
assert.equal(rehearsal.merge_executed, false);
assert.equal(rehearsal.TECHNICALLY_READY_FOR_SELECTIVE_TRANSPLANT, 'YES');

const summary = readJson(resolve(ROOT, 'fl-c010-summary.json'));
assert.ok(['YES', 'NO'].includes(summary.SAFE_TO_INTEGRATE_COUNTY_STACK_NOW));
assert.equal(summary.consumer_pii_committed, 0);
assert.equal(summary.google_places_api_requests, 0);
assert.equal(summary.production_writes, false);
assert.equal(summary.merge_executed, false);
assert.equal(summary.transplant_executed_to_main, false);

// Extended gate artifacts (L–AH)
for (const f of [
  'google-audit.json',
  'migration-audit.json',
  'current-main-path-collision-audit.json',
  'package-script-conflict-plan.json',
  'source-hash-validation.json',
  'current-main-linkage-delta.json',
  'palm-beach-current-cohort-recheck.json',
  'transplant-manifest-v1.json',
  'pr-status-audit.json',
  'rehearsal-diff-summary.json',
  'rehearsal-build-and-tests.json',
  'transplant-review-list.json',
  'transplant-exclude-list.json',
  'county-research-freeze-manifest.json',
]) {
  assert.ok(existsSync(resolve(ROOT, f)), `missing ${f}`);
}

const google = readJson(resolve(ROOT, 'google-audit.json'));
assert.equal(google.new_google_places_api_requests_made, 0);
const mig = readJson(resolve(ROOT, 'migration-audit.json'));
assert.equal(mig.production_migrations_introduced_by_c001_c010, 0);
const hashes = readJson(resolve(ROOT, 'source-hash-validation.json'));
assert.equal(hashes.hash_mismatch, 0);
const collision = readJson(resolve(ROOT, 'current-main-path-collision-audit.json'));
assert.equal(collision.counts.PATH_CONFLICT_REQUIRES_MANUAL_REVIEW, 0);
const diff = readJson(resolve(ROOT, 'rehearsal-diff-summary.json'));
assert.equal(diff.files_modified, 0);
assert.equal(diff.files_deleted, 0);
assert.equal(diff.runtime_files_changed_count, 0);
assert.equal(diff.pushed, false);
const manifest = readJson(resolve(ROOT, 'transplant-manifest-v1.json'));
assert.equal(manifest.expected_runtime_delta, 0);
assert.equal(manifest.expected_production_behavior_delta, 0);
assert.equal(manifest.consumer_pii_included, 0);
const buildTests = readJson(resolve(ROOT, 'rehearsal-build-and-tests.json'));
assert.equal(buildTests.build.ok, true);
assert.ok(buildTests.tests.every((t) => t.ok));

assert.ok(
  existsSync(resolve('docs/county-regulatory/fl/integration/future-integration-runbook.md'))
);
assert.ok(
  existsSync(resolve('docs/county-regulatory/fl/integration/research-pr-disposition-plan.md'))
);

// Ensure allowlist does not sneak in forbidden path classes
const forbidden = [/^\.env/i, /node_modules\//i, /supabase\/migrations\//i, /(^|\/)\.next\//i];
for (const p of allow.include) {
  for (const re of forbidden) {
    assert.ok(!re.test(p), `forbidden path in include: ${p}`);
  }
}

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-fl-c010-integration-gate',
      STATE_TRACK_ACTIVE: gate.STATE_TRACK_ACTIVE,
      TECHNICALLY_READY_FOR_SELECTIVE_TRANSPLANT:
        ready.TECHNICALLY_READY_FOR_SELECTIVE_TRANSPLANT,
      SAFE_TO_INTEGRATE_COUNTY_STACK_NOW: gate.SAFE_TO_INTEGRATE_COUNTY_STACK_NOW,
      success_state: gate.success_state || ready.success_state || null,
      include_count: allow.include_count,
      review_count: allow.review_count,
      validators_passed_in_rehearsal: rehearsal.validators_passed,
      frozen_head_sha: freeze.frozen_head_sha,
      google_places_api_requests: 0,
      consumer_pii_committed: 0,
      production_writes: false,
      production_db_migrations: 0,
      merge_executed: false,
      transplant_executed_to_main: false,
      expected_runtime_delta: 0,
      recommended_fl_c011:
        ready.recommended_next_task ||
        'FL-C011 — County Research Stack Selective-Transplant Integration & Validation',
    },
    null,
    2
  )
);
