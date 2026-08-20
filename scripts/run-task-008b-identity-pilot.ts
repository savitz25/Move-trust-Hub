/**
 * Task 008B — SAME_NAME_DIFFERENT_LOCATION identity-review pilot.
 * Reviews up to 200 records. Never publishes companies. Never calls Google Places.
 *
 * npx tsx scripts/run-task-008b-identity-pilot.ts --dry-run
 * npx tsx scripts/run-task-008b-identity-pilot.ts
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { classifyIdentityReview } from '../lib/federal-hhg/identity-review';
import {
  PILOT_CATEGORY,
  PILOT_ID,
  PILOT_LIMIT,
  findSimilarCompanies,
  independentlyConfirmDistinct,
  normalizeLegalCore,
  parseHeadquarters,
  resolveIdentityPilot,
  selectIdentityReviewPilot,
  type ExistingIdentity,
  type IdentityResolution,
  type PilotCandidate,
} from '../lib/federal-hhg/identity-review-pilot';
import { normalizeMc, normalizeUsdot } from '../lib/federal-hhg/normalize';
import { WAVE_2_PUBLICATION_ID, WAVE_3_PUBLICATION_ID, WAVE_ID } from '../lib/federal-hhg/wave-eligibility';

const SOURCE = 'FMCSA L&I carrier file (data.transportation.gov/6eyk-hxee)';
const RUN_ID = 'task-008b-2026-08';

function loadEnv() {
  for (const file of ['.env.local', '.env.production.local']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const raw of readFileSync(path, 'utf8').split('\n')) {
      const match = raw.trim().match(/^([^#=]+)=(.*)$/);
      if (!match) continue;
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
      if (!process.env.DATABASE_URL && /^postgres/.test(value)) process.env.DATABASE_URL = value;
    }
  }
}

function exactName(candidate: { legalName: string; dbaName: string | null }, existing: ExistingIdentity) {
  const cores = [normalizeLegalCore(candidate.legalName), normalizeLegalCore(candidate.dbaName)].filter(Boolean);
  const against = [normalizeLegalCore(existing.name), normalizeLegalCore(existing.legalName)].filter(Boolean);
  return cores.some((core) => against.includes(core));
}

async function main() {
  loadEnv();
  const dry = process.argv.includes('--dry-run');
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('BLOCKED — DATABASE ACCESS');
  const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const before = await client.query(`
    SELECT
      (SELECT count(*)::int FROM companies) AS companies,
      (SELECT count(*) FILTER (WHERE indexable)::int FROM companies) AS indexable,
      (SELECT count(*)::int FROM federal_hhg_wave_publication WHERE wave_id=$1 AND status<>'unpublished') AS wave1,
      (SELECT count(*)::int FROM federal_hhg_wave_publication WHERE wave_id=$2 AND status<>'unpublished') AS wave2,
      (SELECT count(*)::int FROM federal_hhg_wave_publication WHERE wave_id=$3 AND status<>'unpublished') AS wave3
  `, [WAVE_ID, WAVE_2_PUBLICATION_ID, WAVE_3_PUBLICATION_ID]);

  const companies = await client.query(`
    SELECT id, slug, name, usdot_number, mc_number, headquarters, phone, physical_address, fmcsa_legal_name
      FROM companies
  `);
  const review = await client.query(`
    SELECT usdot, mc, legal_name, dba_name, phy_city, phy_state, phone, classification, disposition,
           match_reason, matched_company_id, hhg_carrier_verified, hhg_broker_verified, source, retrieved_at
      FROM federal_hhg_staging
     WHERE disposition = 'IDENTITY_REVIEW_REQUIRED'
       AND classification IN ('HHG_CARRIER','HHG_BROKER','HHG_CARRIER_BROKER')
  `);
  const stagingRun = await client.query(
    `SELECT source, source_updated_at, google_places_requests FROM federal_hhg_staging_run ORDER BY started_at DESC LIMIT 1`
  );
  const companyRows = companies.rows;
  const reviewRows = review.rows;
  const stagingRunRow = stagingRun.rows[0] ?? null;
  const beforeRow = before.rows[0];
  await client.end();

  const existing: ExistingIdentity[] = (
    companyRows as Array<{
      id: string;
      slug: string;
      name: string;
      usdot_number: string | null;
      mc_number: string | null;
      headquarters: string | null;
      phone: string | null;
      physical_address: string | null;
      fmcsa_legal_name: string | null;
    }>
  ).map((row) => {
    const hq = parseHeadquarters(row.headquarters);
    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      usdot: normalizeUsdot(row.usdot_number ?? ''),
      mc: normalizeMc(row.mc_number ?? ''),
      city: hq.city,
      state: hq.state,
      phone: row.phone ?? '',
      legalName: row.fmcsa_legal_name,
      physicalAddress: row.physical_address,
    };
  });
  const existingById = new Map(existing.map((row) => [row.id, row]));
  const universe = {
    existingUsdots: new Set(existing.map((row) => row.usdot).filter(Boolean)),
    existingMcs: new Set(existing.map((row) => row.mc).filter(Boolean)),
  };

  const categories: Record<string, number> = {};
  const queues: Record<string, number> = {};
  const pool: Array<
    PilotCandidate & {
      state: string;
      exactName: boolean;
      retrievedAt: string | null;
      source: string;
      category: string;
      selectionReason: string;
    }
  > = [];

  for (const row of reviewRows as Array<{
    usdot: string;
    mc: string | null;
    legal_name: string | null;
    dba_name: string | null;
    phy_city: string | null;
    phy_state: string | null;
    phone: string | null;
    classification: string;
    disposition: string;
    match_reason: string | null;
    matched_company_id: string | null;
    hhg_carrier_verified: boolean;
    hhg_broker_verified: boolean;
    source: string;
    retrieved_at: Date | string | null;
  }>) {
    const similar = findSimilarCompanies(row.legal_name ?? '', row.dba_name, existing);
    const preferred = row.matched_company_id ? existingById.get(row.matched_company_id) : undefined;
    const matched = preferred && similar.some((item) => item.id === preferred.id)
      ? [preferred, ...similar.filter((item) => item.id !== preferred.id)]
      : [...similar].sort((a, b) => a.usdot.localeCompare(b.usdot, 'en'));
    const primary = matched[0];
    const triage = classifyIdentityReview({
      matchReason: row.match_reason,
      legalName: row.legal_name,
      dbaName: row.dba_name,
      phyCity: row.phy_city,
      phyState: row.phy_state,
      existingName: primary?.name,
      existingCity: primary?.city,
      existingState: primary?.state,
    });
    categories[triage.category] = (categories[triage.category] ?? 0) + 1;
    queues[triage.queue] = (queues[triage.queue] ?? 0) + 1;
    const sameLocationHit = matched.some(
      (item) =>
        item.city &&
        item.state &&
        item.city.trim().toLowerCase() === (row.phy_city ?? '').trim().toLowerCase() &&
        item.state.trim().toUpperCase() === (row.phy_state ?? '').trim().toUpperCase()
    );
    if (triage.category !== PILOT_CATEGORY || !primary || sameLocationHit) continue;
    pool.push({
      usdot: normalizeUsdot(row.usdot),
      mc: row.mc,
      legalName: row.legal_name ?? '',
      dbaName: row.dba_name,
      city: row.phy_city ?? '',
      state: (row.phy_state ?? '').trim().toUpperCase(),
      phone: row.phone,
      classification: row.classification,
      disposition: row.disposition,
      matchReason: row.match_reason,
      hhgCarrierVerified: row.hhg_carrier_verified,
      hhgBrokerVerified: row.hhg_broker_verified,
      matchedExisting: matched,
      exactName: exactName({ legalName: row.legal_name ?? '', dbaName: row.dba_name }, primary),
      retrievedAt: row.retrieved_at ? new Date(row.retrieved_at).toISOString() : null,
      source: row.source,
      category: triage.category,
      selectionReason: 'deterministic_same_name_different_location_round_robin_state_role_name',
    });
  }

  const selected = selectIdentityReviewPilot(pool, PILOT_LIMIT);
  const outcomes: Record<IdentityResolution, number> = {
    RESOLVED_DISTINCT: 0,
    REMAIN_REVIEW_REQUIRED: 0,
    BRAND_OR_FRANCHISE_REVIEW: 0,
    POSSIBLE_SUCCESSOR_PREDECESSOR: 0,
    POSSIBLE_DUPLICATE: 0,
    LEGAL_ENTITY_CONFLICT: 0,
  };
  const reviewed = selected.map((row, index) => {
    const result = resolveIdentityPilot(row, universe);
    outcomes[result.resolution] += 1;
    const primary =
      row.matchedExisting.find((item) => item.id === result.matchedCompanyId) ?? row.matchedExisting[0]!;
    return {
      wave_id: PILOT_ID,
      status: 'pilot',
      selection_rank: index + 1,
      selection_reason: row.selectionReason,
      usdot: row.usdot,
      mc: row.mc,
      classification: row.classification,
      legal_name: row.legalName,
      dba_name: row.dbaName,
      city: row.city,
      state: row.state,
      phone: row.phone,
      current_review_category: row.category,
      current_match_reason: row.matchReason,
      matched_existing_company_id: primary.id,
      matched_existing_company_slug: primary.slug,
      matched_existing_usdot: primary.usdot,
      matched_existing_public_name: primary.name,
      matched_existing_hq: `${primary.city}, ${primary.state}`,
      original_disposition: row.disposition,
      resolution: result.resolution,
      resolution_confidence: result.confidence,
      eligible_for_canonicalization: result.eligibleForCanonicalization,
      public: false,
      indexable: false,
      auto_merge: false,
      evidence: result.reasons,
      source: row.source || SOURCE,
      retrieved_at: row.retrievedAt,
    };
  });

  const resolved = reviewed.filter((row) => row.resolution === 'RESOLVED_DISTINCT');
  const validationPool = [...resolved].sort((a, b) => a.usdot.localeCompare(b.usdot, 'en'));
  const validationSample: typeof reviewed = [];
  const byState = new Map<string, typeof reviewed>();
  for (const row of validationPool) {
    byState.set(row.state, [...(byState.get(row.state) ?? []), row]);
  }
  const states = [...byState.keys()].sort();
  let i = 0;
  let idle = 0;
  while (validationSample.length < Math.min(50, validationPool.length) && states.length && idle < states.length) {
    const state = states[i % states.length]!;
    i += 1;
    const bucket = byState.get(state) ?? [];
    const next = bucket.shift();
    if (!next) {
      idle += 1;
      continue;
    }
    validationSample.push(next);
    idle = 0;
  }
  const selectedByUsdot = new Map(selected.map((row) => [row.usdot, row]));
  const validation = validationSample.map((row) => {
    const candidate = selectedByUsdot.get(row.usdot)!;
    const audit = independentlyConfirmDistinct(candidate, universe);
    return { usdot: row.usdot, state: row.state, ok: audit.ok, failures: audit.failures };
  });
  const falsePositives = validation.filter((row) => !row.ok);

  const write = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await write.connect();
  if (!dry) {
    await write.query(`
      CREATE TABLE IF NOT EXISTS public.federal_hhg_identity_resolution (
        usdot text PRIMARY KEY,
        review_run_id text NOT NULL,
        original_disposition text NOT NULL,
        original_review_reason text,
        original_review_category text NOT NULL,
        matched_company_id text,
        matched_company_usdot text,
        matched_company_slug text,
        matched_company_name text,
        resolution text NOT NULL,
        resolution_confidence text NOT NULL,
        eligible_for_canonicalization boolean NOT NULL DEFAULT false,
        evidence_json jsonb NOT NULL DEFAULT '{}'::jsonb,
        source text NOT NULL,
        resolved_at timestamptz NOT NULL DEFAULT now()
      )
    `);
    await write.query(`REVOKE ALL ON public.federal_hhg_identity_resolution FROM anon, authenticated`);
    for (const row of reviewed) {
      await write.query(
        `INSERT INTO public.federal_hhg_identity_resolution (
           usdot, review_run_id, original_disposition, original_review_reason, original_review_category,
           matched_company_id, matched_company_usdot, matched_company_slug, matched_company_name,
           resolution, resolution_confidence, eligible_for_canonicalization, evidence_json, source
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13::jsonb,$14)
         ON CONFLICT (usdot) DO UPDATE SET
           review_run_id = EXCLUDED.review_run_id,
           resolution = EXCLUDED.resolution,
           resolution_confidence = EXCLUDED.resolution_confidence,
           eligible_for_canonicalization = EXCLUDED.eligible_for_canonicalization,
           evidence_json = EXCLUDED.evidence_json,
           resolved_at = now()`,
        [
          row.usdot,
          RUN_ID,
          row.original_disposition,
          row.current_match_reason,
          row.current_review_category,
          row.matched_existing_company_id,
          row.matched_existing_usdot,
          row.matched_existing_company_slug,
          row.matched_existing_public_name,
          row.resolution,
          row.resolution_confidence,
          row.eligible_for_canonicalization,
          JSON.stringify({
            reasons: row.evidence,
            public: false,
            indexable: false,
            auto_merge: false,
            selection_rank: row.selection_rank,
          }),
          SOURCE,
        ]
      );
    }
  }

  const overlayExists = await write.query(
    `SELECT to_regclass('public.federal_hhg_identity_resolution') IS NOT NULL AS present`
  );
  const overlayCount = overlayExists.rows[0]?.present
    ? await write.query(
        `SELECT count(*)::int AS n FROM federal_hhg_identity_resolution WHERE review_run_id=$1`,
        [RUN_ID]
      )
    : { rows: [{ n: 0 }] };
  const after = await write.query(`
    SELECT
      (SELECT count(*)::int FROM companies) AS companies,
      (SELECT count(*) FILTER (WHERE indexable)::int FROM companies) AS indexable,
      (SELECT count(*)::int FROM federal_hhg_wave_publication WHERE wave_id=$1 AND status<>'unpublished') AS wave1,
      (SELECT count(*)::int FROM federal_hhg_wave_publication WHERE wave_id=$2 AND status<>'unpublished') AS wave2,
      (SELECT count(*)::int FROM federal_hhg_wave_publication WHERE wave_id=$3 AND status<>'unpublished') AS wave3,
      (SELECT count(*)::int FROM federal_hhg_staging WHERE disposition='IDENTITY_REVIEW_REQUIRED'
         AND classification IN ('HHG_CARRIER','HHG_BROKER','HHG_CARRIER_BROKER')) AS review_required
  `, [WAVE_ID, WAVE_2_PUBLICATION_ID, WAVE_3_PUBLICATION_ID]);
  const afterRow = { ...after.rows[0], overlay_rows: overlayCount.rows[0].n };
  await write.end();

  const byRole = {
    carrier: selected.filter((r) => r.classification === 'HHG_CARRIER').length,
    broker: selected.filter((r) => r.classification === 'HHG_BROKER').length,
    dual: selected.filter((r) => r.classification === 'HHG_CARRIER_BROKER').length,
  };
  const report = {
    google_places_requests: 0,
    dry,
    pilot_id: PILOT_ID,
    publish: false,
    before: beforeRow,
    after: afterRow,
    staging_run: stagingRunRow,
    review_population: {
      total: reviewRows.length,
      categories,
      queues,
    },
    selected: {
      target: PILOT_LIMIT,
      actual: selected.length,
      states: new Set(selected.map((r) => r.state)).size,
      ...byRole,
      method: 'deterministic_round_robin_state_role_exact_vs_near_name',
    },
    outcomes,
    validation: {
      resolved: resolved.length,
      sample: validation.length,
      correct: validation.filter((r) => r.ok).length,
      false_positives: falsePositives.length,
      failures: falsePositives,
    },
    candidates: reviewed,
  };
  writeFileSync(
    resolve(process.cwd(), 'docs/task-008b-identity-review-pilot.json'),
    JSON.stringify(report, null, 2) + '\n'
  );
  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        dry,
        review_total: reviewRows.length,
        categories,
        selected: report.selected,
        outcomes,
        validation: report.validation,
        before: beforeRow,
        after: afterRow,
        new_public_profiles: 0,
        new_indexable_profiles: 0,
      },
      null,
      2
    )
  );
  const b = beforeRow;
  const a = afterRow;
  if (falsePositives.length) process.exit(1);
  if (a.companies !== b.companies || a.indexable !== b.indexable) process.exit(1);
  if (a.wave1 !== 1000 || a.wave2 !== 1274 || a.wave3 !== 1279) process.exit(1);
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e).replace(/postgresql:\/\/[^@]+@/, 'postgresql://***@'));
  process.exit(1);
});
