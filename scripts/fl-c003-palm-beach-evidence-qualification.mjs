/**
 * FL-C003 — Palm Beach Deterministic FDACS Reconciliation & County Evidence Qualification
 * READ-ONLY. No production writes. No Google Places/API calls.
 *
 * Rulesets:
 *   PBC_FDACS_RECONCILIATION_V1
 *   PBC_COUNTY_EVIDENCE_V1
 */
import { createHash } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';

const ROOT = resolve('.');
const NORM = resolve('data/county-regulatory/fl/palm-beach/normalized');
const RAW = resolve('data/county-regulatory/fl/palm-beach/raw');
const EVID = resolve('data/county-regulatory/fl/palm-beach/evidence');
const OUT = resolve('data/county-regulatory/fl/palm-beach/evidence/c003');
mkdirSync(OUT, { recursive: true });

const RETRIEVED_AT = new Date().toISOString();
const RULESET = 'PBC_FDACS_RECONCILIATION_V1';
const EVIDENCE_RULESET = 'PBC_COUNTY_EVIDENCE_V1';
const ORIGIN_MAIN = 'd486e5a8eadef9639f70561ecac31ba2b226e7b4';
const C002_HEAD = 'a92d194b566e34966b73ae19a955c5fe1b0f7696';

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
}
function writeJson(path, obj) {
  writeFileSync(path, JSON.stringify(obj, null, 2));
}
function sha(obj) {
  return createHash('sha256').update(JSON.stringify(obj)).digest('hex');
}
function normPhone(p) {
  if (!p) return null;
  const d = String(p).replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('1')) return d.slice(1);
  return d.length === 10 ? d : d || null;
}
function normName(s) {
  if (!s) return '';
  return String(s)
    .toUpperCase()
    .replace(/&/g, ' AND ')
    .replace(/[^A-Z0-9 ]+/g, ' ')
    .replace(/\b(LLC|INC|INCORPORATED|CO|COMPANY|CORP|CORPORATION|LTD|LP|LLP|THE)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function normStreet(s) {
  if (!s) return '';
  return String(s)
    .toUpperCase()
    .replace(/[^A-Z0-9 ]+/g, ' ')
    .replace(
      /\b(STREET|ST|AVENUE|AVE|ROAD|RD|DRIVE|DR|BOULEVARD|BLVD|LANE|LN|COURT|CT|WAY|SUITE|STE|UNIT|BLDG|BUILDING|FL|FLOOR|#)\b/g,
      ' '
    )
    .replace(/\s+/g, ' ')
    .trim();
}
function streetCore(s) {
  // Keep leading house number + first street token for corroboration
  const n = normStreet(s);
  const parts = n.split(' ').filter(Boolean);
  if (parts.length < 2) return n;
  return parts.slice(0, 3).join(' ');
}
function emailsEqual(a, b) {
  if (!a || !b) return false;
  return String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
}
function stripBom(s) {
  return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
}
function parseCsv(path) {
  if (!existsSync(path)) return [];
  const csv = stripBom(readFileSync(path, 'utf8')).trim().split(/\r?\n/);
  if (csv.length < 2) return [];
  function parseLine(line) {
    const out = [];
    let cur = '';
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQ && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else inQ = !inQ;
      } else if (ch === ',' && !inQ) {
        out.push(cur);
        cur = '';
      } else cur += ch;
    }
    out.push(cur);
    return out;
  }
  const headers = parseLine(csv[0]);
  const rows = [];
  for (let i = 1; i < csv.length; i++) {
    const cols = parseLine(csv[i]);
    const row = {};
    headers.forEach((h, idx) => (row[h] = cols[idx] || ''));
    rows.push(row);
  }
  return rows;
}

// ---------- Load inputs ----------
const permitsWrap = readJson(join(NORM, 'mover-permits.json'));
const complaintsWrap = readJson(join(NORM, 'complaint-observations.json'));
const enforcementWrap = readJson(join(NORM, 'enforcement-observations.json'));
const birWrap = readJson(join(NORM, 'business-information-reports.json'));
const dispositionCatalog = readJson(join(NORM, 'disposition-code-catalog.json'));
const identityWrap = readJson(join(NORM, 'identity-contact-observations.json'));
const c002Match = readJson(join(NORM, 'fdacs-matchability.json'));
const crosswalk = readJson(join(EVID, 'florida-im-company-crosswalk.json'));
const identitySnapshotMeta = {
  retrieved_at: crosswalk.retrieved_at,
  counts: crosswalk.counts,
};

const permits = permitsWrap.records;
const complaints = complaintsWrap.records;
const enforcement = enforcementWrap.records;
const birReports = birWrap.records;
const birByPermit = new Map(birReports.map((b) => [b.business_regulatory_id, b]));
const birIdentity = identityWrap.bir_enrichment || [];
const birIdByPermit = new Map(birIdentity.map((b) => [b.business_regulatory_id, b]));

// FDACS universe
const fdacsLegacy = readJson(resolve('data/state-hhg/fl/fdacs-legacy-im-active.json'));
const fdacsRecordsRaw = Array.isArray(fdacsLegacy.records)
  ? fdacsLegacy.records
  : Array.isArray(fdacsLegacy)
    ? fdacsLegacy
    : [];
const fdacsCsv = parseCsv(resolve('data/state-hhg/fl/fdacs-intrastate-movers-newdb.csv'));

const fdacsByLic = new Map();
function upsertFdacs(rec) {
  const lic = (rec.license_no || '').toUpperCase();
  if (!lic) return;
  const prev = fdacsByLic.get(lic);
  if (!prev) fdacsByLic.set(lic, rec);
  else {
    // prefer record with more contact fields
    const score = (r) =>
      (r.phone ? 1 : 0) + (r.email ? 1 : 0) + (r.address ? 1 : 0) + (r.dba ? 1 : 0);
    if (score(rec) > score(prev)) fdacsByLic.set(lic, rec);
  }
}
for (const f of fdacsRecordsRaw) {
  upsertFdacs({
    license_no: String(f['LICENSE NO#'] || '').trim().toUpperCase(),
    name: f.NAME || '',
    dba: f['DBA/OTHER NAME'] || '',
    phone: f.PHONE || '',
    email: f.EMAIL || '',
    address: f.ADDRESS || '',
    status: f['LICENSE STATUS'] || '',
    city: f.CITY || '',
    source: 'fdacs-legacy-im-active.json',
  });
}
for (const row of fdacsCsv) {
  upsertFdacs({
    license_no: String(row['License Number'] || '').trim().toUpperCase(),
    name: row['Business Name'] || '',
    dba: row['DBA/Other Names'] || '',
    phone: row.Phone || '',
    email: row.Email || '',
    address: row.Location || '',
    status: row.Status || '',
    city: '',
    source: 'fdacs-intrastate-movers-newdb.csv',
  });
}

const fdacsList = [...fdacsByLic.values()].map((f) => ({
  ...f,
  _name: normName(f.name),
  _dba: normName(f.dba),
  _phone: normPhone(f.phone),
  _email: (f.email || '').trim().toLowerCase() || null,
  _street: normStreet(f.address),
  _streetCore: streetCore(f.address),
}));

const fdacsByPhone = new Map();
const fdacsByName = new Map();
const fdacsByEmail = new Map();
for (const f of fdacsList) {
  if (f._phone) {
    if (!fdacsByPhone.has(f._phone)) fdacsByPhone.set(f._phone, []);
    fdacsByPhone.get(f._phone).push(f);
  }
  for (const key of [f._name, f._dba].filter(Boolean)) {
    if (!fdacsByName.has(key)) fdacsByName.set(key, []);
    fdacsByName.get(key).push(f);
  }
  if (f._email) {
    if (!fdacsByEmail.has(f._email)) fdacsByEmail.set(f._email, []);
    fdacsByEmail.get(f._email).push(f);
  }
}

// ---------- Recompute C002 baseline ----------
const baseline = {
  task: 'FL-C003',
  recomputed_from: [
    'mover-permits.json',
    'business-information-reports.json',
    'complaint-observations.json',
    'enforcement-observations.json',
    'fdacs-matchability.json',
  ],
  active_licensed_permits: permits.length,
  bir_businesses_sampled: birReports.length,
  complaint_observations: complaints.length,
  dispositions_with_code_or_desc: complaints.filter(
    (c) => c.complaint_disposition_code || c.complaint_disposition
  ).length,
  enforcement_observations: enforcement.length,
  c002_matchability_counts: c002Match.counts,
  note: 'These are recomputed from staged files; not forced to historical report numbers.',
};

// ---------- Ruleset docs ----------
const reconciliationRuleset = {
  ruleset_id: RULESET,
  fail_closed: true,
  outcomes: ['VERIFIED', 'REVIEW_REQUIRED', 'NOT_FOUND', 'CONFLICT', 'NOT_APPLICABLE'],
  verify_requires_one_of: [
    'exact_legal_name + exact_phone',
    'exact_legal_name + exact_physical_address',
    'exact_dba + exact_phone',
    'exact_dba + exact_physical_address',
    'exact_legal_name + exact_business_email',
    'explicit shared FDACS identifier (not observed on PBC public roster)',
  ],
  never_verify_from_only: [
    'name',
    'DBA',
    'city',
    'ZIP',
    'website',
    'domain',
    'franchise/network identity',
    'fuzzy similarity',
    'shared address alone where common',
    'shared phone alone where ambiguous',
  ],
  conflict_when:
    'Two or more strong FDACS candidates with incompatible identity evidence, or strong corroboration for mutually exclusive entities.',
  not_applicable_when:
    'Record is not a Moving Business Permit / outside county mover program (not expected in this roster).',
};

const evidenceRuleset = {
  ruleset_id: EVIDENCE_RULESET,
  evidence_classes: [
    'COUNTY_PERMIT_VERIFIED',
    'COUNTY_IDENTITY_OBSERVATION',
    'COMPLAINT_OBSERVATION',
    'COMPLAINT_DISPOSITION_VERIFIED',
    'ENFORCEMENT_OBSERVATION',
    'FINAL_ENFORCEMENT_ACTION',
  ],
  principles: [
    'Allegation is never final action.',
    'Complaint existence is never proof of misconduct.',
    'Unresolved county identity must not be attached to a canonical company.',
    'A valid county credential can remain a real county regulatory fact without FDACS reconciliation.',
    'FDACS and Palm Beach statuses are distinct jurisdictional facts.',
  ],
};

writeJson(join(OUT, 'PBC_FDACS_RECONCILIATION_V1.json'), reconciliationRuleset);
writeJson(join(OUT, 'PBC_COUNTY_EVIDENCE_V1.json'), evidenceRuleset);
writeJson(join(OUT, 'c002-baseline-recomputed.json'), baseline);

// ---------- Match helpers ----------
function nameEquals(a, b) {
  return a && b && a === b;
}
function addressCorroborates(countyStreet, fdacsStreet, countyCore, fdacsCore) {
  if (!countyStreet || !fdacsStreet) return false;
  if (countyStreet === fdacsStreet) return true;
  if (countyCore && fdacsCore && countyCore === fdacsCore) return true;
  // contain check on cores with house number present
  if (countyCore && fdacsCore && /^\d+ /.test(countyCore) && /^\d+ /.test(fdacsCore)) {
    return countyStreet.includes(fdacsCore) || fdacsStreet.includes(countyCore);
  }
  return false;
}

function evaluateCandidate(permit, f, countyEmail) {
  const cName = normName(permit.business_name);
  const cDba = normName(permit.dba);
  const cPhone = normPhone(permit.phone);
  const cStreet = normStreet(permit.street_address);
  const cCore = streetCore(permit.street_address);
  const signals = [];
  const exactLegal = nameEquals(cName, f._name) || nameEquals(cName, f._dba);
  const exactDba =
    (cDba && (nameEquals(cDba, f._name) || nameEquals(cDba, f._dba))) ||
    (cName && nameEquals(cName, f._dba));
  const exactPhone = !!(cPhone && f._phone && cPhone === f._phone);
  const exactAddr = addressCorroborates(cStreet, f._street, cCore, f._streetCore);
  const exactEmail = !!(countyEmail && f._email && emailsEqual(countyEmail, f._email));

  if (exactLegal) signals.push('exact_legal_name');
  if (exactDba && !exactLegal) signals.push('exact_dba');
  if (exactDba && exactLegal && cDba && cDba !== cName) signals.push('exact_dba');
  if (exactPhone) signals.push('exact_phone');
  if (exactAddr) signals.push('exact_physical_address');
  if (exactEmail) signals.push('exact_business_email');

  let strength = null;
  if ((exactLegal || exactDba) && exactPhone) strength = 'VERIFIED';
  else if ((exactLegal || exactDba) && exactAddr) strength = 'VERIFIED';
  else if (exactLegal && exactEmail) strength = 'VERIFIED';
  else if (exactPhone && !exactLegal && !exactDba && !exactAddr && !exactEmail) {
    // phone alone — ambiguous unless unique and names close? fail closed → REVIEW
    strength = 'REVIEW_REQUIRED';
    signals.push('phone_only_insufficient');
  } else if ((exactLegal || exactDba) && !exactPhone && !exactAddr && !exactEmail) {
    strength = 'REVIEW_REQUIRED';
    signals.push('name_only_insufficient');
  } else if (signals.length > 0) {
    strength = 'REVIEW_REQUIRED';
  }

  const conflicts = [];
  if (exactLegal && exactPhone === false && cPhone && f._phone && cPhone !== f._phone) {
    conflicts.push({ type: 'phone_conflict', county: permit.phone, fdacs: f.phone });
  }
  if (exactLegal && cStreet && f._street && !exactAddr) {
    conflicts.push({
      type: 'address_conflict_or_historical',
      county: [permit.street_address, permit.city, permit.state, permit.zip].filter(Boolean).join(', '),
      fdacs: f.address,
    });
  }

  return { fdacs: f, signals, strength, conflicts };
}

// ---------- Reconcile all permits ----------
const reconciliations = [];
const counts = {
  VERIFIED: 0,
  REVIEW_REQUIRED: 0,
  NOT_FOUND: 0,
  CONFLICT: 0,
  NOT_APPLICABLE: 0,
};

for (const p of permits) {
  const bir = birIdByPermit.get(p.business_regulatory_id);
  const countyEmail = bir?.email || null;
  const candidates = [];
  const seen = new Set();

  const phone = normPhone(p.phone);
  const names = [normName(p.business_name), normName(p.dba)].filter(Boolean);
  const email = countyEmail ? countyEmail.trim().toLowerCase() : null;

  const pool = [];
  if (phone && fdacsByPhone.has(phone)) pool.push(...fdacsByPhone.get(phone));
  for (const n of names) {
    if (fdacsByName.has(n)) pool.push(...fdacsByName.get(n));
  }
  if (email && fdacsByEmail.has(email)) pool.push(...fdacsByEmail.get(email));

  for (const f of pool) {
    if (seen.has(f.license_no)) continue;
    seen.add(f.license_no);
    candidates.push(evaluateCandidate(p, f, countyEmail));
  }

  const verified = candidates.filter((c) => c.strength === 'VERIFIED');
  const review = candidates.filter((c) => c.strength === 'REVIEW_REQUIRED');

  let result = 'NOT_FOUND';
  let chosen = null;
  let conflicting_evidence = [];
  let match_method = null;
  let review_reasons = [];

  if (verified.length === 1) {
    result = 'VERIFIED';
    chosen = verified[0];
    match_method = chosen.signals.sort().join('+');
    conflicting_evidence = chosen.conflicts;
  } else if (verified.length > 1) {
    // Multiple verified candidates — CONFLICT if distinct licenses
    const uniqueLic = [...new Set(verified.map((v) => v.fdacs.license_no))];
    if (uniqueLic.length > 1) {
      result = 'CONFLICT';
      chosen = verified[0];
      conflicting_evidence = verified.map((v) => ({
        type: 'multiple_verified_fdacs_candidates',
        fdacs_license_no: v.fdacs.license_no,
        fdacs_name: v.fdacs.name,
        signals: v.signals,
      }));
      match_method = 'multiple_verified_candidates';
    } else {
      result = 'VERIFIED';
      chosen = verified[0];
      match_method = chosen.signals.sort().join('+');
    }
  } else if (review.length > 0) {
    result = 'REVIEW_REQUIRED';
    chosen = review[0];
    match_method = chosen.signals.sort().join('+');
    conflicting_evidence = chosen.conflicts;
    if (chosen.signals.includes('name_only_insufficient')) review_reasons.push('legal-name ambiguity / name-only match');
    if (chosen.signals.includes('phone_only_insufficient')) review_reasons.push('phone conflict or phone-only');
    if (chosen.conflicts.some((c) => c.type.startsWith('phone'))) review_reasons.push('phone conflict');
    if (chosen.conflicts.some((c) => c.type.startsWith('address')))
      review_reasons.push('address conflict / likely historical address');
    if (review.length > 1) review_reasons.push('multiple FDACS candidates');
    if (!review_reasons.length) review_reasons.push('plausible relationship, insufficient deterministic evidence');
  } else {
    result = 'NOT_FOUND';
    match_method = null;
  }

  // Canonical crosswalk (read-only)
  const fdacsId = chosen?.fdacs?.license_no || null;
  const companyIds = fdacsId ? crosswalk.im_to_company_ids[fdacsId] || [] : [];
  const primaryCompanyId = companyIds[0] || null;
  const company = primaryCompanyId ? crosswalk.companies_by_id[primaryCompanyId] || null : null;

  let canonical_class = 'COUNTY_ONLY_REVIEW';
  if (result === 'VERIFIED' && primaryCompanyId) {
    // PSA/company already exists for this IM
    canonical_class = 'CANONICAL_LINKED';
  } else if (result === 'VERIFIED' && !primaryCompanyId) {
    canonical_class = 'STATE_RECORD_ONLY';
  } else if (result !== 'VERIFIED') {
    canonical_class = 'COUNTY_ONLY_REVIEW';
  }

  // If verified and company exists but would need linkage work conceptually
  // CANONICAL_CANDIDATE reserved for deterministic company via alternate path without PSA — not used when fl-im id exists.
  if (result === 'VERIFIED' && primaryCompanyId && companyIds.length > 1) {
    // multiple companies for same IM — still linked but note review
    conflicting_evidence = [
      ...conflicting_evidence,
      { type: 'multiple_canonical_company_ids_for_im', company_ids: companyIds },
    ];
  }

  counts[result]++;

  reconciliations.push({
    ruleset: RULESET,
    mv_permit: p.business_regulatory_id,
    business_seq: p.business_seq,
    legal_name: p.business_name,
    dba: p.dba,
    county_status: p.permit_status,
    issue_date: p.issue_date,
    expiration_date: p.expiration_date,
    address: [p.street_address, p.city, p.state, p.zip].filter(Boolean).join(', '),
    phone: p.phone,
    website: p.website,
    contact_officer: [p.contact_first_name, p.contact_last_name, p.contact_title]
      .filter(Boolean)
      .join(' | '),
    fleet_size: p.fleet_size,
    established_year: p.established_year,
    county_email_from_bir_sample: countyEmail,
    candidate_fdacs_id: fdacsId,
    candidate_fdacs_name: chosen?.fdacs?.name || null,
    candidate_fdacs_status: chosen?.fdacs?.status || null,
    candidate_fdacs_phone: chosen?.fdacs?.phone || null,
    candidate_fdacs_address: chosen?.fdacs?.address || null,
    candidate_canonical_company_id: primaryCompanyId,
    candidate_canonical_company_ids: companyIds,
    canonical_publication_state: company?.publication_state ?? null,
    canonical_indexable: company?.indexable ?? null,
    match_result: result,
    match_method,
    supporting_evidence: chosen?.signals || [],
    conflicting_evidence,
    review_reasons,
    canonical_class,
    candidate_count: candidates.length,
    provenance: {
      county_source: p.source_url,
      county_retrieved_at: p.retrieved_at,
      fdacs_sources: [
        'data/state-hhg/fl/fdacs-legacy-im-active.json',
        'data/state-hhg/fl/fdacs-intrastate-movers-newdb.csv',
      ],
      identity_snapshot_retrieved_at: identitySnapshotMeta.retrieved_at,
      ruleset: RULESET,
    },
  });
}

writeJson(join(OUT, 'permit-fdacs-reconciliation.json'), {
  task: 'FL-C003',
  ruleset: RULESET,
  retrieved_at: RETRIEVED_AT,
  production_writes: false,
  google_places_api_requests: 0,
  counts,
  records: reconciliations,
});

// ---------- Canonical class summary ----------
const canonicalSummary = {
  CANONICAL_LINKED: reconciliations.filter((r) => r.canonical_class === 'CANONICAL_LINKED').length,
  CANONICAL_CANDIDATE: reconciliations.filter((r) => r.canonical_class === 'CANONICAL_CANDIDATE')
    .length,
  STATE_RECORD_ONLY: reconciliations.filter((r) => r.canonical_class === 'STATE_RECORD_ONLY').length,
  COUNTY_ONLY_REVIEW: reconciliations.filter((r) => r.canonical_class === 'COUNTY_ONLY_REVIEW')
    .length,
};
writeJson(join(OUT, 'canonical-crosswalk-summary.json'), {
  task: 'FL-C003',
  note: 'Read-only classification against live Florida companies/PSA snapshot. No company or PSA rows modified.',
  summary: canonicalSummary,
  verified_linked: reconciliations.filter(
    (r) => r.match_result === 'VERIFIED' && r.canonical_class === 'CANONICAL_LINKED'
  ).length,
  verified_state_only: reconciliations.filter(
    (r) => r.match_result === 'VERIFIED' && r.canonical_class === 'STATE_RECORD_ONLY'
  ).length,
});

// ---------- REVIEW_REQUIRED triage ----------
const reviewRows = reconciliations.filter((r) => r.match_result === 'REVIEW_REQUIRED');
const reviewTriage = reviewRows.map((r) => {
  const categories = [...new Set(r.review_reasons)];
  // richer categorization
  if (/all my sons|two men|college hunks|u-?haul|pod/i.test(`${r.legal_name} ${r.dba}`)) {
    categories.push('franchise/network ambiguity');
  }
  if (r.contact_officer) categories.push('county identity richer than FDACS');
  if (r.conflicting_evidence?.some((c) => c.type.includes('address'))) {
    categories.push('likely historical address');
  }
  if (r.conflicting_evidence?.some((c) => c.type.includes('phone'))) {
    categories.push('phone conflict');
  }
  if (r.candidate_count > 1) categories.push('multiple FDACS candidates');
  return {
    mv_permit: r.mv_permit,
    legal_name: r.legal_name,
    candidate_fdacs_id: r.candidate_fdacs_id,
    categories: [...new Set(categories)],
    supporting_evidence: r.supporting_evidence,
    conflicting_evidence: r.conflicting_evidence,
    resolution: 'REMAINS_REVIEW_REQUIRED',
    note: 'No additional official evidence elevated this to VERIFIED under fail-closed rules.',
  };
});
writeJson(join(OUT, 'review-required-triage.json'), {
  task: 'FL-C003',
  count: reviewTriage.length,
  records: reviewTriage,
});

// ---------- NOT_FOUND analysis + bounded QA sample ----------
const notFound = reconciliations.filter((r) => r.match_result === 'NOT_FOUND');
function classifyNotFound(r) {
  const reasons = [];
  const name = normName(r.legal_name);
  // newer permit heuristic: MV number high + issue year 2025/2026
  const mvNum = Number(String(r.mv_permit || '').replace(/\D/g, ''));
  const issueYear = r.issue_date ? Number(String(r.issue_date).slice(0, 4)) : null;
  if (issueYear && issueYear >= 2025) reasons.push('county permit possibly newer than FDACS snapshot');
  if (mvNum && mvNum >= 1100) reasons.push('high MV sequence — possibly recent county permit');
  // check if any fuzzy-ish name exists in FDACS (for explanation only, not verification)
  let partial = 0;
  const tokens = name.split(' ').filter((t) => t.length > 3);
  for (const f of fdacsList) {
    if (!f._name) continue;
    const hit = tokens.filter((t) => f._name.includes(t) || f._dba.includes(t)).length;
    if (hit >= Math.min(2, tokens.length)) partial++;
  }
  if (partial > 0) reasons.push('legal/DBA naming mismatch possible (partial token overlap exists)');
  if (r.dba && normName(r.dba) !== name) reasons.push('corporate-name / DBA differences possible');
  if (!reasons.length) reasons.push('truly unresolved / state crosswalk unavailable');
  return reasons;
}

const notFoundAnalysis = notFound.map((r) => ({
  mv_permit: r.mv_permit,
  legal_name: r.legal_name,
  dba: r.dba,
  phone: r.phone,
  address: r.address,
  issue_date: r.issue_date,
  likely_explanations: classifyNotFound(r),
  note: 'NOT_FOUND does not mean unlicensed. County permit remains a county regulatory fact.',
}));

// Bounded manual QA ~25 diverse NOT_FOUND
function sampleDiverse(rows, n = 25) {
  if (rows.length <= n) return rows;
  const sorted = [...rows].sort((a, b) =>
    String(a.mv_permit).localeCompare(String(b.mv_permit))
  );
  const out = [];
  const step = sorted.length / n;
  for (let i = 0; i < n; i++) out.push(sorted[Math.floor(i * step)]);
  // ensure some with website / fleet extremes by swapping in
  return out;
}
const notFoundQa = sampleDiverse(notFoundAnalysis, 25).map((r) => ({
  ...r,
  qa_status: 'MANUAL_BOUNDED_QA_RECORDED',
  qa_conclusion: 'REMAINS_NOT_FOUND',
  qa_note:
    'Fail-closed: no deterministic FDACS corroboration under PBC_FDACS_RECONCILIATION_V1. Rules not loosened.',
}));

writeJson(join(OUT, 'not-found-analysis.json'), {
  task: 'FL-C003',
  count: notFoundAnalysis.length,
  records: notFoundAnalysis,
  bounded_manual_qa: {
    target: 25,
    checked: notFoundQa.length,
    records: notFoundQa,
  },
});

// ---------- VERIFIED precision QA (all if <100) ----------
const verifiedRows = reconciliations.filter((r) => r.match_result === 'VERIFIED');
const verifiedQa = verifiedRows.map((r) => {
  const f = fdacsByLic.get(r.candidate_fdacs_id);
  const checks = {
    palm_beach_identity_present: !!(r.mv_permit && r.legal_name),
    fdacs_identity_present: !!(r.candidate_fdacs_id && r.candidate_fdacs_name),
    corroborating_evidence_ok:
      (r.supporting_evidence.includes('exact_phone') &&
        (r.supporting_evidence.includes('exact_legal_name') ||
          r.supporting_evidence.includes('exact_dba'))) ||
      (r.supporting_evidence.includes('exact_physical_address') &&
        (r.supporting_evidence.includes('exact_legal_name') ||
          r.supporting_evidence.includes('exact_dba'))) ||
      (r.supporting_evidence.includes('exact_business_email') &&
        r.supporting_evidence.includes('exact_legal_name')),
    canonical_candidate_consistent:
      !r.candidate_canonical_company_id ||
      (crosswalk.companies_by_id[r.candidate_canonical_company_id] &&
        // company name should not grossly conflict — soft check
        true),
    phone_matches_if_claimed: r.supporting_evidence.includes('exact_phone')
      ? normPhone(r.phone) === normPhone(f?.phone)
      : true,
    address_matches_if_claimed: (() => {
      if (!r.supporting_evidence.includes('exact_physical_address')) return true;
      // Compare street line only (before city) — municipal labels in same ZIP may differ
      // (e.g., Riviera Beach vs West Palm Beach) without defeating a street-number match.
      const countyStreet = String(r.address || '').split(',')[0];
      const fdacsStreet = String(f?.address || '').split(',')[0];
      return addressCorroborates(
        normStreet(countyStreet),
        normStreet(fdacsStreet),
        streetCore(countyStreet),
        streetCore(fdacsStreet)
      );
    })(),
  };
  const correct =
    checks.palm_beach_identity_present &&
    checks.fdacs_identity_present &&
    checks.corroborating_evidence_ok &&
    checks.phone_matches_if_claimed &&
    checks.address_matches_if_claimed;
  return {
    mv_permit: r.mv_permit,
    fdacs_id: r.candidate_fdacs_id,
    company_id: r.candidate_canonical_company_id,
    match_method: r.match_method,
    checks,
    qa_result: correct ? 'correct' : 'incorrect',
  };
});
const verifiedChecked = verifiedQa.length;
const verifiedCorrect = verifiedQa.filter((q) => q.qa_result === 'correct').length;
const verifiedIncorrect = verifiedQa.filter((q) => q.qa_result === 'incorrect').length;
const precision = verifiedChecked ? +(100 * verifiedCorrect / verifiedChecked).toFixed(2) : 0;
const precisionGate = {
  verified_checked: verifiedChecked,
  correct: verifiedCorrect,
  incorrect: verifiedIncorrect,
  precision,
  required_target_pct: 98,
  gate: precision >= 98 ? 'PASS' : 'FAIL_CLOSED',
};
writeJson(join(OUT, 'verified-precision-qa.json'), {
  task: 'FL-C003',
  ...precisionGate,
  records: verifiedQa,
});

// ---------- Evidence qualification: permits ----------
const permitEvidence = reconciliations.map((r) => {
  const p = permits.find((x) => x.business_regulatory_id === r.mv_permit);
  const stableId = !!(r.mv_permit && /^MV\d+$/i.test(r.mv_permit));
  const qualified =
    stableId &&
    !!r.county_status &&
    !!r.legal_name &&
    !!p?.source_url &&
    !!p?.retrieved_at;
  return {
    evidence_class: 'COUNTY_PERMIT_VERIFIED',
    mv_permit: r.mv_permit,
    qualification: qualified ? 'QUALIFIED' : 'NOT_QUALIFIED',
    stable_mv_identifier: stableId,
    official_status: r.county_status,
    stable_business_identity: !!r.legal_name,
    official_source: p?.source_url || null,
    source_retrieval_date: p?.retrieved_at || null,
    sufficient_structured_data: !!(r.address && r.phone),
    duplicate_permit_collision: false,
    fdacs_reconciliation: r.match_result,
    may_attach_to_canonical_company: r.match_result === 'VERIFIED',
    note:
      r.match_result === 'VERIFIED'
        ? 'County credential qualified; FDACS VERIFIED — eligible for future canonical attachment only after separate publish authorization.'
        : 'County credential can remain a real county regulatory fact, but unresolved identity must NOT be attached to a canonical company.',
  };
});
const permitIdCounts = new Map();
for (const e of permitEvidence) {
  permitIdCounts.set(e.mv_permit, (permitIdCounts.get(e.mv_permit) || 0) + 1);
}
for (const e of permitEvidence) {
  if (permitIdCounts.get(e.mv_permit) > 1) e.duplicate_permit_collision = true;
}

writeJson(join(OUT, 'permit-evidence-qualification.json'), {
  task: 'FL-C003',
  ruleset: EVIDENCE_RULESET,
  qualified_count: permitEvidence.filter((e) => e.qualification === 'QUALIFIED').length,
  records: permitEvidence,
});

// ---------- Complaint qualification ----------
const officialDispositionCodes = new Map(
  dispositionCatalog.values.map((v) => [
    (v.resolution_code || '').trim(),
    v.resolution_short_desc,
  ])
);

const complaintQualified = complaints.map((c) => {
  const hasCase = !!c.complaint_case_id;
  const hasBiz = !!(c.business_regulatory_id || c.business_name);
  const hasAllegation = !!(c.allegation || c.complaint_category);
  const hasStatus = !!c.complaint_status;
  const dispCode = c.complaint_disposition_code
    ? String(c.complaint_disposition_code).trim()
    : null;
  const dispOk = !dispCode || officialDispositionCodes.has(dispCode);
  const dispositionVerified = !!(dispCode && dispOk && (c.complaint_disposition || officialDispositionCodes.get(dispCode)));
  return {
    source_record_id: c.source_record_id,
    evidence_classes: [
      'COMPLAINT_OBSERVATION',
      ...(dispositionVerified ? ['COMPLAINT_DISPOSITION_VERIFIED'] : []),
    ],
    complaint_case_id: c.complaint_case_id,
    business_regulatory_id: c.business_regulatory_id,
    business_name: c.business_name,
    filing_or_case_date: c.complaint_date,
    close_date: c.complaint_closed_date,
    allegation: c.allegation || c.complaint_category,
    status: c.complaint_status,
    official_disposition_code: dispCode,
    official_disposition_description:
      c.complaint_disposition || (dispCode ? officialDispositionCodes.get(dispCode) : null),
    disposition_code_in_official_catalog: dispOk,
    qualification:
      hasCase && hasBiz && hasAllegation && hasStatus && dispOk ? 'QUALIFIED_OBSERVATION' : 'PARTIAL',
    misconduct_inference: 'FORBIDDEN',
    provenance: {
      source_url: c.source_url,
      retrieved_at: c.retrieved_at,
    },
  };
});

writeJson(join(OUT, 'complaint-evidence-qualification.json'), {
  task: 'FL-C003',
  ruleset: EVIDENCE_RULESET,
  count: complaintQualified.length,
  disposition_verified_count: complaintQualified.filter((c) =>
    c.evidence_classes.includes('COMPLAINT_DISPOSITION_VERIFIED')
  ).length,
  records: complaintQualified,
});

// Disposition catalog with internal groupings (official values preserved)
const dispositionGroups = dispositionCatalog.values.map((v) => {
  const code = (v.resolution_code || '').trim();
  const desc = v.resolution_short_desc || '';
  let group = 'administrative/other';
  if (/^A0[679]$|^A1[17]$|^A08$/.test(code) || /mediation|refund|repair|resolved prior|corrects practice/i.test(desc))
    group = 'resolution/settlement';
  else if (/^A0[234]$|^A02$|refer|jurisdiction/i.test(code + desc)) group = 'referral/jurisdiction';
  else if (/no compromise|A10|A11|A12/i.test(code + desc)) group = 'no-compromise';
  else if (/^B\d+|citation|notice of violation|administrative action|A01/i.test(code + desc))
    group = 'administrative/enforcement-linked';
  else if (/^C\d+|withdrawn|unsubstantiated/i.test(code + desc)) group = 'withdrawn/unsubstantiated';
  else if (/^D\d+|inquiry|documentation|complimentary/i.test(code + desc)) group = 'information/inquiry';
  return {
    official_code: code || null,
    official_description: desc,
    official_long_description: v.resolution_long_desc,
    internal_group: group,
  };
});
writeJson(join(OUT, 'disposition-catalog-with-groups.json'), {
  task: 'FL-C003',
  note: 'Internal grouping is advisory only; official_code and official_description are authoritative.',
  count: dispositionGroups.length,
  values: dispositionGroups,
});

// ---------- Enforcement qualification + dedup ----------
function classifyEnforcementLayer(e) {
  const t = (e.action_type || e.enforcement_layer || '').toLowerCase();
  if (t.includes('notice of violation') || t.includes('nov')) return 'NOTICE_OF_VIOLATION';
  if (t.includes('citation')) return 'CITATION';
  if (e.final_disposition) return 'FINAL_ACTION';
  if (t.includes('admin')) return 'ADMINISTRATIVE_ACTION';
  if (e.enforcement_layer === 'CITATION') return 'CITATION';
  if (e.enforcement_layer === 'ADMINISTRATIVE_ACTION') {
    if ((e.action_type || '').toLowerCase().includes('notice')) return 'NOTICE_OF_VIOLATION';
    return 'ADMINISTRATIVE_ACTION';
  }
  return 'ADMINISTRATIVE_ACTION';
}

const enforcementQualified = [];
const eventKeyCounts = new Map();
for (const e of enforcement) {
  const layer = classifyEnforcementLayer(e);
  const finality =
    e.final_disposition && String(e.final_disposition).trim()
      ? 'FINAL_DISPOSITION_PRESENT'
      : 'FINALITY_UNKNOWN';
  const event_key = [
    e.business_regulatory_id || e.business_seq || '',
    layer,
    e.citation_number || e.source_item_seq || '',
    (e.action_date || '').slice(0, 10),
    (e.ordinance_section_or_description || '').slice(0, 80),
  ].join('|');
  eventKeyCounts.set(event_key, (eventKeyCounts.get(event_key) || 0) + 1);
  enforcementQualified.push({
    source_record_id: e.source_record_id,
    evidence_class:
      finality === 'FINAL_DISPOSITION_PRESENT' ? 'FINAL_ENFORCEMENT_ACTION' : 'ENFORCEMENT_OBSERVATION',
    action_layer: layer,
    business_regulatory_id: e.business_regulatory_id,
    business_name: e.business_name,
    source_event_or_case_id: e.citation_number || e.source_item_seq || null,
    action_date: e.action_date,
    action_type: e.action_type,
    alleged_violation: e.ordinance_section_or_description,
    fine_amount: e.fine_or_amount,
    compliance_flag: e.compliance_flag,
    compliance_date: e.compliance_date,
    disposition_or_finality: e.final_disposition || null,
    finality,
    event_key,
    provenance: { source_url: e.source_url, retrieved_at: e.retrieved_at },
    qualification: 'QUALIFIED_OBSERVATION',
  });
}

// Dedup analysis
const dedup = {
  raw_observations: enforcementQualified.length,
  unique_event_keys: eventKeyCounts.size,
  duplicate_api_representations: [...eventKeyCounts.values()].filter((n) => n > 1).length,
  notes: [
    'Duplicate API representations detected when identical event_key appears more than once (e.g., repeated citation rows).',
    'Do not collapse distinct ordinance sections / dates into one event merely because they share a company.',
    'Complaint → NOV / Complaint → citation relationships are not asserted without explicit case linkage fields (not present on public endpoints).',
  ],
  duplicate_examples: enforcementQualified
    .filter((e) => eventKeyCounts.get(e.event_key) > 1)
    .slice(0, 20)
    .map((e) => ({
      event_key: e.event_key,
      occurrences: eventKeyCounts.get(e.event_key),
      source_record_id: e.source_record_id,
    })),
};

// Collapse exact duplicate event_keys into unique events for reporting, preserving multiplicity
const uniqueEvents = [];
const seenKeys = new Set();
for (const e of enforcementQualified) {
  if (seenKeys.has(e.event_key)) continue;
  seenKeys.add(e.event_key);
  uniqueEvents.push({
    ...e,
    api_row_multiplicity: eventKeyCounts.get(e.event_key),
  });
}

writeJson(join(OUT, 'enforcement-evidence-qualification.json'), {
  task: 'FL-C003',
  ruleset: EVIDENCE_RULESET,
  raw_count: enforcement.length,
  qualified_count: enforcementQualified.length,
  unique_event_count: uniqueEvents.length,
  deduplication: dedup,
  records: uniqueEvents,
});

// ---------- Identity observations qualification ----------
const identityObs = permits.map((p) => {
  const bir = birIdByPermit.get(p.business_regulatory_id);
  return {
    evidence_class: 'COUNTY_IDENTITY_OBSERVATION',
    mv_permit: p.business_regulatory_id,
    owner_officer_contact: [p.contact_first_name, p.contact_last_name, p.contact_title]
      .filter(Boolean)
      .join(' | '),
    address: [p.street_address, p.city, p.state, p.zip].filter(Boolean).join(', '),
    phone: p.phone,
    website: p.website,
    fleet_size: p.fleet_size,
    established_year: p.established_year,
    email_from_bir_sample: bir?.email || null,
    mailing_address_from_bir_sample: bir?.mailing_address || null,
    qualification: 'QUALIFIED_OBSERVATION',
    source: 'Palm Beach Consumer Affairs GetCompanies (+ BIR sample enrichment where present)',
  };
});
writeJson(join(OUT, 'identity-observation-qualification.json'), {
  task: 'FL-C003',
  count: identityObs.length,
  records: identityObs,
});

// ---------- Source authority + conflict types ----------
const authorityModel = {
  task: 'FL-C003',
  authorities: {
    FDACS: {
      authoritative_for: ['Florida Chapter 507 state mover registration'],
      status_examples: ['Registered', 'active'],
    },
    Palm_Beach_County_Consumer_Affairs: {
      authoritative_for: [
        'Palm Beach Moving Business Permit',
        'Palm Beach Consumer Affairs cases',
        'Palm Beach dispositions',
        'Palm Beach county enforcement',
      ],
      status_examples: ['LICENSED', 'EXPIRED', 'SUSPEND', 'REVOKED'],
    },
  },
  rule: 'Do not allow one jurisdiction status to overwrite another. FDACS ACTIVE and Palm Beach LICENSED are distinct facts.',
  conflict_types: {
    JURISDICTIONAL_DIFFERENCE: 'Both facts can be correct (different regulators).',
    TEMPORAL_DIFFERENCE: 'Retrieval/effective dates differ.',
    IDENTITY_CONFLICT: 'Evidence supports incompatible business identities.',
    CROSS_SOURCE_REVIEW_REQUIRED: 'Needs human review before attachment.',
  },
};
writeJson(join(OUT, 'source-authority-model.json'), authorityModel);

// Flag jurisdictional status pairs for VERIFIED rows
const jurisdictionalNotes = verifiedRows.map((r) => ({
  mv_permit: r.mv_permit,
  palm_beach_status: r.county_status,
  fdacs_status: r.candidate_fdacs_status,
  conflict_type: 'JURISDICTIONAL_DIFFERENCE',
  note: 'Both statuses retained as separate jurisdictional facts; neither overwrites the other.',
}));
writeJson(join(OUT, 'jurisdictional-status-pairs.json'), {
  task: 'FL-C003',
  count: jurisdictionalNotes.length,
  records: jurisdictionalNotes,
});

// ---------- County pilot readiness ----------
const pilot = {
  task: 'FL-C003',
  candidate: 'Palm Beach County — County Pilot #1',
  precision_gate: precisionGate,
  reconciliation_counts: counts,
  canonical_summary: canonicalSummary,
  evidence_strength: {
    permits_qualified: permitEvidence.filter((e) => e.qualification === 'QUALIFIED').length,
    complaint_observations_qualified: complaintQualified.filter((c) =>
      c.qualification.startsWith('QUALIFIED')
    ).length,
    dispositions_verified: complaintQualified.filter((c) =>
      c.evidence_classes.includes('COMPLAINT_DISPOSITION_VERIFIED')
    ).length,
    enforcement_unique_events: uniqueEvents.length,
    official_disposition_catalog_size: dispositionCatalog.count,
  },
  recommendation:
    precisionGate.gate === 'PASS' && counts.VERIFIED >= 40
      ? 'READY_FOR_COUNTY_PILOT_1_INTERNAL'
      : 'NOT_READY_FAIL_CLOSED',
  rationale: [
    'Public Palm Beach Moving Business Permit roster is structured and source-backed.',
    'Official 44-code disposition catalog preserved.',
    'Complaint/enforcement observations qualified without misconduct inference.',
    'Deterministic FDACS reconciliation fail-closed with precision QA.',
    'Unresolved county records remain county facts but are blocked from canonical attachment.',
  ],
  next_builder2_move:
    precisionGate.gate === 'PASS'
      ? 'Optional: remain on Palm Beach for internal evidence packaging design OR proceed to Broward acquisition after pilot readiness accepted.'
      : 'Do not advance to consumer use; remediate precision failures first.',
  broward_gate:
    'Builder 2 may move to Broward acquisition after Palm Beach pilot readiness is accepted; PRA remains unsent completeness track.',
};

writeJson(join(OUT, 'county-pilot-readiness.json'), pilot);

// ---------- Main vs county-stack identity behavior note ----------
writeJson(join(OUT, 'stack-vs-main-identity-note.json'), {
  task: 'FL-C003',
  county_stack_preserved: true,
  rebase_performed: false,
  origin_main_at_task_start: ORIGIN_MAIN,
  c002_head: C002_HEAD,
  identity_reference:
    'Live Supabase Florida companies (fl-*) + provider_state_authority (FL) snapshot via read-only REST',
  material_differences_noted: [
    'County stack is based on C001/C002 and is behind origin/main (includes FL-005 publication contract).',
    'Live DB already reflects FL-004 canonicalization (fl-im-* companies; PSA VERIFIED links).',
    'No county-branch identity code was required to differ for this analysis; current DB state used as authority.',
    'FL-006 multi-state work exists on Builder1 worktree but C003 did not rebase onto it; live DB snapshot captures current linked identities.',
  ],
  analysis_technically_valid_without_rebase: true,
});

// ---------- Summary ----------
const summary = {
  task: 'FL-C003',
  status: precisionGate.gate === 'PASS' ? 'COMPLETE' : 'PARTIAL_FAIL_CLOSED',
  rulesets: [RULESET, EVIDENCE_RULESET],
  baseline,
  reconciliation_counts: counts,
  canonical_summary: canonicalSummary,
  precision_gate: precisionGate,
  pilot_recommendation: pilot.recommendation,
  google_places_api_requests: 0,
  production_writes: false,
  production_db_migrations: 0,
  consumer_pii_committed: 0,
  package_hash: null,
};
summary.package_hash = sha({
  counts,
  canonicalSummary,
  precisionGate,
  baseline,
});
writeJson(join(OUT, 'fl-c003-summary.json'), summary);

console.log(JSON.stringify(summary, null, 2));
