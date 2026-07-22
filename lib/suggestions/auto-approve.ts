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

  // Force local flags onto the suggestion object before publish.
  const isLocal =
    (suggestion as { service_scope?: string | null }).service_scope === 'intrastate';
  if (isLocal) {
    (suggestion as { service_scope?: string }).service_scope = 'intrastate';
  }

  let published: { companyId: string; slug: string };
  try {
    const result = await publishSuggestionToDirectory(suggestion);
    if (!result) {
      logger.error('suggestion.auto_approve_publish_null', {
        suggestionId: suggestion.id,
        name: suggestion.name,
        serviceScope: (suggestion as { service_scope?: string }).service_scope,
        countyCount: Array.isArray(
          (suggestion as { selected_counties?: unknown }).selected_counties
        )
          ? ((suggestion as { selected_counties: unknown[] }).selected_counties).length
          : 0,
      });
      return { ok: false, error: 'Failed to create company record' };
    }
    published = result;

    // Hard-guarantee local company shape after publish.
    if (isLocal) {
      const counties =
        (suggestion as { selected_counties?: unknown }).selected_counties ?? [];
      const { error: flagErr } = await admin
        .from('companies')
        .update({
          is_verified: true,
          service_scope: 'intrastate',
          coverage_counties: counties as never,
        } as never)
        .eq('id', published.companyId);
      if (flagErr) {
        logger.warn('suggestion.auto_approve_local_flags_failed', {
          companyId: published.companyId,
          message: flagErr.message,
        });
      }
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error('suggestion.auto_approve_publish_threw', {
      suggestionId: suggestion.id,
      name: suggestion.name,
      message,
      stack: err instanceof Error ? err.stack : undefined,
    });
    return { ok: false, error: message };
  }

  // Mark approved — best-effort. Company already exists; never fail the user on status update alone.
  const moderationUpdate: SuggestionUpdate = {
    status: 'approved',
    company_id: published.companyId,
    moderated_at: new Date().toISOString(),
    moderated_by: moderatedBy,
  };
  const { error: updateError } = await admin
    .from('company_suggestions')
    .update(moderationUpdate as never)
    .eq('id', suggestion.id);

  if (updateError) {
    logger.warn('suggestion.auto_approve_status_update_failed', {
      suggestionId: suggestion.id,
      companyId: published.companyId,
      slug: published.slug,
      message: updateError.message,
      hint: 'Company is live; suggestion status may still show pending in admin.',
    });
  }

  logger.info('suggestion.auto_approved', {
    suggestionId: suggestion.id,
    companyId: published.companyId,
    slug: published.slug,
    moderatedBy,
    statusUpdated: !updateError,
  });

  // Cache revalidation must never turn a successful publish into a client-facing error.
  try {
    revalidatePath('/admin/suggestions', 'page');
    revalidatePath('/companies', 'page');
    revalidatePath('/companies', 'layout');
    revalidatePath(`/companies/${published.slug}`, 'page');

    // Local / intrastate: bust approved-mover tag + every selected county page.
    const scope =
      (suggestion as { service_scope?: string | null }).service_scope === 'intrastate'
        ? 'intrastate'
        : 'interstate';
    if (scope === 'intrastate') {
      const { normalizeSelectedCounties } = await import('@/lib/suggestions/service-scope');
      const { revalidateLocalMoverCountyPages } = await import(
        '@/lib/local-movers/revalidate-county-pages'
      );
      const counties = normalizeSelectedCounties(
        (suggestion as { selected_counties?: unknown }).selected_counties
      );
      revalidateLocalMoverCountyPages(counties, {
        companySlug: published.slug,
        reason: 'admin_auto_approve',
      });
    }
  } catch (revalErr) {
    logger.warn('suggestion.auto_approve_revalidate_failed', {
      suggestionId: suggestion.id,
      slug: published.slug,
      message: revalErr instanceof Error ? revalErr.message : String(revalErr),
    });
  }

  return { ok: true, companyId: published.companyId, slug: published.slug };
}