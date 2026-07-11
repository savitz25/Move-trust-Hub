import 'server-only';

import { createAdminClient } from '@/lib/lender/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/lender/supabase/config';
import { slugFromNmls } from '@/lib/lender/onboarding/schema';

export async function checkLenderOnboardingDuplicate(params: {
  nmlsId: string;
  legalName: string;
}): Promise<{ duplicate: boolean; reason?: string; existingSlug?: string }> {
  if (!isSupabaseAdminConfigured()) {
    return { duplicate: false };
  }

  const admin = createAdminClient();
  const nmls = params.nmlsId.replace(/\D/g, '');

  const { data: existingLender } = await admin
    .from('lenders')
    .select('slug, name')
    .eq('nmls_id', nmls)
    .maybeSingle();

  if (existingLender) {
    return {
      duplicate: true,
      reason: `${existingLender.name} is already listed in our directory.`,
      existingSlug: existingLender.slug,
    };
  }

  const { data: pending } = await admin
    .from('lender_onboarding_submissions')
    .select('id')
    .eq('nmls_id', nmls)
    .eq('status', 'pending')
    .maybeSingle();

  if (pending) {
    return {
      duplicate: true,
      reason: 'A submission for this NMLS ID is already pending review.',
    };
  }

  const predictedSlug = slugFromNmls(nmls, params.legalName);
  const { data: slugCollision } = await admin
    .from('lenders')
    .select('slug')
    .eq('slug', predictedSlug)
    .maybeSingle();

  if (slugCollision) {
    return {
      duplicate: true,
      reason: 'A similar lender profile already exists.',
      existingSlug: slugCollision.slug,
    };
  }

  return { duplicate: false };
}