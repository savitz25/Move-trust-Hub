import { scrapeWebsiteContact } from '../lib/verification/website-contact-scrape';
import { parseCoverageText } from '../lib/destinations/parse-coverage-text';

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
      Accept: 'text/html',
    },
  });
  const html = await res.text();
  return html
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');
}

async function main() {
  console.log('--- contact ---');
  const contact = await scrapeWebsiteContact({
    websiteUrl: 'https://otterlyelitemovers.com',
  });
  console.log({
    status: contact.status,
    phone: contact.phone,
    email: contact.email,
    phones: contact.phones,
    pages: contact.pagesFetched,
  });

  const chunks = await Promise.all([
    fetchText('https://otterlyelitemovers.com/'),
    fetchText('https://otterlyelitemovers.com/services'),
    fetchText('https://otterlyelitemovers.com/area'),
    fetchText('https://otterlyelitemovers.com/contact'),
  ]);
  const coverage = parseCoverageText(chunks.join('\n'), {
    consentGiven: true,
    websiteUrl: 'https://otterlyelitemovers.com',
    preferredStateCode: 'OR',
  });
  console.log('--- coverage OR ---', {
    status: coverage.status,
    summary: coverage.summary,
    cities: coverage.cities,
    counties: coverage.counties,
    stateSlugs: coverage.stateSlugs,
  });

  const polluted = parseCoverageText(chunks.join('\n'), {
    consentGiven: true,
    websiteUrl: 'https://otterlyelitemovers.com',
  });
  console.log('--- coverage unconstrained (should not include MN/PA if pairs work) ---', {
    cities: polluted.cities,
    counties: polluted.counties.slice(0, 8),
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
