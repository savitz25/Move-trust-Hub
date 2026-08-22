/**
 * FL-C003 — validate Palm Beach evidence qualification package.
 * No DB writes. No Google Places APIs.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
}

const OUT = resolve('data/county-regulatory/fl/palm-beach/evidence/c003');
const required = [
  'PBC_FDACS_RECONCILIATION_V1.json',
  'PBC_COUNTY_EVIDENCE_V1.json',
  'c002-baseline-recomputed.json',
  'permit-fdacs-reconciliation.json',
  'canonical-crosswalk-summary.json',
  'review-required-triage.json',
  'not-found-analysis.json',
  'verified-precision-qa.json',
  'permit-evidence-qualification.json',
  'complaint-evidence-qualification.json',
  'enforcement-evidence-qualification.json',
  'disposition-catalog-with-groups.json',
  'source-authority-model.json',
  'county-pilot-readiness.json',
  'fl-c003-summary.json',
  'stack-vs-main-identity-note.json',
];
for (const f of required) {
  assert.ok(existsSync(resolve(OUT, f)), `missing ${f}`);
}

const summary = readJson(resolve(OUT, 'fl-c003-summary.json'));
const recon = readJson(resolve(OUT, 'permit-fdacs-reconciliation.json'));
const precision = readJson(resolve(OUT, 'verified-precision-qa.json'));
const baseline = readJson(resolve(OUT, 'c002-baseline-recomputed.json'));
const pilot = readJson(resolve(OUT, 'county-pilot-readiness.json'));
const stackNote = readJson(resolve(OUT, 'stack-vs-main-identity-note.json'));
const complaints = readJson(resolve(OUT, 'complaint-evidence-qualification.json'));
const enforcement = readJson(resolve(OUT, 'enforcement-evidence-qualification.json'));
const dispositions = readJson(resolve(OUT, 'disposition-catalog-with-groups.json'));

assert.equal(summary.google_places_api_requests, 0);
assert.equal(summary.production_writes, false);
assert.equal(summary.production_db_migrations, 0);
assert.equal(summary.consumer_pii_committed, 0);
assert.equal(recon.production_writes, false);
assert.equal(recon.google_places_api_requests, 0);

assert.equal(baseline.active_licensed_permits, 142);
assert.equal(recon.records.length, 142);

const sumCounts = Object.values(recon.counts).reduce((a, b) => a + b, 0);
assert.equal(sumCounts, 142);

for (const r of recon.records) {
  assert.ok(
    ['VERIFIED', 'REVIEW_REQUIRED', 'NOT_FOUND', 'CONFLICT', 'NOT_APPLICABLE'].includes(
      r.match_result
    )
  );
  assert.equal(r.ruleset, 'PBC_FDACS_RECONCILIATION_V1');
  if (r.match_result === 'VERIFIED') {
    assert.ok(r.candidate_fdacs_id);
    assert.ok(Array.isArray(r.supporting_evidence) && r.supporting_evidence.length > 0);
    // never name-only
    const onlyName =
      r.supporting_evidence.every((s) => s === 'exact_legal_name' || s === 'exact_dba') &&
      !r.supporting_evidence.some((s) =>
        ['exact_phone', 'exact_physical_address', 'exact_business_email'].includes(s)
      );
    assert.equal(onlyName, false);
  }
  if (r.match_result !== 'VERIFIED') {
    assert.equal(r.canonical_class === 'CANONICAL_LINKED', false);
  }
}

assert.equal(precision.gate, 'PASS');
assert.ok(precision.precision >= 98);
assert.equal(precision.verified_checked, precision.correct + precision.incorrect);
assert.equal(precision.incorrect, 0);

assert.equal(stackNote.rebase_performed, false);
assert.equal(stackNote.county_stack_preserved, true);

for (const c of complaints.records) {
  assert.equal(c.misconduct_inference, 'FORBIDDEN');
  if (c.official_disposition_code) {
    assert.equal(c.disposition_code_in_official_catalog, true);
    assert.ok(c.official_disposition_description);
  }
}

assert.ok(dispositions.count >= 40);
for (const d of dispositions.values) {
  assert.ok('official_code' in d);
  assert.ok('official_description' in d);
}

assert.ok(enforcement.unique_event_count > 0);
assert.ok(enforcement.unique_event_count <= enforcement.raw_count);

assert.ok(
  ['READY_FOR_COUNTY_PILOT_1_INTERNAL', 'NOT_READY_FAIL_CLOSED'].includes(pilot.recommendation)
);

const script = readFileSync(
  resolve('scripts/fl-c003-palm-beach-evidence-qualification.mjs'),
  'utf8'
);
assert.ok(!/places\.googleapis\.com/i.test(script));
assert.ok(!/@googlemaps/i.test(script));
assert.ok(!/prisma\.(company|companies)\.(create|update|upsert)/i.test(script));

console.log(
  JSON.stringify(
    {
      ok: true,
      permits: recon.records.length,
      counts: recon.counts,
      precision: precision.precision,
      gate: precision.gate,
      pilot: pilot.recommendation,
      google: 0,
      writes: 0,
    },
    null,
    2
  )
);
