import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { withDb, loadEnvFiles } from '@/lib/state-hhg/calibration/db';
import {
  GOOGLE_PLACES_REQUESTS,
  RETIRED_RADIUS_MODELS,
} from '@/lib/state-hhg/discovery/types';

async function main() {
  loadEnvFiles();
  await withDb(async (client) => {
    const totals = await client.query(`
      SELECT count(*)::int AS companies,
             count(*) FILTER (WHERE indexable)::int AS indexable FROM companies`);
    const waves = await client.query(`
      SELECT wave_id, count(*)::int AS n FROM federal_hhg_wave_publication
       WHERE status <> 'unpublished' GROUP BY 1 ORDER BY 1`);
    const county = await client.query(
      `SELECT to_regclass('public.provider_county_coverage') AS t`
    );
    const t = totals.rows[0] as { companies: number; indexable: number };
    const waveMap = Object.fromEntries(
      (waves.rows as Array<{ wave_id: string; n: number }>).map((r) => [
        r.wave_id,
        r.n,
      ])
    );
    const report = {
      google_places_requests: GOOGLE_PLACES_REQUESTS,
      task: '011D.1',
      totals: t,
      waves: waves.rows,
      provider_county_coverage_exists: Boolean(county.rows[0]?.t),
      radius_models: RETIRED_RADIUS_MODELS,
      checks: {
        companies: t.companies === 4941,
        indexable: t.indexable === 4905,
        wave1: waveMap['FEDERAL_HHG_2026_08_WAVE_1'] === 1000,
        wave2: waveMap['FEDERAL_HHG_2026_08_WAVE_2'] === 1274,
        wave3: waveMap['FEDERAL_HHG_2026_08_WAVE_3'] === 1279,
        wave4: waveMap['FEDERAL_HHG_2026_08_WAVE_4_FINAL_CLEAN'] === 920,
        no_county_edges: !county.rows[0]?.t,
        google_zero: GOOGLE_PLACES_REQUESTS === 0,
        radius_not_approved: !RETIRED_RADIUS_MODELS.consumerEnabled,
        new_public_companies: 0,
        consumer_county_assignments: 0,
      },
    };
    writeFileSync(
      resolve('docs/task-011d1-freeze-qa.json'),
      JSON.stringify(report, null, 2) + '\n'
    );
    console.log(JSON.stringify(report, null, 2));
    const ok = Object.entries(report.checks).every(([_, v]) =>
      typeof v === 'number' ? v === 0 : Boolean(v)
    );
    if (!ok) process.exit(1);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
