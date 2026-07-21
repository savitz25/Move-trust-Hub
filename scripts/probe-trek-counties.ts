/**
 * Inspect Trek Movers "MOVING AREAS" / county list HTML.
 */
async function main() {
  const res = await fetch('https://trekmovers.com/', {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
    },
  });
  const html = await res.text();
  console.log('status', res.status, 'len', html.length);

  const markers = [
    'MOVING AREAS',
    'Moving Areas',
    'moving areas',
    'Service Areas',
    'Counties',
    'Los Angeles County',
    'Orange County',
  ];
  for (const m of markers) {
    const i = html.indexOf(m);
    console.log(m, i >= 0 ? `at ${i}` : 'missing');
    if (i >= 0) {
      console.log('  snippet:', html.slice(i, i + 800).replace(/\s+/g, ' ').slice(0, 500));
    }
  }

  // List all "County" occurrences in visible text
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');
  const counties = text.match(/[A-Z][a-zA-Z.'\-\s]{2,30}\s+County/g);
  console.log('\nCounty mentions:', [...new Set(counties ?? [])].slice(0, 40));

  // Look for list items near MOVING
  const lower = html.toLowerCase();
  const mi = lower.indexOf('moving areas');
  if (mi >= 0) {
    const chunk = html.slice(mi, mi + 5000);
    console.log('\nHTML chunk after moving areas:\n', chunk.slice(0, 2000));
  }
}
main();
