import type { Company } from '@/types';
import type { GooglePlacesData, PublicScrapeData } from '@/lib/verification/types';

export type AdminCompanyStatus = 'active' | 'inactive' | 'out_of_service';

export type AdminCompanyListItem = {
  id: string;
  slug: string;
  name: string;
  usdotNumber: string;
  mcNumber: string;
  headquarters: string;
  status: AdminCompanyStatus;
  reputationScore: number;
  lastUpdated: string | null;
  googleReviewCount: number;
  googleRating: number | null;
  bbbRating: string;
  fmcsaLastChecked: string | null;
  googleLastFetched: string | null;
  bbbLastChecked: string | null;
  scrapeLastScrapedAt: string | null;
  isStale: boolean;
};

export type AdminCompanyDetail = Company & {
  googleData: GooglePlacesData | null;
  publicScrapeData: PublicScrapeData | null;
  fmcsaLastChecked: string | null;
  bbbLastChecked: string | null;
  auditLog: AdminRefreshAuditEntry[];
};

export type AdminRefreshAuditEntry = {
  source: 'fmcsa' | 'google' | 'bbb' | 'manual';
  label: string;
  timestamp: string | null;
  detail?: string;
};

export type AdminCompanyUpdateInput = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  headquarters: string;
  website: string;
  usdotNumber: string;
  mcNumber: string;
  isVerified: boolean;
};

export type AdminRefreshResult = {
  success: boolean;
  error?: string;
  message?: string;
  fieldsUpdated?: number;
  company?: AdminCompanyListItem;
};

const STALE_MS = 30 * 24 * 60 * 60 * 1000;

export function deriveCompanyStatus(row: {
  authority_active?: boolean | null;
  out_of_service?: boolean | null;
}): AdminCompanyStatus {
  if (row.out_of_service) return 'out_of_service';
  if (row.authority_active === false) return 'inactive';
  return 'active';
}

export function isCompanyDataStale(timestamps: (string | null | undefined)[]): boolean {
  const now = Date.now();
  const checks = timestamps.filter(Boolean) as string[];
  if (checks.length === 0) return true;
  return checks.some((ts) => now - new Date(ts).getTime() > STALE_MS);
}