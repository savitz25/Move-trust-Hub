import type { WebsiteContactData } from '@/lib/verification/website-contact-scrape';
import {
  isPlaceholderPhone,
  normalizePhoneDisplay,
  scrapeWebsiteContact,
} from '@/lib/verification/website-contact-scrape';
import { preferGoodContactField } from '@/lib/suggestions/onboarding-guards';
import { logger } from '@/lib/logging/logger';

export type ResolvedCompanyContact = {
  phone: string | null;
  email: string | null;
  website: string | null;
  /** Best physical / street-style address */
  address: string | null;
  sources: {
    phone: string | null;
    email: string | null;
    website: string | null;
    address: string | null;
  };
  websiteContact: WebsiteContactData | null;
};

function cleanPhone(raw?: string | null): string | null {
  if (!raw?.trim()) return null;
  if (isPlaceholderPhone(raw)) return null;
  return normalizePhoneDisplay(raw);
}

function cleanEmail(raw?: string | null): string | null {
  if (!raw?.trim()) return null;
  const e = raw.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return null;
  return e.slice(0, 254);
}

function cleanWebsite(raw?: string | null): string | null {
  if (!raw?.trim()) return null;
  const t = raw.trim();
  try {
    const withProtocol = /^https?:\/\//i.test(t) ? t : `https://${t}`;
    const u = new URL(withProtocol);
    if (!['http:', 'https:'].includes(u.protocol)) return null;
    return u.toString().replace(/\/$/, '').slice(0, 300);
  } catch {
    return null;
  }
}

function cleanAddress(raw?: string | null): string | null {
  if (!raw?.trim()) return null;
  return raw.trim().replace(/\s+/g, ' ').slice(0, 400);
}

function firstFilled(
  candidates: Array<{ value: string | null; source: string }>
): { value: string | null; source: string | null } {
  for (const c of candidates) {
    if (c.value) return { value: c.value, source: c.source };
  }
  return { value: null, source: null };
}

/**
 * Cascade contact fields for onboarding / backfill:
 * Address: FMCSA physical → Google formatted → headquarters / user
 * Phone: FMCSA → Google → user → website scrape
 * Email: user → website scrape
 * Website: user → Google → scrape URL
 *
 * Never returns empty strings; null when unknown.
 * Skips network scrape when phone + email already resolved (unless forceScrape).
 */
export async function resolveCompanyContact(input: {
  fmcsaPhone?: string | null;
  fmcsaAddress?: string | null;
  googlePhone?: string | null;
  googleWebsite?: string | null;
  googleAddress?: string | null;
  userPhone?: string | null;
  userEmail?: string | null;
  userWebsite?: string | null;
  userAddress?: string | null;
  headquarters?: string | null;
  /** When false, skip network scrape. Default true if phone or email still missing. */
  scrapeWebsite?: boolean;
  forceScrape?: boolean;
  context?: string;
}): Promise<ResolvedCompanyContact> {
  const website =
    cleanWebsite(input.userWebsite) ||
    cleanWebsite(input.googleWebsite) ||
    null;

  const phonePre = firstFilled([
    { value: cleanPhone(input.fmcsaPhone), source: 'fmcsa' },
    { value: cleanPhone(input.googlePhone), source: 'google' },
    { value: cleanPhone(input.userPhone), source: 'user' },
  ]);
  const emailPre = firstFilled([
    { value: cleanEmail(input.userEmail), source: 'user' },
  ]);

  const needsScrape =
    input.forceScrape === true ||
    (input.scrapeWebsite !== false &&
      Boolean(website) &&
      (!phonePre.value || !emailPre.value));

  let websiteContact: WebsiteContactData | null = null;
  if (needsScrape && website) {
    try {
      websiteContact = await scrapeWebsiteContact({ websiteUrl: website });
      logger.info('contact.website_scrape', {
        context: input.context ?? 'onboarding',
        website,
        status: websiteContact.status,
        hasPhone: Boolean(websiteContact.phone),
        hasEmail: Boolean(websiteContact.email),
      });
    } catch (err) {
      logger.warn('contact.website_scrape_failed', {
        context: input.context ?? 'onboarding',
        website,
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  const phone = firstFilled([
    { value: phonePre.value, source: phonePre.source ?? 'user' },
    { value: cleanPhone(websiteContact?.phone), source: 'website' },
  ]);

  const email = firstFilled([
    { value: emailPre.value, source: emailPre.source ?? 'user' },
    { value: cleanEmail(websiteContact?.email), source: 'website' },
  ]);

  const address = firstFilled([
    { value: cleanAddress(input.fmcsaAddress), source: 'fmcsa' },
    { value: cleanAddress(input.googleAddress), source: 'google' },
    { value: cleanAddress(input.userAddress), source: 'user' },
    { value: cleanAddress(input.headquarters), source: 'headquarters' },
  ]);

  const websiteSource = website
    ? input.userWebsite?.trim()
      ? 'user'
      : input.googleWebsite?.trim()
        ? 'google'
        : 'website'
    : null;

  return {
    phone: phone.value,
    email: email.value,
    website,
    address: address.value,
    sources: {
      phone: phone.source,
      email: email.source,
      website: websiteSource,
      address: address.source,
    },
    websiteContact,
  };
}

/** Prefer non-empty existing over empty/placeholder incoming (safe backfill merge). */
export function preferExistingContactField(
  existing: string | null | undefined,
  incoming: string | null | undefined
): string | null {
  const looksPhone = (v?: string | null) => Boolean(v && /\d{7,}/.test(v));
  if (looksPhone(existing) || looksPhone(incoming)) {
    return preferGoodContactField(existing, incoming, 'phone');
  }
  return preferGoodContactField(existing, incoming, 'text');
}
