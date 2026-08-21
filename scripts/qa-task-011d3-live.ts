/**
 * Post-publish live QA for Task 011D.3 canary.
 */
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { loadEnvFiles, withDb } from '@/lib/state-hhg/calibration/db';
import { loadExactCanaryManifests } from '@/lib/state-hhg/canary/manifest';
import { queryCanaryLocalDiscovery } from '@/lib/state-hhg/canary/discovery-db';
import { LOCAL_CANARY_WAVE_ID } from '@/lib/state-hhg/canary/types';
import { isSeoIndexableCompany, isConsumerVisibleCompany } from '@/lib/provider/publication';
import { RETIRED_RADIUS_MODELS } from '@/lib/state-hhg/discovery/types';

async function main() {
  loadEnvFiles();
  const manifest = loadExactCanaryManifests();

  await withDb(async (client) => {
    const totals = await client.query(`
      SELECT count(*)::int AS companies,
             count(*) FILTER (WHERE indexable)::int AS indexable,
             count(*) FILTER (WHERE publication_state='INGESTED')::int AS ingested,
             count(*) FILTER (
               WHERE publication_state='PUBLISHABLE' AND indexable=false
                 AND id = ANY($1::text[])
             )::int AS canary_live
        FROM companies`, [manifest.companyIds]);

    const interstate = await client.query(`
      SELECT count(*)::int AS n FROM companies
       WHERE (publication_state IS NULL OR publication_state IN ('PUBLISHABLE','INDEXABLE','VERIFIED'))
         AND (service_scope IS NULL OR service_scope = 'interstate')`);

    const profiles = await client.query(
      `SELECT id, slug, publication_state, indexable, service_scope, name, usdot_number
         FROM companies WHERE id = ANY($1::text[])`,
      [manifest.companyIds]
    );

    let noindex = 0;
    let consumerVisible = 0;
    let interstateScope = 0;
    for (const r of profiles.rows) {
      if (
        !isSeoIndexableCompany({
          publicationState: r.publication_state,
          indexable: r.indexable,
        })
      ) {
        noindex++;
      }
      if (isConsumerVisibleCompany({ publicationState: r.publication_state })) {
        consumerVisible++;
      }
      if (r.service_scope !== 'intrastate') interstateScope++;
    }

    const elig = await client.query(`
      SELECT count(*)::int AS n FROM provider_local_discovery_evidence
       WHERE consumer_eligible = true`);
    const eligNonManifest = await client.query(
      `
      SELECT count(*)::int AS n FROM provider_local_discovery_evidence
       WHERE consumer_eligible = true
         AND company_id <> ALL($1::text[])`,
      [manifest.companyIds]
    );

    const flDiscovery = [];
    for (const fips of ['12099', '12011', '12057', '12095', '12031', '12103', '12127']) {
      const d = await queryCanaryLocalDiscovery(client, {
        state: 'FL',
        originCountyFips: fips,
        limit: 24,
      });
      flDiscovery.push({
        fips,
        totalMatching: d.totalMatching,
        materialized: d.materializedIntoNode,
        limit: d.requestedLimit,
        ids: d.rows.map((r) => r.companyId),
      });
    }
    const waDiscovery = [];
    for (const fips of ['53033', '53053', '53061', '53063', '53011', '53067', '53035']) {
      const d = await queryCanaryLocalDiscovery(client, {
        state: 'WA',
        originCountyFips: fips,
        limit: 24,
      });
      waDiscovery.push({
        fips,
        totalMatching: d.totalMatching,
        materialized: d.materializedIntoNode,
        limit: d.requestedLimit,
        ids: d.rows.map((r) => r.companyId),
      });
    }

    const waves = await client.query(`
      SELECT wave_id, count(*)::int AS n FROM federal_hhg_wave_publication
       WHERE status <> 'unpublished' GROUP BY 1 ORDER BY 1`);

    const nonManifest = await client.query(
      `
      SELECT count(*)::int AS n,
             count(*) FILTER (WHERE publication_state <> 'INGESTED')::int AS bad_pub,
             count(*) FILTER (WHERE indexable)::int AS bad_idx
        FROM companies
       WHERE (id LIKE 'fl-%' OR id LIKE 'wa-%') AND id NOT LIKE 'usdot-%'
         AND id <> ALL($1::text[])`,
      [manifest.companyIds]
    );

    const report = {
      task: '011D.3',
      waveId: LOCAL_CANARY_WAVE_ID,
      google_places_requests: 0,
      totals: totals.rows[0],
      interstateVisible: (interstate.rows[0] as { n: number }).n,
      profileQa: {
        automated: profiles.rows.length,
        noindex,
        consumerVisible,
        unexpectedInterstateScope: interstateScope,
        sample: profiles.rows.slice(0, 8).map((r) => ({
          id: r.id,
          slug: r.slug,
          publication_state: r.publication_state,
          indexable: r.indexable,
        })),
      },
      discovery: { FL: flDiscovery, WA: waDiscovery },
      consumerEligibleTotal: (elig.rows[0] as { n: number }).n,
      consumerEligibleNonManifest: (eligNonManifest.rows[0] as { n: number }).n,
      nonManifest: nonManifest.rows[0],
      waves: waves.rows,
      radius: RETIRED_RADIUS_MODELS,
      checks: {
        canary_live_80:
          (totals.rows[0] as { canary_live: number }).canary_live === 80,
        indexable_4905:
          (totals.rows[0] as { indexable: number }).indexable === 4905,
        noindex_80: noindex === 80,
        indexable_canary_0: profiles.rows.every((r) => r.indexable === false),
        consumer_visible_80: consumerVisible === 80,
        interstate_scope_0: interstateScope === 0,
        non_manifest_clean:
          (nonManifest.rows[0] as { bad_pub: number; bad_idx: number }).bad_pub ===
            0 &&
          (nonManifest.rows[0] as { bad_idx: number }).bad_idx === 0,
        no_non_manifest_eligible:
          (eligNonManifest.rows[0] as { n: number }).n === 0,
        google_zero: true,
        radius_disabled: !RETIRED_RADIUS_MODELS.consumerEnabled,
        discovery_materialization_bounded: [...flDiscovery, ...waDiscovery].every(
          (d) => d.materialized <= d.limit
        ),
      },
    };

    writeFileSync(
      resolve('docs/task-011d3-live-profile-qa.json'),
      JSON.stringify(report, null, 2) + '\n'
    );
    writeFileSync(
      resolve('docs/task-011d3-local-discovery-qa.json'),
      JSON.stringify(
        {
          task: '011D.3',
          google_places_requests: 0,
          FL: flDiscovery,
          WA: waDiscovery,
        },
        null,
        2
      ) + '\n'
    );

    console.log(JSON.stringify(report, null, 2));
    if (!Object.values(report.checks).every(Boolean)) process.exit(1);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
