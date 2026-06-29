'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import {
  parseReviewCarrierQuery,
  reviewSubmissionSchema,
} from '@/lib/reviews/schema';
import {
  findMovingCompanyByCarrier,
  findOrCreateMovingCompany,
} from '@/lib/reviews/companies';
import { resolveCarrierPreview } from '@/lib/verify-dot/fmcsa';
import { getAllCompanies } from '@/lib/data-server';
import { checkReviewRateLimit } from '@/lib/reviews/rate-limit';
import { hashEmail } from '@/lib/reviews/hash';
import { uploadReviewPhotos } from '@/lib/reviews/photos';
import {
  getApprovedReviews,
  type PublicReview,
  type ReviewSort,
} from '@/lib/reviews/queries';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { logger } from '@/lib/logging/logger';
export type LookupCarrierPreview = {
  name: string;
  dotNumber: string | null;
  mcNumber: string | null;
  address: string | null;
  slug: string;
  inDatabase: boolean;
  avgRating: number;
  approvedReviewCount: number;
  legacyProfileSlug: string | null;
};

export type LookupCarrierResult = {
  success: boolean;
  error?: string;
  preview?: LookupCarrierPreview;
  displayNumber?: string;
};

export type SubmitReviewResult = {
  success: boolean;
  error?: string;
  reviewId?: string;
  companySlug?: string;
  pending?: boolean;
};

export type FetchReviewsResult = {
  reviews: PublicReview[];
  total: number;
};

function clientIpFromHeaders(headerStore: Headers): string | null {
  return (
    headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerStore.get('x-real-ip') ||
    null
  );
}

export async function lookupCarrierForReview(
  query: string
): Promise<LookupCarrierResult> {
  const parsed = parseReviewCarrierQuery(query);
  if (!parsed) {
    return {
      success: false,
      error: 'Enter a valid USDOT or MC number (3–8 digits).',
    };
  }

  if (!isSupabaseAdminConfigured()) {
    return {
      success: false,
      error: 'Review submissions are temporarily unavailable. Please try again later.',
    };
  }

  const existing = await findMovingCompanyByCarrier(parsed);
  if (existing) {
    return {
      success: true,
      displayNumber: parsed.display,
      preview: {
        name: existing.name,
        dotNumber: existing.dot_number,
        mcNumber: existing.mc_number,
        address: existing.address,
        slug: existing.slug,
        inDatabase: true,
        avgRating: Number(existing.avg_rating),
        approvedReviewCount: existing.approved_review_count,
        legacyProfileSlug: existing.legacy_company_id
          ? (
              await getAllCompanies()
            ).find((c) => c.id === existing.legacy_company_id)?.slug ?? null
          : null,
      },
    };
  }

  const legacy = (await getAllCompanies()).find((c) => {
    const norm = (v: string) => v.replace(/\D/g, '');
    return parsed.type === 'DOT'
      ? norm(c.usdotNumber || '') === parsed.value
      : norm(c.mcNumber || '') === parsed.value;
  });

  const { preview: fmcsaPreview } = await resolveCarrierPreview(parsed, null);
  const slug = `${parsed.type.toLowerCase()}-${parsed.value}`;

  return {
    success: true,
    displayNumber: parsed.display,
    preview: {
      name: legacy?.name || fmcsaPreview?.legalName || `${parsed.display} Carrier`,
      dotNumber: parsed.type === 'DOT' ? parsed.value : legacy?.usdotNumber?.replace(/\D/g, '') || null,
      mcNumber: parsed.type === 'MC' ? parsed.value : legacy?.mcNumber?.replace(/\D/g, '') || null,
      address: fmcsaPreview?.physicalAddress || legacy?.headquarters || null,
      slug,
      inDatabase: false,
      avgRating: 0,
      approvedReviewCount: 0,
      legacyProfileSlug: legacy?.slug ?? null,
    },
  };
}

export async function submitReview(raw: unknown): Promise<SubmitReviewResult> {
  const parsed = reviewSubmissionSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      Object.values(first).flat()[0] ?? 'Please check your review and try again.';
    return { success: false, error: msg };
  }

  if (parsed.data.website) {
    return { success: false, error: 'Submission rejected.' };
  }

  if (!isSupabaseAdminConfigured()) {
    return {
      success: false,
      error: 'Review submissions are temporarily unavailable.',
    };
  }

  const carrier = parseReviewCarrierQuery(parsed.data.carrierQuery);
  if (!carrier) {
    return { success: false, error: 'Invalid carrier number.' };
  }

  const company = await findOrCreateMovingCompany({
    parsed: carrier,
    nameOverride: parsed.data.companyName,
  });

  if (!company) {
    return { success: false, error: 'Could not register carrier for this review.' };
  }

  const headerStore = await headers();
  const userIp = clientIpFromHeaders(headerStore);

  const rateCheck = await checkReviewRateLimit({
    ip: userIp,
    email: parsed.data.reviewerEmail,
    companyId: company.id,
  });

  if (!rateCheck.allowed) {
    return { success: false, error: rateCheck.reason };
  }

  const admin = createAdminClient();
  const emailHash = hashEmail(parsed.data.reviewerEmail);

  const { data: inserted, error } = await admin
    .from('company_reviews')
    .insert({
      company_id: company.id,
      reviewer_name: parsed.data.reviewerName,
      reviewer_email: parsed.data.reviewerEmail,
      rating: parsed.data.rating,
      title: parsed.data.title || null,
      content: parsed.data.content,
      move_date: parsed.data.moveDate || null,
      source_page: parsed.data.sourcePage || '/review',
      submitter_ip: userIp,
      email_hash: emailHash,
      status: 'pending',
      photo_urls: [],
    })
    .select('id')
    .single();

  if (error || !inserted) {
    logger.error('review.submit_failed', { error: error?.message, companyId: company.id });
    return { success: false, error: 'Failed to save your review. Please try again.' };
  }

  logger.info('review.submitted', {
    reviewId: inserted.id,
    companyId: company.id,
    rating: parsed.data.rating,
  });

  revalidatePath(`/company/${company.slug}`);
  revalidatePath('/review');

  return {
    success: true,
    reviewId: inserted.id,
    companySlug: company.slug,
    pending: true,
  };
}

export async function submitReviewWithPhotos(
  formData: FormData
): Promise<SubmitReviewResult> {
  const payload = {
    carrierQuery: formData.get('carrierQuery'),
    companyName: formData.get('companyName') || undefined,
    reviewerName: formData.get('reviewerName'),
    reviewerEmail: formData.get('reviewerEmail'),
    rating: formData.get('rating'),
    title: formData.get('title') || undefined,
    content: formData.get('content'),
    moveDate: formData.get('moveDate') || undefined,
    sourcePage: formData.get('sourcePage') || '/review',
    website: formData.get('website') || undefined,
  };

  const result = await submitReview(payload);
  if (!result.success || !result.reviewId) return result;

  const files = formData
    .getAll('photos')
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (files.length === 0) return result;

  const photoUrls = await uploadReviewPhotos(files, result.reviewId);
  if (photoUrls.length === 0) return result;

  const admin = createAdminClient();
  await admin
    .from('company_reviews')
    .update({ photo_urls: photoUrls })
    .eq('id', result.reviewId);

  return result;
}

export async function fetchCompanyReviews(params: {
  companyId: string;
  page?: number;
  pageSize?: number;
  sort?: ReviewSort;
}): Promise<FetchReviewsResult> {
  return getApprovedReviews(params.companyId, {
    page: params.page,
    pageSize: params.pageSize,
    sort: params.sort,
  });
}