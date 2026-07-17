'use server';

import { revalidatePath } from 'next/cache';
import { requireVerifiedOwner, getOwnerByCompanySlug } from '@/lib/portal/ownership';
import {
  getMovingCompanyIdForDirectoryCompany,
  saveOwnerResponse,
  submitReviewDispute,
  resolveDispute,
} from '@/lib/portal/reviews';
import { syncCompanyReputation } from '@/lib/portal/reputation-sync';
import { updateServiceArea } from '@/lib/portal/service-area';
import { getAuthenticatedUser } from '@/lib/save-my-move/auth';
import { assertAdminSession } from '@/lib/admin/auth';
import { getCompanyBySlugAsync } from '@/lib/data-server';
import type { DisputeCategoryId } from '@/lib/portal/messaging';
import type { ServiceAreaInput } from '@/lib/portal/types';

export async function postOwnerResponseAction(params: {
  companySlug: string;
  reviewId: string;
  response: string;
}) {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false as const, error: 'Sign in required' };

  const owner = await getOwnerByCompanySlug(user.id, params.companySlug);
  if (!owner) return { success: false as const, error: 'Not a verified owner of this company' };

  const company = await getCompanyBySlugAsync(params.companySlug);
  if (!company) return { success: false as const, error: 'Company not found' };

  const movingId = await getMovingCompanyIdForDirectoryCompany({
    companyId: company.id,
    usdotNumber: company.usdotNumber,
    mcNumber: company.mcNumber,
  });
  if (!movingId) {
    return {
      success: false as const,
      error: 'No community reviews linked to this listing yet.',
    };
  }

  await requireVerifiedOwner(company.id);
  const result = await saveOwnerResponse({
    reviewId: params.reviewId,
    movingCompanyId: movingId,
    userId: user.id,
    response: params.response,
  });

  if (result.success) {
    revalidatePath(`/portal/reviews`);
    revalidatePath(`/companies/${params.companySlug}`);
    revalidatePath(`/company/${params.companySlug}`);
  }
  return result;
}

export async function disputeReviewAction(params: {
  companySlug: string;
  reviewId: string;
  category: DisputeCategoryId;
  reason: string;
}) {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false as const, error: 'Sign in required' };

  const owner = await getOwnerByCompanySlug(user.id, params.companySlug);
  if (!owner) return { success: false as const, error: 'Not a verified owner of this company' };

  const company = await getCompanyBySlugAsync(params.companySlug);
  if (!company) return { success: false as const, error: 'Company not found' };

  const movingId = await getMovingCompanyIdForDirectoryCompany({
    companyId: company.id,
    usdotNumber: company.usdotNumber,
    mcNumber: company.mcNumber,
  });
  if (!movingId) {
    return { success: false as const, error: 'No community reviews linked to this listing yet.' };
  }

  const result = await submitReviewDispute({
    reviewId: params.reviewId,
    movingCompanyId: movingId,
    userId: user.id,
    category: params.category,
    reason: params.reason,
  });

  if (result.success) {
    revalidatePath('/portal/reviews');
    revalidatePath('/admin/portal-disputes');
    revalidatePath(`/companies/${params.companySlug}`);
  }
  return result;
}

export async function syncReputationAction(companySlug: string) {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false as const, error: 'Sign in required' };

  const owner = await getOwnerByCompanySlug(user.id, companySlug);
  if (!owner) return { success: false as const, error: 'Not a verified owner of this company' };

  const result = await syncCompanyReputation({
    companyId: owner.company_id,
    companySlug: owner.company_slug,
  });

  if (result.success) {
    revalidatePath('/portal');
    revalidatePath(`/companies/${companySlug}`);
  }
  return result;
}

export async function updateServiceAreaAction(
  companySlug: string,
  input: ServiceAreaInput
) {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false as const, error: 'Sign in required' };

  const owner = await getOwnerByCompanySlug(user.id, companySlug);
  if (!owner) return { success: false as const, error: 'Not a verified owner of this company' };

  const result = await updateServiceArea({
    companyId: owner.company_id,
    companySlug: owner.company_slug,
    userId: user.id,
    input,
  });

  if (result.success) {
    revalidatePath('/portal/service-area');
    revalidatePath('/portal');
    revalidatePath(`/companies/${companySlug}`);
  }
  return result;
}

export async function resolveDisputeAction(params: {
  reviewId: string;
  resolution: 'resolved_upheld' | 'resolved_rejected';
  note?: string;
  removeReview?: boolean;
}) {
  try {
    await assertAdminSession();
  } catch {
    return { success: false as const, error: 'Unauthorized' };
  }

  const result = await resolveDispute(params);
  if (result.success) {
    revalidatePath('/admin/portal-disputes');
    revalidatePath('/admin/reviews');
  }
  return result;
}
