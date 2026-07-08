import { loadEnvLocal } from '../lib/verification/load-env-local';
import { deriveUsdotStatus } from '@/lib/fmcsa/carrier-fields';
import { createAdminClient } from '@/lib/supabase/admin';

loadEnvLocal();

function asCarrier(raw: unknown): Record<string, unknown> | null {
  return raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : null;
}

function usdotStatusFromRow(row: Record<string, unknown>): string | null {
  const carrier = asCarrier(row.fmcsa_raw);
  if (carrier) return deriveUsdotStatus(carrier);
  if (row.out_of_service) return 'OUT OF SERVICE';
  return null;
}

async function main() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('companies')
    .select(
      'id, slug, name, is_verified, usdot_number, fmcsa_last_checked, fmcsa_raw, out_of_service'
    )
    .not('usdot_number', 'is', null)
    .neq('usdot_number', '');

  if (error) throw error;
  const rows = data ?? [];

  let noFmcsaRefresh = 0;
  let noDotStatus = 0;
  let unverifiedNoDotStatus = 0;
  let verifiedNoDotStatus = 0;
  let hasDotStatus = 0;

  for (const row of rows) {
    const status = usdotStatusFromRow(row);
    if (!row.fmcsa_last_checked) noFmcsaRefresh++;
    if (!status) {
      noDotStatus++;
      if (row.is_verified) verifiedNoDotStatus++;
      else unverifiedNoDotStatus++;
    } else {
      hasDotStatus++;
    }
  }

  console.log('=== Companies with USDOT on file ===\n');
  console.log(`Total with USDOT: ${rows.length}`);
  console.log(`Have USDOT status (ACTIVE/INACTIVE/OOS): ${hasDotStatus}`);
  console.log(`Missing USDOT status: ${noDotStatus}`);
  console.log(`  - is_verified=false: ${unverifiedNoDotStatus}`);
  console.log(`  - is_verified=true:  ${verifiedNoDotStatus}`);
  console.log(`Never got FMCSA refresh (fmcsa_last_checked null): ${noFmcsaRefresh}`);
  console.log(
    `\nUnverified + no DOT status: ${unverifiedNoDotStatus} (${((unverifiedNoDotStatus / rows.length) * 100).toFixed(1)}% of USDOT companies)`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});