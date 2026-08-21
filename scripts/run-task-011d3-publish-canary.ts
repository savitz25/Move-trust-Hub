/**
 * Task 011D.3 — publish OR rollback exact 80 local canary.
 *
 *   npx tsx scripts/run-task-011d3-publish-canary.ts --dry-run
 *   npx tsx scripts/run-task-011d3-publish-canary.ts --publish
 *   npx tsx scripts/run-task-011d3-publish-canary.ts --publish --idempotency-check
 *   npx tsx scripts/run-task-011d3-publish-canary.ts --rollback
 *
 * Google Places: 0. Rejects non-manifest IDs.
 */
import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { loadEnvFiles, withDb } from '@/lib/state-hhg/calibration/db';
import { loadExactCanaryManifests } from '@/lib/state-hhg/canary/manifest';
import {
  publishLocalCanary,
  rollbackLocalCanary,
  validateCanaryPrePublish,
} from '@/lib/state-hhg/canary/publish';
import { queryCanaryLocalDiscovery } from '@/lib/state-hhg/canary/discovery-db';
import { LOCAL_CANARY_WAVE_ID } from '@/lib/state-hhg/canary/types';
import { isSeoIndexableCompany } from '@/lib/provider/publication';
import { RETIRED_RADIUS_MODELS } from '@/lib/state-hhg/discovery/types';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const doPublish = args.includes('--publish');
const doRollback = args.includes('--rollback');
const idempotencyCheck = args.includes('--idempotency-check');

async function main() {
  if (!dryRun && !doPublish && !doRollback) {
    console.error('Specify --dry-run, --publish, or --rollback');
    process.exit(1);
  }
  if (doPublish && doRollback) {
    console.error('Cannot --publish and --rollback together');
    process.exit(1);
  }

  loadEnvFiles();
  const manifest = loadExactCanaryManifests();
  const retrievedAt = new Date().toISOString();

  const result = await withDb(async (client) => {
    const table = await client.query(
      `SELECT to_regclass('public.local_hhg_canary_publication') AS t`
    );
    if (!table.rows[0]?.t && (doPublish || doRollback) && !dryRun) {
      throw new Error('local_hhg_canary_publication missing — run migrate first');
    }

    const freezeBefore = await client.query(`
      SELECT count(*)::int AS companies,
             count(*) FILTER (WHERE indexable)::int AS indexable,
             count(*) FILTER (
               WHERE publication_state IN ('PUBLISHABLE','INDEXABLE','VERIFIED')
                  OR publication_state IS NULL
             )::int AS publicish,
             count(*) FILTER (WHERE publication_state='INGESTED')::int AS ingested,
             count(*) FILTER (
               WHERE publication_state='PUBLISHABLE' AND indexable=false
                 AND (id LIKE 'fl-%' OR id LIKE 'wa-%') AND id NOT LIKE 'usdot-%'
             )::int AS canary_publishable
        FROM companies`);

    const interstateBefore = await client.query(`
      SELECT count(*)::int AS n FROM companies
       WHERE (publication_state IS NULL OR publication_state IN ('PUBLISHABLE','INDEXABLE','VERIFIED'))
         AND (service_scope IS NULL OR service_scope = 'interstate')`);

    const pre = await validateCanaryPrePublish(client, manifest.companyIds);

    let publishResult = null;
    let rollbackResult = null;

    if (doRollback) {
      rollbackResult = await rollbackLocalCanary(client, manifest);
    } else if (doPublish || dryRun) {
      // Reject probe: non-manifest id must fail
      const rejectProbe = await publishLocalCanary(client, manifest, {
        dryRun: true,
        companyIds: [...manifest.companyIds, 'usdot-9999999'],
      });

      publishResult = await publishLocalCanary(client, manifest, {
        dryRun,
        companyIds: pre.validIds,
      });
      (publishResult as { rejectProbe?: unknown }).rejectProbe = rejectProbe;

      if (doPublish && idempotencyCheck && !dryRun) {
        const again = await publishLocalCanary(client, manifest, {
          dryRun: false,
        });
        (publishResult as { idempotency?: unknown }).idempotency = {
          publishedSecondPass: again.published,
          excludedSecond: again.excluded.length,
        };
      }
    }

    const freezeAfter = await client.query(`
      SELECT count(*)::int AS companies,
             count(*) FILTER (WHERE indexable)::int AS indexable,
             count(*) FILTER (
               WHERE publication_state IN ('PUBLISHABLE','INDEXABLE','VERIFIED')
                  OR publication_state IS NULL
             )::int AS publicish,
             count(*) FILTER (WHERE publication_state='INGESTED')::int AS ingested,
             count(*) FILTER (
               WHERE publication_state='PUBLISHABLE' AND indexable=false
                 AND (id LIKE 'fl-%' OR id LIKE 'wa-%') AND id NOT LIKE 'usdot-%'
             )::int AS canary_publishable
        FROM companies`);

    const interstateAfter = await client.query(`
      SELECT count(*)::int AS n FROM companies
       WHERE (publication_state IS NULL OR publication_state IN ('PUBLISHABLE','INDEXABLE','VERIFIED'))
         AND (service_scope IS NULL OR service_scope = 'interstate')`);

    const consumerEligible = await client.query(`
      SELECT count(*)::int AS n FROM provider_local_discovery_evidence
       WHERE consumer_eligible = true AND basis = 'VERIFIED_HOME_COUNTY'`);

    const wavePublished = await client.query(
      `
      SELECT count(*)::int AS n FROM local_hhg_canary_publication
       WHERE wave_id = $1 AND status = 'published'`,
      [LOCAL_CANARY_WAVE_ID]
    ).catch(() => ({ rows: [{ n: 0 }] }));

    const nonManifest = await client.query(
      `
      SELECT count(*)::int AS n,
             count(*) FILTER (WHERE publication_state <> 'INGESTED')::int AS bad_pub,
             count(*) FILTER (WHERE indexable)::int AS bad_idx
        FROM companies
       WHERE (id LIKE 'fl-%' OR id LIKE 'wa-%')
         AND id NOT LIKE 'usdot-%'
         AND id <> ALL($1::text[])`,
      [manifest.companyIds]
    );

    // Profile SEO sample
    const profiles = await client.query(
      `
      SELECT id, slug, publication_state, indexable, service_scope, name
        FROM companies WHERE id = ANY($1::text[])`,
      [manifest.companyIds]
    );
    let noindexOk = 0;
    let indexableBad = 0;
    for (const r of profiles.rows) {
      const seo = isSeoIndexableCompany({
        publicationState: r.publication_state,
        indexable: r.indexable,
      });
      if (!seo) noindexOk++;
      if (r.indexable) indexableBad++;
    }

    // Discovery samples
    const flCounties = ['12099', '12011', '12057', '12095', '12031', '12103', '12127'];
    const waCounties = ['53033', '53053', '53061', '53063', '53011', '53067', '53035'];
    const flDiscovery = [];
    const waDiscovery = [];
    if (!dryRun && (doPublish || doRollback)) {
      for (const fips of flCounties) {
        flDiscovery.push(await queryCanaryLocalDiscovery(client, { state: 'FL', originCountyFips: fips, limit: 24 }));
      }
      for (const fips of waCounties) {
        waDiscovery.push(await queryCanaryLocalDiscovery(client, { state: 'WA', originCountyFips: fips, limit: 24 }));
      }
    }

    const waves = await client.query(`
      SELECT wave_id, count(*)::int AS n FROM federal_hhg_wave_publication
       WHERE status <> 'unpublished' GROUP BY 1 ORDER BY 1`);

    return {
      freezeBefore: freezeBefore.rows[0],
      freezeAfter: freezeAfter.rows[0],
      interstateBefore: (interstateBefore.rows[0] as { n: number }).n,
      interstateAfter: (interstateAfter.rows[0] as { n: number }).n,
      pre,
      publishResult,
      rollbackResult,
      consumerEligible: (consumerEligible.rows[0] as { n: number }).n,
      wavePublished: (wavePublished.rows[0] as { n: number }).n,
      nonManifest: nonManifest.rows[0],
      seo: { noindexOk, indexableBad, profileCount: profiles.rows.length },
      flDiscovery,
      waDiscovery,
      waves: waves.rows,
      sampleProfiles: profiles.rows.slice(0, 5),
    };
  });

  mkdirSync(resolve('docs'), { recursive: true });

  const decision =
    doRollback
      ? 'ROLLED_BACK'
      : dryRun
        ? 'DRY_RUN'
        : result.publishResult &&
            result.pre.excluded.length === 0 &&
            result.seo.indexableBad === 0 &&
            result.interstateAfter === result.interstateBefore
          ? 'KEEP_CANARY_NOINDEX'
          : 'REVIEW';

  const audit = {
    task: '011D.3',
    retrievedAt,
    waveId: LOCAL_CANARY_WAVE_ID,
    google_places_requests: 0,
    mode: dryRun ? 'dry-run' : doRollback ? 'rollback' : 'publish',
    decision,
    manifest: {
      fl: 50,
      wa: 30,
      flSha: manifest.flSha,
      waSha: manifest.waSha,
      companyIds: manifest.companyIds.length,
    },
    prePublish: {
      valid: result.pre.validIds.length,
      excluded: result.pre.excluded,
    },
    publishResult: result.publishResult,
    rollbackResult: result.rollbackResult,
    counts: {
      before: result.freezeBefore,
      after: result.freezeAfter,
      interstateBefore: result.interstateBefore,
      interstateAfter: result.interstateAfter,
      interstateDelta: result.interstateAfter - result.interstateBefore,
      consumerEligibleHomeCounty: result.consumerEligible,
      wavePublished: result.wavePublished,
      nonManifest: result.nonManifest,
    },
    seo: result.seo,
    radius: RETIRED_RADIUS_MODELS,
    federalWaves: result.waves,
  };

  writeFileSync(
    resolve('docs/task-011d3-canary-publication-audit.json'),
    JSON.stringify(audit, null, 2) + '\n'
  );

  writeFileSync(
    resolve('docs/task-011d3-local-discovery-qa.json'),
    JSON.stringify(
      {
        task: '011D.3',
        retrievedAt,
        google_places_requests: 0,
        FL: result.flDiscovery.map((d, i) => ({
          countyFips: ['12099', '12011', '12057', '12095', '12031', '12103', '12127'][i],
          totalMatching: d.totalMatching,
          materialized: d.materializedIntoNode,
          limit: d.requestedLimit,
          path: d.path,
          ids: d.rows.map((r) => r.companyId),
        })),
        WA: result.waDiscovery.map((d, i) => ({
          countyFips: ['53033', '53053', '53061', '53063', '53011', '53067', '53035'][i],
          totalMatching: d.totalMatching,
          materialized: d.materializedIntoNode,
          limit: d.requestedLimit,
          path: d.path,
          ids: d.rows.map((r) => r.companyId),
        })),
      },
      null,
      2
    ) + '\n'
  );

  console.log(JSON.stringify(audit, null, 2));

  if (
    doPublish &&
    !dryRun &&
    (result.pre.excluded.length > 0 ||
      result.seo.indexableBad > 0 ||
      result.interstateAfter !== result.interstateBefore ||
      (result.publishResult?.rejectedNonManifest.length ?? 0) > 0)
  ) {
    console.error('PUBLICATION GATE FAILED');
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
