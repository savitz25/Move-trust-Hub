import 'server-only';

import { revalidatePath } from 'next/cache';
import { publishSuggestionToDirectory } from '@/lib/suggestions/repair-approved';
import type { CompanySuggestionRow } from '@/lib/suggestions/approve';
import { createAdminClient } from '@/lib/supabase/admin';
import { logger } from '@/lib/logging/logger';
import type { Database } from '@/types/supabase';

type SuggestionUpdate = Database['public']['Tables']['company_suggestions']['Update'];

export type AutoApproveResult =
  | { ok: true; companyId: string; slug: string }
  | { ok: false; error: string };

/** Publish a pending suggestion immediately (admin / trusted submitter flow). */
export async function approveAndPublishSuggestion(
  suggestion: CompanySuggestionRow & { id: string },
  moderatedBy = 'trusted_submitter'
): Promise<AutoApproveResult> {
  const admin = createAdminClient();

  const published = await publishSuggestionToDirectory(suggestion);
  if (!published) {
    return { ok: false, error: 'Failed to create company record' };
  }

  const moderationUpdate: SuggestionUpdate = {
    status: 'approved',
    company_id: published.companyId,
    moderated_at: new Date().toISOString(),
    moderated_by: moderatedBy,
  };
  const { error: updateError } = await admin
    .from('company_suggestions')
    .update(moderationUpdate)
    .eq('id', suggestion.id);

  if (updateError) {
    return { ok: false, error: updateError.message };
  }

  logger.info('suggestion.auto_approved', {
    suggestionId: suggestion.id,
    companyId: published.companyId,
    slug: published.slug,
    moderatedBy,
  });

  revalidatePath('/admin/suggestions', 'page');
  revalidatePath('/companies', 'page');
  revalidatePath('/companies', 'layout');
  revalidatePath(`/companies/${published.slug}`, 'page');

  return { ok: true, companyId: published.companyId, slug: published.slug };
}