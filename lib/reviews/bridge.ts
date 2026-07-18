import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import type { MovingCompanyRecord } from '@/lib/reviews/companies';
import { buildReviewPageUrl } from '@/lib/reviews/review-url';
import { slugFromCarrier } from '@/lib/reviews/schema';
import type { ParsedCarrierNumber } from '@/lib/verify-dot/schema';

function normalizeDigits(value: string) {
  return value.replace(/\D/g, '');
}

export type UserReviewStats = {
  avgRating: number;
  approvedCount: number;
  companySlug: string | null;
  companyId: string | null;
};

/**
 * Find all moving_companies rows that could hold reviews for a directory profile.
 * Prefers legacy_company_id, then DOT, then MC — returns unique rows.
 * Opportunistically backfills legacy_company_id when missing.
 */
export async function findMovingCompaniesForLegacy(params: {
  legacyId: string;
  usdotNumber?: string;
  mcNumber?: string;
}): Promise<MovingCompanyRecord[]> {
  if (!isSupabaseAdminConfigured()) return [];
  const admin = createAdminClient();
  const byId = new Map<string, MovingCompanyRecord>();

  const { data: byLegacy } = await admin
    .from('moving_companies')
    .select('*')
    .eq('legacy_company_id', params.legacyId);

  for (const row of byLegacy ?? []) {
    byId.set(row.id, row as MovingCompanyRecord);
  }

  const dot = normalizeDigits(params.usdotNumber || '');
  if (dot) {
    const { data } = await admin
      .from('moving_companies')
      .select('*')
      .eq('dot_number', dot);
    for (const row of data ?? []) {
      byId.set(row.id, row as MovingCompanyRecord);
    }
  }

  const mc = normalizeDigits(params.mcNumber || '');
  if (mc) {
    const { data } = await admin
      .from('moving_companies')
      .select('*')
      .eq('mc_number', mc);
    for (const row of data ?? []) {
      byId.set(row.id, row as MovingCompanyRecord);
    }
  }

  const rows = Array.from(byId.values());

  // Backfill legacy link so future lookups and revalidation hit the directory slug
  for (const row of rows) {
    if (!row.legacy_company_id && params.legacyId) {
      void admin
        .from('moving_companies')
        .update({ legacy_company_id: params.legacyId })
        .eq('id', row.id)
        .then(() => undefined)
        .catch(() => undefined);
      row.legacy_company_id = params.legacyId;
    }
  }

  // Prefer the carrier with the most approved reviews as primary
  rows.sort(
    (a, b) => (b.approved_review_count || 0) - (a.approved_review_count || 0)
  );

  return rows;
}

/** Primary moving company for a directory profile (most approved reviews). */
export async function findMovingCompanyForLegacy(params: {
  legacyId: string;
  usdotNumber?: string;
  mcNumber?: string;
}): Promise<MovingCompanyRecord | null> {
  const rows = await findMovingCompaniesForLegacy(params);
  return rows[0] ?? null;
}

export function reviewPageUrlForCarrier(parsed: ParsedCarrierNumber): string {
  const slug = slugFromCarrier(parsed.type, parsed.value);
  return buildReviewPageUrl({ slug, carrier: parsed.display });
}

export async function getMovingCompanySlugsForSitemap(): Promise<
  Array<{ slug: string; updated_at: string }>
> {
  if (!isSupabaseAdminConfigured()) return [];
  const admin = createAdminClient();
  const { data } = await admin
    .from('moving_companies')
    .select('slug, updated_at')
    .gt('approved_review_count', 0)
    .order('updated_at', { ascending: false })
    .limit(500);
  return (data as Array<{ slug: string; updated_at: string }>) ?? [];
}
