'use server';

import { headers } from 'next/headers';
import { searchCarriersByNameState } from '@/actions/verify-dot';
import { suggestCompanySchema } from '@/lib/suggestions/schema';
import { checkSuggestionDuplicate } from '@/lib/suggestions/duplicates';
import { getAdminSubmitterDefaults } from '@/lib/admin/submitter-defaults';
import { approveAndPublishSuggestion } from '@/lib/suggestions/auto-approve';
import { checkSuggestionRateLimit } from '@/lib/suggestions/rate-limit';
import { isTrustedCompanySubmitter } from '@/lib/suggestions/trusted-submitter';
import { isAdminSession } from '@/lib/admin/auth';
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
}): Promise<ScrapeWebsiteCoverageResult> {
  try {
    const coverage = await scrapeWebsiteCoverage(input);
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
    const enrichment = await enrichCompanySources({
      legalName: name,
      state,
      headquarters: `${name}, ${state}`,
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
  try {
    const parsed = suggestCompanySchema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const msg =
        Object.values(first).flat()[0] ?? 'Please check your suggestion and try again.';
      return { success: false, error: msg };
    }

    if (parsed.data.website) {
      return { success: false, error: 'Submission rejected.' };
    }

    if (!isSupabaseAdminConfigured()) {
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
    const trustedSubmitter = await isTrustedCompanySubmitter();

    const rateCheck = await checkSuggestionRateLimit({
      ip: userIp,
      email: parsed.data.suggestedByEmail,
      bypass: trustedSubmitter,
    });

    if (!rateCheck.allowed) {
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
    });

    if (duplicateCheck.duplicate) {
      return {
        success: false,
        error: duplicateCheck.reason,
        existingProfileSlug: duplicateCheck.existingSlug,
      };
    }

    const admin = createAdminClient();
    const emailHash = hashEmail(parsed.data.suggestedByEmail);
    const ipHash = userIp ? hashIp(userIp) : null;

    const row = buildCompanySuggestionInsertRow({
      parsed: {
        ...parsed.data,
        // Coerced scope when NOT AUTHORIZED forced local after interstate submit.
        serviceScope,
        phone: resolvedContact.phone ?? parsed.data.phone,
        contactEmail: resolvedContact.email ?? parsed.data.contactEmail,
        websiteUrl: resolvedContact.website ?? parsed.data.websiteUrl,
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
      resolvedPhone: resolvedContact.phone,
      resolvedContactEmail: resolvedContact.email,
    });

    const insertResult = await insertCompanySuggestion(admin, row);

    if (!insertResult.ok) {
      return { success: false, error: insertResult.error };
    }

    logger.info('suggestion.submitted', {
      suggestionId: insertResult.id,
      usdot: fmcsa?.usdot,
      serviceScope,
      hasFmcsa: Boolean(fmcsa),
      hasGoogle: Boolean(enrichment.google?.status === 'ok'),
      hasPublicScrape: Boolean(enrichment.publicScrape),
      enrichmentStored: insertResult.enrichmentStored,
      trustedDot: true,
      trustedSubmitter,
      coverageStatus: coverage.status,
      coverageNationalOnly: coverage.isNationalOnly,
      coverageSummary: coverage.summary,
      hasPhone: Boolean(resolvedContact.phone),
      hasEmail: Boolean(resolvedContact.email),
      hasWebsite: Boolean(resolvedContact.website),
      phoneSource: resolvedContact.sources.phone,
      emailSource: resolvedContact.sources.email,
    });

    const profileSlug = predictCompanyProfileSlug({
      name: companyName,
      // Local / forced-intrastate profiles are name-based (not main interstate DOT slug).
      usdot: isLocal
        ? null
        : fmcsa?.usdot ?? (carrierParsed?.type === 'DOT' ? carrierParsed.value : null),
    });

    if (trustedSubmitter) {
      const { data: suggestionRow, error: fetchError } = await admin
        .from('company_suggestions')
        .select('*')
        .eq('id', insertResult.id)
        .maybeSingle();

      if (fetchError || !suggestionRow) {
        return {
          success: false,
          error: 'Suggestion saved but could not be loaded for publishing. Check /admin/suggestions.',
        };
      }

      const approved = await approveAndPublishSuggestion(suggestionRow, 'admin_direct');
      if (!approved.ok) {
        return {
          success: false,
          error: approved.error,
          suggestionId: insertResult.id,
          profileSlug,
          pendingReview: true,
        };
      }

      return {
        success: true,
        suggestionId: insertResult.id,
        profileSlug: approved.slug,
        pendingReview: false,
      };
    }

    return {
      success: true,
      suggestionId: insertResult.id,
      profileSlug,
      pendingReview: true,
    };
  } catch (err) {
    logger.error('suggestion.submit_exception', {
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