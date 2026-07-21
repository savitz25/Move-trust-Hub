import 'server-only';

import {
  SCRAPE_TIMEOUT_MS,
  SCRAPE_USER_AGENT,
  waitForScrapeSlot,
} from '@/lib/verification/scrape-rate-limit';

const MAX_HTML_BYTES = 250_000;
const MAX_PAGES = 3;

const CONTACT_PATH_HINTS = [
  '/contact',
  '/contact-us',
  '/about',
  '/about-us',
  '/locations',
  '/get-a-quote',
  '/quote',
];

/** Disposable / junk email local-parts to skip */
const JUNK_EMAIL_LOCAL = new Set([
  'noreply',
  'no-reply',
  'donotreply',
  'do-not-reply',
  'mailer-daemon',
  'postmaster',
  'webmaster',
  'hostmaster',
  'abuse',
  'spam',
]);

const JUNK_EMAIL_DOMAINS = new Set([
  'example.com',
  'example.org',
  'sentry.io',
  'wixpress.com',
  'schema.org',
  'w3.org',
  'googleapis.com',
  'gstatic.com',
  'cloudflare.com',
]);

export type WebsiteContactData = {
  websiteUrl: string | null;
  scrapedAt: string;
  status: 'ok' | 'error' | 'skipped' | 'not_found';
  phone: string | null;
  email: string | null;
  phones: string[];
  emails: string[];
  pagesFetched: string[];
  error?: string;
};

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
    .replace(/&#64;/gi, '@')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractContactLinks(html: string, baseUrl: string): string[] {
  const links = new Set<string>();
  const hrefPattern = /href=["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;
  while ((match = hrefPattern.exec(html)) !== null) {
    const href = match[1]?.trim();
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      continue;
    }
    const lower = href.toLowerCase();
    if (!CONTACT_PATH_HINTS.some((hint) => lower.includes(hint))) continue;
    try {
      const resolved = new URL(href, baseUrl).toString().replace(/\/$/, '');
      links.add(resolved);
    } catch {
      // ignore
    }
  }
  return [...links].slice(0, 2);
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
    return (await res.text()).slice(0, MAX_HTML_BYTES);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function extractMailtoEmails(html: string): string[] {
  const found: string[] = [];
  const re = /mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    if (m[1]) found.push(m[1]);
  }
  return found;
}

function extractTelPhones(html: string): string[] {
  const found: string[] = [];
  const re = /tel:([+\d][\d.\-()\s]{6,})/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    if (m[1]) found.push(m[1]);
  }
  return found;
}

function extractEmailsFromText(text: string): string[] {
  const re = /\b[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}\b/g;
  return text.match(re) ?? [];
}

function extractPhonesFromText(text: string): string[] {
  // US-centric phone patterns
  const re =
    /(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/g;
  return text.match(re) ?? [];
}

function isUsableEmail(email: string): boolean {
  const lower = email.toLowerCase().trim();
  if (!lower.includes('@') || lower.length > 120) return false;
  if (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.webp')) return false;
  if (lower.includes('sentry') || lower.includes('wixpress')) return false;
  const [local, domain] = lower.split('@');
  if (!local || !domain) return false;
  if (JUNK_EMAIL_LOCAL.has(local)) return false;
  if (JUNK_EMAIL_DOMAINS.has(domain)) return false;
  if (domain.includes('example.')) return false;
  return true;
}

/** Prefer info@, contact@, office@, hello@, then domain-matching, then first usable. */
function pickPrimaryEmail(emails: string[], websiteHost?: string | null): string | null {
  const cleaned = [...new Set(emails.map((e) => e.toLowerCase().trim()).filter(isUsableEmail))];
  if (!cleaned.length) return null;

  const preferredLocal = ['info', 'contact', 'office', 'hello', 'sales', 'moves', 'dispatch', 'admin'];
  for (const local of preferredLocal) {
    const hit = cleaned.find((e) => e.startsWith(`${local}@`));
    if (hit) return hit;
  }

  if (websiteHost) {
    const host = websiteHost.replace(/^www\./, '').toLowerCase();
    const domainMatch = cleaned.find((e) => e.endsWith(`@${host}`) || e.endsWith(`.${host}`));
    if (domainMatch) return domainMatch;
  }

  return cleaned[0] ?? null;
}

export function normalizePhoneDisplay(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  let d = digits;
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1);
  if (d.length !== 10) {
    // keep international-ish if long enough
    if (digits.length >= 10 && digits.length <= 15) {
      return `+${digits}`;
    }
    return null;
  }
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function pickPrimaryPhone(phones: string[]): string | null {
  const normalized = phones
    .map((p) => normalizePhoneDisplay(p))
    .filter((p): p is string => Boolean(p));
  const unique = [...new Set(normalized)];
  return unique[0] ?? null;
}

function extractContactsFromHtml(html: string): { emails: string[]; phones: string[] } {
  const emails = [
    ...extractMailtoEmails(html),
    ...extractEmailsFromText(htmlToText(html)),
  ];
  const phones = [
    ...extractTelPhones(html),
    ...extractPhonesFromText(htmlToText(html)),
  ];
  return { emails, phones };
}

/**
 * Scrape a company website for primary business phone and email.
 * Used during onboarding after a website URL is known (Google Places or user paste).
 */
export async function scrapeWebsiteContact(input: {
  websiteUrl: string;
}): Promise<WebsiteContactData> {
  const now = new Date().toISOString();
  const websiteUrl = normalizeWebsiteUrl(input.websiteUrl);

  if (!websiteUrl) {
    return {
      websiteUrl: null,
      scrapedAt: now,
      status: 'error',
      phone: null,
      email: null,
      phones: [],
      emails: [],
      pagesFetched: [],
      error: 'Invalid website URL.',
    };
  }

  const pagesFetched: string[] = [];
  const allEmails: string[] = [];
  const allPhones: string[] = [];

  const homeHtml = await fetchWebsiteHtml(websiteUrl);
  if (!homeHtml) {
    return {
      websiteUrl,
      scrapedAt: now,
      status: 'error',
      phone: null,
      email: null,
      phones: [],
      emails: [],
      pagesFetched,
      error: 'Could not fetch the website for contact details.',
    };
  }

  pagesFetched.push(websiteUrl);
  {
    const { emails, phones } = extractContactsFromHtml(homeHtml);
    allEmails.push(...emails);
    allPhones.push(...phones);
  }

  const extraLinks = extractContactLinks(homeHtml, websiteUrl);
  for (const link of extraLinks) {
    if (pagesFetched.length >= MAX_PAGES) break;
    if (pagesFetched.includes(link)) continue;
    const html = await fetchWebsiteHtml(link);
    if (!html) continue;
    pagesFetched.push(link);
    const { emails, phones } = extractContactsFromHtml(html);
    allEmails.push(...emails);
    allPhones.push(...phones);
  }

  let host: string | null = null;
  try {
    host = new URL(websiteUrl).hostname;
  } catch {
    host = null;
  }

  const email = pickPrimaryEmail(allEmails, host);
  const phone = pickPrimaryPhone(allPhones);
  const cleanEmails = [...new Set(allEmails.map((e) => e.toLowerCase()).filter(isUsableEmail))];
  const cleanPhones = [
    ...new Set(
      allPhones.map((p) => normalizePhoneDisplay(p)).filter((p): p is string => Boolean(p))
    ),
  ];

  if (!email && !phone) {
    return {
      websiteUrl,
      scrapedAt: now,
      status: 'not_found',
      phone: null,
      email: null,
      phones: cleanPhones,
      emails: cleanEmails,
      pagesFetched,
    };
  }

  return {
    websiteUrl,
    scrapedAt: now,
    status: 'ok',
    phone,
    email,
    phones: cleanPhones,
    emails: cleanEmails,
    pagesFetched,
  };
}
