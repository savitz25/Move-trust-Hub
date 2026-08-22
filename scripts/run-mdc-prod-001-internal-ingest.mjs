/**
 * MDC-PROD-001 — Miami-Dade MR Wave A INTERNAL_ONLY ingest (manifest-bound).
 *
 * Usage:
 *   node scripts/run-mdc-prod-001-internal-ingest.mjs --preconditions
 *   node scripts/run-mdc-prod-001-internal-ingest.mjs --build-freeze
 *   node scripts/run-mdc-prod-001-internal-ingest.mjs --revalidate
 *   node scripts/run-mdc-prod-001-internal-ingest.mjs --build-manifest
 *   node scripts/run-mdc-prod-001-internal-ingest.mjs --dry-run
 *   node scripts/run-mdc-prod-001-internal-ingest.mjs --apply --manifest-hash <hash>
 *   node scripts/run-mdc-prod-001-internal-ingest.mjs --rollback --manifest-hash <hash>
 *
 * Zero public publication. Palm Beach untouched. LBT not ingested as MR.
 */
import { createHash } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

const OUT = resolve(
  'data/county-regulatory/fl/miami-dade/production/mdc-prod-001'
);
const CROSSWALK = resolve(
  'data/county-regulatory/fl/miami-dade/qualified/mdc-fdacs-crosswalk-v1.json'
);
const UNRESOLVED = resolve(
  'data/county-regulatory/fl/miami-dade/qualified/mdc-fdacs-unresolved-v1.json'
);
const CRED_EVIDENCE = resolve(
  'data/county-regulatory/fl/miami-dade/qualified/mdc-moving-credential-evidence-v1.json'
);
const ROSTER = resolve(
  'data/county-regulatory/fl/miami-dade/normalized/mover-licenses.json'
);
const MULTI = resolve(
  'data/county-regulatory/fl/miami-dade/evidence/c006/multi-license-relationships.json'
);
const PKG = resolve(
  'data/county-regulatory/fl/miami-dade/qualified/qualified-package-manifest-v1.json'
);
const SUMMARY = resolve(
  'data/county-regulatory/fl/miami-dade/qualified/fl-c006-summary.json'
);

const SOURCE_KEY = 'mdc-moving-business-registration';
const REGULATOR =
  'Miami-Dade Department of Regulatory and Economic Resources (RER) — Consumer and Neighborhood Protection Division';
const SOURCE_URL =
  'https://energov.miamidade.gov/EnerGov_Prod/SelfService';
const WAVE_FREEZE = 'MDC_MR_WAVE_A_RESEARCH_FREEZE_V1';
const WAVE_INTERNAL = 'MDC_MR_WAVE_A_INTERNAL_V1';
const RULESET = 'MDC_FDACS_RECONCILIATION_V1';
const PBC_SOURCE = 'pbc-consumer-affairs-moving-business-permit';

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

function has(f) {
  return process.argv.includes(f);
}
function arg(n) {
  const i = process.argv.indexOf(n);
  return i >= 0 ? process.argv[i + 1] : null;
}
function write(name, obj) {
  mkdirSync(OUT, { recursive: true });
  writeFileSync(resolve(OUT, name), JSON.stringify(obj, null, 2) + '\n');
  return obj;
}

async function client() {
  loadEnv();
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('BLOCKED — no DATABASE_URL');
  const c = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await c.connect();
  return c;
}

function normalizeStatus(official) {
  const s = String(official || '').trim();
  if (/^issued$/i.test(s)) return 'ISSUED';
  if (/^expired$/i.test(s)) return 'EXPIRED';
  if (/^archived$/i.test(s)) return 'ARCHIVED';
  return s.toUpperCase().replace(/\s+/g, '_') || 'UNKNOWN';
}

function freshness(official, expireDate, retrievedAt, now = new Date()) {
  const st = String(official || '');
  if (!/^issued$/i.test(st)) return 'STATUS_CONFLICT';
  if (expireDate) {
    const exp = new Date(expireDate);
    if (!Number.isNaN(exp.getTime()) && exp < now) return 'STALE';
  }
  if (!retrievedAt) return 'REFRESH_REQUIRED';
  const ageDays = (now - new Date(retrievedAt)) / 86400000;
  if (ageDays <= 45) return 'CURRENT';
  if (ageDays <= 120) return 'REFRESH_REQUIRED';
  return 'STALE';
}

function loadLinked() {
  const cw = JSON.parse(readFileSync(CROSSWALK, 'utf8'));
  return (cw.records || []).filter((r) => r.canonical_class === 'CANONICAL_LINKED');
}

function rosterByMr() {
  const roster = JSON.parse(readFileSync(ROSTER, 'utf8'));
  const arr = Array.isArray(roster) ? roster : roster.records || [];
  return new Map(arr.map((r) => [String(r.license_number).toUpperCase(), r]));
}

function evidenceByMr() {
  const ev = JSON.parse(readFileSync(CRED_EVIDENCE, 'utf8'));
  return new Map(
    (ev.records || []).map((r) => [String(r.mr_license).toUpperCase(), r])
  );
}

function buildFreeze() {
  const linked = loadLinked();
  const roster = rosterByMr();
  const members = linked
    .map((r) => {
      const mr = String(r.miami_dade_mr).toUpperCase();
      const ros = roster.get(mr);
      return {
        miami_dade_mr: mr,
        business_id: r.business_id,
        canonical_company_id: r.canonical_company_id,
        fdacs_im: r.fdacs_id?.startsWith('IM')
          ? r.fdacs_id
          : `IM${String(r.fdacs_id || '').replace(/^IM/i, '')}`,
        fdacs_id_raw: r.fdacs_id,
        legal_name: r.miami_dade_legal_name,
        dba_name: r.miami_dade_dba || null,
        source_status: r.miami_dade_status,
        match_method: r.match_method,
        match_result: r.match_result,
        deterministic_evidence: r.deterministic_evidence || [],
        address: r.miami_dade_address,
        issue_date: ros?.issue_date || null,
        expiration_date: ros?.expire_date || null,
        retrieved_at:
          r.source_provenance?.county_retrieved_at || ros?.retrieved_at || null,
        source_url: SOURCE_URL,
      };
    })
    .sort((a, b) => a.miami_dade_mr.localeCompare(b.miami_dade_mr));

  const body = {
    wave_id: WAVE_FREEZE,
    mrs: members.map((m) => m.miami_dade_mr),
    companies: members.map((m) => m.canonical_company_id).sort(),
  };
  const hash = createHash('sha256').update(JSON.stringify(body)).digest('hex');
  const freeze = {
    wave_id: WAVE_FREEZE,
    task: 'MDC-PROD-001',
    immutable: true,
    created_at: new Date().toISOString(),
    company_count: new Set(members.map((m) => m.canonical_company_id)).size,
    credential_count: members.length,
    freeze_hash: hash,
    package_summary_hash: JSON.parse(readFileSync(SUMMARY, 'utf8')).package_hash,
    note: 'Historical FL-C006 CANONICAL_LINKED=70 freeze; newly linkable excluded',
    members,
  };
  return write('mdc-mr-wave-a-research-freeze-v1.json', freeze);
}

async function revalidate(c, freeze) {
  const ev = evidenceByMr();
  const results = [];
  let ready = 0,
    review = 0,
    dropped = 0,
    conflict = 0;
  for (const m of freeze.members) {
    const issues = [];
    const co = await c.query(
      `select id, slug, publication_state, coalesce(indexable,false) as indexable
         from companies where id=$1`,
      [m.canonical_company_id]
    );
    if (!co.rows.length) issues.push('COMPANY_MISSING');
    const psa = await c.query(
      `select company_id, authority_number from provider_state_authority
        where state_code='FL' and (
          upper(authority_number)=upper($1)
          or upper(authority_number)=upper(replace($1,'IM',''))
        )`,
      [m.fdacs_im]
    );
    if (!psa.rows.some((x) => x.company_id === m.canonical_company_id)) {
      // soft: still allow if company exists with matching fl-im id pattern
      if (!String(m.canonical_company_id).includes(
        String(m.fdacs_im).replace(/^IM/i, '').toLowerCase()
      )) {
        issues.push('FDACS_NOT_LINKED');
      }
    }
    const evi = ev.get(m.miami_dade_mr);
    if (!evi) issues.push('CREDENTIAL_EVIDENCE_MISSING');
    else {
      if (evi.official_status && evi.official_status !== m.source_status)
        issues.push('STATUS_DRIFT');
      if (evi.fdacs_reconciliation !== 'VERIFIED')
        issues.push('FDACS_NOT_VERIFIED_IN_EVIDENCE');
      if (evi.may_attach_to_canonical_company !== true)
        issues.push('MAY_NOT_ATTACH');
    }
    if (!/^issued$/i.test(m.source_status)) issues.push('NOT_ISSUED');
    const fresh = freshness(m.source_status, m.expiration_date, m.retrieved_at);
    if (fresh === 'STALE' || fresh === 'STATUS_CONFLICT')
      issues.push(`FRESHNESS_${fresh}`);

    // MR uniqueness across intended company
    const dupCo = freeze.members.filter(
      (x) =>
        x.miami_dade_mr === m.miami_dade_mr &&
        x.canonical_company_id !== m.canonical_company_id
    );
    if (dupCo.length) issues.push('MR_MULTI_COMPANY');

    let classification = 'STILL_PRODUCTION_LINK_READY';
    if (issues.includes('COMPANY_MISSING') || issues.includes('MAY_NOT_ATTACH'))
      classification = 'DROPPED_FROM_CURRENT_LINKAGE';
    else if (issues.some((i) => i.startsWith('MR_') || i === 'IDENTITY_CONFLICT'))
      classification = 'IDENTITY_CONFLICT';
    else if (issues.length) classification = 'REVIEW_REQUIRED_NOW';

    if (classification === 'STILL_PRODUCTION_LINK_READY') ready++;
    else if (classification === 'REVIEW_REQUIRED_NOW') review++;
    else if (classification === 'DROPPED_FROM_CURRENT_LINKAGE') dropped++;
    else conflict++;

    results.push({
      ...m,
      slug: co.rows[0]?.slug || null,
      publication_state: co.rows[0]?.publication_state || null,
      indexable: co.rows[0]?.indexable ?? null,
      freshness: fresh,
      normalized_status: normalizeStatus(m.source_status),
      classification,
      issues,
    });
  }
  const pass = ready === 70 && review === 0 && dropped === 0 && conflict === 0;
  return write('wave-a-revalidation.json', {
    task: 'MDC-PROD-001',
    frozen: 70,
    still_ready: ready,
    review,
    dropped,
    conflict,
    pass,
    status: pass
      ? 'PASS'
      : 'BLOCKED — MDC COHORT REVALIDATION FAILED',
    rows: results,
  });
}

function newlyLinkable(cFreezeCompanyIds) {
  // Unresolved / non-linked historical rows that now have a live company
  // Reported only — never added to Wave A.
  const unresolved = JSON.parse(readFileSync(UNRESOLVED, 'utf8'));
  const arr = unresolved.records || unresolved.rows || [];
  return {
    task: 'MDC-PROD-001',
    note: 'Future candidates only — NOT Wave A',
    historical_unresolved_rows: arr.length,
    newly_linkable_after_fl_c006: 0,
    members: [],
    freeze_exclusion: true,
  };
}

function multiLicenseAudit(freezeMembers) {
  const multi = JSON.parse(readFileSync(MULTI, 'utf8'));
  const freezeMrs = new Set(freezeMembers.map((m) => m.miami_dade_mr));
  const freezeByBiz = new Map();
  for (const m of freezeMembers) {
    if (!freezeByBiz.has(m.business_id)) freezeByBiz.set(m.business_id, []);
    freezeByBiz.get(m.business_id).push(m);
  }
  const waveMulti = [...freezeByBiz.entries()]
    .filter(([, rows]) => rows.length > 1)
    .map(([biz, rows]) => ({
      business_id: biz,
      company_id: rows[0].canonical_company_id,
      mrs: rows.map((r) => r.miami_dade_mr),
      statuses: rows.map((r) => r.source_status),
      classification: 'VALID_CONCURRENT',
      note: 'Multiple Issued MRs on same Wave A canonical company',
    }));
  // Also annotate historical multi-license businesses that intersect Wave A
  const histIntersect = (multi.records || [])
    .map((r) => {
      const issued = (r.licenses || []).filter((l) =>
        freezeMrs.has(String(l.license_number).toUpperCase())
      );
      if (!issued.length) return null;
      return {
        business_id: r.business_id,
        company_name: r.company_name,
        relationship_class: r.relationship_class,
        wave_a_mrs: issued.map((l) => l.license_number),
        all_licenses: (r.licenses || []).map((l) => ({
          mr: l.license_number,
          status: l.status,
        })),
      };
    })
    .filter(Boolean);

  return write('multi-license-audit.json', {
    task: 'MDC-PROD-001',
    historical_multi_license_businesses: multi.businesses_with_multiple_licenses || 25,
    wave_a_companies_with_multiple_mrs: waveMulti.length,
    wave_a_multi_rows: waveMulti,
    historical_intersect: histIntersect,
  });
}

function buildInternalManifest(reval) {
  if (!reval.pass) {
    return write('internal-manifest-blocked.json', {
      ok: false,
      status: 'BLOCKED — MDC COHORT REVALIDATION FAILED',
      still_ready: reval.still_ready,
    });
  }
  const members = reval.rows
    .filter((r) => r.classification === 'STILL_PRODUCTION_LINK_READY')
    .map((r) => ({
      company_id: r.canonical_company_id,
      slug: r.slug,
      miami_dade_mr: r.miami_dade_mr,
      fdacs_im: r.fdacs_im,
      company_publication_state: r.publication_state,
      county_source_status: r.source_status,
      normalized_status: r.normalized_status,
      regulator: REGULATOR,
      source_key: SOURCE_KEY,
      source_url: SOURCE_URL,
      source_record: r.miami_dade_mr,
      freshness: r.freshness,
      match_ruleset: RULESET,
      match_method: r.match_method,
      qa_state: 'VERIFIED',
      verification_state: 'VERIFIED',
      match_result: r.match_result || 'VERIFIED',
      current_evidence_state: 'INTERNAL_ONLY',
      intended_evidence_state: 'INTERNAL_ONLY',
      rollback_operation: 'DELETE_BY_MANIFEST_HASH',
      credential_type: 'moving_business_registration',
      issue_date: r.issue_date,
      expiration_date: r.expiration_date,
      legal_name: r.legal_name,
      dba_name: r.dba_name,
      retrieved_at: r.retrieved_at,
      business_id: r.business_id,
    }))
    .sort((a, b) => a.miami_dade_mr.localeCompare(b.miami_dade_mr));

  const hashBody = {
    wave_id: WAVE_INTERNAL,
    companies: members.map((m) => m.company_id).sort(),
    credentials: members.map((m) => m.miami_dade_mr).sort(),
    evidence_publication_state: 'INTERNAL_ONLY',
  };
  const manifest_hash = createHash('sha256')
    .update(JSON.stringify(hashBody))
    .digest('hex');

  const pkg = existsSync(PKG)
    ? JSON.parse(readFileSync(PKG, 'utf8'))
    : { content_hash: null };

  return write('mdc-mr-wave-a-internal-v1.json', {
    wave_id: WAVE_INTERNAL,
    task: 'MDC-PROD-001',
    created_at: new Date().toISOString(),
    company_count: new Set(members.map((m) => m.company_id)).size,
    credential_count: members.length,
    manifest_hash,
    evidence_publication_state: 'INTERNAL_ONLY',
    publish: false,
    exclusions: {
      newly_linkable_after_fl_c006: 'see newly-linkable-future-pool.json',
      note: 'Frozen CANONICAL_LINKED cohort only; no silent substitution',
    },
    source: {
      source_key: SOURCE_KEY,
      regulator: REGULATOR,
      jurisdiction: 'FL / Miami-Dade County',
      county_fips: '12086',
      source_url: SOURCE_URL,
      access_class: 'OFFICIAL_PUBLIC',
      pii_classification: 'BUSINESS_REGULATORY_ONLY',
      research_package_hash:
        pkg.content_hash ||
        pkg.package_hash ||
        JSON.parse(readFileSync(SUMMARY, 'utf8')).package_hash,
    },
    program: {
      state_code: 'FL',
      county_name: 'Miami-Dade',
      county_fips: '12086',
      posture: 'CREDENTIAL_BASED',
      agency_name: REGULATOR,
      program_name: 'Moving Business Registration / License',
      credential_type: 'moving_business_registration',
      identifier_format: 'MR-#####',
    },
    members,
    google_places_api_requests: 0,
    consumer_pii: 0,
    lbt_mutations: 0,
    complaints: 0,
    enforcement: 0,
  });
}

async function validateSchema(c) {
  const tables = await c.query(
    `select tablename from pg_tables
      where schemaname='public'
        and tablename in ('county_regulatory_program','provider_county_credential')`
  );
  const rls = await c.query(
    `select relname, relrowsecurity from pg_class
      where relname in ('county_regulatory_program','provider_county_credential')`
  );
  const grants = await c.query(
    `select table_name, grantee, privilege_type
       from information_schema.role_table_grants
      where table_schema='public'
        and table_name in ('county_regulatory_program','provider_county_credential')
        and grantee in ('anon','authenticated')`
  );
  return {
    decision: {
      county_regulatory_program: 'REUSE',
      provider_county_credential: 'REUSE',
      provider_state_authority: 'DO_NOT_USE_FOR_COUNTY_MR',
      provider_contact_observation: 'OUT_OF_SCOPE_WAVE_A',
    },
    tables: tables.rows.map((r) => r.tablename),
    rls: Object.fromEntries(rls.rows.map((r) => [r.relname, r.relrowsecurity])),
    anon_auth_grants: grants.rows,
    ok:
      tables.rows.length === 2 &&
      rls.rows.every((r) => r.relrowsecurity === true) &&
      grants.rows.length === 0,
  };
}

async function ensureProgram(c, manifest, dryRun) {
  const existing = await c.query(
    `select id from county_regulatory_program where source_key=$1`,
    [SOURCE_KEY]
  );
  if (existing.rows.length) return { id: existing.rows[0].id, inserted: 0 };
  if (dryRun) return { id: null, inserted: 1 };
  const p = manifest.program;
  const ins = await c.query(
    `insert into county_regulatory_program (
      state_code, county_fips, county_name, posture, agency_name, program_name,
      credential_type, status, source_key, source_url, access_class,
      data_completeness_class, pii_classification, source_authority_description,
      retrieved_at, provenance_hash
    ) values (
      $1,$2,$3,$4,$5,$6,$7,'OPERATING',$8,$9,'OFFICIAL_PUBLIC',
      'NEAR_FULL_ACTIVE_ROSTER','BUSINESS_REGULATORY_ONLY',$10, now(), $11
    ) returning id`,
    [
      p.state_code,
      p.county_fips,
      p.county_name,
      p.posture,
      p.agency_name,
      p.program_name,
      p.credential_type,
      SOURCE_KEY,
      SOURCE_URL,
      p.agency_name,
      manifest.manifest_hash,
    ]
  );
  return { id: ins.rows[0].id, inserted: 1 };
}

async function applyCredentials(c, manifest, programId) {
  let inserted = 0;
  for (const m of manifest.members) {
    const rawKey = `${SOURCE_KEY}:${m.miami_dade_mr}`;
    const r = await c.query(
      `insert into provider_county_credential (
        program_id, company_id, credential_type, credential_number,
        source_status, normalized_status, issue_date, expiration_date,
        legal_name, dba_name, regulator, source, source_url, source_record_id,
        raw_source_key, retrieved_at, last_verified_at, evidence_hash,
        verification_state, fdacs_im, match_result, match_method, ruleset_version,
        linked_at, identity_qa_state, identity_qualified_at, canonical_class,
        lifecycle_state, evidence_publication_state, ingest_run_id, wave_id, manifest_hash
      ) values (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16, now(), $17,
        $18,$19,$20,$21,$22, now(), $23, now(), 'CANONICAL_LINKED',
        'QUALIFIED','INTERNAL_ONLY',$24,$25,$26
      )
      on conflict (raw_source_key) do nothing
      returning id`,
      [
        programId,
        m.company_id,
        m.credential_type,
        m.miami_dade_mr,
        m.county_source_status,
        m.normalized_status,
        m.issue_date,
        m.expiration_date,
        m.legal_name,
        m.dba_name,
        REGULATOR,
        SOURCE_KEY,
        SOURCE_URL,
        m.miami_dade_mr,
        rawKey,
        m.retrieved_at || new Date().toISOString(),
        createHash('sha256')
          .update(`${m.company_id}|${m.miami_dade_mr}|${m.fdacs_im}`)
          .digest('hex'),
        m.verification_state,
        m.fdacs_im,
        m.match_result,
        m.match_method,
        m.match_ruleset,
        m.qa_state,
        `mdc-prod-001-${manifest.manifest_hash.slice(0, 12)}`,
        WAVE_INTERNAL,
        manifest.manifest_hash,
      ]
    );
    if (r.rows.length) inserted++;
  }
  return inserted;
}

async function pbcFreeze(c) {
  const q = await c.query(
    `select count(*)::int total,
            count(*) filter (where evidence_publication_state='PUBLISHED')::int published,
            count(*) filter (where evidence_publication_state='INTERNAL_ONLY')::int internal_only
       from provider_county_credential where source=$1`,
    [PBC_SOURCE]
  );
  return {
    ...q.rows[0],
    pass:
      q.rows[0].total === 46 &&
      q.rows[0].published === 11 &&
      q.rows[0].internal_only === 35,
  };
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const c = await client();
  try {
    if (has('--preconditions') || has('--build-freeze') || has('--revalidate') || has('--build-manifest') || has('--dry-run') || has('--apply') || has('--rollback') || has('--validate-schema')) {
      // fall through
    } else {
      console.error(
        'Usage: --preconditions | --build-freeze | --revalidate | --build-manifest | --dry-run | --apply --manifest-hash | --rollback --manifest-hash'
      );
      process.exit(1);
    }

    if (has('--preconditions')) {
      const schema = await validateSchema(c);
      const pbc = await pbcFreeze(c);
      const out = write('preconditions.json', {
        task: 'MDC-PROD-001',
        schema,
        palm_beach_freeze: pbc,
        ok: schema.ok && pbc.pass,
      });
      console.log(JSON.stringify(out, null, 2));
      if (!out.ok) process.exit(3);
      return;
    }

    if (has('--validate-schema')) {
      const schema = await validateSchema(c);
      write('schema-reuse-audit.json', schema);
      console.log(JSON.stringify(schema, null, 2));
      if (!schema.ok) process.exit(4);
      return;
    }

    if (has('--build-freeze')) {
      const freeze = buildFreeze();
      console.log(
        JSON.stringify(
          {
            ok: freeze.credential_count === 70,
            wave_id: freeze.wave_id,
            companies: freeze.company_count,
            credentials: freeze.credential_count,
            freeze_hash: freeze.freeze_hash,
          },
          null,
          2
        )
      );
      if (freeze.credential_count !== 70) process.exit(3);
      return;
    }

    const freezePath = resolve(OUT, 'mdc-mr-wave-a-research-freeze-v1.json');
    if (!existsSync(freezePath)) buildFreeze();
    const freeze = JSON.parse(readFileSync(freezePath, 'utf8'));

    if (has('--revalidate')) {
      const reval = await revalidate(c, freeze);
      multiLicenseAudit(freeze.members);
      // newly linkable future pool (read-only report; live company probe for unresolved)
      const unresolved = JSON.parse(readFileSync(UNRESOLVED, 'utf8'));
      const urows = unresolved.records || [];
      let newly = 0;
      const future = [];
      for (const r of urows.slice(0, 200)) {
        // only probe if unresolved has a candidate company id field
        const cid = r.canonical_company_id || r.proposed_company_id;
        if (!cid) continue;
        if (freeze.members.some((m) => m.canonical_company_id === cid)) continue;
        const co = await c.query(`select id from companies where id=$1`, [cid]);
        if (co.rows.length) {
          newly++;
          future.push({
            mr: r.miami_dade_mr || r.mr_license,
            company_id: cid,
            note: 'NEWLY_LINKABLE_AFTER_FL_C006 — excluded from Wave A',
          });
        }
      }
      write('newly-linkable-future-pool.json', {
        task: 'MDC-PROD-001',
        newly_linkable_after_fl_c006: newly,
        members: future,
        wave_a_membership_unchanged: true,
      });
      console.log(
        JSON.stringify(
          {
            ok: reval.pass,
            status: reval.status,
            still_ready: reval.still_ready,
            review: reval.review,
            dropped: reval.dropped,
            conflict: reval.conflict,
            newly_linkable_reported: newly,
          },
          null,
          2
        )
      );
      if (!reval.pass) process.exit(3);
      return;
    }

    if (has('--build-manifest')) {
      const revalPath = resolve(OUT, 'wave-a-revalidation.json');
      if (!existsSync(revalPath)) throw new Error('Run --revalidate first');
      const reval = JSON.parse(readFileSync(revalPath, 'utf8'));
      const man = buildInternalManifest(reval);
      console.log(
        JSON.stringify(
          {
            ok: man.publish === false && man.credential_count === 70,
            wave_id: man.wave_id,
            companies: man.company_count,
            credentials: man.credential_count,
            manifest_hash: man.manifest_hash,
            apply: false,
          },
          null,
          2
        )
      );
      if (man.credential_count !== 70) process.exit(3);
      return;
    }

    const manPath = resolve(OUT, 'mdc-mr-wave-a-internal-v1.json');
    if (!existsSync(manPath)) throw new Error('Run --build-manifest first');
    const manifest = JSON.parse(readFileSync(manPath, 'utf8'));
    const expectedHash = arg('--manifest-hash');

    if (has('--rollback')) {
      if (!expectedHash || expectedHash !== manifest.manifest_hash)
        throw new Error('--rollback requires matching --manifest-hash');
      if (has('--dry-run')) {
        const n = await c.query(
          `select count(*)::int n from provider_county_credential where manifest_hash=$1`,
          [manifest.manifest_hash]
        );
        console.log(
          JSON.stringify({
            ok: true,
            mode: 'rollback-dry-run',
            would_delete: n.rows[0].n,
          })
        );
        return;
      }
      await c.query('begin');
      const del = await c.query(
        `delete from provider_county_credential where manifest_hash=$1 returning id`,
        [manifest.manifest_hash]
      );
      await c.query('commit');
      console.log(
        JSON.stringify({ ok: true, mode: 'rollback', deleted: del.rows.length })
      );
      return;
    }

    const schema = await validateSchema(c);
    write('schema-reuse-audit.json', schema);
    if (!schema.ok) {
      console.log(
        JSON.stringify({
          ok: false,
          status: 'BLOCKED — COUNTY SCHEMA NOT SAFE',
          schema,
        })
      );
      process.exit(4);
    }
    const pbc = await pbcFreeze(c);
    if (!pbc.pass) {
      console.log(
        JSON.stringify({
          ok: false,
          status: 'BLOCKED — PALM BEACH FREEZE DRIFT',
          pbc,
        })
      );
      process.exit(3);
    }

    const dryRun = has('--dry-run') || !has('--apply');
    if (has('--apply')) {
      if (!expectedHash || expectedHash !== manifest.manifest_hash)
        throw new Error('--apply requires matching --manifest-hash');
    }

    // plan
    let insert = 0,
      skip = 0;
    const collisions = [];
    for (const m of manifest.members) {
      const hit = await c.query(
        `select company_id from provider_county_credential p
          join county_regulatory_program pr on pr.id=p.program_id
         where pr.source_key=$1 and upper(p.credential_number)=upper($2)`,
        [SOURCE_KEY, m.miami_dade_mr]
      );
      if (hit.rows.length) {
        if (hit.rows[0].company_id !== m.company_id)
          collisions.push({
            mr: m.miami_dade_mr,
            existing: hit.rows[0].company_id,
            intended: m.company_id,
          });
        else skip++;
      } else insert++;
    }

    const delta = {
      mode: dryRun ? 'dry-run' : 'apply',
      manifest_hash: manifest.manifest_hash,
      wave_id: WAVE_INTERNAL,
      program_insert: 1,
      credential_insert: insert,
      skip_existing: skip,
      collisions,
      companies: 0,
      company_publication: 0,
      indexable: 0,
      psa: 0,
      contacts: 0,
      complaints: 0,
      enforcement: 0,
      lbt_mutations: 0,
      trust_score: 0,
      published: 0,
      publication_eligible: 0,
      palm_beach_delta: 0,
      google_places_api_requests: 0,
      consumer_pii: 0,
    };

    if (collisions.length) {
      console.log(
        JSON.stringify({ ok: false, status: 'BLOCKED — CREDENTIAL COLLISION', delta }, null, 2)
      );
      process.exit(5);
    }

    if (dryRun) {
      write('dry-run-result.json', delta);
      console.log(JSON.stringify({ ok: true, ...delta }, null, 2));
      return;
    }

    if (!(insert === 70 || (insert === 0 && skip === 70))) {
      console.log(
        JSON.stringify({
          ok: false,
          status: 'BLOCKED — INEXACT CREDENTIAL DELTA',
          expected: 70,
          insert,
          skip,
        })
      );
      process.exit(5);
    }

    await c.query('begin');
    try {
      const program = await ensureProgram(c, manifest, false);
      const inserted = await applyCredentials(c, manifest, program.id);
      const check = await c.query(
        `select count(*)::int n,
                count(*) filter (where evidence_publication_state='INTERNAL_ONLY')::int internal_only,
                count(*) filter (where evidence_publication_state in ('PUBLICATION_ELIGIBLE','PUBLISHED'))::int publicish
           from provider_county_credential where manifest_hash=$1`,
        [manifest.manifest_hash]
      );
      if (
        check.rows[0].n !== 70 ||
        check.rows[0].internal_only !== 70 ||
        check.rows[0].publicish !== 0
      ) {
        throw new Error(
          `Post-insert failed n=${check.rows[0].n} internal=${check.rows[0].internal_only}`
        );
      }
      const pbcAfter = await pbcFreeze(c);
      if (!pbcAfter.pass) throw new Error('Palm Beach freeze broken after apply');
      await c.query('commit');
      const result = write('apply-result.json', {
        ok: true,
        mode: 'apply',
        inserted,
        program_id: program.id,
        program_inserted: program.inserted,
        n: 70,
        internal_only: 70,
        published: 0,
        publication_eligible: 0,
        palm_beach: pbcAfter,
        companies: 0,
        psa: 0,
        contacts: 0,
        lbt_mutations: 0,
        status: 'MIAMI-DADE MR WAVE A INGESTED — INTERNAL ONLY',
      });
      console.log(JSON.stringify(result, null, 2));
    } catch (e) {
      await c.query('rollback');
      throw e;
    }
  } finally {
    await c.end();
  }
}

main().catch((e) => {
  console.error(String(e?.stack || e));
  process.exit(1);
});
