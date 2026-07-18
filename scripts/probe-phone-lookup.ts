import { loadEnvLocal } from '../lib/verification/load-env-local';
import { createAdminClient } from '@/lib/supabase/admin';

loadEnvLocal();

const PHONE = process.argv[2] ?? '6147175780';

async function probeGoogleQueries(queries: string[]) {
  const key = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!key) {
    console.error('GOOGLE_PLACES_API_KEY not configured');
    process.exit(1);
  }

  console.log('=== Google Places queries ===');
  for (const textQuery of queries) {
    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': [
          'places.id',
          'places.displayName',
          'places.formattedAddress',
          'places.rating',
          'places.userRatingCount',
          'places.nationalPhoneNumber',
        ].join(','),
      },
      body: JSON.stringify({ textQuery, maxResultCount: 2 }),
    });

    const json = (await res.json()) as {
      places?: Array<{
        id?: string;
        displayName?: { text?: string };
        formattedAddress?: string;
        rating?: number;
        userRatingCount?: number;
        nationalPhoneNumber?: string;
      }>;
      error?: { message?: string };
    };

    const place = json.places?.[0];
    if (place) {
      console.log(
        `${textQuery} → ${place.displayName?.text} | ${place.formattedAddress} | ${place.rating}★ ${place.userRatingCount} reviews | phone=${place.nationalPhoneNumber ?? '—'} | id=${place.id}`
      );
    } else {
      console.log(`${textQuery} → NO MATCH${json.error?.message ? ` (${json.error.message})` : ''}`);
    }
  }
}

async function probeDb() {
  const admin = createAdminClient();

  const { count } = await admin.from('companies').select('*', { count: 'exact', head: true });
  console.log(`\n=== DB (${count ?? 0} companies) ===`);

  const searches = ['%JEGA%', '%Two Men%', '%Columbus%', '%614%'];
  for (const pattern of searches) {
    const { data, error } = await admin
      .from('companies')
      .select('slug, name, headquarters, overall_rating, review_count')
      .ilike('name', pattern)
      .limit(15);
    if (error) {
      console.log(`search ${pattern}: ${error.message}`);
      continue;
    }
    if (data?.length) {
      console.log(`\nname ILIKE ${pattern}:`);
      for (const row of data) {
        console.log(`  ${row.slug} | ${row.name} | ${row.headquarters ?? '—'} | ${row.overall_rating ?? '—'}★ ${row.review_count ?? 0}`);
      }
    }
  }

  const slugs = [
    'jega-movers-llc',
    'two-men-and-a-truck-franklin-oh',
    'two-men-and-a-truck-columbus',
    'horne-moving-systems',
  ];
  console.log('\n=== Slug check ===');
  for (const slug of slugs) {
    const { data } = await admin
      .from('companies')
      .select('slug, name, headquarters, overall_rating, review_count')
      .eq('slug', slug)
      .maybeSingle();
    console.log(data ? `${slug}: ${data.name} (${data.headquarters})` : `${slug}: NOT FOUND`);
  }
}

async function main() {
  const digits = PHONE.replace(/\D/g, '');
  await probeGoogleQueries([
    PHONE,
    `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`,
    `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`,
    `Two Men and a Truck ${PHONE}`,
    `Two Men and a Truck Columbus OH ${PHONE}`,
    'Two Men and a Truck Moving and Storage Columbus OH',
    '5083 Westerville Rd Columbus OH',
  ]);
  await probeDb();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});