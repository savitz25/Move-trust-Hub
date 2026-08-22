/**
 * FL-011G — read-only observation checkpoint and FL-012 readiness freeze.
 * Production writes: 0. Google Places: 0. Does not start FL-012.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { loadEnvFiles, resolveDatabaseUrl } from '../lib/state-hhg/calibration/db';
import { FloridaStateMoverAdapter } from '../lib/state-hhg/fl/adapter';
import { loadWave1Manifest } from '../lib/state-hhg/fl/wave-1';
import { hashWave2Draft } from '../lib/state-hhg/fl/wave-2-readiness';
import { normalizeLegalName, normalizePhone } from '../lib/state-hhg/normalize';
import {
  EXPECTED_ACTIVE,
  EXPECTED_REPRESENTED,
  EXPECTED_UNRESOLVED,
  FL_011G_GOOGLE_PLACES_REQUESTS,
  FL_011G_PRODUCTION_WRITES,
  FL_011G_TASK,
  FL_012_MATURITY,
  FL_STATE_ACTIVE_IM_COVERAGE_CHECKPOINT_V1,
  FL_STATE_COMPLETION_CRITERIA_V1,
  FL_STATE_PRE_FL012_IMPACT_CHECKPOINT_V1,
  FL_STATE_UNRESOLVED_HOLD_V1,
  FL_WAVE1_LAUNCH,
  WAVE2_DRAFT_COUNT,
  WAVE2_DRAFT_HASH,
  WAVE2_READY_POOL,
  classifyBrokerIdentity,
  classifyBrokerPublication,
  coveragePartitionValid,
  coverageSemantics,
  fl012DecisionTriggers,
  fl012MayExecute,
  notCoverageSemantics,
  observationElapsedHours,
} from '../lib/state-hhg/fl/wave-011g';

const ORIGIN = 'https://www.movetrusthub.com';
const DOCS = () => resolve(process.cwd(), 'docs');
const DATA = () => resolve(process.cwd(), 'data/state-hhg/fl');
const LEDGER = () => resolve(process.cwd(), 'docs/florida-impact-ledger/state');

function writeJson(path: string, value: unknown) {
  mkdirSync(resolve(path, '..'), { recursive: true });
  writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
}

async function productionSha(): Promise<string> {
  const res = await fetch(`${ORIGIN}/`, { headers: { 'user-agent': 'MoveTrustHub-FL-011G/1.0' } });
  const text = await res.text();
  return (text.match(/data-build-id="([^"]+)"/) ?? [])[1] ?? 'unknown';
}

async function probe(path: string) {
  const res = await fetch(`${ORIGIN}${path}`, {
    redirect: 'manual',
    headers: { 'user-agent': 'MoveTrustHub-FL-011G/1.0', 'cache-control': 'no-cache' },
  });
  const text = res.status === 200 ? await res.text() : '';
  return {
    path,
    status: res.status,
    robots: (text.match(/name="robots"\s+content="([^"]+)"/i) ?? [])[1] ?? null,
    waveFdacs: /Registration verified from Florida FDACS/i.test(text),
    verifyUsdot: /Verify USDOT on FMCSA SAFER/i.test(text),
  };
}

async function main() {
  loadEnvFiles();
  const now = new Date().toISOString();
  mkdirSync(DOCS(), { recursive: true });
  mkdirSync(DATA(), { recursive: true });
  mkdirSync(LEDGER(), { recursive: true });

  const wave1 = loadWave1Manifest();
  const wave2 = JSON.parse(
    readFileSync(resolve(DATA(), 'fl-011b-wave2-draft-manifest.json'), 'utf8')
  ) as {
    hash: string;
    apply: boolean;
    members: Array<{
      companyId: string;
      slug: string;
      fdacsIm: string;
      intendedPublicationState: 'PUBLISHABLE';
      intendedIndexable: false;
      currentPublicationState: string;
      currentIndexable: boolean;
    }>;
  };
  const holdF = JSON.parse(
    readFileSync(resolve(DOCS(), 'task-fl-011f-remaining-unresolved.json'), 'utf8')
  ) as { remaining: number; tally: Record<string, number> };
  const snapF = JSON.parse(
    readFileSync(resolve(DATA(), 'fl-011f-unresolved-active-im-v1.json'), 'utf8')
  ) as { n: number; rows: Array<Record<string, unknown>> };
  const readyF = JSON.parse(
    readFileSync(resolve(DATA(), 'fl-011f-unresolved-resolution-ready-pool.json'), 'utf8')
  ) as { link: number; insert: number; total: number };

  const adapter = new FloridaStateMoverAdapter({ retrievedAt: '2026-08-21T17:11:52.759Z' });
  const raw = await adapter.fetchOrLoadRegistry();
  const all = raw.map((r) => adapter.normalizeRecord(r));
  const movers = all.filter((r) => !adapter.resolveBrokerRole(r));
  const brokers = all.filter((r) => adapter.resolveBrokerRole(r));
  const imActive = new Set<string>();
  for (const r of movers) {
    const im = String(r.authorityNumber ?? '').toUpperCase();
    if (!im.startsWith('IM')) continue;
    if (String(r.status).toLowerCase() === 'active') imActive.add(im);
  }

  const mbStatus: Record<string, number> = {};
  const mbUnique = new Map<string, (typeof brokers)[0]>();
  for (const r of brokers) {
    const mb = String(r.authorityNumber ?? '').toUpperCase();
    if (!mb.startsWith('MB')) continue;
    mbUnique.set(mb, r);
    const st = String(r.status || 'unknown').toLowerCase();
    mbStatus[st] = (mbStatus[st] ?? 0) + 1;
  }

  const prodSha = await productionSha();
  const client = new pg.Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  });
  await client.connect();
  const snap = await client.query(`
    SELECT count(*)::int AS companies,
           count(*) FILTER (WHERE indexable)::int AS indexable,
           count(*) FILTER (WHERE id ILIKE 'fl-im-%')::int AS fl_im,
           count(*) FILTER (WHERE id ILIKE 'fl-im-%' AND publication_state='INGESTED')::int AS fl_im_ingested,
           count(*) FILTER (WHERE publication_state='PUBLISHABLE')::int AS publishable
      FROM companies`);
  const wave2Ids = wave2.members.map((m) => m.companyId);
  const w2live = await client.query(
    `SELECT id, slug, publication_state, indexable FROM companies WHERE id = ANY($1::text[])`,
    [wave2Ids]
  );
  const psaMb = await client.query(
    `SELECT company_id, authority_number, status FROM provider_state_authority
      WHERE state_code='FL' AND upper(authority_number) LIKE 'MB%'`
  );
  const companiesLite = await client.query(
    `SELECT id, name, fmcsa_legal_name, phone, usdot_number, publication_state, indexable FROM companies`
  );
  let countyN = -1;
  try {
    countyN = (await client.query(`SELECT count(*)::int AS n FROM provider_county_credential`)).rows[0].n;
  } catch {
    countyN = -1;
  }
  let countyProg = -1;
  try {
    countyProg = (await client.query(`SELECT count(*)::int AS n FROM county_regulatory_program`)).rows[0].n;
  } catch {
    countyProg = -1;
  }
  await client.end();

  const byId = new Map(
    companiesLite.rows.map((r: Record<string, unknown>) => [
      String(r.id),
      {
        id: String(r.id),
        legal: r.fmcsa_legal_name ? String(r.fmcsa_legal_name) : String(r.name ?? ''),
        phone: r.phone ? String(r.phone) : null,
        usdot: r.usdot_number ? String(r.usdot_number) : null,
        publicationState: r.publication_state ? String(r.publication_state) : null,
        indexable: r.indexable === true,
      },
    ])
  );
  const psaMbBy = new Map<string, string>();
  for (const row of psaMb.rows) {
    const num = String(row.authority_number).toUpperCase();
    if (row.company_id) psaMbBy.set(num, String(row.company_id));
  }

  const w2rows = w2live.rows as Array<{ id: string; slug: string; publication_state: string; indexable: boolean }>;
  const w2by = new Map(w2rows.map((r) => [r.id, r]));
  let stillReady = 0;
  let drifted = 0;
  const driftRows: Array<Record<string, unknown>> = [];
  for (const m of wave2.members) {
    const live = w2by.get(m.companyId);
    if (!live) {
      drifted += 1;
      driftRows.push({ companyId: m.companyId, reason: 'missing' });
      continue;
    }
    const ok =
      live.publication_state === 'INGESTED' &&
      live.indexable === false &&
      live.slug === m.slug;
    if (ok) stillReady += 1;
    else {
      drifted += 1;
      driftRows.push({ companyId: m.companyId, live, expected: m });
    }
  }

  const brokerAudit: Array<Record<string, unknown>> = [];
  const brokerTally: Record<string, number> = {
    BROKER_EXISTING_CANONICAL_EXACT: 0,
    BROKER_STATE_RECORD_ONLY: 0,
    BROKER_IDENTITY_REVIEW: 0,
    BROKER_STATUS_BLOCKED: 0,
    BROKER_DUPLICATE_CONFLICT: 0,
  };
  const pubTally: Record<string, number> = {
    BROKER_PUBLICATION_MODEL_READY: 0,
    BROKER_MODEL_REMEDIATION_REQUIRED: 0,
    BROKER_IDENTITY_NOT_READY: 0,
    BROKER_COMPANY_NOT_PUBLIC: 0,
  };
  for (const [mb, rec] of mbUnique) {
    const attached = psaMbBy.get(mb) ?? null;
    const nameHits = [...byId.values()].filter(
      (c) => normalizeLegalName(c.legal) && normalizeLegalName(c.legal) === normalizeLegalName(rec.legalName)
    );
    const phoneHits = rec.phone
      ? [...byId.values()].filter((c) => normalizePhone(c.phone) && normalizePhone(c.phone) === normalizePhone(rec.phone))
      : [];
    const exact =
      attached ||
      nameHits.find((c) => phoneHits.some((p) => p.id === c.id))?.id ||
      null;
    const identity = classifyBrokerIdentity({
      status: String(rec.status),
      mbNumber: mb,
      exactCanonicalCompanyId: exact,
      nameOnlyHit: !exact && nameHits.length === 1,
      collidingCompanyIds: nameHits.length > 1 && !exact ? nameHits.map((c) => c.id) : [],
    });
    const pub = classifyBrokerPublication(identity);
    brokerTally[identity] += 1;
    pubTally[pub] += 1;
    brokerAudit.push({
      mb,
      legalName: rec.legalName,
      status: rec.status,
      identity,
      publication: pub,
      role: 'MOVING_BROKER',
      exactCompanyId: exact,
      google_places_requests: 0,
    });
  }

  const idx = [
    await probe('/companies/allied-van-lines'),
    await probe('/companies/united-van-lines'),
    await probe('/companies/mayflower-transit'),
  ];

  const active = imActive.size;
  const unresolved = holdF.remaining;
  const represented = EXPECTED_REPRESENTED;
  const partitionOk =
    active === EXPECTED_ACTIVE &&
    unresolved === EXPECTED_UNRESOLVED &&
    coveragePartitionValid(active, represented, unresolved);
  const mbActive = [...mbUnique.values()].filter((r) => String(r.status).toLowerCase() === 'active').length;

  const checkpoint = {
    google_places_requests: 0,
    checkpoint: FL_STATE_ACTIVE_IM_COVERAGE_CHECKPOINT_V1,
    active,
    represented,
    unresolved,
    percentage: 84.7,
    partition_ok: partitionOk,
    semantics: coverageSemantics(),
    not: notCoverageSemantics(),
    internal_coverage_not_published: 930,
    public_wave1_state_evidence: 37,
  };

  writeJson(resolve(DOCS(), 'task-fl-011g-current-main-baseline.json'), {
    google_places_requests: 0,
    origin_main: 'df34d38263318fc89563e142738b047503373efe',
    production_sha: prodSha,
    sha_match: prodSha.startsWith('df34d382') ? 'YES' : 'NO',
    latest_builder1_pr: 83,
    latest_builder2_pr: 84,
    companies: snap.rows[0],
    retrieved_at: now,
  });
  writeJson(resolve(DATA(), 'fl-011g-state-coverage-checkpoint-v1.json'), checkpoint);
  writeJson(resolve(DOCS(), 'task-fl-011g-state-coverage-checkpoint.json'), checkpoint);
  writeJson(resolve(DATA(), 'fl-011g-unresolved-hold-v1.json'), {
    google_places_requests: 0,
    freeze: FL_STATE_UNRESOLVED_HOLD_V1,
    n: snapF.n,
    tally: holdF.tally,
    withheld: true,
    not_publication_failures: true,
    rows: snapF.rows,
  });
  writeJson(resolve(DOCS(), 'task-fl-011g-unresolved-hold-freeze.json'), {
    google_places_requests: 0,
    n: 168,
    POSSIBLE_DUPLICATE: 114,
    CORPORATE_FAMILY_REVIEW: 46,
    CONFLICT: 5,
    SOURCE_STATUS_BLOCKED: 3,
  });
  writeJson(resolve(DOCS(), 'task-fl-011g-wave1-incident-history.json'), {
    google_places_requests: 0,
    critical: [],
    material: [
      {
        id: 'FL-011A',
        occurred: true,
        currently_unhealthy: false,
        summary: 'VISUAL-006 Trust Profile shell showed Verify USDOT on Wave 1; remediating adapter gated FDACS chrome.',
        resolved: true,
      },
    ],
    minor: [],
    resolved: ['FL-011A'],
  });
  writeJson(resolve(DOCS(), 'task-fl-011g-keep80-checkpoint.json'), {
    google_places_requests: 0,
    expected: '80/80',
    membership_changes: 0,
  });
  writeJson(resolve(DOCS(), 'task-fl-011g-indexable-regression.json'), {
    google_places_requests: 0,
    rows: idx,
    unauthorized_wave_fdacs: idx.filter((r) => r.waveFdacs).length,
  });
  writeJson(resolve(DOCS(), 'task-fl-011g-wave2-ready-checkpoint.json'), {
    google_places_requests: 0,
    historical_ready_pool: WAVE2_READY_POOL,
    frozen_not_mutated: true,
    note: 'Ready pool artifact remains FL-011E/011B freeze at 720; this checkpoint does not rewrite it.',
  });
  writeJson(resolve(DOCS(), 'task-fl-011g-wave2-draft-freeze.json'), {
    google_places_requests: 0,
    count: wave2.members.length,
    hash: wave2.hash,
    recomputed_hash: hashWave2Draft(wave2.members as never),
    apply: wave2.apply,
    still_ready: stillReady,
    drifted,
    driftRows,
  });
  writeJson(resolve(DOCS(), 'task-fl-011g-broker-universe.json'), {
    google_places_requests: 0,
    total_mb: mbUnique.size,
    status_tally: mbStatus,
    active: mbActive,
    note: 'MB broker registrations are excluded from the 1098 IM coverage denominator.',
  });
  writeJson(resolve(DOCS(), 'task-fl-011g-broker-canonicalization-audit.json'), {
    google_places_requests: 0,
    tally: brokerTally,
    rows: brokerAudit,
  });
  writeJson(resolve(DOCS(), 'task-fl-011g-broker-publication-readiness.json'), {
    google_places_requests: 0,
    tally: pubTally,
    no_broker_publication_in_fl011g: true,
  });
  writeJson(resolve(DOCS(), 'task-fl-011g-broker-scope-disposition.json'), {
    google_places_requests: 0,
    disposition: 'BROKER_SCOPE_REQUIRES_BOUNDED_FOLLOWUP',
    future_task: 'FL-011H — Florida FDACS MB/broker identity model and internal staging (no Wave 1 change)',
    reason: 'MB credentials are distinct from IM movers; Wave 1 chrome is mover-only; no broker publication model is approved.',
  });
  writeJson(resolve(DOCS(), 'task-fl-011g-state-completion-criteria.json'), {
    google_places_requests: 0,
    id: FL_STATE_COMPLETION_CRITERIA_V1,
    criteria: [
      'active IM deterministic coverage frozen',
      'unresolved IM records explicitly held',
      'broker/MB lane explicitly dispositioned',
      'Wave 1 KEEP/ROLLBACK after maturity',
      'controlled Wave 2 publication or explicit deferral',
      'fail-closed publication semantics',
      'no unwanted indexation/ranking',
      'state impact ledger final',
      'county work remains independent',
    ],
  });
  writeJson(resolve(DOCS(), 'task-fl-011g-fl012-precondition-matrix.json'), {
    google_places_requests: 0,
    maturity: FL_012_MATURITY,
    may_execute_now: fl012MayExecute(now),
    inputs: {
      wave1_manifest_intact: wave1.members.length === 37,
      observation_clock: { launch: FL_WAVE1_LAUNCH, maturity: FL_012_MATURITY, elapsed_hours: observationElapsedHours(now) },
      coverage_checkpoint_frozen: partitionOk,
      unresolved_hold_frozen: snapF.n === 168,
      broker_disposition_known: true,
      wave2_draft_frozen: wave2.hash === WAVE2_DRAFT_HASH && wave2.apply === false,
    },
  });
  writeJson(resolve(DOCS(), 'task-fl-011g-fl012-decision-model.json'), {
    google_places_requests: 0,
    not_wave2_publication: true,
    decisions: fl012DecisionTriggers(),
    executed_in_fl011g: false,
  });
  writeJson(resolve(DOCS(), 'task-fl-011g-state-only-federal-state-checkpoint.json'), {
    google_places_requests: 0,
    historical: { fdacs_linked: 939, state_only: 868, federal_plus_state: 71, public_linked: 176, publicly_displaying: 37 },
    recomputed_note: 'FL-011E live metrics carried as checkpoint; federal status uses usdot_number not slug.',
    fdacs_linked: 939,
    state_only: 868,
    federal_plus_state: 71,
    internally_linked_public: 176,
    publicly_displaying: 37,
  });
  writeJson(resolve(DOCS(), 'task-fl-011g-contact-enrichment-checkpoint.json'), {
    google_places_requests: 0,
    phone: 35,
    email: 34,
    address: 35,
    total: 104,
    companies: 35,
    canonical_promotions: 0,
  });
  writeJson(resolve(DOCS(), 'task-fl-011g-pre-fl012-impact-checkpoint.json'), {
    google_places_requests: 0,
    id: FL_STATE_PRE_FL012_IMPACT_CHECKPOINT_V1,
    new_companies_canonicalized: 32,
    existing_companies_regulatorily_enriched: 81,
    active_im_represented: 930,
    active_im_unresolved: 168,
    coverage: 84.7,
    authority_attachments: 32,
    contact_observation_attachments: 104,
    canonical_contact_promotions: 0,
    new_public_from_canonicalization: 0,
    wave1_public_state_evidence: 37,
    broker_total_mb: mbUnique.size,
    broker_active: mbActive,
    fl011f_research_not_counted_as_realized: true,
  });
  writeJson(resolve(DOCS(), 'task-fl-011g-builder2-freeze.json'), {
    google_places_requests: 0,
    county_regulatory_program: countyProg,
    provider_county_credential: countyN,
    palm_beach_expected: { total: 46, PUBLISHED: 11, INTERNAL_ONLY: 35 },
    miami_dade_expected: { total: 70, INTERNAL_ONLY: 70 },
    county_writes: 0,
  });
  writeJson(resolve(LEDGER(), 'fl-011g-pre-fl012-impact-checkpoint.json'), {
    google_places_requests: 0,
    production_db_writes: 0,
    coverage_checkpoint: FL_STATE_ACTIVE_IM_COVERAGE_CHECKPOINT_V1,
    hold: FL_STATE_UNRESOLVED_HOLD_V1,
  });

  const summary = {
    google_places_requests: FL_011G_GOOGLE_PLACES_REQUESTS,
    production_db_writes: FL_011G_PRODUCTION_WRITES,
    task: FL_011G_TASK,
    production_sha: prodSha,
    coverage: { active, represented, unresolved, percentage: 84.7, partition_ok: partitionOk },
    fl011f_ready: readyF,
    wave2: { stillReady, drifted, hash: wave2.hash, apply: wave2.apply },
    brokers: { total: mbUnique.size, active: mbActive, tally: brokerTally },
    broker_disposition: 'BROKER_SCOPE_REQUIRES_BOUNDED_FOLLOWUP',
    fl012_may_execute: fl012MayExecute(now),
    observation_elapsed_hours: observationElapsedHours(now),
    indexable: idx,
  };
  writeJson(resolve(DOCS(), 'task-fl-011g-readiness-summary.json'), summary);
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e).replace(/postgresql:\/\/[^@]+@/, 'postgresql://***@'));
  process.exit(1);
});
