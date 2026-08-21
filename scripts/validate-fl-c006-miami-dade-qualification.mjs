/**
 * FL-C006 — validate Miami-Dade evidence qualification + versioned package.
 * No DB writes. No Google Places APIs.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
}

const OUT = resolve('data/county-regulatory/fl/miami-dade/evidence/c006');
const QUAL = resolve('data/county-regulatory/fl/miami-dade/qualified');
const NORM = resolve('data/county-regulatory/fl/miami-dade/normalized');

const requiredOut = [
  'MDC_FDACS_RECONCILIATION_V1.json',
  'MDC_COUNTY_EVIDENCE_V1.json',
  'c005-baseline-recomputed.json',
  'issued-fdacs-reconciliation.json',
  'verified-precision-qa.json',
  'review-triage.json',
  'not-found-analysis.json',
  'historical-status-model.json',
  'multi-license-relationships.json',
  'fl-c006-summary.json',
];
for (const f of requiredOut) {
  assert.ok(existsSync(resolve(OUT, f)), `missing evidence/c006/${f}`);
}

const requiredQual = [
  'mdc-fdacs-crosswalk-v1.json',
  'mdc-fdacs-unresolved-v1.json',
  'mdc-moving-credential-evidence-v1.json',
  'mdc-historical-license-evidence-v1.json',
  'mdc-lbt-crosswalk-v1.json',
  'mdc-business-tax-evidence-v1.json',
  'mdc-source-authority-model-v1.json',
  'mdc-cross-source-conflicts-v1.json',
  'mdc-evidence-ruleset-v1.json',
  'qualified-package-manifest-v1.json',
  'incremental-value-after-qualification-v1.json',
  'three-county-qualified-comparison-v1.json',
  'architecture-pressure-test-v1.json',
  'fl-c006-summary.json',
];
for (const f of requiredQual) {
  assert.ok(existsSync(resolve(QUAL, f)), `missing qualified/${f}`);
}

const licenses = readJson(resolve(NORM, 'mover-licenses.json'));
const recon = readJson(resolve(OUT, 'issued-fdacs-reconciliation.json'));
const precision = readJson(resolve(OUT, 'verified-precision-qa.json'));
const hist = readJson(resolve(OUT, 'historical-status-model.json'));
const summary = readJson(resolve(OUT, 'fl-c006-summary.json'));
const arch = readJson(resolve(QUAL, 'architecture-pressure-test-v1.json'));
const lbt = readJson(resolve(QUAL, 'mdc-lbt-crosswalk-v1.json'));
const insurance = readJson(resolve(OUT, 'insurance-workers-comp-safety.json'));
const vehicles = readJson(resolve(OUT, 'vehicle-findings.json'));
const complaints = readJson(resolve(OUT, 'complaint-mediation-qualification.json'));
const citations = readJson(resolve(OUT, 'citation-enforcement-qualification.json'));
const rules = readJson(resolve(OUT, 'MDC_FDACS_RECONCILIATION_V1.json'));
const evidRules = readJson(resolve(OUT, 'MDC_COUNTY_EVIDENCE_V1.json'));

assert.equal(summary.google_places_api_requests, 0);
assert.equal(summary.production_writes, false);
assert.equal(summary.production_db_migrations, 0);
assert.equal(summary.consumer_pii_committed, 0);

const issuedCount = licenses.records.filter((r) => r.status === 'Issued').length;
assert.equal(recon.issued_count, issuedCount);
assert.equal(recon.records.length, issuedCount);
const mrIds = recon.records.map((r) => r.mr_license);
assert.equal(new Set(mrIds).size, mrIds.length, 'duplicate MR in Issued reconciliation');
const sumCounts = Object.values(recon.counts).reduce((a, b) => a + b, 0);
assert.equal(sumCounts, issuedCount);

assert.equal(hist.records.length, licenses.records.length);

const validStates = new Set([
  'VERIFIED',
  'REVIEW_REQUIRED',
  'NOT_FOUND',
  'CONFLICT',
  'NOT_APPLICABLE',
]);
for (const r of recon.records) {
  assert.ok(validStates.has(r.match_result));
  if (r.match_result === 'VERIFIED') {
    assert.ok(r.candidate_fdacs_id);
    assert.ok(r.supporting_evidence?.length);
    const hasStrong = r.supporting_evidence.some((s) =>
      ['exact_phone', 'exact_physical_address', 'exact_business_email', 'explicit_fdacs_im'].includes(
        s
      )
    );
    const hasName = r.supporting_evidence.some((s) =>
      ['exact_legal_name', 'exact_dba'].includes(s)
    );
    assert.ok(hasStrong && hasName, `VERIFIED ${r.mr_license} lacks qualifying evidence`);
  } else {
    assert.notEqual(r.canonical_class, 'CANONICAL_LINKED');
  }
}

assert.equal(precision.gate, 'PASS');
assert.ok(precision.precision >= 98);
assert.equal(precision.incorrect, 0);
assert.equal(precision.records_checked, recon.counts.VERIFIED);

assert.equal(rules.fail_closed, true);
assert.ok(evidRules.evidence_classes.includes('MDC_MOVING_CREDENTIAL_VERIFIED'));
assert.ok(
  evidRules.principles.some((p) => /LBT/i.test(p) && /not|never|substitute/i.test(p))
);

assert.equal(insurance.REQUIREMENT_DOCUMENTED, true);
assert.equal(insurance.CURRENT_POLICY_OBSERVED, false);
assert.equal(insurance.COMPLIANCE_VERIFIED, false);
assert.equal(vehicles.CURRENT_VEHICLE_RECORDS_OBSERVED, 0);
assert.equal(complaints.PUBLIC_COMPLAINT_RECORDS, 0);
assert.equal(complaints.PUBLIC_DISPOSITIONS, 0);
assert.equal(complaints.PRA_REQUIRED, true);
assert.equal(citations.PUBLIC_COMPANY_LEVEL_CITATION_EVENTS, 0);
assert.equal(citations.PUBLIC_FINAL_ENFORCEMENT_ACTIONS, 0);

assert.ok(lbt.role.includes('NOT_MOVER') || /NOT.*MOVER|SECONDARY/i.test(lbt.role));
assert.equal(
  lbt.counts.VERIFIED_LBT_LINK + lbt.counts.REVIEW_REQUIRED + lbt.counts.NOT_FOUND,
  issuedCount
);

assert.equal(arch.PATTERNS_CONVERGING, 'YES');
assert.equal(arch.PINELLAS_REQUIRED_BEFORE_LOCK, 'YES');
assert.ok(/Pinellas/i.test(summary.recommended_fl_c007));

// Prior county artifacts unchanged presence
assert.ok(
  existsSync(resolve('data/county-regulatory/fl/palm-beach/qualified/pbc-fdacs-crosswalk-v1.json'))
);
assert.ok(existsSync(resolve('data/county-regulatory/fl/broward/normalized/fl-c004-summary.json')));
assert.ok(existsSync(resolve('data/county-regulatory/fl/miami-dade/normalized/fl-c005-summary.json')));

const script = readFileSync(resolve('scripts/fl-c006-miami-dade-evidence-qualification.mjs'), 'utf8');
assert.ok(!/places\.googleapis\.com/i.test(script));
assert.ok(!/google\.maps\.places/i.test(script));
assert.ok(!/prisma\.(company|companies)\.(create|update|upsert)/i.test(script));
assert.ok(!/provider_state_authority/i.test(script) || !/\.(create|update|upsert)\(/.test(script));

// No fake complaint/enforcement case evidence files implying events
for (const bad of ['complaint-evidence-v1.json', 'enforcement-evidence-v1.json']) {
  // optional absence is fine; if present must declare zero
  const p = resolve(QUAL, bad);
  if (existsSync(p)) {
    const j = readJson(p);
    assert.equal(j.row_count ?? j.records?.length ?? -1, 0);
  }
}

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-fl-c006-miami-dade-qualification',
      issued: issuedCount,
      reconciliation: recon.counts,
      precision: precision.precision,
      canonical: summary.canonical,
      lbt: lbt.counts,
      google: 0,
      consumer_pii_committed: 0,
      production_writes: false,
      recommended: summary.recommended_fl_c007,
    },
    null,
    2
  )
);
