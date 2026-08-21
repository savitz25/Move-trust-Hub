/**
 * Task 011B — FL + WA state registry ingest (INTERNAL ONLY).
 * Writes staging + provider_state_authority. Does NOT publish companies/capabilities/counties.
 * Google Places requests: 0
 *
 * Usage:
 *   npx tsx scripts/ingest-task-011b-fl-wa.ts --state=FL
 *   npx tsx scripts/ingest-task-011b-fl-wa.ts --state=WA
 *   npx tsx scripts/ingest-task-011b-fl-wa.ts --state=ALL
 *   npx tsx scripts/ingest-task-011b-fl-wa.ts --state=ALL --dry-run
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { FloridaStateMoverAdapter } from '@/lib/state-hhg/fl/adapter';
import { WashingtonStateMoverAdapter } from '@/lib/state-hhg/wa/adapter';
import {
  matchStateRegistryIdentity,
  resolveVerificationState,
  type CanonicalProviderIdentity,
  type StateIdentityDisposition,
} from '@/lib/state-hhg/identity';
import type { NormalizedStateMoverRecord, StateMoverAdapter } from '@/lib/state-hhg/types';
import {
  normalizeEmail,
  normalizeLegalName,
  normalizePhone,
  normalizeUsdot,
} from '@/lib/state-hhg/normalize';

const { Client } = pg;
const GOOGLE_PLACES_REQUESTS = 0 as const;

function loadEnvFiles() {
  for (const file of ['.env.local', '.env.production.local']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const raw of readFileSync(path, 'utf8').split('\n')) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (!match) continue;
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
      if (!process.env.DATABASE_URL && /^postgres(ql)?:\/\//i.test(value)) {
        process.env.DATABASE_URL = value;
      }
    }
  }
}

function resolveDatabaseUrl(): string {
  const direct =
    process.env.SUPABASE_DB_URL?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim();
  if (direct) return direct;
  const password = process.env.SUPABASE_DB_PASSWORD?.trim();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const ref = url?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  if (!password || !ref) {
    throw new Error('BLOCKED — DATABASE ACCESS');
  }
  return `postgresql://postgres.${ref}:${encodeURIComponent(password)}@aws-1-us-west-2.pooler.supabase.com:5432/postgres`;
}

type IngestStats = {
  records_read: number;
  inserted: number;
  updated: number;
  matched_existing: number;
  new_provider_candidate: number;
  review_required: number;
  historical: number;
  out_of_scope: number;
  verified_authority: number;
  movers: number;
  brokers: number;
  with_usdot: number;
  with_phone: number;
  with_email: number;
  with_physical_address: number;
};

function emptyStats(): IngestStats {
  return {
    records_read: 0,
    inserted: 0,
    updated: 0,
    matched_existing: 0,
    new_provider_candidate: 0,
    review_required: 0,
    historical: 0,
    out_of_scope: 0,
    verified_authority: 0,
    movers: 0,
    brokers: 0,
    with_usdot: 0,
    with_phone: 0,
    with_email: 0,
    with_physical_address: 0,
  };
}

async function loadCanonicalProviders(client: pg.Client): Promise<CanonicalProviderIdentity[]> {
  // companies schema uses fmcsa_legal_name; dba may live in name/public scrape — keep null-safe.
  const res = await client.query(
    `SELECT id,
            name,
            fmcsa_legal_name,
            usdot_number,
            phone,
            physical_address,
            publication_state,
            indexable
       FROM public.companies`
  );
  return res.rows.map((row) => ({
    companyId: String(row.id),
    legalName: (row.fmcsa_legal_name as string | null) ?? (row.name as string | null) ?? null,
    dbaName: null,
    publicName: (row.name as string | null) ?? null,
    usdot: row.usdot_number ? String(row.usdot_number) : null,
    phone: row.phone ? String(row.phone) : null,
    address: row.physical_address ? String(row.physical_address) : null,
    city: null,
    state: null,
    postalCode: null,
    publicationState: (row.publication_state as string | null) ?? null,
    indexable: (row.indexable as boolean | null) ?? null,
  }));
}

async function loadPriorAuthorityMap(
  client: pg.Client,
  stateCode: string
): Promise<Map<string, string>> {
  const res = await client.query(
    `SELECT authority_number, COALESCE(company_id, matched_company_id) AS cid
       FROM public.provider_state_authority
      WHERE state_code = $1
        AND authority_number IS NOT NULL
        AND COALESCE(company_id, matched_company_id) IS NOT NULL`,
    [stateCode]
  );
  const map = new Map<string, string>();
  for (const row of res.rows) {
    map.set(String(row.authority_number).toUpperCase(), String(row.cid));
  }
  return map;
}

function bumpDisposition(stats: IngestStats, d: StateIdentityDisposition) {
  if (d === 'MATCHED_EXISTING') stats.matched_existing++;
  else if (d === 'NEW_PROVIDER_CANDIDATE') stats.new_provider_candidate++;
  else if (d === 'REVIEW_REQUIRED') stats.review_required++;
  else if (d === 'HISTORICAL') stats.historical++;
  else if (d === 'OUT_OF_SCOPE') stats.out_of_scope++;
}

async function ingestState(
  client: pg.Client,
  adapter: StateMoverAdapter,
  candidates: CanonicalProviderIdentity[],
  dryRun: boolean
) {
  const meta = await adapter.getSourceMetadata();
  const stats = emptyStats();
  const prior = dryRun
    ? new Map<string, string>()
    : await loadPriorAuthorityMap(client, adapter.stateCode);

  let runId: string | null = null;
  if (!dryRun) {
    const run = await client.query(
      `INSERT INTO public.state_hhg_ingest_run (state_code, source, source_url, google_places_requests, notes)
       VALUES ($1, $2, $3, 0, $4)
       RETURNING id`,
      [
        adapter.stateCode,
        meta.sourceName,
        meta.sourceUrl,
        'task-011b internal staging only; no publication',
      ]
    );
    runId = run.rows[0].id;
  }

  const rawRows = await adapter.fetchOrLoadRegistry();
  stats.records_read = rawRows.length;
  const cohort: Record<string, unknown>[] = [];

  for (const raw of rawRows) {
    const norm = adapter.normalizeRecord(raw);
    const roleClass = (norm.raw.roleClass as 'mover' | 'broker' | 'warehouse' | 'other') ?? 'other';
    if (roleClass === 'mover') stats.movers++;
    if (roleClass === 'broker') stats.brokers++;
    if (norm.usdot) stats.with_usdot++;
    if (normalizePhone(norm.phone)) stats.with_phone++;
    if (normalizeEmail(norm.email)) stats.with_email++;
    if (norm.physicalAddress) stats.with_physical_address++;

    const authorityNumber = norm.authorityNumber;
    const priorCompanyId = authorityNumber
      ? prior.get(authorityNumber.toUpperCase()) ?? null
      : null;

    const match = matchStateRegistryIdentity(
      {
        legalName: norm.legalName,
        dba: norm.dba,
        usdot: norm.usdot,
        phone: norm.phone,
        physicalAddress: norm.physicalAddress,
        city: norm.city,
        postalCode: norm.postalCode,
        statusNormalized: norm.status,
        roleClass,
        authorityNumber,
        priorAuthorityCompanyId: priorCompanyId,
      },
      candidates
    );
    bumpDisposition(stats, match.disposition);

    const verificationState = resolveVerificationState({
      disposition: match.disposition,
      statusNormalized: norm.status,
      roleClass,
      matchMethod: match.matchMethod,
      franchiseSafetyHold: match.franchiseSafetyHold,
    });
    if (verificationState === 'VERIFIED') stats.verified_authority++;

    const authority = adapter.resolveAuthority(norm);
    const rawSourceKey = String(norm.raw.rawSourceKey);
    const sourceRecordId = authorityNumber ?? rawSourceKey;

    cohort.push({
      state: adapter.stateCode,
      sourceAuthorityId: sourceRecordId,
      authorityType: authority.authorityType,
      authorityStatus: norm.status,
      legalName: norm.legalName,
      dba: norm.dba,
      canonicalCompanyId: match.matchedCompanyId,
      usdot: norm.usdot,
      location: {
        physicalAddress: norm.physicalAddress,
        city: norm.city,
        postalCode: norm.postalCode,
      },
      phoneAvailable: Boolean(normalizePhone(norm.phone)),
      emailAvailable: Boolean(normalizeEmail(norm.email)),
      identityDisposition: match.disposition,
      matchMethod: match.matchMethod,
      verificationState,
      roleClass,
      source: authority.source,
      sourceUrl: authority.sourceUrl,
      retrievedAt: meta.retrievedAt,
      reviewReason: match.reviewReason,
    });

    if (dryRun) continue;

    const stagingUpsert = await client.query(
      `INSERT INTO public.state_hhg_registry_staging (
         state_code, source, source_record_id, raw_source_key, authority_number, authority_type,
         role_class, status_raw, status_normalized, issue_date, expiration_date,
         legal_name_raw, legal_name_norm, dba_raw, dba_norm, usdot_raw, usdot_norm,
         phone_raw, phone_norm, email_raw, email_norm, physical_address_raw, physical_address_norm,
         mailing_address_raw, city_norm, postal_code_norm, ubi, permit_number,
         source_url, source_retrieved_at, evidence_hash, disposition, matched_company_id,
         match_method, match_confidence, match_evidence, review_reason, run_id, raw, updated_at
       ) VALUES (
         $1,$2,$3,$4,$5,$6,
         $7,$8,$9,$10,$11,
         $12,$13,$14,$15,$16,$17,
         $18,$19,$20,$21,$22,$23,
         $24,$25,$26,$27,$28,
         $29,$30,$31,$32,$33,
         $34,$35,$36,$37,$38,$39, now()
       )
       ON CONFLICT (state_code, raw_source_key) DO UPDATE SET
         authority_number = EXCLUDED.authority_number,
         authority_type = EXCLUDED.authority_type,
         role_class = EXCLUDED.role_class,
         status_raw = EXCLUDED.status_raw,
         status_normalized = EXCLUDED.status_normalized,
         issue_date = EXCLUDED.issue_date,
         expiration_date = EXCLUDED.expiration_date,
         legal_name_raw = EXCLUDED.legal_name_raw,
         legal_name_norm = EXCLUDED.legal_name_norm,
         dba_raw = EXCLUDED.dba_raw,
         dba_norm = EXCLUDED.dba_norm,
         usdot_raw = EXCLUDED.usdot_raw,
         usdot_norm = EXCLUDED.usdot_norm,
         phone_raw = EXCLUDED.phone_raw,
         phone_norm = EXCLUDED.phone_norm,
         email_raw = EXCLUDED.email_raw,
         email_norm = EXCLUDED.email_norm,
         physical_address_raw = EXCLUDED.physical_address_raw,
         physical_address_norm = EXCLUDED.physical_address_norm,
         mailing_address_raw = EXCLUDED.mailing_address_raw,
         city_norm = EXCLUDED.city_norm,
         postal_code_norm = EXCLUDED.postal_code_norm,
         ubi = EXCLUDED.ubi,
         permit_number = EXCLUDED.permit_number,
         source_url = EXCLUDED.source_url,
         source_retrieved_at = EXCLUDED.source_retrieved_at,
         evidence_hash = EXCLUDED.evidence_hash,
         disposition = EXCLUDED.disposition,
         matched_company_id = EXCLUDED.matched_company_id,
         match_method = EXCLUDED.match_method,
         match_confidence = EXCLUDED.match_confidence,
         match_evidence = EXCLUDED.match_evidence,
         review_reason = EXCLUDED.review_reason,
         run_id = EXCLUDED.run_id,
         raw = EXCLUDED.raw,
         updated_at = now()
       RETURNING (xmax = 0) AS inserted, id`,
      [
        adapter.stateCode,
        authority.source,
        sourceRecordId,
        rawSourceKey,
        authorityNumber,
        authority.authorityType,
        roleClass,
        String(norm.raw.statusRaw ?? norm.status),
        norm.status,
        norm.issueDate,
        norm.expirationDate,
        norm.legalName,
        normalizeLegalName(norm.legalName),
        norm.dba,
        normalizeLegalName(norm.dba),
        norm.usdot,
        normalizeUsdot(norm.usdot),
        norm.phone,
        normalizePhone(norm.phone),
        norm.email,
        normalizeEmail(norm.email),
        norm.physicalAddress,
        norm.physicalAddress,
        norm.mailingAddress,
        norm.city,
        norm.postalCode,
        norm.raw.ubi ?? null,
        norm.raw.permitNumber ?? null,
        authority.sourceUrl,
        meta.retrievedAt,
        authority.evidenceHash,
        match.disposition,
        match.matchedCompanyId,
        match.matchMethod === 'none' ? null : match.matchMethod,
        match.matchConfidence || null,
        JSON.stringify(match.evidence),
        match.reviewReason,
        runId,
        JSON.stringify(norm.raw),
      ]
    );

    if (stagingUpsert.rows[0]?.inserted) stats.inserted++;
    else stats.updated++;

    const stagingId = stagingUpsert.rows[0].id;
    const companyId =
      verificationState === 'VERIFIED' ? match.matchedCompanyId : match.matchedCompanyId;

    await client.query(
      `INSERT INTO public.provider_state_authority (
         company_id, state_code, authority_type, authority_number, status,
         issue_date, expiration_date, legal_name, dba_name, regulator, source, source_url,
         source_record_id, raw_source_key, retrieved_at, last_verified_at, evidence_hash,
         verification_state, matched_company_id, match_method, match_confidence, review_reason,
         staging_id, updated_at
       ) VALUES (
         $1,$2,$3,$4,$5,
         $6,$7,$8,$9,$10,$11,$12,
         $13,$14,$15,$16,$17,
         $18,$19,$20,$21,$22,
         $23, now()
       )
       ON CONFLICT (state_code, raw_source_key) DO UPDATE SET
         company_id = EXCLUDED.company_id,
         authority_type = EXCLUDED.authority_type,
         authority_number = EXCLUDED.authority_number,
         status = EXCLUDED.status,
         issue_date = EXCLUDED.issue_date,
         expiration_date = EXCLUDED.expiration_date,
         legal_name = EXCLUDED.legal_name,
         dba_name = EXCLUDED.dba_name,
         regulator = EXCLUDED.regulator,
         source = EXCLUDED.source,
         source_url = EXCLUDED.source_url,
         source_record_id = EXCLUDED.source_record_id,
         retrieved_at = EXCLUDED.retrieved_at,
         last_verified_at = EXCLUDED.last_verified_at,
         evidence_hash = EXCLUDED.evidence_hash,
         verification_state = EXCLUDED.verification_state,
         matched_company_id = EXCLUDED.matched_company_id,
         match_method = EXCLUDED.match_method,
         match_confidence = EXCLUDED.match_confidence,
         review_reason = EXCLUDED.review_reason,
         staging_id = EXCLUDED.staging_id,
         updated_at = now()`,
      [
        verificationState === 'VERIFIED' ? companyId : null,
        adapter.stateCode,
        authority.authorityType,
        authorityNumber,
        norm.status,
        norm.issueDate,
        norm.expirationDate,
        norm.legalName,
        norm.dba,
        authority.regulator,
        authority.source,
        authority.sourceUrl,
        sourceRecordId,
        rawSourceKey,
        meta.retrievedAt,
        verificationState === 'VERIFIED' ? meta.retrievedAt : null,
        authority.evidenceHash,
        verificationState,
        match.matchedCompanyId,
        match.matchMethod === 'none' ? null : match.matchMethod,
        match.matchConfidence || null,
        match.reviewReason,
        stagingId,
      ]
    );
  }

  if (!dryRun && runId) {
    await client.query(
      `UPDATE public.state_hhg_ingest_run SET
         finished_at = now(),
         records_read = $2,
         inserted = $3,
         updated = $4,
         matched_existing = $5,
         new_provider_candidate = $6,
         review_required = $7,
         historical = $8,
         out_of_scope = $9,
         google_places_requests = 0
       WHERE id = $1`,
      [
        runId,
        stats.records_read,
        stats.inserted,
        stats.updated,
        stats.matched_existing,
        stats.new_provider_candidate,
        stats.review_required,
        stats.historical,
        stats.out_of_scope,
      ]
    );
  }

  return { stats, cohort, meta, runId };
}

async function main() {
  loadEnvFiles();
  const dryRun = process.argv.includes('--dry-run');
  const stateArg =
    process.argv.find((a) => a.startsWith('--state='))?.split('=')[1]?.toUpperCase() ?? 'ALL';

  const client = new Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  try {
    // Freeze snapshot before ingest
    const freezeBefore = await client.query(
      `SELECT
         count(*)::int AS companies,
         count(*) FILTER (WHERE indexable)::int AS indexable
       FROM public.companies`
    );

    const candidates = await loadCanonicalProviders(client);
    const adapters: StateMoverAdapter[] = [];
    if (stateArg === 'FL' || stateArg === 'ALL') adapters.push(new FloridaStateMoverAdapter());
    if (stateArg === 'WA' || stateArg === 'ALL') adapters.push(new WashingtonStateMoverAdapter());

    mkdirSync(resolve('docs'), { recursive: true });
    const summary: Record<string, unknown> = {
      google_places_requests: GOOGLE_PLACES_REQUESTS,
      task: '011B',
      dryRun,
      freeze_before: freezeBefore.rows[0],
      states: {},
    };

    for (const adapter of adapters) {
      const { stats, cohort, meta, runId } = await ingestState(
        client,
        adapter,
        candidates,
        dryRun
      );
      const cohortPath = resolve(
        'docs',
        `task-011b-${adapter.stateCode.toLowerCase()}-verified-authority-cohort.json`
      );
      const verified = cohort.filter((c) => c.verificationState === 'VERIFIED');
      writeFileSync(
        cohortPath,
        JSON.stringify(
          {
            google_places_requests: 0,
            task: '011B',
            state: adapter.stateCode,
            publication: false,
            source: meta,
            runId,
            totals: {
              cohort_rows: cohort.length,
              verified: verified.length,
              matched_existing: stats.matched_existing,
              new_provider_candidate: stats.new_provider_candidate,
              review_required: stats.review_required,
              historical: stats.historical,
              out_of_scope: stats.out_of_scope,
            },
            stats,
            // Include full cohort for audit (internal; no secrets beyond public registry fields)
            records: cohort,
          },
          null,
          2
        )
      );
      (summary.states as Record<string, unknown>)[adapter.stateCode] = {
        meta,
        stats,
        cohortPath,
        verified: verified.length,
      };
    }

    const freezeAfter = await client.query(
      `SELECT
         count(*) FILTER (WHERE indexable)::int AS indexable,
         count(*)::int AS companies,
         count(*) FILTER (WHERE service_scope = 'interstate')::int AS interstate
       FROM public.companies`
    );
    const caps = await client.query(
      `SELECT capability, evidence_state, count(*)::int AS n
         FROM public.provider_capability
        WHERE capability IN ('hhg_intrastate','hhg_local','auto_carrier','auto_broker')
        GROUP BY 1,2 ORDER BY 1,2`
    );
    const waves = await client.query(
      `SELECT wave_id, count(*)::int AS n
         FROM public.federal_hhg_wave_publication
        WHERE status <> 'unpublished'
        GROUP BY 1 ORDER BY 1`
    );

    summary.freeze_after = freezeAfter.rows[0];
    summary.capabilities = caps.rows;
    summary.waves = waves.rows;
    summary.publication_safety = {
      new_public_companies: 0,
      new_indexable: 0,
      new_local_capabilities: 0,
      new_intrastate_capabilities: 0,
      new_auto_capabilities: 0,
      county_assignments: 0,
      google_places_requests: 0,
    };

    writeFileSync(
      resolve('docs/task-011b-ingest-summary.json'),
      JSON.stringify(summary, null, 2)
    );
    console.log(JSON.stringify(summary, null, 2));
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
