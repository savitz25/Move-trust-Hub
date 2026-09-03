const origin = process.env.SHARE_QA_ORIGIN ?? 'http://localhost:3014';
const pagePaths = ['/', '/florida', '/companies/international-van-lines'];
const imagePaths = ['/opengraph-image?v=20260903', '/florida/share-og', '/companies/international-van-lines/share-og'];

function content(html: string, attribute: 'property' | 'name', key: string): string | null {
  const tags = html.match(/<meta\s[^>]*>/gi) ?? [];
  const tag = tags.find((candidate) => new RegExp(`${attribute}=["']${key.replaceAll(':', '\\:')}["']`, 'i').test(candidate));
  return tag?.match(/content=["']([^"']*)["']/i)?.[1] ?? null;
}

async function main() {
for (const path of pagePaths) {
  const response = await fetch(`${origin}${path}`);
  const html = await response.text();
  console.log(JSON.stringify({
    path,
    status: response.status,
    title: html.match(/<title>(.*?)<\/title>/i)?.[1] ?? null,
    canonical: html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1] ?? null,
    ogTitle: content(html, 'property', 'og:title'),
    ogDescription: content(html, 'property', 'og:description'),
    ogImage: content(html, 'property', 'og:image'),
    ogWidth: content(html, 'property', 'og:image:width'),
    ogHeight: content(html, 'property', 'og:image:height'),
    ogAlt: content(html, 'property', 'og:image:alt'),
    twitterCard: content(html, 'name', 'twitter:card'),
    twitterImage: content(html, 'name', 'twitter:image'),
  }));
}

for (const path of imagePaths) {
  const started = performance.now();
  const response = await fetch(`${origin}${path}`);
  await response.arrayBuffer();
  console.log(JSON.stringify({ path, status: response.status, mime: response.headers.get('content-type'), renderMs: Math.round(performance.now() - started) }));
}

}

main().catch((error) => { console.error(error); process.exitCode = 1; });
