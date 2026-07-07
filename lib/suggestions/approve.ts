import 'server-only';

import { computeReputationScore } from '@/data/seed-companies';
import { computeFmcsaDataHash } from '@/lib/fmcsa/refresh/hash';
import { fetchFmcsaCarrierSnapshot } from '@/lib/fmcsa/refresh/fetch-carrier';
import { logger } from '@/lib/logging/logger';
import { createAdminClient } from '@/lib/supabase/admin';
import { insertCompanyWithFallback } from '@/lib/suggestions/insert-company';
import { ensurePublishableCompanySlug } from '@/lib/utils/company-slug';
import { getDirectoryCompanyViaRpc } from '@/lib/suggestions/publish-company-rpc';
import { resolveUniqueCompanySlug } from '@/lib/suggestions/slug';
import type { Json } from '@/types/supabase';

export type CompanySuggestionRow = {
  id: string;
  name: string;
  usdot: string | null;
  mc_number: string | null;
  details: string | null;
  legal_name: string | null;
  headquarters: string | null;
  phone: string | null;
  authority_status: string | null;
  fmcsa_preview: Json | null;
  fmcsa_raw: Json | null;
  google_data?: Json | null;
  public_scrape_data?: Json | null;
};

export async function approveSuggestionToCompany(
  suggestion: CompanySuggestionRow
): Promise<{ companyId: string; slug: string } | null> {
  const admin = createAdminClient();
  const usdot = suggestion.usdot?.replace(/\D/g, '') || null;
  const displayName = suggestion.legal_name || suggestion.name;
  const resolvedSlug = await resolveUniqueCompanySlug({ name: displayName, usdot });
  const slug = ensurePublishableCompanySlug({
    slug: resolvedSlug,
    name: displayName,
    usdot,
  });
  const companyId = slug;

  let snapshot: Awaited<ReturnType<typeof fetchFmcsaCarrierSnapshot>> = null;
  if (usdot) {
    try {
      snapshot = await fetchFmcsaCarrierSnapshot(usdot, suggestion.mc_number);
    } catch (err) {
      // FMCSA timeout must not block directory approval — use suggestion snapshot below.
      logger.warn('approve.fmcsa_fetch_failed', {
        usdot,
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  if (!snapshot && suggestion.fmcsa_raw && typeof suggestion.fmcsa_raw === 'object') {
    const raw = suggestion.fmcsa_raw as Record<string, unknown>;
    snapshot = {
      dotNumber: usdot || '',
      mcNumber: suggestion.mc_number?.replace(/\D/g, '') || undefined,
      legalName: suggestion.legal_name || suggestion.name,
      allowedToOperate: suggestion.authority_status === 'Active',
      authorityActive: suggestion.authority_status === 'Active',
      outOfService: false,
      safetyRating: 'Not Rated',
      complaintsLast12m: 0,
      shipments: 1000,
      raw,
    };
  }

  const googleData = suggestion.google_data as {
    rating?: number | null;
    review_count?: number | null;
  } | null;
  const publicScrape = suggestion.public_scrape_data as {
    bbb_rating?: string | null;
    bbb_accredited?: boolean | null;
  } | null;

  const overallRating = googleData?.rating && googleData.rating > 0 ? googleData.rating : 0;
  const reviewCount = googleData?.review_count ?? 0;
  const bbbRating =
    (publicScrape?.bbb_rating as import('@/types').Company['bbbRating']) || 'NR';

  const dataHash = snapshot ? computeFmcsaDataHash(snapshot) : null;
  const reputationScore = computeReputationScore({
    overallRating,
    reviewCount,
    fmcsaComplaints: snapshot?.complaintsLast12m ?? 0,
    fmcsaShipments: snapshot?.shipments ?? 1000,
    bbbRating,
    bbbAccredited: Boolean(publicScrape?.bbb_accredited),
    isVerified: Boolean(snapshot?.authorityActive),
    yearsInBusiness: 0,
  });

  const row = {
    id: companyId,
    slug,
    name: displayName,
    short_description: suggestion.details?.slice(0, 200) || `Interstate moving company (USDOT ${usdot || 'pending'}).`,
    description:
      suggestion.details ||
      `${displayName} was added to Move Trust Hub from a community suggestion. FMCSA licensing data is shown when available.`,
    headquarters: suggestion.headquarters || '',
    website: '',
    usdot_number: usdot ? usdot : null,
    mc_number: suggestion.mc_number || snapshot?.mcNumber || null,
    fmcsa_safety_rating: snapshot?.safetyRating ?? 'Not Rated',
    fmcsa_complaints: snapshot?.complaintsLast12m ?? 0,
    fmcsa_shipments: snapshot?.shipments ?? 1000,
    authority_active: snapshot?.authorityActive ?? null,
    out_of_service: snapshot?.outOfService ?? false,
    complaints_last_12m: snapshot?.complaintsLast12m ?? 0,
    revocation_date: snapshot?.revocationDate ?? null,
    data_hash: dataHash,
    fmcsa_last_checked: snapshot ? new Date().toISOString() : null,
    fmcsa_legal_name: snapshot?.legalName ?? suggestion.legal_name,
    fmcsa_raw: snapshot?.raw ?? suggestion.fmcsa_raw,
    bbb_rating: bbbRating,
    bbb_accredited: Boolean(publicScrape?.bbb_accredited),
    google_data: suggestion.google_data ?? null,
    public_scrape_data: suggestion.public_scrape_data ?? null,
    overall_rating: overallRating,
    review_count: reviewCount,
    reputation_score: reputationScore,
    years_in_business: 0,
    avg_price_per_move: 0,
    price_range: '$$',
    coverage: 'Continental US',
    services: ['Full Service'],
    specialties: [],
    rating_breakdown: {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    },
    is_verified: Boolean(snapshot?.authorityActive && snapshot?.allowedToOperate),
    last_updated: new Date().toISOString(),
  };

  const insertResult = await insertCompanyWithFallback(admin, row);
  if (!insertResult.ok) {
    if (insertResult.code === '23505') {
      const existing = await findExistingApprovedCompany(admin, { slug, companyId, usdot });
      if (existing) {
        return existing;
      }
    }
    throw new Error(insertResult.error);
  }

  return { companyId, slug };
}

async function findExistingApprovedCompany(
  admin: ReturnType<typeof createAdminClient>,
  params: { slug: string; companyId: string; usdot: string | null }
): Promise<{ companyId: string; slug: string } | null> {
  for (const key of [params.slug, params.companyId, params.usdot ? `dot-${params.usdot}` : null, params.usdot]) {
    if (!key) continue;
    const viaRpc = await getDirectoryCompanyViaRpc(admin, key);
    if (viaRpc?.slug && viaRpc?.id) {
      return { companyId: String(viaRpc.id), slug: String(viaRpc.slug) };
    }
  }

  const { data: bySlug } = await admin
    .from('companies')
    .select('id, slug')
    .eq('slug', params.slug)
    .maybeSingle();
  if (bySlug?.slug) {
    return { companyId: bySlug.id, slug: bySlug.slug };
  }

  const { data: byId } = await admin
    .from('companies')
    .select('id, slug')
    .eq('id', params.companyId)
    .maybeSingle();
  if (byId?.slug) {
    return { companyId: byId.id, slug: byId.slug };
  }

  if (params.usdot) {
    const { data: byUsdot } = await admin
      .from('companies')
      .select('id, slug')
      .eq('usdot_number', params.usdot)
      .maybeSingle();
    if (byUsdot?.slug) {
      return { companyId: byUsdot.id, slug: byUsdot.slug };
    }
  }

  return null;
}