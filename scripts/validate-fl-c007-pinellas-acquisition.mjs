/**
 * FL-C007 — validate Pinellas acquisition/staging package.
 * No DB writes. No Google Places APIs.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
}

const NORM = resolve('data/county-regulatory/fl/pinellas/normalized');
const META = resolve('data/county-regulatory/fl/pinellas/meta');
const RAW = resolve('data/county-regulatory/fl/pinellas/raw');

const required = [
  'program-verification.json',
  'source-interfaces.json',
  'roster-completeness.json',
  'mover-regulatory-records.json',
  'field-inventory.json',
  'complaint-system-profile.json',
  'complaint-history-observations.json',
  'complaint-dispositions.json',
  'zero-result-semantics.json',
  'enforcement-observations.json',
  'enforcement-system-profile.json',
  'identity-contact-observations.json',
  'fdacs-matchability.json',
  'complaint-business-matchability.json',
  'canonical-matchability.json',
  'incremental-value.json',
  'four-county-comparison.json',
  'architecture-pressure-test.json',
  'county-page-potential-mock.json',
  'future-company-profile-evidence-design.json',
  'network-reuse-note.json',
  'fl-c007-summary.json',
];
for (const f of required) {
  assert.ok(existsSync(resolve(NORM, f)), `missing ${f}`);
}

assert.ok(existsSync(resolve(META, 'raw-provenance.json')));
assert.ok(existsSync(resolve(META, 'stack-vs-main-note.json')));
assert.ok(existsSync(resolve(RAW, 'municode-art-viii-moving.txt')));
assert.ok(existsSync(resolve(RAW, 'fdacs-pinellas-geography-sample-universe.json')));
assert.ok(existsSync(resolve(RAW, 'complaint-search-sample-businesses.json')));
assert.ok(existsSync(resolve(RAW, 'page-consumer-protection-home.html')));
assert.ok(existsSync(resolve(RAW, 'page-complaint-history-service.html')));

const summary = readJson(resolve(NORM, 'fl-c007-summary.json'));
const program = readJson(resolve(NORM, 'program-verification.json'));
const roster = readJson(resolve(NORM, 'roster-completeness.json'));
const movers = readJson(resolve(NORM, 'mover-regulatory-records.json'));
const fields = readJson(resolve(NORM, 'field-inventory.json'));
const complaintProfile = readJson(resolve(NORM, 'complaint-system-profile.json'));
const complaints = readJson(resolve(NORM, 'complaint-history-observations.json'));
const dispositions = readJson(resolve(NORM, 'complaint-dispositions.json'));
const zeroSem = readJson(resolve(NORM, 'zero-result-semantics.json'));
const enforcement = readJson(resolve(NORM, 'enforcement-observations.json'));
const enforcementProfile = readJson(resolve(NORM, 'enforcement-system-profile.json'));
const identity = readJson(resolve(NORM, 'identity-contact-observations.json'));
const match = readJson(resolve(NORM, 'fdacs-matchability.json'));
const complaintMatch = readJson(resolve(NORM, 'complaint-business-matchability.json'));
const canonical = readJson(resolve(NORM, 'canonical-matchability.json'));
const architecture = readJson(resolve(NORM, 'architecture-pressure-test.json'));
const comparison = readJson(resolve(NORM, 'four-county-comparison.json'));
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

assert.equal(
  program.credential_model,
  'ORDINANCE_REGULATION_WITHOUT_SEPARATE_PUBLIC_CREDENTIAL'
);
assert.ok(/42-356|Article VIII|Moving Ordinance/i.test(program.ordinance));
assert.equal(program.current_status, 'OPERATING');
assert.ok(/Monitoring/i.test(program.terminology_note));

assert.equal(roster.completeness_classification, 'NO_SEPARATE_ROSTER_IDENTIFIED');
assert.equal(roster.public_roster_found, false);
assert.equal(movers.row_count, 0);
assert.equal(movers.records.length, 0);
assert.equal(enforcement.row_count, 0);
assert.equal(complaints.consumer_pii_committed, 0);
assert.ok(complaints.case_rows >= 0);
assert.equal(complaints.row_count, complaints.case_rows);
assert.equal(identity.row_count, 0);
assert.equal(complaints.sample_only, true);
assert.ok(complaints.misconduct_inference !== 'ALLOWED');
for (const r of complaints.records || []) {
  assert.equal(r.misconduct_inference, 'FORBIDDEN');
  assert.ok(r.record_id);
}

assert.equal(complaintProfile.history_window_years, 5);
assert.ok(/RECORD_STATUS|disposition-like|false/i.test(String(complaintProfile.disposition_on_public_pdf)));
assert.ok(/Accela/i.test(complaintProfile.vendor));
assert.equal(complaintProfile.disposition_public_bulk, false);
// If SAMPLE_ONLY cases exist, RECORD STATUS should supply disposition-like official values
if (complaints.case_rows > 0) {
  assert.ok(dispositions.row_count > 0);
  assert.ok(Array.isArray(dispositions.official_values));
  assert.ok(dispositions.official_values.length > 0);
  for (const d of dispositions.records) {
    assert.equal(d.misconduct_inference, 'FORBIDDEN');
    assert.ok(d.official_record_status);
  }
}

assert.equal(zeroSem.rule, 'NO_COMPLAINT_RECORD_RETURNED_FOR_SEARCH_WINDOW');
assert.equal(zeroSem.forbidden_label, 'COMPLAINT_FREE');

assert.ok(String(fields.inventory_basis).includes('ORDINANCE'));
assert.ok(fields.fields.some((f) => f.field === 'written_estimate'));
assert.ok(fields.fields.some((f) => f.field === 'contract_for_service'));
assert.ok(
  fields.fields.some(
    (f) => f.field === 'county_mover_license_number' && f.present_in_ordinance === 'NO'
  )
);

assert.equal(match.mode, 'NOT_APPLICABLE_NO_PUBLIC_ROSTER');
assert.equal(match.classification, 'NOT_APPLICABLE_NO_PUBLIC_ROSTER');
assert.equal(match.production_writes, false);
assert.equal(match.google_places_api_requests, 0);

assert.equal(complaintMatch.mode, 'FAIL_CLOSED');
assert.ok(/NAME_ONLY/i.test(complaintMatch.rule));

assert.equal(architecture.PATTERNS_CONVERGING, 'YES');
assert.equal(architecture.FOUR_PILOTS_SUFFICIENT_FOR_ARCHITECTURE_DISCOVERY, 'YES');
assert.equal(architecture.architecture_finalized, false);
assert.equal(architecture.pinellas_qualification_recommended, false);

assert.ok(comparison.dimensions.length >= 10);
assert.ok(comparison.counties.includes('Pinellas'));
assert.ok(comparison.counties.includes('Palm Beach'));
assert.ok(comparison.counties.includes('Broward'));
assert.ok(comparison.counties.includes('Miami-Dade'));

assert.equal(stack.origin_main_at_task_start, '52afb48b6e7976f16651f8b19fc89886caec56d6');
assert.equal(stack.c006_head, '1aa496b0b36b1f7ffadd9db6285d90db8b14f8ef');

const recommended =
  'FL-C008 — Florida County Regulatory Architecture Discovery V1 & Stack Integration Plan';
assert.equal(summary.recommended_fl_c008, recommended);
assert.equal(architecture.recommended_next, recommended);

assert.ok(/42-368/i.test(enforcementProfile.ordinance_authority));

// Prior county artifacts still present
assert.ok(
  existsSync(
    resolve('data/county-regulatory/fl/palm-beach/qualified/pbc-fdacs-crosswalk-v1.json')
  )
);
assert.ok(
  existsSync(resolve('data/county-regulatory/fl/broward/normalized/fl-c004-summary.json'))
);
assert.ok(
  existsSync(resolve('data/county-regulatory/fl/miami-dade/normalized/fl-c005-summary.json'))
);
assert.ok(
  existsSync(resolve('data/county-regulatory/fl/miami-dade/qualified/fl-c006-summary.json'))
);

const script = readFileSync(resolve('scripts/fl-c007-pinellas-normalize.mjs'), 'utf8');
assert.ok(!/places\.googleapis\.com/i.test(script));
assert.ok(!/google\.maps\.places/i.test(script));
assert.ok(!/maps\.googleapis\.com/i.test(script));
assert.ok(!/prisma\.(company|companies)\.(create|update|upsert)/i.test(script));

const pra = readFileSync(
  resolve('docs/county-regulatory/fl/pra-drafts/pinellas-county-mover-regulatory-pra.md'),
  'utf8'
);
assert.ok(/NOT SENT|not submitted|Submitted:\s*NO/i.test(pra));
assert.ok(/disposition/i.test(pra));
assert.ok(/PII|personally identifiable|consumer PII/i.test(pra));

// Search log must not claim COMPLAINT_FREE
for (const s of complaints.search_log || []) {
  assert.ok(s.result_class !== 'COMPLAINT_FREE');
  if (s.result_class === 'NO_COMPLAINT_RECORD_RETURNED_FOR_SEARCH_WINDOW') {
    assert.equal(s.consumer_pii_present, false);
  }
}

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-fl-c007-pinellas-acquisition',
      credential_model: program.credential_model,
      roster_class: roster.completeness_classification,
      mover_rows: movers.row_count,
      searches: complaints.searches_with_pdf_artifact,
      nonzero: complaints.nonzero_searches,
      cases: complaints.case_rows,
      dispositions: dispositions.row_count,
      enforcement_rows: enforcement.row_count,
      fdacs_matchability: match.mode,
      PATTERNS_CONVERGING: architecture.PATTERNS_CONVERGING,
      FOUR_PILOTS_SUFFICIENT: architecture.FOUR_PILOTS_SUFFICIENT_FOR_ARCHITECTURE_DISCOVERY,
      provenance_files: provenance.files.length,
      google: 0,
      consumer_pii_committed: 0,
      production_writes: false,
      recommended: summary.recommended_fl_c008,
    },
    null,
    2
  )
);
