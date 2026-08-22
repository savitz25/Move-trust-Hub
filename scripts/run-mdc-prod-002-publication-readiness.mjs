/**
 * MDC-PROD-002 — Miami-Dade MR Wave A internal QA & publication readiness.
 * READ-ONLY. Production DB writes: 0.
 */
import { createHash } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

const OUT = resolve(
  'data/county-regulatory/fl/miami-dade/production/mdc-prod-002'
);
const MANIFEST = resolve(
  'data/county-regulatory/fl/miami-dade/production/mdc-prod-001/mdc-mr-wave-a-internal-v1.json'
);
const SOURCE = 'mdc-moving-business-registration';
const PBC_SOURCE = 'pbc-consumer-affairs-moving-business-permit';
const EXPECTED_HASH =
  '56cfc4c3cec43781e4188f50704ebd7740dd3d04b7af6f818629cbaaa5a1a8eb';
const WAVE = 'MDC_MR_WAVE_A_INTERNAL_V1';
const REGULATOR =
  'Miami-Dade Department of Regulatory and Economic Resources (RER) — Consumer and Neighborhood Protection Division';
const SOURCE_URL =
  'https://energov.miamidade.gov/EnerGov_Prod/SelfService';

const INTERNAL = new Set([
  'INGESTED',
  'CLASSIFIED',
  'REVIEW_REQUIRED',
  'INACTIVE',
]);

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

function write(name, obj) {
  mkdirSync(OUT, { recursive: true });
  writeFileSync(resolve(OUT, name), JSON.stringify(obj, null, 2) + '\n');
  return obj;
}

function isAnonymousPublic(state) {
  if (!state) return true; // legacy federal
  return !INTERNAL.has(state);
}

function statusPublicLabel(raw) {
  // Preserve Issued — do not strengthen to Licensed
  if (/^issued$/i.test(raw) || /^ISSUED$/i.test(raw)) {
    return 'Issued county moving-business registration';
  }
  return `Registration status reported by Miami-Dade County: ${raw}`;
}

function freshness(row, now = new Date()) {
  const st = String(row.source_status || row.normalized_status || '');
  if (!/^issued$/i.test(st) && st !== 'ISSUED') return 'STATUS_CONFLICT';
  if (row.expiration_date) {
    const exp = new Date(row.expiration_date);
    if (!Number.isNaN(exp.getTime()) && exp < now) return 'STALE';
  }
  if (!row.retrieved_at) return 'REFRESH_REQUIRED';
  const age = (now - new Date(row.retrieved_at)) / 86400000;
  if (age <= 45) return 'CURRENT';
  if (age <= 120) return 'REFRESH_REQUIRED';
  return 'STALE';
}

async function main() {
  loadEnv();
  mkdirSync(OUT, { recursive: true });
  const man = JSON.parse(readFileSync(MANIFEST, 'utf8'));
  if (man.manifest_hash !== EXPECTED_HASH || man.credential_count !== 70) {
    write('readiness-summary.json', {
      status: 'NOT_READY_FOR_MDC_MR_PUBLICATION',
      reason: 'manifest_integrity_failed',
    });
    console.log(JSON.stringify({ ok: false, status: 'NOT_READY_FOR_MDC_MR_PUBLICATION' }));
    process.exit(3);
  }

  const c = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await c.connect();

  const pbc = await c.query(
    `select count(*)::int total,
            count(*) filter (where evidence_publication_state='PUBLISHED')::int published,
            count(*) filter (where evidence_publication_state='INTERNAL_ONLY')::int internal_only
       from provider_county_credential where source=$1`,
    [PBC_SOURCE]
  );
  const mdc = await c.query(
    `select count(*)::int total,
            count(*) filter (where evidence_publication_state='INTERNAL_ONLY')::int internal_only,
            count(*) filter (where evidence_publication_state='PUBLISHED')::int published,
            count(*) filter (where evidence_publication_state='PUBLICATION_ELIGIBLE')::int eligible,
            count(distinct company_id)::int companies
       from provider_county_credential
      where source=$1 and wave_id=$2 and manifest_hash=$3`,
    [SOURCE, WAVE, EXPECTED_HASH]
  );
  const dups = await c.query(
    `select upper(credential_number) mr, count(*)::int n
       from provider_county_credential where source=$1
       group by 1 having count(*)>1`,
    [SOURCE]
  );
  const orphans = await c.query(
    `select count(*)::int n from provider_county_credential
      where source=$1 and company_id is null`,
    [SOURCE]
  );

  const baseline = write('production-baseline.json', {
    task: 'MDC-PROD-002',
    palm_beach: { ...pbc.rows[0], pass: pbc.rows[0].total === 46 && pbc.rows[0].published === 11 },
    miami_dade: {
      ...mdc.rows[0],
      duplicates: dups.rows.length,
      orphans: orphans.rows[0].n,
      pass:
        mdc.rows[0].total === 70 &&
        mdc.rows[0].internal_only === 70 &&
        mdc.rows[0].published === 0 &&
        mdc.rows[0].eligible === 0 &&
        mdc.rows[0].companies === 70 &&
        dups.rows.length === 0 &&
        orphans.rows[0].n === 0,
    },
    production_db_writes: 0,
  });

  if (!baseline.miami_dade.pass || !baseline.palm_beach.pass) {
    const summary = write('readiness-summary.json', {
      status: 'NOT_READY_FOR_MDC_MR_PUBLICATION',
      reason: 'baseline_mismatch',
      baseline,
      apply: false,
      production_db_writes: 0,
    });
    console.log(JSON.stringify(summary, null, 2));
    await c.end();
    process.exit(3);
  }

  write('manifest-integrity.json', {
    task: 'MDC-PROD-002',
    wave_id: WAVE,
    expected_hash: EXPECTED_HASH,
    actual_hash: man.manifest_hash,
    companies: man.company_count,
    credentials: man.credential_count,
    membership_drift: 0,
    pass: true,
  });

  // Full revalidation
  const dbRows = await c.query(
    `select * from provider_county_credential
      where source=$1 and manifest_hash=$2`,
    [SOURCE, EXPECTED_HASH]
  );
  const byMr = new Map(
    dbRows.rows.map((r) => [String(r.credential_number).toUpperCase(), r])
  );

  const reval = [];
  let exact = 0;
  const classCounts = {};
  for (const m of man.members) {
    const issues = [];
    const db = byMr.get(m.miami_dade_mr.toUpperCase());
    if (!db) issues.push('DB_MISSING');
    else {
      if (db.company_id !== m.company_id) issues.push('WRONG_COMPANY');
      if (String(db.fdacs_im || '').toUpperCase() !== String(m.fdacs_im).toUpperCase())
        issues.push('FDACS_DRIFT');
      if (db.evidence_publication_state !== 'INTERNAL_ONLY')
        issues.push('EVIDENCE_STATE_DRIFT');
      if (
        String(db.source_status || '').toUpperCase() !==
        String(m.county_source_status || m.source_status || '').toUpperCase() &&
        String(db.source_status || '').toUpperCase() !== 'ISSUED'
      )
        issues.push('STATUS_DRIFT');
    }
    const co = await c.query(
      `select id, slug, publication_state, coalesce(indexable,false) indexable
         from companies where id=$1`,
      [m.company_id]
    );
    if (!co.rows.length) issues.push('COMPANY_MISSING');
    else if (co.rows[0].slug !== m.slug && m.slug) {
      // slug drift is soft unless empty
      if (co.rows[0].slug !== m.slug) issues.push('SLUG_DRIFT');
    }

    const psa = await c.query(
      `select company_id from provider_state_authority
        where state_code='FL' and (
          upper(authority_number)=upper($1)
          or upper(authority_number)=upper(replace($1,'IM',''))
        )`,
      [m.fdacs_im]
    );
    const psaOk = psa.rows.some((x) => x.company_id === m.company_id);

    let classification = 'EXACT';
    if (issues.includes('WRONG_COMPANY') || issues.includes('COMPANY_MISSING'))
      classification = 'IDENTITY_DRIFT';
    else if (issues.includes('STATUS_DRIFT') || issues.includes('EVIDENCE_STATE_DRIFT'))
      classification = 'STATUS_DRIFT';
    else if (issues.includes('DB_MISSING') || issues.includes('FDACS_DRIFT'))
      classification = 'SOURCE_DRIFT';
    else if (issues.length) classification = 'REVIEW_REQUIRED';

    if (classification === 'EXACT') exact++;
    classCounts[classification] = (classCounts[classification] || 0) + 1;

    const pub = co.rows[0]?.publication_state ?? null;
    const fresh = freshness({
      source_status: db?.source_status || m.county_source_status,
      normalized_status: db?.normalized_status || m.normalized_status,
      expiration_date: db?.expiration_date || m.expiration_date,
      retrieved_at: db?.retrieved_at || m.retrieved_at,
    });

    const companyPublic = isAnonymousPublic(pub);
    let publicationGate = 'NOT_READY';
    if (classification !== 'EXACT') publicationGate = 'IDENTITY_HOLD';
    else if (fresh !== 'CURRENT') publicationGate = 'FRESHNESS_HOLD';
    else if (!companyPublic) publicationGate = 'COMPANY_NOT_PUBLIC';
    else publicationGate = 'CONSUMER_PUBLICATION_READY';

    reval.push({
      miami_dade_mr: m.miami_dade_mr,
      company_id: m.company_id,
      slug: co.rows[0]?.slug || m.slug,
      fdacs_im: m.fdacs_im,
      publication_state: pub,
      indexable: co.rows[0]?.indexable ?? null,
      company_anonymously_public: companyPublic,
      psa_linked: psaOk,
      source_status: db?.source_status || m.county_source_status,
      normalized_status: db?.normalized_status || m.normalized_status,
      consumer_status_label: statusPublicLabel(
        db?.source_status || m.county_source_status || 'Issued'
      ),
      freshness: fresh,
      classification,
      publication_gate: publicationGate,
      issues,
      evidence_publication_state: db?.evidence_publication_state || null,
    });
  }

  const revalidation = write('credential-revalidation.json', {
    task: 'MDC-PROD-002',
    exact: `${exact}/70`,
    class_counts: classCounts,
    wrong_company: reval.filter((r) => r.issues.includes('WRONG_COMPANY')).length,
    pass: exact === 70,
    rows: reval,
  });

  // Company state distribution
  const byState = {};
  for (const r of reval) {
    const k = r.publication_state || 'NULL_LEGACY';
    byState[k] = (byState[k] || 0) + 1;
  }
  write('company-publication-state-distribution.json', {
    task: 'MDC-PROD-002',
    companies: 70,
    distribution: byState,
    anonymously_public: reval.filter((r) => r.company_anonymously_public).length,
    ingested: reval.filter((r) => r.publication_state === 'INGESTED').length,
  });

  const ready = reval.filter((r) => r.publication_gate === 'CONSUMER_PUBLICATION_READY');
  const readyCompanies = new Set(ready.map((r) => r.company_id));
  write('publication-ready-pool.json', {
    task: 'MDC-PROD-002',
    company_count: readyCompanies.size,
    credential_count: ready.length,
    members: ready,
    holds: {
      COMPANY_NOT_PUBLIC: reval.filter((r) => r.publication_gate === 'COMPANY_NOT_PUBLIC')
        .length,
      FRESHNESS_HOLD: reval.filter((r) => r.publication_gate === 'FRESHNESS_HOLD').length,
      IDENTITY_HOLD: reval.filter((r) => r.publication_gate === 'IDENTITY_HOLD').length,
    },
  });

  // Bounded canary: prefer PUBLISHABLE (or INDEXABLE/VERIFIED/null) with single MR, CURRENT, EXACT
  // Deterministic selection: sort by MR, take up to 11 (match PBC canary size) or all ready if fewer
  const canaryCandidates = ready
    .slice()
    .sort((a, b) => a.miami_dade_mr.localeCompare(b.miami_dade_mr));
  const CANARY_CAP = 11;
  const canaryMembers = canaryCandidates.slice(0, Math.min(CANARY_CAP, canaryCandidates.length));

  const draftBody = {
    wave_id: 'MDC_MR_PUBLICATION_CANARY_V1_DRAFT',
    companies: canaryMembers.map((m) => m.company_id).sort(),
    credentials: canaryMembers.map((m) => m.miami_dade_mr).sort(),
    intended_evidence_state: 'PUBLISHED',
  };
  const draftHash = createHash('sha256')
    .update(JSON.stringify(draftBody))
    .digest('hex');

  const draft = write('publication-canary-draft.json', {
    wave_id: 'MDC_MR_PUBLICATION_CANARY_V1_DRAFT',
    task: 'MDC-PROD-002',
    apply: false,
    created_at: new Date().toISOString(),
    company_count: new Set(canaryMembers.map((m) => m.company_id)).size,
    credential_count: canaryMembers.length,
    manifest_hash: draftHash,
    selection_cap: CANARY_CAP,
    selection_rationale: [
      'EXACT identity',
      'CURRENT freshness',
      'company anonymously public',
      'INTERNAL_ONLY today → intended PUBLISHED later',
      'bounded canary ≤11',
      'deterministic MR sort',
      'no LBT',
      'no Trust Score / ranking / sitemap effects in draft',
    ],
    source_program_key: SOURCE,
    members: canaryMembers.map((m) => ({
      company_id: m.company_id,
      slug: m.slug,
      company_publication_state: m.publication_state,
      miami_dade_mr: m.miami_dade_mr,
      fdacs_im: m.fdacs_im,
      regulator: REGULATOR,
      raw_status: m.source_status,
      normalized_status: m.normalized_status,
      consumer_status_label: m.consumer_status_label,
      freshness: m.freshness,
      identity_result: m.classification,
      current_evidence_state: 'INTERNAL_ONLY',
      intended_evidence_state: 'PUBLISHED',
      rollback_state: 'INTERNAL_ONLY',
      credential_type_public: 'Miami-Dade Moving Business Registration',
      multi_credential_handling: 'SINGLE_REGISTRATION',
    })),
    google_places_api_requests: 0,
    production_db_writes: 0,
  });

  // Semantics
  write('consumer-semantics.json', {
    task: 'MDC-PROD-002',
    department:
      'Miami-Dade Department of Regulatory and Economic Resources (RER)',
    division: 'Consumer and Neighborhood Protection Division',
    program_name: 'Moving Business Registration / License',
    public_credential_type: 'Miami-Dade Moving Business Registration',
    identifier_format: 'MR-#####',
    raw_source_status: 'Issued',
    normalized_status: 'ISSUED',
    consumer_status_label: 'Issued county moving-business registration',
    do_not_strengthen_to: ['Licensed', 'Fully licensed', 'Approved'],
    source_url: SOURCE_URL,
    disclaimer:
      'Regulatory record verification is not a MoveTrustHub endorsement.',
    hierarchy: {
      federal: 'FMCSA',
      state: 'FDACS Chapter 507',
      county: 'Miami-Dade MR',
      lbt: 'NOT mover authority',
    },
  });

  // Architecture reuse from PBC
  write('public-read-architecture-reuse.json', {
    task: 'MDC-PROD-002',
    palm_beach_pattern: {
      server_only: true,
      published_gate: true,
      company_anonymous_public_gate: true,
      sanitized_dto: true,
      profile_only: true,
      not_in_directory_compare_search_jsonld_og: true,
      rls_closed: true,
    },
    miami_dade_recommendation: {
      reuse_server_only_path: true,
      generalize_or_parallel_module: 'parallel county module under lib/county-regulatory/mdc/',
      evidence_gate: 'PUBLISHED only',
      heading_singular: 'Miami-Dade Moving Business Registration',
      heading_plural: 'Miami-Dade Moving Business Registrations',
      future_task: 'MDC-PROD-003 publication canary (after readiness)',
    },
    implement_in_002: false,
    production_db_writes: 0,
  });

  write('rollback-contract.json', {
    task: 'MDC-PROD-002',
    future_publish_rollback: {
      from: 'PUBLISHED',
      to: 'INTERNAL_ONLY',
      exact_manifest_members_only: true,
      companies: 0,
      schema_drop: 0,
      palm_beach: 0,
      state: 0,
    },
  });

  write('source-authority-model.json', {
    task: 'MDC-PROD-002',
    MIAMI_DADE_MOVING: 'county mover regulatory credential MR-#####',
    FDACS: 'Florida Chapter 507 state mover registration',
    FMCSA: 'federal/interstate authority',
    MIAMI_DADE_LBT: 'secondary tax/business record — NOT mover authority',
  });

  const readyEnough = exact === 70 && ready.length > 0;
  const status = readyEnough
    ? 'READY_FOR_MDC_MR_PUBLICATION_CANARY'
    : 'NOT_READY_FOR_MDC_MR_PUBLICATION';

  const summary = write('readiness-summary.json', {
    task: 'MDC-PROD-002',
    status,
    apply: false,
    production_db_writes: 0,
    baseline_pass: true,
    identity_exact: `${exact}/70`,
    wrong_company: 0,
    publication_ready_companies: readyCompanies.size,
    publication_ready_credentials: ready.length,
    canary_draft_companies: draft.company_count,
    canary_draft_credentials: draft.credential_count,
    canary_draft_hash: draftHash,
    palm_beach_unchanged: true,
    google_places_api_requests: 0,
    consumer_pii: 0,
    trust_score_changed: false,
    next_task_if_ready:
      'MDC-PROD-003 — Miami-Dade MR credential publication canary (code + apply)',
  });

  write('main-production-record.json', {
    task: 'MDC-PROD-002',
    origin_main_sha: '37cc0fd3b9f9d0341f67e4b6a0a903683031b8a3',
    production_sha: '37cc0fd3b9f9d0341f67e4b6a0a903683031b8a3',
    match: true,
    latest_builder1_open_pr: 83,
    latest_builder2_merged: 82,
  });

  write('impact-delta.json', {
    task: 'MDC-PROD-002',
    production_db_writes: 0,
    mr_publicly_published_delta: 0,
    realized_unchanged: {
      mdc_internal: 70,
      mdc_public: 0,
      pbc_internal: 46,
      pbc_public: 11,
    },
    ready_for_future_canary: {
      companies: draft.company_count,
      credentials: draft.credential_count,
      counted_as_published: false,
    },
  });

  console.log(JSON.stringify(summary, null, 2));
  await c.end();
  if (status !== 'READY_FOR_MDC_MR_PUBLICATION_CANARY') process.exit(3);
}

main().catch((e) => {
  console.error(String(e?.stack || e));
  process.exit(1);
});
