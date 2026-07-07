import { slugifyCompanyName } from '@/lib/utils/slugify';

export function normalizeCompanyUsdot(value: string | null | undefined): string | null {
  if (!value) return null;
  const digits = value.replace(/\D/g, '');
  return digits.length >= 3 ? digits : null;
}

/** Base slug before uniqueness suffix — shared by approval and preview flows. */
export function buildCompanySlugBase(params: {
  name: string;
  usdot?: string | null;
}): string {
  const dot = normalizeCompanyUsdot(params.usdot);
  const nameSlug = slugifyCompanyName(params.name);
  return nameSlug && nameSlug !== 'company' ? nameSlug : dot ? `dot-${dot}` : 'company';
}

/** Guarantee a non-empty publishable slug (approval insert safety net). */
export function ensurePublishableCompanySlug(params: {
  slug: string;
  name: string;
  usdot?: string | null;
}): string {
  const trimmed = params.slug?.trim();
  if (trimmed && trimmed !== 'company') return trimmed;
  const fallback = buildCompanySlugBase(params);
  if (fallback && fallback !== 'company') return fallback;
  const dot = normalizeCompanyUsdot(params.usdot);
  if (dot) return `dot-${dot}`;
  return `company-${Date.now()}`;
}