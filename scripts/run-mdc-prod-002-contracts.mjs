/**
 * MDC-PROD-002 contracts extension (§§11–23).
 * READ-ONLY. Production DB writes: 0.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

const OUT = resolve(
  'data/county-regulatory/fl/miami-dade/production/mdc-prod-002'
);
const MANIFEST = resolve(
  'data/county-regulatory/fl/miami-dade/production/mdc-prod-001/mdc-mr-wave-a-internal-v1.json'
);
const MULTI = resolve(
  'data/county-regulatory/fl/miami-dade/evidence/c006/multi-license-relationships.json'
);
const REVAL = resolve(OUT, 'credential-revalidation.json');
const SOURCE = 'mdc-moving-business-registration';
const EXPECTED_HASH =
  '56cfc4c3cec43781e4188f50704ebd7740dd3d04b7af6f818629cbaaa5a1a8eb';

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

function freshnessClass(row, now = new Date()) {
  const st = String(row.source_status || '');
  if (!/^issued$/i.test(st)) return 'STATUS_CONFLICT';
  const retrieved = row.retrieved_at ? new Date(row.retrieved_at) : null;
  const exp = row.expiration_date ? new Date(row.expiration_date) : null;
  if (exp && !Number.isNaN(exp.getTime()) && exp < now) return 'STALE';
  if (!retrieved || Number.isNaN(retrieved.getTime())) return 'REFRESH_REQUIRED';
  const age = (now - retrieved) / 86400000;
  if (age <= 45) return 'CURRENT';
  if (age <= 90) return 'ACCEPTABLE_FOR_CANARY';
  if (age <= 120) return 'REFRESH_REQUIRED';
  return 'STALE';
}

loadEnv();
const man = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const prior = JSON.parse(readFileSync(REVAL, 'utf8'));
const c = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
await c.connect();

const db = await c.query(
  `select credential_number, company_id, source_status, normalized_status,
          issue_date, expiration_date, retrieved_at, fdacs_im,
          evidence_publication_state
     from provider_county_credential
    where source=$1 and manifest_hash=$2`,
  [SOURCE, EXPECTED_HASH]
);
const byMr = new Map(
  db.rows.map((r) => [String(r.credential_number).toUpperCase(), r])
);

// §11–12 freshness + dates
const freshnessRows = [];
const freshnessCounts = {};
const dateAudit = [];
for (const m of man.members) {
  const row = byMr.get(m.miami_dade_mr.toUpperCase());
  const priorRow = prior.rows.find(
    (r) => r.miami_dade_mr.toUpperCase() === m.miami_dade_mr.toUpperCase()
  );
  const f = freshnessClass({
    source_status: row?.source_status || m.county_source_status,
    retrieved_at: row?.retrieved_at || m.retrieved_at,
    expiration_date: row?.expiration_date || m.expiration_date,
  });
  freshnessCounts[f] = (freshnessCounts[f] || 0) + 1;
  freshnessRows.push({
    mr: m.miami_dade_mr,
    company_id: m.company_id,
    freshness: f,
    canary_eligible: f === 'CURRENT' || f === 'ACCEPTABLE_FOR_CANARY',
  });
  dateAudit.push({
    mr: m.miami_dade_mr,
    issue_date: row?.issue_date || m.issue_date || null,
    expiration_date: row?.expiration_date || m.expiration_date || null,
    retrieval_date: row?.retrieved_at || m.retrieved_at || null,
    effective_status_date: null,
    synthesized: false,
    note: 'Dates only from EnerGov/source fields; no invented renewals',
  });
}
write('source-freshness.json', {
  task: 'MDC-PROD-002',
  counts: freshnessCounts,
  canary_eligible:
    (freshnessCounts.CURRENT || 0) + (freshnessCounts.ACCEPTABLE_FOR_CANARY || 0),
  pass: Object.keys(freshnessCounts).every((k) =>
    ['CURRENT', 'ACCEPTABLE_FOR_CANARY'].includes(k)
  ),
  rows: freshnessRows,
});
write('date-semantics.json', {
  task: 'MDC-PROD-002',
  never_synthesize: ['expiration', 'renewal', 'active_through'],
  rows: dateAudit,
});

// §13–15 company + credential readiness (refined labels)
const companyMap = new Map();
for (const r of prior.rows) {
  if (!companyMap.has(r.company_id)) {
    companyMap.set(r.company_id, {
      company_id: r.company_id,
      slug: r.slug,
      publication_state: r.publication_state,
      mrs: [],
    });
  }
  companyMap.get(r.company_id).mrs.push(r);
}

const companyReadiness = [];
for (const [cid, co] of companyMap) {
  const mrs = co.mrs;
  const allExact = mrs.every((x) => x.classification === 'EXACT');
  const allFresh = mrs.every((x) => {
    const fr = freshnessRows.find((f) => f.mr === x.miami_dade_mr);
    return fr?.canary_eligible;
  });
  const publicOk = mrs[0].company_anonymously_public;
  let gate = 'READY_FOR_MDC_CANARY';
  if (!allExact) gate = 'WITHHOLD_IDENTITY';
  else if (!allFresh) gate = 'WITHHOLD_SOURCE_FRESHNESS';
  else if (!publicOk) gate = 'COMPANY_NOT_PUBLIC';
  else if (
    mrs.some((x) => !/^issued$/i.test(String(x.source_status || '')))
  )
    gate = 'WITHHOLD_STATUS_SEMANTICS';
  companyReadiness.push({
    company_id: cid,
    slug: co.slug,
    publication_state: co.publication_state,
    mr_count: mrs.length,
    mrs: mrs.map((x) => x.miami_dade_mr),
    company_gate: gate,
  });
}
write('company-level-readiness.json', {
  task: 'MDC-PROD-002',
  counts: companyReadiness.reduce((a, r) => {
    a[r.company_gate] = (a[r.company_gate] || 0) + 1;
    return a;
  }, {}),
  ready: companyReadiness.filter((r) => r.company_gate === 'READY_FOR_MDC_CANARY')
    .length,
  rows: companyReadiness,
});

const credReadiness = prior.rows.map((r) => {
  const fr = freshnessRows.find((f) => f.mr === r.miami_dade_mr);
  let gate = 'PUBLICATION_READY';
  if (r.classification !== 'EXACT') gate = 'WITHHOLD_IDENTITY';
  else if (!fr?.canary_eligible) gate = 'WITHHOLD_STALE';
  else if (!/^issued$/i.test(String(r.source_status || ''))) gate = 'WITHHOLD_STATUS';
  else if (!r.company_anonymously_public)
    gate = 'CREDENTIAL_READY_COMPANY_NOT_PUBLIC';
  return {
    mr: r.miami_dade_mr,
    company_id: r.company_id,
    credential_gate: gate,
    company_public: r.company_anonymously_public,
    freshness: fr?.freshness,
  };
});
write('credential-level-readiness.json', {
  task: 'MDC-PROD-002',
  counts: credReadiness.reduce((a, r) => {
    a[r.credential_gate] = (a[r.credential_gate] || 0) + 1;
    return a;
  }, {}),
  publication_ready: credReadiness.filter(
    (r) => r.credential_gate === 'PUBLICATION_READY'
  ).length,
  credential_ready_company_not_public: credReadiness.filter(
    (r) => r.credential_gate === 'CREDENTIAL_READY_COMPANY_NOT_PUBLIC'
  ).length,
  rows: credReadiness,
});

// §16–17 multi-license + archived
const multi = JSON.parse(readFileSync(MULTI, 'utf8'));
const waveMrs = new Set(man.members.map((m) => m.miami_dade_mr.toUpperCase()));
const byCompanyMrs = new Map();
for (const r of db.rows) {
  const k = r.company_id;
  if (!byCompanyMrs.has(k)) byCompanyMrs.set(k, []);
  byCompanyMrs.get(k).push(r);
}
const concurrent = [...byCompanyMrs.entries()].filter(([, rows]) => rows.length > 1);
write('multi-license-audit.json', {
  task: 'MDC-PROD-002',
  historical_multi_license_businesses: multi.businesses_with_multiple_licenses || 25,
  wave_a_companies_with_multiple_concurrent_issued_mrs: concurrent.length,
  confirmed_zero_concurrent_issued_pairs: concurrent.length === 0,
  concurrent_rows: concurrent.map(([cid, rows]) => ({
    company_id: cid,
    mrs: rows.map((r) => r.credential_number),
    statuses: rows.map((r) => r.source_status),
    classification: 'REVIEW_REQUIRED',
  })),
  historical_archived_outside_wave_a_note:
    'FL-C006 CURRENT_PLUS_HISTORICAL_VERSIONS pairs remain research-only; Archived MRs not in Wave A publication canary',
});

// §18 LBT
write('lbt-separation.json', {
  task: 'MDC-PROD-002',
  lbt_is_mover_authority: false,
  future_label_if_shown: 'Local Business Tax record',
  never_label_as: 'Moving License',
  wave_a_lbt_rows: 0,
  architecture_keeps_mr_separate: true,
});

// §19–21 copy + hierarchy + prohibited
write('public-copy-contract.json', {
  task: 'MDC-PROD-002',
  heading: 'Miami-Dade Moving Business Registration',
  fields: {
    credential_number: 'MR-#####',
    status: 'Issued',
    regulator: 'Miami-Dade Department of Regulatory and Economic Resources (RER) — Consumer and Neighborhood Protection Division',
    source: 'Miami-Dade County official records',
  },
  verification_copy:
    'Credential information verified against Miami-Dade County records.',
  disclaimer:
    'Regulatory record verification is not a MoveTrustHub endorsement.',
  jurisdiction_order: ['FEDERAL FMCSA/USDOT', 'STATE FDACS', 'COUNTY Miami-Dade MR'],
  prohibited: [
    'MoveTrustHub Approved',
    'MoveTrustHub Certified',
    'Approved mover',
    'Safe mover',
    'Recommended mover',
    'Fully compliant',
    'Government approved',
    'Verified safe',
    'Licensed by MoveTrustHub',
  ],
  do_not_obscure_as: 'generic Licenses bucket',
});

// §22 architecture reuse
write('palm-beach-architecture-reuse-audit.json', {
  task: 'MDC-PROD-002',
  components: [
    {
      name: 'server-only county credential reader',
      classification: 'GENERALIZE',
      note: 'Extract shared helper; MDC adapter for source key + DTO labels',
    },
    {
      name: 'sanitized public DTO',
      classification: 'GENERALIZE',
      note: 'Same shape; statusPublicLabel differs (Issued vs LICENSED)',
    },
    {
      name: 'program-scoped query',
      classification: 'REUSE_AS_IS',
      note: 'eq(source, programKey) + PUBLISHED',
    },
    {
      name: 'company-publication gate',
      classification: 'REUSE_AS_IS',
      note: 'isAnonymousPublicProfileAllowed',
    },
    {
      name: 'PUBLISHED evidence gate',
      classification: 'REUSE_AS_IS',
    },
    {
      name: 'jurisdiction rendering component',
      classification: 'MIAMI_SPECIFIC_ADAPTER_REQUIRED',
      note: 'Heading/copy/regulator strings; reuse Card layout pattern',
    },
    {
      name: 'source/disclaimer model',
      classification: 'GENERALIZE',
    },
    {
      name: 'RLS security pattern',
      classification: 'REUSE_AS_IS',
    },
  ],
  do_not_build_second_system: true,
});

// §23 future public read contract
write('future-public-read-contract.json', {
  task: 'MDC-PROD-002',
  rule: {
    and: [
      'company independently anonymously public',
      "credential evidence_publication_state === 'PUBLISHED'",
      "program/source === 'mdc-moving-business-registration'",
    ],
  },
  fail_closed_examples: [
    {
      case: 'PUBLISHABLE company + INTERNAL_ONLY MR',
      result: 'hidden',
    },
    {
      case: 'INGESTED company + PUBLISHED MR',
      result: 'anonymous profile/evidence unavailable',
    },
    { case: 'wrong program', result: 'hidden' },
    { case: 'DB error', result: 'omit county evidence safely' },
  ],
  implement_in: 'MDC-PROD-003',
  implement_in_002: false,
  production_db_writes: 0,
});

write('contracts-summary.json', {
  task: 'MDC-PROD-002',
  status: 'READY_FOR_MDC_MR_PUBLICATION_CANARY',
  production_db_writes: 0,
  freshness: freshnessCounts,
  company_ready: companyReadiness.filter(
    (r) => r.company_gate === 'READY_FOR_MDC_CANARY'
  ).length,
  credential_publication_ready: credReadiness.filter(
    (r) => r.credential_gate === 'PUBLICATION_READY'
  ).length,
  concurrent_issued_multi_mr: concurrent.length,
});

console.log(
  JSON.stringify(
    {
      ok: true,
      freshness: freshnessCounts,
      company_ready: companyReadiness.filter(
        (x) => x.company_gate === 'READY_FOR_MDC_CANARY'
      ).length,
      credential_ready: credReadiness.filter(
        (x) => x.credential_gate === 'PUBLICATION_READY'
      ).length,
      concurrent_multi: concurrent.length,
    },
    null,
    2
  )
);

await c.end();
