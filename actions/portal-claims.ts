'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import {
  approveClaim,
  rejectClaim,
  submitCompanyClaim,
  linkClaimToUser,
} from '@/lib/portal/claims';
import { getAuthenticatedUser } from '@/lib/save-my-move/auth';
import { assertAdminSession } from '@/lib/admin/auth';
import type { SubmitClaimInput } from '@/lib/portal/types';

function clientIp(h: Headers): string | null {
  return h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || null;
}

export async function submitClaimAction(input: SubmitClaimInput) {
  const user = await getAuthenticatedUser();
  const h = await headers();
  const ip = clientIp(h);

  console.info('[portal.claim] action_start', {
    slug: input.companySlug,
    email: input.claimantEmail?.trim().toLowerCase() || null,
    hasUser: Boolean(user?.id),
    ip: ip ? 'set' : null,
  });

  try {
    const result = await submitCompanyClaim(input, {
      userId: user?.id ?? null,
      ip,
    });

    if (result.success) {
      console.info('[portal.claim] action_ok', {
        claimId: result.claimId,
        slug: input.companySlug,
      });
      revalidatePath('/portal');
      revalidatePath(`/portal/claim/${input.companySlug}`);
      revalidatePath('/admin/portal-claims');
    } else {
      console.warn('[portal.claim] action_rejected', {
        slug: input.companySlug,
        error: result.error,
      });
    }

    return result;
  } catch (err) {
    console.error('[portal.claim] action_exception', {
      slug: input.companySlug,
      message: err instanceof Error ? err.message : String(err),
    });
    return {
      success: false as const,
      error:
        'Unexpected error submitting claim. Please try again or email info@movetrusthub.com with your USDOT.',
    };
  }
}

export async function linkMyPendingClaimsAction() {
  const user = await getAuthenticatedUser();
  if (!user?.email) return { success: false as const, error: 'Sign in required' };

  // Claims matching this email get linked so admin can approve
  const { getClaimsForUser } = await import('@/lib/portal/claims');
  const claims = await getClaimsForUser(user.id, user.email);
  for (const claim of claims) {
    if (claim.status === 'pending' && !claim.claimant_user_id) {
      await linkClaimToUser(claim.id, user.id, user.email);
    }
  }
  revalidatePath('/portal');
  return { success: true as const };
}

export async function approveClaimAction(claimId: string, note?: string) {
  try {
    await assertAdminSession();
  } catch {
    return { success: false as const, error: 'Unauthorized' };
  }

  const result = await approveClaim({
    claimId,
    moderatedBy: 'admin',
    note,
  });

  if (result.success) {
    revalidatePath('/admin/portal-claims');
    revalidatePath('/portal');
  }
  return result;
}

export async function rejectClaimAction(claimId: string, note?: string) {
  try {
    await assertAdminSession();
  } catch {
    return { success: false as const, error: 'Unauthorized' };
  }

  const result = await rejectClaim({
    claimId,
    moderatedBy: 'admin',
    note,
  });

  if (result.success) {
    revalidatePath('/admin/portal-claims');
  }
  return result;
}
