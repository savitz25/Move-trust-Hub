/**
 * FL-011B — read-only Florida State Wave 2 qualification.
 * Production writes: 0. Google Places: 0. Does not apply publication.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { loadEnvFiles, resolveDatabaseUrl } from '../lib/state-hhg/calibration/db';
import { loadExactCanaryManifests } from '../lib/state-hhg/canary/manifest';
import { LOCAL_CANARY_WAVE_ID } from '../lib/state-hhg/canary/types';
import { FloridaStateMoverAdapter } from '../lib/state-hhg/fl/adapter';
import type { Fl004ManifestRow } from '../lib/state-hhg/fl/fl-004';
import {
  simulatePublishableNoindexSurface,
  simulateStateOnlyStructuredData,
  type ReadinessInput,
} from '../lib/state-hhg/fl/publication-readiness';
import {
  FL_FDACS_VERIFICATION_WORDING,
  FL_NO_FEDERAL_ID_IN_MTH_DATA,
  isUnsafeEndorsementCopy,
  isUnsafeFederalAbsenceClaim,
} from '../lib/state-hhg/fl/profile-presentation';
import {
  buildStateOnlyProfileChrome,
  loadWave1Manifest,
  FL_STATE_WAVE_1_ID,
} from '../lib/state-hhg/fl/wave-1';
import {
  FL_011B_GOOGLE_PLACES_REQUESTS,
  FL_011B_RECOMMENDED_CAP,
  FL_STATE_WAVE_2_DRAFT_ID,
  FL_STATE_WAVE_2_READINESS_V1,
  hashWave2Draft,
  loadFl007HoldCompanyIds,
  qualifyWave2Readiness,
  recommendWave2Subset,
  recommendedCapReason,
  type Wave2DraftMember,
  type Wave2State,
} from '../lib/state-hhg/fl/wave-2-readiness';

const ORIGIN = 'https://www.movetrusthub.com';
const AS_OF = '2026-08-22';
const DOCS = resolve(process.cwd(), 'docs');
const DATA = resolve(process.cwd(), 'data/state-hhg/fl');

type EligRow = {
  regulatory_id: string;
  publication_status: string;
  registration_type: string;
  registration_status: string;
  legal_name: string;
  dba: string | null;
  existing_company_id: string | null;
  existing_publication_state: string | null;
  county: string | null;
  review_reason: string | null;
  expiration?: string | null;
  city?: string | null;
  zip?: string | null;
  physical_address?: string | null;
  phone?: string | null;
  email?: string | null;
  county_fips?: string | null;
  county_resolution_status?: string | null;
};

async function probe(path: string) {
  const res = await fetch(`${ORIGIN}${path}`, {
    redirect: 'manual',
    headers: { 'user-agent': 'MoveTrustHub-FL011B/1.0', 'cache-control': 'no-cache' },
  });
  const text = await res.text();
  return {
    path,
    status: res.status,
    title: (text.match(/<title>([^<]+)/i) ?? ['', ''])[1],
  };
}

function countyTally<T extends { county?: string | null }>(rows: T[]) {
  const m = new Map<string, number>();
  for (const r of rows) {
    const k = r.county?.trim() || 'UNKNOWN';
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return Object.fromEntries([...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])));
}

async function main() {
  loadEnvFiles();
  mkdirSync(DOCS, { recursive: true });
  mkdirSync(DATA, { recursive: true });

  const wave1 = loadWave1Manifest();
  const wave1Ids = new Set(wave1.members.map((m) => m.companyId));
  const wave1Ims = new Set(wave1.members.map((m) => m.fdacsIm.toUpperCase()));
  const canary = loadExactCanaryManifests();
  const keep80 = new Set(canary.companyIds);
  const holds = new Set(loadFl007HoldCompanyIds());

  const fl004 = JSON.parse(
    readFileSync(resolve(DATA, 'fl-004-canonicalization-manifest.json'), 'utf8')
  ) as { rows: Fl004ManifestRow[]; retrieved_at?: string };
  const elig = JSON.parse(
    readFileSync(resolve(DATA, 'publication-eligibility-v1.json'), 'utf8')
  ) as { rows: EligRow[] };

  const adapter = new FloridaStateMoverAdapter({ retrievedAt: fl004.retrieved_at });
  const raw = await adapter.fetchOrLoadRegistry();
  const normalized = raw.map((r) => adapter.normalizeRecord(r));
  const imRecords = normalized.filter((r) => !adapter.resolveBrokerRole(r));
  const mbRecords = normalized.filter((r) => adapter.resolveBrokerRole(r));

  const sourceStatus: Record<string, number> = {};
  for (const r of imRecords) {
    const s = String(r.status || 'unknown');
    sourceStatus[s] = (sourceStatus[s] || 0) + 1;
  }

  const client = new pg.Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  });
  await client.connect();

  const freeze = await client.query(`
    SELECT count(*)::int AS companies,
           count(*) FILTER (WHERE indexable)::int AS indexable,
           count(*) FILTER (WHERE publication_state='INGESTED')::int AS ingested,
           count(*) FILTER (WHERE publication_state='PUBLISHABLE')::int AS publishable,
           count(*) FILTER (WHERE id ILIKE 'fl-im-%')::int AS fl_im
      FROM companies`);
  const waveLive = await client.query(
    `SELECT count(*)::int AS n FROM local_hhg_canary_publication WHERE wave_id=$1 AND status='published'`,
    [FL_STATE_WAVE_1_ID]
  );
  const keepLive = await client.query(
    `SELECT state_code, count(*)::int AS n FROM local_hhg_canary_publication
      WHERE wave_id=$1 AND status='published' GROUP BY 1`,
    [LOCAL_CANARY_WAVE_ID]
  );
  const flIm = await client.query(`
    SELECT id, slug, name, fmcsa_legal_name, phone, email, physical_address, headquarters,
           usdot_number, mc_number, publication_state, indexable, service_scope
      FROM companies WHERE id ILIKE 'fl-im-%'`);
  const byId = new Map(flIm.rows.map((r: { id: string }) => [r.id, r]));
  const ids = flIm.rows.map((r: { id: string }) => r.id);
  const psa = await client.query(
    `SELECT company_id, authority_number, status, authority_type, regulator, source, retrieved_at, verification_state
       FROM provider_state_authority
      WHERE state_code='FL' AND company_id = ANY($1::text[])`,
    [ids]
  );
  const psaBy = new Map<string, typeof psa.rows>();
  for (const row of psa.rows) {
    const cid = String(row.company_id);
    psaBy.set(cid, [...(psaBy.get(cid) ?? []), row]);
  }
  const obs = await client.query(
    `SELECT company_id, observation_type FROM provider_contact_observation WHERE company_id = ANY($1::text[])`,
    [ids]
  );
  const obsBy = new Map<string, Set<string>>();
  for (const row of obs.rows) {
    const cid = String(row.company_id);
    const set = obsBy.get(cid) ?? new Set();
    set.add(String(row.observation_type));
    obsBy.set(cid, set);
  }
  await client.end();

  const keepBy: Record<string, number> = {};
  for (const row of keepLive.rows) keepBy[String(row.state_code)] = Number(row.n);

  const fl004ById = new Map(fl004.rows.map((r) => [r.intended_company_id, r]));
  const eligByReg = new Map(elig.rows.map((r) => [r.regulatory_id, r]));

  const counts: Record<Wave2State, number> = {
    READY_FOR_WAVE_2: 0,
    HOLD_PROFILE_THIN: 0,
    REVIEW_REQUIRED: 0,
    NOT_ELIGIBLE: 0,
    DEFERRED: 0,
    EXCLUDED_WAVE_1: 0,
    EXCLUDED_KEEP_80: 0,
    EXCLUDED_HOLD: 0,
    STATE_RECORD_ONLY: 0,
  };

  const scorecard: Array<Record<string, unknown>> = [];
  const readyPool: Wave2DraftMember[] = [];
  const holdsOut: Array<Record<string, unknown>> = [];

  for (const company of flIm.rows as Array<Record<string, unknown>>) {
    const id = String(company.id);
    const fl004Row = fl004ById.get(id);
    const auth = (psaBy.get(id) ?? []).find((a) =>
      String(a.authority_number).toUpperCase().startsWith('IM')
    );
    const fdacsIm = String(auth?.authority_number ?? fl004Row?.fdacs_im_number ?? '').toUpperCase();
    const eligRow =
      eligByReg.get(fl004Row?.regulatory_id ?? '') ??
      elig.rows.find((r) => String(r.existing_company_id) === id);
    const observations = obsBy.get(id) ?? new Set();
    const street = String(company.physical_address ?? fl004Row?.physical_address ?? '')
      .split(',')[0]
      ?.trim();
    const input: ReadinessInput = {
      companyId: id,
      slug: String(company.slug ?? fl004Row?.intended_slug ?? ''),
      displayName: String(company.name ?? fl004Row?.dba ?? fl004Row?.legal_name ?? id),
      legalName: String(company.fmcsa_legal_name ?? fl004Row?.legal_name ?? company.name ?? ''),
      publicationState: String(company.publication_state ?? 'INGESTED'),
      indexable: company.indexable === true,
      fdacsRegulatoryId:
        fl004Row?.regulatory_id ??
        (fdacsIm.startsWith('IM') ? `FL-FDACS-IM-${fdacsIm.replace(/^IM/i, '')}` : `FL-FDACS-${fdacsIm}`),
      fdacsAuthorityNumber: fdacsIm || 'IM0',
      authorityType: String(auth?.authority_type ?? 'intrastate_mover_registration'),
      authorityStatus: String(auth?.status ?? fl004Row?.registration_status ?? 'unknown'),
      regulator: String(auth?.regulator ?? 'FDACS'),
      sourceProvenance: String(auth?.source ?? fl004Row?.source_provenance ?? ''),
      retrievedAt: auth?.retrieved_at ? String(auth.retrieved_at) : fl004.retrieved_at ?? null,
      expiration: eligRow?.expiration ?? null,
      physicalStreet: street || fl004Row?.physical_address || eligRow?.physical_address || null,
      city: fl004Row?.city ?? eligRow?.city ?? null,
      state: 'FL',
      zip: fl004Row?.zip ?? eligRow?.zip ?? null,
      county: fl004Row?.county ?? eligRow?.county ?? null,
      countyFips: fl004Row?.county_fips ?? eligRow?.county_fips ?? null,
      countyVerification: fl004Row?.county_verification ?? eligRow?.county_resolution_status ?? null,
      phoneObservation:
        observations.has('business_phone') || Boolean(fl004Row?.phone) || Boolean(eligRow?.phone),
      emailObservation:
        observations.has('business_email') || Boolean(fl004Row?.email) || Boolean(eligRow?.email),
      addressObservation:
        observations.has('physical_address') ||
        Boolean(fl004Row?.physical_address) ||
        Boolean(eligRow?.physical_address),
      canonicalPhone: company.phone ? String(company.phone) : null,
      canonicalEmail: company.email ? String(company.email) : null,
      usdot: company.usdot_number ? String(company.usdot_number) : null,
      mcNumber: company.mc_number ? String(company.mc_number) : null,
      unresolvedDuplicate: Boolean(fl004Row?.collision && fl004Row.collision !== 'NONE'),
      unresolvedMultiStateCollision: holds.has(id) && !wave1Ids.has(id),
      brandOnlyIdentity: false,
      corporateFamilyDeferral: id === 'fl-im-4099',
      currentlyInCanary: keep80.has(id),
      cohortOrigin: fl004Row ? 'FL-004' : 'existing_fl_im',
      asOf: AS_OF,
    };
    const result = qualifyWave2Readiness({
      ...input,
      inWave1: wave1Ids.has(id),
      inKeep80: keep80.has(id),
      inHoldList: holds.has(id),
      missingCanonicalCompany: false,
    });
    counts[result.wave2State] += 1;
    const row = {
      company_id: id,
      slug: input.slug,
      fdacs_im: fdacsIm,
      county: input.county,
      publication_state: input.publicationState,
      indexable: input.indexable,
      wave2_state: result.wave2State,
      fl008_state: result.state,
      reasons: result.reasons,
      missing: result.missingRequirements,
      freshness: result.statusFreshness,
      consumer_value: result.consumerValue,
      phone_observation: input.phoneObservation,
      email_observation: input.emailObservation,
      google_places_requests: 0,
    };
    scorecard.push(row);
    if (result.wave2State === 'READY_FOR_WAVE_2' && input.slug && fdacsIm.startsWith('IM')) {
      readyPool.push({
        companyId: id,
        slug: input.slug,
        fdacsId: input.fdacsRegulatoryId,
        fdacsIm,
        county: input.county,
        countyFips: input.countyFips,
        readinessRuleVersion: FL_STATE_WAVE_2_READINESS_V1,
        currentPublicationState: 'INGESTED',
        currentIndexable: false,
        intendedPublicationState: 'PUBLISHABLE',
        intendedIndexable: false,
        freshness: result.statusFreshness,
        rollbackPublicationState: 'INGESTED',
        rollbackIndexable: false,
      });
    } else if (
      result.wave2State !== 'EXCLUDED_WAVE_1' &&
      result.wave2State !== 'EXCLUDED_KEEP_80'
    ) {
      holdsOut.push({
        company_id: id,
        fdacs_im: fdacsIm || null,
        classification: result.wave2State,
        missing_evidence: result.missingRequirements,
        conflict_reason: result.reasons[0] ?? result.wave2State,
        next_resolution_source: 'Official FDACS IM record + fail-closed identity (no name-only)',
      });
    }
  }

  const canonicalIds = new Set(ids);
  let sourceOnly = 0;
  for (const rec of imRecords) {
    if (String(rec.status).toLowerCase() !== 'active') continue;
    const num = String(rec.authorityNumber ?? '').toUpperCase();
    if (!num.startsWith('IM')) continue;
    if (wave1Ims.has(num)) continue;
    const cid = `fl-im-${num.replace(/^IM/, '')}`;
    if (canonicalIds.has(cid)) continue;
    const el = eligByReg.get(`FL-FDACS-${num}`) ?? elig.rows.find((r) => r.regulatory_id.endsWith(num.replace(/^IM/, '')));
    sourceOnly += 1;
    counts.STATE_RECORD_ONLY += 1;
    holdsOut.push({
      company_id: null,
      fdacs_im: num,
      classification: 'STATE_RECORD_ONLY',
      missing_evidence: ['canonical_company'],
      conflict_reason: el?.publication_status ?? 'active_im_without_safe_canonical_company',
      next_resolution_source: 'FL-004-style canonicalization against current companies; no name-only match',
    });
  }

  const recommended = recommendWave2Subset(readyPool, FL_011B_RECOMMENDED_CAP);
  const recSet = new Set(recommended.map((m) => m.companyId));
  const hash = hashWave2Draft(recommended);

  const semantics = recommended.slice(0, 8).map((m) => {
    const c = byId.get(m.companyId) as Record<string, unknown> | undefined;
    const chrome = buildStateOnlyProfileChrome({
      displayName: String(c?.name ?? m.slug),
      fdacsNumber: m.fdacsIm,
      fdacsStatus: 'active',
      hasFederalId: Boolean(c?.usdot_number),
    });
    const sd = simulateStateOnlyStructuredData({
      name: String(c?.name ?? m.slug),
      slug: m.slug,
      street: m.county,
      city: null,
      state: 'FL',
      zip: null,
      phone: null,
      usdot: c?.usdot_number ? String(c.usdot_number) : null,
      reviewCount: 0,
      avgRating: 0,
      fdacsNumber: m.fdacsIm,
      serviceAreaClaimed: false,
    });
    const surface = simulatePublishableNoindexSurface({
      publicationState: 'PUBLISHABLE',
      indexable: false,
    });
    return {
      companyId: m.companyId,
      slug: m.slug,
      fdacsIm: m.fdacsIm,
      headline: chrome.headline,
      federalCopy: chrome.federalCopy,
      endorsement: chrome.endorsement,
      unsafe_endorsement: isUnsafeEndorsementCopy(chrome.detail),
      unsafe_federal_absence: isUnsafeFederalAbsenceClaim(chrome.federalCopy),
      fdacs_verification_wording: FL_FDACS_VERIFICATION_WORDING,
      no_federal_copy: FL_NO_FEDERAL_ID_IN_MTH_DATA,
      structured_ok: sd.ok,
      future_surface: surface,
    };
  });

  const http404 = [];
  for (const m of recommended.slice(0, 8)) {
    http404.push({ slug: m.slug, ...(await probe(`/companies/${m.slug}`)) });
  }
  const wave1Probe = await probe(`/companies/${wave1.members[0].slug}`);

  const readyContact = readyPool.map((m) => scorecard.find((s) => s.company_id === m.companyId));
  const recContact = recommended.map((m) => scorecard.find((s) => s.company_id === m.companyId));

  const universe = {
    google_places_requests: FL_011B_GOOGLE_PLACES_REQUESTS,
    source_im_records: imRecords.length,
    source_mb_records: mbRecords.length,
    source_im_status: sourceStatus,
    eligibility_rows: elig.rows.length,
    eligibility_by_status: elig.rows.reduce((acc: Record<string, number>, r) => {
      acc[r.publication_status] = (acc[r.publication_status] || 0) + 1;
      return acc;
    }, {}),
    fl004_rows: fl004.rows.length,
    db_fl_im_companies: flIm.rows.length,
    db_freeze: freeze.rows[0],
    wave1_live: Number(waveLive.rows[0]?.n ?? 0),
    keep80_live: { FL: keepBy.FL ?? 0, WA: keepBy.WA ?? 0, total: (keepBy.FL ?? 0) + (keepBy.WA ?? 0) },
    active_im_source: sourceStatus.active ?? 0,
    source_only_active_im: sourceOnly,
  };

  const exclusions = {
    wave1: wave1.members.length,
    wave1_ids: [...wave1Ids].sort(),
    keep80: { FL: keepBy.FL ?? 0, WA: keepBy.WA ?? 0, total: (keepBy.FL ?? 0) + (keepBy.WA ?? 0) },
    holds: [...holds].sort(),
    brokers: mbRecords.length,
  };

  const draft = {
    google_places_requests: 0,
    waveId: FL_STATE_WAVE_2_DRAFT_ID,
    ruleset: FL_STATE_WAVE_2_READINESS_V1,
    apply: false as const,
    hash,
    members: recommended,
  };

  const simulated = {
    google_places_requests: 0,
    apply: false,
    companies: 0,
    publicationStateChanges: recommended.length,
    ingested: -recommended.length,
    publishable: recommended.length,
    indexable: 0,
    psa: 0,
    contacts: 0,
    trustScore: 0,
    sitemap: 0,
    keep80: 0,
    wave1: 0,
  };

  const summary = {
    google_places_requests: 0,
    as_of: AS_OF,
    production_db_writes: 0,
    wave1_unchanged: Number(waveLive.rows[0]?.n ?? 0) === 37,
    freeze: freeze.rows[0],
    wave2_counts: counts,
    ready_pool: readyPool.length,
    recommended: recommended.length,
    recommended_reason: recommendedCapReason(readyPool.length, recommended.length),
    recommended_counties: countyTally(recommended),
    ready_counties: countyTally(readyPool),
    contact_ready_pool: {
      phone: readyContact.filter((r) => r?.phone_observation).length,
      email: readyContact.filter((r) => r?.email_observation).length,
      n: readyPool.length,
    },
    contact_recommended: {
      phone: recContact.filter((r) => r?.phone_observation).length,
      email: recContact.filter((r) => r?.email_observation).length,
      n: recommended.length,
    },
    draft_hash: hash,
    apply: false,
    http404_sample: http404,
    wave1_still_200: wave1Probe.status,
  };

  writeFileSync(resolve(DOCS, 'task-fl-011b-florida-state-universe.json'), JSON.stringify(universe, null, 2) + '\n');
  writeFileSync(resolve(DOCS, 'task-fl-011b-exclusions.json'), JSON.stringify(exclusions, null, 2) + '\n');
  writeFileSync(resolve(DOCS, 'task-fl-011b-canonical-linkage.json'), JSON.stringify({ google_places_requests: 0, counts, scorecard }, null, 2) + '\n');
  writeFileSync(
    resolve(DATA, 'fl-011b-wave2-ready-pool.json'),
    JSON.stringify({ google_places_requests: 0, ruleset: FL_STATE_WAVE_2_READINESS_V1, apply: false, members: readyPool }, null, 2) + '\n'
  );
  writeFileSync(
    resolve(DATA, 'fl-011b-wave2-draft-manifest.json'),
    JSON.stringify(draft, null, 2) + '\n'
  );
  writeFileSync(resolve(DOCS, 'task-fl-011b-hold-list.json'), JSON.stringify({ google_places_requests: 0, n: holdsOut.length, holds: holdsOut }, null, 2) + '\n');
  writeFileSync(resolve(DOCS, 'task-fl-011b-simulated-delta.json'), JSON.stringify(simulated, null, 2) + '\n');
  writeFileSync(resolve(DOCS, 'task-fl-011b-profile-semantics.json'), JSON.stringify({ google_places_requests: 0, samples: semantics }, null, 2) + '\n');
  writeFileSync(resolve(DOCS, 'task-fl-011b-readiness-summary.json'), JSON.stringify(summary, null, 2) + '\n');
  writeFileSync(
    resolve(DOCS, 'task-fl-011b-strict-404.json'),
    JSON.stringify({ google_places_requests: 0, candidates: http404, wave1_sample: wave1Probe }, null, 2) + '\n'
  );

  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        ready_pool: readyPool.length,
        recommended: recommended.length,
        hash,
        wave1_live: Number(waveLive.rows[0]?.n ?? 0),
        freeze: freeze.rows[0],
        counts,
        http404: `${http404.filter((r) => r.status === 404).length}/${http404.length}`,
        wave1_200: wave1Probe.status,
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
