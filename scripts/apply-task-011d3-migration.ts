import { readFileSync } from 'fs';
import { resolve } from 'path';
import { loadEnvFiles, withDb } from '@/lib/state-hhg/calibration/db';

async function main() {
  loadEnvFiles();
  const sql = readFileSync(
    resolve(
      'supabase/migrations/20260821180000_task_011d3_local_canary_publication.sql'
    ),
    'utf8'
  );
  await withDb(async (client) => {
    await client.query(sql);
    const t = await client.query(
      `SELECT to_regclass('public.local_hhg_canary_publication') AS t`
    );
    const fn = await client.query(`
      SELECT proname FROM pg_proc WHERE proname = 'local_canary_movers_for_county'`);
    console.log(
      JSON.stringify(
        {
          table: t.rows[0]?.t,
          rpc: fn.rows[0]?.proname ?? null,
          google_places_requests: 0,
        },
        null,
        2
      )
    );
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
