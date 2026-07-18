import { loadEnvLocal } from '../lib/verification/load-env-local';
import { fetchGooglePlacesData } from '@/lib/verification/google-places';

loadEnvLocal();

async function main() {
  for (const q of [
    { legalName: 'Mighty Moving & Storage', headquarters: 'Knoxville, TN', city: 'Knoxville', state: 'TN' },
    { legalName: 'Mighty Moving Inc', headquarters: 'Knoxville, TN', city: 'Knoxville', state: 'TN' },
  ]) {
    const g = await fetchGooglePlacesData(q);
    console.log(q.legalName, g.status, g.rating, g.review_count, g.name);
  }
}

main();