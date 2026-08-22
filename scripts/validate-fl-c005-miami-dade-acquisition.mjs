/**
 * FL-C005 — validate Miami-Dade acquisition/staging package.
 * Mirrors validate-fl-c004-broward-acquisition.mjs adapted for MDC.
 * No DB writes. No Google Places APIs.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
}

const NORM = resolve('data/county-regulatory/fl/miami-dade/normalized');
const META = resolve('data/county-regulatory/fl/miami-dade/meta');
const RAW = resolve('data/county-regulatory/fl/miami-dade/raw');

const required = [
  'program-verification.json',
  'source-interfaces.json',
  'field-inventory.json',
  'roster-completeness.json',
  'mover-licenses.json',
  'business-tax-observations.json',
  'branch-observations.json',
  'vehicle-observations.json',
  'identity-contact-observations.json',
  'complaint-observations.json',
  'complaint-dispositions.json',
  'citation-observations.json',
  'enforcement-observations.json',
  'complaint-system-profile.json',
  'enforcement-system-profile.json',
  'vehicle-profile.json',
  'branch-model.json',
  'insurance-workers-comp-observations.json',
  'lbt-crosswalk.json',
  'fdacs-matchability.json',
  'canonical-matchability.json',
  'cross-source-anomalies.json',
  'incremental-value.json',
  'three-county-comparison.json',
  'architecture-pressure-test.json',
  'county-page-potential-mock.json',
  'future-company-profile-evidence-design.json',
  'network-reuse-note.json',
  'court-bulk-discovery-note.json',
  'fl-c005-summary.json',
];
for (const f of required) {
  assert.ok(existsSync(resolve(NORM, f)), `missing ${f}`);
}

assert.ok(existsSync(resolve(META, 'raw-provenance.json')));
assert.ok(existsSync(resolve(META, 'stack-vs-main-note.json')));
assert.ok(existsSync(resolve(RAW, 'energov-mr-moving-roster.json')));
assert.ok(existsSync(resolve(RAW, 'lbt-moving-category-extract.json')));
assert.ok(existsSync(resolve(RAW, 'movers-moving-registration.txt')));

const summary = readJson(resolve(NORM, 'fl-c005-summary.json'));
const program = readJson(resolve(NORM, 'program-verification.json'));
const roster = readJson(resolve(NORM, 'roster-completeness.json'));
const movers = readJson(resolve(NORM, 'mover-licenses.json'));
const lbt = readJson(resolve(NORM, 'business-tax-observations.json'));
const branches = readJson(resolve(NORM, 'branch-observations.json'));
const vehicles = readJson(resolve(NORM, 'vehicle-observations.json'));
const complaints = readJson(resolve(NORM, 'complaint-observations.json'));
const dispositions = readJson(resolve(NORM, 'complaint-dispositions.json'));
const citations = readJson(resolve(NORM, 'citation-observations.json'));
const enforcement = readJson(resolve(NORM, 'enforcement-observations.json'));
const match = readJson(resolve(NORM, 'fdacs-matchability.json'));
const canonical = readJson(resolve(NORM, 'canonical-matchability.json'));
const lbtX = readJson(resolve(NORM, 'lbt-crosswalk.json'));
const fields = readJson(resolve(NORM, 'field-inventory.json'));
const insurance = readJson(resolve(NORM, 'insurance-workers-comp-observations.json'));
const architecture = readJson(resolve(NORM, 'architecture-pressure-test.json'));
const comparison = readJson(resolve(NORM, 'three-county-comparison.json'));
const provenance = readJson(resolve(META, 'raw-provenance.json'));
const stack = readJson(resolve(META, 'stack-vs-main-note.json'));

assert.equal(summary.google_places_api_requests, 0);
assert.equal(summary.production_writes, false);
assert.equal(summary.production_db_migrations, 0);
assert.equal(summary.consumer_pii_committed, 0);
assert.equal(provenance.google_places_api_requests, 0);
assert.equal(provenance.consumer_pii_committed, 0);
assert.equal(provenance.production_writes, false);
assert.ok(provenance.files.length > 0);
for (const f of provenance.files) {
  assert.ok(f.sha256 && f.sha256.length === 64);
  assert.equal(f.modified, false);
}

assert.ok(/Moving Business/i.test(program.credential_primary_name));
assert.ok(/8A/i.test(program.ordinance));
assert.equal(program.current_status, 'OPERATING');

assert.equal(roster.completeness_classification, 'NEAR_FULL_ACTIVE_ROSTER');
assert.equal(roster.public_roster_found, true);
assert.equal(movers.row_count, 409);
assert.equal(movers.records.length, 409);
assert.equal(movers.issued_count, 117);
assert.equal(branches.row_count, 0);
assert.equal(vehicles.row_count, 0);
assert.equal(complaints.row_count, 0);
assert.equal(dispositions.row_count, 0);
assert.equal(citations.row_count, 0);
assert.equal(enforcement.row_count, 0);
assert.equal(complaints.consumer_pii_committed, 0);
assert.equal(complaints.access_class, 'INTAKE_ONLY');
assert.equal(dispositions.access_class, 'PRA_REQUIRED');

const ids = new Set();
let issued = 0;
for (const r of movers.records) {
  assert.ok(r.source_record_id?.startsWith('FL-MDC-MOVER-'));
  assert.ok(r.license_number);
  assert.ok(r.case_id);
  assert.equal(r.consumer_pii, false);
  assert.ok(!ids.has(r.source_record_id), `duplicate ${r.source_record_id}`);
  ids.add(r.source_record_id);
  if (r.status === 'Issued') issued++;
}
assert.equal(issued, 117);

assert.ok(lbt.row_count > 0);
assert.equal(lbt.records.length, lbt.row_count);

const sum =
  match.counts.DETERMINISTIC_MATCH +
  match.counts.REVIEW_REQUIRED +
  match.counts.NOT_FOUND +
  match.counts.INSUFFICIENT_EVIDENCE;
assert.equal(sum, match.results.length);
assert.equal(sum, 117);
assert.equal(match.production_writes, false);
assert.equal(match.google_places_api_requests, 0);
assert.equal(match.mode, 'OFFLINE_READ_ONLY');

// Name-only must never be DETERMINISTIC
for (const r of match.results) {
  if (r.classification === 'DETERMINISTIC_MATCH') {
    assert.ok(
      (r.signals || []).includes('address_corroboration'),
      `DETERMINISTIC without address: ${r.county_license}`
    );
    assert.ok(!(r.signals || []).includes('exact_legal_or_dba_name_only'));
  }
}

assert.equal(
  canonical.counts.CANONICAL_LINKED +
    canonical.counts.STATE_RECORD_ONLY +
    canonical.counts.COUNTY_ONLY +
    canonical.counts.REVIEW_REQUIRED,
  canonical.results.length
);

assert.equal(insurance.REQUIREMENT_DOCUMENTED, true);
assert.equal(insurance.CURRENT_POLICY_OBSERVED, false);
assert.equal(insurance.COMPLIANCE_VERIFIED, false);

assert.ok(String(fields.inventory_basis).includes('APPLICATION_SCHEMA_PUBLIC'));
assert.ok(String(fields.inventory_basis).includes('PUBLIC_ROSTER_FIELDS'));

assert.equal(architecture.architecture_finalized, false);
assert.ok(/Pinellas/i.test(String(architecture.another_pilot_required)));
assert.ok(comparison.dimensions.length >= 10);

assert.equal(stack.origin_main_at_task_start, 'a381203beb61cb5a2a12f80ed007a672a204be31');
assert.equal(stack.c004_head, 'f085c923b48230f97cd073de30b77b603f047ee3');

assert.equal(
  summary.recommended_fl_c006,
  'FL-C006 — Miami-Dade Deterministic FDACS Reconciliation & County Evidence Qualification'
);

// Palm Beach and Broward artifacts still exist unchanged (presence checks only)
assert.ok(
  existsSync(
    resolve('data/county-regulatory/fl/palm-beach/qualified/pbc-fdacs-crosswalk-v1.json')
  )
);
assert.ok(
  existsSync(resolve('data/county-regulatory/fl/broward/normalized/fl-c004-summary.json'))
);
assert.ok(
  existsSync(resolve('data/county-regulatory/fl/palm-beach/evidence/florida-im-company-crosswalk.json'))
);

const script = readFileSync(resolve('scripts/fl-c005-miami-dade-normalize.mjs'), 'utf8');
assert.ok(!/places\.googleapis\.com/i.test(script));
assert.ok(!/google\.maps\.places/i.test(script));
assert.ok(!/maps\.googleapis\.com/i.test(script));
assert.ok(!/prisma\.(company|companies)\.(create|update|upsert)/i.test(script));

// LBT crosswalk stats present
assert.ok(lbtX.stats);
assert.equal(lbtX.stats.issued_mr_total, 117);
assert.equal(lbtX.google_places_api_requests, 0);

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-fl-c005-miami-dade-acquisition',
      roster_class: roster.completeness_classification,
      mover_rows: movers.row_count,
      issued: issued,
      lbt_rows: lbt.row_count,
      branch_rows: branches.row_count,
      vehicle_rows: vehicles.row_count,
      complaint_rows: complaints.row_count,
      citation_rows: citations.row_count,
      enforcement_rows: enforcement.row_count,
      fdacs_matchability_issued: match.counts,
      lbt_crosswalk_stats: lbtX.stats,
      canonical_matchability_issued: canonical.counts,
      provenance_files: provenance.files.length,
      google: 0,
      consumer_pii_committed: 0,
      production_writes: false,
      recommended: summary.recommended_fl_c006,
    },
    null,
    2
  )
);
