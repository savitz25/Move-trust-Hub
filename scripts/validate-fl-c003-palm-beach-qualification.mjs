/**
 * FL-C003 — validate Palm Beach qualification + versioned qualified package.
 * Alias/extension of evidence validation with Phase 17–29 checks.
 * No DB writes. No Google Places APIs.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
}

// Run core evidence validation first by importing its assertions via spawnless include:
// We re-assert key invariants here and add qualified-package checks.

const OUT = resolve('data/county-regulatory/fl/palm-beach/evidence/c003');
const QUAL = resolve('data/county-regulatory/fl/palm-beach/qualified');

const recon = readJson(resolve(OUT, 'permit-fdacs-reconciliation.json'));
const precision = readJson(resolve(OUT, 'verified-precision-qa.json'));
const complaints = readJson(resolve(OUT, 'complaint-evidence-qualification.json'));
const enforcement = readJson(resolve(OUT, 'enforcement-evidence-qualification.json'));
const dispositions = readJson(resolve(OUT, 'disposition-catalog-with-groups.json'));
const authority = readJson(resolve(OUT, 'source-authority-model.json'));
const summary = readJson(resolve(OUT, 'fl-c003-summary.json'));

assert.equal(summary.google_places_api_requests, 0);
assert.equal(summary.production_writes, false);
assert.equal(summary.consumer_pii_committed, 0);

// All permits accounted for exactly once; no duplicate MV IDs
assert.equal(recon.records.length, 142);
const mvIds = recon.records.map((r) => r.mv_permit);
assert.equal(new Set(mvIds).size, mvIds.length);
const sumCounts = Object.values(recon.counts).reduce((a, b) => a + b, 0);
assert.equal(sumCounts, 142);

const validStates = new Set([
  'VERIFIED',
  'REVIEW_REQUIRED',
  'NOT_FOUND',
  'CONFLICT',
  'NOT_APPLICABLE',
]);
const fdacsToCompanies = new Map();
for (const r of recon.records) {
  assert.ok(validStates.has(r.match_result));
  if (r.match_result === 'VERIFIED') {
    assert.ok(r.candidate_fdacs_id);
    assert.ok(r.supporting_evidence?.length);
    const hasStrong = r.supporting_evidence.some((s) =>
      ['exact_phone', 'exact_physical_address', 'exact_business_email'].includes(s)
    );
    const hasName = r.supporting_evidence.some((s) =>
      ['exact_legal_name', 'exact_dba'].includes(s)
    );
    assert.ok(hasStrong && hasName, `VERIFIED ${r.mv_permit} lacks qualifying evidence`);
    const list = fdacsToCompanies.get(r.candidate_fdacs_id) || [];
    list.push({
      mv: r.mv_permit,
      company: r.candidate_canonical_company_id,
      name: r.legal_name,
    });
    fdacsToCompanies.set(r.candidate_fdacs_id, list);
  } else {
    assert.notEqual(r.canonical_class, 'CANONICAL_LINKED');
  }
}

// No FDACS ID VERIFIED to competing incompatible company sets without CONFLICT
for (const [im, rows] of fdacsToCompanies) {
  const companies = [...new Set(rows.map((x) => x.company).filter(Boolean))];
  // Multiple MVs can map to same IM/company (DBA variants) — flag only if distinct companies
  assert.ok(
    companies.length <= 1,
    `FDACS ${im} VERIFIED to competing companies: ${companies.join(',')}`
  );
}

assert.equal(precision.gate, 'PASS');
assert.ok(precision.precision >= 98);
assert.equal(precision.incorrect, 0);

const officialCodes = new Set(
  dispositions.values.map((d) => (d.official_code || '').trim()).filter(Boolean)
);
const piiKeys = [
  'consumer_name',
  'complainant_name',
  'consumer_phone',
  'consumer_email',
  'consumer_address',
  'home_address',
  'ssn',
  'narrative',
  'complaint_narrative',
];
for (const c of complaints.records) {
  assert.equal(c.misconduct_inference, 'FORBIDDEN');
  if (c.official_disposition_code) {
    assert.ok(officialCodes.has(String(c.official_disposition_code).trim()));
    assert.ok(c.official_disposition_description);
  }
  for (const k of piiKeys) {
    assert.ok(!(c[k] != null && c[k] !== ''));
  }
}

for (const e of enforcement.records) {
  if (e.evidence_class === 'FINAL_ENFORCEMENT_ACTION') {
    assert.equal(e.finality, 'FINAL_DISPOSITION_PRESENT');
  }
  if (e.finality === 'FINALITY_UNKNOWN') {
    assert.notEqual(e.evidence_class, 'FINAL_ENFORCEMENT_ACTION');
  }
}

assert.ok(authority.conflict_types.IDENTITY_REVIEW);
assert.ok(authority.conflict_types.TRUE_DATA_CONFLICT);
assert.ok(authority.conflict_types.JURISDICTIONAL_DIFFERENCE);
assert.ok(authority.conflict_types.TEMPORAL_DIFFERENCE);

// Qualified package
const requiredQual = [
  'pbc-fdacs-crosswalk-v1.json',
  'pbc-fdacs-unresolved-review-v1.json',
  'complaint-evidence-v1.json',
  'enforcement-evidence-v1.json',
  'incremental-value-after-qualification-v1.json',
  'future-profile-presentation-design-v1.json',
  'county-page-metrics-mock-v1.json',
  'network-reuse-note-v1.json',
  'source-authority-conflict-model-v1.json',
  'qualified-package-manifest-v1.json',
];
for (const f of requiredQual) {
  assert.ok(existsSync(resolve(QUAL, f)), `missing qualified/${f}`);
}

const crosswalk = readJson(resolve(QUAL, 'pbc-fdacs-crosswalk-v1.json'));
const unresolved = readJson(resolve(QUAL, 'pbc-fdacs-unresolved-review-v1.json'));
const qComplaints = readJson(resolve(QUAL, 'complaint-evidence-v1.json'));
const qEnf = readJson(resolve(QUAL, 'enforcement-evidence-v1.json'));
const pageMetrics = readJson(resolve(QUAL, 'county-page-metrics-mock-v1.json'));
const network = readJson(resolve(QUAL, 'network-reuse-note-v1.json'));

assert.equal(crosswalk.version, 'v1');
assert.equal(crosswalk.immutable, true);
assert.equal(crosswalk.row_count, recon.counts.VERIFIED);
assert.equal(crosswalk.records.length, recon.counts.VERIFIED);
assert.equal(crosswalk.google_places_api_requests, 0);
assert.equal(crosswalk.consumer_pii_committed, 0);
assert.equal(crosswalk.production_writes, false);

for (const r of crosswalk.records) {
  assert.equal(r.match_result, 'VERIFIED');
  assert.ok(r.palm_beach_permit);
  assert.ok(r.fdacs_id);
  assert.ok(r.deterministic_evidence?.length);
  assert.ok(r.source_provenance);
  assert.ok(r.ruleset);
}

assert.equal(
  unresolved.records.length,
  recon.counts.REVIEW_REQUIRED +
    recon.counts.NOT_FOUND +
    recon.counts.CONFLICT +
    recon.counts.NOT_APPLICABLE
);
for (const r of unresolved.records) {
  assert.equal(r.canonical_attachment_allowed, false);
}

assert.equal(qComplaints.data_scope, 'SAMPLE_ONLY');
assert.equal(qComplaints.db_linkage, false);
assert.equal(qComplaints.consumer_pii_committed, 0);
assert.equal(qComplaints.misconduct_inference, 'FORBIDDEN');
for (const c of qComplaints.records) {
  assert.equal(c.consumer_pii, false);
  for (const k of piiKeys) assert.ok(!(c[k] != null && c[k] !== ''));
  if (c.offline_canonical_company_id) {
    assert.ok(crosswalk.records.some((x) => x.palm_beach_permit === c.business_regulatory_id));
  }
}

assert.equal(qEnf.data_scope, 'SAMPLE_ONLY');
assert.equal(qEnf.db_linkage, false);
assert.equal(qEnf.consumer_pii_committed, 0);
for (const e of qEnf.records) {
  assert.equal(e.consumer_pii, false);
  if (e.evidence_class === 'FINAL_ENFORCEMENT_ACTION') {
    assert.equal(e.finality, 'FINAL_DISPOSITION_PRESENT');
  }
}

assert.equal(pageMetrics.live_page_changed, false);
assert.equal(pageMetrics.extrapolation_forbidden, true);
assert.equal(pageMetrics.sample_only_metrics.complaint_observations.label, 'SAMPLE_ONLY');
assert.ok(pageMetrics.full_roster_metrics.active_licensed_mover_count.value === 142);

assert.equal(network.architecture_implemented, false);
assert.ok(network.reusable_patterns.length >= 5);

const scriptText = [
  readFileSync(resolve('scripts/fl-c003-palm-beach-evidence-qualification.mjs'), 'utf8'),
  readFileSync(resolve('scripts/fl-c003-emit-qualified-package.mjs'), 'utf8'),
].join('\n');
assert.ok(!/places\.googleapis\.com/i.test(scriptText));
assert.ok(!/google\.maps\.places/i.test(scriptText));
assert.ok(!/prisma\.(company|companies)\.(create|update|upsert)/i.test(scriptText));

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-fl-c003-palm-beach-qualification',
      permits: 142,
      unique_mv: new Set(mvIds).size,
      counts: recon.counts,
      crosswalk_rows: crosswalk.row_count,
      unresolved_rows: unresolved.records.length,
      complaints_sample: qComplaints.row_count,
      enforcement_unique: qEnf.row_count,
      precision: precision.precision,
      google: 0,
      writes: 0,
      consumer_pii_committed: 0,
    },
    null,
    2
  )
);
