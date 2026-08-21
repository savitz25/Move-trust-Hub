import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { loadEnvFiles, withDb } from '@/lib/state-hhg/calibration/db';
import { GOOGLE_PLACES_REQUESTS } from '@/lib/state-hhg/canonicalization/types';
import { RETIRED_RADIUS_MODELS } from '@/lib/state-hhg/discovery/types';
import { isConsumerVisibleCompany, isSeoIndexableCompany } from '@/lib/provider/publication';

async function main() {
  loadEnvFiles();
  await withDb(async (client) => {
    const totals = await client.query(`
      SELECT count(*)::int AS companies,
             count(*) FILTER (WHERE indexable)::int AS indexable,
             count(*) FILTER (WHERE publication_state='INGESTED')::int AS ingested,
             count(*) FILTER (
               WHERE publication_state='INGESTED'
                 AND (id LIKE 'fl-%' OR id LIKE 'wa-%')
                 AND id NOT LIKE 'usdot-%'
             )::int AS state_only_new
        FROM companies`);
    const waves = await client.query(`
      SELECT wave_id, count(*)::int AS n FROM federal_hhg_wave_publication
       WHERE status <> 'unpublished' GROUP BY 1 ORDER BY 1`);
    const pub = await client.query(`
      SELECT count(*)::int AS n FROM companies
       WHERE (id LIKE 'fl-%' OR id LIKE 'wa-%')
         AND id NOT LIKE 'usdot-%'
         AND (indexable OR publication_state IN ('PUBLISHABLE','INDEXABLE','VERIFIED'))`);
    const county = await client.query(
      `SELECT to_regclass('public.provider_county_coverage') AS t`
    );
    const discovery = await client.query(
      `SELECT to_regclass('public.provider_local_discovery_evidence') AS t`
    );
    const consumerEligible = await client.query(`
      SELECT count(*)::int AS n FROM provider_local_discovery_evidence
       WHERE consumer_eligible = true AND task_tag = '011D.2A'`).catch(() => ({
      rows: [{ n: 0 }],
    }));

    const sample = await client.query(`
      SELECT id, publication_state, indexable FROM companies
       WHERE publication_state='INGESTED'
         AND (id LIKE 'fl-%' OR id LIKE 'wa-%')
         AND id NOT LIKE 'usdot-%'
       LIMIT 100`);
    let consumerLeaks = 0;
    for (const r of sample.rows) {
      if (
        isConsumerVisibleCompany({ publicationState: r.publication_state }) ||
        isSeoIndexableCompany({
          publicationState: r.publication_state,
          indexable: r.indexable,
        })
      ) {
        consumerLeaks++;
      }
    }

    const t = totals.rows[0] as {
      companies: number;
      indexable: number;
      ingested: number;
      state_only_new: number;
    };
    const waveMap = Object.fromEntries(
      (waves.rows as Array<{ wave_id: string; n: number }>).map((r) => [
        r.wave_id,
        r.n,
      ])
    );

    const report = {
      task: '011D.2A',
      google_places_requests: GOOGLE_PLACES_REQUESTS,
      totals: t,
      waves: waves.rows,
      new_public_or_indexable_state_only: (pub.rows[0] as { n: number }).n,
      consumer_eligible_discovery_edges: (consumerEligible.rows[0] as { n: number })
        .n,
      provider_county_coverage_exists: Boolean(county.rows[0]?.t),
      discovery_table_exists: Boolean(discovery.rows[0]?.t),
      radius: RETIRED_RADIUS_MODELS,
      checks: {
        indexable_unchanged_4905: t.indexable === 4905,
        wave1: waveMap['FEDERAL_HHG_2026_08_WAVE_1'] === 1000,
        wave2: waveMap['FEDERAL_HHG_2026_08_WAVE_2'] === 1274,
        wave3: waveMap['FEDERAL_HHG_2026_08_WAVE_3'] === 1279,
        wave4: waveMap['FEDERAL_HHG_2026_08_WAVE_4_FINAL_CLEAN'] === 920,
        no_county_coverage_table: !county.rows[0]?.t,
        no_new_public_state_only: (pub.rows[0] as { n: number }).n === 0,
        no_consumer_eligible_edges:
          (consumerEligible.rows[0] as { n: number }).n === 0,
        no_consumer_leaks_in_sample: consumerLeaks === 0,
        google_zero: GOOGLE_PLACES_REQUESTS === 0,
        radius_disabled: !RETIRED_RADIUS_MODELS.consumerEnabled,
      },
    };

    writeFileSync(
      resolve('docs/task-011d2a-freeze-qa.json'),
      JSON.stringify(report, null, 2) + '\n'
    );
    console.log(JSON.stringify(report, null, 2));
    const ok = Object.values(report.checks).every(Boolean);
    if (!ok) process.exit(1);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
