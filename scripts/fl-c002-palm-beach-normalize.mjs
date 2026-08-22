/**
 * FL-C002 — Palm Beach County mover regulatory staging (research only).
 * Reads raw official JSON under data/county-regulatory/fl/palm-beach/raw/
 * Writes normalized staging + matchability + coverage metrics.
 * No production DB writes. No Google APIs.
 */
import { createHash } from 'crypto';
import {
  createReadStream,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'fs';
import { basename, join, resolve } from 'path';

const ROOT = resolve('.');
const RAW = resolve('data/county-regulatory/fl/palm-beach/raw');
const NORM = resolve('data/county-regulatory/fl/palm-beach/normalized');
const META = resolve('data/county-regulatory/fl/palm-beach/meta');
const RETRIEVED_AT = new Date().toISOString();
const COUNTY = 'Palm Beach';
const AGENCY = 'Palm Beach County Public Safety — Consumer Affairs Division';
const SOURCE_URL_MOVING =
  'https://discover.pbc.gov/publicsafety/consumeraffairs/Pages/Moving_App.aspx';
const SOURCE_URL_API = 'https://secure.pbc.gov/ConsumerAffairs/api';
const SOURCE_URL_BIR =
  'https://discover.pbc.gov/publicsafety/consumeraffairs/Pages/Lookup.aspx';

mkdirSync(NORM, { recursive: true });
mkdirSync(META, { recursive: true });

function sha256File(path) {
  const h = createHash('sha256');
  h.update(readFileSync(path));
  return h.digest('hex');
}

function readJson(path) {
  const text = readFileSync(path, 'utf8').replace(/^\uFEFF/, '');
  return JSON.parse(text);
}

function normPhone(p) {
  if (!p) return null;
  const d = String(p).replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('1')) return d.slice(1);
  if (d.length === 10) return d;
  return d || null;
}

function normName(s) {
  if (!s) return '';
  return String(s)
    .toUpperCase()
    .replace(/&/g, ' AND ')
    .replace(/[^A-Z0-9 ]+/g, ' ')
    .replace(/\b(LLC|INC|INCORPORATED|CO|COMPANY|CORP|CORPORATION|LTD|LP|LLP)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normStreet(s) {
  if (!s) return '';
  return String(s)
    .toUpperCase()
    .replace(/[^A-Z0-9 ]+/g, ' ')
    .replace(/\b(STREET|ST|AVENUE|AVE|ROAD|RD|DRIVE|DR|BOULEVARD|BLVD|LANE|LN|COURT|CT|WAY|SUITE|STE|UNIT|#)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseFleet(v) {
  if (v == null) return null;
  const m = String(v).match(/Total:(\d+)/i);
  return m ? Number(m[1]) : null;
}

function asArray(x) {
  if (x == null) return [];
  if (Array.isArray(x)) return x;
  if (Array.isArray(x.value)) return x.value;
  return [x];
}

function stripBom(s) {
  return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
}

// --- Provenance for raw files ---
const provenance = {
  task: 'FL-C002',
  county: COUNTY,
  agency: AGENCY,
  retrieved_at: RETRIEVED_AT,
  google_places_api_requests: 0,
  production_writes: false,
  consumer_pii_committed: 0,
  access_method: 'OFFICIAL_PUBLIC_API_BOUNDED_SEARCH',
  files: [],
};

for (const name of readdirSync(RAW)) {
  const path = join(RAW, name);
  if (!statSync(path).isFile()) continue;
  const st = statSync(path);
  provenance.files.push({
    original_filename: name,
    relative_path: `data/county-regulatory/fl/palm-beach/raw/${name}`,
    source_agency: AGENCY,
    source_url:
      name.startsWith('bir-') || name.includes('BIR')
        ? SOURCE_URL_BIR
        : name.startsWith('api-') || name.startsWith('js-') || name.startsWith('page-')
          ? SOURCE_URL_API
          : SOURCE_URL_MOVING,
    retrieval_timestamp: RETRIEVED_AT,
    content_type: name.endsWith('.pdf')
      ? 'application/pdf'
      : name.endsWith('.json')
        ? 'application/json'
        : name.endsWith('.js')
          ? 'application/javascript'
          : name.endsWith('.html')
            ? 'text/html'
            : 'application/octet-stream',
    file_size: st.size,
    sha256: sha256File(path),
    access_method: name.startsWith('api-') || name.startsWith('bir-')
      ? 'HTTP_GET_OFFICIAL_API'
      : name.endsWith('.pdf')
        ? 'HTTP_GET_OFFICIAL_PDF'
        : 'HTTP_GET_OFFICIAL_PAGE_OR_JS',
    modified: false,
  });
}
writeFileSync(join(META, 'raw-provenance.json'), JSON.stringify(provenance, null, 2));

// --- Reference code tables ---
const resolutions = readJson(join(RAW, 'api-GetResolutions.json'));
const alleged = readJson(join(RAW, 'api-GetAllegedViolation.json'));
const licenseStatuses = readJson(join(RAW, 'api-GetLicenseStatus.json'));
const licenseTypes = readJson(join(RAW, 'api-GetLicenseType.json'));

const dispositionCatalog = resolutions.map((r) => ({
  resolution_code: (r.Resolution_Code || '').trim() || null,
  resolution_short_desc: r.Resolution_Short_Desc,
  resolution_long_desc: r.Resolution_Long_Desc,
  resolution_seq: r.resolution_seq,
  source: 'api/Complaint/GetResolutions',
}));

const allegedCatalog = alleged.map((a) => ({
  alleged_violation_code: a.Alleged_viola_code,
  alleged_violation_desc: a.Alleged_violation_desc,
  alleged_violation_seq: a.alleged_violation_seq,
  source: 'api/Complaint/GetAllegedViolation',
}));

writeFileSync(
  join(NORM, 'disposition-code-catalog.json'),
  JSON.stringify(
    {
      county: COUNTY,
      agency: AGENCY,
      observation_type: 'OFFICIAL_CODE_TABLE',
      retrieved_at: RETRIEVED_AT,
      count: dispositionCatalog.length,
      values: dispositionCatalog,
    },
    null,
    2
  )
);
writeFileSync(
  join(NORM, 'alleged-violation-code-catalog.json'),
  JSON.stringify(
    {
      county: COUNTY,
      agency: AGENCY,
      observation_type: 'OFFICIAL_CODE_TABLE',
      retrieved_at: RETRIEVED_AT,
      count: allegedCatalog.length,
      values: allegedCatalog,
    },
    null,
    2
  )
);

// --- Licensed mover roster (PUBLICLY_ACQUIRED sample approaching full active set) ---
const rosterRaw = readJson(join(RAW, 'api-GetCompanies-sample-merged.json'));
const moverPermits = rosterRaw.map((r) => {
  const fleet = parseFleet(r.totalVehicleCount);
  return {
    county: COUNTY,
    agency: AGENCY,
    source_record_id: `pbc-mv-${r.License_Number || r.business_seq}`,
    business_regulatory_id: r.License_Number || null,
    business_seq: r.business_seq,
    license_seq: r.License_Seq,
    license_type_seq: r.License_Type_Seq,
    license_type_desc: 'Moving Business Permit',
    ordinance: '2005-007 / PBC Code Ch.17 Art.VIII',
    business_name: r.Business_Name || null,
    dba: r.Does_Business_As || null,
    business_name_alias: r.Business_Name_Alias1 || null,
    permit_status: r.License_Status_Code || null,
    license_year: r.License_Year ?? null,
    issue_date: r.License_Issue_Date || null,
    expiration_date: r.License_Expiry_Date || null,
    street_address: r.Format_Street || null,
    city: r.City_Name || null,
    state: r.State_Cd || null,
    zip: r.Zip_Code || null,
    phone: r.Phone_Number || null,
    website: r.Website_Address || null,
    email: null, // not on roster endpoint; may appear in BIR
    contact_first_name: r.Contact_First_Name || null,
    contact_last_name: r.Contact_Last_Name || null,
    contact_title: r.Contact_Title || null,
    established_year: r.Established_Year ?? null,
    fleet_size: fleet,
    fleet_raw: r.totalVehicleCount || null,
    data_completeness: 'PUBLICLY_ACQUIRED_ACTIVE_LICENSED_ROSTER',
    universe_note:
      'Official Companies/GetCompanies search (BusinessType=58 Moving & Storage). Bounded letter/token searches yielded 142 unique LICENSED Moving Business Permit records. Public search appears to return currently licensed only; historical/inactive require PRA.',
    source_url: `${SOURCE_URL_API}/Companies/GetCompanies`,
    retrieved_at: RETRIEVED_AT,
    pii_removed: false,
    consumer_pii: false,
  };
});

writeFileSync(
  join(NORM, 'mover-permits.json'),
  JSON.stringify(
    {
      task: 'FL-C002',
      county: COUNTY,
      agency: AGENCY,
      credential_name: 'Moving Business Permit',
      license_type_seq: 8,
      business_type_seq: 58,
      business_type_desc: 'Moving & Storage',
      data_scope: 'PUBLICLY_ACQUIRED',
      full_or_sample: 'NEAR_FULL_ACTIVE_LICENSED_ROSTER',
      row_count: moverPermits.length,
      retrieved_at: RETRIEVED_AT,
      records: moverPermits,
    },
    null,
    2
  )
);

// --- BIR samples ---
const birFiles = readdirSync(RAW).filter((n) => /^bir-sample-MV.+\.json$/.test(n));
const birReports = [];
const complaintObs = [];
const enforcementObs = [];
const identityObs = [];
const observedDispositionCodes = new Set();
const observedStatuses = new Set();
const observedAllegations = new Set();
const observedActTypes = new Set();

for (const name of birFiles) {
  const raw = readJson(join(RAW, name));
  const busInfo = raw.complaint_bus_info || raw.complaint_bus_info_noproduct || {};
  const complaints = asArray(raw.complaint_details);
  const admins = asArray(raw.admin_actions_bir);
  const citations = asArray(raw.company_action_details);
  const disputeContacts = asArray(raw.dispute_info);
  const caseSummary = raw.case_summary || {};
  const licenseList = asArray(raw.license_list);

  birReports.push({
    county: COUNTY,
    agency: AGENCY,
    source_record_id: `pbc-bir-${raw.business_seq}`,
    business_seq: raw.business_seq,
    business_regulatory_id: raw.license_number || null,
    business_name: raw.business_name || busInfo.Business_Name || null,
    dba: busInfo.Does_Business_As || null,
    established_year: busInfo.Established_Yr || null,
    business_type_desc: busInfo.businessDesc || 'Moving & Storage',
    physical_address: [busInfo.Address, busInfo.City, busInfo.State, busInfo.Zip]
      .filter(Boolean)
      .join(', ') || null,
    mailing_address: [
      busInfo.MailingAddress,
      busInfo.MailingAddress2,
      busInfo.MailingCity,
      busInfo.MailingState,
      busInfo.MailingZip,
    ]
      .filter(Boolean)
      .join(', ') || null,
    phone: busInfo.PhoneNumber || null,
    email: busInfo.EmailAddress || null,
    website: busInfo.WebsiteURL || null,
    fax: busInfo.Fax || null,
    license_required: busInfo.License_Required || null,
    license_list: licenseList.map((l) => ({
      license_number: l.License_Number || null,
      license_expiry_date: l.License_Expiry_Date || null,
    })),
    dispute_contacts: disputeContacts.map((d) => ({
      // business-level dispute contact / officer — NOT consumer PII
      first_name: d.FirstName || null,
      last_name: d.LastName || null,
      title: d.Title || null,
      phone: d.PhoneNumber || null,
    })),
    case_summary_total: caseSummary.TotalCaseSummary ?? null,
    case_summary: asArray(caseSummary.caseSummary).map((c) => ({
      resolution_code: c.ResolutionCode || null,
      resolution_short_desc: c.ResoultionShortDesc || null,
      total_case: c.TotalCase ?? null,
      status: c.Status || null,
    })),
    complaint_count_in_report: complaints.length,
    admin_action_count: admins.length,
    citation_count: citations.length,
    reporting_window_note:
      'Official Consumer Affairs Business Information Report — approximately three-year consumer dispute history per county guidance',
    source_url: SOURCE_URL_BIR,
    retrieved_at: RETRIEVED_AT,
    pii_removed: true,
    consumer_pii: false,
    notes:
      'Normalized BIR excludes free-form consumer narratives. Complaint observations retain business-level case IDs, allegation categories, statuses, and dispositions only.',
  });

  identityObs.push({
    county: COUNTY,
    agency: AGENCY,
    source_record_id: `pbc-id-${raw.business_seq}`,
    business_regulatory_id: raw.license_number || null,
    business_seq: raw.business_seq,
    business_name: busInfo.Business_Name || raw.business_name || null,
    dba: busInfo.Does_Business_As || null,
    phone: busInfo.PhoneNumber || null,
    email: busInfo.EmailAddress || null,
    website: busInfo.WebsiteURL || null,
    physical_address: [busInfo.Address, busInfo.City, busInfo.State, busInfo.Zip]
      .filter(Boolean)
      .join(', ') || null,
    mailing_address: [
      busInfo.MailingAddress,
      busInfo.MailingCity,
      busInfo.MailingState,
      busInfo.MailingZip,
    ]
      .filter(Boolean)
      .join(', ') || null,
    owner_officer_or_dispute_contact: disputeContacts.map((d) => ({
      name: [d.FirstName, d.LastName].filter(Boolean).join(' ') || null,
      title: d.Title || null,
      phone: d.PhoneNumber || null,
    })),
    established_year: busInfo.Established_Yr || null,
    source_url: SOURCE_URL_BIR,
    retrieved_at: RETRIEVED_AT,
    consumer_pii: false,
  });

  for (const c of complaints) {
    if (c.ResolutionCode) observedDispositionCodes.add(String(c.ResolutionCode).trim());
    if (c.Status) observedStatuses.add(String(c.Status).trim());
    if (c.AllegedViolation) observedAllegations.add(String(c.AllegedViolation).trim());
    complaintObs.push({
      county: COUNTY,
      agency: AGENCY,
      observation_type: 'COMPLAINT_OBSERVATION',
      business_regulatory_id: raw.license_number || null,
      business_seq: raw.business_seq,
      business_name: raw.business_name || null,
      complaint_case_id: c.ComplaintSeq || null,
      complaint_date: null, // not exposed on this endpoint
      complaint_closed_date: c.DateClosed || null,
      complaint_category: c.AllegedViolation || null,
      allegation: c.AllegedViolation || null,
      complaint_status: c.Status || null,
      complaint_disposition_code: c.ResolutionCode || null,
      complaint_disposition: c.ResolutionShortDesc || null,
      resolution_category: c.ResolutionShortDesc || null,
      final_enforcement_action: null,
      source_url: SOURCE_URL_BIR,
      retrieved_at: RETRIEVED_AT,
      source_record_id: `pbc-complaint-${c.ComplaintSeq}`,
      pii_removed: true,
      consumer_pii: false,
      notes:
        'OBSERVATION only — not proof of misconduct. ALLEGATION kept separate from DISPOSITION.',
    });
  }

  for (const a of admins) {
    if (a.ActType) observedActTypes.add(String(a.ActType).trim());
    enforcementObs.push({
      county: COUNTY,
      agency: AGENCY,
      observation_type: 'ENFORCEMENT_OBSERVATION',
      enforcement_layer: 'ADMINISTRATIVE_ACTION',
      business_regulatory_id: raw.license_number || null,
      business_seq: raw.business_seq,
      business_name: raw.business_name || null,
      action_type: a.ActType || null,
      source_item_seq: a.ItemSeq ?? null,
      item_type_seq: a.ItemTypeSeq ?? null,
      action_date: a.Field2 || null,
      ordinance_section_or_description: a.Field3 || null,
      fine_or_amount: a.Field4 || null,
      compliance_flag: a.Field9 || null,
      compliance_date: a.Field10 || null,
      citation_number: null,
      final_disposition: null,
      source_url: SOURCE_URL_BIR,
      retrieved_at: RETRIEVED_AT,
      source_record_id: `pbc-admin-${a.ItemSeq}`,
      pii_removed: true,
      consumer_pii: false,
      notes:
        'Separate from complaint allegation. Citation / Notice of Violation / other ActType as published by BIR GetAdministrativeActions.',
    });
  }

  citations.forEach((c, idx) => {
    observedActTypes.add('Citation');
    enforcementObs.push({
      county: COUNTY,
      agency: AGENCY,
      observation_type: 'ENFORCEMENT_OBSERVATION',
      enforcement_layer: 'CITATION',
      business_regulatory_id: raw.license_number || null,
      business_seq: raw.business_seq,
      business_name: raw.business_name || null,
      action_type: 'Citation',
      citation_number: c.Citation_Number || null,
      action_date: c.Date_Issued || null,
      ordinance_section_or_description: c.Ord_Section || null,
      final_disposition: c.Final_Disposition || null,
      source_url: `${SOURCE_URL_API}/Companies/GetCompaniesActionDetails`,
      retrieved_at: RETRIEVED_AT,
      source_record_id: `pbc-citation-${raw.business_seq}-${c.Citation_Number || 'unknown'}-${idx}`,
      pii_removed: true,
      consumer_pii: false,
      notes: 'Citation record from GetCompaniesActionDetails. Final_Disposition may be null.',
    });
  });
}

writeFileSync(
  join(NORM, 'business-information-reports.json'),
  JSON.stringify(
    {
      task: 'FL-C002',
      county: COUNTY,
      data_scope: 'SAMPLE',
      reports_analyzed: birReports.length,
      retrieved_at: RETRIEVED_AT,
      records: birReports,
    },
    null,
    2
  )
);
writeFileSync(
  join(NORM, 'complaint-observations.json'),
  JSON.stringify(
    {
      task: 'FL-C002',
      county: COUNTY,
      data_scope: 'SAMPLE',
      row_count: complaintObs.length,
      observed_disposition_codes: [...observedDispositionCodes].sort(),
      observed_statuses: [...observedStatuses].sort(),
      observed_allegations: [...observedAllegations].sort(),
      retrieved_at: RETRIEVED_AT,
      records: complaintObs,
    },
    null,
    2
  )
);
writeFileSync(
  join(NORM, 'enforcement-observations.json'),
  JSON.stringify(
    {
      task: 'FL-C002',
      county: COUNTY,
      data_scope: 'SAMPLE',
      row_count: enforcementObs.length,
      observed_action_types: [...observedActTypes].sort(),
      retrieved_at: RETRIEVED_AT,
      records: enforcementObs,
    },
    null,
    2
  )
);
writeFileSync(
  join(NORM, 'identity-contact-observations.json'),
  JSON.stringify(
    {
      task: 'FL-C002',
      county: COUNTY,
      data_scope: 'ROSTER_PLUS_BIR_SAMPLE',
      roster_row_count: moverPermits.length,
      bir_identity_row_count: identityObs.length,
      retrieved_at: RETRIEVED_AT,
      roster_fields: moverPermits,
      bir_enrichment: identityObs,
    },
    null,
    2
  )
);

// --- Field coverage (roster) ---
function coverage(rows, pred) {
  const n = rows.filter(pred).length;
  return { present: n > 0 ? 'YES' : 'NO', count: n, pct: rows.length ? +(100 * n / rows.length).toFixed(1) : 0 };
}

const fieldCoverage = {
  data_scope: 'PUBLICLY_ACQUIRED_ACTIVE_LICENSED_ROSTER',
  n: moverPermits.length,
  fields: {
    business_name: { ...coverage(moverPermits, (r) => !!r.business_name), source: 'GetCompanies', confidence: 'HIGH' },
    dba: { ...coverage(moverPermits, (r) => !!r.dba), source: 'GetCompanies', confidence: 'HIGH' },
    permit_number: { ...coverage(moverPermits, (r) => !!r.business_regulatory_id), source: 'GetCompanies', confidence: 'HIGH' },
    permit_status: { ...coverage(moverPermits, (r) => !!r.permit_status), source: 'GetCompanies', confidence: 'HIGH' },
    issue_date: { ...coverage(moverPermits, (r) => !!r.issue_date), source: 'GetCompanies', confidence: 'HIGH' },
    expiration_date: { ...coverage(moverPermits, (r) => !!r.expiration_date), source: 'GetCompanies', confidence: 'HIGH' },
    owner_president_manager_contact: {
      ...coverage(moverPermits, (r) => !!(r.contact_first_name || r.contact_last_name)),
      source: 'GetCompanies Contact_*',
      confidence: 'HIGH',
      note: 'Contact title often President/Owner/Dispute Contact/Managing Member',
    },
    physical_address: { ...coverage(moverPermits, (r) => !!r.street_address), source: 'GetCompanies', confidence: 'HIGH' },
    phone: { ...coverage(moverPermits, (r) => !!r.phone), source: 'GetCompanies', confidence: 'HIGH' },
    email: {
      present: 'NO',
      count: 0,
      pct: 0,
      source: 'GetCompanies roster',
      confidence: 'HIGH',
      note: 'Email present on BIR complaint_bus_info for sampled businesses',
    },
    website: { ...coverage(moverPermits, (r) => !!(r.website && String(r.website).trim())), source: 'GetCompanies', confidence: 'HIGH' },
    fleet_size: { ...coverage(moverPermits, (r) => r.fleet_size != null), source: 'GetCompanies totalVehicleCount', confidence: 'HIGH' },
    established_year: { ...coverage(moverPermits, (r) => r.established_year != null && r.established_year !== 0), source: 'GetCompanies', confidence: 'MEDIUM' },
    mailing_address: {
      present: 'PARTIAL',
      count: identityObs.filter((r) => !!r.mailing_address).length,
      pct: identityObs.length
        ? +(100 * identityObs.filter((r) => !!r.mailing_address).length / identityObs.length).toFixed(1)
        : 0,
      source: 'BIR sample only',
      confidence: 'HIGH',
    },
    local_business_tax_id: { present: 'NO', count: 0, pct: 0, source: 'not observed in mover APIs', confidence: 'HIGH' },
    vehicle_detail_beyond_fleet_count: {
      present: 'NO',
      count: 0,
      pct: 0,
      source: 'fleet count only on public roster',
      confidence: 'HIGH',
    },
  },
  bir_sample_email_coverage: coverage(identityObs, (r) => !!(r.email && String(r.email).trim())),
};

writeFileSync(join(NORM, 'field-coverage.json'), JSON.stringify(fieldCoverage, null, 2));

// --- FDACS matchability (offline / read-only) ---
const fdacsPath = resolve('data/state-hhg/fl/fdacs-legacy-im-active.json');
const fdacsCsvPath = resolve('data/state-hhg/fl/fdacs-intrastate-movers-newdb.csv');
let fdacsRecords = [];
if (existsSync(fdacsPath)) {
  const fdacs = readJson(fdacsPath);
  fdacsRecords = Array.isArray(fdacs.records) ? fdacs.records : Array.isArray(fdacs) ? fdacs : [];
}
// Also merge newdb CSV if present
if (existsSync(fdacsCsvPath)) {
  const csv = stripBom(readFileSync(fdacsCsvPath, 'utf8')).trim().split(/\r?\n/);
  const headers = csv[0].split(',').map((h) => h.replace(/^"|"$/g, ''));
  // simple CSV parse for quoted fields
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
  for (let i = 1; i < csv.length; i++) {
    const cols = parseLine(csv[i]);
    const row = {};
    headers.forEach((h, idx) => (row[h] = cols[idx] || ''));
    fdacsRecords.push({
      NAME: row['Business Name'] || row.NAME,
      ADDRESS: row.Location || row.ADDRESS,
      PHONE: row.Phone || row.PHONE,
      EMAIL: row.Email || row.EMAIL,
      'DBA/OTHER NAME': row['DBA/Other Names'] || row['DBA/OTHER NAME'],
      'LICENSE NO#': row['License Number'] || row['LICENSE NO#'],
      'LICENSE STATUS': row.Status || row['LICENSE STATUS'],
      CITY: '',
      STATE: 'Florida',
    });
  }
}

// Deduplicate FDACS by license number
const fdacsByLic = new Map();
const fdacsByPhone = new Map();
const fdacsByName = new Map();
for (const f of fdacsRecords) {
  const lic = (f['LICENSE NO#'] || '').trim().toUpperCase();
  const phone = normPhone(f.PHONE);
  const name = normName(f.NAME);
  const dba = normName(f['DBA/OTHER NAME']);
  const rec = {
    license_no: lic,
    name: f.NAME,
    dba: f['DBA/OTHER NAME'] || '',
    phone: f.PHONE,
    email: f.EMAIL || '',
    address: f.ADDRESS || '',
    status: f['LICENSE STATUS'] || '',
    _name: name,
    _dba: dba,
    _phone: phone,
    _street: normStreet(f.ADDRESS),
  };
  if (lic) fdacsByLic.set(lic, rec);
  if (phone) {
    if (!fdacsByPhone.has(phone)) fdacsByPhone.set(phone, []);
    fdacsByPhone.get(phone).push(rec);
  }
  if (name) {
    if (!fdacsByName.has(name)) fdacsByName.set(name, []);
    fdacsByName.get(name).push(rec);
  }
  if (dba) {
    if (!fdacsByName.has(dba)) fdacsByName.set(dba, []);
    fdacsByName.get(dba).push(rec);
  }
}

const matchResults = [];
const anomalies = [];
let counts = {
  DETERMINISTIC_MATCH: 0,
  REVIEW_REQUIRED: 0,
  NOT_FOUND: 0,
  INSUFFICIENT_EVIDENCE: 0,
};

for (const m of moverPermits) {
  const phone = normPhone(m.phone);
  const name = normName(m.business_name);
  const dba = normName(m.dba);
  const street = normStreet(m.street_address);
  const candidates = [];

  // County does not expose FDACS IM number on public roster — no exact IM join.
  if (phone && fdacsByPhone.has(phone)) {
    for (const f of fdacsByPhone.get(phone)) {
      const nameMatch = f._name === name || f._dba === name || f._name === dba || f._dba === dba;
      candidates.push({
        fdacs: f,
        signals: ['exact_phone', ...(nameMatch ? ['exact_legal_or_dba_name'] : [])],
        strength: nameMatch ? 'DETERMINISTIC_MATCH' : 'REVIEW_REQUIRED',
      });
    }
  }

  const nameHits = new Map();
  for (const key of [name, dba].filter(Boolean)) {
    for (const f of fdacsByName.get(key) || []) {
      nameHits.set(f.license_no || f.name, f);
    }
  }
  for (const f of nameHits.values()) {
    const already = candidates.find((c) => c.fdacs.license_no === f.license_no && c.fdacs.name === f.name);
    if (already) continue;
    const streetMatch = street && f._street && (street === f._street || street.includes(f._street) || f._street.includes(street));
    const phoneMatch = phone && f._phone && phone === f._phone;
    if (phoneMatch) {
      candidates.push({
        fdacs: f,
        signals: ['exact_legal_or_dba_name', 'exact_phone'],
        strength: 'DETERMINISTIC_MATCH',
      });
    } else if (streetMatch) {
      candidates.push({
        fdacs: f,
        signals: ['exact_legal_or_dba_name', 'address_corroboration'],
        strength: 'DETERMINISTIC_MATCH',
      });
    } else {
      candidates.push({
        fdacs: f,
        signals: ['exact_legal_or_dba_name_only'],
        strength: 'REVIEW_REQUIRED',
      });
    }
  }

  let classification = 'NOT_FOUND';
  let chosen = null;
  if (candidates.length === 0) {
    if (!name && !phone) classification = 'INSUFFICIENT_EVIDENCE';
    else classification = 'NOT_FOUND';
  } else {
    const det = candidates.filter((c) => c.strength === 'DETERMINISTIC_MATCH');
    if (det.length === 1) {
      classification = 'DETERMINISTIC_MATCH';
      chosen = det[0];
    } else if (det.length > 1) {
      classification = 'REVIEW_REQUIRED';
      chosen = det[0];
    } else {
      classification = 'REVIEW_REQUIRED';
      chosen = candidates[0];
    }
  }
  counts[classification]++;

  const result = {
    county_permit: m.business_regulatory_id,
    county_business_name: m.business_name,
    county_dba: m.dba,
    county_phone: m.phone,
    county_address: [m.street_address, m.city, m.state, m.zip].filter(Boolean).join(', '),
    county_status: m.permit_status,
    classification,
    signals: chosen?.signals || [],
    fdacs_license_no: chosen?.fdacs?.license_no || null,
    fdacs_name: chosen?.fdacs?.name || null,
    fdacs_status: chosen?.fdacs?.status || null,
    fdacs_phone: chosen?.fdacs?.phone || null,
    fdacs_address: chosen?.fdacs?.address || null,
    candidate_count: candidates.length,
  };
  matchResults.push(result);

  if (classification === 'NOT_FOUND') {
    anomalies.push({
      type: 'COUNTY_ACTIVE_NOT_FOUND_IN_FDACS',
      classification: 'CROSS_SOURCE_REVIEW_REQUIRED',
      county_permit: m.business_regulatory_id,
      county_business_name: m.business_name,
      note: 'Active Palm Beach Moving Business Permit not deterministically found in current FDACS IM extracts. Not asserting either source wrong.',
    });
  } else if (classification === 'DETERMINISTIC_MATCH' && chosen) {
    if (
      m.permit_status === 'LICENSED' &&
      chosen.fdacs.status &&
      !/regist/i.test(chosen.fdacs.status) &&
      !/active/i.test(chosen.fdacs.status)
    ) {
      anomalies.push({
        type: 'STATUS_CONFLICT',
        classification: 'CROSS_SOURCE_REVIEW_REQUIRED',
        county_permit: m.business_regulatory_id,
        county_status: m.permit_status,
        fdacs_license_no: chosen.fdacs.license_no,
        fdacs_status: chosen.fdacs.status,
      });
    }
    const cPhone = normPhone(m.phone);
    const fPhone = normPhone(chosen.fdacs.phone);
    if (cPhone && fPhone && cPhone !== fPhone && (chosen.signals || []).includes('exact_legal_or_dba_name')) {
      anomalies.push({
        type: 'PHONE_DIFFERENCE',
        classification: 'CROSS_SOURCE_REVIEW_REQUIRED',
        county_permit: m.business_regulatory_id,
        county_phone: m.phone,
        fdacs_phone: chosen.fdacs.phone,
      });
    }
    if (m.contact_first_name || m.contact_last_name) {
      anomalies.push({
        type: 'COUNTY_OWNER_OFFICER_NOT_IN_FDACS_EXTRACT',
        classification: 'INCREMENTAL_VALUE',
        county_permit: m.business_regulatory_id,
        county_contact: [m.contact_first_name, m.contact_last_name, m.contact_title]
          .filter(Boolean)
          .join(' '),
        note: 'FDACS IM extract used here does not include owner/officer fields; county provides contact/title.',
      });
    }
  }
}

writeFileSync(
  join(NORM, 'fdacs-matchability.json'),
  JSON.stringify(
    {
      task: 'FL-C002',
      mode: 'OFFLINE_READ_ONLY',
      production_writes: false,
      fdacs_sources: [
        'data/state-hhg/fl/fdacs-legacy-im-active.json',
        'data/state-hhg/fl/fdacs-intrastate-movers-newdb.csv',
      ],
      county_records: moverPermits.length,
      counts,
      retrieved_at: RETRIEVED_AT,
      results: matchResults,
    },
    null,
    2
  )
);
writeFileSync(
  join(NORM, 'cross-source-anomalies.json'),
  JSON.stringify(
    {
      task: 'FL-C002',
      note: 'CROSS_SOURCE_REVIEW_REQUIRED until investigated. No conclusion that county or FDACS is wrong.',
      count: anomalies.length,
      records: anomalies,
    },
    null,
    2
  )
);

// --- Incremental value ---
const detMatches = matchResults.filter((r) => r.classification === 'DETERMINISTIC_MATCH');
const birByPermit = new Map(birReports.map((b) => [b.business_regulatory_id, b]));
const complaintsByPermit = new Map();
for (const c of complaintObs) {
  if (!complaintsByPermit.has(c.business_regulatory_id)) complaintsByPermit.set(c.business_regulatory_id, []);
  complaintsByPermit.get(c.business_regulatory_id).push(c);
}
const enfByPermit = new Map();
for (const e of enforcementObs) {
  if (!enfByPermit.has(e.business_regulatory_id)) enfByPermit.set(e.business_regulatory_id, []);
  enfByPermit.get(e.business_regulatory_id).push(e);
}

const incremental = {
  task: 'FL-C002',
  data_scope_notes: {
    roster: 'NEAR_FULL_ACTIVE_LICENSED_ROSTER (n=142)',
    bir_complaints_enforcement: 'SAMPLE (n=22 BIR reports)',
  },
  deterministic_fdacs_matches: detMatches.length,
  review_required: counts.REVIEW_REQUIRED,
  not_found_in_fdacs: counts.NOT_FOUND,
  insufficient_evidence: counts.INSUFFICIENT_EVIDENCE,
  roster_adds: {
    owner_president_manager_contact: moverPermits.filter((r) => r.contact_first_name || r.contact_last_name).length,
    website: moverPermits.filter((r) => r.website && String(r.website).trim()).length,
    phone: moverPermits.filter((r) => r.phone).length,
    fleet_size: moverPermits.filter((r) => r.fleet_size != null).length,
    established_year: moverPermits.filter((r) => r.established_year != null && r.established_year !== 0).length,
    county_permit_identity: moverPermits.length,
  },
  sample_bir_adds: {
    reports: birReports.length,
    with_email: identityObs.filter((r) => r.email).length,
    with_mailing_address: identityObs.filter((r) => r.mailing_address).length,
    with_complaint_history: birReports.filter((r) => (r.complaint_count_in_report || 0) > 0).length,
    complaint_observations: complaintObs.length,
    with_disposition: complaintObs.filter((c) => c.complaint_disposition_code || c.complaint_disposition).length,
    without_disposition: complaintObs.filter((c) => !c.complaint_disposition_code && !c.complaint_disposition).length,
    with_enforcement: birReports.filter((r) => (r.admin_action_count || 0) + (r.citation_count || 0) > 0).length,
    enforcement_observations: enforcementObs.length,
  },
  fdacs_typically_lacks_vs_county: [
    'county Moving Business Permit number (MV####)',
    'county permit issue/expiry under Ord. 2005-007',
    'owner/president/manager/dispute-contact name+title',
    'fleet size (vehicle total)',
    'Business Information Report 3-year dispute history with dispositions',
    'administrative actions / citations / notices of violation',
  ],
};

writeFileSync(join(NORM, 'incremental-value.json'), JSON.stringify(incremental, null, 2));

// --- County page potential (internal mock metrics only) ---
const countyPagePotential = {
  task: 'FL-C002',
  live_page_changed: false,
  title: 'Palm Beach County moving market — INTERNAL DATA DESIGN MOCK',
  metrics: {
    county_regulated_movers_public_active_roster: {
      value: moverPermits.length,
      label: 'NEAR_FULL_ACTIVE_LICENSED_ROSTER',
    },
    active_permits_licensed_status: {
      value: moverPermits.filter((r) => r.permit_status === 'LICENSED').length,
      label: 'PUBLICLY_ACQUIRED',
    },
    fdacs_plus_county_deterministic_matches: {
      value: detMatches.length,
      label: 'OFFLINE_MATCHABILITY',
    },
    companies_with_complaint_history: {
      value: birReports.filter((r) => (r.complaint_count_in_report || 0) > 0).length,
      label: 'SAMPLE_ONLY',
      sample_size: birReports.length,
    },
    complaint_observations_in_sample: {
      value: complaintObs.length,
      label: 'SAMPLE_ONLY',
    },
    disposed_complaints_in_sample: {
      value: complaintObs.filter((c) => c.complaint_disposition_code || c.complaint_disposition).length,
      label: 'SAMPLE_ONLY',
    },
    administrative_actions_in_sample: {
      value: enforcementObs.filter((e) => e.enforcement_layer === 'ADMINISTRATIVE_ACTION').length,
      label: 'SAMPLE_ONLY',
    },
    citations_in_sample: {
      value: enforcementObs.filter((e) => e.enforcement_layer === 'CITATION').length,
      label: 'SAMPLE_ONLY',
    },
  },
};

writeFileSync(
  join(NORM, 'county-page-potential-mock.json'),
  JSON.stringify(countyPagePotential, null, 2)
);

// --- Future company profile evidence design ---
const evidenceDesign = {
  task: 'FL-C002',
  published: false,
  sections: [
    {
      id: 'pbc_permit',
      title: 'Palm Beach County Permit',
      fields: ['county permit/license (MV#)', 'status', 'issue/expiry', 'regulator', 'source'],
      language: 'Neutral regulatory credential observation',
    },
    {
      id: 'pbc_dispute_history',
      title: 'Consumer Dispute History',
      fields: [
        'published observation window (~3 years)',
        'complaint count',
        'allegation categories',
        'dispositions',
        'source',
      ],
      language:
        'Complaints are OBSERVATIONS / ALLEGATIONS — never label a company unsafe merely because a complaint exists',
    },
    {
      id: 'pbc_enforcement',
      title: 'County Enforcement',
      fields: ['action type', 'date', 'ordinance section', 'fine if any', 'disposition if any', 'source'],
      language: 'Separate investigation / allegation / citation / final order layers',
    },
    {
      id: 'pbc_business_info',
      title: 'Business Information',
      fields: [
        'county-reported owner/officer/dispute contact',
        'phone',
        'address',
        'website',
        'fleet size where available',
      ],
      language: 'County-reported identity/contact enrichment',
    },
  ],
};
writeFileSync(join(NORM, 'future-company-profile-evidence-design.json'), JSON.stringify(evidenceDesign, null, 2));

// --- Complaint disposition quality summary ---
const disposed = complaintObs.filter((c) => c.complaint_disposition_code || c.complaint_disposition);
const dates = complaintObs
  .map((c) => c.complaint_closed_date)
  .filter((d) => d && String(d).trim())
  .map((d) => new Date(d))
  .filter((d) => !Number.isNaN(+d))
  .sort((a, b) => a - b);

const dispositionQuality = {
  data_scope: 'SAMPLE',
  bir_reports: birReports.length,
  businesses_with_complaint_history: birReports.filter((r) => (r.complaint_count_in_report || 0) > 0).length,
  complaint_observations: complaintObs.length,
  with_disposition: disposed.length,
  without_disposition: complaintObs.length - disposed.length,
  pct_with_disposition: complaintObs.length
    ? +(100 * disposed.length / complaintObs.length).toFixed(1)
    : 0,
  date_span:
    dates.length > 0
      ? { earliest_closed: dates[0].toISOString().slice(0, 10), latest_closed: dates[dates.length - 1].toISOString().slice(0, 10) }
      : null,
  observed_disposition_codes_in_sample: [...observedDispositionCodes].sort(),
  observed_statuses_in_sample: [...observedStatuses].sort(),
  official_disposition_catalog_size: dispositionCatalog.length,
  note: 'Official disposition values inventoried from GetResolutions code table; sample uses only values actually returned on BIR complaint details.',
};
writeFileSync(join(NORM, 'complaint-disposition-quality.json'), JSON.stringify(dispositionQuality, null, 2));

// --- Summary sidecar ---
const summary = {
  task: 'FL-C002',
  status_hint: 'COMPLETE_PACKAGE',
  publicly_acquired: {
    active_licensed_mover_permits: moverPermits.length,
    disposition_code_catalog: dispositionCatalog.length,
    alleged_violation_catalog: allegedCatalog.length,
    license_status_catalog: licenseStatuses.length,
    license_type_catalog: licenseTypes.length,
  },
  sample_acquired: {
    bir_reports: birReports.length,
    complaint_observations: complaintObs.length,
    enforcement_observations: enforcementObs.length,
  },
  pra_required_for_complete_bulk_data: {
    historical_inactive_expired_permits: true,
    full_complaint_universe_export: true,
    structured_multi_year_disposition_bulk: true,
    complete_enforcement_export: true,
  },
  matchability_counts: counts,
  google_places_api_requests: 0,
  production_db_migrations: 0,
  consumer_pii_committed: 0,
};
writeFileSync(join(NORM, 'fl-c002-summary.json'), JSON.stringify(summary, null, 2));

console.log(JSON.stringify(summary, null, 2));
