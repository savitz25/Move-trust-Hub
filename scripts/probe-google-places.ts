import { loadEnvLocal } from '../lib/verification/load-env-local';
import { fetchGooglePlacesData } from '@/lib/verification/google-places';

loadEnvLocal();

const cases = [
  { legalName: 'JEGA Movers', headquarters: 'Columbia, SC', city: 'Columbia', state: 'SC' },
  { legalName: 'JEGA TRANSPORT LLC', headquarters: 'Columbia, SC', city: 'Columbia', state: 'SC' },
  { legalName: 'Budget Movers Augusta', headquarters: 'Augusta, GA', city: 'Augusta', state: 'GA' },
  { legalName: 'Owens Brothers Transfer Company', headquarters: 'South Lake Tahoe, CA', city: 'South Lake Tahoe', state: 'CA' },
  { legalName: 'Brothers EZ Moving', headquarters: 'Florence, AL', city: 'Florence', state: 'AL' },
  { legalName: 'Brothers EZ Moving of Alabama', headquarters: 'Florence, AL', city: 'Florence', state: 'AL' },
  { legalName: 'Budget Movers of Augusta Inc', headquarters: 'Augusta, GA', city: 'Augusta', state: 'GA' },
  { legalName: 'Mighty Moving Inc', headquarters: 'Knoxville, TN', city: 'Knoxville', state: 'TN' },
  { legalName: 'Lee Moving and Storage Inc', headquarters: 'Baton Rouge, LA', city: 'Baton Rouge', state: 'LA' },
];

async function main() {
  for (const c of cases) {
    const g = await fetchGooglePlacesData(c);
    console.log('\n', c.legalName, '→', g.status, g.rating, g.review_count, g.name, g.error);
  }
}

main();