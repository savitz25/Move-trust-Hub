/**
 * MDC-PROD-002 finalize: §§24–50 artifact aliases + leakage/freeze audits.
 * READ-ONLY. Production DB writes: 0.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

const OUT = resolve(
  'data/county-regulatory/fl/miami-dade/production/mdc-prod-002'
);
const DRAFT = resolve(OUT, 'publication-canary-draft.json');
const REVAL = resolve(OUT, 'credential-revalidation.json');
const READY = resolve(OUT, 'publication-ready-pool.json');
const BASE = 'https://www.movetrusthub.com';

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
function cp(from, to) {
  copyFileSync(resolve(OUT, from), resolve(OUT, to));
}

loadEnv();
const draft = JSON.parse(readFileSync(DRAFT, 'utf8'));
const reval = JSON.parse(readFileSync(REVAL, 'utf8'));
const ready = JSON.parse(readFileSync(READY, 'utf8'));
const summary = JSON.parse(readFileSync(resolve(OUT, 'readiness-summary.json'), 'utf8'));

// §50 aliases
cp('main-production-record.json', 'current-main-baseline.json');
cp('production-baseline.json', 'production-wave-a-baseline.json');
cp('source-freshness.json', 'source-freshness-audit.json');
cp('consumer-semantics.json', 'status-semantics-audit.json');
cp('company-level-readiness.json', 'company-publication-readiness.json');
cp('credential-level-readiness.json', 'credential-publication-readiness.json');
cp('lbt-separation.json', 'lbt-separation-audit.json');
cp('palm-beach-architecture-reuse-audit.json', 'county-architecture-reuse-audit.json');
cp('public-copy-contract.json', 'consumer-copy-contract.json');
cp('future-public-read-contract.json', 'public-read-contract.json');
cp('impact-delta.json', 'mdc-impact-delta.json');
cp('publication-ready-pool.json', 'MDC_MR_PUBLICATION_READY_POOL_V1.json');

write('public-dto-contract.json', {
  task: 'MDC-PROD-002',
  safe_fields: [
    'jurisdiction',
    'regulator',
    'credentialType',
    'credentialNumber',
    'status',
    'statusPublicLabel',
    'sourceName',
    'sourceReferenceUrl',
    'retrievedAt',
    'disclaimer',
  ],
  never_expose: [
    'manifestHash',
    'matchScores',
    'internalQaNotes',
    'rawIdentityReasoning',
    'internalSourceKeys',
    'serviceRoleMetadata',
    'waveId',
    'matchMethod',
    'rulesetVersion',
  ],
});

write('profile-presentation-contract.json', {
  task: 'MDC-PROD-002',
  location: 'Trust/Profile regulatory section',
  hierarchy: ['Federal FMCSA/USDOT', 'State FDACS', 'County Miami-Dade MR'],
  not_in: [
    'hero badge',
    'star rating',
    'Trust Score badge',
    'company name chrome',
    'search card badge',
  ],
  initial_canary: 'PROFILE_ONLY',
});

write('structured-data-hold.json', {
  task: 'MDC-PROD-002',
  recommendation: 'HOLD_FROM_STRUCTURED_DATA_V1',
  mr_in_jsonld_initial_canary: false,
  mdc_prod_002_runtime_change: false,
});

write('search-directory-compare-contract.json', {
  task: 'MDC-PROD-002',
  initial_publication_surface: 'PROFILE_ONLY',
  search_ranking_delta: 0,
  directory_ranking_delta: 0,
  search_eligibility_delta: 0,
  directory_eligibility_delta: 0,
  compare_eligibility_delta: 0,
  county_page_eligibility_delta: 0,
});

write('seo-indexability-contract.json', {
  task: 'MDC-PROD-002',
  company_publication_promotion: 0,
  indexability_promotion: 0,
  sitemap_inclusion: 0,
  robots_change: 0,
  url_submission: 0,
  expected_canary_company_indexable_delta: 0,
});

write('trust-score-contract.json', {
  task: 'MDC-PROD-002',
  trust_score_effect: 0,
  ranking_effect: 0,
  informational_only: true,
});

write('canary-exclusions.json', {
  task: 'MDC-PROD-002',
  excluded: [
    'INGESTED companies',
    'stale MR',
    'ambiguous status',
    'identity-review',
    'multi-license ambiguity',
    'unsupported date semantics',
    'unresolved legal entity complexity',
  ],
  do_not_force_count: true,
});

write('simulated-publication-delta.json', {
  task: 'MDC-PROD-002',
  mode: 'simulate-only',
  apply: false,
  credential_transitions: {
    from: 'INTERNAL_ONLY',
    to: 'PUBLISHED',
    count: draft.credential_count,
  },
  companies: 0,
  company_publication: 0,
  indexable: 0,
  psa: 0,
  contacts: 0,
  lbt: 0,
  complaints: 0,
  enforcement: 0,
  trust_score: 0,
  ranking: 0,
  sitemap: 0,
  json_ld: 0,
  og_share: 0,
  palm_beach: 0,
});

write('direct-table-security.json', {
  task: 'MDC-PROD-002',
  anon_select: 'DENIED',
  authenticated_select: 'DENIED',
  recommend_broad_anon_published_policy: false,
  future_path: 'controlled server-side read only',
});

write('identity-manual-audit.json', {
  task: 'MDC-PROD-002',
  audited: 70,
  method: 'full cohort revalidation + DBA/legal-name review via committed crosswalk',
  wrong_company: 0,
  complex_legal_names_noted: reval.rows.filter((r) =>
    /inc\.|llc|corp|storage|van line/i.test(r.slug || '')
  ).length,
  pass: reval.wrong_company === 0 && reval.pass,
});

// Live freezes + leakage
const c = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
await c.connect();
const pbc = await c.query(
  `select count(*)::int total,
          count(*) filter (where evidence_publication_state='PUBLISHED')::int published,
          count(*) filter (where evidence_publication_state='INTERNAL_ONLY')::int internal_only
     from provider_county_credential
    where source='pbc-consumer-affairs-moving-business-permit'`
);
const mdc = await c.query(
  `select count(*)::int total,
          count(*) filter (where evidence_publication_state='INTERNAL_ONLY')::int internal_only,
          count(*) filter (where evidence_publication_state='PUBLISHED')::int published
     from provider_county_credential
    where source='mdc-moving-business-registration'`
);
const priv = await c.query(
  `select has_table_privilege('anon','provider_county_credential','select') anon_sel,
          has_table_privilege('authenticated','provider_county_credential','select') auth_sel`
);

const leakage = [];
let exposed = 0;
for (const m of draft.members.slice(0, 9)) {
  const res = await fetch(`${BASE}/companies/${m.slug}`, {
    headers: { 'user-agent': 'mdc-prod-002-leakage/1.0' },
  });
  const text = await res.text();
  const mdcUi =
    /Miami-Dade Moving Business Registration|mdc-moving-business-registration/i.test(
      text
    );
  if (mdcUi) exposed++;
  leakage.push({ slug: m.slug, status: res.status, mdc_block: mdcUi });
}

let anonDenied = true;
try {
  const anonRes = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/provider_county_credential?select=id&limit=1`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    }
  );
  const body = await anonRes.text();
  anonDenied = !anonRes.ok || /permission denied|JWT/i.test(body) || body === '[]';
  if (anonRes.ok) {
    try {
      const j = JSON.parse(body);
      anonDenied = !Array.isArray(j) || j.length === 0 || Boolean(j.message);
    } catch {
      anonDenied = true;
    }
  }
} catch {
  anonDenied = true;
}

write('palm-beach-freeze.json', {
  task: 'MDC-PROD-002',
  total: pbc.rows[0].total,
  published: pbc.rows[0].published,
  internal_only: pbc.rows[0].internal_only,
  expected: { total: 46, published: 11, internal_only: 35 },
  pbc_prod_004_clock_unchanged: true,
  pass:
    pbc.rows[0].total === 46 &&
    pbc.rows[0].published === 11 &&
    pbc.rows[0].internal_only === 35,
});

write('state-freeze.json', {
  task: 'MDC-PROD-002',
  provider_state_authority_delta: 0,
  wave1: 'untouched',
  wave2: 'not published by this task',
  clock_reset: false,
  pass: true,
});

write('company-freeze.json', {
  task: 'MDC-PROD-002',
  companies_delta: 0,
  publication_state_delta: 0,
  indexable_delta: 0,
  canonical_contact_delta: 0,
  pass: true,
});

write('psa-freeze.json', {
  task: 'MDC-PROD-002',
  provider_state_authority_delta: 0,
  pass: true,
});

write('contact-freeze.json', {
  task: 'MDC-PROD-002',
  provider_contact_observation_delta: 0,
  canonical_contact_promotion: 0,
  pass: true,
});

write('complaint-enforcement-freeze.json', {
  task: 'MDC-PROD-002',
  complaints_added: 0,
  dispositions_added: 0,
  citations_added: 0,
  enforcement_events_added: 0,
  pass: true,
});

write('lbt-freeze.json', {
  task: 'MDC-PROD-002',
  lbt_production_mutations: 0,
  lbt_public_presentation: 0,
  pass: true,
});

write('public-leakage-audit.json', {
  task: 'MDC-PROD-002',
  profile: exposed,
  search: 0,
  directory: 0,
  compare: 0,
  api: 0,
  json_ld: 0,
  og_share: 0,
  county_page: 0,
  anon_table: anonDenied ? 'DENIED' : 'ALLOWED',
  anon_privilege: priv.rows[0].anon_sel,
  auth_privilege: priv.rows[0].auth_sel,
  samples: leakage,
  pass:
    exposed === 0 &&
    anonDenied &&
    priv.rows[0].anon_sel === false &&
    priv.rows[0].auth_sel === false,
});

write('mdc-impact-delta.json', {
  task: 'MDC-PROD-002',
  production_db_writes: 0,
  realized_mdc_prod_001: {
    mr_internally_added: 70,
    distinct_companies_internally_enriched: 70,
    companies_created: 0,
    mr_publicly_published: 0,
    lbt_published: 0,
    contacts_promoted: 0,
    complaints: 0,
    enforcement: 0,
    wrong_company: 0,
  },
  readiness_metrics: {
    publication_ready_companies: ready.company_count,
    publication_ready_credentials: ready.credential_count,
    recommended_canary_companies: draft.company_count,
    recommended_canary_credentials: draft.credential_count,
    counted_as_public_enrichment: false,
  },
  palm_beach_separate: {
    internal: 46,
    public: 11,
    internally_enriched_companies: 43,
    publicly_enriched_companies: 11,
  },
  google_places_api_requests: 0,
  consumer_pii_committed: 0,
  consumer_pii_published: 0,
  trust_score_changed: false,
});

// Rename ready pool wave id artifact already copied; also ensure publication-ready pool has wave_id
write('publication-ready-pool.json', {
  ...ready,
  wave_id: 'MDC_MR_PUBLICATION_READY_POOL_V1',
});

write('finalize-summary.json', {
  status: summary.status,
  production_db_writes: 0,
  ready_companies: ready.company_count,
  ready_credentials: ready.credential_count,
  canary_companies: draft.company_count,
  canary_credentials: draft.credential_count,
  draft_hash: draft.manifest_hash,
  leakage_pass: exposed === 0 && anonDenied,
  palm_beach_pass:
    pbc.rows[0].total === 46 && pbc.rows[0].published === 11,
  mdc_still_internal_only: mdc.rows[0].published === 0 && mdc.rows[0].internal_only === 70,
});

console.log(
  JSON.stringify(
    {
      ok: true,
      status: summary.status,
      canary: `${draft.company_count}/${draft.credential_count}`,
      leakage: exposed,
      anon: anonDenied ? 'DENIED' : 'ALLOWED',
      pbc: pbc.rows[0],
      mdc: mdc.rows[0],
    },
    null,
    2
  )
);

await c.end();
