/**
 * PBC-PROD-001 Wave A ingest — manifest-bound, fail-closed.
 *
 * Usage:
 *   node scripts/ingest-pbc-prod-001-wave-a.mjs --dry-run
 *   node scripts/ingest-pbc-prod-001-wave-a.mjs --apply --manifest-hash <hash>
 *   node scripts/ingest-pbc-prod-001-wave-a.mjs --rollback --manifest-hash <hash>
 *   node scripts/ingest-pbc-prod-001-wave-a.mjs --validate-schema
 */
import { createHash } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

const MIGRATION = resolve(
  'supabase/migrations/20260822170000_pbc_prod_001_county_credential_foundation.sql'
);
const MANIFEST_PATH = resolve(
  'data/county-regulatory/fl/palm-beach/production/pbc-prod-001/pbc-county-credential-wave-a-internal-v1.json'
);
const OUT = resolve('data/county-regulatory/fl/palm-beach/production/pbc-prod-001');

function loadEnv() {
  for (const file of ['.env.local', '.env.production.local', '.env']) {
    if (!existsSync(file)) continue;
    for (const raw of readFileSync(file, 'utf8').split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const i = line.indexOf('=');
      if (i < 0) continue;
      const key = line.slice(0, i).trim();
      let value = line.slice(i + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

function dbUrl() {
  loadEnv();
  const url =
    process.env.DATABASE_URL ||
    process.env.SUPABASE_DB_URL ||
    process.env.DIRECT_URL ||
    process.env.POSTGRES_URL;
  if (!url) throw new Error('BLOCKED — PRODUCTION DATABASE ACCESS REQUIRED');
  return url;
}

function arg(name) {
  const i = process.argv.indexOf(name);
  if (i < 0) return null;
  return process.argv[i + 1] || true;
}

function has(flag) {
  return process.argv.includes(flag);
}

async function client() {
  const c = new pg.Client({
    connectionString: dbUrl(),
    ssl: { rejectUnauthorized: false },
  });
  await c.connect();
  return c;
}

async function validateSchema(c) {
  const tables = await c.query(`
    select tablename from pg_tables
     where schemaname='public'
       and tablename in ('county_regulatory_program','provider_county_credential')
     order by tablename`);
  const rls = await c.query(`
    select relname, relrowsecurity
      from pg_class
     where relname in ('county_regulatory_program','provider_county_credential')`);
  const grants = await c.query(`
    select table_name, grantee, privilege_type
      from information_schema.role_table_grants
     where table_schema='public'
       and table_name in ('county_regulatory_program','provider_county_credential')
       and grantee in ('anon','authenticated')`);
  return {
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
  const p = manifest.program;
  const existing = await c.query(
    `select id from county_regulatory_program where source_key = $1`,
    [manifest.source.source_key]
  );
  if (existing.rows.length) return { id: existing.rows[0].id, inserted: 0 };
  if (dryRun) return { id: null, inserted: 1 };
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
      manifest.source.source_key,
      manifest.source.source_url,
      p.agency_name,
      manifest.manifest_hash,
    ]
  );
  return { id: ins.rows[0].id, inserted: 1 };
}

async function planCredentials(c, manifest, programId) {
  const existing = await c.query(
    `select credential_number, company_id, evidence_publication_state, wave_id, manifest_hash
       from provider_county_credential
      where wave_id = $1 or manifest_hash = $2`,
    [manifest.wave_id, manifest.manifest_hash]
  );
  const byMv = new Map(
    existing.rows.map((r) => [String(r.credential_number).toUpperCase(), r])
  );

  let insert = 0;
  let skip = 0;
  const collisions = [];
  for (const m of manifest.members) {
    const mv = String(m.palm_beach_mv).toUpperCase();
    // global uniqueness collision (same MV under different company)
    const hit = await c.query(
      `select company_id, credential_number, wave_id
         from provider_county_credential p
         join county_regulatory_program pr on pr.id = p.program_id
        where pr.source_key = $1 and upper(p.credential_number) = $2`,
      [manifest.source.source_key, mv]
    );
    if (hit.rows.length) {
      const row = hit.rows[0];
      if (row.company_id !== m.company_id) {
        collisions.push({ mv, existing_company_id: row.company_id, intended: m.company_id });
      } else {
        skip++;
      }
      continue;
    }
    insert++;
  }
  return {
    existing_wave_rows: existing.rows.length,
    insert,
    skip,
    collisions,
    would_touch_companies: 0,
    would_touch_psa: 0,
    would_touch_contacts: 0,
  };
}

async function applyCredentials(c, manifest, programId) {
  let inserted = 0;
  for (const m of manifest.members) {
    const rawKey = `${manifest.source.source_key}:${m.palm_beach_mv}`;
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
        m.palm_beach_mv,
        m.source_status,
        m.normalized_status,
        m.issue_date,
        m.expiration_date,
        m.legal_name,
        m.dba_name,
        m.regulator,
        manifest.source.source_key,
        m.source_url,
        m.palm_beach_mv,
        rawKey,
        m.retrieved_at || new Date().toISOString(),
        createHash('sha256')
          .update(`${m.company_id}|${m.palm_beach_mv}|${m.fdacs_im}`)
          .digest('hex'),
        m.verification_state,
        m.fdacs_im,
        m.match_result,
        m.match_method,
        m.match_ruleset,
        m.qa_state,
        `pbc-prod-001-${manifest.manifest_hash.slice(0, 12)}`,
        manifest.wave_id,
        manifest.manifest_hash,
      ]
    );
    if (r.rows.length) inserted++;
  }
  return inserted;
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const dryRun = has('--dry-run');
  const apply = has('--apply');
  const rollback = has('--rollback');
  const validateOnly = has('--validate-schema');
  const applyMigration = has('--apply-migration');
  const expectedHash = arg('--manifest-hash');

  if (!dryRun && !apply && !rollback && !validateOnly && !applyMigration) {
    console.error('Specify --dry-run | --apply | --rollback | --validate-schema | --apply-migration');
    process.exit(1);
  }

  const c = await client();
  try {
    if (applyMigration) {
      if (dryRun) {
        console.log(JSON.stringify({ ok: true, mode: 'apply-migration-dry', file: MIGRATION }));
        return;
      }
      const sql = readFileSync(MIGRATION, 'utf8');
      await c.query(sql);
      const schema = await validateSchema(c);
      writeFileSync(
        resolve(OUT, 'migration-apply-result.json'),
        JSON.stringify({ ok: schema.ok, schema, at: new Date().toISOString() }, null, 2) +
          '\n'
      );
      console.log(JSON.stringify({ ok: schema.ok, mode: 'apply-migration', schema }, null, 2));
      if (!schema.ok) process.exit(4);
      return;
    }

    if (validateOnly) {
      const schema = await validateSchema(c);
      console.log(JSON.stringify({ ok: schema.ok, schema }, null, 2));
      if (!schema.ok) process.exit(4);
      return;
    }

    const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
    if (manifest.count !== 46 || manifest.members.length !== 46) {
      throw new Error('Manifest count must be exactly 46');
    }
    if (expectedHash && expectedHash !== true && expectedHash !== manifest.manifest_hash) {
      throw new Error('Manifest hash mismatch — refuse apply');
    }
    if ((apply || rollback) && (!expectedHash || expectedHash === true)) {
      throw new Error('--apply/--rollback require --manifest-hash <exact>');
    }

    // Hard gates: all companies present
    for (const m of manifest.members) {
      const r = await c.query(`select id from companies where id = $1`, [m.company_id]);
      if (!r.rows.length) throw new Error(`Missing company ${m.company_id}`);
    }

    // Freeze counts
    const before = {
      companies: (await c.query(`select count(*)::int n from companies`)).rows[0].n,
      psa: (await c.query(`select count(*)::int n from provider_state_authority`)).rows[0]
        .n,
      contacts: (
        await c.query(`select count(*)::int n from provider_contact_observation`)
      ).rows[0].n,
    };

    if (rollback) {
      if (dryRun) {
        const n = await c.query(
          `select count(*)::int n from provider_county_credential where manifest_hash = $1`,
          [manifest.manifest_hash]
        );
        console.log(
          JSON.stringify({
            ok: true,
            mode: 'rollback-dry-run',
            would_delete: n.rows[0].n,
            manifest_hash: manifest.manifest_hash,
          })
        );
        return;
      }
      await c.query('begin');
      const del = await c.query(
        `delete from provider_county_credential where manifest_hash = $1 returning id`,
        [manifest.manifest_hash]
      );
      await c.query('commit');
      console.log(
        JSON.stringify({
          ok: true,
          mode: 'rollback',
          deleted: del.rows.length,
          manifest_hash: manifest.manifest_hash,
        })
      );
      return;
    }

    const schema = await validateSchema(c);
    if (!schema.ok) {
      console.log(
        JSON.stringify({
          ok: false,
          status: 'BLOCKED — SCHEMA/APPLY GATE FAILED',
          schema,
        })
      );
      process.exit(4);
    }

    const program = await ensureProgram(c, manifest, dryRun || !apply);
    const plan = await planCredentials(c, manifest, program.id);

    const delta = {
      mode: dryRun || !apply ? 'dry-run' : 'apply',
      manifest_hash: manifest.manifest_hash,
      wave_id: manifest.wave_id,
      companies: 0,
      provider_state_authority: 0,
      provider_contact_observation: 0,
      trust_score: 0,
      publication_state: 0,
      indexable: 0,
      county_source_rows: program.inserted,
      county_credential_rows: plan.insert,
      skip_existing: plan.skip,
      collisions: plan.collisions,
      complaint_rows: 0,
      enforcement_rows: 0,
      before,
      google_places_api_requests: 0,
      consumer_pii: 0,
    };

    if (plan.collisions.length) {
      console.log(
        JSON.stringify({ ok: false, status: 'BLOCKED — CREDENTIAL COLLISION', delta }, null, 2)
      );
      process.exit(5);
    }

    if (dryRun || !apply) {
      writeFileSync(resolve(OUT, 'dry-run-result.json'), JSON.stringify(delta, null, 2) + '\n');
      console.log(JSON.stringify({ ok: true, ...delta }, null, 2));
      return;
    }

    // Exact 46 insert expected on first apply (or 0 if already applied)
    if (!(plan.insert === 46 || (plan.insert === 0 && plan.skip === 46))) {
      console.log(
        JSON.stringify({
          ok: false,
          status: 'BLOCKED — INEXACT CREDENTIAL DELTA',
          expected_insert: 46,
          plan,
        })
      );
      process.exit(5);
    }

    await c.query('begin');
    try {
      const programLive = await ensureProgram(c, manifest, false);
      const inserted = await applyCredentials(c, manifest, programLive.id);
      // verify exact
      const check = await c.query(
        `select count(*)::int n,
                count(*) filter (where evidence_publication_state = 'INTERNAL_ONLY')::int internal_only,
                count(*) filter (where evidence_publication_state in ('PUBLICATION_ELIGIBLE','PUBLISHED'))::int publicish
           from provider_county_credential
          where manifest_hash = $1`,
        [manifest.manifest_hash]
      );
      if (check.rows[0].n !== 46 || check.rows[0].internal_only !== 46 || check.rows[0].publicish !== 0) {
        throw new Error(
          `Post-insert audit failed: n=${check.rows[0].n} internal=${check.rows[0].internal_only}`
        );
      }
      const after = {
        companies: (await c.query(`select count(*)::int n from companies`)).rows[0].n,
        psa: (await c.query(`select count(*)::int n from provider_state_authority`)).rows[0]
          .n,
        contacts: (
          await c.query(`select count(*)::int n from provider_contact_observation`)
        ).rows[0].n,
      };
      if (
        after.companies !== before.companies ||
        after.psa !== before.psa ||
        after.contacts !== before.contacts
      ) {
        throw new Error('Freeze violation: companies/PSA/contacts changed');
      }
      await c.query('commit');
      const result = {
        ok: true,
        mode: 'apply',
        inserted,
        audit: check.rows[0],
        before,
        after,
        manifest_hash: manifest.manifest_hash,
        wave_id: manifest.wave_id,
        status: 'INTERNAL WAVE A INGESTED — NOT PUBLIC',
      };
      writeFileSync(resolve(OUT, 'apply-result.json'), JSON.stringify(result, null, 2) + '\n');
      console.log(JSON.stringify(result, null, 2));
    } catch (e) {
      await c.query('rollback');
      throw e;
    }
  } finally {
    await c.end().catch(() => {});
  }
}

main().catch((e) => {
  console.error(String(e?.message || e));
  process.exit(1);
});
