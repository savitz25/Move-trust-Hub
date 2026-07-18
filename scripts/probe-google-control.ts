import { loadEnvLocal } from '../lib/verification/load-env-local';
import { fetchGooglePlacesData } from '@/lib/verification/google-places';

loadEnvLocal();

async function directSearch(textQuery: string, extra?: Record<string, unknown>) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey!,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount',
    },
    body: JSON.stringify({ textQuery, maxResultCount: 3, ...extra }),
  });
  const json = await res.json();
  console.log(`\n[${res.status}] ${textQuery}`);
  if (json.error) console.log('ERROR:', json.error);
  for (const p of json.places ?? []) {
    console.log(`  ${p.rating}★ ${p.userRatingCount} | ${p.displayName?.text} | ${p.formattedAddress}`);
  }
  if (!json.places?.length) console.log('  (no places)');
}

async function main() {
  // Control — known working company
  const horne = await fetchGooglePlacesData({
    legalName: 'Horne Moving Systems',
    headquarters: 'Goldsboro, NC',
    city: 'Goldsboro',
    state: 'NC',
  });
  console.log('CONTROL Horne:', horne.status, horne.rating, horne.review_count, horne.name);

  await directSearch('Horne Moving Systems Goldsboro NC');
  await directSearch('JEGA Movers LLC Columbia SC');
  await directSearch('JEGA Movers', { locationBias: { circle: { center: { latitude: 34.0007, longitude: -81.0348 }, radius: 50000 } } });
  await directSearch('8038880917 Columbia SC');
  await directSearch('(803) 888-0917 JEGA Movers Columbia SC');
  await directSearch('Brothers EZ Moving Killen AL');
  await directSearch('Budget Movers of Augusta Augusta GA');
  await directSearch('Budget Movers of Augusta', { locationBias: { circle: { center: { latitude: 33.4735, longitude: -82.0105 }, radius: 50000 } } });
}

main().catch(console.error);