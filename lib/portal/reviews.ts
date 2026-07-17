import 'server-only';

import { isPortalDbReady, portalAdmin } from '@/lib/portal/db';
import type { DisputeCategoryId } from '@/lib/portal/messaging';
import type { OwnerReview } from '@/lib/portal/types';
import { findMovingCompanyForLegacy } from '@/lib/reviews/bridge';

export async function getMovingCompanyIdForDirectoryCompany(params: {
  companyId: string;
  usdotNumber?: string;
  mcNumber?: string;
}): Promise<string | null> {
  const moving = await findMovingCompanyForLegacy({
    legacyId: params.companyId,
    usdotNumber: params.usdotNumber,
    mcNumber: params.mcNumber,
  });
  return moving?.id ?? null;
}

export async function getOwnerReviewsForMovingCompany(
  movingCompanyId: string
): Promise<OwnerReview[]> {
  if (!isPortalDbReady()) return [];
  const admin = portalAdmin();
  const { data, error } = await admin
    .from('company_reviews')
    .select(
      'id, company_id, reviewer_name, rating, title, content, created_at, owner_response, owner_response_at, dispute_status, dispute_category, dispute_reason, disputed_at'
    )
    .eq('company_id', movingCompanyId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error || !data) return [];
  return data as OwnerReview[];
}

export async function saveOwnerResponse(params: {
  reviewId: string;
  movingCompanyId: string;
  userId: string;
  response: string;
}): Promise<{ success: boolean; error?: string }> {
  const text = params.response.trim();
  if (text.length < 20) {
    return { success: false, error: 'Response must be at least 20 characters.' };
  }
  if (text.length > 2000) {
    return { success: false, error: 'Response must be under 2,000 characters.' };
  }

  const admin = portalAdmin();
  const { data: review } = await admin
    .from('company_reviews')
    .select('id, company_id, status')
    .eq('id', params.reviewId)
    .maybeSingle();

  if (!review || review.company_id !== params.movingCompanyId || review.status !== 'approved') {
    return { success: false, error: 'Review not found.' };
  }

  const { error } = await admin
    .from('company_reviews')
    .update({
      owner_response: text,
      owner_response_at: new Date().toISOString(),
      owner_response_by: params.userId,
    })
    .eq('id', params.reviewId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function submitReviewDispute(params: {
  reviewId: string;
  movingCompanyId: string;
  userId: string;
  category: DisputeCategoryId;
  reason: string;
}): Promise<{ success: boolean; error?: string }> {
  const reason = params.reason.trim();
  if (reason.length < 40) {
    return {
      success: false,
      error: 'Explain the policy violation in at least 40 characters so moderators can review.',
    };
  }

  const admin = portalAdmin();
  const { data: review } = await admin
    .from('company_reviews')
    .select('id, company_id, status, dispute_status')
    .eq('id', params.reviewId)
    .maybeSingle();

  if (!review || review.company_id !== params.movingCompanyId || review.status !== 'approved') {
    return { success: false, error: 'Review not found.' };
  }
  if (review.dispute_status === 'under_review') {
    return { success: false, error: 'This review is already under dispute review.' };
  }

  const { error } = await admin
    .from('company_reviews')
    .update({
      dispute_status: 'under_review',
      dispute_category: params.category,
      dispute_reason: reason,
      disputed_at: new Date().toISOString(),
      disputed_by: params.userId,
    })
    .eq('id', params.reviewId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function getDisputesUnderReview(): Promise<
  Array<
    OwnerReview & {
      dispute_reason: string | null;
      company_name?: string;
      reviewer_email?: string;
    }
  >
> {
  if (!isPortalDbReady()) return [];
  const admin = portalAdmin();
  const { data } = await admin
    .from('company_reviews')
    .select(
      'id, company_id, reviewer_name, reviewer_email, rating, title, content, created_at, owner_response, owner_response_at, dispute_status, dispute_category, dispute_reason, disputed_at, moving_companies(name)'
    )
    .eq('dispute_status', 'under_review')
    .order('disputed_at', { ascending: true })
    .limit(100);

  return (
    data?.map(
      (row: {
        id: string;
        company_id: string;
        reviewer_name: string;
        reviewer_email?: string;
        rating: number;
        title: string | null;
        content: string;
        created_at: string;
        owner_response: string | null;
        owner_response_at: string | null;
        dispute_status: OwnerReview['dispute_status'];
        dispute_category: OwnerReview['dispute_category'];
        dispute_reason: string | null;
        disputed_at: string | null;
        moving_companies?: { name?: string } | null;
      }) => ({
        id: row.id,
        company_id: row.company_id,
        reviewer_name: row.reviewer_name,
        reviewer_email: row.reviewer_email,
        rating: row.rating,
        title: row.title,
        content: row.content,
        created_at: row.created_at,
        owner_response: row.owner_response,
        owner_response_at: row.owner_response_at,
        dispute_status: row.dispute_status,
        dispute_category: row.dispute_category,
        dispute_reason: row.dispute_reason,
        disputed_at: row.disputed_at,
        company_name: row.moving_companies?.name,
      })
    ) ?? []
  );
}

export async function resolveDispute(params: {
  reviewId: string;
  resolution: 'resolved_upheld' | 'resolved_rejected';
  note?: string;
  /** If upheld (owner correct), reject the review from public view. */
  removeReview?: boolean;
}): Promise<{ success: boolean; error?: string }> {
  const admin = portalAdmin();
  const updates: Record<string, unknown> = {
    dispute_status: params.resolution,
    dispute_moderation_note: params.note ?? null,
    dispute_resolved_at: new Date().toISOString(),
  };

  if (params.resolution === 'resolved_upheld' && params.removeReview) {
    updates.status = 'rejected';
    updates.moderation_note = params.note
      ? `Dispute upheld: ${params.note}`
      : 'Dispute upheld — removed from public view';
    updates.moderated_at = new Date().toISOString();
    updates.moderated_by = 'portal-dispute';
  }

  const { error } = await admin
    .from('company_reviews')
    .update(updates)
    .eq('id', params.reviewId)
    .eq('dispute_status', 'under_review');

  if (error) return { success: false, error: error.message };
  return { success: true };
}
