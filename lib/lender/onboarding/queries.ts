import 'server-only';

import { createAdminClient } from '@/lib/lender/supabase/admin';
import type { LenderOnboardingSubmissionRow } from '@/lib/lender/onboarding/types';

export async function getPendingLenderOnboardingSubmissions(): Promise<
  LenderOnboardingSubmissionRow[]
> {
  const admin = createAdminClient();
  const { data } = await admin
    .from('lender_onboarding_submissions')
    .select(
      'id, name, nmls_id, status, submitted_by_name, submitted_by_email, nmls_preview, google_data, public_scrape_data, cfpb_data, needs_manual_review, created_at, lender_id, moderation_note'
    )
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  return (data as LenderOnboardingSubmissionRow[]) ?? [];
}