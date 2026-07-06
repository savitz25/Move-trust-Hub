import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';

function normalizeUsdot(value: string | null | undefined): string | null {
  if (!value) return null;
  const digits = value.replace(/\D/g, '');
  return digits.length >= 3 ? digits : null;
}

function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export type DuplicateCheckResult =
  | { duplicate: false }
  | { duplicate: true; reason: string; existingSlug?: string };

export async function checkSuggestionDuplicate(params: {
  name: string;
  usdot?: string | null;
}): Promise<DuplicateCheckResult> {
  if (!isSupabaseAdminConfigured()) {
    return { duplicate: false };
  }

  const admin = createAdminClient();
  const usdot = normalizeUsdot(params.usdot);
  const normalizedName = normalizeName(params.name);

  if (usdot) {
    const { data: inDirectory } = await admin
      .from('companies')
      .select('slug, name')
      .or(`usdot_number.eq.${usdot},usdot_number.ilike.%${usdot}%`)
      .limit(1);

    if (inDirectory?.length) {
      return {
        duplicate: true,
        reason: `${inDirectory[0].name} is already in our directory.`,
        existingSlug: inDirectory[0].slug,
      };
    }

    const { data: inMoving } = await admin
      .from('moving_companies')
      .select('name')
      .eq('dot_number', usdot)
      .limit(1);

    if (inMoving?.length) {
      return {
        duplicate: true,
        reason: 'This USDOT is already tracked in our review system.',
      };
    }

    const { data: pending } = await admin
      .from('company_suggestions')
      .select('id')
      .eq('status', 'pending')
      .eq('usdot', usdot)
      .limit(1);

    if (pending?.length) {
      return {
        duplicate: true,
        reason: 'This company is already pending review. We will add it shortly.',
      };
    }
  }

  const { data: nameMatches } = await admin
    .from('companies')
    .select('name, slug')
    .ilike('name', params.name.trim())
    .limit(1);

  if (nameMatches?.length) {
    return {
      duplicate: true,
      reason: `${nameMatches[0].name} is already listed in our directory.`,
      existingSlug: nameMatches[0].slug,
    };
  }

  const { data: pendingByName } = await admin
    .from('company_suggestions')
    .select('id, name')
    .eq('status', 'pending')
    .limit(50);

  const nameCollision = (pendingByName ?? []).find(
    (row) => normalizeName(row.name) === normalizedName
  );

  if (nameCollision) {
    return {
      duplicate: true,
      reason: 'A suggestion for this company name is already pending review.',
    };
  }

  return { duplicate: false };
}