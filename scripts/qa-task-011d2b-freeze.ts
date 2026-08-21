import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { loadEnvFiles, withDb } from '@/lib/state-hhg/calibration/db';
import {
  GOOGLE_PLACES_REQUESTS,
  FUTURE_PUBLICATION_PLAN,
  LOCAL_CANARY_WAVE_ID,
} from '@/lib/state-hhg/canary/types';
import { RETIRED_RADIUS_MODELS } from '@/lib/state-hhg/discovery/types';

async function main() {
  loadEnvFiles();
  await withDb(async (client) => {
    const totals = await client.query(`
      SELECT count(*)::int AS companies,
             count(*) FILTER (WHERE indexable)::int AS indexable,
             count(*) FILTER (WHERE publication_state='INGESTED')::int AS ingested
        FROM companies`);
    const waves = await client.query(`
      SELECT wave_id, count(*)::int AS n FROM federal_hhg_wave_publication
       WHERE status <> 'unpublished' GROUP BY 1 ORDER BY 1`);
    const pub = await client.query(`
      SELECT count(*)::int AS n FROM companies
       WHERE (id LIKE 'fl-%' OR id LIKE 'wa-%') AND id NOT LIKE 'usdot-%'
         AND (indexable OR publication_state IN ('PUBLISHABLE','INDEXABLE','VERIFIED'))`);
    const elig = await client.query(`
      SELECT count(*)::int AS n FROM provider_local_discovery_evidence
       WHERE consumer_eligible = true`);

    const flPath = resolve('docs/task-011d2b-fl-canary-manifest.json');
    const waPath = resolve('docs/task-011d2b-wa-canary-manifest.json');
    const fl = existsSync(flPath)
      ? JSON.parse(readFileSync(flPath, 'utf8'))
      : null;
    const wa = existsSync(waPath)
      ? JSON.parse(readFileSync(waPath, 'utf8'))
      : null;

    const t = totals.rows[0] as {
      companies: number;
      indexable: number;
      ingested: number;
    };
    const waveMap = Object.fromEntries(
      (waves.rows as Array<{ wave_id: string; n: number }>).map((r) => [
        r.wave_id,
        r.n,
      ])
    );

    const report = {
      task: '011D.2B',
      google_places_requests: GOOGLE_PLACES_REQUESTS,
      waveId: LOCAL_CANARY_WAVE_ID,
      publish: FUTURE_PUBLICATION_PLAN.publish,
      totals: t,
      waves: waves.rows,
      checks: {
        companies_approx_5870: t.companies === 5870,
        indexable_4905: t.indexable === 4905,
        ingested_929: t.ingested === 929,
        wave1: waveMap['FEDERAL_HHG_2026_08_WAVE_1'] === 1000,
        wave2: waveMap['FEDERAL_HHG_2026_08_WAVE_2'] === 1274,
        wave3: waveMap['FEDERAL_HHG_2026_08_WAVE_3'] === 1279,
        wave4: waveMap['FEDERAL_HHG_2026_08_WAVE_4_FINAL_CLEAN'] === 920,
        no_new_public_state_only: (pub.rows[0] as { n: number }).n === 0,
        no_consumer_eligible: (elig.rows[0] as { n: number }).n === 0,
        fl_manifest_50: fl?.selectedCount === 50,
        wa_manifest_30: wa?.selectedCount === 30,
        publish_false: fl?.publish === false && wa?.publish === false,
        google_zero: GOOGLE_PLACES_REQUESTS === 0,
        radius_disabled: !RETIRED_RADIUS_MODELS.consumerEnabled,
      },
    };

    writeFileSync(
      resolve('docs/task-011d2b-freeze-qa.json'),
      JSON.stringify(report, null, 2) + '\n'
    );
    console.log(JSON.stringify(report, null, 2));
    if (!Object.values(report.checks).every(Boolean)) process.exit(1);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
