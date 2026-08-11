'use server';

import { findCompanyByCarrierNumber } from '@/lib/verify-dot/directory-lookup';
import { parseCarrierNumber } from '@/lib/verify-dot/schema';

export type QuoteCheckDirectoryMatch = {
  matched: boolean;
  slug?: string;
  name?: string;
  usdot?: string;
  profileHref?: string;
  verifyDotHref?: string;
  note: string;
};

/**
 * High-confidence directory match by USDOT (optional name is a soft hint only).
 */
export async function matchQuoteCheckDirectory(input: {
  usdot?: string;
  companyName?: string;
}): Promise<QuoteCheckDirectoryMatch> {
  const raw = (input.usdot ?? '').trim();
  if (!raw) {
    return {
      matched: false,
      note: 'Add a USDOT on the questionnaire to search the Move Trust Hub directory.',
    };
  }

  const digits = raw.replace(/\D/g, '');
  const parsed = parseCarrierNumber(digits);
  if (!parsed || parsed.type !== 'DOT' || parsed.value.length < 5) {
    return {
      matched: false,
      verifyDotHref: digits
        ? `/verify-dot?q=${encodeURIComponent(digits)}`
        : '/verify-dot',
      note: 'Could not parse a USDOT from the value entered. You can still research on Verify DOT.',
    };
  }

  try {
    const hit = await findCompanyByCarrierNumber(
      parsed,
      input.companyName?.trim() || undefined
    );
    if (hit.slug && hit.name) {
      return {
        matched: true,
        slug: hit.slug,
        name: hit.name,
        usdot: parsed.value,
        profileHref: `/companies/${hit.slug}`,
        verifyDotHref: `/verify-dot?q=${encodeURIComponent(parsed.value)}`,
        note: `Directory profile matched on USDOT ${parsed.value}. Confirm the legal name matches your estimate.`,
      };
    }
  } catch {
    /* soft-fail */
  }

  return {
    matched: false,
    usdot: parsed.value,
    verifyDotHref: `/verify-dot?q=${encodeURIComponent(parsed.value)}`,
    note: 'Not matched in the Move Trust Hub directory yet — still verify this USDOT on FMCSA-oriented tools.',
  };
}
