import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import type { MovingCompanyRecord } from '@/lib/reviews/companies';
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

export async function findMovingCompanyForLegacy(params: {
  legacyId: string;
  usdotNumber?: string;
  mcNumber?: string;
}): Promise<MovingCompanyRecord | null> {
  if (!isSupabaseAdminConfigured()) return null;
  const admin = createAdminClient();

  const { data: byLegacy } = await admin
    .from('moving_companies')
    .select('*')
    .eq('legacy_company_id', params.legacyId)
    .maybeSingle();

  if (byLegacy) return byLegacy as MovingCompanyRecord;

  const dot = normalizeDigits(params.usdotNumber || '');
  if (dot) {
    const { data } = await admin
      .from('moving_companies')
      .select('*')
      .eq('dot_number', dot)
      .maybeSingle();
    if (data) return data as MovingCompanyRecord;
  }

  const mc = normalizeDigits(params.mcNumber || '');
  if (mc) {
    const { data } = await admin
      .from('moving_companies')
      .select('*')
      .eq('mc_number', mc)
      .maybeSingle();
    if (data) return data as MovingCompanyRecord;
  }

  return null;
}

export function reviewPageUrlForCarrier(parsed: ParsedCarrierNumber): string {
  const slug = slugFromCarrier(parsed.type, parsed.value);
  return `/review?carrier=${encodeURIComponent(parsed.display)}&slug=${slug}`;
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