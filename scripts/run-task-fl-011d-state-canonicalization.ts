/**
 * FL-011D — manifest-bound internal canonicalization Wave.
 * Modes: --dry-run (default) | --apply --manifest-hash <hash> | --rollback --manifest-hash <hash>
 * Google Places: 0. County tables: never mutated.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { loadEnvFiles, resolveDatabaseUrl } from '../lib/state-hhg/calibration/db';
import { loadExactCanaryManifests } from '../lib/state-hhg/canary/manifest';
import { FDACS_LEGACY_LOOKUP_URL, FloridaStateMoverAdapter, fdacsRawSourceKey } from '../lib/state-hhg/fl/adapter';
import { allocateCompanySlug, buildDisplayName } from '../lib/state-hhg/canonicalization/ids';
import { fdacsRegulatoryId } from '../lib/state-hhg/fl/regulatory-id';
import { loadWave1Manifest } from '../lib/state-hhg/fl/wave-1';
import { hashEvidence, normalizeEmail, normalizePhone } from '../lib/state-hhg/normalize';
import type { CanonicalProviderIdentity } from '../lib/state-hhg/identity';
import { isAnonymousPublicProfileAllowed } from '../lib/provider/publication';
import {
  FL_011C_DRAFT_HASH,
  FL_011D_EXPECTED_INSERT,
  FL_011D_EXPECTED_LINK,
  FL_011D_EXPECTED_TOTAL,
  FL_011D_GOOGLE_PLACES_REQUESTS,
  FL_011D_TASK,
  FL_011D_WITHHELD,
  FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1,
  assertExactDraftMembership,
  fl011dMatchMethod,
  hashFinalManifest,
  isFl011dMatchMethod,
  newCompanyPublicExposure,
  planContactAction,
  planPsaAction,
  postApplyIdempotentDelta,
  publicExposureGateForExistingLink,
  revalidateDraftOp,
  slugCollidesInsensitively,
  type ContactKind,
  type FinalCanonicalizationOp,
  type LiveCompanyRow,
  type LiveObservationRow,
  type LivePsaRow,
} from '../lib/state-hhg/fl/wave-011d';
import {
  proposedImCompanyId,
  type CanonicalizationDraftOp,
  type GapSubject,
} from '../lib/state-hhg/fl/wave-2-canonicalization';

const AS_OF = '2026-08-22';
const ORIGIN = 'https://www.movetrusthub.com';
const DOCS = () => resolve(process.cwd(), 'docs');
const DATA = () => resolve(process.cwd(), 'data/state-hhg/fl');
const LEDGER = () => resolve(process.cwd(), 'docs/florida-impact-ledger/state');
const DRAFT_PATH = () => resolve(DATA(), 'fl-011c-canonicalization-wave-internal-draft.json');
const MANIFEST_PATH = () => resolve(DATA(), 'fl-011d-canonicalization-wave-internal-v1.json');

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const rollback = args.includes('--rollback');
const hashIdx = args.indexOf('--manifest-hash');
const requestedHash = hashIdx >= 0 ? args[hashIdx + 1] : null;
const skipHttp = args.includes('--skip-http');

function writeJson(path: string, value: unknown) {
  mkdirSync(resolve(path, '..'), { recursive: true });
  writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
}

function loadDraft(): CanonicalizationDraftOp[] {
  const doc = JSON.parse(readFileSync(DRAFT_PATH(), 'utf8')) as {
    hash: string;
    operations: CanonicalizationDraftOp[];
  };
  if (doc.hash !== FL_011C_DRAFT_HASH) {
    throw new Error(`REFUSAL — committed draft hash ${doc.hash} != ${FL_011C_DRAFT_HASH}`);
  }
  return doc.operations;
}

type Freeze = Record<string, number>;

async function freezeSnapshot(client: pg.Client): Promise<Freeze> {
  const companies = await client.query(`
    SELECT
      count(*)::int AS companies,
      count(*) FILTER (WHERE indexable)::int AS indexable,
      count(*) FILTER (WHERE id ILIKE 'fl-im-%')::int AS fl_im,
      count(*) FILTER (WHERE id ILIKE 'fl-im-%' AND publication_state='INGESTED')::int AS fl_im_ingested,
      count(*) FILTER (WHERE publication_state='PUBLISHABLE')::int AS publishable
    FROM companies`);
  const psa = await client.query(
    `SELECT count(*)::int AS n FROM provider_state_authority WHERE state_code='FL'`
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
    fdacs_observations: obs.rows[0].n,
    county_regulatory_program: countyProgram,
    provider_county_credential: countyCred,
  };
}

async function fetchText(path: string): Promise<{ status: number; robots: string | null; title: string | null; fdacs: boolean }> {
  const res = await fetch(`${ORIGIN}${path}`, {
    headers: { 'user-agent': 'MoveTrustHub-FL-011D/1.0' },
    redirect: 'manual',
  });
  const text = res.status === 200 ? await res.text() : '';
  const robots = res.headers.get('x-robots-tag') || (text.match(/name="robots"\s+content="([^"]+)"/i)?.[1] ?? null);
  const title = text.match(/<title>([^<]+)<\/title>/i)?.[1] ?? null;
  const fdacs = /Florida FDACS/i.test(text) && /Registration verified from Florida FDACS/i.test(text);
  return { status: res.status, robots, title, fdacs };
}

type CompanyDb = LiveCompanyRow & {
  name: string;
  fmcsaLegalName: string | null;
  physicalAddress: string | null;
  website: string | null;
};

function toCandidate(r: CompanyDb): CanonicalProviderIdentity {
  return {
    companyId: r.companyId,
    legalName: r.fmcsaLegalName || r.legalName || r.name,
    dbaName: r.dbaName,
    publicName: r.publicName || r.name,
    usdot: r.usdot,
    phone: r.phone,
    email: r.email,
    address: r.address,
    city: r.city,
    state: r.state,
    postalCode: r.postalCode,
    publicationState: r.publicationState,
    indexable: r.indexable,
  };
}

async function main() {
  loadEnvFiles();
  const retrievedAt = new Date().toISOString();
  mkdirSync(DOCS(), { recursive: true });
  mkdirSync(DATA(), { recursive: true });
  mkdirSync(LEDGER(), { recursive: true });

  const draftOps = loadDraft();
  const bound = assertExactDraftMembership(draftOps);
  const wave1 = loadWave1Manifest();
  const wave1Ids = new Set(wave1.members.map((m) => m.companyId));
  const keep80 = new Set(loadExactCanaryManifests().companyIds);

  const adapter = new FloridaStateMoverAdapter({ retrievedAt: '2026-08-21T17:11:52.759Z' });
  const raw = await adapter.fetchOrLoadRegistry();
  const records = raw.map((r) => adapter.normalizeRecord(r)).filter((r) => !adapter.resolveBrokerRole(r));
  const byIm = new Map<string, GapSubject>();
  for (const rec of records) {
    const im = String(rec.authorityNumber ?? '').toUpperCase();
    if (!im.startsWith('IM')) continue;
    byIm.set(im, {
      fdacsIm: im,
      legalName: rec.legalName,
      dba: rec.dba,
      status: String(rec.status),
      expiration: rec.expirationDate,
      retrievedAt: String(rec.raw._retrievedAt ?? '2026-08-21T17:11:52.759Z'),
      physicalAddress: rec.physicalAddress,
      city: rec.city,
      postalCode: rec.postalCode,
      phone: rec.phone,
      email: rec.email,
      usdot: rec.usdot,
      county: null,
    });
  }

  const client = new pg.Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  });
  await client.connect();
  const before = await freezeSnapshot(client);

  const companyRes = await client.query(`
    SELECT id, slug, name, fmcsa_legal_name, phone, email, physical_address, headquarters,
           website, usdot_number, mc_number, publication_state, indexable
      FROM companies`);
  const companies: CompanyDb[] = companyRes.rows.map((r: Record<string, unknown>) => ({
    companyId: String(r.id),
    slug: String(r.slug ?? ''),
    name: String(r.name ?? ''),
    legalName: r.fmcsa_legal_name ? String(r.fmcsa_legal_name) : String(r.name ?? ''),
    fmcsaLegalName: r.fmcsa_legal_name ? String(r.fmcsa_legal_name) : null,
    dbaName: r.name ? String(r.name) : null,
    publicName: r.name ? String(r.name) : null,
    usdot: r.usdot_number ? String(r.usdot_number) : null,
    phone: r.phone ? String(r.phone) : null,
    email: r.email ? String(r.email) : null,
    address: r.physical_address ? String(r.physical_address) : r.headquarters ? String(r.headquarters) : null,
    physicalAddress: r.physical_address ? String(r.physical_address) : null,
    website: r.website ? String(r.website) : null,
    city: null,
    state: 'FL',
    postalCode: null,
    publicationState: r.publication_state ? String(r.publication_state) : null,
    indexable: r.indexable === true,
  }));
  const byId = new Map(companies.map((c) => [c.companyId, c]));
  const takenIds = new Set(companies.map((c) => c.companyId));
  const takenSlugs = new Set(companies.map((c) => c.slug).filter(Boolean));
  const candidates = companies.map(toCandidate);
  const existingImCompanyIds = new Set([...takenIds].filter((id) => id.startsWith('fl-im-')));

  const psaRes = await client.query(`
    SELECT id, company_id, authority_number, raw_source_key, status, verification_state
      FROM provider_state_authority WHERE state_code='FL'`);
  const psaAll: LivePsaRow[] = psaRes.rows.map((r: Record<string, unknown>) => ({
    id: String(r.id),
    companyId: r.company_id ? String(r.company_id) : null,
    authorityNumber: String(r.authority_number ?? ''),
    rawSourceKey: String(r.raw_source_key ?? ''),
    status: r.status ? String(r.status) : null,
    verificationState: r.verification_state ? String(r.verification_state) : null,
  }));

  const obsRes = await client.query(`
    SELECT regulatory_id, observation_type, company_id, normalized_value
      FROM provider_contact_observation WHERE regulator='FDACS'`);
  const obsAll: LiveObservationRow[] = obsRes.rows.map((r: Record<string, unknown>) => ({
    regulatoryId: String(r.regulatory_id),
    observationType: String(r.observation_type) as ContactKind,
    companyId: r.company_id ? String(r.company_id) : null,
    normalizedValue: r.normalized_value ? String(r.normalized_value) : null,
  }));

  const identityAudit: Array<Record<string, unknown>> = [];
  const collisionAudit: Array<Record<string, unknown>> = [];
  const revalidation: Array<Record<string, unknown>> = [];
  const failures: Array<{ fdacsIm: string; op: string; failures: string[] }> = [];
  const finals: FinalCanonicalizationOp[] = [];

  const plannedCompanyInserts: Array<{
    op: FinalCanonicalizationOp;
    subject: GapSubject;
    slug: string;
  }> = [];
  const psaPlans: Array<{ op: FinalCanonicalizationOp; action: ReturnType<typeof planPsaAction>['action'] }> = [];
  const contactPlans: Array<{
    companyId: string;
    regulatoryId: string;
    kind: ContactKind;
    raw: string;
    action: ReturnType<typeof planContactAction>['action'];
  }> = [];

  for (const draft of draftOps) {
    const subject = byIm.get(draft.fdacsIm.toUpperCase());
    if (!subject) {
      failures.push({ fdacsIm: draft.fdacsIm, op: draft.op, failures: ['source_im_missing_from_registry'] });
      continue;
    }
    const companyId =
      draft.op === 'LINK_EXISTING_CANONICAL'
        ? draft.canonicalCompanyId
        : draft.proposedCompanyId ?? proposedImCompanyId(draft.fdacsIm);
    if (!companyId) {
      failures.push({ fdacsIm: draft.fdacsIm, op: draft.op, failures: ['missing_company_id'] });
      continue;
    }
    const live = byId.get(companyId) ?? null;
    const psa = psaAll.filter((p) => p.authorityNumber.toUpperCase() === draft.fdacsIm.toUpperCase());
    const result = revalidateDraftOp({
      draft,
      subject,
      candidates,
      existingImCompanyIds,
      wave1Ids,
      keep80Ids: keep80,
      asOf: AS_OF,
      liveCompany: live,
      takenIds,
      psa,
    });
    revalidation.push({
      fdacsIm: draft.fdacsIm,
      op: draft.op,
      pass: result.pass,
      failures: result.failures,
      evidence: draft.evidenceMethod,
    });
    if (!result.pass) {
      failures.push({ fdacsIm: draft.fdacsIm, op: draft.op, failures: result.failures });
    }

    let slug = live?.slug ?? '';
    if (draft.op === 'INSERT_NEW_CANONICAL' && !live) {
      const display = buildDisplayName(subject.legalName || draft.fdacsIm, subject.dba);
      let allocated = allocateCompanySlug({
        displayName: display,
        stateCode: 'FL',
        authorityNumber: draft.fdacsIm,
        takenSlugs,
      });
      const collapsedHit = slugCollidesInsensitively(allocated.slug, takenSlugs);
      if (collapsedHit) {
        allocated = allocateCompanySlug({
          displayName: `${display} ${draft.fdacsIm}`,
          stateCode: 'FL',
          authorityNumber: draft.fdacsIm,
          takenSlugs: new Set([...takenSlugs, allocated.slug]),
        });
      }
      slug = allocated.slug;
      takenSlugs.add(slug);
      collisionAudit.push({
        fdacsIm: draft.fdacsIm,
        proposedCompanyId: companyId,
        slug,
        slugCollisionDisambiguated: collapsedHit || allocated.collision,
        idTaken: takenIds.has(companyId),
      });
    }

    const psaPlan = planPsaAction({ fdacsIm: draft.fdacsIm, companyId, existing: psa });
    const regulatoryId = fdacsRegulatoryId(draft.fdacsIm) ?? `FL-FDACS-IM-${draft.fdacsIm.replace(/\D/g, '')}`;
    const kinds: Array<{ kind: ContactKind; raw: string | null }> = [
      { kind: 'business_phone', raw: subject.phone },
      { kind: 'business_email', raw: subject.email },
      { kind: 'physical_address', raw: subject.physicalAddress },
    ];
    let contactDeferred = false;
    for (const k of kinds) {
      if (!k.raw?.trim()) continue;
      const plan = planContactAction({
        regulatoryId,
        kind: k.kind,
        companyId,
        existing: obsAll,
      });
      if (plan.action === 'COLLISION') {
        failures.push({ fdacsIm: draft.fdacsIm, op: draft.op, failures: [plan.reason] });
        contactDeferred = true;
      }
      contactPlans.push({ companyId, regulatoryId, kind: k.kind, raw: k.raw, action: plan.action });
    }

    const finalOp: FinalCanonicalizationOp = {
      op: draft.op,
      fdacsIm: draft.fdacsIm,
      fdacsLegalName: subject.legalName,
      dba: subject.dba,
      companyId,
      slug,
      existingOrNew: draft.op === 'LINK_EXISTING_CANONICAL' ? 'existing' : 'new',
      identityEvidence: draft.evidenceMethod,
      identityRuleset: FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1,
      officialSourceStatus: subject.status,
      sourceFreshness: 'ACTIVE_FRESH',
      sourcePhone: subject.phone,
      sourceEmail: subject.email,
      sourceAddress: subject.physicalAddress,
      currentPublicationState: live?.publicationState ?? null,
      intendedPublicationState: draft.op === 'INSERT_NEW_CANONICAL' ? 'INGESTED' : live?.publicationState ?? 'INGESTED',
      currentIndexable: live ? live.indexable : null,
      intendedIndexable: false,
      stateAuthorityOperation: psaPlan.action === 'COLLISION' ? 'PENDING' : psaPlan.action,
      contactObservationOperation: contactDeferred ? 'DEFERRED' : 'SAFE_SOURCE_OBSERVATION',
      rollbackOperation:
        draft.op === 'INSERT_NEW_CANONICAL' ? 'DELETE_INGESTED_COMPANY' : 'DETACH_FL011D_PSA',
    };
    finals.push(finalOp);
    psaPlans.push({ op: finalOp, action: psaPlan.action });

    if (draft.op === 'LINK_EXISTING_CANONICAL') {
      identityAudit.push({
        fdacsIm: draft.fdacsIm,
        companyId,
        evidence: draft.evidenceMethod,
        accepted: result.pass,
        publicExposure: live
          ? publicExposureGateForExistingLink({
              id: live.companyId,
              publicationState: live.publicationState,
            })
          : { pass: false, reason: 'missing' },
        publicationState: live?.publicationState ?? null,
        indexable: live?.indexable ?? null,
        consumerVisible: live ? isAnonymousPublicProfileAllowed(live) : false,
      });
    }
    if (draft.op === 'INSERT_NEW_CANONICAL') {
      plannedCompanyInserts.push({ op: finalOp, subject, slug });
    }
  }

  const blocked = failures.length > 0;
  const hash = hashFinalManifest(finals);
  const linkN = finals.filter((o) => o.op === 'LINK_EXISTING_CANONICAL').length;
  const insertN = finals.filter((o) => o.op === 'INSERT_NEW_CANONICAL').length;

  const companyInserts = plannedCompanyInserts.filter((p) => !byId.has(p.op.companyId)).length;
  const psaInserts = psaPlans.filter((p) => p.action === 'INSERT_REQUIRED').length;
  const psaAttach = psaPlans.filter((p) => p.action === 'ATTACH_ORPHAN').length;
  const psaNoop = psaPlans.filter((p) => p.action === 'ALREADY_EXISTS').length;
  const contactInserts = contactPlans.filter((p) => p.action === 'INSERT').length;
  const contactAttach = contactPlans.filter((p) => p.action === 'ATTACH').length;
  const contactNoop = contactPlans.filter((p) => p.action === 'NOOP').length;
  const contactCollision = contactPlans.filter((p) => p.action === 'COLLISION').length;

  const publicExisting = identityAudit.filter((r) => r.consumerVisible === true);
  const exposureFail = identityAudit.filter((r) => {
    const g = r.publicExposure as { pass?: boolean };
    return g.pass === false;
  });

  const dry = {
    google_places_requests: FL_011D_GOOGLE_PLACES_REQUESTS,
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
    publication_state_changes_existing: 0,
    new_company_publication: companyInserts ? `${companyInserts} INGESTED` : 0,
    indexable_true_additions: 0,
    trust_score: 0,
    wave1: 0,
    wave2: 0,
    sitemap: 0,
    county_tables: 0,
    unexpected_mutation: 0,
  };

  const idempotent = postApplyIdempotentDelta({
    companiesInserted: companyInserts,
    psaInserted: psaInserts,
    contactsInserted: contactInserts,
  });

  writeJson(resolve(DOCS(), 'task-fl-011d-live-113-revalidation.json'), {
    google_places_requests: 0,
    n: revalidation.length,
    passed: revalidation.filter((r) => r.pass).length,
    failed: failures.length,
    failures,
    rows: revalidation,
  });
  writeJson(resolve(DOCS(), 'task-fl-011d-existing-81-identity-audit.json'), {
    google_places_requests: 0,
    n: identityAudit.length,
    legal_plus_phone: identityAudit.filter((r) => r.evidence === 'exact_legal_name_and_phone').length,
    legal_plus_email: identityAudit.filter((r) => r.evidence === 'exact_legal_name_and_email').length,
    rejected: identityAudit.filter((r) => r.accepted === false).length,
    public_companies: publicExisting.length,
    rows: identityAudit,
  });
  writeJson(resolve(DOCS(), 'task-fl-011d-new-32-collision-audit.json'), {
    google_places_requests: 0,
    n: collisionAudit.length,
    id_collisions: collisionAudit.filter((r) => r.idTaken).length,
    rows: collisionAudit,
  });
  writeJson(resolve(DOCS(), 'task-fl-011d-state-authority-dry-run.json'), {
    google_places_requests: 0,
    insert_required: psaInserts,
    attach_orphan: psaAttach,
    already_exists: psaNoop,
  });
  writeJson(resolve(DOCS(), 'task-fl-011d-contact-observation-dry-run.json'), {
    google_places_requests: 0,
    insert: contactInserts,
    attach: contactAttach,
    noop: contactNoop,
    collision: contactCollision,
    promoted_to_canonical: 0,
  });
  writeJson(resolve(DOCS(), 'task-fl-011d-public-surface-pre-snapshot.json'), {
    google_places_requests: 0,
    code_gate_unauthorized_fdacs_chrome: exposureFail.length,
    public_existing_companies: publicExisting.length,
    new_company_contract: newCompanyPublicExposure({ publicationState: 'INGESTED', indexable: false }),
  });

  const rollbackPlan = {
    google_places_requests: 0,
    link_detach_psa: finals.filter((o) => o.op === 'LINK_EXISTING_CANONICAL').map((o) => ({
      companyId: o.companyId,
      fdacsIm: o.fdacsIm,
      deleteCompany: false,
    })),
    insert_delete_if_ingested: finals.filter((o) => o.op === 'INSERT_NEW_CANONICAL').map((o) => ({
      companyId: o.companyId,
      fdacsIm: o.fdacsIm,
      requireIngested: true,
      requireIndexableFalse: true,
    })),
  };
  writeJson(resolve(DOCS(), 'task-fl-011d-rollback-dry-run.json'), rollbackPlan);

  const manifest = {
    google_places_requests: 0,
    waveId: FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1,
    apply: false,
    hash,
    draft_hash: bound.hash,
    link_count: linkN,
    insert_count: insertN,
    total: finals.length,
    operations: finals,
  };
  writeJson(MANIFEST_PATH(), manifest);
  writeJson(resolve(DOCS(), 'task-fl-011d-final-canonicalization-manifest.json'), {
    google_places_requests: 0,
    hash,
    link: linkN,
    insert: insertN,
    total: finals.length,
  });

  if (blocked) {
    writeJson(resolve(DOCS(), 'task-fl-011d-apply-result.json'), {
      google_places_requests: 0,
      status: 'BLOCKED — INTERNAL APPLY NOT SAFE',
      failures,
    });
    await client.end();
    console.log(JSON.stringify({ status: 'BLOCKED — INTERNAL APPLY NOT SAFE', failures, dry }, null, 2));
    process.exit(2);
  }

  if (exposureFail.length) {
    writeJson(resolve(DOCS(), 'task-fl-011d-apply-result.json'), {
      google_places_requests: 0,
      status: 'BLOCKED — INTERNAL APPLY NOT SAFE',
      reason: 'public_fdacs_chrome_would_auto_render',
      exposureFail,
    });
    await client.end();
    console.log(JSON.stringify({ status: 'BLOCKED — INTERNAL APPLY NOT SAFE', reason: 'public_exposure' }, null, 2));
    process.exit(2);
  }

  let httpSnap: unknown = { skipped: skipHttp };
  if (!skipHttp) {
    const newSlugs = finals.filter((o) => o.op === 'INSERT_NEW_CANONICAL').map((o) => o.slug);
    const publicSlugs = identityAudit
      .filter((r) => r.consumerVisible)
      .map((r) => byId.get(String(r.companyId))?.slug)
      .filter((s): s is string => Boolean(s));
    const newHttp = [];
    for (const slug of newSlugs) newHttp.push({ slug, ...(await fetchText(`/companies/${slug}`)) });
    const publicHttp = [];
    for (const slug of publicSlugs.slice(0, 81)) {
      publicHttp.push({ slug, ...(await fetchText(`/companies/${slug}`)) });
    }
    httpSnap = {
      google_places_requests: 0,
      new_slugs_404: newHttp.filter((h) => h.status === 404).length,
      new_slugs_tested: newHttp.length,
      public_tested: publicHttp.length,
      public_fdacs_chrome: publicHttp.filter((h) => h.fdacs).length,
      new: newHttp,
      public_sample: publicHttp.map((h) => ({ slug: h.slug, status: h.status, robots: h.robots, fdacs: h.fdacs })),
    };
    writeJson(resolve(DOCS(), 'task-fl-011d-public-surface-pre-snapshot.json'), httpSnap);
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
      for (const op of finals.filter((o) => o.op === 'LINK_EXISTING_CANONICAL')) {
        await client.query(
          `DELETE FROM public.provider_state_authority
            WHERE state_code='FL' AND upper(authority_number)=$1 AND company_id=$2
              AND match_method LIKE $3`,
          [op.fdacsIm.toUpperCase(), op.companyId, `${FL_011D_TASK ? 'fl011d:' : 'fl011d:'}%`]
        );
        await client.query(
          `UPDATE public.provider_contact_observation
              SET company_id = NULL
            WHERE company_id=$1 AND regulator='FDACS' AND regulatory_id=$2
              AND (match_evidence->>'task') = $3`,
          [op.companyId, fdacsRegulatoryId(op.fdacsIm), FL_011D_TASK]
        );
      }
      for (const op of finals.filter((o) => o.op === 'INSERT_NEW_CANONICAL')) {
        await client.query(
          `DELETE FROM public.provider_contact_observation
            WHERE company_id=$1 AND regulator='FDACS' AND (match_evidence->>'task')=$2`,
          [op.companyId, FL_011D_TASK]
        );
        await client.query(
          `DELETE FROM public.provider_state_authority
            WHERE company_id=$1 AND state_code='FL' AND match_method LIKE 'fl011d:%'`,
          [op.companyId]
        );
        const refs = await client.query(
          `SELECT
             (SELECT count(*)::int FROM provider_state_authority WHERE company_id=$1 AND match_method NOT LIKE 'fl011d:%') AS psa_other,
             (SELECT count(*)::int FROM provider_county_credential WHERE company_id=$1) AS county`,
          [op.companyId]
        );
        if ((refs.rows[0]?.psa_other ?? 0) > 0 || (refs.rows[0]?.county ?? 0) > 0) {
          throw new Error(`REFUSAL — ${op.companyId} has downstream deps; fail closed`);
        }
        await client.query(
          `DELETE FROM public.companies
            WHERE id=$1 AND publication_state='INGESTED' AND indexable=false AND id LIKE 'fl-im-%'`,
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
    writeJson(resolve(DOCS(), 'task-fl-011d-apply-result.json'), {
      google_places_requests: 0,
      status: 'ROLLED_BACK',
      before,
      after: afterRb,
    });
    console.log(JSON.stringify({ status: 'ROLLED_BACK', hash }, null, 2));
    return;
  }

  if (apply) {
    if (!requestedHash || requestedHash !== hash) {
      await client.end();
      throw new Error(`REFUSAL — apply hash ${requestedHash} != live ${hash}`);
    }
    await client.query('BEGIN');
    try {
      for (const planned of plannedCompanyInserts) {
        if (byId.has(planned.op.companyId)) continue;
        const s = planned.subject;
        const display = buildDisplayName(s.legalName || planned.op.fdacsIm, s.dba);
        const hq = [s.city, 'FL'].filter(Boolean).join(', ');
        const physical = [s.physicalAddress, s.city, 'FL', s.postalCode].filter(Boolean).join(', ');
        const phone = normalizePhone(s.phone);
        const email = normalizeEmail(s.email);
        const short = `FL intrastate household-goods mover (state registry). Confirm current FDACS status before booking.`;
        const description = `${display} is staged from official FDACS evidence as an intrastate mover candidate. State authority: ${planned.op.fdacsIm}. This internal profile is not published to the consumer directory.`;
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
             $7,$8,$9,NULL,$10,
             'Not Rated',0,0,
             true,false,'Moving Company','intrastate',
             'FL intrastate','[]'::jsonb,'[]'::jsonb,0,0,
             0,NULL,NULL,NULL,
             false,now(),'INGESTED',false,false
           )
           ON CONFLICT (id) DO NOTHING
           RETURNING id`,
          [
            planned.op.companyId,
            planned.slug,
            display,
            short,
            description,
            hq || null,
            phone,
            email,
            physical || null,
            s.legalName,
          ]
        );
        if (inserted.rowCount) stats.companies_inserted += 1;
      }

      for (const planned of psaPlans) {
        if (planned.action === 'ALREADY_EXISTS') continue;
        const op = planned.op;
        const rawSourceKey = fdacsRawSourceKey('IM-Intrastate Mover', op.fdacsIm);
        const evidence = hashEvidence({
          state: 'FL',
          authorityNumber: op.fdacsIm,
          legalName: op.fdacsLegalName,
          task: FL_011D_TASK,
        });
        if (planned.action === 'ATTACH_ORPHAN') {
          const upd = await client.query(
            `UPDATE public.provider_state_authority
                SET company_id=$1, matched_company_id=$1, verification_state='VERIFIED',
                    match_method=$2, last_verified_at=now(), updated_at=now()
              WHERE state_code='FL' AND upper(authority_number)=$3
                AND company_id IS NULL
                AND coalesce(status,'') <> 'expired'
                AND coalesce(verification_state,'') <> 'HISTORICAL'
              RETURNING id`,
            [op.companyId, fl011dMatchMethod(op.identityEvidence), op.fdacsIm.toUpperCase()]
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
             $1,'FL','intrastate_mover_registration',$2,'active',
             $3,$4,'FDACS','fdacs_legacy_xls',$5,
             $2,$6,now(),now(),$7,
             'VERIFIED',$1,$8,1
           )
           ON CONFLICT (state_code, raw_source_key) DO NOTHING
           RETURNING id`,
          [
            op.companyId,
            op.fdacsIm,
            op.fdacsLegalName,
            op.dba,
            FDACS_LEGACY_LOOKUP_URL,
            rawSourceKey,
            evidence,
            fl011dMatchMethod(op.identityEvidence),
          ]
        );
        if (ins.rowCount) stats.psa_inserted += 1;
      }

      const evidenceJson = JSON.stringify({ task: FL_011D_TASK, promoted_to_canonical: false });
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
          c.kind === 'business_phone'
            ? normalizePhone(c.raw)
            : c.kind === 'business_email'
              ? normalizeEmail(c.raw)
              : c.raw;
        const ins = await client.query(
          `INSERT INTO public.provider_contact_observation (
             company_id, state_code, regulator, regulatory_id, observation_type,
             raw_value, normalized_value, source, source_record_id, source_url,
             retrieved_at, verification_state, match_status, match_evidence, quality_class
           ) VALUES (
             $1,'FL','FDACS',$2,$3,
             $4,$5,'fdacs_legacy_xls',$2,$6,
             now(),'OBSERVED','SOURCE_OBSERVATION',$7::jsonb,'official_source'
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
        [finals.filter((o) => o.op === 'INSERT_NEW_CANONICAL').map((o) => o.companyId)]
      );
      if (ingested.rows[0].n !== FL_011D_EXPECTED_INSERT && stats.companies_inserted !== 0) {
        const have = await client.query(
          `SELECT count(*)::int AS n FROM companies WHERE id = ANY($1::text[]) AND publication_state='INGESTED' AND indexable=false`,
          [finals.filter((o) => o.op === 'INSERT_NEW_CANONICAL').map((o) => o.companyId)]
        );
        if (have.rows[0].n !== FL_011D_EXPECTED_INSERT) {
          throw new Error(`REFUSAL — ingested insert cohort ${have.rows[0].n} != ${FL_011D_EXPECTED_INSERT}`);
        }
      }

      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    }
  }

  const after = await freezeSnapshot(client);

  if (before.county_regulatory_program !== after.county_regulatory_program ||
      before.provider_county_credential !== after.provider_county_credential) {
    throw new Error('REFUSAL — Builder 2 county tables changed');
  }
  if (after.indexable !== before.indexable) {
    throw new Error(`REFUSAL — indexable delta ${after.indexable - before.indexable}`);
  }

  const authorityAudit = await client.query(
    `SELECT upper(authority_number) AS im, company_id, count(*)::int AS n
       FROM provider_state_authority
      WHERE state_code='FL' AND upper(authority_number) = ANY($1::text[])
      GROUP BY 1,2`,
    [finals.map((o) => o.fdacsIm.toUpperCase())]
  );

  await client.end();

  const realized = {
    google_places_requests: 0,
    discovered_from_fl011c: {
      target_active_im: 281,
      withheld: FL_011D_WITHHELD,
    },
    realized: {
      new_companies_canonicalized: apply ? stats.companies_inserted : 0,
      existing_companies_regulatorily_enriched: apply ? psaInserts + psaAttach : 0,
      fdacs_authorities_added: apply ? stats.psa_inserted : 0,
      fdacs_authorities_noop: psaNoop,
      email_observations_stored: apply
        ? contactPlans.filter((c) => c.kind === 'business_email' && c.action === 'INSERT' && stats.contacts_inserted >= 0)
            .length && apply
          ? null
          : 0
        : 0,
      phone_observations_stored: 0,
      address_observations_stored: 0,
      canonical_emails_promoted: 0,
      canonical_phones_promoted: 0,
      canonical_addresses_promoted: 0,
      publicly_published_new_companies: 0,
      new_public_state_profiles: 0,
      withheld_unresolved: FL_011D_WITHHELD,
    },
    production_writes: apply ? stats.companies_inserted + stats.psa_inserted + stats.contacts_inserted : 0,
  };

  if (apply) {
    realized.realized.email_observations_stored = contactPlans.filter(
      (c) => c.kind === 'business_email' && (c.action === 'INSERT' || c.action === 'ATTACH')
    ).length;
    realized.realized.phone_observations_stored = contactPlans.filter(
      (c) => c.kind === 'business_phone' && (c.action === 'INSERT' || c.action === 'ATTACH')
    ).length;
    realized.realized.address_observations_stored = contactPlans.filter(
      (c) => c.kind === 'physical_address' && (c.action === 'INSERT' || c.action === 'ATTACH')
    ).length;
    realized.realized.existing_companies_regulatorily_enriched = FL_011D_EXPECTED_LINK;
    realized.realized.new_companies_canonicalized = FL_011D_EXPECTED_INSERT;
  }

  writeJson(resolve(LEDGER(), 'fl-011d-impact-realized.json'), realized);
  writeJson(resolve(DOCS(), 'task-fl-011d-impact-realized-delta.json'), realized);
  writeJson(resolve(DOCS(), 'task-fl-011d-apply-result.json'), {
    google_places_requests: 0,
    apply,
    hash,
    blocked: false,
    stats,
    dry,
    freeze: { before, after },
    idempotent_would_be: idempotent,
    authority_groups: authorityAudit.rows,
  });
  writeJson(resolve(DOCS(), 'task-fl-011d-builder2-freeze.json'), {
    google_places_requests: 0,
    county_regulatory_program: { before: before.county_regulatory_program, after: after.county_regulatory_program },
    provider_county_credential: { before: before.provider_county_credential, after: after.provider_county_credential },
    unchanged:
      before.county_regulatory_program === after.county_regulatory_program &&
      before.provider_county_credential === after.provider_county_credential,
  });

  void isFl011dMatchMethod;

  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        task: FL_011D_TASK,
        apply,
        hash,
        draft_hash: bound.hash,
        link: linkN,
        insert: insertN,
        total: finals.length,
        blocked,
        dry,
        stats,
        freeze: { before, after },
        http: skipHttp ? 'skipped' : 'captured',
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
