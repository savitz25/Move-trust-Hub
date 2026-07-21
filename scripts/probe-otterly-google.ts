/**
 * Live probe: Otterly Elite Movers LLC (Oregon) Google Places matching.
 * Run: npx tsx scripts/probe-otterly-google.ts
 */
import { loadEnvLocal } from '../lib/verification/load-env-local';
import { fetchGooglePlacesData } from '../lib/verification/google-places';
import { buildGooglePlacesQueryVariants } from '../lib/verification/google-places-name-queries';

loadEnvLocal();

async function main() {
  const cases = [
    {
      label: 'local onboarding shape (name + OR, no polluted HQ)',
      input: {
        legalName: 'Otterly Elite Movers LLC',
        state: 'OR',
        headquarters: 'OR',
        businessCategory: 'local moving company',
        phone: '(541) 900-6565',
      },
    },
    {
      label: 'FMCSA-style Winston OR + phone',
      input: {
        legalName: 'Otterly Elite Movers LLC',
        city: 'Winston',
        state: 'OR',
        headquarters: '21 SE Edwards Ave, Winston, OR 97496',
        phone: '(541) 900-6565',
      },
    },
    {
      label: 'cleaned trade name + Oregon',
      input: {
        legalName: 'Otterly Elite Movers',
        state: 'OR',
      },
    },
  ];

  for (const c of cases) {
    console.log('\n========', c.label, '========');
    const variants = buildGooglePlacesQueryVariants(c.input);
    console.log(
      'first variants:',
      variants.slice(0, 5).map((v) => `${v.strategy}: ${v.textQuery}`)
    );
    const g = await fetchGooglePlacesData(c.input);
    console.log({
      status: g.status,
      name: g.name,
      rating: g.rating,
      review_count: g.review_count,
      phone: g.phone,
      website: g.website_url,
      address: g.formatted_address,
      error: g.error,
      match: g.raw_response
        ? {
            strategy: g.raw_response.match_strategy,
            query: g.raw_response.match_query,
            score: g.raw_response.match_score,
          }
        : null,
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
