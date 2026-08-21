/**
 * Task FL-004 — controlled INTERNAL canonicalization of FL_HHG_PUBLICATION_V1.
 * publication_state=INGESTED, indexable=false. No public launch. Google Places: 0.
 *
 * npx tsx scripts/run-task-fl-004-canonicalization.ts --dry-run
 * npx tsx scripts/run-task-fl-004-canonicalization.ts --apply
 * npx tsx scripts/run-task-fl-004-canonicalization.ts --idempotency-check
 */
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { loadEnvFiles, resolveDatabaseUrl } from '../lib/state-hhg/calibration/db';
import { loadCanonicalUniverse } from '../lib/state-hhg/canonicalization/apply';
import { buildDisplayName } from '../lib/state-hhg/canonicalization/ids';
import { matchStateRegistryIdentity } from '../lib/state-hhg/identity';
import { hashEvidence, normalizeEmail, normalizePhone } from '../lib/state-hhg/normalize';
import { FDACS_LEGACY_LOOKUP_URL, fdacsRawSourceKey } from '../lib/state-hhg/fl/adapter';
import {
  FL_004_GOOGLE_PLACES_REQUESTS,
  FL_004_TASK,
  assertManifestBound,
  fl004PublicExposure,
  freezeFl004Manifest,
  hashFl004Manifest,
  intendedCompanyIdFor,
  type EligibilityRow,
  type Fl004ManifestRow,
} from '../lib/state-hhg/fl/fl-004';
import { loadExactCanaryManifests } from '../lib/state-hhg/canary/manifest';
import { LOCAL_CANARY_WAVE_ID } from '../lib/state-hhg/canary/types';

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const idempotencyCheck = args.includes('--idempotency-check');
const write = apply || idempotencyCheck;

async function freezeSnapshot(client: pg.Client) {
  const companies = await client.query(`
    SELECT
      count(*)::int AS companies,
      count(*) FILTER (WHERE indexable)::int AS indexable,
      count(*) FILTER (WHERE id ILIKE 'fl-im-%')::int AS fl_im_all,
      count(*) FILTER (WHERE id ILIKE 'fl-im-%' AND publication_state='INGESTED')::int AS fl_im_ingested,
      count(*) FILTER (WHERE id ILIKE 'fl-im-%' AND publication_state='PUBLISHABLE')::int AS fl_im_publishable,
      count(*) FILTER (WHERE publication_state='PUBLISHABLE')::int AS publishable,
      count(*) FILTER (WHERE publication_state='PUBLISHABLE' AND indexable=false)::int AS publishable_noindex
    FROM companies`);
  const fl = await client.query(`
    SELECT count(*)::int AS florida_all,
           count(*) FILTER (WHERE indexable)::int AS florida_indexable
      FROM companies
     WHERE id ILIKE 'fl-im-%'
        OR headquarters ~* '(^|,\\s*)FL\\s*$'
        OR headquarters ~* ',\\s*FL\\b'
        OR physical_address ~* '\\bFL\\s+\\d{5}\\b'`);
  const psa = await client.query(
    `SELECT count(*)::int AS n FROM provider_state_authority WHERE state_code='FL'`
  );
  const obs = await client.query(
    `SELECT count(*)::int AS n FROM provider_contact_observation WHERE regulator='FDACS'`
  );
  const canary = await client.query(
    `SELECT state_code, count(*)::int AS n
       FROM local_hhg_canary_publication
      WHERE wave_id=$1 AND status='published'
      GROUP BY 1`,
    [LOCAL_CANARY_WAVE_ID]
  );
  const canaryBy: Record<string, number> = {};
  for (const row of canary.rows) canaryBy[String(row.state_code)] = row.n;
  return {
    ...companies.rows[0],
    ...fl.rows[0],
    fl_psa: psa.rows[0].n,
    fdacs_observations: obs.rows[0].n,
    canary_fl: canaryBy.FL ?? 0,
    canary_wa: canaryBy.WA ?? 0,
    canary_total: (canaryBy.FL ?? 0) + (canaryBy.WA ?? 0),
  };
}

async function main() {
  loadEnvFiles();
  const retrievedAt = new Date().toISOString();
  const eligibilityPath = resolve(process.cwd(), 'data/state-hhg/fl/publication-eligibility-v1.json');
  const eligibilityDoc = JSON.parse(readFileSync(eligibilityPath, 'utf8')) as {
    rows: EligibilityRow[];
    ruleset_version?: string;
  };

  const client = new pg.Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  });
  await client.connect();

  const before = await freezeSnapshot(client);
  const universe = await loadCanonicalUniverse(client);
  const slugs = await client.query(`SELECT slug, id FROM companies`);
  const takenSlugs = new Set(slugs.rows.map((r: { slug: string }) => String(r.slug)));
  const takenIds = new Set(universe.takenIds);

  const plannedInsertIds = new Set(
    eligibilityDoc.rows
      .filter((r) => r.publication_status === 'PUBLICATION_READY')
      .map((r) => intendedCompanyIdFor(r.regulatory_id))
      .filter((id): id is string => Boolean(id))
  );
  const plannedSlugRows = plannedInsertIds.size
    ? await client.query(`SELECT slug FROM companies WHERE id = ANY($1::text[])`, [[...plannedInsertIds]])
    : { rows: [] as Array<{ slug: string }> };
  const plannedSlugs = new Set(plannedSlugRows.rows.map((r: { slug: string }) => String(r.slug)));
  const takenIdsForPlan = new Set([...takenIds].filter((id) => !plannedInsertIds.has(id)));
  const takenSlugsForPlan = new Set([...takenSlugs].filter((s) => !plannedSlugs.has(s)));
  const plannedRows = freezeFl004Manifest(eligibilityDoc.rows, {
    takenIds: takenIdsForPlan,
    takenSlugs: takenSlugsForPlan,
  });
  let rows = freezeFl004Manifest(eligibilityDoc.rows, { takenIds, takenSlugs });

  const providers = universe.providers;
  for (const row of rows) {
    if (row.action !== 'INSERT') continue;
    const match = matchStateRegistryIdentity(
      {
        legalName: row.legal_name,
        dba: row.dba,
        usdot: null,
        phone: row.phone,
        email: row.email,
        physicalAddress: row.physical_address,
        city: row.city,
        postalCode: row.zip,
        statusNormalized: 'active',
        roleClass: 'mover',
        authorityNumber: row.fdacs_im_number,
        priorAuthorityCompanyId: universe.priorAuthority.get(`FL|${row.fdacs_im_number}`) ?? null,
      },
      providers
    );
    if (match.disposition === 'MATCHED_EXISTING' && match.matchedCompanyId) {
      row.action = 'HOLD';
      row.hold_reason = `pre_write_collision:${match.matchMethod}:${match.matchedCompanyId}`;
      row.existing_company_id = match.matchedCompanyId;
    } else if (match.disposition === 'REVIEW_REQUIRED' || match.franchiseSafetyHold) {
      row.action = 'HOLD';
      row.hold_reason = match.reviewReason ?? 'pre_write_review_required';
    }
  }

  const insertRows = rows.filter((r) => r.action === 'INSERT');
  const linkRows = rows.filter((r) => r.action === 'LINK');
  const holdRows = rows.filter((r) => r.action === 'HOLD' || r.action === 'SKIP_ALREADY_CANONICAL');
  const allowedIds = insertRows.map((r) => r.intended_company_id);
  const bound = assertManifestBound(allowedIds, allowedIds);
  if (!bound.ok) throw new Error(`Manifest binding failed: ${bound.rejected.join(',')}`);

  const canary = loadExactCanaryManifests();
  const canaryOverlap = insertRows.filter((r) => canary.companyIds.includes(r.intended_company_id));
  if (canaryOverlap.length) {
    throw new Error(`REFUSAL — insert cohort overlaps canary: ${canaryOverlap.map((r) => r.intended_company_id).join(',')}`);
  }

  if (insertRows.length && insertRows.some((r) => r.indexable !== false || r.publication_state !== 'INGESTED')) {
    throw new Error('REFUSAL — indexable delta would not be 0');
  }

  const plannedInsertRows = plannedRows.filter((r) => r.action === 'INSERT');
  const hash = hashFl004Manifest(plannedRows);
  const staging = await client.query(
    `SELECT id, regulatory_id, authority_number, raw_source_key, source, source_url, issue_date, expiration_date
       FROM state_hhg_registry_staging WHERE state_code='FL'`
  );
  const stagingByAuth = new Map(
    staging.rows.map((r: { authority_number: string | null; raw_source_key: string; id: string }) => [
      String(r.authority_number ?? '').toUpperCase(),
      r,
    ])
  );

  const stats = {
    companies_inserted: 0,
    psa_upserted: 0,
    observations_attached: 0,
    links_written: 0,
    skipped_existing: 0,
  };

  if (write) {
    await client.query('BEGIN');
    try {
      for (const row of insertRows) {
        const st = stagingByAuth.get(row.fdacs_im_number);
        const display = buildDisplayName(row.legal_name, row.dba);
        const hq = [row.city, 'FL'].filter(Boolean).join(', ');
        const physical = [row.physical_address, row.city, 'FL', row.zip].filter(Boolean).join(', ');
        const phone = normalizePhone(row.phone);
        const email = normalizeEmail(row.email);
        const short = `FL intrastate household-goods mover (state registry). Confirm current FDACS status before booking.`;
        const description = `${display} is staged from official FDACS evidence as an intrastate mover candidate. State authority: ${row.fdacs_im_number}. This internal profile is not published to the consumer directory.`;
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
          [row.intended_company_id, row.intended_slug, display, short, description, hq || null, phone, email, physical, row.legal_name]
        );
        if (!inserted.rowCount) {
          stats.skipped_existing += 1;
          continue;
        }
        stats.companies_inserted += 1;

        const rawSourceKey =
          (st as { raw_source_key?: string } | undefined)?.raw_source_key ||
          fdacsRawSourceKey('IM-Intrastate Mover', row.fdacs_im_number);
        const evidence = hashEvidence({
          state: 'FL',
          authorityNumber: row.fdacs_im_number,
          legalName: row.legal_name,
          status: row.registration_status,
        });
        const psa = await client.query(
          `UPDATE public.provider_state_authority
              SET company_id = $1,
                  matched_company_id = $1,
                  verification_state = 'VERIFIED',
                  status = 'active',
                  match_method = 'new_state_authority_identity',
                  match_confidence = 1,
                  review_reason = NULL,
                  last_verified_at = now(),
                  updated_at = now()
            WHERE state_code='FL' AND (authority_number = $2 OR raw_source_key = $3)
              AND (company_id IS NULL OR company_id = $1)
            RETURNING id`,
          [row.intended_company_id, row.fdacs_im_number, rawSourceKey]
        );
        if (!psa.rowCount) {
          await client.query(
            `INSERT INTO public.provider_state_authority (
               company_id, state_code, authority_type, authority_number, status,
               expiration_date, legal_name, dba_name, regulator, source, source_url,
               source_record_id, raw_source_key, retrieved_at, last_verified_at, evidence_hash,
               verification_state, matched_company_id, match_method, match_confidence, staging_id
             ) VALUES (
               $1,'FL','intrastate_mover_registration',$2,'active',
               $3,$4,$5,'FDACS',$6,$7,
               $2,$8,now(),now(),$9,
               'VERIFIED',$1,'new_state_authority_identity',1,$10
             )
             ON CONFLICT (state_code, raw_source_key) DO UPDATE SET
               company_id = EXCLUDED.company_id,
               matched_company_id = EXCLUDED.matched_company_id,
               verification_state = 'VERIFIED',
               updated_at = now()`,
            [
              row.intended_company_id,
              row.fdacs_im_number,
              row.registration_status === 'active' ? null : null,
              row.legal_name,
              row.dba,
              st ? String((st as { source?: string }).source ?? 'fdacs_legacy_xls') : 'fdacs_legacy_xls',
              FDACS_LEGACY_LOOKUP_URL,
              rawSourceKey,
              evidence,
              st ? String((st as { id: string }).id) : null,
            ]
          );
        }
        stats.psa_upserted += 1;

        if (st) {
          await client.query(
            `UPDATE public.state_hhg_registry_staging
                SET matched_company_id = $1,
                    disposition = 'MATCHED_EXISTING',
                    match_method = 'new_state_authority_identity',
                    updated_at = now()
              WHERE id = $2`,
            [row.intended_company_id, (st as { id: string }).id]
          );
        }

        await client.query(
          `INSERT INTO public.provider_capability
             (company_id, capability, evidence_source, evidence_state, evidence_at)
           VALUES
             ($1,'hhg_intrastate',$2,'VERIFIED',now()),
             ($1,'hhg_local',$2,'VERIFIED',now())
           ON CONFLICT (company_id, capability) DO UPDATE
             SET evidence_state = 'VERIFIED',
                 evidence_source = EXCLUDED.evidence_source,
                 evidence_at = EXCLUDED.evidence_at`,
          [row.intended_company_id, `${FL_004_TASK}:${row.regulatory_id}`]
        );

        if (row.county_fips) {
          await client.query(
            `INSERT INTO public.provider_local_discovery_evidence (
               company_id, state_code, county_fips, county_name, basis,
               evidence_source, source_url, observed_at, confidence,
               verification_state, consumer_eligible, address_provenance, notes, task_tag
             ) VALUES (
               $1,'FL',$2,$3,'VERIFIED_HOME_COUNTY',
               $4,$5,now(),'HIGH',
               'VERIFIED',false,$6,$7::jsonb,$8
             )
             ON CONFLICT (company_id, county_fips, basis) DO UPDATE
               SET county_name = EXCLUDED.county_name,
                   evidence_source = EXCLUDED.evidence_source,
                   updated_at = now()`,
            [
              row.intended_company_id,
              row.county_fips,
              row.county,
              row.source_provenance ?? 'fdacs_legacy_xls',
              FDACS_LEGACY_LOOKUP_URL,
              physical,
              JSON.stringify([
                'Means: based/registered at operating address in this county',
                'Does NOT mean: guarantees pickup throughout the county',
                'consumer_eligible=false until publication gate',
              ]),
              FL_004_TASK,
            ]
          );
        }

        const obs = await client.query(
          `UPDATE public.provider_contact_observation
              SET company_id = $1
            WHERE regulatory_id = $2
              AND (company_id IS NULL OR company_id = $1)
            RETURNING observation_type`,
          [row.intended_company_id, row.regulatory_id]
        );
        stats.observations_attached += obs.rowCount ?? 0;
      }

      for (const row of linkRows) {
        const rawSourceKey =
          (stagingByAuth.get(row.fdacs_im_number) as { raw_source_key?: string } | undefined)?.raw_source_key ||
          fdacsRawSourceKey('IM-Intrastate Mover', row.fdacs_im_number);
        const upd = await client.query(
          `UPDATE public.provider_state_authority
              SET company_id = $1,
                  matched_company_id = $1,
                  verification_state = 'VERIFIED',
                  match_method = $2,
                  last_verified_at = now(),
                  updated_at = now()
            WHERE state_code='FL' AND (authority_number = $3 OR raw_source_key = $4)
              AND (company_id IS NULL OR company_id = $1)
            RETURNING id`,
          [row.intended_company_id, row.match_method, row.fdacs_im_number, rawSourceKey]
        );
        if (upd.rowCount) stats.links_written += 1;
        await client.query(
          `UPDATE public.provider_contact_observation
              SET company_id = $1
            WHERE regulatory_id = $2
              AND (company_id IS NULL OR company_id = $1)`,
          [row.intended_company_id, row.regulatory_id]
        );
      }
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    }
  }

  const after = await freezeSnapshot(client);

  const newIds = (insertRows.length ? insertRows : plannedInsertRows).map((r) => r.intended_company_id);
  let writtenStates: Array<{
    id: string;
    publication_state: string;
    indexable: boolean;
    slug: string;
  }> = [];
  if (newIds.length) {
    const check = await client.query(
      `SELECT id, publication_state, indexable, slug FROM companies WHERE id = ANY($1::text[])`,
      [newIds]
    );
    writtenStates = check.rows;
  }

  const canaryAfterOverlap = await client.query(
    `SELECT count(*)::int AS n FROM local_hhg_canary_publication
      WHERE wave_id=$1 AND company_id = ANY($2::text[])`,
    [LOCAL_CANARY_WAVE_ID, newIds.length ? newIds : ['_none_']]
  );

  await client.end();

  const indexableDelta = after.indexable - before.indexable;
  if (indexableDelta !== 0) {
    throw new Error(`REFUSAL — indexable delta ${indexableDelta}`);
  }
  if (after.canary_total !== before.canary_total || after.canary_fl !== before.canary_fl) {
    throw new Error('REFUSAL — canary membership changed');
  }

  const countyDist: Record<string, number> = {};
  for (const row of plannedInsertRows) {
    const k = row.county || '_none';
    countyDist[k] = (countyDist[k] ?? 0) + 1;
  }

  const exposure = writtenStates.map((c) => ({
    id: c.id,
    slug: c.slug,
    ...fl004PublicExposure({
      publicationState: c.publication_state,
      indexable: c.indexable,
    }),
  }));
  const anyPublic = exposure.some((e) => e.consumerVisible || e.seoIndexable);

  const rollbackIds = plannedInsertRows.map((r) => r.intended_company_id);
  const rollbackSql = `-- FL-004 rollback. Affects only FL-004 manifest company IDs.
-- Does NOT delete pre-existing fl-im-*, canary, federal, or unrelated PSA.
BEGIN;
UPDATE public.provider_contact_observation
   SET company_id = NULL
 WHERE company_id = ANY(ARRAY[${rollbackIds.map((id) => `'${id}'`).join(',')}]::text[])
   AND regulator = 'FDACS';
DELETE FROM public.provider_local_discovery_evidence
 WHERE task_tag = '${FL_004_TASK}'
   AND company_id = ANY(ARRAY[${rollbackIds.map((id) => `'${id}'`).join(',')}]::text[]);
DELETE FROM public.provider_capability
 WHERE company_id = ANY(ARRAY[${rollbackIds.map((id) => `'${id}'`).join(',')}]::text[])
   AND evidence_source LIKE '${FL_004_TASK}:%';
UPDATE public.provider_state_authority
   SET company_id = NULL, matched_company_id = NULL, verification_state = 'UNRESOLVED', updated_at = now()
 WHERE company_id = ANY(ARRAY[${rollbackIds.map((id) => `'${id}'`).join(',')}]::text[])
   AND state_code = 'FL'
   AND match_method = 'new_state_authority_identity';
DELETE FROM public.companies
 WHERE id = ANY(ARRAY[${rollbackIds.map((id) => `'${id}'`).join(',')}]::text[])
   AND publication_state = 'INGESTED'
   AND indexable = false
   AND id LIKE 'fl-im-%';
COMMIT;
`;

  const audit = {
    google_places_requests: FL_004_GOOGLE_PLACES_REQUESTS,
    task: FL_004_TASK,
    retrieved_at: retrievedAt,
    dry_run: !write,
    apply,
    idempotency_check: idempotencyCheck,
    manifest_hash: hash,
    freeze_before: before,
    freeze_after: after,
    intended: {
      insert: plannedInsertRows.length,
      link: plannedRows.filter((r) => r.action === 'LINK').length,
      hold: plannedRows.filter((r) => r.action === 'HOLD' || r.action === 'SKIP_ALREADY_CANONICAL').length,
      indexable_delta: 0,
      company_delta: plannedInsertRows.length,
    },
    this_run_live_actions: {
      insert: insertRows.length,
      link: linkRows.length,
      hold: holdRows.length,
    },
    applied: stats,
    canary: {
      wave: LOCAL_CANARY_WAVE_ID,
      before: { fl: before.canary_fl, wa: before.canary_wa, total: before.canary_total },
      after: { fl: after.canary_fl, wa: after.canary_wa, total: after.canary_total },
      overlap_with_insert: canaryAfterOverlap.rows[0]?.n ?? 0,
      keep_80_noindex: after.canary_total === 80 && after.publishable_noindex >= 80 && after.indexable === before.indexable,
    },
    county_distribution: countyDist,
    public_exposure: {
      consumer_visible: exposure.filter((e) => e.consumerVisible).length,
      seo_indexable: exposure.filter((e) => e.seoIndexable).length,
      any_public: anyPublic,
      sitemap: 'INGESTED+indexable=false excluded by isSeoIndexableCompany',
      directory_search: 'INGESTED excluded by isConsumerVisibleCompany / publication_state filter',
      county_discovery: 'not in local_hhg_canary_publication; consumer_eligible=false',
      profile_route: 'resolvable like other INGESTED fl-im-* with noindex (011D.2A contract)',
    },
    hold_rows: holdRows.map((r) => ({
      regulatory_id: r.regulatory_id,
      action: r.action,
      hold_reason: r.hold_reason,
      existing_company_id: r.existing_company_id,
      match_method: r.match_method,
    })),
    link_rows: linkRows.map((r) => ({
      regulatory_id: r.regulatory_id,
      existing_company_id: r.intended_company_id,
      match_method: r.match_method,
    })),
    insert_ids: newIds,
  };

  mkdirSync(resolve(process.cwd(), 'docs'), { recursive: true });
  mkdirSync(resolve(process.cwd(), 'data/state-hhg/fl'), { recursive: true });
  writeFileSync(
    resolve(process.cwd(), 'data/state-hhg/fl/fl-004-canonicalization-manifest.json'),
    JSON.stringify(
      {
        google_places_requests: 0,
        task: FL_004_TASK,
        ruleset_version: 'FL_HHG_PUBLICATION_V1',
        publication_state: 'INGESTED',
        indexable: false,
        hash,
        retrieved_at: retrievedAt,
        rows: plannedRows,
      },
      null,
      2
    ) + '\n'
  );
  let auditPath = resolve(process.cwd(), 'docs/task-fl-004-dry-run.json');
  if (write && stats.companies_inserted > 0) {
    auditPath = resolve(process.cwd(), 'docs/task-fl-004-audit.json');
  } else if (write) {
    auditPath = resolve(process.cwd(), 'docs/task-fl-004-idempotence-audit.json');
  }
  writeFileSync(auditPath, JSON.stringify(audit, null, 2) + '\n');
  writeFileSync(resolve(process.cwd(), 'docs/task-fl-004-rollback.sql'), rollbackSql);
  writeFileSync(
    resolve(process.cwd(), 'docs/task-fl-004-public-exposure-qa.json'),
    JSON.stringify(
      { google_places_requests: 0, any_public: anyPublic, exposure, canary_overlap: canaryAfterOverlap.rows[0]?.n ?? 0 },
      null,
      2
    ) + '\n'
  );

  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        dry_run: !write,
        hash,
        insert: insertRows.length,
        link: linkRows.length,
        hold: holdRows.length,
        applied: stats,
        freeze: { before, after },
        indexable_delta: indexableDelta,
        canary: audit.canary,
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
