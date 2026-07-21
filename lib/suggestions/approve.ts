import 'server-only';

import { computeReputationScore } from '@/data/seed-companies';
import { extractContactFromFmcsaRaw } from '@/lib/fmcsa/company-from-row';
import { computeFmcsaDataHash } from '@/lib/fmcsa/refresh/hash';
import { fetchFmcsaCarrierSnapshot } from '@/lib/fmcsa/refresh/fetch-carrier';
import { logger } from '@/lib/logging/logger';
import { createAdminClient } from '@/lib/supabase/admin';
import { buildVerificationSourcesFromOnboarding } from '@/lib/suggestions/build-verification-sources';
import { formatCompanyCoverageLabel } from '@/lib/destinations/resolve-company-destinations';
import { coverageFromSuggestionRow } from '@/lib/suggestions/resolve-suggestion-coverage';
import {
  isPublishVerified,
  resolvePublishFmcsaSnapshot,
} from '@/lib/suggestions/publish-snapshot';
import { applyPublishedEnrichment } from '@/lib/suggestions/apply-published-enrichment';
import { insertCompanyWithFallback } from '@/lib/suggestions/insert-company';
import { ensurePublishableCompanySlug } from '@/lib/utils/company-slug';
import { getDirectoryCompanyViaRpc } from '@/lib/suggestions/publish-company-rpc';
import { resolveUniqueCompanySlug } from '@/lib/suggestions/slug';
import { resolveApprovalEnrichment } from '@/lib/suggestions/suggestion-enrichment-storage';
import {
  normalizeSelectedCounties,
  parseServiceScope,
} from '@/lib/suggestions/service-scope';
import { resolvePublicCompanyNameFromSources } from '@/lib/companies/public-display-name';
import type { GooglePlacesData, PublicScrapeData } from '@/lib/verification/types';
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
  service_scope?: string | null;
  selected_counties?: Json | null;
};

export async function approveSuggestionToCompany(
  suggestion: CompanySuggestionRow
): Promise<{ companyId: string; slug: string } | null> {
  const admin = createAdminClient();
  const serviceScope = parseServiceScope(suggestion.service_scope);
  const selectedCounties = normalizeSelectedCounties(suggestion.selected_counties);
  const usdot =
    serviceScope === 'intrastate'
      ? null
      : suggestion.usdot?.replace(/\D/g, '') || null;

  let liveSnapshot: Awaited<ReturnType<typeof fetchFmcsaCarrierSnapshot>> = null;
  if (serviceScope === 'interstate' && usdot && !suggestion.fmcsa_raw) {
    try {
      liveSnapshot = await fetchFmcsaCarrierSnapshot(usdot, suggestion.mc_number);
    } catch (err) {
      logger.warn('approve.fmcsa_fetch_failed', {
        usdot,
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  const snapshot =
    serviceScope === 'intrastate'
      ? null
      : resolvePublishFmcsaSnapshot(suggestion, liveSnapshot);

  // Public name prefers FMCSA DBA over legal entity name when they differ.
  const nameResolution = resolvePublicCompanyNameFromSources({
    storedName: suggestion.name,
    fmcsaLegalName: suggestion.legal_name,
    legalName: snapshot?.legalName ?? suggestion.legal_name,
    dbaName: snapshot?.dbaName ?? null,
    fmcsaRaw: snapshot?.raw ?? suggestion.fmcsa_raw,
    fmcsaPreview: suggestion.fmcsa_preview,
    forceFmcsaPreference: true,
  });
  const displayName = nameResolution.publicName;
  const legalNameForStorage =
    nameResolution.legalName ||
    snapshot?.legalName ||
    suggestion.legal_name ||
    suggestion.name;
  const resolvedSlug = await resolveUniqueCompanySlug({ name: displayName, usdot });
  const slug = ensurePublishableCompanySlug({
    slug: resolvedSlug,
    name: displayName,
    usdot,
  });
  const companyId = slug;

  const resolvedEnrichment = await resolveApprovalEnrichment(suggestion);
  const googleData = resolvedEnrichment.google;
  const publicScrape = resolvedEnrichment.publicScrape;

  logger.info('approve.enrichment_resolved', {
    suggestionId: suggestion.id,
    slug,
    source: suggestion.google_data || suggestion.public_scrape_data ? 'columns' : 'packed_or_live',
    hasGoogle: Boolean(googleData?.status === 'ok'),
    googleRating: googleData?.rating ?? null,
    googleReviews: googleData?.review_count ?? null,
    hasBbb: Boolean(publicScrape?.bbb_rating),
    bbbRating: publicScrape?.bbb_rating ?? null,
  });

  const overallRating =
    googleData?.status === 'ok' && googleData.rating && googleData.rating > 0
      ? googleData.rating
      : 0;
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
    isVerified: isPublishVerified(snapshot),
    yearsInBusiness: 0,
  });

  const contactFromSnapshot = snapshot
    ? extractContactFromFmcsaRaw(snapshot.raw)
    : extractContactFromFmcsaRaw(suggestion.fmcsa_raw);

  const headquarters =
    suggestion.headquarters ||
    contactFromSnapshot.physicalAddress ||
    '';
  const websiteCoverage = coverageFromSuggestionRow(suggestion);
  const coverageLabel = formatCompanyCoverageLabel(headquarters, websiteCoverage);

  // Contact cascade at publish: suggestion/FMCSA/Google + website scrape if still incomplete.
  const { resolveCompanyContact } = await import(
    '@/lib/suggestions/resolve-company-contact'
  );
  const suggestionEmail =
    (suggestion as { contact_email?: string | null }).contact_email?.trim() || null;
  const resolvedContact = await resolveCompanyContact({
    fmcsaPhone: contactFromSnapshot.phone || suggestion.phone,
    fmcsaAddress: contactFromSnapshot.physicalAddress,
    googlePhone: googleData?.phone,
    googleWebsite: googleData?.website_url,
    googleAddress: googleData?.formatted_address,
    userPhone: suggestion.phone,
    userEmail: suggestionEmail,
    userWebsite:
      websiteCoverage?.websiteUrl ||
      googleData?.website_url ||
      null,
    headquarters: headquarters || suggestion.headquarters,
    scrapeWebsite: true,
    context: 'approve_publish',
  });
  const phone = resolvedContact.phone;
  const contactEmail = resolvedContact.email;
  const websiteUrl = resolvedContact.website || '';
  const physicalAddress =
    resolvedContact.address ||
    contactFromSnapshot.physicalAddress ||
    headquarters ||
    null;

  const verificationSources = buildVerificationSourcesFromOnboarding({
    fmcsaSnapshot: snapshot,
    fmcsaRaw:
      snapshot?.raw ??
      (suggestion.fmcsa_raw && typeof suggestion.fmcsa_raw === 'object'
        ? (suggestion.fmcsa_raw as Record<string, unknown>)
        : null),
    google: googleData,
    publicScrape,
  });

  const enrichmentInput = {
    googleData,
    publicScrape,
    verificationSources,
    overallRating,
    reviewCount,
    bbbRating,
    bbbAccredited: Boolean(publicScrape?.bbb_accredited),
    reputationScore,
    coverage: coverageLabel,
    fmcsaRaw: (snapshot?.raw ?? suggestion.fmcsa_raw) as Json | null,
    fmcsaLastChecked: snapshot ? new Date().toISOString() : null,
    fmcsaLegalName: snapshot?.legalName ?? legalNameForStorage,
    fmcsaSafetyRating: snapshot?.safetyRating ?? 'Not Rated',
    authorityActive: snapshot?.authorityActive ?? null,
    outOfService: snapshot?.outOfService ?? false,
    complaintsLast12m: snapshot?.complaintsLast12m ?? 0,
    revocationDate: snapshot?.revocationDate ?? null,
    dataHash,
  };

  const row = {
    id: companyId,
    slug,
    name: displayName,
    short_description:
      suggestion.details?.slice(0, 200) ||
      `Interstate moving company${usdot ? ` (USDOT ${usdot})` : ''}.`,
    description:
      suggestion.details ||
      `${displayName} was added to Move Trust Hub through our multi-source onboarding process. FMCSA licensing is primary; Google and public ratings are supplemental.`,
    headquarters: physicalAddress || headquarters,
    physical_address: physicalAddress,
    phone,
    email: contactEmail,
    website: websiteUrl,
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
    fmcsa_legal_name: snapshot?.legalName ?? legalNameForStorage,
    fmcsa_raw: snapshot?.raw ?? suggestion.fmcsa_raw,
    bbb_rating: bbbRating,
    bbb_accredited: Boolean(publicScrape?.bbb_accredited),
    google_data: suggestion.google_data ?? null,
    public_scrape_data: suggestion.public_scrape_data ?? null,
    verification_sources: verificationSources,
    verification_last_synced_at: new Date().toISOString(),
    overall_rating: overallRating,
    review_count: reviewCount,
    reputation_score: reputationScore,
    years_in_business: 0,
    avg_price_per_move: 0,
    price_range: '$$',
    coverage: coverageLabel,
    services: ['Full Service'],
    specialties: [],
    rating_breakdown: {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    },
    is_verified:
      serviceScope === 'intrastate'
        ? Boolean(googleData?.status === 'ok')
        : isPublishVerified(snapshot),
    service_scope: serviceScope,
    coverage_counties: selectedCounties as unknown as Json,
    last_updated: new Date().toISOString(),
  };

  const insertResult = await insertCompanyWithFallback(admin, row);
  if (!insertResult.ok) {
    if (insertResult.code === '23505') {
      const existing = await findExistingApprovedCompany(admin, { slug, companyId, usdot });
      if (existing) {
        await applyPublishedEnrichment(admin, existing.slug, enrichmentInput);
        return existing;
      }
    }
    throw new Error(insertResult.error);
  }

  const publishedSlug = insertResult.slug;
  const publishedId = insertResult.companyId;
  const enrichmentLog = await applyPublishedEnrichment(admin, publishedSlug, enrichmentInput);

  logger.info('approve.company_published', {
    suggestionId: suggestion.id,
    slug: publishedSlug,
    companyId: publishedId,
    existingRecord: insertResult.existing,
    usdot,
    hasGoogleOnSuggestion: Boolean(googleData),
    hasPublicScrapeOnSuggestion: Boolean(publicScrape),
    hasFmcsaOnSuggestion: Boolean(suggestion.fmcsa_raw || snapshot),
    enrichmentCopied: enrichmentLog.copied,
    enrichmentError: enrichmentLog.error,
  });

  return { companyId: publishedId, slug: publishedSlug };
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