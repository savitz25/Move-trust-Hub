'use server';

import { revalidatePath } from 'next/cache';
import { assertAdminSession } from '@/lib/admin/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import {
  getPendingReviewsForModeration,
  searchAdminReviews,
  type AdminReviewFilters,
  type AdminReviewRow,
} from '@/lib/reviews/queries';
import { revalidatePathsForMovingCompany } from '@/lib/reviews/revalidate-paths';
import { sendReviewApprovalEmail } from '@/lib/reviews/send-approval-email';
import { logger } from '@/lib/logging/logger';

export type ModerateReviewResult = {
  success: boolean;
  error?: string;
  /** Present after approve — whether the confirmation email was sent */
  approvalEmailSent?: boolean;
};

export async function getModerationQueue() {
  try {
    await assertAdminSession();
  } catch {
    return [];
  }
  return getPendingReviewsForModeration();
}

export async function searchReviewsForAdmin(
  filters: AdminReviewFilters
): Promise<{ reviews: AdminReviewRow[]; total: number; error?: string }> {
  try {
    await assertAdminSession();
  } catch {
    return {
      reviews: [],
      total: 0,
      error: 'Unauthorized — sign in at /admin/login to load the moderation queue.',
    };
  }
  return searchAdminReviews(filters);
}

export async function moderateReview(params: {
  reviewId: string;
  action: 'approve' | 'reject';
  note?: string;
}): Promise<ModerateReviewResult> {
  try {
    await assertAdminSession();
  } catch {
    return { success: false, error: 'Unauthorized' };
  }

  if (!isSupabaseAdminConfigured()) {
    return { success: false, error: 'Supabase admin not configured' };
  }

  const status = params.action === 'approve' ? 'approved' : 'rejected';
  const admin = createAdminClient();

  // Load current row so we only email on transition → approved
  const { data: existing, error: loadError } = await admin
    .from('company_reviews')
    .select(
      'id, company_id, status, reviewer_name, reviewer_email, rating, title, content'
    )
    .eq('id', params.reviewId)
    .maybeSingle();

  if (loadError || !existing) {
    return { success: false, error: loadError?.message ?? 'Review not found' };
  }

  const previousStatus = existing.status;

  const { data: review, error } = await admin
    .from('company_reviews')
    .update({
      status,
      moderation_note: params.note?.trim() || null,
      moderated_at: new Date().toISOString(),
      moderated_by: 'admin',
      verification_tier: status === 'approved' ? 'verified_mth' : 'email_pending',
    })
    .eq('id', params.reviewId)
    .select('company_id')
    .single();

  if (error || !review) {
    return { success: false, error: error?.message ?? 'Update failed' };
  }

  logger.info('review.moderated', {
    reviewId: params.reviewId,
    status,
    previousStatus,
    companyId: review.company_id,
  });

  // Correctly purge /company/{movingSlug} AND /companies/{directorySlug}
  await revalidatePathsForMovingCompany(review.company_id);
  revalidatePath('/admin/reviews');

  let approvalEmailSent = false;
  if (params.action === 'approve') {
    const emailResult = await sendReviewApprovalEmail({
      reviewId: params.reviewId,
      companyId: review.company_id,
      reviewerEmail: existing.reviewer_email,
      reviewerName: existing.reviewer_name,
      rating: existing.rating,
      title: existing.title,
      content: existing.content,
      previousStatus,
    });
    approvalEmailSent = emailResult.sent === true;
  }

  return { success: true, approvalEmailSent };
}
