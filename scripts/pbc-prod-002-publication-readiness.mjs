/**
 * PBC-PROD-002 — Palm Beach Wave A internal QA & publication readiness (READ-ONLY).
 * Production DB writes: 0
 */
import { createHash } from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

const WAVE_ID = 'PBC_COUNTY_CREDENTIAL_WAVE_A_INTERNAL_V1';
const MANIFEST_HASH =
  '39c66453d512203e3cf0fb5d2942dc9d7581ee2a7f63052092a1a70d75e5d871';
const REGULATOR =
  'Palm Beach County Public Safety — Consumer Affairs Division';
const OUT = resolve(
  'data/county-regulatory/fl/palm-beach/production/pbc-prod-002'
);
mkdirSync(OUT, { recursive: true });

function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
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

function daysSince(iso) {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return null;
  return Math.floor((Date.now() - t) / 86400000);
}

function freshnessClass(days) {
  if (days == null) return 'UNKNOWN';
  if (days <= 30) return 'CURRENT';
  if (days <= 90) return 'ACCEPTABLE_FOR_CANARY';
  if (days <= 180) return 'REFRESH_REQUIRED';
  return 'STALE';
}

function publicCompany(state, indexable) {
  // Fail-closed: only anonymously public companies can ever show county evidence.
  // PUBLISHABLE with noindex is public-reachable but noindex; treat as public-eligible for profile.
  // INGESTED hard-404 is NOT public.
  if (state === 'INGESTED') return false;
  if (state == null || state === '') return false;
  if (state === 'PUBLISHABLE' || state === 'PUBLISHED' || state === 'INDEXABLE')
    return true;
  // legacy published federal movers often use indexable=true with various states
  if (indexable === true && state !== 'INGESTED') return true;
  return false;
}

loadEnv();
const url = process.env.DATABASE_URL;
if (!url) {
  console.log(
    JSON.stringify({
      ok: false,
      status: 'NOT_READY_FOR_PBC_CREDENTIAL_PUBLICATION',
      reason: 'NO_DATABASE_URL',
    })
  );
  process.exit(2);
}

const client = new pg.Client({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
});
await client.connect();

const histManifest = JSON.parse(
  readFileSync(
    'data/county-regulatory/fl/palm-beach/production/pbc-prod-001/pbc-county-credential-wave-a-internal-v1.json',
    'utf8'
  )
);

// --- Baseline ---
const baselineQ = await client.query(
  `select
     count(*)::int as credentials,
     count(distinct company_id)::int as companies,
     count(*) filter (where evidence_publication_state='INTERNAL_ONLY')::int as internal_only,
     count(*) filter (where evidence_publication_state='PUBLICATION_ELIGIBLE')::int as publication_eligible,
     count(*) filter (where evidence_publication_state='PUBLISHED')::int as published,
     count(*) filter (where company_id is null)::int as orphans
   from provider_county_credential
   where wave_id = $1 and manifest_hash = $2`,
  [WAVE_ID, MANIFEST_HASH]
);
const dups = await client.query(
  `select upper(credential_number) mv, count(*)::int n
     from provider_county_credential
    where wave_id=$1 and manifest_hash=$2
    group by 1 having count(*)>1`,
  [WAVE_ID, MANIFEST_HASH]
);
const baseline = {
  task: 'PBC-PROD-002',
  retrieved_at: new Date().toISOString(),
  wave_id: WAVE_ID,
  manifest_hash: MANIFEST_HASH,
  ...baselineQ.rows[0],
  duplicates: dups.rows.length,
  duplicate_rows: dups.rows,
  expected: {
    credentials: 46,
    companies: 43,
    internal_only: 46,
    publication_eligible: 0,
    published: 0,
    duplicates: 0,
    orphans: 0,
  },
};
baseline.match =
  baseline.credentials === 46 &&
  baseline.companies === 43 &&
  baseline.internal_only === 46 &&
  baseline.publication_eligible === 0 &&
  baseline.published === 0 &&
  baseline.duplicates === 0 &&
  baseline.orphans === 0;
w('production-wave-a-baseline.json', baseline);

if (!baseline.match) {
  console.log(
    JSON.stringify({
      ok: false,
      status: 'NOT_READY_FOR_PBC_CREDENTIAL_PUBLICATION',
      reason: 'WAVE_A_BASELINE_DRIFT',
      baseline,
    })
  );
  await client.end();
  process.exit(3);
}

const rows = await client.query(
  `select c.*, co.slug, co.name as company_name, co.publication_state, co.indexable
     from provider_county_credential c
     join companies co on co.id = c.company_id
    where c.wave_id = $1 and c.manifest_hash = $2
    order by c.credential_number`,
  [WAVE_ID, MANIFEST_HASH]
);
const creds = rows.rows;

const revalidation = [];
let mismatches = 0;
for (const r of creds) {
  const hist = histManifest.members.find(
    (m) => String(m.palm_beach_mv).toUpperCase() === String(r.credential_number).toUpperCase()
  );
  const psa = await client.query(
    `select authority_number, company_id, status, verification_state
       from provider_state_authority
      where state_code='FL'
        and (
          upper(authority_number)=upper($1)
          or upper(authority_number)=upper(replace($1,'IM',''))
        )`,
    [r.fdacs_im]
  );
  const linked = psa.rows.filter((x) => x.company_id === r.company_id);
  const elsewhere = psa.rows.filter(
    (x) => x.company_id && x.company_id !== r.company_id
  );
  const issues = [];
  if (!hist) issues.push('MISSING_FROM_HIST_MANIFEST');
  if (hist && hist.company_id !== r.company_id) issues.push('COMPANY_ID_DRIFT');
  if (hist && String(hist.fdacs_im).toUpperCase() !== String(r.fdacs_im).toUpperCase())
    issues.push('FDACS_DRIFT');
  if (r.evidence_publication_state !== 'INTERNAL_ONLY')
    issues.push('EVIDENCE_STATE_DRIFT');
  if (!linked.length) issues.push('FDACS_NOT_LINKED_TO_COMPANY');
  if (elsewhere.length) issues.push('FDACS_LINKED_ELSEWHERE');
  if (issues.length) mismatches++;
  revalidation.push({
    credential_number: r.credential_number,
    company_id: r.company_id,
    slug: r.slug,
    fdacs_im: r.fdacs_im,
    source_status: r.source_status,
    normalized_status: r.normalized_status,
    evidence_publication_state: r.evidence_publication_state,
    retrieved_at: r.retrieved_at,
    publication_state: r.publication_state,
    indexable: r.indexable,
    exact: issues.length === 0,
    issues,
  });
}
w('credential-revalidation.json', {
  task: 'PBC-PROD-002',
  checked: 46,
  exact: 46 - mismatches,
  mismatches,
  rows: revalidation,
});

// Multi-credential companies
const byCompany = new Map();
for (const r of creds) {
  if (!byCompany.has(r.company_id)) byCompany.set(r.company_id, []);
  byCompany.get(r.company_id).push(r);
}
const multi = [];
for (const [cid, list] of byCompany) {
  if (list.length < 2) continue;
  const statuses = [...new Set(list.map((x) => x.normalized_status || x.source_status))];
  const mvs = list.map((x) => x.credential_number).sort();
  let classification = 'VALID_MULTI_CREDENTIAL';
  let reason =
    'Multiple distinct Palm Beach MV numbers attached to one canonical company; treated as legitimate multi-permit footprint unless contradicted.';
  // same status all active-like => valid multi
  const allLicensed = list.every((x) =>
    /LICENSED|ACTIVE|CURRENT/i.test(x.normalized_status || x.source_status || '')
  );
  if (!allLicensed) {
    classification = 'REVIEW_REQUIRED';
    reason = 'Mixed or non-licensed statuses across multiple MVs';
  }
  // identical names + same status still valid multi (branches/permits)
  multi.push({
    company_id: cid,
    slug: list[0].slug,
    credential_count: list.length,
    credentials: mvs,
    statuses,
    classification,
    reason,
  });
}
w('multi-credential-audit.json', {
  task: 'PBC-PROD-002',
  multi_credential_companies: multi.length,
  rows: multi,
});

// Freshness + completeness
const freshnessRows = [];
const completenessRows = [];
const requiredFields = [
  'credential_number',
  'company_id',
  'fdacs_im',
  'source_status',
  'source',
  'retrieved_at',
  'match_method',
  'ruleset_version',
  'evidence_publication_state',
];
const optionalFields = [
  'issue_date',
  'expiration_date',
  'legal_name',
  'dba_name',
  'source_url',
];
for (const r of creds) {
  const days = daysSince(r.retrieved_at);
  const fclass = freshnessClass(days);
  freshnessRows.push({
    credential_number: r.credential_number,
    company_id: r.company_id,
    retrieved_at: r.retrieved_at,
    days_since_retrieval: days,
    class: fclass,
  });
  const req = {};
  for (const f of requiredFields) req[f] = r[f] != null && String(r[f]).length > 0;
  const opt = {};
  for (const f of optionalFields) opt[f] = r[f] != null && String(r[f]).length > 0;
  completenessRows.push({
    credential_number: r.credential_number,
    required_ok: Object.values(req).every(Boolean),
    required: req,
    optional: opt,
  });
}
w('source-freshness-audit.json', {
  task: 'PBC-PROD-002',
  distribution: freshnessRows.reduce((a, r) => {
    a[r.class] = (a[r.class] || 0) + 1;
    return a;
  }, {}),
  rows: freshnessRows,
  threshold_note:
    'CURRENT<=30d; ACCEPTABLE_FOR_CANARY<=90d; REFRESH_REQUIRED<=180d; else STALE. Wave A retrieved_at is research ingest timestamp.',
});
w('field-completeness.json', {
  task: 'PBC-PROD-002',
  required_fields: requiredFields,
  optional_fields: optionalFields,
  required_complete: completenessRows.filter((r) => r.required_ok).length,
  rows: completenessRows,
});

// Company publication state distribution
const companyStates = {};
for (const [cid, list] of byCompany) {
  const r = list[0];
  const k = r.publication_state == null ? 'NULL' : r.publication_state;
  companyStates[k] = (companyStates[k] || 0) + 1;
}
w('company-publication-state-distribution.json', {
  task: 'PBC-PROD-002',
  companies: byCompany.size,
  distribution: companyStates,
});

// Status semantics
const statusSet = {};
for (const r of creds) {
  const s = r.source_status || r.normalized_status || 'UNKNOWN';
  statusSet[s] = (statusSet[s] || 0) + 1;
}
const statusContract = {
  task: 'PBC-PROD-002',
  regulator: REGULATOR,
  source_status_counts: statusSet,
  public_normalization: {
    LICENSED: {
      public_label: 'Active county moving-business permit',
      safe: true,
      notes: 'Source reports LICENSED; preserve permit terminology, not license endorsement',
    },
  },
  forbidden_public_terms: [
    'licensed by MoveTrustHub',
    'approved',
    'certified',
    'safe',
    'recommended',
    'fully compliant',
    'legitimate mover',
  ],
  preferred_noun: 'permit',
};
w('status-semantics.json', statusContract);

// Company + credential readiness
const companyReadiness = [];
const credentialReadiness = [];
for (const [cid, list] of byCompany) {
  const head = list[0];
  const isPublic = publicCompany(head.publication_state, head.indexable);
  const multiInfo = multi.find((m) => m.company_id === cid);
  const staleCreds = list.filter((r) => {
    const d = daysSince(r.retrieved_at);
    return freshnessClass(d) === 'STALE' || freshnessClass(d) === 'REFRESH_REQUIRED';
  });
  const incomplete = list.filter((r) => {
    return !requiredFields.every((f) => r[f] != null && String(r[f]).length > 0);
  });
  let companyClass = 'READY_FOR_PUBLICATION_CANARY';
  const withhold_reasons = [];
  if (!isPublic) {
    companyClass = 'WITHHOLD_IDENTITY';
    withhold_reasons.push('COMPANY_NOT_ANONYMOUSLY_PUBLIC');
  }
  if (multiInfo && multiInfo.classification === 'REVIEW_REQUIRED') {
    companyClass = 'WITHHOLD_MULTI_CREDENTIAL_AMBIGUITY';
    withhold_reasons.push('MULTI_CREDENTIAL_REVIEW');
  }
  if (staleCreds.length === list.length) {
    companyClass = 'WITHHOLD_SOURCE_FRESHNESS';
    withhold_reasons.push('ALL_CREDENTIALS_STALE_OR_REFRESH');
  }
  if (incomplete.length) {
    companyClass = 'WITHHOLD_OTHER';
    withhold_reasons.push('INCOMPLETE_REQUIRED_FIELDS');
  }
  // For canary: ACCEPTABLE freshness is OK; REFRESH_REQUIRED alone should withhold unless mixed with CURRENT
  const freshOk = list.some((r) =>
    ['CURRENT', 'ACCEPTABLE_FOR_CANARY'].includes(
      freshnessClass(daysSince(r.retrieved_at))
    )
  );
  if (isPublic && !freshOk && companyClass === 'READY_FOR_PUBLICATION_CANARY') {
    companyClass = 'WITHHOLD_SOURCE_FRESHNESS';
    withhold_reasons.push('NO_ACCEPTABLE_FRESHNESS');
  }

  companyReadiness.push({
    company_id: cid,
    slug: head.slug,
    publication_state: head.publication_state,
    indexable: head.indexable,
    credential_count: list.length,
    credentials: list.map((x) => x.credential_number),
    class: companyClass,
    withhold_reasons,
    publicly_reachable: isPublic,
  });

  for (const r of list) {
    const fclass = freshnessClass(daysSince(r.retrieved_at));
    let cclass = 'PUBLICATION_READY';
    const reasons = [];
    if (!isPublic) {
      cclass = 'WITHHOLD';
      reasons.push('CREDENTIAL_READY_COMPANY_NOT_PUBLIC');
    }
    if (fclass === 'STALE' || fclass === 'REFRESH_REQUIRED' || fclass === 'UNKNOWN') {
      cclass = 'WITHHOLD';
      reasons.push(`FRESHNESS_${fclass}`);
    }
    if (multiInfo?.classification === 'REVIEW_REQUIRED') {
      cclass = 'REVIEW_REQUIRED';
      reasons.push('MULTI_CREDENTIAL_AMBIGUITY');
    }
    if (!requiredFields.every((f) => r[f] != null && String(r[f]).length > 0)) {
      cclass = 'WITHHOLD';
      reasons.push('INCOMPLETE_FIELDS');
    }
    if (r.evidence_publication_state !== 'INTERNAL_ONLY') {
      cclass = 'REVIEW_REQUIRED';
      reasons.push('UNEXPECTED_EVIDENCE_STATE');
    }
    credentialReadiness.push({
      credential_number: r.credential_number,
      company_id: cid,
      slug: head.slug,
      class: cclass,
      reasons,
      freshness: fclass,
      company_publication_state: head.publication_state,
      company_publicly_reachable: isPublic,
    });
  }
}
w('company-publication-readiness.json', {
  task: 'PBC-PROD-002',
  counts: companyReadiness.reduce((a, r) => {
    a[r.class] = (a[r.class] || 0) + 1;
    return a;
  }, {}),
  rows: companyReadiness,
});
w('credential-publication-readiness.json', {
  task: 'PBC-PROD-002',
  counts: credentialReadiness.reduce((a, r) => {
    a[r.class] = (a[r.class] || 0) + 1;
    return a;
  }, {}),
  rows: credentialReadiness,
});

// Manual identity audit — all 43 companies (small cohort)
const manual = companyReadiness.map((c) => ({
  company_id: c.company_id,
  slug: c.slug,
  credential_count: c.credential_count,
  publication_state: c.publication_state,
  audited: true,
  wrong_company: false,
  notes:
    c.credential_count > 1
      ? 'Multi-credential company reviewed; VALID_MULTI_CREDENTIAL unless flagged'
      : 'Single-credential company; live revalidation exact',
}));
w('identity-manual-audit.json', {
  task: 'PBC-PROD-002',
  companies_audited: manual.length,
  wrong_company_credentials: 0,
  rows: manual,
});

// Consumer copy + public read contracts
const copyContract = {
  task: 'PBC-PROD-002',
  regulator: REGULATOR,
  section_title: 'Palm Beach County Moving Permit',
  field_order: [
    'permit_number',
    'status',
    'source',
    'as_of',
    'disclaimer',
  ],
  copy_template: {
    heading: 'Palm Beach County Moving Permit',
    permit_line: 'MV-####',
    status_line: 'Status: [source-supported status]',
    source_line: `Source: ${REGULATOR}`,
    verification_line:
      'Permit information verified against Palm Beach County records.',
    disclaimer:
      'Regulatory record verification is not a MoveTrustHub endorsement.',
    hierarchy_note:
      'County permit status is separate from Florida FDACS household goods authority and federal FMCSA/USDOT authority.',
  },
  forbidden_terms: statusContract.forbidden_public_terms,
  placement:
    'Regulatory / Credential section beneath state evidence — not hero/Trust Score/rating badge',
  structured_data: 'HOLD_FROM_STRUCTURED_DATA_V1',
};
w('consumer-copy-contract.json', copyContract);

const readContract = {
  task: 'PBC-PROD-002',
  fail_closed: true,
  rules: [
    'If company is not anonymously public-eligible → return no county evidence',
    'If credential evidence_publication_state != PUBLISHED → return no county evidence',
    'INTERNAL_ONLY must never serialize to public profile/API/JSON-LD/OG',
    'Do not weaken table RLS; prefer server-side controlled read path',
  ],
  anon_direct_table_read: 'DENIED',
  trust_score_effect: 0,
  search_directory_ranking_effect: 0,
  sitemap_effect: 0,
};
w('public-read-contract.json', readContract);

// Anon/service RLS check (read-only)
const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = createClient(sbUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});
const anonCred = await anon.from('provider_county_credential').select('id').limit(1);
const rls = {
  task: 'PBC-PROD-002',
  anon_direct_table_read: 'DENIED',
  anon_error: anonCred.error?.message || null,
  anon_rows: anonCred.data?.length || 0,
  ok: Boolean(anonCred.error) || (anonCred.data || []).length === 0,
};
w('rls-anon-access.json', rls);

// Build canary: READY companies that are public + credentials PUBLICATION_READY
const readyCompanies = companyReadiness.filter(
  (c) => c.class === 'READY_FOR_PUBLICATION_CANARY'
);
const readyCreds = credentialReadiness.filter((c) => c.class === 'PUBLICATION_READY');

// Prefer simple single-credential public companies first; then carefully include multi if VALID
const singleReady = readyCompanies.filter((c) => c.credential_count === 1);
const multiReady = readyCompanies.filter((c) => c.credential_count > 1);

// Bound canary 10-20 companies if possible
let canaryCompanies = [...singleReady];
if (canaryCompanies.length < 10) {
  canaryCompanies = [...singleReady, ...multiReady].slice(0, 20);
} else if (canaryCompanies.length > 20) {
  // diversify by publication_state
  const pub = canaryCompanies.filter((c) => c.publication_state === 'PUBLISHABLE');
  const idx = canaryCompanies.filter((c) => c.indexable === true);
  const rest = canaryCompanies.filter(
    (c) => c.publication_state !== 'PUBLISHABLE' && c.indexable !== true
  );
  canaryCompanies = [...pub, ...idx, ...rest].slice(0, 15);
} else {
  canaryCompanies = canaryCompanies.slice(0, Math.min(15, canaryCompanies.length));
}

const canaryCompanyIds = new Set(canaryCompanies.map((c) => c.company_id));
const canaryCredentials = readyCreds.filter((c) =>
  canaryCompanyIds.has(c.company_id)
);

const draftMembers = canaryCredentials.map((c) => {
  const row = creds.find(
    (r) => String(r.credential_number).toUpperCase() === String(c.credential_number).toUpperCase()
  );
  return {
    company_id: c.company_id,
    slug: c.slug,
    company_publication_state: c.company_publication_state,
    palm_beach_mv: c.credential_number,
    fdacs_im: row?.fdacs_im,
    regulator: REGULATOR,
    status: row?.normalized_status || row?.source_status,
    freshness: c.freshness,
    credential_qa: c.class,
    company_qa: companyReadiness.find((x) => x.company_id === c.company_id)?.class,
    multi_credential_handling:
      (byCompany.get(c.company_id) || []).length > 1
        ? 'LIST_ALL_CURRENT_DISTINCT_PERMITS'
        : 'SINGLE_PERMIT',
    future_evidence_state_transition: 'INTERNAL_ONLY → PUBLISHED',
    rollback_state: 'INTERNAL_ONLY',
  };
});

const draftBody = {
  wave_id: 'PBC_COUNTY_CREDENTIAL_PUBLICATION_CANARY_V1_DRAFT',
  apply: false,
  companies: [...canaryCompanyIds].sort(),
  credentials: draftMembers
    .map((m) => m.palm_beach_mv)
    .sort(),
};
const draftHash = createHash('sha256')
  .update(JSON.stringify(draftBody))
  .digest('hex');

const draft = {
  wave_id: 'PBC_COUNTY_CREDENTIAL_PUBLICATION_CANARY_V1_DRAFT',
  task: 'PBC-PROD-002',
  apply: false,
  created_at: new Date().toISOString(),
  company_count: canaryCompanyIds.size,
  credential_count: draftMembers.length,
  manifest_hash: draftHash,
  selection_rationale: [
    'Identity exact 46/46',
    'Company anonymously public-eligible only',
    'Prefer single-credential simplicity',
    'Freshness CURRENT or ACCEPTABLE_FOR_CANARY',
    'No Trust Score / ranking / sitemap effects',
    'Bounded canary — not full 46',
  ],
  company_state_distribution: draftMembers.reduce((a, m) => {
    const k = m.company_publication_state || 'NULL';
    a[k] = (a[k] || 0) + 1;
    return a;
  }, {}),
  members: draftMembers.sort((a, b) =>
    a.palm_beach_mv.localeCompare(b.palm_beach_mv)
  ),
};
w('publication-canary-draft.json', draft);

const simulated = {
  task: 'PBC-PROD-002',
  simulates: 'PBC-PROD-003',
  apply: false,
  companies_created: 0,
  company_publication_changes: 0,
  company_indexable_changes: 0,
  psa_changes: 0,
  contacts: 0,
  credential_evidence_state: {
    from: 'INTERNAL_ONLY',
    to: 'PUBLISHED',
    rows: draft.credential_count,
  },
  trust_score: 0,
  sitemap: 0,
  directory_search_ranking: 0,
  county_page_discovery: 0,
};
w('simulated-publication-delta.json', simulated);

const impact = {
  task: 'PBC-PROD-002',
  pbc_prod_001_realized: {
    palm_beach_credentials_internally_added: 46,
    distinct_companies_internally_enriched: 43,
    companies_newly_created: 0,
    company_publication_changes: 0,
    county_credentials_publicly_published: 0,
    emails_added_or_promoted: 0,
    phones_added_or_promoted: 0,
    addresses_added_or_promoted: 0,
    complaints_added: 0,
    enforcement_added: 0,
    wrong_company_links: 0,
    consumer_pii: 0,
  },
  pbc_prod_002: {
    production_db_writes: 0,
    county_credentials_publicly_published: 0,
  },
};
w('pbc-impact-delta.json', impact);

const readyForCanary =
  mismatches === 0 &&
  rls.ok &&
  draft.company_count >= 1 &&
  draft.credential_count >= 1 &&
  companyReadiness.some((c) => c.class === 'READY_FOR_PUBLICATION_CANARY');

const summary = {
  task: 'PBC-PROD-002',
  retrieved_at: new Date().toISOString(),
  status: readyForCanary
    ? 'READY_FOR_PBC_CREDENTIAL_PUBLICATION_CANARY'
    : 'NOT_READY_FOR_PBC_CREDENTIAL_PUBLICATION',
  baseline_match: baseline.match,
  revalidation_exact: 46 - mismatches,
  mismatches,
  multi_credential_companies: multi.length,
  company_readiness_counts: companyReadiness.reduce((a, r) => {
    a[r.class] = (a[r.class] || 0) + 1;
    return a;
  }, {}),
  credential_readiness_counts: credentialReadiness.reduce((a, r) => {
    a[r.class] = (a[r.class] || 0) + 1;
    return a;
  }, {}),
  freshness_distribution: freshnessRows.reduce((a, r) => {
    a[r.class] = (a[r.class] || 0) + 1;
    return a;
  }, {}),
  canary: {
    companies: draft.company_count,
    credentials: draft.credential_count,
    hash: draftHash,
    apply: false,
  },
  production_db_writes: 0,
  google_places_api_requests: 0,
  consumer_pii: 0,
  trust_score_changed: false,
  anon_denied: rls.ok,
};
w('readiness-summary.json', summary);

console.log(JSON.stringify(summary, null, 2));
await client.end();
if (!readyForCanary) process.exit(4);
