/**
 * Repair published company enrichment (Google + BBB) into verification_sources.
 * Run: npx tsx --require ./scripts/stub-server-only.cjs scripts/repair-company-enrichment.ts stanford-van-lines-inc
 */
import { loadEnvLocal } from '../lib/verification/load-env-local';
import { revalidatePublishedCompany } from '@/lib/directory/revalidate-company';
import { revalidateDestinationPaths } from '@/lib/suggestions/revalidate-destination';
import { applyPublishedEnrichment } from '@/lib/suggestions/apply-published-enrichment';
import { buildVerificationSourcesFromOnboarding } from '@/lib/suggestions/build-verification-sources';
import { resolveApprovalEnrichment } from '@/lib/suggestions/suggestion-enrichment-storage';
import { snapshotFromSuggestion, isPublishVerified, coverageFromHeadquarters } from '@/lib/suggestions/publish-snapshot';
import { computeReputationScore } from '@/data/seed-companies';
import { createAdminClient } from '@/lib/supabase/admin';

loadEnvLocal();

async function main() {
  const slug = process.argv[2]?.trim();
  if (!slug) {
    console.error('Usage: repair-company-enrichment.ts <company-slug>');
    process.exit(1);
  }

  const admin = createAdminClient();

  const { data: company, error: cErr } = await admin
    .from('companies')
    .select('*')
    .or(`slug.eq.${slug},id.eq.${slug}`)
    .maybeSingle();

  if (cErr || !company) {
    console.error('Company not found:', cErr?.message ?? slug);
    process.exit(1);
  }

  const { data: suggestion } = await admin
    .from('company_suggestions')
    .select('*')
    .eq('company_id', company.id)
    .order('moderated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const enrichment = await resolveApprovalEnrichment(
    suggestion ?? {
      legal_name: company.name,
      name: company.name,
      headquarters: company.headquarters,
      usdot: company.usdot_number,
      fmcsa_preview: null,
      fmcsa_raw: company.fmcsa_raw,
    }
  );

  const snapshot = suggestion
    ? snapshotFromSuggestion(suggestion)
    : null;

  const googleData = enrichment.google;
  const publicScrape = enrichment.publicScrape;
  const overallRating =
    googleData?.status === 'ok' && googleData.rating && googleData.rating > 0
      ? googleData.rating
      : Number(company.overall_rating) || 0;
  const reviewCount = googleData?.review_count ?? (Number(company.review_count) || 0);
  const bbbRating = publicScrape?.bbb_rating ?? company.bbb_rating ?? 'NR';

  const reputationScore = computeReputationScore({
    overallRating,
    reviewCount,
    fmcsaComplaints: snapshot?.complaintsLast12m ?? (Number(company.fmcsa_complaints) || 0),
    fmcsaShipments: snapshot?.shipments ?? (Number(company.fmcsa_shipments) || 1000),
    bbbRating: bbbRating as import('@/types').Company['bbbRating'],
    bbbAccredited: Boolean(publicScrape?.bbb_accredited ?? company.bbb_accredited),
    isVerified: isPublishVerified(snapshot),
    yearsInBusiness: Number(company.years_in_business) || 0,
  });

  const verificationSources = buildVerificationSourcesFromOnboarding({
    fmcsaSnapshot: snapshot,
    fmcsaRaw:
      snapshot?.raw ??
      (company.fmcsa_raw && typeof company.fmcsa_raw === 'object'
        ? (company.fmcsa_raw as Record<string, unknown>)
        : null),
    google: googleData,
    publicScrape,
  });

  const log = await applyPublishedEnrichment(admin, slug, {
    googleData,
    publicScrape,
    verificationSources,
    overallRating,
    reviewCount,
    bbbRating,
    bbbAccredited: Boolean(publicScrape?.bbb_accredited),
    reputationScore,
    coverage: coverageFromHeadquarters(company.headquarters),
    fmcsaRaw: company.fmcsa_raw,
    fmcsaLastChecked: company.fmcsa_last_checked,
    fmcsaLegalName: company.fmcsa_legal_name ?? company.name,
    fmcsaSafetyRating: company.fmcsa_safety_rating ?? 'Not Rated',
    authorityActive: company.authority_active,
    outOfService: Boolean(company.out_of_service),
    complaintsLast12m: company.complaints_last_12m ?? 0,
    revocationDate: company.revocation_date,
    dataHash: company.data_hash,
  });

  try {
    revalidatePublishedCompany(slug);
    revalidateDestinationPaths(company.headquarters);
  } catch {
    console.log('(cache revalidate skipped — run from app server or wait for next deploy)');
  }

  console.log('Repair complete:', {
    slug,
    googleRating: googleData?.rating,
    googleReviews: googleData?.review_count,
    bbbRating: publicScrape?.bbb_rating,
    storageMode: log.storageMode,
    copied: log.copied,
    error: log.error,
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});