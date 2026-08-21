/**
 * FL-007 — bounded FL/WA exact-legal-name overlap resolution.
 * MULTI_STATE_REGULATED_ENTITY_V1. Google Places: 0. No public launch.
 *
 * npx tsx scripts/run-task-fl-007-cross-state-resolution.ts --dry-run
 * npx tsx scripts/run-task-fl-007-cross-state-resolution.ts --apply
 */
import { createHash } from 'crypto';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { loadEnvFiles, resolveDatabaseUrl } from '../lib/state-hhg/calibration/db';
import { LOCAL_CANARY_WAVE_ID } from '../lib/state-hhg/canary/types';
import { loadExactCanaryManifests } from '../lib/state-hhg/canary/manifest';
import { isAnonymousPublicProfileAllowed } from '../lib/provider/publication';
import {
  MULTI_STATE_GOOGLE_PLACES_REQUESTS,
  MULTI_STATE_RULESET_VERSION,
  classifyMultiStateEntity,
  type MultiStateResolutionState,
} from '../lib/state-hhg/multi-state-entity';

const apply = process.argv.includes('--apply');
const GOOGLE = 0 as const;

type StagingRow = {
  id: string;
  state_code: string;
  authority_number: string | null;
  regulatory_id: string | null;
  legal_name_raw: string | null;
  legal_name_norm: string | null;
  dba_raw: string | null;
  usdot_norm: string | null;
  phone_norm: string | null;
  email_norm: string | null;
  physical_address_raw: string | null;
  city_norm: string | null;
  postal_code_norm: string | null;
  status_normalized: string | null;
  matched_company_id: string | null;
  disposition: string | null;
};

async function freeze(client: pg.Client) {
  const c = await client.query(`
    SELECT count(*)::int AS companies,
           count(*) FILTER (WHERE indexable)::int AS indexable,
           count(*) FILTER (WHERE id ILIKE 'fl-im-%')::int AS fl_im,
           count(*) FILTER (WHERE id ILIKE 'wa-hg-%')::int AS wa_hg
      FROM companies`);
  const psa = await client.query(`
    SELECT count(*) FILTER (WHERE state_code='FL')::int AS fl_psa,
           count(*) FILTER (WHERE state_code='WA')::int AS wa_psa,
           count(*) FILTER (WHERE company_id IS NOT NULL)::int AS psa_attached
      FROM provider_state_authority`);
  const multi = await client.query(`
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

  const groups = await client.query(`
    SELECT legal_name_norm,
           array_agg(DISTINCT authority_number) FILTER (WHERE state_code='FL') AS fl_auths,
           array_agg(DISTINCT authority_number) FILTER (WHERE state_code='WA') AS wa_auths,
           count(*) FILTER (WHERE state_code='FL')::int AS fl_n,
           count(*) FILTER (WHERE state_code='WA')::int AS wa_n
      FROM state_hhg_registry_staging
     WHERE legal_name_norm IS NOT NULL AND state_code IN ('FL','WA')
     GROUP BY 1
    HAVING count(DISTINCT state_code) > 1
     ORDER BY legal_name_norm`);

  const resolvedNames = new Set(['SUDDATH MOVING AND STORAGE']);
  const allGroups = groups.rows as Array<{
    legal_name_norm: string;
    fl_auths: string[] | null;
    wa_auths: string[] | null;
  }>;
  const unresolved = allGroups.filter((g) => !resolvedNames.has(g.legal_name_norm));

  const decisions = [];
  for (const g of unresolved) {
    const rows = (
      await client.query(
        `SELECT id, state_code, authority_number, regulatory_id, legal_name_raw, legal_name_norm,
                dba_raw, usdot_norm, phone_norm, email_norm, physical_address_raw, city_norm,
                postal_code_norm, status_normalized, matched_company_id, disposition
           FROM state_hhg_registry_staging
          WHERE legal_name_norm=$1 AND state_code IN ('FL','WA')
          ORDER BY state_code, authority_number`,
        [g.legal_name_norm]
      )
    ).rows as StagingRow[];
    const fl = rows.filter((r) => r.state_code === 'FL');
    const wa = rows.filter((r) => r.state_code === 'WA');
    const fl0 = fl[0];
    const wa0 = wa[0];
    const flCo = fl0?.matched_company_id
      ? (
          await client.query(
            `SELECT id, name, fmcsa_legal_name, usdot_number, phone, email, physical_address, publication_state, indexable
               FROM companies WHERE id=$1`,
            [fl0.matched_company_id]
          )
        ).rows[0]
      : null;
    const waCo = wa0?.matched_company_id
      ? (
          await client.query(
            `SELECT id, name, fmcsa_legal_name, usdot_number, phone, email, physical_address, publication_state, indexable
               FROM companies WHERE id=$1`,
            [wa0.matched_company_id]
          )
        ).rows[0]
      : null;

    const flUsdot = fl0?.usdot_norm || flCo?.usdot_number || null;
    const waUsdot = wa0?.usdot_norm || waCo?.usdot_number || null;
    const classified = classifyMultiStateEntity({
      subject: {
        legalName: fl0?.legal_name_raw ?? g.legal_name_norm,
        dba: fl0?.dba_raw,
        usdot: flUsdot,
        phone: fl0?.phone_norm,
        email: fl0?.email_norm,
        physicalAddress: fl0?.physical_address_raw,
        stateCode: 'FL',
      },
      candidate: {
        legalName: wa0?.legal_name_raw ?? g.legal_name_norm,
        dba: wa0?.dba_raw,
        usdot: waUsdot,
        phone: wa0?.phone_norm,
        email: wa0?.email_norm,
        physicalAddress: wa0?.physical_address_raw,
        stateCode: 'WA',
      },
      officialSameEntityTie: Boolean(flUsdot && waUsdot && flUsdot === waUsdot),
      conflictingUsdot: Boolean(flUsdot && waUsdot && flUsdot !== waUsdot),
    });

    // Competing canonical rows: never destructive-merge
    let action: 'ATTACH_TO_EXISTING' | 'CREATE_DISTINCT_COMPANY' | 'KEEP_HOLD' | 'DUPLICATE_CANONICAL_REVIEW_REQUIRED' =
      'KEEP_HOLD';
    let attachTo: string | null = null;
    if (classified.state === 'SAME_CANONICAL_ENTITY') {
      const ids = [...new Set([fl0?.matched_company_id, wa0?.matched_company_id].filter(Boolean))];
      if (ids.length > 1) action = 'DUPLICATE_CANONICAL_REVIEW_REQUIRED';
      else if (ids.length === 1) {
        action = 'ATTACH_TO_EXISTING';
        attachTo = ids[0]!;
      } else action = 'KEEP_HOLD';
    }

    decisions.push({
      legal_name_norm: g.legal_name_norm,
      fl_auths: g.fl_auths,
      wa_auths: g.wa_auths,
      florida: fl.map((r) => ({
        regulatory_id: r.regulatory_id,
        authority_number: r.authority_number,
        legal_name_raw: r.legal_name_raw,
        dba: r.dba_raw,
        usdot: r.usdot_norm,
        phone: r.phone_norm,
        email: r.email_norm,
        address: r.physical_address_raw,
        city: r.city_norm,
        zip: r.postal_code_norm,
        status: r.status_normalized,
        company_id: r.matched_company_id,
        disposition: r.disposition,
      })),
      washington: wa.map((r) => ({
        regulatory_id: r.regulatory_id,
        authority_number: r.authority_number,
        legal_name_raw: r.legal_name_raw,
        dba: r.dba_raw,
        usdot: r.usdot_norm,
        phone: r.phone_norm,
        email: r.email_norm,
        address: r.physical_address_raw,
        city: r.city_norm,
        zip: r.postal_code_norm,
        status: r.status_normalized,
        company_id: r.matched_company_id,
        disposition: r.disposition,
      })),
      fl_company: flCo ?? null,
      wa_company: waCo ?? null,
      classification: classified,
      action,
      attach_to: attachTo,
      missing_evidence:
        classified.state === 'REVIEW_REQUIRED' || classified.state === 'BRANCH_OR_LOCATION_REVIEW'
          ? ['no_shared_verified_usdot_on_both_state_records', 'name_equality_insufficient']
          : [],
    });
  }

  const hash = createHash('sha256')
    .update(unresolved.map((g) => g.legal_name_norm).sort().join('\n'))
    .digest('hex')
    .slice(0, 16);

  // Apply only ATTACH_TO_EXISTING (never CREATE in FL-007 unless we had a SAME with no company — we don't)
  const stats = { psa_attached: 0, observations: 0, companies_created: 0 };
  const attachRows = decisions.filter((d) => d.action === 'ATTACH_TO_EXISTING' && d.attach_to);
  if (apply && attachRows.length) {
    await client.query('BEGIN');
    try {
      for (const d of attachRows) {
        const cid = d.attach_to!;
        for (const rec of [...d.florida, ...d.washington]) {
          if (!rec.authority_number) continue;
          const upd = await client.query(
            `UPDATE provider_state_authority
                SET company_id=$1, matched_company_id=$1, verification_state='VERIFIED',
                    match_method='exact_legal_name_and_usdot', last_verified_at=now(), updated_at=now()
              WHERE (authority_number=$2)
                AND (company_id IS NULL OR company_id=$1)
              RETURNING id`,
            [cid, rec.authority_number]
          );
          stats.psa_attached += upd.rowCount ?? 0;
          if (rec.regulatory_id) {
            const obs = await client.query(
              `UPDATE provider_contact_observation SET company_id=$1
                WHERE regulatory_id=$2 AND (company_id IS NULL OR company_id=$1)`,
              [cid, rec.regulatory_id]
            );
            stats.observations += obs.rowCount ?? 0;
          }
        }
      }
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    }
  }

  const after = await freeze(client);
  if (after.indexable !== before.indexable) throw new Error('REFUSAL — indexable delta');
  if (after.canary_total !== before.canary_total) throw new Error('REFUSAL — canary changed');
  if (isAnonymousPublicProfileAllowed({ publicationState: 'INGESTED' })) {
    throw new Error('REFUSAL — INGESTED profile contract');
  }

  const byState: Record<string, number> = {};
  for (const d of decisions) {
    const s = d.classification.state as MultiStateResolutionState;
    byState[s] = (byState[s] ?? 0) + 1;
  }

  const report = {
    google_places_requests: GOOGLE,
    ruleset: MULTI_STATE_RULESET_VERSION,
    dry_run: !apply,
    manifest_hash: hash,
    universe: {
      exact_name_fl_wa_groups: allGroups.length,
      resolved_before: allGroups.filter((g) => resolvedNames.has(g.legal_name_norm)).map((g) => g.legal_name_norm),
      unresolved: unresolved.map((g) => g.legal_name_norm),
    },
    freeze_before: before,
    freeze_after: after,
    summary: {
      SAME_CANONICAL_ENTITY: byState.SAME_CANONICAL_ENTITY ?? 0,
      DISTINCT_LEGAL_ENTITIES: byState.DISTINCT_LEGAL_ENTITIES ?? 0,
      CORPORATE_FAMILY_RELATED: byState.CORPORATE_FAMILY_RELATED ?? 0,
      BRANCH_OR_LOCATION_REVIEW: byState.BRANCH_OR_LOCATION_REVIEW ?? 0,
      REVIEW_REQUIRED: byState.REVIEW_REQUIRED ?? 0,
      REJECTED_MATCH: byState.REJECTED_MATCH ?? 0,
      attach: attachRows.length,
      keep_hold: decisions.filter((d) => d.action === 'KEEP_HOLD' || d.action === 'DUPLICATE_CANONICAL_REVIEW_REQUIRED').length,
    },
    stats,
    canary: {
      before: { fl: before.canary_fl, wa: before.canary_wa, total: before.canary_total },
      after: { fl: after.canary_fl, wa: after.canary_wa, total: after.canary_total },
      manifest_unchanged: loadExactCanaryManifests().companyIds.length === 80,
    },
    groups: decisions,
  };

  mkdirSync(resolve(process.cwd(), 'docs'), { recursive: true });
  mkdirSync(resolve(process.cwd(), 'data/state-hhg'), { recursive: true });
  writeFileSync(
    resolve(process.cwd(), 'data/state-hhg/fl-007-cross-state-manifest.json'),
    JSON.stringify(
      {
        google_places_requests: 0,
        ruleset: MULTI_STATE_RULESET_VERSION,
        hash,
        groups: decisions.map((d) => ({
          legal_name_norm: d.legal_name_norm,
          fl_auths: d.fl_auths,
          wa_auths: d.wa_auths,
          classification: d.classification.state,
          action: d.action,
          attach_to: d.attach_to,
        })),
      },
      null,
      2
    ) + '\n'
  );
  writeFileSync(
    resolve(process.cwd(), apply ? 'docs/task-fl-007-apply.json' : 'docs/task-fl-007-dry-run.json'),
    JSON.stringify(report, null, 2) + '\n'
  );
  writeFileSync(
    resolve(process.cwd(), 'docs/task-fl-007-group-decisions.json'),
    JSON.stringify({ google_places_requests: 0, groups: decisions }, null, 2) + '\n'
  );

  console.log(
    JSON.stringify(
      {
        google_places_requests: MULTI_STATE_GOOGLE_PLACES_REQUESTS,
        dry_run: !apply,
        hash,
        universe: report.universe,
        summary: report.summary,
        freeze: { before, after },
      },
      null,
      2
    )
  );
  await client.end();
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e).replace(/postgresql:\/\/[^@]+@/, 'postgresql://***@'));
  process.exit(1);
});
