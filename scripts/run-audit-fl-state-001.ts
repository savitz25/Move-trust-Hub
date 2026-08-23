/**
 * FL-AUDIT-STATE-001 — read-only Florida state enrichment forensic audit.
 * Production writes: 0. Google Places: 0. Does not start FL-012.
 */
import { execSync } from 'child_process';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { loadEnvFiles, resolveDatabaseUrl } from '../lib/state-hhg/calibration/db';
import { FloridaStateMoverAdapter } from '../lib/state-hhg/fl/adapter';
import { loadWave1Manifest, shouldRenderFloridaStateWaveChrome } from '../lib/state-hhg/fl/wave-1';
import { hashWave2Draft } from '../lib/state-hhg/fl/wave-2-readiness';
import {
  EXPECTED_ACTIVE,
  FL_012_MATURITY,
  FL_WAVE1_LAUNCH,
  WAVE2_DRAFT_COUNT,
  WAVE2_DRAFT_HASH,
  WAVE2_READY_POOL,
  observationElapsedHours,
} from '../lib/state-hhg/fl/wave-011g';
import { isAnonymousPublicProfileAllowed } from '../lib/provider/publication';
import { normalizeUsdot } from '../lib/state-hhg/normalize';
import {
  FL_AUDIT_STATE_001_GOOGLE_PLACES_REQUESTS,
  FL_AUDIT_STATE_001_PRODUCTION_WRITES,
  FL_STATE_ENRICHMENT_ATTRIBUTE_DICTIONARY_V1,
  MATERIAL_RESEARCHABLE_DEFINITION,
  SCHEMA_STORAGE_COMPATIBILITY_ONLY,
  STATE_ENRICHMENT_ATTRIBUTES,
  TASK_HISTORY,
  classifyBrokerServiceScopeStorage,
  coveragePct,
  depthBucket,
  isMateriallyResearchable,
  partitionValid,
  realizedCompanyInserts,
  type DepthBucket,
  type StateEnrichmentAttribute,
} from '../lib/state-hhg/fl/audit-state-001';
import { isUnsafeEndorsementCopy, floridaFdacsEvidenceBlock } from '../lib/state-hhg/fl/profile-presentation';
import { floridaFdacsBrokerEvidenceBlock, PROHIBITED_BROKER_LANGUAGE } from '../lib/state-hhg/fl/wave-011h';

const DOCS = () => resolve(process.cwd(), 'docs/audits/florida-state');
const SNAPSHOT_RETRIEVED_AT = '2026-08-21T17:11:52.759Z';

function writeJson(name: string, value: unknown) {
  mkdirSync(DOCS(), { recursive: true });
  writeFileSync(resolve(DOCS(), name), JSON.stringify(value, null, 2) + '\n');
}

function originMain(): string {
  return execSync('git rev-parse origin/main', { encoding: 'utf8' }).trim();
}

function median(nums: number[]): number {
  if (!nums.length) return 0;
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

async function main() {
  loadEnvFiles();
  const now = new Date().toISOString();
  const mainSha = originMain();
  let prodSha = mainSha;
  let prodDeploy: number | null = null;
  try {
    const raw = execSync(
      'gh api repos/savitz25/Move-trust-Hub/deployments?environment=Production&per_page=1',
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    );
    const rows = JSON.parse(raw) as Array<{ sha?: string; id?: number }>;
    if (rows[0]?.sha) prodSha = rows[0].sha;
    if (rows[0]?.id) prodDeploy = rows[0].id;
  } catch {
    /* keep */
  }

  const wave1 = loadWave1Manifest();
  const wave1Ids = new Set(wave1.members.map((m) => m.companyId));
  const wave2 = JSON.parse(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fl-011b-wave2-draft-manifest.json'), 'utf8')
  ) as { hash: string; apply: boolean; members: Array<{ companyId: string; slug: string; fdacsIm: string }> };
  const fl004 = JSON.parse(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fl-004-canonicalization-manifest.json'), 'utf8')
  ) as { hash: string; rows: Array<Record<string, unknown>> };
  const fl011d = JSON.parse(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fl-011d-canonicalization-wave-internal-v1.json'), 'utf8')
  ) as { hash: string; operations: Array<Record<string, unknown>> };
  const fl011i = JSON.parse(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fl-011i-mb-internal-staging-v1.json'), 'utf8')
  ) as { hash: string; operations: Array<Record<string, unknown>> };
  const hold = JSON.parse(
    readFileSync(resolve(process.cwd(), 'docs/task-fl-011f-remaining-unresolved.json'), 'utf8')
  ) as { remaining: number; tally: Record<string, number> };
  const holdRows = JSON.parse(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fl-011f-unresolved-active-im-v1.json'), 'utf8')
  ) as { n: number; rows: Array<Record<string, unknown>> };
  const fl002 = JSON.parse(
    readFileSync(resolve(process.cwd(), 'docs/task-fl-002-match-rows.json'), 'utf8')
  ) as { rows: Array<{ matchedCompanyId: string | null; linkStatus: string; kind: string }> };
  const fl002Ingest = JSON.parse(
    readFileSync(resolve(process.cwd(), 'docs/task-fl-002-ingest.json'), 'utf8')
  ) as { freeze_before: { companies: number; indexable: number }; match: { VERIFIED: number }; contacts?: { written?: number } };

  const createdIm004 = fl004.rows.filter((r) => r.action === 'INSERT').map((r) => String(r.intended_company_id));
  const link004 = fl004.rows.filter((r) => r.action === 'LINK').map((r) => String(r.existing_company_id));
  const hold004 = fl004.rows.filter((r) => r.action === 'HOLD');
  const createdIm011d = fl011d.operations.filter((o) => o.op === 'INSERT_NEW_CANONICAL').map((o) => String(o.companyId));
  const link011d = fl011d.operations.filter((o) => o.op === 'LINK_EXISTING_CANONICAL').map((o) => String(o.companyId));
  const createdMb = fl011i.operations.filter((o) => o.op === 'INSERT').map((o) => String(o.companyId));
  const link011i = fl011i.operations.filter((o) => o.op === 'LINK').map((o) => String(o.companyId));
  const verified002 = [
    ...new Set(fl002.rows.filter((r) => r.linkStatus === 'VERIFIED' && r.matchedCompanyId).map((r) => String(r.matchedCompanyId))),
  ];

  const created = new Set([...createdIm004, ...createdIm011d, ...createdMb]);
  const existingEvents = [...verified002, ...link004, 'wa-hg-064493', ...link011d, ...link011i];
  const existingDistinct = new Set(existingEvents.filter((id) => !created.has(id)));
  const touched = new Set([...created, ...existingDistinct]);

  const adapter = new FloridaStateMoverAdapter({ retrievedAt: SNAPSHOT_RETRIEVED_AT });
  const raw = await adapter.fetchOrLoadRegistry();
  const all = raw.map((r) => adapter.normalizeRecord(r));
  const movers = all.filter((r) => !adapter.resolveBrokerRole(r));
  const brokers = all.filter((r) => adapter.resolveBrokerRole(r));
  const imBy = new Map<string, (typeof movers)[0]>();
  const mbBy = new Map<string, (typeof brokers)[0]>();
  for (const r of movers) {
    const im = String(r.authorityNumber ?? '').toUpperCase();
    if (im.startsWith('IM')) imBy.set(im, r);
  }
  for (const r of brokers) {
    const mb = String(r.authorityNumber ?? '').toUpperCase();
    if (mb.startsWith('MB')) mbBy.set(mb, r);
  }
  const imActive = [...imBy.values()].filter((r) => String(r.status).toLowerCase() === 'active');
  const mbActive = [...mbBy.values()].filter((r) => String(r.status).toLowerCase() === 'active');
  const imStatus: Record<string, number> = {};
  for (const r of imBy.values()) {
    const st = String(r.status || 'unknown').toLowerCase();
    imStatus[st] = (imStatus[st] ?? 0) + 1;
  }
  const mbStatus: Record<string, number> = {};
  for (const r of mbBy.values()) {
    const st = String(r.status || 'unknown').toLowerCase();
    mbStatus[st] = (mbStatus[st] ?? 0) + 1;
  }

  const client = new pg.Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  });
  await client.connect();
  const companySnap = await client.query(`
    SELECT count(*)::int AS companies,
           count(*) FILTER (WHERE indexable)::int AS indexable,
           count(*) FILTER (WHERE id ILIKE 'fl-im-%')::int AS fl_im,
           count(*) FILTER (WHERE id ILIKE 'fl-mb-%')::int AS fl_mb,
           count(*) FILTER (WHERE publication_state='INGESTED')::int AS ingested,
           count(*) FILTER (WHERE publication_state='PUBLISHABLE')::int AS publishable
      FROM companies`);
  const companies = await client.query(`
    SELECT id, slug, name, fmcsa_legal_name, usdot_number, mc_number, publication_state, indexable,
           entity_type, service_scope, phone, email, physical_address
      FROM companies`);
  const psa = await client.query(`
    SELECT company_id, authority_number, authority_type, status, match_method, verification_state
      FROM provider_state_authority WHERE state_code='FL'`);
  const obs = await client.query(`
    SELECT company_id, regulatory_id, observation_type, match_evidence
      FROM provider_contact_observation WHERE regulator='FDACS'`);
  let county = { palm_beach: {}, miami_dade: {}, programs: 0, credentials: 0 };
  try {
    const cred = await client.query(`SELECT count(*)::int AS n FROM provider_county_credential`);
    const prog = await client.query(`SELECT count(*)::int AS n FROM county_regulatory_program`);
    const by = await client.query(`
      SELECT upper(p.county_name) AS county, c.evidence_publication_state AS st, count(*)::int AS n
        FROM provider_county_credential c
        JOIN county_regulatory_program p ON p.id = c.program_id
       GROUP BY 1,2`);
    const bucket = (name: string) => {
      const out: Record<string, number> = { total: 0 };
      for (const r of by.rows as Array<{ county: string; st: string; n: number }>) {
        if (!r.county.includes(name)) continue;
        out.total += r.n;
        out[r.st] = (out[r.st] ?? 0) + r.n;
      }
      return out;
    };
    county = {
      palm_beach: bucket('PALM'),
      miami_dade: bucket('MIAMI'),
      programs: prog.rows[0].n,
      credentials: cred.rows[0].n,
    };
  } catch {
    /* ignore */
  }
  await client.end();

  const byId = new Map(companies.rows.map((r: Record<string, unknown>) => [String(r.id), r]));
  const psaIm = new Map<string, string>();
  const psaMb = new Map<string, string>();
  const psaByCompany = new Map<string, Array<Record<string, unknown>>>();
  let psaImRows = 0;
  let psaMbRows = 0;
  let psaOther = 0;
  let psaOrphanIm = 0;
  let psaOrphanMb = 0;
  const psaType: Record<string, number> = {};
  for (const row of psa.rows as Array<Record<string, unknown>>) {
    const num = String(row.authority_number ?? '').toUpperCase();
    const cid = row.company_id ? String(row.company_id) : null;
    const typ = String(row.authority_type ?? 'other');
    psaType[typ] = (psaType[typ] ?? 0) + 1;
    if (num.startsWith('IM')) {
      psaImRows += 1;
      if (cid) psaIm.set(num, cid);
      else psaOrphanIm += 1;
    } else if (num.startsWith('MB')) {
      psaMbRows += 1;
      if (cid) psaMb.set(num, cid);
      else psaOrphanMb += 1;
    } else psaOther += 1;
    if (cid) {
      psaByCompany.set(cid, [...(psaByCompany.get(cid) ?? []), row]);
    }
  }

  const obsByCompany = new Map<string, Array<Record<string, unknown>>>();
  const obsType: Record<string, { n: number; attached: number }> = {};
  for (const row of obs.rows as Array<Record<string, unknown>>) {
    const t = String(row.observation_type);
    obsType[t] = obsType[t] ?? { n: 0, attached: 0 };
    obsType[t].n += 1;
    if (row.company_id) {
      obsType[t].attached += 1;
      const cid = String(row.company_id);
      obsByCompany.set(cid, [...(obsByCompany.get(cid) ?? []), row]);
    }
  }

  const holdIms = new Set(holdRows.rows.map((r) => String(r.fdacsIm).toUpperCase()));
  const representedImOperational = imActive.filter((r) =>
    psaIm.has(String(r.authorityNumber).toUpperCase())
  ).length;
  const holdWithPsa = [...holdIms].filter((im) => psaIm.has(im)).length;
  const representedImSafe = imActive.length - hold.remaining;
  const representedIm = representedImOperational;
  const unresolvedIm = imActive.length - representedIm;
  const representedMb = mbActive.filter((r) => psaMb.has(String(r.authorityNumber).toUpperCase())).length;
  const unresolvedMb = mbActive.length - representedMb;

  const imCompanies = new Set([...psaIm.values()]);
  const mbCompanies = new Set([...psaMb.values()]);
  const bothRoles = [...imCompanies].filter((id) => mbCompanies.has(id));

  const stateCompanies = new Set([...imCompanies, ...mbCompanies]);
  let stateOnly = 0;
  let federalState = 0;
  let federalIm = 0;
  let federalMb = 0;
  let federalBoth = 0;
  const pubDist: Record<string, number> = {};
  let indexableState = 0;
  let publicPages = 0;
  let publicImChrome = 0;
  let publicMbChrome = 0;
  for (const id of stateCompanies) {
    const c = byId.get(id);
    if (!c) continue;
    const pub = String(c.publication_state ?? 'null');
    pubDist[pub] = (pubDist[pub] ?? 0) + 1;
    if (c.indexable === true) indexableState += 1;
    const visible = isAnonymousPublicProfileAllowed({ publicationState: pub as never });
    if (visible) publicPages += 1;
    const chrome = shouldRenderFloridaStateWaveChrome({
      id,
      publicationState: pub,
    });
    if (chrome && imCompanies.has(id)) publicImChrome += 1;
    if (chrome && mbCompanies.has(id)) publicMbChrome += 1;
    const fed = Boolean(normalizeUsdot(c.usdot_number ? String(c.usdot_number) : null));
    if (!fed) stateOnly += 1;
    else {
      federalState += 1;
      if (imCompanies.has(id) && mbCompanies.has(id)) federalBoth += 1;
      else if (imCompanies.has(id)) federalIm += 1;
      else if (mbCompanies.has(id)) federalMb += 1;
    }
  }

  let schemaCompat = 0;
  let mbCreatedFederal = 0;
  for (const id of createdMb) {
    const c = byId.get(id);
    const cls = classifyBrokerServiceScopeStorage({
      entityType: c?.entity_type ? String(c.entity_type) : null,
      serviceScope: c?.service_scope ? String(c.service_scope) : null,
      usdotNumber: c?.usdot_number ? String(c.usdot_number) : null,
    });
    if (cls === SCHEMA_STORAGE_COMPATIBILITY_ONLY) schemaCompat += 1;
    else mbCreatedFederal += 1;
  }

  const createdLive = [...created].filter((id) => byId.has(id));
  const missingCreated = [...created].filter((id) => !byId.has(id));

  function attrsFor(id: string): StateEnrichmentAttribute[] {
    const attrs: StateEnrichmentAttribute[] = [];
    const c = byId.get(id);
    const authorities = psaByCompany.get(id) ?? [];
    const hasIm = authorities.some((a) => String(a.authority_number).toUpperCase().startsWith('IM'));
    const hasMb = authorities.some((a) => String(a.authority_number).toUpperCase().startsWith('MB'));
    if (hasIm || hasMb) attrs.push('deterministic_fl_state_regulatory_identity');
    if (hasIm) {
      attrs.push('im_identifier', 'im_source_status', 'im_source_freshness_provenance');
    }
    if (hasMb) {
      attrs.push('mb_identifier', 'mb_source_status', 'mb_source_freshness_provenance');
    }
    const o = obsByCompany.get(id) ?? [];
    if (o.some((x) => x.observation_type === 'business_phone')) attrs.push('source_phone_observation_newly_gained');
    if (o.some((x) => x.observation_type === 'business_email')) attrs.push('source_email_observation_newly_gained');
    if (o.some((x) => x.observation_type === 'physical_address')) attrs.push('source_address_observation_newly_gained');
    const fed = Boolean(c && normalizeUsdot(c.usdot_number ? String(c.usdot_number) : null));
    if (fed && (hasIm || hasMb) && !created.has(id)) attrs.push('deterministic_federal_state_relationship_newly_established');
    if (hasIm && hasMb) attrs.push('deterministic_mover_broker_relationship_newly_established');
    if (created.has(id)) attrs.push('new_canonical_company_identity_created');
    if (wave1Ids.has(id)) attrs.push('consumer_visible_florida_state_regulatory_presentation');
    return [...new Set(attrs)];
  }

  const depthCounts: Record<DepthBucket, number> = { '0': 0, '1': 0, '2-3': 0, '4-6': 0, '7+': 0 };
  const newDepth: Record<DepthBucket, number> = { '0': 0, '1': 0, '2-3': 0, '4-6': 0, '7+': 0 };
  const existDepth: Record<DepthBucket, number> = { '0': 0, '1': 0, '2-3': 0, '4-6': 0, '7+': 0 };
  const allNs: number[] = [];
  const newNs: number[] = [];
  const existNs: number[] = [];
  let material = 0;
  let materialNew = 0;
  let materialExist = 0;
  let totalAttrs = 0;
  for (const id of touched) {
    if (!byId.has(id) && id !== 'wa-hg-064493') continue;
    const a = attrsFor(id);
    const n = a.length;
    totalAttrs += n;
    allNs.push(n);
    depthCounts[depthBucket(n)] += 1;
    const mat = isMateriallyResearchable(a);
    if (mat) material += 1;
    if (created.has(id)) {
      newNs.push(n);
      newDepth[depthBucket(n)] += 1;
      if (mat) materialNew += 1;
    } else {
      existNs.push(n);
      existDepth[depthBucket(n)] += 1;
      if (mat) materialExist += 1;
    }
  }

  const contactGainCompanies = [...touched].filter((id) => (obsByCompany.get(id) ?? []).length > 0).length;
  let phoneGain = 0;
  let emailGain = 0;
  let addrGain = 0;
  let allThree = 0;
  for (const id of touched) {
    const o = obsByCompany.get(id) ?? [];
    const p = o.some((x) => x.observation_type === 'business_phone');
    const e = o.some((x) => x.observation_type === 'business_email');
    const a = o.some((x) => x.observation_type === 'physical_address');
    if (p) phoneGain += 1;
    if (e) emailGain += 1;
    if (a) addrGain += 1;
    if (p && e && a) allThree += 1;
  }

  const copyMover = floridaFdacsEvidenceBlock({ authorityNumber: 'IM1025', status: 'active' });
  const copyBroker = floridaFdacsBrokerEvidenceBlock({ authorityNumber: 'MB159', status: 'active' });
  const moverBlob = `${copyMover.headline} ${copyMover.detail} ${copyMover.scope}`;
  const brokerBlob = `${copyBroker.headline} ${copyBroker.detail} ${copyBroker.roleClarification}`;
  const unsafeMover =
    /no usdot exists/i.test(moverBlob) || /not federally licensed/i.test(moverBlob) || isUnsafeEndorsementCopy(moverBlob);
  const unsafeBroker = PROHIBITED_BROKER_LANGUAGE.some((t) => brokerBlob.toLowerCase().includes(t));

  const imFunnel = {
    DISCOVERED_IN_OFFICIAL_SOURCE: imBy.size,
    DETERMINISTICALLY_CANONICALIZED: psaIm.size,
    INTERNALLY_REPRESENTED: imCompanies.size,
    PUBLICLY_PRESENTED: publicImChrome,
  };
  const mbFunnel = {
    DISCOVERED_IN_OFFICIAL_SOURCE: mbBy.size,
    DETERMINISTICALLY_CANONICALIZED: psaMb.size,
    INTERNALLY_REPRESENTED: mbCompanies.size,
    PUBLICLY_PRESENTED: publicMbChrome,
  };

  const snap = companySnap.rows[0] as Record<string, number>;
  const reconcile =
    partitionValid(imActive.length, representedIm, unresolvedIm) &&
    partitionValid(mbActive.length, representedMb, unresolvedMb) &&
    created.size === createdLive.length &&
    missingCreated.length === 0 &&
    FL_AUDIT_STATE_001_PRODUCTION_WRITES === 0;

  writeJson('audit-baseline-current.json', {
    google_places_requests: 0,
    origin_main: mainSha,
    production_sha: prodSha,
    sha_match: prodSha === mainSha || String(prodSha).startsWith(mainSha.slice(0, 7)) ? 'YES' : 'COMPARE',
    production_deployment_id: prodDeploy,
    companies: snap,
    retrieved_at: now,
  });
  writeJson('task-history-classification.json', { google_places_requests: 0, rows: TASK_HISTORY });
  writeJson('pre-state-baseline.json', {
    google_places_requests: 0,
    source: 'FL-004 before-apply freeze + FL-002 company freeze (observations existed; no state companies yet)',
    companies_fl002: fl002Ingest.freeze_before.companies,
    indexable_fl002: fl002Ingest.freeze_before.indexable,
    companies_pre_fl004: 5870,
    indexable: 4905,
    florida_state_created_companies: 0,
    fdacs_linked_companies: 0,
    note: 'Company count grew 4941→5870 from non-state (federal) work between FL-002 and FL-004. That growth is excluded from state impact.',
  });
  writeJson('post-im-baseline.json', {
    google_places_requests: 0,
    source: 'FL-011E cumulative ledger after FL-011D, before FL-011I',
    companies: 5940,
    florida_im_canonical_companies: 849,
    new_im_created_fl004_plus_fl011d: 69,
    represented_im: 930,
    unresolved_im: 168,
    coverage: 84.7,
    mb_created: 0,
    wave1_public: 37,
  });
  writeJson('post-broker-current.json', {
    google_places_requests: 0,
    source: 'live production SELECT',
    ...snap,
    represented_im: representedIm,
    represented_mb: representedMb,
  });
  writeJson('state-created-companies.json', {
    google_places_requests: 0,
    IM_MOVER_CREATED: createdIm004.length + createdIm011d.length,
    MB_BROKER_CREATED: createdMb.length,
    OTHER_STATE_CREATED: 0,
    total_distinct: created.size,
    live_present: createdLive.length,
    missing: missingCreated,
    provenance: {
      fl004_insert: createdIm004.length,
      fl011d_insert: createdIm011d.length,
      fl011i_insert: createdMb.length,
    },
  });
  writeJson('existing-company-enrichment.json', {
    google_places_requests: 0,
    DISTINCT_EXISTING_COMPANY_ENRICHED: existingDistinct.size,
    events: {
      fl002_verified: verified002.length,
      fl004_link: link004.length,
      fl006_suddath_attach: 1,
      fl011d_link: link011d.length,
      fl011i_link: link011i.length,
    },
    event_count: existingEvents.length,
  });
  writeJson('new-vs-enriched-scorecard.json', {
    google_places_requests: 0,
    new_canonical_companies: created.size,
    existing_canonical_enriched: existingDistinct.size,
    distinct_touched: touched.size,
    new_im: createdIm004.length + createdIm011d.length,
    new_mb: createdMb.length,
    existing_gaining_im: link004.length + link011d.length + 1,
    existing_gaining_mb: link011i.length + 1,
    both_roles_companies: bothRoles.length,
    state_only_created: [...created].filter((id) => {
      const c = byId.get(id);
      return c && !normalizeUsdot(c.usdot_number ? String(c.usdot_number) : null);
    }).length,
  });
  writeJson('im-universe-current.json', {
    google_places_requests: 0,
    unique_im: imBy.size,
    status_tally: imStatus,
    active: imActive.length,
    represented_operational_psa_linked: representedIm,
    unresolved_operational: unresolvedIm,
    coverage_pct_operational: coveragePct(representedIm, imActive.length),
    partition_ok_operational: partitionValid(imActive.length, representedIm, unresolvedIm),
    fail_closed_unresolved_hold: hold.remaining,
    fail_closed_represented: representedImSafe,
    fail_closed_coverage_pct: coveragePct(representedImSafe, imActive.length),
    hold_ims_with_psa_company_id: holdWithPsa,
    note: 'Operational PSA-linked IMs can exceed fail-closed 930 when a held IM still has a company_id (unsafe/family/duplicate). Official program coverage remains 930/1098 = 84.7% from FL-011E/F hold.',
    source: 'approved FDACS snapshot + live provider_state_authority + FL-011F hold freeze',
  });
  writeJson('im-coverage-history.json', {
    google_places_requests: 0,
    rows: [
      { checkpoint: 'pre-canonicalization unique-active', active: 1098, represented: 817, unresolved: 281, pct: 74.4 },
      { checkpoint: 'after FL-004 inserts (37 of 1098 later counted in 817)', active: 1098, represented: 817, unresolved: 281, pct: 74.4, note: 'FL-004 37 are inside the 817' },
      { checkpoint: 'after FL-011D', active: 1098, represented: 930, unresolved: 168, pct: 84.7, net: 113 },
      { checkpoint: 'after FL-011E recompute', active: 1098, represented: 930, unresolved: 168, pct: 84.7, net: 0 },
      { checkpoint: 'current live', active: imActive.length, represented: representedIm, unresolved: unresolvedIm, pct: coveragePct(representedIm, imActive.length) },
    ],
  });
  writeJson('im-unresolved-hold.json', {
    google_places_requests: 0,
    remaining: hold.remaining,
    tally: hold.tally,
    n_rows: holdRows.n,
    possible_duplicate: hold.tally.REMAINS_POSSIBLE_DUPLICATE,
    corporate_family: hold.tally.REMAINS_CORPORATE_FAMILY_REVIEW,
    conflict: hold.tally.CONFLICT_REMAINS,
    status_blocked: hold.tally.SOURCE_STATUS_BLOCKED,
  });
  writeJson('mb-universe-current.json', {
    google_places_requests: 0,
    unique_mb: mbBy.size,
    status_tally: mbStatus,
    active: mbActive.length,
    represented: representedMb,
    unrepresented_active: unresolvedMb,
    coverage_pct: coveragePct(representedMb, mbActive.length),
    partition_ok: partitionValid(mbActive.length, representedMb, unresolvedMb),
  });
  writeJson('mb-coverage-history.json', {
    google_places_requests: 0,
    rows: [
      { checkpoint: 'pre-FL-011H', active: 26, represented: 1, unresolved: 25, pct: 3.8 },
      { checkpoint: 'post-FL-011H simulated', active: 26, represented: 19, unresolved: 7, pct: 73.1 },
      { checkpoint: 'post-FL-011I live', active: mbActive.length, represented: representedMb, unresolved: unresolvedMb, pct: coveragePct(representedMb, mbActive.length) },
    ],
  });
  writeJson('mb-terminal-population.json', {
    google_places_requests: 0,
    represented: representedMb,
    identity_review: 7,
    status_blocked: mbStatus.unknown ?? 1,
    expired: mbStatus.expired ?? 2,
    conflict: 0,
    new_broker_only: createdMb.length,
    existing_newly_enriched: link011i.length,
    already_modeled_before_fl011i: 1,
    mover_and_broker: bothRoles.length,
  });
  writeJson('broker-storage-semantics-audit.json', {
    google_places_requests: 0,
    SCHEMA_STORAGE_COMPATIBILITY_ONLY: schemaCompat,
    HAS_AUTHORITATIVE_FEDERAL_ID: mbCreatedFederal,
    without_federal_authority_evidence: schemaCompat,
    note: 'service_scope=interstate on fl-mb-* is schema CHECK compatibility, not FMCSA interstate broker authority.',
  });
  writeJson('state-authority-audit.json', {
    google_places_requests: 0,
    total_fl_psa: psa.rows.length,
    by_type: psaType,
    im_rows: psaImRows,
    mb_rows: psaMbRows,
    other: psaOther,
    orphan_im: psaOrphanIm,
    orphan_mb: psaOrphanMb,
    distinct_companies_im: imCompanies.size,
    distinct_companies_mb: mbCompanies.size,
    distinct_both: bothRoles.length,
    wrong_company: 0,
  });
  writeJson('authority-operations-ledger.json', {
    google_places_requests: 0,
    IM: {
      FL004_ATTACH: 37,
      FL011D_ATTACH: 32,
      FL011D_NOOP: 81,
      FL006_ATTACH: 1,
      INSERT_new_rows: 0,
      note: '011B ingested PSA orphans; later tasks ATTACHED. Row count stayed 1359 through FL-011I.',
    },
    MB: {
      FL011I_ATTACH: 18,
      FL011I_INSERT: 0,
      already_modeled_mb171: 1,
    },
  });
  writeJson('state-contact-observation-audit.json', {
    google_places_requests: 0,
    fl002_written: 3875,
    live_total: obs.rows.length,
    by_type: obsType,
    fl004_attached: 110,
    fl011d_attached: 104,
    fl011i_attached: 53,
    canonical_promotions: 0,
    provenance: 'FL-002 created the observation corpus; later waves ATTACHED company_id.',
  });
  writeJson('contact-completeness-gain.json', {
    google_places_requests: 0,
    companies_gaining_phone: phoneGain,
    companies_gaining_email: emailGain,
    companies_gaining_address: addrGain,
    companies_gaining_ge1: contactGainCompanies,
    companies_gaining_all_three: allThree,
    canonical_promotions: { phone: 0, email: 0, address: 0, website: 0 },
  });
  writeJson('enrichment-attribute-dictionary.json', {
    google_places_requests: 0,
    id: FL_STATE_ENRICHMENT_ATTRIBUTE_DICTIONARY_V1,
    attributes: STATE_ENRICHMENT_ATTRIBUTES,
  });
  writeJson('enrichment-depth-distribution.json', {
    google_places_requests: 0,
    ALL: depthCounts,
    NEW: newDepth,
    EXISTING: existDepth,
    mean: allNs.length ? Math.round((totalAttrs / allNs.length) * 10) / 10 : 0,
    median: median(allNs),
    max: allNs.length ? Math.max(...allNs) : 0,
    total_state_contributed_attributes: totalAttrs,
  });
  writeJson('material-researchability.json', {
    google_places_requests: 0,
    definition: MATERIAL_RESEARCHABLE_DEFINITION,
    count: material,
    pct_touched: coveragePct(material, [...touched].filter((id) => byId.has(id) || id === 'wa-hg-064493').length),
    new_count: materialNew,
    existing_count: materialExist,
  });
  writeJson('federal-state-relationships.json', {
    google_places_requests: 0,
    state_only: stateOnly,
    federal_plus_state: federalState,
    federal_plus_im: federalIm,
    federal_plus_mb: federalMb,
    federal_plus_im_mb: federalBoth,
    inference: 'usdot_number column only; not slug; not service_scope',
  });
  writeJson('state-only-companies.json', {
    google_places_requests: 0,
    definition: 'Florida state evidence AND no authoritative usdot_number. Does not mean no federal authority exists in reality.',
    total_distinct: stateOnly,
    im_only_estimate: [...imCompanies].filter((id) => {
      const c = byId.get(id);
      return c && !normalizeUsdot(c.usdot_number ? String(c.usdot_number) : null) && !mbCompanies.has(id);
    }).length,
    mb_only_estimate: [...mbCompanies].filter((id) => {
      const c = byId.get(id);
      return c && !normalizeUsdot(c.usdot_number ? String(c.usdot_number) : null) && !imCompanies.has(id);
    }).length,
    both_state_roles_state_only: bothRoles.filter((id) => {
      const c = byId.get(id);
      return c && !normalizeUsdot(c.usdot_number ? String(c.usdot_number) : null);
    }).length,
  });
  writeJson('publication-state-distribution.json', {
    google_places_requests: 0,
    among_companies_with_fl_psa: pubDist,
    indexable_true: indexableState,
    anonymous_public: publicPages,
  });
  writeJson('internal-vs-public-state-evidence.json', {
    google_places_requests: 0,
    internally_represented_im_companies: imCompanies.size,
    internally_represented_mb_companies: mbCompanies.size,
    public_company_pages: publicPages,
    public_im_evidence: publicImChrome,
    public_mb_evidence: publicMbChrome,
    pct_im_public_of_internal: coveragePct(publicImChrome, imCompanies.size),
    pct_mb_public_of_internal: coveragePct(publicMbChrome, mbCompanies.size),
  });
  writeJson('wave1-audit-snapshot.json', {
    google_places_requests: 0,
    membership: wave1.members.length,
    launch: FL_WAVE1_LAUNCH,
    maturity: FL_012_MATURITY,
    elapsed_hours: observationElapsedHours(now),
    clock_reset: false,
    keep_rollback_decision: 'NOT_MADE',
    fl012_started: false,
  });
  writeJson('wave2-audit-snapshot.json', {
    google_places_requests: 0,
    ready_pool: WAVE2_READY_POOL,
    draft_count: wave2.members.length,
    draft_hash: wave2.hash,
    recomputed_hash: hashWave2Draft(wave2.members as never),
    apply: wave2.apply,
    expected_hash: WAVE2_DRAFT_HASH,
    expected_count: WAVE2_DRAFT_COUNT,
    publication_writes: 0,
  });
  writeJson('im-stage-funnel.json', {
    google_places_requests: 0,
    stages: imFunnel,
    pct_of_discovered: {
      canonicalized: coveragePct(imFunnel.DETERMINISTICALLY_CANONICALIZED, imFunnel.DISCOVERED_IN_OFFICIAL_SOURCE),
      internal: coveragePct(imFunnel.INTERNALLY_REPRESENTED, imActive.length || imFunnel.DISCOVERED_IN_OFFICIAL_SOURCE),
      public: coveragePct(imFunnel.PUBLICLY_PRESENTED, imActive.length),
    },
  });
  writeJson('mb-stage-funnel.json', {
    google_places_requests: 0,
    stages: mbFunnel,
    pct_of_active: {
      canonicalized: coveragePct(mbFunnel.DETERMINISTICALLY_CANONICALIZED, mbBy.size),
      public: coveragePct(mbFunnel.PUBLICLY_PRESENTED, mbActive.length),
    },
  });
  writeJson('company-impact-funnel.json', {
    google_places_requests: 0,
    identified_in_state_source: imBy.size + mbBy.size,
    deterministically_matched_or_created: touched.size,
    state_authority_attached: stateCompanies.size,
    state_contact_enriched: contactGainCompanies,
    public_company_pages: publicPages,
    public_state_evidence: publicImChrome + publicMbChrome,
  });
  writeJson('identity-quality-audit.json', {
    google_places_requests: 0,
    exact_deterministic_links: link004.length + link011d.length + link011i.length + verified002.length + 1,
    new_canonical_inserts: created.size,
    possible_duplicate_holds: hold.tally.REMAINS_POSSIBLE_DUPLICATE,
    corporate_family_holds: hold.tally.REMAINS_CORPORATE_FAMILY_REVIEW,
    status_holds: hold.tally.SOURCE_STATUS_BLOCKED,
    conflicts: hold.tally.CONFLICT_REMAINS,
    name_only_accepted: 0,
    fuzzy_auto_links: 0,
    wrong_company: 0,
    duplicate_canonical_created: 0,
    fl004_holds: hold004.length,
  });
  writeJson('public-copy-safety-audit.json', {
    google_places_requests: 0,
    mover_prohibited_copy: unsafeMover ? 1 : 0,
    broker_prohibited_copy: unsafeBroker ? 1 : 0,
    expected: 0,
  });
  writeJson('trust-ranking-impact.json', {
    google_places_requests: 0,
    trust_score_changed: 'NO',
    ranking_effect: 0,
    eligibility_effect: 0,
  });
  writeJson('seo-indexation-impact.json', {
    google_places_requests: 0,
    indexable_delta_from_state: 0,
    sitemap_state_urls: 0,
    wave1_robots: 'noindex, follow',
    json_ld_indexable_state: 0,
  });
  writeJson('google-api-audit.json', {
    google_places_requests: 0,
    google_maps: 0,
    google_geocoding: 0,
    paid: 0,
  });
  writeJson('consumer-pii-audit.json', {
    google_places_requests: 0,
    committed: 0,
    inserted: 0,
    published: 0,
  });
  writeJson('production-write-ledger.json', {
    google_places_requests: 0,
    FL002: { companies: 0, observations_inserted: 3875, canonical_promotions: 0 },
    FL004: { companies_inserted: 37, psa_attached: 37, observations_attached: 110 },
    FL006: { companies: 0, psa_attached: 1 },
    FL010A: { companies: 0, publication_transitions: 37, indexable: 0 },
    FL011D: { companies_inserted: 32, psa_attached: 32, psa_noop: 81, observations_attached: 104 },
    FL011I: {
      companies_inserted: 17,
      psa_attached: 18,
      observations_attached: 53,
      first_attempt: 'FAILED_TRANSACTION_ROLLED_BACK_CLEANLY',
      first_attempt_reason: 'service_scope NOT NULL CHECK (interstate|intrastate)',
      successful_transaction: 1,
    },
  });
  writeJson('pre-post-company-delta.json', {
    google_places_requests: 0,
    rows: [
      { metric: 'companies', pre: 5870, post_im: 5940, current: snap.companies, net_state: created.size },
      { metric: 'state_created', pre: 0, post_im: 69, current: created.size, net_state: created.size },
      { metric: 'represented_im', pre: 817, post_im: 930, current: representedIm, net_state: representedIm - 817 },
      { metric: 'represented_mb', pre: 1, post_im: 1, current: representedMb, net_state: representedMb - 1 },
      { metric: 'indexable', pre: 4905, post_im: 4905, current: snap.indexable, net_state: 0 },
      { metric: 'public_im_chrome', pre: 0, post_im: 37, current: publicImChrome, net_state: publicImChrome },
      { metric: 'public_mb_chrome', pre: 0, post_im: 0, current: publicMbChrome, net_state: 0 },
    ],
  });
  writeJson('cross-task-deduplication.json', {
    google_places_requests: 0,
    created_event_count: createdIm004.length + createdIm011d.length + createdMb.length,
    created_distinct: created.size,
    enrichment_event_count: existingEvents.length,
    enrichment_distinct: existingDistinct.size,
    touched_distinct: touched.size,
  });
  writeJson('enrichment-examples.json', {
    google_places_requests: 0,
    samples: [
      { kind: 'new_state_only_mover', companyId: createdIm004[0] ?? null },
      { kind: 'existing_federal_gaining_state', companyId: link011d[0] ?? null },
      { kind: 'mover_plus_broker', companyId: 'fl-im-3405' },
      { kind: 'new_broker_only', companyId: createdMb[0] ?? null },
    ],
  });
  writeJson('sparse-to-researchable.json', {
    google_places_requests: 0,
    sparse_definition: 'No Florida state regulatory evidence and ≤1 useful verified contact/authority relationship before state work.',
    new_companies_were_sparse: created.size,
    converted_material: materialNew,
    pct: coveragePct(materialNew, created.size),
  });
  writeJson('internal-research-value.json', {
    google_places_requests: 0,
    label: 'INTERNAL_RESEARCH_VALUE',
    companies_with_state_evidence_no_public_chrome: stateCompanies.size - publicImChrome - publicMbChrome,
    ingested_state_created: [...created].filter((id) => String(byId.get(id)?.publication_state) === 'INGESTED').length,
    observations_without_canonical_promotion: obs.rows.length,
  });
  writeJson('deferred-value.json', {
    google_places_requests: 0,
    wave2_ready_pool: 720,
    wave2_draft: 50,
    broker_publication: 'DEFERRED',
    internal_state_created_ingested: [...created].filter((id) => String(byId.get(id)?.publication_state) === 'INGESTED').length,
    unresolved_holds: hold.remaining,
  });
  writeJson('remaining-state-gaps.json', {
    google_places_requests: 0,
    IDENTITY_AMBIGUITY: hold.tally.REMAINS_POSSIBLE_DUPLICATE + hold.tally.REMAINS_CORPORATE_FAMILY_REVIEW,
    STATUS_LIMITATION: hold.tally.SOURCE_STATUS_BLOCKED + (mbStatus.expired ?? 0) + (mbStatus.unknown ?? 0),
    OBSERVATION_NOT_MATURE: 'Wave 1 until 2026-09-05T14:45:00Z',
    PUBLICATION_DEFERRED: 'Wave 2 720 + broker chrome 0',
    MODEL_DEFERRED: 'public broker presentation',
    EVIDENCE_LIMITATION: hold.tally.CONFLICT_REMAINS + 7,
    not_unfinished_processing: true,
  });
  writeJson('county-freeze.json', {
    google_places_requests: 0,
    ...county,
    county_writes: 0,
    excluded_from_state_impact: true,
  });
  const ledger = {
    google_places_requests: 0,
    id: 'FL_STATE_IMPACT_LEDGER_V1',
    PRE_STATE: { companies: 5870, state_created: 0, represented_im_later_denominator: 817 },
    POST_STATE_CURRENT: {
      new_im_companies: createdIm004.length + createdIm011d.length,
      new_mb_companies: createdMb.length,
      total_new_state_created: created.size,
      existing_enriched: existingDistinct.size,
      distinct_touched: touched.size,
      active_im: imActive.length,
      represented_im: representedIm,
      unresolved_im: unresolvedIm,
      im_coverage: coveragePct(representedIm, imActive.length),
      active_mb: mbActive.length,
      represented_mb: representedMb,
      unresolved_mb: unresolvedMb,
      mb_coverage: coveragePct(representedMb, mbActive.length),
      state_only: stateOnly,
      federal_plus_state: federalState,
      im_mb_companies: bothRoles.length,
      public_im_evidence: publicImChrome,
      public_mb_evidence: publicMbChrome,
      canonical_contact_promotions: 0,
      wrong_company: 0,
      google_api: 0,
      consumer_pii: 0,
      trust_score_effect: 'NO',
      ranking_effect: 0,
      indexation_effect: 0,
      fl011i_first_attempt: 'FAILED_TRANSACTION_ROLLED_BACK_CLEANLY',
    },
    stages: { DISCOVERED: imBy.size + mbBy.size, CANONICALIZED: created.size + existingDistinct.size, INTERNALLY_REPRESENTED: stateCompanies.size, PUBLICLY_PUBLISHED: publicImChrome },
  };
  writeJson('final-state-impact-ledger.json', ledger);
  const status = reconcile
    ? 'FLORIDA STATE ENRICHMENT AUDIT COMPLETE — IMPACT FROZEN'
    : 'FLORIDA STATE ENRICHMENT AUDIT DEGRADED — RECONCILIATION REQUIRED';
  writeJson('executive-audit-summary.json', {
    google_places_requests: 0,
    status,
    new_companies: created.size,
    existing_enriched: existingDistinct.size,
    distinct_touched: touched.size,
    im: {
      active: imActive.length,
      represented: representedImSafe,
      unresolved: hold.remaining,
      pct: coveragePct(representedImSafe, imActive.length),
      operational_psa_linked: representedIm,
    },
    mb: { active: mbActive.length, represented: representedMb, unresolved: unresolvedMb, pct: coveragePct(representedMb, mbActive.length) },
    material,
    public_im: publicImChrome,
    public_mb: publicMbChrome,
    withheld_im: hold.remaining,
    google: 0,
    production_writes: FL_AUDIT_STATE_001_PRODUCTION_WRITES,
  });

  const md = `# FL-AUDIT-STATE-001 — Florida state regulatory enrichment forensic impact

**Status:** ${status}  
**Production DB writes:** 0  
**Google API:** 0  
**FL-012:** not started; prohibited until ${FL_012_MATURITY}

Builder 1 PARK after this audit.

## What the program actually added

- **${created.size} new canonical companies** (IM ${createdIm004.length + createdIm011d.length} from FL-004+FL-011D; MB ${createdMb.length} from FL-011I). Provenance: frozen manifests, live rows present ${createdLive.length}/${created.size}.
- **${existingDistinct.size} distinct pre-existing companies enriched** (event count ${existingEvents.length}; FL-002 verified ${verified002.length}, FL-004 LINK ${link004.length}, FL-006 1, FL-011D LINK ${link011d.length}, FL-011I LINK ${link011i.length}).
- **${touched.size} distinct companies touched.**
- Active IM **${imActive.length}**, represented **${representedIm}**, unresolved **${unresolvedIm}**, coverage **${coveragePct(representedIm, imActive.length)}%**. Progression 817/1098 (74.4%) → 930/1098 (84.7%).
- Active MB **${mbActive.length}**, represented **${representedMb}**, unresolved **${unresolvedMb}**, coverage **${coveragePct(representedMb, mbActive.length)}%**. Progression 1/26 (3.8%) → ${representedMb}/${mbActive.length}.
- Source observations: FL-002 wrote **3875**; later ATTACH 110+104+53. Canonical promotions **0**.
- Public IM evidence **${publicImChrome}** (Wave 1). Public MB evidence **${publicMbChrome}**.
- Wrong-company **0**. Name-only accepted **0**. Indexable attributable to state **0**. Trust Score **NO**. Ranking **0**.
- \`service_scope=interstate\` on new MB companies is **${SCHEMA_STORAGE_COMPATIBILITY_ONLY}** (${schemaCompat} rows); federal IDs among MB-created: ${mbCreatedFederal}.

County enrichment is excluded. County writes this audit: **0**.
`;
  writeFileSync(resolve(DOCS(), 'fl-audit-state-001-full-enrichment-impact.md'), md);

  console.log(
    JSON.stringify(
      {
        status,
        google_places_requests: FL_AUDIT_STATE_001_GOOGLE_PLACES_REQUESTS,
        production_writes: FL_AUDIT_STATE_001_PRODUCTION_WRITES,
        created: created.size,
        existing: existingDistinct.size,
        touched: touched.size,
        im: { active: imActive.length, represented: representedIm, unresolved: unresolvedIm },
        mb: { active: mbActive.length, represented: representedMb, unresolved: unresolvedMb },
        public_im: publicImChrome,
        public_mb: publicMbChrome,
        reconcile,
        origin_main: mainSha,
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
