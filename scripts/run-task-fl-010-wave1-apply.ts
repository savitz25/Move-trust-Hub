/**
 * FL-010 — transactional FL_STATE_WAVE_1 apply.
 * Requires --apply --hash=<frozen hash>. Google Places: 0.
 * Does not touch KEEP_80. Does not set indexable=true. Does not set consumer_eligible.
 */
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { loadEnvFiles, resolveDatabaseUrl } from '../lib/state-hhg/calibration/db';
import { LOCAL_CANARY_WAVE_ID } from '../lib/state-hhg/canary/types';
import { loadExactCanaryManifests } from '../lib/state-hhg/canary/manifest';
import {
  FL_STATE_WAVE_1_ID,
  computeWave1DryRunDelta,
  loadWave1Manifest,
  validateWave1ApplyPreconditions,
  type Wave1LiveRow,
} from '../lib/state-hhg/fl/wave-1';

const apply = process.argv.includes('--apply');
const hashArg = process.argv.find((a) => a.startsWith('--hash='))?.slice('--hash='.length);
const EXPECTED_HASH = 'a9165ec652ad7a27';

async function freeze(client: pg.Client) {
  const c = await client.query(`
    SELECT count(*)::int AS companies,
           count(*) FILTER (WHERE indexable)::int AS indexable,
           count(*) FILTER (WHERE publication_state='INGESTED')::int AS ingested,
           count(*) FILTER (WHERE publication_state='PUBLISHABLE')::int AS publishable
      FROM companies`);
  const psa = await client.query(`
    SELECT count(*) FILTER (WHERE state_code='FL')::int AS fl_psa,
           count(*) FILTER (WHERE company_id IS NOT NULL)::int AS psa_attached
      FROM provider_state_authority`);
  const keep80 = await client.query(
    `SELECT state_code, count(*)::int AS n FROM local_hhg_canary_publication
      WHERE wave_id=$1 AND status='published' GROUP BY 1`,
    [LOCAL_CANARY_WAVE_ID]
  );
  const wave = await client.query(
    `SELECT count(*)::int AS n FROM local_hhg_canary_publication WHERE wave_id=$1 AND status='published'`,
    [FL_STATE_WAVE_1_ID]
  );
  const canaryBy: Record<string, number> = {};
  for (const row of keep80.rows) canaryBy[String(row.state_code)] = Number(row.n);
  return {
    ...c.rows[0],
    ...psa.rows[0],
    canary_fl: canaryBy.FL ?? 0,
    canary_wa: canaryBy.WA ?? 0,
    canary_total: (canaryBy.FL ?? 0) + (canaryBy.WA ?? 0),
    wave1_membership: Number(wave.rows[0]?.n ?? 0),
  };
}

function liveRows(
  manifest: ReturnType<typeof loadWave1Manifest>,
  companies: { rows: Array<{ id: string; publication_state: string; indexable: boolean }> },
  psaBy: Map<string, Array<{ authority_number: string; status: string }>>,
  keep80Set: Set<string>,
  canaryIds: string[]
): Wave1LiveRow[] {
  return manifest.members.map((m) => {
    const c = companies.rows.find((r) => r.id === m.companyId);
    const auth = (psaBy.get(m.companyId) ?? []).find((a) =>
      String(a.authority_number).toUpperCase().startsWith('IM')
    );
    return {
      companyId: m.companyId,
      publicationState: c?.publication_state ?? 'MISSING',
      indexable: c?.indexable === true,
      authorityStatus: String(auth?.status ?? 'missing'),
      inKeep80Canary: keep80Set.has(m.companyId) || canaryIds.includes(m.companyId),
    };
  });
}

async function main() {
  loadEnvFiles();
  const manifest = loadWave1Manifest();
  if (manifest.hash !== EXPECTED_HASH) {
    throw new Error(`Manifest hash ${manifest.hash} != expected ${EXPECTED_HASH}`);
  }
  const canary = loadExactCanaryManifests();
  const ids = manifest.members.map((m) => m.companyId);

  const client = new pg.Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  });
  await client.connect();

  const freezeBefore = await freeze(client);
  const companies = await client.query(
    `SELECT id, slug, publication_state, indexable, phone, email FROM companies WHERE id = ANY($1::text[])`,
    [ids]
  );
  const psa = await client.query(
    `SELECT company_id, authority_number, status FROM provider_state_authority
      WHERE state_code='FL' AND company_id = ANY($1::text[])`,
    [ids]
  );
  const keep80 = await client.query(
    `SELECT company_id FROM local_hhg_canary_publication
      WHERE wave_id=$1 AND company_id = ANY($2::text[])`,
    [LOCAL_CANARY_WAVE_ID, ids]
  );
  const keep80Set = new Set(keep80.rows.map((r: { company_id: string }) => r.company_id));
  const psaBy = new Map<string, Array<{ authority_number: string; status: string }>>();
  for (const row of psa.rows) {
    const id = String(row.company_id);
    psaBy.set(id, [...(psaBy.get(id) ?? []), row as { authority_number: string; status: string }]);
  }
  const live = liveRows(manifest, companies, psaBy, keep80Set, canary.companyIds);
  const pre = validateWave1ApplyPreconditions(manifest, live, apply ? hashArg ?? '' : manifest.hash);
  const delta = computeWave1DryRunDelta(manifest, { rows: live });

  if (!apply) {
    const freezeAfter = await freeze(client);
    await client.end();
    const out = {
      google_places_requests: 0,
      apply_executed: false,
      dry_run: true,
      hash: manifest.hash,
      count: ids.length,
      preconditions: pre,
      delta,
      freeze_before: freezeBefore,
      freeze_after: freezeAfter,
    };
    mkdirSync(resolve(process.cwd(), 'docs'), { recursive: true });
    writeFileSync(resolve(process.cwd(), 'docs/task-fl-010-dry-run.json'), JSON.stringify(out, null, 2) + '\n');
    console.log(JSON.stringify(out, null, 2));
    return;
  }

  if (hashArg !== manifest.hash) {
    await client.end();
    throw new Error('Apply refused: --hash must equal frozen Wave 1 hash.');
  }
  if (!pre.ok || !delta.ok || delta.indexable !== 0) {
    await client.end();
    throw new Error(`Apply refused: ${pre.reasons.join(', ') || 'delta not ok'}`);
  }
  if (ids.length !== 37) {
    await client.end();
    throw new Error(`Apply refused: count ${ids.length} != 37`);
  }

  await client.query('BEGIN');
  try {
    const updated = await client.query(
      `UPDATE public.companies
          SET publication_state = 'PUBLISHABLE',
              indexable = false,
              legacy_directory_row = false,
              updated_at = now()
        WHERE id = ANY($1::text[])
          AND id LIKE 'fl-im-%'
          AND publication_state = 'INGESTED'
          AND indexable = false
      RETURNING id`,
      [ids]
    );
    if (updated.rowCount !== 37) {
      throw new Error(`Partial apply blocked: updated ${updated.rowCount} != 37`);
    }

    for (const m of manifest.members) {
      if (!m.countyFips || !m.slug) throw new Error(`Missing slug/fips for ${m.companyId}`);
      await client.query(
        `INSERT INTO public.local_hhg_canary_publication (
           wave_id, company_id, state_code, slug, home_county_fips,
           authority_number, published_at, status, source
         ) VALUES ($1,$2,'FL',$3,$4,$5,now(),'published',$6)
         ON CONFLICT (wave_id, company_id) DO UPDATE SET
           status = 'published',
           slug = EXCLUDED.slug,
           home_county_fips = EXCLUDED.home_county_fips,
           authority_number = EXCLUDED.authority_number,
           published_at = COALESCE(local_hhg_canary_publication.published_at, now())`,
        [
          FL_STATE_WAVE_1_ID,
          m.companyId,
          m.slug,
          m.countyFips,
          m.fdacsIm,
          'task_fl_010_state_wave_1',
        ]
      );
    }

    const verify = await client.query(
      `SELECT
         count(*) FILTER (WHERE publication_state='PUBLISHABLE' AND indexable=false)::int AS pub,
         count(*) FILTER (WHERE publication_state='INGESTED')::int AS ingested,
         count(*) FILTER (WHERE indexable)::int AS indexable_true
        FROM companies WHERE id = ANY($1::text[])`,
      [ids]
    );
    const mem = await client.query(
      `SELECT count(*)::int AS n FROM local_hhg_canary_publication
        WHERE wave_id=$1 AND status='published' AND company_id = ANY($2::text[])`,
      [FL_STATE_WAVE_1_ID, ids]
    );
    const extras = await client.query(
      `SELECT count(*)::int AS n FROM local_hhg_canary_publication
        WHERE wave_id=$1 AND company_id <> ALL($2::text[])`,
      [FL_STATE_WAVE_1_ID, ids]
    );
    const keep80After = await client.query(
      `SELECT count(*)::int AS n FROM local_hhg_canary_publication
        WHERE wave_id=$1 AND status='published'`,
      [LOCAL_CANARY_WAVE_ID]
    );
    if (Number(verify.rows[0].pub) !== 37 || Number(verify.rows[0].ingested) !== 0) {
      throw new Error(`Post-apply verify failed: ${JSON.stringify(verify.rows[0])}`);
    }
    if (Number(verify.rows[0].indexable_true) !== 0) {
      throw new Error('Indexable delta detected — abort');
    }
    if (Number(mem.rows[0].n) !== 37 || Number(extras.rows[0].n) !== 0) {
      throw new Error('Wave membership mismatch — abort');
    }
    if (Number(keep80After.rows[0].n) !== 80) {
      throw new Error(`KEEP_80 changed to ${keep80After.rows[0].n} — abort`);
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    await client.end();
    throw err;
  }

  const freezeAfter = await freeze(client);
  const post = await client.query(
    `SELECT id, slug, publication_state, indexable FROM companies WHERE id = ANY($1::text[]) ORDER BY id`,
    [ids]
  );
  await client.end();

  const result = {
    google_places_requests: 0,
    apply_executed: true,
    hash: manifest.hash,
    rows_transitioned: 37,
    wave_membership_rows: 37,
    freeze_before: freezeBefore,
    freeze_after: freezeAfter,
    members: post.rows,
    transaction: 'COMMIT',
  };
  mkdirSync(resolve(process.cwd(), 'docs'), { recursive: true });
  writeFileSync(resolve(process.cwd(), 'docs/task-fl-010-apply.json'), JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify({ ...result, members: post.rows.length }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
