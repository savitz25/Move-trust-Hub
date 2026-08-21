/**
 * FL-009 — freeze Wave 1 + dry-run publication (apply forbidden unless --apply).
 * Google Places: 0. Does not change KEEP_80 canary.
 *
 * npx tsx scripts/run-task-fl-009-wave1-prepare.ts --dry-run
 * npx tsx scripts/run-task-fl-009-wave1-prepare.ts --apply --hash=<manifest-hash>
 */
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { loadEnvFiles, resolveDatabaseUrl } from '../lib/state-hhg/calibration/db';
import { LOCAL_CANARY_WAVE_ID } from '../lib/state-hhg/canary/types';
import { loadExactCanaryManifests } from '../lib/state-hhg/canary/manifest';
import {
  FL_009_GOOGLE_PLACES_REQUESTS,
  FL_STATE_WAVE_1_ID,
  abortConditions,
  computeWave1DryRunDelta,
  loadWave1Manifest,
  planWave1Rollback,
  validateWave1ApplyPreconditions,
  wave1DiscoveryContract,
  type Wave1LiveRow,
} from '../lib/state-hhg/fl/wave-1';

const apply = process.argv.includes('--apply');
const hashArg = process.argv.find((a) => a.startsWith('--hash='))?.slice('--hash='.length);

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
  const canary = await client.query(
    `SELECT state_code, count(*)::int AS n FROM local_hhg_canary_publication
      WHERE wave_id=$1 AND status='published' GROUP BY 1`,
    [LOCAL_CANARY_WAVE_ID]
  );
  const canaryBy: Record<string, number> = {};
  for (const row of canary.rows) canaryBy[String(row.state_code)] = Number(row.n);
  return {
    ...c.rows[0],
    ...psa.rows[0],
    canary_fl: canaryBy.FL ?? 0,
    canary_wa: canaryBy.WA ?? 0,
    canary_total: (canaryBy.FL ?? 0) + (canaryBy.WA ?? 0),
  };
}

async function main() {
  loadEnvFiles();
  const manifest = loadWave1Manifest();
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
    `SELECT id, slug, publication_state, indexable FROM companies WHERE id = ANY($1::text[])`,
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
  const psaBy = new Map<string, typeof psa.rows>();
  for (const row of psa.rows) {
    const id = String(row.company_id);
    psaBy.set(id, [...(psaBy.get(id) ?? []), row]);
  }

  const live: Wave1LiveRow[] = manifest.members.map((m) => {
    const c = companies.rows.find((r: { id: string }) => r.id === m.companyId) as
      | { publication_state: string; indexable: boolean }
      | undefined;
    const auth = (psaBy.get(m.companyId) ?? []).find((a: { authority_number: string }) =>
      String(a.authority_number).toUpperCase().startsWith('IM')
    );
    return {
      companyId: m.companyId,
      publicationState: c?.publication_state ?? 'MISSING',
      indexable: c?.indexable === true,
      authorityStatus: String(auth?.status ?? 'missing'),
      inKeep80Canary: keep80Set.has(m.companyId) || canary.companyIds.includes(m.companyId),
    };
  });

  const pre = validateWave1ApplyPreconditions(manifest, live, manifest.hash);
  const delta = computeWave1DryRunDelta(manifest, { rows: live });
  const rollback = planWave1Rollback(manifest);

  if (apply) {
    if (hashArg !== manifest.hash) {
      await client.end();
      throw new Error('FL-009/FL-010 apply refused: --hash must match frozen Wave 1 manifest hash.');
    }
    if (!pre.ok || !delta.ok) {
      await client.end();
      throw new Error(`Apply refused: ${pre.reasons.join(', ') || 'delta not ok'}`);
    }
    await client.end();
    throw new Error('FL-009 is dry-run only. Do not apply Wave 1 here. Use FL-010.');
  }

  const freezeAfter = await freeze(client);
  await client.end();

  const ingestedStill = live.filter((r) => r.publicationState === 'INGESTED' && !r.indexable).length;
  const docs = resolve(process.cwd(), 'docs');
  mkdirSync(docs, { recursive: true });

  const dryRun = {
    google_places_requests: FL_009_GOOGLE_PLACES_REQUESTS,
    apply_executed: false,
    wave_id: FL_STATE_WAVE_1_ID,
    membership_wave_id: FL_STATE_WAVE_1_ID,
    keep80_wave_id: LOCAL_CANARY_WAVE_ID,
    manifest_hash: manifest.hash,
    count: manifest.members.length,
    preconditions: pre,
    delta,
    discovery: wave1DiscoveryContract(),
    freeze_before: freezeBefore,
    freeze_after: freezeAfter,
    freeze_unchanged: JSON.stringify(freezeBefore) === JSON.stringify(freezeAfter),
    ingested_wave1: ingestedStill,
    abort_conditions: abortConditions(),
  };

  writeFileSync(resolve(docs, 'task-fl-009-dry-run-publication.json'), JSON.stringify(dryRun, null, 2) + '\n');
  writeFileSync(
    resolve(docs, 'task-fl-009-dry-run-rollback.json'),
    JSON.stringify(
      {
        google_places_requests: 0,
        apply_executed: false,
        rollback,
        expected: {
          publication_state: 'INGESTED',
          indexable: false,
          companies: 0,
          keep80_untouched: true,
        },
      },
      null,
      2
    ) + '\n'
  );
  writeFileSync(
    resolve(docs, 'task-fl-009-rollback.sql'),
    `-- FL-010 rollback for ${FL_STATE_WAVE_1_ID} only. Hash ${manifest.hash}.
-- Does not touch KEEP_80 canary ${LOCAL_CANARY_WAVE_ID}.
BEGIN;
UPDATE public.companies
   SET publication_state = 'INGESTED',
       indexable = false,
       updated_at = now()
 WHERE id = ANY(ARRAY[${ids.map((id) => `'${id.replace(/'/g, "''")}'`).join(',')}])
   AND publication_state = 'PUBLISHABLE'
   AND indexable = false;
UPDATE public.local_hhg_canary_publication
   SET status = 'unpublished'
 WHERE wave_id = '${FL_STATE_WAVE_1_ID}'
   AND company_id = ANY(ARRAY[${ids.map((id) => `'${id.replace(/'/g, "''")}'`).join(',')}]);
COMMIT;
`
  );

  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        apply_executed: false,
        hash: manifest.hash,
        count: manifest.members.length,
        preconditions_ok: pre.ok,
        reasons: pre.reasons,
        delta,
        freeze_unchanged: dryRun.freeze_unchanged,
        freeze: freezeAfter,
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
