import { loadEnvLocal } from '../lib/verification/load-env-local';

loadEnvLocal();

const IDS = {
  jega: 'ChIJdWWq1siz-IgRBpOyf38-9Ls',
  brothers: 'ChIJZ0ctCyA2fYgRVuEY-Xx6MPY',
  budget: 'ChIJ_ZGsQsrFYSYRsEFd7jRMBQ4',
};

async function main() {
  const key = process.env.GOOGLE_PLACES_API_KEY?.trim();
  for (const [name, id] of Object.entries(IDS)) {
    const res = await fetch(`https://places.googleapis.com/v1/places/${id}`, {
      headers: {
        'X-Goog-Api-Key': key!,
        'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,formattedAddress,reviews',
      },
    });
    const p = await res.json();
    console.log(
      `${name}: [${res.status}] ${p.displayName?.text} | ${p.rating}★ ${p.userRatingCount} reviews | ${p.formattedAddress ?? 'SAB'}`
    );
  }
}

main().catch(console.error);