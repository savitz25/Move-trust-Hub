/**
 * Capture raw HTML + response headers for Sherman NE and Douglas CO.
 * Run: AUDIT_ORIGIN=https://www.movetrusthub.com npx tsx scripts/capture-blocking-url-evidence.ts
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { evaluateCountyIndexabilityFromResult } from '../lib/local-movers/county-indexability';
import { getMoversForCounty } from '../lib/local-movers/index';

const origin = process.env.AUDIT_ORIGIN ?? 'https://www.movetrusthub.com';
const OUT_DIR = join('scripts', 'output', 'evidence');

const PROBES = [
  { stateSlug: 'nebraska', countySlug: 'sherman', label: 'sherman-ne' },
  { stateSlug: 'colorado', countySlug: 'douglas', label: 'douglas-co' },
] as const;

async function capture(label: string, path: string, stateSlug: string, countySlug: string) {
  const url = `${origin}${path}`;
  const result = getMoversForCounty(stateSlug, countySlug);
  const tier = evaluateCountyIndexabilityFromResult(stateSlug, countySlug, result);

  const response = await fetch(url, {
    headers: { 'User-Agent': 'MoveTrustHub-EvidenceCapture/1.0' },
    redirect: 'follow',
  });
  const html = await response.text();
  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const basename = `${label}-${origin.includes('vercel.app') ? 'preview' : 'production'}`;
  writeFileSync(join(OUT_DIR, `${basename}.headers.json`), JSON.stringify(headers, null, 2));
  writeFileSync(join(OUT_DIR, `${basename}.html`), html);

  return {
    url,
    status: response.status,
    tier,
    countySeat: result?.county?.seat ?? null,
    cacheControl: headers['cache-control'] ?? null,
    vercelCache: headers['x-vercel-cache'] ?? null,
    age: headers['age'] ?? null,
    htmlBytes: html.length,
    titleMatch: html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? null,
    robotsMatch: html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? null,
  };
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const captures = [];
  for (const probe of PROBES) {
    const path = `/local-movers/${probe.stateSlug}/${probe.countySlug}`;
    captures.push({
      label: probe.label,
      ...(await capture(probe.label, path, probe.stateSlug, probe.countySlug)),
    });
  }

  const report = {
    capturedAt: new Date().toISOString(),
    origin,
    captures,
  };

  writeFileSync(join(OUT_DIR, 'blocking-url-evidence.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});