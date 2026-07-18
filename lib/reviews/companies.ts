import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { getAllCompanies } from '@/lib/data-server';
import type { ParsedCarrierNumber } from '@/lib/verify-dot/schema';
import { slugFromCarrier } from '@/lib/reviews/schema';
import { resolveCarrierPreview } from '@/lib/verify-dot/fmcsa';

export type MovingCompanyRecord = {
  id: string;
  slug: string;
  name: string;
  dot_number: string | null;
  mc_number: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  phone: string | null;
  website: string | null;
  avg_rating: number;
  review_count: number;
  approved_review_count: number;
  legacy_company_id: string | null;
};

function normalizeDigits(value: string) {
  return value.replace(/\D/g, '');
}

async function lookupLegacyCompany(parsed: ParsedCarrierNumber) {
  const companies = await getAllCompanies();
  return companies.find((c) => {
    if (parsed.type === 'DOT') {
      return normalizeDigits(c.usdotNumber || '') === parsed.value;
    }
    return normalizeDigits(c.mcNumber || '') === parsed.value;
  });
}

export async function findMovingCompanyByCarrier(
  parsed: ParsedCarrierNumber
): Promise<MovingCompanyRecord | null> {
  if (!isSupabaseAdminConfigured()) return null;

  const admin = createAdminClient();
  const column = parsed.type === 'DOT' ? 'dot_number' : 'mc_number';
  const { data: existing } = await admin
    .from('moving_companies')
    .select('*')
    .eq(column, parsed.value)
    .maybeSingle();

  if (existing) return existing as MovingCompanyRecord;

  const slug = slugFromCarrier(parsed.type, parsed.value);
  const { data: bySlug } = await admin
    .from('moving_companies')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  return (bySlug as MovingCompanyRecord) ?? null;
}

export async function findOrCreateMovingCompany(params: {
  parsed: ParsedCarrierNumber;
  nameOverride?: string;
}): Promise<MovingCompanyRecord | null> {
  if (!isSupabaseAdminConfigured()) return null;

  const admin = createAdminClient();
  const slug = slugFromCarrier(params.parsed.type, params.parsed.value);

  const column = params.parsed.type === 'DOT' ? 'dot_number' : 'mc_number';
  const { data: existing } = await admin
    .from('moving_companies')
    .select('*')
    .eq(column, params.parsed.value)
    .maybeSingle();

  const legacy = await lookupLegacyCompany(params.parsed);
  const { preview } = await resolveCarrierPreview(params.parsed, null);

  const resolvedName =
    params.nameOverride?.trim() ||
    legacy?.name ||
    preview?.legalName ||
    null;

  if (existing) {
    const current = existing as MovingCompanyRecord;
    // Upgrade placeholder "DOT 123 Carrier" names when we learn the legal name
    const isPlaceholder = /^DOT\s+\d+\s+Carrier$/i.test(current.name) ||
      /^MC\s+\d+\s+Carrier$/i.test(current.name);
    const betterName =
      resolvedName &&
      resolvedName !== current.name &&
      (isPlaceholder || params.nameOverride?.trim());
    if (
      betterName ||
      (!current.legacy_company_id && legacy?.id) ||
      (!current.address && (preview?.physicalAddress || legacy?.headquarters))
    ) {
      const { data: updated } = await admin
        .from('moving_companies')
        .update({
          name: betterName ? resolvedName : current.name,
          address:
            current.address ||
            preview?.physicalAddress ||
            legacy?.headquarters ||
            null,
          phone: current.phone || preview?.phone || null,
          website: current.website || legacy?.website || null,
          legacy_company_id: current.legacy_company_id || legacy?.id || null,
          source: legacy ? 'directory_sync' : current.source || 'user_review',
        })
        .eq('id', current.id)
        .select('*')
        .single();
      if (updated) return updated as MovingCompanyRecord;
    }
    return current;
  }

  const name =
    resolvedName || `${params.parsed.display} Carrier`;

  const row = {
    slug,
    name,
    dot_number: params.parsed.type === 'DOT' ? params.parsed.value : legacy?.usdotNumber?.replace(/\D/g, '') || null,
    mc_number: params.parsed.type === 'MC' ? params.parsed.value : legacy?.mcNumber?.replace(/\D/g, '') || null,
    address: preview?.physicalAddress || legacy?.headquarters || null,
    phone: preview?.phone || null,
    website: legacy?.website || null,
    legacy_company_id: legacy?.id || null,
    source: legacy ? 'directory_sync' : 'user_review',
  };

  const { data: created, error } = await admin
    .from('moving_companies')
    .insert(row)
    .select('*')
    .single();

  if (error) {
    const { data: retry } = await admin
      .from('moving_companies')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    return (retry as MovingCompanyRecord) ?? null;
  }

  return created as MovingCompanyRecord;
}

export async function getMovingCompanyBySlug(
  slug: string
): Promise<MovingCompanyRecord | null> {
  if (!isSupabaseAdminConfigured()) return null;
  const admin = createAdminClient();
  const { data } = await admin
    .from('moving_companies')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  return (data as MovingCompanyRecord) ?? null;
}

export async function searchMovingCompanies(
  query: string
): Promise<MovingCompanyRecord[]> {
  if (!isSupabaseAdminConfigured()) return [];
  const admin = createAdminClient();
  const q = `%${query.trim()}%`;
  const { data } = await admin
    .from('moving_companies')
    .select('*')
    .or(`name.ilike.${q},dot_number.ilike.${query},mc_number.ilike.${query},slug.ilike.${q}`)
    .order('approved_review_count', { ascending: false })
    .limit(10);
  return (data as MovingCompanyRecord[]) ?? [];
}