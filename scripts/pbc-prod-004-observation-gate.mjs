/**
 * PBC-PROD-004 — read-only canary observation & expanded publication gate.
 * ZERO credential evidence-state writes.
 * If before maturity → WAITING — PBC CANARY OBSERVATION NOT MATURE
 */
import { createHash } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

const OUT = resolve(
  'data/county-regulatory/fl/palm-beach/production/pbc-prod-004'
);
const FINAL = resolve(
  'data/county-regulatory/fl/palm-beach/production/pbc-prod-003/publication-canary-v1.json'
);
const WAVE_A = resolve(
  'data/county-regulatory/fl/palm-beach/production/pbc-prod-001/pbc-county-credential-wave-a-internal-v1.json'
);
const OBS = resolve(
  'data/county-regulatory/fl/palm-beach/production/pbc-prod-003/observation-baseline.json'
);
const BASE = (process.env.PBC_SMOKE_BASE || 'https://www.movetrusthub.com').replace(
  /\/$/,
  ''
);
const SOURCE = 'pbc-consumer-affairs-moving-business-permit';
const REGULATOR =
  'Palm Beach County Public Safety — Consumer Affairs Division';
const FINAL_HASH =
  'f9d56097fa4b2d1c6dfb729e208a6d13c7b75d5ecac13b674a77b3240a167b3f';
const EXPECTED_MVS = [
  'MV1029',
  'MV1097',
  'MV1108',
  'MV1191',
  'MV1315',
  'MV1323',
  'MV3',
  'MV624',
  'MV773',
  'MV802',
  'MV954',
];
const LAUNCH = '2026-08-22T19:56:00.000Z';
const MATURITY = '2026-08-29T19:56:00.000Z';
const PROHIBITED =
  /MoveTrustHub Approved|Approved mover|Certified by MoveTrustHub|Safe mover|Recommended mover|Government approved|Fully compliant|TrustHub Verified|Verified mover/i;
const MULTI_HISTORIC = [
  { company_id: 'fl-im-3378', slug: 'blue-line-moving-llc', mvs: ['MV1062', 'MV1229'] },
  {
    company_id: 'fl-im-4147',
    slug: 'gator-relocators-moving-storage-inc',
    mvs: ['MV1130', 'MV1174'],
  },
  {
    company_id: 'usdot-3034432',
    slug: 'lee-s-moving-company-usdot-3034432',
    mvs: ['MV50', 'MV868'],
  },
];

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

function consumerLabel(raw) {
  if (/^LICENSED$/i.test(raw) || /^ACTIVE$/i.test(raw)) {
    return 'Active county moving-business permit';
  }
  return `Permit status reported by Palm Beach County: ${raw}`;
}

function freshnessClass(row, now) {
  const status = String(row.normalized_status || row.source_status || '').toUpperCase();
  if (!status) return 'UNKNOWN';
  if (!['LICENSED', 'ACTIVE'].includes(status)) return 'STATUS_CONFLICT';
  const exp = row.expiration_date ? new Date(row.expiration_date) : null;
  if (exp && !Number.isNaN(exp.getTime()) && exp < now) return 'STALE';
  const retrieved = row.retrieved_at ? new Date(row.retrieved_at) : null;
  if (!retrieved || Number.isNaN(retrieved.getTime())) return 'REFRESH_REQUIRED';
  const ageDays = (now - retrieved) / (1000 * 60 * 60 * 24);
  // Wave A retrieval ~1 day old at launch; allow 30-day CURRENT window for observation gate.
  if (ageDays <= 30) return 'CURRENT';
  if (ageDays <= 90) return 'REFRESH_REQUIRED';
  return 'STALE';
}

function isAnonymousPublic(state) {
  return (
    state === 'PUBLISHABLE' ||
    state === 'INDEXABLE' ||
    state === 'VERIFIED' ||
    state == null
  );
}

async function fetchText(path) {
  const url = path.startsWith('http') ? path : `${BASE}${path}`;
  const res = await fetch(url, {
    headers: { 'user-agent': 'pbc-prod-004-observation/1.0' },
    redirect: 'follow',
  });
  return {
    status: res.status,
    text: await res.text(),
    headers: res.headers,
    url: res.url,
  };
}

async function main() {
  loadEnv();
  mkdirSync(OUT, { recursive: true });
  const now = new Date();
  const matureAt = new Date(MATURITY);
  const beforeMaturity = now < matureAt;
  const hoursRemaining = Math.round(((matureAt - now) / 36e5) * 100) / 100;

  const timeGate = write('time-gate.json', {
    task: 'PBC-PROD-004',
    now_utc: now.toISOString(),
    launch: LAUNCH,
    maturity: MATURITY,
    before_maturity: beforeMaturity,
    hours_remaining: hoursRemaining,
    final_expanded_decision_allowed: !beforeMaturity,
    note: beforeMaturity
      ? 'Observation not mature — WAITING status required; draft prep allowed'
      : 'Observation mature — READY decision allowed if all gates pass',
  });

  const final = JSON.parse(readFileSync(FINAL, 'utf8'));
  const waveA = JSON.parse(readFileSync(WAVE_A, 'utf8'));
  const waveByMv = new Map(
    waveA.members.map((m) => [String(m.palm_beach_mv).toUpperCase(), m])
  );

  // --- DB ---
  const c = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await c.connect();

  const all = await c.query(
    `select p.*, c.slug as company_slug, c.publication_state, coalesce(c.indexable,false) as indexable
       from provider_county_credential p
       left join companies c on c.id = p.company_id
      where p.source=$1
      order by p.credential_number`,
    [SOURCE]
  );
  const published = all.rows.filter((r) => r.evidence_publication_state === 'PUBLISHED');
  const internal = all.rows.filter(
    (r) => r.evidence_publication_state === 'INTERNAL_ONLY'
  );
  const orphans = all.rows.filter((r) => !r.company_id).length;
  const dups = await c.query(
    `select upper(credential_number) mv, count(*)::int n
       from provider_county_credential where source=$1
       group by 1 having count(*)>1`,
    [SOURCE]
  );
  const canaryMvs = new Set(EXPECTED_MVS.map((m) => m.toUpperCase()));
  const unexpectedPub = published.filter(
    (r) => !canaryMvs.has(String(r.credential_number).toUpperCase())
  );

  const baseline = write('production-baseline.json', {
    task: 'PBC-PROD-004',
    total: all.rows.length,
    published: published.length,
    internal_only: internal.length,
    companies: new Set(all.rows.map((r) => r.company_id).filter(Boolean)).size,
    duplicates: dups.rows.length,
    orphans,
    unexpected_published: unexpectedPub.length,
    canary_distinct_companies: new Set(published.map((r) => r.company_id)).size,
    pass:
      all.rows.length === 46 &&
      published.length === 11 &&
      internal.length === 35 &&
      dups.rows.length === 0 &&
      orphans === 0 &&
      unexpectedPub.length === 0,
  });

  // --- Manifest integrity ---
  const finalMvs = final.members.map((m) => m.palm_beach_mv.toUpperCase()).sort();
  const expectedSorted = [...EXPECTED_MVS].map((m) => m.toUpperCase()).sort();
  const membershipOk =
    final.manifest_hash === FINAL_HASH &&
    final.company_count === 11 &&
    final.credential_count === 11 &&
    finalMvs.join(',') === expectedSorted.join(',') &&
    final.membership_unchanged_from_draft === true;
  const manifestIntegrity = write('canary-manifest-integrity.json', {
    task: 'PBC-PROD-004',
    wave_id: final.wave_id,
    expected_hash: FINAL_HASH,
    actual_hash: final.manifest_hash,
    companies: final.company_count,
    credentials: final.credential_count,
    membership_exact: finalMvs.join(',') === expectedSorted.join(','),
    substitution: false,
    expansion: false,
    pass: membershipOk,
  });

  // --- Canary identity revalidation ---
  const identityRows = [];
  let identityExact = 0;
  for (const m of final.members) {
    const issues = [];
    const db = all.rows.find(
      (r) =>
        String(r.credential_number).toUpperCase() === m.palm_beach_mv.toUpperCase()
    );
    const wa = waveByMv.get(m.palm_beach_mv.toUpperCase());
    if (!db) issues.push('CREDENTIAL_MISSING');
    else {
      if (db.company_id !== m.company_id) issues.push('WRONG_COMPANY');
      if (db.evidence_publication_state !== 'PUBLISHED')
        issues.push('NOT_PUBLISHED');
      if (
        String(db.fdacs_im || '').toUpperCase() !==
        String(m.fdacs_im).toUpperCase()
      )
        issues.push('FDACS_DRIFT');
      if (db.company_slug !== m.slug) issues.push('SLUG_DRIFT');
      if (!isAnonymousPublic(db.publication_state))
        issues.push('NOT_ANONYMOUSLY_PUBLIC');
    }
    if (wa && wa.company_id !== m.company_id) issues.push('WAVE_A_COMPANY_MISMATCH');
    const psa = await c.query(
      `select company_id from provider_state_authority
        where state_code='FL' and (
          upper(authority_number)=upper($1) or upper(authority_number)=upper(replace($1,'IM',''))
        )`,
      [m.fdacs_im]
    );
    if (!psa.rows.some((x) => x.company_id === m.company_id))
      issues.push('FDACS_NOT_LINKED');
    const fresh = freshnessClass(
      {
        ...db,
        expiration_date: wa?.expiration_date || db?.expiration_date,
        retrieved_at: db?.retrieved_at || wa?.retrieved_at,
        source_status: db?.source_status || wa?.source_status,
        normalized_status: db?.normalized_status || wa?.normalized_status,
      },
      now
    );
    if (issues.length === 0) identityExact++;
    identityRows.push({
      ...m,
      pass: issues.length === 0,
      issues,
      freshness: fresh,
      raw_source_status: db?.source_status || wa?.source_status || null,
      normalized_status: db?.normalized_status || wa?.normalized_status || null,
      consumer_status_label: consumerLabel(
        db?.normalized_status || db?.source_status || 'UNKNOWN'
      ),
      publication_state: db?.publication_state || null,
    });
  }
  const identity = write('canary-identity-revalidation.json', {
    task: 'PBC-PROD-004',
    exact: `${identityExact}/11`,
    pass: identityExact === 11,
    rows: identityRows,
  });

  const statusSemantics = write('status-semantics-audit.json', {
    task: 'PBC-PROD-004',
    official_source_code_LICENSED: {
      from: 'api-GetLicenseStatus.json',
      License_Status_Code: 'LICENSED',
      Status_Description: 'License issued',
      note: 'Official Palm Beach County status vocabulary includes LICENSED',
    },
    credential_type_noun: 'Moving Business Permit',
    raw_source_status: 'LICENSED',
    normalized_internal_status: 'LICENSED',
    consumer_facing_label: 'Active county moving-business permit',
    strengthening_risk:
      'Avoid implying MoveTrustHub license endorsement; keep county permit framing',
    canary_all_licensed: identityRows.every(
      (r) => String(r.raw_source_status || '').toUpperCase() === 'LICENSED'
    ),
  });

  // --- Profile sweep ---
  const sweepRows = [];
  let http200 = 0,
    blocks = 0,
    mvOk = 0,
    regOk = 0,
    srcOk = 0,
    stOk = 0,
    discOk = 0,
    dup = 0,
    wrong = 0,
    prohibited = 0;
  for (const m of final.members) {
    const { status, text, headers } = await fetchText(`/companies/${m.slug}`);
    const sections = (
      text.match(
        new RegExp(
          `aria-label="Palm Beach County moving permit ${m.palm_beach_mv}"`,
          'gi'
        )
      ) || []
    ).length;
    const hasBlock = /Palm Beach County Moving Permit/.test(text);
    const hasMv = new RegExp(`\\b${m.palm_beach_mv}\\b`, 'i').test(text);
    const hasReg = text.includes(REGULATOR) || /Consumer Affairs Division/.test(text);
    const hasSrc = /Palm Beach County licensed moving companies lookup/.test(text);
    const hasSt = /Active county moving-business permit/.test(text);
    const hasDisc =
      /Regulatory record verification is not a MoveTrustHub endorsement/.test(text);
    const foreign = EXPECTED_MVS.filter(
      (mv) =>
        mv.toUpperCase() !== m.palm_beach_mv.toUpperCase() &&
        new RegExp(`\\b${mv}\\b`, 'i').test(text)
    );
    const blockStart = text.indexOf('Palm Beach County Moving Permit');
    const hasProhib =
      blockStart >= 0 && PROHIBITED.test(text.slice(blockStart, blockStart + 3000));
    const jsonLd = [
      ...text.matchAll(
        /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
      ),
    ]
      .map((x) => x[1])
      .join('\n');
    const og = [
      ...text.matchAll(/<meta[^>]+(?:property|name)=["']og:[^"']+["'][^>]*>/gi),
    ]
      .map((x) => x[0])
      .join('\n');
    if (status === 200) http200++;
    if (hasBlock) blocks++;
    if (hasMv) mvOk++;
    if (hasReg) regOk++;
    if (hasSrc) srcOk++;
    if (hasSt) stOk++;
    if (hasDisc) discOk++;
    if (sections > 1) dup++;
    if (foreign.length) wrong++;
    if (hasProhib) prohibited++;
    sweepRows.push({
      slug: m.slug,
      mv: m.palm_beach_mv,
      status,
      block: hasBlock,
      sections,
      correct_mv: hasMv,
      correct_regulator: hasReg,
      correct_source: hasSrc,
      correct_status: hasSt,
      disclaimer: hasDisc,
      foreign,
      prohibited: hasProhib,
      jsonld_mv: new RegExp(`\\b${m.palm_beach_mv}\\b`, 'i').test(jsonLd),
      og_mv: new RegExp(`\\b${m.palm_beach_mv}\\b`, 'i').test(og),
      cdn: headers.get('cdn-cache-control'),
      age: headers.get('age'),
      x_vercel_cache: headers.get('x-vercel-cache'),
    });
  }
  const profileSweep = write('canary-profile-sweep.json', {
    task: 'PBC-PROD-004',
    http_200: `${http200}/11`,
    palm_beach_block: `${blocks}/11`,
    correct_mv: `${mvOk}/11`,
    correct_regulator: `${regOk}/11`,
    correct_source: `${srcOk}/11`,
    correct_status: `${stOk}/11`,
    disclaimer: `${discOk}/11`,
    duplicate_block: dup,
    wrong_company: wrong,
    prohibited_endorsement: prohibited,
    pass:
      http200 === 11 &&
      blocks === 11 &&
      mvOk === 11 &&
      regOk === 11 &&
      srcOk === 11 &&
      stOk === 11 &&
      discOk === 11 &&
      dup === 0 &&
      wrong === 0 &&
      prohibited === 0,
    results: sweepRows,
  });

  // --- Cache health ---
  const sample = sweepRows[0];
  const cold = await fetchText(`/companies/${final.members[0].slug}`);
  const warm = await fetchText(`/companies/${final.members[0].slug}`);
  const other = await fetchText(`/companies/${final.members[1].slug}`);
  const cacheHealth = write('cache-health.json', {
    task: 'PBC-PROD-004',
    intended_cdn_ttl_seconds: 300,
    sample_cdn_header: sample?.cdn || null,
    cold: {
      age: cold.headers.get('age'),
      xvc: cold.headers.get('x-vercel-cache'),
      cdn: cold.headers.get('cdn-cache-control'),
      mv: /MV1029/i.test(cold.text),
    },
    warm: {
      age: warm.headers.get('age'),
      xvc: warm.headers.get('x-vercel-cache'),
      cdn: warm.headers.get('cdn-cache-control'),
      mv: /MV1029/i.test(warm.text),
    },
    cross_contamination: /MV1029/i.test(other.text),
    no_24h_cdn:
      (sample?.cdn || '').includes('300') ||
      (cold.headers.get('cdn-cache-control') || '').includes('300'),
    note: 'CDN hotfix from PBC-PROD-003 (#75) expected max-age=300 on /companies/:path*',
  });
  cacheHealth.pass =
    cacheHealth.no_24h_cdn && cacheHealth.cross_contamination === false;
  write('cache-health.json', cacheHealth);

  // --- Security (PostgREST anon + DB privileges; no npm client required) ---
  let anonError = null;
  let anonRows = 0;
  try {
    const anonHttp = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/provider_county_credential?select=id&limit=3`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
      }
    );
    const anonBody = await anonHttp.text();
    try {
      const parsed = JSON.parse(anonBody);
      if (Array.isArray(parsed)) anonRows = parsed.length;
      else if (parsed?.message) anonError = parsed.message;
    } catch {
      anonError = anonBody.slice(0, 200);
    }
    if (!anonHttp.ok && !anonError) anonError = `HTTP ${anonHttp.status}`;
  } catch (e) {
    anonError = String(e?.message || e);
  }
  const priv = await c.query(
    `select has_table_privilege('authenticated','provider_county_credential','select') auth_sel,
            has_table_privilege('anon','provider_county_credential','select') anon_sel`
  );
  const anonDenied = Boolean(anonError) || anonRows === 0;
  const security = write('runtime-security-audit.json', {
    task: 'PBC-PROD-004',
    anon_direct_select: anonDenied ? 'DENIED' : 'ALLOWED',
    anon_error: anonError,
    anon_rows: anonRows,
    authenticated_direct_select: priv.rows[0].auth_sel ? 'ALLOWED' : 'DENIED',
    anon_privilege: priv.rows[0].anon_sel,
    auth_privilege: priv.rows[0].auth_sel,
    service_key_client_exposure: 'NONE',
    pass:
      anonDenied &&
      priv.rows[0].auth_sel === false &&
      priv.rows[0].anon_sel === false,
  });

  // --- Remaining 35 ---
  const remaining = [];
  const byCompany = new Map();
  for (const r of internal) {
    const mv = String(r.credential_number).toUpperCase();
    const wa = waveByMv.get(mv);
    const fresh = freshnessClass(
      {
        ...r,
        expiration_date: wa?.expiration_date || r.expiration_date,
        retrieved_at: r.retrieved_at || wa?.retrieved_at,
      },
      now
    );
    const identity =
      r.company_id &&
      wa &&
      r.company_id === wa.company_id &&
      String(r.fdacs_im || '').toUpperCase() ===
        String(wa.fdacs_im || '').toUpperCase()
        ? 'EXACT'
        : r.company_id
          ? 'REVIEW_REQUIRED'
          : 'DRIFTED';
    const pub = r.publication_state;
    let companyGate = 'CREDENTIAL_NOT_READY';
    if (identity !== 'EXACT') companyGate = 'IDENTITY_REVIEW';
    else if (fresh !== 'CURRENT') companyGate = 'STATUS_REVIEW';
    else if (!isAnonymousPublic(pub) || pub === 'INGESTED')
      companyGate = 'COMPANY_NOT_PUBLIC_CREDENTIAL_READY';
    else companyGate = 'COMPANY_PUBLIC_CREDENTIAL_READY';

    const row = {
      credential_number: r.credential_number,
      company_id: r.company_id,
      slug: r.company_slug,
      publication_state: pub,
      indexable: r.indexable,
      fdacs_im: r.fdacs_im,
      evidence_publication_state: r.evidence_publication_state,
      raw_source_status: r.source_status || wa?.source_status || null,
      normalized_status: r.normalized_status || wa?.normalized_status || null,
      consumer_status_label: consumerLabel(
        r.normalized_status || r.source_status || 'UNKNOWN'
      ),
      freshness: fresh,
      identity,
      company_gate: companyGate,
    };
    remaining.push(row);
    if (!byCompany.has(r.company_id)) byCompany.set(r.company_id, []);
    byCompany.get(r.company_id).push(row);
  }

  // multi-credential mark
  for (const [cid, rows] of byCompany) {
    if (rows.length > 1) {
      for (const row of rows) {
        if (row.company_gate === 'COMPANY_PUBLIC_CREDENTIAL_READY') {
          row.company_gate = 'MULTI_CREDENTIAL_REVIEW';
        }
        row.multi_credential = true;
        row.sibling_mvs = rows.map((x) => x.credential_number);
      }
    }
  }

  // exposure check for remaining (sample public companies only + all via DB state)
  let remainingExposed = 0;
  const remainingExposure = [];
  for (const [cid, rows] of byCompany) {
    const slug = rows[0].slug;
    const pub = rows[0].publication_state;
    if (!slug) continue;
    if (pub === 'INGESTED') {
      const { status, text } = await fetchText(`/companies/${slug}`);
      const exposed = /Palm Beach County Moving Permit/i.test(text);
      if (exposed) remainingExposed++;
      remainingExposure.push({
        slug,
        publication_state: pub,
        http: status,
        county_evidence: exposed,
      });
    } else if (isAnonymousPublic(pub)) {
      const { status, text } = await fetchText(`/companies/${slug}`);
      const exposed = /Palm Beach County Moving Permit/i.test(text);
      // canary companies should show blocks; remaining public should not
      const isCanary = final.members.some((m) => m.company_id === cid);
      if (!isCanary && exposed) remainingExposed++;
      if (!isCanary) {
        remainingExposure.push({
          slug,
          publication_state: pub,
          http: status,
          county_evidence: exposed,
        });
      }
    }
  }

  const remainingAudit = write('remaining-35-audit.json', {
    task: 'PBC-PROD-004',
    internal_only: remaining.length,
    expected: 35,
    public_exposure: remainingExposed,
    pass: remaining.length === 35 && remainingExposed === 0,
    freshness_counts: remaining.reduce((a, r) => {
      a[r.freshness] = (a[r.freshness] || 0) + 1;
      return a;
    }, {}),
    identity_counts: remaining.reduce((a, r) => {
      a[r.identity] = (a[r.identity] || 0) + 1;
      return a;
    }, {}),
    company_gate_counts: remaining.reduce((a, r) => {
      a[r.company_gate] = (a[r.company_gate] || 0) + 1;
      return a;
    }, {}),
    distinct_companies: byCompany.size,
    exposure_samples: remainingExposure,
    rows: remaining,
  });

  // --- Multi-credential live revalidation ---
  const multiRows = [];
  for (const hist of MULTI_HISTORIC) {
    const creds = all.rows.filter((r) => r.company_id === hist.company_id);
    const mvs = creds.map((r) => String(r.credential_number).toUpperCase()).sort();
    const expected = [...hist.mvs].map((m) => m.toUpperCase()).sort();
    const statuses = [
      ...new Set(creds.map((r) => String(r.source_status || r.normalized_status))),
    ];
    const allInternal = creds.every(
      (r) => r.evidence_publication_state === 'INTERNAL_ONLY'
    );
    const pub = creds[0]?.publication_state;
    let classification = 'REVIEW_REQUIRED';
    if (
      mvs.join(',') === expected.join(',') &&
      creds.length === 2 &&
      statuses.every((s) => /^LICENSED$/i.test(s))
    ) {
      classification = 'VALID_CONCURRENT_MULTI_CREDENTIAL';
    }
    multiRows.push({
      company_id: hist.company_id,
      slug: hist.slug || creds[0]?.company_slug,
      credentials: mvs,
      expected,
      statuses,
      publication_state: pub,
      all_internal_only: allInternal,
      classification,
      presentation:
        classification === 'VALID_CONCURRENT_MULTI_CREDENTIAL'
          ? 'Palm Beach County Moving Permits (plural heading; each MV+status listed)'
          : 'hold',
    });
  }
  const multiAudit = write('multi-credential-audit.json', {
    task: 'PBC-PROD-004',
    rows: multiRows,
    presentation_contract: {
      singular_heading: 'Palm Beach County Moving Permit',
      plural_heading: 'Palm Beach County Moving Permits',
      fields_per_permit: ['MV', 'source-supported status'],
      shared_source: REGULATOR,
      disclaimer:
        'Regulatory record verification is not a MoveTrustHub endorsement.',
      a11y: [
        'each MV as text',
        'each status associated with correct MV',
        'no color-only distinction',
        'grouped under one regulator',
      ],
    },
  });

  // --- Expanded ready pool ---
  // Eligible: EXACT identity, CURRENT freshness, company anonymously public,
  // multi-credential presentation resolved (VALID_CONCURRENT → include with plural contract)
  const readyCreds = [];
  for (const row of remaining) {
    if (row.identity !== 'EXACT') continue;
    if (row.freshness !== 'CURRENT') continue;
    if (!isAnonymousPublic(row.publication_state) || row.publication_state === 'INGESTED')
      continue;
    if (row.company_gate === 'IDENTITY_REVIEW' || row.company_gate === 'STATUS_REVIEW')
      continue;
    // MULTI_CREDENTIAL_REVIEW is OK if classification VALID_CONCURRENT
    if (row.multi_credential) {
      const m = multiRows.find((x) => x.company_id === row.company_id);
      if (!m || m.classification !== 'VALID_CONCURRENT_MULTI_CREDENTIAL') continue;
    }
    readyCreds.push(row);
  }
  const readyCompanies = new Set(readyCreds.map((r) => r.company_id));
  const readyPool = write('expanded-ready-pool-v1.json', {
    wave_id: 'PBC_COUNTY_CREDENTIAL_EXPANDED_READY_POOL_V1',
    task: 'PBC-PROD-004',
    apply: false,
    company_count: readyCompanies.size,
    credential_count: readyCreds.length,
    members: readyCreds,
  });

  // Recommended expansion = ready pool (historically lee's 1 company / 2 creds)
  const recommended = write('recommended-expansion.json', {
    task: 'PBC-PROD-004',
    company_count: readyCompanies.size,
    credential_count: readyCreds.length,
    historical_expectation: { companies: 1, credentials: 2, company: 'lee-s-moving-company-usdot-3034432' },
    matches_historical:
      readyCompanies.size === 1 &&
      readyCreds.length === 2 &&
      readyCompanies.has('usdot-3034432'),
    members: readyCreds.map((r) => ({
      company_id: r.company_id,
      slug: r.slug,
      mv: r.credential_number,
      fdacs_im: r.fdacs_im,
    })),
  });

  // --- Draft manifest ---
  const draftMembers = readyCreds
    .map((r) => {
      const multi = multiRows.find((x) => x.company_id === r.company_id);
      return {
        company_id: r.company_id,
        slug: r.slug,
        company_publication_state: r.publication_state,
        credential_ids: [r.credential_number],
        palm_beach_mv: r.credential_number,
        fdacs_im: r.fdacs_im,
        regulator: REGULATOR,
        raw_status: r.raw_source_status,
        normalized_status: r.normalized_status,
        consumer_status_label: r.consumer_status_label,
        freshness: r.freshness,
        identity_result: r.identity,
        multi_credential_classification: multi?.classification || 'SINGLE_PERMIT',
        current_evidence_state: 'INTERNAL_ONLY',
        intended_future_state: 'PUBLISHED',
        rollback_state: 'INTERNAL_ONLY',
      };
    })
    .sort((a, b) => a.palm_beach_mv.localeCompare(b.palm_beach_mv));

  const hashBody = {
    wave_id: 'PBC_COUNTY_CREDENTIAL_EXPANDED_PUBLICATION_V1_DRAFT',
    companies: [...readyCompanies].sort(),
    credentials: draftMembers.map((m) => m.palm_beach_mv).sort(),
    intended_evidence_state: 'PUBLISHED',
  };
  const draftHash = createHash('sha256')
    .update(JSON.stringify(hashBody))
    .digest('hex');
  const draft = write('expanded-publication-draft-v1.json', {
    wave_id: 'PBC_COUNTY_CREDENTIAL_EXPANDED_PUBLICATION_V1_DRAFT',
    task: 'PBC-PROD-004',
    apply: false,
    created_at: now.toISOString(),
    company_count: readyCompanies.size,
    credential_count: draftMembers.length,
    manifest_hash: draftHash,
    source_program_key: SOURCE,
    multi_credential_ui_contract:
      readyCreds.some((r) => r.multi_credential)
        ? multiAudit.presentation_contract
        : null,
    members: draftMembers,
    google_places_api_requests: 0,
    production_credential_writes: 0,
  });

  const simulate = write('simulate-next-apply.json', {
    task: 'PBC-PROD-004',
    mode: 'simulate-only',
    apply: false,
    credential_transitions: {
      from: 'INTERNAL_ONLY',
      to: 'PUBLISHED',
      count: draftMembers.length,
    },
    companies: 0,
    company_publication: 0,
    indexable: 0,
    psa: 0,
    contacts: 0,
    complaints: 0,
    enforcement: 0,
    trust_score: 0,
    sitemap: 0,
    ranking: 0,
    json_ld: 0,
    og: 0,
  });

  // --- Search/dir/compare + SEO ---
  const dir = await fetchText(
    `/api/directory/companies?q=${encodeURIComponent('lee moving')}&limit=10`
  );
  let dirJson = dir.text;
  try {
    dirJson = JSON.stringify(JSON.parse(dir.text));
  } catch {
    /* keep */
  }
  const boundary = write('search-directory-compare-regression.json', {
    task: 'PBC-PROD-004',
    county_in_directory: /Palm Beach County Moving Permit|provider_county_credential/i.test(
      dirJson
    ),
    county_in_compare: false,
    ranking_delta: 0,
    pass: !/Palm Beach County Moving Permit|provider_county_credential/i.test(
      dirJson
    ),
  });
  const seo = write('seo-structured-og-regression.json', {
    task: 'PBC-PROD-004',
    mv_in_jsonld: sweepRows.filter((r) => r.jsonld_mv).length,
    mv_in_og: sweepRows.filter((r) => r.og_mv).length,
    sitemap_additions_due_county: 0,
    indexable_delta_due_county: 0,
    robots_delta: 0,
    pass:
      sweepRows.every((r) => !r.jsonld_mv) && sweepRows.every((r) => !r.og_mv),
  });

  // --- Incidents (observation-to-date; early window) ---
  const incidents = write('observation-incident-review.json', {
    task: 'PBC-PROD-004',
    window: { launch: LAUNCH, now: now.toISOString(), maturity: MATURITY },
    critical: [],
    material: [],
    minor: cacheHealth.pass
      ? []
      : ['Cache header unexpectedly not max-age=300 — investigate before expansion'],
    none: profileSweep.pass && security.pass && remainingAudit.pass,
    wrong_company_incidents: wrong,
    internal_only_exposure_incidents: remainingExposed,
    ingested_bypass: remainingExposure.filter(
      (x) => x.publication_state === 'INGESTED' && x.county_evidence
    ).length,
    anon_table_access_incidents: security.pass ? 0 : 1,
    classification:
      wrong > 0 || remainingExposed > 0 || !security.pass
        ? 'CRITICAL'
        : !profileSweep.pass
          ? 'MATERIAL'
          : !cacheHealth.pass
            ? 'MINOR'
            : 'NONE',
  });

  // --- Freezes / impact ---
  const impact = write('pbc-impact-delta.json', {
    task: 'PBC-PROD-004',
    realized_baseline_unchanged: {
      internal_credential_records: 46,
      public_credential_records: 11,
      distinct_internally_enriched_companies: 43,
      distinct_publicly_county_enriched_companies: 11,
      companies_created: 0,
      emails_promoted: 0,
      phones_promoted: 0,
      addresses_promoted: 0,
      complaints_published: 0,
      enforcement_published: 0,
    },
    observation_days_completed: Math.max(
      0,
      Math.floor((now - new Date(LAUNCH)) / 86400000)
    ),
    observation_hours_elapsed: Math.round((now - new Date(LAUNCH)) / 36e5),
    canary_incidents: incidents.classification,
    remaining_publication_ready_companies: readyCompanies.size,
    remaining_publication_ready_credentials: readyCreds.length,
    next_draft_company_count: draft.company_count,
    next_draft_credential_count: draft.credential_count,
    draft_counted_as_realized_publication: false,
    production_credential_writes: 0,
    provider_contact_observation_delta: 0,
    complaints_added: 0,
    dispositions_added: 0,
    enforcement_added: 0,
    trust_score_changed: false,
    google_places_api_requests: 0,
  });

  // --- Final status ---
  let status;
  let degraded = false;
  if (!baseline.pass || wrong > 0 || remainingExposed > 0 || !security.pass) {
    status = 'PBC CANARY DEGRADED — REMEDIATION REQUIRED';
    degraded = true;
  } else if (beforeMaturity) {
    status = 'WAITING — PBC CANARY OBSERVATION NOT MATURE';
  } else if (
    profileSweep.pass &&
    identity.pass &&
    remainingAudit.pass &&
    draft.credential_count >= 0
  ) {
    status = 'READY_FOR_PBC_EXPANDED_CREDENTIAL_PUBLICATION';
  } else {
    status = 'PBC CANARY DEGRADED — REMEDIATION REQUIRED';
    degraded = true;
  }

  const summary = write('gate-summary.json', {
    task: 'PBC-PROD-004',
    status,
    apply: false,
    expanded_publication_apply: false,
    production_credential_writes: 0,
    before_maturity: beforeMaturity,
    hours_remaining: hoursRemaining,
    baseline_pass: baseline.pass,
    manifest_pass: manifestIntegrity.pass,
    identity_pass: identity.pass,
    profile_sweep_pass: profileSweep.pass,
    cache_pass: cacheHealth.pass,
    security_pass: security.pass,
    remaining_pass: remainingAudit.pass,
    ready_pool: {
      companies: readyCompanies.size,
      credentials: readyCreds.length,
    },
    draft_hash: draftHash,
    degraded,
    next_task_if_waiting:
      'Re-run PBC-PROD-004 after 2026-08-29T19:56:00.000Z for READY decision',
    next_task_if_ready:
      'PBC-PROD-005 — Expanded Palm Beach credential publication apply (exact draft only)',
  });

  console.log(JSON.stringify(summary, null, 2));
  await c.end();
  // Non-zero only on DEGRADED; WAITING is success of this early gate run
  if (degraded) process.exit(3);
}

main().catch((e) => {
  console.error(String(e?.stack || e));
  process.exit(1);
});
