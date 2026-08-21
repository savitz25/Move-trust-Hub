/**
 * FL-006 — multi-state entity resolution (Suddath holds + ruleset).
 * Google Places: 0. INGESTED/indexable=false for any new company.
 *
 * npx tsx scripts/run-task-fl-006-multistate-resolution.ts --dry-run
 * npx tsx scripts/run-task-fl-006-multistate-resolution.ts --apply
 */
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { loadEnvFiles, resolveDatabaseUrl } from '../lib/state-hhg/calibration/db';
import { LOCAL_CANARY_WAVE_ID } from '../lib/state-hhg/canary/types';
import { loadExactCanaryManifests } from '../lib/state-hhg/canary/manifest';
import {
  allocateCompanySlug,
  buildDisplayName,
  buildStateOnlyCompanyId,
} from '../lib/state-hhg/canonicalization/ids';
import { FDACS_LEGACY_LOOKUP_URL, fdacsRawSourceKey } from '../lib/state-hhg/fl/adapter';
import { hashEvidence, normalizeEmail, normalizePhone } from '../lib/state-hhg/normalize';
import {
  MULTI_STATE_GOOGLE_PLACES_REQUESTS,
  MULTI_STATE_RULESET_VERSION,
  actionForResolution,
  classifyMultiStateEntity,
} from '../lib/state-hhg/multi-state-entity';
import { FL_004_TASK } from '../lib/state-hhg/fl/fl-004';
import { isAnonymousPublicProfileAllowed } from '../lib/provider/publication';

const apply = process.argv.includes('--apply');

async function freeze(client: pg.Client) {
  const c = await client.query(`
    SELECT count(*)::int AS companies,
           count(*) FILTER (WHERE indexable)::int AS indexable,
           count(*) FILTER (WHERE id ILIKE 'fl-im-%')::int AS fl_im,
           count(*) FILTER (WHERE id ILIKE 'wa-hg-%')::int AS wa_hg
      FROM companies`);
  const psa = await client.query(`
    SELECT count(*)::int AS psa_total,
           count(*) FILTER (WHERE state_code='FL')::int AS fl_psa,
           count(*) FILTER (WHERE state_code='WA')::int AS wa_psa,
           count(*) FILTER (WHERE company_id IS NOT NULL)::int AS psa_attached
      FROM provider_state_authority`);
  const multi = await client.query(`
    SELECT count(*)::int AS companies_with_gt1_psa FROM (
      SELECT company_id FROM provider_state_authority
       WHERE company_id IS NOT NULL GROUP BY 1 HAVING count(*) > 1
    ) s`);
  const multiState = await client.query(`
    SELECT count(*)::int AS companies_multi_state FROM (
      SELECT company_id FROM provider_state_authority
       WHERE company_id IS NOT NULL GROUP BY 1 HAVING count(DISTINCT state_code) > 1
    ) s`);
  const canary = await client.query(
    `SELECT state_code, count(*)::int AS n FROM local_hhg_canary_publication
      WHERE wave_id=$1 AND status='published' GROUP BY 1`,
    [LOCAL_CANARY_WAVE_ID]
  );
  const canaryBy: Record<string, number> = {};
  for (const row of canary.rows) canaryBy[String(row.state_code)] = Number(row.n);
  return {
    ...c.rows[0],
    ...psa.rows[0],
    ...multi.rows[0],
    ...multiState.rows[0],
    canary_fl: canaryBy.FL ?? 0,
    canary_wa: canaryBy.WA ?? 0,
    canary_total: (canaryBy.FL ?? 0) + (canaryBy.WA ?? 0),
  };
}

async function main() {
  loadEnvFiles();
  const client = new pg.Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  });
  await client.connect();
  const before = await freeze(client);

  const wa = (
    await client.query(
      `SELECT id, slug, name, fmcsa_legal_name, phone, email, physical_address, headquarters,
              usdot_number, publication_state, indexable
         FROM companies WHERE id='wa-hg-064493'`
    )
  ).rows[0];
  const fl3813 = (
    await client.query(
      `SELECT regulatory_id, authority_number, legal_name_raw, dba_raw, email_raw, email_norm,
              phone_raw, phone_norm, physical_address_raw, city_norm, postal_code_norm,
              status_normalized, raw_source_key, id AS staging_id, source, source_url
         FROM state_hhg_registry_staging
        WHERE state_code='FL' AND (regulatory_id='FL-FDACS-IM-3813' OR authority_number='IM3813')
        LIMIT 1`
    )
  ).rows[0];
  const fl4099 = (
    await client.query(
      `SELECT regulatory_id, authority_number, legal_name_raw, dba_raw, email_raw, email_norm,
              phone_raw, phone_norm, physical_address_raw, city_norm, postal_code_norm,
              status_normalized, raw_source_key, id AS staging_id, source, source_url
         FROM state_hhg_registry_staging
        WHERE state_code='FL' AND (regulatory_id='FL-FDACS-IM-4099' OR authority_number='IM4099')
        LIMIT 1`
    )
  ).rows[0];

  const existing1018395 = (
    await client.query(
      `SELECT id, slug, name, fmcsa_legal_name, usdot_number, publication_state, indexable, phone, email
         FROM companies
        WHERE usdot_number IN ('1018395','DOT1018395')
           OR regexp_replace(COALESCE(usdot_number,''), '\\D', '', 'g') = '1018395'
           OR lower(COALESCE(fmcsa_legal_name,name)) LIKE '%suddath relocation systems of st%'`
    )
  ).rows;

  const im3813Class = classifyMultiStateEntity({
    subject: {
      legalName: fl3813?.legal_name_raw,
      dba: fl3813?.dba_raw,
      phone: fl3813?.phone_norm || fl3813?.phone_raw,
      email: fl3813?.email_norm || fl3813?.email_raw,
      physicalAddress: fl3813?.physical_address_raw,
      stateCode: 'FL',
    },
    candidate: {
      legalName: wa?.fmcsa_legal_name || wa?.name,
      dba: wa?.name,
      usdot: wa?.usdot_number,
      phone: wa?.phone,
      email: wa?.email,
      physicalAddress: wa?.physical_address,
      stateCode: 'WA',
    },
    officialSameEntityTie: true,
  });
  // Official tie: suddath.com/legal lists FL IM3813 + USDOT 3527089 for this LLC;
  // WA UTC HG064493 also lists USDOT 3527089; FMCSA 3527089 phone = FDACS 904-390-7100.
  const im3813 = {
    ...im3813Class,
    action: actionForResolution(im3813Class.state),
    attach_to: im3813Class.state === 'SAME_CANONICAL_ENTITY' ? 'wa-hg-064493' : null,
  };

  const im4099VsWa = classifyMultiStateEntity({
    subject: {
      legalName: fl4099?.legal_name_raw,
      dba: fl4099?.dba_raw,
      usdot: '1018395',
      phone: fl4099?.phone_norm || fl4099?.phone_raw,
      email: fl4099?.email_norm || fl4099?.email_raw,
      physicalAddress: fl4099?.physical_address_raw,
      stateCode: 'FL',
    },
    candidate: {
      legalName: wa?.fmcsa_legal_name || wa?.name,
      usdot: wa?.usdot_number,
      email: wa?.email,
      phone: wa?.phone,
    },
    conflictingUsdot: true,
  });

  let im4099Action: ReturnType<typeof actionForResolution> = actionForResolution(im4099VsWa.state);
  let im4099Attach: string | null = existing1018395[0]?.id ?? null;
  if (im4099Attach) im4099Action = 'ATTACH_TO_EXISTING';
  else if (im4099VsWa.state === 'DISTINCT_LEGAL_ENTITIES' || im4099VsWa.state === 'CORPORATE_FAMILY_RELATED') {
    im4099Action = 'CREATE_DISTINCT_COMPANY';
  }

  const stats = { psa_attached: 0, companies_created: 0, observations_attached: 0 };

  if (apply) {
    await client.query('BEGIN');
    try {
      if (im3813.action === 'ATTACH_TO_EXISTING' && fl3813) {
        const rawKey = fl3813.raw_source_key || fdacsRawSourceKey('IM-Intrastate Mover', 'IM3813');
        await client.query(
          `UPDATE provider_state_authority
              SET company_id=$1, matched_company_id=$1, verification_state='VERIFIED',
                  match_method='exact_legal_name_and_usdot', last_verified_at=now(), updated_at=now()
            WHERE state_code='FL' AND (authority_number='IM3813' OR raw_source_key=$2)`,
          ['wa-hg-064493', rawKey]
        );
        await client.query(
          `UPDATE provider_contact_observation SET company_id=$1
            WHERE regulatory_id='FL-FDACS-IM-3813' AND (company_id IS NULL OR company_id=$1)`,
          ['wa-hg-064493']
        );
        await client.query(
          `UPDATE state_hhg_registry_staging
              SET matched_company_id=$1, disposition='MATCHED_EXISTING',
                  match_method='exact_legal_name_and_usdot', updated_at=now()
            WHERE id=$2`,
          ['wa-hg-064493', fl3813.staging_id]
        );
        stats.psa_attached += 1;
        const obs = await client.query(
          `SELECT count(*)::int AS n FROM provider_contact_observation WHERE regulatory_id='FL-FDACS-IM-3813' AND company_id='wa-hg-064493'`
        );
        stats.observations_attached += obs.rows[0].n;
      }

      if (im4099Action === 'CREATE_DISTINCT_COMPANY' && fl4099) {
        const companyId = buildStateOnlyCompanyId('FL', 'IM4099');
        const taken = await client.query(`SELECT slug FROM companies`);
        const takenSlugs = new Set(taken.rows.map((r: { slug: string }) => String(r.slug)));
        const display = buildDisplayName(fl4099.legal_name_raw, fl4099.dba_raw);
        const slug = allocateCompanySlug({
          displayName: display,
          stateCode: 'FL',
          authorityNumber: 'IM4099',
          takenSlugs,
        }).slug;
        const exists = await client.query(`SELECT id FROM companies WHERE id=$1`, [companyId]);
        if (!exists.rowCount) {
          const hq = [fl4099.city_norm, 'FL'].filter(Boolean).join(', ');
          const physical = [fl4099.physical_address_raw, fl4099.city_norm, 'FL', fl4099.postal_code_norm]
            .filter(Boolean)
            .join(', ');
          const short = `FL intrastate household-goods mover (state registry). Confirm current FDACS status before booking.`;
          const description = `${display} is staged from official FDACS evidence as an intrastate mover candidate. State authority: IM4099. This internal profile is not published to the consumer directory.`;
          await client.query(
            `INSERT INTO companies (
               id, slug, name, short_description, description, headquarters,
               phone, email, physical_address, usdot_number, fmcsa_legal_name,
               fmcsa_safety_rating, fmcsa_complaints, fmcsa_shipments,
               authority_active, out_of_service, entity_type, service_scope,
               coverage, services, specialties, overall_rating, review_count,
               reputation_score, years_in_business, avg_price_per_move, price_range,
               is_verified, last_updated, publication_state, indexable, legacy_directory_row
             ) VALUES (
               $1,$2,$3,$4,$5,$6,
               $7,$8,$9,$10,$11,
               'Not Rated',0,0,
               true,false,'Moving Company','intrastate',
               'FL intrastate','[]'::jsonb,'[]'::jsonb,0,0,
               0,NULL,NULL,NULL,
               false,now(),'INGESTED',false,false
             )
             ON CONFLICT (id) DO NOTHING`,
            [
              companyId,
              slug,
              display,
              short,
              description,
              hq || null,
              normalizePhone(fl4099.phone_raw),
              normalizeEmail(fl4099.email_raw),
              physical,
              '1018395',
              fl4099.legal_name_raw,
            ]
          );
          stats.companies_created += 1;
        }
        const rawKey = fl4099.raw_source_key || fdacsRawSourceKey('IM-Intrastate Mover', 'IM4099');
        const evidence = hashEvidence({
          state: 'FL',
          authorityNumber: 'IM4099',
          legalName: fl4099.legal_name_raw,
        });
        await client.query(
          `UPDATE provider_state_authority
              SET company_id=$1, matched_company_id=$1, verification_state='VERIFIED',
                  match_method='new_state_authority_identity', last_verified_at=now(), updated_at=now()
            WHERE state_code='FL' AND (authority_number='IM4099' OR raw_source_key=$2)`,
          [companyId, rawKey]
        );
        if (
          !(
            await client.query(
              `SELECT 1 FROM provider_state_authority WHERE state_code='FL' AND (authority_number='IM4099' OR raw_source_key=$1)`,
              [rawKey]
            )
          ).rowCount
        ) {
          await client.query(
            `INSERT INTO provider_state_authority (
               company_id, state_code, authority_type, authority_number, status,
               legal_name, dba_name, regulator, source, source_url,
               source_record_id, raw_source_key, retrieved_at, last_verified_at, evidence_hash,
               verification_state, matched_company_id, match_method, staging_id
             ) VALUES (
               $1,'FL','intrastate_mover_registration','IM4099','active',
               $2,$3,'FDACS',$4,$5,
               'IM4099',$6,now(),now(),$7,
               'VERIFIED',$1,'new_state_authority_identity',$8
             )
             ON CONFLICT (state_code, raw_source_key) DO UPDATE SET
               company_id=EXCLUDED.company_id, matched_company_id=EXCLUDED.company_id,
               verification_state='VERIFIED', updated_at=now()`,
            [
              companyId,
              fl4099.legal_name_raw,
              fl4099.dba_raw,
              fl4099.source || 'fdacs_legacy_xls',
              FDACS_LEGACY_LOOKUP_URL,
              rawKey,
              evidence,
              fl4099.staging_id,
            ]
          );
        }
        stats.psa_attached += 1;
        await client.query(
          `UPDATE provider_contact_observation SET company_id=$1
            WHERE regulatory_id='FL-FDACS-IM-4099' AND (company_id IS NULL OR company_id=$1)`,
          [companyId]
        );
        await client.query(
          `INSERT INTO provider_capability (company_id, capability, evidence_source, evidence_state, evidence_at)
           VALUES ($1,'hhg_intrastate',$2,'VERIFIED',now()), ($1,'hhg_local',$2,'VERIFIED',now())
           ON CONFLICT (company_id, capability) DO UPDATE SET evidence_state='VERIFIED'`,
          [companyId, `${FL_004_TASK}:FL-FDACS-IM-4099`]
        );
        await client.query(
          `UPDATE state_hhg_registry_staging
              SET matched_company_id=$1, disposition='MATCHED_EXISTING', updated_at=now()
            WHERE id=$2`,
          [companyId, fl4099.staging_id]
        );
      }
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    }
  }

  // Bounded FL/WA exact-legal-name groups
  const flNames = await client.query(
    `SELECT legal_name_norm, count(*)::int AS n,
            array_agg(DISTINCT authority_number) AS auths
       FROM state_hhg_registry_staging
      WHERE state_code='FL' AND legal_name_norm IS NOT NULL
      GROUP BY 1 HAVING count(*) > 1
      ORDER BY n DESC LIMIT 40`
  );
  const crossNames = await client.query(
    `SELECT f.legal_name_norm,
            array_agg(DISTINCT f.authority_number) FILTER (WHERE f.state_code='FL') AS fl_auths,
            array_agg(DISTINCT f.authority_number) FILTER (WHERE f.state_code='WA') AS wa_auths
       FROM state_hhg_registry_staging f
      WHERE f.legal_name_norm IS NOT NULL
      GROUP BY 1
     HAVING count(DISTINCT f.state_code) > 1
      LIMIT 25`
  );

  const after = await freeze(client);
  const created = apply && im4099Action === 'CREATE_DISTINCT_COMPANY' ? buildStateOnlyCompanyId('FL', 'IM4099') : null;
  if (created) {
    const row = await client.query(`SELECT publication_state, indexable FROM companies WHERE id=$1`, [created]);
    if (row.rows[0] && (row.rows[0].publication_state !== 'INGESTED' || row.rows[0].indexable !== false)) {
      throw new Error('REFUSAL — new company not INGESTED/indexable=false');
    }
    if (isAnonymousPublicProfileAllowed({ publicationState: 'INGESTED' })) {
      throw new Error('REFUSAL — INGESTED profile contract broken');
    }
  }
  await client.end();

  if (after.indexable !== before.indexable) throw new Error('REFUSAL — indexable delta');
  if (after.canary_total !== before.canary_total) throw new Error('REFUSAL — canary changed');

  const rollback =
    created && apply
      ? `-- FL-006 rollback for fl-im-4099 only. Does not detach IM3813 from wa-hg-064493 unless run as a separate reviewed statement.
BEGIN;
UPDATE provider_contact_observation SET company_id=NULL WHERE regulatory_id='FL-FDACS-IM-4099' AND company_id='fl-im-4099';
DELETE FROM provider_capability WHERE company_id='fl-im-4099';
UPDATE provider_state_authority SET company_id=NULL, matched_company_id=NULL, verification_state='UNRESOLVED'
 WHERE state_code='FL' AND authority_number='IM4099' AND company_id='fl-im-4099';
DELETE FROM companies WHERE id='fl-im-4099' AND publication_state='INGESTED' AND indexable=false;
COMMIT;
`
      : '-- No FL-006 company insert to roll back (IM3813 attach-only or dry-run).\n';

  const report = {
    google_places_requests: MULTI_STATE_GOOGLE_PLACES_REQUESTS,
    ruleset: MULTI_STATE_RULESET_VERSION,
    dry_run: !apply,
    freeze_before: before,
    freeze_after: after,
    im3813: {
      ...im3813,
      evidence: {
        fdacs: fl3813,
        wa_company: wa,
        official: [
          'https://suddath.com/legal/ lists Suddath Moving & Storage, LLC + Fla. Mover Reg. No. IM3813 + USDOT 3527089',
          'https://www.utc.wa.gov/company/50169 lists same LLC, USDOT 3527089, HG064493, mailing 815 South Main St Jacksonville FL',
          'FMCSA USDOT 3527089 legal name SUDDATH MOVING & STORAGE LLC, phone (904) 390-7100 matches FDACS IM3813',
          'Sunbiz SUDDATH MOVING & STORAGE, LLC document L20000294285 Active',
        ],
      },
    },
    im4099: {
      vs_wa: im4099VsWa,
      action: im4099Action,
      existing_federal_candidates: existing1018395,
      attach_or_create_id: im4099Attach || (im4099Action === 'CREATE_DISTINCT_COMPANY' ? 'fl-im-4099' : null),
      evidence: {
        fdacs: fl4099,
        official: [
          'Sunbiz SUDDATH RELOCATION SYSTEMS OF ST. PETERSBURG, INC. P01000026099 Active EIN 59-3705638',
          'FMCSA USDOT 1018395 / MC-425403 for that corporation (distinct from 3527089)',
          'Shared legal@suddath.com is generic enterprise mailbox — insufficient to merge',
        ],
      },
    },
    stats,
    cross_state_sample: {
      fl_multi_registration_name_groups: flNames.rows.slice(0, 25),
      fl_wa_shared_legal_name_groups: crossNames.rows,
    },
    canary: {
      before: { fl: before.canary_fl, wa: before.canary_wa, total: before.canary_total },
      after: { fl: after.canary_fl, wa: after.canary_wa, total: after.canary_total },
      manifest_unchanged: loadExactCanaryManifests().companyIds.length === 80,
    },
    ingested_404_preserved: isAnonymousPublicProfileAllowed({ publicationState: 'INGESTED' }) === false,
  };

  mkdirSync(resolve(process.cwd(), 'docs'), { recursive: true });
  writeFileSync(resolve(process.cwd(), 'docs/task-fl-006-resolution.json'), JSON.stringify(report, null, 2) + '\n');
  writeFileSync(resolve(process.cwd(), 'docs/task-fl-006-rollback.sql'), rollback);
  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        dry_run: !apply,
        im3813: im3813.action,
        im4099: im4099Action,
        stats,
        freeze: { before, after },
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
