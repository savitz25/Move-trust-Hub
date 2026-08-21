/**
 * Manifest-bound canary publication / rollback.
 * Rejects non-manifest IDs. Google Places: 0.
 */
import type pg from 'pg';
import { LOCAL_CANARY_WAVE_ID } from '@/lib/state-hhg/canary/types';
import type { LoadedManifest } from '@/lib/state-hhg/canary/manifest';
import { assertManifestOnlyIds } from '@/lib/state-hhg/canary/manifest';

export type PrePublishValidation = {
  companyId: string;
  valid: boolean;
  reason: string | null;
  publicationState: string | null;
  indexable: boolean | null;
  authorityStatus: string | null;
  verificationState: string | null;
  homeCountyFips: string | null;
};

export async function validateCanaryPrePublish(
  client: pg.Client,
  companyIds: readonly string[]
): Promise<{
  validations: PrePublishValidation[];
  validIds: string[];
  excluded: PrePublishValidation[];
}> {
  const res = await client.query(
    `
    SELECT
      wanted.id AS wanted_id,
      c.id AS company_id,
      c.publication_state,
      c.indexable,
      psa.status AS authority_status,
      psa.verification_state,
      s.role_class,
      e.county_fips
    FROM unnest($1::text[]) AS wanted(id)
    LEFT JOIN public.companies c ON c.id = wanted.id
    LEFT JOIN LATERAL (
      SELECT status, verification_state, staging_id, authority_number
        FROM public.provider_state_authority psa
       WHERE psa.company_id = c.id
         AND psa.verification_state = 'VERIFIED'
         AND psa.status = 'active'
       ORDER BY psa.updated_at DESC NULLS LAST
       LIMIT 1
    ) psa ON true
    LEFT JOIN public.state_hhg_registry_staging s ON s.id = psa.staging_id
    LEFT JOIN LATERAL (
      SELECT county_fips
        FROM public.provider_local_discovery_evidence e
       WHERE e.company_id = c.id
         AND e.basis = 'VERIFIED_HOME_COUNTY'
       LIMIT 1
    ) e ON true
    `,
    [companyIds]
  );

  const validations: PrePublishValidation[] = [];
  for (const row of res.rows) {
    const id = String(row.wanted_id);
    const role = (row.role_class || 'mover').toLowerCase();
    let valid = true;
    let reason: string | null = null;

    if (!row.company_id) {
      valid = false;
      reason = 'company_missing';
    } else if (
      row.publication_state !== 'INGESTED' &&
      row.publication_state !== 'PUBLISHABLE'
    ) {
      valid = false;
      reason = `publication_state_${row.publication_state}`;
    } else if (row.indexable === true) {
      valid = false;
      reason = 'indexable_true_unexpected';
    } else if (row.verification_state !== 'VERIFIED') {
      valid = false;
      reason = 'authority_not_verified';
    } else if (row.authority_status !== 'active') {
      valid = false;
      reason = `authority_status_${row.authority_status ?? 'missing'}`;
    } else if (role === 'broker') {
      valid = false;
      reason = 'broker_only';
    } else if (!row.county_fips) {
      valid = false;
      reason = 'home_county_missing';
    }

    validations.push({
      companyId: id,
      valid,
      reason,
      publicationState: row.publication_state
        ? String(row.publication_state)
        : null,
      indexable:
        row.indexable === null || row.indexable === undefined
          ? null
          : Boolean(row.indexable),
      authorityStatus: row.authority_status
        ? String(row.authority_status)
        : null,
      verificationState: row.verification_state
        ? String(row.verification_state)
        : null,
      homeCountyFips: row.county_fips ? String(row.county_fips) : null,
    });
  }

  return {
    validations,
    validIds: validations.filter((v) => v.valid).map((v) => v.companyId),
    excluded: validations.filter((v) => !v.valid),
  };
}

export async function publishLocalCanary(
  client: pg.Client,
  manifest: LoadedManifest,
  options?: { dryRun?: boolean; companyIds?: string[] }
): Promise<{
  attempted: number;
  published: number;
  alreadyPublishable: number;
  rejectedNonManifest: string[];
  excluded: PrePublishValidation[];
  dryRun: boolean;
}> {
  const requested = options?.companyIds ?? manifest.companyIds;
  const gate = assertManifestOnlyIds(requested, manifest.companyIds);
  if (!gate.ok) {
    return {
      attempted: requested.length,
      published: 0,
      alreadyPublishable: 0,
      rejectedNonManifest: gate.rejected,
      excluded: [],
      dryRun: Boolean(options?.dryRun),
    };
  }

  const { validIds, excluded, validations } = await validateCanaryPrePublish(
    client,
    requested
  );
  const alreadyPublishable = validations.filter(
    (v) => v.valid && v.publicationState === 'PUBLISHABLE'
  ).length;

  if (options?.dryRun) {
    return {
      attempted: requested.length,
      published: 0,
      alreadyPublishable,
      rejectedNonManifest: [],
      excluded,
      dryRun: true,
    };
  }

  const byManifest = new Map(manifest.all.map((p) => [p.companyId, p]));
  let published = 0;

  for (const id of validIds) {
    const m = byManifest.get(id);
    if (!m) continue;

    const before = validations.find((v) => v.companyId === id);
    await client.query(
      `
      UPDATE public.companies
         SET publication_state = 'PUBLISHABLE',
             indexable = false,
             legacy_directory_row = false,
             updated_at = now()
       WHERE id = $1
         AND (id LIKE 'fl-%' OR id LIKE 'wa-%')
         AND id NOT LIKE 'usdot-%'
         AND publication_state IN ('INGESTED', 'PUBLISHABLE')
         AND indexable = false
      `,
      [id]
    );

    await client.query(
      `
      INSERT INTO public.local_hhg_canary_publication (
        wave_id, company_id, state_code, slug, home_county_fips,
        authority_number, published_at, status, source
      ) VALUES ($1,$2,$3,$4,$5,$6,now(),'published',$7)
      ON CONFLICT (wave_id, company_id) DO UPDATE SET
        status = 'published',
        published_at = COALESCE(local_hhg_canary_publication.published_at, now()),
        slug = EXCLUDED.slug,
        home_county_fips = EXCLUDED.home_county_fips,
        authority_number = EXCLUDED.authority_number
      `,
      [
        LOCAL_CANARY_WAVE_ID,
        id,
        m.stateCode,
        m.slug,
        m.homeCountyFips,
        m.authorityNumber,
        'task_011d3_controlled_canary',
      ]
    );

    await client.query(
      `
      UPDATE public.provider_local_discovery_evidence
         SET consumer_eligible = true,
             updated_at = now()
       WHERE company_id = $1
         AND basis = 'VERIFIED_HOME_COUNTY'
         AND county_fips = $2
      `,
      [id, m.homeCountyFips]
    );

    if (before?.publicationState === 'INGESTED') published++;
    else if (before?.publicationState === 'PUBLISHABLE') {
      /* idempotent re-run */
    } else {
      published++;
    }
  }

  return {
    attempted: requested.length,
    published,
    alreadyPublishable,
    rejectedNonManifest: [],
    excluded,
    dryRun: false,
  };
}

export async function rollbackLocalCanary(
  client: pg.Client,
  manifest: LoadedManifest
): Promise<{ rolledBackCompanies: number; evidenceDisabled: number }> {
  const ids = manifest.companyIds;
  const gate = assertManifestOnlyIds(ids, manifest.companyIds);
  if (!gate.ok) throw new Error('rollback refused non-manifest ids');

  const c = await client.query(
    `
    UPDATE public.companies
       SET publication_state = 'INGESTED',
           indexable = false,
           updated_at = now()
     WHERE id = ANY($1::text[])
       AND (id LIKE 'fl-%' OR id LIKE 'wa-%')
       AND id NOT LIKE 'usdot-%'
       AND publication_state = 'PUBLISHABLE'
       AND indexable = false
    `,
    [ids]
  );

  const e = await client.query(
    `
    UPDATE public.provider_local_discovery_evidence
       SET consumer_eligible = false,
           updated_at = now()
     WHERE company_id = ANY($1::text[])
       AND basis = 'VERIFIED_HOME_COUNTY'
       AND consumer_eligible = true
    `,
    [ids]
  );

  await client.query(
    `
    UPDATE public.local_hhg_canary_publication
       SET status = 'unpublished'
     WHERE wave_id = $1
       AND company_id = ANY($2::text[])
    `,
    [LOCAL_CANARY_WAVE_ID, ids]
  );

  return {
    rolledBackCompanies: c.rowCount ?? 0,
    evidenceDisabled: e.rowCount ?? 0,
  };
}
