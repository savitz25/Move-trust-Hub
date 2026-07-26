import 'server-only';

import { computeReputationScore } from '@/data/seed-companies';
import { servicesForPublishedCompany } from '@/lib/companies/type-badges';
import { logger } from '@/lib/logging/logger';
import { assignSelectedCounties } from '@/lib/suggestions/assign-selected-counties';
import { applyPublishedEnrichment } from '@/lib/suggestions/apply-published-enrichment';
import { buildVerificationSourcesFromOnboarding } from '@/lib/suggestions/build-verification-sources';
import { insertCompanyWithFallback } from '@/lib/suggestions/insert-company';
import type { SelectedCounty } from '@/lib/suggestions/service-scope';
import { createAdminClient } from '@/lib/supabase/admin';
import { ensurePublishableCompanySlug } from '@/lib/utils/company-slug';
import { resolveUniqueCompanySlug } from '@/lib/suggestions/slug';
import { parseGoogleData, parsePublicScrapeData } from '@/lib/verification/backfill-helpers';
import type { GooglePlacesData, PublicScrapeData } from '@/lib/verification/types';
import type { Json } from '@/types/supabase';
import type { Company } from '@/types';

export type DirectLocalPublishInput = {
  name: string;
  stateCode?: string | null;
  headquarters?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  selectedCounties: SelectedCounty[];
  details?: string | null;
  googleData?: Json | null;
  publicScrapeData?: Json | null;
  suggestionId?: string | null;
};

function ratingsFromGoogleSnapshot(google: GooglePlacesData | null): {
  overallRating: number;
  reviewCount: number;
} {
  if (google?.status === 'ok' && google.rating != null && google.rating > 0) {
    return {
      overallRating: google.rating,
      reviewCount: google.review_count ?? 0,
    };
  }
  return { overallRating: 0, reviewCount: 0 };
}

export type DirectLocalPublishResult =
  | { ok: true; companyId: string; slug: string; countiesAssigned: number }
  | { ok: false; error: string; step: string };

/**
 * Last-resort admin path: write a local company + county placements without
 * relying on a fully-hydrated suggestion row / FMCSA snapshot.
 */
export async function publishLocalCompanyDirect(
  input: DirectLocalPublishInput
): Promise<DirectLocalPublishResult> {
  const name = input.name.trim().slice(0, 200);
  if (name.length < 2) {
    return { ok: false, error: 'Company name is required.', step: 'validate' };
  }

  const counties = input.selectedCounties.filter((c) => c.stateSlug && c.countySlug);
  if (!counties.length) {
    return {
      ok: false,
      error: 'At least one county is required for local placement.',
      step: 'validate',
    };
  }

  try {
    const admin = createAdminClient();
    const resolvedSlug = await resolveUniqueCompanySlug({ name, usdot: null });
    const slug = ensurePublishableCompanySlug({
      slug: resolvedSlug,
      name,
      usdot: null,
    });
    const companyId = slug;
    const now = new Date().toISOString();
    const headquarters =
      input.headquarters?.trim() ||
      (input.stateCode ? `${name}, ${input.stateCode}` : name);

    // Persist onboard enrichment into the same display fields the directory reads.
    const googleData = parseGoogleData(input.googleData);
    const publicScrape = parsePublicScrapeData(input.publicScrapeData);
    const { overallRating, reviewCount } = ratingsFromGoogleSnapshot(googleData);
    const bbbRating =
      (publicScrape?.bbb_rating as Company['bbbRating'] | undefined) || 'NR';
    const bbbAccredited = Boolean(publicScrape?.bbb_accredited);
    const reputationScore = computeReputationScore({
      overallRating,
      reviewCount,
      fmcsaComplaints: 0,
      fmcsaShipments: 1000,
      bbbRating,
      bbbAccredited,
      isVerified: true,
      yearsInBusiness: 0,
    });
    const verificationSources = buildVerificationSourcesFromOnboarding({
      fmcsaSnapshot: null,
      fmcsaRaw: null,
      google: googleData,
      publicScrape,
    });

    const row = {
      id: companyId,
      slug,
      name,
      short_description:
        input.details?.slice(0, 200) || 'Local / in-state moving company.',
      description:
        input.details ||
        `${name} was added as a local/in-state mover. Listed on selected county pages only — not the main interstate directory.`,
      headquarters,
      physical_address: headquarters,
      phone: input.phone ?? null,
      email: input.email ?? null,
      website: input.website ?? null,
      usdot_number: null,
      mc_number: null,
      fmcsa_safety_rating: 'Not Rated',
      fmcsa_complaints: 0,
      fmcsa_shipments: 1000,
      bbb_rating: bbbRating,
      bbb_accredited: bbbAccredited,
      // Display fields used by directory cards (not only google_data JSON).
      overall_rating: overallRating,
      review_count: reviewCount,
      reputation_score: reputationScore,
      years_in_business: 0,
      avg_price_per_move: 0,
      price_range: '$$',
      coverage: 'Local / in-state',
      services: servicesForPublishedCompany({
        serviceScope: 'intrastate',
        entityType: null,
        baseServices: ['Full Service'],
      }),
      specialties: [],
      rating_breakdown: {
        fiveStar: 0,
        fourStar: 0,
        threeStar: 0,
        twoStar: 0,
        oneStar: 0,
      },
      is_verified: true,
      service_scope: 'intrastate',
      coverage_counties: counties as unknown as Json,
      entity_type: null,
      google_data: input.googleData ?? null,
      public_scrape_data: input.publicScrapeData ?? null,
      verification_sources: verificationSources,
      verification_last_synced_at: now,
      last_updated: now,
    };

    logger.info('local_direct.publish_start', {
      name,
      slug,
      countyCount: counties.length,
      suggestionId: input.suggestionId ?? null,
      hasPhone: Boolean(input.phone),
      hasWebsite: Boolean(input.website),
    });

    const insertResult = await insertCompanyWithFallback(admin, row);
    if (!insertResult.ok) {
      // Existing slug race — try to attach counties to existing company
      if (insertResult.code === '23505') {
        const { data: existing } = await admin
          .from('companies')
          .select('id, slug')
          .eq('slug', slug)
          .maybeSingle();
        if (existing?.slug) {
          logger.warn('local_direct.existing_slug_reusing', {
            slug: existing.slug,
            companyId: existing.id,
          });
          // Ensure local flags + onboard enrichment on existing row
          await admin
            .from('companies')
            .update({
              is_verified: true,
              service_scope: 'intrastate',
              coverage_counties: counties as unknown as Json,
              phone: input.phone || undefined,
              website: input.website || undefined,
              email: input.email || undefined,
              last_updated: now,
            } as never)
            .eq('id', existing.id);
          await applyPublishedEnrichment(admin, existing.slug, {
            googleData,
            publicScrape,
            verificationSources,
            overallRating,
            reviewCount,
            bbbRating,
            bbbAccredited,
            reputationScore,
            coverage: 'Local / in-state',
            fmcsaRaw: null,
            fmcsaLastChecked: null,
            fmcsaLegalName: null,
            fmcsaSafetyRating: 'Not Rated',
            authorityActive: null,
            outOfService: false,
            complaintsLast12m: 0,
            revocationDate: null,
            dataHash: null,
          });

          let countiesAssigned = counties.length;
          try {
            const assignPromise = assignSelectedCounties({
              companyId: String(existing.id),
              companySlug: existing.slug,
              headquarters,
              counties,
            })
              .then((assigned) => {
                countiesAssigned =
                  assigned.assignedCounties.length || counties.length;
              })
              .catch((assignErr: unknown) => {
                logger.error('local_direct.assign_existing_threw', {
                  slug: existing.slug,
                  message:
                    assignErr instanceof Error
                      ? assignErr.message
                      : String(assignErr),
                });
              });
            await Promise.race([
              assignPromise,
              new Promise<void>((resolve) => setTimeout(resolve, 8000)),
            ]);
          } catch (assignErr) {
            logger.error('local_direct.assign_existing_threw', {
              slug: existing.slug,
              message:
                assignErr instanceof Error
                  ? assignErr.message
                  : String(assignErr),
            });
          }

          if (input.suggestionId) {
            try {
              await admin
                .from('company_suggestions')
                .update({
                  status: 'approved',
                  company_id: existing.id,
                  moderated_at: now,
                  moderated_by: 'admin_local_direct_existing',
                } as never)
                .eq('id', input.suggestionId);
            } catch {
              // ignore
            }
          }

          return {
            ok: true,
            companyId: String(existing.id),
            slug: existing.slug,
            countiesAssigned,
          };
        }
      }

      logger.error('local_direct.company_insert_failed', {
        name,
        slug,
        code: insertResult.code,
        error: insertResult.error,
      });
      return {
        ok: false,
        error: insertResult.error,
        step: 'company_insert',
      };
    }

    const publishedSlug = insertResult.slug;
    const publishedId = insertResult.companyId;

    // Explicitly copy Google/BBB enrichment onto display columns + verification_sources.
    // insert may strip enrichment columns on schema lag; applyPublishedEnrichment retries.
    const enrichmentLog = await applyPublishedEnrichment(admin, publishedSlug, {
      googleData,
      publicScrape,
      verificationSources,
      overallRating,
      reviewCount,
      bbbRating,
      bbbAccredited,
      reputationScore,
      coverage: 'Local / in-state',
      fmcsaRaw: null,
      fmcsaLastChecked: null,
      fmcsaLegalName: null,
      fmcsaSafetyRating: 'Not Rated',
      authorityActive: null,
      outOfService: false,
      complaintsLast12m: 0,
      revocationDate: null,
      dataHash: null,
    });
    logger.info('local_direct.enrichment_copied', {
      slug: publishedSlug,
      storageMode: enrichmentLog.storageMode,
      copied: enrichmentLog.copied,
      googleRating: enrichmentLog.googleRating,
      googleReviewCount: enrichmentLog.googleReviewCount,
      bbbRating: enrichmentLog.bbbRating,
      error: enrichmentLog.error,
    });

    // County assign + revalidate can be noisy; never let it hang the whole publish.
    // Prefer returning success with company live even if assign partially fails.
    let countiesAssigned = counties.length;
    try {
      const assignPromise = assignSelectedCounties({
        companyId: publishedId,
        companySlug: publishedSlug,
        headquarters,
        counties,
      })
        .then((assigned) => {
          countiesAssigned =
            assigned.assignedCounties.length || counties.length;
        })
        .catch((assignErr: unknown) => {
          logger.error('local_direct.assign_threw', {
            slug: publishedSlug,
            message:
              assignErr instanceof Error
                ? assignErr.message
                : String(assignErr),
          });
        });
      await Promise.race([
        assignPromise,
        new Promise<void>((resolve) => setTimeout(resolve, 8000)),
      ]);
    } catch (assignErr) {
      // Company exists — never fail the whole publish on revalidate/assign noise.
      logger.error('local_direct.assign_threw', {
        slug: publishedSlug,
        message: assignErr instanceof Error ? assignErr.message : String(assignErr),
      });
    }

    if (input.suggestionId) {
      try {
        const { error: sugErr } = await admin
          .from('company_suggestions')
          .update({
            status: 'approved',
            company_id: publishedId,
            moderated_at: now,
            moderated_by: 'admin_local_direct',
            service_scope: 'intrastate',
            selected_counties: counties as unknown as Json,
          } as never)
          .eq('id', input.suggestionId);
        if (sugErr) {
          logger.warn('local_direct.suggestion_status_update_failed', {
            suggestionId: input.suggestionId,
            message: sugErr.message,
          });
        }
      } catch {
        // ignore
      }
    }

    logger.info('local_direct.publish_ok', {
      name,
      slug: publishedSlug,
      companyId: publishedId,
      countiesAssigned,
      suggestionId: input.suggestionId ?? null,
    });

    return {
      ok: true,
      companyId: publishedId,
      slug: publishedSlug,
      countiesAssigned,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error('local_direct.publish_threw', {
      name: input.name,
      message,
      stack: err instanceof Error ? err.stack : undefined,
    });
    return { ok: false, error: message, step: 'exception' };
  }
}
