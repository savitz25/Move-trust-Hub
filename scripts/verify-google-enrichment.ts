import { loadEnvLocal } from '../lib/verification/load-env-local';
import { parseVerificationSources } from '@/lib/verification/backfill-helpers';
import { createAdminClient } from '@/lib/supabase/admin';

loadEnvLocal();

const SLUGS = [
  'horne-moving-systems',
  'nilson-van-and-storage',
  'two-men-and-a-truck-gainesville',
  'mountain-lake-mover',
  'all-my-sons-moving-storage-birmingham',
  'lee-moving-storage',
  'mighty-moving-knoxville',
];

async function main() {
  const admin = createAdminClient();
  const { data } = await admin
    .from('companies')
    .select('slug, overall_rating, review_count, verification_sources')
    .in('slug', SLUGS);

  for (const row of data ?? []) {
    const g = parseVerificationSources(row.verification_sources).google;
    console.log(
      row.slug,
      '|',
      row.overall_rating,
      '★',
      row.review_count,
      'reviews',
      '|',
      g?.status,
      g?.review_snippets?.length ?? 0,
      'snippets'
    );
  }
}

main();