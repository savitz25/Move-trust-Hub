/**
 * FL-C007 — Pinellas County mover regulatory staging (research only).
 * Builds normalized staging from already-acquired official evidence.
 * No production writes. No Google Places/API calls.
 *
 * Credential model: ORDINANCE_REGULATION_WITHOUT_SEPARATE_PUBLIC_CREDENTIAL
 * Roster class: NO_SEPARATE_ROSTER_IDENTIFIED
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
const RAW = resolve('data/county-regulatory/fl/pinellas/raw');
const NORM = resolve('data/county-regulatory/fl/pinellas/normalized');
const META = resolve('data/county-regulatory/fl/pinellas/meta');
mkdirSync(NORM, { recursive: true });
mkdirSync(META, { recursive: true });

const RETRIEVED_AT = new Date().toISOString();
const ORIGIN_MAIN = '52afb48b6e7976f16651f8b19fc89886caec56d6';
const C006_HEAD = '1aa496b0b36b1f7ffadd9db6285d90db8b14f8ef';
const COUNTY = 'Pinellas';
const AGENCY =
  'Pinellas County Office of Consumer Protection (Human Services Department)';
const RECOMMENDED_FL_C008 =
  'FL-C008 — Florida County Regulatory Architecture Discovery V1 & Stack Integration Plan';

function writeJson(path, obj) {
  writeFileSync(path, JSON.stringify(obj, null, 2) + '\n');
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
function readJson(path) {
  return JSON.parse(stripBom(readFileSync(path, 'utf8')));
}
function walkFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) walkFiles(path, out);
    else out.push(path);
  }
  return out;
}
function contentTypeFor(name) {
  if (name.endsWith('.pdf')) return 'application/pdf';
  if (name.endsWith('.json')) return 'application/json';
  if (name.endsWith('.html')) return 'text/html';
  if (name.endsWith('.txt')) return 'text/plain';
  return 'application/octet-stream';
}

// --- Load raw seeds / complaint artifacts ---
const fdacsUniverse = existsSync(join(RAW, 'fdacs-pinellas-geography-sample-universe.json'))
  ? readJson(join(RAW, 'fdacs-pinellas-geography-sample-universe.json'))
  : { count: 0, records: [] };
const sampleBusinesses = existsSync(join(RAW, 'complaint-search-sample-businesses.json'))
  ? readJson(join(RAW, 'complaint-search-sample-businesses.json'))
  : { n: 0, records: [] };
const parsedComplaintSample = existsSync(join(RAW, 'complaint-sample-moving-partial-parsed.json'))
  ? readJson(join(RAW, 'complaint-sample-moving-partial-parsed.json'))
  : null;

const complaintPdfFiles = walkFiles(RAW).filter((p) =>
  /^complaint-pdf-.*\.pdf$/i.test(basename(p))
);

function parseComplaintPdfZero(path) {
  const txtPath = path.replace(/\.pdf$/i, '.txt');
  const text = existsSync(txtPath)
    ? readFileSync(txtPath, 'utf8')
    : '';
  const nameMatch = basename(path).match(/^complaint-pdf-(.+)\.pdf$/i);
  const searchName = nameMatch
    ? nameMatch[1].replace(/([a-z])([A-Z])/g, '$1 $2').replace(/And/g, 'and')
    : 'UNKNOWN';
  // Empty Accela report: headers present, no RECORD ID data rows
  const hasRecordIdHeader = /RECORD\s*ID/i.test(text);
  const blankTotals =
    /Number of Records:\s*$/m.test(text) ||
    /Number of Records:\s*\n/i.test(text) ||
    /Total Number of Records:\s*$/m.test(text) ||
    /Total Number of Records:\s*\n/i.test(text);
  const dataRowLike = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(
      (l) =>
        l &&
        !/^RECORD/i.test(l) &&
        !/^DATE/i.test(l) &&
        !/^OPENED/i.test(l) &&
        !/^CLOSED/i.test(l) &&
        !/^BUSINESS/i.test(l) &&
        !/^ASSOCIATED/i.test(l) &&
        !/^Number of Records/i.test(l) &&
        !/^Total Number/i.test(l) &&
        !/^Page \d+/i.test(l) &&
        !/^\d{1,2}\/\d{1,2}\/\d{4}/.test(l) // page footer date alone is not a case row
    );
  // Accela zero-result PDFs still print a page footer date; exclude pure date/time footers
  const nonFooter = dataRowLike.filter(
    (l) => !/^\d{1,2}\/\d{1,2}\/\d{4}\s+\d{1,2}:\d{2}\s*(am|pm)/i.test(l)
  );
  const zero =
    (hasRecordIdHeader && (blankTotals || nonFooter.length === 0)) ||
    nonFooter.length === 0;
  return {
    artifact: basename(path),
    search_business_name: searchName,
    search_term_as_submitted: searchName.replace(/\s+/g, ''),
    zero_result: zero,
    public_columns_observed: [
      'RECORD ID',
      'DATE OPENED',
      'DATE CLOSED',
      'BUSINESS NAME',
      'ASSOCIATED NAMES',
      'RECORD STATUS',
    ],
    disposition_column_present: false,
    record_status_is_disposition_like: false,
    consumer_pii_present: false,
  };
}

const pdfAnalyses = complaintPdfFiles.map((path) => {
  const base = parseComplaintPdfZero(path);
  if (/partial-Moving/i.test(basename(path))) {
    return {
      ...base,
      zero_result: false,
      search_business_name: 'Moving',
      search_type: 'PARTIAL_NAME',
      cases_in_report: parsedComplaintSample?.total_records_reported || 24,
      record_status_values_observed: parsedComplaintSample?.unique_record_statuses || [],
      record_status_is_disposition_like: true,
      note: 'Partial-name Moving search returned 24 complaint rows; RECORD STATUS holds disposition-like official values.',
    };
  }
  return base;
});
const searchesWithArtifact = pdfAnalyses.length;
const nonzeroSearches = pdfAnalyses.filter((p) => !p.zero_result).length;
const zeroSearches = pdfAnalyses.filter((p) => p.zero_result).length;
const complaintCaseRows = Array.isArray(parsedComplaintSample?.records)
  ? parsedComplaintSample.records
  : [];
const dispositionLikeStatuses = [
  ...new Set(complaintCaseRows.map((r) => r.record_status).filter(Boolean)),
];

// --- Provenance ---
const provenanceFiles = [];
for (const path of walkFiles(RAW)) {
  const name = basename(path);
  const st = statSync(path);
  const rel = relative(ROOT, path).replace(/\\/g, '/');
  let sourceUrl = 'https://pinellas.gov/department/consumer-protection/';
  if (/complaint-history/i.test(name)) {
    sourceUrl = 'https://pinellas.gov/services/find-a-business-complaint-history/';
  } else if (/faq/i.test(name)) {
    sourceUrl = 'https://pinellas.gov/'; // FAQ under Consumer Protection topic
  } else if (/moving-ordinance/i.test(name)) {
    sourceUrl = 'https://pinellas.gov/moving-ordinance/';
  } else if (/municode/i.test(name)) {
    sourceUrl =
      'https://library.municode.com/fl/pinellas_county/codes/code_of_ordinances?nodeId=PTIIPICOCO_CH42COPR_ARTVIIIMO';
  } else if (/complaint-pdf/i.test(name)) {
    sourceUrl =
      'https://aca-prod.accela.com/PINELLAS/Report/ReportParameter.aspx?module=ConsumerProt&reportID=31870&reportType=LINK_REPORT_LIST';
  } else if (/fdacs/i.test(name)) {
    sourceUrl = 'offline:fdacs-legacy-im-active.json (Pinellas municipality filter)';
  }
  provenanceFiles.push({
    original_filename: name,
    relative_path: rel,
    source_agency: /fdacs/i.test(name) ? 'FDACS (offline seed only)' : AGENCY,
    source_url: sourceUrl,
    retrieval_timestamp: RETRIEVED_AT,
    content_type: contentTypeFor(name),
    file_size: st.size,
    sha256: sha256File(path),
    access_method: name.endsWith('.pdf')
      ? 'HTTP_GET_OFFICIAL_ACCELA_PDF_OR_PAGE'
      : name.endsWith('.json')
        ? 'OFFLINE_SEED_OR_SAMPLE_MANIFEST'
        : 'HTTP_GET_OFFICIAL_PAGE',
    modified: false,
  });
}

const provenance = {
  task: 'FL-C007',
  county: COUNTY,
  agency: AGENCY,
  retrieved_at: RETRIEVED_AT,
  google_places_api_requests: 0,
  production_writes: false,
  consumer_pii_committed: 0,
  access_method:
    'OFFICIAL_PUBLIC_PAGES_MUNICODE_ACCELA_COMPLAINT_REPORT_SAMPLE_ONLY',
  files: provenanceFiles,
};
writeJson(join(META, 'raw-provenance.json'), provenance);

writeJson(join(META, 'stack-vs-main-note.json'), {
  task: 'FL-C007',
  county_stack_preserved: true,
  rebase_performed: false,
  origin_main_at_task_start: ORIGIN_MAIN,
  c006_head: C006_HEAD,
  analysis_technically_valid_without_rebase: true,
  note: 'Stacked on FL-C006 head; Pinellas acquisition is Pilot #4 pattern discovery (no public mover credential roster to qualify).',
});

// --- Program verification ---
const program = {
  task: 'FL-C007',
  county: COUNTY,
  agency: AGENCY,
  agency_address: '14250 49th St N Suite 1000 Rm 2, Clearwater, FL 33762',
  agency_phone: '727-464-6200',
  agency_email: 'consumer@pinellas.gov',
  agency_org_note:
    'Office of Consumer Protection is within Human Services. Ordinance text historically references Department of Justice and Consumer Services.',
  credential_model: 'ORDINANCE_REGULATION_WITHOUT_SEPARATE_PUBLIC_CREDENTIAL',
  credential_primary_name: 'NONE — no separate public mover license/registration/permit',
  credential_vehicle_name: 'NONE_OBSERVED',
  terminology_note:
    "Official Consumer Protection page lists Moving under Monitoring, not Licensing. Licensing covers bingo, adult use, and high-prescribing clinics. CapHome 'Apply for or Renew a License' ConsumerProt types are bingo/adult use etc — NOT movers.",
  ordinance:
    'Pinellas County Code Chapter 42 Article VIII "Pinellas County Moving Ordinance" (Ord. 98-18; amended 02-84), sections 42-356–42-368 (42-369 Reserved)',
  geographic_scope:
    'HHG moves originating in Pinellas terminating in Hillsborough/Pasco/Pinellas OR originating in Hillsborough/Pasco terminating in Pinellas',
  current_status: 'OPERATING',
  renewal_cycle: 'NOT_APPLICABLE_NO_CREDENTIAL',
  fees_observed: null,
  requires_fdacs_im:
    'NOT_OBSERVED_AS_COUNTY_CREDENTIAL_PREREQUISITE — county does not issue a separate mover credential; FDACS IM remains state-level. FDACS movers with Pinellas cities used ONLY as Accela complaint-search seeds because no county mover roster exists.',
  enforcement_powers_documented: [
    'civil enforcement authority (42-368)',
    'criminal enforcement authority (42-368)',
    'complaint mediation / Consumer Protection investigation (agency FAQ)',
  ],
  grandfathered_local_authority:
    'Consistent with Fla. Stat. §507.13 grandfathering of pre-2011 local mover ordinances (FL-C001). Pinellas continues behavioral Moving Ordinance regulation without a separate public credential/roster as of 2026 official materials.',
  official_sources: [
    'https://pinellas.gov/department/consumer-protection/',
    'https://pinellas.gov/moving-ordinance/',
    'https://pinellas.gov/services/find-a-business-complaint-history/',
    'https://library.municode.com/fl/pinellas_county/codes/code_of_ordinances?nodeId=PTIIPICOCO_CH42COPR_ARTVIIIMO',
    'https://aca-prod.accela.com/PINELLAS/Report/ReportParameter.aspx?module=ConsumerProt&reportID=31870&reportType=LINK_REPORT_LIST',
  ],
  retrieved_at: RETRIEVED_AT,
};

const sources = {
  task: 'FL-C007',
  retrieved_at: RETRIEVED_AT,
  interfaces: [
    {
      source: 'Office of Consumer Protection home',
      endpoint: 'https://pinellas.gov/department/consumer-protection/',
      access_type: 'DOCUMENT_PUBLIC',
      format: 'HTML',
      notes:
        'Moving listed under Monitoring (not Licensing). Contact phone/email/address. Human Services parent department.',
    },
    {
      source: 'Moving Ordinance landing page',
      endpoint: 'https://pinellas.gov/moving-ordinance/',
      access_type: 'DOCUMENT_PUBLIC',
      format: 'HTML',
      notes:
        'Consumer tips: written estimate required; move must begin or end in Pinellas from Pinellas/Pasco/Hillsborough. Links Municode Article VIII.',
    },
    {
      source: 'Municode — Ch.42 Art.VIII Moving',
      endpoint:
        'https://library.municode.com/fl/pinellas_county/codes/code_of_ordinances?nodeId=PTIIPICOCO_CH42COPR_ARTVIIIMO',
      access_type: 'DOCUMENT_PUBLIC',
      format: 'HTML / code text',
      notes:
        'Sections 42-356–42-368: estimates, contracts, disclosures, inventory, liability, civil/criminal enforcement. NO license/registration/permit/roster section.',
    },
    {
      source: 'Find a Business Complaint History (county landing)',
      endpoint: 'https://pinellas.gov/services/find-a-business-complaint-history/',
      access_type: 'DOCUMENT_PUBLIC',
      format: 'HTML',
      notes: 'States 5-year business complaint history searchable via Accela report link.',
    },
    {
      source: 'Accela Civic Platform — ConsumerProt complaint history report',
      endpoint:
        'https://aca-prod.accela.com/PINELLAS/Report/ReportParameter.aspx?module=ConsumerProt&reportID=31870&reportType=LINK_REPORT_LIST',
      access_type: 'SEARCHABLE_PUBLIC_FORM',
      format: 'Browser form → PDF report',
      notes:
        'Public form requires Business Name; returns PDF. CapHome: enter name or partial name; results include complaints filed within last five years. SAMPLE_ONLY bounded searches in this package.',
    },
    {
      source: 'Consumer Protection FAQ',
      endpoint: 'pinellas.gov Consumer Protection FAQ (raw/page-consumer-protection-faq.html)',
      access_type: 'DOCUMENT_PUBLIC',
      format: 'HTML',
      notes:
        'FAQ: Office will tell if complaints received and disposition; closed complaints maintained five years and may be reviewed upon request/phone. Public Accela PDF does NOT include disposition column — disposition = PRA/phone-assisted.',
    },
    {
      source: 'FDACS Pinellas geography sample universe (offline seed)',
      endpoint: 'raw/fdacs-pinellas-geography-sample-universe.json',
      access_type: 'OFFLINE_SEED_NOT_COUNTY_ROSTER',
      format: 'JSON',
      notes: `FDACS IM movers filtered to Pinellas municipalities (n=${fdacsUniverse.count}). Used ONLY as Accela search seeds because county publishes no mover roster. NOT Pinellas county identity observations.`,
    },
    {
      source: 'Public Records Request (draft only)',
      endpoint: 'docs/county-regulatory/fl/pra-drafts/pinellas-county-mover-regulatory-pra.md',
      access_type: 'PRA_DRAFT_NOT_SUBMITTED',
      format: 'Markdown',
      notes: 'Draft refined in FL-C007; Submitted: NO.',
    },
  ],
};

const fieldInventory = {
  task: 'FL-C007',
  inventory_basis: 'ORDINANCE_REQUIRED_TRANSACTION_FIELDS',
  completeness_classification: 'NO_SEPARATE_ROSTER_IDENTIFIED',
  note:
    'No county mover application/credential schema exists publicly. Fields below are behavioral/transactional requirements from Pinellas Moving Ordinance §§42-362–42-367 (estimate/contract/disclosure/inventory/liability). Coverage % against a live roster cannot be computed — no roster.',
  fields: [
    {
      field: 'written_estimate',
      present_in_ordinance: 'YES',
      present_in_public_lookup: 'NO_ROSTER',
      source: '42-362 Estimates of moving costs',
    },
    {
      field: 'cargo_liability_insurance_disclosure',
      present_in_ordinance: 'YES',
      present_in_public_lookup: 'NO_ROSTER',
      source: '42-362',
    },
    {
      field: 'consumer_services_contact_on_estimate',
      present_in_ordinance: 'YES',
      present_in_public_lookup: 'NO_ROSTER',
      source: '42-362 (contact Consumer Services)',
    },
    {
      field: 'contract_for_service',
      present_in_ordinance: 'YES',
      present_in_public_lookup: 'NO_ROSTER',
      source: '42-363 Contract for service and disclosure statement required',
    },
    {
      field: 'disclosure_statement',
      present_in_ordinance: 'YES',
      present_in_public_lookup: 'NO_ROSTER',
      source: '42-363',
    },
    {
      field: 'charges_limited_to_written_estimate_rules',
      present_in_ordinance: 'YES',
      present_in_public_lookup: 'NO_ROSTER',
      source: '42-364',
    },
    {
      field: 'inventory',
      present_in_ordinance: 'YES',
      present_in_public_lookup: 'NO_ROSTER',
      source: '42-365',
    },
    {
      field: 'reasonable_dispatch',
      present_in_ordinance: 'YES',
      present_in_public_lookup: 'NO_ROSTER',
      source: '42-366',
    },
    {
      field: 'movers_liability_disclosure',
      present_in_ordinance: 'YES',
      present_in_public_lookup: 'NO_ROSTER',
      source: '42-367',
    },
    {
      field: 'county_mover_license_number',
      present_in_ordinance: 'NO',
      present_in_public_lookup: 'NO_ROSTER',
      source: 'No credential section in Art. VIII',
    },
    {
      field: 'county_registration_or_permit',
      present_in_ordinance: 'NO',
      present_in_public_lookup: 'NO_ROSTER',
      source: 'No credential section in Art. VIII',
    },
    {
      field: 'vehicle_decal',
      present_in_ordinance: 'NO',
      present_in_public_lookup: 'NO_ROSTER',
      source: 'Not observed',
    },
  ],
};

const roster = {
  task: 'FL-C007',
  completeness_classification: 'NO_SEPARATE_ROSTER_IDENTIFIED',
  public_roster_found: false,
  records: 0,
  active: null,
  inactive_expired_visibility: 'NOT_APPLICABLE_NO_ROSTER',
  credential_coverage: null,
  unique_business_count: null,
  notes: [
    'Credential model: ORDINANCE_REGULATION_WITHOUT_SEPARATE_PUBLIC_CREDENTIAL.',
    'Municode Art. VIII has no license/registration/permit/roster section.',
    'Consumer Protection lists Moving under Monitoring, not Licensing.',
    'PRA may still ask whether any internal regulated-business list is maintained despite no public roster.',
    'FDACS Pinellas-municipality movers (n=' +
      fdacsUniverse.count +
      ') are SAMPLE search seeds only — not a Pinellas county roster.',
  ],
  retrieved_at: RETRIEVED_AT,
};

const moverRegulatoryRecords = {
  task: 'FL-C007',
  completeness_classification: 'NO_SEPARATE_ROSTER_IDENTIFIED',
  credential_model: 'ORDINANCE_REGULATION_WITHOUT_SEPARATE_PUBLIC_CREDENTIAL',
  row_count: 0,
  records: [],
  schema_note:
    'No county-issued mover credential rows exist to stage. Ordinance regulates estimates/contracts/disclosures/inventory/liability/enforcement without a separate public credential.',
  retrieved_at: RETRIEVED_AT,
};

const complaintProfile = {
  task: 'FL-C007',
  vendor: 'Accela Civic Platform (Pinellas County Access Portal / CapHome)',
  availability: 'SEARCHABLE_PUBLIC_NAME_FORM_PDF',
  access_class: 'SAMPLE_ONLY_PUBLIC_HISTORY',
  public_report_url:
    'https://aca-prod.accela.com/PINELLAS/Report/ReportParameter.aspx?module=ConsumerProt&reportID=31870&reportType=LINK_REPORT_LIST',
  county_landing: 'https://pinellas.gov/services/find-a-business-complaint-history/',
  history_window_years: 5,
  history_window_evidence: [
    'County landing: search the 5-year business complaint history',
    'FAQ: Closed complaints are maintained for five years and may be reviewed upon request',
    'CapHome: Database results include complaints filed within the last five years',
  ],
  access_mechanics:
    'Public browser form requiring Business Name (or partial name); returns PDF report',
  public_pdf_columns: [
    'RECORD ID',
    'DATE OPENED',
    'DATE CLOSED',
    'BUSINESS NAME',
    'ASSOCIATED NAMES',
    'RECORD STATUS',
  ],
  disposition_on_public_pdf:
    'RECORD_STATUS_FIELD_CARRIES_DISPOSITION_LIKE_VALUES — not a separate Disposition column',
  disposition_access:
    'PUBLIC_VIA_RECORD_STATUS_ON_ACCELA_PDF for observed official values; FAQ also offers phone/request path. Bulk export of full 5-year universe still PRA_REQUIRED.',
  case_status_public: true,
  disposition_public_bulk: false,
  disposition_public_sample: true,
  sample_or_full: 'SAMPLE_ONLY',
  records_public_in_package: complaintCaseRows.length,
  official_record_status_values_observed: dispositionLikeStatuses,
  search_seeds_note:
    'Sample universe = FDACS movers with Pinellas municipality cities (n=' +
    fdacsUniverse.count +
    '); bounded sample businesses prepared (n=' +
    sampleBusinesses.n +
    '). Used ONLY as search seeds because no county mover roster exists. Partial-name Moving search additionally returned a mover-related complaint cohort.',
  pii: 'Consumer PII committed: 0. Public PDF is business-level; ASSOCIATED NAMES retained only as official business-associated identity fields, never as complainant PII.',
  notes: [
    'Zero-result Accela PDFs classify as NO_COMPLAINT_RECORD_RETURNED_FOR_SEARCH_WINDOW — never COMPLAINT_FREE.',
    'RECORD STATUS on PDF carries disposition-like official values (Resolved, No Compromise, Referred, Judicial System, Closed-Criminal, Closed: Resolved-Adjusted).',
    'Complaint existence / RECORD STATUS is never proof of misconduct.',
    'Closed-Criminal / CP-CRM prefix is a criminal-boundary observation only — no criminal scraping.',
  ],
};

const zeroResultSemantics = {
  task: 'FL-C007',
  rule: 'NO_COMPLAINT_RECORD_RETURNED_FOR_SEARCH_WINDOW',
  forbidden_label: 'COMPLAINT_FREE',
  history_window_years: 5,
  explanation:
    'An Accela PDF with headers but no complaint data rows means no complaint records were returned for that business-name search within the public five-year window. It does NOT prove the business is complaint-free historically, under other name spellings, or outside the window.',
  applied_to_artifacts: pdfAnalyses
    .filter((p) => p.zero_result)
    .map((p) => p.artifact),
};

const complaintObs = {
  task: 'FL-C007',
  access_class: 'SAMPLE_ONLY_PUBLIC_HISTORY',
  sample_only: true,
  consumer_pii_committed: 0,
  searches_with_pdf_artifact: searchesWithArtifact,
  nonzero_searches: nonzeroSearches,
  zero_result_searches: zeroSearches,
  case_rows: complaintCaseRows.length,
  row_count: complaintCaseRows.length,
  date_span: {
    earliest_opened: '9/27/21',
    latest_opened: '12/2/25',
    note: 'From SAMPLE_ONLY partial-name Moving Accela PDF (retrieved 2026-08-21)',
  },
  records: complaintCaseRows,
  search_log: pdfAnalyses.map((p) => ({
    search_business_name: p.search_business_name,
    artifact: p.artifact,
    result_class: p.zero_result
      ? 'NO_COMPLAINT_RECORD_RETURNED_FOR_SEARCH_WINDOW'
      : 'COMPLAINT_ROWS_PRESENT',
    cases_in_report: p.cases_in_report || (p.zero_result ? 0 : null),
    disposition_column_present: false,
    record_status_is_disposition_like: !!p.record_status_is_disposition_like,
    consumer_pii_present: false,
  })),
  sample_seeds_prepared: {
    fdacs_pinellas_geography_universe: fdacsUniverse.count,
    complaint_search_sample_businesses: sampleBusinesses.n,
    label:
      'FDACS_SEED_UNIVERSE_ONLY — not Pinellas county roster; not treated as completed searches unless Accela PDF artifact retained',
  },
  note:
    'SAMPLE_ONLY. Exact-name searches for some FDACS Pinellas movers returned empty PDFs. Partial-name Moving search returned 24 mover-related complaint rows. Do not extrapolate sample rates to all Pinellas movers.',
};

const complaintDispositions = {
  task: 'FL-C007',
  access_class: 'PUBLIC_SAMPLE_VIA_RECORD_STATUS',
  sample_only: true,
  row_count: complaintCaseRows.filter((r) => r.record_status).length,
  official_values: dispositionLikeStatuses,
  advisory_grouping_only: {
    note: 'Advisory conceptual buckets only — preserve exact official RECORD STATUS strings',
    RESOLVED_LIKE: ['Resolved', 'Closed: Resolved-Adjusted'],
    NO_AGREEMENT_LIKE: ['No Compromise'],
    REFERRED_LIKE: ['Referred', 'Judicial System'],
    CRIMINAL_BOUNDARY_LIKE: ['Closed-Criminal'],
  },
  records: complaintCaseRows
    .filter((r) => r.record_status)
    .map((r) => ({
      source_record_id: r.source_record_id,
      record_id: r.record_id,
      business_name: r.business_name,
      official_record_status: r.record_status,
      date_opened: r.date_opened,
      date_closed: r.date_closed,
      evidence_class: 'COMPLAINT_DISPOSITION',
      misconduct_inference: 'FORBIDDEN',
      source: 'Accela ConsumerProt public PDF RECORD STATUS field',
    })),
  note:
    'Public Accela PDF has no separate Disposition column; RECORD STATUS carries disposition-like official values observed in SAMPLE_ONLY. Full-universe disposition catalog/export remains PRA_REQUIRED. Never treat complaint/disposition as misconduct proof.',
};

const complaintBusinessMatchability = {
  task: 'FL-C007',
  mode: 'FAIL_CLOSED',
  production_writes: false,
  google_places_api_requests: 0,
  rule: 'NAME_ONLY_FROM_COMPLAINT_PDF_INSUFFICIENT',
  sample_businesses_in_complaint_pdf: [
    ...new Set(complaintCaseRows.map((r) => r.business_name).filter(Boolean)),
  ].length,
  counts: {
    DETERMINISTIC_BUSINESS_LINK: 0,
    REVIEW_REQUIRED: complaintCaseRows.length,
    NOT_FOUND: 0,
  },
  note:
    'Complaint PDF business names alone are insufficient for DETERMINISTIC_BUSINESS_LINK to FDACS/canonical companies (fail closed). REVIEW_REQUIRED for all SAMPLE_ONLY complaint respondents until address/phone/IM corroboration exists.',
};

const enforcementProfile = {
  task: 'FL-C007',
  ordinance_authority: '42-368 civil and criminal enforcement',
  nov_citations: 'AUTHORITY_EXISTS — case-level public bulk not observed',
  hearings: 'NOT_DETAILED_ON_PUBLIC_MOVER_PAGES',
  fines: 'Civil penalties via ordinance; schedule not extracted as mover-specific public table in this package',
  suspension_revocation: 'NOT_APPLICABLE_NO_CREDENTIAL_TO_SUSPEND',
  criminal_referrals:
    'Boundary only — do not scrape criminal data. REFERRAL_RECORDED only if explicit in source. Not observed in SAMPLE_ONLY Accela PDFs.',
  final_action: 'PRA_REQUIRED for structured final orders / outcomes extract',
  access: 'DOCUMENT_PUBLIC for ordinance authority; PRA_REQUIRED for case-level enforcement/final actions',
  observations_acquired: 0,
  caphome_license_note:
    "CapHome 'Apply for or Renew a License' under ConsumerProt covers bingo/adult use/etc — NOT movers.",
  notes: [
    'Public company-level enforcement event rows acquired: 0.',
    'Complaint RECORD STATUS is COMPLAINT_OBSERVATION layer unless explicit final-order language appears.',
  ],
};

const enforcementObs = {
  task: 'FL-C007',
  access_class: 'DOCUMENT_PUBLIC_AUTHORITY_ONLY',
  row_count: 0,
  records: [],
  consumer_pii_committed: 0,
  deduplication_note: 'No enforcement event rows acquired.',
};

const identityContact = {
  task: 'FL-C007',
  data_scope: 'EMPTY_COUNTY_IDENTITY — no Pinellas public mover identity roster',
  row_count: 0,
  records: [],
  note:
    'County does not publish a mover identity/credential roster. FDACS Pinellas-municipality seeds (n=' +
    fdacsUniverse.count +
    ') and complaint-search-sample-businesses (n=' +
    sampleBusinesses.n +
    ') are documented in raw/ as SAMPLE search universe only — not staged here as Pinellas county identity-contact observations.',
  sample_search_universe_paths: [
    'data/county-regulatory/fl/pinellas/raw/fdacs-pinellas-geography-sample-universe.json',
    'data/county-regulatory/fl/pinellas/raw/complaint-search-sample-businesses.json',
  ],
};

const fdacsMatchability = {
  task: 'FL-C007',
  mode: 'NOT_APPLICABLE_NO_PUBLIC_ROSTER',
  production_writes: false,
  google_places_api_requests: 0,
  county_records_available: 0,
  counts: {
    DETERMINISTIC_MATCH: 0,
    REVIEW_REQUIRED: 0,
    NOT_FOUND: 0,
    INSUFFICIENT_EVIDENCE: 0,
  },
  classification: 'NOT_APPLICABLE_NO_PUBLIC_ROSTER',
  note:
    'No Pinellas county mover credential roster to match against FDACS. FDACS geography filter was used only to seed Accela complaint searches.',
};

const canonicalMatchability = {
  task: 'FL-C007',
  mode: 'NOT_APPLICABLE_NO_PUBLIC_ROSTER',
  deterministic_county_fdacs_with_canonical_company: 0,
  deterministic_county_fdacs_without_canonical_company: 0,
  counts: {
    CANONICAL_LINKED: 0,
    STATE_RECORD_ONLY: 0,
    COUNTY_ONLY: 0,
    REVIEW_REQUIRED: 0,
    NOT_APPLICABLE: 0,
  },
  note: 'N/A — no county credential rows to link. Secondary metric deferred.',
};

const incrementalValue = {
  task: 'FL-C007',
  data_scope_notes: {
    credential_roster: 'NO_SEPARATE_ROSTER_IDENTIFIED / row_count 0',
    ordinance_behavioral_regulation: 'PUBLIC — Art. VIII estimate/contract/disclosure/inventory/liability/enforcement',
    complaints: 'SAMPLE_ONLY Accela name/partial-name→PDF (5yr); RECORD STATUS = disposition-like values',
    enforcement: 'Authority documented (42-368); 0 public event rows',
  },
  value_beyond_fdacs: [
    'Confirms Monitoring (not Licensing) local mover regulation pattern',
    'Documents Accela Civic Platform 5-year public complaint-history interface',
    'Documents FAQ vs public-PDF disposition gap (PRA/phone for dispositions)',
    'Zero-result semantics for name-search complaint reports',
    'Four-county comparison input for architecture discovery',
  ],
  not_value: [
    'No county credential inventory to enrich profiles at scale',
    'No deterministic FDACS↔county credential crosswalk possible from public Pinellas sources',
    'SAMPLE_ONLY complaint searches must not be extrapolated to market rates',
  ],
  engineering_cost_signal:
    'Pinellas does not earn county-credential enrichment cost. Its primary incremental value is ordinance+complaint-history pattern discovery for FL-C008 architecture — not Pinellas qualification.',
};

const fourCounty = {
  task: 'FL-C007',
  counties: ['Palm Beach', 'Broward', 'Miami-Dade', 'Pinellas'],
  dimensions: [
    {
      dimension: 'mover_credential',
      palm_beach: 'Moving Business Permit (MV####)',
      broward: "Mover's Registration + Mover Permit (decal)",
      miami_dade: 'Moving Business Registration / License (MR-#####)',
      pinellas: 'NONE — ORDINANCE_REGULATION_WITHOUT_SEPARATE_PUBLIC_CREDENTIAL',
    },
    {
      dimension: 'roster_accessibility',
      palm_beach: 'SEARCHABLE_PUBLIC API (NEAR_FULL active)',
      broward: 'PRA_REQUIRED (no public roster found)',
      miami_dade: 'PUBLIC EnerGov search (NEAR_FULL_ACTIVE_ROSTER)',
      pinellas: 'NO_SEPARATE_ROSTER_IDENTIFIED',
    },
    {
      dimension: 'status',
      palm_beach: 'Public LICENSED statuses',
      broward: 'Call-to-verify; no self-serve roster',
      miami_dade: 'Public multi-status (Issued, Expired, OOB, …)',
      pinellas: 'N/A — no county credential status',
    },
    {
      dimension: 'phone_email',
      palm_beach: 'Phone 100%; email via BIR',
      broward: 'Application-collected; not public roster',
      miami_dade: 'Application-collected; not on public EnerGov roster',
      pinellas: 'Agency contact public; no mover roster contact fields',
    },
    {
      dimension: 'owner_officer',
      palm_beach: 'Public contact name/title on roster',
      broward: 'Application-collected; not public',
      miami_dade: 'Application-collected; not public',
      pinellas: 'Not applicable — no credential application/roster',
    },
    {
      dimension: 'vehicle_level_detail',
      palm_beach: 'Fleet count only publicly',
      broward: 'VIN/tag/GVW/decal on application — PRA',
      miami_dade: 'VIN/tag/GVW/YMM on application — not public',
      pinellas: 'Not observed / not applicable',
    },
    {
      dimension: 'complaints',
      palm_beach: 'BIR searchable (~3yr) with case IDs',
      broward: 'Intake/mediation; history PRA',
      miami_dade: 'Consumer Mediation Center INTAKE_ONLY; history PRA',
      pinellas: 'Accela public name/partial→PDF (5yr) SAMPLE_ONLY; RECORD STATUS disposition-like',
    },
    {
      dimension: 'dispositions',
      palm_beach: '44-code official catalog + BIR coverage',
      broward: 'No public disposition code table found',
      miami_dade: 'No public disposition catalog found',
      pinellas: 'FAQ/phone/PRA; NOT on public Accela PDF columns',
    },
    {
      dimension: 'enforcement_citations',
      palm_beach: 'BIR admin actions/citations sampleable',
      broward: 'Citations/hearings process public; case data PRA',
      miami_dade: 'Citation authority documented; no public bulk roster',
      pinellas: '42-368 civil/criminal authority; 0 public event rows',
    },
    {
      dimension: 'fdacs_match_signals_public',
      palm_beach: 'Name + phone (+ address) strong',
      broward: 'INSUFFICIENT_PUBLIC_ROSTER',
      miami_dade: 'Name + address only (no public phone/IM)',
      pinellas: 'NOT_APPLICABLE_NO_PUBLIC_ROSTER',
    },
    {
      dimension: 'bulk_accessibility',
      palm_beach: 'API bounded search near-full',
      broward: 'Low — documents strong, data weak',
      miami_dade: 'High for roster identity; low for contact/fleet/complaints',
      pinellas: 'Low for credentials (none); medium for complaint name-search PDFs',
    },
    {
      dimension: 'engineering_complexity',
      palm_beach: 'Medium (API + BIR)',
      broward: 'High for public path; PRA unlocks value',
      miami_dade: 'Medium — EnerGov + LBT open data; enrichment PRA',
      pinellas: 'Low credential engineering (N/A); complaint pattern reusable via Accela',
    },
    {
      dimension: 'primary_pilot_value',
      palm_beach: 'Rich public credential + BIR complaint/enforcement',
      broward: 'Application/vehicle schema + PRA-gated roster',
      miami_dade: 'EnerGov NEAR_FULL roster + LBT crosswalk',
      pinellas: 'Ordinance-without-credential + Accela 5yr complaint-history pattern',
    },
  ],
};

const architecture = {
  task: 'FL-C007',
  PATTERNS_CONVERGING: 'YES',
  FOUR_PILOTS_SUFFICIENT_FOR_ARCHITECTURE_DISCOVERY: 'YES',
  patterns_status: 'PATTERNS_CONVERGING',
  architecture_finalized: false,
  production_schema_created: false,
  pinellas_qualification_recommended: false,
  another_pilot_required: 'NO — four pilots sufficient for architecture discovery',
  note:
    'Palm Beach (API+BIR), Broward (docs/PRA-gated credential), Miami-Dade (EnerGov+LBT), and Pinellas (ordinance-without-credential + Accela complaint history) complete the Pilot #1–#4 set. Pinellas value is pattern discovery, not qualification (no public roster). Recommend FL-C008 architecture discovery & stack integration plan — NOT Pinellas qualification.',
  shared_concepts_observed: [
    'county regulatory credential (when present)',
    'ordinance behavioral regulation without credential (Pinellas)',
    'identity observation',
    'complaint intake',
    'complaint history window',
    'disposition (when public)',
    'enforcement / citation / civil-criminal authority',
    'FDACS IM crosswalk (when county roster exists)',
    'zero-result / not-found semantics',
  ],
  pinellas_specific_concepts: [
    'ORDINANCE_REGULATION_WITHOUT_SEPARATE_PUBLIC_CREDENTIAL',
    'Monitoring vs Licensing agency taxonomy',
    'Accela Civic Platform ConsumerProt name→PDF complaint history (5 years)',
    'FAQ disposition vs public PDF column gap',
    'NO_COMPLAINT_RECORD_RETURNED_FOR_SEARCH_WINDOW zero-result class',
    'FDACS geography seeds as complaint-search substitutes when no county roster',
  ],
  do_not_lock_yet: [
    'production county evidence schema (defer to FL-C008 plan)',
    'generalized multi-county Trust Score wiring',
    'assumption that every FL county exposes a mover credential roster',
  ],
  recommended_next: RECOMMENDED_FL_C008,
};

const pagePotential = {
  task: 'FL-C007',
  live_page_changed: false,
  title: 'Pinellas County moving market — INTERNAL DATA DESIGN MOCK',
  metrics: {
    pinellas_county_mover_credentials: {
      value: 0,
      label: 'NO_SEPARATE_ROSTER_IDENTIFIED',
    },
    active_credentials: {
      value: null,
      label: 'NOT_APPLICABLE — ordinance regulation without credential',
    },
    deterministic_fdacs_associations: {
      value: 0,
      label: 'NOT_APPLICABLE_NO_PUBLIC_ROSTER',
    },
    complaint_history_interface: {
      value: 'Accela 5yr name→PDF',
      label: 'PUBLIC_SAMPLE_ONLY',
    },
  },
  sample_only: {
    complaint_searches_with_pdf: {
      value: searchesWithArtifact,
      label: 'SAMPLE_ONLY',
    },
    complaint_case_rows: {
      value: complaintCaseRows.length,
      label: 'SAMPLE_ONLY from partial-name Moving search',
    },
    enforcement_observations: {
      value: 0,
      label: 'none public',
    },
  },
  extrapolation_forbidden: true,
};

const profileDesign = {
  task: 'FL-C007',
  published: false,
  trust_score_connection: false,
  sections: [
    {
      id: 'pinellas_regulatory_posture',
      title: 'Pinellas Moving Ordinance posture',
      fields: [
        'ordinance cite (Ch.42 Art.VIII)',
        'Monitoring (not Licensing)',
        'geographic applicability',
        'no separate county credential',
        'source',
      ],
    },
    {
      id: 'pinellas_transaction_requirements',
      title: 'Required consumer transaction disclosures',
      fields: [
        'written estimate',
        'contract for service',
        'disclosure statement',
        'inventory',
        'liability disclosure',
      ],
    },
    {
      id: 'pinellas_disputes',
      title: 'Consumer complaint history (Accela)',
      fields: [
        '5-year window',
        'RECORD ID',
        'dates opened/closed',
        'RECORD STATUS',
        'RECORD STATUS (disposition-like official values)',
        'ASSOCIATED NAMES',
        '5-year window; exact-name may return empty',
      ],
    },
    {
      id: 'pinellas_enforcement',
      title: 'County enforcement authority',
      fields: [
        'civil (42-368)',
        'criminal (42-368)',
        'Closed-Criminal / CP-CRM boundary only',
        'final actions PRA',
      ],
    },
  ],
  presentation_note:
    'Do not display a fake Pinellas mover license number. Prefer ordinance-compliance / complaint-history framing over credential badges. Never treat complaint RECORD STATUS as misconduct proof.',
};

const networkReuse = {
  task: 'FL-C007',
  architecture_implemented: false,
  note:
    'Pinellas Consumer Protection Accela ConsumerProt module also supports licensing workflows for bingo/adult use/etc and complaint history for businesses generally — potential later reuse for other TrustHubs. Catalog only; no non-mover ingestion in FL-C007.',
  potential_later_reuse: [
    'ContractorTrustHub',
    'SeniorTrustHub',
    'InsuranceTrustHub',
    'other Move counties',
  ],
  accela_complaint_history_pattern_reusable: true,
  ordinance_without_credential_pattern_reusable: true,
};

const summary = {
  task: 'FL-C007',
  status: 'COMPLETE',
  origin_main_observed: ORIGIN_MAIN,
  stacked_on_c006: C006_HEAD,
  credential_model: 'ORDINANCE_REGULATION_WITHOUT_SEPARATE_PUBLIC_CREDENTIAL',
  roster_completeness: 'NO_SEPARATE_ROSTER_IDENTIFIED',
  publicly_acquired: [
    'program verification (Monitoring vs Licensing)',
    'Municode Art. VIII ordinance schema (estimate/contract/disclosure/inventory/liability/enforcement)',
    'Accela Civic Platform complaint-history interface characterization (5-year)',
    'SAMPLE_ONLY complaint PDF search artifact(s)',
    'zero-result semantics',
    'four-county comparison + architecture pressure test',
  ],
  pra_required_for: [
    'internal regulated-business lists if any',
    'bulk machine-readable complaint history export (business-level only)',
    'complete disposition catalog / full 5-year universe',
    'enforcement/final actions beyond RECORD STATUS sample',
  ],
  pra_submitted: false,
  mover_regulatory_record_rows: 0,
  complaint_searches_with_pdf: searchesWithArtifact,
  complaint_nonzero_searches: nonzeroSearches,
  complaint_case_rows: complaintCaseRows.length,
  complaint_disposition_rows: complaintCaseRows.filter((r) => r.record_status).length,
  official_record_status_values: dispositionLikeStatuses,
  enforcement_rows: 0,
  fdacs_matchability: 'NOT_APPLICABLE_NO_PUBLIC_ROSTER',
  PATTERNS_CONVERGING: 'YES',
  FOUR_PILOTS_SUFFICIENT_FOR_ARCHITECTURE_DISCOVERY: 'YES',
  google_places_api_requests: 0,
  production_writes: false,
  production_db_migrations: 0,
  consumer_pii_committed: 0,
  recommended_fl_c008: RECOMMENDED_FL_C008,
  recommended_fl_c008_rationale:
    'Four pilots complete. Pinellas has no public roster to qualify; its value is ordinance+complaint-history pattern discovery. Next task is architecture discovery V1 & stack integration plan — not Pinellas qualification.',
};
summary.package_hash = sha({
  credential_model: program.credential_model,
  roster: roster.completeness_classification,
  searches: searchesWithArtifact,
  cases: complaintCaseRows.length,
  dispositions: 0,
});

writeJson(join(NORM, 'program-verification.json'), program);
writeJson(join(NORM, 'source-interfaces.json'), sources);
writeJson(join(NORM, 'roster-completeness.json'), roster);
writeJson(join(NORM, 'mover-regulatory-records.json'), moverRegulatoryRecords);
writeJson(join(NORM, 'field-inventory.json'), fieldInventory);
writeJson(join(NORM, 'complaint-system-profile.json'), complaintProfile);
writeJson(join(NORM, 'complaint-history-observations.json'), complaintObs);
writeJson(join(NORM, 'complaint-dispositions.json'), complaintDispositions);
writeJson(join(NORM, 'zero-result-semantics.json'), zeroResultSemantics);
writeJson(join(NORM, 'enforcement-observations.json'), enforcementObs);
writeJson(join(NORM, 'enforcement-system-profile.json'), enforcementProfile);
writeJson(join(NORM, 'identity-contact-observations.json'), identityContact);
writeJson(join(NORM, 'fdacs-matchability.json'), fdacsMatchability);
writeJson(join(NORM, 'complaint-business-matchability.json'), complaintBusinessMatchability);
writeJson(join(NORM, 'canonical-matchability.json'), canonicalMatchability);
writeJson(join(NORM, 'incremental-value.json'), incrementalValue);
writeJson(join(NORM, 'four-county-comparison.json'), fourCounty);
writeJson(join(NORM, 'architecture-pressure-test.json'), architecture);
writeJson(join(NORM, 'county-page-potential-mock.json'), pagePotential);
writeJson(join(NORM, 'future-company-profile-evidence-design.json'), profileDesign);
writeJson(join(NORM, 'network-reuse-note.json'), networkReuse);
writeJson(join(NORM, 'fl-c007-summary.json'), summary);

console.log(
  JSON.stringify(
    {
      ok: true,
      task: 'FL-C007',
      searches: searchesWithArtifact,
      nonzero: nonzeroSearches,
      cases: complaintCaseRows.length,
      dispositions: complaintCaseRows.filter((r) => r.record_status).length,
      recommended: RECOMMENDED_FL_C008,
      package_hash: summary.package_hash,
    },
    null,
    2
  )
);
