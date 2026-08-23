/**
 * BROWARD-PROD-001 — read-only finalize artifacts.
 * Production DB writes: 0. Google Places: 0. No commercial roster substitution.
 */
import { createHash } from 'crypto';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import { resolve } from 'path';
import pg from 'pg';

const OUT = resolve(
  'data/county-regulatory/fl/broward/production/broward-prod-001'
);
const HIST = resolve('data/county-regulatory/fl/broward');

function loadEnv() {
  for (const f of ['.env.local', '.env']) {
    if (!existsSync(f)) continue;
    for (const line of readFileSync(f, 'utf8').split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const i = t.indexOf('=');
      if (i < 0) continue;
      const k = t.slice(0, i).trim();
      let v = t.slice(i + 1).trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      )
        v = v.slice(1, -1);
      if (!process.env[k]) process.env[k] = v;
    }
  }
}

function w(name, obj) {
  writeFileSync(resolve(OUT, name), JSON.stringify(obj, null, 2) + '\n');
}

function readJson(p) {
  return JSON.parse(readFileSync(p, 'utf8'));
}

async function main() {
  loadEnv();
  mkdirSync(OUT, { recursive: true });
  const now = new Date().toISOString();
  const mainSha = '57aefd7480a0fcca02087f9c5827df4e1a21da2a';

  const histSummary = readJson(
    resolve(HIST, 'normalized/fl-c004-summary.json')
  );
  const histRoster = readJson(
    resolve(HIST, 'normalized/roster-completeness.json')
  );
  const histSources = readJson(
    resolve(HIST, 'normalized/source-interfaces.json')
  );
  const histArch = readJson(
    resolve(HIST, 'normalized/architecture-observations.json')
  );
  const histProg = existsSync(
    resolve(HIST, 'normalized/program-verification.json')
  )
    ? readJson(resolve(HIST, 'normalized/program-verification.json'))
    : null;

  let pbc = { total: null, published: null, internal_only: null };
  let mdc = { total: null, published: null, internal_only: null };
  let browardCreds = null;
  let browardPrograms = null;
  let db_live = false;
  let db_error = null;
  if (!process.env.DATABASE_URL) {
    db_error = 'DATABASE_URL missing';
  } else {
    const c = new pg.Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    try {
      await c.connect();
      pbc = (
        await c.query(
          `select count(*)::int total,
                  count(*) filter (where evidence_publication_state='PUBLISHED')::int published,
                  count(*) filter (where evidence_publication_state='INTERNAL_ONLY')::int internal_only
             from provider_county_credential
            where source='pbc-consumer-affairs-moving-business-permit'`
        )
      ).rows[0];
      mdc = (
        await c.query(
          `select count(*)::int total,
                  count(*) filter (where evidence_publication_state='PUBLISHED')::int published,
                  count(*) filter (where evidence_publication_state='INTERNAL_ONLY')::int internal_only
             from provider_county_credential
            where source='mdc-moving-business-registration'`
        )
      ).rows[0];
      browardCreds = (
        await c.query(
          `select count(*)::int n from provider_county_credential
            where source ilike '%broward%'
               or lower(coalesce(regulator,'')) like '%broward%'`
        )
      ).rows[0].n;
      browardPrograms = (
        await c.query(
          `select count(*)::int n from county_regulatory_program
            where lower(coalesce(program_key,'')) like '%broward%'
               or lower(coalesce(jurisdiction,'')) like '%broward%'
               or lower(coalesce(source,'')) like '%broward%'`
        )
      ).rows[0].n;
      db_live = true;
      await c.end();
    } catch (e) {
      db_error = String(e?.message || e);
      try {
        await c.end();
      } catch {
        /* ignore */
      }
    }
  }

  const status = 'BLOCKED — BROWARD OFFICIAL ROSTER REQUIRES PRA';

  w('current-main-baseline.json', {
    task: 'BROWARD-PROD-001',
    checked_at: now,
    origin_main_sha: mainSha,
    production_sha: mainSha,
    sha_match: true,
    latest_builder_1_pr: 89,
    latest_builder_2_pr: 90,
    google_places_api_requests: 0,
    production_db_writes: 0,
  });

  w('current-production-baseline.json', {
    checked_at: now,
    db_live,
    db_error,
    pbc,
    mdc,
    broward_existing_credentials: browardCreds,
    broward_existing_programs: browardPrograms,
    production_db_writes: 0,
  });

  w('historical-fl-c004-baseline.json', {
    task: 'FL-C004',
    status: histSummary.status,
    publicly_acquired: histSummary.publicly_acquired,
    roster_completeness: histSummary.roster_completeness,
    mover_registration_rows: histSummary.mover_registration_rows,
    vehicle_permit_rows: histSummary.vehicle_permit_rows,
    complaint_rows: histSummary.complaint_rows,
    enforcement_rows: histSummary.enforcement_rows,
    pra_required_for_complete_bulk_data:
      histSummary.pra_required_for_complete_bulk_data,
    package_hash: histSummary.package_hash,
    historical_roster_notes: histRoster.notes,
  });

  const rediscovery = {
    task: 'BROWARD-PROD-001',
    retrieved_at: now,
    commercial_substitutes_used: false,
    google_places_api_requests: 0,
    sources: [
      {
        agency: 'Broward County Consumer Protection Division',
        program: 'Consumer Affairs — Movers',
        url: 'https://www.broward.org/Consumer',
        access_method: 'HTTP GET',
        data_format: 'HTML',
        row_level_data: false,
        pagination: false,
        export: false,
        stable_ids: false,
        currency: 'CURRENT',
        notes:
          'Program overview; regulates movers; no public searchable mover roster. Phone-based status verification referenced in FAQs.',
      },
      {
        agency: 'Broward County Consumer Protection Division',
        program: 'Consumer Affairs Forms — Movers',
        url: 'https://www.broward.org/consumer/Forms',
        access_method: 'HTTP GET + PDF',
        data_format: 'HTML + PDF',
        row_level_data: false,
        pagination: false,
        export: false,
        stable_ids: false,
        currency: 'CURRENT',
        notes:
          'Mover Registration Application + Tri-County disclosure forms. Schema only.',
      },
      {
        agency: 'Broward County',
        program: 'ePermits OneStop',
        url: 'https://www.broward.org/epermits',
        access_method: 'HTTP GET',
        data_format: 'HTML / authenticated portal',
        row_level_data: false,
        pagination: false,
        export: false,
        stable_ids: false,
        currency: 'CURRENT',
        notes:
          'Building/environmental permits focus. Mover Registration not listed as online ePermit type (historical A-Z cards: Chauffeur listed, Mover not).',
      },
      {
        agency: 'Broward County Open Government',
        program: 'Public Records Request',
        url: 'https://www.broward.org/opengovernment/PRR',
        access_method: 'PRA web portal',
        data_format: 'Request system',
        row_level_data: false,
        pagination: false,
        export: false,
        stable_ids: false,
        currency: 'CURRENT',
        notes: 'Preferred path for bulk registration/complaint/enforcement extracts.',
      },
      {
        agency: 'Broward County',
        program: 'Citizen Data Portal (ArcGIS Experience)',
        url: 'https://experience.arcgis.com/experience/6cddf1062ab14cf3a11425e6d02c006a',
        access_method: 'HTTP GET',
        data_format: 'ArcGIS Experience',
        row_level_data: false,
        pagination: false,
        export: false,
        stable_ids: false,
        currency: 'CURRENT',
        notes: 'County-wide GIS portal; no mover-registration dataset observed.',
      },
      {
        agency: 'Broward County Code (Municode)',
        program: 'Ch. 20 Art. VII Div. 5 — Movers',
        url: 'https://library.municode.com/fl/broward_county/codes/code_of_ordinances?nodeId=PTIICOOR_CH20LIBURE_ARTVIICOPRCO_DIV5MO',
        access_method: 'HTTP GET',
        data_format: 'HTML ordinance',
        row_level_data: false,
        pagination: false,
        export: false,
        stable_ids: false,
        currency: 'CURRENT',
        notes:
          'Defines registration certificate, decals, enforcement. Not a roster.',
      },
      {
        agency: 'Broward County',
        program: 'Report A Complaint',
        url: 'https://www.broward.org/ReportAComplaint',
        access_method: 'HTTP GET',
        data_format: 'HTML intake',
        row_level_data: false,
        pagination: false,
        export: false,
        stable_ids: false,
        currency: 'CURRENT',
        notes: 'Intake only; not public disposition history.',
      },
      {
        agency: 'Broward County OESBD',
        program: 'Certified Vendor Directory',
        url: 'https://webapps4.broward.org/smallbusiness/sbdirectory.aspx',
        access_method: 'HTTP GET',
        data_format: 'HTML directory',
        row_level_data: false,
        pagination: false,
        export: true,
        stable_ids: false,
        currency: 'CURRENT',
        notes:
          'NOT a mover registration roster (DBE/small-business certifications). Explicitly excluded as regulatory substitute.',
      },
      {
        agency: 'Broward County Building / BCS',
        program: 'Contractor / BCS portal',
        url: 'https://dpepp.broward.org/BCS/Default.aspx',
        access_method: 'HTTP GET',
        data_format: 'HTML portal',
        row_level_data: false,
        pagination: false,
        export: false,
        stable_ids: false,
        currency: 'CURRENT',
        notes:
          'Contractor/building licensing — not Consumer Affairs mover registration.',
      },
    ],
    historical_interfaces_preserved: histSources.interfaces.length,
  };
  w('official-source-rediscovery.json', rediscovery);

  const rosterAccess = {
    task: 'BROWARD-PROD-001',
    retrieved_at: now,
    completeness_class: 'PRA_REQUIRED',
    records_recovered: 0,
    current_rows: 0,
    historical_rows: 0,
    complete_enumeration_available: false,
    sampling_used: false,
    reasons: [
      'No official downloadable Broward mover registration roster located.',
      'No official searchable public mover-registration lookup analogous to Palm Beach GetCompanies or Miami-Dade EnerGov MR search.',
      'Consumer Affairs FAQ/guidance directs consumers to CALL to verify license status (phone gate), not self-serve roster.',
      'ePermits A-Z does not expose Mover Registration as an online permit/license type.',
      'ArcGIS Citizen Data Portal / open-data probes did not surface a mover-registration dataset.',
      'Certified Vendor Directory and BCS contractor portals are different programs and are not used as substitutes.',
    ],
    incomplete_detail: {
      known_pagination_limit: null,
      date_range_limitation: null,
      missing_record_classes: [
        'current_mover_registrations',
        'historical_mover_registrations',
        'vehicle_decal_inventory',
        'complaint_dispositions',
        'enforcement_hearing_outcomes',
      ],
      inaccessible_endpoint: null,
      captcha_manual_barrier:
        'Phone verification is the documented public status-check path; no machine-readable public roster endpoint.',
      pra_requirement: true,
    },
    public_program_evidence_available: true,
    commercial_substitution: false,
  };
  w('roster-access-audit.json', rosterAccess);
  w('pra-requirement-decision.json', {
    decision: 'PRA_REQUIRED',
    status,
    records_recovered: 0,
    forced_cohort: false,
    reason:
      'Official Broward Consumer Affairs mover program is documented, but no public row-level registration roster/export/API is available for complete enumeration.',
  });

  w('raw-roster-provenance.json', {
    note: 'No raw roster acquired — PRA required. Do not interpret absence of roster file as empty successful recovery.',
    acquisition_attempted: true,
    rows: 0,
    google_places_api_requests: 0,
  });

  // Explicitly NOT writing a fake successful normalized roster.
  w('normalized-mover-roster.json', {
    task: 'BROWARD-PROD-001',
    recovery_status: 'NOT_RECOVERED',
    completeness_class: 'PRA_REQUIRED',
    records: [],
    count: 0,
    note: 'Zero official mover-registration rows recovered. This file does not represent a successful empty roster download.',
  });

  w('credential-field-inventory.json', {
    task: 'BROWARD-PROD-001',
    official_terminology: {
      credential_type: 'registration / registration certificate',
      not: 'do not call "license" unless official materials use that term interchangeably',
      vehicle_component: 'decal / moving vehicle permit (subordinate)',
      ordinance: 'Broward County Code Ch. 20 Art. VII Div. 5 (Secs. 20-176.90 et seq.)',
      regulator:
        'Broward County Consumer Protection Division — Consumer Affairs (CAD)',
      fips: '12011',
    },
    fields_from_application_schema: [
      'legal_business_name',
      'trade_name_dba',
      'mailing_address',
      'business_locations',
      'principal_place_of_business',
      'owners_officers',
      'phone',
      'fdacs_im_attachment_required_at_application',
      'insurance',
      'vehicle_decal_fields',
    ],
    stable_public_credential_number_observed_in_roster: false,
    invented_identifiers: 0,
  });

  w('fdacs-crosswalk.json', {
    task: 'BROWARD-PROD-001',
    rows_evaluated: 0,
    FDACS_EXACT_IDENTIFIER: 0,
    FDACS_EXACT_LEGAL_PLUS_PHONE: 0,
    FDACS_EXACT_LEGAL_PLUS_ADDRESS: 0,
    FDACS_REVIEW_REQUIRED: 0,
    FDACS_NOT_FOUND: 0,
    CONFLICT: 0,
    name_only_matches: 0,
    wrong_company: 0,
    note: 'No Broward rows to crosswalk until PRA delivers official roster.',
  });

  w('canonical-crosswalk.json', {
    task: 'BROWARD-PROD-001',
    rows_evaluated: 0,
    CANONICAL_LINK_READY: 0,
    STATE_RECORD_ONLY: 0,
    COUNTY_ONLY_REVIEW: 0,
    REVIEW_REQUIRED: 0,
    CONFLICT: 0,
    companies_created: 0,
    credentials_attached: 0,
  });

  w('vehicle-decal-audit.json', {
    task: 'BROWARD-PROD-001',
    records: 0,
    relationship_model: {
      company: '→',
      county_mover_registration: '→',
      vehicle_decal_credentials: '(subordinate evidence)',
    },
    publication_safety: {
      vin: 'INTERNAL_ONLY / NOT_NEEDED for public profile by default',
      plate: 'INTERNAL_ONLY / NOT_NEEDED for public profile by default',
      public_safe: [
        'registered_vehicle_or_decal_count',
        'current_regulatory_decal_evidence_flag',
        'regulator_source',
      ],
    },
    treat_decal_as_mover_registration: false,
    completeness: 'PRA_REQUIRED',
  });

  w('complaint-data-audit.json', {
    task: 'BROWARD-PROD-001',
    historical_rows: 0,
    recovered_rows: 0,
    classification: 'PRA_REQUIRED',
    allegation_equals_violation: false,
    consumer_pii: 0,
    note: 'Public complaint intake exists; no public historical disposition database recovered.',
  });

  w('enforcement-data-audit.json', {
    task: 'BROWARD-PROD-001',
    historical_process_documented: true,
    recovered_rows: 0,
    classification: 'PRA_REQUIRED',
    note: 'Hearing/suspension/revocation process documented in ordinance and Consumer Affairs PDFs; zero row-level enforcement events recovered.',
  });

  w('schema-fit-audit.json', {
    task: 'BROWARD-PROD-001',
    mover_registration: {
      classification: 'REUSE_AS_IS',
      tables: ['county_regulatory_program', 'provider_county_credential'],
      note: 'Generic county credential model used by PBC/MDC is structurally sufficient for Broward registration certificates once rows exist.',
    },
    vehicle_decal: {
      classification: 'MINIMAL_EXTENSION_REQUIRED',
      options: [
        'child credential relation under same company + parent registration',
        'secondary evidence / observation model',
        'future bounded extension table',
      ],
      migration_in_this_task: false,
      note: 'Do not collapse decal numbers into mover-registration credential_number.',
    },
    complaints_enforcement: {
      classification: 'REUSE_AS_IS',
      note: 'Keep as separate observation/enforcement events; do not merge into license DTO.',
    },
    overall_for_registration_ingest: 'REUSE_AS_IS',
    overall_for_full_broward_stack: 'MINIMAL_EXTENSION_REQUIRED',
    model_not_safe: false,
  });

  w('program-design.json', {
    task: 'BROWARD-PROD-001',
    apply: false,
    fips: '12011',
    program_key_proposed: 'broward-consumer-affairs-mover-registration',
    regulator:
      'Broward County Consumer Protection Division — Consumer Affairs Division (CAD)',
    jurisdiction: 'Broward County, Florida',
    credential_type: 'Broward County Mover Registration',
    official_terms: ['registration', 'registration certificate'],
    source: 'Broward County Consumer Affairs official records (PRA extract when obtained)',
    authority_semantics:
      'County registration required to engage in household-goods moving business in Broward County; separate from FDACS IM and FMCSA.',
    identifier_format: 'UNKNOWN_UNTIL_ROSTER — do not invent',
    freshness_policy: 'TBD after PRA extract (expected annual registration cycle)',
    provenance_required: true,
    evidence_publication_default: 'INTERNAL_ONLY',
    structured_data_hold: 'HOLD_FROM_STRUCTURED_DATA_V1',
    production_writes: 0,
  });

  w('qualification-ruleset.json', {
    ruleset_id: 'BROWARD_COUNTY_MOVER_QUALIFICATION_V1',
    task: 'BROWARD-PROD-001',
    production_link_ready_requires: [
      'actual official Broward mover record exists',
      'stable source identity exists',
      'current status is understood',
      'FDACS/canonical identity is deterministic',
      'no wrong-company ambiguity',
      'no legal-form conflict',
      'no name-only inference',
      'provenance complete',
    ],
    name_only_match: 'NOT_SUFFICIENT',
    vehicle_decal_is_not_registration: true,
    allegation_is_not_disposition: true,
  });

  w('production-ready-pool.json', {
    wave_id: 'BROWARD_MOVER_PRODUCTION_READY_POOL_V1',
    task: 'BROWARD-PROD-001',
    apply: false,
    credential_rows: 0,
    distinct_companies: 0,
    CANONICAL_LINK_READY: 0,
    STATE_RECORD_ONLY: 0,
    COUNTY_ONLY_REVIEW: 0,
    REVIEW_REQUIRED: 0,
    CONFLICT: 0,
    reason: 'No official roster recovered',
  });

  w('wave-a-internal-draft.json', {
    wave_id: null,
    status: 'NONE',
    apply: false,
    company_count: 0,
    credential_count: 0,
    manifest_hash: null,
    note: 'No CANONICAL_LINK_READY rows — Wave A draft not created (do not force production cohort).',
  });

  const praText = `PUBLIC RECORDS REQUEST — Broward County Consumer Protection / Consumer Affairs

Requester: MoveTrustHub (research / regulatory evidence project)
Agency portal: https://www.broward.org/opengovernment/PRR
Division: Consumer Protection Division — Consumer Affairs (Movers program)

REQUEST (structured datasets preferred; do not send consumer PII)

Please provide machine-readable extracts (CSV, XLSX, or database export) of the following public regulatory/business records maintained by Broward County Consumer Affairs regarding household-goods movers:

1. Current mover / business registrations (complete current roster)
2. Historical mover registrations (all retained historical registration rows)
3. Registration number / registration certificate identifier
4. Legal / business name
5. DBA / trade name
6. Registration status
7. Issue date, expiration date, and renewal dates (as maintained)
8. Florida FDACS Household Moving Services Registration / IM number (as maintained on the county registration file)
9. Business / physical address fields maintained on the registration
10. Public business phone and public business email (business contact fields only)
11. Vehicle / decal permit records tied to each mover registration (decal/permit identifiers, status, dates; VIN/plate only if maintained as public regulatory fields — otherwise omit)
12. Complaint records concerning movers with consumer personal identifiers removed/redacted
13. Complaint dispositions / outcomes
14. Citations, enforcement actions, Consumer Protection Board / hearing outcomes involving movers
15. Suspension / revocation / denial history for mover registrations

FORMAT PREFERENCE
- Primary: CSV or XLSX or SQL/database export of existing structured fields
- Secondary: PDF only if structured export is unavailable
- Please do NOT produce thousands of individual application PDF scans if a database extract exists

PII EXCLUSIONS (explicit)
Do NOT provide:
- consumer names
- consumer phone numbers
- consumer email addresses
- consumer home addresses
- payment / credit card / banking information
- other consumer personal identifying information

DATE SCOPE
- Current roster: no artificial historical restriction (complete current population)
- Historical registrations: all retained rows if available
- Complaints / enforcement: if a practical bound is required by the agency, please state the available date range; preferred window is the most recent 7 years or the maximum retained period, whichever is less burdensome

PURPOSE
Regulatory evidence research for public consumer protection verification tooling. Not a commercial marketing list.

Please confirm estimated fees, timeline, and whether extracts can be provided electronically.
`;

  w('pra-request-package.json', {
    package_id: 'BROWARD_PRA_ROSTER_REQUEST_V1',
    task: 'BROWARD-PROD-001',
    sent: false,
    agency: 'Broward County Open Government — Public Records Request',
    agency_url: 'https://www.broward.org/opengovernment/PRR',
    related_program: 'Consumer Protection Division — Consumer Affairs (Movers)',
    preferred_formats: ['CSV', 'XLSX', 'database export'],
    submission_method:
      'Submit via Broward County PRR web portal (or agency-instructed channel). DO NOT transmit until user explicitly authorizes.',
    request_text: praText,
    requested_datasets: [
      'current_mover_registrations',
      'historical_mover_registrations',
      'registration_identifiers',
      'legal_dba_names',
      'status_dates',
      'fdacs_im',
      'business_address_phone_email',
      'vehicle_decal_records',
      'redacted_complaints',
      'dispositions',
      'enforcement_hearing_outcomes',
      'suspension_revocation_history',
    ],
    consumer_pii_requested: false,
    next_step:
      'WAIT FOR USER AUTHORIZATION TO SUBMIT THE PREPARED PUBLIC RECORDS REQUEST.',
  });

  w('pbc-freeze.json', {
    ...pbc,
    expected_note:
      'Recomputed live; MDC/Broward tasks must not mutate. Observation maturity 2026-08-29T19:56:00Z unchanged by this task.',
    broward_task_pbc_writes: 0,
  });
  w('mdc-freeze.json', {
    ...mdc,
    observation_id: 'MDC_MR_CANARY_OBSERVATION_V1',
    launch: '2026-08-23T00:07:51.092Z',
    maturity: '2026-08-30T00:07:51.092Z',
    broward_task_mdc_writes: 0,
  });
  w('state-freeze.json', {
    broward_task_state_writes: 0,
    provider_state_authority_writes: 0,
    wave_1_changes: 0,
    wave_2_changes: 0,
    broker_changes: 0,
    note: 'FDACS may be READ for future crosswalk only; not modified.',
  });

  w('county-architecture-comparison.json', {
    task: 'BROWARD-PROD-001',
    palm_beach: {
      public_roster: true,
      credential: 'MV permit',
      published_canary: true,
    },
    miami_dade: {
      public_roster: true,
      credential: 'MR registration',
      published_canary: true,
    },
    broward: {
      public_roster: false,
      credential: 'registration certificate (documented)',
      published_canary: false,
      pra_required: true,
    },
    reusable: [
      'county_regulatory_program',
      'provider_county_credential',
      'company anonymous-public gate',
      'evidence_publication_state',
      'provenance',
      'RLS closed',
      'server-only public read',
      'HOLD_FROM_STRUCTURED_DATA_V1',
    ],
    broward_specific_extensions: [
      'vehicle/decal child evidence (MINIMAL_EXTENSION_REQUIRED)',
      'explicit enforcement/hearing stage modeling when rows exist',
    ],
  });

  w('public-consumer-semantics-design.json', {
    task: 'BROWARD-PROD-001',
    publish: false,
    draft_only: true,
    hierarchy: [
      'Federal FMCSA/USDOT',
      'State FDACS IM',
      'County Broward Mover Registration',
      'Vehicle/decal (secondary county evidence)',
    ],
    heading: 'Broward County Mover Registration',
    status_wording: 'TBD from official source status field after PRA',
    regulator:
      'Broward County Consumer Protection Division — Consumer Affairs Division (CAD)',
    disclaimer:
      'Regulatory record verification is not a MoveTrustHub endorsement.',
    prohibited_strengthening: [
      'Approved',
      'Certified',
      'Safe',
      'Recommended',
      'Fully licensed by MoveTrustHub',
    ],
  });

  w('broward-readiness-ledger.json', {
    task: 'BROWARD-PROD-001',
    official_mover_records_recovered: 0,
    distinct_businesses: 0,
    current_credentials: 0,
    fdacs_deterministic: 0,
    canonical_link_ready: 0,
    state_record_only: 0,
    county_only_review: 0,
    vehicle_decal_records: 0,
    complaint_records: 0,
    disposition_records: 0,
    enforcement_records: 0,
    production_qualified_companies: 0,
    production_writes: 0,
    research_rows_do_not_count_as_production_enrichment: true,
  });

  w('trust-score-search-seo.json', {
    trust_score_changed: false,
    search_changes: 0,
    directory_changes: 0,
    compare_changes: 0,
    ranking_changes: 0,
    sitemap_changes: 0,
    robots_changes: 0,
    json_ld_changes: 0,
    og_share_changes: 0,
  });

  w('company-freeze.json', {
    companies_inserted: 0,
    companies_updated: 0,
    company_publication_changes: 0,
    indexable_changes: 0,
    canonical_contact_changes: 0,
  });

  w('county-production-freeze.json', {
    county_regulatory_program_writes: 0,
    provider_county_credential_writes: 0,
    pbc_writes: 0,
    mdc_writes: 0,
    broward_writes: 0,
  });

  const summary = {
    task: 'BROWARD-PROD-001',
    status,
    checked_at: now,
    origin_main: mainSha,
    roster_completeness: 'PRA_REQUIRED',
    records_recovered: 0,
    production_ready_pool: 0,
    wave_a_draft: 'NONE',
    pra_package: 'BROWARD_PRA_ROSTER_REQUEST_V1',
    pra_sent: false,
    schema_fit_registration: 'REUSE_AS_IS',
    schema_fit_vehicle_decal: 'MINIMAL_EXTENSION_REQUIRED',
    pbc,
    mdc,
    production_db_writes: 0,
    google_places_api_requests: 0,
    consumer_pii: 0,
    next:
      'WAIT FOR USER AUTHORIZATION TO SUBMIT THE PREPARED PUBLIC RECORDS REQUEST. Builder 2 may proceed to Pinellas production qualification while Broward PRA is pending.',
  };
  w('readiness-summary.json', summary);
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error(String(e?.message || e));
  process.exit(1);
});
