import { createAdminClient } from '@/lib/supabase/admin';
import { loadEnvLocal } from '../lib/verification/load-env-local';

loadEnvLocal();

const SLUGS = [
  'brothers-ez-moving-of-alabama',
  'jega-movers-llc',
  'budget-movers-of-augusta',
];

async function main() {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from('companies')
    .select('slug, name, overall_rating, review_count, verification_sources')
    .in('slug', SLUGS);

  if (error) {
    console.error(error);
    process.exit(1);
  }

  for (const c of data ?? []) {
    const g = (c.verification_sources as { google?: Record<string, unknown> } | null)?.google;
    console.log(
      JSON.stringify({
        slug: c.slug,
        name: c.name,
        overall_rating: c.overall_rating,
        review_count: c.review_count,
        google_status: g?.status,
        google_rating: g?.rating,
        google_reviews: g?.review_count,
        place_id: g?.place_id,
        snippets: Array.isArray(g?.review_snippets) ? g.review_snippets.length : 0,
      })
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});