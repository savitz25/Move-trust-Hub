/**
 * Live probe: Trek Movers website contact + coverage.
 * Run: npx tsx scripts/probe-trek-scrape.ts
 */
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
  console.log(url, res.status, 'html', html.length);
  // dump email-related snippets
  if (html.toLowerCase().includes('contact@') || html.toLowerCase().includes('mailto')) {
    const mails = html.match(/mailto:[^"'>\s]+|[\w.+-]+@[\w.-]+\.\w+/gi);
    console.log('  raw email-ish', mails?.slice(0, 30));
  }
  return html
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');
}

async function main() {
  console.log('=== contact scrape ===');
  const contact = await scrapeWebsiteContact({ websiteUrl: 'https://trekmovers.com' });
  console.log(JSON.stringify(contact, null, 2));

  const urls = [
    'https://trekmovers.com/',
    'https://trekmovers.com/contact',
    'https://trekmovers.com/contact-us',
    'https://trekmovers.com/about',
    'https://trekmovers.com/service-area',
    'https://trekmovers.com/service-areas',
    'https://trekmovers.com/areas-we-serve',
    'https://trekmovers.com/locations',
    'https://www.trekmovers.com/',
  ];

  const chunks: string[] = [];
  for (const u of urls) {
    try {
      const t = await fetchText(u);
      if (t.length > 200) chunks.push(t);
    } catch (e) {
      console.log(u, 'fail', e);
    }
  }

  const combined = chunks.join('\n');
  console.log('\n=== coverage CA constrained ===');
  const cov = parseCoverageText(combined, {
    consentGiven: true,
    websiteUrl: 'https://trekmovers.com',
    preferredStateCode: 'CA',
  });
  console.log({
    status: cov.status,
    summary: cov.summary,
    cityCount: cov.cities.length,
    cities: cov.cities.slice(0, 40),
    countyCount: cov.counties.length,
    counties: cov.counties.map((c) => c.countySlug),
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
