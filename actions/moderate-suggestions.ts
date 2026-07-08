'use server';

import { revalidatePath } from 'next/cache';
import { assertAdminSession } from '@/lib/admin/auth';
import {
  getOrphanedApprovedSuggestions,
  publishSuggestionToDirectory,
} from '@/lib/suggestions/repair-approved';
import type { OrphanedApprovedSuggestion } from '@/lib/suggestions/suggestion-shared';
import { getPendingSuggestions } from '@/lib/suggestions/queries';
import { getCompanyBySlugOrUsdotFromDb } from '@/lib/supabase/queries/companies';
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

export async function getOrphanedApprovedSuggestionQueue(): Promise<OrphanedApprovedSuggestion[]> {
  try {
    await assertAdminSession();
  } catch {
    return [];
  }
  return getOrphanedApprovedSuggestions();
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
    const approved = await publishSuggestionToDirectory(suggestion);
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
      hadGoogleOnSuggestion: Boolean(suggestion.google_data),
      hadPublicScrapeOnSuggestion: Boolean(suggestion.public_scrape_data),
      hadFmcsaOnSuggestion: Boolean(suggestion.fmcsa_raw || suggestion.fmcsa_preview),
      headquarters: suggestion.headquarters,
    });

    revalidatePath('/admin/suggestions', 'page');

    return { success: true, companySlug: approved.slug };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Approval failed';
    return { success: false, error: message };
  }
}

export async function repairOrphanedApprovedSuggestion(params: {
  suggestionId: string;
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
    .eq('status', 'approved')
    .maybeSingle();

  if (fetchError || !suggestion) {
    return { success: false, error: 'Approved suggestion not found' };
  }

  try {
    const published = await publishSuggestionToDirectory(suggestion);
    if (!published) {
      return { success: false, error: 'Failed to publish company profile' };
    }

    const readable = await getCompanyBySlugOrUsdotFromDb(published.slug);
    if (!readable) {
      return {
        success: false,
        error: `Published ${published.slug} but profile is still not readable`,
      };
    }

    logger.info('suggestion.repaired', {
      suggestionId: params.suggestionId,
      companyId: published.companyId,
      slug: published.slug,
    });

    revalidatePath('/admin/suggestions', 'page');
    return { success: true, companySlug: published.slug };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Repair failed';
    return { success: false, error: message };
  }
}