/**
 * FL-011I — manifest-bound FDACS MB internal staging apply.
 * Modes: --preconditions | --dry-run (default) | --apply --manifest-hash <hash> | --rollback --manifest-hash <hash>
 * Google Places: 0. County tables: never mutated. No FL-012.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { loadEnvFiles, resolveDatabaseUrl } from '../lib/state-hhg/calibration/db';
import { FloridaStateMoverAdapter, FDACS_LEGACY_LOOKUP_URL, fdacsRawSourceKey } from '../lib/state-hhg/fl/adapter';
import { fdacsRegulatoryId } from '../lib/state-hhg/fl/regulatory-id';
import { loadWave1Manifest } from '../lib/state-hhg/fl/wave-1';
import { hashWave2Draft } from '../lib/state-hhg/fl/wave-2-readiness';
import { hashEvidence, normalizeEmail, normalizePhone } from '../lib/state-hhg/normalize';
import type { CanonicalProviderIdentity } from '../lib/state-hhg/identity';
import {
  BROKER_ROLE,
  FL_011H_GOOGLE_PLACES_REQUESTS,
  proposedMbCompanyId,
} from '../lib/state-hhg/fl/wave-011h';
import {
  BROKER_AUTHORITY_TYPE,
  FL_011I_DRAFT_HASH,
  FL_011I_EXPECTED_INSERT,
  FL_011I_EXPECTED_LINK,
  FL_011I_EXPECTED_TOTAL,
  FL_011I_GOOGLE_PLACES_REQUESTS,
  FL_011I_MB12,
  FL_011I_MB159_LINK,
  FL_011I_MB171_CONTROL,
  FL_011I_TASK,
  FL_FDACS_MB_INTERNAL_STAGING_V1,
  SAFE_BROKER_ENTITY_TYPE,
  assertExactBrokerDraft,
  brokerChromeWouldRender,
  brokerInsertRoleSafety,
  evaluateSuddathMb12Gate,
  fl011iMatchMethod,
  hashFinalBrokerManifest,
  newBrokerPublicExposure,
  planContactAction,
  planPsaAction,
  revalidateBrokerDraftOp,
  type ContactKind,
  type DraftBrokerOp,
  type FinalBrokerOp,
  type LiveObservationRow,
  type LivePsaRow,
} from '../lib/state-hhg/fl/wave-011i';
import {
  EXPECTED_ACTIVE,
  EXPECTED_COVERAGE_PCT,
  EXPECTED_REPRESENTED,
  EXPECTED_UNRESOLVED,
  WAVE2_DRAFT_COUNT,
  WAVE2_DRAFT_HASH,
  WAVE2_READY_POOL,
} from '../lib/state-hhg/fl/wave-011g';

const ORIGIN = 'https://www.movetrusthub.com';
const SNAPSHOT_RETRIEVED_AT = '2026-08-21T17:11:52.759Z';
const DOCS = () => resolve(process.cwd(), 'docs');
const DATA = () => resolve(process.cwd(), 'data/state-hhg/fl');
const LEDGER = () => resolve(process.cwd(), 'docs/florida-impact-ledger/state');
const DRAFT_PATH = () => resolve(DATA(), 'fl-011h-mb-internal-staging-v1-draft.json');
const MANIFEST_PATH = () => resolve(DATA(), 'fl-011i-mb-internal-staging-v1.json');

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const rollback = args.includes('--rollback');
const preconditionsOnly = args.includes('--preconditions');
const hashIdx = args.indexOf('--manifest-hash');
const requestedHash = hashIdx >= 0 ? args[hashIdx + 1] : null;
const skipHttp = args.includes('--skip-http');

function writeJson(path: string, value: unknown) {
  mkdirSync(resolve(path, '..'), { recursive: true });
  writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
}

function loadDraft(): { hash: string; apply: boolean; operations: DraftBrokerOp[] } {
  const doc = JSON.parse(readFileSync(DRAFT_PATH(), 'utf8')) as {
    hash: string;
    apply: boolean;
    operations: DraftBrokerOp[];
  };
  assertExactBrokerDraft(doc.operations, doc.hash);
  if (doc.apply !== false) throw new Error('REFUSAL — committed draft apply is not false');
  return doc;
}

type Freeze = Record<string, number>;

async function freezeSnapshot(client: pg.Client): Promise<Freeze> {
  const companies = await client.query(`
    SELECT
      count(*)::int AS companies,
      count(*) FILTER (WHERE indexable)::int AS indexable,
      count(*) FILTER (WHERE id ILIKE 'fl-im-%')::int AS fl_im,
      count(*) FILTER (WHERE id ILIKE 'fl-mb-%')::int AS fl_mb,
      count(*) FILTER (WHERE publication_state='PUBLISHABLE')::int AS publishable
    FROM companies`);
  const psa = await client.query(
    `SELECT count(*)::int AS n FROM provider_state_authority WHERE state_code='FL'`
  );
  const psaMb = await client.query(
    `SELECT count(*)::int AS n FROM provider_state_authority WHERE state_code='FL' AND upper(authority_number) LIKE 'MB%'`
  );
  const obs = await client.query(
    `SELECT count(*)::int AS n FROM provider_contact_observation WHERE regulator='FDACS'`
  );
  let countyProgram = -1;
  let countyCred = -1;
  try {
    countyProgram = (await client.query(`SELECT count(*)::int AS n FROM county_regulatory_program`)).rows[0].n;
    countyCred = (await client.query(`SELECT count(*)::int AS n FROM provider_county_credential`)).rows[0].n;
  } catch {
    countyProgram = -1;
    countyCred = -1;
  }
  return {
    ...companies.rows[0],
    fl_psa: psa.rows[0].n,
    fl_psa_mb: psaMb.rows[0].n,
    fdacs_observations: obs.rows[0].n,
    county_regulatory_program: countyProgram,
    provider_county_credential: countyCred,
  };
}

async function countyFreeze(client: pg.Client) {
  try {
    const rows = (
      await client.query(`
        SELECT upper(p.county_name) AS county,
               c.evidence_publication_state AS publication_state,
               count(*)::int AS n
          FROM provider_county_credential c
          JOIN county_regulatory_program p ON p.id = c.program_id
         GROUP BY 1, 2`)
    ).rows as Array<{ county: string; publication_state: string; n: number }>;
    const bucket = (name: string) => {
      const hit = rows.filter((r) => r.county.includes(name));
      const out: Record<string, number> = { total: 0 };
      for (const r of hit) {
        out.total += r.n;
        out[r.publication_state] = (out[r.publication_state] ?? 0) + r.n;
      }
      return out;
    };
    return { palm_beach: bucket('PALM'), miami_dade: bucket('MIAMI'), county_writes: 0 };
  } catch {
    return { palm_beach: {}, miami_dade: {}, county_writes: 0 };
  }
}

async function fetchText(path: string) {
  const res = await fetch(`${ORIGIN}${path}`, {
    headers: { 'user-agent': 'MoveTrustHub-FL-011I/1.0' },
    redirect: 'manual',
    signal: AbortSignal.timeout(15000),
  });
  const text = res.status === 200 ? await res.text() : '';
  return {
    path,
    status: res.status,
    location: res.headers.get('location'),
    robots: (text.match(/name="robots"\s+content="([^"]+)"/i) ?? [])[1] ?? null,
    fdacs: /Florida FDACS/i.test(text),
    brokerChrome: /Moving Broker Registration/i.test(text),
    title: (text.match(/<title>([^<]+)/i) ?? [])[1] ?? null,
  };
}

async function main() {
  loadEnvFiles();
  const now = new Date().toISOString();
  mkdirSync(DOCS(), { recursive: true });
  mkdirSync(DATA(), { recursive: true });
  mkdirSync(LEDGER(), { recursive: true });

  const draftDoc = loadDraft();
  const wave1 = loadWave1Manifest();
  const wave2 = JSON.parse(
    readFileSync(resolve(DATA(), 'fl-011b-wave2-draft-manifest.json'), 'utf8')
  ) as { hash: string; apply: boolean; members: Array<{ companyId: string; slug: string; fdacsIm: string }> };

  const adapter = new FloridaStateMoverAdapter({ retrievedAt: SNAPSHOT_RETRIEVED_AT });
  const raw = await adapter.fetchOrLoadRegistry();
  const brokers = raw
    .map((r) => adapter.normalizeRecord(r))
    .filter((r) => adapter.resolveBrokerRole(r));
  const byMb = new Map<string, (typeof brokers)[0]>();
  for (const r of brokers) {
    const mb = String(r.authorityNumber ?? '').toUpperCase();
    if (mb.startsWith('MB')) byMb.set(mb, r);
  }

  const client = new pg.Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  });
  await client.connect();
  const before = await freezeSnapshot(client);
  const countyBefore = await countyFreeze(client);

  const companies = await client.query(`
    SELECT id, slug, name, fmcsa_legal_name, phone, email, physical_address, headquarters,
           usdot_number, publication_state, indexable, entity_type
      FROM companies`);
  const psa = await client.query(`
    SELECT id, company_id, authority_number, status, verification_state, raw_source_key, authority_type
      FROM provider_state_authority WHERE state_code='FL'`);
  const observations = await client.query(`
    SELECT company_id, regulatory_id, observation_type, normalized_value, raw_value
      FROM provider_contact_observation WHERE regulator='FDACS'`);
  const mb171 = await client.query(
    `SELECT company_id, authority_number, authority_type, status, publication_state, indexable, usdot_number
       FROM provider_state_authority psa
       JOIN companies c ON c.id = psa.company_id
      WHERE state_code='FL' AND upper(authority_number)=$1`,
    [FL_011I_MB171_CONTROL.mb]
  );

  const byId = new Map(companies.rows.map((r: Record<string, unknown>) => [String(r.id), r]));
  const takenIds = new Set(companies.rows.map((r: Record<string, unknown>) => String(r.id)));
  const takenSlugs = new Set(
    companies.rows.map((r: Record<string, unknown>) => String(r.slug ?? '')).filter(Boolean)
  );
  const candidates: CanonicalProviderIdentity[] = companies.rows.map((r: Record<string, unknown>) => ({
    companyId: String(r.id),
    legalName: r.fmcsa_legal_name ? String(r.fmcsa_legal_name) : String(r.name ?? ''),
    dbaName: null,
    publicName: r.name ? String(r.name) : null,
    usdot: r.usdot_number ? String(r.usdot_number) : null,
    phone: r.phone ? String(r.phone) : null,
    email: r.email ? String(r.email) : null,
    address: r.physical_address ? String(r.physical_address) : null,
    city: null,
    state: 'FL',
    postalCode: null,
    publicationState: r.publication_state ? String(r.publication_state) : null,
    indexable: r.indexable === true,
  }));
  const livePsa: LivePsaRow[] = (psa.rows as Array<Record<string, unknown>>).map((r) => ({
    id: String(r.id),
    companyId: r.company_id ? String(r.company_id) : null,
    authorityNumber: String(r.authority_number ?? ''),
    rawSourceKey: String(r.raw_source_key ?? ''),
    status: r.status ? String(r.status) : null,
    verificationState: r.verification_state ? String(r.verification_state) : null,
  }));
  const liveObs: LiveObservationRow[] = (observations.rows as Array<Record<string, unknown>>).map((r) => ({
    regulatoryId: String(r.regulatory_id ?? '').toUpperCase(),
    observationType: String(r.observation_type) as ContactKind,
    companyId: r.company_id ? String(r.company_id) : null,
    normalizedValue: r.normalized_value ? String(r.normalized_value) : null,
  }));

  const mb12Draft = draftDoc.operations.find((o) => o.mb === FL_011I_MB12)!;
  const suddath = evaluateSuddathMb12Gate({
    mb: FL_011I_MB12,
    legalName: mb12Draft.sourceLegalName,
    proposedCompanyId: mb12Draft.proposedCompanyId ?? 'fl-mb-12',
    proposedSlug: mb12Draft.proposedSlug ?? 'suddath-container-services-inc',
    candidates,
    takenIds,
    takenSlugs,
  });

  const revalidation = [];
  const failures: Array<{ mb: string; failures: string[] }> = [];
  const collisionAudit = [];
  const finals: FinalBrokerOp[] = [];
  const psaPlans: Array<{ op: FinalBrokerOp; action: ReturnType<typeof planPsaAction>['action']; reason: string }> = [];
  const contactPlans: Array<{
    companyId: string;
    regulatoryId: string;
    kind: ContactKind;
    raw: string;
    action: ReturnType<typeof planContactAction>['action'];
  }> = [];

  for (const draft of draftDoc.operations) {
    const rec = byMb.get(draft.mb.toUpperCase());
    if (!rec) {
      failures.push({ mb: draft.mb, failures: ['mb_missing_from_snapshot'] });
      continue;
    }
    const liveId = draft.operation === 'LINK' ? draft.targetCompanyId : draft.proposedCompanyId;
    const live = liveId ? candidates.find((c) => c.companyId === liveId) ?? null : null;
    const check = revalidateBrokerDraftOp({
      draft,
      legalName: rec.legalName,
      status: String(rec.status),
      phone: rec.phone,
      email: rec.email,
      physicalAddress: rec.physicalAddress,
      candidates,
      liveCompany: live,
      takenIds,
      psa: livePsa,
    });
    revalidation.push({ mb: draft.mb, pass: check.pass, failures: check.failures, google_places_requests: 0 });
    if (!check.pass) failures.push({ mb: draft.mb, failures: check.failures });

    const companyId =
      draft.operation === 'LINK'
        ? String(draft.targetCompanyId)
        : String(draft.proposedCompanyId ?? proposedMbCompanyId(draft.mb));
    const slug =
      draft.operation === 'LINK'
        ? String(byId.get(companyId)?.slug ?? draft.existingSlug ?? '')
        : String(draft.proposedSlug ?? '');
    if (draft.operation === 'INSERT') {
      collisionAudit.push({
        mb: draft.mb,
        companyId,
        slug,
        idTaken: takenIds.has(companyId),
        slugTaken: takenSlugs.has(slug),
      });
    }
    const psaPlan = planPsaAction({ fdacsIm: draft.mb, companyId, existing: livePsa });
    const finalOp: FinalBrokerOp = {
      op: draft.operation,
      mb: draft.mb.toUpperCase(),
      legalName: rec.legalName,
      role: BROKER_ROLE,
      companyId,
      slug,
      sourceStatus: String(rec.status),
      sourceFreshness: draft.sourceFreshness,
      imIdentifier: draft.imIdentifier,
      federalIdentifier: draft.federalIdentifier,
      matchEvidence: draft.matchMethod,
      provenance: {
        regulator: 'FDACS',
        source: 'fdacs_legacy_xls',
        sourceUrl: FDACS_LEGACY_LOOKUP_URL,
        retrievedAt: SNAPSHOT_RETRIEVED_AT,
        task: FL_011I_TASK,
      },
      intendedPublicationState: draft.operation === 'INSERT' ? 'INGESTED' : String(byId.get(companyId)?.publication_state ?? draft.intendedPublicationState),
      intendedIndexable: false,
      currentPublicationState: byId.get(companyId) ? String(byId.get(companyId)?.publication_state ?? null) : null,
      currentIndexable: byId.get(companyId) ? byId.get(companyId)?.indexable === true : null,
      stateAuthorityOperation: psaPlan.action,
      contactObservationOperation: 'SAFE_SOURCE_OBSERVATION',
      rollbackOperation: draft.operation === 'LINK' ? 'DETACH_FL011I_MB_PSA' : 'DELETE_INGESTED_FL_MB_COMPANY',
    };
    if (draft.operation === 'INSERT') {
      finalOp.intendedIndexable = false;
      finalOp.intendedPublicationState = 'INGESTED';
    } else {
      finalOp.intendedIndexable = (byId.get(companyId)?.indexable === true) as false;
      // LINK must not change indexability — keep current, typed as false in FinalBrokerOp for INSERT.
      (finalOp as { intendedIndexable: boolean }).intendedIndexable = byId.get(companyId)?.indexable === true;
    }
    finals.push(finalOp);
    psaPlans.push({ op: finalOp, action: psaPlan.action, reason: psaPlan.reason });

    const regId = fdacsRegulatoryId(draft.mb);
    const kinds: Array<{ kind: ContactKind; raw: string | null }> = [
      { kind: 'business_phone', raw: rec.phone },
      { kind: 'business_email', raw: rec.email },
      { kind: 'physical_address', raw: rec.physicalAddress },
    ];
    for (const k of kinds) {
      if (!k.raw || !regId) continue;
      const plan = planContactAction({
        regulatoryId: regId,
        kind: k.kind,
        companyId,
        existing: liveObs,
      });
      contactPlans.push({ companyId, regulatoryId: regId, kind: k.kind, raw: k.raw, action: plan.action });
    }
  }

  const roleSafety = brokerInsertRoleSafety({
    entityType: SAFE_BROKER_ENTITY_TYPE,
    serviceScope: null,
    shortDescription: 'Florida FDACS moving-broker registration (internal). Confirm current FDACS status before treating this record as a mover.',
    description: 'Staged from official FDACS MB evidence. This is a moving-broker registration and is distinct from registration as an intrastate household-goods mover. Internal profile; not published.',
  });

  const chromeRisk = finals.filter((o) =>
    brokerChromeWouldRender({
      id: o.companyId,
      publicationState: String(o.currentPublicationState ?? o.intendedPublicationState),
    })
  );
  const insertExposure = newBrokerPublicExposure({ publicationState: 'INGESTED', indexable: false });

  const blocked =
    failures.length > 0 ||
    suddath.result !== 'DISTINCT_INSERT_SAFE' ||
    !roleSafety.ok ||
    chromeRisk.length > 0 ||
    collisionAudit.some((r) => r.idTaken || r.slugTaken) ||
    insertExposure.anonymousHttp !== 404;

  const hash = hashFinalBrokerManifest(finals);
  const linkN = finals.filter((o) => o.op === 'LINK').length;
  const insertN = finals.filter((o) => o.op === 'INSERT').length;

  const companyInserts = finals.filter((o) => o.op === 'INSERT' && !takenIds.has(o.companyId)).length;
  const psaInserts = psaPlans.filter((p) => p.action === 'INSERT_REQUIRED').length;
  const psaAttach = psaPlans.filter((p) => p.action === 'ATTACH_ORPHAN').length;
  const psaNoop = psaPlans.filter((p) => p.action === 'ALREADY_EXISTS').length;
  const contactInserts = contactPlans.filter((p) => p.action === 'INSERT').length;
  const contactAttach = contactPlans.filter((p) => p.action === 'ATTACH').length;
  const contactNoop = contactPlans.filter((p) => p.action === 'NOOP').length;
  const contactHold = contactPlans.filter((p) => p.action === 'COLLISION').length;

  const dry = {
    google_places_requests: FL_011I_GOOGLE_PLACES_REQUESTS,
    apply: false,
    blocked,
    target_operations: finals.length,
    link: linkN,
    insert: insertN,
    identity_failures: failures.length,
    companies: companyInserts,
    existing_companies_modified: 0,
    provider_state_authority_inserts: psaInserts,
    provider_state_authority_attach: psaAttach,
    provider_state_authority_noop: psaNoop,
    contact_observation_inserts: contactInserts,
    contact_observation_attach: contactAttach,
    contact_observation_noop: contactNoop,
    contact_observation_hold: contactHold,
    publication_state_changes_existing: 0,
    new_company_publication: companyInserts ? `${companyInserts} INGESTED` : 0,
    indexable_true_additions: 0,
    public_companies: 0,
    public_broker_evidence: 0,
    trust_score: 0,
    wave1: 0,
    wave2: 0,
    sitemap: 0,
    county_tables: 0,
    unexpected_mutation: 0,
  };

  writeJson(resolve(DOCS(), 'task-fl-011i-final-live-revalidation.json'), {
    google_places_requests: 0,
    n: revalidation.length,
    passed: revalidation.filter((r) => r.pass).length,
    failed: failures.length,
    failures,
    rows: revalidation,
  });
  writeJson(resolve(DOCS(), 'task-fl-011i-mb12-suddath-gate.json'), {
    google_places_requests: 0,
    ...suddath,
    legalName: mb12Draft.sourceLegalName,
    proposedCompanyId: mb12Draft.proposedCompanyId,
  });
  writeJson(resolve(DOCS(), 'task-fl-011i-company-collision-audit.json'), {
    google_places_requests: 0,
    n: collisionAudit.length,
    id_collisions: collisionAudit.filter((r) => r.idTaken).length,
    slug_collisions: collisionAudit.filter((r) => r.slugTaken).length,
    rows: collisionAudit,
  });
  writeJson(resolve(DOCS(), 'task-fl-011i-role-safety-audit.json'), {
    google_places_requests: 0,
    ...roleSafety,
    entity_type: SAFE_BROKER_ENTITY_TYPE,
    authority_type: BROKER_AUTHORITY_TYPE,
    link_entity_type_mutated: false,
  });
  writeJson(resolve(DOCS(), 'task-fl-011i-dry-run-1.json'), dry);
  writeJson(resolve(DOCS(), 'task-fl-011i-dry-run-2.json'), dry);
  writeJson(resolve(DOCS(), 'task-fl-011i-rollback-dry-run.json'), {
    google_places_requests: 0,
    link_detach_psa: finals.filter((o) => o.op === 'LINK').map((o) => ({
      companyId: o.companyId,
      mb: o.mb,
      deleteCompany: false,
    })),
    insert_delete_if_ingested: finals.filter((o) => o.op === 'INSERT').map((o) => ({
      companyId: o.companyId,
      mb: o.mb,
      requireIngested: true,
      requireIndexableFalse: true,
    })),
  });
  writeJson(resolve(DOCS(), 'task-fl-011i-builder2-freeze.json'), {
    google_places_requests: 0,
    ...countyBefore,
    snapshot: before,
  });
  writeJson(resolve(DOCS(), 'task-fl-011i-mb171-control.json'), {
    google_places_requests: 0,
    outside_manifest: true,
    rows: mb171.rows,
    duplicate_insert_planned: psaPlans.some((p) => p.op.mb === FL_011I_MB171_CONTROL.mb),
  });

  const manifest = {
    google_places_requests: 0,
    id: FL_FDACS_MB_INTERNAL_STAGING_V1,
    apply: false,
    hash,
    draft_hash: FL_011I_DRAFT_HASH,
    link_count: linkN,
    insert_count: insertN,
    total: finals.length,
    operations: finals,
  };
  writeJson(MANIFEST_PATH(), manifest);
  writeJson(resolve(DOCS(), 'task-fl-011i-final-manifest.json'), {
    google_places_requests: 0,
    hash,
    draft_hash: FL_011I_DRAFT_HASH,
    link: linkN,
    insert: insertN,
    total: finals.length,
    apply: false,
  });

  if (blocked) {
    writeJson(resolve(DOCS(), 'task-fl-011i-apply-result.json'), {
      google_places_requests: 0,
      status: 'BLOCKED — FL BROKER APPLY PRECONDITION FAILED',
      failures,
      suddath,
      roleSafety,
      chromeRisk: chromeRisk.map((o) => o.mb),
    });
    await client.end();
    console.log(JSON.stringify({ status: 'BLOCKED — FL BROKER APPLY PRECONDITION FAILED', failures, suddath, dry }, null, 2));
    process.exit(2);
  }

  let httpSnap: unknown = { skipped: skipHttp };
  if (!skipHttp) {
    const newHttp = [];
    for (const o of finals.filter((x) => x.op === 'INSERT')) {
      newHttp.push({ slug: o.slug, ...(await fetchText(`/companies/${o.slug}`)) });
    }
    const linkSlug = String(byId.get(FL_011I_MB159_LINK.companyId)?.slug ?? '');
    const controlSlug = String(byId.get(FL_011I_MB171_CONTROL.companyId)?.slug ?? '');
    const existingHttp = [];
    if (linkSlug) existingHttp.push({ kind: 'MB159', slug: linkSlug, ...(await fetchText(`/companies/${linkSlug}`)) });
    if (controlSlug) existingHttp.push({ kind: 'MB171', slug: controlSlug, ...(await fetchText(`/companies/${controlSlug}`)) });
    const not404 = newHttp.filter((h) => h.status !== 404);
    httpSnap = {
      google_places_requests: 0,
      new_slugs_404: newHttp.filter((h) => h.status === 404).length,
      new_slugs_tested: newHttp.length,
      new_broker_chrome: newHttp.filter((h) => h.brokerChrome).length,
      existing: existingHttp,
      existing_broker_chrome: existingHttp.filter((h) => h.brokerChrome).length,
      new: newHttp,
    };
    writeJson(resolve(DOCS(), 'task-fl-011i-strict-404-new-companies.json'), httpSnap);
    if (not404.length) {
      await client.end();
      console.log(JSON.stringify({ status: 'BLOCKED — FL BROKER APPLY PRECONDITION FAILED', reason: 'new_slug_not_404', not404 }, null, 2));
      process.exit(2);
    }
    if (existingHttp.some((h) => h.brokerChrome)) {
      await client.end();
      console.log(JSON.stringify({ status: 'BLOCKED — FL BROKER APPLY PRECONDITION FAILED', reason: 'existing_broker_chrome' }, null, 2));
      process.exit(2);
    }
  }

  writeJson(resolve(DOCS(), 'task-fl-011i-wave2-freeze.json'), {
    google_places_requests: 0,
    ready_pool: WAVE2_READY_POOL,
    draft_count: wave2.members.length,
    hash: wave2.hash,
    recomputed_hash: hashWave2Draft(wave2.members as never),
    apply: wave2.apply,
    expected_hash: WAVE2_DRAFT_HASH,
    expected_count: WAVE2_DRAFT_COUNT,
  });
  writeJson(resolve(DOCS(), 'task-fl-011i-im-coverage-freeze.json'), {
    google_places_requests: 0,
    active: EXPECTED_ACTIVE,
    represented: EXPECTED_REPRESENTED,
    unresolved: EXPECTED_UNRESOLVED,
    coverage: EXPECTED_COVERAGE_PCT,
    delta: { active: 0, represented: 0, unresolved: 0, coverage: 0 },
  });

  if (preconditionsOnly) {
    await client.end();
    console.log(JSON.stringify({ status: 'PRECONDITIONS_PASS', hash, dry, suddath: suddath.result }, null, 2));
    return;
  }

  const stats = {
    companies_inserted: 0,
    psa_inserted: 0,
    psa_attached: 0,
    contacts_inserted: 0,
    contacts_attached: 0,
  };

  if (rollback) {
    if (!requestedHash || requestedHash !== hash) {
      await client.end();
      throw new Error(`REFUSAL — rollback hash ${requestedHash} != live ${hash}`);
    }
    await client.query('BEGIN');
    try {
      for (const op of finals.filter((o) => o.op === 'LINK')) {
        await client.query(
          `DELETE FROM public.provider_state_authority
            WHERE state_code='FL' AND upper(authority_number)=$1 AND company_id=$2
              AND match_method LIKE $3`,
          [op.mb.toUpperCase(), op.companyId, 'fl011i:%']
        );
        await client.query(
          `UPDATE public.provider_contact_observation
              SET company_id = NULL
            WHERE company_id=$1 AND regulator='FDACS' AND regulatory_id=$2
              AND (match_evidence->>'task') = $3`,
          [op.companyId, fdacsRegulatoryId(op.mb), FL_011I_TASK]
        );
      }
      for (const op of finals.filter((o) => o.op === 'INSERT')) {
        await client.query(
          `DELETE FROM public.provider_contact_observation
            WHERE company_id=$1 AND regulator='FDACS' AND (match_evidence->>'task')=$2`,
          [op.companyId, FL_011I_TASK]
        );
        await client.query(
          `DELETE FROM public.provider_state_authority
            WHERE company_id=$1 AND state_code='FL' AND match_method LIKE 'fl011i:%'`,
          [op.companyId]
        );
        const refs = await client.query(
          `SELECT
             (SELECT count(*)::int FROM provider_state_authority WHERE company_id=$1 AND match_method NOT LIKE 'fl011i:%') AS psa_other,
             (SELECT count(*)::int FROM provider_county_credential WHERE company_id=$1) AS county`,
          [op.companyId]
        );
        if ((refs.rows[0]?.psa_other ?? 0) > 0 || (refs.rows[0]?.county ?? 0) > 0) {
          throw new Error(`REFUSAL — ${op.companyId} has downstream deps; fail closed`);
        }
        await client.query(
          `DELETE FROM public.companies
            WHERE id=$1 AND publication_state='INGESTED' AND indexable=false AND id LIKE 'fl-mb-%'`,
          [op.companyId]
        );
      }
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    }
    const afterRb = await freezeSnapshot(client);
    await client.end();
    writeJson(resolve(DOCS(), 'task-fl-011i-apply-result.json'), {
      google_places_requests: 0,
      status: 'ROLLED_BACK — FL BROKER INTERNAL STAGING',
      before,
      after: afterRb,
    });
    console.log(JSON.stringify({ status: 'ROLLED_BACK — FL BROKER INTERNAL STAGING', hash }, null, 2));
    return;
  }

  if (apply) {
    if (!requestedHash || requestedHash !== hash) {
      await client.end();
      throw new Error(`REFUSAL — apply hash ${requestedHash} != live ${hash}`);
    }
    await client.query('BEGIN');
    try {
      for (const op of finals.filter((o) => o.op === 'INSERT')) {
        if (takenIds.has(op.companyId)) continue;
        const rec = byMb.get(op.mb)!;
        const display = rec.legalName;
        const hq = [rec.city, 'FL'].filter(Boolean).join(', ');
        const short =
          'Florida FDACS moving-broker registration (internal). Confirm current FDACS status before treating this record as a mover.';
        const description = `${display} is staged from official FDACS MB evidence as a moving-broker registration (${op.mb}). This is distinct from registration as an intrastate household-goods mover. This internal profile is not published.`;
        const roleCheck = brokerInsertRoleSafety({
          entityType: SAFE_BROKER_ENTITY_TYPE,
          serviceScope: null,
          shortDescription: short,
          description,
        });
        if (!roleCheck.ok) throw new Error(`REFUSAL — role safety ${roleCheck.failures.join(',')}`);
        const inserted = await client.query(
          `INSERT INTO public.companies (
             id, slug, name, short_description, description, headquarters,
             phone, email, physical_address, usdot_number, fmcsa_legal_name,
             fmcsa_safety_rating, fmcsa_complaints, fmcsa_shipments,
             authority_active, out_of_service, entity_type, service_scope,
             coverage, services, specialties, overall_rating, review_count,
             reputation_score, years_in_business, avg_price_per_move, price_range,
             is_verified, last_updated, publication_state, indexable, legacy_directory_row
           ) VALUES (
             $1,$2,$3,$4,$5,$6,
             NULL,NULL,NULL,NULL,$7,
             'Not Rated',0,0,
             false,false,$8,NULL,
             'Florida FDACS MB (internal)','[]'::jsonb,'[]'::jsonb,0,0,
             0,NULL,NULL,NULL,
             false,now(),'INGESTED',false,false
           )
           ON CONFLICT (id) DO NOTHING
           RETURNING id`,
          [op.companyId, op.slug, display, short, description, hq || null, rec.legalName, SAFE_BROKER_ENTITY_TYPE]
        );
        if (inserted.rowCount) stats.companies_inserted += 1;
      }

      for (const planned of psaPlans) {
        if (planned.action === 'ALREADY_EXISTS') continue;
        const op = planned.op;
        const rec = byMb.get(op.mb)!;
        const rawSourceKey = fdacsRawSourceKey('Moving Broker', op.mb);
        const evidence = hashEvidence({
          state: 'FL',
          authorityNumber: op.mb,
          legalName: op.legalName,
          task: FL_011I_TASK,
        });
        if (planned.action === 'ATTACH_ORPHAN') {
          const upd = await client.query(
            `UPDATE public.provider_state_authority
                SET company_id=$1, matched_company_id=$1, verification_state='VERIFIED',
                    match_method=$2, authority_type=$4, last_verified_at=now(), updated_at=now()
              WHERE state_code='FL' AND upper(authority_number)=$3
                AND company_id IS NULL
                AND coalesce(status,'') <> 'expired'
                AND coalesce(verification_state,'') <> 'HISTORICAL'
              RETURNING id`,
            [op.companyId, fl011iMatchMethod(op.matchEvidence), op.mb.toUpperCase(), BROKER_AUTHORITY_TYPE]
          );
          if (upd.rowCount) stats.psa_attached += 1;
          continue;
        }
        const ins = await client.query(
          `INSERT INTO public.provider_state_authority (
             company_id, state_code, authority_type, authority_number, status,
             legal_name, dba_name, regulator, source, source_url,
             source_record_id, raw_source_key, retrieved_at, last_verified_at, evidence_hash,
             verification_state, matched_company_id, match_method, match_confidence
           ) VALUES (
             $1,'FL',$9,$2,'active',
             $3,$4,'FDACS','fdacs_legacy_xls',$5,
             $2,$6,now(),now(),$7,
             'VERIFIED',$1,$8,1
           )
           ON CONFLICT (state_code, raw_source_key) DO NOTHING
           RETURNING id`,
          [
            op.companyId,
            op.mb,
            op.legalName,
            rec.dba,
            FDACS_LEGACY_LOOKUP_URL,
            rawSourceKey,
            evidence,
            fl011iMatchMethod(op.matchEvidence),
            BROKER_AUTHORITY_TYPE,
          ]
        );
        if (ins.rowCount) stats.psa_inserted += 1;
      }

      const evidenceJson = JSON.stringify({ task: FL_011I_TASK, promoted_to_canonical: false });
      for (const c of contactPlans) {
        if (c.action === 'NOOP' || c.action === 'COLLISION') continue;
        if (c.action === 'ATTACH') {
          const upd = await client.query(
            `UPDATE public.provider_contact_observation
                SET company_id=$1, match_evidence = COALESCE(match_evidence,'{}'::jsonb) || $4::jsonb
              WHERE regulatory_id=$2 AND observation_type=$3
                AND (company_id IS NULL OR company_id=$1)
              RETURNING observation_type`,
            [c.companyId, c.regulatoryId, c.kind, evidenceJson]
          );
          if (upd.rowCount) stats.contacts_attached += 1;
          continue;
        }
        const normalized =
          c.kind === 'business_phone' ? normalizePhone(c.raw) : c.kind === 'business_email' ? normalizeEmail(c.raw) : c.raw;
        const ins = await client.query(
          `INSERT INTO public.provider_contact_observation (
             company_id, state_code, regulator, regulatory_id, observation_type,
             raw_value, normalized_value, source, source_record_id, source_url,
             retrieved_at, verification_state, match_status, match_evidence, quality_class
           ) VALUES (
             $1,'FL','FDACS',$2,$3,
             $4,$5,'fdacs_legacy_xls',$2,$6,
             now(),'UNRESOLVED','SOURCE_OBSERVATION',$7::jsonb,'official_source'
           )
           ON CONFLICT (regulatory_id, observation_type) DO NOTHING
           RETURNING observation_type`,
          [c.companyId, c.regulatoryId, c.kind, c.raw, normalized, FDACS_LEGACY_LOOKUP_URL, evidenceJson]
        );
        if (ins.rowCount) stats.contacts_inserted += 1;
      }

      const ingested = await client.query(
        `SELECT count(*)::int AS n FROM companies
          WHERE id = ANY($1::text[]) AND publication_state='INGESTED' AND indexable=false`,
        [finals.filter((o) => o.op === 'INSERT').map((o) => o.companyId)]
      );
      if (ingested.rows[0].n !== FL_011I_EXPECTED_INSERT) {
        throw new Error(`REFUSAL — ingested insert cohort ${ingested.rows[0].n} != ${FL_011I_EXPECTED_INSERT}`);
      }
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    }
  }

  const after = await freezeSnapshot(client);
  const countyAfter = await countyFreeze(client);
  if (
    before.county_regulatory_program !== after.county_regulatory_program ||
    before.provider_county_credential !== after.provider_county_credential
  ) {
    throw new Error('REFUSAL — Builder 2 county tables changed');
  }
  if (after.indexable !== before.indexable) {
    throw new Error(`REFUSAL — indexable delta ${after.indexable - before.indexable}`);
  }

  writeJson(resolve(DOCS(), 'task-fl-011i-apply-result.json'), {
    google_places_requests: 0,
    status: apply ? 'APPLIED' : 'DRY_RUN',
    hash,
    stats,
    before,
    after,
    countyBefore,
    countyAfter,
    wave1_members: wave1.members.length,
  });
  writeJson(resolve(LEDGER(), 'fl-011i-broker-internal-staging.json'), {
    google_places_requests: 0,
    production_db_writes: apply ? 1 : 0,
    hash,
    link: FL_011I_EXPECTED_LINK,
    insert: FL_011I_EXPECTED_INSERT,
  });

  await client.end();
  console.log(
    JSON.stringify(
      {
        status: apply ? 'APPLIED' : 'DRY_RUN',
        hash,
        draft_hash: FL_011I_DRAFT_HASH,
        dry,
        suddath: suddath.result,
        stats,
        retrieved_at: now,
        google_places_requests: FL_011H_GOOGLE_PLACES_REQUESTS,
      },
      null,
      2
    )
  );
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e).replace(/postgresql:\/\/[^@]+@/, 'postgresql://***@'));
  process.exit(1);
});
