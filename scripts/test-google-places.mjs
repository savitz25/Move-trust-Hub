import { readFileSync } from 'fs';
import { resolve } from 'path';

function loadEnvFile(filename) {
  try {
    const content = readFileSync(resolve(process.cwd(), filename), 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq < 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = value;
    }
  } catch {
    // optional
  }
}

// Prefer injected env (e.g. `vercel env run`); fall back to local env files.
if (!process.env.GOOGLE_PLACES_API_KEY?.trim()) {
  loadEnvFile('.env.local');
  loadEnvFile('.env.production.local');
}

const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim() || null;

if (!apiKey) {
  console.error('FAIL: GOOGLE_PLACES_API_KEY not set after loading Vercel env');
  process.exit(1);
}

console.log(`Key loaded: yes (${apiKey.length} chars)`);

const textQuery = 'Two Men and a Truck moving company';
const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask':
      'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount',
  },
  body: JSON.stringify({ textQuery, maxResultCount: 1 }),
});

const body = await res.json().catch(() => ({}));

if (!res.ok) {
  console.error('FAIL: Google Places API', res.status, JSON.stringify(body).slice(0, 300));
  process.exit(1);
}

const place = body.places?.[0];
if (!place) {
  console.error('FAIL: No place returned for query:', textQuery);
  process.exit(1);
}

console.log('OK: Google Places API responded');
console.log('  name:', place.displayName?.text ?? '—');
console.log('  rating:', place.rating ?? '—');
console.log('  reviews:', place.userRatingCount ?? '—');
console.log('  address:', place.formattedAddress ?? '—');