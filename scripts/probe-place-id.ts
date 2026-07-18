import { loadEnvLocal } from '../lib/verification/load-env-local';

loadEnvLocal();

const SEARCHES = [
  'place_id:ChIJ',
  '0x887d36200b2d4767:0xf6307a7cf918e156',
  'Brothers EZ Moving of Alabama /g/11gb3qzrz_',
  'https://www.google.com/maps/place/Brothers+EZ+Moving+of+Alabama',
  'cid:17739813609386074454',
];

const TRY_IDS = [
  'ChIJdWWq1siz-IgRBpOyf38-9Ls',
  // hex-derived attempts - will probe search API with feature id
];

async function search(textQuery: string) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey!,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.rating,places.userRatingCount',
    },
    body: JSON.stringify({ textQuery, maxResultCount: 3 }),
  });
  const json = await res.json();
  console.log(`SEARCH "${textQuery.slice(0,80)}"`);
  for (const p of json.places ?? []) {
    console.log(`  ${p.rating}★ ${p.userRatingCount} | ${p.displayName?.text} | ${p.id}`);
  }
  if (!json.places?.length) console.log('  (none)');
}

async function getPlace(id: string) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(id)}`, {
    headers: {
      'X-Goog-Api-Key': apiKey!,
      'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,formattedAddress',
    },
  });
  const text = await res.text();
  console.log(`GET ${id} [${res.status}] ${text.slice(0, 300)}`);
}

async function main() {
  for (const q of SEARCHES) await search(q);
  // Feature ID from Maps URL: 0x887d36200b2d4767:0xf6307a7cf918e156
  await getPlace('0x887d36200b2d4767:0xf6307a7cf918e156');
  await getPlace('places/0x887d36200b2d4767:0xf6307a7cf918e156');
}

main().catch(console.error);