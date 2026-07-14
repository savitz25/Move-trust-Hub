import type { AdminCompanyListItem } from '@/lib/admin/company-dashboard-types';
import {
  deriveCompanyStatus,
  isCompanyDataStale,
} from '@/lib/admin/company-dashboard-types';
import type { GooglePlacesData, PublicScrapeData } from '@/lib/verification/types';

export function mapAdminListItem(row: Record<string, unknown>): AdminCompanyListItem {
  const google = (row.google_data ?? null) as GooglePlacesData | null;
  const scrape = (row.public_scrape_data ?? null) as PublicScrapeData | null;

  const fmcsaLastChecked = (row.fmcsa_last_checked as string | null) ?? null;
  const bbbLastChecked = (row.bbb_last_checked as string | null) ?? null;
  const googleLastFetched = google?.last_fetched ?? null;
  const scrapeLastScrapedAt = scrape?.last_scraped_at ?? null;

  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    usdotNumber: String(row.usdot_number ?? ''),
    mcNumber: String(row.mc_number ?? ''),
    headquarters: String(row.headquarters ?? ''),
    status: deriveCompanyStatus({
      authority_active: row.authority_active as boolean | null,
      out_of_service: row.out_of_service as boolean | null,
    }),
    reputationScore: Number(row.reputation_score) || 0,
    lastUpdated: (row.last_updated as string | null) ?? null,
    googleReviewCount: Number(row.review_count) || google?.review_count || 0,
    googleRating:
      google?.rating != null && google.rating > 0
        ? google.rating
        : Number(row.overall_rating) || null,
    bbbRating: String(row.bbb_rating ?? 'NR'),
    fmcsaLastChecked,
    googleLastFetched,
    bbbLastChecked,
    scrapeLastScrapedAt,
    isStale: isCompanyDataStale([fmcsaLastChecked, googleLastFetched, bbbLastChecked, scrapeLastScrapedAt]),
  };
}