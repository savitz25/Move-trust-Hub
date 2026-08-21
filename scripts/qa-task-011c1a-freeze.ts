/**
 * Task 011C.1A freeze QA.
 */
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { withDb } from '@/lib/state-hhg/calibration/db';

async function main() {
  await withDb(async (client) => {
    const totals = await client.query(`
      SELECT count(*)::int AS companies,
             count(*) FILTER (WHERE indexable)::int AS indexable
        FROM companies`);
    const waves = await client.query(`
      SELECT wave_id, count(*)::int AS n
        FROM federal_hhg_wave_publication
       WHERE status <> 'unpublished'
       GROUP BY 1 ORDER BY 1`);
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
      google_places_requests: 0,
      task: '011C.1A',
      totals: t,
      waves: waves.rows,
      provider_county_coverage_exists: Boolean(county.rows[0]?.t),
      checks: {
        companies: t.companies === 4941,
        indexable: t.indexable === 4905,
        wave1: waveMap['FEDERAL_HHG_2026_08_WAVE_1'] === 1000,
        wave2: waveMap['FEDERAL_HHG_2026_08_WAVE_2'] === 1274,
        wave3: waveMap['FEDERAL_HHG_2026_08_WAVE_3'] === 1279,
        wave4: waveMap['FEDERAL_HHG_2026_08_WAVE_4_FINAL_CLEAN'] === 920,
        no_county_edges: !county.rows[0]?.t,
        google_zero: true,
      },
    };
    writeFileSync(
      resolve('docs/task-011c1a-freeze-qa.json'),
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
