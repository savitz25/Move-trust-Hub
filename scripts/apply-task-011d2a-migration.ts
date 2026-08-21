/**
 * Apply 011D.2A local discovery evidence migration (idempotent).
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { loadEnvFiles, withDb } from '@/lib/state-hhg/calibration/db';

async function main() {
  loadEnvFiles();
  const sql = readFileSync(
    resolve(
      'supabase/migrations/20260821160000_task_011d2a_local_discovery_evidence.sql'
    ),
    'utf8'
  );
  await withDb(async (client) => {
    await client.query(sql);
    const check = await client.query(
      `SELECT to_regclass('public.provider_local_discovery_evidence') AS t`
    );
    console.log(
      JSON.stringify(
        {
          applied: true,
          table: check.rows[0]?.t,
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
