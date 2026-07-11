import 'server-only';

import {
  SCRAPE_TIMEOUT_MS,
  SCRAPE_USER_AGENT,
  waitForScrapeSlot,
} from '@/lib/verification/scrape-rate-limit';
import type { CfpbComplaintSummary } from '@/lib/lender/enrichment/types';

const CFPB_API =
  'https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/';

type CfpbApiResponse = {
  hits?: {
    total?: { value?: number };
    hits?: Array<{
      _source?: {
        issue?: string;
        product?: string;
        company?: string;
        date_received?: string;
      };
    }>;
  };
};

function emptyCfpb(
  companyQuery: string,
  now: string,
  status: CfpbComplaintSummary['status'],
  error?: string
): CfpbComplaintSummary {
  return {
    source: 'cfpb_public_api',
    company_query: companyQuery,
    complaints_count: null,
    recent_issues: [],
    recent_products: [],
    last_fetched: now,
    status,
    error,
  };
}

/**
 * Public CFPB Consumer Complaint Database search API.
 * No API key required — rate-limited per hostname.
 */
export async function fetchCfpbComplaints(companyName: string): Promise<CfpbComplaintSummary> {
  const now = new Date().toISOString();
  const query = companyName.trim();
  if (!query) {
    return emptyCfpb(query, now, 'skipped', 'Company name required');
  }

  const url = new URL(CFPB_API);
  url.searchParams.set('company', query);
  url.searchParams.set('size', '10');
  url.searchParams.set('sort', 'created_date_desc');

  await waitForScrapeSlot('www.consumerfinance.gov');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SCRAPE_TIMEOUT_MS);

  try {
    const res = await fetch(url.toString(), {
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'User-Agent': SCRAPE_USER_AGENT,
      },
    });

    if (!res.ok) {
      return emptyCfpb(
        query,
        now,
        'error',
        `CFPB API ${res.status}: ${(await res.text().catch(() => '')).slice(0, 200)}`
      );
    }

    const json = (await res.json()) as CfpbApiResponse;
    const total = json.hits?.total?.value ?? null;
    const hits = json.hits?.hits ?? [];

    const recentIssues = [
      ...new Set(
        hits
          .map((h) => h._source?.issue?.trim())
          .filter((v): v is string => Boolean(v))
          .slice(0, 5)
      ),
    ];
    const recentProducts = [
      ...new Set(
        hits
          .map((h) => h._source?.product?.trim())
          .filter((v): v is string => Boolean(v))
          .slice(0, 3)
      ),
    ];

    return {
      source: 'cfpb_public_api',
      company_query: query,
      complaints_count: total,
      recent_issues: recentIssues,
      recent_products: recentProducts,
      last_fetched: now,
      status: total != null ? 'ok' : 'not_found',
    };
  } catch (err) {
    return emptyCfpb(
      query,
      now,
      'error',
      err instanceof Error ? err.message : 'CFPB request failed'
    );
  } finally {
    clearTimeout(timer);
  }
}