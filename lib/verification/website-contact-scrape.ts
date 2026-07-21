import {
  SCRAPE_TIMEOUT_MS,
  SCRAPE_USER_AGENT,
  waitForScrapeSlot,
} from '@/lib/verification/scrape-rate-limit';
import { normalizeCompanyWebsiteUrl } from '@/lib/verification/normalize-website-url';
import { logger } from '@/lib/logging/logger';

/** Full pages can be large; keep head + footer so mailto: in footers is not truncated. */
const MAX_HTML_HEAD_BYTES = 200_000;
const MAX_HTML_TAIL_BYTES = 150_000;
const MAX_PAGES = 5;

const CONTACT_PATH_HINTS = [
  '/contact',
  '/contact-us',
  '/about',
  '/about-us',
  '/locations',
  '/get-a-quote',
  '/quote',
  '/services',
  '/area',
];

/** Always try these paths (order matters) even when not linked from the homepage. */
const FORCE_CONTACT_PATHS = [
  '/contact-us',
  '/contact',
  '/contactus',
  '/about',
  '/about-us',
  '/services',
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
  'privacy',
  'legal',
  'careers',
  'jobs',
  'press',
  'media',
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
  'wix.com',
  'godaddy.com',
  'squarespace.com',
  'wordpress.com',
  'elementor.com',
]);

/** Local-parts that look like SEO/spam tooling, not business contact */
const JUNK_EMAIL_LOCAL_SUBSTRINGS = [
  'seo.',
  'seo@',
  'outreach',
  'noreply',
  'no-reply',
  'donotreply',
  'mailer',
  'newsletter',
  'subscribe',
];

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
  return normalizeCompanyWebsiteUrl(raw);
}

function decodeHtmlEntities(html: string): string {
  return html
    .replace(/&#(\d+);/g, (_, n) => {
      const code = Number(n);
      return Number.isFinite(code) ? String.fromCharCode(code) : ' ';
    })
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => {
      const code = parseInt(h, 16);
      return Number.isFinite(code) ? String.fromCharCode(code) : ' ';
    })
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#64;/gi, '@');
}

function htmlToText(html: string): string {
  return decodeHtmlEntities(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** True for fake / form-placeholder numbers that must never win over a real scrape. */
export function isPlaceholderPhone(value: string | null | undefined): boolean {
  if (!value?.trim()) return true;
  const digits = value.replace(/\D/g, '');
  let d = digits;
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1);
  if (d.length !== 10) return false;
  // 555-0100…555-0199 (NANP fictitious), all-same, 000/111, classic form placeholders
  if (/^5550[0-1]\d{2}$/.test(d)) return true;
  if (/^555555\d{4}$/.test(d)) return true;
  if (/^(\d)\1{9}$/.test(d)) return true;
  if (d === '1234567890' || d === '0123456789') return true;
  // Invalid NPA: area code cannot start with 0 or 1
  if (d[0] === '0' || d[0] === '1') return true;
  if (d[3] === '0' || d[3] === '1') return true;
  return false;
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
  const ordered = [...links].sort((a, b) => {
    const rank = (u: string) => {
      const l = u.toLowerCase();
      if (l.includes('/contact')) return 0;
      if (l.includes('/about')) return 1;
      if (l.includes('/services')) return 2;
      return 3;
    };
    return rank(a) - rank(b);
  });
  return ordered.slice(0, 3);
}

/**
 * Fetch HTML and keep both the document head and footer.
 * Large mover sites often put mailto: only in the footer beyond a simple byte cap.
 */
function sampleHtmlForContact(full: string): string {
  if (full.length <= MAX_HTML_HEAD_BYTES + MAX_HTML_TAIL_BYTES) return full;
  return (
    full.slice(0, MAX_HTML_HEAD_BYTES) +
    '\n<!-- mth-html-mid-omitted -->\n' +
    full.slice(-MAX_HTML_TAIL_BYTES)
  );
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
    const full = await res.text();
    return sampleHtmlForContact(full);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Cloudflare Email Address Obfuscation (data-cfemail / email-protection#HEX).
 * Encoded form is XOR'd hex and never contains a literal `@`.
 * @see https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/
 */
export function decodeCloudflareEmail(encoded: string): string | null {
  const hex = encoded.trim().replace(/^#/, '');
  if (!/^[0-9a-fA-F]{4,}$/.test(hex) || hex.length % 2 !== 0) return null;
  try {
    const key = parseInt(hex.slice(0, 2), 16);
    if (!Number.isFinite(key)) return null;
    let email = '';
    for (let n = 2; n < hex.length; n += 2) {
      const code = parseInt(hex.slice(n, n + 2), 16) ^ key;
      if (!Number.isFinite(code) || code < 32 || code > 126) return null;
      email += String.fromCharCode(code);
    }
    if (!email.includes('@') || email.length < 5) return null;
    return email;
  } catch {
    return null;
  }
}

function extractCloudflareEmails(html: string): string[] {
  const found: string[] = [];

  // <a href="/cdn-cgi/l/email-protection#HEX" … data-cfemail="HEX">
  const attrRe = /data-cfemail=["']([0-9a-fA-F]+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = attrRe.exec(html)) !== null) {
    const decoded = decodeCloudflareEmail(m[1] ?? '');
    if (decoded) found.push(decoded);
  }

  const hrefRe = /(?:cdn-cgi\/l\/)?email-protection(?:#|%23|=)([0-9a-fA-F]{6,})/gi;
  while ((m = hrefRe.exec(html)) !== null) {
    const decoded = decodeCloudflareEmail(m[1] ?? '');
    if (decoded) found.push(decoded);
  }

  // Cloudflare sometimes leaves the hex inside class __cf_email__ spans
  const spanRe =
    /class=["'][^"']*__cf_email__[^"']*["'][^>]*data-cfemail=["']([0-9a-fA-F]+)["']/gi;
  while ((m = spanRe.exec(html)) !== null) {
    const decoded = decodeCloudflareEmail(m[1] ?? '');
    if (decoded) found.push(decoded);
  }

  return found;
}

function extractMailtoEmails(html: string): string[] {
  const found: string[] = [];
  // mailto:contact@x.com and mailto:contact%40x.com?subject=...
  const re = /mailto:([^"'>\s]+)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    let raw = m[1] ?? '';
    try {
      raw = decodeURIComponent(raw);
    } catch {
      // keep raw
    }
    raw = raw.split('?')[0]?.split('&')[0]?.trim() ?? '';
    raw = raw.replace(/^mailto:/i, '');
    // Cloudflare wraps mailto as /cdn-cgi/l/email-protection#…
    if (/email-protection/i.test(raw) || /^[0-9a-fA-F]{8,}$/.test(raw)) {
      const hex = raw.includes('#') ? raw.split('#').pop() : raw;
      const decoded = decodeCloudflareEmail(hex ?? '');
      if (decoded) found.push(decoded);
      continue;
    }
    if (raw.includes('@')) found.push(raw);
  }
  return found;
}

function extractEmailsFromAttributes(html: string): string[] {
  const found: string[] = [];
  // data-email="contact@…" / data-mail (plain, not Cloudflare)
  const attrRe =
    /(?:data-email|data-mail|data-contact-email)=["']([^"']+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = attrRe.exec(html)) !== null) {
    const raw = (m[1] ?? '').trim();
    if (raw.includes('@')) {
      found.push(raw);
      continue;
    }
    // Some themes store Cloudflare hex in data-email
    const decoded = decodeCloudflareEmail(raw);
    if (decoded) found.push(decoded);
  }
  return found;
}

/**
 * Catch emails split across tags or zero-width chars after entity decode:
 * info<span>@</span>domain.com  ·  info&#64;domain.com
 */
function extractEmailsFromRawHtml(html: string): string[] {
  const loose = decodeHtmlEntities(html)
    // drop tags but keep content order so info</a>@domain stays contiguous after strip
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\s*@\s*/g, '@')
    .replace(/\s*\.\s*/g, '.');
  return extractEmailsFromText(loose);
}

function extractEmailsFromJsonLd(html: string): string[] {
  const found: string[] = [];
  const re =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const block = m[1] ?? '';
    const emailFields = block.match(/"email"\s*:\s*"([^"]+)"/gi);
    if (emailFields) {
      for (const field of emailFields) {
        const val = field.match(/:\s*"([^"]+)"/);
        if (val?.[1]?.includes('@')) found.push(val[1]);
      }
    }
    found.push(...extractEmailsFromText(block));
  }
  return found;
}

/** contact [at] domain.com / contact(at)domain.com / contact AT domain.com obfuscation */
function extractObfuscatedEmails(text: string): string[] {
  const found: string[] = [];
  const re =
    /\b([a-zA-Z0-9._%+\-]+)\s*(?:\[(?:\s*at\s*|\s*@\s*)\]|\((?:\s*at\s*|\s*@\s*)\)|\s+at\s+|@|&#64;|&commat;)\s*([a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})\b/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m[1] && m[2]) found.push(`${m[1]}@${m[2].replace(/\s+/g, '')}`);
  }
  // info [dot] com style on domain only already covered; also "name AT domain DOT com"
  const dotRe =
    /\b([a-zA-Z0-9._%+\-]+)\s*(?:\[at\]|\(at\)|\s+at\s+)\s*([a-zA-Z0-9\-]+)\s*(?:\[dot\]|\(dot\)|\s+dot\s+)\s*([a-zA-Z]{2,})\b/gi;
  while ((m = dotRe.exec(text)) !== null) {
    if (m[1] && m[2] && m[3]) found.push(`${m[1]}@${m[2]}.${m[3]}`);
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
  const found: string[] = [];

  // Standard compact US patterns: (541) 900-6565, 541-900-6565, 541.900.6565
  const compact =
    /(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/g;
  found.push(...(text.match(compact) ?? []));

  // Spaced / decorative digits used by some themes to defeat scrapers:
  // "( 5 4 1 ) 9 0 0 - 6 5 6 5"
  const spaced =
    /\(\s*\d(?:\s+\d){2}\s*\)\s*\d(?:\s+\d){2}\s*[-–—.]?\s*\d(?:\s+\d){3}/g;
  for (const m of text.match(spaced) ?? []) {
    found.push(m);
  }

  // Phone: … label followed by digits (allows spaced digits between)
  const labeled =
    /(?:phone|call|tel|mobile|cell|contact)\s*[:#]?\s*((?:\+?1[\s.-]*)?(?:\(?\d[\d\s().-]{8,}\d))/gi;
  let lm: RegExpExecArray | null;
  while ((lm = labeled.exec(text)) !== null) {
    if (lm[1]) found.push(lm[1]);
  }

  return found;
}

function extractPhonesFromJsonLd(html: string): string[] {
  const found: string[] = [];
  const re =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const block = m[1] ?? '';
    const phoneFields = block.match(
      /"telephone"\s*:\s*"([^"]+)"|"phone"\s*:\s*"([^"]+)"/gi
    );
    if (phoneFields) {
      for (const field of phoneFields) {
        const val = field.match(/:\s*"([^"]+)"/);
        if (val?.[1]) found.push(val[1]);
      }
    }
    // Also scan JSON-LD plain text for phone shapes
    found.push(...extractPhonesFromText(block));
  }
  return found;
}

function isUsableEmail(email: string): boolean {
  const lower = email.toLowerCase().trim();
  if (!lower.includes('@') || lower.length > 120) return false;
  if (
    lower.endsWith('.png') ||
    lower.endsWith('.jpg') ||
    lower.endsWith('.jpeg') ||
    lower.endsWith('.webp') ||
    lower.endsWith('.gif') ||
    lower.endsWith('.svg')
  ) {
    return false;
  }
  if (lower.includes('sentry') || lower.includes('wixpress')) return false;
  const [local, domain] = lower.split('@');
  if (!local || !domain) return false;
  if (JUNK_EMAIL_LOCAL.has(local)) return false;
  if (JUNK_EMAIL_DOMAINS.has(domain)) return false;
  if (domain.includes('example.')) return false;
  if (JUNK_EMAIL_LOCAL_SUBSTRINGS.some((s) => local.includes(s) || lower.includes(s))) {
    return false;
  }
  // Reject image/file-like locals
  if (/\.(png|jpe?g|gif|webp|svg|css|js)$/i.test(local)) return false;
  return true;
}

/** Prefer site-domain contact@ / info@, then preferred locals, then any domain match. */
function pickPrimaryEmail(emails: string[], websiteHost?: string | null): string | null {
  const cleaned = [
    ...new Set(emails.map((e) => e.toLowerCase().trim()).filter(isUsableEmail)),
  ];
  if (!cleaned.length) return null;

  const host = websiteHost?.replace(/^www\./, '').toLowerCase() || null;
  const preferredLocal = [
    'contact',
    'info',
    'office',
    'hello',
    'sales',
    'moves',
    'dispatch',
    'admin',
    'support',
    'estimate',
    'quotes',
    'quote',
  ];

  // 1) Preferred local-part ON the business domain
  if (host) {
    for (const local of preferredLocal) {
      const hit = cleaned.find((e) => e === `${local}@${host}`);
      if (hit) return hit;
    }
    // 2) Any email on the business domain
    const domainMatch = cleaned.find(
      (e) => e.endsWith(`@${host}`) || e.endsWith(`.${host}`)
    );
    if (domainMatch) return domainMatch;
  }

  // 3) Preferred local-part on any domain
  for (const local of preferredLocal) {
    const hit = cleaned.find((e) => e.startsWith(`${local}@`));
    if (hit) return hit;
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
  const formatted = `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  if (isPlaceholderPhone(formatted)) return null;
  return formatted;
}

function pickPrimaryPhone(phones: string[]): string | null {
  const normalized = phones
    .map((p) => normalizePhoneDisplay(p))
    .filter((p): p is string => Boolean(p));
  const unique = [...new Set(normalized)];
  if (!unique.length) return null;

  // Prefer geographic US numbers over toll-free when both exist (local movers).
  const isTollFree = (p: string) => {
    const d = p.replace(/\D/g, '').slice(-10);
    return /^(800|888|877|866|855|844|833)/.test(d);
  };
  const local = unique.find((p) => !isTollFree(p));
  // Prefer well-known CA LA area codes when present
  const laArea = unique.find((p) => {
    const d = p.replace(/\D/g, '').slice(-10);
    return /^(310|213|323|424|818|747|562|626|661)/.test(d);
  });
  return laArea || local || unique[0] || null;
}

function extractContactsFromHtml(html: string): { emails: string[]; phones: string[] } {
  const decoded = decodeHtmlEntities(html);
  const text = htmlToText(decoded);
  const emails = [
    // Cloudflare first — most common reason plain regex finds nothing on modern mover sites
    ...extractCloudflareEmails(html),
    ...extractCloudflareEmails(decoded),
    ...extractMailtoEmails(decoded),
    ...extractEmailsFromAttributes(decoded),
    ...extractEmailsFromJsonLd(decoded),
    ...extractEmailsFromText(text),
    ...extractEmailsFromRawHtml(html),
    ...extractObfuscatedEmails(text),
    ...extractObfuscatedEmails(decoded),
  ];
  const phones = [
    ...extractTelPhones(decoded),
    ...extractPhonesFromJsonLd(decoded),
    ...extractPhonesFromText(text),
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

  let hostForPick: string | null = null;
  try {
    hostForPick = new URL(websiteUrl).hostname;
  } catch {
    hostForPick = null;
  }

  // Prefer business-domain email when deciding early exit after the first page.
  const hasPhoneAndEmail = () =>
    Boolean(pickPrimaryPhone(allPhones) && pickPrimaryEmail(allEmails, hostForPick));

  if (!hasPhoneAndEmail()) {
    const extraLinks = [
      ...FORCE_CONTACT_PATHS.map((path) => {
        try {
          // Resolve against origin so /contact-us works even when the start URL is a deep path.
          const origin = new URL(websiteUrl).origin;
          return new URL(path, origin).toString().replace(/\/$/, '');
        } catch {
          return null;
        }
      }).filter((u): u is string => Boolean(u)),
      ...extractContactLinks(homeHtml, websiteUrl),
    ];

    const seenLinks = new Set<string>(pagesFetched.map((p) => p.replace(/\/$/, '')));
    for (const link of extraLinks) {
      if (pagesFetched.length >= MAX_PAGES) break;
      if (hasPhoneAndEmail()) break;
      const key = link.replace(/\/$/, '');
      if (seenLinks.has(key)) continue;
      seenLinks.add(key);
      const html = await fetchWebsiteHtml(link);
      if (!html || html.length < 500) continue;
      if (/page not found|404|does not exist/i.test(html.slice(0, 2000))) continue;
      pagesFetched.push(link);
      const { emails, phones } = extractContactsFromHtml(html);
      allEmails.push(...emails);
      allPhones.push(...phones);
    }
  }

  const host = hostForPick;

  const email = pickPrimaryEmail(allEmails, host);
  const phone = pickPrimaryPhone(allPhones);
  const cleanEmails = [...new Set(allEmails.map((e) => e.toLowerCase()).filter(isUsableEmail))];
  const cleanPhones = [
    ...new Set(
      allPhones.map((p) => normalizePhoneDisplay(p)).filter((p): p is string => Boolean(p))
    ),
  ];

  if (!email && !phone) {
    logger.info('website_contact.not_found', {
      websiteUrl,
      pagesFetched: pagesFetched.length,
    });
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

  logger.info('website_contact.ok', {
    websiteUrl,
    hasPhone: Boolean(phone),
    hasEmail: Boolean(email),
    phone,
    pagesFetched: pagesFetched.length,
  });

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
