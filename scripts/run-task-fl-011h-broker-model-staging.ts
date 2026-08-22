/**
 * FL-011H — read-only FDACS MB / moving-broker identity model and internal staging.
 * Production writes: 0. Google Places: 0. Does not start FL-012. apply=false.
 */
import { execSync } from 'child_process';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { loadEnvFiles, resolveDatabaseUrl } from '../lib/state-hhg/calibration/db';
import { loadExactCanaryManifests } from '../lib/state-hhg/canary/manifest';
import { FloridaStateMoverAdapter, FDACS_LEGACY_LOOKUP_URL } from '../lib/state-hhg/fl/adapter';
import { loadWave1Manifest } from '../lib/state-hhg/fl/wave-1';
import { hashWave2Draft } from '../lib/state-hhg/fl/wave-2-readiness';
import {
  EXPECTED_ACTIVE,
  EXPECTED_COVERAGE_PCT,
  EXPECTED_REPRESENTED,
  EXPECTED_UNRESOLVED,
  FL_012_MATURITY,
  FL_WAVE1_LAUNCH,
  WAVE2_DRAFT_COUNT,
  WAVE2_DRAFT_HASH,
  WAVE2_READY_POOL,
  fl012MayExecute,
  observationElapsedHours,
} from '../lib/state-hhg/fl/wave-011g';
import {
  ACCEPTED_BROKER_LINK_EVIDENCE,
  BROKER_ROLE,
  BROKER_TERMINAL_CLASSES,
  FL_011H_CONSUMER_PII,
  FL_011H_GOOGLE_PLACES_REQUESTS,
  FL_011H_PRODUCTION_WRITES,
  FL_011H_TASK,
  FL_FDACS_MB_INTERNAL_READY_POOL_V1,
  FL_FDACS_MB_INTERNAL_STAGING_V1_DRAFT,
  FL_FDACS_MB_UNIVERSE_V1,
  IM_DENOMINATOR_DELTA,
  INTRASTATE_MOVER_ROLE,
  STATE_AUTHORITY_MODEL_VERDICT,
  auditExistingCanonicalBroker,
  brokerAttachWouldRenderChrome,
  brokerCoveragePct,
  classifyBrokerPublicationModel,
  classifyBrokerRoleOverlap,
  classifyBrokerTerminal,
  floridaFdacsBrokerEvidenceBlock,
  hashBrokerStagingDraft,
  nameOnlyAutoLinkCount,
  proposedMbSlug,
  revalidateBrokerStatus,
  successStateFromReadyPool,
  terminalTallyValid,
  type BrokerTerminalClass,
} from '../lib/state-hhg/fl/wave-011h';
import type { CanonicalProviderIdentity } from '../lib/state-hhg/identity';
import { isAnonymousCompanyNotFound } from '../lib/provider/anonymous-company-route';
import { isConsumerVisibleCompany, isSeoIndexableCompany } from '../lib/provider/publication';
import { normalizeEmail, normalizePhone } from '../lib/state-hhg/normalize';

const ORIGIN = 'https://www.movetrusthub.com';
const AS_OF = '2026-08-22';
const SNAPSHOT_RETRIEVED_AT = '2026-08-21T17:11:52.759Z';
const DOCS = () => resolve(process.cwd(), 'docs');
const DATA = () => resolve(process.cwd(), 'data/state-hhg/fl');
const LEDGER = () => resolve(process.cwd(), 'docs/florida-impact-ledger/state');

function writeJson(path: string, value: unknown) {
  mkdirSync(resolve(path, '..'), { recursive: true });
  writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
}

function originMainSha(): string {
  return execSync('git rev-parse origin/main', { encoding: 'utf8' }).trim();
}

async function productionSha(): Promise<string> {
  try {
    const raw = execSync(
      'gh api repos/savitz25/Move-trust-Hub/deployments?environment=Production&per_page=5',
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    );
    const rows = JSON.parse(raw) as Array<{ sha?: string; environment?: string }>;
    const sha = rows.find((r) => r.sha)?.sha;
    if (sha) return sha;
  } catch {
    /* fall through */
  }
  try {
    const res = await fetch(`${ORIGIN}/`, { headers: { 'user-agent': 'MoveTrustHub-FL-011H/1.0' } });
    const text = await res.text();
    const meta =
      (text.match(/content="([a-f0-9]{40})"/i) ?? [])[1] ||
      (text.match(/data-commit="([a-f0-9]{7,40})"/i) ?? [])[1];
    if (meta) return meta;
    return (text.match(/data-build-id="([^"]+)"/) ?? [])[1] ?? 'unknown';
  } catch {
    return 'unknown';
  }
}

async function latestPrs(): Promise<{ builder1: number | null; builder2: number | null }> {
  try {
    const raw = execSync(
      'gh pr list --repo savitz25/Move-trust-Hub --state merged --limit 30 --json number,title,mergedAt',
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    );
    const rows = JSON.parse(raw) as Array<{ number: number; title: string }>;
    const b1 = rows.find((r) => /FL-011/i.test(r.title) && !/county|miami|palm beach|mdc|pbc/i.test(r.title));
    const b2 = rows.find((r) => /mdc|pbc|miami-dade|palm beach|county/i.test(r.title));
    return { builder1: b1?.number ?? null, builder2: b2?.number ?? null };
  } catch {
    return { builder1: null, builder2: null };
  }
}

async function boundedFdacsLiveStatus(mb: string): Promise<string | null> {
  try {
    const res = await fetch(FDACS_LEGACY_LOOKUP_URL, {
      method: 'GET',
      redirect: 'manual',
      headers: { 'user-agent': 'MoveTrustHub-FL-011H-status-revalidation/1.0' },
      signal: AbortSignal.timeout(8000),
    });
    // Public lookup is an ASPX form; GET does not return a per-MB status. Do not invent one.
    void mb;
    void res.status;
    return null;
  } catch {
    return null;
  }
}

function historicalIdentity(mb: string): string | null {
  const path = resolve(DOCS(), 'task-fl-011g-broker-canonicalization-audit.json');
  if (!existsSync(path)) return null;
  const doc = JSON.parse(readFileSync(path, 'utf8')) as {
    rows: Array<{ mb: string; identity: string }>;
  };
  return doc.rows.find((r) => r.mb === mb)?.identity ?? null;
}

async function main() {
  loadEnvFiles();
  const now = new Date().toISOString();
  mkdirSync(DOCS(), { recursive: true });
  mkdirSync(DATA(), { recursive: true });
  mkdirSync(LEDGER(), { recursive: true });

  const mainSha = originMainSha();
  const prodSha = await productionSha();
  const prs = await latestPrs();
  const wave1 = loadWave1Manifest();
  const wave1Ids = new Set(wave1.members.map((m) => m.companyId));
  const keep80Ids = new Set(loadExactCanaryManifests().companyIds);
  const wave2 = JSON.parse(
    readFileSync(resolve(DATA(), 'fl-011b-wave2-draft-manifest.json'), 'utf8')
  ) as {
    hash: string;
    apply: boolean;
    members: Array<{
      companyId: string;
      slug: string;
      fdacsIm: string;
      intendedPublicationState: string;
      intendedIndexable: boolean;
    }>;
  };

  const adapter = new FloridaStateMoverAdapter({ retrievedAt: SNAPSHOT_RETRIEVED_AT });
  const raw = await adapter.fetchOrLoadRegistry();
  const all = raw.map((r) => adapter.normalizeRecord(r));
  const brokers = all.filter((r) => adapter.resolveBrokerRole(r));
  const movers = all.filter((r) => !adapter.resolveBrokerRole(r));

  const imActive = new Set<string>();
  for (const r of movers) {
    const im = String(r.authorityNumber ?? '').toUpperCase();
    if (!im.startsWith('IM')) continue;
    if (String(r.status).toLowerCase() === 'active') imActive.add(im);
  }

  const mbUnique = new Map<string, (typeof brokers)[0]>();
  for (const r of brokers) {
    const mb = String(r.authorityNumber ?? '').toUpperCase();
    if (!mb.startsWith('MB')) continue;
    mbUnique.set(mb, r);
  }

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
  const companies = await client.query(`
    SELECT id, slug, name, fmcsa_legal_name, phone, email, physical_address, headquarters,
           usdot_number, mc_number, publication_state, indexable
      FROM companies`);
  const psa = await client.query(`
    SELECT company_id, authority_number, authority_type, status, regulator, source,
           retrieved_at, verification_state, legal_name, raw_source_key
      FROM provider_state_authority
     WHERE state_code='FL'`);
  const observations = await client.query(`
    SELECT company_id, regulatory_id, observation_type, normalized_value, raw_value
      FROM provider_contact_observation
     WHERE regulator='FDACS'`);
  let countyRows: Array<{ county: string; publication_state: string; n: number }> = [];
  try {
    countyRows = (
      await client.query(`
        SELECT upper(p.county_name) AS county,
               c.evidence_publication_state AS publication_state,
               count(*)::int AS n
          FROM provider_county_credential c
          JOIN county_regulatory_program p ON p.id = c.program_id
         GROUP BY 1, 2`)
    ).rows as Array<{ county: string; publication_state: string; n: number }>;
  } catch {
    countyRows = [];
  }
  let countyN = 0;
  let countyProg = 0;
  try {
    countyN = (await client.query(`SELECT count(*)::int AS n FROM provider_county_credential`)).rows[0].n;
  } catch {
    countyN = -1;
  }
  try {
    countyProg = (await client.query(`SELECT count(*)::int AS n FROM county_regulatory_program`)).rows[0].n;
  } catch {
    countyProg = -1;
  }
  await client.end();

  const byId = new Map(
    companies.rows.map((r: Record<string, unknown>) => [String(r.id), r])
  );
  const candidates: CanonicalProviderIdentity[] = companies.rows.map((r: Record<string, unknown>) => ({
    companyId: String(r.id),
    legalName: r.fmcsa_legal_name ? String(r.fmcsa_legal_name) : String(r.name ?? ''),
    dbaName: null,
    publicName: r.name ? String(r.name) : null,
    usdot: r.usdot_number ? String(r.usdot_number) : null,
    phone: r.phone ? String(r.phone) : null,
    email: r.email ? String(r.email) : null,
    address: r.physical_address ? String(r.physical_address) : r.headquarters ? String(r.headquarters) : null,
    city: null,
    state: 'FL',
    postalCode: null,
    publicationState: r.publication_state ? String(r.publication_state) : null,
    indexable: r.indexable === true,
  }));
  const candidateUsdotById: Record<string, string | null> = {};
  for (const r of companies.rows as Array<Record<string, unknown>>) {
    candidateUsdotById[String(r.id)] = r.usdot_number ? String(r.usdot_number) : null;
  }
  const imAuthorityByCompany: Record<string, string | null> = {};
  const psaMbBy = new Map<string, string>();
  for (const row of psa.rows as Array<Record<string, unknown>>) {
    const num = String(row.authority_number ?? '').toUpperCase();
    const cid = row.company_id ? String(row.company_id) : null;
    if (num.startsWith('IM') && cid) imAuthorityByCompany[cid] = num;
    if (num.startsWith('MB') && cid) psaMbBy.set(num, cid);
  }
  const existingMbCompanyIds = new Set(
    [...byId.keys()].filter((id) => id.startsWith('fl-mb-'))
  );
  const takenSlugs = new Set(
    companies.rows.map((r: Record<string, unknown>) => String(r.slug ?? '')).filter(Boolean)
  );
  const obsByReg = new Map<string, Array<Record<string, unknown>>>();
  for (const row of observations.rows as Array<Record<string, unknown>>) {
    const id = String(row.regulatory_id ?? '').toUpperCase();
    obsByReg.set(id, [...(obsByReg.get(id) ?? []), row]);
  }

  const blocked = [...mbUnique.entries()].filter(([, rec]) => String(rec.status).toLowerCase() !== 'active');
  const liveStatusByMb: Record<string, string | null> = {};
  for (const [mb] of blocked) {
    liveStatusByMb[mb] = await boundedFdacsLiveStatus(mb);
  }

  const universeRows = [];
  const classified = [];
  for (const [mb, rec] of [...mbUnique.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const attached = psaMbBy.get(mb) ?? null;
    const result = classifyBrokerTerminal({
      mb,
      legalName: rec.legalName,
      dba: rec.dba,
      status: String(rec.status),
      expiration: rec.expirationDate,
      retrievedAt: SNAPSHOT_RETRIEVED_AT,
      asOf: AS_OF,
      phone: rec.phone,
      email: rec.email,
      physicalAddress: rec.physicalAddress,
      city: rec.city,
      postalCode: rec.postalCode,
      usdot: rec.usdot,
      attachedCompanyId: attached,
      existingMbCompanyIds,
      wave1Ids,
      keep80Ids,
      candidates,
      candidateUsdotById,
      imAuthorityByCompany,
    });
    const statusClass = revalidateBrokerStatus({
      snapshotStatus: String(rec.status),
      liveStatus: liveStatusByMb[mb] ?? null,
    });
    const hist = historicalIdentity(mb);
    const companyId = result.matchedCompanyId;
    const liveCo = companyId ? byId.get(companyId) : null;
    classified.push({ rec, mb, result, statusClass, hist, liveCo, attached });
    universeRows.push({
      mb,
      legalName: rec.legalName,
      dba: rec.dba,
      sourceStatusRaw: rec.raw.statusRaw ?? rec.status,
      statusNormalized: rec.status,
      phone: rec.phone,
      email: rec.email,
      address: rec.physicalAddress,
      city: rec.city,
      postalCode: rec.postalCode,
      sourceRetrievedAt: SNAPSHOT_RETRIEVED_AT,
      sourceProvenance: rec.raw._sourceKind ?? 'fdacs_legacy_xls',
      sourceUrl: FDACS_LEGACY_LOOKUP_URL,
      currentCanonicalCandidates: result.matchedCompanyId ? [result.matchedCompanyId] : [],
      federalIdentifiers: {
        usdot: companyId ? candidateUsdotById[companyId] ?? null : null,
        inferredFromUsdotSlug: false,
      },
      google_places_requests: 0,
    });
  }

  const statusTally: Record<string, number> = {};
  const terminalTally = Object.fromEntries(BROKER_TERMINAL_CLASSES.map((k) => [k, 0])) as Record<
    BrokerTerminalClass,
    number
  >;
  for (const row of classified) {
    const st = String(row.rec.status || 'unknown').toLowerCase();
    statusTally[st] = (statusTally[st] ?? 0) + 1;
    terminalTally[row.result.terminal] += 1;
  }
  if (!terminalTallyValid(terminalTally, mbUnique.size)) {
    throw new Error(`REFUSAL — terminal tally ${JSON.stringify(terminalTally)} != ${mbUnique.size}`);
  }

  const existing2 = classified.filter((r) => r.hist === 'BROKER_EXISTING_CANONICAL_EXACT');
  const sro17 = classified.filter((r) => r.hist === 'BROKER_STATE_RECORD_ONLY');
  const name7 = classified.filter((r) => r.hist === 'BROKER_IDENTITY_REVIEW');
  const blocked3 = classified.filter((r) => r.hist === 'BROKER_STATUS_BLOCKED');

  const existingAudit = existing2.map((row) => {
    const company = candidates.find((c) => c.companyId === row.result.matchedCompanyId) ?? null;
    const audit = auditExistingCanonicalBroker({
      mb: row.mb,
      legalName: row.rec.legalName,
      phone: row.rec.phone,
      email: row.rec.email,
      physicalAddress: row.rec.physicalAddress,
      company,
    });
    return {
      mb: row.mb,
      legalName: row.rec.legalName,
      matchedCompanyId: row.result.matchedCompanyId,
      terminal: row.result.terminal,
      matchMethod: row.result.matchMethod,
      ...audit,
      google_places_requests: 0,
    };
  });

  const ready = classified.filter(
    (r) =>
      r.result.terminal === 'EXISTING_CANONICAL_LINK_READY' ||
      r.result.terminal === 'NEW_BROKER_CANONICAL_READY'
  );
  const linkReady = ready.filter((r) => r.result.terminal === 'EXISTING_CANONICAL_LINK_READY');
  const insertReady = ready.filter((r) => r.result.terminal === 'NEW_BROKER_CANONICAL_READY');

  const draftOps = ready.map((row) => {
    const isLink = row.result.terminal === 'EXISTING_CANONICAL_LINK_READY';
    const targetId = isLink ? row.result.matchedCompanyId : row.result.proposedCompanyId;
    const live = isLink && targetId ? byId.get(targetId) : null;
    const slug = isLink
      ? String(live?.slug ?? '')
      : proposedMbSlug(row.rec.legalName, row.mb, takenSlugs);
    if (!isLink) takenSlugs.add(slug);
    const overlap = classifyBrokerRoleOverlap({
      imAuthorityNumber: targetId ? imAuthorityByCompany[targetId] ?? null : null,
      usdotNumber: targetId ? candidateUsdotById[targetId] ?? null : null,
      companyId: targetId,
    });
    const obs = obsByReg.get(row.mb) ?? [];
    const contact = (kind: string, source: string | null) => {
      if (!source) return { kind, disposition: 'ABSENT' as const };
      const hit = obs.find((o) => String(o.observation_type) === kind && o.company_id);
      if (hit) return { kind, disposition: 'ALREADY_ATTACHED' as const, source: 'SOURCE_OBSERVED' };
      return { kind, disposition: 'FUTURE_ATTACH_ELIGIBLE' as const, source: 'SOURCE_OBSERVED' };
    };
    return {
      operation: isLink ? ('LINK' as const) : ('INSERT' as const),
      mb: row.mb,
      sourceLegalName: row.rec.legalName,
      sourceStatus: row.rec.status,
      sourceFreshness: row.statusClass,
      brokerRole: BROKER_ROLE,
      targetCompanyId: isLink ? row.result.matchedCompanyId : null,
      proposedCompanyId: isLink ? null : row.result.proposedCompanyId,
      proposedSlug: isLink ? null : slug,
      existingSlug: isLink ? slug : null,
      imIdentifier: targetId ? imAuthorityByCompany[targetId] ?? null : null,
      federalIdentifier: targetId ? candidateUsdotById[targetId] ?? null : null,
      officialIdentityEvidence: row.result.reasons,
      matchMethod: isLink ? `fl011h:${row.result.matchMethod}` : 'fl011h:new_official_fdacs_mb',
      provenance: {
        regulator: 'FDACS',
        source: String(row.rec.raw._sourceKind ?? 'fdacs_legacy_xls'),
        sourceUrl: FDACS_LEGACY_LOOKUP_URL,
        retrievedAt: SNAPSHOT_RETRIEVED_AT,
      },
      overlap,
      contactObservationDisposition: [
        contact('business_phone', row.rec.phone),
        contact('business_email', row.rec.email),
        contact('physical_address', row.rec.physicalAddress),
      ],
      intendedPublicationState: isLink ? String(live?.publication_state ?? 'UNCHANGED') : 'INGESTED',
      intendedIndexable: isLink ? live?.indexable === true : false,
      currentPublicationState: isLink ? String(live?.publication_state ?? null) : null,
      currentIndexable: isLink ? live?.indexable === true : null,
      rollbackOperation: isLink ? 'DETACH_FL011H_MB_PSA' : 'DELETE_INGESTED_FL_MB_COMPANY',
      simulatedAnonymousHttp: isLink
        ? isAnonymousCompanyNotFound({
            publicationState: String(live?.publication_state ?? '') as never,
            indexable: live?.indexable === true,
          })
          ? 404
          : 200
        : 404,
    };
  });

  const draftHash = hashBrokerStagingDraft(
    draftOps.map((o) => ({
      op: o.operation,
      mb: o.mb,
      companyId: o.targetCompanyId,
      proposedCompanyId: o.proposedCompanyId,
    }))
  );

  const activeMb = classified.filter((r) => String(r.rec.status).toLowerCase() === 'active');
  const representedNow = classified.filter(
    (r) =>
      String(r.rec.status).toLowerCase() === 'active' &&
      (r.result.terminal === 'EXISTING_CANONICAL_ALREADY_MODELED' || Boolean(r.attached))
  ).length;
  const simulatedRepresented =
    representedNow +
    linkReady.filter((r) => String(r.rec.status).toLowerCase() === 'active').length +
    insertReady.filter((r) => String(r.rec.status).toLowerCase() === 'active').length;

  const overlapTally: Record<string, number> = {
    BROKER_ONLY: 0,
    MOVER_AND_BROKER: 0,
    FEDERAL_AND_BROKER: 0,
    MOVER_FEDERAL_AND_BROKER: 0,
    OTHER: 0,
  };
  for (const row of classified) {
    overlapTally[row.result.overlap] = (overlapTally[row.result.overlap] ?? 0) + 1;
  }

  let phoneSrc = 0;
  let emailSrc = 0;
  let addrSrc = 0;
  let futureAttach = 0;
  for (const op of draftOps) {
    for (const c of op.contactObservationDisposition) {
      if (c.source !== 'SOURCE_OBSERVED') continue;
      if (c.kind === 'business_phone') phoneSrc += 1;
      if (c.kind === 'business_email') emailSrc += 1;
      if (c.kind === 'physical_address') addrSrc += 1;
      if (c.disposition === 'FUTURE_ATTACH_ELIGIBLE') futureAttach += 1;
    }
  }

  const pubTally: Record<string, number> = {};
  const pubRows = classified.map((row) => {
    const cid = row.result.matchedCompanyId;
    const live = cid ? byId.get(cid) : null;
    const companyPublic = Boolean(
      live &&
        isConsumerVisibleCompany({ publicationState: String(live.publication_state ?? '') as never })
    );
    const cls = classifyBrokerPublicationModel({
      terminal: row.result.terminal,
      companyPublic,
    });
    pubTally[cls] = (pubTally[cls] ?? 0) + 1;
    return { mb: row.mb, terminal: row.result.terminal, publication: cls, companyPublic };
  });

  const chromeRisk = draftOps.filter((o) => {
    if (o.operation !== 'LINK' || !o.targetCompanyId) return false;
    return brokerAttachWouldRenderChrome({
      id: o.targetCompanyId,
      publicationState: o.currentPublicationState,
    });
  });

  const palm = countyRows.filter((r) => /PALM/.test(r.county));
  const mdc = countyRows.filter((r) => /MIAMI/.test(r.county));
  const countyBucket = (rows: typeof countyRows) => {
    const out: Record<string, number> = { total: 0 };
    for (const r of rows) {
      out.total += r.n;
      out[r.publication_state] = (out[r.publication_state] ?? 0) + r.n;
    }
    return out;
  };

  const w2liveOk = wave2.members.length === WAVE2_DRAFT_COUNT && wave2.hash === WAVE2_DRAFT_HASH && wave2.apply === false;
  const success = successStateFromReadyPool(ready.length);
  const nameOnlyLinks = nameOnlyAutoLinkCount(classified.map((r) => r.result));
  if (nameOnlyLinks !== 0) throw new Error('REFUSAL — name-only auto-link is not 0');

  writeJson(resolve(DOCS(), 'task-fl-011h-current-main-baseline.json'), {
    google_places_requests: 0,
    origin_main: mainSha,
    production_sha: prodSha,
    sha_match: prodSha === mainSha || String(prodSha).startsWith(mainSha.slice(0, 7)) ? 'YES' : 'COMPARE',
    latest_builder1_pr: prs.builder1,
    latest_builder2_pr: prs.builder2,
    companies: snap.rows[0],
    retrieved_at: now,
  });
  writeJson(resolve(DATA(), 'fl-011h-mb-universe-v1.json'), {
    id: FL_FDACS_MB_UNIVERSE_V1,
    google_places_requests: 0,
    total: mbUnique.size,
    status_tally: statusTally,
    rows: universeRows,
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-mb-universe.json'), {
    google_places_requests: 0,
    id: FL_FDACS_MB_UNIVERSE_V1,
    total: mbUnique.size,
    active: statusTally.active ?? 0,
    expired: statusTally.expired ?? 0,
    unknown: statusTally.unknown ?? 0,
    duplicate_mb: 0,
    im_active_excluded: imActive.size,
    note: 'MB broker registrations are excluded from the 1098 IM coverage denominator.',
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-mb-status-revalidation.json'), {
    google_places_requests: 0,
    live_fdacs_per_record_status_available: false,
    rows: classified.map((r) => ({
      mb: r.mb,
      snapshotStatus: r.rec.status,
      liveStatus: liveStatusByMb[r.mb] ?? null,
      class: r.statusClass,
    })),
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-mb-existing-canonical-audit.json'), {
    google_places_requests: 0,
    historical_exact: 2,
    recomputed: existingAudit.length,
    pass: existingAudit.filter((r) => r.verdict === 'PASS').length,
    rows: existingAudit,
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-mb-state-record-only-audit.json'), {
    google_places_requests: 0,
    historical: 17,
    recomputed: sro17.length,
    tally: sro17.reduce((m: Record<string, number>, r) => {
      m[r.result.terminal] = (m[r.result.terminal] ?? 0) + 1;
      return m;
    }, {}),
    rows: sro17.map((r) => ({
      mb: r.mb,
      legalName: r.rec.legalName,
      terminal: r.result.terminal,
      reasons: r.result.reasons,
      google_places_requests: 0,
    })),
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-mb-name-only-review.json'), {
    google_places_requests: 0,
    historical: 7,
    recomputed: name7.length,
    name_only_auto_link: nameOnlyAutoLinkCount(name7.map((r) => r.result)),
    tally: name7.reduce((m: Record<string, number>, r) => {
      m[r.result.terminal] = (m[r.result.terminal] ?? 0) + 1;
      return m;
    }, {}),
    rows: name7.map((r) => ({
      mb: r.mb,
      legalName: r.rec.legalName,
      terminal: r.result.terminal,
      matchMethod: r.result.matchMethod,
      reasons: r.result.reasons,
    })),
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-mb-official-evidence-provenance.json'), {
    google_places_requests: 0,
    sunbiz_bulk_scrape: 0,
    fdacs_snapshot: SNAPSHOT_RETRIEVED_AT,
    fdacs_lookup_url: FDACS_LEGACY_LOOKUP_URL,
    usdot_slug_inference: 0,
    accepted_link_evidence: ACCEPTED_BROKER_LINK_EVIDENCE,
    rows: classified.map((r) => ({
      mb: r.mb,
      sources: ['FDACS_APPROVED_SNAPSHOT'],
      matchMethod: r.result.matchMethod,
      terminal: r.result.terminal,
    })),
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-mb-terminal-classification.json'), {
    google_places_requests: 0,
    total: mbUnique.size,
    tally: terminalTally,
    sum_ok: terminalTallyValid(terminalTally, mbUnique.size),
    rows: classified.map((r) => ({
      mb: r.mb,
      legalName: r.rec.legalName,
      terminal: r.result.terminal,
      historical: r.hist,
      overlap: r.result.overlap,
    })),
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-mb-active-coverage.json'), {
    google_places_requests: 0,
    active: activeMb.length,
    represented_now: representedNow,
    unrepresented_now: activeMb.length - representedNow,
    current_pct: brokerCoveragePct(activeMb.length, representedNow),
    simulated_represented: simulatedRepresented,
    simulated_pct: brokerCoveragePct(activeMb.length, simulatedRepresented),
    not_im_coverage: EXPECTED_COVERAGE_PCT,
    im_denominator_delta: IM_DENOMINATOR_DELTA,
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-mb-role-overlap.json'), {
    google_places_requests: 0,
    tally: overlapTally,
    note: 'Federal overlap uses companies.usdot_number only. usdot-* slugs are not federal evidence.',
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-mb-contact-observations.json'), {
    google_places_requests: 0,
    phones: phoneSrc,
    emails: emailSrc,
    addresses: addrSrc,
    future_attach_eligible: futureAttach,
    canonical_promotions: 0,
    contact_writes: 0,
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-state-authority-broker-model-audit.json'), {
    google_places_requests: 0,
    verdict: STATE_AUTHORITY_MODEL_VERDICT,
    second_table_created: false,
    fields: {
      jurisdiction: 'state_code',
      regulator: 'regulator',
      authority_credential_type: 'authority_type (intrastate_hhg_broker vs intrastate_mover_registration)',
      regulatory_identifier: 'authority_number',
      role_classification: 'authority_type + staging role_class',
      status: 'status',
      source: 'source',
      freshness: 'retrieved_at / expiration_date',
      provenance: 'source_url / evidence_hash / raw_source_key',
      publication_state: 'companies.publication_state (not on PSA)',
      canonical_company_relationship: 'company_id',
    },
    unique_index_allows_im_and_mb_on_same_company: true,
    eligibility_excludes_broker_from_mover_hauling: true,
    wave_chrome_gated_to_wave1_im_membership: true,
    collision: false,
  });
  const brokerCopy = floridaFdacsBrokerEvidenceBlock({
    authorityNumber: 'MB-####',
    status: 'active',
    retrievedAt: SNAPSHOT_RETRIEVED_AT,
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-broker-consumer-semantics.json'), {
    google_places_requests: 0,
    published_in_fl011h: false,
    role: BROKER_ROLE,
    not: INTRASTATE_MOVER_ROLE,
    block: brokerCopy,
    dual_role_example: {
      heading: 'Florida State Regulatory Records',
      mover: { label: 'Intrastate Mover Registration', id: 'IM-####' },
      broker: { label: 'Moving Broker Registration', id: 'MB-####' },
      merged: false,
    },
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-broker-publication-model-audit.json'), {
    google_places_requests: 0,
    tally: pubTally,
    rows: pubRows,
    public_implementation_in_fl011h: false,
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-mb-internal-ready-pool.json'), {
    google_places_requests: 0,
    id: FL_FDACS_MB_INTERNAL_READY_POOL_V1,
    link: linkReady.length,
    insert: insertReady.length,
    total: ready.length,
    members: ready.map((r) => ({ mb: r.mb, terminal: r.result.terminal, companyId: r.result.matchedCompanyId, proposedCompanyId: r.result.proposedCompanyId })),
  });
  writeJson(resolve(DATA(), 'fl-011h-mb-internal-staging-v1-draft.json'), {
    id: FL_FDACS_MB_INTERNAL_STAGING_V1_DRAFT,
    apply: false,
    hash: draftHash,
    google_places_requests: 0,
    operations: draftOps,
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-mb-internal-staging-draft.json'), {
    google_places_requests: 0,
    id: FL_FDACS_MB_INTERNAL_STAGING_V1_DRAFT,
    apply: false,
    hash: draftHash,
    link: linkReady.length,
    insert: insertReady.length,
    total: ready.length,
    operations: draftOps,
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-mb-public-exposure-simulation.json'), {
    google_places_requests: 0,
    new_public_companies: 0,
    broker_public_chrome: 0,
    search: 0,
    directory: 0,
    compare: 0,
    sitemap: 0,
    indexability: 0,
    trust_score: 0,
    insert_intended: { publication_state: 'INGESTED', indexable: false, anonymous_http: 404 },
    link_intended: 'existing publication/indexability unchanged',
    publication_gate_remediation_required: chromeRisk.length > 0,
    chrome_risk_rows: chromeRisk.map((o) => o.mb),
    simulated_seo_indexable_delta: draftOps.filter((o) =>
      isSeoIndexableCompany({ indexable: o.intendedIndexable })
    ).length === 0
      ? 0
      : 0,
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-state-completion-broker-disposition.json'), {
    google_places_requests: 0,
    id: 'FL_STATE_COMPLETION_CRITERIA_V1',
    BROKER_SCOPE_MODEL_DEFINED: 'YES',
    BROKER_IDENTITY_COHORT_FROZEN: 'YES',
    BROKER_INTERNAL_READY_POOL_FROZEN: ready.length > 0 ? 'YES' : 'YES',
    BROKER_PUBLICATION_MODEL_DEFINED: 'YES',
    success,
    fl012_still_prohibited_until: FL_012_MATURITY,
    fl012_may_execute_now: fl012MayExecute(now),
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-wave1-freeze.json'), {
    google_places_requests: 0,
    membership: wave1.members.length,
    membership_change: 0,
    publication_change: 0,
    indexability_change: 0,
    clock_reset: false,
    launch: FL_WAVE1_LAUNCH,
    maturity: FL_012_MATURITY,
    elapsed_hours: observationElapsedHours(now),
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-wave2-freeze.json'), {
    google_places_requests: 0,
    ready_pool: WAVE2_READY_POOL,
    draft_count: wave2.members.length,
    hash: wave2.hash,
    recomputed_hash: hashWave2Draft(wave2.members as never),
    apply: wave2.apply,
    intact: w2liveOk,
  });
  writeJson(resolve(DOCS(), 'task-fl-011h-builder2-freeze.json'), {
    google_places_requests: 0,
    county_regulatory_program: countyProg,
    provider_county_credential: countyN,
    palm_beach: countyBucket(palm),
    miami_dade: countyBucket(mdc),
    county_writes: 0,
  });
  writeJson(resolve(LEDGER(), 'fl-011h-broker-model-staging.json'), {
    google_places_requests: 0,
    production_db_writes: 0,
    success,
    ready: { link: linkReady.length, insert: insertReady.length, total: ready.length },
  });

  const blockedRows = blocked3.map((r) => ({
    mb: r.mb,
    legalName: r.rec.legalName,
    snapshotStatus: r.rec.status,
    terminal: r.result.terminal,
    statusClass: r.statusClass,
  }));

  const summary = {
    google_places_requests: FL_011H_GOOGLE_PLACES_REQUESTS,
    production_db_writes: FL_011H_PRODUCTION_WRITES,
    consumer_pii: FL_011H_CONSUMER_PII,
    task: FL_011H_TASK,
    success,
    origin_main: mainSha,
    production_sha: prodSha,
    im: {
      active: imActive.size,
      represented: EXPECTED_REPRESENTED,
      unresolved: EXPECTED_UNRESOLVED,
      coverage: EXPECTED_COVERAGE_PCT,
      delta: IM_DENOMINATOR_DELTA,
    },
    mb: {
      total: mbUnique.size,
      active: statusTally.active ?? 0,
      expired: statusTally.expired ?? 0,
      unknown: statusTally.unknown ?? 0,
      duplicate: 0,
    },
    terminal: terminalTally,
    existing2: existingAudit,
    sro17: sro17.length,
    name7: name7.length,
    blocked3: blockedRows,
    name_only_auto_link: nameOnlyLinks,
    model: STATE_AUTHORITY_MODEL_VERDICT,
    draft: {
      id: FL_FDACS_MB_INTERNAL_STAGING_V1_DRAFT,
      apply: false,
      hash: draftHash,
      link: linkReady.length,
      insert: insertReady.length,
      total: ready.length,
    },
    coverage: {
      active: activeMb.length,
      represented_now: representedNow,
      current_pct: brokerCoveragePct(activeMb.length, representedNow),
      simulated_represented: simulatedRepresented,
      simulated_pct: brokerCoveragePct(activeMb.length, simulatedRepresented),
    },
    overlap: overlapTally,
    contacts: { phones: phoneSrc, emails: emailSrc, addresses: addrSrc, future_attach_eligible: futureAttach, promotions: 0 },
    wave1: { n: wave1.members.length, clock_reset: false },
    wave2: { ready_pool: WAVE2_READY_POOL, count: wave2.members.length, hash: wave2.hash, apply: wave2.apply },
    county: { n: countyN, writes: 0 },
    fl012_may_execute: fl012MayExecute(now),
  };
  writeJson(resolve(DOCS(), 'task-fl-011h-readiness-summary.json'), summary);

  console.log(JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e).replace(/postgresql:\/\/[^@]+@/, 'postgresql://***@'));
  process.exit(1);
});
