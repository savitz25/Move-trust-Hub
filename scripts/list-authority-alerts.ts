/**
 * List companies by FMCSA badge status (matches deriveFmcsaBadgeStatus).
 * Run: npx tsx --require ./scripts/stub-server-only.cjs scripts/list-authority-alerts.ts
 */
import { loadEnvLocal } from '../lib/verification/load-env-local';
import { createAdminClient } from '@/lib/supabase/admin';

loadEnvLocal();

type Badge = 'critical' | 'warning' | 'verified' | 'unknown';

function deriveBadge(row: {
  fmcsa_last_checked: string | null;
  out_of_service: boolean | null;
  authority_active: boolean | null;
  fmcsa_safety_rating: string | null;
}): Badge {
  if (!row.fmcsa_last_checked) return 'unknown';
  if (row.out_of_service || row.authority_active === false) return 'critical';
  if (
    row.fmcsa_safety_rating === 'Unsatisfactory' ||
    row.fmcsa_safety_rating === 'Conditional'
  ) {
    return 'warning';
  }
  if (row.fmcsa_safety_rating === 'Satisfactory' && row.authority_active !== false) {
    return 'verified';
  }
  return 'unknown';
}

async function main() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('companies')
    .select(
      'slug, name, usdot_number, fmcsa_last_checked, authority_active, out_of_service, fmcsa_safety_rating, is_verified'
    )
    .not('usdot_number', 'is', null)
    .neq('usdot_number', '');

  if (error) throw error;
  const rows = data ?? [];

  const by: Record<Badge, typeof rows> = {
    critical: [],
    warning: [],
    verified: [],
    unknown: [],
  };

  for (const row of rows) {
    by[deriveBadge(row)].push(row);
  }

  console.log('=== FMCSA badge breakdown (companies with USDOT) ===\n');
  console.log(`Total with USDOT: ${rows.length}`);
  console.log(`Authority Alert (critical): ${by.critical.length}`);
  console.log(`FMCSA Warning: ${by.warning.length}`);
  console.log(`FMCSA Verified: ${by.verified.length}`);
  console.log(`FMCSA Unverified (unknown): ${by.unknown.length}`);

  console.log('\n--- Authority Alert companies ---');
  for (const r of by.critical.sort((a, b) => a.slug.localeCompare(b.slug))) {
    console.log(
      `${r.slug} | ${r.name} | USDOT ${r.usdot_number} | auth=${r.authority_active} | oos=${r.out_of_service} | safety=${r.fmcsa_safety_rating ?? 'null'} | verified=${r.is_verified}`
    );
  }

  console.log('\n--- FMCSA Unverified (no fmcsa_last_checked or no Satisfactory rating) ---');
  for (const r of by.unknown.sort((a, b) => a.slug.localeCompare(b.slug)).slice(0, 20)) {
    console.log(
      `${r.slug} | ${r.name} | checked=${r.fmcsa_last_checked ? 'yes' : 'no'} | auth=${r.authority_active} | safety=${r.fmcsa_safety_rating ?? 'null'}`
    );
  }
  if (by.unknown.length > 20) {
    console.log(`... and ${by.unknown.length - 20} more`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});