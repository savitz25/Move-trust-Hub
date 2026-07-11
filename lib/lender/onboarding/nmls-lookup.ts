import 'server-only';

import { lookupNmlsByIdPlaywright, searchNmlsByNamePlaywright } from '@/lib/lender/onboarding/nmls-playwright';
import { parseNmlsEntityHtml, nmlsSearchUrl } from '@/lib/lender/onboarding/nmls-parse';
import type { NmlsSearchCandidate, NmlsSuggestionPreview } from '@/lib/lender/onboarding/types';
import { logger } from '@/lib/logging/logger';

const FETCH_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml',
  'Accept-Language': 'en-US,en;q=0.9',
};

async function lookupNmlsByIdFetch(nmlsId: string): Promise<NmlsSuggestionPreview | null> {
  try {
    const res = await fetch(nmlsSearchUrl(nmlsId), {
      headers: FETCH_HEADERS,
      signal: AbortSignal.timeout(12_000),
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const html = await res.text();
    return parseNmlsEntityHtml(html, nmlsId, 'fetch');
  } catch {
    return null;
  }
}

export type NmlsLookupResult = {
  success: boolean;
  error?: string;
  preview?: NmlsSuggestionPreview;
};

export async function lookupNmlsForOnboarding(nmlsId: string): Promise<NmlsLookupResult> {
  const normalized = nmlsId.replace(/\D/g, '');
  if (!/^\d{4,10}$/.test(normalized)) {
    return { success: false, error: 'Enter a valid NMLS ID (4–10 digits).' };
  }

  if (process.env.NMLS_SCRAPE_ENABLED === '0') {
    return {
      success: false,
      error: 'NMLS lookup is temporarily disabled. Try again later or contact support.',
    };
  }

  let preview = await lookupNmlsByIdFetch(normalized);
  if (!preview) {
    preview = await lookupNmlsByIdPlaywright(normalized);
  }

  if (!preview?.legalName) {
    return {
      success: false,
      error:
        'Could not retrieve this NMLS record. Confirm the ID at nmlsconsumeraccess.org and try again.',
    };
  }

  logger.info('lender.nmls.lookup_ok', {
    nmlsId: normalized,
    method: preview.scrapeMethod,
    needsManualReview: preview.needsManualReview,
  });

  return { success: true, preview };
}

export type NmlsNameSearchResult = {
  success: boolean;
  error?: string;
  candidates?: NmlsSearchCandidate[];
};

export async function searchNmlsByName(
  companyName: string,
  state?: string
): Promise<NmlsNameSearchResult> {
  const q = companyName.trim();
  if (q.length < 2) {
    return { success: false, error: 'Enter at least 2 characters to search.' };
  }

  const candidates = await searchNmlsByNamePlaywright(q, state?.trim());
  if (candidates.length === 0) {
    return {
      success: false,
      error: 'No NMLS matches found. Try the exact legal name or search by NMLS ID.',
    };
  }

  return { success: true, candidates };
}