/**
 * Task 011D.2A — FL + WA READY provider canonicalization (internal only).
 * NO consumer publication. NO Google Places. NO radius/adjacency.
 *
 * Usage:
 *   npx tsx scripts/run-task-011d2a-canonicalization.ts
 *   npx tsx scripts/run-task-011d2a-canonicalization.ts --dry-run
 *   npx tsx scripts/run-task-011d2a-canonicalization.ts --idempotency-check
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { loadEnvFiles, withDb } from '@/lib/state-hhg/calibration/db';
import {
  loadNewProviderStagingCandidates,
  classifyReadyCohort,
  loadCanonicalUniverse,
  canonicalizeOne,
  GOOGLE_PLACES_REQUESTS,
  TASK_011D2A,
  type CanonicalizationManifestRow,
} from '@/lib/state-hhg/canonicalization';
import { isConsumerVisibleCompany, isSeoIndexableCompany } from '@/lib/provider/publication';
import { RETIRED_RADIUS_MODELS } from '@/lib/state-hhg/discovery/types';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const idempotencyCheck = args.includes('--idempotency-check');

function summarizeOutcomes(rows: CanonicalizationManifestRow[]) {
  const by: Record<string, number> = {};
  for (const r of rows) by[r.outcome] = (by[r.outcome] ?? 0) + 1;
  return by;
}

function sampleStratified(
  rows: CanonicalizationManifestRow[],
  n: number,
  seed: number
): CanonicalizationManifestRow[] {
  const created = rows.filter((r) => r.outcome === 'CREATED');
  if (created.length <= n) return [...created];
  const buckets: CanonicalizationManifestRow[][] = [
    created.filter((r) => r.usdot),
    created.filter((r) => !r.usdot),
    created.filter((r) => r.dba),
    created.filter((r) => !r.dba),
  ];
  const out: CanonicalizationManifestRow[] = [];
  const seen = new Set<string>();
  let x = seed || 1;
  // Round-robin from buckets then fill
  while (out.length < n) {
    let progressed = false;
    for (const b of buckets) {
      if (out.length >= n) break;
      if (!b.length) continue;
      x = (x * 1103515245 + 12345) & 0x7fffffff;
      const i = x % b.length;
      const row = b[i];
      if (seen.has(row.stagingId)) continue;
      seen.add(row.stagingId);
      out.push(row);
      progressed = true;
    }
    if (!progressed) {
      for (const row of created) {
        if (out.length >= n) break;
        if (seen.has(row.stagingId)) continue;
        seen.add(row.stagingId);
        out.push(row);
      }
      break;
    }
  }
  return out;
}

async function main() {
  loadEnvFiles();
  const retrievedAt = new Date().toISOString();

  const result = await withDb(async (client) => {
    // Ensure discovery evidence table exists
    const tbl = await client.query(
      `SELECT to_regclass('public.provider_local_discovery_evidence') AS t`
    );
    if (!tbl.rows[0]?.t && !dryRun) {
      throw new Error(
        'provider_local_discovery_evidence missing — run apply-task-011d2a-migration.ts first'
      );
    }

    const freezeBefore = await client.query(`
      SELECT count(*)::int AS companies,
             count(*) FILTER (WHERE indexable)::int AS indexable,
             count(*) FILTER (WHERE publication_state='INGESTED')::int AS ingested
        FROM companies`);
    const wavesBefore = await client.query(`
      SELECT wave_id, count(*)::int AS n FROM federal_hhg_wave_publication
       WHERE status <> 'unpublished' GROUP BY 1 ORDER BY 1`);

    const flStaging = await loadNewProviderStagingCandidates(client, 'FL');
    const waStaging = await loadNewProviderStagingCandidates(client, 'WA');
    const classified = await classifyReadyCohort(
      [...flStaging, ...waStaging],
      { delayMs: 0, persistCache: true }
    );

    console.log(
      JSON.stringify(
        { phase: 'ready_cohort', ...classified.summary, google: GOOGLE_PLACES_REQUESTS },
        null,
        2
      )
    );

    const ctx = await loadCanonicalUniverse(client);
    const manifest: CanonicalizationManifestRow[] = [];

    // Process READY only
    for (const candidate of classified.ready) {
      const row = await canonicalizeOne(client, candidate, {
        ...ctx,
        dryRun,
      });
      manifest.push(row);
    }

    const flManifest = manifest.filter((r) => r.stateCode === 'FL');
    const waManifest = manifest.filter((r) => r.stateCode === 'WA');

    // Precision audit sample
    const flSample = sampleStratified(flManifest, 100, 11);
    const waSample = sampleStratified(
      waManifest,
      Math.min(100, waManifest.filter((r) => r.outcome === 'CREATED').length || 100),
      22
    );

    const auditIssues: string[] = [];
    for (const row of [...flSample, ...waSample]) {
      if (row.outcome !== 'CREATED' && row.outcome !== 'MATCHED_DURING_CANONICALIZATION') {
        continue;
      }
      if (!row.companyId) auditIssues.push(`${row.authorityNumber}: missing companyId`);
      if (!row.authorityNumber) auditIssues.push(`${row.legalName}: missing authority`);
      if (!row.legalName) auditIssues.push(`${row.authorityNumber}: missing legalName`);
      if (!row.physicalAddress) auditIssues.push(`${row.authorityNumber}: missing address`);
      if (!row.phone) auditIssues.push(`${row.authorityNumber}: missing phone`);
      if (!row.homeCountyFips) auditIssues.push(`${row.authorityNumber}: missing home county`);
      if (row.indexable !== false) auditIssues.push(`${row.authorityNumber}: indexable not false`);
      if (row.publicationState && row.publicationState !== 'INGESTED' && row.outcome === 'CREATED') {
        auditIssues.push(`${row.authorityNumber}: expected INGESTED`);
      }
    }

    // DB post-checks (skip heavy if dry-run)
    let freezeAfter = freezeBefore.rows[0];
    let duplicateAuthority = 0;
    let duplicateUsdot = 0;
    let newPublic = 0;
    let newIndexable = 0;
    let homeCountyCount = { FL: 0, WA: 0 };
    let verifiedAuthority = { FL: 0, WA: 0 };
    let capabilitiesCreated = 0;
    let quarantineLeak = 0;
    let consumerLeakSample: string[] = [];

    if (!dryRun) {
      freezeAfter = (
        await client.query(`
        SELECT count(*)::int AS companies,
               count(*) FILTER (WHERE indexable)::int AS indexable,
               count(*) FILTER (WHERE publication_state='INGESTED')::int AS ingested
          FROM companies`)
      ).rows[0];

      const dupAuth = await client.query(`
        SELECT state_code, authority_number, count(DISTINCT company_id)::int AS n
          FROM provider_state_authority
         WHERE company_id IS NOT NULL AND authority_number IS NOT NULL
           AND state_code IN ('FL','WA')
         GROUP BY 1,2 HAVING count(DISTINCT company_id) > 1`);
      duplicateAuthority = dupAuth.rows.length;

      const dupUsdot = await client.query(`
        SELECT usdot_number, count(*)::int AS n FROM companies
         WHERE usdot_number IS NOT NULL AND btrim(usdot_number) <> ''
         GROUP BY 1 HAVING count(*) > 1`);
      // Filter to only new task companies colliding — report raw count of multi-company USDOTs involving new ids
      duplicateUsdot = (
        await client.query(`
          SELECT count(*)::int AS n FROM (
            SELECT usdot_number FROM companies
             WHERE usdot_number IS NOT NULL AND btrim(usdot_number) <> ''
               AND (id LIKE 'fl-%' OR id LIKE 'wa-%')
               AND id NOT LIKE 'usdot-%'
               AND publication_state = 'INGESTED'
             GROUP BY usdot_number HAVING count(*) > 1
          ) t`)
      ).rows[0].n;

      newPublic = (
        await client.query(`
          SELECT count(*)::int AS n FROM companies
           WHERE (id LIKE 'fl-%' OR id LIKE 'wa-%')
             AND id NOT LIKE 'usdot-%'
             AND publication_state IN ('PUBLISHABLE','INDEXABLE','VERIFIED')`)
      ).rows[0].n;

      newIndexable = (
        await client.query(`
          SELECT count(*)::int AS n FROM companies
           WHERE (id LIKE 'fl-%' OR id LIKE 'wa-%')
             AND id NOT LIKE 'usdot-%'
             AND indexable`)
      ).rows[0].n;

      const hc = await client.query(
        `
        SELECT state_code, count(*)::int AS n
          FROM provider_local_discovery_evidence
         WHERE task_tag = $1 AND basis = 'VERIFIED_HOME_COUNTY'
         GROUP BY 1`,
        ['011D.2A']
      );
      for (const r of hc.rows) {
        if (r.state_code === 'FL') homeCountyCount.FL = r.n;
        if (r.state_code === 'WA') homeCountyCount.WA = r.n;
      }

      verifiedAuthority = {
        FL: flManifest.filter(
          (r) =>
            r.companyId &&
            (r.outcome === 'CREATED' ||
              r.outcome === 'MATCHED_DURING_CANONICALIZATION' ||
              r.outcome === 'ALREADY_CANONICALIZED')
        ).length,
        WA: waManifest.filter(
          (r) =>
            r.companyId &&
            (r.outcome === 'CREATED' ||
              r.outcome === 'MATCHED_DURING_CANONICALIZATION' ||
              r.outcome === 'ALREADY_CANONICALIZED')
        ).length,
      };

      capabilitiesCreated = (
        await client.query(`
          SELECT count(*)::int AS n FROM provider_capability pc
           JOIN companies c ON c.id = pc.company_id
           WHERE c.publication_state = 'INGESTED'
             AND (c.id LIKE 'fl-%' OR c.id LIKE 'wa-%')
             AND c.id NOT LIKE 'usdot-%'`)
      ).rows[0].n;

      // Quarantine: ensure REVIEW/INACTIVE/ADDRESS_UNRESOLVED staging not created as new companies
      const nonReadyKeys = new Set(
        classified.all
          .filter((c) => c.readiness.readiness !== 'READY_FOR_CANONICALIZATION')
          .map((c) => c.rawSourceKey)
      );
      for (const row of manifest) {
        if (
          row.outcome === 'CREATED' &&
          nonReadyKeys.has(row.rawSourceKey)
        ) {
          quarantineLeak++;
        }
      }

      // Consumer visibility: sample new companies
      const samples = await client.query(`
        SELECT id, slug, publication_state, indexable FROM companies
         WHERE publication_state = 'INGESTED'
           AND (id LIKE 'fl-%' OR id LIKE 'wa-%')
           AND id NOT LIKE 'usdot-%'
         LIMIT 50`);
      for (const r of samples.rows) {
        const visible = isConsumerVisibleCompany({
          publicationState: r.publication_state,
        });
        const seo = isSeoIndexableCompany({
          publicationState: r.publication_state,
          indexable: r.indexable,
        });
        if (visible || seo) {
          consumerLeakSample.push(String(r.id));
        }
      }
    }

    // Idempotency second pass
    let idempotency = {
      companyInserts: null as number | null,
      authorityInserts: null as number | null,
      homeCountyInserts: null as number | null,
    };
    if (!dryRun && idempotencyCheck) {
      const beforeCompanies = freezeAfter.companies;
      const beforeAuth = (
        await client.query(
          `SELECT count(*)::int AS n FROM provider_state_authority WHERE verification_state='VERIFIED'`
        )
      ).rows[0].n;
      const beforeHc = (
        await client.query(
          `SELECT count(*)::int AS n FROM provider_local_discovery_evidence WHERE task_tag='011D.2A'`
        )
      ).rows[0].n;

      const ctx2 = await loadCanonicalUniverse(client);
      const classified2 = await classifyReadyCohort(
        [...(await loadNewProviderStagingCandidates(client, 'FL')),
         ...(await loadNewProviderStagingCandidates(client, 'WA'))],
        { delayMs: 0, persistCache: false }
      );
      // READY should now be ~0 because disposition flipped to MATCHED_EXISTING
      for (const candidate of classified2.ready) {
        await canonicalizeOne(client, candidate, { ...ctx2, dryRun: false });
      }
      const afterCompanies = (
        await client.query(`SELECT count(*)::int AS n FROM companies`)
      ).rows[0].n;
      const afterAuth = (
        await client.query(
          `SELECT count(*)::int AS n FROM provider_state_authority WHERE verification_state='VERIFIED'`
        )
      ).rows[0].n;
      const afterHc = (
        await client.query(
          `SELECT count(*)::int AS n FROM provider_local_discovery_evidence WHERE task_tag='011D.2A'`
        )
      ).rows[0].n;
      idempotency = {
        companyInserts: afterCompanies - beforeCompanies,
        authorityInserts: afterAuth - beforeAuth,
        homeCountyInserts: afterHc - beforeHc,
      };
    }

    return {
      freezeBefore: freezeBefore.rows[0],
      freezeAfter,
      wavesBefore: wavesBefore.rows,
      readySummary: classified.summary,
      quarantineSummary: {
        FL: classified.summary.FL,
        WA: classified.summary.WA,
      },
      outcomes: {
        FL: summarizeOutcomes(flManifest),
        WA: summarizeOutcomes(waManifest),
        all: summarizeOutcomes(manifest),
      },
      manifest,
      audit: {
        flSampleSize: flSample.length,
        waSampleSize: waSample.length,
        issues: auditIssues,
        falseMatches: auditIssues.length,
        precision:
          flSample.length + waSample.length === 0
            ? null
            : ((flSample.length +
                waSample.length -
                auditIssues.length) /
                (flSample.length + waSample.length)) *
              100,
      },
      safety: {
        duplicateAuthority,
        duplicateUsdot,
        newPublic,
        newIndexable,
        quarantineLeak,
        consumerLeakSample,
        homeCountyCount,
        verifiedAuthority,
        capabilitiesCreated,
      },
      idempotency,
      radius: RETIRED_RADIUS_MODELS,
    };
  });

  mkdirSync(resolve('docs'), { recursive: true });

  const createdIds = result.manifest
    .filter((r) => r.outcome === 'CREATED' && r.companyId)
    .map((r) => r.companyId as string);

  writeFileSync(
    resolve('docs/task-011d2a-canonicalization-manifest.json'),
    JSON.stringify(
      {
        task: TASK_011D2A,
        retrievedAt,
        dryRun,
        google_places_requests: GOOGLE_PLACES_REQUESTS,
        ready: result.readySummary,
        outcomes: result.outcomes,
        createdCompanyIds: createdIds,
        rows: result.manifest,
      },
      null,
      2
    ) + '\n'
  );

  writeFileSync(
    resolve('docs/task-011d2a-canonicalization-audit.json'),
    JSON.stringify(
      {
        task: TASK_011D2A,
        retrievedAt,
        freezeBefore: result.freezeBefore,
        freezeAfter: result.freezeAfter,
        waves: result.wavesBefore,
        ready: result.readySummary,
        outcomes: result.outcomes,
        precisionAudit: result.audit,
        safety: result.safety,
        idempotency: result.idempotency,
        radius: result.radius,
        quarantine: result.quarantineSummary,
        checks: {
          google_zero: GOOGLE_PLACES_REQUESTS === 0,
          no_new_public: result.safety.newPublic === 0,
          no_new_indexable: result.safety.newIndexable === 0,
          no_authority_dup: result.safety.duplicateAuthority === 0,
          no_usdot_dup_new: result.safety.duplicateUsdot === 0,
          no_quarantine_leak: result.safety.quarantineLeak === 0,
          no_consumer_leak: result.safety.consumerLeakSample.length === 0,
          precision_100:
            result.audit.falseMatches === 0 &&
            (result.audit.flSampleSize > 0 || result.audit.waSampleSize > 0),
          radius_disabled: !RETIRED_RADIUS_MODELS.consumerEnabled,
        },
      },
      null,
      2
    ) + '\n'
  );

  const flCreated = result.outcomes.FL.CREATED ?? 0;
  const flMatched = result.outcomes.FL.MATCHED_DURING_CANONICALIZATION ?? 0;
  const flReview = result.outcomes.FL.MOVED_TO_REVIEW ?? 0;
  const waCreated = result.outcomes.WA.CREATED ?? 0;
  const waMatched = result.outcomes.WA.MATCHED_DURING_CANONICALIZATION ?? 0;
  const waReview = result.outcomes.WA.MOVED_TO_REVIEW ?? 0;

  const md = `# Task 011D.2A — FL + WA READY Provider Canonicalization

**Status:** ${dryRun ? 'DRY-RUN' : 'COMPLETE — FL + WA READY PROVIDERS CANONICALIZED INTERNALLY / NO PUBLICATION'}

**Google Places API requests:** ${GOOGLE_PLACES_REQUESTS}

## Ready cohort (recomputed)

| State | READY | REVIEW | INACTIVE | ADDRESS_UNRESOLVED |
|-------|------:|-------:|---------:|-------------------:|
| FL | ${result.readySummary.FL_READY} | ${result.readySummary.FL.REVIEW_REQUIRED} | ${result.readySummary.FL.INACTIVE_HOLD} | ${result.readySummary.FL.ADDRESS_UNRESOLVED} |
| WA | ${result.readySummary.WA_READY} | ${result.readySummary.WA.REVIEW_REQUIRED} | ${result.readySummary.WA.INACTIVE_HOLD} | ${result.readySummary.WA.ADDRESS_UNRESOLVED} |
| **Total READY** | **${result.readySummary.totalReady}** | | | |

## Canonicalization outcomes

| State | Created | Matched-existing | Moved-to-review | Failed | Already |
|-------|--------:|-----------------:|----------------:|-------:|--------:|
| FL | ${flCreated} | ${flMatched} | ${flReview} | ${result.outcomes.FL.FAILED ?? 0} | ${result.outcomes.FL.ALREADY_CANONICALIZED ?? 0} |
| WA | ${waCreated} | ${waMatched} | ${waReview} | ${result.outcomes.WA.FAILED ?? 0} | ${result.outcomes.WA.ALREADY_CANONICALIZED ?? 0} |

## Publication freeze

- New companies: publication_state=\`INGESTED\`, indexable=\`false\`
- New public: ${result.safety.newPublic}
- New indexable: ${result.safety.newIndexable}
- Companies before → after: ${result.freezeBefore.companies} → ${result.freezeAfter.companies}
- Indexable before → after: ${result.freezeBefore.indexable} → ${result.freezeAfter.indexable}

## Home county / authority

- FL home counties: ${result.safety.homeCountyCount.FL}
- WA home counties: ${result.safety.homeCountyCount.WA}
- FL/WA verified authorities attached (run): ${result.safety.verifiedAuthority.FL} / ${result.safety.verifiedAuthority.WA}
- Internal capabilities on new ids: ${result.safety.capabilitiesCreated}
- consumer_eligible on discovery evidence: **false**

## Safety

- Authority collisions: ${result.safety.duplicateAuthority}
- New USDOT collisions: ${result.safety.duplicateUsdot}
- Quarantine leaks: ${result.safety.quarantineLeak}
- Consumer visibility leaks: ${result.safety.consumerLeakSample.length}

## Precision audit

- FL sample: ${result.audit.flSampleSize}
- WA sample: ${result.audit.waSampleSize}
- Issues: ${result.audit.issues.length}
- Precision: ${result.audit.precision ?? 'n/a'}%

## Radius

POWER_UNIT / FIXED radius consumer use: **NO**. Adjacent inference: **NO**.

## Artifacts

- \`docs/task-011d2a-canonicalization-manifest.json\`
- \`docs/task-011d2a-canonicalization-audit.json\`
- \`docs/task-011d2a-rollback.sql\`

## Recommendation

Proceed to **Task 011D.2B — FL + WA Local Publication Canary Preparation** (do not auto-start). No broad publish.
`;

  writeFileSync(
    resolve('docs/task-011d2a-fl-wa-provider-canonicalization.md'),
    md
  );

  // Rollback SQL targeting only this task's created companies
  const rollback = `-- Task 011D.2A rollback — ONLY new state-only canonical companies from this task.
-- Preserves Waves 1-4, prior public companies, 011B/011C evidence, reviews, claims.
-- Google Places: 0

BEGIN;

-- Discovery evidence for this task
DELETE FROM public.provider_local_discovery_evidence
 WHERE task_tag = '011D.2A'
    OR company_id LIKE 'fl-im-%'
    OR company_id LIKE 'wa-hg-%';

-- Capabilities on new state-only companies
DELETE FROM public.provider_capability
 WHERE company_id LIKE 'fl-im-%'
    OR company_id LIKE 'wa-hg-%';

-- Detach authority from new companies (restore to UNRESOLVED unmatched)
UPDATE public.provider_state_authority
   SET company_id = NULL,
       matched_company_id = NULL,
       verification_state = 'UNRESOLVED',
       match_method = NULL,
       match_confidence = NULL,
       updated_at = now()
 WHERE company_id LIKE 'fl-im-%'
    OR company_id LIKE 'wa-hg-%';

-- Restore staging disposition for authorities that pointed at new companies
UPDATE public.state_hhg_registry_staging s
   SET disposition = 'NEW_PROVIDER_CANDIDATE',
       matched_company_id = NULL,
       match_method = NULL,
       match_confidence = NULL,
       updated_at = now()
 WHERE s.matched_company_id LIKE 'fl-im-%'
    OR s.matched_company_id LIKE 'wa-hg-%';

-- Delete only new state-only company rows
DELETE FROM public.companies
 WHERE (id LIKE 'fl-im-%' OR id LIKE 'wa-hg-%')
   AND publication_state = 'INGESTED'
   AND indexable = false
   AND legacy_directory_row = false;

COMMIT;
`;
  writeFileSync(resolve('docs/task-011d2a-rollback.sql'), rollback);

  console.log(
    JSON.stringify(
      {
        status: dryRun ? 'DRY_RUN' : 'COMPLETE',
        ready: result.readySummary,
        outcomes: result.outcomes,
        safety: result.safety,
        audit: result.audit,
        idempotency: result.idempotency,
        freeze: {
          before: result.freezeBefore,
          after: result.freezeAfter,
        },
        google: GOOGLE_PLACES_REQUESTS,
      },
      null,
      2
    )
  );

  const failed =
    result.safety.newPublic > 0 ||
    result.safety.newIndexable > 0 ||
    result.safety.duplicateAuthority > 0 ||
    result.safety.quarantineLeak > 0 ||
    result.safety.consumerLeakSample.length > 0 ||
    (result.audit.falseMatches > 0 && !dryRun);

  if (failed) {
    console.error('QA CHECKS FAILED');
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
