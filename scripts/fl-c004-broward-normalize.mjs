/**
 * FL-C004 — Broward County mover regulatory staging (research only).
 * Builds normalized staging from verified official program/forms evidence.
 * No production writes. No Google Places/API calls.
 *
 * Public mover roster was NOT found online → completeness = PRA_REQUIRED.
 * Field inventory is APPLICATION_SCHEMA_PUBLIC (not a published roster sample).
 */
import { createHash } from 'crypto';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const NORM = resolve('data/county-regulatory/fl/broward/normalized');
const META = resolve('data/county-regulatory/fl/broward/meta');
mkdirSync(NORM, { recursive: true });
mkdirSync(META, { recursive: true });

const RETRIEVED_AT = new Date().toISOString();
const ORIGIN_MAIN = 'a381203beb61cb5a2a12f80ed007a672a204be31';
const C003_HEAD = '0af416b8d8d43f3b46703af38f039c438834eb04';

function writeJson(path, obj) {
  writeFileSync(path, JSON.stringify(obj, null, 2));
}
function sha(obj) {
  return createHash('sha256').update(JSON.stringify(obj)).digest('hex').slice(0, 16);
}

const program = {
  task: 'FL-C004',
  county: 'Broward',
  agency: 'Broward County Consumer Protection Division (Consumer Affairs Section)',
  agency_address: '1 N. University Drive, Suite 203, Plantation, FL 33324',
  agency_phone: '954-765-1700 / 954-519-1260 (Consumer Affairs forms)',
  agency_email: 'consumer@broward.org',
  hearings_email: 'ECP@broward.org',
  hearings_phone: '954-765-1210',
  citations_desk: 'Enforcement (Citations) 954-765-1700',
  credential_primary_name: "Mover's Registration / Mover Registration",
  credential_vehicle_name: 'Mover Permit (decal)',
  terminology_note:
    "Official forms use 'Mover Registration Application' and 'Mover Permit (decal)'. Narrative Consumer Affairs materials also say businesses must 'register annually for a license'. Prefer Registration + Permit (decal) as exact credential terms; do not casually collapse to a single 'license' label.",
  ordinance: 'Chapter 20-176.90 of the Broward County Code of Ordinances (Broward County Moving Ordinance)',
  geographic_scope:
    'Local moves beginning and ending in the South Florida tri-county area: Broward, Miami-Dade, or Palm Beach counties (for movers located in Broward County)',
  current_status: 'OPERATING',
  renewal_cycle: 'Annual; registrations and decals expire September 30',
  fees_observed: {
    annual_mover_registration_usd: 400,
    late_fee_usd: 30,
    mover_permit_decal_per_vehicle_usd: 75,
  },
  requires_fdacs_im:
    'Application checklist / program materials require FDACS Intrastate Moving License (IM) / Movers License issued by Florida Department of Agriculture & Consumer Services',
  enforcement_powers_documented: [
    'civil penalties',
    'revocation or suspension of license/registration',
    'citations',
    'hearings (Government Center West Hearing Room)',
    'Warning Notice / Citation / Notice of Violation / Notice of Intent to File Suit (regulated enforcement toolkit)',
  ],
  grandfathered_local_authority:
    'Consistent with Fla. Stat. §507.13 grandfathering of pre-2011 local mover ordinances (documented in FL-C001); Broward continues a local Moving Ordinance program as of 2026 official Consumer Affairs materials.',
  official_sources: [
    'https://www.broward.org/consumer',
    'https://www.broward.org/consumer/Forms',
    'https://www.browardcdn.org/api/public/content/ab1e699647fd4880b2c8441f1b7100ac?v=fec53c74',
    'https://www.browardcdn.org/api/public/content/de63c57b52674de8a38bf5d48636932a?v=29a96617',
  ],
  retrieved_at: RETRIEVED_AT,
};

const sources = {
  task: 'FL-C004',
  retrieved_at: RETRIEVED_AT,
  interfaces: [
    {
      source: 'Consumer Protection Division website',
      endpoint: 'https://www.broward.org/consumer',
      access_type: 'DOCUMENT_PUBLIC',
      format: 'HTML (Sitecore/Next.js)',
      notes: 'Program overview; regulated industries include movers; links to Forms, ePermits, complaints, enforcement PDFs.',
    },
    {
      source: 'Consumer Protection Forms — Movers accordion',
      endpoint: 'https://www.broward.org/consumer/Forms#accordion-movers',
      access_type: 'DOCUMENT_PUBLIC',
      format: 'HTML + PDF downloads',
      notes: 'Mover Registration Application; Tri-County Moving Disclosure Form. Updated Aug 13, 2026.',
    },
    {
      source: 'Mover Registration Application (official PDF)',
      endpoint:
        'https://www.browardcdn.org/api/public/content/de63c57b52674de8a38bf5d48636932a?v=29a96617',
      access_type: 'DOCUMENT_PUBLIC',
      format: 'PDF',
      notes: 'Primary schema source for registration + vehicle/decal fields.',
    },
    {
      source: 'Consumer Affairs program guide PDF',
      endpoint:
        'https://www.browardcdn.org/api/public/content/ab1e699647fd4880b2c8441f1b7100ac?v=fec53c74',
      access_type: 'DOCUMENT_PUBLIC',
      format: 'PDF',
      notes: 'Pages 28–30 document Movers program, Ch. 20-176.90, fees, application requirements.',
    },
    {
      source: 'Regulated Enforcement PDF',
      endpoint:
        'https://www.browardcdn.org/api/public/content/5c8b7809323c44d9990f5cb55a543e9d?v=76df4d1c',
      access_type: 'DOCUMENT_PUBLIC',
      format: 'PDF',
      notes: 'Hearings, citations, NOV toolkit; Movers listed among regulated industries.',
    },
    {
      source: 'Consumer Complaints PDF',
      endpoint:
        'https://www.browardcdn.org/api/public/content/620c5664bf5741028a074d2e4e98e7e2?v=dd5ffdf8',
      access_type: 'INTAKE_ONLY',
      format: 'PDF',
      notes: 'Describes filing complaints online / 311; mediation/investigation; citations against movers. No public historical disposition database documented.',
    },
    {
      source: 'ePermits OneStop',
      endpoint: 'https://www.broward.org/epermits',
      access_type: 'AUTHENTICATED_PORTAL',
      format: 'Web portal (dpepp.broward.org / access.broward.org)',
      notes:
        'Primarily building/environmental permits. ePermits A-Z Cards list Chauffeur Registration but NOT Mover Registration. Mover applications appear offline/appointment-based per Consumer Affairs guide.',
    },
    {
      source: 'ePermits A-Z Cards',
      endpoint:
        'https://www.browardcdn.org/api/public/content/468d512cdb5347c4a079cc1f68491b39?v=222d4080',
      access_type: 'DOCUMENT_PUBLIC',
      format: 'PDF',
      notes: 'No Mover Registration card found among online ePermit types.',
    },
    {
      source: 'Report A Complaint',
      endpoint: 'https://www.broward.org/ReportAComplaint',
      access_type: 'INTAKE_ONLY',
      format: 'HTML',
      notes: 'Complaint intake gateway; not a public history lookup.',
    },
    {
      source: 'Public Records Request',
      endpoint: 'https://www.broward.org/opengovernment/PRR',
      access_type: 'PRA',
      format: 'Web request system',
      notes: 'Preferred path for bulk registration/complaint/enforcement extracts.',
    },
    {
      source: 'Citizen Data Portal (ArcGIS Experience)',
      endpoint: 'https://experience.arcgis.com/experience/6cddf1062ab14cf3a11425e6d02c006a',
      access_type: 'OPEN_DATA_GENERAL',
      format: 'ArcGIS Experience',
      notes: 'County-wide data portal; not observed as a mover-registration roster source in FL-C004.',
    },
    {
      source: 'Municode — Broward Code Ch.20 (Moving Ordinance cite)',
      endpoint: 'https://library.municode.com/fl/broward_county/codes/code_of_ordinances',
      access_type: 'DOCUMENT_PUBLIC',
      format: 'HTML',
      notes: 'Official cite Chapter 20-176.90 from Consumer Affairs materials; Municode hosts Broward code.',
    },
  ],
};

// Field inventory from APPLICATION form (not published roster)
const fieldInventory = {
  task: 'FL-C004',
  inventory_basis: 'APPLICATION_SCHEMA_PUBLIC',
  completeness_classification: 'PRA_REQUIRED',
  note:
    'No public searchable/bulk mover roster was located. Fields below are those the official Mover Registration Application and Consumer Affairs program materials require applicants to provide / that the county issues. Coverage % against a live roster cannot be computed until PRA or public roster becomes available.',
  fields: [
    { field: 'legal_name_business', present_in_application: 'YES', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Mover Registration Application' },
    { field: 'dba_fictitious_name', present_in_application: 'YES', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Application + fictitious name docs requirement' },
    { field: 'credential_registration', present_in_application: 'YES', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: "Mover's Registration issued by county" },
    { field: 'status', present_in_application: 'IMPLIED', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Issued/renewed registration; Tri-County disclosure says consumers may call to determine current license status' },
    { field: 'issue_expiration_dates', present_in_application: 'YES', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Expire September 30 annually' },
    { field: 'physical_address', present_in_application: 'YES', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Application' },
    { field: 'mailing_address', present_in_application: 'LIKELY', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Application packet / certified mail issuance' },
    { field: 'phone', present_in_application: 'YES', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Application' },
    { field: 'email', present_in_application: 'YES', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Invoice emailed; application contact' },
    { field: 'website', present_in_application: 'UNKNOWN', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Not observed as required field on application form pages reviewed' },
    { field: 'owner_partner_director_officer', present_in_application: 'YES', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Application section; DL/Fed ID collected — public disclosure of personal IDs not confirmed' },
    { field: 'prior_mover_business_5yr', present_in_application: 'YES', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Application disclosure questions' },
    { field: 'enforcement_judgment_disclosures', present_in_application: 'YES', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Application yes/no questions + attachments' },
    { field: 'fdacs_im_license', present_in_application: 'YES', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Required copy of current FDACS Movers/IM License' },
    { field: 'vehicle_decal_permit', present_in_application: 'YES', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Mover Permit (decal) per vehicle' },
    { field: 'vehicle_vin', present_in_application: 'YES', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Permit and Vehicle Information table' },
    { field: 'vehicle_license_tag', present_in_application: 'YES', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Application' },
    { field: 'vehicle_gvw', present_in_application: 'YES', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Vehicle Gross Weight' },
    { field: 'vehicle_permit_number_last6', present_in_application: 'YES', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Permit # (Last 6 digits)' },
    { field: 'fleet_count', present_in_application: 'DERIVABLE', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Count of vehicle/decal lines × $75' },
    { field: 'insurance_indicators', present_in_application: 'YES', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'Cargo/BI-PD/GL/WC certificates required' },
    { field: 'local_business_tax_receipt', present_in_application: 'YES', present_in_public_lookup: 'NO_LOOKUP_FOUND', source: 'County (+ city if applicable) BTR required in packet' },
  ],
};

const roster = {
  task: 'FL-C004',
  completeness_classification: 'PRA_REQUIRED',
  public_roster_found: false,
  records: 0,
  active: null,
  inactive_expired_visibility: 'UNKNOWN_PUBLICLY',
  credential_coverage: null,
  unique_business_count: null,
  notes: [
    'No public bulk download of Broward mover registrations located.',
    'No public searchable mover lookup analogous to Palm Beach Companies/GetCompanies located.',
    'ePermits A-Z does not list Mover Registration as an online permit type (Chauffeur Registration is listed).',
    'Consumer Affairs materials state consumers may call to determine current license status — implies phone-based status check, not self-serve roster.',
    'PUBLICLY_ACQUIRED: program docs, application schema, enforcement/complaint process docs.',
    'PRA_REQUIRED_FOR_COMPLETE_BULK_DATA: current/historical registrations, vehicle/decal inventory, complaint dispositions, enforcement/hearing outcomes.',
  ],
  retrieved_at: RETRIEVED_AT,
};

const vehicleProfile = {
  task: 'FL-C004',
  availability: 'APPLICATION_REQUIRED_FIELDS_DOCUMENTED',
  access: 'PRA_OR_AUTHENTICATED_INTERNAL — not observed as public bulk/search',
  sample_full_pra: 'PRA_REQUIRED',
  fields_documented: [
    'Mover Permit (decal) fee per vehicle',
    'Current Decal',
    'Vehicle Vin #',
    'License Tag #',
    'Vehicle Gross Weight',
    'Permit # (Last 6 digits)',
    'vehicle registration copy requirement',
  ],
  relationship: 'One Mover Registration may have multiple vehicle decals; each vehicle requires $75 permit/decal; expire September 30 with registration.',
  pii_note: 'VIN/tag are business-operated vehicle identifiers; do not collect unnecessary personal vehicle data. No vehicle rows acquired publicly in FL-C004.',
};

const complaintProfile = {
  task: 'FL-C004',
  availability: 'INTAKE_ONLY_PUBLIC',
  access_class: 'INTAKE_ONLY',
  records_public: 0,
  sample_or_full: 'PRA_REQUIRED for history',
  case_status_public: false,
  disposition_public: false,
  pii: 'Consumer complaints filed online/311; normalized staging contains no complaint rows; Consumer PII committed: 0',
  notes: [
    'Official materials: investigate/mediate unfair/deceptive practices and ordinance violations; may issue citations against movers.',
    'No Broward equivalent of Palm Beach Business Information Report (3-year allegation+disposition) was found publicly.',
    'Disposition taxonomy not publicly published as a structured code table (unlike PBC GetResolutions).',
  ],
};

const enforcementProfile = {
  task: 'FL-C004',
  nov_citations: 'DOCUMENTED_PROCESS — Warning Notice; Citation; Notice of Violation; Notice of Intent to File Suit',
  hearings: 'DOCUMENTED — Government Center West Hearing Room; clerk 954-765-1210; ECP@broward.org',
  fines: 'Civil penalties referenced; schedule may appear in Code Enforcement Ch. 8½ (Municode search hit)',
  suspension_revocation: 'DOCUMENTED for Moving Ordinance violators',
  final_action: 'PRA_REQUIRED for structured final orders / outcomes extract',
  access: 'DOCUMENT_PUBLIC for process; PRA_REQUIRED for case-level history',
  observations_acquired: 0,
  notes: [
    'ALLEGATION / NOTICE / CITATION / HEARING / FINAL_ACTION layers exist conceptually in county materials.',
    'No public case-level enforcement dataset acquired; do not invent FINAL_ENFORCEMENT_ACTION rows.',
  ],
};

const identityContact = {
  task: 'FL-C004',
  data_scope: 'APPLICATION_SCHEMA_ONLY',
  row_count: 0,
  fields_beyond_fdacs_potential: [
    'county Mover Registration credential',
    'vehicle-level decal/permit + VIN/tag/GVW',
    'owner/partner/director/officer disclosures',
    'prior mover business (5 years)',
    'enforcement/judgment disclosures on application',
    'local BTR linkage requirement',
  ],
  records: [],
};

const moverRegistrations = {
  task: 'FL-C004',
  completeness_classification: 'PRA_REQUIRED',
  row_count: 0,
  records: [],
  schema_example_from_application: {
    source_record_id_pattern: 'FL-BROWARD-MOVER-{registration_or_permit_id}',
    fields: [
      'business_name',
      'owners_partners_directors_officers[]',
      'fdacs_im_license_copy_required',
      'vehicles[].vin',
      'vehicles[].tag',
      'vehicles[].gvw',
      'vehicles[].permit_number_last6',
      'vehicles[].decal_current',
      'registration_fee',
      'decal_fees',
      'expiration_date_september_30',
    ],
  },
  retrieved_at: RETRIEVED_AT,
};

const vehiclePermits = {
  task: 'FL-C004',
  completeness_classification: 'PRA_REQUIRED',
  row_count: 0,
  records: [],
  schema_example_from_application: {
    source_record_id_pattern: 'FL-BROWARD-VEHICLE-DECAL-{permit_or_vin}',
    fields: ['vin', 'license_tag', 'gvw', 'permit_number_last6', 'decal_status', 'parent_mover_registration'],
  },
};

const complaintObs = {
  task: 'FL-C004',
  access_class: 'INTAKE_ONLY',
  row_count: 0,
  records: [],
  consumer_pii_committed: 0,
};

const enforcementObs = {
  task: 'FL-C004',
  access_class: 'DOCUMENT_PUBLIC_PROCESS_ONLY',
  row_count: 0,
  records: [],
  deduplication_note: 'No case rows acquired; event-key design deferred until structured data exist.',
};

const matchability = {
  task: 'FL-C004',
  mode: 'OFFLINE_READ_ONLY',
  production_writes: false,
  google_places_api_requests: 0,
  county_records_available: 0,
  counts: {
    DETERMINISTIC_MATCH: 0,
    REVIEW_REQUIRED: 0,
    NOT_FOUND: 0,
    INSUFFICIENT_EVIDENCE: 0,
  },
  note:
    'No public Broward mover roster rows available to match. Matchability is INSUFFICIENT_PUBLIC_ROSTER — not a statement that Broward movers are unregistered with FDACS. Application explicitly requires FDACS IM license, so future PRA roster should be highly matchable via IM number.',
  expected_strong_signal_if_pra_delivered: 'explicit FDACS IM number on county registration',
};

const canonicalMatchability = {
  task: 'FL-C004',
  deterministic_county_fdacs_with_canonical_company: 0,
  deterministic_county_fdacs_without_canonical_company: 0,
  note: 'Secondary metric only; no Broward evidence attached. Requires public/PRA roster first.',
};

const anomalies = {
  task: 'FL-C004',
  records: [
    {
      type: 'NO_PUBLIC_ROSTER',
      classification: 'CROSS_SOURCE_REVIEW_REQUIRED',
      note: 'Unlike Palm Beach, Broward does not expose a public Companies API/roster. County-only enrichment cannot be measured at scale until PRA.',
    },
    {
      type: 'APPLICATION_REQUIRES_FDACS_IM',
      classification: 'ARCHITECTURE_SIGNAL',
      note: 'County registration packet requires FDACS IM — deterministic state crosswalk should be strong once roster is obtained.',
    },
  ],
};

const comparison = {
  task: 'FL-C004',
  dimensions: [
    { dimension: 'mover_credential', palm_beach: 'Moving Business Permit (MV####)', broward: "Mover's Registration + Mover Permit (decal)" },
    { dimension: 'roster_accessibility', palm_beach: 'SEARCHABLE_PUBLIC API (NEAR_FULL active)', broward: 'PRA_REQUIRED (no public roster found)' },
    { dimension: 'status', palm_beach: 'Public LICENSED statuses', broward: 'Call-to-verify status documented; no self-serve roster' },
    { dimension: 'owner_officer', palm_beach: 'Public contact name/title on roster', broward: 'Collected on application; not publicly listed' },
    { dimension: 'phone_email', palm_beach: 'Phone 100%; email via BIR', broward: 'Collected on application; not publicly listed' },
    { dimension: 'website', palm_beach: '58.5% on roster', broward: 'Not observed as required application field' },
    { dimension: 'fleet', palm_beach: 'Fleet total on roster', broward: 'Vehicle-level decals (richer if acquired)' },
    { dimension: 'vehicle_level_detail', palm_beach: 'Fleet count only publicly', broward: 'VIN/tag/GVW/decal on application — PRA for inventory' },
    { dimension: 'complaints', palm_beach: 'BIR searchable (~3yr) with case IDs', broward: 'Intake/mediation documented; history PRA' },
    { dimension: 'dispositions', palm_beach: '44-code official catalog + BIR coverage', broward: 'No public disposition code table found' },
    { dimension: 'enforcement', palm_beach: 'BIR admin actions/citations sampleable', broward: 'Citations/hearings process public; case data PRA' },
    { dimension: 'final_actions', palm_beach: 'Rarely explicit in sample', broward: 'Hearing/final order path exists; not bulk public' },
    { dimension: 'historical_depth', palm_beach: 'BIR ~3 years; historical permits PRA', broward: 'Unknown publicly; PRA target' },
    { dimension: 'bulk_accessibility', palm_beach: 'API bounded search near-full', broward: 'Low — documents strong, data weak' },
    { dimension: 'engineering_complexity', palm_beach: 'Medium (API + BIR)', broward: 'High for public path; PRA unlocks value' },
  ],
};

const pagePotential = {
  task: 'FL-C004',
  live_page_changed: false,
  metrics: {
    broward_regulated_movers: { value: null, label: 'UNKNOWN_PUBLICLY — PRA_REQUIRED' },
    active_credentials: { value: null, label: 'UNKNOWN_PUBLICLY — PRA_REQUIRED' },
    deterministic_fdacs_associations: { value: 0, label: 'INSUFFICIENT_PUBLIC_ROSTER' },
    fleet_vehicle_coverage: { value: null, label: 'PRA_REQUIRED for vehicle inventory' },
  },
  sample_only: {
    complaint_observations: { value: 0, label: 'SAMPLE_ONLY / none public' },
    enforcement_observations: { value: 0, label: 'SAMPLE_ONLY / none public' },
  },
  extrapolation_forbidden: true,
};

const profileDesign = {
  task: 'FL-C004',
  published: false,
  trust_score_connection: false,
  sections: [
    { id: 'broward_credential', title: 'Broward County mover credential', fields: ["Mover's Registration", 'status', 'expiration (Sep 30)', 'regulator', 'source'] },
    { id: 'broward_owner_contact', title: 'County-reported owner/contact', fields: ['owners/officers (if public/PRA)', 'phone', 'address'] },
    { id: 'broward_vehicle', title: 'Vehicle/fleet information', fields: ['decal/permit', 'VIN/tag where public', 'GVW', 'fleet count'] },
    { id: 'broward_disputes', title: 'Consumer dispute history', fields: ['explicit window', 'allegation vs disposition'] },
    { id: 'broward_enforcement', title: 'County enforcement history', fields: ['citation', 'hearing', 'suspension/revocation', 'final order'] },
  ],
};

const architecture = {
  task: 'FL-C004',
  shared_concepts_observed: [
    'county regulatory credential',
    'identity observation',
    'owner/officer',
    'complaint',
    'disposition',
    'enforcement event',
  ],
  broward_specific_concepts: [
    'vehicle permit/decal as first-class credential component',
    'hearing process as explicit enforcement stage',
    'license/registration suspension/revocation as documented ordinance outcome',
    'mandatory FDACS IM attachment at county application time',
  ],
  architecture_finalized: false,
  production_schema_created: false,
};

const networkReuse = {
  task: 'FL-C004',
  architecture_implemented: false,
  note: 'Broward Consumer Protection regulates chauffeurs, VFH, medical transport, motor vehicle repair/body, movers, towing/immobilization — potential later reuse for Contractor/Senior/Insurance TrustHubs. Catalog only; no non-mover ingestion.',
  potential_later_reuse: ['ContractorTrustHub', 'SeniorTrustHub', 'InsuranceTrustHub', 'other Move counties'],
};

const summary = {
  task: 'FL-C004',
  status: 'COMPLETE',
  origin_main_observed: ORIGIN_MAIN,
  stacked_on_c003: C003_HEAD,
  publicly_acquired: [
    'program verification',
    'application schema',
    'vehicle/decal schema',
    'complaint intake characterization',
    'enforcement/hearing process characterization',
  ],
  pra_required_for_complete_bulk_data: true,
  roster_completeness: 'PRA_REQUIRED',
  mover_registration_rows: 0,
  vehicle_permit_rows: 0,
  complaint_rows: 0,
  enforcement_rows: 0,
  fdacs_matchability: matchability.counts,
  google_places_api_requests: 0,
  production_writes: false,
  production_db_migrations: 0,
  consumer_pii_committed: 0,
  recommended_fl_c005:
    'FL-C005 — Miami-Dade County Mover Regulatory Acquisition & Staging',
  recommended_fl_c005_rationale:
    'Broward public access is document-rich but roster/complaint/enforcement-history poor (PRA-dependent). Do not force Broward qualification yet. Palm Beach PRA remains pending; acquire Miami-Dade public systems next to compare a third county before architecture decisions.',
};
summary.package_hash = sha({
  program: program.credential_primary_name,
  roster: roster.completeness_classification,
  matchability: matchability.counts,
});

writeJson(join(NORM, 'program-verification.json'), program);
writeJson(join(NORM, 'source-interfaces.json'), sources);
writeJson(join(NORM, 'field-inventory.json'), fieldInventory);
writeJson(join(NORM, 'roster-completeness.json'), roster);
writeJson(join(NORM, 'mover-registrations.json'), moverRegistrations);
writeJson(join(NORM, 'vehicle-permits.json'), vehiclePermits);
writeJson(join(NORM, 'vehicle-decal-profile.json'), vehicleProfile);
writeJson(join(NORM, 'identity-contact-observations.json'), identityContact);
writeJson(join(NORM, 'complaint-observations.json'), complaintObs);
writeJson(join(NORM, 'complaint-system-profile.json'), complaintProfile);
writeJson(join(NORM, 'enforcement-observations.json'), enforcementObs);
writeJson(join(NORM, 'enforcement-system-profile.json'), enforcementProfile);
writeJson(join(NORM, 'fdacs-matchability.json'), matchability);
writeJson(join(NORM, 'canonical-matchability.json'), canonicalMatchability);
writeJson(join(NORM, 'cross-source-anomalies.json'), anomalies);
writeJson(join(NORM, 'broward-vs-palm-beach.json'), comparison);
writeJson(join(NORM, 'county-page-potential-mock.json'), pagePotential);
writeJson(join(NORM, 'future-company-profile-evidence-design.json'), profileDesign);
writeJson(join(NORM, 'architecture-observations.json'), architecture);
writeJson(join(NORM, 'network-reuse-note.json'), networkReuse);
writeJson(join(NORM, 'fl-c004-summary.json'), summary);
writeJson(join(META, 'stack-vs-main-note.json'), {
  task: 'FL-C004',
  county_stack_preserved: true,
  rebase_performed: false,
  origin_main_at_task_start: ORIGIN_MAIN,
  c003_head: C003_HEAD,
  analysis_technically_valid_without_rebase: true,
});

console.log(JSON.stringify(summary, null, 2));
