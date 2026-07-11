import 'server-only';

import { revalidatePublishedCompany } from '@/lib/directory/revalidate-company';
import { assignApprovedCompanyToDestinations } from '@/lib/suggestions/assign-company-destination';
import { coverageFromSuggestionRow } from '@/lib/suggestions/resolve-suggestion-coverage';
import { revalidateDestinationPaths } from '@/lib/suggestions/revalidate-destination';
import { getCompanyBySlugOrUsdotFromDb } from '@/lib/supabase/queries/companies';
import { getDirectoryCompanyViaRpc } from '@/lib/suggestions/publish-company-rpc';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { approveSuggestionToCompany, type CompanySuggestionRow } from '@/lib/suggestions/approve';
import type { OrphanedApprovedSuggestion } from '@/lib/suggestions/suggestion-shared';
import { logger } from '@/lib/logging/logger';

export type { OrphanedApprovedSuggestion } from '@/lib/suggestions/suggestion-shared';

export async function getOrphanedApprovedSuggestions(): Promise<OrphanedApprovedSuggestion[]> {
  if (!isSupabaseAdminConfigured()) return [];

  const admin = createAdminClient();
  const { data, error } = await admin
    .from('company_suggestions')
    .select('*')
    .eq('status', 'approved')
    .order('moderated_at', { ascending: false });

  if (error || !data?.length) return [];

  const orphans: OrphanedApprovedSuggestion[] = [];

  for (const row of data) {
    const companyId = row.company_id;
    if (!companyId) {
      orphans.push(row as OrphanedApprovedSuggestion);
      continue;
    }

    const { data: company } = await admin
      .from('companies')
      .select('id')
      .eq('id', companyId)
      .maybeSingle();

    if (!company) {
      orphans.push(row as OrphanedApprovedSuggestion);
    }
  }

  return orphans;
}

export async function publishSuggestionToDirectory(
  suggestion: CompanySuggestionRow & { id: string; company_id?: string | null }
): Promise<{ companyId: string; slug: string } | null> {
  const admin = createAdminClient();
  const published = await approveSuggestionToCompany(suggestion);

  if (!published) return null;

  const readable =
    (await getCompanyBySlugOrUsdotFromDb(published.slug)) ??
    (await getDirectoryCompanyViaRpc(admin, published.slug));

  if (!readable) {
    logger.warn('company.publish_read_unverified', {
      suggestionId: suggestion.id,
      slug: published.slug,
      hint: 'Company publish succeeded; profile read will use RPC after schema reload',
    });
  }

  await admin
    .from('company_suggestions')
    .update({
      company_id: published.companyId,
      moderated_at: new Date().toISOString(),
    })
    .eq('id', suggestion.id);

  const destinationAssignment = await assignApprovedCompanyToDestinations({
    companyId: published.companyId,
    companySlug: published.slug,
    headquarters: suggestion.headquarters,
    fmcsaRaw:
      suggestion.fmcsa_raw && typeof suggestion.fmcsa_raw === 'object'
        ? (suggestion.fmcsa_raw as Record<string, unknown>)
        : null,
    legalName: suggestion.legal_name ?? suggestion.name,
    coverage: coverageFromSuggestionRow(suggestion),
  });

  revalidatePublishedCompany(published.slug);
  revalidateDestinationPaths(suggestion.headquarters);

  logger.info('company.publish_destination_linked', {
    suggestionId: suggestion.id,
    slug: published.slug,
    headquarters: suggestion.headquarters,
    effectiveAddress: destinationAssignment.debug.effectiveAddress,
    parsedCity: destinationAssignment.debug.parsedCity,
    parsedState: destinationAssignment.debug.parsedState,
    primaryCity: destinationAssignment.debug.primaryCity,
    detectedCities: destinationAssignment.debug.detectedCities,
    coverageApplied: destinationAssignment.debug.coverageApplied,
    coverageSummary: destinationAssignment.debug.coverageSummary,
    counties: destinationAssignment.assignedCounties,
    destinationSlugs: destinationAssignment.destinationSlugs,
  });

  return published;
}