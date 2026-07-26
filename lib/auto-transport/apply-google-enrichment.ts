import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import type { Company } from '@/types';
import { computeAutoTransportReputationScore } from '@/data/seed-auto-transport';

type EnrichmentRow = {
  slug: string;
  overallRating: number | null;
  reviewCount: number | null;
  updatedAt?: string;
};

let cache: Record<string, EnrichmentRow> | null = null;

function loadEnrichment(): Record<string, EnrichmentRow> {
  if (cache) return cache;
  const file = resolve(process.cwd(), 'data/auto-transport-google-enrichment.json');
  if (!existsSync(file)) {
    cache = {};
    return cache;
  }
  try {
    cache = JSON.parse(readFileSync(file, 'utf8')) as Record<string, EnrichmentRow>;
  } catch {
    cache = {};
  }
  return cache;
}

/** Merge Google Places ratings onto auto-transport seed companies when present. */
export function applyAutoTransportGoogleEnrichment(company: Company): Company {
  const row = loadEnrichment()[company.slug];
  if (!row) return company;

  const overallRating =
    row.overallRating != null && row.overallRating > 0
      ? row.overallRating
      : company.overallRating;
  const reviewCount =
    row.reviewCount != null && row.reviewCount > 0
      ? row.reviewCount
      : company.reviewCount;

  const next: Company = {
    ...company,
    overallRating,
    reviewCount,
    lastUpdated: row.updatedAt?.slice(0, 10) ?? company.lastUpdated,
  };
  next.reputationScore = computeAutoTransportReputationScore(next);
  return next;
}
