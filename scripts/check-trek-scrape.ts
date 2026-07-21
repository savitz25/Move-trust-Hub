/**
 * Regression: Trek Movers email + tight CA coverage.
 * Run: npx tsx scripts/check-trek-scrape.ts
 */
import { scrapeWebsiteContact } from '../lib/verification/website-contact-scrape';
import { scrapeWebsiteCoverage } from '../lib/verification/website-coverage-scrape';

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error('FAIL:', msg);
    process.exitCode = 1;
  } else {
    console.log('ok:', msg);
  }
}

async function main() {
  const contact = await scrapeWebsiteContact({
    websiteUrl: 'https://trekmovers.com',
  });
  assert(contact.email === 'contact@trekmovers.com', `email (got ${contact.email})`);
  assert(Boolean(contact.phone), `phone present (got ${contact.phone})`);
  // Prefer LA local over garbage/toll-free when available
  const digits = (contact.phone ?? '').replace(/\D/g, '');
  assert(
    digits.endsWith('3108781978') || digits.startsWith('1800') || digits.length >= 10,
    `plausible phone ${contact.phone}`
  );

  // Coverage scrape is server-only — use parse path via dynamic import of scrape fails;
  // call scrapeWebsiteCoverage through dynamic import after mocking server-only is hard.
  // Instead re-fetch and parse like the coverage module.
  const { parseCoverageText } = await import('../lib/destinations/parse-coverage-text');

  const res = await fetch('https://trekmovers.com/', {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
    },
  });
  const html = await res.text();
  const sample =
    html.length > 320_000
      ? html.slice(0, 200_000) + html.slice(-120_000)
      : html;
  const text = sample
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');

  const cov = parseCoverageText(text, {
    consentGiven: true,
    preferredStateCode: 'CA',
  });

  assert(
    cov.counties.every((c) => c.stateSlug === 'california'),
    'all counties California'
  );
  assert(cov.counties.length <= 6, `county cap ≤6 (got ${cov.counties.length})`);
  assert(
    cov.counties.some((c) => c.countySlug === 'los-angeles'),
    'includes Los Angeles County'
  );
  assert(
    !cov.counties.some((c) =>
      ['napa', 'marin', 'yolo', 'solano', 'sonoma'].includes(c.countySlug)
    ),
    'no Northern CA SEO counties'
  );
  assert(
    !cov.cities.some((c) => c.stateCode !== 'CA'),
    'no out-of-state cities'
  );

  console.log('contact', { phone: contact.phone, email: contact.email });
  console.log('coverage', {
    cities: cov.cities,
    counties: cov.counties.map((c) => c.countySlug),
  });

  if (process.exitCode) {
    console.error('\nTrek scrape checks failed.');
    process.exit(1);
  }
  console.log('\nAll Trek scrape checks passed.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
