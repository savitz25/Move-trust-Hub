import { loadEnvLocal } from '../lib/verification/load-env-local';
import { parseVerificationSources } from '@/lib/verification/backfill-helpers';
import { createAdminClient } from '@/lib/supabase/admin';

loadEnvLocal();

async function main() {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from('companies')
    .select(
      'id, slug, name, headquarters, is_verified, usdot_number, overall_rating, review_count, verification_sources, fmcsa_last_checked'
    )
    .order('slug');

  if (error) throw error;
  const rows = data ?? [];

  console.log(`Total companies: ${rows.length}\n`);

  const notVerified = rows.filter((r) => !r.is_verified);
  console.log(`is_verified=false (${notVerified.length}):`);
  for (const r of notVerified) {
    console.log(`  - ${r.slug} | ${r.name} | ${r.headquarters}`);
  }

  const noGoogle = rows.filter((r) => {
    const g = parseVerificationSources(r.verification_sources).google;
    return !g || g.status !== 'ok';
  });
  console.log(`\nNo Google ok (${noGoogle.length}):`);
  for (const r of noGoogle) {
    const g = parseVerificationSources(r.verification_sources).google;
    console.log(
      `  - ${r.slug} | ${r.name} | google=${g?.status ?? 'missing'} | ${r.overall_rating ?? '-'}★ ${r.review_count ?? 0} reviews`
    );
  }

  const ams = rows.filter((r) => r.slug.includes('all-my-sons'));
  console.log(`\nAll My Sons variants (${ams.length}):`);
  for (const r of ams) {
    const g = parseVerificationSources(r.verification_sources).google;
    console.log(
      `  - ${r.slug} | ${r.name} | verified=${r.is_verified} | google=${g?.status ?? 'missing'} | DOT ${r.usdot_number}`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});