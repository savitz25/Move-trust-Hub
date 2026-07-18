import { loadEnvLocal } from '../lib/verification/load-env-local';
import { createAdminClient } from '@/lib/supabase/admin';
import { fetchGooglePlacesData } from '@/lib/verification/google-places';
import type { CompanyEnrichmentInput } from '@/lib/verification/types';

loadEnvLocal();

const QUERY_VARIANTS: Record<string, CompanyEnrichmentInput[]> = {
  'brothers-ez-moving-of-alabama': [
    { legalName: 'Brothers EZ Moving of Alabama', headquarters: 'Killen, AL', city: 'Killen', state: 'AL' },
    { legalName: 'Brothers EZ Moving', headquarters: 'Killen, AL', city: 'Killen', state: 'AL' },
    { legalName: 'Brothers EZ Moving Shoals', headquarters: 'Killen, AL', city: 'Killen', state: 'AL' },
    { legalName: 'Brothers EZ Moving of Alabama', headquarters: 'Florence, AL', city: 'Florence', state: 'AL' },
    { legalName: 'Brothers EZ Moving', headquarters: 'Muscle Shoals, AL', city: 'Muscle Shoals', state: 'AL' },
  ],
  'jega-movers-llc': [
    { legalName: 'JEGA Movers LLC', headquarters: 'Columbia, SC', city: 'Columbia', state: 'SC' },
    { legalName: 'JEGA Movers', headquarters: 'Columbia, SC', city: 'Columbia', state: 'SC' },
    { legalName: 'JEGA TRANSPORT LLC', headquarters: 'Columbia, SC', city: 'Columbia', state: 'SC' },
    { legalName: 'JEGA Movers', headquarters: '948 Custer Street Columbia, SC', city: 'Columbia', state: 'SC' },
  ],
  'budget-movers-of-augusta': [
    { legalName: 'Budget Movers of Augusta Inc', headquarters: 'Augusta, GA', city: 'Augusta', state: 'GA' },
    { legalName: 'Budget Movers of Augusta', headquarters: 'Augusta, GA', city: 'Augusta', state: 'GA' },
    { legalName: 'Budget Movers Augusta', headquarters: 'Augusta, GA', city: 'Augusta', state: 'GA' },
    { legalName: 'Budget Movers of Augusta Inc', headquarters: 'Evans, GA', city: 'Evans', state: 'GA' },
    { legalName: 'Budget Movers', headquarters: 'Augusta, GA', city: 'Augusta', state: 'GA' },
  ],
};

const RAW_QUERIES: Record<string, string[]> = {
  'brothers-ez-moving-of-alabama': [
    'Brothers EZ Moving of Alabama Killen AL',
    'Brothers EZ Moving Killen Alabama',
    'Brothers EZ Moving Shoals',
  ],
  'jega-movers-llc': [
    'JEGA Movers LLC Columbia SC',
    'JEGA Movers Columbia South Carolina',
    'JEGA Movers 948 Custer Street Columbia SC',
  ],
  'budget-movers-of-augusta': [
    'Budget Movers of Augusta Inc Augusta GA',
    'Budget Movers Augusta Georgia',
    'Budget Movers of Augusta Evans GA',
  ],
};

async function directSearch(textQuery: string) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!apiKey) return { status: 0, places: [], error: 'no key' };

  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount',
    },
    body: JSON.stringify({ textQuery, maxResultCount: 3 }),
  });
  const body = await res.text();
  let json: { places?: Array<Record<string, unknown>>; error?: { message?: string } } = {};
  try {
    json = JSON.parse(body);
  } catch {
    return { status: res.status, places: [], error: body.slice(0, 200) };
  }
  return {
    status: res.status,
    places: (json.places ?? []) as Array<{
      id?: string;
      displayName?: { text?: string };
      formattedAddress?: string;
      rating?: number;
      userRatingCount?: number;
    }>,
    error: json.error?.message,
  };
}

async function main() {
  const admin = createAdminClient();
  const slugs = Object.keys(QUERY_VARIANTS);

  for (const slug of slugs) {
    const { data: company } = await admin
      .from('companies')
      .select('slug, name, headquarters, usdot_number')
      .eq('slug', slug)
      .maybeSingle();

    console.log(`\n======== ${slug} ========`);
    console.log(`DB: ${company?.name} | HQ: ${company?.headquarters} | DOT: ${company?.usdot_number}`);

    for (const q of QUERY_VARIANTS[slug]) {
      const g = await fetchGooglePlacesData(q);
      const label = `${q.legalName} @ ${q.city}, ${q.state}`;
      if (g.status === 'ok') {
        console.log(`  OK  ${label} → ${g.rating}★ ${g.review_count} | ${g.name} | ${g.formatted_address}`);
      } else {
        console.log(`  MISS ${label} → ${g.status}${g.error ? ` (${g.error})` : ''}`);
      }
    }

    for (const textQuery of RAW_QUERIES[slug]) {
      const { status, places, error } = await directSearch(textQuery);
      console.log(`  RAW [${status}] "${textQuery}"${error ? ` err=${error}` : ''}`);
      for (const p of places) {
        console.log(`    → ${p.rating}★ ${p.userRatingCount} | ${p.displayName?.text} | ${p.formattedAddress} | ${p.id}`);
      }
      if (!places.length) console.log('    → no results');
    }
  }
}

main().catch(console.error);