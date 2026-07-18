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
import { logger } from '@/lib/logging/logger';

export type ModerateReviewResult = {
  success: boolean;
  error?: string;
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
): Promise<{ reviews: AdminReviewRow[]; total: number }> {
  try {
    await assertAdminSession();
  } catch {
    return { reviews: [], total: 0 };
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
    companyId: review.company_id,
  });

  // Correctly purge /company/{movingSlug} AND /companies/{directorySlug}
  await revalidatePathsForMovingCompany(review.company_id);
  revalidatePath('/admin/reviews');

  return { success: true };
}
