'use server';

import { revalidatePath } from 'next/cache';
import { assertAdminSession } from '@/lib/admin/auth';
import { revalidatePublishedCompany } from '@/lib/directory/revalidate-company';
import { approveSuggestionToCompany } from '@/lib/suggestions/approve';
import { getPendingSuggestions } from '@/lib/suggestions/queries';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { logger } from '@/lib/logging/logger';

export type ModerateSuggestionResult = {
  success: boolean;
  error?: string;
  companySlug?: string;
};

export async function getSuggestionModerationQueue() {
  try {
    await assertAdminSession();
  } catch {
    return [];
  }
  return getPendingSuggestions();
}

export async function moderateSuggestion(params: {
  suggestionId: string;
  action: 'approve' | 'reject';
  note?: string;
}): Promise<ModerateSuggestionResult> {
  try {
    await assertAdminSession();
  } catch {
    return { success: false, error: 'Unauthorized' };
  }

  if (!isSupabaseAdminConfigured()) {
    return { success: false, error: 'Supabase admin not configured' };
  }

  const admin = createAdminClient();

  const { data: suggestion, error: fetchError } = await admin
    .from('company_suggestions')
    .select('*')
    .eq('id', params.suggestionId)
    .eq('status', 'pending')
    .maybeSingle();

  if (fetchError || !suggestion) {
    return { success: false, error: 'Suggestion not found or already moderated' };
  }

  if (params.action === 'reject') {
    const { error } = await admin
      .from('company_suggestions')
      .update({
        status: 'rejected',
        moderation_note: params.note?.trim() || null,
        moderated_at: new Date().toISOString(),
        moderated_by: 'admin',
      })
      .eq('id', params.suggestionId);

    if (error) {
      return { success: false, error: error.message };
    }

    logger.info('suggestion.rejected', { suggestionId: params.suggestionId });
    revalidatePath('/admin/suggestions');
    return { success: true };
  }

  try {
    const approved = await approveSuggestionToCompany(suggestion);
    if (!approved) {
      return { success: false, error: 'Failed to create company record' };
    }

    const { error: updateError } = await admin
      .from('company_suggestions')
      .update({
        status: 'approved',
        company_id: approved.companyId,
        moderation_note: params.note?.trim() || null,
        moderated_at: new Date().toISOString(),
        moderated_by: 'admin',
      })
      .eq('id', params.suggestionId);

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    logger.info('suggestion.approved', {
      suggestionId: params.suggestionId,
      companyId: approved.companyId,
      slug: approved.slug,
    });

    revalidatePublishedCompany(approved.slug);
    revalidatePath('/admin/suggestions', 'page');

    return { success: true, companySlug: approved.slug };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Approval failed';
    return { success: false, error: message };
  }
}