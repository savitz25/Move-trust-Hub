import 'server-only';

import type { WebsiteContactData } from '@/lib/verification/website-contact-scrape';
import {
  normalizePhoneDisplay,
  scrapeWebsiteContact,
} from '@/lib/verification/website-contact-scrape';
import { logger } from '@/lib/logging/logger';

export type ResolvedCompanyContact = {
  phone: string | null;
  email: string | null;
  website: string | null;
  sources: {
    phone: string | null;
    email: string | null;
    website: string | null;
  };
  websiteContact: WebsiteContactData | null;
};

function cleanPhone(raw?: string | null): string | null {
  if (!raw?.trim()) return null;
  return normalizePhoneDisplay(raw) ?? raw.trim().slice(0, 40);
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

/**
 * Cascade contact fields for onboarding:
 * FMCSA → Google Places → user-provided → website scrape (phone/email).
 * Website is taken from Google / user / scrape URL.
 */
export async function resolveCompanyContact(input: {
  fmcsaPhone?: string | null;
  googlePhone?: string | null;
  googleWebsite?: string | null;
  userPhone?: string | null;
  userEmail?: string | null;
  userWebsite?: string | null;
  /** When false, skip network scrape (still merges non-website sources). */
  scrapeWebsite?: boolean;
  context?: string;
}): Promise<ResolvedCompanyContact> {
  const website =
    cleanWebsite(input.userWebsite) ||
    cleanWebsite(input.googleWebsite) ||
    null;

  let websiteContact: WebsiteContactData | null = null;
  if (input.scrapeWebsite !== false && website) {
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

  // Phone: FMCSA → Google → user → website
  const phoneCandidates: Array<{ value: string | null; source: string }> = [
    { value: cleanPhone(input.fmcsaPhone), source: 'fmcsa' },
    { value: cleanPhone(input.googlePhone), source: 'google' },
    { value: cleanPhone(input.userPhone), source: 'user' },
    { value: cleanPhone(websiteContact?.phone), source: 'website' },
  ];
  let phone: string | null = null;
  let phoneSource: string | null = null;
  for (const c of phoneCandidates) {
    if (c.value) {
      phone = c.value;
      phoneSource = c.source;
      break;
    }
  }

  // Email: user → website (FMCSA/Google rarely provide business email)
  const emailCandidates: Array<{ value: string | null; source: string }> = [
    { value: cleanEmail(input.userEmail), source: 'user' },
    { value: cleanEmail(websiteContact?.email), source: 'website' },
  ];
  let email: string | null = null;
  let emailSource: string | null = null;
  for (const c of emailCandidates) {
    if (c.value) {
      email = c.value;
      emailSource = c.source;
      break;
    }
  }

  const websiteSource = website
    ? input.userWebsite?.trim()
      ? 'user'
      : input.googleWebsite?.trim()
        ? 'google'
        : 'website'
    : null;

  return {
    phone,
    email,
    website,
    sources: {
      phone: phoneSource,
      email: emailSource,
      website: websiteSource,
    },
    websiteContact,
  };
}
