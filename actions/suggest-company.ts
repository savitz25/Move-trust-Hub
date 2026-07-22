'use server';

import { headers } from 'next/headers';
import { searchCarriersByNameState } from '@/actions/verify-dot';
import { suggestCompanySchema } from '@/lib/suggestions/schema';
import { checkSuggestionDuplicate } from '@/lib/suggestions/duplicates';
import { getAdminSubmitterDefaults } from '@/lib/admin/submitter-defaults';
import { approveAndPublishSuggestion } from '@/lib/suggestions/auto-approve';
import { checkSuggestionRateLimit } from '@/lib/suggestions/rate-limit';
import { resolveTrustedSubmitter } from '@/lib/suggestions/trusted-submitter';
import { isAdminSession } from '@/lib/admin/auth';
import {
  filterCountiesToState,
  hasMinimumPublishContact,
  isUsablePhone,
  preferGoodContactField,
} from '@/lib/suggestions/onboarding-guards';
import {
  logAdminPublish,
  logAuthorityRouteToIntrastate,
  logContactFillRates,
  logCountyPreselection,
  logOnboardingEvent,
} from '@/lib/suggestions/onboarding-observability';
import { normalizeSelectedCounties } from '@/lib/suggestions/service-scope';
import {
  lookupFmcsaForSuggestion,
  toFmcsaSuggestionPreview,
} from '@/lib/suggestions/fmcsa-lookup';
import { preferPublicCompanyName } from '@/lib/companies/public-display-name';
import type { EnrichedCompanyPreview, FmcsaSuggestionPreview } from '@/lib/suggestions/types';
import { resolveSubmissionEnrichment } from '@/lib/suggestions/enrichment-snapshot';
import { enrichCompanySources } from '@/lib/verification/enrich-company';
import {
  buildCompanySuggestionInsertRow,
  insertCompanySuggestion,
} from '@/lib/suggestions/insert-suggestion';
import { parseCarrierNumber } from '@/lib/verify-dot/schema';
import { predictCompanyProfileSlug } from '@/lib/directory/resolve-company';
import { hashEmail, hashIp } from '@/lib/reviews/hash';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { logger } from '@/lib/logging/logger';
import type { WebsiteCoverageData } from '@/lib/verification/coverage-scrape-types';
import { scrapeWebsiteCoverage } from '@/lib/verification/website-coverage-scrape';
import type { NameStateSearchResult } from '@/actions/verify-dot';
import type { SuggestCompanyInput } from '@/lib/suggestions/schema';

export type SubmitSuggestionResult = {
  success: boolean;
  error?: string;
  /** Optional non-error notice (e.g. soft-queue after partial admin publish). */
  message?: string;
  suggestionId?: string;
  /** Predicted profile slug after admin approval */
  profileSlug?: string;
  /** Link to existing profile when duplicate already in directory */
  existingProfileSlug?: string;
  pendingReview?: boolean;
  /**
   * USDOT active but no interstate OA — client must switch to Intrastate / Local funnel.
   */
  forceIntrastate?: boolean;
  /** Local publish: counties the mover was placed on (admin auto-publish). */
  publishedCounties?: Array<{ stateSlug: string; countySlug: string; name?: string }>;
  /** True when trusted admin path ran auto-publish. */
  adminPublished?: boolean;
};

export type PreviewFmcsaSuggestionResult = {
  success: boolean;
  error?: string;
  preview?: FmcsaSuggestionPreview;
};

export type PreviewEnrichedSuggestionResult = {
  success: boolean;
  error?: string;
  preview?: EnrichedCompanyPreview;
};

export type SuggestionSubmitterDefaults = {
  isTrustedSubmitter: boolean;
  suggestedByName: string;
  suggestedByEmail: string;
};

export type ScrapeWebsiteCoverageResult = {
  success: boolean;
  coverage?: WebsiteCoverageData;
  error?: string;
};

function skippedCoverage(): WebsiteCoverageData {
  return {
    consentGiven: false,
    websiteUrl: null,
    scrapedAt: new Date().toISOString(),
    status: 'skipped',
    isNationalOnly: false,
    summary: null,
    stateSlugs: [],
    cities: [],
    counties: [],
    officeAddresses: [],
    regions: [],
    pagesFetched: [],
    rawSnippets: [],
  };
}

async function resolveSubmissionCoverage(
  parsed: SuggestCompanyInput,
  websiteFallback?: string | null
): Promise<WebsiteCoverageData> {
  if (parsed.coverageSnapshot) {
    return parsed.coverageSnapshot as WebsiteCoverageData;
  }

  if (!parsed.coverageConsent) {
    return skippedCoverage();
  }

  const websiteUrl = parsed.websiteUrl || websiteFallback || null;
  if (!websiteUrl) {
    return {
      ...skippedCoverage(),
      consentGiven: true,
      status: 'not_found',
      error: 'No website URL available for coverage scan.',
    };
  }

  return scrapeWebsiteCoverage({
    websiteUrl,
    consentGiven: true,
  });
}

export async function scrapeWebsiteCoverageForOnboarding(input: {
  websiteUrl: string;
  consentGiven: boolean;
  /** Onboarding state — keeps coverage cities/counties in-state only */
  preferredStateCode?: string | null;
}): Promise<ScrapeWebsiteCoverageResult> {
  try {
    const coverage = await scrapeWebsiteCoverage({
      websiteUrl: input.websiteUrl,
      consentGiven: input.consentGiven,
      preferredStateCode: input.preferredStateCode,
    });
    if (coverage.status === 'error') {
      return {
        success: false,
        coverage,
        error: coverage.error ?? 'Website coverage scan failed.',
      };
    }
    return { success: true, coverage };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Website coverage scan failed.',
    };
  }
}

export type ScrapeWebsiteContactResult = {
  success: boolean;
  phone?: string | null;
  email?: string | null;
  websiteUrl?: string | null;
  error?: string;
};

/** Scrape public website for business phone + email (onboarding). */
export async function scrapeWebsiteContactForOnboarding(input: {
  websiteUrl: string;
}): Promise<ScrapeWebsiteContactResult> {
  try {
    const { scrapeWebsiteContact } = await import(
      '@/lib/verification/website-contact-scrape'
    );
    const contact = await scrapeWebsiteContact({ websiteUrl: input.websiteUrl });
    if (contact.status === 'error') {
      return {
        success: false,
        phone: contact.phone,
        email: contact.email,
        websiteUrl: contact.websiteUrl,
        error: contact.error ?? 'Could not read contact details from this website.',
      };
    }
    return {
      success: true,
      phone: contact.phone,
      email: contact.email,
      websiteUrl: contact.websiteUrl,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Website contact scan failed.',
    };
  }
}

export async function getSuggestionSubmitterDefaults(): Promise<SuggestionSubmitterDefaults> {
  const defaults = getAdminSubmitterDefaults();
  // Prefill only for logged-in admin sessions. Email-based trust applies at submit
  // when the form email matches a configured admin address (e.g. info@movetrusthub.com).
  const admin = await isAdminSession();
  return {
    isTrustedSubmitter: admin,
    suggestedByName: admin ? defaults.name : '',
    suggestedByEmail: admin ? defaults.email : '',
  };
}

function clientIpFromHeaders(headerStore: Headers): string | null {
  return (
    headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerStore.get('x-real-ip') ||
    null
  );
}

async function buildEnrichedPreview(input: {
  carrierQuery?: string;
}): Promise<PreviewEnrichedSuggestionResult> {
  if (!input.carrierQuery?.trim()) {
    return {
      success: false,
      error: 'A verified USDOT or MC number is required.',
    };
  }

  const parsed = parseCarrierNumber(input.carrierQuery.trim());
  if (!parsed) {
    return {
      success: false,
      error: 'Enter a valid USDOT or MC number (3–8 digits).',
    };
  }

  if (!process.env.FMCSA_WEB_KEY?.trim()) {
    return {
      success: false,
      error: 'FMCSA lookup is temporarily unavailable. Please try again later.',
    };
  }

  const fmcsa = await lookupFmcsaForSuggestion(input.carrierQuery);
  if (!fmcsa?.legalName) {
    return {
      success: false,
      error:
        'No FMCSA record found for that number. Confirm it on safer.fmcsa.dot.gov before submitting.',
    };
  }

  const fmcsaPreview = toFmcsaSuggestionPreview(fmcsa);
  const legalName = fmcsa.legalName;

  const enrichment = await enrichCompanySources({
    legalName,
    dbaName: fmcsa.dbaName,
    headquarters: fmcsa.headquarters,
    phone: fmcsa.phone,
    city: fmcsaPreview.addressCity,
    state: fmcsaPreview.addressState,
    usdotNumber: fmcsa.usdot,
    // Prefer trade name for Places when DBA differs; multi-query still tries legal + stripped.
  });

  return {
    success: true,
    preview: {
      fmcsa: fmcsaPreview,
      google: enrichment.google,
      publicScrape: enrichment.publicScrape,
      fetchedAt: enrichment.fetchedAt,
    },
  };
}

export async function searchCarriersForOnboarding(
  raw: unknown
): Promise<NameStateSearchResult> {
  return searchCarriersByNameState(raw);
}

export async function previewFmcsaSuggestion(
  carrierQuery: string
): Promise<PreviewFmcsaSuggestionResult> {
  const res = await buildEnrichedPreview({ carrierQuery });
  if (!res.success || !res.preview) {
    return { success: false, error: res.error };
  }
  if (!res.preview.fmcsa) {
    return { success: false, error: res.error ?? 'FMCSA preview unavailable' };
  }
  return { success: true, preview: res.preview.fmcsa };
}

/** Multi-source preview: FMCSA (required) + Google Places + public BBB scrape in parallel. */
export async function previewEnrichedCompanySuggestion(input: {
  carrierQuery?: string;
  companyName?: string;
}): Promise<PreviewEnrichedSuggestionResult> {
  if (input.carrierQuery?.trim()) {
    return buildEnrichedPreview({ carrierQuery: input.carrierQuery });
  }

  return {
    success: false,
    error:
      'FMCSA verification is required. Search by USDOT/MC or use Name + State to find the carrier first.',
  };
}

export async function listCountiesForLocalCoverage(stateCode: string): Promise<{
  success: boolean;
  counties?: Array<{
    stateSlug: string;
    countySlug: string;
    name: string;
    stateCode: string;
    stateName: string;
  }>;
  error?: string;
}> {
  try {
    const { listCountiesForStateCode } = await import('@/lib/local-movers/list-state-counties');
    const counties = listCountiesForStateCode(stateCode);
    if (!counties.length) {
      return { success: false, error: 'No counties found for that state.' };
    }
    return { success: true, counties };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Could not load counties.',
    };
  }
}

/** Google-primary preview for local/intrastate movers (no FMCSA). */
export async function previewLocalCompanySuggestion(input: {
  companyName: string;
  stateCode: string;
}): Promise<PreviewEnrichedSuggestionResult> {
  const name = input.companyName?.trim();
  const state = input.stateCode?.trim().toUpperCase();
  if (!name || name.length < 2) {
    return { success: false, error: 'Enter the mover’s business name.' };
  }
  if (!state || state.length !== 2) {
    return { success: false, error: 'Select a state.' };
  }

  try {
    // Do NOT put company name into headquarters — that pollutes city parsing
    // ("Otterly Elite Movers LLC, OR" was treated as city=company name).
    const enrichment = await enrichCompanySources({
      legalName: name,
      dbaName: null,
      state,
      headquarters: state,
      businessCategory: 'local moving company',
    });

    if (enrichment.google?.status !== 'ok' && !enrichment.publicScrape) {
      return {
        success: false,
        error:
          'Could not find this business on Google. Check the name and state, then try again.',
      };
    }

    return {
      success: true,
      preview: {
        fmcsa: null,
        google: enrichment.google,
        publicScrape: enrichment.publicScrape,
        fetchedAt: enrichment.fetchedAt,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Local mover lookup failed.',
    };
  }
}

export async function submitCompanySuggestion(
  raw: unknown
): Promise<SubmitSuggestionResult> {
  const submitTraceId = `sub_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  try {
    const parsed = suggestCompanySchema.safeParse(raw);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      const first = flat.fieldErrors;
      const msg =
        Object.values(first).flat()[0] ??
        flat.formErrors[0] ??
        'Please check your suggestion and try again.';
      logger.error('suggestion.validation_failed', {
        submitTraceId,
        message: msg,
        fieldErrors: flat.fieldErrors,
        formErrors: flat.formErrors,
        rawKeys:
          raw && typeof raw === 'object' ? Object.keys(raw as object) : [],
        serviceScope:
          raw && typeof raw === 'object'
            ? (raw as { serviceScope?: string }).serviceScope
            : undefined,
        name:
          raw && typeof raw === 'object'
            ? (raw as { name?: string }).name
            : undefined,
      });
      return { success: false, error: msg };
    }

    if (parsed.data.website) {
      logger.warn('suggestion.honeypot_triggered', { submitTraceId });
      return { success: false, error: 'Submission rejected.' };
    }

    if (!isSupabaseAdminConfigured()) {
      logger.error('suggestion.supabase_admin_not_configured', { submitTraceId });
      return {
        success: false,
        error: 'Suggestions are temporarily unavailable. Please try again later.',
      };
    }

    let serviceScope: 'interstate' | 'intrastate' =
      parsed.data.serviceScope === 'intrastate' ? 'intrastate' : 'interstate';
    let isLocal = serviceScope === 'intrastate';
    const carrierParsed = isLocal
      ? null
      : parseCarrierNumber(parsed.data.carrierQuery!);
    if (!isLocal && !carrierParsed) {
      return {
        success: false,
        error:
          'FMCSA verification is required for interstate movers. Search by USDOT/MC or Name + State.',
      };
    }

    const headerStore = await headers();
    const userIp = clientIpFromHeaders(headerStore);
    // Same admin privileges for Interstate AND Intrastate:
    // - logged-in admin session cookie, OR
    // - submitter email is info@movetrusthub.com (or ADMIN_SUBMITTER_EMAIL / ADMIN_TRUSTED_EMAILS)
    // Trusted admins: unlimited submissions + auto-publish to live placement.
    const submitterEmail = parsed.data.suggestedByEmail.trim().toLowerCase();
    const trust = await resolveTrustedSubmitter(submitterEmail);
    const trustedSubmitter = trust.trusted;

    logger.info('suggestion.submit_start', {
      submitTraceId,
      serviceScope,
      isLocal,
      trustedSubmitter,
      trustedReason: trust.reason,
      submitterEmail,
      name: parsed.data.name,
      stateCode: parsed.data.stateCode,
      countyCount: parsed.data.selectedCounties?.length ?? 0,
    });

    const rateCheck = await checkSuggestionRateLimit({
      ip: userIp,
      email: submitterEmail,
      bypass: trustedSubmitter,
    });

    if (!rateCheck.allowed) {
      logOnboardingEvent('rate_limited', {
        email: parsed.data.suggestedByEmail,
        serviceScope,
        reason: rateCheck.reason,
      });
      logger.warn('suggestion.rate_limited', {
        submitTraceId,
        reason: rateCheck.reason,
        submitterEmail,
      });
      return { success: false, error: rateCheck.reason };
    }

    let fmcsa: Awaited<ReturnType<typeof lookupFmcsaForSuggestion>> = null;
    let companyName = parsed.data.name?.trim() || '';

    if (!isLocal) {
      fmcsa = await lookupFmcsaForSuggestion(parsed.data.carrierQuery!);
      companyName =
        preferPublicCompanyName({
          legalName: fmcsa?.legalName,
          dbaName: fmcsa?.dbaName,
          fallback: companyName,
        }) || companyName;
      if (!companyName) {
        return {
          success: false,
          error:
            'Could not verify this carrier with FMCSA. Confirm the USDOT/MC number and try again.',
        };
      }

      // USDOT active + no interstate OA → refuse interstate publish; force local funnel.
      const {
        shouldForceIntrastateFromAuthority,
        forceIntrastateUserMessage,
        authorityRoutingFromFmcsaRaw,
      } = await import('@/lib/fmcsa/authority-routing');
      const rawForRouting =
        fmcsa?.fmcsaRaw && typeof fmcsa.fmcsaRaw === 'object'
          ? (fmcsa.fmcsaRaw as Record<string, unknown>)
          : null;
      const forceLocal = shouldForceIntrastateFromAuthority({
        ...authorityRoutingFromFmcsaRaw(rawForRouting),
        usdotStatus: fmcsa?.fmcsaPreview?.usdotStatus ?? null,
        allowedToOperate:
          fmcsa?.allowedToOperate ?? fmcsa?.fmcsaPreview?.allowedToOperate ?? null,
        authorityStatus:
          fmcsa?.authorityStatus ?? fmcsa?.fmcsaPreview?.authorityStatus ?? null,
        fmcsaRaw: rawForRouting,
      });
      if (forceLocal) {
        logAuthorityRouteToIntrastate({
          usdot: fmcsa?.usdot,
          legalName: fmcsa?.legalName,
          dbaName: fmcsa?.dbaName,
          authorityStatus: fmcsa?.authorityStatus,
          source: 'submit',
        });
        // If client already sent counties, accept as intrastate; otherwise instruct UI handoff.
        if (!parsed.data.selectedCounties?.length || !parsed.data.stateCode) {
          return {
            success: false,
            error: forceIntrastateUserMessage(),
            forceIntrastate: true,
          };
        }
        serviceScope = 'intrastate';
        isLocal = true;
        companyName =
          preferPublicCompanyName({
            legalName: fmcsa?.legalName,
            dbaName: fmcsa?.dbaName,
            fallback: companyName,
          }) || companyName;
      }
    } else if (!companyName) {
      return { success: false, error: 'Enter the local mover’s business name.' };
    }

    const enrichment = await resolveSubmissionEnrichment({
      // Prefer trade name for Places/BBB match quality; legal stays on legal_name column.
      legalName: companyName,
      dbaName: fmcsa?.dbaName ?? null,
      headquarters:
        fmcsa?.headquarters ||
        parsed.data.headquarters ||
        (parsed.data.stateCode
          ? `${companyName}, ${parsed.data.stateCode}`
          : null),
      phone: fmcsa?.phone || parsed.data.phone || null,
      state: parsed.data.stateCode || undefined,
      snapshot: parsed.data.enrichmentSnapshot,
    });

    const websiteFallback =
      parsed.data.websiteUrl ||
      parsed.data.enrichmentSnapshot?.google?.website_url ||
      enrichment.google?.website_url ||
      null;

    // Contact cascade: FMCSA → Google → user → website scrape (phone + email).
    const { resolveCompanyContact } = await import(
      '@/lib/suggestions/resolve-company-contact'
    );
    const resolvedContact = await resolveCompanyContact({
      fmcsaPhone: fmcsa?.phone,
      googlePhone: enrichment.google?.phone,
      googleWebsite: enrichment.google?.website_url,
      userPhone: parsed.data.phone,
      userEmail: parsed.data.contactEmail,
      userWebsite: websiteFallback,
      scrapeWebsite: Boolean(websiteFallback),
      context: isLocal ? 'local_onboarding' : 'interstate_onboarding',
    });

    // Prefer resolved website for coverage scrape URL as well.
    const coverage = await resolveSubmissionCoverage(
      {
        ...parsed.data,
        websiteUrl: resolvedContact.website || parsed.data.websiteUrl,
        // Contact scrape implies consent for reading the same public pages.
        coverageConsent:
          parsed.data.coverageConsent ||
          Boolean(resolvedContact.website && isLocal),
      },
      resolvedContact.website || websiteFallback
    );

    const duplicateCheck = await checkSuggestionDuplicate({
      name: companyName,
      usdot: isLocal
        ? null
        : fmcsa?.usdot ?? (carrierParsed?.type === 'DOT' ? carrierParsed.value : null),
      // Admins re-onboard locals often — only hard-block real USDOT directory hits.
      bypassNameAndPending: Boolean(trustedSubmitter && isLocal),
    });

    if (duplicateCheck.duplicate) {
      logOnboardingEvent('duplicate', {
        name: companyName,
        serviceScope,
        reason: duplicateCheck.reason,
      });
      logger.warn('suggestion.duplicate_blocked', {
        submitTraceId,
        name: companyName,
        reason: duplicateCheck.reason,
        existingSlug: duplicateCheck.existingSlug,
      });
      return {
        success: false,
        error: duplicateCheck.reason,
        existingProfileSlug: duplicateCheck.existingSlug,
      };
    }

    // Hard guards: never store placeholder phones; never mix out-of-state counties.
    const safePhone = preferGoodContactField(
      resolvedContact.phone,
      parsed.data.phone,
      'phone'
    );
    const safeEmail = preferGoodContactField(
      resolvedContact.email,
      parsed.data.contactEmail,
      'email'
    );
    const safeWebsite = preferGoodContactField(
      resolvedContact.website,
      parsed.data.websiteUrl,
      'website'
    );

    let selectedCounties = normalizeSelectedCounties(parsed.data.selectedCounties);
    if (isLocal && parsed.data.stateCode) {
      const before = selectedCounties.length;
      selectedCounties = filterCountiesToState(selectedCounties, parsed.data.stateCode);
      if (selectedCounties.length !== before) {
        logOnboardingEvent('coverage_constrained', {
          stateCode: parsed.data.stateCode,
          before,
          after: selectedCounties.length,
        });
      }
      if (!selectedCounties.length) {
        return {
          success: false,
          error:
            'Select at least one county in the onboarding state. Out-of-state counties were removed.',
        };
      }
      logCountyPreselection({
        context: 'submit',
        stateCode: parsed.data.stateCode,
        countyCount: selectedCounties.length,
        counties: selectedCounties.map((c) => `${c.stateSlug}/${c.countySlug}`),
      });
    }

    // Soft gate for local admin publish: prefer phone or website before auto-publish.
    if (
      isLocal &&
      trustedSubmitter &&
      !hasMinimumPublishContact({ phone: safePhone, website: safeWebsite })
    ) {
      logger.warn('onboarding.local_publish_weak_contact', {
        name: companyName,
        stateCode: parsed.data.stateCode,
        hint: 'Admin local publish without phone or website — continuing with available data.',
      });
    }

    const fill = logContactFillRates(
      isLocal ? 'submit_intrastate' : 'submit_interstate',
      {
        name: companyName,
        address: resolvedContact.address || parsed.data.headquarters,
        phone: safePhone,
        email: safeEmail,
        website: safeWebsite,
      },
      {
        serviceScope,
        trustedSubmitter,
        googleStatus: enrichment.google?.status ?? null,
      }
    );

    const admin = createAdminClient();
    const emailHash = hashEmail(parsed.data.suggestedByEmail);
    const ipHash = userIp ? hashIp(userIp) : null;

    const row = buildCompanySuggestionInsertRow({
      parsed: {
        ...parsed.data,
        // Coerced scope when NOT AUTHORIZED forced local after interstate submit.
        serviceScope,
        selectedCounties,
        phone: safePhone,
        contactEmail: safeEmail,
        websiteUrl: safeWebsite,
      },
      companyName,
      fmcsa,
      // Local publish must not rely on carrier for identity (USDOT kept in fmcsa columns only).
      carrierParsed: isLocal ? null : carrierParsed,
      enrichment,
      userIp,
      emailHash,
      ipHash,
      coverage,
      resolvedPhone: safePhone,
      resolvedContactEmail: safeEmail,
    });

    const insertResult = await insertCompanySuggestion(admin, row);

    if (!insertResult.ok) {
      logger.error('suggestion.insert_hard_fail', {
        submitTraceId,
        name: companyName,
        serviceScope,
        isLocal,
        trustedSubmitter,
        error: insertResult.error,
        code: insertResult.code,
        attempts: 'attempts' in insertResult ? insertResult.attempts : undefined,
      });

      // Trusted admin + local: last-resort direct company publish (skip suggestion row).
      if (trustedSubmitter && isLocal) {
        const { publishLocalCompanyDirect } = await import(
          '@/lib/suggestions/publish-local-direct'
        );
        const direct = await publishLocalCompanyDirect({
          name: companyName,
          stateCode: parsed.data.stateCode,
          headquarters: resolvedContact.address || parsed.data.headquarters,
          phone: safePhone,
          email: safeEmail,
          website: safeWebsite,
          selectedCounties,
          details: parsed.data.details,
          googleData: enrichment.google as never,
          publicScrapeData: enrichment.publicScrape as never,
        });
        if (direct.ok) {
          logger.info('suggestion.local_direct_fallback_ok', {
            submitTraceId,
            slug: direct.slug,
            companyId: direct.companyId,
            countiesAssigned: direct.countiesAssigned,
            afterInsertFail: insertResult.error,
          });
          return {
            success: true,
            profileSlug: direct.slug,
            pendingReview: false,
            adminPublished: true,
            publishedCounties: selectedCounties,
            message: `Local mover published directly to ${direct.countiesAssigned} count${direct.countiesAssigned === 1 ? 'y' : 'ies'} (suggestion insert recovered via fallback).`,
          };
        }
        logger.error('suggestion.local_direct_fallback_failed', {
          submitTraceId,
          insertError: insertResult.error,
          directError: direct.error,
          directStep: direct.step,
        });
      }

      return {
        success: false,
        error: insertResult.error || 'Failed to save your suggestion. Please try again.',
      };
    }

    logger.info('suggestion.submitted', {
      submitTraceId,
      suggestionId: insertResult.id,
      insertAttempt: insertResult.attempt,
      usdot: fmcsa?.usdot,
      serviceScope,
      isLocal,
      hasFmcsa: Boolean(fmcsa),
      hasGoogle: Boolean(enrichment.google?.status === 'ok'),
      hasPublicScrape: Boolean(enrichment.publicScrape),
      enrichmentStored: insertResult.enrichmentStored,
      trustedDot: true,
      trustedSubmitter,
      trustedReason: trust.reason,
      selectedCountyCount: selectedCounties.length,
      coverageStatus: coverage.status,
      coverageNationalOnly: coverage.isNationalOnly,
      coverageSummary: coverage.summary,
      hasPhone: Boolean(safePhone),
      hasEmail: Boolean(safeEmail),
      hasWebsite: Boolean(safeWebsite),
      phoneIsPlaceholder: safePhone ? !isUsablePhone(safePhone) : false,
      phoneSource: resolvedContact.sources.phone,
      emailSource: resolvedContact.sources.email,
      fillRate: fill.fillRate,
    });

    const profileSlug = predictCompanyProfileSlug({
      name: companyName,
      // Local / forced-intrastate profiles are name-based (not main interstate DOT slug).
      usdot: isLocal
        ? null
        : fmcsa?.usdot ?? (carrierParsed?.type === 'DOT' ? carrierParsed.value : null),
    });

    // Admin / trusted (session OR info@movetrusthub.com): unlimited + skip moderation
    // for BOTH interstate (main directory) and intrastate (county pages only).
    if (trustedSubmitter) {
      logger.info('suggestion.admin_auto_publish_start', {
        suggestionId: insertResult.id,
        serviceScope,
        isLocal,
        trustedReason: trust.reason,
        submitterEmail,
        countyCount: selectedCounties.length,
      });

      const { data: suggestionRow, error: fetchError } = await admin
        .from('company_suggestions')
        .select('*')
        .eq('id', insertResult.id)
        .maybeSingle();

      if (fetchError || !suggestionRow) {
        logger.error('suggestion.admin_fetch_for_publish_failed', {
          submitTraceId,
          suggestionId: insertResult.id,
          fetchError: fetchError?.message,
        });

        if (isLocal) {
          const { publishLocalCompanyDirect } = await import(
            '@/lib/suggestions/publish-local-direct'
          );
          const direct = await publishLocalCompanyDirect({
            name: companyName,
            stateCode: parsed.data.stateCode,
            headquarters: resolvedContact.address || parsed.data.headquarters,
            phone: safePhone,
            email: safeEmail,
            website: safeWebsite,
            selectedCounties,
            details: parsed.data.details,
            googleData: enrichment.google as never,
            publicScrapeData: enrichment.publicScrape as never,
            suggestionId: insertResult.id,
          });
          if (direct.ok) {
            return {
              success: true,
              suggestionId: insertResult.id,
              profileSlug: direct.slug,
              pendingReview: false,
              adminPublished: true,
              publishedCounties: selectedCounties,
              message: `Local mover published to ${direct.countiesAssigned} count${direct.countiesAssigned === 1 ? 'y' : 'ies'}.`,
            };
          }
        }

        return {
          success: true,
          suggestionId: insertResult.id,
          profileSlug,
          pendingReview: true,
          adminPublished: false,
          publishedCounties: isLocal ? selectedCounties : undefined,
          message:
            'Saved. Immediate publish could not load the suggestion row — finish from /admin/suggestions if needed.',
        };
      }

      // Ensure scope/counties survive even if DB insert fell back without those columns.
      const rowForPublish = {
        ...suggestionRow,
        service_scope:
          (suggestionRow as { service_scope?: string | null }).service_scope ?? serviceScope,
        selected_counties:
          (suggestionRow as { selected_counties?: unknown }).selected_counties ??
          selectedCounties ??
          [],
        suggested_by_email:
          (suggestionRow as { suggested_by_email?: string }).suggested_by_email ||
          submitterEmail,
        name: (suggestionRow as { name?: string }).name || companyName,
        phone: (suggestionRow as { phone?: string | null }).phone || safePhone,
        headquarters:
          (suggestionRow as { headquarters?: string | null }).headquarters ||
          resolvedContact.address ||
          parsed.data.headquarters,
      };

      try {
        const approved = await approveAndPublishSuggestion(
          rowForPublish as typeof suggestionRow,
          trust.reason === 'admin_email' ? 'admin_email_direct' : 'admin_direct'
        );
        if (!approved.ok) {
          logAdminPublish({
            suggestionId: insertResult.id,
            slug: profileSlug,
            serviceScope,
            trustedReason: trust.reason,
            countyCount: selectedCounties.length,
            fillRate: fill.fillRate,
            ok: false,
            error: approved.error,
          });
          logger.error('suggestion.admin_publish_failed', {
            submitTraceId,
            suggestionId: insertResult.id,
            error: approved.error,
            isLocal,
          });

          // Local admin: direct company create + county assign fallback
          if (isLocal) {
            const { publishLocalCompanyDirect } = await import(
              '@/lib/suggestions/publish-local-direct'
            );
            const direct = await publishLocalCompanyDirect({
              name: companyName,
              stateCode: parsed.data.stateCode,
              headquarters: resolvedContact.address || parsed.data.headquarters,
              phone: safePhone,
              email: safeEmail,
              website: safeWebsite,
              selectedCounties,
              details: parsed.data.details,
              googleData: enrichment.google as never,
              publicScrapeData: enrichment.publicScrape as never,
              suggestionId: insertResult.id,
            });
            if (direct.ok) {
              logAdminPublish({
                suggestionId: insertResult.id,
                slug: direct.slug,
                serviceScope,
                trustedReason: trust.reason,
                countyCount: selectedCounties.length,
                fillRate: fill.fillRate,
                ok: true,
              });
              return {
                success: true,
                suggestionId: insertResult.id,
                profileSlug: direct.slug,
                pendingReview: false,
                adminPublished: true,
                publishedCounties: selectedCounties,
                message: `Local mover published to ${direct.countiesAssigned} count${direct.countiesAssigned === 1 ? 'y' : 'ies'} (recovered after publish error).`,
              };
            }
            logger.error('suggestion.admin_local_direct_after_publish_fail', {
              submitTraceId,
              publishError: approved.error,
              directError: direct.error,
              directStep: direct.step,
            });
          }

          return {
            success: true,
            suggestionId: insertResult.id,
            profileSlug,
            pendingReview: true,
            adminPublished: false,
            publishedCounties: isLocal ? selectedCounties : undefined,
            message: isLocal
              ? `Saved. Live county publish needs a quick fix (${approved.error}). The mover is in the admin queue with your selected counties.`
              : `Saved to the admin queue (${approved.error}). You can approve it from /admin/suggestions.`,
          };
        }

        logAdminPublish({
          suggestionId: insertResult.id,
          slug: approved.slug,
          serviceScope,
          trustedReason: trust.reason,
          countyCount: selectedCounties.length,
          fillRate: fill.fillRate,
          ok: true,
        });

        // Always live — never "pending review" for trusted admin email/session.
        return {
          success: true,
          suggestionId: insertResult.id,
          profileSlug: approved.slug,
          pendingReview: false,
          adminPublished: true,
          publishedCounties: isLocal ? selectedCounties : undefined,
          message: isLocal
            ? `Local mover published to ${selectedCounties.length} selected count${selectedCounties.length === 1 ? 'y' : 'ies'}.`
            : 'Company published to the interstate directory.',
        };
      } catch (publishErr) {
        const publishMessage =
          publishErr instanceof Error ? publishErr.message : String(publishErr);
        logAdminPublish({
          suggestionId: insertResult.id,
          slug: profileSlug,
          serviceScope,
          trustedReason: trust.reason,
          countyCount: selectedCounties.length,
          fillRate: fill.fillRate,
          ok: false,
          error: publishMessage,
        });
        logger.error('suggestion.admin_publish_threw', {
          submitTraceId,
          suggestionId: insertResult.id,
          message: publishMessage,
          stack: publishErr instanceof Error ? publishErr.stack : undefined,
        });

        if (isLocal) {
          const { publishLocalCompanyDirect } = await import(
            '@/lib/suggestions/publish-local-direct'
          );
          const direct = await publishLocalCompanyDirect({
            name: companyName,
            stateCode: parsed.data.stateCode,
            headquarters: resolvedContact.address || parsed.data.headquarters,
            phone: safePhone,
            email: safeEmail,
            website: safeWebsite,
            selectedCounties,
            details: parsed.data.details,
            googleData: enrichment.google as never,
            publicScrapeData: enrichment.publicScrape as never,
            suggestionId: insertResult.id,
          });
          if (direct.ok) {
            return {
              success: true,
              suggestionId: insertResult.id,
              profileSlug: direct.slug,
              pendingReview: false,
              adminPublished: true,
              publishedCounties: selectedCounties,
              message: `Local mover published to ${direct.countiesAssigned} count${direct.countiesAssigned === 1 ? 'y' : 'ies'}.`,
            };
          }
        }

        return {
          success: true,
          suggestionId: insertResult.id,
          profileSlug,
          pendingReview: true,
          adminPublished: false,
          publishedCounties: isLocal ? selectedCounties : undefined,
          message: isLocal
            ? `Saved with your county selections. Publish will complete from the admin queue (${publishMessage}).`
            : `Saved for review (${publishMessage}).`,
        };
      }
    }

    // Non-admin: pending moderation (rate limits already applied above).
    logOnboardingEvent('submitted_pending', {
      suggestionId: insertResult.id,
      serviceScope,
      fillRate: fill.fillRate,
      profileSlug,
    });
    return {
      success: true,
      suggestionId: insertResult.id,
      profileSlug,
      pendingReview: true,
    };
  } catch (err) {
    logger.error('suggestion.submit_exception', {
      submitTraceId,
      message: err instanceof Error ? err.message : 'unknown',
      stack: err instanceof Error ? err.stack : undefined,
    });
    return {
      success: false,
      error:
        'Something went wrong while saving your suggestion. Please wait a moment and try again.',
    };
  }
}