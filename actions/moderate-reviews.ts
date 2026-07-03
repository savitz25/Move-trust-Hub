'use server';

import { revalidatePath } from 'next/cache';
import { assertAdminSession } from '@/lib/admin/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { getPendingReviewsForModeration } from '@/lib/reviews/queries';
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

  const { data: companyRow } = await admin
    .from('moving_companies')
    .select('slug')
    .eq('id', review.company_id)
    .maybeSingle();

  const slug = companyRow?.slug;

  logger.info('review.moderated', {
    reviewId: params.reviewId,
    status,
    companySlug: slug,
  });

  if (slug) {
    revalidatePath(`/company/${slug}`);
    revalidatePath(`/companies/${slug}`);
  }
  revalidatePath('/admin/reviews');

  return { success: true };
}