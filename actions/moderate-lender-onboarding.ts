'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '@/lib/lender/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/lender/supabase/config';
import { getPendingLenderOnboardingSubmissions } from '@/lib/lender/onboarding/queries';
import { publishLenderOnboardingSubmission } from '@/lib/lender/onboarding/publish';
import { sendLenderOnboardingConfirmation } from '@/lib/lender/email/onboarding-confirmation';
import { assertAdminSession } from '@/lib/admin/auth';
import { logger } from '@/lib/logging/logger';

export async function listPendingLenderOnboarding() {
  try {
    await assertAdminSession();
  } catch {
    return [];
  }
  if (!isSupabaseAdminConfigured()) return [];
  return getPendingLenderOnboardingSubmissions();
}

export async function moderateLenderOnboarding(input: {
  submissionId: string;
  action: 'approve' | 'reject';
  moderationNote?: string;
}): Promise<{ success: boolean; error?: string; slug?: string }> {
  await assertAdminSession();

  if (!isSupabaseAdminConfigured()) {
    return { success: false, error: 'Supabase admin not configured.' };
  }

  const admin = createAdminClient();
  const { data: submission, error } = await admin
    .from('lender_onboarding_submissions')
    .select('*')
    .eq('id', input.submissionId)
    .eq('status', 'pending')
    .maybeSingle();

  if (error || !submission) {
    return { success: false, error: 'Submission not found or already moderated.' };
  }

  if (input.action === 'reject') {
    await admin
      .from('lender_onboarding_submissions')
      .update({
        status: 'rejected',
        moderation_note: input.moderationNote ?? null,
        moderated_at: new Date().toISOString(),
        moderated_by: 'admin',
      })
      .eq('id', input.submissionId);

    revalidatePath('/lender/admin/onboarding');
    return { success: true };
  }

  const publishResult = await publishLenderOnboardingSubmission(submission);
  if (!publishResult.success) {
    return { success: false, error: publishResult.error };
  }

  if (submission.submitted_by_email && publishResult.slug) {
    const emailResult = await sendLenderOnboardingConfirmation({
      to: submission.submitted_by_email,
      submitterName: submission.submitted_by_name ?? 'there',
      lenderName: submission.name,
      nmlsId: submission.nmls_id,
      profileSlug: publishResult.slug,
    });
    if (!emailResult.sent) {
      logger.warn('lender.onboarding.confirmation_email_failed', {
        submissionId: input.submissionId,
        error: emailResult.error,
      });
    }
  }

  revalidatePath('/lender/admin/onboarding');
  return { success: true, slug: publishResult.slug };
}