import { extractExplicitCountyList, parseCoverageText } from '../lib/destinations/parse-coverage-text';

async function main() {
  const res = await fetch('https://trekmovers.com/');
  const html = await res.text();
  const sample =
    html.slice(0, 200_000) + '\n' + html.slice(-150_000);
  const text = sample
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\bC\s+ounty\b/gi, 'County')
    .replace(/\s+/g, ' ');

  console.log('has Moving Areas?', text.toLowerCase().includes('moving areas'));
  console.log('has Orange County?', text.includes('Orange County'));
  console.log('has Los Angeles County?', text.includes('Los Angeles County'));

  const explicit = extractExplicitCountyList(text, 'CA');
  console.log(
    'explicit',
    explicit.length,
    explicit.map((c) => c.countySlug)
  );

  // Add HTML hints like coverage scrape does
  const hrefHints: string[] = [];
  const hrefRe = /\/county\/(?:movers-)?([a-z0-9-]+?)(?:-movers)?\//gi;
  let m: RegExpExecArray | null;
  while ((m = hrefRe.exec(sample)) !== null) {
    hrefHints.push(`${(m[1] ?? '').replace(/-/g, ' ')} County`);
  }
  console.log('href hints sample', [...new Set(hrefHints)].slice(0, 15));

  const withHints = text + '\nMoving Areas ' + hrefHints.join(' ');
  const explicit2 = extractExplicitCountyList(withHints, 'CA');
  console.log(
    'explicit+hints',
    explicit2.length,
    explicit2.map((c) => c.countySlug)
  );

  const cov = parseCoverageText(withHints, {
    consentGiven: true,
    preferredStateCode: 'CA',
  });
  console.log('parse', cov.counties.map((c) => c.countySlug));
}
main();
