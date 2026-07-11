import 'server-only';

import { parseCoverageText } from '@/lib/destinations/parse-coverage-text';
import type { WebsiteCoverageData } from '@/lib/verification/coverage-scrape-types';
import {
  SCRAPE_TIMEOUT_MS,
  SCRAPE_USER_AGENT,
  waitForScrapeSlot,
} from '@/lib/verification/scrape-rate-limit';

const MAX_PAGES = 2;
const MAX_HTML_BYTES = 250_000;

const COVERAGE_PATH_HINTS = [
  '/service-area',
  '/service-areas',
  '/locations',
  '/coverage',
  '/areas-we-serve',
  '/where-we-serve',
];

function normalizeWebsiteUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const url = new URL(withProtocol);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    url.hash = '';
    return url.toString().replace(/\/$/, '');
  } catch {
    return null;
  }
}

function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractCoverageLinks(html: string, baseUrl: string): string[] {
  const links = new Set<string>();
  const hrefPattern = /href=["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;

  while ((match = hrefPattern.exec(html)) !== null) {
    const href = match[1]?.trim();
    if (!href || href.startsWith('#') || href.startsWith('mailto:')) continue;
    const lower = href.toLowerCase();
    if (!COVERAGE_PATH_HINTS.some((hint) => lower.includes(hint))) continue;
    try {
      const resolved = new URL(href, baseUrl).toString().replace(/\/$/, '');
      links.add(resolved);
    } catch {
      // ignore invalid URLs
    }
  }

  return [...links].slice(0, 1);
}

async function fetchWebsiteHtml(url: string): Promise<string | null> {
  await waitForScrapeSlot(new URL(url).hostname);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SCRAPE_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        'User-Agent': SCRAPE_USER_AGENT,
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    if (!res.ok) return null;
    const text = await res.text();
    return text.slice(0, MAX_HTML_BYTES);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function scrapeWebsiteCoverage(input: {
  websiteUrl: string;
  consentGiven: boolean;
}): Promise<WebsiteCoverageData> {
  const now = new Date().toISOString();
  const websiteUrl = normalizeWebsiteUrl(input.websiteUrl);

  if (!input.consentGiven) {
    return {
      consentGiven: false,
      websiteUrl,
      scrapedAt: now,
      status: 'skipped',
      isNationalOnly: false,
      summary: null,
      stateSlugs: [],
      cities: [],
      counties: [],
      officeAddresses: [],
      regions: [],
      pagesFetched: [],
      rawSnippets: [],
    };
  }

  if (!websiteUrl) {
    return {
      consentGiven: true,
      websiteUrl: null,
      scrapedAt: now,
      status: 'error',
      isNationalOnly: false,
      summary: null,
      stateSlugs: [],
      cities: [],
      counties: [],
      officeAddresses: [],
      regions: [],
      pagesFetched: [],
      rawSnippets: [],
      error: 'Enter a valid website URL.',
    };
  }

  const pagesFetched: string[] = [];
  const textChunks: string[] = [];

  const homeHtml = await fetchWebsiteHtml(websiteUrl);
  if (!homeHtml) {
    return {
      consentGiven: true,
      websiteUrl,
      scrapedAt: now,
      status: 'error',
      isNationalOnly: false,
      summary: null,
      stateSlugs: [],
      cities: [],
      counties: [],
      officeAddresses: [],
      regions: [],
      pagesFetched,
      rawSnippets: [],
      error: 'Could not fetch the website. Continuing with headquarters placement only.',
    };
  }

  pagesFetched.push(websiteUrl);
  textChunks.push(htmlToText(homeHtml));

  if (pagesFetched.length < MAX_PAGES) {
    const extraLinks = extractCoverageLinks(homeHtml, websiteUrl);
    for (const link of extraLinks) {
      const extraHtml = await fetchWebsiteHtml(link);
      if (!extraHtml) continue;
      pagesFetched.push(link);
      textChunks.push(htmlToText(extraHtml));
      break;
    }
  }

  const combinedText = textChunks.join('\n');
  const parsed = parseCoverageText(combinedText, {
    consentGiven: true,
    websiteUrl,
  });

  return {
    ...parsed,
    scrapedAt: now,
    pagesFetched,
  };
}