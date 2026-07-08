import type { SupabaseClient } from '@supabase/supabase-js';
import type { BackfillTarget } from '@/lib/verification/build-backfill-targets';
import type { VerificationSources } from '@/lib/verification/backfill-helpers';

const ENRICHMENT_ONLY_COLUMNS = [
  'verification_sources',
  'verification_last_synced_at',
  'overall_rating',
  'review_count',
  'last_updated',
] as const;

export function markCatalogEnrichmentStub(
  sources: VerificationSources
): VerificationSources {
  return { ...sources, enrichment_stub: true };
}

export async function persistBackfillUpdate(
  admin: SupabaseClient,
  target: BackfillTarget,
  updates: Record<string, unknown>,
  options: { catalogStub?: boolean }
): Promise<{ error: string | null }> {
  if (target.supabaseId) {
    const { error } = await admin
      .from('companies')
      .update(updates)
      .eq('id', target.supabaseId);
    return { error: error?.message ?? null };
  }

  const { data: existing, error: lookupError } = await admin
    .from('companies')
    .select('id')
    .eq('slug', target.slug)
    .maybeSingle();

  if (lookupError) {
    return { error: lookupError.message };
  }

  if (existing?.id) {
    const { error } = await admin
      .from('companies')
      .update(updates)
      .eq('id', existing.id);
    return { error: error?.message ?? null };
  }

  const sources = updates.verification_sources as VerificationSources | undefined;
  const verificationSources =
    options.catalogStub && sources
      ? markCatalogEnrichmentStub(sources)
      : sources;

  const insertRow: Record<string, unknown> = {
    id: target.slug,
    slug: target.slug,
    name: target.name,
    headquarters: target.headquarters || 'United States',
    short_description: `${target.name} — mover directory profile (catalog enrichment).`,
    description: '',
    usdot_number: target.usdotNumber,
    mc_number: target.mcNumber,
    is_verified: false,
    verification_sources: verificationSources ?? {},
    verification_last_synced_at: updates.verification_last_synced_at,
    overall_rating: updates.overall_rating ?? null,
    review_count: updates.review_count ?? 0,
    last_updated: updates.last_updated,
  };

  const { error: insertError } = await admin.from('companies').insert(insertRow);
  return { error: insertError?.message ?? null };
}

export function enrichmentOnlyFieldNames(updates: Record<string, unknown>): string {
  return Object.keys(updates)
    .filter((key) =>
      ENRICHMENT_ONLY_COLUMNS.includes(key as (typeof ENRICHMENT_ONLY_COLUMNS)[number])
    )
    .join(', ');
}