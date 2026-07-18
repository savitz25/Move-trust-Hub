import { loadEnvLocal } from '../lib/verification/load-env-local';
import { fetchGooglePlacesData } from '@/lib/verification/google-places';

loadEnvLocal();

async function main() {
  const phone = process.argv[2] ?? '6147175780';
  const formatted = phone.length === 10 ? `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}` : phone;

  const queries = [
    { legalName: phone, headquarters: 'Columbus, OH', city: 'Columbus', state: 'OH', phone: formatted },
    { legalName: formatted, headquarters: 'Columbus, OH', city: 'Columbus', state: 'OH', phone: formatted },
    { legalName: 'moving company', headquarters: 'Columbus, OH', city: 'Columbus', state: 'OH', phone: formatted },
  ];

  for (const q of queries) {
    const g = await fetchGooglePlacesData(q);
    console.log('Query:', q.legalName, '→', g.status, g.name, g.rating, g.review_count, g.formatted_address);
  }

  // Places API text search with phone in query
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (apiKey) {
    const textQuery = `${formatted} moving company Columbus Ohio`;
    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.nationalPhoneNumber',
      },
      body: JSON.stringify({ textQuery, maxResultCount: 3 }),
    });
    const json = await res.json();
    console.log('\nDirect API search:', textQuery);
    console.log(JSON.stringify(json, null, 2));
  }
}

main();