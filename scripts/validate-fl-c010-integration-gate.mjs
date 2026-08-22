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
assert.equal(gate.SAFE_TO_INTEGRATE_COUNTY_STACK_NOW, 'NO');
assert.equal(gate.merge_now, false);

const ready = readJson(resolve(ROOT, 'integration-readiness.json'));
assert.equal(ready.STATE_TRACK_ACTIVE, 'YES');
assert.equal(ready.TECHNICALLY_READY_FOR_SELECTIVE_TRANSPLANT, 'YES');
assert.equal(ready.SAFE_TO_INTEGRATE_COUNTY_STACK_NOW, 'NO');
assert.equal(ready.transplant_now, false);

const rehearsal = readJson(resolve(ROOT, 'rehearsal-results.json'));
assert.equal(rehearsal.validators_failed, 0);
assert.ok(rehearsal.validators_passed >= 10);
assert.equal(rehearsal.persistent_changes_to_main, false);
assert.equal(rehearsal.merge_executed, false);
assert.equal(rehearsal.TECHNICALLY_READY_FOR_SELECTIVE_TRANSPLANT, 'YES');
assert.equal(rehearsal.SAFE_TO_INTEGRATE_COUNTY_STACK_NOW, 'NO');

const summary = readJson(resolve(ROOT, 'fl-c010-summary.json'));
assert.equal(summary.SAFE_TO_INTEGRATE_COUNTY_STACK_NOW, 'NO');
assert.equal(summary.consumer_pii_committed, 0);
assert.equal(summary.google_places_api_requests, 0);
assert.equal(summary.production_writes, false);
assert.equal(summary.merge_executed, false);
assert.equal(summary.transplant_executed_to_main, false);

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
      STATE_TRACK_ACTIVE: 'YES',
      TECHNICALLY_READY_FOR_SELECTIVE_TRANSPLANT: 'YES',
      SAFE_TO_INTEGRATE_COUNTY_STACK_NOW: 'NO',
      include_count: allow.include_count,
      review_count: allow.review_count,
      validators_passed_in_rehearsal: rehearsal.validators_passed,
      frozen_head_sha: freeze.frozen_head_sha,
      google_places_api_requests: 0,
      consumer_pii_committed: 0,
      production_writes: false,
      production_db_migrations: 0,
      merge_executed: false,
      recommended_fl_c011:
        'FL-C011 — County Research Stack Selective-Transplant Integration (execute only when SAFE_TO_INTEGRATE=YES)',
    },
    null,
    2
  )
);
