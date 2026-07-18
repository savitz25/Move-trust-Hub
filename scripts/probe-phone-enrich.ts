import { loadEnvLocal } from '../lib/verification/load-env-local';
import { fetchGooglePlacesData } from '@/lib/verification/google-places';

loadEnvLocal();

const cases = [
  { label: 'Brothers phone', input: { legalName: '2562750393', headquarters: 'Killen, AL', city: 'Killen', state: 'AL' } },
  { label: 'Brothers phone fmt', input: { legalName: '(256) 275-0393', headquarters: 'Killen, AL', city: 'Killen', state: 'AL' } },
  { label: 'Brothers name killen', input: { legalName: 'Brothers EZ Moving of Alabama', headquarters: 'Killen, AL', city: 'Killen', state: 'AL' } },
  { label: 'Brothers address', input: { legalName: '166 Montclair Dr Killen AL', headquarters: 'Killen, AL', city: 'Killen', state: 'AL' } },
  { label: 'Budget phone', input: { legalName: '7068698454', headquarters: 'Augusta, GA', city: 'Augusta', state: 'GA' } },
  { label: 'Budget phone fmt', input: { legalName: '(706) 869-8454', headquarters: 'Augusta, GA', city: 'Augusta', state: 'GA' } },
  { label: 'Budget name', input: { legalName: 'Budget Movers of Augusta', headquarters: 'Augusta, GA', city: 'Augusta', state: 'GA' } },
  { label: 'Budget address', input: { legalName: '4001 McDaniel Rd Augusta GA', headquarters: 'Augusta, GA', city: 'Augusta', state: 'GA' } },
  { label: 'JEGA phone', input: { legalName: '8038880917', headquarters: 'Columbia, SC', city: 'Columbia', state: 'SC' } },
];

async function main() {
  for (const c of cases) {
    const g = await fetchGooglePlacesData(c.input);
    console.log(
      c.label,
      '→',
      g.status,
      g.rating,
      g.review_count,
      g.name,
      g.place_id,
      g.formatted_address ?? ''
    );
  }
}

main().catch(console.error);