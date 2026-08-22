/**
 * FL-C005 — Miami-Dade County mover regulatory staging (research only).
 * Builds normalized staging + matchability from public EnerGov MR roster + LBT extract.
 * No production writes. No Google Places/API calls.
 *
 * Public EnerGov License search (CaseType=Moving) yields NEAR_FULL_ACTIVE_ROSTER:
 * 409 historical+current Moving/MR licenses; 117 Issued active-ish.
 */
import { createHash } from 'crypto';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'fs';
import { basename, join, relative, resolve } from 'path';

const ROOT = resolve('.');
const RAW = resolve('data/county-regulatory/fl/miami-dade/raw');
const NORM = resolve('data/county-regulatory/fl/miami-dade/normalized');
const META = resolve('data/county-regulatory/fl/miami-dade/meta');
const RETRIEVED_AT = new Date().toISOString();
const ORIGIN_MAIN = 'a381203beb61cb5a2a12f80ed007a672a204be31';
const C004_HEAD = 'f085c923b48230f97cd073de30b77b603f047ee3';

const COUNTY = 'Miami-Dade';
const AGENCY =
  'Miami-Dade Department of Regulatory and Economic Resources (RER) — Consumer and Neighborhood Protection Division';
const SOURCE_ENERGOV =
  'https://energov.miamidade.gov/EnerGov_Prod/SelfService';
const SOURCE_LBT =
  'https://services.arcgis.com/8Pc9XBTAsYuxx9Ny/arcgis/rest/services/Local_Business_Tax_Feature_Layer_View/FeatureServer/0';

mkdirSync(NORM, { recursive: true });
mkdirSync(META, { recursive: true });

function writeJson(path, obj) {
  writeFileSync(path, JSON.stringify(obj, null, 2));
}
function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
}
function sha(obj) {
  return createHash('sha256').update(JSON.stringify(obj)).digest('hex').slice(0, 16);
}
function sha256File(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}
function stripBom(s) {
  return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
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
    .replace(
      /\b(STREET|ST|AVENUE|AVE|ROAD|RD|DRIVE|DR|BOULEVARD|BLVD|LANE|LN|COURT|CT|WAY|SUITE|STE|UNIT|#)\b/g,
      ' '
    )
    .replace(/\s+/g, ' ')
    .trim();
}
function contentTypeFor(name) {
  if (name.endsWith('.pdf')) return 'application/pdf';
  if (name.endsWith('.json')) return 'application/json';
  if (name.endsWith('.html')) return 'text/html';
  if (name.endsWith('.txt')) return 'text/plain';
  return 'application/octet-stream';
}
function walkFiles(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) walkFiles(path, out);
    else out.push(path);
  }
  return out;
}
function parseCsvLine(line) {
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
function streetMatch(a, b) {
  if (!a || !b) return false;
  return a === b || a.includes(b) || b.includes(a);
}
function addressPartsFromEnergov(addr, display) {
  const empty = { street: '', city: '', state: '', zip: '', display: display || '' };
  if (!addr || typeof addr !== 'object') return empty;
  // EnerGov may nest a single address object or Addresses[] / AddressLines
  let a = addr;
  if (Array.isArray(addr)) a = addr[0] || {};
  else if (Array.isArray(addr.Addresses)) a = addr.Addresses[0] || {};
  else if (Array.isArray(addr.AddressLines)) a = addr.AddressLines[0] || {};
  else if (addr.Address && typeof addr.Address === 'object') a = addr.Address;

  const street =
    a.AddressLine1 ||
    a.addressLine1 ||
    a.StreetAddress ||
    [a.StreetNumber, a.PreDirection, a.StreetName, a.StreetType, a.PostDirection]
      .filter(Boolean)
      .join(' ') ||
    a.StreetName ||
    '';
  const city = a.City || a.city || '';
  const state = a.State || a.state || a.StateProvince || '';
  const zip = a.PostalCode || a.postalCode || a.Zip || a.zip || '';
  return {
    street: String(street || '').trim(),
    city: String(city || '').trim(),
    state: String(state || '').trim(),
    zip: String(zip || '').trim(),
    display: display || [street, city, state, zip].filter(Boolean).join(', '),
  };
}
function parseDisplayAddress(display) {
  if (!display) return { street: '', city: '', state: '', zip: '' };
  const s = String(display).replace(/\s+/g, ' ').trim();
  // Common MDC: "11431 NW 107 ST Unit: #1 Miami FL 33178"
  const m = s.match(/^(.*?)\s+([A-Za-z .'-]+)\s+(FL|Florida)\s+(\d{5}(?:-\d{4})?)\s*$/i);
  if (m) {
    return {
      street: m[1].replace(/\s*Unit:\s*#?\S*/i, '').trim(),
      city: m[2].trim(),
      state: 'FL',
      zip: m[4],
    };
  }
  return { street: s, city: '', state: '', zip: '' };
}

// --- Provenance ---
const provenanceFiles = [];
for (const path of walkFiles(RAW)) {
  const name = basename(path);
  const st = statSync(path);
  const rel = relative(ROOT, path).replace(/\\/g, '/');
  provenanceFiles.push({
    original_filename: name,
    relative_path: rel,
    source_agency: AGENCY,
    source_url: name.startsWith('lbt-') || name.startsWith('gis-')
      ? SOURCE_LBT
      : name.startsWith('energov-')
        ? SOURCE_ENERGOV
        : 'https://www.miamidade.gov',
    retrieval_timestamp: RETRIEVED_AT,
    content_type: contentTypeFor(name),
    file_size: st.size,
    sha256: sha256File(path),
    access_method: name.startsWith('energov-')
      ? 'HTTP_GET_OFFICIAL_ENERGOV_API'
      : name.startsWith('lbt-') || name.startsWith('gis-')
        ? 'HTTP_GET_OPEN_DATA_FEATURESERVER'
        : name.endsWith('.pdf')
          ? 'HTTP_GET_OFFICIAL_PDF'
          : 'HTTP_GET_OFFICIAL_PAGE',
    modified: false,
  });
}
const provenance = {
  task: 'FL-C005',
  county: COUNTY,
  agency: AGENCY,
  retrieved_at: RETRIEVED_AT,
  google_places_api_requests: 0,
  production_writes: false,
  consumer_pii_committed: 0,
  access_method: 'OFFICIAL_PUBLIC_ENERGOV_SEARCH_PLUS_LBT_OPENDATA',
  files: provenanceFiles,
};
writeJson(join(META, 'raw-provenance.json'), provenance);

writeJson(join(META, 'stack-vs-main-note.json'), {
  task: 'FL-C005',
  county_stack_preserved: true,
  rebase_performed: false,
  origin_main_at_task_start: ORIGIN_MAIN,
  c004_head: C004_HEAD,
  analysis_technically_valid_without_rebase: true,
});

// --- Load roster ---
const rosterRaw = readJson(join(RAW, 'energov-mr-moving-roster.json'));
const detailSamples = existsSync(join(RAW, 'energov-mr-detail-samples.json'))
  ? readJson(join(RAW, 'energov-mr-detail-samples.json'))
  : { samples: [] };
const lbtRaw = readJson(join(RAW, 'lbt-moving-category-extract.json'));
const rawRecords = Array.isArray(rosterRaw.records) ? rosterRaw.records : [];
const statusDistMeta = rosterRaw.meta?.status_distribution || {};

const moverLicenses = rawRecords.map((r) => {
  const fromObj = addressPartsFromEnergov(r.address, r.address_display);
  const fromDisplay = parseDisplayAddress(r.address_display);
  const street = fromObj.street || fromDisplay.street || '';
  const city = fromObj.city || fromDisplay.city || '';
  const state = fromObj.state || fromDisplay.state || 'FL';
  const zip = fromObj.zip || fromDisplay.zip || '';
  const licenseNumber = (r.license_number || '').trim();
  return {
    county: COUNTY,
    agency: AGENCY,
    source_record_id: `FL-MDC-MOVER-${licenseNumber}`,
    business_regulatory_id: licenseNumber,
    case_id: r.case_id || null,
    license_number: licenseNumber,
    license_type: r.license_type || 'Moving',
    workclass: r.workclass || null,
    status: r.status || null,
    company_name: r.company_name || null,
    dba: r.dba || null,
    company_type: r.company_type || null,
    business_type: r.business_type || null,
    business_status: r.business_status || null,
    business_id: r.business_id || null,
    address_display: r.address_display || null,
    street_address: street,
    city,
    state,
    zip,
    apply_date: r.apply_date || null,
    issue_date: r.issue_date || null,
    expire_date: r.expire_date || null,
    opened_date: r.opened_date || null,
    closed_date: r.closed_date || null,
    license_year: r.license_year ?? null,
    description: r.description || null,
    tax_id: r.tax_id || null,
    phone: null,
    email: null,
    fdacs_im_number_on_public_roster: null,
    consumer_pii: false,
    source_url: SOURCE_ENERGOV,
    retrieved_at: rosterRaw.meta?.retrieved_at || RETRIEVED_AT,
    _name: normName(r.company_name),
    _dba: normName(r.dba),
    _street: normStreet(street || r.address_display),
  };
});

const statusCounts = {};
for (const m of moverLicenses) {
  const s = m.status || 'UNKNOWN';
  statusCounts[s] = (statusCounts[s] || 0) + 1;
}
const issuedLicenses = moverLicenses.filter((m) => m.status === 'Issued');

// --- Program verification ---
const program = {
  task: 'FL-C005',
  county: COUNTY,
  agency: AGENCY,
  agency_address: '11805 SW 26th Street, Suite 230, Miami, FL 33175',
  agency_phone: '786-469-2300',
  agency_email: 'license@miamidade.gov',
  credential_primary_name: 'Moving Business Registration / Moving Business License (MR-#####)',
  credential_pattern: 'MR-#####',
  ordinance: 'Article XVI, Chapter 8A (Moving Ordinance) of Miami-Dade County Code',
  geographic_scope:
    'Local moves within Miami-Dade County; tri-county South Florida disclosure practices documented with Palm Beach / Broward programs',
  current_status: 'OPERATING',
  energov_tenant: 'MiamiDadeProd',
  energov_selfservice: SOURCE_ENERGOV,
  application_collects: [
    'company name / DBA',
    'physical and mailing addresses',
    'phones / fax / cell / email',
    'FEID',
    'owners/officers (including DOB — do not commit personal IDs)',
    'additional branch offices',
    'vehicles year/make/model / VIN / tag / GVW',
    'Local Business Tax receipt',
    'insurance certificates (GL any; Auto liability min $50k/<35k GVW or $100k/>35k; Cargo $10k)',
    'Workers Compensation or exemption',
    'enforcement / prior-business disclosures',
  ],
  advertising_marking_requirements_documented: true,
  complaints_channel: 'Consumer Mediation Center — intake; no public structured business complaint history found',
  civil_citations: 'Authority documented; no public bulk citation roster found',
  grandfathered_local_authority:
    'Consistent with Fla. Stat. §507.13 grandfathering of pre-2011 local mover ordinances (documented in FL-C001); Miami-Dade continues Moving Ordinance program as of 2026 materials.',
  official_sources: [
    SOURCE_ENERGOV,
    'https://www.miamidade.gov',
    SOURCE_LBT,
  ],
  retrieved_at: RETRIEVED_AT,
};

// --- Source interfaces ---
const sources = {
  task: 'FL-C005',
  retrieved_at: RETRIEVED_AT,
  interfaces: [
    {
      source: 'EnerGov CSS SelfService — License search',
      endpoint: SOURCE_ENERGOV,
      access_type: 'PUBLIC_SEARCH_API',
      format: 'JSON (EnerGov SelfService)',
      notes:
        'Public License search filtered to Moving/MR yields full Moving-type universe (409 after excluding non-Moving pollution rows). Tenant MiamiDadeProd.',
    },
    {
      source: 'EnerGov business license detail',
      endpoint:
        'https://energov.miamidade.gov/energov_prod/selfservice/api/energov/licenses/business/{case_id}',
      access_type: 'PUBLIC_UNAUTHENTICATED_GET',
      format: 'JSON',
      notes:
        'Identity/status/dates only. Phones, emails, owners, vehicles, insurance certificates NOT exposed publicly (8 Issued samples confirmed).',
    },
    {
      source: 'Application for Moving Business Registration',
      endpoint: 'official PDF (movers-moving-registration.pdf)',
      access_type: 'DOCUMENT_PUBLIC',
      format: 'PDF',
      notes: 'Primary APPLICATION_SCHEMA_PUBLIC for branches, vehicles, insurance, WC, owners.',
    },
    {
      source: 'Local Business Tax FeatureServer',
      endpoint: SOURCE_LBT,
      access_type: 'OPEN_DATA',
      format: 'ArcGIS FeatureServer JSON',
      notes: 'MOV-MNS / MOV-MWS mover-category accounts; NOT the MR license roster.',
    },
    {
      source: 'Consumer Mediation Center / Consumer Protection',
      endpoint: 'https://www.miamidade.gov (consumer protection pages)',
      access_type: 'INTAKE_ONLY',
      format: 'HTML',
      notes: 'Complaint intake documented; no public structured business complaint history found.',
    },
    {
      source: 'Public Records Request (draft)',
      endpoint: 'docs/county-regulatory/fl/pra-drafts/miami-dade-county-mover-regulatory-pra.md',
      access_type: 'PRA',
      format: 'Markdown draft (NOT SENT)',
      notes: 'Targets phones/emails/owners/vehicles/insurance/complaint/citation histories not on public APIs.',
    },
  ],
};

// --- Field inventory ---
const fieldInventory = {
  task: 'FL-C005',
  inventory_basis: 'APPLICATION_SCHEMA_PUBLIC + PUBLIC_ROSTER_FIELDS',
  completeness_classification: 'NEAR_FULL_ACTIVE_ROSTER',
  note:
    'Public EnerGov roster exposes identity/status/dates/address. Application schema documents phones, emails, owners, branches, vehicles, insurance, WC — not returned on public detail samples.',
  application_schema_public: [
    { field: 'company_name', present_in_application: 'YES', present_in_public_roster: 'YES' },
    { field: 'dba', present_in_application: 'YES', present_in_public_roster: 'YES' },
    { field: 'physical_address', present_in_application: 'YES', present_in_public_roster: 'YES' },
    { field: 'mailing_address', present_in_application: 'YES', present_in_public_roster: 'NO' },
    { field: 'phone_fax_cell', present_in_application: 'YES', present_in_public_roster: 'NO' },
    { field: 'email', present_in_application: 'YES', present_in_public_roster: 'NO' },
    { field: 'county_moving_registration_number', present_in_application: 'YES', present_in_public_roster: 'YES' },
    { field: 'feid_tax_id', present_in_application: 'YES', present_in_public_roster: 'SOMETIMES' },
    { field: 'owners_officers_dob', present_in_application: 'YES', present_in_public_roster: 'NO', pii_note: 'DOB not committed' },
    { field: 'additional_branch_offices', present_in_application: 'YES', present_in_public_roster: 'NO' },
    { field: 'vehicles_vin_tag_gvw_ymm', present_in_application: 'YES', present_in_public_roster: 'NO' },
    { field: 'local_business_tax_receipt', present_in_application: 'YES', present_in_public_roster: 'NO_DIRECT_JOIN' },
    { field: 'insurance_gl_auto_cargo', present_in_application: 'YES', present_in_public_roster: 'NO' },
    { field: 'workers_comp_or_exemption', present_in_application: 'YES', present_in_public_roster: 'NO' },
    { field: 'fdacs_im_number', present_in_application: 'HISTORICAL_DISCLOSURE_POSSIBLE', present_in_public_roster: 'NO' },
  ],
  public_roster_fields: [
    'case_id',
    'license_number',
    'license_type',
    'status',
    'company_name',
    'dba',
    'company_type',
    'business_type',
    'business_status',
    'business_id',
    'address_display',
    'address{}',
    'apply_date',
    'issue_date',
    'expire_date',
    'opened_date',
    'closed_date',
    'license_year',
    'description',
    'tax_id',
  ],
  detail_sample_note:
    detailSamples.note ||
    'Public detail endpoint returns identity/status/dates; phones/emails/owners/vehicles/insurance not exposed.',
};

// --- Roster completeness ---
const rosterCompleteness = {
  task: 'FL-C005',
  completeness_classification: 'NEAR_FULL_ACTIVE_ROSTER',
  public_roster_found: true,
  records: moverLicenses.length,
  issued_active_ish: issuedLicenses.length,
  status_distribution: statusCounts,
  status_distribution_raw_meta: statusDistMeta,
  inactive_expired_visibility: 'PUBLIC_HISTORICAL_INCLUDED',
  credential_coverage: 'Moving / MR license type universe after CaseType=Moving filter',
  unique_business_count: new Set(moverLicenses.map((m) => m.business_id).filter(Boolean)).size,
  unique_license_numbers: new Set(moverLicenses.map((m) => m.license_number)).size,
  notes: [
    'Public EnerGov License search yields full Moving type universe after filtering CaseType=Moving.',
    `Raw meta: moving_count=${rosterRaw.meta?.moving_count ?? moverLicenses.length}; pollution_count=${rosterRaw.meta?.pollution_count ?? 'n/a'}.`,
    `${issuedLicenses.length} Issued (active-ish); remaining statuses are historical/process (Out of Business, Abandoned, Expired, Archived, etc.).`,
    'Phones/emails/vehicles/owners not on public roster or public detail samples.',
  ],
  retrieved_at: RETRIEVED_AT,
};

// --- Write mover licenses ---
const moverLicensesOut = {
  task: 'FL-C005',
  completeness_classification: 'NEAR_FULL_ACTIVE_ROSTER',
  row_count: moverLicenses.length,
  issued_count: issuedLicenses.length,
  status_distribution: statusCounts,
  records: moverLicenses.map(({ _name, _dba, _street, ...pub }) => pub),
  retrieved_at: RETRIEVED_AT,
};
writeJson(join(NORM, 'mover-licenses.json'), moverLicensesOut);

// --- Business tax observations (LBT) ---
const lbtRecords = Array.isArray(lbtRaw.records) ? lbtRaw.records : [];
const businessTaxObs = {
  task: 'FL-C005',
  source: lbtRaw.source || 'Local Business Tax Feature Layer View',
  source_url: lbtRaw.source_url || SOURCE_LBT,
  access_class: 'OPEN_DATA',
  note: 'LBT mover-category subset (MOV-MNS/MOV-MWS etc.). NOT the Moving Business Registration roster.',
  row_count: lbtRecords.length,
  status_counts: lbtRaw.status_counts || null,
  category_counts: lbtRaw.category_counts || null,
  records: lbtRecords.map((r) => ({
    source_record_id: `FL-MDC-LBT-${r.ACCOUNTNO || r.OBJECTID}`,
    object_id: r.OBJECTID,
    year: r.YEAR,
    receipt_no: r.RECEIPTNO,
    account_no: r.ACCOUNTNO,
    account_status: r.ACCSTATUS,
    receipt_status: r.RCPTSTATUS,
    paid_status: r.PAIDSTATUS,
    business_name: r.BUSNAME,
    owner_name: r.OWNERNAME,
    bus_addr: r.BUSADDR,
    bus_city: r.BUSCITY,
    bus_state: r.BUSSTATE,
    zip: r.ZIPCODE,
    category_code: r.CATGRYCODE,
    category_name: r.CATGRYNAME,
    class_desc: r.CLASSDESC,
    occ_desc: r.OCCDESC,
    lat: r.LAT,
    lon: r.LON,
    consumer_pii: false,
  })),
};
writeJson(join(NORM, 'business-tax-observations.json'), businessTaxObs);

// --- Branch / vehicle (application schema only) ---
const branchObs = {
  task: 'FL-C005',
  inventory_basis: 'APPLICATION_SCHEMA',
  access_class: 'APPLICATION_SCHEMA_PUBLIC_ONLY',
  row_count: 0,
  records: [],
  note:
    'Application collects additional branch office addresses/phones. Public EnerGov roster/detail does not expose branch rows. Multi-license businesses may imply multiple locations but are not asserted as branch observations.',
  schema_example_from_application: {
    fields: ['branch_address', 'city_state_zip', 'primary_phone', 'secondary_phone', 'parent_mr_license'],
  },
};
writeJson(join(NORM, 'branch-observations.json'), branchObs);

const vehicleObs = {
  task: 'FL-C005',
  inventory_basis: 'APPLICATION_SCHEMA',
  access_class: 'APPLICATION_SCHEMA_PUBLIC_ONLY',
  row_count: 0,
  records: [],
  note:
    'Application collects YEAR/MAKE/MODEL, VIN, GVW, TAG. Public roster/detail samples do not expose vehicle inventory.',
  schema_example_from_application: {
    source_record_id_pattern: 'FL-MDC-VEHICLE-{mr}-{vin_or_seq}',
    fields: ['year_make_model', 'vin', 'gvw', 'tag', 'parent_mr_license'],
  },
};
writeJson(join(NORM, 'vehicle-observations.json'), vehicleObs);

const vehicleProfile = {
  task: 'FL-C005',
  availability: 'APPLICATION_REQUIRED_FIELDS_DOCUMENTED',
  access: 'PRA_OR_AUTHENTICATED_INTERNAL — not observed as public bulk/search',
  sample_full_pra: 'PRA_REQUIRED',
  fields_documented: [
    'YEAR/MAKE/MODEL',
    'VEHICLE ID/VIN',
    'Gross Vehicle Weight (GVW)',
    'VEHICLE TAG NO.',
  ],
  relationship: 'One Moving Business Registration may list multiple vehicles on application attachments.',
  public_rows_acquired: 0,
  pii_note: 'VIN/tag are business-operated vehicle identifiers; no vehicle rows acquired publicly in FL-C005.',
};
writeJson(join(NORM, 'vehicle-profile.json'), vehicleProfile);

const branchModel = {
  task: 'FL-C005',
  model: 'APPLICATION_SCHEMA_BRANCH_OFFICES',
  public_branch_rows: 0,
  notes: [
    'Application section ADDITIONAL BRANCH OFFICES collects address + primary/secondary phones.',
    'Public MR roster is license-centric; branch rows not exposed.',
    'Do not invent branch entities from address differences alone without explicit branch evidence.',
  ],
};
writeJson(join(NORM, 'branch-model.json'), branchModel);

// --- Identity / contact ---
const identityObs = {
  task: 'FL-C005',
  data_scope: 'PUBLIC_ROSTER_NAME_DBA_ADDRESS',
  row_count: moverLicenses.length,
  phones_on_public_roster: 0,
  emails_on_public_roster: 0,
  note: 'Phones/emails NOT on public EnerGov roster or detail samples; collected on application only.',
  records: moverLicenses.map((m) => ({
    source_record_id: m.source_record_id,
    business_regulatory_id: m.license_number,
    company_name: m.company_name,
    dba: m.dba,
    address_display: m.address_display,
    street_address: m.street_address,
    city: m.city,
    state: m.state,
    zip: m.zip,
    phone: null,
    email: null,
    status: m.status,
    consumer_pii: false,
  })),
};
writeJson(join(NORM, 'identity-contact-observations.json'), identityObs);

// --- Complaints / citations / enforcement (empty) ---
const complaintObs = {
  task: 'FL-C005',
  access_class: 'INTAKE_ONLY',
  row_count: 0,
  records: [],
  consumer_pii_committed: 0,
  note: 'Consumer Mediation Center intake documented; no public structured business complaint history found.',
};
writeJson(join(NORM, 'complaint-observations.json'), complaintObs);

const complaintDispositions = {
  task: 'FL-C005',
  access_class: 'PRA_REQUIRED',
  row_count: 0,
  records: [],
  note: 'No public disposition catalog found for Miami-Dade mover complaints.',
};
writeJson(join(NORM, 'complaint-dispositions.json'), complaintDispositions);

const citationObs = {
  task: 'FL-C005',
  access_class: 'AUTHORITY_DOCUMENTED_NO_PUBLIC_BULK',
  row_count: 0,
  records: [],
  note: 'Civil citation authority documented in materials; no public bulk citation roster found.',
};
writeJson(join(NORM, 'citation-observations.json'), citationObs);

const enforcementObs = {
  task: 'FL-C005',
  access_class: 'DOCUMENT_PUBLIC_PROCESS_ONLY',
  row_count: 0,
  records: [],
  note: 'No case-level enforcement dataset acquired publicly; do not invent FINAL_ENFORCEMENT_ACTION rows.',
};
writeJson(join(NORM, 'enforcement-observations.json'), enforcementObs);

const complaintProfile = {
  task: 'FL-C005',
  availability: 'INTAKE_ONLY_PUBLIC',
  access_class: 'INTAKE_ONLY',
  records_public: 0,
  sample_or_full: 'PRA_REQUIRED for history',
  case_status_public: false,
  disposition_public: false,
  pii: 'Consumer complaints via Mediation Center; normalized staging contains no complaint rows; Consumer PII committed: 0',
  notes: [
    'No Miami-Dade equivalent of Palm Beach BIR (3-year allegation+disposition) found publicly.',
    'Disposition taxonomy not publicly published as a structured code table.',
  ],
};
writeJson(join(NORM, 'complaint-system-profile.json'), complaintProfile);

const enforcementProfile = {
  task: 'FL-C005',
  nov_citations: 'AUTHORITY_DOCUMENTED — civil citations referenced; bulk roster not public',
  hearings: 'Process may exist under RER/Consumer Protection; case-level data PRA',
  suspension_revocation: 'Documented on application acknowledgements / ordinance',
  final_action: 'PRA_REQUIRED for structured final orders / outcomes extract',
  access: 'DOCUMENT_PUBLIC for process; PRA_REQUIRED for case-level history',
  observations_acquired: 0,
  notes: [
    'Do not invent complaint dispositions or final enforcement actions.',
    'Court bulk discovery noted separately as LEGAL_OBSERVATION future.',
  ],
};
writeJson(join(NORM, 'enforcement-system-profile.json'), enforcementProfile);

const insuranceObs = {
  task: 'FL-C005',
  REQUIREMENT_DOCUMENTED: true,
  CURRENT_POLICY_OBSERVED: false,
  COMPLIANCE_VERIFIED: false,
  requirements: {
    general_liability: 'any amount (certificate required on application)',
    automobile_liability:
      'minimum $50,000 for trucks GVW < 35,000 lbs; minimum $100,000 for GVW > 35,000 lbs',
    cargo_liability: '$10,000',
    workers_compensation: 'Certificate, State exemption, or affirmation letter',
  },
  public_policy_rows: 0,
  note: 'Insurance requirements documented on Moving Business Registration application; current policies are NOT observed on public EnerGov roster/detail. Do not invent compliance.',
};
writeJson(join(NORM, 'insurance-workers-comp-observations.json'), insuranceObs);

writeJson(join(NORM, 'program-verification.json'), program);
writeJson(join(NORM, 'source-interfaces.json'), sources);
writeJson(join(NORM, 'field-inventory.json'), fieldInventory);
writeJson(join(NORM, 'roster-completeness.json'), rosterCompleteness);

// --- LBT crosswalk (Issued MR ↔ LBT) ---
const lbtIndexByName = new Map();
const lbtNormalized = lbtRecords.map((r) => {
  const name = normName(r.BUSNAME);
  const street = normStreet(r.BUSADDR);
  const rec = {
    account_no: r.ACCOUNTNO,
    receipt_no: r.RECEIPTNO,
    business_name: r.BUSNAME,
    bus_addr: r.BUSADDR,
    bus_city: r.BUSCITY,
    zip: r.ZIPCODE,
    category_code: r.CATGRYCODE,
    category_name: r.CATGRYNAME,
    account_status: r.ACCSTATUS,
    _name: name,
    _street: street,
  };
  if (name) {
    if (!lbtIndexByName.has(name)) lbtIndexByName.set(name, []);
    lbtIndexByName.get(name).push(rec);
  }
  return rec;
});

const lbtCrosswalkResults = [];
let lbtStats = {
  issued_mr_total: issuedLicenses.length,
  DETERMINISTIC_NAME_ADDRESS: 0,
  NAME_ONLY_REVIEW: 0,
  NOT_FOUND: 0,
  MULTIPLE_CANDIDATES_REVIEW: 0,
};
for (const m of issuedLicenses) {
  const nameHits = new Map();
  for (const key of [m._name, m._dba].filter(Boolean)) {
    for (const l of lbtIndexByName.get(key) || []) {
      nameHits.set(l.account_no, l);
    }
  }
  const candidates = [...nameHits.values()];
  let classification = 'NOT_FOUND';
  let chosen = null;
  let signals = [];
  if (candidates.length === 0) {
    classification = 'NOT_FOUND';
    lbtStats.NOT_FOUND++;
  } else {
    const withAddr = candidates.filter((c) => streetMatch(m._street, c._street));
    if (withAddr.length === 1) {
      classification = 'DETERMINISTIC_NAME_ADDRESS';
      chosen = withAddr[0];
      signals = ['exact_legal_or_dba_name', 'address_corroboration'];
      lbtStats.DETERMINISTIC_NAME_ADDRESS++;
    } else if (withAddr.length > 1) {
      classification = 'MULTIPLE_CANDIDATES_REVIEW';
      chosen = withAddr[0];
      signals = ['exact_legal_or_dba_name', 'address_corroboration', 'multiple_lbt_accounts'];
      lbtStats.MULTIPLE_CANDIDATES_REVIEW++;
    } else {
      classification = 'NAME_ONLY_REVIEW';
      chosen = candidates[0];
      signals = ['exact_legal_or_dba_name_only'];
      lbtStats.NAME_ONLY_REVIEW++;
    }
  }
  lbtCrosswalkResults.push({
    county_license: m.license_number,
    county_business_name: m.company_name,
    county_dba: m.dba,
    county_address: m.address_display,
    county_status: m.status,
    classification,
    signals,
    lbt_account_no: chosen?.account_no || null,
    lbt_business_name: chosen?.business_name || null,
    lbt_category_code: chosen?.category_code || null,
    lbt_address: chosen ? [chosen.bus_addr, chosen.bus_city, chosen.zip].filter(Boolean).join(', ') : null,
    candidate_count: candidates.length,
  });
}
const lbtCrosswalk = {
  task: 'FL-C005',
  mode: 'OFFLINE_NAME_ADDRESS',
  scope: 'ISSUED_MR_TO_LBT_MOVER_CATEGORIES',
  production_writes: false,
  google_places_api_requests: 0,
  stats: lbtStats,
  results: lbtCrosswalkResults,
};
writeJson(join(NORM, 'lbt-crosswalk.json'), lbtCrosswalk);

// --- FDACS load ---
const fdacsPath = resolve('data/state-hhg/fl/fdacs-legacy-im-active.json');
const fdacsCsvPath = resolve('data/state-hhg/fl/fdacs-intrastate-movers-newdb.csv');
let fdacsRecords = [];
if (existsSync(fdacsPath)) {
  const fdacs = readJson(fdacsPath);
  fdacsRecords = Array.isArray(fdacs.records) ? fdacs.records : Array.isArray(fdacs) ? fdacs : [];
}
if (existsSync(fdacsCsvPath)) {
  const csv = stripBom(readFileSync(fdacsCsvPath, 'utf8')).trim().split(/\r?\n/);
  const headers = parseCsvLine(csv[0]).map((h) => h.replace(/^"|"$/g, ''));
  for (let i = 1; i < csv.length; i++) {
    const cols = parseCsvLine(csv[i]);
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

const fdacsByLic = new Map();
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
  if (name) {
    if (!fdacsByName.has(name)) fdacsByName.set(name, []);
    fdacsByName.get(name).push(rec);
  }
  if (dba) {
    if (!fdacsByName.has(dba)) fdacsByName.set(dba, []);
    fdacsByName.get(dba).push(rec);
  }
}

function matchCountyToFdacs(m) {
  // No IM number on public EnerGov → no direct IM join.
  // No phone on public roster → cannot use phone deterministic path.
  const candidates = [];
  const nameHits = new Map();
  for (const key of [m._name, m._dba].filter(Boolean)) {
    for (const f of fdacsByName.get(key) || []) {
      nameHits.set(f.license_no || f.name, f);
    }
  }
  for (const f of nameHits.values()) {
    const addrOk = streetMatch(m._street, f._street);
    if (addrOk) {
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
    classification = !m._name && !m._dba ? 'INSUFFICIENT_EVIDENCE' : 'NOT_FOUND';
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
  return {
    county_license: m.license_number,
    county_business_name: m.company_name,
    county_dba: m.dba,
    county_phone: null,
    county_address: m.address_display,
    county_status: m.status,
    classification,
    signals: chosen?.signals || [],
    fdacs_license_no: chosen?.fdacs?.license_no || null,
    fdacs_name: chosen?.fdacs?.name || null,
    fdacs_status: chosen?.fdacs?.status || null,
    fdacs_phone: chosen?.fdacs?.phone || null,
    fdacs_address: chosen?.fdacs?.address || null,
    candidate_count: candidates.length,
  };
}

const issuedMatchResults = issuedLicenses.map(matchCountyToFdacs);
const fullMatchResults = moverLicenses.map(matchCountyToFdacs);

function tally(results) {
  const counts = {
    DETERMINISTIC_MATCH: 0,
    REVIEW_REQUIRED: 0,
    NOT_FOUND: 0,
    INSUFFICIENT_EVIDENCE: 0,
  };
  for (const r of results) counts[r.classification]++;
  return counts;
}

const issuedCounts = tally(issuedMatchResults);
const fullCounts = tally(fullMatchResults);

const matchability = {
  task: 'FL-C005',
  mode: 'OFFLINE_READ_ONLY',
  production_writes: false,
  google_places_api_requests: 0,
  primary_scope: 'ISSUED',
  fdacs_sources: [
    'data/state-hhg/fl/fdacs-legacy-im-active.json',
    'data/state-hhg/fl/fdacs-intrastate-movers-newdb.csv',
  ],
  match_rules: [
    'Name-only is NEVER DETERMINISTIC_MATCH',
    'Name/DBA + address corroboration required for DETERMINISTIC without phone',
    'No IM number on public EnerGov fields → no IM direct join',
    'No phone on county public roster → phone path unavailable',
  ],
  county_records_issued: issuedLicenses.length,
  county_records_full_roster: moverLicenses.length,
  counts: issuedCounts,
  counts_full_roster: fullCounts,
  retrieved_at: RETRIEVED_AT,
  results: issuedMatchResults,
  results_full_roster_note:
    'Full-roster classifications available in counts_full_roster; primary results array is ISSUED-only.',
};
writeJson(join(NORM, 'fdacs-matchability.json'), matchability);

// --- Canonical matchability (READ ONLY crosswalk) ---
const crosswalkPath = resolve(
  'data/county-regulatory/fl/palm-beach/evidence/florida-im-company-crosswalk.json'
);
const crosswalk = readJson(crosswalkPath);
const imToCompanyIds = crosswalk.im_to_company_ids || {};
const companiesById = crosswalk.companies_by_id || {};

// Build name index into canonical companies (for fallback name match)
const companyByNormName = new Map();
for (const [id, c] of Object.entries(companiesById)) {
  const n = normName(c.name);
  if (!n) continue;
  if (!companyByNormName.has(n)) companyByNormName.set(n, []);
  companyByNormName.get(n).push({ id, ...c, _street: normStreet(c.physical_address) });
}

const canonicalResults = [];
const canonicalCounts = {
  CANONICAL_LINKED: 0,
  STATE_RECORD_ONLY: 0,
  COUNTY_ONLY: 0,
  REVIEW_REQUIRED: 0,
};

for (const r of issuedMatchResults) {
  let canonical_class = 'COUNTY_ONLY';
  let company_ids = [];
  let primary_company_id = null;
  let link_path = null;

  if (r.classification === 'DETERMINISTIC_MATCH' && r.fdacs_license_no) {
    const im = String(r.fdacs_license_no).trim().toUpperCase();
    company_ids = imToCompanyIds[im] || [];
    if (company_ids.length === 1) {
      canonical_class = 'CANONICAL_LINKED';
      primary_company_id = company_ids[0];
      link_path = 'fdacs_im_to_company_ids';
    } else if (company_ids.length > 1) {
      canonical_class = 'REVIEW_REQUIRED';
      primary_company_id = company_ids[0];
      link_path = 'fdacs_im_to_multiple_company_ids';
    } else {
      // Try name match against companies_by_id with address corroboration
      const m = issuedLicenses.find((x) => x.license_number === r.county_license);
      const nameKeys = [m?._name, m?._dba].filter(Boolean);
      const hits = [];
      for (const k of nameKeys) {
        for (const c of companyByNormName.get(k) || []) {
          if (streetMatch(m._street, c._street)) hits.push(c);
        }
      }
      const uniq = [...new Map(hits.map((h) => [h.id, h])).values()];
      if (uniq.length === 1) {
        canonical_class = 'CANONICAL_LINKED';
        primary_company_id = uniq[0].id;
        company_ids = [uniq[0].id];
        link_path = 'deterministic_fdacs_plus_canonical_name_address';
      } else if (uniq.length > 1) {
        canonical_class = 'REVIEW_REQUIRED';
        link_path = 'multiple_canonical_name_address';
      } else {
        canonical_class = 'STATE_RECORD_ONLY';
        link_path = 'fdacs_deterministic_no_canonical_company';
      }
    }
  } else if (r.classification === 'REVIEW_REQUIRED') {
    canonical_class = 'REVIEW_REQUIRED';
    link_path = 'fdacs_review_required';
  } else {
    canonical_class = 'COUNTY_ONLY';
    link_path = 'no_fdacs_deterministic_match';
  }

  canonicalCounts[canonical_class]++;
  canonicalResults.push({
    county_license: r.county_license,
    county_business_name: r.county_business_name,
    fdacs_match_classification: r.classification,
    fdacs_license_no: r.fdacs_license_no,
    canonical_class,
    primary_company_id,
    company_ids,
    link_path,
  });
}

const canonicalMatchability = {
  task: 'FL-C005',
  mode: 'OFFLINE_READ_ONLY',
  production_writes: false,
  crosswalk_source:
    'data/county-regulatory/fl/palm-beach/evidence/florida-im-company-crosswalk.json',
  crosswalk_modified: false,
  scope: 'ISSUED_DETERMINISTIC_FDACS_PRIMARY',
  counts: canonicalCounts,
  deterministic_county_fdacs_with_canonical_company: canonicalCounts.CANONICAL_LINKED,
  deterministic_county_fdacs_without_canonical_company: canonicalCounts.STATE_RECORD_ONLY,
  results: canonicalResults,
};
writeJson(join(NORM, 'canonical-matchability.json'), canonicalMatchability);

// --- Anomalies ---
const anomalies = [];
for (const r of issuedMatchResults) {
  if (r.classification === 'NOT_FOUND') {
    anomalies.push({
      type: 'COUNTY_ISSUED_NOT_FOUND_IN_FDACS',
      classification: 'CROSS_SOURCE_REVIEW_REQUIRED',
      county_license: r.county_license,
      county_business_name: r.county_business_name,
      note: 'Issued Miami-Dade MR not deterministically found in current FDACS IM extracts. Not asserting either source wrong.',
    });
  } else if (r.classification === 'DETERMINISTIC_MATCH') {
    if (
      r.fdacs_status &&
      !/regist/i.test(r.fdacs_status) &&
      !/active/i.test(r.fdacs_status)
    ) {
      anomalies.push({
        type: 'STATUS_CONFLICT',
        classification: 'CROSS_SOURCE_REVIEW_REQUIRED',
        county_license: r.county_license,
        county_status: r.county_status,
        fdacs_license_no: r.fdacs_license_no,
        fdacs_status: r.fdacs_status,
      });
    }
  }
}
anomalies.push({
  type: 'NO_PUBLIC_PHONE_EMAIL_ON_COUNTY_ROSTER',
  classification: 'ARCHITECTURE_SIGNAL',
  note: 'Unlike Palm Beach, Miami-Dade public EnerGov roster lacks phone/email — FDACS matchability relies on name+address only.',
});
anomalies.push({
  type: 'NO_IM_NUMBER_ON_PUBLIC_ENERGOV',
  classification: 'ARCHITECTURE_SIGNAL',
  note: 'No FDACS IM number observed on public EnerGov fields — no direct IM join until PRA or application enrichment.',
});
anomalies.push({
  type: 'LBT_IS_NOT_MR_ROSTER',
  classification: 'CROSS_SOURCE_REVIEW_REQUIRED',
  note: 'LBT MOV-* categories are tax accounts, not Moving Business Registration credentials; treat as corroboration only.',
});

writeJson(join(NORM, 'cross-source-anomalies.json'), {
  task: 'FL-C005',
  note: 'CROSS_SOURCE_REVIEW_REQUIRED until investigated. No conclusion that county or FDACS is wrong.',
  count: anomalies.length,
  records: anomalies,
});

// --- Incremental value ---
const incremental = {
  task: 'FL-C005',
  data_scope_notes: {
    roster: `NEAR_FULL_ACTIVE_ROSTER (n=${moverLicenses.length}; Issued=${issuedLicenses.length})`,
    lbt: `OPEN_DATA mover categories (n=${lbtRecords.length})`,
    complaints_enforcement: 'INTAKE_ONLY / PRA_REQUIRED — 0 public rows',
  },
  deterministic_fdacs_matches_issued: issuedCounts.DETERMINISTIC_MATCH,
  review_required_issued: issuedCounts.REVIEW_REQUIRED,
  not_found_in_fdacs_issued: issuedCounts.NOT_FOUND,
  insufficient_evidence_issued: issuedCounts.INSUFFICIENT_EVIDENCE,
  roster_adds_vs_fdacs: {
    county_mr_credential: moverLicenses.length,
    public_status_including_historical: true,
    public_address: moverLicenses.filter((m) => m.address_display).length,
    public_dba: moverLicenses.filter((m) => m.dba && String(m.dba).trim()).length,
    public_phone: 0,
    public_email: 0,
    public_vehicle_inventory: 0,
    public_complaint_history: 0,
  },
  lbt_crosswalk_stats: lbtStats,
  fdacs_typically_lacks_vs_county: [
    'county Moving Business Registration number (MR-#####)',
    'county license status under Article XVI Ch.8A (Issued/Expired/Out of Business/etc.)',
    'county issue/expire dates from EnerGov',
    'LBT category linkage (when crosswalkable)',
  ],
  county_publicly_lacks_vs_palm_beach: [
    'phone on public roster',
    'email on public roster / BIR',
    'owner/officer contact on public roster',
    'fleet size on public roster',
    'BIR-style complaint disposition history',
  ],
};
writeJson(join(NORM, 'incremental-value.json'), incremental);

// --- Three-county comparison ---
const threeCounty = {
  task: 'FL-C005',
  dimensions: [
    {
      dimension: 'mover_credential',
      palm_beach: 'Moving Business Permit (MV####)',
      broward: "Mover's Registration + Mover Permit (decal)",
      miami_dade: 'Moving Business Registration / License (MR-#####)',
    },
    {
      dimension: 'roster_accessibility',
      palm_beach: 'SEARCHABLE_PUBLIC API (NEAR_FULL active)',
      broward: 'PRA_REQUIRED (no public roster found)',
      miami_dade: 'PUBLIC EnerGov search (NEAR_FULL_ACTIVE_ROSTER; 409 / Issued 117)',
    },
    {
      dimension: 'status',
      palm_beach: 'Public LICENSED statuses',
      broward: 'Call-to-verify status; no self-serve roster',
      miami_dade: 'Public multi-status (Issued, Expired, OOB, Abandoned, Archived, …)',
    },
    {
      dimension: 'phone_email',
      palm_beach: 'Phone 100%; email via BIR',
      broward: 'Collected on application; not publicly listed',
      miami_dade: 'Collected on application; NOT on public EnerGov roster/detail',
    },
    {
      dimension: 'owner_officer',
      palm_beach: 'Public contact name/title on roster',
      broward: 'Collected on application; not publicly listed',
      miami_dade: 'Collected on application (incl. DOB — not committed); not public',
    },
    {
      dimension: 'vehicle_level_detail',
      palm_beach: 'Fleet count only publicly',
      broward: 'VIN/tag/GVW/decal on application — PRA for inventory',
      miami_dade: 'VIN/tag/GVW/YMM on application — not public',
    },
    {
      dimension: 'branches',
      palm_beach: 'Not first-class public',
      broward: 'Not observed as public',
      miami_dade: 'Application branch section; public roster row_count 0',
    },
    {
      dimension: 'local_business_tax',
      palm_beach: 'BTR required in packet (not open roster join)',
      broward: 'BTR required in packet',
      miami_dade: 'LBT open data FeatureServer (MOV-*) available for offline crosswalk',
    },
    {
      dimension: 'complaints',
      palm_beach: 'BIR searchable (~3yr) with case IDs',
      broward: 'Intake/mediation documented; history PRA',
      miami_dade: 'Consumer Mediation Center INTAKE_ONLY; history PRA',
    },
    {
      dimension: 'dispositions',
      palm_beach: '44-code official catalog + BIR coverage',
      broward: 'No public disposition code table found',
      miami_dade: 'No public disposition catalog found',
    },
    {
      dimension: 'enforcement_citations',
      palm_beach: 'BIR admin actions/citations sampleable',
      broward: 'Citations/hearings process public; case data PRA',
      miami_dade: 'Citation authority documented; no public bulk roster',
    },
    {
      dimension: 'fdacs_match_signals_public',
      palm_beach: 'Name + phone (+ address) strong',
      broward: 'INSUFFICIENT_PUBLIC_ROSTER',
      miami_dade: 'Name + address only (no public phone/IM)',
    },
    {
      dimension: 'bulk_accessibility',
      palm_beach: 'API bounded search near-full',
      broward: 'Low — documents strong, data weak',
      miami_dade: 'High for roster identity; low for contact/fleet/complaints',
    },
    {
      dimension: 'engineering_complexity',
      palm_beach: 'Medium (API + BIR)',
      broward: 'High for public path; PRA unlocks value',
      miami_dade: 'Medium — EnerGov + LBT open data; enrichment PRA',
    },
  ],
};
writeJson(join(NORM, 'three-county-comparison.json'), threeCounty);

// --- Architecture pressure test ---
const architecturePressure = {
  task: 'FL-C005',
  patterns_status: 'PATTERNS_CONVERGING',
  architecture_finalized: false,
  production_schema_created: false,
  another_pilot_required: 'Pinellas',
  note:
    'Palm Beach (public API+BIR), Broward (docs/PRA-gated), Miami-Dade (EnerGov NEAR_FULL roster + LBT) show converging county-regulatory concepts (credential, identity, vehicle schema, complaint/enforcement layers) but divergent public accessibility. ANOTHER_PILOT_REQUIRED (Pinellas) before generalized architecture lock.',
  shared_concepts_observed: [
    'county regulatory credential',
    'identity observation',
    'owner/officer (application)',
    'vehicle/fleet schema',
    'branch schema (MDC application)',
    'complaint intake',
    'disposition (when public)',
    'enforcement / citation authority',
    'FDACS IM crosswalk (offline)',
    'local business tax corroboration (MDC open data)',
  ],
  miami_dade_specific_concepts: [
    'EnerGov MR-##### Moving Business Registration as primary public credential id',
    'multi-status historical roster on public search',
    'LBT FeatureServer mover-category open data',
    'insurance minima by GVW band on application',
  ],
  do_not_lock_yet: [
    'production county evidence schema',
    'generalized multi-county Trust Score wiring',
    'assumption that every FL county exposes EnerGov-like rosters',
  ],
};
writeJson(join(NORM, 'architecture-pressure-test.json'), architecturePressure);

// --- Page potential / profile design / network / court ---
const pagePotential = {
  task: 'FL-C005',
  live_page_changed: false,
  title: 'Miami-Dade County moving market — INTERNAL DATA DESIGN MOCK',
  metrics: {
    county_regulated_movers_public_roster: {
      value: moverLicenses.length,
      label: 'NEAR_FULL_ACTIVE_ROSTER (historical+current)',
    },
    issued_credentials: {
      value: issuedLicenses.length,
      label: 'PUBLICLY_ACQUIRED Issued',
    },
    fdacs_deterministic_matches_issued: {
      value: issuedCounts.DETERMINISTIC_MATCH,
      label: 'OFFLINE_MATCHABILITY_ISSUED',
    },
    lbt_deterministic_name_address: {
      value: lbtStats.DETERMINISTIC_NAME_ADDRESS,
      label: 'OFFLINE_LBT_CROSSWALK_ISSUED',
    },
    canonical_linked_issued: {
      value: canonicalCounts.CANONICAL_LINKED,
      label: 'OFFLINE_CANONICAL_READ_ONLY',
    },
  },
  sample_only: {
    complaint_observations: { value: 0, label: 'INTAKE_ONLY / none public' },
    enforcement_observations: { value: 0, label: 'none public' },
    vehicle_observations: { value: 0, label: 'APPLICATION_SCHEMA only' },
  },
  extrapolation_forbidden: true,
};
writeJson(join(NORM, 'county-page-potential-mock.json'), pagePotential);

const profileDesign = {
  task: 'FL-C005',
  published: false,
  trust_score_connection: false,
  sections: [
    {
      id: 'mdc_credential',
      title: 'Miami-Dade Moving Business Registration',
      fields: ['MR-#####', 'status', 'issue/expire', 'regulator', 'source'],
      language: 'Neutral regulatory credential observation',
    },
    {
      id: 'mdc_identity',
      title: 'County-reported identity',
      fields: ['legal name', 'DBA', 'address', 'phone/email if/when public or PRA'],
      language: 'County-reported identity/contact enrichment',
    },
    {
      id: 'mdc_lbt',
      title: 'Local Business Tax corroboration',
      fields: ['LBT account', 'category MOV-MNS/MOV-MWS', 'status'],
      language: 'Tax-category corroboration — not a substitute MR credential',
    },
    {
      id: 'mdc_vehicles',
      title: 'Vehicle / fleet information',
      fields: ['VIN/tag/GVW/YMM when public or PRA'],
      language: 'Application-schema documented; public rows 0 in FL-C005',
    },
    {
      id: 'mdc_disputes',
      title: 'Consumer dispute / mediation history',
      fields: ['explicit window', 'allegation vs disposition'],
      language: 'Complaints are OBSERVATIONS — never label unsafe merely because a complaint exists',
    },
    {
      id: 'mdc_enforcement',
      title: 'County enforcement / citations',
      fields: ['citation', 'hearing', 'suspension/revocation', 'final order'],
      language: 'Separate allegation / citation / final action layers; do not invent dispositions',
    },
  ],
};
writeJson(join(NORM, 'future-company-profile-evidence-design.json'), profileDesign);

const networkReuse = {
  task: 'FL-C005',
  architecture_implemented: false,
  note:
    'Miami-Dade RER Consumer and Neighborhood Protection / EnerGov tenant may regulate additional business license types beyond movers — potential later reuse for other TrustHubs. Catalog only; no non-mover ingestion in FL-C005.',
  potential_later_reuse: [
    'ContractorTrustHub',
    'SeniorTrustHub',
    'InsuranceTrustHub',
    'other Move counties',
  ],
  energov_pattern_reusable: true,
  lbt_opendata_pattern_reusable: true,
};
writeJson(join(NORM, 'network-reuse-note.json'), networkReuse);

const courtBulk = {
  task: 'FL-C005',
  discovery_class: 'LEGAL_OBSERVATION',
  status: 'FUTURE',
  note:
    'Court bulk / clerk civil case extracts involving movers may eventually complement county mediation/citation histories. Not acquired in FL-C005. Treat as future LEGAL_OBSERVATION track only — no case rows invented.',
  rows_acquired: 0,
};
writeJson(join(NORM, 'court-bulk-discovery-note.json'), courtBulk);

// --- Summary ---
const summary = {
  task: 'FL-C005',
  status: 'COMPLETE',
  origin_main_observed: ORIGIN_MAIN,
  stacked_on_c004: C004_HEAD,
  publicly_acquired: [
    'program verification',
    'EnerGov Moving/MR roster (409)',
    'EnerGov detail samples (8 Issued)',
    'application schema',
    'LBT mover-category open data (188)',
    'complaint intake characterization',
    'enforcement/citation authority characterization',
  ],
  pra_required_for_complete_bulk_data: true,
  roster_completeness: 'NEAR_FULL_ACTIVE_ROSTER',
  mover_license_rows: moverLicenses.length,
  issued_mover_license_rows: issuedLicenses.length,
  lbt_rows: lbtRecords.length,
  branch_rows: 0,
  vehicle_rows: 0,
  complaint_rows: 0,
  citation_rows: 0,
  enforcement_rows: 0,
  fdacs_matchability_issued: issuedCounts,
  fdacs_matchability_full_roster: fullCounts,
  lbt_crosswalk_stats: lbtStats,
  canonical_matchability_issued: canonicalCounts,
  google_places_api_requests: 0,
  production_writes: false,
  production_db_migrations: 0,
  consumer_pii_committed: 0,
  architecture_finalized: false,
  another_pilot_required: 'Pinellas',
  recommended_fl_c006:
    'FL-C006 — Miami-Dade Deterministic FDACS Reconciliation & County Evidence Qualification',
  recommended_fl_c006_rationale:
    'Public EnerGov roster is NEAR_FULL (unlike Broward PRA_REQUIRED); rich enough for deterministic FDACS reconciliation and county evidence qualification next. Pinellas remains useful as Pilot #4 before generalized architecture lock — but choose MDC qualification as the single next county-track task per Phase 35 rich-data branch.',
};
summary.package_hash = sha({
  program: program.credential_primary_name,
  roster: rosterCompleteness.completeness_classification,
  issued: issuedLicenses.length,
  matchability: issuedCounts,
  lbt: lbtStats,
  canonical: canonicalCounts,
});
writeJson(join(NORM, 'fl-c005-summary.json'), summary);

console.log(
  JSON.stringify(
    {
      ok: true,
      task: 'FL-C005',
      mover_licenses: moverLicenses.length,
      issued: issuedLicenses.length,
      status_distribution: statusCounts,
      lbt_rows: lbtRecords.length,
      fdacs_matchability_issued: issuedCounts,
      fdacs_matchability_full_roster: fullCounts,
      lbt_crosswalk_stats: lbtStats,
      canonical_matchability_issued: canonicalCounts,
      anomalies: anomalies.length,
      provenance_files: provenanceFiles.length,
      google_places_api_requests: 0,
      consumer_pii_committed: 0,
      production_writes: false,
      recommended_fl_c006: summary.recommended_fl_c006,
    },
    null,
    2
  )
);
