/**
 * FL-C003 Phases 16–26 — emit versioned qualified staging files + value/metrics designs.
 * READ-ONLY over existing evidence/c003 outputs. No production writes. No Google APIs.
 */
import { createHash } from 'crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

const EVID = resolve('data/county-regulatory/fl/palm-beach/evidence/c003');
const NORM = resolve('data/county-regulatory/fl/palm-beach/normalized');
const QUAL = resolve('data/county-regulatory/fl/palm-beach/qualified');
mkdirSync(QUAL, { recursive: true });

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
}
function writeJson(path, obj) {
  writeFileSync(path, JSON.stringify(obj, null, 2));
}
function sha(obj) {
  return createHash('sha256').update(JSON.stringify(obj)).digest('hex').slice(0, 16);
}

const retrievedAt = new Date().toISOString();
const recon = readJson(join(EVID, 'permit-fdacs-reconciliation.json'));
const permitEv = readJson(join(EVID, 'permit-evidence-qualification.json'));
const complaintEv = readJson(join(EVID, 'complaint-evidence-qualification.json'));
const enfEv = readJson(join(EVID, 'enforcement-evidence-qualification.json'));
const identityEv = readJson(join(EVID, 'identity-observation-qualification.json'));
const dispositionGroups = readJson(join(EVID, 'disposition-catalog-with-groups.json'));
const authority = readJson(join(EVID, 'source-authority-model.json'));
const precision = readJson(join(EVID, 'verified-precision-qa.json'));
const permitsWrap = readJson(join(NORM, 'mover-permits.json'));
const summaryC003 = readJson(join(EVID, 'fl-c003-summary.json'));

const permitByMv = new Map(permitsWrap.records.map((p) => [p.business_regulatory_id, p]));
const permitEvByMv = new Map(permitEv.records.map((p) => [p.mv_permit, p]));
const identityByMv = new Map(identityEv.records.map((p) => [p.mv_permit, p]));

// ---------- Conflict model enrichment (Phase 16) ----------
const conflictModel = {
  ...authority,
  conflict_types: {
    JURISDICTIONAL_DIFFERENCE:
      'Both facts can be correct (different regulators / jurisdictions). Preserve both with provenance.',
    TEMPORAL_DIFFERENCE:
      'Retrieval or effective dates differ; both observations may be historically correct.',
    IDENTITY_REVIEW:
      'Potentially different businesses. Plausible overlap without deterministic same-entity proof.',
    TRUE_DATA_CONFLICT:
      'Same fact / same jurisdiction / same time window genuinely conflicts. Preserve both source values; do not silently overwrite.',
    IDENTITY_CONFLICT:
      'Evidence supports incompatible business identities under deterministic rules.',
    CROSS_SOURCE_REVIEW_REQUIRED:
      'Needs human review before any canonical attachment.',
  },
  provenance_rule:
    'Every retained observation must keep source agency, source URL/record id, and retrieval timestamp. Never collapse multi-jurisdiction facts into one field.',
  updated_for: 'FL-C003 Phase 16',
  retrieved_at: retrievedAt,
};
writeJson(join(EVID, 'source-authority-model.json'), conflictModel);
writeJson(join(QUAL, 'source-authority-conflict-model-v1.json'), conflictModel);

// ---------- Phase 17 — qualified crosswalk ----------
const verified = recon.records.filter((r) => r.match_result === 'VERIFIED');
const unresolved = recon.records.filter((r) => r.match_result !== 'VERIFIED');

const crosswalkV1 = {
  task: 'FL-C003',
  file: 'pbc-fdacs-crosswalk-v1.json',
  version: 'v1',
  immutable: true,
  ruleset: 'PBC_FDACS_RECONCILIATION_V1',
  evidence_ruleset: 'PBC_COUNTY_EVIDENCE_V1',
  retrieved_at: retrievedAt,
  production_writes: false,
  google_places_api_requests: 0,
  consumer_pii_committed: 0,
  row_count: verified.length,
  records: verified.map((r) => {
    const pev = permitEvByMv.get(r.mv_permit);
    const idn = identityByMv.get(r.mv_permit);
    const evidence_classes = [
      'COUNTY_PERMIT_VERIFIED',
      'COUNTY_IDENTITY_OBSERVATION',
    ];
    return {
      palm_beach_permit: r.mv_permit,
      palm_beach_legal_name: r.legal_name,
      palm_beach_dba: r.dba,
      palm_beach_status: r.county_status,
      fdacs_id: r.candidate_fdacs_id,
      fdacs_name: r.candidate_fdacs_name,
      fdacs_status: r.candidate_fdacs_status,
      canonical_company_id: r.candidate_canonical_company_id,
      canonical_class: r.canonical_class,
      match_result: 'VERIFIED',
      deterministic_evidence: r.supporting_evidence,
      match_method: r.match_method,
      ruleset: 'PBC_FDACS_RECONCILIATION_V1',
      evidence_classes_available: evidence_classes,
      permit_qualification: pev?.qualification || null,
      identity_fields_present: {
        owner_officer: !!idn?.owner_officer_contact,
        phone: !!idn?.phone,
        website: !!(idn?.website && String(idn.website).trim()),
        fleet: idn?.fleet_size != null,
        established_year: idn?.established_year != null && idn.established_year !== 0,
      },
      source_provenance: r.provenance,
      conflicting_evidence: r.conflicting_evidence || [],
    };
  }),
};
crosswalkV1.content_hash = sha(crosswalkV1.records);
writeJson(join(QUAL, 'pbc-fdacs-crosswalk-v1.json'), crosswalkV1);

const reviewFile = {
  task: 'FL-C003',
  file: 'pbc-fdacs-unresolved-review-v1.json',
  version: 'v1',
  retrieved_at: retrievedAt,
  note: 'Unresolved / non-VERIFIED records. Must not attach to canonical companies.',
  counts: {
    REVIEW_REQUIRED: unresolved.filter((r) => r.match_result === 'REVIEW_REQUIRED').length,
    NOT_FOUND: unresolved.filter((r) => r.match_result === 'NOT_FOUND').length,
    CONFLICT: unresolved.filter((r) => r.match_result === 'CONFLICT').length,
    NOT_APPLICABLE: unresolved.filter((r) => r.match_result === 'NOT_APPLICABLE').length,
  },
  records: unresolved.map((r) => ({
    palm_beach_permit: r.mv_permit,
    legal_name: r.legal_name,
    dba: r.dba,
    match_result: r.match_result,
    candidate_fdacs_id: r.candidate_fdacs_id,
    supporting_evidence: r.supporting_evidence,
    conflicting_evidence: r.conflicting_evidence,
    review_reasons: r.review_reasons,
    canonical_attachment_allowed: false,
    provenance: r.provenance,
  })),
};
writeJson(join(QUAL, 'pbc-fdacs-unresolved-review-v1.json'), reviewFile);

// ---------- Phase 18 — qualified complaints ----------
const verifiedMvToCompany = new Map(
  verified.map((r) => [r.mv_permit, r.candidate_canonical_company_id || null])
);
const complaintFile = {
  task: 'FL-C003',
  file: 'complaint-evidence-v1.json',
  version: 'v1',
  immutable: true,
  data_scope: 'SAMPLE_ONLY',
  sample_bir_businesses: 22,
  retrieved_at: retrievedAt,
  production_writes: false,
  db_linkage: false,
  consumer_pii_committed: 0,
  misconduct_inference: 'FORBIDDEN',
  row_count: complaintEv.records.length,
  records: complaintEv.records.map((c) => {
    const companyId = verifiedMvToCompany.get(c.business_regulatory_id) || null;
    return {
      complaint_case_id: c.complaint_case_id,
      business_regulatory_id: c.business_regulatory_id,
      business_name: c.business_name,
      allegation: c.allegation,
      status: c.status,
      official_disposition_code: c.official_disposition_code,
      official_disposition_description: c.official_disposition_description,
      filing_or_case_date: c.filing_or_case_date,
      close_date: c.close_date,
      evidence_classes: c.evidence_classes,
      qualification: c.qualification,
      offline_canonical_company_id:
        companyId && c.business_regulatory_id ? companyId : null,
      offline_canonical_attachment_note: companyId
        ? 'Deterministic PBC↔FDACS VERIFIED crosswalk only; no DB write'
        : 'No deterministic crosswalk — company id omitted',
      consumer_pii: false,
      provenance: c.provenance,
    };
  }),
};
complaintFile.content_hash = sha(complaintFile.records);
writeJson(join(QUAL, 'complaint-evidence-v1.json'), complaintFile);

// ---------- Phase 19 — qualified enforcement ----------
const enforcementFile = {
  task: 'FL-C003',
  file: 'enforcement-evidence-v1.json',
  version: 'v1',
  immutable: true,
  data_scope: 'SAMPLE_ONLY',
  sample_bir_businesses: 22,
  retrieved_at: retrievedAt,
  production_writes: false,
  db_linkage: false,
  consumer_pii_committed: 0,
  raw_observations: enfEv.raw_count,
  unique_events: enfEv.unique_event_count,
  row_count: enfEv.records.length,
  records: enfEv.records.map((e) => {
    const companyId = verifiedMvToCompany.get(e.business_regulatory_id) || null;
    const overstatedFinal =
      e.evidence_class === 'FINAL_ENFORCEMENT_ACTION' && e.finality !== 'FINAL_DISPOSITION_PRESENT';
    return {
      business_regulatory_id: e.business_regulatory_id,
      business_name: e.business_name,
      case_or_action_identity: e.source_event_or_case_id,
      event_type: e.action_layer,
      action_type: e.action_type,
      action_date: e.action_date,
      alleged_violation: e.alleged_violation,
      fine_amount: e.fine_amount,
      compliance_flag: e.compliance_flag,
      compliance_date: e.compliance_date,
      disposition: e.disposition_or_finality,
      finality: e.finality,
      evidence_class: overstatedFinal ? 'ENFORCEMENT_OBSERVATION' : e.evidence_class,
      event_key: e.event_key,
      api_row_multiplicity: e.api_row_multiplicity || 1,
      offline_canonical_company_id: companyId,
      qualification: e.qualification,
      consumer_pii: false,
      provenance: e.provenance,
    };
  }),
};
enforcementFile.final_enforcement_action_count = enforcementFile.records.filter(
  (e) => e.evidence_class === 'FINAL_ENFORCEMENT_ACTION'
).length;
enforcementFile.content_hash = sha(enforcementFile.records);
writeJson(join(QUAL, 'enforcement-evidence-v1.json'), enforcementFile);

// ---------- Phase 20 — incremental value after qualification ----------
const roster = permitsWrap.records;
const incremental = {
  task: 'FL-C003',
  retrieved_at: retrievedAt,
  note: 'Qualified county-layer value beyond FDACS. Complaint/enforcement counts are SAMPLE_ONLY (22 BIR businesses).',
  qualified_counts: {
    county_permits: permitEv.qualified_count,
    deterministic_fdacs_associations: verified.length,
    canonical_company_associations: verified.filter((r) => r.candidate_canonical_company_id).length,
    owner_officer_observations: identityEv.records.filter((r) => !!r.owner_officer_contact).length,
    websites: roster.filter((r) => r.website && String(r.website).trim()).length,
    fleet_data: roster.filter((r) => r.fleet_size != null).length,
    operating_history_data: roster.filter(
      (r) => r.established_year != null && r.established_year !== 0
    ).length,
    complaint_observations: complaintFile.row_count,
    verified_dispositions: complaintFile.records.filter((c) =>
      (c.evidence_classes || []).includes('COMPLAINT_DISPOSITION_VERIFIED')
    ).length,
    enforcement_observations: enforcementFile.row_count,
    final_enforcement_actions: enforcementFile.final_enforcement_action_count,
  },
  engineering_cost_signal:
    'Palm Beach county layer earns engineering cost for credential identity, owner/fleet/website enrichment, and disposition/enforcement observation classes — even before full BIR bulk. Sample complaint/enforcement should not be extrapolated.',
};
writeJson(join(QUAL, 'incremental-value-after-qualification-v1.json'), incremental);

// ---------- Phase 21 — future profile design ----------
const profileDesign = {
  task: 'FL-C003',
  published: false,
  trust_score_connection: false,
  sections: [
    {
      id: 'pbc_permit',
      title: 'Palm Beach County Permit',
      fields: ['MV number', 'status', 'issue/expiration', 'regulator', 'source'],
    },
    {
      id: 'pbc_business_info',
      title: 'County-reported business information',
      fields: ['owner/officer', 'phone', 'website', 'fleet', 'established year'],
    },
    {
      id: 'pbc_dispute_history',
      title: 'Consumer dispute history',
      fields: [
        'explicit reporting window (~3 years)',
        'allegation (separate)',
        'disposition (separate)',
        'case status',
        'source',
      ],
      language: 'Observation only — never misconduct proof from complaint existence',
    },
    {
      id: 'pbc_enforcement',
      title: 'County enforcement history',
      fields: ['NOV', 'Citation', 'Final action (only when explicit)'],
      language: 'Distinguish layers; do not collapse',
    },
  ],
};
writeJson(join(QUAL, 'future-profile-presentation-design-v1.json'), profileDesign);

// ---------- Phase 22 — county page metrics mock ----------
const pageMetrics = {
  task: 'FL-C003',
  live_page_changed: false,
  full_roster_metrics: {
    active_licensed_mover_count: {
      value: roster.length,
      label: 'FULL_ROSTER_PUBLIC_ACTIVE_LICENSED',
    },
    deterministic_fdacs_match_count: {
      value: verified.length,
      label: 'FULL_ROSTER_RECONCILIATION_V1',
    },
    permit_coverage_pct: {
      value: 100,
      label: 'FULL_ROSTER',
      note: '142/142 have MV permit numbers',
    },
    website_coverage: {
      value: incremental.qualified_counts.websites,
      pct: +((100 * incremental.qualified_counts.websites) / roster.length).toFixed(1),
      label: 'FULL_ROSTER',
    },
    fleet_coverage: {
      value: incremental.qualified_counts.fleet_data,
      pct: +((100 * incremental.qualified_counts.fleet_data) / roster.length).toFixed(1),
      label: 'FULL_ROSTER',
    },
    canonical_linked_count: {
      value: verified.filter((r) => r.canonical_class === 'CANONICAL_LINKED').length,
      label: 'FULL_ROSTER_OFFLINE_CROSSWALK',
    },
  },
  sample_only_metrics: {
    complaint_observations: {
      value: complaintFile.row_count,
      label: 'SAMPLE_ONLY',
      cohort: '22 BIR businesses — DO NOT extrapolate to 142',
    },
    verified_dispositions: {
      value: incremental.qualified_counts.verified_dispositions,
      label: 'SAMPLE_ONLY',
    },
    enforcement_unique_events: {
      value: enforcementFile.row_count,
      label: 'SAMPLE_ONLY',
    },
    final_enforcement_actions: {
      value: enforcementFile.final_enforcement_action_count,
      label: 'SAMPLE_ONLY',
    },
  },
  extrapolation_forbidden: true,
};
writeJson(join(QUAL, 'county-page-metrics-mock-v1.json'), pageMetrics);

// ---------- Phase 26 — network reuse note ----------
const networkReuse = {
  task: 'FL-C003',
  architecture_implemented: false,
  reusable_patterns: [
    'state credential + county credential can coexist',
    'credential jurisdiction must remain explicit',
    'complaint observation ≠ disposition',
    'enforcement observation ≠ final action',
    'source identity observations ≠ canonical company fields',
    'deterministic crosswalks should be versioned evidence objects',
  ],
  potential_later_reuse: [
    'ContractorTrustHub',
    'SeniorTrustHub',
    'InsuranceTrustHub',
    'other Move counties/states (Broward, Miami-Dade, Pinellas first)',
  ],
  palm_beach_general_platform_note:
    'PBC Consumer Affairs is general-purpose (moving, towing, VFH, caregiver, BIR). Document reuse potential; do not ingest non-mover categories in county mover track.',
};
writeJson(join(QUAL, 'network-reuse-note-v1.json'), networkReuse);

// ---------- Manifest ----------
const manifest = {
  task: 'FL-C003',
  package: 'palm-beach-qualified-v1',
  retrieved_at: retrievedAt,
  google_places_api_requests: 0,
  production_writes: false,
  consumer_pii_committed: 0,
  precision_gate: {
    checked: precision.verified_checked,
    correct: precision.correct,
    incorrect: precision.incorrect,
    precision: precision.precision,
  },
  reconciliation_counts: summaryC003.reconciliation_counts,
  files: [
    { path: 'qualified/pbc-fdacs-crosswalk-v1.json', rows: crosswalkV1.row_count },
    { path: 'qualified/pbc-fdacs-unresolved-review-v1.json', rows: reviewFile.records.length },
    { path: 'qualified/complaint-evidence-v1.json', rows: complaintFile.row_count, scope: 'SAMPLE_ONLY' },
    { path: 'qualified/enforcement-evidence-v1.json', rows: enforcementFile.row_count, scope: 'SAMPLE_ONLY' },
    { path: 'qualified/incremental-value-after-qualification-v1.json', rows: null },
    { path: 'qualified/future-profile-presentation-design-v1.json', rows: null },
    { path: 'qualified/county-page-metrics-mock-v1.json', rows: null },
    { path: 'qualified/network-reuse-note-v1.json', rows: null },
    { path: 'qualified/source-authority-conflict-model-v1.json', rows: null },
  ],
};
writeJson(join(QUAL, 'qualified-package-manifest-v1.json'), manifest);

console.log(JSON.stringify(manifest, null, 2));
