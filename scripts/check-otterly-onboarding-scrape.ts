/**
 * Regression checks for Otterly-style website scrape (phone + OR coverage).
 * Run: npx tsx scripts/check-otterly-onboarding-scrape.ts
 */
import { scrapeWebsiteContact } from '../lib/verification/website-contact-scrape';
import { parseCoverageText } from '../lib/destinations/parse-coverage-text';
import {
  isPlaceholderPhone,
  normalizePhoneDisplay,
} from '../lib/verification/website-contact-scrape';

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error('FAIL:', msg);
    process.exitCode = 1;
  } else {
    console.log('ok:', msg);
  }
}

async function main() {
  assert(isPlaceholderPhone('(555) 555-5555'), 'detects 555 placeholder');
  assert(isPlaceholderPhone(''), 'empty is placeholder');
  assert(!isPlaceholderPhone('(541) 900-6565'), 'real OR phone not placeholder');
  assert(
    normalizePhoneDisplay('( 5 4 1 ) 9 0 0 - 6 5 6 5') === '(541) 900-6565',
    'normalizes spaced phone digits'
  );

  const contact = await scrapeWebsiteContact({
    websiteUrl: 'https://otterlyelitemovers.com',
  });
  assert(contact.phone === '(541) 900-6565', `phone extracted (got ${contact.phone})`);
  assert(
    contact.email === 'otterlyelitemovers@gmail.com',
    `email extracted (got ${contact.email})`
  );

  const services = await fetch('https://otterlyelitemovers.com/services').then((r) =>
    r.text()
  );
  const text = services
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');

  const coverage = parseCoverageText(text, {
    consentGiven: true,
    preferredStateCode: 'OR',
  });

  const cityNames = coverage.cities.map((c) => c.city).sort();
  for (const need of [
    'Roseburg',
    'Winston',
    'Sutherlin',
    'Medford',
    'Grants Pass',
    'Eugene',
    'Cottage Grove',
  ]) {
    assert(cityNames.includes(need), `city ${need} found`);
  }

  const countySlugs = coverage.counties.map((c) => c.countySlug).sort();
  assert(countySlugs.includes('douglas'), 'Douglas County');
  assert(countySlugs.includes('jackson'), 'Jackson County');
  assert(countySlugs.includes('josephine'), 'Josephine County');
  assert(countySlugs.includes('lane'), 'Lane County');
  assert(
    coverage.counties.every((c) => c.stateSlug === 'oregon'),
    'all counties Oregon-only'
  );
  assert(
    !coverage.cities.some((c) => c.stateCode === 'MN' || c.stateCode === 'PA'),
    'no MN/PA pollution with preferred OR'
  );

  if (process.exitCode) {
    console.error('\nOtterly onboarding scrape checks failed.');
    process.exit(1);
  }
  console.log('\nAll Otterly onboarding scrape checks passed.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
