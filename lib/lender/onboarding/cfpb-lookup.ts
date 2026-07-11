import 'server-only';

import type { CfpbComplaintSummary } from '@/lib/lender/onboarding/types';

const CFPB_SEARCH = 'https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/';

export async function fetchCfpbComplaintSummary(
  companyName: string
): Promise<CfpbComplaintSummary> {
  const now = new Date().toISOString();
  const q = companyName.trim();
  if (!q) {
    return {
      companyName: null,
      complaintCount: 0,
      status: 'skipped',
      lastFetched: now,
      sourceUrl: 'https://www.consumerfinance.gov/data-research/consumer-complaints/',
    };
  }

  try {
    const params = new URLSearchParams({
      company: q,
      size: '1',
      no_aggs: 'true',
    });
    const res = await fetch(`${CFPB_SEARCH}?${params}`, {
      signal: AbortSignal.timeout(10_000),
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) {
      return {
        companyName: q,
        complaintCount: 0,
        status: 'error',
        lastFetched: now,
        sourceUrl: `https://www.consumerfinance.gov/data-research/consumer-complaints/search/?company=${encodeURIComponent(q)}`,
      };
    }

    const data = (await res.json()) as { hits?: { total?: { value?: number } } };
    const count = data.hits?.total?.value ?? 0;

    return {
      companyName: q,
      complaintCount: count,
      status: count > 0 ? 'ok' : 'not_found',
      lastFetched: now,
      sourceUrl: `https://www.consumerfinance.gov/data-research/consumer-complaints/search/?company=${encodeURIComponent(q)}`,
    };
  } catch {
    return {
      companyName: q,
      complaintCount: 0,
      status: 'error',
      lastFetched: now,
      sourceUrl: `https://www.consumerfinance.gov/data-research/consumer-complaints/search/?company=${encodeURIComponent(q)}`,
    };
  }
}