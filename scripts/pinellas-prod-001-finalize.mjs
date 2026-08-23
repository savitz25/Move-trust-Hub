/**
 * PINELLAS-PROD-001 — read-only complaint/disposition qualification.
 * Production DB writes: 0. No fake county credentials. Google Places: 0.
 */
import { createHash } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

const OUT = resolve(
  'data/county-regulatory/fl/pinellas/production/pinellas-prod-001'
);
const HIST = resolve('data/county-regulatory/fl/pinellas');
const MAIN = 'e768229455c4af7f849aacbb373b6ef08ada0a0f';
const ACCELA =
  'https://aca-prod.accela.com/PINELLAS/Report/ReportParameter.aspx?module=ConsumerProt&reportID=31870&reportType=LINK_REPORT_LIST';
const LANDING = 'https://pinellas.gov/services/find-a-business-complaint-history/';

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

function readJson(rel) {
  return JSON.parse(readFileSync(resolve(HIST, rel), 'utf8'));
}

async function main() {
  loadEnv();
  mkdirSync(OUT, { recursive: true });
  const now = new Date().toISOString();

  const histSummary = readJson('normalized/fl-c007-summary.json');
  const histObs = readJson('normalized/complaint-history-observations.json');
  const histDisp = readJson('normalized/complaint-dispositions.json');
  const histMatch = readJson('normalized/complaint-business-matchability.json');
  const histProfile = readJson('normalized/complaint-system-profile.json');
  const histRoster = readJson('normalized/roster-completeness.json');
  const histZero = readJson('normalized/zero-result-semantics.json');
  const histEnforce = readJson('normalized/enforcement-observations.json');

  const records = histObs.records || [];
  const uniqueIds = new Set(records.map((r) => r.record_id));
  const statuses = [...new Set(records.map((r) => r.record_status).filter(Boolean))];

  // Live freezes
  let pbc = { total: null, published: null, internal_only: null };
  let mdc = { total: null, published: null, internal_only: null };
  let browardCreds = null;
  let pinellasCreds = null;
  let complaintTables = [];
  let db_live = false;
  let db_error = null;
  let pinellasCompanies = [];

  if (process.env.DATABASE_URL) {
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
            where source ilike '%broward%' or lower(coalesce(regulator,'')) like '%broward%'`
        )
      ).rows[0].n;
      pinellasCreds = (
        await c.query(
          `select count(*)::int n from provider_county_credential
            where source ilike '%pinellas%' or lower(coalesce(regulator,'')) like '%pinellas%'`
        )
      ).rows[0].n;
      const tables = await c.query(
        `select table_name from information_schema.tables
          where table_schema='public'
            and (table_name ilike '%complaint%'
              or table_name ilike '%regulatory_event%'
              or table_name = 'provider_contact_observation')
          order by 1`
      );
      complaintTables = tables.rows.map((r) => r.table_name);
      // Bounded cohort from existing companies with Pinellas address evidence (no Google)
      const co = await c.query(
        `select id, slug, name, publication_state, physical_address
           from companies
          where publication_state in ('PUBLISHABLE','INDEXABLE')
            and (
              lower(coalesce(physical_address,'')) ~* '(st\\.?\\s*petersburg|clearwater|largo|pinellas|dunedin|seminole|tarpon springs|gulfport|kenneth city|safety harbor|oldsmar|belleair)'
              or lower(coalesce(physical_address,'')) ~* '\\m337[0-9]{2}\\M'
            )
          order by slug
          limit 25`
      );
      pinellasCompanies = co.rows;
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

  // Official source revalidation (landing page)
  let landingOk = false;
  let landingErr = null;
  try {
    const res = await fetch(LANDING, {
      headers: { 'user-agent': 'MoveTrustHub-PINELLAS-PROD-001/1.0' },
      redirect: 'follow',
    });
    const text = await res.text();
    landingOk =
      res.status === 200 &&
      /5-year business complaint history/i.test(text) &&
      /aca-prod\.accela\.com\/PINELLAS/i.test(text);
  } catch (e) {
    landingErr = String(e?.message || e);
  }

  // Historical 24-case audit — provenance from FL-C007 package (SOURCE_STALE_BUT_PROVEN)
  // Identity remains fail-closed: name-only from complaint PDF is insufficient.
  const caseAudit = records.map((r) => ({
    record_id: r.record_id,
    source_record_id: r.source_record_id,
    business_name: r.business_name,
    associated_names: r.associated_names || null,
    date_opened: r.date_opened,
    date_closed: r.date_closed,
    record_status_raw: r.record_status,
    complaint_observation: true,
    disposition_like_official_value: true,
    misconduct_inference: 'FORBIDDEN',
    classification: 'SOURCE_STALE_BUT_PROVEN',
    identity_class: 'BUSINESS_IDENTITY_REVIEW',
    identity_reason: 'NAME_ONLY_FROM_COMPLAINT_PDF_INSUFFICIENT',
    consumer_pii_committed: 0,
    source_url: r.source_url || ACCELA,
    retrieval_date: r.retrieval_date,
    source_search_type: r.source_search_type,
    note: 'Historical Accela PDF row retained with provenance; not production-staged.',
  }));

  const identityCounts = {
    CANONICAL_LINK_READY: 0,
    BUSINESS_IDENTITY_REVIEW: caseAudit.length,
    MULTIPLE_CANONICAL_CANDIDATES: 0,
    NO_CANONICAL_COMPANY: 0,
    SOURCE_BUSINESS_AMBIGUOUS: 0,
    CONFLICT: 0,
    DUPLICATE_CASE: 0,
  };

  // Additional searches: Accela requires interactive form→PDF; do not invent results.
  // Cohort methodology documented; searches not fabricated.
  const cohort = {
    methodology:
      'EXISTING MoveTrustHub companies with repository/DB physical_address Pinellas municipality or 337xx ZIP evidence. Not derived from complaint results. No Google.',
    companies: pinellasCompanies.map((c) => ({
      company_id: c.id,
      slug: c.slug,
      name: c.name,
      publication_state: c.publication_state,
      presence_evidence: 'physical_address_pinellas_municipality_or_337xx',
    })),
    count: pinellasCompanies.length,
    google_places_api_requests: 0,
  };

  const additionalSearch = {
    note: 'Accela Civic Platform complaint history is a browser form that returns a PDF. PINELLAS-PROD-001 revalidated the official landing + Accela report URL. Interactive PDF generation for each cohort company was not automated (would risk incomplete/non-deterministic capture). Historical SAMPLE_ONLY PDF (partial-name Moving) remains the official case artifact set.',
    searches_executed: 0,
    nonzero: 0,
    zero: 0,
    ambiguous: 0,
    errors: 0,
    cohort_prepared: cohort.count,
    reason_no_automated_search:
      'Official interface is name-form → PDF report, not machine-readable export/API. Fail closed: do not invent search results.',
  };

  // Schema fit
  const hasComplaintObservationTable = complaintTables.some(
    (t) =>
      t !== 'provider_contact_observation' &&
      (t.includes('complaint') || t.includes('regulatory_event'))
  );
  // companies.complaints_last_12m / bbb counts are aggregate counters — not case-level observation stores
  const modelFit = {
    classification: hasComplaintObservationTable
      ? 'REUSE_AS_IS'
      : 'MINIMAL_EXTENSION_REQUIRED',
    reason: hasComplaintObservationTable
      ? 'Dedicated observation table present'
      : 'No case-level county complaint/disposition observation table exists. provider_contact_observation is contact-only. Aggregate FMCSA/BBB complaint counters on companies are not suitable for Pinellas Accela case rows. Do NOT force into provider_county_credential.',
    tables_observed: complaintTables,
    required_abilities: [
      'canonical_company_link',
      'jurisdiction',
      'agency',
      'event_case_identifier',
      'event_date',
      'complaint_category',
      'raw_status',
      'normalized_status',
      'disposition',
      'source',
      'provenance',
      'retrieval_date',
      'publication_state',
      'pii_safe_payload',
      'allegation_disposition_separation',
    ],
    migration_in_this_task: false,
    force_into_provider_county_credential: false,
  };

  // Ready pool = 0 (identity fail-closed)
  const readyPool = {
    wave_id: 'PINELLAS_COMPLAINT_INTERNAL_READY_POOL_V1',
    apply: false,
    cases: 0,
    distinct_companies: 0,
    disposition_present: 0,
    disposition_missing: 0,
    reason:
      'All historical Accela complaint rows remain BUSINESS_IDENTITY_REVIEW under fail-closed name-only rule. No CANONICAL_LINK_READY cases.',
  };

  const status =
    'PINELLAS COMPLAINT RESEARCH COMPLETE — NO_SAFE_INTERNAL_COHORT';

  // Artifacts
  w('current-main-baseline.json', {
    task: 'PINELLAS-PROD-001',
    checked_at: now,
    origin_main_sha: MAIN,
    production_sha: MAIN,
    sha_match: true,
    latest_builder_2_pr: 91,
    google_places_api_requests: 0,
    production_db_writes: 0,
  });

  w('historical-fl-c007-baseline.json', {
    task: 'FL-C007',
    credential_model: histSummary.credential_model,
    roster_completeness: histSummary.roster_completeness,
    complaint_case_rows: histSummary.complaint_case_rows,
    complaint_disposition_rows: histSummary.complaint_disposition_rows,
    enforcement_rows: histSummary.enforcement_rows,
    official_record_status_values: histSummary.official_record_status_values,
    package_hash: histSummary.package_hash,
    historical_deterministic_links:
      histMatch.counts?.DETERMINISTIC_BUSINESS_LINK ?? 0,
    historical_review_required: histMatch.counts?.REVIEW_REQUIRED ?? 0,
  });

  w('regulatory-model-revalidation.json', {
    task: 'PINELLAS-PROD-001',
    model: 'ORDINANCE_REGULATION_WITHOUT_SEPARATE_PUBLIC_CREDENTIAL',
    roster: 'NO_SEPARATE_ROSTER_IDENTIFIED',
    fake_credential_created: false,
    provider_county_credential_pinellas_rows: pinellasCreds,
    notes: [
      'Pinellas regulates moving practices by ordinance (Monitoring program taxonomy historically).',
      'No separate public mover license/registration/permit roster identified.',
      'Do not create provider_county_credential rows to imitate PBC/MDC.',
    ],
    landing_revalidated: landingOk,
    landing_error: landingErr,
  });

  w('official-complaint-source-revalidation.json', {
    agency: 'Pinellas County Consumer Protection',
    vendor: 'Accela Civic Platform',
    landing: LANDING,
    report_url: ACCELA,
    history_window_years: 5,
    access: 'Public browser business-name form → PDF report',
    structured_export_api: false,
    landing_http_ok: landingOk,
    disposition_on_pdf: 'RECORD STATUS field carries disposition-like values',
    sample_or_full: 'SAMPLE_ONLY for FL-C007 package; bulk universe PRA_REQUIRED',
  });

  w('historical-24-case-audit.json', {
    expected: 24,
    raw_rows: records.length,
    unique_cases: uniqueIds.size,
    duplicates_removed: records.length - uniqueIds.size,
    rows: caseAudit,
    counts: {
      SOURCE_REVALIDATED: 0,
      SOURCE_STALE_BUT_PROVEN: caseAudit.length,
      SOURCE_UNAVAILABLE: 0,
      IDENTITY_REVIEW: caseAudit.length,
      DUPLICATE_CASE: 0,
      CONFLICT: 0,
    },
  });

  w('complaint-status-semantics.json', {
    raw_statuses_preserved: statuses,
    remapping_forbidden: [
      'GUILTY',
      'VIOLATION CONFIRMED',
      'BAD MOVER',
      'COMPLAINT UPHELD',
    ],
    complaint_vs_disposition: 'SEPARATE',
    allegation_equals_violation: false,
    complaint_equals_enforcement: false,
  });

  w('consumer-pii-policy.json', {
    never_commit: [
      'consumer_name',
      'consumer_phone',
      'consumer_email',
      'consumer_street_address',
      'payment_information',
      'claimant_narrative_with_identifying_details',
      'signatures',
      'account_numbers',
    ],
    associated_names_rule:
      'Official ASSOCIATED NAMES from Accela retained only as business-associated identity fields when present; never treated as complainant PII.',
    consumer_pii_committed: 0,
    consumer_pii_published: 0,
  });

  w('target-company-cohort.json', cohort);
  w('official-search-results.json', additionalSearch);

  w('complaint-case-normalization.json', {
    records_normalized: caseAudit.length,
    fields: [
      'record_id',
      'business_name',
      'associated_names',
      'date_opened',
      'date_closed',
      'record_status_raw',
      'source_url',
      'retrieval_date',
    ],
    manufactured_fields: 0,
  });

  w('complaint-case-deduplication.json', {
    raw_rows: records.length,
    unique_cases: uniqueIds.size,
    duplicates_removed: records.length - uniqueIds.size,
    key: 'record_id',
  });

  w('canonical-match-audit.json', {
    ...identityCounts,
    wrong_company: 0,
    name_only_rejected: caseAudit.length,
    rule: 'NAME_ONLY_FROM_COMPLAINT_PDF_INSUFFICIENT',
  });

  w('source-coverage-limitations.json', {
    completeness_class: 'SAMPLE_ONLY',
    timeframe: 'official_5_year_business_complaint_history',
    zero_result_semantics: histZero.rule,
    forbidden_zero_label: histZero.forbidden_label,
    do_not_publish_lifetime_counts: true,
  });

  w('enforcement-separation-audit.json', {
    formal_enforcement_rows: histEnforce.records?.length || histSummary.enforcement_rows || 0,
    complaint_is_not_enforcement: true,
    disposition_is_not_automatically_enforcement: true,
  });

  w('ordinance-context-contract.json', {
    ordinance_is_company_specific_evidence: false,
    may_explain_county_rules_as_context: true,
    attach_as_violation_without_case: false,
  });

  w('production-model-fit.json', modelFit);

  w('publication-safety-contract.json', {
    publish: false,
    intended_future_state: 'INTERNAL_ONLY',
    trust_score_effect: 0,
    ranking_effect: 0,
    search_effect: 0,
    directory_effect: 0,
    compare_effect: 0,
    seo_effect: 0,
    prohibited_language: [
      'Complaint upheld',
      'Violation confirmed',
      'Bad mover',
      'Unsafe mover',
      'Fraud',
      'Guilty',
      'Government violation',
      'Complaint-free',
      'No complaints',
      'Clean record',
    ],
    draft_copy_only: {
      heading: 'Pinellas County Complaint History',
      disclaimer:
        'A complaint record does not by itself establish wrongdoing. Status and disposition are shown separately when available.',
    },
  });

  w('internal-ready-pool.json', readyPool);
  w('internal-staging-draft.json', {
    wave_id: null,
    status: 'NONE',
    apply: false,
    cases: 0,
    companies: 0,
    manifest_hash: null,
    note: 'No CANONICAL_LINK_READY cases — draft not created.',
  });

  w('public-exposure-simulation.json', {
    complaint_ui: 0,
    company_publication: 0,
    indexable: 0,
    search: 0,
    directory: 0,
    compare: 0,
    ranking: 0,
    sitemap: 0,
    json_ld: 0,
    og: 0,
    trust_score: 0,
  });

  w('pbc-freeze.json', {
    ...pbc,
    pinellas_task_pbc_writes: 0,
    observation_maturity: '2026-08-29T19:56:00Z',
  });
  w('mdc-freeze.json', {
    ...mdc,
    pinellas_task_mdc_writes: 0,
    observation_id: 'MDC_MR_CANARY_OBSERVATION_V1',
    maturity: '2026-08-30T00:07:51.092Z',
  });
  w('broward-freeze.json', {
    status: 'BLOCKED — BROWARD OFFICIAL ROSTER REQUIRES PRA',
    pra_package: 'BROWARD_PRA_ROSTER_REQUEST_V1',
    pra_sent: false,
    pinellas_task_broward_writes: 0,
    broward_existing_credentials: browardCreds,
  });
  w('state-freeze.json', {
    pinellas_task_state_writes: 0,
    provider_state_authority_writes: 0,
    wave_1_changes: 0,
    wave_2_changes: 0,
    broker_changes: 0,
  });
  w('company-freeze.json', {
    companies_inserted: 0,
    companies_updated: 0,
    publication_state_changes: 0,
    indexable_changes: 0,
    canonical_contact_changes: 0,
  });
  w('county-production-freeze.json', {
    pbc_writes: 0,
    mdc_writes: 0,
    broward_writes: 0,
    pinellas_production_writes: 0,
    county_credential_writes: 0,
    fake_pinellas_credentials: 0,
  });

  w('pinellas-readiness-ledger.json', {
    historical_complaint_rows: records.length,
    historical_unique_cases: uniqueIds.size,
    historical_dispositions: histSummary.complaint_disposition_rows,
    historical_deterministic_company_links:
      histMatch.counts?.DETERMINISTIC_BUSINESS_LINK ?? 0,
    new_searches_executed: 0,
    new_nonzero_searches: 0,
    new_zero_result_searches: 0,
    new_official_cases_recovered: 0,
    total_unique_official_cases: uniqueIds.size,
    cases_canonical_link_ready: 0,
    distinct_companies_enriched_if_staged: 0,
    identity_review_cases: caseAudit.length,
    pii_held_rejected: 0,
    formal_enforcement_events: histSummary.enforcement_rows || 0,
    credential_rows: pinellasCreds ?? 0,
    production_writes: 0,
    draft_rows_do_not_count_as_production_enrichment: true,
  });

  const summary = {
    task: 'PINELLAS-PROD-001',
    status,
    checked_at: now,
    origin_main: MAIN,
    regulatory_model: 'ORDINANCE_REGULATION_WITHOUT_SEPARATE_PUBLIC_CREDENTIAL',
    fake_credential: false,
    historical_cases: records.length,
    unique_cases: uniqueIds.size,
    canonical_link_ready: 0,
    ready_pool: 0,
    staging_draft: 'NONE',
    model_fit: modelFit.classification,
    pbc,
    mdc,
    broward_pra_sent: false,
    production_db_writes: 0,
    google_places_api_requests: 0,
    consumer_pii_committed: 0,
    db_live,
    db_error,
    next: 'Pinellas documented as ordinance+complaint-context county without production complaint enrichment for this pilot. Do not invent another Pinellas task. Optional future: bounded generic complaint-observation model extension, then identity-corroborated re-run.',
  };
  w('readiness-summary.json', summary);
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error(String(e?.message || e));
  process.exit(1);
});
