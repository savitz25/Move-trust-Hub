/**
 * FL-011F — read-only unresolved ACTIVE IM resolution.
 * Production writes: 0. Google Places: 0. apply=false.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { loadEnvFiles, resolveDatabaseUrl } from '../lib/state-hhg/calibration/db';
import { loadExactCanaryManifests } from '../lib/state-hhg/canary/manifest';
import { FloridaStateMoverAdapter } from '../lib/state-hhg/fl/adapter';
import { allocateCompanySlug, buildDisplayName } from '../lib/state-hhg/canonicalization/ids';
import { loadWave1Manifest } from '../lib/state-hhg/fl/wave-1';
import { classifyActiveImGap, proposedImCompanyId, type GapSubject } from '../lib/state-hhg/fl/wave-2-canonicalization';
import type { CanonicalProviderIdentity } from '../lib/state-hhg/identity';
import {
  FL_011E_UNRESOLVED_HISTORICAL,
  FL_011F_GOOGLE_PLACES_REQUESTS,
  FL_011F_PRODUCTION_WRITES,
  FL_011F_TASK,
  FL_STATE_UNRESOLVED_ACTIVE_IM_V1,
  FL_STATE_UNRESOLVED_RESOLUTION_INTERNAL_V1_DRAFT,
  FL_STATE_UNRESOLVED_RESOLUTION_READY_POOL_V1,
  hashUnresolvedDraft,
  resolveUnresolvedIm,
  simulateCoverage,
  simulatedNewCompanyContract,
  type HoldReason,
  type TerminalClass,
} from '../lib/state-hhg/fl/wave-011f';

const AS_OF = '2026-08-22';
const ORIGIN = 'https://www.movetrusthub.com';
const DOCS = () => resolve(process.cwd(), 'docs');
const DATA = () => resolve(process.cwd(), 'data/state-hhg/fl');
const LEDGER = () => resolve(process.cwd(), 'docs/florida-impact-ledger/state');

function writeJson(path: string, value: unknown) {
  mkdirSync(resolve(path, '..'), { recursive: true });
  writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
}

function loadRows(name: string): Array<Record<string, unknown>> {
  const doc = JSON.parse(readFileSync(resolve(DOCS(), name), 'utf8')) as { rows?: Array<Record<string, unknown>> };
  return doc.rows ?? [];
}

async function productionSha(): Promise<string> {
  const res = await fetch(`${ORIGIN}/`, { headers: { 'user-agent': 'MoveTrustHub-FL-011F/1.0' } });
  const text = await res.text();
  return (text.match(/data-build-id="([^"]+)"/) ?? [])[1] ?? 'unknown';
}

async function probe(path: string) {
  const res = await fetch(`${ORIGIN}${path}`, {
    redirect: 'manual',
    headers: { 'user-agent': 'MoveTrustHub-FL-011F/1.0', 'cache-control': 'no-cache' },
  });
  const text = res.status === 200 ? await res.text() : '';
  return {
    path,
    status: res.status,
    waveFdacs: /Registration verified from Florida FDACS/i.test(text),
    robots: (text.match(/name="robots"\s+content="([^"]+)"/i) ?? [])[1] ?? null,
  };
}

async function main() {
  loadEnvFiles();
  const retrievedAt = new Date().toISOString();
  mkdirSync(DOCS(), { recursive: true });
  mkdirSync(DATA(), { recursive: true });
  mkdirSync(LEDGER(), { recursive: true });

  const priorDup = loadRows('task-fl-011c-duplicate-review.json');
  const priorFam = loadRows('task-fl-011c-corporate-family-review.json');
  const priorBlocked = loadRows('task-fl-011c-status-blocked.json');
  const priorConflict = loadRows('task-fl-011c-identity-collision-audit.json').filter(
    (r) => r.classification === 'CONFLICT'
  );
  const priorByIm = new Map<string, Record<string, unknown>>();
  for (const r of [...priorDup, ...priorFam, ...priorConflict, ...priorBlocked]) {
    priorByIm.set(String(r.fdacsIm).toUpperCase(), r);
  }

  const wave1 = loadWave1Manifest();
  const wave1Ids = new Set(wave1.members.map((m) => m.companyId));
  const keep80 = new Set(loadExactCanaryManifests().companyIds);
  const insert113 = new Set(
    (
      JSON.parse(
        readFileSync(resolve(DATA(), 'fl-011d-canonicalization-wave-internal-v1.json'), 'utf8')
      ) as { operations: Array<{ op: string; fdacsIm: string }> }
    ).operations
      .filter((o) => o.op === 'INSERT_NEW_CANONICAL')
      .map((o) => o.fdacsIm.toUpperCase())
  );

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

  const prodSha = await productionSha();
  const client = new pg.Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  });
  await client.connect();
  const freeze = await client.query(`
    SELECT count(*)::int AS companies,
           count(*) FILTER (WHERE indexable)::int AS indexable,
           count(*) FILTER (WHERE id ILIKE 'fl-im-%')::int AS fl_im
      FROM companies`);
  let countyN = -1;
  let countyBy: Array<Record<string, unknown>> = [];
  try {
    countyN = (await client.query(`SELECT count(*)::int AS n FROM provider_county_credential`)).rows[0].n;
    countyBy = (
      await client.query(
        `SELECT program_key, publication_state, count(*)::int AS n
           FROM provider_county_credential GROUP BY 1,2 ORDER BY 1,2`
      )
    ).rows;
  } catch {
    try {
      countyN = (await client.query(`SELECT count(*)::int AS n FROM provider_county_credential`)).rows[0].n;
    } catch {
      countyN = -1;
    }
  }

  const companyRes = await client.query(`
    SELECT id, slug, name, fmcsa_legal_name, phone, email, physical_address, headquarters,
           usdot_number, mc_number, publication_state, indexable
      FROM companies`);
  await client.end();

  type Co = CanonicalProviderIdentity & { slug: string; usdotNumber: string | null };
  const companies: Co[] = companyRes.rows.map((r: Record<string, unknown>) => ({
    companyId: String(r.id),
    slug: String(r.slug ?? ''),
    legalName: r.fmcsa_legal_name ? String(r.fmcsa_legal_name) : String(r.name ?? ''),
    dbaName: r.name ? String(r.name) : null,
    publicName: r.name ? String(r.name) : null,
    usdot: r.usdot_number ? String(r.usdot_number) : null,
    usdotNumber: r.usdot_number ? String(r.usdot_number) : null,
    phone: r.phone ? String(r.phone) : null,
    email: r.email ? String(r.email) : null,
    address: r.physical_address ? String(r.physical_address) : null,
    city: null,
    state: 'FL',
    postalCode: null,
    publicationState: r.publication_state ? String(r.publication_state) : null,
    indexable: r.indexable === true,
  }));
  const byId = new Map(companies.map((c) => [c.companyId, c]));
  const existingIm = new Set(companies.filter((c) => c.companyId.startsWith('fl-im-')).map((c) => c.companyId));
  const takenSlugs = new Set(companies.map((c) => c.slug).filter(Boolean));

  const starting: Array<Record<string, unknown>> = [];
  const classified: Array<Record<string, unknown>> = [];
  const tally: Record<TerminalClass, number> = {
    EXISTING_CANONICAL_LINK_READY: 0,
    NEW_CANONICAL_COMPANY_READY: 0,
    DISTINCT_ENTITY_ALREADY_REPRESENTED: 0,
    NO_LONGER_ACTIVE: 0,
    REMAINS_POSSIBLE_DUPLICATE: 0,
    REMAINS_CORPORATE_FAMILY_REVIEW: 0,
    CONFLICT_REMAINS: 0,
    SOURCE_STATUS_BLOCKED: 0,
    OTHER_REVIEW_REQUIRED: 0,
  };
  const holdCounts: Record<string, number> = {};
  const readyOps: Array<Record<string, unknown>> = [];
  const provenance: Array<Record<string, unknown>> = [];

  for (const [im, prior] of priorByIm) {
    const subject = byIm.get(im);
    if (!subject) continue;
    if (existingIm.has(proposedImCompanyId(im)) || insert113.has(im)) continue;
    const live = classifyActiveImGap({
      subject,
      candidates: companies,
      existingImCompanyIds: existingIm,
      wave1Ids,
      keep80Ids: keep80,
      asOf: AS_OF,
    });
    const candidateId =
      live.matchedCompanyId ||
      (Array.isArray((prior.evidence as { companyIds?: string[] } | undefined)?.companyIds)
        ? (prior.evidence as { companyIds: string[] }).companyIds[0]
        : null);
    const cand = candidateId ? byId.get(candidateId) ?? null : null;
    const resolved = resolveUnresolvedIm({
      priorClass: String(prior.classification),
      live,
      subject,
      candidate: cand,
      candidateUsdotNumber: cand?.usdotNumber ?? null,
    });
    tally[resolved.terminal] += 1;
    if (resolved.holdReason) holdCounts[resolved.holdReason] = (holdCounts[resolved.holdReason] ?? 0) + 1;
    starting.push({
      fdacsIm: im,
      legalName: subject.legalName,
      dba: subject.dba,
      status: subject.status,
      phone: subject.phone,
      email: subject.email,
      address: subject.physicalAddress,
      city: subject.city,
      zip: subject.postalCode,
      priorClassification: prior.classification,
      priorReasons: prior.reasons,
      priorCandidateIds: (prior.evidence as { companyIds?: string[] } | undefined)?.companyIds ?? null,
      sourceProvenance: 'fdacs_legacy_xls',
      liveClassification: live.classification,
      google_places_requests: 0,
    });
    classified.push({
      fdacsIm: im,
      prior: prior.classification,
      terminal: resolved.terminal,
      holdReason: resolved.holdReason,
      evidenceMethod: resolved.evidenceMethod,
      officialSources: resolved.officialSources,
      publicationGateRemediationRequired: resolved.publicationGateRemediationRequired,
      matchedCompanyId: live.matchedCompanyId,
      proposedCompanyId: proposedImCompanyId(im),
      googlePlacesRequests: 0,
    });
    provenance.push({
      fdacsIm: im,
      source_agency: 'FDACS',
      source_type: 'legacy_business_license_lookup_snapshot',
      url: 'https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx',
      retrieved_at: subject.retrievedAt,
      identifier_searched: im,
      observed: { legalName: subject.legalName, status: subject.status, usdot: subject.usdot },
      inferred: false,
    });
    if (resolved.terminal === 'EXISTING_CANONICAL_LINK_READY' && live.matchedCompanyId) {
      const co = byId.get(live.matchedCompanyId);
      readyOps.push({
        op: 'LINK_EXISTING_CANONICAL',
        fdacsIm: im,
        sourceLegalName: subject.legalName,
        sourceDba: subject.dba,
        currentStatus: subject.status,
        sourceFreshness: live.statusFreshness,
        canonicalCompanyId: live.matchedCompanyId,
        proposedCompanyId: null,
        proposedSlug: co?.slug ?? null,
        officialIdentityEvidence: resolved.evidenceMethod,
        evidenceSources: resolved.officialSources,
        identityRuleset: FL_STATE_UNRESOLVED_RESOLUTION_INTERNAL_V1_DRAFT,
        qaStatus: 'READY',
        intendedPublicationState: co?.publicationState ?? null,
        intendedIndexable: co?.indexable ?? null,
        contactObservationDisposition: 'FUTURE_ATTACH_ELIGIBLE',
        rollbackOp: 'DETACH_FL011F_PSA',
      });
    }
    if (resolved.terminal === 'NEW_CANONICAL_COMPANY_READY') {
      const display = buildDisplayName(subject.legalName || im, subject.dba);
      const slug = allocateCompanySlug({
        displayName: display,
        stateCode: 'FL',
        authorityNumber: im,
        takenSlugs,
      }).slug;
      takenSlugs.add(slug);
      readyOps.push({
        op: 'INSERT_NEW_CANONICAL',
        fdacsIm: im,
        sourceLegalName: subject.legalName,
        sourceDba: subject.dba,
        currentStatus: subject.status,
        sourceFreshness: live.statusFreshness,
        canonicalCompanyId: null,
        proposedCompanyId: proposedImCompanyId(im),
        proposedSlug: slug,
        officialIdentityEvidence: resolved.evidenceMethod,
        evidenceSources: resolved.officialSources,
        identityRuleset: FL_STATE_UNRESOLVED_RESOLUTION_INTERNAL_V1_DRAFT,
        qaStatus: 'READY',
        intendedPublicationState: 'INGESTED',
        intendedIndexable: false,
        contactObservationDisposition: 'FUTURE_ATTACH_ELIGIBLE',
        rollbackOp: 'DELETE_INGESTED_COMPANY',
      });
    }
  }

  const linkReady = readyOps.filter((o) => o.op === 'LINK_EXISTING_CANONICAL');
  const insertReady = readyOps.filter((o) => o.op === 'INSERT_NEW_CANONICAL');
  const draftHash = hashUnresolvedDraft(
    readyOps.map((o) => ({
      op: String(o.op),
      fdacsIm: String(o.fdacsIm),
      companyId: o.canonicalCompanyId ? String(o.canonicalCompanyId) : null,
      proposedCompanyId: o.proposedCompanyId ? String(o.proposedCompanyId) : null,
    }))
  );
  const sim = simulateCoverage({
    active: 1098,
    represented: 930,
    linkReady: linkReady.length,
    insertReady: insertReady.length,
    noLongerActive: tally.NO_LONGER_ACTIVE,
  });
  const contract = simulatedNewCompanyContract();

  const contacts = { phone: 0, email: 0, address: 0 };
  for (const op of readyOps) {
    const im = String(op.fdacsIm);
    const s = byIm.get(im);
    if (s?.phone) contacts.phone += 1;
    if (s?.email) contacts.email += 1;
    if (s?.physicalAddress) contacts.address += 1;
  }

  const idx = [
    await probe('/companies/allied-van-lines'),
    await probe('/companies/united-van-lines'),
    await probe('/companies/mayflower-transit'),
  ];

  const byPrior: Record<string, Record<string, number>> = {};
  for (const row of classified) {
    const p = String(row.prior);
    const t = String(row.terminal);
    byPrior[p] = byPrior[p] ?? {};
    byPrior[p][t] = (byPrior[p][t] ?? 0) + 1;
  }

  const nextEvidence: Record<string, { count: number; next: string; likelihood: string }> = {
    INSUFFICIENT_OFFICIAL_EVIDENCE: {
      count: holdCounts.INSUFFICIENT_OFFICIAL_EVIDENCE ?? 0,
      next: 'Florida Sunbiz / Division of Corporations exact entity number + FDACS legal name',
      likelihood: 'MEDIUM',
    },
    FRANCHISE_OR_NETWORK_BRAND: {
      count: holdCounts.FRANCHISE_OR_NETWORK_BRAND ?? 0,
      next: 'Official franchisee entity filings, not brand pages',
      likelihood: 'LOW',
    },
    LEGAL_FORM_CONFLICT: {
      count: holdCounts.LEGAL_FORM_CONFLICT ?? 0,
      next: 'Sunbiz articles showing conversion vs separate entities',
      likelihood: 'LOW',
    },
    STALE_STATUS: {
      count: holdCounts.STALE_STATUS ?? 0,
      next: 'Official FDACS live license lookup (not a new paid bulk extract)',
      likelihood: 'HIGH',
    },
    MULTIPLE_CANONICAL_CANDIDATES: {
      count: holdCounts.MULTIPLE_CANONICAL_CANDIDATES ?? 0,
      next: 'Exact legal name + official phone/address corroboration',
      likelihood: 'MEDIUM',
    },
  };

  writeJson(resolve(DOCS(), 'task-fl-011f-current-main-baseline.json'), {
    google_places_requests: 0,
    origin_main: '0dfe69e8f166df9dd9d1764633d52ca3972eb101',
    production_sha: prodSha,
    sha_match: prodSha.startsWith('0dfe69e8') ? 'YES' : 'NO',
    latest_builder1_pr: 80,
    latest_builder2_pr: 81,
    freeze: freeze.rows[0],
    retrieved_at: retrievedAt,
  });
  writeJson(resolve(DATA(), 'fl-011f-unresolved-active-im-v1.json'), {
    google_places_requests: 0,
    snapshot: FL_STATE_UNRESOLVED_ACTIVE_IM_V1,
    n: starting.length,
    historical: FL_011E_UNRESOLVED_HISTORICAL,
    rows: starting,
  });
  writeJson(resolve(DOCS(), 'task-fl-011f-unresolved-168-starting-snapshot.json'), {
    google_places_requests: 0,
    n: starting.length,
    by_prior: {
      POSSIBLE_DUPLICATE: priorDup.length,
      CORPORATE_FAMILY_REVIEW: priorFam.length,
      CONFLICT: priorConflict.length,
      SOURCE_STATUS_BLOCKED: priorBlocked.length,
    },
  });
  writeJson(resolve(DOCS(), 'task-fl-011f-possible-duplicate-resolution.json'), {
    google_places_requests: 0,
    from_prior: 'POSSIBLE_DUPLICATE',
    results: byPrior.POSSIBLE_DUPLICATE ?? {},
  });
  writeJson(resolve(DOCS(), 'task-fl-011f-corporate-family-resolution.json'), {
    google_places_requests: 0,
    results: byPrior.CORPORATE_FAMILY_REVIEW ?? {},
  });
  writeJson(resolve(DOCS(), 'task-fl-011f-conflict-resolution.json'), {
    google_places_requests: 0,
    results: byPrior.CONFLICT ?? {},
  });
  writeJson(resolve(DOCS(), 'task-fl-011f-status-blocked-refresh.json'), {
    google_places_requests: 0,
    historical: ['IM2994', 'IM2933', 'IM1865'],
    results: byPrior.SOURCE_STATUS_BLOCKED ?? {},
  });
  writeJson(resolve(DOCS(), 'task-fl-011f-official-evidence-provenance.json'), {
    google_places_requests: 0,
    n: provenance.length,
    sources_used: ['FDACS_COMMITTED_SNAPSHOT', 'MTH_CANONICAL_COMPANY_READ', 'FMCSA_USDOT_ON_COMPANY_ROW_IF_PRESENT'],
    sunbiz_bulk_html_not_scraped: true,
    note: 'Sunbiz was not bulk-scraped; fail-closed identity uses FDACS + live canonical rows + legal-form rules. Corporation-ID linkage is accepted in unit tests but not invented without a retrieved filing number.',
    rows: provenance.slice(0, 8),
  });
  writeJson(resolve(DOCS(), 'task-fl-011f-existing-canonical-link-ready.json'), {
    google_places_requests: 0,
    n: linkReady.length,
    rows: linkReady,
  });
  writeJson(resolve(DOCS(), 'task-fl-011f-new-canonical-company-ready.json'), {
    google_places_requests: 0,
    n: insertReady.length,
    simulated: contract,
    rows: insertReady,
  });
  writeJson(resolve(DOCS(), 'task-fl-011f-remaining-unresolved.json'), {
    google_places_requests: 0,
    tally,
    remaining:
      tally.REMAINS_POSSIBLE_DUPLICATE +
      tally.REMAINS_CORPORATE_FAMILY_REVIEW +
      tally.CONFLICT_REMAINS +
      tally.SOURCE_STATUS_BLOCKED +
      tally.OTHER_REVIEW_REQUIRED,
  });
  writeJson(resolve(DATA(), 'fl-011f-unresolved-resolution-ready-pool.json'), {
    google_places_requests: 0,
    pool: FL_STATE_UNRESOLVED_RESOLUTION_READY_POOL_V1,
    link: linkReady.length,
    insert: insertReady.length,
    total: readyOps.length,
    apply: false,
  });
  writeJson(resolve(DATA(), 'fl-011f-unresolved-resolution-internal-draft.json'), {
    google_places_requests: 0,
    waveId: FL_STATE_UNRESOLVED_RESOLUTION_INTERNAL_V1_DRAFT,
    apply: false,
    hash: draftHash,
    link_count: linkReady.length,
    insert_count: insertReady.length,
    total: readyOps.length,
    intendedPublicationStateNew: 'INGESTED',
    intendedIndexableNew: false,
    operations: readyOps,
  });
  writeJson(resolve(DOCS(), 'task-fl-011f-resolution-ready-pool.json'), {
    google_places_requests: 0,
    link: linkReady.length,
    insert: insertReady.length,
    total: readyOps.length,
  });
  writeJson(resolve(DOCS(), 'task-fl-011f-unresolved-resolution-internal-draft.json'), {
    google_places_requests: 0,
    hash: draftHash,
    apply: false,
    link: linkReady.length,
    insert: insertReady.length,
    total: readyOps.length,
  });
  writeJson(resolve(DOCS(), 'task-fl-011f-contact-observation-summary.json'), {
    google_places_requests: 0,
    SOURCE_OBSERVED: contacts,
    FUTURE_ATTACH_ELIGIBLE: contacts,
    CANONICAL_PROMOTION: 0,
  });
  writeJson(resolve(DOCS(), 'task-fl-011f-simulated-coverage-impact.json'), {
    google_places_requests: 0,
    current: { active: 1098, represented: 930, unresolved: 168, coverage: 84.7 },
    simulated: sim,
  });
  writeJson(resolve(DOCS(), 'task-fl-011f-coverage-ceiling-analysis.json'), {
    google_places_requests: 0,
    MAX_SAFE_CURRENT_COVERAGE: sim.simulatedCoverage,
    remaining_possible_duplicates: tally.REMAINS_POSSIBLE_DUPLICATE,
    remaining_corporate_family: tally.REMAINS_CORPORATE_FAMILY_REVIEW,
    remaining_conflicts: tally.CONFLICT_REMAINS,
    remaining_status_blocked: tally.SOURCE_STATUS_BLOCKED,
    remaining_other: tally.OTHER_REVIEW_REQUIRED,
  });
  writeJson(resolve(DOCS(), 'task-fl-011f-remaining-effort-analysis.json'), {
    google_places_requests: 0,
    categories: nextEvidence,
  });
  writeJson(resolve(DOCS(), 'task-fl-011f-public-link-safety-simulation.json'), {
    google_places_requests: 0,
    new_public_fdacs_chrome: 0,
    publication_gate_remediation_required: classified.filter((r) => r.publicationGateRemediationRequired).length,
    indexable_sample: idx,
  });
  writeJson(resolve(DOCS(), 'task-fl-011f-wave2-freeze.json'), {
    google_places_requests: 0,
    ready_pool: 720,
    draft: 50,
    hash: 'a5d15f3dca32a59a',
    apply: false,
  });
  writeJson(resolve(DOCS(), 'task-fl-011f-builder2-freeze.json'), {
    google_places_requests: 0,
    provider_county_credential: countyN,
    by_program: countyBy,
    county_writes: 0,
  });
  writeJson(resolve(LEDGER(), 'fl-011f-state-impact-discovered-delta.json'), {
    google_places_requests: 0,
    layer: 'DISCOVERED / READY_FOR_INTERNAL_APPLY',
    not_realized: true,
    current_active: 1098,
    current_represented: 930,
    current_unresolved: 168,
    new_safe_link_candidates: linkReady.length,
    new_safe_insert_candidates: insertReady.length,
    newly_inactive: tally.NO_LONGER_ACTIVE,
    remaining_unresolved:
      tally.REMAINS_POSSIBLE_DUPLICATE +
      tally.REMAINS_CORPORATE_FAMILY_REVIEW +
      tally.CONFLICT_REMAINS +
      tally.SOURCE_STATUS_BLOCKED +
      tally.OTHER_REVIEW_REQUIRED,
    emails_observed_among_safe: contacts.email,
    phones_observed_among_safe: contacts.phone,
    addresses_observed_among_safe: contacts.address,
    production_changes: 0,
    public_changes: 0,
  });
  const summary = {
    google_places_requests: FL_011F_GOOGLE_PLACES_REQUESTS,
    production_db_writes: FL_011F_PRODUCTION_WRITES,
    task: FL_011F_TASK,
    starting: starting.length,
    tally,
    ready: { link: linkReady.length, insert: insertReady.length, total: readyOps.length, hash: draftHash, apply: false },
    simulated: sim,
    production_sha: prodSha,
  };
  writeJson(resolve(DOCS(), 'task-fl-011f-readiness-summary.json'), summary);
  writeJson(resolve(DOCS(), 'task-fl-011f-state-impact-discovered-delta.json'), {
    google_places_requests: 0,
    ...summary.ready,
  });
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e).replace(/postgresql:\/\/[^@]+@/, 'postgresql://***@'));
  process.exit(1);
});
