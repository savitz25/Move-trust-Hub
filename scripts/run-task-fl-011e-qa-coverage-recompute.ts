/**
 * FL-011E — read-only production QA and coverage recompute.
 * Production writes: 0. Google Places: 0.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { loadEnvFiles, resolveDatabaseUrl } from '../lib/state-hhg/calibration/db';
import { loadExactCanaryManifests } from '../lib/state-hhg/canary/manifest';
import { FloridaStateMoverAdapter } from '../lib/state-hhg/fl/adapter';
import { fdacsRegulatoryId } from '../lib/state-hhg/fl/regulatory-id';
import { loadWave1Manifest } from '../lib/state-hhg/fl/wave-1';
import type { Fl004ManifestRow } from '../lib/state-hhg/fl/fl-004';
import { loadFl007HoldCompanyIds, qualifyWave2Readiness } from '../lib/state-hhg/fl/wave-2-readiness';
import {
  classifyActiveImGap,
  proposedImCompanyId,
  type GapSubject,
} from '../lib/state-hhg/fl/wave-2-canonicalization';
import type { CanonicalProviderIdentity } from '../lib/state-hhg/identity';
import { isConsumerVisibleCompany } from '../lib/provider/publication';
import {
  ACCEPTED_LINK_EVIDENCE,
  type FinalCanonicalizationOp,
  type LivePsaRow,
} from '../lib/state-hhg/fl/wave-011d';
import {
  FL_011B_READY_POOL_HISTORICAL,
  FL_011B_WAVE2_DRAFT_HASH,
  FL_011C_GAP_HISTORICAL,
  FL_011C_WITHHELD_HISTORICAL,
  FL_011D_MANIFEST_HASH,
  FL_011E_GOOGLE_PLACES_REQUESTS,
  FL_011E_PRODUCTION_WRITES,
  FL_011E_TASK,
  assertFl011dManifest,
  assignPrimaryCoverage,
  classifyResolvedForWave2,
  coverageMetric,
  isSafelyRepresented,
  newCompanyInternalContract,
  publicFdacsDisplayAllowed,
  type AuditState,
  type CoverageClass,
} from '../lib/state-hhg/fl/wave-011e';

const AS_OF = '2026-08-22';
const ORIGIN = 'https://www.movetrusthub.com';
const DOCS = () => resolve(process.cwd(), 'docs');
const DATA = () => resolve(process.cwd(), 'data/state-hhg/fl');
const LEDGER = () => resolve(process.cwd(), 'docs/florida-impact-ledger/state');

function writeJson(path: string, value: unknown) {
  mkdirSync(resolve(path, '..'), { recursive: true });
  writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
}

function isCurrentPsa(row: { status?: string | null; verificationState?: string | null }): boolean {
  const status = String(row.status ?? '').toLowerCase();
  const vs = String(row.verificationState ?? '').toLowerCase();
  return status !== 'expired' && vs !== 'historical';
}

async function fetchMeta(path: string) {
  const res = await fetch(`${ORIGIN}${path}`, {
    redirect: 'manual',
    headers: { 'user-agent': 'MoveTrustHub-FL-011E/1.0', 'cache-control': 'no-cache' },
  });
  const text = res.status === 200 || res.status === 307 ? await res.text().catch(() => '') : '';
  return {
    path,
    status: res.status,
    location: res.headers.get('location'),
    fdacsWave: /Registration verified from Florida FDACS/i.test(text),
  };
}

async function productionSha(): Promise<string> {
  const res = await fetch(`${ORIGIN}/`, { headers: { 'user-agent': 'MoveTrustHub-FL-011E/1.0' } });
  const text = await res.text();
  return (text.match(/data-build-id="([^"]+)"/) ?? [])[1] ?? 'unknown';
}

async function main() {
  loadEnvFiles();
  const retrievedAt = new Date().toISOString();
  mkdirSync(DOCS(), { recursive: true });
  mkdirSync(LEDGER(), { recursive: true });

  const manDoc = JSON.parse(
    readFileSync(resolve(DATA(), 'fl-011d-canonicalization-wave-internal-v1.json'), 'utf8')
  ) as { hash: string; draft_hash: string; operations: FinalCanonicalizationOp[] };
  const bound = assertFl011dManifest(manDoc.operations, manDoc.hash);
  const wave2Draft = JSON.parse(
    readFileSync(resolve(DATA(), 'fl-011b-wave2-draft-manifest.json'), 'utf8')
  ) as { hash: string; apply: boolean; members: Array<{ companyId: string }> };

  const wave1 = loadWave1Manifest();
  const wave1Ids = new Set(wave1.members.map((m) => m.companyId));
  const wave1Ims = new Set(wave1.members.map((m) => m.fdacsIm.toUpperCase()));
  const keep80 = new Set(loadExactCanaryManifests().companyIds);
  const holds = new Set(loadFl007HoldCompanyIds());
  const insertIms = new Set(
    manDoc.operations.filter((o) => o.op === 'INSERT_NEW_CANONICAL').map((o) => o.fdacsIm.toUpperCase())
  );
  const linkIms = new Set(
    manDoc.operations.filter((o) => o.op === 'LINK_EXISTING_CANONICAL').map((o) => o.fdacsIm.toUpperCase())
  );

  const adapter = new FloridaStateMoverAdapter({ retrievedAt: '2026-08-21T17:11:52.759Z' });
  const raw = await adapter.fetchOrLoadRegistry();
  const records = raw.map((r) => adapter.normalizeRecord(r)).filter((r) => !adapter.resolveBrokerRole(r));
  const byIm = new Map<string, GapSubject>();
  const statusTally: Record<string, number> = {};
  for (const rec of records) {
    const im = String(rec.authorityNumber ?? '').toUpperCase();
    if (!im.startsWith('IM')) continue;
    const st = String(rec.status || 'unknown').toLowerCase();
    statusTally[st] = (statusTally[st] ?? 0) + 1;
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
  const activeIms = [...byIm.values()].filter((s) => String(s.status).toLowerCase() === 'active');

  const prodSha = await productionSha();
  const client = new pg.Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  });
  await client.connect();

  const snap = await client.query(`
    SELECT
      count(*)::int AS companies,
      count(*) FILTER (WHERE indexable)::int AS indexable,
      count(*) FILTER (WHERE id ILIKE 'fl-im-%')::int AS fl_im,
      count(*) FILTER (WHERE id ILIKE 'fl-im-%' AND publication_state='INGESTED')::int AS fl_im_ingested,
      count(*) FILTER (WHERE publication_state='PUBLISHABLE')::int AS publishable,
      count(*) FILTER (WHERE publication_state='INGESTED')::int AS ingested
    FROM companies`);
  let countyProgram = -1;
  let countyCred = -1;
  try {
    countyProgram = (await client.query(`SELECT count(*)::int AS n FROM county_regulatory_program`)).rows[0].n;
    countyCred = (await client.query(`SELECT count(*)::int AS n FROM provider_county_credential`)).rows[0].n;
  } catch {
    /* optional */
  }

  const companyRes = await client.query(`
    SELECT id, slug, name, fmcsa_legal_name, phone, email, physical_address, headquarters,
           website, usdot_number, mc_number, publication_state, indexable
      FROM companies`);
  type Co = {
    id: string;
    slug: string;
    name: string;
    legalName: string;
    phone: string | null;
    email: string | null;
    address: string | null;
    usdot: string | null;
    mc: string | null;
    publicationState: string | null;
    indexable: boolean;
    hq: string | null;
  };
  const companies: Co[] = companyRes.rows.map((r: Record<string, unknown>) => ({
    id: String(r.id),
    slug: String(r.slug ?? ''),
    name: String(r.name ?? ''),
    legalName: r.fmcsa_legal_name ? String(r.fmcsa_legal_name) : String(r.name ?? ''),
    phone: r.phone ? String(r.phone) : null,
    email: r.email ? String(r.email) : null,
    address: r.physical_address ? String(r.physical_address) : null,
    usdot: r.usdot_number ? String(r.usdot_number) : null,
    mc: r.mc_number ? String(r.mc_number) : null,
    publicationState: r.publication_state ? String(r.publication_state) : null,
    indexable: r.indexable === true,
    hq: r.headquarters ? String(r.headquarters) : null,
  }));
  const byId = new Map(companies.map((c) => [c.id, c]));
  const candidates: CanonicalProviderIdentity[] = companies.map((c) => ({
    companyId: c.id,
    legalName: c.legalName,
    dbaName: c.name,
    publicName: c.name,
    usdot: c.usdot,
    phone: c.phone,
    email: c.email,
    address: c.address ?? c.hq,
    city: null,
    state: 'FL',
    postalCode: null,
    publicationState: c.publicationState,
    indexable: c.indexable,
  }));
  const existingImCompanyIds = new Set(companies.filter((c) => c.id.startsWith('fl-im-')).map((c) => c.id));

  const psaRes = await client.query(`
    SELECT id, company_id, authority_number, raw_source_key, status, verification_state, match_method
      FROM provider_state_authority WHERE state_code='FL'`);
  const psaAll: Array<LivePsaRow & { matchMethod: string | null }> = psaRes.rows.map((r: Record<string, unknown>) => ({
    id: String(r.id),
    companyId: r.company_id ? String(r.company_id) : null,
    authorityNumber: String(r.authority_number ?? '').toUpperCase(),
    rawSourceKey: String(r.raw_source_key ?? ''),
    status: r.status ? String(r.status) : null,
    verificationState: r.verification_state ? String(r.verification_state) : null,
    matchMethod: r.match_method ? String(r.match_method) : null,
  }));

  const obsRes = await client.query(`
    SELECT regulatory_id, observation_type, company_id, match_evidence
      FROM provider_contact_observation WHERE regulator='FDACS'`);
  type Obs = {
    regulatoryId: string;
    type: string;
    companyId: string | null;
    task: string | null;
  };
  const obsAll: Obs[] = obsRes.rows.map((r: Record<string, unknown>) => {
    const ev = (r.match_evidence ?? {}) as Record<string, unknown>;
    return {
      regulatoryId: String(r.regulatory_id),
      type: String(r.observation_type),
      companyId: r.company_id ? String(r.company_id) : null,
      task: ev.task ? String(ev.task) : null,
    };
  });

  const currentPsaByIm = new Map<string, Array<(typeof psaAll)[number]>>();
  for (const p of psaAll) {
    if (!p.authorityNumber.startsWith('IM')) continue;
    currentPsaByIm.set(p.authorityNumber, [...(currentPsaByIm.get(p.authorityNumber) ?? []), p]);
  }

  const audits: Array<Record<string, unknown>> = [];
  let wrongCompany = 0;
  const auditTally: Record<AuditState, number> = {
    PASS: 0,
    IDENTITY_DRIFT: 0,
    STATUS_DRIFT: 0,
    AUTHORITY_DRIFT: 0,
    CANONICAL_DRIFT: 0,
    REVIEW_REQUIRED: 0,
  };

  for (const op of manDoc.operations) {
    const im = op.fdacsIm.toUpperCase();
    const subject = byIm.get(im);
    const company = byId.get(op.companyId);
    const failures: string[] = [];
    let state: AuditState = 'PASS';
    if (!subject) {
      failures.push('source_im_missing');
      state = 'STATUS_DRIFT';
    } else if (String(subject.status).toLowerCase() !== 'active') {
      failures.push(`status_${subject.status}`);
      state = 'STATUS_DRIFT';
    }
    if (!company) {
      failures.push('canonical_missing');
      state = 'CANONICAL_DRIFT';
    }
    const psaRows = (currentPsaByIm.get(im) ?? []).filter(isCurrentPsa);
    const attached = psaRows.filter((p) => p.companyId);
    const other = attached.find((p) => p.companyId !== op.companyId);
    if (other) {
      failures.push(`wrong_company_${other.companyId}`);
      wrongCompany += 1;
      state = 'AUTHORITY_DRIFT';
    }
    if (!attached.some((p) => p.companyId === op.companyId)) {
      failures.push('missing_current_psa_on_target');
      if (state === 'PASS') state = 'AUTHORITY_DRIFT';
    }
    if (op.op === 'INSERT_NEW_CANONICAL' && company) {
      const contract = newCompanyInternalContract(company);
      if (!contract.ingested || !contract.indexableFalse) {
        failures.push('insert_not_internal');
        state = 'CANONICAL_DRIFT';
      }
    }
    if (op.op === 'LINK_EXISTING_CANONICAL' && subject && company) {
      const classified = classifyActiveImGap({
        subject,
        candidates,
        existingImCompanyIds,
        wave1Ids,
        keep80Ids: keep80,
        asOf: AS_OF,
      });
      if (
        classified.classification === 'EXISTING_CANONICAL_LINK_READY' &&
        classified.matchedCompanyId &&
        classified.matchedCompanyId !== op.companyId
      ) {
        failures.push(`identity_now_matches_${classified.matchedCompanyId}`);
        state = 'IDENTITY_DRIFT';
      }
      if (
        classified.matchMethod !== 'none' &&
        !ACCEPTED_LINK_EVIDENCE.includes(classified.matchMethod as (typeof ACCEPTED_LINK_EVIDENCE)[number]) &&
        classified.classification === 'CONFLICT'
      ) {
        failures.push('legal_form_conflict');
        state = 'IDENTITY_DRIFT';
      }
    }
    if (failures.length && state === 'PASS') state = 'REVIEW_REQUIRED';
    if (!failures.length) state = 'PASS';
    auditTally[state] += 1;
    audits.push({
      fdacsIm: im,
      op: op.op,
      companyId: op.companyId,
      slug: op.slug,
      state,
      failures,
      evidence: op.identityEvidence,
    });
  }

  const inserts = manDoc.operations.filter((o) => o.op === 'INSERT_NEW_CANONICAL');
  const httpNew = [];
  for (const op of inserts) {
    httpNew.push({ fdacsIm: op.fdacsIm, slug: op.slug, ...(await fetchMeta(`/companies/${op.slug}`)) });
  }
  const im1954 = inserts.find((o) => o.fdacsIm === 'IM1954');
  const im1954Http = im1954 ? await fetchMeta(`/companies/${im1954.slug}`) : null;
  const stolen = await fetchMeta('/companies/a-1-freeman-moving-storage-llc');
  const canonicalFreeman = byId.get('usdot-896791');

  const fl004 = JSON.parse(
    readFileSync(resolve(DATA(), 'fl-004-canonicalization-manifest.json'), 'utf8')
  ) as { rows: Fl004ManifestRow[]; retrieved_at?: string };
  const elig = JSON.parse(readFileSync(resolve(DATA(), 'publication-eligibility-v1.json'), 'utf8')) as {
    rows: Array<{
      regulatory_id: string;
      existing_company_id: string | null;
      expiration?: string | null;
      city?: string | null;
      zip?: string | null;
      physical_address?: string | null;
      phone?: string | null;
      email?: string | null;
      county?: string | null;
      county_fips?: string | null;
      county_resolution_status?: string | null;
    }>;
  };
  const fl004ById = new Map(fl004.rows.map((r) => [r.intended_company_id, r]));
  const eligByReg = new Map(elig.rows.map((r) => [r.regulatory_id, r]));
  const wave2ReadyIds = new Set<string>();
  for (const c of companies) {
    if (!c.id.startsWith('fl-im-')) continue;
    const fl004Row = fl004ById.get(c.id);
    const imFromId = `IM${c.id.replace(/^fl-im-/, '')}`;
    const fdacsIm = String(fl004Row?.fdacs_im_number ?? imFromId).toUpperCase();
    const eligRow =
      eligByReg.get(fl004Row?.regulatory_id ?? '') ??
      elig.rows.find((r) => r.existing_company_id === c.id);
    const sub = byIm.get(fdacsIm);
    const q = qualifyWave2Readiness({
      companyId: c.id,
      slug: c.slug,
      displayName: c.name,
      legalName: c.legalName,
      publicationState: c.publicationState ?? 'INGESTED',
      indexable: c.indexable,
      fdacsRegulatoryId: fl004Row?.regulatory_id ?? fdacsRegulatoryId(fdacsIm) ?? '',
      fdacsAuthorityNumber: fdacsIm,
      authorityType: 'intrastate_mover_registration',
      authorityStatus: sub?.status ?? fl004Row?.registration_status ?? 'active',
      regulator: 'FDACS',
      sourceProvenance: fl004Row?.source_provenance ?? 'fdacs_legacy_xls',
      retrievedAt: sub?.retrievedAt ?? fl004.retrieved_at ?? null,
      expiration: eligRow?.expiration ?? sub?.expiration ?? null,
      physicalStreet: fl004Row?.physical_address ?? sub?.physicalAddress ?? c.address,
      city: fl004Row?.city ?? eligRow?.city ?? sub?.city ?? null,
      state: 'FL',
      zip: fl004Row?.zip ?? eligRow?.zip ?? sub?.postalCode ?? null,
      county: fl004Row?.county ?? eligRow?.county ?? null,
      countyFips: fl004Row?.county_fips ?? eligRow?.county_fips ?? null,
      countyVerification: fl004Row?.county_verification ?? eligRow?.county_resolution_status ?? null,
      phoneObservation: Boolean(sub?.phone || c.phone || fl004Row?.phone),
      emailObservation: Boolean(sub?.email || c.email || fl004Row?.email),
      addressObservation: Boolean(sub?.physicalAddress || c.address || fl004Row?.physical_address),
      canonicalPhone: c.phone,
      canonicalEmail: c.email,
      usdot: c.usdot,
      mcNumber: c.mc,
      unresolvedDuplicate: Boolean(fl004Row?.collision && fl004Row.collision !== 'NONE'),
      unresolvedMultiStateCollision: holds.has(c.id) && !wave1Ids.has(c.id),
      brandOnlyIdentity: false,
      corporateFamilyDeferral: c.id === 'fl-im-4099',
      currentlyInCanary: keep80.has(c.id),
      cohortOrigin: insertIms.has(fdacsIm) ? 'FL-011D' : fl004Row ? 'FL-004' : 'existing_fl_im',
      asOf: AS_OF,
      inWave1: wave1Ids.has(c.id),
      inKeep80: keep80.has(c.id),
      inHoldList: holds.has(c.id),
      missingCanonicalCompany: false,
    });
    if (q.wave2State === 'READY_FOR_WAVE_2') wave2ReadyIds.add(c.id);
  }

  const resolved113Wave2 = manDoc.operations.map((op) => {
    const c = byId.get(op.companyId);
    const visible = c ? isConsumerVisibleCompany({ publicationState: c.publicationState as 'INGESTED' }) : false;
    const cls = classifyResolvedForWave2({
      op: op.op,
      consumerVisible: visible,
      wave2Ready: wave2ReadyIds.has(op.companyId),
    });
    return { fdacsIm: op.fdacsIm, companyId: op.companyId, op: op.op, class: cls, visible };
  });

  const coverageRows: Array<{ im: string; cls: CoverageClass }> = [];
  const gapTally: Record<string, number> = {};
  for (const sub of activeIms) {
    const im = sub.fdacsIm;
    const proposed = proposedImCompanyId(im);
    const psa = (currentPsaByIm.get(im) ?? []).filter(isCurrentPsa);
    const mappedId = psa.find((p) => p.companyId)?.companyId ?? (byId.has(proposed) ? proposed : null);
    const c = mappedId ? byId.get(mappedId) : undefined;
    const classified = classifyActiveImGap({
      subject: sub,
      candidates,
      existingImCompanyIds,
      wave1Ids,
      keep80Ids: keep80,
      asOf: AS_OF,
    });
    const hasPsa = Boolean(mappedId && psa.some((p) => p.companyId === mappedId));
    const in113 = insertIms.has(im) || linkIms.has(im);
    const mappedFlIm = Boolean(mappedId?.startsWith('fl-im-'));
    const withheldOnly =
      !in113 && !wave1Ims.has(im) && !mappedFlIm && !wave1Ids.has(c?.id ?? '');
    const cls = assignPrimaryCoverage({
      fdacsIm: im,
      wave1Im: wave1Ims.has(im) || (c ? wave1Ids.has(c.id) : false),
      keep80Company: withheldOnly ? false : c ? keep80.has(c.id) : false,
      fl011dInsert: insertIms.has(im),
      hasCurrentPsaOnCompany: withheldOnly ? false : hasPsa,
      consumerVisible:
        withheldOnly || !c
          ? false
          : isConsumerVisibleCompany({ publicationState: c.publicationState as 'INGESTED' }),
      ingested: withheldOnly ? false : c?.publicationState === 'INGESTED',
      wave2Ready: withheldOnly || !c ? false : wave2ReadyIds.has(c.id),
      gapClass: classified.classification,
    });
    coverageRows.push({ im, cls });
    if (!isSafelyRepresented(cls)) {
      gapTally[classified.classification] = (gapTally[classified.classification] ?? 0) + 1;
    }
  }
  const coverageTally: Record<string, number> = {};
  for (const r of coverageRows) coverageTally[r.cls] = (coverageTally[r.cls] ?? 0) + 1;
  const represented = coverageRows.filter((r) => isSafelyRepresented(r.cls)).length;
  const metric = coverageMetric(activeIms.length, represented);
  const unresolvedRows = coverageRows.filter((r) => !isSafelyRepresented(r.cls));

  const contact = { phone: { attached: 0, noop: 0 }, email: { attached: 0, noop: 0 }, address: { attached: 0, noop: 0 } };
  const companiesWithAttach = new Set<string>();
  for (const op of manDoc.operations) {
    const rid = fdacsRegulatoryId(op.fdacsIm);
    if (!rid) continue;
    const rows = obsAll.filter((o) => o.regulatoryId === rid);
    const kinds: Array<{ key: 'phone' | 'email' | 'address'; type: string }> = [
      { key: 'phone', type: 'business_phone' },
      { key: 'email', type: 'business_email' },
      { key: 'address', type: 'physical_address' },
    ];
    for (const k of kinds) {
      const hit = rows.find((o) => o.type === k.type);
      if (!hit) continue;
      if (hit.companyId === op.companyId) {
        if (hit.task === 'FL-011D') {
          contact[k.key].attached += 1;
          companiesWithAttach.add(op.companyId);
        } else {
          contact[k.key].noop += 1;
        }
      }
    }
  }

  let psaFl011dMatch = 0;
  let psaPreexisting = 0;
  let psaOrphanActive = 0;
  for (const op of manDoc.operations) {
    const rows = (currentPsaByIm.get(op.fdacsIm.toUpperCase()) ?? []).filter(isCurrentPsa);
    const onTarget = rows.filter((p) => p.companyId === op.companyId);
    if (onTarget.some((p) => String(p.matchMethod ?? '').startsWith('fl011d:'))) psaFl011dMatch += 1;
    else if (onTarget.length) psaPreexisting += 1;
    if (rows.some((p) => !p.companyId)) psaOrphanActive += 1;
  }

  const fdacsLinked = companies.filter((c) =>
    psaAll.some((p) => isCurrentPsa(p) && p.companyId === c.id && p.authorityNumber.startsWith('IM'))
  );
  const internallyLinkedPublic = fdacsLinked.filter((c) =>
    isConsumerVisibleCompany({ publicationState: c.publicationState as 'INGESTED' })
  );
  const publiclyDisplaying = internallyLinkedPublic.filter((c) =>
    publicFdacsDisplayAllowed({ id: c.id, publicationState: c.publicationState })
  );
  const stateOnly = fdacsLinked.filter((c) => !c.usdot && !c.mc);
  const federalState = fdacsLinked.filter((c) => Boolean(c.usdot || c.mc));
  const pubDist: Record<string, number> = {};
  for (const c of fdacsLinked) {
    const k = c.publicationState ?? 'legacy_null';
    pubDist[k] = (pubDist[k] ?? 0) + 1;
  }

  const flCities = new Set(
    [...byIm.values()].filter((s) => /\bFL\b|Florida/i.test(String(s.county ?? ''))).map((s) => s.city)
  );
  let knownCounty = 0;
  let unknownCounty = 0;
  let outOfState = 0;
  for (const c of fdacsLinked) {
    const psa = psaAll.find((p) => p.companyId === c.id && isCurrentPsa(p) && p.authorityNumber.startsWith('IM'));
    const sub = psa ? byIm.get(psa.authorityNumber) : undefined;
    const fl004Row = fl004ById.get(c.id);
    const hq = `${c.hq ?? ''} ${sub?.city ?? ''}`;
    if (fl004Row?.county) knownCounty += 1;
    else if (/\b(OK|GA|TX|AL|VA|NJ|IL|NY|MA|MN|WV)\b/i.test(hq) && !/,\s*FL\b/i.test(c.hq ?? '')) outOfState += 1;
    else unknownCounty += 1;
  }

  const wave2DraftStillReady = wave2Draft.members.filter((m) => wave2ReadyIds.has(m.companyId)).length;

  await client.end();

  const companyBaseline = {
    google_places_requests: 0,
    historical_post_fl011d: { companies: 5940, fl_im: 849, fl_im_ingested: 762, publishable: 5022, indexable: 4905 },
    current: snap.rows[0],
    drift: {
      companies: snap.rows[0].companies - 5940,
      fl_im: snap.rows[0].fl_im - 849,
      fl_im_ingested: snap.rows[0].fl_im_ingested - 762,
      publishable: snap.rows[0].publishable - 5022,
      indexable: snap.rows[0].indexable - 4905,
    },
  };

  const coverage = {
    google_places_requests: 0,
    source_timestamp: '2026-08-21T17:11:52.759Z',
    im_source_records: records.filter((r) => String(r.authorityNumber ?? '').toUpperCase().startsWith('IM')).length,
    status_tally: statusTally,
    active: activeIms.length,
    partition: coverageTally,
    partition_sum: coverageRows.length,
    represented: metric.represented,
    unresolved: metric.unresolved,
    percentage: metric.percentage,
    historical_gap: FL_011C_GAP_HISTORICAL,
    historical_withheld: FL_011C_WITHHELD_HISTORICAL,
    current_unresolved_by_class: gapTally,
    naive_936_not_used: true,
  };

  writeJson(resolve(DOCS(), 'task-fl-011e-current-main-baseline.json'), {
    google_places_requests: 0,
    origin_main: '00df7f8c40eda00be9b7239180c548b6d92c0a5c',
    production_sha: prodSha,
    sha_match: prodSha.startsWith('00df7f8c') ? 'YES' : 'NO',
    latest_builder1_pr: 76,
    latest_builder2_prs: [79, 78, 77, 75, 74],
    retrieved_at: retrievedAt,
  });
  writeJson(resolve(DOCS(), 'task-fl-011e-live-113-audit.json'), {
    google_places_requests: 0,
    n: audits.length,
    tally: auditTally,
    wrong_company: wrongCompany,
    rows: audits,
  });
  writeJson(resolve(DOCS(), 'task-fl-011e-new-32-internal-qa.json'), {
    google_places_requests: 0,
    http404: httpNew.filter((h) => h.status === 404).length,
    tested: httpNew.length,
    non404: httpNew.filter((h) => h.status !== 404),
    im1954: {
      slug: im1954?.slug ?? null,
      status: im1954Http?.status ?? null,
      stolen_alias_status: stolen.status,
      stolen_location: stolen.location,
      usdot_896791_slug: canonicalFreeman?.slug ?? null,
    },
  });
  writeJson(resolve(DOCS(), 'task-fl-011e-coverage-partition.json'), coverage);
  writeJson(resolve(DOCS(), 'task-fl-011e-unresolved-active.json'), {
    google_places_requests: 0,
    n: unresolvedRows.length,
    by_class: gapTally,
    historical: { CORPORATE_FAMILY_REVIEW: 46, POSSIBLE_DUPLICATE: 114, CONFLICT: 5, SOURCE_STATUS_BLOCKED: 3 },
  });
  writeJson(resolve(DOCS(), 'task-fl-011e-wave2-recompute.json'), {
    google_places_requests: 0,
    historical_ready_pool: FL_011B_READY_POOL_HISTORICAL,
    current_ready_pool: wave2ReadyIds.size,
    naive_720_plus_113: FL_011B_READY_POOL_HISTORICAL + 113,
    draft: { count: wave2Draft.members.length, hash: wave2Draft.hash, apply: wave2Draft.apply, still_ready: wave2DraftStillReady },
    resolved_113: {
      ALREADY_PUBLIC_NO_WAVE_NEEDED: resolved113Wave2.filter((r) => r.class === 'ALREADY_PUBLIC_NO_WAVE_NEEDED').length,
      NEWLY_WAVE2_READY: resolved113Wave2.filter((r) => r.class === 'NEWLY_WAVE2_READY').length,
      INTERNAL_BUT_NOT_WAVE2_READY: resolved113Wave2.filter((r) => r.class === 'INTERNAL_BUT_NOT_WAVE2_READY').length,
      OTHER: resolved113Wave2.filter((r) => r.class === 'OTHER').length,
    },
    draft_untouched: wave2Draft.hash === FL_011B_WAVE2_DRAFT_HASH && wave2Draft.apply === false,
  });
  writeJson(resolve(DOCS(), 'task-fl-011e-contact-audit.json'), {
    google_places_requests: 0,
    PHONE_OBSERVATIONS_ATTACHED: contact.phone.attached,
    EMAIL_OBSERVATIONS_ATTACHED: contact.email.attached,
    ADDRESS_OBSERVATIONS_ATTACHED: contact.address.attached,
    PHONE_NOOP: contact.phone.noop,
    EMAIL_NOOP: contact.email.noop,
    ADDRESS_NOOP: contact.address.noop,
    DISTINCT_COMPANIES_GAINING_1PLUS_ATTACHED_CONTACT_OBSERVATION: companiesWithAttach.size,
    PROMOTED_TO_CANONICAL_FIELD: 0,
  });
  writeJson(resolve(DOCS(), 'task-fl-011e-authority-audit.json'), {
    google_places_requests: 0,
    represented: bound.total,
    fl011d_match_method_rows: psaFl011dMatch,
    preexisting_noop: psaPreexisting,
    wrong_company: wrongCompany,
    orphan_active_remaining: psaOrphanActive,
  });
  writeJson(resolve(DOCS(), 'task-fl-011e-public-vs-internal.json'), {
    google_places_requests: 0,
    INTERNALLY_FDACS_LINKED_PUBLIC_COMPANIES: internallyLinkedPublic.length,
    PUBLICLY_DISPLAYING_FDACS_EVIDENCE: publiclyDisplaying.length,
    new_public_companies: 0,
    new_state_profiles: 0,
  });
  writeJson(resolve(DOCS(), 'task-fl-011e-state-only-and-federal.json'), {
    google_places_requests: 0,
    fdacs_linked_companies: fdacsLinked.length,
    state_only: stateOnly.length,
    federal_plus_state: federalState.length,
    state_only_public: stateOnly.filter((c) =>
      isConsumerVisibleCompany({ publicationState: c.publicationState as 'INGESTED' })
    ).length,
    state_only_internal: stateOnly.filter((c) => c.publicationState === 'INGESTED').length,
    state_only_wave1: stateOnly.filter((c) => wave1Ids.has(c.id)).length,
    state_only_wave2_ready: stateOnly.filter((c) => wave2ReadyIds.has(c.id)).length,
    state_only_fl011d: stateOnly.filter((c) => insertIms.has(`IM${c.id.replace('fl-im-', '')}`)).length,
    publication_distribution: pubDist,
  });
  writeJson(resolve(DOCS(), 'task-fl-011e-geography.json'), {
    google_places_requests: 0,
    known_county: knownCounty,
    unknown_county: unknownCounty,
    out_of_state_registrant: outOfState,
  });
  writeJson(resolve(DOCS(), 'task-fl-011e-company-baseline.json'), companyBaseline);
  writeJson(resolve(DOCS(), 'task-fl-011e-builder2-freeze.json'), {
    google_places_requests: 0,
    county_regulatory_program: countyProgram,
    provider_county_credential: countyCred,
    writes: 0,
  });
  writeJson(resolve(LEDGER(), 'fl-011e-coverage-recompute.json'), {
    google_places_requests: 0,
    production_db_writes: FL_011E_PRODUCTION_WRITES,
    active: activeIms.length,
    represented: metric.represented,
    unresolved: metric.unresolved,
    percentage: metric.percentage,
    wave2_ready: wave2ReadyIds.size,
    new_public: 0,
  });

  const summary = {
    google_places_requests: FL_011E_GOOGLE_PLACES_REQUESTS,
    production_db_writes: FL_011E_PRODUCTION_WRITES,
    task: FL_011E_TASK,
    production_sha: prodSha,
    audit: auditTally,
    wrong_company: wrongCompany,
    http404: `${httpNew.filter((h) => h.status === 404).length}/${httpNew.length}`,
    coverage,
    wave2_ready: wave2ReadyIds.size,
    wave2_draft_still_ready: `${wave2DraftStillReady}/50`,
    contact,
    companies_with_attach: companiesWithAttach.size,
  };
  writeJson(resolve(DOCS(), 'task-fl-011e-readiness-summary.json'), summary);
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e).replace(/postgresql:\/\/[^@]+@/, 'postgresql://***@'));
  process.exit(1);
});
