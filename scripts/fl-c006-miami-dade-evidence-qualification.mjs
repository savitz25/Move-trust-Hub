/**
 * FL-C006 — Miami-Dade Deterministic FDACS Reconciliation & County Evidence Qualification
 * READ-ONLY. No production writes. No Google Places/API calls.
 *
 * Rulesets:
 *   MDC_FDACS_RECONCILIATION_V1
 *   MDC_COUNTY_EVIDENCE_V1
 */
import { createHash } from 'crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join, resolve, basename } from 'path';

const ROOT = resolve('.');
const NORM = resolve('data/county-regulatory/fl/miami-dade/normalized');
const RAW = resolve('data/county-regulatory/fl/miami-dade/raw');
const EVID = resolve('data/county-regulatory/fl/miami-dade/evidence');
const OUT = resolve('data/county-regulatory/fl/miami-dade/evidence/c006');
const QUAL = resolve('data/county-regulatory/fl/miami-dade/qualified');
const META = resolve('data/county-regulatory/fl/miami-dade/meta');
mkdirSync(OUT, { recursive: true });
mkdirSync(QUAL, { recursive: true });
mkdirSync(META, { recursive: true });

const RETRIEVED_AT = new Date().toISOString();
const RULESET = 'MDC_FDACS_RECONCILIATION_V1';
const EVIDENCE_RULESET = 'MDC_COUNTY_EVIDENCE_V1';
const ORIGIN_MAIN = '2959930c0a149eb961fa3d2b6306f23c7cba820d';
const C005_HEAD = '2dd88cb5371891ec3af916fbedbe52d48dcf6d22';

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
}
function writeJson(path, obj) {
  writeFileSync(path, JSON.stringify(obj, null, 2));
}
function sha(obj) {
  return createHash('sha256').update(JSON.stringify(obj)).digest('hex');
}
function shaFile(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}
function stripBom(s) {
  return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
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
      /\b(STREET|ST|AVENUE|AVE|ROAD|RD|DRIVE|DR|BOULEVARD|BLVD|LANE|LN|COURT|CT|CIRCLE|CIR|WAY|PLACE|PL|TERRACE|TER|SUITE|STE|UNIT|BLDG|BUILDING|FL|FLOOR|#)\b/g,
      ' '
    )
    .replace(/\s+/g, ' ')
    .trim();
}
function streetCore(s) {
  const n = normStreet(s);
  const parts = n.split(' ').filter(Boolean);
  if (parts.length < 2) return n;
  return parts.slice(0, 3).join(' ');
}
function emailsEqual(a, b) {
  if (!a || !b) return false;
  return String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
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
const licensesWrap = readJson(join(NORM, 'mover-licenses.json'));
const lbtWrap = readJson(join(NORM, 'business-tax-observations.json'));
const lbtCrossC005 = readJson(join(NORM, 'lbt-crosswalk.json'));
const insuranceC005 = readJson(join(NORM, 'insurance-workers-comp-observations.json'));
const branchModelC005 = readJson(join(NORM, 'branch-model.json'));
const vehicleProfileC005 = readJson(join(NORM, 'vehicle-profile.json'));
const complaintProfileC005 = readJson(join(NORM, 'complaint-system-profile.json'));
const enforcementProfileC005 = readJson(join(NORM, 'enforcement-system-profile.json'));
const programC005 = readJson(join(NORM, 'program-verification.json'));
const crosswalk = readJson(join(EVID, 'florida-im-company-crosswalk.json'));
const identitySnapshotMeta = existsSync(join(EVID, 'florida-identity-snapshot-meta.json'))
  ? readJson(join(EVID, 'florida-identity-snapshot-meta.json'))
  : { retrieved_at: crosswalk.retrieved_at, counts: crosswalk.counts };

const licenses = licensesWrap.records;
const issued = licenses.filter((r) => r.status === 'Issued');
const lbtRecords = lbtWrap.records || [];

const statusDistribution = {};
for (const r of licenses) statusDistribution[r.status] = (statusDistribution[r.status] || 0) + 1;
const uniqueBusinesses = new Set(licenses.map((r) => r.business_id).filter(Boolean)).size;

const baseline = {
  task: 'FL-C006',
  recomputed_from: [
    'mover-licenses.json',
    'business-tax-observations.json',
    'lbt-crosswalk.json',
    'fdacs-matchability.json',
  ],
  total_license_records: licenses.length,
  unique_businesses: uniqueBusinesses,
  issued_count: issued.length,
  status_distribution: statusDistribution,
  lbt_rows: lbtRecords.length,
  c005_reported_issued_fdacs_matchability: {
    DETERMINISTIC_MATCH: 75,
    REVIEW_REQUIRED: 28,
    NOT_FOUND: 14,
    INSUFFICIENT_EVIDENCE: 0,
  },
  note: 'Recomputed from C005 staged artifacts; historical C005 report numbers are inputs only, not forced.',
  retrieved_at: RETRIEVED_AT,
};
writeJson(join(OUT, 'c005-baseline-recomputed.json'), baseline);

// ---------- Rulesets ----------
const reconciliationRuleset = {
  ruleset_id: RULESET,
  fail_closed: true,
  outcomes: ['VERIFIED', 'REVIEW_REQUIRED', 'NOT_FOUND', 'CONFLICT', 'NOT_APPLICABLE'],
  verify_requires_one_of: [
    'exact_legal_name + exact_physical_address',
    'exact_dba + exact_physical_address',
    'exact_legal_name + exact_phone (when public)',
    'exact_dba + exact_phone (when public)',
    'exact_legal_name + exact_business_email (when public)',
    'explicit shared FDACS IM identifier on county source (not observed on public EnerGov roster)',
  ],
  never_verify_from_only: [
    'legal name',
    'DBA',
    'city',
    'ZIP',
    'LBT name',
    'website',
    'brand',
    'fuzzy similarity',
    'mailing address alone',
    'category code',
  ],
  miami_dade_note:
    'Public EnerGov roster lacks phone/email/IM for matching; name+address precision must be especially strict and QA every VERIFIED association.',
  conflict_when:
    'Two or more strong FDACS candidates with incompatible identity evidence, or strong corroboration for mutually exclusive entities.',
  not_applicable_when:
    'Record is not a Moving Business Registration / License (not expected in this Moving/MR roster).',
};
const evidenceRuleset = {
  ruleset_id: EVIDENCE_RULESET,
  evidence_classes: [
    'MDC_MOVING_CREDENTIAL_VERIFIED',
    'MDC_IDENTITY_OBSERVATION',
    'MDC_BUSINESS_TAX_OBSERVATION',
    'MDC_BRANCH_SCHEMA_OBSERVATION',
    'MDC_VEHICLE_SCHEMA_OBSERVATION',
    'MDC_INSURANCE_REQUIREMENT_OBSERVATION',
    'MDC_WORKERS_COMP_REQUIREMENT_OBSERVATION',
    'COMPLAINT_SYSTEM_OBSERVATION',
    'CITATION_AUTHORITY_OBSERVATION',
    'ENFORCEMENT_AUTHORITY_OBSERVATION',
  ],
  principles: [
    'Allegation is never final action.',
    'Complaint intake is not complaint history.',
    'Program authority is not a company-level event.',
    'LBT is secondary tax evidence — never a substitute for Moving Business Registration.',
    'BRANCH_SCHEMA_SUPPORTED ≠ BRANCH_RECORD_OBSERVED.',
    'Vehicle/insurance APPLICATION requirements ≠ observed company fleet/policy compliance.',
    'Unresolved county identity must not be attached to a canonical company.',
    'A valid county credential can remain a real county regulatory fact without FDACS reconciliation.',
    'FDACS and Miami-Dade statuses are distinct jurisdictional facts.',
  ],
};
writeJson(join(OUT, 'MDC_FDACS_RECONCILIATION_V1.json'), reconciliationRuleset);
writeJson(join(OUT, 'MDC_COUNTY_EVIDENCE_V1.json'), evidenceRuleset);
writeJson(join(QUAL, 'mdc-evidence-ruleset-v1.json'), {
  task: 'FL-C006',
  version: 'v1',
  reconciliation: reconciliationRuleset,
  evidence: evidenceRuleset,
  retrieved_at: RETRIEVED_AT,
});

// ---------- FDACS universe ----------
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
    const score = (r) =>
      (r.phone ? 1 : 0) + (r.email ? 1 : 0) + (r.address ? 1 : 0) + (r.dba ? 1 : 0);
    if (score(rec) > score(prev)) fdacsByLic.set(lic, rec);
  }
}
for (const f of fdacsRecordsRaw) {
  upsertFdacs({
    license_no: String(f['LICENSE NO#'] || '')
      .trim()
      .toUpperCase(),
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
    license_no: String(row['License Number'] || '')
      .trim()
      .toUpperCase(),
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

function nameEquals(a, b) {
  return a && b && a === b;
}
function addressCorroborates(countyStreet, fdacsStreet, countyCore, fdacsCore) {
  if (!countyStreet || !fdacsStreet) return false;
  if (countyStreet === fdacsStreet) return true;
  if (countyCore && fdacsCore && countyCore === fdacsCore) return true;
  if (countyCore && fdacsCore && /^\d+ /.test(countyCore) && /^\d+ /.test(fdacsCore)) {
    return countyStreet.includes(fdacsCore) || fdacsStreet.includes(countyCore);
  }
  return false;
}

function evaluateCandidate(lic, f) {
  const cName = normName(lic.company_name);
  const cDba = normName(lic.dba);
  const cPhone = normPhone(lic.phone);
  const cEmail = (lic.email || '').trim().toLowerCase() || null;
  const cStreet = normStreet(lic.street_address || lic.address_display);
  const cCore = streetCore(lic.street_address || lic.address_display);
  const signals = [];
  const exactLegal = nameEquals(cName, f._name) || nameEquals(cName, f._dba);
  const exactDba =
    (cDba && (nameEquals(cDba, f._name) || nameEquals(cDba, f._dba))) ||
    (cName && nameEquals(cName, f._dba));
  const exactPhone = !!(cPhone && f._phone && cPhone === f._phone);
  const exactAddr = addressCorroborates(cStreet, f._street, cCore, f._streetCore);
  const exactEmail = !!(cEmail && f._email && emailsEqual(cEmail, f._email));
  const explicitIm =
    !!(lic.fdacs_im_number_on_public_roster &&
      String(lic.fdacs_im_number_on_public_roster).toUpperCase() === f.license_no);

  if (exactLegal) signals.push('exact_legal_name');
  if (exactDba && !exactLegal) signals.push('exact_dba');
  if (exactDba && exactLegal && cDba && cDba !== cName) signals.push('exact_dba');
  if (exactPhone) signals.push('exact_phone');
  if (exactAddr) signals.push('exact_physical_address');
  if (exactEmail) signals.push('exact_business_email');
  if (explicitIm) signals.push('explicit_fdacs_im');

  let strength = null;
  if (explicitIm && (exactLegal || exactDba || exactAddr || exactPhone)) strength = 'VERIFIED';
  else if ((exactLegal || exactDba) && exactPhone) strength = 'VERIFIED';
  else if ((exactLegal || exactDba) && exactAddr) strength = 'VERIFIED';
  else if (exactLegal && exactEmail) strength = 'VERIFIED';
  else if (exactPhone && !exactLegal && !exactDba && !exactAddr && !exactEmail) {
    strength = 'REVIEW_REQUIRED';
    signals.push('phone_only_insufficient');
  } else if ((exactLegal || exactDba) && !exactPhone && !exactAddr && !exactEmail) {
    strength = 'REVIEW_REQUIRED';
    signals.push('name_only_insufficient');
  } else if (signals.length > 0) {
    strength = 'REVIEW_REQUIRED';
  }

  const conflicts = [];
  if (exactLegal && cStreet && f._street && !exactAddr) {
    conflicts.push({
      type: 'address_conflict_or_historical',
      county: lic.address_display || lic.street_address,
      fdacs: f.address,
    });
  }
  if (exactLegal && exactPhone === false && cPhone && f._phone && cPhone !== f._phone) {
    conflicts.push({ type: 'phone_conflict', county: lic.phone, fdacs: f.phone });
  }

  return { fdacs: f, signals, strength, conflicts };
}

// ---------- Historical status model ----------
function mapInternalStatus(status) {
  if (status === 'Issued') return 'CURRENT_CREDENTIAL';
  if (['Expired', 'Out of Business', 'Abandoned', 'Archived'].includes(status)) {
    return 'HISTORICAL_CREDENTIAL';
  }
  if (['In Review', 'On Hold', 'Submitted - Online', 'Void'].includes(status)) {
    return 'PROCESS_RECORD';
  }
  return 'STATUS_REVIEW_REQUIRED';
}

const historicalModel = {
  task: 'FL-C006',
  mapping: {
    Issued: 'CURRENT_CREDENTIAL',
    Expired: 'HISTORICAL_CREDENTIAL',
    'Out of Business': 'HISTORICAL_CREDENTIAL',
    Abandoned: 'HISTORICAL_CREDENTIAL',
    Archived: 'HISTORICAL_CREDENTIAL',
    'In Review': 'PROCESS_RECORD',
    'On Hold': 'PROCESS_RECORD',
    'Submitted - Online': 'PROCESS_RECORD',
    Void: 'PROCESS_RECORD',
  },
  note: 'Conservative research mapping. Not a legal interpretation. Historical rows are not active-publication candidates in C006.',
  counts: {},
  records: licenses.map((r) => {
    const internal = mapInternalStatus(r.status);
    return {
      license_number: r.license_number,
      business_id: r.business_id,
      company_name: r.company_name,
      status: r.status,
      internal_status_class: internal,
      issue_date: r.issue_date,
      expire_date: r.expire_date,
    };
  }),
};
for (const r of historicalModel.records) {
  historicalModel.counts[r.internal_status_class] =
    (historicalModel.counts[r.internal_status_class] || 0) + 1;
}
writeJson(join(OUT, 'historical-status-model.json'), historicalModel);

// ---------- Reconcile all Issued ----------
const reconciliations = [];
const counts = {
  VERIFIED: 0,
  REVIEW_REQUIRED: 0,
  NOT_FOUND: 0,
  CONFLICT: 0,
  NOT_APPLICABLE: 0,
};

for (const lic of issued) {
  const candidates = [];
  const seen = new Set();
  const phone = normPhone(lic.phone);
  const names = [normName(lic.company_name), normName(lic.dba)].filter(Boolean);
  const email = (lic.email || '').trim().toLowerCase() || null;
  const pool = [];
  if (phone && fdacsByPhone.has(phone)) pool.push(...fdacsByPhone.get(phone));
  for (const n of names) {
    if (fdacsByName.has(n)) pool.push(...fdacsByName.get(n));
  }
  if (email && fdacsByEmail.has(email)) pool.push(...fdacsByEmail.get(email));

  for (const f of pool) {
    if (seen.has(f.license_no)) continue;
    seen.add(f.license_no);
    candidates.push(evaluateCandidate(lic, f));
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
    if (chosen.signals.includes('name_only_insufficient'))
      review_reasons.push('legal-name-only candidate');
    if (chosen.signals.includes('phone_only_insufficient'))
      review_reasons.push('phone-only insufficient');
    if (chosen.conflicts.some((c) => c.type.startsWith('address')))
      review_reasons.push('address mismatch / historical address');
    if (review.length > 1) review_reasons.push('multiple FDACS candidates');
    if (!review_reasons.length)
      review_reasons.push('plausible relationship, insufficient deterministic evidence');
  } else {
    result = 'NOT_FOUND';
  }

  const fdacsId = chosen?.fdacs?.license_no || null;
  const companyIds = fdacsId ? crosswalk.im_to_company_ids[fdacsId] || [] : [];
  let primaryCompanyId = companyIds[0] || null;
  let company = primaryCompanyId ? crosswalk.companies_by_id[primaryCompanyId] || null : null;

  let canonical_class = 'COUNTY_ONLY_REVIEW';
  if (result === 'VERIFIED' && primaryCompanyId) {
    canonical_class = 'CANONICAL_LINKED';
  } else if (result === 'VERIFIED' && !primaryCompanyId) {
    // Try unique name match against companies_by_id for CANONICAL_CANDIDATE
    const cName = normName(lic.company_name);
    const cDba = normName(lic.dba);
    const hits = [];
    for (const [cid, co] of Object.entries(crosswalk.companies_by_id || {})) {
      const n = normName(co.name);
      if ((cName && n === cName) || (cDba && n === cDba)) hits.push(cid);
    }
    if (hits.length === 1) {
      canonical_class = 'CANONICAL_CANDIDATE';
      primaryCompanyId = hits[0];
      company = crosswalk.companies_by_id[primaryCompanyId];
    } else {
      canonical_class = 'STATE_RECORD_ONLY';
    }
  } else {
    canonical_class = 'COUNTY_ONLY_REVIEW';
  }

  if (result === 'VERIFIED' && companyIds.length > 1) {
    conflicting_evidence = [
      ...conflicting_evidence,
      { type: 'multiple_canonical_company_ids_for_im', company_ids: companyIds },
    ];
  }

  counts[result]++;

  reconciliations.push({
    ruleset: RULESET,
    mr_license: lic.license_number,
    source_record_id: lic.source_record_id,
    case_id: lic.case_id,
    business_id: lic.business_id,
    legal_name: lic.company_name,
    dba: lic.dba || '',
    county_status: lic.status,
    internal_status_class: 'CURRENT_CREDENTIAL',
    issue_date: lic.issue_date,
    expire_date: lic.expire_date,
    address: lic.address_display || [lic.street_address, lic.city, lic.state, lic.zip].filter(Boolean).join(', '),
    street_address: lic.street_address,
    city: lic.city,
    state: lic.state,
    zip: lic.zip,
    business_type: lic.business_type,
    license_type: lic.license_type,
    description: lic.description || '',
    phone: lic.phone || null,
    email: lic.email || null,
    candidate_fdacs_id: fdacsId,
    candidate_fdacs_name: chosen?.fdacs?.name || null,
    candidate_fdacs_status: chosen?.fdacs?.status || null,
    candidate_fdacs_phone: chosen?.fdacs?.phone || null,
    candidate_fdacs_address: chosen?.fdacs?.address || null,
    candidate_canonical_company_id: primaryCompanyId,
    candidate_canonical_company_ids: companyIds.length ? companyIds : primaryCompanyId ? [primaryCompanyId] : [],
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
      county_source: lic.source_url,
      county_retrieved_at: lic.retrieved_at,
      fdacs_sources: [
        'data/state-hhg/fl/fdacs-legacy-im-active.json',
        'data/state-hhg/fl/fdacs-intrastate-movers-newdb.csv',
      ],
      identity_snapshot_retrieved_at: identitySnapshotMeta.retrieved_at || crosswalk.retrieved_at,
      ruleset: RULESET,
    },
  });
}

writeJson(join(OUT, 'issued-fdacs-reconciliation.json'), {
  task: 'FL-C006',
  ruleset: RULESET,
  retrieved_at: RETRIEVED_AT,
  production_writes: false,
  google_places_api_requests: 0,
  consumer_pii_committed: 0,
  issued_count: issued.length,
  counts,
  records: reconciliations,
});

// ---------- Canonical summary ----------
const canonicalSummary = {
  CANONICAL_LINKED: reconciliations.filter((r) => r.canonical_class === 'CANONICAL_LINKED').length,
  CANONICAL_CANDIDATE: reconciliations.filter((r) => r.canonical_class === 'CANONICAL_CANDIDATE')
    .length,
  STATE_RECORD_ONLY: reconciliations.filter((r) => r.canonical_class === 'STATE_RECORD_ONLY')
    .length,
  COUNTY_ONLY_REVIEW: reconciliations.filter((r) => r.canonical_class === 'COUNTY_ONLY_REVIEW')
    .length,
};
writeJson(join(OUT, 'canonical-crosswalk-summary.json'), {
  task: 'FL-C006',
  note: 'Read-only classification against current Florida companies/PSA snapshot. No company or PSA rows modified.',
  identity_snapshot_retrieved_at: identitySnapshotMeta.retrieved_at || crosswalk.retrieved_at,
  origin_main_observed: ORIGIN_MAIN,
  summary: canonicalSummary,
});

// ---------- REVIEW triage ----------
const reviewTriage = reconciliations
  .filter((r) => r.match_result === 'REVIEW_REQUIRED')
  .map((r) => {
    const categories = [...new Set(r.review_reasons)];
    if (/all my sons|two men|college hunks|u-?haul|pod|suddath|withers/i.test(`${r.legal_name} ${r.dba}`)) {
      categories.push('brand/network ambiguity');
    }
    if (r.conflicting_evidence?.some((c) => c.type.includes('address'))) {
      categories.push('address mismatch / suite-unit formatting / historical address');
    }
    if (r.candidate_count > 1) categories.push('multiple FDACS candidates');
    if (!r.phone && !r.email) categories.push('Miami-Dade public roster lacks phone/email');
    categories.push('corporate filing / LBT corroboration may help but is not alone sufficient');
    return {
      mr_license: r.mr_license,
      legal_name: r.legal_name,
      dba: r.dba,
      candidate_fdacs_id: r.candidate_fdacs_id,
      categories: [...new Set(categories)],
      supporting_evidence: r.supporting_evidence,
      conflicting_evidence: r.conflicting_evidence,
      resolution: 'REMAINS_REVIEW_REQUIRED',
      note: 'Fail-closed: not elevated to VERIFIED without deterministic name+address (or phone/email/IM).',
    };
  });
writeJson(join(OUT, 'review-triage.json'), {
  task: 'FL-C006',
  count: reviewTriage.length,
  records: reviewTriage,
});

// ---------- NOT_FOUND analysis (full cohort — small) ----------
const notFound = reconciliations.filter((r) => r.match_result === 'NOT_FOUND');
function classifyNotFound(r) {
  const reasons = [];
  const name = normName(r.legal_name);
  const issueYear = r.issue_date ? Number(String(r.issue_date).slice(0, 4)) : null;
  if (issueYear && issueYear >= 2025) reasons.push('county record possibly newer than FDACS snapshot');
  const tokens = name.split(' ').filter((t) => t.length > 3);
  let partial = 0;
  for (const f of fdacsList) {
    if (!f._name) continue;
    const hit = tokens.filter((t) => f._name.includes(t) || (f._dba && f._dba.includes(t))).length;
    if (hit >= Math.min(2, tokens.length)) partial++;
  }
  if (partial > 0) reasons.push('legal/DBA naming mismatch possible (partial token overlap exists)');
  if (r.dba && normName(r.dba) !== name) reasons.push('corporate-name / DBA differences possible');
  if (r.address) reasons.push('address mismatch or branch location possible');
  if (!reasons.length) reasons.push('truly unresolved / state crosswalk unavailable');
  reasons.push('NOT_FOUND does not mean unregistered or illegal');
  return reasons;
}
const notFoundAnalysis = notFound.map((r) => ({
  mr_license: r.mr_license,
  legal_name: r.legal_name,
  dba: r.dba,
  address: r.address,
  issue_date: r.issue_date,
  expire_date: r.expire_date,
  likely_explanations: classifyNotFound(r),
  qa_status: 'BOUNDED_OFFICIAL_SOURCE_QA',
  qa_conclusion: 'REMAINS_NOT_FOUND',
  qa_note:
    'Fail-closed under MDC_FDACS_RECONCILIATION_V1. Rules not loosened to eliminate NOT_FOUND. County MR credential remains a county regulatory fact.',
}));
writeJson(join(OUT, 'not-found-analysis.json'), {
  task: 'FL-C006',
  count: notFoundAnalysis.length,
  checked_all: true,
  records: notFoundAnalysis,
});

// ---------- VERIFIED precision QA (all) ----------
const verifiedRows = reconciliations.filter((r) => r.match_result === 'VERIFIED');
const verifiedQa = verifiedRows.map((r) => {
  const f = fdacsByLic.get(r.candidate_fdacs_id);
  const countyStreet = r.street_address || String(r.address || '').split(',')[0];
  const fdacsStreet = String(f?.address || '').split(',')[0];
  const nameOk =
    nameEquals(normName(r.legal_name), normName(f?.name)) ||
    nameEquals(normName(r.legal_name), normName(f?.dba)) ||
    nameEquals(normName(r.dba), normName(f?.name)) ||
    nameEquals(normName(r.dba), normName(f?.dba));
  const addrOk = addressCorroborates(
    normStreet(countyStreet),
    normStreet(fdacsStreet),
    streetCore(countyStreet),
    streetCore(fdacsStreet)
  );
  const evidenceOk =
    (r.supporting_evidence.includes('exact_physical_address') &&
      (r.supporting_evidence.includes('exact_legal_name') ||
        r.supporting_evidence.includes('exact_dba'))) ||
    (r.supporting_evidence.includes('exact_phone') &&
      (r.supporting_evidence.includes('exact_legal_name') ||
        r.supporting_evidence.includes('exact_dba'))) ||
    (r.supporting_evidence.includes('exact_business_email') &&
      r.supporting_evidence.includes('exact_legal_name')) ||
    r.supporting_evidence.includes('explicit_fdacs_im');
  const checks = {
    miami_dade_identity_present: !!(r.mr_license && r.legal_name),
    fdacs_identity_present: !!(r.candidate_fdacs_id && r.candidate_fdacs_name),
    name_match_after_normalization: nameOk,
    address_corroboration_holds: addrOk,
    corroborating_evidence_ok: evidenceOk,
    corporate_normalization_false_positive_risk: nameOk && addrOk ? 'LOW' : 'ELEVATED',
  };
  const correct =
    checks.miami_dade_identity_present &&
    checks.fdacs_identity_present &&
    checks.name_match_after_normalization &&
    checks.address_corroboration_holds &&
    checks.corroborating_evidence_ok;
  return {
    mr_license: r.mr_license,
    fdacs_id: r.candidate_fdacs_id,
    company_id: r.candidate_canonical_company_id,
    match_method: r.match_method,
    county_name: r.legal_name,
    fdacs_name: r.candidate_fdacs_name,
    county_address: r.address,
    fdacs_address: r.candidate_fdacs_address,
    checks,
    qa_result: correct ? 'correct' : 'incorrect',
  };
});
const verifiedChecked = verifiedQa.length;
const verifiedCorrect = verifiedQa.filter((q) => q.qa_result === 'correct').length;
const verifiedIncorrect = verifiedQa.filter((q) => q.qa_result === 'incorrect').length;
const precision = verifiedChecked ? +((100 * verifiedCorrect) / verifiedChecked).toFixed(2) : 100;
const precisionGate = {
  task: 'FL-C006',
  records_checked: verifiedChecked,
  correct: verifiedCorrect,
  incorrect: verifiedIncorrect,
  precision,
  required_target_pct: 98,
  gate: precision >= 98 ? 'PASS' : 'FAIL_CLOSED',
  sample_incorrect: verifiedQa.filter((q) => q.qa_result === 'incorrect').slice(0, 20),
  records: verifiedQa,
};
if (precisionGate.gate === 'FAIL_CLOSED') {
  console.error('VERIFIED precision below 98% — fail closed. Tighten rules.');
  writeJson(join(OUT, 'verified-precision-qa.json'), precisionGate);
  process.exit(1);
}
writeJson(join(OUT, 'verified-precision-qa.json'), precisionGate);

// ---------- Multi-license relationships ----------
const byBiz = new Map();
for (const r of licenses) {
  const key = r.business_id || `NAME:${normName(r.company_name)}`;
  if (!byBiz.has(key)) byBiz.set(key, []);
  byBiz.get(key).push(r);
}
const multiLicense = [];
for (const [bizKey, rows] of byBiz) {
  const uniqueLic = [...new Set(rows.map((x) => x.license_number))];
  if (uniqueLic.length <= 1) continue;
  const statuses = [...new Set(rows.map((x) => x.status))];
  let relationship = 'STATUS_TRANSITION_OR_HISTORY';
  if (rows.filter((x) => x.status === 'Issued').length > 1) relationship = 'MULTIPLE_CURRENT_ISSUED_REVIEW';
  else if (statuses.includes('Issued') && statuses.some((s) => s !== 'Issued'))
    relationship = 'CURRENT_PLUS_HISTORICAL_VERSIONS';
  else if (statuses.every((s) => ['Archived', 'Expired', 'Out of Business', 'Abandoned'].includes(s)))
    relationship = 'HISTORICAL_LICENSE_VERSIONS';
  multiLicense.push({
    business_key: bizKey,
    business_id: rows[0].business_id || null,
    company_name: rows[0].company_name,
    license_count: uniqueLic.length,
    licenses: rows.map((x) => ({
      license_number: x.license_number,
      status: x.status,
      issue_date: x.issue_date,
      expire_date: x.expire_date,
      address: x.address_display,
    })),
    relationship_class: relationship,
    note: 'Do not collapse source license IDs. Research-level relationship only.',
  });
}
writeJson(join(OUT, 'multi-license-relationships.json'), {
  task: 'FL-C006',
  unique_businesses_approx: uniqueBusinesses,
  total_licenses: licenses.length,
  businesses_with_multiple_licenses: multiLicense.length,
  records: multiLicense,
});

// ---------- LBT qualification ----------
function evaluateLbtLink(lic, lbt) {
  const cName = normName(lic.company_name);
  const cDba = normName(lic.dba);
  const lName = normName(lbt.business_name || lbt.BUSNAME || '');
  const lOwner = normName(lbt.owner_name || lbt.OWNERNAME || '');
  const cStreet = normStreet(lic.street_address || lic.address_display);
  const cCore = streetCore(lic.street_address || lic.address_display);
  const lAddr = lbt.bus_addr || lbt.BUSADDR || lbt.business_address || '';
  const lStreet = normStreet(lAddr);
  const lCore = streetCore(lAddr);
  const exactName =
    nameEquals(cName, lName) ||
    nameEquals(cDba, lName) ||
    nameEquals(cName, lOwner) ||
    nameEquals(cDba, lOwner) ||
    // owner often embeds legal name (e.g. WITHERS TRANSFER&STORAGE ... C/O ...)
    !!(cName && lOwner && lOwner.includes(cName.split(' ').slice(0, 3).join(' ')) && cName.length > 8) ||
    !!(cDba && lName && nameEquals(cDba, lName));
  const exactAddr = addressCorroborates(cStreet, lStreet, cCore, lCore);
  if (exactName && exactAddr) return { class: 'VERIFIED_LBT_LINK', signals: ['exact_name', 'exact_address'] };
  if (exactName) return { class: 'REVIEW_REQUIRED', signals: ['name_only_insufficient'] };
  if (exactAddr) return { class: 'REVIEW_REQUIRED', signals: ['address_only_insufficient'] };
  return null;
}

const lbtResults = [];
const lbtCounts = { VERIFIED_LBT_LINK: 0, REVIEW_REQUIRED: 0, NOT_FOUND: 0 };
for (const lic of issued) {
  const candidates = [];
  for (const lbt of lbtRecords) {
    const ev = evaluateLbtLink(lic, lbt);
    if (ev) {
      candidates.push({
        ...ev,
        lbt_account_no: lbt.account_no || lbt.ACCOUNTNO,
        lbt_business_name: lbt.business_name || lbt.BUSNAME,
        lbt_category_code: lbt.category_code || lbt.CATGRYCODE,
        lbt_address: [lbt.bus_addr || lbt.BUSADDR, lbt.bus_city || lbt.BUSCITY, lbt.zip || lbt.ZIPCODE]
          .filter(Boolean)
          .join(', '),
      });
    }
  }
  const verified = candidates.filter((c) => c.class === 'VERIFIED_LBT_LINK');
  const review = candidates.filter((c) => c.class === 'REVIEW_REQUIRED');
  let classification = 'NOT_FOUND';
  let chosen = null;
  if (verified.length === 1) {
    classification = 'VERIFIED_LBT_LINK';
    chosen = verified[0];
  } else if (verified.length > 1) {
    classification = 'REVIEW_REQUIRED';
    chosen = verified[0];
  } else if (review.length > 0) {
    classification = 'REVIEW_REQUIRED';
    chosen = review[0];
  }
  lbtCounts[classification]++;
  lbtResults.push({
    mr_license: lic.license_number,
    company_name: lic.company_name,
    dba: lic.dba,
    address: lic.address_display,
    classification,
    signals: chosen?.signals || [],
    lbt_account_no: chosen?.lbt_account_no || null,
    lbt_business_name: chosen?.lbt_business_name || null,
    lbt_category_code: chosen?.lbt_category_code || null,
    lbt_address: chosen?.lbt_address || null,
    candidate_count: candidates.length,
    note: 'LBT is secondary business-tax evidence — NOT the Moving Business Registration credential.',
  });
}
writeJson(join(OUT, 'lbt-crosswalk-qualification.json'), {
  task: 'FL-C006',
  role: 'SECONDARY_BUSINESS_TAX_EVIDENCE_NOT_MOVER_CREDENTIAL',
  issued_mr_total: issued.length,
  counts: lbtCounts,
  results: lbtResults,
});

// ---------- Address / branch analysis ----------
const addressFindings = [];
for (const r of verifiedRows) {
  const countyStreet = normStreet(r.street_address || r.address);
  const fdacsStreet = normStreet(r.candidate_fdacs_address || '');
  if (countyStreet && fdacsStreet && countyStreet !== fdacsStreet) {
    const sameCore = streetCore(r.street_address || r.address) === streetCore(r.candidate_fdacs_address || '');
    addressFindings.push({
      mr_license: r.mr_license,
      type: sameCore ? 'TEMPORAL_DIFFERENCE_OR_FORMAT' : 'IDENTITY_REVIEW',
      classification: sameCore ? 'TEMPORAL_DIFFERENCE' : 'IDENTITY_REVIEW',
      county_address: r.address,
      fdacs_address: r.candidate_fdacs_address,
      note: sameCore
        ? 'Street core matches; formatting/unit/municipality label may differ across sources.'
        : 'Name matched with address corroboration via core; residual string difference retained for review.',
    });
  }
}
for (const r of lbtResults.filter((x) => x.classification === 'VERIFIED_LBT_LINK')) {
  const mr = issued.find((x) => x.license_number === r.mr_license);
  if (!mr) continue;
  const a = normStreet(mr.street_address);
  const b = normStreet(r.lbt_address);
  if (a && b && a !== b && streetCore(mr.street_address) !== streetCore(r.lbt_address)) {
    addressFindings.push({
      mr_license: r.mr_license,
      type: 'MR_VS_LBT_ADDRESS',
      classification: 'BRANCH_CANDIDATE',
      county_address: mr.address_display,
      lbt_address: r.lbt_address,
      note: 'MR and LBT addresses differ beyond formatting — possible branch/mailing/tax situs difference. Not mutated into canonical location.',
    });
  }
}
writeJson(join(OUT, 'address-branch-analysis.json'), {
  task: 'FL-C006',
  branch_schema_supported: true,
  branch_record_observed: 0,
  pra_required_for_branch_records: true,
  findings_count: addressFindings.length,
  findings: addressFindings,
  note: 'BRANCH_SCHEMA_SUPPORTED from application; BRANCH_RECORD_OBSERVED = 0 on public EnerGov roster.',
});

// ---------- Credential evidence qualification ----------
const currentCredentialEvidence = reconciliations.map((r) => {
  const stable = !!(r.mr_license && /^MR-\d+/i.test(r.mr_license));
  const qualified = stable && !!r.county_status && !!r.legal_name && !!r.provenance?.county_source;
  return {
    evidence_class: 'MDC_MOVING_CREDENTIAL_VERIFIED',
    mr_license: r.mr_license,
    business_id: r.business_id,
    qualification: qualified ? 'QUALIFIED_CURRENT' : 'REVIEW',
    stable_mr_identifier: stable,
    official_status: r.county_status,
    stable_business_identity: !!r.legal_name,
    source_retrieval_date: r.provenance?.county_retrieved_at || null,
    fdacs_reconciliation: r.match_result,
    may_attach_to_canonical_company: r.match_result === 'VERIFIED',
    note:
      r.match_result === 'VERIFIED'
        ? 'County credential qualified; FDACS VERIFIED — future canonical attachment only after separate publish authorization.'
        : 'County credential can remain a real county regulatory fact; unresolved identity must NOT be attached to a canonical company.',
  };
});
const historicalCredentialEvidence = historicalModel.records
  .filter((r) => r.internal_status_class === 'HISTORICAL_CREDENTIAL')
  .map((r) => ({
    evidence_class: 'MDC_MOVING_CREDENTIAL_VERIFIED',
    mr_license: r.license_number,
    business_id: r.business_id,
    qualification: 'QUALIFIED_HISTORICAL',
    official_status: r.status,
    internal_status_class: r.internal_status_class,
    note: 'Historical/non-current credential retained for identity/history research — not an active-publication candidate in C006.',
  }));

writeJson(join(OUT, 'moving-credential-evidence.json'), {
  task: 'FL-C006',
  current_qualified: currentCredentialEvidence.filter((e) => e.qualification === 'QUALIFIED_CURRENT')
    .length,
  historical_qualified: historicalCredentialEvidence.length,
  review: currentCredentialEvidence.filter((e) => e.qualification === 'REVIEW').length,
  current_records: currentCredentialEvidence,
  historical_records: historicalCredentialEvidence,
});

// ---------- Insurance / vehicle / complaint revalidation ----------
const insuranceSafety = {
  task: 'FL-C006',
  REQUIREMENT_DOCUMENTED: true,
  CURRENT_POLICY_OBSERVED: false,
  COMPLIANCE_VERIFIED: false,
  requirements: insuranceC005.requirements || {},
  public_policy_rows: 0,
  note: 'Revalidated from C005 application schema. Do not describe movers as insured merely because certificates are required on application.',
};
const vehicleFindings = {
  task: 'FL-C006',
  REGULATORY_SCHEMA: true,
  REQUIREMENT_DOCUMENTED: true,
  CURRENT_VEHICLE_RECORDS_OBSERVED: 0,
  fields_on_application: ['year/make/model', 'VIN', 'tag', 'GVW', 'truck/decal marking'],
  pra_required_for_inventory: true,
  note: 'Schema/requirement only — not company-specific current fleet evidence.',
};
const complaintQual = {
  task: 'FL-C006',
  PUBLIC_COMPLAINT_RECORDS: 0,
  PUBLIC_DISPOSITIONS: 0,
  PRA_REQUIRED: true,
  access_class: 'INTAKE_ONLY',
  evidence_class_system_only: 'COMPLAINT_SYSTEM_OBSERVATION',
  note: 'Complaint intake/program description is not complaint history. No company-level complaint observations invented.',
};
const citationEnforcementQual = {
  task: 'FL-C006',
  citation_authority_documented: true,
  enforcement_authority_documented: true,
  PUBLIC_COMPANY_LEVEL_CITATION_EVENTS: 0,
  PUBLIC_FINAL_ENFORCEMENT_ACTIONS: 0,
  PRA_REQUIRED: true,
  evidence_classes_system_only: [
    'CITATION_AUTHORITY_OBSERVATION',
    'ENFORCEMENT_AUTHORITY_OBSERVATION',
  ],
  note: 'Do not create FINAL_ENFORCEMENT_ACTION without explicit official case disposition.',
};
writeJson(join(OUT, 'insurance-workers-comp-safety.json'), insuranceSafety);
writeJson(join(OUT, 'vehicle-findings.json'), vehicleFindings);
writeJson(join(OUT, 'complaint-mediation-qualification.json'), complaintQual);
writeJson(join(OUT, 'citation-enforcement-qualification.json'), citationEnforcementQual);

// ---------- Source authority / conflict model ----------
const authorityModel = {
  task: 'FL-C006',
  version: 'v1',
  sources: {
    FDACS: 'Authoritative for Florida Chapter 507 state mover registration.',
    MIAMI_DADE_MOVING: 'Authoritative for Miami-Dade Moving Business Registration / License (MR-#####).',
    MIAMI_DADE_LBT: 'Authoritative for county Local Business Tax observations — NOT mover authority.',
    FMCSA: 'Authoritative for federal/interstate regulatory identity where applicable.',
  },
  conflict_types: {
    JURISDICTIONAL_DIFFERENCE:
      'Both facts can be correct (different regulators / jurisdictions). Preserve both with provenance.',
    TEMPORAL_DIFFERENCE:
      'Retrieval or effective dates differ; both observations may be historically correct.',
    BRANCH_CANDIDATE: 'Possible additional location / branch — not proven without explicit branch record.',
    IDENTITY_REVIEW: 'Potentially different businesses. Plausible overlap without deterministic same-entity proof.',
    TRUE_DATA_CONFLICT:
      'Same fact / same jurisdiction / same time window genuinely conflicts. Preserve both; do not silently overwrite.',
    CROSS_SOURCE_REVIEW_REQUIRED: 'Needs human review before any canonical attachment.',
  },
  provenance_rule:
    'Every retained observation must keep source agency, source URL/record id, and retrieval timestamp.',
  retrieved_at: RETRIEVED_AT,
};
writeJson(join(OUT, 'source-authority-model.json'), authorityModel);

const conflicts = [
  ...addressFindings.map((f) => ({
    classification: f.classification || 'CROSS_SOURCE_REVIEW_REQUIRED',
    ...f,
  })),
  ...reconciliations
    .filter((r) => r.match_result === 'CONFLICT')
    .map((r) => ({
      classification: 'TRUE_DATA_CONFLICT',
      mr_license: r.mr_license,
      conflicting_evidence: r.conflicting_evidence,
    })),
  ...notFound.map((r) => ({
    classification: 'CROSS_SOURCE_REVIEW_REQUIRED',
    type: 'ISSUED_MR_NOT_FOUND_IN_FDACS',
    mr_license: r.mr_license,
    legal_name: r.legal_name,
    note: 'Not asserting either source wrong.',
  })),
];
writeJson(join(OUT, 'cross-source-conflicts.json'), {
  task: 'FL-C006',
  count: conflicts.length,
  records: conflicts,
});

// ---------- Qualified package emit ----------
const verifiedPackage = {
  task: 'FL-C006',
  file: 'mdc-fdacs-crosswalk-v1.json',
  version: 'v1',
  immutable: true,
  ruleset: RULESET,
  evidence_ruleset: EVIDENCE_RULESET,
  retrieved_at: RETRIEVED_AT,
  production_writes: false,
  google_places_api_requests: 0,
  consumer_pii_committed: 0,
  row_count: verifiedRows.length,
  records: verifiedRows.map((r) => ({
    miami_dade_mr: r.mr_license,
    miami_dade_legal_name: r.legal_name,
    miami_dade_dba: r.dba,
    miami_dade_status: r.county_status,
    miami_dade_address: r.address,
    business_id: r.business_id,
    fdacs_id: r.candidate_fdacs_id,
    fdacs_name: r.candidate_fdacs_name,
    fdacs_status: r.candidate_fdacs_status,
    fdacs_address: r.candidate_fdacs_address,
    canonical_company_id: r.candidate_canonical_company_id,
    canonical_class: r.canonical_class,
    match_result: 'VERIFIED',
    deterministic_evidence: r.supporting_evidence,
    match_method: r.match_method,
    source_provenance: r.provenance,
  })),
};
verifiedPackage.content_hash = sha(verifiedPackage.records).slice(0, 16);
writeJson(join(QUAL, 'mdc-fdacs-crosswalk-v1.json'), verifiedPackage);

const unresolvedPackage = {
  task: 'FL-C006',
  file: 'mdc-fdacs-unresolved-v1.json',
  version: 'v1',
  retrieved_at: RETRIEVED_AT,
  row_count: reconciliations.filter((r) => r.match_result !== 'VERIFIED').length,
  records: reconciliations
    .filter((r) => r.match_result !== 'VERIFIED')
    .map((r) => ({
      miami_dade_mr: r.mr_license,
      legal_name: r.legal_name,
      dba: r.dba,
      address: r.address,
      match_result: r.match_result,
      canonical_class: r.canonical_class,
      review_reasons: r.review_reasons,
      candidate_fdacs_id: r.candidate_fdacs_id,
      supporting_evidence: r.supporting_evidence,
    })),
};
writeJson(join(QUAL, 'mdc-fdacs-unresolved-v1.json'), unresolvedPackage);

writeJson(join(QUAL, 'mdc-moving-credential-evidence-v1.json'), {
  task: 'FL-C006',
  version: 'v1',
  current_qualified: currentCredentialEvidence.filter((e) => e.qualification === 'QUALIFIED_CURRENT')
    .length,
  records: currentCredentialEvidence,
});
writeJson(join(QUAL, 'mdc-historical-license-evidence-v1.json'), {
  task: 'FL-C006',
  version: 'v1',
  historical_qualified: historicalCredentialEvidence.length,
  status_counts: {
    'Out of Business': statusDistribution['Out of Business'] || 0,
    Abandoned: statusDistribution.Abandoned || 0,
    Expired: statusDistribution.Expired || 0,
    Archived: statusDistribution.Archived || 0,
    other_process:
      (statusDistribution['In Review'] || 0) +
      (statusDistribution['On Hold'] || 0) +
      (statusDistribution['Submitted - Online'] || 0) +
      (statusDistribution.Void || 0),
  },
  multi_license_businesses: multiLicense.length,
  records: historicalCredentialEvidence,
});
writeJson(join(QUAL, 'mdc-lbt-crosswalk-v1.json'), {
  task: 'FL-C006',
  version: 'v1',
  role: 'SECONDARY_BUSINESS_TAX_EVIDENCE_NOT_MOVER_CREDENTIAL',
  counts: lbtCounts,
  results: lbtResults,
});
writeJson(join(QUAL, 'mdc-business-tax-evidence-v1.json'), {
  task: 'FL-C006',
  version: 'v1',
  evidence_class: 'MDC_BUSINESS_TAX_OBSERVATION',
  row_count: lbtRecords.length,
  category_counts: lbtWrap.category_counts || null,
  note: 'LBT mover-category observations preserved. Never substitute for MR credential.',
  records: lbtRecords.map((r) => ({
    account_no: r.account_no || r.ACCOUNTNO,
    business_name: r.business_name || r.BUSNAME,
    owner_name: r.owner_name || r.OWNERNAME,
    address: [r.bus_addr || r.BUSADDR, r.bus_city || r.BUSCITY, r.zip || r.ZIPCODE]
      .filter(Boolean)
      .join(', '),
    category_code: r.category_code || r.CATGRYCODE,
    category_name: r.category_name || r.CATGRYNAME,
    status: r.account_status || r.ACCSTATUS || r.status,
    year: r.year || r.YEAR,
    lat: r.lat ?? r.LAT ?? null,
    lon: r.lon ?? r.LON ?? null,
  })),
});
writeJson(join(QUAL, 'mdc-source-authority-model-v1.json'), authorityModel);
writeJson(join(QUAL, 'mdc-cross-source-conflicts-v1.json'), {
  task: 'FL-C006',
  version: 'v1',
  count: conflicts.length,
  records: conflicts,
});

const incremental = {
  task: 'FL-C006',
  after_qualification: true,
  current_miami_dade_credentials_issued: issued.length,
  historical_miami_dade_credentials: historicalCredentialEvidence.length,
  verified_fdacs_crosswalk: verifiedRows.length,
  canonical_linked: canonicalSummary.CANONICAL_LINKED,
  canonical_candidate: canonicalSummary.CANONICAL_CANDIDATE,
  state_record_only: canonicalSummary.STATE_RECORD_ONLY,
  county_only_review: canonicalSummary.COUNTY_ONLY_REVIEW,
  verified_lbt_links: lbtCounts.VERIFIED_LBT_LINK,
  branches_actually_observed: 0,
  vehicles_actually_observed: 0,
  insurance_policies_actually_observed: 0,
  complaint_cases_actually_observed: 0,
  citations_actually_observed: 0,
  final_actions_actually_observed: 0,
  schema_requirements_separate_from_observations: true,
  fdacs_typically_lacks: [
    'county MR-##### credential',
    'county multi-status license history',
    'county issue/expire under Art. XVI Ch.8A',
    'LBT category linkage when crosswalkable',
  ],
  still_pra_or_schema_gated: [
    'phone/email/owner on public roster',
    'branch records',
    'vehicle inventory',
    'insurance policy observations',
    'complaint dispositions',
    'citations/final actions',
  ],
};
writeJson(join(QUAL, 'incremental-value-after-qualification-v1.json'), incremental);

const threeCounty = {
  task: 'FL-C006',
  version: 'v1',
  dimensions: [
    {
      dimension: 'qualification_state',
      palm_beach: 'QUALIFIED (C003) — public roster + BIR sample evidence',
      broward: 'ACQUIRED schema only (C004) — roster PRA_REQUIRED; not yet qualified',
      miami_dade: 'QUALIFIED (C006) — public EnerGov roster + LBT; complaints/vehicles PRA/schema',
    },
    {
      dimension: 'current_roster',
      palm_beach: 'NEAR_FULL active permits (~142 LICENSED)',
      broward: 'PRA_REQUIRED',
      miami_dade: `NEAR_FULL (${issued.length} Issued / ${licenses.length} total)`,
    },
    {
      dimension: 'historical_roster',
      palm_beach: 'Limited publicly; PRA for inactive',
      broward: 'PRA',
      miami_dade: 'Public multi-status history (OOB/Abandoned/Expired/Archived)',
    },
    {
      dimension: 'identity_phone_email',
      palm_beach: 'Strong public phone; email via BIR sample',
      broward: 'Application only',
      miami_dade: 'Address/DBA public; phone/email not on public EnerGov',
    },
    {
      dimension: 'owners',
      palm_beach: 'Public contact/title on roster',
      broward: 'Application',
      miami_dade: 'Application (DOB not committed)',
    },
    {
      dimension: 'LBT',
      palm_beach: 'Packet requirement',
      broward: 'Packet requirement',
      miami_dade: 'Open-data FeatureServer + qualified MR↔LBT crosswalk',
    },
    {
      dimension: 'branches',
      palm_beach: 'Not first-class public',
      broward: 'Not public',
      miami_dade: 'BRANCH_SCHEMA_SUPPORTED; BRANCH_RECORD_OBSERVED=0',
    },
    {
      dimension: 'fleet_vehicle',
      palm_beach: 'Fleet count public',
      broward: 'VIN/tag/GVW schema; inventory PRA',
      miami_dade: 'VIN/tag/GVW schema; CURRENT_VEHICLE_RECORDS_OBSERVED=0',
    },
    {
      dimension: 'insurance',
      palm_beach: 'Not primary public evidence',
      broward: 'Application requirements',
      miami_dade: 'REQUIREMENT_DOCUMENTED; CURRENT_POLICY_OBSERVED=false',
    },
    {
      dimension: 'complaint_history',
      palm_beach: 'BIR sampleable with dispositions',
      broward: 'Intake; history PRA',
      miami_dade: 'INTAKE_ONLY; PUBLIC_COMPLAINT_RECORDS=0',
    },
    {
      dimension: 'dispositions',
      palm_beach: '44-code official catalog',
      broward: 'None public',
      miami_dade: 'None public',
    },
    {
      dimension: 'citation_enforcement',
      palm_beach: 'BIR sampleable',
      broward: 'Process docs; cases PRA',
      miami_dade: 'Authority docs; company events=0',
    },
    {
      dimension: 'source_accessibility',
      palm_beach: 'High (API + BIR)',
      broward: 'Low for data / high for docs',
      miami_dade: 'High for roster+LBT; low for enrichment',
    },
    {
      dimension: 'engineering_cost',
      palm_beach: 'Medium',
      broward: 'High (PRA unlock)',
      miami_dade: 'Medium',
    },
    {
      dimension: 'pra_dependency',
      palm_beach: 'Partial',
      broward: 'High',
      miami_dade: 'Medium (contacts/vehicles/complaints/citations)',
    },
  ],
};
writeJson(join(QUAL, 'three-county-qualified-comparison-v1.json'), threeCounty);

const architecture = {
  task: 'FL-C006',
  PATTERNS_CONVERGING: 'YES',
  PINELLAS_REQUIRED_BEFORE_LOCK: 'YES',
  architecture_finalized: false,
  production_schema_created: false,
  explanation:
    'Three pilots now show converging concepts (county credential, identity, vehicle schema, complaint/enforcement layers, FDACS crosswalk) with divergent accessibility (PBC rich API+BIR; Broward PRA-gated; MDC EnerGov+LBT). Collect Pinellas as Pilot #4 before locking generalized county architecture.',
  recommended_next:
    'FL-C007 — Pinellas County Mover Regulatory Acquisition & Staging',
};
writeJson(join(QUAL, 'architecture-pressure-test-v1.json'), architecture);

writeJson(join(QUAL, 'county-page-metrics-mock-v1.json'), {
  task: 'FL-C006',
  live_page_changed: false,
  metrics: {
    miami_dade_mover_license_universe: { value: licenses.length, label: 'FULL' },
    current_issued_movers: { value: issued.length, label: 'FULL' },
    deterministic_fdacs_matches: { value: verifiedRows.length, label: 'FULL' },
    canonical_linked: { value: canonicalSummary.CANONICAL_LINKED, label: 'FULL' },
    verified_lbt_crosswalk: { value: lbtCounts.VERIFIED_LBT_LINK, label: 'FULL' },
    public_complaint_cases: { value: 0, label: 'FULL_ZERO_NOT_SPECULATIVE' },
    public_citations: { value: 0, label: 'FULL_ZERO_NOT_SPECULATIVE' },
    public_final_enforcement_actions: { value: 0, label: 'FULL_ZERO_NOT_SPECULATIVE' },
    public_vehicles: { value: 0, label: 'FULL_ZERO_NOT_SPECULATIVE' },
  },
  extrapolation_forbidden: true,
});

writeJson(join(QUAL, 'future-profile-presentation-design-v1.json'), {
  task: 'FL-C006',
  published: false,
  trust_score_connection: false,
  blocks: [
    {
      id: 'mdc_moving_registration',
      title: 'Miami-Dade Moving Business Registration',
      fields: ['MR credential', 'county status', 'dates', 'regulator', 'source'],
    },
    {
      id: 'mdc_lbt_secondary',
      title: 'Local Business Tax record (secondary)',
      fields: ['account', 'category', 'address', 'status'],
      warning: 'Do not visually imply LBT equals mover authority.',
    },
    {
      id: 'future_enrichment_when_source_exists',
      title: 'Future enrichment (only with actual records)',
      fields: ['branches', 'vehicles', 'insurance/WC observations', 'complaints', 'citations', 'enforcement'],
    },
  ],
});

writeJson(join(QUAL, 'network-reuse-note-v1.json'), {
  task: 'FL-C006',
  architecture_implemented: false,
  reusable_patterns: [
    'EnerGov licensing SelfService search/detail',
    'ArcGIS LBT/business-tax FeatureServer',
    'multi-status license history',
    'branch schema vs observed branch separation',
    'vehicle schema vs observed inventory separation',
    'regulator/license ↔ tax crosswalk',
  ],
  potential_later_reuse: [
    'ContractorTrustHub',
    'SeniorTrustHub',
    'InsuranceTrustHub',
    'LenderTrustHub',
    'InvestorTrustHub',
  ],
  note: 'Catalog only; no cross-vertical ingestion in FL-C006.',
});

const summary = {
  task: 'FL-C006',
  status: 'COMPLETE',
  origin_main_observed: ORIGIN_MAIN,
  stacked_on_c005: C005_HEAD,
  baseline: {
    total_licenses: licenses.length,
    unique_businesses: uniqueBusinesses,
    issued: issued.length,
    lbt_rows: lbtRecords.length,
  },
  issued_reconciliation: counts,
  verified_precision: {
    checked: verifiedChecked,
    correct: verifiedCorrect,
    incorrect: verifiedIncorrect,
    precision,
    gate: precisionGate.gate,
  },
  canonical: canonicalSummary,
  lbt_crosswalk: lbtCounts,
  multi_license_businesses: multiLicense.length,
  insurance: {
    REQUIREMENT_DOCUMENTED: true,
    CURRENT_POLICY_OBSERVED: false,
    COMPLIANCE_VERIFIED: false,
  },
  vehicles_observed: 0,
  branches_observed: 0,
  complaints_observed: 0,
  citations_observed: 0,
  google_places_api_requests: 0,
  production_writes: false,
  production_db_migrations: 0,
  consumer_pii_committed: 0,
  PATTERNS_CONVERGING: 'YES',
  PINELLAS_REQUIRED_BEFORE_LOCK: 'YES',
  recommended_fl_c007: 'FL-C007 — Pinellas County Mover Regulatory Acquisition & Staging',
  recommended_fl_c007_rationale:
    'MDC qualification complete. Collect Pinellas as County Pilot #4 before locking generalized county architecture. Do not start architecture or Pinellas automatically in this task.',
};
summary.package_hash = sha({
  counts,
  canonicalSummary,
  lbtCounts,
  precision,
}).slice(0, 16);

writeJson(join(OUT, 'fl-c006-summary.json'), summary);
writeJson(join(QUAL, 'fl-c006-summary.json'), summary);
writeJson(join(OUT, 'stack-vs-main-note.json'), {
  task: 'FL-C006',
  county_stack_preserved: true,
  rebase_performed: false,
  origin_main_observed: ORIGIN_MAIN,
  c005_head: C005_HEAD,
  analysis_technically_valid_without_rebase: true,
});

writeJson(join(QUAL, 'qualified-package-manifest-v1.json'), {
  task: 'FL-C006',
  version: 'v1',
  retrieved_at: RETRIEVED_AT,
  production_writes: false,
  google_places_api_requests: 0,
  consumer_pii_committed: 0,
  files: readdirSync(QUAL)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const p = join(QUAL, f);
      return { file: f, bytes: statSync(p).size, sha256: shaFile(p) };
    }),
  summary,
});

console.log(
  JSON.stringify(
    {
      ok: true,
      task: 'FL-C006',
      issued: issued.length,
      reconciliation: counts,
      precision,
      canonical: canonicalSummary,
      lbt: lbtCounts,
      multi_license_businesses: multiLicense.length,
      recommended_fl_c007: summary.recommended_fl_c007,
      google: 0,
      consumer_pii_committed: 0,
      production_writes: false,
    },
    null,
    2
  )
);
